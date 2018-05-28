let fs = require("fs");
let CONFIG_FILE = "resources/config.json"
let CONFIG = JSON.parse(fs.readFileSync(CONFIG_FILE));
var restAPI = CONFIG["REST"]["url"] + ":" 
                + CONFIG["REST"]["port"];
let ORDER_STATUSES = CONFIG["ORDERS"]["statuses"];

let storage = new appStorage();
let REPORT_KEY = "order-report";

$(function(){
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
    
    $(".filter-reports")
        .html(orderOptions)
        .on("change",function(){
            filter["orders"]["status"] = $(this).val();
            loadView();
        });

    let today = new Date();
    let filter =  {
        "orders" : {
            "status": $(".filter-reports").val(),
            "afterDate" : new Date(today.getFullYear(),today.getMonth(),today.getDate() - 1 ).getTime(),
            "beforeDate" : new Date(today.getFullYear(),today.getMonth(),today.getDate() + 1).getTime()
        }
    }   
    
    loadView();
    function loadView(){
        let orders = storage
                    .get(REPORT_KEY)
                    .map(a => new Order(a.value))
                    .filter(a => {
                        return a.getReport() == filter.orders.status
                            && a.getInvoiceDate() >= filter.orders.afterDate
                            && a.getInvoiceDate() <= filter.orders.beforeDate;
                    }); 

        var index = 0;
        writeOrder(orders[index]);
        showActiveOrder(index);
        $(".orders-list")
        .html(listOrders(orders))
        .on("click",".show-order", function(e){
            e.preventDefault();
            index = $(this).attr("href").replace("#","");
            writeOrder(orders[index]);
            showActiveOrder(index);
        });
    } 
    var dateErrorTimeout;
    $('[data-toggle="datepicker"]').datepicker({
        format:"yyyy-mm-dd",
        autoPick : true,
        autoHide : true
    }).on('pick.datepicker', function (e) {
        if(($(e.currentTarget).attr("id") == "enddate"
            && e.date < $("#startdate").datepicker('getDate')) 
        || e.date > new Date()){
            e.preventDefault();
            handleDateError("Конечная дата может быть только датой позже выбранной начальной даты, но не позднее текущей даты");
            return;                      
        }
        if ($(e.currentTarget).attr("id") == "startdate"
        && e.date > $("#enddate").datepicker('getDate')){
            e.preventDefault();
            handleDateError("Начальная дата может быть только датой раньше текущей и раньше выбранной конечной даты");   
            return;  
        }
        filter.orders.afterDate = $("#startdate").datepicker('getDate').getTime();
        let incEnd = $("#enddate").datepicker('getDate');

        filter.orders.beforeDate = new Date(incEnd.getFullYear(),incEnd.getMonth(), incEnd.getDate() + 1);
        loadView()
        function handleDateError(msg){
            if(dateErrorTimeout)
            clearTimeout(dateErrorTimeout);
            $(".dates-helpful-info").addClass("hidden")
            $(".date-error").html(msg).removeClass("hidden");
            dateErrorTimeout = setTimeout(function(){
                $(".date-error").html("").addClass("hidden");
                $(".dates-helpful-info").removeClass("hidden")
            },3000);
            
        }
    }); 
})