/*json
'Id': 2,
'Direccion': 'P.O. Box 657, 9831 Cursus St.',
'Ciudad': 'Orlando',
'Telefono': '488-441-5521',
'Codigo_Postal': '04436',
'Tipo': 'Casa de Campo',
'Precio': '$71,045'
*/
$(document).ready(function() {
    $('select').material_select();
});


/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $('#rangoPrecio').ionRangeSlider({
    type: 'double',
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: '$',

  });
}


/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
//Cargando Ciudades y demas parametros para la busqueda personalizada


  $.ajax({
    url:'./buscador.php',
    type: 'GET',
    data:{'oper':'ciudades','city':'All','type':'all','min':0,'max':'all'}

  }).done(function(resp){
    $('#selectCiudad').html(resp)
    $.ajax({
      url:'./buscador.php',
      type: 'GET',
      data:{'oper':'tipos','city':'All','type':'all','min':0,'max':'all'}

    }).done(function(res){
      $('#selectTipo').html(res)
        $('select').material_select();
    })
  })




//A partir de aqui empieza el codigo de la logica de negocio del sitio
$('#mostrarTodos').on('click',function(){

  $.ajax({
    url:'./buscador.php',
    type: 'GET',
    data:{'oper':'ofertas','city':'All','type':'all','min':0,'max':100000}

  }).done(function(resp){
    var jsn=JSON.parse(resp)
    $('#searchResult').empty()
    for (item of jsn) {
      var card= `<div class='offertItem card row '>
          <div class='col l5  '>
            <img class='col l12'src='img/home.jpg'>
          </div>
          <div class='col l7'>
            <div class='card-content'>
              <p>  <strong>Direccion:</strong>${item.Direccion}</p>
              <p>  <strong>Ciudad:</strong> ${item.Ciudad}</p>
              <p>  <strong>Telefono:</strong>${item.Telefono}</p>
              <p>  <strong>Codigo_Postal:</strong>${item.Codigo_Postal}</p>
              <p>  <strong>Tipo: </strong>${item.Tipo}</p>
              <p>  <strong>Precio:</strong>${item.Precio}</p>
            </div>
            <div class='card-action'>
              <a href='#'>Ver m&aacutes</a>
            </div>
          </div>
        </div>`;
      $('#searchResult').append(card)
    }
  })
})

//Busqueda personalizada
$('#submitButton').on('click',function(event){
  event.preventDefault()
  var rango= $('#rangoPrecio').val().split(';')
  $.ajax({
    url:'./buscador.php',
    type: 'GET',
    data:{'oper':'personalizada','city':$('#selectCiudad').val(),'type':$('#selectTipo').val(),'min':$(rango)[0],'max':$(rango)[1]}

  }).done(function(resp){
    var jsn=JSON.parse(resp)
    $('#searchResult').empty()
    for (item of jsn) {
      var card= `<div class='offertItem card row '>
          <div class='col l5  '>
            <img class='col l12'src='img/home.jpg'>
          </div>
          <div class='col l7'>
            <div class='card-content'>
              <p>  <strong>Direccion:</strong>${item.Direccion}</p>
              <p>  <strong>Ciudad:</strong> ${item.Ciudad}</p>
              <p>  <strong>Telefono:</strong>${item.Telefono}</p>
              <p>  <strong>Codigo_Postal:</strong>${item.Codigo_Postal}</p>
              <p>  <strong>Tipo: </strong>${item.Tipo}</p>
              <p>  <strong>Precio:</strong>${item.Precio}</p>
            </div>
            <div class='card-action'>
              <a href='#'>Ver m&aacutes</a>
            </div>
          </div>
        </div>`;
      $('#searchResult').append(card)
    }
  })
})
