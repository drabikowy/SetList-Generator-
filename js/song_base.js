
//Tworzę konstruktor klasy Song, który posłuży do dodawania piosenek do bazy:

// każda piosenka zawierać będzie nstępujące właściwości:

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
//conditionCheck (method) - domyślnie brak;



function Song(title, mustBe, duration, tempo, energyRating, start, end, bis, only) {

   this.title = title;
   this.mustBe = mustBe;
   this.duration = duration;
   this.tempo = tempo;
   this.energyRating = energyRating;
   this.start = start;
   this.end = end;
   this.bis = bis;
   this.only = only;
   this.specialCondition = false;
   this.conditionCheck;

}


//Dodaję piosenki do bazy:
// ************************ songlist: *********************************************

var flipFlop = new Song ("Flip Flop",true, 180, "fast", 5, true, true, true, false);
var iLikePie = new Song ("I Like Pie I Like Cake",true, 150, "fast", 5, false, false, false, false);
var holdOn = new Song("Hold On",false, 210, "fast", 4, true, true, true, false);
var wayDown = new Song ("Way Down",true, 310, "slow", 1, false, false, false, "concert");

// przykładowe ustawienie parametru specialCondition: piosenka Way Down nie powinna występować na początku setlisty - dlatego podczas losowania sprawdzę jej aktualną długość - jeżeli ma mniej niż 5 piosenek, to nie mogę wstawić piosenki Way Down, a więc specialCondition ustawi się na 'true';
wayDown.conditionCheck = function(setlist, songs, index){
   if (setlist.length < 5) {
      this.specialCondition = true;
   }else {
      this.specialCondition = false;
   }
}

var missunderstood = new Song ("Don't Let Me Be Missunderstood", true, 230, "moderate", 4, false, true, true, false);
var builtForComfort = new Song("Built For Comfort",false, 270, "moderate", 3, "etrue", false, false, false);
var plenty = new Song("That's A Plenty",true, 200, "fast", 5, false, false, false, false);
var hallelujah = new Song("Hallelujah I Love Her So",true, 180, 4, false, false, false, false);
var cantJudge = new Song("Can't Judge A Book",false, 270, "fast", 5, "etrue", true, true,"event");
var iWasMade = new Song("I Was Made For Loving You",false, 315, "slow", 1, false, false, false, "concert");
var hotStuff = new Song("Hot Stuff",false, 170, "fast", 5, false, false, true, false);
var midnightHour = new Song("In The Midnight Hour",true,260, "moderate", 4, "etrue", false, false, false);
var saveMySoul = new Song ("Save My Soul",true, 300, false, false, false, "concert");
var redHouse = new Song("Red House", false, 300,"moderate", 4, "etrue", false, false, false );

var longTrain = new Song("Long Train Running", true, 300, "fast", 5, "etrue", true, false, false);
longTrain.conditionCheck = function(setlist, songs, index){
   if (this.title == 'Long Train Running' && setlist[setlist.length-1].title == "Kawliga") {
      this.specialCondition = true;
   }
}

var goingAway = new Song("Going Away", true, 300, "moderate", 3, "etrue", false, false, false);
var happy = new Song("Happy Without", true, 300, "moderate", 3, "etrue", false, false, false);
var moneymaker = new Song("Moneymaker", true, 200, "fast", 5, false, true, true, false);
var kawliga = new Song("Kawliga", false, 300, "fast", 3, false, false, false, false);
var blackMagic = new Song("Black Magic Woman", false, 320, "slow",3, false, false, false, "event");



var songDatabase = [
   flipFlop,
   iLikePie,
   holdOn,
   wayDown,
   missunderstood,
   builtForComfort,
   plenty,
   hallelujah,
   cantJudge,
   iWasMade,
   hotStuff,
   midnightHour,
   saveMySoul,
   redHouse,
   goingAway,
   kawliga,
   happy,
   blackMagic,
   moneymaker
];

function rewriteToJSON(song){
   document.write(
      '{<br>'+
      '<br>"title": "'+ song.title +'",' +
      '<br>"mustBe": "'+ song.mustBe +'",' +
      '<br>"duration": "'+ song.duration +'",' +
      '<br>"tempo": "'+ song.tempo +'",' +
      '<br>"energyRating": "'+ song.energyRating +'",' +
      '<br>"start": "'+ song.start +'",' +
      '<br>"end": "'+ song.end +'",' +
      '<br>"bis": "'+ song.bis +'",' +
      '<br>"only": "'+ song.only +'",' +
      '<br>"specialCondition": "'+ song.specialCondition +'",' +
      '<br>"conditionCheck": "'+ song.conditionCheck +'",' +


      '<br><br>},<br><br>'
   )
}




function loadContent(){
      var ajax = $.ajax({
         url: 'http://localhost/generator/songBase.json',
         dataType: 'json',
      }).done(function(response) {
         $.each(response, function(i,el){
            console.log(el.title);
         })
      }).fail(function() {
         console.log("error");
      }).always(function() {
         console.log("complete");
      });
   }
