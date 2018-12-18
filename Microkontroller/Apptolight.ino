#include <ESP8266WiFi.h>     
//Både ArduinoJson och Wifimanager måste installeras som bibliotek, de finns med i bibliotekskatalogen, tänk att ArduinoJSon versionen som ska väljas är 5.13 och inte senaste.     
#include <ArduinoJson.h> // V 5.13 inte 6! https://arduinojson.org/?utm_source=meta&utm_medium=library.properties
//needed for library
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager
#define AI_Pot 0 
#define DO_LedHot 13 //Ledstripsport för varma ledlampor
#define DO_LedCold 12 //Ledstripsport för kalla ledlampor 


typedef enum HandStates{ //definerar att Handstates är en variabel med olika states, och definerar vilka olika "states" jag använder (i detta fall använder jag inte "hand"-statsen.
  UpdatingValues,
  Hand,
  Hand2,
  NoHand,
  NoHand2,
  HotCheck,
  HotUpdate,
  ColdCheck,
  ColdUpdate,
  Power
};

HandStates HState; //förkortar Handstates till HState

//void setup() {    pinMode(13, OUTPUT);
 //pinMode(13, OUTPUT);//Declare GPIO13 as output //I Lärar-Jockes exempelkod kunde man se om man gjort rätt genom att få en lampa som lyser, men jag föredrar att använda Serial.println(provtext)
  HState = UpdatingValues; //Här definar jag vilket state loopen längst ner ska börja på, mer om det sedan.
    // put your setup code here, to run once:
    Serial.begin(115200); //Här skriver jag vilken kanal saker ska loggas i konsolen (serial monitor). 
  //Från Wifimanagers hemsida.
    //WiFiManager
    //Local intialization. Once its business is done, there is no need to keep it around
    WiFiManager wifiManager; //kör wifimanager
    //reset saved settings ANVÄND DETTA OM DU BEHÖVER BYTA KONTROLLERNS WIFI
    //wifiManager.resetSettings();
    
    //set custom ip for portal

    //wifiManager.setAPStaticIPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));

    //fetches ssid and pass from eeprom and tries to connect
    //if it does not connect it starts an access point with the specified name
    //here  "AutoConnectAP"
    //and goes into a blocking loop awaiting configuration
    wifiManager.autoConnect("Elias_waifai"); //Skapar ett wifi-"nätverk" som man kan koppla upp sig mot för att se till att mikrokontrollern ansluter till rätt wifi.
    //or use this for auto generated name ESP + ChipID
    //wifiManager.autoConnect();

    //if you get here you have connected to the WiFi
    Serial.println("connected...yeey :)");

}
  // put your setup code here, to run once:
String Lampname="A"; //Lampans namn
 int Coldvalue= 0; //Hårdheten
 int Hotvalue= 0; //Styrkan
 bool Powervalue = 0; //en bool om lampan ska vara på eller av
 bool Sensorsetting = 0; //en bool om sensorn ska vara på eller av
 int Timervalue = 0;  //en timer som inte stöttades av appen, därför används inte denna något mer. Har du tid över, klura på hur du kan göra en timer! 
 int PotValue = 0; //Sensorvärdet
 bool LampExist=false; //Finns lampan redan eller är den ny?
 bool GottenValues = false; //Har vi hämtat några värden redan från databasen?

String GetfromDB(String host){ //Kör processen getfromdb i hosten 
String url= "/products/"+Lampname; //Urlen jag använder för att posta mina värden
  // Detta skickar värdena till servern.
   String Output ="GET "+ url + " HTTP/1.1\r\n" + //Säger att det är typen post, kan vara patch, get,delete beroende på vad man vill göra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till
                 "\r\nConnection: close\r\n\r\n"; //skickar vår buffer som  body
 return Output; //Skriver outputen (din tabells värden

}

String SendtoDB(String host){ //kör sendtodb i host
  String type ="POST "; //stringtype är Post"
  if(GottenValues==true) //om Man har fått värderna, gör detta
  {
  String url= "/light/"; //Definerar urlen jag använder för att posta mina värden
   
  StaticJsonBuffer<300> jsonBuffer; //Skapar en buffer, det vill säga så mycket minne som vårt blivande jsonobjekt får använda.
  JsonObject& root = jsonBuffer.createObject(); //Skapar ett jsonobjekt som vi kallar root
  root["Name"] = Lampname; //Skapar parameterna name och ger den värdet: Lampname
  root["Hot"] = Hotvalue; //Hotvalue
  root["Cold"] = Coldvalue; //Coldvalue
  root["Timer1min"] = Timervalue; //Timervalue
  root["SensorSetting"]= Sensorsetting;//Sensorsetting
  root ["Power"] = Powervalue; // och slutligen, Powervalue
  String buffer;  //Skapar en string som vi kallar buffer
  root.printTo(buffer); //Lägger över och konverterar vårt jsonobjekt till en string och sparar det i buffer variabeln.
  if(LampExist==true) //Om lampan finns, då ska man göra en patch
  {
  type ="PATCH ";
      Serial.println("Uppdaterar värdet!"); //I vårat projekt ändrades aldrig värden via arduinon, utan istället via en app. Därför kommer inte värden uppdateras, men jag valde att ha kvar detta ändå
  }
//här någonstans ska jag anvädna POST eller PATCH beroende på om värdet finns!!!!
  // Detta skickar värdena till servern.
   String Output =type+url + " HTTP/1.1\r\n" + //Säger att det är typen post, kan vara patch, get,delete beroende på vad man vill göra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till
                 "Content-Type: application/json\r\n" + //Säger att det är Json format vi skickar (dock konverterat till en string för att kunna skickas.
                 "Content-Length: " + buffer.length() + "\r\n" + //Berättar hur stort packet vi ska skicka.
                 "\r\n" + // Detta är en extra radbrytning för att berätta att det är här bodyn startar.
                 buffer + "\n"; //skickar vår buffer som  body
 
 return Output; //Returna bodyn tillbaka
  }
  else //eller
  return ""; //Om det inte går att returna bodyn, returna inget. 
}

