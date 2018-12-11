typedef enum HandStates{
  Hand,
  Hand2,
  NoHand,
  NoHand2,
  HotCheck,
  HotUpdate,
  ColdCheck,
  ColdUpdate,
  Power,
  SensorPower,
};

HandStates HState;

#define AI_Pot 0
#define DO_RLed 14
bool PowerValue = false;
bool SensorSetting = true;
int PotValue = 75;
int HotValue = 0;
int ColdValue = 0;

void setup() {
  pinMode(DO_RLed, OUTPUT);
  pinMode(AI_Pot, INPUT);
  Serial.begin(9600);
  analogWrite(DO_RLed, PotValue);
  HState = Power;
}

void loop() {
  switch (HState){
  
    case Power:
    delay(100);
    Serial.println("abcd");
    if (PowerValue = false) {
    HState = Power;
    Serial.println("OFF");
    } else { 
    HState = NoHand;
break;
 
    case NoHand:
      PotValue = analogRead(AI_Pot);
      Serial.println(PotValue);
      delay(100);
      if (SensorSetting = false){
      HState = HotCheck;
      }  else  {
     
    if (PotValue > 25)  {
      HState = Hand;
    } else { 
      Serial.print("a");
      HState = HotCheck;
    }
  }
  break;
  
    case HotCheck:
    Serial.println(HotValue);
    delay(100); 
    if (HotValue >=1) {
      HState = HotUpdate ;
    } else {
      Serial.print("HotUpdt");
      HState = ColdCheck;
    }    
  break;
    case ColdCheck:
    Serial.println(ColdValue);
    delay(100); 
    if (HotValue >= 1) {
      HState = ColdUpdate ;
    } else {
      Serial.print("ColdUpdt");
      HState = NoHand;
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
  break;
  
    case HotUpdate:        
         Serial.println(HotValue);
         delay(100);
         if (ColdValue !=50) {;
         HState = ColdUpdate ;
         } else {
         Serial.print("HotLock");
         analogWrite(DO_RLed, HotValue);
         delay(100); 
         HState = NoHand;
         }
  break;

      case ColdUpdate:        
         Serial.println(ColdValue);
         delay(100);
         if (ColdValue > 50) {;
         HState = ColdUpdate ;
         } else {
         Serial.print("ColdLock");
         analogWrite(DO_RLed, HotValue);
         delay(100); 
         HState = NoHand;
         }
  break;
    
    
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
      analogWrite(DO_RLed, PotValue);
      delay(100);
      HState = Hand2;
      }
  break;
  }
 }
}
