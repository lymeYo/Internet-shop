class Spinner {
   constructor() {}

   render() {
      let html = ``;
      html = `<img src="/app/img/Spinner-1s-200px.svg" alt="">`;
      ROOT__SPINNER.innerHTML = html
   }

   closeSpinner() {
      ROOT__SPINNER.innerHTML = ``;
   }
}
let ROOT__SPINNER = document.querySelector('.spinner-loader');
let spinner = new Spinner();