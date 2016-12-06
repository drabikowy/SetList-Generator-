// ********************Generator koncertowej listy piosenek!*******************

//Ideą aplikacji jest rozwiązanie problemu, z którym spotykam się grając w zespole muzycznym! Bardzo często, przed koncertem, zespół stara się przygotować listę piosenek, które odegrane zostaną na koncercie - ustawić je w odpowiedniej kolejności, wybrać którą piosenką zacząć, którą skończyć, co zagrać na bis, ile piosenek w ogóle uwzględnić, w zależności od czasu trwania koncertu, ilości setów, itd., jednocześnie przy ustalaniu kolejności, uwzględniane są takie własności piosenek, jak tempo, to czy dana piosenka jest hitem(ulubionym przez ludzi) itd. Niektóre piosenki grywamy tylko na prywatnych, zamkniętych imprezach, podczas gdy na normalnym koncercie raczej ich nie uwzględniamy, skupiając się na autorskim materiale. Zatem możliwość automatycznego wygenerowania listy uzględniającej wszystkie takie kryteria jest wspaniałym udogodnieniem!

// Wykorzystano: HTML, CSS(SASS), JavaScript, jQuery



// Projekt podzielony jest na moduły:
// song_base.js - plik zawierający konstruktor piosenek i bazę
// engine.js - plik zawierający wszystkie funkcje obliczeniowe związane z generowaniem listy
// app.js - plik łączący funckcjonalności i implementujący je do dokumentu HTML.



$(document).ready(function() {
   var form = $('form#parameters');
   var sets = form.find('input[name="sets"]');
   var setDuration = form.find('select[name="setDuration"]');
   var eventCheckbox = form.find('input[name="event"]');

   sets.on('change',function(){
      var options = $('form option');
      options.attr('selected',false).hide();

      if($(this).val()==2) {
         options.eq(0).show();
         options.eq(1).show().attr('selected',true);
      }else if($(this).val()==3){
         options.eq(0).show().attr('selected',true);
      }else {
         options.show().eq(2).attr('selected',true);
      }
   })



   form.on('submit',function(e){
      e.preventDefault();
      var setsNumber = $('input[type="radio"]:checked').val();
      var duration = setDuration.val() * 60;
      var showType = eventCheckbox.prop('checked') ? 'event' : 'concert'
      var generated = generateSetList(duration, setsNumber ,showType);
      console.log(setsNumber);

      loadLists(generated.setlists, generated.rest);
      
   })





   $('#toggleGenerator').click(function(){
      var self = $(this);
      if(self.hasClass('full')){
         self.removeClass('full').closest('section').animate({
            'bottom': '-14vh'
         },'slow');

      }else {
         self.addClass('full').closest('section').animate({
            'bottom': '0'
         },'slow');

      }
   });


   // SIDEBAR:

   var self=$(this);
   $('sidebar').on({
      mouseenter: function(){
         self.css({transform: translate('2vw')})
      },
      mouseout: function(){
         self.css({left: '2vw'})
      }
   })
});
