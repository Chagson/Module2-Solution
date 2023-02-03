(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    
ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    
    
    
    
function ToBuyController(ShoppingListCheckOffService){
  var itemAder = this;
    
    itemAder.items = ShoppingListCheckOffService.getToBuyItems();
    
    itemAder.addBoughtItems = function(item){
        try {
                ShoppingListCheckOffService.addBoughtItems(item);
            } catch(error) {
            itemAder.ErrorMessage = error.message;
            }
    };    
}
    
function AlreadyBoughtController(ShoppingListCheckOffService){
  var showList = this;
  showList.items = ShoppingListCheckOffService.getBoughtItems();
    try {
    showList.ErrorGetter = ShoppingListCheckOffService.getBoughtItemsError();
    } catch(error){
        showList.ErrorMessage = error.message;
    }
}

    
    
    
    
function ShoppingListCheckOffService(){
  var service = this;
  var ErrorCheck = 0;  
    
  service.getErrorCheck = function(){
  return ErrorCheck;
  };
    
    
  var ToBuyItems = [{name : "cookies" ,
      quantity:10},{name : "cookies" ,
      quantity:10}];
  var boughtItems = [];
    
    
  service.addBoughtItems = function (item){
      boughtItems.push(ToBuyItems[item]);
      ToBuyItems.splice(item, 1);
      if(ToBuyItems.length == 0){
      throw new Error("Everything is bought!");
      }
  };
  service.getBoughtItems = function() {
      return boughtItems;
  };
    service.getBoughtItemsError = function() {
        if(boughtItems.length == 1){
      throw new Error("Nothing is bought!");
            console.log(boughtItems.length);
      }
        return boughtItems;
  };
  service.getToBuyItems = function() {
      return ToBuyItems;
  };  
    
    
}
    
    
    
    
})();
