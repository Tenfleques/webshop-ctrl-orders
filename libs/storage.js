function appStorage(){
    this.set = function (store, key, value){
        //in the mean time localstorage 
        var existing = localStorage.getItem(store);
        if(existing){
            existing = JSON.parse(existing);
        }else{
            existing = [];
        }
        var replaced = false;
        for(var i in existing){
            if(existing[i].key == key){
                replaced = true;
                existing[i].value =  value;
                break;
            }
        }
        if(!replaced){
            existing.push({
                "key" : key,
                "value" : value
            })
        }        
        localStorage.setItem(store,JSON.stringify(existing));
    }
    this.get = function (store){
        var existing = localStorage.getItem(store);
        if(existing){
            existing = JSON.parse(existing);
            if(arguments[1])
                return existing.find((val)=>val.key == arguments[1]) || [];
            return existing;
        }
        return [];
    }
    this.remove = function(store, key){
        var existing = localStorage.getItem(store);
        if(existing){
            let data = JSON.parse(existing);
            let record = data.find(a => a.key == key);
            let index = data.indexOf(record);
            if(index > -1)
                data.splice(index,1);
            localStorage.setItem(store,JSON.stringify(data));
        }
    }
}