// funkcja losująca liczbę z danego przedziału:
function getRandom (min, max){

   return Math.floor(Math.random() * (max - min +1)) + min;
};

function shuffle(array) {
   var j, x, i;
   for (i = array.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = array[i - 1];
      array[i - 1] = array[j];
      array[j] = x;
   }
   return array;
}


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
            console.log('Losuj jeszcze raz brakło piosenek');
            break;
         }
         counter++;
      }

      finalSetlist.push(setlist);
      console.log(finalSetlist);
      console.log(setlist);
      console.log(setNumber);
      songsLeft = songs;

      // tu się kończy pętla for zliczająca numer seta
   }

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
function randomSongs(setlist, songs, showType, sets, setNumber){
   var prev = (setlist.length>2) ? setlist.length-2 : setlist.length-1;

   for (var r=0; r<songs.length; r++){
      var song = songs[r];
      //jeżeli piosenka posiada jakieś specialne warunki(metodę conditionCheck), to wywołuję funckcję która ustawi wartość specialCondition na podstawie aktualnych danych o stetliście, bazie piosenek i wylosowanym indeksie);
      if (song.conditionCheck){
         song.conditionCheck(setlist,songs,r);
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
         console.log(songs[r]);
         songs.splice(r,1);
         shuffle(songs);
         return true;
      }
   }
   return false;
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



function checkStart(songs, setlist, start){
   for (var r=0; r<songs.length; r++) {
      if(songs[r].start == start){
         setlist.push(songs[r]);
         console.log('WYLOSOWANO PIOSENKĘ STARTOWĄ-POPRAWNIE' + songs[r].title);
         songs.splice(r,1);
         return true;
      }
   }
   for (var r=0; r<songs.length; r++) {
      if(songs[r].energyRating>=4){
         setlist.push(songs[r]);
         songs.splice(r,1);
         console.log('WYLOSOWANO PIOSENKĘ STARTOWĄ bez paramtru start' + songs[r].title);
         return true;
      }
   }
   return false;
}
function checkEnd(songs, setlist){
   for (var r=0; r<songs.length; r++) {
      if(songs[r].end == true){
         setlist.push(songs[r]);
         console.log('WYLOSOWANO PIOSENKĘ Końcową-POPRAWNIE' + songs[r].title);
         songs.splice(r,1);
         return true;
      }
   }
   for (var r=0; r<songs.length; r++) {
      if (songs[r].energyRating >4 || songs[r].tempo == 'fast'){
         setlist.push(songs[r]);
         console.log('WYLOSOWANO PIOSENKĘ STARTOWĄ bez paramtru end' + songs[r].title);
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
         console.log('PIOSENKA NA BIS, z PARAMETREM BIS: '+ songs[r].title);
         songs.splice(r,1);
         return true;
      }
   }
   for (var r=0; r<songs.length; r++) {
      if (songs[r].energyRating >4 || songs[r].tempo == 'fast'){
         setlist.push(songs[r]);
         console.log('WYLOSOWANO PIOSENKĘ BIS bez paramtru bis' + songs[r].title);
         songs.splice(r,1);
         return true;
      }
   }
   return false;
}
