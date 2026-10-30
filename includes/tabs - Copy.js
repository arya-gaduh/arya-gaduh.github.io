// JavaScript Document

var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);

if (filename=="") {
  filename="index.html";
}

var tabs=['index','research','pubs','vita'];

document.write("<TD class=\"dept\" COLSPAN=1><A class=\"dept\" HREF=\"http://dornsife.usc.edu/econ/\">Department of Economics </A></TD>");
document.write("<TD class=\"blankltab\"></TD>");

for (var index in tabs) {
    var tabfile=tabs[index].toLowerCase() + '.html';
    var tabshow=tabs[index].toUpperCase();
    var style = ""

    if (tabs[index]=="index") {
      tabshow="HOME";
    } 

    if (tabs[index]=="research") {
      style="style=\"width:9%\" ";
    } 

    if (tabfile==filename.toLowerCase()) {
		    document.write("<TD class=\"curtab\" " + style + ">" + tabshow + "</TD>");
    }	else {
      if (tabshow=="PUBS") {
        document.write("<TD class=\"othtab\" " + style + "onclick=\"window.location.href='" + tabfile + "'\" alt=\"publications\" title=\"publications\">" + tabshow + "</TD>");
      } else {
        document.write("<TD class=\"othtab\" " + style + "onclick=\"window.location.href='" + tabfile + "'\">" + tabshow + "</TD>");
      }    
    }	  
} 

document.write("<TD class=\"blankrtab\"></TD>");


