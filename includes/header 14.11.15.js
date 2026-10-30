document.write("<div id=\"banner_logo\">")
document.write("<div id=\"banner_pict\"><a href = \"http://www.uark.edu\"><IMG class = \"uark\" SRC=\"images/uark_banner_red.png\"></a></div>");
document.write("<div id=\"banner_info\"><h4 id=\"banner_fir\"><a href=\"index.html\"><span></span><p class=\"headname\">Arya Gaduh</p><p class=\"headinfo\" >Assistant Professor of Economics <br>University of Arkansas, Fayetteville</p></a></h4></div>");
    
  <!--
  // JavaScript Document
  
  var url = window.location.pathname;
  var filename = url.substring(url.lastIndexOf('/')+1);
  
  if (filename=="") {
    filename="index.html";
  }
  
  var tabs=['index','research','courses','vita','others'];

  document.write("<div id=\"tablogo\"><a href=\"http://www.uark.edu\"><img class=\"minilogo\" src=\"images/UA_Logo_mini.png\"></a></div>");
                                                                                              
  document.write("<div class=\"tab\">");
  document.write("<ul class=\"tabrow\">")
  
  for (var index in tabs) {
      var tabfile=tabs[index].toLowerCase() + '.html';
      var tabshow=tabs[index].toUpperCase();
      var style = ""
  
      if (tabs[index]=="index") {
        tabshow="HOME";
      } 
  
      
      if (tabfile==filename.toLowerCase()) {
  		    document.write("<li class=\"selected\">" + tabshow + "</li>");
      }	else {
        if (tabshow=="PUBS") {
          document.write("<li style=\"z-index:" + index + "\"; onclick=\"window.location.href='" + tabfile + "'\" alt=\"publications\" title=\"publications\">" +  tabshow + "</li>");
        } else {
          document.write("<li style=\"z-index:" + index + "\"; onclick=\"window.location.href='" + tabfile + "'\">" + tabshow + "</li>");      
        }
      }	  
  
  } 

document.write("</div>");
document.write("</div>");

  

                                                                                                                              