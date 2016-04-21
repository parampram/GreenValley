function warning (action, link) {
  document.querySelector('.sum-for-payment__sum').innerHTML = '-';
  document.querySelector('.sum-for-payment__warning').innerHTML = '<i class="fa fa-exclamation-circle"></i>Пожалуйста, <a href="#' + link + '" class="sum-for-payment__date">' + action + '</a>, чтобы увидеть сумму к оплате';
}

function sumForPayment () {
  var elems = document.getElementsByTagName('form')[0].elements;
  var depart = new Date();
  depart.setFullYear(elems.yearOfDepart.value, (elems.monthOfDepart.value-1), elems.dayOfDepart.value);
  var retur = new Date();
  retur.setFullYear(elems.yearOfReturn.value, (elems.monthOfReturn.value-1), elems.dayOfReturn.value);
  var res = retur - depart;
  var dif  = 86400000; 
  var days = Math.floor(res/dif); 

  if ( document.getElementById('hotel').checked ) {
    if( document.getElementById('cottage1').checked ) {
      payment = 6000;
    } else if ( document.getElementById('cottage2').checked ) {
      payment = 22000;
    } else if ( document.getElementById('cottage3').checked ) {
      payment = 4000;
    } else  {
      payment = 13000;
    }
  } else {
    if( document.getElementById('cottage1').checked ) {
      payment = 10000;
    } else if ( document.getElementById('cottage2').checked ) {
      payment = 25000;
    } else if ( document.getElementById('cottage3').checked ) {
      payment = 7000;
    } else  {
      payment = 15000;
    }    
  }

  var sum = payment * days;
  document.querySelector('.sum-for-payment__sum').innerHTML = sum + ' руб.';
  document.querySelector('.sum-for-payment__warning').innerHTML = '';
}


function check (form) {
  var elems = form.elements;
  if ( elems.dayOfDepart.value && elems.monthOfDepart.value && elems.yearOfDepart.value && elems.dayOfReturn.value && elems.monthOfReturn.value && elems.yearOfReturn.value && elems.typeOfCottage.value) {
    sumForPayment();
  }  
  if (!elems.typeOfCottage.value) {
    warning('выберите тип коттеджа', 'typeOfCottage');
  }  
  if (!elems.dayOfReturn.value || !elems.monthOfReturn.value || !elems.yearOfReturn.value) {
    warning('выберите дату выезда', 'dayOfReturn');
  }
  if (!elems.dayOfDepart.value || !elems.monthOfDepart.value || !elems.yearOfDepart.value) {
    warning('выберите дату въезда', 'dayOfDepart');
  }
}      
