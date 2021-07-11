const headerCityBtn = document.querySelector('.header__city-button');

// if(localStorage.getItem('lomoda-location') && (localStorage.getItem('lomoda-location')) !== null){
//   headerCityBtn.textContent = localStorage.getItem('lomoda-location')
// } else if(localStorage.getItem('lomoda-location') === null) {
//   headerCityBtn.textContent = "Ваш город?"
// } else {
//   headerCityBtn.textContent = "Ваш город?"
// }

//тернарный оператор укорачивает условие выше
let localCity = localStorage.getItem('lomoda-location')
headerCityBtn.textContent = localCity && localCity !== null ? localStorage.getItem('lomoda-location') : localCity === null ? "Ваш город?" : "Ваш город?"

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

/* ненужный код */
// let x = 0
// let insert = setInterval(function(){
// console.log(++x)
// },5000)

// setInterval(function(){
//   clearInterval(insert)
// },25000)


// Два варианта добавления данных
// localStorage.userName = "Петя"
// localStorage.setItem("favoriteColor", "чёрный")

// После добавления в localStorage, они будут там
// до тех пор, пока их явно не удалить
// console.log(`${localStorage.userName} предпочитает ${localStorage.favoriteColor} цвет.`);

// А теперь удалим данные из хранилища
// localStorage.removeItem("userName")
// localStorage.removeItem("favoriteColor")

// CLIENT => SERVER => DATABASE => SERVER => CLIENT
// console.log('Клиент: хочу получить список пользователей')
// console.log('...')

// setTimeout(function(){
//   console.log('Сервер: запрашиваю вывод пользователей у Базы Данных')
//   console.log('...')
//   setTimeout(()=>{
//     console.log('База данных : формирую список пользователей и отдаю серверу')
//     console.log('...')
//     setTimeout(() => {
//     console.log('Сервер : трансформирую данные для клиента')
//     console.log('...')
//     setTimeout(()=>{
//       console.log('Клиент:получил данные и отображаю их')
//     },2000)
//     },1000)
//   },1000)
// },2000)

// callback простой пример
// function test(age,back){
//   console.log('Мне '+ age + ' Лет')
//  back()
// }
// test(355, function(){
// console.log('Сработала 2-ая функция')
// })

/* ненужный код */

// запрос базы данных,универсальная функция
const getData = async () => {
  const data = await fetch('db.json')
  // console.log('data: ', data)
  if(data.ok){
    return data.json()
  } else {
    throw new Error(`Данные не были получены потому что вы дебил,статус ошибки ${data.status} ${data.statusText}`)
  }

}
// getData()
// console.log('getData(): ', getData())

// запрос базы данных, функция для товаров
const getGoods = (callback) => {
// обработка ошибок и обработка функции,вывод массива
  getData()
  .then(data => {
    console.log('Вызов даты:',data)
    callback(data)
  })
  .catch(err => {
    console.error(err)
    console.warn('Сервер недоступен')
    })
}

getGoods((data) => {
  console.warn(data)
})

// try{
//   const goodsList = document.querySelector('.goods__list')
//   if(!goodsList){
//     throw 'Это не страница с товарами'
//   }

//   //функция получающая данные и формирующая карточки товаров
//   const createdCard = data => {
//     const li = document.createElement('li')

//     li.classList.add('goods__item')

//     li.innerHTML = `
//       <article class="good">
//       <a class="good__link-img" href="card-good.html#id56454">
//           <img class="good__img" src="goods-image/AD002EMLUEA8_14164246_1_v1.jpg" alt="">
//       </a>
//       <div class="good__description">
//           <p class="good__price">2890 &#8381;</p>
//           <h3 class="good__title">Eazyway <span class="good__title__grey">/ Тайтсы</span></h3>
//           <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">40 42 44 46</span></p>
//           <a class="good__link" href="card-good.html#id56454">Подробнее</a>
//       </div>
//       </article>
//     `
//     return li
//   }

//   /* функция рендера карточек товара */
//   const renderGoodsList = (data) => {
//     console.log('data 226',data)
//   }

//   getGoods(renderGoodsList)

// } catch(err){
//   console.warn(err)
// }
