const headerCityBtn = document.querySelector('.header__city-button');

// if(localStorage.getItem('lomoda-location')){
//   headerCityBtn.textContent = localStorage.getItem('lomoda-location')
// }

//тернарный оператор укорачивает условие выше
headerCityBtn.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?'

// let save = localStorage.getItem('lomoda-location');
// console.log('save',save);

headerCityBtn.addEventListener('click', () => {
  const city = prompt('Укажите ваш город');
  //условие при кнопке "Отмена" в prompt,и если в данные попадает null
  if(city && city !== null){
      headerCityBtn.textContent = city
      localStorage.setItem('lomoda-location',city)
  } else {
    headerCityBtn.textContent = 'Ваш город?'
  }
});

//смена атрибутов
const footerLink = document.querySelectorAll('.footer__link')[0]
let attr = footerLink.getAttribute('href')
let link = footerLink.setAttribute('href','https://www.youtube.com/watch?v=KDCOXFCoWEI')//меняю старую
footerLink.setAttribute('target','_blank') //добавляю новый атрибут
console.log(footerLink.getAttribute('href'))

/* непонятные свойства внес в переменные */
// document.body.offsetWidth обращение к документу в ширину не входит скролл поэтому 1349px
//  const widthScrool = document.body.offsetWidth 
//  console.log('widthScrool: ', widthScrool)
// const scroolWay = window.scrollY
// console.log('scroolWay: ', scroolWay)
// const scroolWay2 = document.body.dbScroolY
// console.log('scroolWay2: ', scroolWay2)

 
//блокировка скролла
const disableScrool = () => {
 const widthScrool = window.innerWidth - document.body.offsetWidth 
 document.body.dbScroolY = window.scrollY
 /* 1-й вариант написания */
//  document.body.style.overflow = "hidden"
//  document.body.style.paddingRight = widthScrool + "px"
/* 2-й вариант написания */
document.body.style.cssText = `
  overflow: hidden;
  top: ${-window.scrollY}px;
  left: 0;
  padding-right: ${widthScrool}px;
  position: fixed;
  width: 100%;
  height: 100vh; 

`
/* 
position: fixed *
  width: 100%;
  height: 100vh; для кроссбраузерности и айфонов
   */

}

const enableScrool = () => {
  document.body.style.overflow = ""
  /* 1-й вариант написания */
  // document.body.style.paddingRight = ""
  /* 2-й вариант написания */
  document.body.style.cssText = ``
  window.scrollTo({
    top:document.body.dbScroolY
  })


}
//блокировка скролла

 /* модальное окно при клике на корзину */
const subheaderCart = document.querySelector('.subheader__cart')
const modal = document.querySelector('.cart-overlay')
const closeModal = document.querySelector('.cart__btn-close')

subheaderCart.addEventListener('click',() => {
  modal.classList.add('cart-overlay-open')
  disableScrool()
})

closeModal.addEventListener('click',() => {
  modal.classList.remove('cart-overlay-open')
  enableScrool()
})
/* закрытие окна через делегирование кликов вне окна */
modal.addEventListener('click',event => {
  console.log(event)
  if(event.target.classList.contains('cart-overlay-open')){
    modal.classList.remove('cart-overlay-open')
     enableScrool()
  }
})

