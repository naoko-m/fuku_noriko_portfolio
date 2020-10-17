/* global $*/

// ナビゲーションバー　activeクラスつける

$('.nav-bar > li').removeClass('active');

$('.nav-item a').click(function (e) {
  $(this).toggleClass('active');
  $('.active').not(this).removeClass('active');
});

// ナビゲーションバー リンク先移動
$(function(){

  $('a[href^="#"]').not('#nav-bar').click(function() {
    // スクロールの速度
    const adjust = 76;
    const speed = 800; 
    let href= $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top - adjust;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

// ナビゲーションバー 表示変更

$(function () {
  let navLink = $('#nav-bar li a');

  if (!navLink[0]) {
    return false;
  };

  
  let contentsArr = new Array();
  for (var i = 0; i < navLink.length; i++) {

    let targetContents = $(navLink.eq(i).attr('href'));

    contentsArr[i] = targetContents;
  };
  
  contentsArr[i] = $('footer');

  function currentCheck() {
    navLink.removeClass('active');
    
    let windowScrolltop = $(window).scrollTop();
    for (let i = 0; i < contentsArr.length - 1; i++) {
      if (contentsArr[i].offset().top - 77 <= windowScrolltop && contentsArr[i + 1].offset().top - 77 > windowScrolltop) {
        navLink.eq(i).addClass('active');
        break;
      }
    };
  }
  
  $(window).on('load scroll resize', function () {
    currentCheck();
  });




});


// slick
$(document).ready(function(){
  $('.slick-box').slick({
    centerMode: true,
    fade: true,
    dots: true,
    adaptiveHeight: true,
    
  });
});




// プロフィールのアコーディオン

$(function () {
  $(".accordion-content:not(:first-of-type)").css("display", "none");

  $(".accordion-title:first-of-type").addClass("open");
 
  $(".js-accordion-title").click(function () {
    $(".open").not(this).removeClass("open").next().slideUp(300);
    $(this).toggleClass("open").next().slideToggle(300);
  });
});


// worksポップアップ

$('.lines__pictures').magnificPopup({
  delegate: 'a',
  type: 'image',
  showCloseBtn: false,
  gallery: { enabled: true },
  image : {
    verticalFit : true },
});


// firebase Auth

firebase.auth().onAuthStateChanged((user)=> {
  if (!user) {
    firebase
      .auth()
      .signInAnonymously()
      .catch((error) => {
  
      });
  }
});

$('form').submit((e) => {
  e.preventDefault();
  
  const $contactSubmitButton = $('#con__submit__button');
  $contactSubmitButton.text('sending…');
  
  let contactName = $('#con__name').val();
  let contactEmail = $('#con__email').val();
  let contactSubject = $('#con__subject').val();
  let contactMessage = $('#con__message').val();
  
  
  firebase
    .database()
    .ref('contact-message')
    .push({
      createdAt:firebase.database.ServerValue.TIMESTAMP,
      name:contactName,
      email:contactEmail,
      subject:contactSubject,
      message:contactMessage
    })
    .then(() => {
      $('#con__name').val('');
      $('#con__email').val('');
      $('#con__subject').val('');
      $('#con__message').val('');
      $('#con__submit__button').text('sent');
      $('.form__alert').css('visibility', 'visible');
    });
})