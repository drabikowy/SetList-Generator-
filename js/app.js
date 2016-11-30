// ********************Generator koncertowej listy piosenek!*******************

//Ideą aplikacji jest rozwiązanie problemu, z którym często spotykam się grając w zespole muzycznym! Bardzo często, przed koncertem, zespół stara się przygotować listę piosenek, które odegrane zostaną na koncercie - ustawić je w odpowiedniej kolejności, wybrać którą piosenką zacząć, którą skończyć, co zagrać na bis, ile piosenek w ogóle uwzględnić, w zależności od czasu trwania koncertu, ilości setów, itd., jednocześnie przy ustalaniu kolejności, uwzględniane są takie własności piosenek, jak tempo, to czy dana piosenka jest hitem(ulubionym przez ludzi) itd. Niektóre piosenki grywamy tylko na prywatnych, zamkniętych imprezach, podczas gdy na normalnym koncercie raczej ich nie uwzględniamy, skupiając się na autorskim materiale. Zatem możliwość automatycznego wygenerowania listy uzględniającej wszystkie takie kryteria jest wspaniałym udogodnieniem!



// Projekt podzielony jest na moduły:
   // song_base.js - plik zawierający bazę piosenek
   // engine.js - plik zawierający wszystkie obliczenia związane z generowaniem listy
   // app.js - plik łączący funckcjonalności i implementujący je do dokumentu HTML.



function getRandom (min, max){
   return Math.floor(Math.random() * (max - min +1)) + min;
}



// losowanie: while (dopóki songlist nie jest pusta, bądź łączny czas nie zostanie przekroczony);
function(concertType, sets, duration)
function random() {

   var tmpSongBase = songBase;
   var tmpSetlist = [];

   //na początku losuję pierwszą piosenkę:

   while (tmpSetlist.length < 1) {
      var r = getRandom(0, tmpSongBase.length-1);
      if (tmpSongBase[r].start == true) {
         tmpSetlist[0] = tmpSongBase[r].title;
         tmpSongBase.splice(r);
      }
   }

console.log(songBase, '\n ---------');
console.log(tmpSongBase, '\n ---------');
console.log(tmpSetlist, '\n ---------');


   // while (tmpSongBase.length>0) {
   //    var r = getRandom(0, tmpSongBase.length-1);
   // }
};

random();
