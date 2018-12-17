# Grupp1 lampprojektet
**Linus, Simon, Elias**
Vår grupp hade i uppgift att göra en smart lampa som vi fick göra själva. Resultatet blev en lampa som både kan ändra styrkan och förhållandet mellan varmt och kallt men också stänga av lampan helt. Samt att vi ska kunna ändra det indirekta ljuset på lampan med en avståndssensor som vi kopplat till en mikrokontroller.

Vi gjorde på så sätt att vi skapade först en backend med **node**. Vi skapade en backend där vi gjorde funktionerna **GET**, **PATCH**; **DELETE** och **POST**.
Vi kopplade sedan denna backend med en **MySQLDatabas**. Vi gjorde en databas där vi lade in olika kolumner med värden vi sedan vill andvända. Tex **strength**, **cold**, **warm** mm.

Vi skapade sedan en frontend med **react native** där vi gjorde en app där vi dels har en animation men också där vi laggt in alla knappar och sliders. Vi skrev också funktioner där vi använde en **GET-** och **PATCH** -funktion där vi kan skicka värden via vår backend till vår databas.  

Både backend och frontend är skriva i språket **Javascript** .

Sedan så skrev vi en kod i **c++** som vi laddade upp på vår mikrokontroller. Där mikrokontrollern ansluter sig till wifi för att sedan göra en **GET** funktion via backenden som hämtar de nya värdena från databasen. Sedan så uppdaterar mikrokontrollern ledstripparna efter vilka värden vi har i databasen.

## Backend
* products.js - Backenden binder ihop frontenden och databasen samt mikrokontrollern

För att använda backenden så måste du ladda ner backendmappen. Sedan öppnar du filen/filerna i **VisualStudoCode** eller annat liknande program om du föredrar det. Sedan för att kunna använda backenden så måste du ladda ner alla **node modules**. Det gör du genom att skriva  **npm install** i terminalen. Sedan när alla **node modules** så skriver dy **npm start** i terminalen så startas backenden.

## Frontend 
* componentfunction.js - Där alla sliders och knappar ligger i en **component**
* ScreenHome.js - Vår första **screen**, detta är hemskärmen
* Login.js - En annan **component** där allt till loginskärmen ligger
* ScreenLogin.js - Vår andra **screen**, detta är loginskärmen
* HowToAnimation.js - Den sista **component** där allt till vår walkthrough ligger
* ScreenHowTo.js - Den tredje **screen**, detta är animationen 

För att använda frontenden så måste du ladda ned frontendmappen. Sedan öppnar du filen/filerna i **VisualStudoCode** eller annat liknande program om du föredrar det. Sedan för att kunna använda frontenden så måste du ladda ner alla **node modules**. Det gör du genom att skriva  **npm install** i terminalen. Detta måste du också göra med **expo** genom att skriva **npm install expo**.  Sedan när allt är nedladdat så skriver dy **npm start** i terminalen så startas frontenden. Du får då upp en instruktion i hur du öppnar appen beroende på vilket mobil du har. Du måste sedan ladda ned expo appen och sedan måste du komma ihåg att ha datorn och mobilen på samma internet.

## Mikrokontrollern
* wifimanager.ino - Koden som hämtar värden från databasen och ändrar ljusstyrkan 
* denvifaktisktanvänderlamao.ino - Avståndssensorn

För att kunna använda koden måste man ladda ner hela Mikrokontroller mappen. Därefter laddar man upp koden till microprocessorn. Om du vill använda avståndssensorfilen så är det bara att ladda upp till mikrkontrollerna. Men se till att kolla en extra gång på pinnarna ut så att du kopplar rätt. Om du vill andvända wifimanagern så ladda ned biblioteken som står i början av koden.

**Lycka till**