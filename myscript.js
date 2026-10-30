// JavaScript Document

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-18125141-1']);
    _gaq.push(['_trackPageview']);
  
    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    // Author: ricocheting.com
    // Description: slideshow that allows visitors to flip through a series of images on your website
    
    var x=0;
    
    function rotate(num){
      fs=document.ff.slide;
      x=num%fs.length;         
      if(x<0) x=fs.length-1;
      document.images.show.src=fs.options[x].value;
      fs.selectedIndex=x;
    }
    
    function auto() {      
      if(document.ff.slide.selectedIndex==40) {
         document.ff.fa.value = "Replay";
      }
      if(document.ff.fa.value == "Pause"){
        rotate(++x); setTimeout("auto()", 500);
      }
    }

    function toggleMe(a, st){
      var e=document.getElementById(a);
      var me=document.getElementById("more"+a)      
      var le=document.getElementById("less"+a)
  
      if(!e)return true;
      if(e.style.display=="none"){
        e.style.display="inline";
        me.style.display="none";
        le.style.display="block";
      }
      else{
        e.style.display="none";
        me.style.display="inline";
        le.style.display="none";
      }
    return true;
    }
    
    function toggleMeAbs(a,n){
  
      var b=document.getElementById("brief");
      var t=document.getElementById("title");

      if(!b)return true;
      if(!t)return true;

      if(a=="brief"){
        b.style.display="inline";
        t.style.display="none";

        for (i=0;i<n;i++) {
          var ch='abcdefghijklmnopqrstuvwxyz'.charAt(i);
          var brf = document.getElementById("brief_" + ch);
          
          brf.style.display="block";
        }
      }
      else{
        b.style.display="none";
        t.style.display="inline";

        for (i=0;i<n;i++) {
          var ch='abcdefghijklmnopqrstuvwxyz'.charAt(i);
          var brf = document.getElementById("brief_" + ch);
          
          brf.style.display="none";
        }
      }

    return true;
    }
