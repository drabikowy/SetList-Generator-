


// Główna funkcja losująca piosenki do setlisty - przyjmuje za parametr czas trwania jednego seta, ilość setów i typ imprezy;
function generateSetList (duration,sets,showType) {
   var songs = Array.from(songDatabase);
   shuffle(songs);

   var finalSetlist = [];
   var songsLeft = [];

   var start = (showType == 'event') ? 'etrue' : true;
   var only = (showType == 'event') ? 'event' : 'concert';


   for (var setNumber=1; setNumber<=sets; setNumber++){

      var setlist = [];
      //na początku losuję pierwszą piosenkę, jeżeli znajdzie to taką z parametrem start == true, jeżeli w bazie już takich nie ma to szukam dowolnej z energyRating >=3:
      checkStart(songs,setlist,start);

      // teraz losuję ostatnią piosenkę koncertu..
      checkEnd(songs,setlist);

      // ..oraz piosenkę na bis, jeżeli losuję ostatni set koncertu
      if (setNumber==sets){
         checkBis(songs, setlist);
      }

      // teraz będę losował pozostałe piosenki w secie, dopóki nie zostanie przekroczony czas seta, albo dopóki nie skończą się piosenki w bazie. Losowanie
      var counter =0;
      while (checkDuration(setlist)<duration && songs.length>0){
         if(counter<1000){
            randomSongs(setlist, songs, showType, sets);
         }else {
            alert('Losuj jeszcze raz brakło piosenek, wrzucono po prostu pozostałe');
            songs.forEach(function(element,index){
               setlist.push(element);
            });
            songs=[];
            break;
         }
         counter++;
      }

      finalSetlist.push(setlist);
      songsLeft = songs;

      // tu się kończy pętla for zliczająca numer seta
   }

   var result = {
      setlists: finalSetlist,
      rest: songsLeft
   }
   return result;
};


// tu zdefiniowana jest funkcja do losowania piosenek w setliście, na podstawie kilku kryteriów
function randomSongs(setlist, songs, showType, sets, setNumber){
   var prev = (setlist.length>2) ? setlist.length-2 : setlist.length-1;

   for (var r=0; r<songs.length; r++){
      var song = songs[r];
      //jeżeli piosenka posiada jakieś specialne warunki(metodę conditionCheck), to wywołuję funckcję która ustawi wartość specialCondition na podstawie aktualnych danych o stetliście, bazie piosenek i wylosowanym indeksie);

      if (song.conditionCheck){
         var conditionCheck = eval(song.conditionCheck);
         song.specialCondition = conditionCheck(setlist,songs,r);
      }

      if (
         ( setNumber<sets && (song.start==true) ) ||

         (song.bis == 'only') ||

         (song.tempo == 'slow' && (prev.tempo == 'slow'|| prev.tempo == 'moderate')) ||

         (prev.energyRating <= 2 && song.energyRating < 4 ) ||

         // (song.mustBe !== false && checkPrevious(setlist, 5,'mustBe',false)) ||

         (song.specialCondition) ||

         (showType =='concert' && song.only=='event') ||

         (showType=='event' && song.only=='concert')
      ){
         console.log('piosenka nie spełnia warunków');
      }
      else {
         setlist.insert(prev,song);
         songs.splice(r,1);
         shuffle(songs);
         return true;
      }
   }
   return false;
}


function checkStart(songs, setlist, start){
   for (var r=0; r<songs.length; r++) {
      if(songs[r].start == start){
         setlist.push(songs[r]);
         songs.splice(r,1);
         return true;
      }
   }
   for (var r=0; r<songs.length; r++) {
      if(songs[r].energyRating>=4){
         setlist.push(songs[r]);
         songs.splice(r,1);
         return true;
      }
   }
   return false;
}
function checkEnd(songs, setlist){
   for (var r=0; r<songs.length; r++) {
      if(songs[r].end == true){
         setlist.push(songs[r]);
         songs.splice(r,1);
         return true;
      }
   }
   for (var r=0; r<songs.length; r++) {
      if (songs[r].energyRating >4 || songs[r].tempo == 'fast'){
         setlist.push(songs[r]);
         songs.splice(r,1);
         return true;
      }
   }
   return false;
}
function checkBis(songs, setlist){
   for (var r=0; r<songs.length; r++) {
      if(songs[r].bis == true || songs[r]=='only'){
         setlist.push(songs[r]);
         songs.splice(r,1);
         return true;
      }
   }
   for (var r=0; r<songs.length; r++) {
      if (songs[r].energyRating >4 || songs[r].tempo == 'fast'){
         setlist.push(songs[r]);
         songs.splice(r,1);
         return true;
      }
   }
   return false;
}


// Funkcja umieszczająca listy na stronie:
function loadLists(lists, rest){
   var $sets_container = $('section.setlist_container');
   var $sidebar_ul = $('#rest');


   $sets_container.hide().fadeOut('fast').empty().css('background-color','white');
   $sidebar_ul.empty().hide();

   // setlist:
   $(lists).each(function(index,set){
      var $ul = $('<ul>').attr('id','set'+(index+1)).attr('class','sortable').sortable({
         connectWith: ".sortable",
         update: function( event, ui ) {
            console.log($('.setlist_container'));
            $('.setlist_container').find('ul').each(function(i,element){
               $(element).children().each(function(index,el){
                  $(el).find('span').text(index+1);
               })
            });
         }

      });
      $(set).each(function(i,song){
         var span = $('<span>',{class:'song_number'}).text(i+1);
         var $li = $('<li>',{class: 'song'}).text(' '+ song.title).prepend(span);
         $ul.append($li);
         $sets_container.append($ul);
      });

      $sets_container.animateCss('zoomInDown');
      $sets_container.show();
   });

   // rest:
   $(rest).each(function(index,song){
      var span = $('<span>',{class: "song_number"});
      var li = $('<li>',{class: 'song'}).text(' '+ song.title);
      li.prepend(span);

      $sidebar_ul.append(li).show();
      $sidebar_ul.sortable({
         connectWith: ".sortable",
         update: function( event, ui ) {
            $('.setlist_container').find('ul').each(function(i,element){
               $(element).children().each(function(index,el){
                  $(el).find('span').text(index+1);
               })
            });
         }
      })
   });
}

function countIndex(list) {

}
