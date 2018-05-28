$(function(){
    let navLinks = [{   
            "link" : "index.html",
            "fa"   : "fa-home",
            "caption" : "<span class='xinternational ru'>Прием заказа</span>"

        },{   
            "link" : "wharehouse.html",
            "fa"   : "fa-cog",
            "caption" : "<span class='xinternational ru'>Заказ на складе</span>"

        },{   
            "link" : "working.html",
            "fa"   : "fa-support",
            "caption" : "<span class='xinternational ru'>Заказ в обработке</span>"

        },{   
            "link" : "completed.html",
            "fa"   : "fa-support",
            "caption" : "<span class='xinternational ru'>Учет заказов</span>"

        }
    ];
    var html = "";
    navLinks.map(function(val){        
        html += navBuilder(val);
    })
    $(".sidenav-left").html(html);
    function navBuilder(navObject){
        var html = "";
        var active = (window.location.pathname == "/"+navObject["link"]) && "text-primary";
        html += '<a href="'+navObject["link"]+'" class="nav-link col-12 pb-3 pl-2 '+active+'">';
        //html +=    '<i class="fa '+navObject["fa"]+'"></i>';
        html += navObject["caption"];
        html += '</a>'
        return html;
    }
})