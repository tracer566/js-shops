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

const footerLink = document.querySelectorAll('.footer__link')[0]
console.log(footerLink.getAttribute('href'))