
//Tworzę konstruktor klasy Song, który posłuży do dodawania piosenek do bazy:

// każda piosenka zawierać będzie nstępujące właściwości:
//
// title - tytuł piosenki
// duration - czas trwania (s)
// mustBe - (true/false) - określenie czy dana piosenka musi być uwzględniona w liście
// tempo - ('slow'/'moderate'/'fast')
// energyRating - (1-5) - określa siłę i energię pioenski
// start - (true/false/'etrue'/'only') - czy dana piosenka pasuje na początek seta, czy nie (wartość etrue oznacza że podczas ustalania setów na imprezy prywatne piosenka może być uwzględniona jako początkowa, inaczej nie) only oznacza, że piosenka nadaje się tylko na początek
// end - (true/false) - czy dana piosenka pasuje na koniec seta
// bis - (true/false/'only') - czy dana piosenka może być zagrana na bis, 'only' oznacza że nadaje się tylko na bis
// only - ('event'/'concert'/false)  - czy ma być uwzględniana tylko na imprezach zamkniętych czy tylko na koncertach, czy zawsze
// specialCondition - true/false - niektóre piosenki nie powinny występować po innych, albo w pierwszej części koncertu// jeżeli false - brak warunku, jeżeli true - piosenka nie może być wstawiona - domyślnie parametr przyjmie funkcję false, ale jeżeli piosenka ma jakieś szczególne warunki to zostanie on zmieniony na true za pomocą poniższej metody: conditionCheck
// conditionCheck (method) - domyślnie brak;



function Song(title, mustBe, duration, tempo, energyRating, start, end, bis, only,specialCondition, conditionCheck) {
   this.stringConvert = function(string){
      if (typeof(string)==='string') {
         if(string === 'false' || string==='0'){
            return false;
         }
         if(string === 'true' || string==='1'){
            return true;
         }
      }
      return string;
   };

   this.title = title;
   this.mustBe = this.stringConvert(mustBe);
   this.duration = parseInt(duration);
   this.tempo = tempo;
   this.energyRating = parseInt(energyRating);
   this.start = this.stringConvert(start);
   this.end = this.stringConvert(end);
   this.bis = this.stringConvert(bis);
   this.only = this.stringConvert(only);
   this.specialCondition = this.stringConvert(specialCondition);
   this.conditionCheck = conditionCheck;
}


var songDatabase =[];
loadContent();

function loadContent(){
   var ajax = $.ajax({
      url: 'http://localhost/generator/php/getSongs.php',
      dataType: 'json',
   }).done(function(response) {

      response.songs.forEach(function(s,index){
         var newSong = new Song(s.title,s.mustBe,s.duration,s.tempo,s.energyRating,s.start,s.end,s.bis,s.only,s.specialCondition,s.conditionCheck);
         songDatabase.push(newSong);
      });
   }).fail(function() {
      console.log("error");
   }).always(function() {
      console.log("Wczytano piosenki z bazy danych");
   });
}

function addToDatabase(song){
   $.ajax({
      url: 'http://localhost/generator/php/addSongs.php',
      type: 'POST',
      data: song
   })
   .done(function(done) {
      console.log(done);
      loadContent();
   })
   .fail(function(error) {
      console.log(error);
   })
   .always(function() {
      console.log("complete");
   });
}

$(document).ready(function() {

   $('#songAddForm').on('submit',function(e){
      e.preventDefault();

      var title = $("input[name='title']").val();
      var duration = $("input[name='duration']").val();
      var mustBe =  $("input[name='mustBe'][checked]").val();
      var tempo = $("select[name='tempo']>option[selected]").val();
      var energyRating = $("input[name='energyRating'][checked]").val();
      var start = $("input[name='start'][checked]").val();
      var end = $("input[name='end'][checked]").val();
      var encore = $("input[name='bis'][checked]").val();
      var only = $("select[name='only']>option[selected]").val();
      var pass = $('input[type="password"]').val();
      var specialCondition = 0;
      var conditionCheck;

      if(title.length<5) {
         alert('Title must contain at least 5 characters!');
      }else if (pass != "ksb") {
         alert('To add a song you have to give the safety code')
      }else {


         var songToAdd = {
            title : title,
            duration : duration,
            mustBe :  mustBe,
            tempo :  tempo,
            energyRating : energyRating,
            start : start,
            end : end,
            bis : encore,
            only : only,
            specialCondition : specialCondition,
            conditionCheck : conditionCheck

         }


         console.log(songToAdd);
         console.log(title, duration, mustBe, tempo, energyRating, start, end, encore, only,specialCondition,conditionCheck);

         addToDatabase(songToAdd);
         listSongs(songDatabase);
      }
   });



});

function listSongs(database){
   $('.listOfSongs').remove();
   var baseList = $('<ul>',{class: 'listOfSongs'})
   $(database).each(function(index,song){
      var newLi = $('<li>').text((index+1) +' '+song.title);
      console.log(song.title);
      newLi.appendTo(baseList);
   });
   $('.database').append(baseList);
}
