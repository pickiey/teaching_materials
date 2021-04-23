/*****************************
    jQuery
 *****************************/

//ウィンドウの高さ取得
//wrapperがウィンドウの高さより大きくなったらover付与
$(document).ready(function(){
    hsize = $(window).height();
    $(".body-cover,.main,.container,#loading").css("height", hsize + "px");
    $('.wrapper').each(function(){
        wpsize = $(this).height();
        if(hsize <= wpsize) {
            $(this).addClass('over');
        }else{
            $(this).removeClass('over');
        }
    });
});
$(window).resize(function(){
    hsize = $(window).height();
    $(".body-cover,.main,.container,#loading").css("height", hsize + "px");
    $('.wrapper').each(function(){
        wpsize = $(this).height();
        if(hsize <= wpsize) {
            $(this).addClass('over');
        }else{
            $(this).removeClass('over');
        }
    });
});

//右上メニューボタンとモーダルメニュー
$(function(){
    $(".menu,.cover-menu p").on('click', function(){
        if($('.menu .menu-text p,.body-cover,.cover-menu p').is(":animated")){
            return false;
        }else{
            $(".menu").toggleClass("active");
            $(".swiper-container").toggleClass("no-swipe");
            $(".header-logo,footer").addClass("hide");
            if ( $(".menu").hasClass('active') ) {
                $(".menu .menu-text p:not(:animated)").fadeOut(300).delay(500).queue(function(n){
                    $(this).html("CLOSE");
                    n();
                }).fadeIn(300);
                $(".body-cover,.cover-menu").fadeIn(200);
                $('.cover-menu p').delay(300).each(function(i){
                    $(this).delay(i*(200)).css({opacity:'0'}).animate({opacity:'1'},200);
                });
            } else {
                $(".menu .menu-text p:not(:animated)").fadeOut(300).delay(500).queue(function(n){
                    $(this).html("MENU");
                    n();
                }).fadeIn(300);
                $($('.cover-menu p').get().reverse()).each(function(i){
                    $(this).delay(i*(200)).css({opacity:'1'}).animate({opacity:'0'},200);
                });
                $(".body-cover,.cover-menu").delay(1200).fadeOut(200);
                $(".header-logo,footer").delay(1200).queue(function(next) {
                    $(this).removeClass("hide");
                    next();
                });
            }
        }
    });
});

//右上メニューボタンのアニメーション
$(window).on('load', function(){
    var id1 = setInterval(function() {
        $(".menu .menu-bt span:first-child").animate({
            width: "0px"
        }, 500, 'swing').animate({
            width: "100%"　
}, 1500, 'swing').animate({
    width: "0px"　
}, 1500, 'swing')
}, 1000);
    var id2 = setInterval(function() {
        $(".menu .menu-bt span:last-child").delay(300).animate({
            width: "0px"
        }, 500, 'swing').animate({
            width: "100%"　
}, 1500, 'swing').animate({
    width: "0px"　
}, 1500, 'swing')
}, 1000);
});

//ローディング画面
$(function() {
    $('body').delay(200).animate({opacity:'1'},200);
    $(window).on('load', function () {
        function remove() {
            $('#loading').fadeOut(300);
        }
        setTimeout(remove, 1500);
    });
});

//　カーソル設定
$(function() {
    var
    cursor = $(".cursor"),
        follower = $(".follower"),
        cWidth = 8, //カーソルの大きさ
        fWidth = 40, //フォロワーの大きさ
        delay = 10, //数字を大きくするとフォロワーがより遅れて来る
        mouseX = 0, //マウスのX座標
        mouseY = 0, //マウスのY座標
        posX = 0, //フォロワーのX座標
        posY = 0; //フォロワーのX座標

    //カーソルの遅延アニメーション
    //ほんの少ーーーしだけ遅延させる 0.001秒
    TweenMax.to({},.001,{
        repeat: -1,
        onRepeat: function() {
            posX += (mouseX - posX) / delay;
            posY += (mouseY - posY) / delay;

            TweenMax.set(follower, {
                css: {
                    left: posX - (fWidth / 2),
                    top: posY - (fWidth / 2)
                }
            });

            TweenMax.set(cursor, {
                css: {
                    left: mouseX - (cWidth / 2),
                    top: mouseY - (cWidth / 2)
                }
            });
        }
    });

    //マウス座標を取得
    $(document).on("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    $("a,.nav-left p,.cover-menu p,.nav-btn p,.menu,.scroll,.modal-btn,input,textarea,label").on({
        "mouseenter": function() {
            cursor.addClass("is-active");
            follower.addClass("is-active");
        },
        "mouseleave": function() {
            cursor.removeClass("is-active");
            follower.removeClass("is-active");
        }
    });
});

//　モーダルウィンドウ
$(function(){
    $(".service-list li.shop-bnr a").on('click', function(){
        if(!$(".modal").hasClass('show')){
            $(".modal").fadeIn(300);
        }else{
            $(".modal").fadeOut(300);
        }
    });
    $(".modal .modal-btn").on('click', function(){
        $(".modal").fadeOut(300);
    });
});

//　スクロールバー
$(window).on('load', function () {
    $(".scroll-area").mCustomScrollbar({
        theme:"minimal-dark"
    });
});

//　swiperのページが最後の時、クラスlastをスクロールボタンに付与
$(window).on('load', function(){
    if ( $(".scroll").hasClass('swiper-button-disabled') ){
        $(".scroll-btn").addClass('last');
    }
});

//　ipad/iphone
$(function(){
    if(('ontouchstart' in document) && ('orientation' in window)) {
        $(".scroll-area").removeClass("scroll-area");
        $(".cursor,.follower").css({'display':'none'});
    }
});
