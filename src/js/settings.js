$(document).ready(function() {
  
  $("#carousel").owlCarousel({
  	items : 1,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3]
  });
 
  $("#owl-example").owlCarousel();
 
});




var toggler = document.getElementById('toggler');
toggler.onclick = function(e){
  e.preventDefault();
  toggler.classList.toggle('toggler--close');
  document.getElementById('toggler-nav').classList.toggle('toggler-nav--visible');
	}


  $('.cottege-type__input').on('click', function() {
    var idInput = $(this).attr('id');
    var idBlock = '#cottege-info--'+idInput;
    $('.cottege-info').hide();
    $(idBlock).show();
  });