

$(document).ready(function() {

  //Service-slider 

      var link_href;
    $('.service-slider__tabs').on('click', function(e){
      e.preventDefault();
      $(this)
      .closest('.service-slider__tabs-list')
      .find('.service-slider__tab .service-slider__tab--active')
      .removeClass('service-slider__tab--active');
      $(this)
      .closest('.service-slider__tab')
      .addClass('service-slider__tab--active');
      $(this)
      .closest('.service-slider__tabs')
      .find('.service-slider__type .service-slider__type--active')
      .removeClass('service-slider__type--active');
      link_href = $(this).attr('href');
      $(link_href).addClass('service-slider__type--active');
    });

//Rewiew-slider

  $(".review-carousel").owlCarousel({
    loop: true,
    merge: true,
    nav: true,
    navText: false,
    responsive: {
      0 : {
        items: 1,
      },
      768 : {
        items: 2,
      }
    }
  });

// Index gallery-owl

  var owl = $('.gallery__owl'),
  galleryItemIndex;
  owl.owlCarousel({
    center: true,
    loop: true,
    responsive: {
      0 : {
        items: 1,
      },
      480 : {
        items: 2,
      },

      768 : {
        items: 5,
        stagePadding: 50,
        merge: true,
      }
    }
  })
    .find('a').on('click', function(e){
    e.preventDefault();
    $(this).closest('.gallery').find('.gallery__main-img').attr('src', $(this).attr('href'));
    galleryItemIndex = $(this).closest('.owl-item').index();
    console.log(galleryItemIndex);
    owl.trigger('to.owl.carousel', galleryItemIndex);
  });


  
// Menu toggler 

var toggler = document.getElementById('toggler');
toggler.onclick = function(e){
  e.preventDefault();
  toggler.classList.toggle('toggler--close');
  document.getElementById('toggler-nav').classList.toggle('toggler-nav--visible');
	}

// Form cottege-type block

  $('.cottege-type__input').on('click', function() {
    var idInput = $(this).attr('id');
    var idBlock = '#cottege-info--'+idInput;
    $('.cottege-info').hide();
    $(idBlock).show();
  });

});