
import Handlebars from 'handlebars';
import pages from "../data/pages.json";

Handlebars.registerHelper("link", function (text, url) {
  url = Handlebars.escapeExpression(url);
  text = Handlebars.escapeExpression(text);
  return new Handlebars.SafeString("<a class='link' href='" + url + "'>" + text + "</a>");
});


var source = document.querySelector(".content-center-wrapper");
let sourceInnerHTML = source.innerHTML;
var template = Handlebars.compile(sourceInnerHTML);


var context = { items: pages };
var html = template(context);
source.innerHTML = html;