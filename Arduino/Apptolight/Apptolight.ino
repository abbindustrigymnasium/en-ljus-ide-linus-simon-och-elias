#include <ESP8266WiFi.h>     
//Både ArduinoJson och Wifimanager måste installeras som bibliotek, de finns med i bibliotekskatalogen, tänk att ArduinoJSon versionen som ska väljas är 5.13 och inte senaste.     
#include <ArduinoJson.h> // V 5.13 inte 6! https://arduinojson.org/?utm_source=meta&utm_medium=library.properties
//needed for library
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager
#define AI_Pot 0 
#define DO_LedHot 12 //Ledstripsport för varma
#define DO_LedCold 13


typedef enum HandStates{
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

HandStates HState;

void setup() {    pinMode(13, OUTPUT);
 pinMode(13, OUTPUT);//Declare GPIO13 as output
  HState = UpdatingValues;
    // put your setup code here, to run once:
    Serial.begin(115200);
  //Från Wifimanagers hemsida.
    //WiFiManager
    //Local intialization. Once its business is done, there is no need to keep it around
    WiFiManager wifiManager;
    //reset saved settings
    //wifiManager.resetSettings();
    
    //set custom ip for portal
    //wifiManager.setAPStaticIPConfig(IPAddress(10,0,1,1), IPAddress(10,0,1,1), IPAddress(255,255,255,0));

    //fetches ssid and pass from eeprom and tries to connect
    //if it does not connect it starts an access point with the specified name
    //here  "AutoConnectAP"
    //and goes into a blocking loop awaiting configuration
    wifiManager.autoConnect("Connecttor");
    //or use this for auto generated name ESP + ChipID
    //wifiManager.autoConnect();

    //if you get here you have connected to the WiFi
    Serial.println("connected...yeey :)");

}
  // put your setup code here, to run once:
String Lampname="A"; //Lampans namn
 int Coldvalue= 0; //Hårdheten
 int Hotvalue= 0; //Styrkan
 bool Powervalue = 0; 
 bool Sensorsetting = 0; 
 int Timervalue = 0;  
 int PotValue = 0; //
 int ZeroValue = 0;
 bool LampExist=false; //Finns lampan redan eller är den ny?
 bool GottenValues = false; //Har vi hämtat några värden redan från databasen?

String GetfromDB(String host){
String url= "/products/"+Lampname; //Urlen jag använder för att posta mina värden
  // Detta skickar värdena till servern.
   String Output ="GET "+ url + " HTTP/1.1\r\n" + //Säger att det är typen post, kan vara patch, get,delete beroende på vad man vill göra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till
                 "\r\nConnection: close\r\n\r\n"; //skickar vår buffer som  body
 return Output;

}

String SendtoDB(String host){
  String type ="POST ";
  if(GottenValues==true)
  {
  String url= "/light/"; //Urlen jag använder för att posta mina värden
   
  StaticJsonBuffer<300> jsonBuffer; //Skapar en buffer, det vill säga så mycket minne som vårt blivande jsonobjekt får använda.
  JsonObject& root = jsonBuffer.createObject(); //Skapar ett jsonobjekt som vi kallar root
  root["Name"] = Lampname; //Skapar parameterna name och ger den värdet Vykort
  root["Hot"] = Hotvalue;
  root["Cold"] = Coldvalue;
  root["Timer1min"] = Timervalue;
  root["SensorSetting"]= Sensorsetting;
  root ["Power"] = Powervalue; // Samma som ovan
  String buffer;  //Skapar en string som vi kallar buffer
  root.printTo(buffer); //Lägger över och konverterar vårt jsonobjekt till en string och sparar det i buffer variabeln.
  if(LampExist==true)
  {
  type ="PATCH ";
      Serial.println("Uppdaterar värdet!");
  }
//här någonstans ska jag anvädna POST eller PATCH beroende på om värdet finns!!!!
  // Detta skickar värdena till servern.
   String Output =type+url + " HTTP/1.1\r\n" + //Säger att det är typen post, kan vara patch, get,delete beroende på vad man vill göra., samt urlen vi ska till.
                 "Host: " + host+ "\r\n" + //Berättar vilken host det är vi ansluter till
                 "Content-Type: application/json\r\n" + //Säger att det är Json format vi skickar (dock konverterat till en string för att kunna skickas.
                 "Content-Length: " + buffer.length() + "\r\n" + //Berättar hur stort packet vi ska skicka.
                 "\r\n" + // Detta är en extra radbrytning för att berätta att det är här bodyn startar.
                 buffer + "\n"; //skickar vår buffer som  body
 
 return Output;
  }
  else
  return "";
}

void ConnecttoDB(String input){

   const int httpPort = 3000; //porten vi ska till
  const char* host = "iot.abbindustrigymnasium.se";//Adressen vi ska ansluta till. 7Laddaremygglustbil "http://iot.abbindustrigymnasium.se" 193.41.215.179b
    
     Serial.print("connecting to ");
 Serial.println(host); //Skriver ut i terminalen för att veta vart vi ska skicka värdena.
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  if (!client.connect(host, httpPort)) { //Försöker ansluta
    Serial.println("connection failed");
    return;
  }
  else  //Om vi kan ansluta så ska lampa lysa
  {
    Serial.println("connected");//digitalWrite(13, HIGH);
    }
if(input =="GET")
client.print(GetfromDB(host));
else
client.print(SendtoDB(host));

  unsigned long timeout = millis();
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
    Serial.println(json);
  if(input =="GET") //Om det är Get så kör vi metoden UpdateValues
    UpdateValues(json);

  Serial.println();
  Serial.println("closing connection");
}

void UpdateValues(String json){
   Serial.println("1"+Lampname);
      //Vi skapar ett Jsonobjekt där vi klistrar in värdena från bodyn
      StaticJsonBuffer<400> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(json);
    //Vi skapar sedan lokala strings där vi lägger över värdena en i taget
    String dataA = root["Name"];
         if(dataA!="none")
         {
    bool dataB = root["Power"];
    bool dataC = root["SensorSetting"];
    int dataD = root["Timer1min"];
    int dataE = root["Hot"];
    int dataF = root["Cold"];
    
    //Därefter skriver vi över de lokala värdena till våra globala värden för lampan
     Lampname = dataA; 
     Powervalue =dataB;
     Sensorsetting = dataC;
     Timervalue = dataD;
     Hotvalue = dataE;
     Coldvalue = dataF;

       LampExist=true;
     Serial.print(Coldvalue);
     
}
         else
         {

          String Mess =root["message"];
         Serial.print(Mess);

         }
         Serial.println("2"+Lampname);
 GottenValues = true;
}

void UpdatingLamp(){
  if(Hotvalue>50)
  Serial.println("coolshit");
else
  Serial.println("uncoolshit");
}
void loop() {
   switch (HState){
  case UpdatingValues: 
 ConnecttoDB("GET"); 
  UpdatingLamp();
  delay(1000);
  ConnecttoDB("POST");
HState = Power;
  // put your main code here, to run repeatedly:

    case Power:
    delay(100);
    if (Powervalue = false) {
    HState = Power;
    Serial.println("OFF");
    } else { 
   analogWrite(DO_LedHot,0);
   analogWrite(DO_LedCold, 0);
    }
   /* if (Sensorsetting = true) { 
      HState = NoHand;
    } else {
      HState = ColdCheck;
    }*/
    HState = HotCheck;
    break;
     
      case NoHand:
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
      analogWrite(DO_LedCold, PotValue);
      delay(100);
      HState = Hand2;
      }
  break;
  case HotCheck:
    Serial.println(Hotvalue);
    delay(100); 
    if (Hotvalue >=0) {
      HState = HotUpdate ;
    } else {
      Serial.print("HotCheck");
      HState = ColdCheck;
    }    
  break;
   case HotUpdate:        
         Serial.println(Hotvalue);
         delay(100);
         analogWrite(DO_LedHot, Hotvalue);
         HState = ColdCheck ;
  break;

   case ColdCheck:
    Serial.println(Coldvalue);
    delay(100); 
    if (Coldvalue >= 0) {
      HState = ColdUpdate;
    }
  break;
    
    case ColdUpdate:        
         Serial.println(Coldvalue);
         delay(100);
         analogWrite(DO_LedCold, Coldvalue);
         HState = UpdatingValues;      
 

}
}

 





