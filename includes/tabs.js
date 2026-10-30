// JavaScript Document

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);

if (filename=="") {
  filename="index.html";
}

var tabs=['index','research','courses','pubs','vita','others'];
                                                                                            
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


