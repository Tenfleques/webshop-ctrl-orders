let fs = require("fs");
let CONFIG_FILE = "resources/config.json"
let CONFIG = JSON.parse(fs.readFileSync(CONFIG_FILE));
var restAPI = CONFIG["REST"]["url"] + ":" 
                + CONFIG["REST"]["port"];
let ORDER_STATUSES = CONFIG["ORDERS"]["statuses"];

let storage = new appStorage();
let COURIER_KEY = "courier";
let REPORT_KEY = "order-report";
$(function(){
    ORDER_STATUSES.push({
        "key" : "",
        "value" : "выбирать статус заказа"
    })
    let orderOptions = ORDER_STATUSES
        .sort((a,b) => reverseSort(b.key,a.key))
        .map(a=>{
            let v = $('<option/>', {
                'value': a.key,
                'text': a.value
            });
            if(a.key == "")
                v.prop("selected","true")
            return v;
        });

    $(".order-status").html(orderOptions)
    let orders = storage.get(COURIER_KEY).map(a => new Order(a.value));
    var index = 0;
    writeOrder(orders[index]);
    showActiveOrder(index);
    $(".orders-list")
    .html(listOrders(orders))
    .on("click",".show-order", function(e){
        e.preventDefault();
        index = $(this).attr("href").replace("#","");
        showActiveOrder(index);
        writeOrder(orders[index]);
    });

    $(".set-order-status").on("click",function(e){
        e.preventDefault();
        if (orders.length < 1){
            writeOrder();
            return;
        }
        let orderStatus = $(".order-status").val()
        if(orderStatus == ""){
            $(".control-messages").genericError("<div class='text-danger'>обязательно выбирать статус заказа</div>");
            return;
        }
        $(".control-messages").html("");
        let inCourier = storage.get(COURIER_KEY).find(a => {
            return a.value.invoiceNumber == orders[index].getInvoiceNumber();
        });
        storage.remove(COURIER_KEY,inCourier.key);
        
        orders[index].setReport(orderStatus);
        storage.set(REPORT_KEY,orders[index].getInvoiceNumber(),orders[index].getAll());
        orders.splice(index,1);                
        index = new ctrlIndex(index,orders).inc();
        writeOrder(orders[index]);
        $(".orders-list").html(listOrders(orders));
        showActiveOrder(index); 
    });
})