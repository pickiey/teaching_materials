const mySwiper = new Swiper('.swiper-container', {
    loop                : false,
    speed               : 800,
    threshold           : 50,
    noSwiping           : true,
    noSwipingClass      : 'no-swipe',
    slidesPerView       : 1,
    spaceBetween        : 0,
    centeredSlides      : true,
    hashNavigation      : true,
    touchReleaseOnEdges : true,
    effect              : 'coverflow', coverflowEffect: {
                            rotate       : 50,
                            stretch      : 0,
                            depth        : 100,
                            modifier     : 1,
                            slideShadows : false,
                          },
    grabCursor          : false,
    noSwipingSelector   : 'input',
    pagination          : {
                            el              : '.swiper-my-pagination',
                            type            : 'bullets',
                            clickable       : true,
                            dynamicBullets  : false,
                            renderBullet    : function (index, className) {
                                                return '<p class="' + className + '">' + '</p>';
                                              }
                           },
    mousewheel          : {
                            invert: false,
                          },
    navigation          : {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                          },
    on                  : {
                            slideChange     : function () {
                                                if ( $(".scroll").hasClass('swiper-button-disabled') ){
                                                    $(".scroll-btn").addClass('last');
                                                }
                                                else{
                                                    $(".scroll-btn").removeClass('last');
                                                }
                                              },
                          }
})





//  const target= $('.cover-menu p')
//  console.log(target)
//
//  target.on('click',function(){
//      var result = $(this).data('id');
//      mySwiper.slideTo(result);
//  })


const target = document.querySelectorAll('.cover-menu p')
console.log(target)

target.onclick = () => {
    let result = target.data('id')
    mySwiper.slideTo(result)
}

