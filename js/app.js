// ********************Generator koncertowej listy piosenek!*******************

//Ideą aplikacji jest rozwiązanie problemu, z którym spotykam się grając w zespole muzycznym! Bardzo często, przed koncertem, zespół stara się przygotować listę piosenek, które odegrane zostaną na koncercie - ustawić je w odpowiedniej kolejności, wybrać którą piosenką zacząć, którą skończyć, co zagrać na bis, ile piosenek w ogóle uwzględnić, w zależności od czasu trwania koncertu, ilości setów, itd., jednocześnie przy ustalaniu kolejności, uwzględniane są takie własności piosenek, jak tempo, to czy dana piosenka jest hitem(ulubionym przez ludzi) itd. Niektóre piosenki grywamy tylko na prywatnych, zamkniętych imprezach, podczas gdy na normalnym koncercie raczej ich nie uwzględniamy, skupiając się na autorskim materiale. Zatem możliwość automatycznego wygenerowania listy uzględniającej wszystkie takie kryteria jest wspaniałym udogodnieniem!

// Wykorzystano: JavaScript, jQuery, AJAX, JSON, PHP, HTML, CSS(SASS), RWD
// dodatkowo biblioteki: jQueryUI, jQueryUI Touch-Punch, animateCss
// Design in Adobe Photoshop



// Projekt podzielony jest na moduły:
// basic.js - zawiera podstawowe funkcje (również rozszerzające metody obiektów)
// song_base.js - plik zawierający konstruktor klasy Song oraz funkcje związane z ładowaniem bazy (AJAX);
// engine.js - plik zawierający wszystkie funkcje obliczeniowe związane z generowaniem listy
// app.js - plik łączący funckcjonalności i implementujący je do dokumentu HTML.



$(document).ready(function() {
   // containers

   var setlist_container = $('.setlist_container');
   var main_container = $('.main_container');
   var description = $('.description');
   var sidebar = $('.sidebar');
   var database_container = $('.song_database');
   var databaseForm = $('.songDatabase_form_container');


   // generator form elements:
   var form = $('form#parameters');
   var sets = form.find('input[name="sets"]');
   var setDuration = form.find('select[name="setDuration"]');
   var eventCheckbox = form.find('input[name="event"]');

   // buttons:
   var generatorToggleButton = $('#toggleGenerator');
   var songsDatabaseButton = $('#toggle_songDatabase');
   var closeDatabaseButton = $('#closeDatabase');
   var addSongBtn = $('#addSongBtn');

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

      description.animateCss('zoomOutUp');

      if ($('ul#set1').children().length>0) {
         setlist_container.fadeOut('slow');
      }

      setTimeout(function(){loadLists(generated.setlists, generated.rest)},1000);
      sidebar.show('slow');
   })


   generatorToggleButton.click(function(){
      var self = $(this);
      if(self.hasClass('full')){
         self.removeClass('full').closest('section').animate({
            'bottom': '-26vh'
         },'slow');

      }else {

         self.addClass('full').closest('section').animate({
            'bottom': '0'
         },'slow');

      }
   });

   songsDatabaseButton.click(function(){
      if (database_container.hasClass('full')) {
         database_container.animate({
            'right':'-100vw',
         },'slow').removeClass('full');
         main_container.animate({
            'right':0
         },'slow');
      }else {
         database_container.animate({
            'right':'0',
         },'slow').addClass('full');
         main_container.animate({
            'right':'100vw'
         },'slow');

      }

      listSongs(songDatabase);
   });

   closeDatabaseButton.click(function(){
      database_container.animate({
         'right':'-100vw',
      },'slow').removeClass('full');
      main_container.animate({
         'right':0
      },'slow');
   })


   databaseForm.css('bottom','-100vh');
   addSongBtn.click(function(){
      if ($(this).hasClass('rotated')){
         $(this).animateRotate((-45),(0),500).removeClass('rotated');
         databaseForm.animate({'bottom':0},500);
         $('.addLabel').animate({'opacity':'.1'},200);
      } else {
         $(this).animateRotate((0),(-45),500).addClass('rotated');
         databaseForm.animate({'bottom':'-100vh'},500);
         $('.addLabel').animate({'opacity':'1'},1000);
      }
   });



   // SIDEBAR:

   sidebar.hide();
   sidebar.on({
      click: function(){
         if ($(this).hasClass('full')) {
            $(this).animate({
               'left':'-200px',
            },'slow').removeClass('full');
         }else {
            $(this).animate({
               'left':'0',
            },'slow').addClass('full');
         }
      },
      // mouseleave: function() {
      //    $(this).animate({
      //       'left':'-200px',
      //    },'slow').removeClass('full');
      // }
   });



});
