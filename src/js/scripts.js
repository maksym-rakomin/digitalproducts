// скрипт открывания и закрывания меню 
(function() {
    'use strict';

    let navMenu = document.querySelector('.nav__items'),
        toggle  = document.querySelector('.nav__toggle'),
        body    = document.body;

        toggle.addEventListener('click', () => {;
            body.classList.toggle('open');
          });
          
          navMenu.addEventListener('click', () => {
            body.classList.remove('open');

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
        prevArrow: '.work-slider__arrow--left',
        nextArrow: '.work-slider__arrow--right',
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
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        pauseOnFocus: true,
        prevArrow: '.team-slider__arrow--left',
        nextArrow: '.team-slider__arrow--right',
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
  let header       = document.getElementById('hero'),
      nav          = document.getElementById('nav'),
      heightHeader = null,
      heightNav    = null,
      heightWindow = null;
    

    document.addEventListener('scroll', () => {
      heightHeader = header.scrollHeight;
      heightNav = nav.scrollHeight;
      heightWindow = window.pageYOffset;

    if ((heightHeader - (heightNav / 2)) > heightWindow) {
      nav.classList.remove('nav__transparent');
      
    } else {
      nav.classList.add('nav__transparent');
    }
  })


})();