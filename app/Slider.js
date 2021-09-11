class Slider {
   constructor(btnNext, btnPrev, slidesId) {
      this.btnNext = document.querySelector(btnNext);
      this.btnPrev = document.querySelector(btnPrev);
      this.slides =  Array.from(document.querySelectorAll(slidesId));
      this.points = Array.from(document.querySelectorAll('.slider-points > li'));
      this.slideNow = 3;
      
      this.btnNext.addEventListener('click', () => this.sliderRender.call(this, (this.slideNow + 1), true))
      this.btnPrev.addEventListener('click', () => this.sliderRender.call(this, (this.slideNow - 1), true))
   }

   sliderRender(slidesOrder, checkUserTap) {
      // console.log(this.slideNow);
      slidesOrder == 5 ? slidesOrder = 0 : 0;
      slidesOrder == -1 ? slidesOrder = 4 : 0;
      this.slides[this.slideNow].classList.remove('active');
      this.slides[slidesOrder].classList.add('active');
      this.points[this.slideNow].classList.remove('active');
      this.points[slidesOrder].classList.add('active');
      this.slideNow = slidesOrder;

      if (checkUserTap) {
         clearInterval(this.sliderActiveId);
         setTimeout(sliderActiveInterval.bind(this), 10000)
      }
   }

   sliderActiveInterval() {
      this.sliderActiveId = setInterval(() => {
         this.sliderRender(this.slideNow + 1)
      }, 5000)
   }
}

let slider = new Slider('.slider-swipe-next', '.slider-swipe-prev', '.shop-slide')