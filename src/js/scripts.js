// скрипт открывания и закрывания меню 
(function() {
    'use strict';

    let navMenu = document.querySelector('.nav__items'),
        header  = document.getElementById('hero'),
        nav  = document.getElementById('nav'),
        toggle  = document.querySelector('.nav__toggle');

        toggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            header.classList.toggle('open');
            nav.style.backgroundColor = 'rgba(159,154,207,.8)';
          });
          
          navMenu.addEventListener('click', () => {
            navMenu.classList.remove('open');
            header.classList.remove('open');

        });
})();

// скрипт переключения элементов меню
(function (){
    'use strict';

      let navLink = document.querySelectorAll('.nav__link');
      
      navLink.forEach((elem) => {

          elem.addEventListener('click', (e) =>{

              navLink.forEach((elem) => {
                  elem.classList.remove('active');
              });

              e.target.classList.add('active');
          });        
      });
    
})();

// Slider
(function (){
    'use strict';

    let $worksSlider = $('.work-slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnFocus: true,
        arrows: true,
        prevArrow: '.slider__arrow--left',
        nextArrow: '.slider__arrow--right',
        dots: true,
    });
    
    $(document).on('keydown', function(e) {
        if(e.keyCode == 37) {
            $worksSlider.slick('slickPrev');
            $teamSlider.slick('slickPrev');
        }
        if(e.keyCode == 39) {
            $worksSlider.slick('slickNext');
            $teamSlider.slick('slickNext');
        }
    });
    
    let $teamSlider = $('.slider-team').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1000,
        dots: false,
        pauseOnFocus: true,
        prevArrow: '.slider__arrow--left',
        nextArrow: '.slider__arrow--right',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                prevArrow: '',
                nextArrow: '',
              }
            }
        ]
      });
})();

//headroom menu
(function() {
  'use strict';

  var nav = new Headroom(document.querySelector("#nav"), {
      tolerance: 5,
      offset : 205,
  });
  nav.init();

}());

// меняем background nav в зависимости от высоты прокрутки
(function (){
  'use strict';
  let header = document.getElementById('hero'),
      nav = document.getElementById('nav'),
    heightHeader = null,
    heightWindow = null;
    

    document.addEventListener('scroll', () => {
      heightHeader = header.scrollHeight;
      heightWindow = window.pageYOffset;

    if ((heightHeader - 140) > heightWindow) {
      nav.style.backgroundColor = 'transparent';

    } else {
      nav.style.backgroundColor = 'rgba(159,154,207,.8)';

    }
  })


})();