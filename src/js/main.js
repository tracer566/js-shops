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
const getGoods = (callback,prop,value) => {
// обработка ошибок и обработка функции,вывод массива
  getData('db.json')//вызов 2-ой функции,ключевая пока в callback и не вызоветься пока данные не будут получены
  .then(data => {
    console.log('Вызов даты:',data)
    // стало:добавилось условие и фильтр по категориям
    if(value){
      callback(data.filter(item => item[prop] === value))
    } else {
      callback(data)
    }

    try{
      let goodsTitle = document.querySelector('.goods__title')
      if(!goodsTitle){
    throw 'Это не страница с товарами 2'
  }

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


// страница категорий товара
try{
  const goodsList = document.querySelector('.goods__list')
  if(!goodsList){
    throw 'Это не страница с товарами'
  }

  const goodsTitle = document.querySelector('.goods__title') 

  const changeTitle = () => {
    goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent
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
    getGoods(renderGoodsList,'category',hash)
    changeTitle()
  })

  changeTitle()
  getGoods(renderGoodsList,hash)/* ключевая функция с нее идет цепочка,когда она получит данные с date то заработает */

} catch(err){
  console.warn(err)
}


//формирование страниц каждого товара
try{
  if(!document.querySelector('.card-good')){
 throw "Это не страница карточки товара"
  }

const cardGoodImage = document.querySelector('.card-good__image')
const cardGoodBrand = document.querySelector('.card-good__brand')
const cardGoodTitle = document.querySelector('.card-good__title')
const cardGoodPrice = document.querySelector('.card-good__price')
const cardGoodColor = document.querySelector('.card-good__color')
const cardGoodColorList = document.querySelector('.card-good__color-list')
const cardGoodSizes = document.querySelector('.card-good__sizes')
const cardGoodSizesList = document.querySelector('.card-good__sizes-list')
const cardGoodBuy = document.querySelector('.card-good__buy')
const cardGoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper')

const generateList = data => data.reduce((html,item,i) => html + 
`<li class="card-good__select-item" data-id="${i}">${item}</li>`,'')


const renderCardGood = ([{brand,name,cost,color,sizes,photo}]) => {
    cardGoodImage.src = `goods-image/${photo}`
    cardGoodImage.alt = `${brand} ${name}`
    cardGoodBrand.textContent = brand
    cardGoodTitle.textContent = name
    cardGoodPrice.textContent = `${cost} р`
    if(color){
      cardGoodColor.textContent = color[0]
      cardGoodColor.dataset.id = 0
      cardGoodColorList.innerHTML = generateList(color)
    } else {
      cardGoodColor.style.display = "none"
    }
    if(sizes){
      cardGoodSizes.textContent = sizes[0]
      cardGoodSizes.dataset.id = 0
      cardGoodSizesList.innerHTML = generateList(sizes)
    } else {
      cardGoodSizes.style.display = "none"
    }
}

cardGoodSelectWrapper.forEach(item => {
  item.addEventListener('click',e => {
    const target = e.target
    console.log(target)

    //closest тоже что и classList.contains
    if(target.closest('.card-good__select')){
      target.classList.toggle('card-good__select__open')
    }

    if(target.closest('.card-good__select-item')){
      const cardGoodSelect = item.querySelector('.card-good__select')
      cardGoodSelect.textContent = target.textContent
      cardGoodSelect.dataset.id = target.dataset.id
      cardGoodSelect.classList.remove('card-good__select__open')
    }
    
  })

})

getGoods(renderCardGood,'id',hash)

}
catch(error){
  console.log('error страницы товара:',error)
}

