$(document).ready(function(){

  // Меню в мобильной версии
  $('.js-header-burger').on('click', function(e) {
    e.preventDefault();
    $('.js-header-burger').toggleClass('open');
    $('.js-menu').slideToggle();
  });

  //Сортировка в каталоге
  $('.js-filter-link').on('click', function(e) {
    e.preventDefault();
    let filter = $(this).data('filter');

    $('.js-filter-link').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.js-catalog-item').show();
      return;
    }

    $('.js-catalog-item').each(function() {
      let type = $(this).data('type');

      if (filter === type) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

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

  // AJAX Catalog // что-то не работает, вернуться, перепроверить
  $('.js-btn-more').on('click', function(e) {
    e.preventDefault();

    $('.js-btn-more').attr('disabled', true);
    $('.js-btn-more').text('...');

    $.ajax({
      type: 'POST',
      url: '../jsons/catalog.json',
      data: 'count = 4',
      success: function (responce) {
        if (!responce.isShowMore) {
          $('.js-btn-more').hide();
        }

        let html = createHtml(responce.catalog);
        addToPage(html);

        $('.js-btn-more').removeAttr('disabled');
        $('.js-btn-more').text('Больше бабочек');
      },
      erroe: function() {
        console.log('error');
      }
    });

    function createHtml(dataArray) {
      let htmlString = '';

      dataArray.forEach(function(item) {
        htmlString = htmlString + 
        `<div class="catalog-item js-catalog-item"  data-type="${item.data-type}">
          <div class="catalog-item-wrap">
            <a href="${item.link}">
              <img class="catalog-img" src="${item.imageURL}" alt="${item.imageAlt}">
              <p class="catalog-item-description">${item.description}</p>
            </a>
          </div>
        </div>`
      });

      return htmlString;
    };

    function addToPage(string) {
      $('.js-catalog-list').append(string);
    }
  });


});
