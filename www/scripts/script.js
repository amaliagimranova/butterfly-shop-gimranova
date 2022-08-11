$(document).ready(function(){

  // Меню в мобильной версии
  $('.js-header-burger').on('click', function(e) {
    e.preventDefault();
    $('.js-header-burger').toggleClass('open');
    $('.js-menu').slideToggle();
  });

  // Галерея отзывов
  $('.js-reviews-slick').slick({
    dots: false
  });

  // Табы в контактах
  $('.js-tabs-link').on('click', function(e) {
    e.preventDefault();

    $('.js-tabs-link').removeClass('active');
    $(this).addClass('active');

    // Смена контента
    let index = $(this).index('.js-tabs-link');

    $('.js-tabs-content').removeClass('active');
    $('.js-tabs-content').eq(index).addClass('active');
  });

  // FAQ
  let prevStatus;
  $('.js-faq-btn').on('click', function() {

    if (this === prevStatus) {
      $(this).next().slideToggle();
    } else {
      $('.js-faq-btn').next().slideUp();
      $(this).next().slideDown();
    }
    prevStatus = this;




  })



});
