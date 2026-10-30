// JavaScript Document

// Author: ricocheting.com

var x=0;
    
function rotate(num){
  fs=document.ff.slide;
  x=num%fs.length;         
  if(x<0) x=fs.length-1;
  document.images.show.src=fs.options[x].value;
  fs.selectedIndex=x;
}
 
// Description: slideshow that allows visitors to flip through a series of images on your website


function auto() {      
  if(document.ff.slide.selectedIndex==40) {
     document.ff.fa.value = "Replay";
  }
  if(document.ff.fa.value == "Pause"){
    rotate(++x); setTimeout("auto()", 500);
  }
}   