void ConnecttoDB(String input){ //Processen ConnecttoDB, Denna körs först.

   const int httpPort = 3000; //porten vi ska till
  const char* host = "iot.abbindustrigymnasium.se";//Adressen vi ska ansluta till.  "http://iot.abbindustrigymnasium.se"lokalt, eller 193.41.215.179 annars
    
     Serial.print("connecting to ");
 Serial.println(host); //Skriver ut i terminalen för att veta vart vi ska skicka värdena.
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  if (!client.connect(host, httpPort)) { //Försöker ansluta
    Serial.println("connection failed");
    return;
  }
  else  //Om vi kan ansluta så ska lampa lysa i Joakims fall, men vi ber programmet skriva "connected"
  {
    Serial.println("connected");//digitalWrite(13, HIGH);
    }
if(input =="GET") //om inputen är "GET" (längre ner)
client.print(GetfromDB(host)); //kör get from DB i hosten
else
client.print(SendtoDB(host)); //annars, kör SendtoDB i hosten.

  unsigned long timeout = millis(); //om det inte funkar, "clienttimeout".
  while (client.available() == 0) {
    if (millis() - timeout > 10000) {
      
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

String json = ""; //De delarna vi vill ha ut av meddelandet sparar vi i stringen json
boolean httpBody = false; //bool för att säa att vi har kommit ner till bodydelen
// tittar om vi har anslutit till clienten
while (client.available()) {
  String line = client.readStringUntil('\r'); //Läser varje rad tills det är slut på rader
  if (!httpBody && line.charAt(1) == '{') { //Om vi hittar { så vet vi att vi har nått bodyn
    httpBody = true; //boolen blir true för att vi ska veta för nästa rad att vi redan är i bodyn
  }
  if (httpBody) { //Om bodyn är sann lägg till raden i json variabeln
    json += line;
  }
}
//Skriver ut bodyns data
    Serial.println("Got data:");
    Serial.println(json); //skriv jsonet
  if(input =="GET") //Om det är Get så kör vi metoden UpdateValues
    UpdateValues(json); 

  Serial.println();
  Serial.println("closing connection"); //stänger sedan connectionen
}

void UpdateValues(String json){ //Processen Updatevalues
   Serial.println("1"+Lampname); //Skriver ut lampnamnet och en etta: detta gjordes för felsökning
      //Vi skapar ett Jsonobjekt där vi klistrar in värdena från bodyn
      StaticJsonBuffer<400> jsonBuffer; //skapar en buffer med 400 karaktärer max
    JsonObject& root = jsonBuffer.parseObject(json);
    //Vi skapar sedan lokala strings där vi lägger över värdena en i taget
    String dataA = root["Name"]; //Den som heter "Name" i databasen kommer bli dataA
         if(dataA!="none") //Om dataA inte är "none", skriv över vad som står i övriga kolumner. Döp dessa till dataB, dataC osv.. 
         {
    bool dataB = root["Power"]; 
    bool dataC = root["SensorSetting"];
    int dataD = root["Timer1min"];
    int dataE = root["Hot"];
    int dataF = root["Cold"];
    
    //Därefter skriver vi över de lokala värdena till våra globala värden för lampan
     Lampname = dataA; //dataA heter nu Lampname i framtiden
     Powervalue =dataB; //dataB heter Powervalue
     Sensorsetting = dataC; //DataC = Sensorsetting
     Timervalue = dataD; //DataD = Timervalue
     Hotvalue = dataE; //DataE = Hotvalue
     Coldvalue = dataF; //DataF = Coldvalue

       LampExist=true; //Nu vet vi att lampan existerar, så sätter bool till sann.
     Serial.print(Coldvalue); //skriv ut coldvalue för att prova.
     
}
         else
         {

          String Mess =root["message"]; //annars, skriv ut ett meddelande
         Serial.print(Mess);

         }
         Serial.println("2"+Lampname); //felsökning
 GottenValues = true; //vi har nu fått värderna, sätt boolen till sann. 
}

void UpdatingLamp(){ //funktionen "UpdatingLamp". Denna används för att se om lampan skulle vara tänd eller släkt
  if(Hotvalue>50) //Kravet för att lampan skulle tändas var att hotvalue (i början hette värdet "strengthvalue" eller "hardvalue"
  Serial.println("coolshit"); //okej, lampan skulle vara tänd
else
  Serial.println("uncoolshit"); //Okej lampan skulle vara släkt
}
void loop() { //allt detta loopas
   switch (HState){ //det går och byta states via HSTATE
  case UpdatingValues: //första statet, det vi anropar som startstate högre upp i koden.
 ConnecttoDB("GET");  //Här kör man ConnecttoDB med GET som input. 
  UpdatingLamp(); //sedan kör man updatinglamp, något vi igentligen skulle klara oss utan. Men, dont fix what aint broken
  delay(1000);
  ConnecttoDB("POST"); //kör sedan ConnecttoDB med POST som input.
HState = Power; //Byt state till power

    case Power: //statet power
    delay(100);
    if (Powervalue = false) { //om lampan ska vara av, kör detta
    HState = UpdatingValues; //gå tillbaka till state power(detta skapar en loop tills man sätter på lampan)
    Serial.println("OFF"); //Skriv i terminalen att lampan ska vara "OFF"
      analogWrite(DO_LedHot,0); //Sätt ljusstyrkan på¨de varma lamporna till 0  
   analogWrite(DO_LedCold, 0); //sätt ljusstyrkan på den kalla lamporna till 0  
    } else {  //annars
 
    }
   /* if (Sensorsetting = true) { 
      HState = NoHand;
    } else {
      HState = HotCheck;
    }*/ //den här koden används inte, för vi ska alltid gå till hotcheck, eftersom handfunktionen styr andra lampor (ligger kommenterad separat.
    HState = HotCheck; //byt till hot check
    break;
     
     /* case NoHand: //som sagt, används inte
      PotValue = analogRead(AI_Pot); 
      Serial.println(PotValue);
      delay(100);
    if (PotValue > 25)  {
      HState = Hand;
    } else {
      Serial.print("a");
      HState = Power;
    }
  break;
   case Hand:
      PotValue = analogRead(AI_Pot);
      Serial.println(PotValue);
      delay(100);
    if (PotValue < 25)  {
      HState = NoHand2;
    } else {
      Serial.print("b");
      HState = Hand;
    }    
    case NoHand2:
      for (int q=0; q <= 50; q++){
        PotValue = analogRead(AI_Pot);
        Serial.println(PotValue);
        delay(100);
      if (PotValue > 25) {
        HState = Hand2;
        break;
      } else {
        Serial.print("c");
        }
      }
    if (PotValue < 25){
      HState = NoHand;
    }
  break;
   case Hand2:
      PotValue = analogRead(AI_Pot);
      Serial.println(PotValue);
      if (PotValue < 25) {
        HState=NoHand;
      } 
      else {
      Serial.print("d");
      analogWrite(DO_LedCold, PotValue*10);
      delay(100);
      HState = Hand2;
      }
  break;*/
  case HotCheck: // Från början hade jag tänkt att jag behövde två states, en som letade efter värdet och en som låste det (likt handfunktionen) Sedan kom jag på att det igentligen bara krävdes ett
    Serial.println(Hotvalue); //Skriver de varma lampornas ljusstyrka
    delay(100); 
    if (Hotvalue >=0) { //om hotvalue är större än (eller är) 0 så...
      HState = HotUpdate ; //byt state
    } else { //annars används aldrig här, då hotvalue aldrig är mindre än 0. 
      Serial.print("HotCheck");
      HState = ColdCheck;
    }    
  break;
   case HotUpdate:        //HotUpdate
         Serial.println(Hotvalue); //Skriver hotvaluet igen (för att veta vilket steg vi är på)
         delay(100);
         analogWrite(DO_LedHot, Hotvalue*10); //Sätt varma lampans ljusstyrka till Hotvalue*10 (detta för att om det bara hade varit 0-100 som varit värdet, hade man inte kommit nära max ljusstyrka som jag tror ligger på 1023
         HState = ColdCheck ; //byter till coldcheck
  break;

   case ColdCheck: //detta är samma som hotfunktionerna, bara att de byter kalla lampans värde istället.
    Serial.println(Coldvalue);
    delay(100); 
    if (Coldvalue >= 0) {
      HState = ColdUpdate;
    }
  break;
    
    case ColdUpdate:        
         Serial.println(Coldvalue);
         delay(100);
         analogWrite(DO_LedCold, Coldvalue*10);
         HState = UpdatingValues;      //här skiljer sig dock den kalla funktionen åt, för när alla lampor har blivit uppdaterade så går programmet tillbaka till statet "UpadingValues".
 

}
}

 





