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
  headerCityBtn.textContent = city
  localStorage.setItem('lomoda-location',city)
});