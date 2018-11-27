#define D7 13

#include <ESP8266WiFi.h>          //https://github.com/esp8266/Arduino

#include <ArduinoJson.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>         //https://github.com/tzapu/WiFiManager

String Lampname = "1";
bool Powervalue = false;
int Coldvalue = 0;
int Hotvalue = 0; 
int Strvalue = 0;
bool LampExist = false;
bool GottenValues = false;
      
void ConnecttoDB(String input){
  
      const int httpPort=3000;
      const char*host="192.168.0.100";

      Serial.print("connecting to ");
      Serial.println(host);

      WiFiClient client;
      if(!client.connect(host,httpPort)){
      Serial.println("connection failed");
      return;
      } else {
      digitalWrite(13,HIGH); //123
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
  }
    
String SendtoDB(String host){
  String type="POST";
  if(GottenValues==true) {
    String url="/ddosmonster/";
      Serial.println("Skickar värde första gången");
      StaticJsonBuffer<300>jsonBuffer;
      JsonObject&root=jsonBuffer.createObject();
      root["Name"]=Lampname;
      root["Power"]=Powervalue;
      root["Hot"]=Hotvalue;
      root["Cold"]=Coldvalue;
      root["strength"]=Strvalue;
      String buffer;
      root.printTo(buffer);
      if(LampExist==true){
        type="PATCH";
        Serial.println("Uppdaterar värdet");
      }
      String Output=type+url+"HTTP/1.1\r\n"+
      "Host:"+host+"\r\n"+
      "Content-Type:application/json\r\n"+
      "Content-Length:"+buffer.length()+"\r\n"+
      "\r\n"+
      buffer+"\n";
      return Output;
  }
  else
  return"";
}

String GetfromDB(String host){
  String url="/ddosmonster/"+Lampname;
  String Output="GET"+url+"HTTP/1.1\r\n"+
  "Host:"+host+"\r\n"+
  "\r\nConnection:close\r\n\r\n";
  return Output;
}

void UpdateValues(String json){
  StaticJsonBuffer<400>jsonBuffer;
  JsonObject&root=jsonBuffer.parseObject(json);
  String data1=root["Name"];
    if(data1!="none") {
      bool data2=root["Power"];
      int data3=root["Hot"];
      int data4=root["Cold"];
      int data5=root["Strength"];
      Lampname=data1;
      Powervalue=data2;
      Hotvalue=data3;
      Coldvalue=data4;
      Strvalue=data5;
      LampExist=true;
    } else{
      String Mess=root["message"];
      Serial.print(Mess);
    }
  GottenValues=true;
}

void UpdatingLamp(){
  analogWrite(13, Strvalue);
  Serial.println(Strvalue);
}

void setup() {
    pinMode(13,OUTPUT);
    
    Serial.begin(115200);

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
    wifiManager.autoConnect("Elias_Wajfai");
    //or use this for auto generated name ESP + ChipID
    //wifiManager.autoConnect();

    
    //if you get here you have connected to the WiFi
    Serial.println("connected...yeey :)");
}

void loop() {
    ConnecttoDB("GET");
    UpdatingLamp();
    delay(1000);
    ConnecttoDB("POST");
    delay(1000);
}
