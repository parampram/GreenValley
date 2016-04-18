$(document).ready(function() {
  
  $("#carousel").owlCarousel();
 
  $("#owl-example").owlCarousel();
 
});




var toggler = document.getElementById('toggler');
toggler.onclick = function(e){
  e.preventDefault();
  toggler.classList.toggle('toggler--close');
  document.getElementById('toggler-nav').classList.toggle('toggler-nav--visible');
	}
