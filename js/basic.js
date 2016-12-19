// funkcja losująca liczbę z danego przedziału:
function getRandom (min, max){

   return Math.floor(Math.random() * (max - min +1)) + min;
};

// losowe ustawienie elementów tablicy:
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

// Funkcja rozszerzająca jQuery o funkcję umożliwiającą korzystanie z biblioteki css - animateCss
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

// Funkcja do animowanego obracania elementów
$.fn.animateRotate = function(startAngle, endAngle, duration, easing, complete){
    return this.each(function(){
        var elem = $(this);

        $({deg: startAngle}).animate({deg: endAngle}, {
            duration: duration,
            easing: easing,
            step: function(now){
                elem.css({
                  '-moz-transform':'rotate('+now+'deg)',
                  '-webkit-transform':'rotate('+now+'deg)',
                  '-o-transform':'rotate('+now+'deg)',
                  '-ms-transform':'rotate('+now+'deg)',
                  'transform':'rotate('+now+'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};
