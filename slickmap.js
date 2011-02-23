/*
 slickmap v 0.1
 Developed by Rodrigo Castilho
 email: rodcast@gmail.com
 site: http://rodrigocastilho.com
 
 Copyright (C) 2010.
 Licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

 Create Site map with base JSON and SlickMap CSS. Pure JavaScript (no framework)
 
 @Inspired on Fbug and ConsoleDummy:
   http://astuteo.com/slickmap/
*/
var Slickmap = function() {
    String.prototype.stripId = function() {
        return this.toLowerCase().split(" ").join("_").replace(/[[\]{}<>,.;\/?:!@#$%&*()\-+=]/g, "").replace(/[áàãâ]/g, "a").replace(/[éèê]/g, "e").replace(/[íìî]/g, "i").replace(/[óòôõ]/g, "o").replace(/[úùû]/g, "u").replace(/[ç]/g, "c");
    };

    function getMap() {
        if (typeof (_slickmap) !== "undefined") {
            try {
                var 
                    d = document,
                    sitemap = d.getElementById("sitemap"),
                    h1 = d.createElement("h1"),
                    h2 = d.createElement("h2");

                sitemap.className = "sitemap";

                h1.innerHTML = _slickmap.title;
                h2.innerHTML = _slickmap.subtitle;

                sitemap.appendChild(h1).parentNode.appendChild(h2);
    
                var mapTree = function(map) {
                    var 
                        i = 0,
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
                            li.appendChild(mapTree(items));
                        }
    
                        ul.appendChild(li);
                    }
                    return ul;
                };
    
                sitemap.appendChild(mapTree(_slickmap.items[0]));
                sitemap.getElementsByTagName("ul")[0].id = "primaryNav";
                
                //Fixed position Site map
                d.getElementById("primaryNav").style.marginTop = "30px";
            } catch(e) {
                alert(e);
            }
        }
    }

    return {
        init: function() {
            getMap();
        }
    };
}();