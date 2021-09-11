class Products {
   constructor() { }

   renderCatalog(parent) {

      CATALOG.forEach(({ name, id, imgSrc }, ind) => {

         let item = document.createElement('div');
         item.classList.add('assortment__product');
         item.innerHTML = `
         <img src="${imgSrc}" alt="">
         <div class="assortment__product-info">
            <div class="assortment__product-name">${name}</div>
            <div class="assortment__price-area">
               <span class="assortment__product-price">${CATALOG[ind].price}$</span>
               <button class="assortment__product-button " id="order_${ind}"></button>
            </div>
         </div>
         <div class="assortment__product-bg"></div>
         `;
         parent.append(item)

         let currentBtn = document.querySelector(`#order_${ind}`);

         this.initBuyButton(currentBtn, id);

         currentBtn.addEventListener('click', (function () {
            //накидываю ивенты на кнопку покупок, при которых обнуляется колчиство каждаго товара в локал сторадже, смена вида кнопки и текста
            let setFirstStorageCount = +!currentBtn.classList.contains('assortment__product-button_active') //устанавливаю наличие актвиного цвета у кнопки
            LocalStorageUtil.prototype.setCounterStorage(id, setFirstStorageCount);
            this.initProductsCart(currentBtn, id);
            cart.renderCart(); // фоново меняются компоненты скрытой корзины, основываясь на локал сторадже
            this.initBuyButton(currentBtn, id);
         }).bind(this));
      })
   }

   initBuyButton(currentBtn, id) {
      if (LocalStorageUtil.prototype.getCounterStorage()[id]) {
         currentBtn.textContent = 'TO CART';
         currentBtn.classList.add('assortment__product-button_active')
      } else {
         currentBtn.textContent = 'BUY NOW';
         currentBtn.classList.remove('assortment__product-button_active')
      }
   }

   initProductsCart() {
      // счетчик суммы и количества товаров возле иконки корзины из локал стораджа
      let cartCount = document.querySelector('#cart-count');
      let cartPrice = document.querySelector('#cart-price');
      let storageCounterProducts = LocalStorageUtil.prototype.getCounterStorage();
      let storageProducts = Object.keys(storageCounterProducts); //собираю все айдишки объектов в массиве локал стораджа
      let totalSum = CATALOG.reduce((lastRes, product) => {
         if (storageProducts.includes(product.id)) {
            return lastRes += product.price * storageCounterProducts[product.id];
         }
         return lastRes;
      }, 0);
      cartCount.textContent = (storageProducts.length) ? storageProducts.length : "";
      cartPrice.textContent = totalSum + '$';
   }
}

let products = new Products(); //создаю объект продуктов: прорисовка на страницу, перевод товара в локалку, кнопки и счетчик товаров