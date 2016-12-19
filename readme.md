# Kraków Street Band SetList Generator! #
Aplikacja dostępna pod adresem:
[www.drabikowy.unixstorm.org/generator_ksb](www.drabikowy.unixstorm/generator_ksb) <br>

Opis projektu:<br>

Ideą aplikacji jest rozwiązanie problemu, z którym spotykam się grając w zespole muzycznym! Bardzo często, przed koncertem, zespół stara się przygotować listę piosenek, które odegrane zostaną na koncercie - ustawić je w odpowiedniej kolejności, wybrać którą piosenką zacząć, którą skończyć, co zagrać na bis, ile piosenek w ogóle uwzględnić, w zależności od czasu trwania koncertu, ilości setów, itd., jednocześnie przy ustalaniu kolejności, uwzględniane są takie własności piosenek, jak tempo, to czy dana piosenka jest hitem(ulubionym przez ludzi) itd. Niektóre piosenki grywamy tylko na prywatnych, zamkniętych imprezach, podczas gdy na normalnym koncercie raczej ich nie uwzględniamy, skupiając się na autorskim materiale.
Zatem możliwość automatycznego wygenerowania listy uzględniającej wszystkie takie kryteria jest wspaniałym udogodnieniem!

#### Wykorzystano:
JavaScript, jQuery, AJAX, JSON, PHP, HTML, CSS(SASS), RWD & Adobe Photoshop

#### Dodatkowo:
jQueryUI, jQueryUI Touch-Punch, animateCss

### Struktura projektu:
Projekt podzielony jest na moduły: <br>
**basic.js** - zawiera podstawowe funkcje (również rozszerzające metody obiektów JS)<br>
**song_base.js** - plik zawierający konstruktor klasy Song oraz funkcje związane z ładowaniem bazy (AJAX)<br>
**engine.js** - plik zawierający wszystkie funkcje obliczeniowe związane z generowaniem listy<br>
**app.js** - plik łączący funckcjonalności i implementujący je do dokumentu HTML.

W folderze **/php** znajdują się pliki odpowiedzialne za komunikację z bazą danych (pobieranie i dodawanie nowych piosenek);

Pliki **scss** również podzielone są na kategorie, aby łatwiej odnaleźć się w kodzie.

### Parametry piosenek:
każda piosenka zawierać będzie nstępujące właściwości:

*  **title** - tytuł piosenki
* **duration** - czas trwania (s)
* **mustBe** - (true/false) - określenie czy dana piosenka musi być uwzględniona w liście
* **tempo** - ('slow'/'moderate'/'fast')
* **energyRating** - (1-5) - określa siłę i energię pioenski
* **start** - (true/false/'etrue'/'only') - czy dana piosenka pasuje na początek seta, czy nie (wartość etrue oznacza że podczas ustalania setów na imprezy prywatne piosenka może być uwzględniona jako początkowa, inaczej nie) only oznacza, że piosenka nadaje się tylko na początek
* **end** - (true/false) - czy dana piosenka pasuje na koniec seta
* **bis** - (true/false/'only') - czy dana piosenka może być zagrana na bis, 'only' oznacza że nadaje się tylko na bis
* **only** - ('event'/'concert'/false)  - czy ma być uwzględniana tylko na imprezach zamkniętych czy tylko na koncertach, czy zawsze
* **specialCondition** - true/false - niektóre piosenki nie powinny występować po innych, albo w pierwszej części koncertu// jeżeli false - brak warunku, jeżeli true - piosenka nie może być wstawiona - domyślnie parametr przyjmie funkcję false, ale jeżeli piosenka ma jakieś szczególne warunki to zostanie on zmieniony na true za pomocą poniższej metody: conditionCheck
* **conditionCheck (method)** - domyślnie brak;

### Generowanie i modyfikowanie SetListy:

1. Aby wygenerować setlistę wystaczy nacisnąć odpowiedni przycisk, opcjonalnie wybierając parametry w rozwijanym menu na dole strony, takie jak:  **Ilość setów**, **długość trwania jednego seta**, **opcja Event**.

2. Po wygenerowaniu setlisty poszczególne piosenki można przesuwać (drag&drop).
3. Aby usunąć piosenkę z setlisy, przeciągnij ją na lewą stronę ekranu - znajduje się tam panel niewykorzystanych piosenek.

4. Po kliknięciu tego panelu, pojawi się lista piosenek, które można przeciągać i upuszczać w wygenerowanej setliście, tym samym dodając nowe piosenki.


### Baza piosenek
Aplikacja pozwala również dodawać nowe piosenki do bazy, za pomocą Ajax,
Po kliknięciu **Add a song** pojawi się formularz, gdzie można ustawić wszystkie wymagane parametry piosenki i wysłać ją do bazy danych MySQL.
Safety code, to: 'ksb'.
