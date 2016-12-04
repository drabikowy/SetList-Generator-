// ********************Generator koncertowej listy piosenek!*******************

//Ideą aplikacji jest rozwiązanie problemu, z którym spotykam się grając w zespole muzycznym! Bardzo często, przed koncertem, zespół stara się przygotować listę piosenek, które odegrane zostaną na koncercie - ustawić je w odpowiedniej kolejności, wybrać którą piosenką zacząć, którą skończyć, co zagrać na bis, ile piosenek w ogóle uwzględnić, w zależności od czasu trwania koncertu, ilości setów, itd., jednocześnie przy ustalaniu kolejności, uwzględniane są takie własności piosenek, jak tempo, to czy dana piosenka jest hitem(ulubionym przez ludzi) itd. Niektóre piosenki grywamy tylko na prywatnych, zamkniętych imprezach, podczas gdy na normalnym koncercie raczej ich nie uwzględniamy, skupiając się na autorskim materiale. Zatem możliwość automatycznego wygenerowania listy uzględniającej wszystkie takie kryteria jest wspaniałym udogodnieniem!

// Wykorzystano: HTML, CSS(SASS), JavaScript, jQuery, PHP



// Projekt podzielony jest na moduły:
// song_base.js - plik zawierający konstruktor piosenek i bazę
// engine.js - plik zawierający wszystkie funkcje obliczeniowe związane z generowaniem listy
// app.js - plik łączący funckcjonalności i implementujący je do dokumentu HTML.





$('#generateSetList').click(function(){
   generateSetList(1000,3,'concert');
});
