var gui = require("nw.gui");

if (process.platform == "darwin") {
  var menu = new gui.Menu({type: "menubar"});
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

window.onload = function() {
  document.getElementById("close-window-button").onclick = function() {
    window.close();
  };
  gui.Window.get().show();
  setTimeout(function(){
    mainWindow(this)
  }, 1000)

};
function mainWindow(wn){
  nw.Window.open('index.html', {
    position: 'center',
    frame:false,
    show: false,
    min_width: 1000,
    min_height: 600,
    width: 1200,
    height: 600
  },function(new_win) {
      new_win.on('focus', function() {
          wn.close(true);
        });
    });
}
