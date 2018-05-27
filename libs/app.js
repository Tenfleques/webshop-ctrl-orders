var gui = require('nw.gui');
var win = gui.Window.get();
if (process.platform == "darwin") {
	var menu = new gui.Menu({type: "menubar"});
	menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
	gui.Window.get().menu = menu;
}
var appname = "Easy Order";

document.onkeydown=disableconsole;
function disableconsole(e){
	/*evtobj = window.event? event : e;
	if(evtobj.keyCode == 123 || (evtobj.metaKey && evtobj.altKey && evtobj.keyCode ==73))
		return false;*/
}
$(function() {
	//localStorage.clear();
	//sessionStorage.clear();
	/*$(document).on("contextmenu", function(e){
		e.preventDefault();
	});*/
	$("disabled").click(function() {
		 return false;
	 });
});

function errorBox(){
	$("#errorBox-header").html(arguments[0]);
	$("#errorBox-body").html(arguments[1]);
	$("#close-btn-var-color").removeClass("btn-danger")
	$("#close-btn-var-color").removeClass("btn-warning")
	$("#close-btn-var-color").removeClass("btn-success")
	var btnclas = isDefined(arguments[2])?arguments[2]:"btn-danger"
	$("#close-btn-var-color").addClass(btnclas)
	$('#errorBox').modal();
}

(function ($, window) {
    $.fn.contextMenu = function (settings) {
		 	return this.each(function () {
				var contextField = $(this).parent()
				$(this).on("contextmenu", function (e) {
					// return native menu if pressing control
					if(!isDefined(e.clientX)){
						e.clientX = 450;
						e.clientY = 190;
					}
					if (e.ctrlKey) return;

						//open menu
					var $menu = $(settings.menuSelector)
								.data("invokedOn", $(e.target))
								.show(function(){
									contextField .addClass('dimmed')
								})
								.css({
										position: "absolute",
										left: getMenuPosition(e.clientX+70, 'width', 'scrollLeft'),
										top: getMenuPosition(e.clientY-70, 'height', 'scrollTop')
								})
								.off('click', function(){
						contextField .removeClass('dimmed')
					})
					return false;
				});
				$('body').click(function () {
					$(settings.menuSelector).hide();
					contextField .removeClass('dimmed')
				});
			});
  	};
    $(".copyright").html(appname + " &copy; "+new Date().getFullYear());
    document.onkeydown = function(event) {
      switch (event.keyCode) {
				case 8:
					return;
					break;
        //  window.history.back();
        //case 37: //go left
        //    break;
        //case 39: //go right
        //    break;
      }
    }
    $(".go-back").on("click",function(){
      window.history.back();
    })
    $("#window-action-closebutton").on('click',function() {
      gui.Window.get().close();
    });
    $("#window-action-minimizebutton").on('click',function() {
       gui.Window.get().minimize();
    });
    $("#window-action-zoombutton").on('click',function() {
      gui.Window.get().toggleFullscreen();
	});
	$(".toggle-language").on("click",function(){
		$(".international").css("display","none");
		$(".international."+$(this).val()).css("display","block");
	})
	$(".appname").html(appname);
		
		gui.Window.get().show();
})(jQuery, window);

jQuery.fn.extend({
	connectionError : function(){
		var html = "";		
		if(arguments[0])
			html += arguments[0];
		else{
			html = "<a href='settings.html' class='card p-3'>";
			html += "A connection error occured, check if the REST settings are correctly configured or if the server is up";
			html += "</a>"
		}	
		this.html(html);
	},
	genericError : function (){
		var html = "";		
		if(arguments[0])
			html += arguments[0];
		else{
			
			html += "ощибка но система не может знать что за ощибку";
		}	
		this.html(html);
	}
})
