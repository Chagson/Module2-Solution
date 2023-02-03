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
}





function ShoppingListCheckOffService(){
  var service = this;
  var ErrorCheck = 0;


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
  service.getToBuyItems = function() {
      return ToBuyItems;
  };


}




})();
