'use strict'

class ErrorJsonData extends Error {
   constructor(message) {
      super(message);
   }
}

spinner.render();

//искуственные AJAX запросы
let CATALOG;

function renderErrorLoad() {
   const infoErrorLoad = document.querySelector('.assortment__info-error');
   infoErrorLoad.classList.toggle('active');
}

function renderPage() {

   slider.sliderActiveInterval();

   cart.renderCart()
   cart.initSumCartProducts()

   products.renderCatalog(document.querySelector('.assortment'))

   products.initProductsCart();


   function footerLinks() {
      let names = ['MENS STORE', 'WOMEN STORE', 'Quick LINKS'];
      for (let i = 0; i < 3; i++) {
         document.querySelector('.footer__content-row').innerHTML += `
      <div class="footer__links">
         <div class="footer__title">${names[i]}</div>
         <ul class="footer__list">
            <li>Alexis Hudson</li>
            <li>American Apparel</li>
            <li>Ben Sherman</li>
            <li>Big Buddha</li>
            <li>Chanel</li>
            <li>Christian Audigier</li>
            <li>Coach</li>
            <li>Cole Haan</li>
         </ul>
      </div>
      `
      }
   }
   footerLinks()

   function assortmentBtnOver() {
      let sliderBtns = Array.from(document.querySelectorAll('.shop-slide__button'))
      sliderBtns.forEach(btn => {
         btn.addEventListener('mouseover', () => {
            sliderBtns.forEach(btnInner => {
               btnInner.style.backgroundColor = '#40b1a9';
            })
         })
         btn.addEventListener('mouseout', () => {
            sliderBtns.forEach(btnInner => {
               btnInner.style.backgroundColor = '#3ec0b8';
            })
         })
      })

      let btns = Array.from(document.querySelectorAll('.assortment__product-button'));
      btns.forEach((btn, ind) => {
         btn.addEventListener('mouseover', () => {
            btn.closest('.assortment__product').style.borderBottom = '5px solid #38a07d';
         });

         btn.addEventListener('mouseout', () => {
            btn.closest('.assortment__product').style.borderBottom = '5px solid #3cc395';
         })
      })
   }
   assortmentBtnOver()

   // console.log(document.querySelector('.nav-assortment-burger').querySelectorAll('*'));

   function addContentForDeviceTouch() {
      if (document.body.classList.contains('_touch') || document.documentElement.offsetWidth < 1000) {
         let menuElems = Array.from(document.querySelector('.upper-menu').querySelectorAll('*'))
         menuElems.forEach(elem => elem.className = elem.className + '-burger');
         document.querySelector('.header-content__menu-burger').style.display = 'block';
      }

   }
   addContentForDeviceTouch()

   function openSidebarMenu() {
      let menuWrapper = document.querySelector('.nav-assortment-burger')
      let menuIcon = document.querySelector('.header-content__menu-burger > span');
      let setMenuIconOnPage = document.querySelector('.header-content__menu-burger');
      menuIcon.addEventListener('click', () => {
         menuWrapper.classList.toggle('active');
         menuIcon.classList.toggle('active');
         setMenuIconOnPage.classList.toggle('.active')
      })
      document.querySelector('.main').addEventListener('click', (event) => {
         if (!menuWrapper || event.target.closest('.upper-menu')) return;
         menuWrapper.classList.remove('active')
         menuIcon.classList.remove('active');
         setMenuIconOnPage.classList.remove('.active')
      })
   }
   openSidebarMenu()

   window.addEventListener('scroll', () => {
      let coordsAfterSlider = document.querySelector('.assortment-wrapper').getBoundingClientRect()
      let header = document.querySelector('.header');
      if (coordsAfterSlider.top < header.offsetHeight) {
         header.classList.add('active-shadow');
      } else {
         header.classList.remove('active-shadow');
      }

   })
}

async function renderRequestCatalog() {
   try {
      let responce = await fetch('server/catalog.json'); // 'http://myjson.dit.upm.es/api/bins/f43'
      if (!responce.ok) throw new ErrorJsonData('Ошибка данных')
      CATALOG = await new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(responce.json());
         }, 1000);
      }) 
   }
   catch(e) {
      if (!(e instanceof ErrorJsonData)) throw e
      
      document.body.innerHTML = e.message;
   }
   finally {
      spinner.closeSpinner()
      renderPage();
   }
}

renderRequestCatalog()


//Test task from learnjs
//1)
// setListFromArr()
function setListFromArr() {
   let data = {
      "Рыбы": {
         "форель": {},
         "лосось": {}
      },

      "Деревья": {
         "Огромные": {
            "секвойя": {},
            "дуб": {}
         },
         "Цветковые": {
            "яблоня": {},
            "магнолия": {}
         }
      }
   };
   let list = document.querySelector('.test-task');
   let lastParent = list;

   function setElemsInList(curData, curList) {
      for (let [key, value] of Object.entries(curData)) {
         let checkTypeItem = Object.values(value).length == 0;

         let itemType = checkTypeItem ? 'li' : 'ul';
         let item = document.createElement(itemType);
         item.textContent = key + " - " + itemType;
         curList.append(item);

         if (!checkTypeItem) setElemsInList(value, item);

      }
   }
   setElemsInList(data, list);
   
   // data.forEach((item) => {
   //    let li = document.createElement('li');
   //    li.textContent = item
   //    list.append()
   // })
}

//2)

function setCountInnerItems() {
   let totalLen;

   function countInnerItemsWrapper(item) {
      let totalLen = 0;
      function countInnerItems(item) {
         for (let innerItem of item.children) {
            if (innerItem.children.length > 0) {
               countInnerItems(innerItem)
            }
            else {
               totalLen++;
            }
         }
      }  
      countInnerItems(item)
      return totalLen;
   }
   let orderLi = [...document.querySelectorAll('.test-task li')];
   console.log(orderLi);
   
   orderLi.forEach(li => {
      let listForLi = [...li.children];
      
      if (!li.firstElementChild) {
         li.prepend(`[${0}]`)
         return;
      }

      
      li.prepend(`[${countInnerItemsWrapper(li)}]`)
   })

   // let listOfLi = list.filter(li => li.nextElementSibling.tagName == 'UL')
   
}