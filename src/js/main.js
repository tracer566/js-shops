const headerCityBtn = document.querySelector('.header__city-button');

/* определение хэша страницы */
let hash = location.hash.substr(1)
console.log('hash: ', hash)

//тернарный оператор укорачивает условие выше
let localCity = localStorage.getItem('lomoda-location')
headerCityBtn.textContent = localCity && localCity !== null 
? localStorage.getItem('lomoda-location') : localCity === null ? "Ваш город?" : "Ваш город?"

// let save = localStorage.getItem('lomoda-location');
// console.log('save',save);

headerCityBtn.addEventListener('click', () => {
  const city = prompt('Укажите ваш город')
  //условие при кнопке "Отмена" в prompt,и если в данные попадает null
  if(city && city !== null && city.trim()){
      headerCityBtn.textContent = city
      localStorage.setItem('lomoda-location',city)
  } else {
    headerCityBtn.textContent = 'Ваш город?'
  }
});

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
if(document.disableScrool) return
 const widthScrool = window.innerWidth - document.body.offsetWidth 
 document.disableScrool = true
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
  document.disableScrool = false
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

// запрос базы данных,универсальная функция
const getData = async (server) => {
  const data = await fetch(server)
  console.log('data fetch: ', data)
  if(data.ok){
    return data.json()
  } else {
    throw new Error(`Данные с сервера не были получены,статус ошибки ${data.status} ${data.statusText}`)
  }

}
// getData()
// console.log('getData(): ', getData())

// запрос базы данных, функция для товаров
const getGoods = (callback,value) => {
// обработка ошибок и обработка функции,вывод массива
  getData('db.json')//вызов 2-ой функции,ключевая пока в callback и не вызоветься пока данные не будут получены
  .then(data => {
    console.log('Вызов даты:',data)
    // стало:добавилось условие и фильтр по категориям
    if(value){
      callback(data.filter(item => item.category === value))
    } else {
      callback(data)
    }

    try{
      let goodsTitle = document.querySelector('.goods__title')
      if(!goodsTitle){
    throw 'Это не страница с товарами 2'
  }
    goodsTitle.textContent = value === 'men' 
    ? 'Мужчинам' 
    : value === 'woman'
    ? 'Женщинам'
    : value === 'kids'
    ? 'Детям' 
    : 'Женщинам'

    }
    catch{
      console.log('Ошибка табов обработана')
    }
    // callback(data)/* было:вызываеться callback функция renderGoodsList и передаються данные в date,в этом месте функция выполнит свое действие */
  })
  .catch(err => {
    console.error('err333',err)
    console.warn('Сервер недоступен')
    })
}

getGoods((data) => {
  console.warn(data)
})

try{
  const goodsList = document.querySelector('.goods__list')
  if(!goodsList){
    throw 'Это не страница с товарами'
  }
  //функция получающая данные и формирующая карточки товаров
  const createdCard = data => {
    // console.log('после forEach, что получает эта функция',data)
    /*деструктуризация вместо переменных ниже  */
    const {id,photo,preview,cost,brand,category,name,sizes } = data

    const li = document.createElement('li')
    li.classList.add('goods__item')
    li.innerHTML = `
      <article class="good">
      <a class="good__link-img" href="card-good.html#${id}">
          <img class="good__img" src="goods-image/${preview}" alt="">
      </a>
      <div class="good__description">
          <p class="good__price">${cost} &#8381;</p>
          <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
          ${sizes ? 
            `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(" ")}</span></p>`
            : ''}
          <a class="good__link" href="card-good.html#${id}">Подробнее</a>
      </div>
      </article>
    `
    return li
  }

  /* функция рендера карточек товара */
  const renderGoodsList = (data) => {
    goodsList.textContent = ''
    /* 1 способ перебора массива data */
    // for(let i = 0;i < data.length;i++){
    //   console.log('вывод через цикл for:',data[i])
    // }
/* 2 способ перебора массива data */
    // for(const item of data){
    //   console.log('вывод через цикл for/of:',item)
    // }
/* 3 способ перебора массива data */
    data.forEach((elem,index,arr)=>{
      // console.log('index:',index,'elem:',elem,'arr:',arr)
      const card = createdCard(elem)
      goodsList.append(card)

    })
  }

  window.addEventListener('hashchange',() => {
    hash = location.hash.substr(1)
    getGoods(renderGoodsList,hash)
  })

   getGoods(renderGoodsList,hash)/* ключевая функция с нее идет цепочка,когда она получит данные с date то заработает */

} catch(err){
  console.warn(err)
}

const arr = ['Фриланс','Воровство','Терроризм','Грабеж']

console.log('arr',arr)
console.log('arr join:',arr.join('#'))

let hash2 = location
console.log('hash2: ', hash2)
