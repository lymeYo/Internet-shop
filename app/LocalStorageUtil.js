class LocalStorageUtil {

   getCounterStorage() {
      let counterEachProduct = localStorage.getItem('counterProducts');
      if (counterEachProduct === null)
         return {};
      return (JSON.parse(counterEachProduct))
   }

   setCounterStorage(id, count) {
      let arrCounterProducts = LocalStorageUtil.prototype.getCounterStorage()
      if (count == 0)
         delete arrCounterProducts[id]
      else
         arrCounterProducts[id] = count;

      localStorage.setItem('counterProducts', JSON.stringify(arrCounterProducts))
   }
}

let localStorageUtil = new LocalStorageUtil(); //локальнок хранилище где есть только сет айтем и гет массив элементов




   // getStorageData() {
   //    let currentProducts = localStorage.getItem('products');
   //    if (currentProducts === null) 
   //       return [];
   //    return (JSON.parse(currentProducts))
   // }

   // setStorageData(id) {

   //    let arrProducts = LocalStorageUtil.prototype.getStorageData();
   //    let arrCounterProducts = LocalStorageUtil.prototype.getCounterStorage()
   //    let indexElem = arrProducts.indexOf(id)
   //    if (indexElem != -1) {
   //       arrProducts.splice(indexElem, 1);
   //       LocalStorageUtil.prototype.setCounterStorage(id, 0)
   //    }
   //    else {
   //       arrProducts.push(id);
   //       LocalStorageUtil.prototype.setCounterStorage(id, 1)
   //    }

   //    localStorage.setItem('products', JSON.stringify(arrProducts))
   // }