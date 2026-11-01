"""Rebuild all static pages from data/papers.json using Python 3 (no dependencies)."""
from pathlib import Path
import json,html,re
from datetime import date, datetime
ROOT=Path(__file__).resolve().parent
E=lambda s:html.escape(str(s),quote=True)
CONFIG=json.loads((ROOT/'data/site.json').read_text())
LAST_UPDATED=datetime.strptime(CONFIG['last_updated'], '%Y-%m').strftime('%B %Y')
PAPERS=json.loads((ROOT/'data/papers.json').read_text())
GROUPS=[('published','Peer-reviewed publications'),('working','Working papers'),('progress','Work in progress'),('archive','Permanent working papers'),('other','Other publications')]
def href(url,prefix=''):
    return url if re.match(r'^(?:[a-zA-Z][\w+.-]*:|//|#)',url) else prefix+url
def fragment(s,prefix=''):
    return re.sub(r'href="([^"]*)"',lambda m:'href="'+E(href(html.unescape(m[1]),prefix))+'"',s)
def shell(title,content,current='research',prefix='',paper=None):
    nav=''.join(f'<a href="{prefix}{file}"'+(' aria-current="page"' if key==current else '')+f'>{label}</a>' for key,file,label in [('home','index.html','Home'),('research','research.html','Research'),('courses','teaching.html','Teaching'),('others','others.html','Resources')])
    pid=f' data-paper-id="{E(paper["id"])}" data-paper-title="{E(paper["title"])}" data-paper-category="{E(paper["category"])}"' if paper else ''
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(title)} | Arya Gaduh</title><meta name="description" content="{E(paper['title'] if paper else 'Arya Gaduh — economics research, teaching, and resources. University of Arkansas.')}">
<link rel="stylesheet" href="{prefix}assets/site.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@36,400&amp;family=Source+Sans+3:wght@400;500;600&amp;display=swap">
<script src="{prefix}assets/analytics.js" data-measurement-id="{E(CONFIG['analytics_id'])}" defer></script><script src="{prefix}assets/site.js" defer></script></head>
<body class="page-{E(current)}"{pid}><a class="skip" href="#main">Skip to content</a><div class="site"><header class="site-header"><a class="name" href="{prefix}index.html">Arya Gaduh</a><nav aria-label="Main navigation">{nav}</nav></header>
<main id="main">{content}</main><footer><span>© <span data-copyright-year>{date.today().year}</span> Arya Gaduh</span><span aria-hidden="true">·</span><a href="mailto:agaduh@walton.uark.edu">Email</a><span class="last-updated">Last updated <time datetime="{E(CONFIG['last_updated'])}">{E(LAST_UPDATED)}</time></span></footer></div></body></html>'''
def paper_attrs(p):return f'data-paper-id="{E(p["id"])}" data-paper-title="{E(p["title"])}" data-paper-category="{E(p["category"])}"'
def links(p,prefix=''):
    items=([{'label':'Paper','url':p['url']}] if p.get('url') else [])+p.get('links',[])
    return '<div class="paper-links">'+''.join(f'<a data-paper-link="{E(x["label"])}" href="{E(href(x["url"],prefix))}">{E(x["label"])} ↗</a>' for x in items)+'</div>'
def card(p,home=False):
    detail=''.join('<p class="paper-meta">'+fragment(x)+'</p>' for x in p['details_html'])
    abstract=f'<details data-abstract><summary>Abstract</summary><div class="abstract">{p["abstract_html"]}</div></details>' if p.get('abstract_html') and not home else ''
    if not home:
        raw=' '.join(p['details_html'])
        journal=re.search(r'<i>(.*?)</i>',raw,re.S)
        citation=journal.group(1) if journal else ''
        years=re.findall(r'\b(?:19|20)\d{2}\b',re.sub('<[^>]+>',' ',raw))
        year='Accepted' if 'Accepted' in citation else (years[-1] if years else '')
        if p['category']=='progress':
            return f'<article class="compact-paper project-entry" id="{E(p["id"])}" {paper_attrs(p)}><div><h3 class="compact-title">{E(p["title"])}</h3>{detail}</div></article>'
        if p['category'] not in {'published','accepted','working','archive'}:
            return f'<article class="compact-paper report-entry" id="{E(p["id"])}" {paper_attrs(p)}><span class="paper-year">{E(year)}</span><div><h3 class="compact-title">{E(p["title"])}</h3>{detail}{links(p)}</div></article>'
        expanded_meta=raw[:journal.start()]+raw[journal.end():] if journal else raw
        if p['category']=='working':
            version=re.search(r'\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+(?:19|20)\d{2}\b', expanded_meta)
            if version:
                citation=(citation or 'Working Paper')+' · '+E(version.group(0))
                expanded_meta=expanded_meta[:version.start()]+expanded_meta[version.end():]
        expanded_meta=re.sub(r'(?:\s|<br\s*/?>|\|)+$', '', expanded_meta, flags=re.I)
        expanded_meta=re.sub(r'^(?:\s|<br\s*/?>|\|)+', '', expanded_meta, flags=re.I)
        detail=f'<p class="paper-meta">{fragment(expanded_meta)}</p>' if expanded_meta else ''
        full=f'<div class="compact-expanded">{detail}{links(p)}'
        if p.get('abstract_html'): full+=f'<div class="abstract">{p["abstract_html"]}</div>'
        full+='</div>'
        return f'<article class="compact-paper" id="{E(p["id"])}" {paper_attrs(p)}><span class="paper-year">{E(year)}</span><details data-abstract><summary><span><span class="compact-title">{E(p["title"])}</span><span class="compact-citation">{citation}</span></span><span class="expand-mark" aria-hidden="true"></span></summary>{full}</details></article>'
    return f'<article class="paper" id="{E(p["id"])}" {paper_attrs(p)}><h3><a href="research/{E(p["id"])}.html">{E(p["title"])}</a></h3>{detail}{links(p)}{abstract}</article>'
def groups(home=False):
    result=''
    for key,label in GROUPS:
        rows=[p for p in PAPERS if ('published' if p['category']=='accepted' else p['category'])==key and (not home or p.get('featured'))]
        if not rows:continue
        sub='';body=''
        for p in rows:
            if p.get('subsection') and p['subsection']!=sub:
                sub=p['subsection'];body+=f'<h3 class="subsection">{E(sub.capitalize())}</h3>'
            body+=card(p,home)
        result+=f'<section class="research-group" id="{key}" aria-labelledby="heading-{key}"><h2 id="heading-{key}">{label}</h2><div>{body}</div></section>'
    return result
ids=[p['id'] for p in PAPERS]
assert len(ids)==len(set(ids)), 'Paper IDs must be unique'
assert all(p['category'] in [g[0] for g in GROUPS]+['accepted'] for p in PAPERS)
bio=(ROOT/'templates/bio.html').read_text()
intro=(ROOT/'templates/profile.html').read_text()
about=(ROOT/'templates/about.html').read_text()
actions=(ROOT/'templates/profile-actions.html').read_text()
home='<h1 class="sr-only">Arya Gaduh — Economics</h1><div class="home-information">'+intro+about+actions+'</div><section class="selected featured-below" aria-labelledby="featured-heading"><div class="featured-top"><h2 id="featured-heading">Featured research</h2><a href="research.html">All research →</a></div><div class="featured-columns">'+groups(True)+'</div></section>'
(ROOT/'index.html').write_text(shell('Economics',home,'home').replace(f'<time datetime="{E(CONFIG["last_updated"])}">{E(LAST_UPDATED)}</time>', '<time datetime="2026-11">November 2026</time>').replace('</head>','<link rel="stylesheet" href="assets/home.css?v=20261101-old-main"></head>'))
research='<div class="page-heading"><h1>Research</h1><a href="https://scholar.google.com/citations?user=QFJCiYoAAAAJ&amp;hl=en">Google Scholar ↗</a></div><nav class="section-nav" aria-label="Research sections">'+''.join(f'<a href="#{k}">{v}</a>' for k,v in GROUPS)+'</nav>'+'<div class="compact-research">'+groups()+'</div>'
research=research.replace('<nav class="section-nav"', '<label class="research-search">Search papers <input type="search" id="paper-search" placeholder="Title, coauthor, or journal"></label><nav class="section-nav"')
research+='<script src="assets/research.js" defer></script>'
(ROOT/'research.html').write_text(shell('Research',research))
teaching=(ROOT/'templates/teaching.html').read_text()
teaching_page=shell('Teaching & Advising',teaching,'courses').replace('</head>','<link rel="stylesheet" href="assets/teaching.css"></head>')
(ROOT/'teaching.html').write_text(teaching_page)
(ROOT/'courses.html').write_text((ROOT/'templates/teaching-redirect.html').read_text())
resources='<div class="page-heading"><h1>Resources</h1></div><div class="resources-content">'+(ROOT/'templates/others.html').read_text()+'</div>'
(ROOT/'others.html').write_text(shell('Resources',resources,'others').replace('</head>','<link rel="stylesheet" href="assets/resources.css"></head>'))
(ROOT/'research').mkdir(exist_ok=True)
for p in PAPERS:
    meta=''.join('<p class="paper-meta">'+fragment(x,'../')+'</p>' for x in p['details_html'])
    ab='<h2>Abstract</h2><div class="abstract">'+fragment(p['abstract_html'],'../')+'</div>' if p['abstract_html'] else ''
    content=f'<div class="paper-detail" {paper_attrs(p)}><a class="back" href="../research.html#{E(p["id"])}">← All research</a><h1>{E(p["title"])}</h1>{meta}{links(p,"../")}{ab}</div>'
    (ROOT/'research'/f'{p["id"]}.html').write_text(shell(p['title'],content,prefix='../',paper=p))
print(f'Built 4 main pages (plus legacy CV redirect) and {len(PAPERS)} paper pages.')
