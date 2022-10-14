

window.addEventListener('DOMContentLoaded', () => {

//  tabs
  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');


  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show','fade');
    });

    tabs.forEach( (item) => {
      item.classList.remove('tabheader__item_active')
    })

  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show','fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active')
    
  }

  hideTabContent();
  showTabContent();


  tabsParent.addEventListener('click', (e) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) =>{
          if (target == item){
            hideTabContent();
            showTabContent(i);
          }
        });
    }
    
  });
  // times

  const deadline = '2021-09-09'

    function getTimeRemaining(endTime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endTime) - Date.parse(new Date());



      if (t <= 0){
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      } else{

      days = Math.floor(t / (24 * 60 * 60 * 1000));
      hours = Math.floor( t / (60 * 60 * 1000 ) % 24 )
      minutes = Math.floor( t / (1000*60) % 60 )
      seconds = Math.floor( t / (1000) % 60 )
      }
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds':seconds

      }
      
    }

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`
      } else {
        return num;
      }
    }

    function setClock(selector, endTime) {
      const times = document.querySelector(selector),
      days = times.querySelector('#days'),
      hours = times.querySelector('#hours'),
      minutes = times.querySelector('#minutes'),
      seconds = times.querySelector('#seconds');


      timeInterval = setInterval(updateClock, 1000);
      updateClock();

      function updateClock() {
        const t = getTimeRemaining(endTime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        
        if (t.total <= 0){
          clearInterval(timeInterval)
        }

      }
      
      
    }

    setClock('.timer',deadline);


    
    
  const  modalTrigger = document.querySelectorAll('[data-modal]');
  const  modal = document.querySelector('.modal');
  // const  modalCloseBtn = document.querySelector('[data-close]');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(modaTimerId);
  }


  
  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }
  
  
  
  document.addEventListener('keydown', (e) => {
    if(e.code ==='Escape' && modal.classList.contains('show')){
      closeModal();
    }
  });
  
  
    // const modaTimerId = setTimeout(openModal, 5000)
    
    function showModalByScroll() {
      // window.pageYOffset - прокрутка без высоты клиентского экрана
      // document.documentElement.clientHeight - высота клиентского экрана
      // documentElement.scrollHeight - полная высота сайта
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        document.removeEventListener('scroll',showModalByScroll)
        // удаление обработчика - нужна ссылка на функцию
      }
      
    }
    
    
    modalTrigger.forEach((trigger) => {
      
      trigger.addEventListener('click', openModal)
      
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
      }
    })


    // modalCloseBtn.addEventListener('click', closeModal)
    window.addEventListener('scroll', showModalByScroll);
    
    // Использование классов для карточек
    
    
class MenuCard {
  constructor (src, alt, title, descr, price, parentSelector, ...classes){
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.classes = classes.length !== 0 ? classes : 'menu__item';
    this.parent = document.querySelector(parentSelector);
    this.transfer = 27;
    this.changeToUAH()
  }

  changeToUAH(){
    this.price = this.price * this.transfer;
  }

  render() {
       const element =document.createElement('div');
      //  console.log(this.classes)
       element.classList.add(...this.classes);
       element.innerHTML = `
       <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
       `;
       this.parent.append(element);
  }

}



// getResource('http://localhost:3000/menu')
//     .then(data => {
  //       data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price,
    //           '.menu .container').render();
    //       })
    //     });
    
    
    const getResource = async (url) => {
      const res = await fetch(url);
    
      if (!res.ok) {
          throw new Error(`Could nor fetch ${url}, status: ${res.status}`);
      }
    
      return await res.json();
    }

// getResource('http://localhost:3000/menu')
//     .then(data => createCart(data));

// function createCart(data) {
//   data.forEach(({img, altimg, title, descr, price}) => {
//     const element = document.createElement('div');

//     element.classList.add('menu__item');

//     element.innerHTML = `
//     <img src=${img} alt=${altimg}">
//     <h3 class="menu__item-subtitle">${title}"</h3>
//     <div class="menu__item-descr">${descr}</div>
//     <div class="menu__item-divider"></div>
//     <div class="menu__item-price">
//         <div class="menu__item-cost">Цена:</div>
//         <div class="menu__item-total"><span>${price}</span> грн/день</div>
//     </div>
//     `;

