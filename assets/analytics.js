/* GA4: one automatic page_view per HTML document, plus paper-level events. */
(() => {
  'use strict';
  const script = document.currentScript || document.querySelector('script[data-measurement-id]');
  const measurementId = script?.dataset.measurementId;
  const debug = new URLSearchParams(location.search).get('analytics_debug') === '1';
  const production = ['arya-gaduh.github.io', 'gaduh.hosted.uark.edu'].includes(location.hostname);
  // Opening files or previewing locally should not contaminate live statistics.
  if (!measurementId || (!production && !debug)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const gtag = window.gtag;
  gtag('js', new Date());
  gtag('config', measurementId, debug ? {debug_mode:true} : {});
  const loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(loader);
  const params = element => ({
    paper_id: element.dataset.paperId,
    paper_title: (element.dataset.paperTitle || '').slice(0,100),
    paper_category: element.dataset.paperCategory,
    source_page: location.pathname
  });
  if (document.body.dataset.paperId) gtag('event', 'paper_view', params(document.body));
  document.addEventListener('toggle', event => {
    const details = event.target;
    if (details.matches('details[data-abstract]') && details.open) {
      const paper = details.closest('[data-paper-id]');
      if (paper) gtag('event', 'abstract_open', params(paper));
    }
  }, true);
  document.addEventListener('click', event => {
    const a = event.target.closest('a[href]');
    if (!a) return;
    const paper = a.closest('[data-paper-id]');
    let name, data;
    if (paper && a.hasAttribute('data-paper-link')) {
      name = 'paper_link_click';
      data = {...params(paper), link_label:a.dataset.paperLink, link_url:a.href};
    } else if (/\.pdf(?:[?#]|$)/i.test(a.href) && /Arya.*CV/i.test(decodeURI(a.href))) {
      name = 'cv_download'; data = {link_url:a.href,source_page:location.pathname};
    } else return;
    // Allow a brief send window for same-tab navigation, with a guaranteed fallback.
    const sameTab = !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0 && (!a.target || a.target === '_self') && !a.hasAttribute('download');
    if (sameTab) {
      event.preventDefault();
      let navigated = false;
      const go = () => {if (!navigated) {navigated=true; location.assign(a.href);}};
      setTimeout(go, 300);
      gtag('event',name,{...data,transport_type:'beacon',event_callback:go,event_timeout:250});
    } else gtag('event',name,{...data,transport_type:'beacon'});
  });
})();
