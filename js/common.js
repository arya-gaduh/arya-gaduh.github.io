// JavaScript Document

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-43805949-1', 'uark.edu');
ga('send', 'pageview');

    
function toggleSection(a){
  var e=document.getElementById(a);
  var me=document.getElementById("more"+a)      
  var le=document.getElementById("less"+a)

  if(!e)return true;
  if(e.style.display=="none"){
    e.style.display="inline";
    me.style.display="none";
    le.style.display="inline";
  }
  else{
    e.style.display="none";
    me.style.display="inline";
    le.style.display="none";
  }
return true;
}

