let storage = new appStorage();
let DESPATCH_KEY = "depatch";
let COURIER_KEY = "courier";
$(function(){
    let orders = storage.get(DESPATCH_KEY).map(a => new Order(a.value));
    var index = 0;
    writeOrder(orders[index]);
    $(".orders-list")
    .html(listOrders(orders))
    .on("click",".show-order", function(e){
        e.preventDefault();
        index = $(this).attr("href").replace("#","");
        writeOrder(orders[index]);
        showActiveOrder(index);
    });
    showActiveOrder(index);

    $(".send-to-customer").on("click",function(e){
        e.preventDefault();
        if (orders.length < 1){
            writeOrder();
            return;
        }
        let courierTracker = $(".tracker-id").val()
        if(courierTracker == ""){
            $(".control-messages").genericError("<div class='text-danger'>обязательно писать номер трекера курьера</div>");
        }else{

            if(storage.get(COURIER_KEY,courierTracker).length){
                $(".control-messages").genericError("<div class='text-danger'>трекер уже используется</div>");
            }else{
                $(".control-messages").html("");
                let inDispatch = storage.get(DESPATCH_KEY).find(a => {
                    return a.value.invoiceNumber == orders[index].getInvoiceNumber();
                });
                storage.remove(DESPATCH_KEY,inDispatch.key);
                orders[index].setTracker(courierTracker);

                storage.set(COURIER_KEY,courierTracker,orders[index].getAll());
                console.log(storage.get(COURIER_KEY));
                orders.splice(index,1);                
                index = new ctrlIndex(index,orders).inc();
                writeOrder(orders[index]);
                $(".orders-list").html(listOrders(orders))
                showActiveOrder(index);
            }
        }
    });
})