// funkcja losująca liczbę z danego przedziału:
function getRandom (min, max){

   return Math.floor(Math.random() * (max - min +1)) + min;
};


// Definicja funkcji do wrzucania elementu w dane miejsce tablicy:
Array.prototype.insert = function (index, item) {
   this.splice(index, 0, item);
};

// Funkcja sprawdza czas trwania setlisty (będzie to potrzebne aby przerwać generowanie, jeśli setlista przekroczy wymagany czas);
function checkDuration(list){
   var time = 0;
   for(var i=0; i<list.length; i++){
      time += list[i].duration;
   }
   return time;
}

// Główna funkcja losująca piosenki do setlisty - przyjmuje za parametr czas trwania jednego seta, ilość setów i typ imprezy;
function generateSetList(duration,sets,showType) {
   var songs = Array.from(songDatabase);
   var finalSetlist = [];
   var songsLeft = [];


   var start = (showType == 'event') ? 'etrue' : true;
   var only = (showType == 'event') ? 'event' : 'concert';

   for (var setNumber=1; setNumber<=sets; setNumber++){

      var setlist = [];

      //na początku losuję pierwszą piosenkę:
      while (setlist.length <1) {
         // counter =>wentyl bezpieczeństwa w razie zbyt dużej ilości nietrafionych losowań
         var counter =0;
         //  jeżeli jeszcze zostały piosneki z parametrem start==true to szukam, jeśli nie to losuję dowolną piosenkę szybką lub o średnim tempie:
         if (checkExistence(songs,'start', start) && counter<50){
            var r = getRandom(0, songs.length-1);
            if (songs[r].start == start) {
               setlist.push(songs[r]);
               songs.splice(r,1);
            }
            counter++;
         } else {
            var r = getRandom(0, songs.length-1);
            if (songs[r].energyRating >=3){
               setlist.push(songs[r]);
               songs.splice(r,1);
            }
         }
      }
      // teraz losuję ostatnią piosenkę koncertu..
      while (setlist.length <2) {
         var counter =0;
         //  jeżeli jeszcze zostały piosneki z parametrem end==true to szukam, jeśli nie to losuję dowolną piosenkę szybką lub o średnim tempie:
         if (checkExistence(songs,'end', true) && counter<100){
            var r = getRandom(0, songs.length-1);
            if (songs[r].end == true) {
               setlist.push(songs[r]);
               songs.splice(r,1);
            }
            counter++;
         } else {
            var r = getRandom(0, songs.length-1);
            if (songs[r].energyRating >4 || songs[r].tempo == 'fast'){
               setlist.push(songs[r]);
               songs.splice(r,1);
            }
         }
      }


      // ..oraz piosenkę na bis
      if (setNumber==sets){
         while (setlist.length <3) {
            // counter =>wentyl bezpieczeństwa w razie zbyt dużej ilości nietrafionych losowań
            var counter =0;
            //  jeżeli jeszcze zostały piosneki z parametrem start==true to szukam, jeśli nie to losuję dowolną piosenkę szybką lub o średnim tempie:
            if ((checkExistence(songs,'bis', true) || checkExistence(songs,'bis','only')) && counter<100){
               var r = getRandom(0, songs.length-1);
               if (songs[r].bis == 'true' || songs[r].bis == true) {
                  setlist.push(songs[r]);
                  songs.splice(r,1);
               }
               counter++;
            } else {
               var r = getRandom(0, songs.length-1);
               if (songs[r].energyRating >=4 || songs[r].tempo == 'fast'){
                  setlist.push(songs[r]);
                  songs.splice(r,1);
               }
            }
         }
      }

      // teraz będę losował pozostałe piosenki w secie, dopóki nie zostanie przekroczony czas seta, albo dopóki nie skończą się piosenki w bazie. Losowanie
      while (checkDuration(setlist)<duration && songs.length>0){

         randomAndCheck(setlist, songs, showType, sets);
      }

      finalSetlist.push(setlist);
      console.log(finalSetlist);
      console.log(setlist);
      console.log(setNumber);
      songsLeft = songs;

      // tu się kończy pętla for zliczająca numer seta
   }


   // jeżeli w bazie pozostanie jakaś piosenka która ma parametr MustBe, to trzeba ją dodać w podpowiednie miejsce setlisty, wyszukując piosenkę, z którą możnaby ją zamienić (o w miarę podobnych parametrach)

   // function checkForMustBeSongs (songs, setlist) {
   //    var mustBeList = [];
   //    songs.forEach(function(element, index){
   //       if(element.mustBe == 'true') {
   //          mustBeList.push(element);
   //          songs.splice(index,1);
   //       }
   //    });
   //
   //    while (mustBeList.length>0){
   //       var r = getRandom(0,mustBeList.length-1);
   //       setlist.forEach(function(element, index){
   //
   //       })
   //    }
   // }


   checkDuration(setlist);
   checkDuration(songs);

   // tmpLog(songs,setlist);


   var $ul = $('#setList').empty();
   console.log(finalSetlist);
   finalSetlist.forEach (function(element, index){
      var hr = $('<hr>');
      $('#setList').append(hr);
      tmpDisplayLists(element, $ul);

   })
   var $ul2 = $('#rest').empty();
   tmpDisplayLists(songsLeft, $ul2);

};
// generateSetList(2000);