//     document.querySelector('.menu .container').append(element)
//   });
// }


axios.get('http://localhost:3000/menu')
    .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price,
                  '.menu .container').render();
              })
            });






// однократный рендер без ссылок
// new MenuCard(
//   "img/tabs/vegy.jpg",
//   "vegy",
//   'Меню "Фитнес"',
// '  Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//   229,
//   '.menu .container',
//   // 'menu__item',
//   // 'big'
// ).render(); 


// new MenuCard(
//   "img/tabs/elite.jpg",
//   "elite",
//   'Меню "Премиум"',
// '  В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//   550,
//   '.menu .container',
//   'menu__item'
// ).render(); 


// new MenuCard(
//   "img/tabs/post.jpg",
//   "post",
//   'Меню "Постное"',
// ' Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//   430,
//   '.menu .container',
//   'menu__item'
// ).render(); 


const forms = document.querySelectorAll('form');

const message = {
  loading:'Загрузка',
  success:'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
};


forms.forEach(item => {
  bindPostData(item);
})

const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type':'application/json'
      },
      body: data
    });

    return await res.json();
}


function bindPostData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.textContent = message.loading;
    form.append(statusMessage);
    form.insertAdjacentElement('afterend', statusMessage);
    // const request = new XMLHttpRequest();
    // request.open('POST','server.php');
    const formData = new FormData(form);
    // const object = {};
    
    // formData.forEach(function (value, key) {
    //   object[key] = value;
    // })
    
    // переводим форму в json
    const json = JSON.stringify(Object.fromEntries(formData.entries()));


    // const json = JSON.stringify(object);

    // fetch('server.php', {
    //   method: "POST",
    //   headers: {
    //     'Content-type':'application/json'
    //   },
    //   body: JSON.stringify(object) // надо учитывать на стороне сервера

    // })
    
    postData('http://localhost:3000/requests', json)    
    .then( data => {
        console.log(data);
        showThanksModal(message.success)
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure) 
      }).finally(() => {
        form.reset();
    });

    

    // request.setRequestHeader('Content-type','application/json');
    // в вертске формы обязательно должен быть аттрибут name
    
    
    // request.send(json);

    // request.addEventListener('load', () => {
    //   if (request.status === 200){
    //     console.log(request.response);
    //     showThanksModal(message.success)
    //     form.reset();
    //     statusMessage.remove();

    //   } else {
    //     showThanksModal(message.failure)
    //   }
    // });
  })
}


  function showThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');

    openModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content"> 
           <div class="modal__close" data-close>x</div>
           <div class="modal__title">${message}</div>
        </div> 
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
 

  
  function HideAllSlides(slides) {
    slides.forEach((slide) => {
      slide.classList.remove('show');
      slide.classList.add('hide');
    });
  };
  
  function ShowSlideByIndex(slides, index = 1) {
    slides[index].classList.remove('hide');
    slides[index].classList.add('show');
  };
  
const slides = document.querySelectorAll('.offer__slider-wrapper  .offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const currLabel = document.querySelector('#current');
const sliderCounter = SliderCounter(3, 1); 


HideAllSlides(slides);


function SliderCounter(count, start) {
  let current = start;
  return function (step) {
    if ((current + step) > count) {
      current = 1
    } else
    if ((current + step) === 0 ){
      current = count
    } else
    {
      current+=step;
    }
    return current
  }
};

document.querySelector('.offer__slider-counter').addEventListener('click', (e) => {
  
    if (e.target) {
      if (e.target === next){
        const current = sliderCounter(1)
        HideAllSlides(slides)
        ShowSlideByIndex(slides, current)
        currLabel.textContent = getZero(current);
      } else 
      if (e.target === prev) {
        const current = sliderCounter(-1)
        HideAllSlides(slides)
        ShowSlideByIndex(slides, current)
        currLabel.textContent = current;
      }
    }
  });



 




// HideAllslides(slides);





  // fetch('http://localhost:3000/menu')
  // .then(data => data.json())
  // .then(res => console.log(res));



});

