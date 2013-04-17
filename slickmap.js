/*!
 slickmap v 0.1
 Developed by Rodrigo Castilho
 email: rodcast@gmail.com
 site: http://rodrigocastilho.com
 
 Copyright (C) 2010.
 Licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

 Create Site map with base JSON and SlickMap CSS. Pure JavaScript (no framework)
 
 @Inspired on SlickMap CSS:
   http://astuteo.com/slickmap/
 */
var Slickmap = Slickmap || (function(d) {
  "use strict";
  
  String.prototype.stripId = function() {
    return this.toLowerCase().replace(/^\s*|\s$/g, "").replace(/\s+/g, "_").replace(/[áàâãäª]/g, "a").replace(/[éèêë]/g, "e").replace(/[íìîï]/g, "i").replace(/[óòôõöº]/g, "o").replace(/[úùûü]/g, "u").replace(/ç/g, "c").replace(/\W/g, "_").replace(/_+/g, "_");
  };

  function getMap() {
    if (_slickmap instanceof Object && _slickmap.hasOwnProperty("items")) {
      try {
        var sitemap = d.getElementById("sitemap"),
            h1 = d.createElement("h1"),
            h2 = d.createElement("h2");

        sitemap.className = "sitemap";

        h1.innerHTML = _slickmap.title || "";
        h2.innerHTML = _slickmap.subtitle || "";

        sitemap.appendChild(h1).parentNode.appendChild(h2);

        var mapTree = function(map) {
          var i = 0,
              l = map.item.length,
              items, a, li,
              ul = d.createElement("ul");

          for (; i < l; i++) {
            li = d.createElement("li");
            a = d.createElement("a");

            items = map.item[i];

            a.appendChild(d.createTextNode(items.name));
            a.href = items.link;
            a.title = items.description;

            li.id = (items.name).stripId();
            li.appendChild(a);

            if (items.item) {
              li.appendChild(arguments.callee(items));
            }

            ul.appendChild(li);
          }
          
          return ul;
        };

        if (_slickmap.hasOwnProperty("items")) {
          sitemap.appendChild(mapTree(_slickmap.items[0]));
          sitemap.getElementsByTagName("ul")[0].id = "primaryNav";
        }
      } catch (e) {
        alert(e);
      }
    }
  }

  return {
    init: function() {
      getMap();
    }
  };
}(document));