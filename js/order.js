function Order(){
    let paymentMethods = ["кредитная карта", "наличие при доставка","кошелек киви", "кошелек яндекс"];
    let strObj, invoicenum, item, buyer, address, qty, price, index , tel, date;
    var tracker,report;
    if(typeof(arguments[0]) === typeof("")){
        invoicenum = Math.floor(Math.random()*10000);
        item = arguments[0];
        buyer = arguments[1];
        address = arguments[2];
        qty = 1 + Math.floor(Math.random()*10);
        price = (Math.random()*10000).toFixed(2);
        index = Math.floor(Math.random()*10)%paymentMethods.length;
        tel = "+7 " + Math.floor(Math.random()*10000000); 
        date = new Date().getTime();
        tracker = "";
        report = "";
    }else{
        strObj = arguments[0];
        invoicenum = strObj["invoiceNumber"];
        item = strObj["item"];
        buyer = strObj["buyer"];
        address = strObj["address"];
        qty = strObj["quantity"];
        price = strObj["price"];
        index = paymentMethods.indexOf(strObj["paymentMethod"]);
        tel = strObj["contact"]; 
        date = strObj["date"];
        tracker = strObj["tracker"] || "";
        report = strObj["report"] || "";
    }
    

    this.getInvoiceNumber= () => invoicenum;
    this.getName = () => item;
    this.getPrice = () => '<i class="fa fa-rouble"></i> ' + price;
    this.getQuantity = () => qty;  
    this.getTotalPrice = () =>  '<i class="fa fa-rouble"></i> ' + (price * qty).toFixed(2);
    this.getPaymentStatus = () => (index === 1) && "<span class='text-danger'>не оплачена</span>" || "<span class='text-success'> оплачена</span>";  
    this.getPaymentMethod = () => paymentMethods[index];
    this.getBuyer = () => buyer;
    this.getAddress = () => address;
    this.getContact = () => tel;
    this.getInvoiceDate = () => date;
    this.getTracker = () => tracker;
    this.getReport = () => report;
  
    this.setTracker = (tr) => tracker = tr;
    this.setReport = (rp) => report = rp;
    let that = this;
    this.getAll = () => {
        return {
            "invoiceNumber" : that.getInvoiceNumber(),
            "item" : that.getName(),
            "quantity" : that.getQuantity(),
            "price" : price,
            "paymentMethod" : that.getPaymentMethod(),
            "buyer" : that.getBuyer(),
            "address" : that.getAddress(),
            "contact" : that.getContact(),
            "date" : that.getInvoiceDate(),
            "tracker" : that.getTracker(),
            "report" : that.getReport()
        };
    }
    
    this.toString = () => {        
        return JSON.stringify(that.getAll());
    }
  }
function listOrders(){
    let orders = arguments[0];
    let html = orders.map((a,i) => {
        return "<a href='#"+i+"' id='order_num_"+i+"' class='card p-1 m-2 show-order'>"+a.getInvoiceNumber() + " " + a.getTracker() +"<a>";
    }).join("");
    return html;
}
function writeOrder(){
    if(!arguments[0]){
      $(".order-number").html("");
      $(".order-item").html("");
      $(".order-quantity").html("");
      $(".order-price").html("");
      $(".order-total").html("")
      $(".order-client").html("");
      $(".order-contact").html("");
      $(".order-address").html("");
      $(".order-delivery-method").html("");
      $(".order-paid-status").html("");
      $(".order-date").html("");
      $(".order-tracker").html("");
      $(".order-report").html("");
      return;
    }
    let order = arguments[0];
    $(".order-number").html(order.getInvoiceNumber());
    $(".order-item").html(order.getName());
    $(".order-quantity").html(order.getQuantity());
    $(".order-price").html(order.getPrice());
    $(".order-total").html(order.getTotalPrice())
    $(".order-client").html(order.getBuyer());
    $(".order-contact").html(order.getContact());
    $(".order-address").html(order.getAddress());
    $(".order-delivery-method").html(order.getPaymentMethod());
    $(".order-paid-status").html(order.getPaymentStatus());
    $(".order-date").html(fullDateTime(order.getInvoiceDate()));
    $(".order-tracker").html(order.getTracker());
    $(".order-report").html(order.getReport());
  } 
  