function tmpDisplayLists(list, $ul){
   $(list).each(function(index,el){
      var li = $('<li>',{class: 'song'}).text((index+1)+' '+ el.title);
      $ul.append(li);
   });
}
function tmpLog(songs,setlist){
   console.log(songs, '\n ---------');
   console.log('Aktualna setlista: ');
   setlist.forEach(function(element){
      console.log(element.title);
   });
   console.log('\nPiosenki które pozostały w bazie:');
   songs.forEach(function(element){
      console.log(element.title);
   });
}

// tu zdefiniowana jest funkcja do losowania piosenek w setliście, na podstawie kilku kryteriów
function randomAndCheck(setlist, songs, showType, sets){
   var r = getRandom(0, songs.length-1);
   var prev = (setlist.length>=2) ? setlist.length-2 : setlist.length-1;
   var song = songs[r];

   //jeżeli piosenka posiada jakieś specialne warunki(metodę conditionCheck), to wywołuję funckcję która ustawi wartość specialCondition na podstawie aktualnych danych o stetliście, bazie piosenek i wylosowanym indeksie);
   if (song.conditionCheck){
      song.conditionCheck(setlist,songs,r);
   }

   if (
      // ( sets>2 && (song.start==true || song.start=='etrue')) ||

      (song.bis == 'only') ||

      (song.tempo == 'slow' && (prev.tempo == 'slow'|| prev.tempo == 'moderate')) ||

      (prev.energyRating <= 2 && song.energyRating < 4 ) ||

      // (song.mustBe !== false && checkPrevious(setlist, 4,'mustBe',false)) ||

      (song.specialCondition) ||

      (showType =='concert' && song.only=='event') ||

      (showType=='event' && song.only=='concert' )
   ){
      randomAndCheck(setlist, songs, showType, sets);
   }else {
      setlist.insert(prev,song);
      console.log(songs[r]);
      songs.splice(r,1);
   }

}


// funkcja sprawdzająca czy piosenka o danym parametrze istnieje (np. czy są jeszcze piosenki nadające się na start, jeżeli nie to musimy wylosować jakąkolwiek, albo wyświetlić komunikat, że brakuje już takich piosenek);

function checkExistence(songs,prop,value){
   var result = songs.some(function(element) {
      return element[prop] == value;
   });
   return result;
}

function countLeft(songs, prop, value1, value2) {
   var counter = 0;
   var result;
   songs.forEach(function(element,index){
      if(element[prop] == value1 || element[prop] == value2){
         counter++;
         result=index;
      }
   });
   if (counter > 1){
      return true;
   }else if (counter == 1){
      return result;
   }else {
      return false;
   }
}

function checkPrevious(setlist,quantity,prop,value){
   if (setlist.length>quantity){
      for (var i=setlist.length-quantity; i<quantity; i++) {
         if(setlist[i][prop] == value){
            return true;
         }
      }
   } else {
      return false;
   }
}
