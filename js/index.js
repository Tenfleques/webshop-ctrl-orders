let fs = require("fs");
let CONFIG_FILE = "resources/config.json"
let CONFIG = JSON.parse(fs.readFileSync(CONFIG_FILE));
var restAPI = CONFIG["REST"]["url"] + ":" 
                + CONFIG["REST"]["port"];

  if(!restAPI.includes("http"))
    restAPI = "http://" + restAPI;
let storage = new appStorage();
 
let orderList = JSON.parse(fs.readFileSync("resources/orders.json"));
var orders = orderList.map(a => {
  return new Order(a[0], a[1], a[2]);
})

$(function() {
  var index = 0;
  writeOrder(orders[index]);
  $(".orders-list")
    .html(listOrders(orders))
    .on("click",".show-order", function(e){
      e.preventDefault();
      index = $(this).attr("href").replace("#","");
      writeOrder(orders[index]);
  });
  $(".send-to-dispatch").on("click",function(e){
    if (orders.length < 1){
      writeOrder();
      return;
    }
    e.preventDefault();
    storage.set("depatch",orders[index].getInvoiceNumber(),orders[index].getAll());
    orders.splice(index,1);
    
    index = new ctrlIndex(index,orders).inc();
    writeOrder(orders[index]);
    $(".orders-list").html(listOrders(orders))
  });
});
