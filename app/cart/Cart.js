class Cart {
   constructor() {
      this.cartWrapper = document.querySelector('.cart-products-wrapper')
      this.cartOpenIcon = document.querySelector('.header-content__cart');
      this.cartCloseIcon = document.querySelector('#cart-close-icon');
      this.sumArea = document.querySelector('#total-sum-cart');
      this.listProducts = document.querySelector('.cart-products__items-list');

      this.cartOpenIcon.addEventListener('click', () => {
         this.cartWrapper.classList.add('active');
         document.body.style.overflow = 'hidden';
      })
      this.cartCloseIcon.addEventListener('click', () => {
         this.cartWrapper.classList.remove('active');
         document.body.style.overflow = 'auto';
      })
   }

   renderCart() {
      let storageCounterProducts = LocalStorageUtil.prototype.getCounterStorage(); // 
      let storageProducts = Object.keys(storageCounterProducts);
      let html = ``;
      let sum = 0;

      CATALOG.forEach((product) => {
         let curId = product.id;
         if (storageProducts.includes(curId)) {
            html += `
               <li class="cart-products__item" data-id ="${curId}">
                  <div class="count-product-self">${storageCounterProducts[curId]}</div>
                  <div class="name-product-self">${product.name}</div>
                  <div class="price-product-self">${product.price}$</div>
                  <div class="up-down-counter-product-self">
                     <span class="up-counter-product-self material-icons">add</span>
                     <span class="down-counter-product-self material-icons">remove</span>
                  </div>
               </li>
            `
            sum += product.price * storageCounterProducts[curId];
         }
      })

      this.listProducts.innerHTML = (html == ``) ? `Корзина пуста` : html;
      this.sumArea.textContent = sum + '$';
   }

   initSumCartProducts() {

      this.listProducts.addEventListener('click', (event) => {
         let itemProduct = event.target.closest('.cart-products__item');
         let storageCounterProducts = LocalStorageUtil.prototype.getCounterStorage()
         if (event.target.classList.contains('up-counter-product-self')) {
            let idProduct = itemProduct.getAttribute('data-id');
            let count = storageCounterProducts[idProduct];
            LocalStorageUtil.prototype.setCounterStorage(idProduct, ++count)
            this.renderCart();
            products.initProductsCart();
         }
         if (event.target.classList.contains('down-counter-product-self')) {
            let idProduct = itemProduct.getAttribute('data-id');
            let count = storageCounterProducts[idProduct];
            LocalStorageUtil.prototype.setCounterStorage(idProduct, --count)
            if (count == 0) {
               products.initBuyButton(document.querySelector(`#order_${idProduct.slice(idProduct.length - 1)}`), idProduct)
            }
            this.renderCart();
            products.initProductsCart();
         }
      })
   }

   deleteElem(id) {
      LocalStorageUtil.prototype.setStorageData(id)
      this.renderCart();
      products.initBuyButton(document.querySelector(`#order_${id.slice(id.length - 1)}`), id)
   }
}

let cart = new Cart() //создаю объект корзины: количество купленных товаров, счетчик на них