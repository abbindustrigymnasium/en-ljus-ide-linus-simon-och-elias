typedef enum HandStates{
  Hand,
  Hand2,
  NoHand,
  NoHand2,
  StrCheck,
  StrUpdate,
  Power
};

HandStates HState;


#define AI_Pot 0
#define DO_RLed 14

int PotValue = 75;

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
    if (Powervalue = false) {
    HState = NoHand
    Serial.println("OFF")
    } else { 
    HState = StrCheck
    
    Hstate 
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
    case StrCheck:
    StrValue = change
    Serial.println(StrValue)
    delay(100); 
    if (StrValue != 50) {
      HState = StrUpdate 
    } else {
      Serial.print("StrUpdt");
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

    case StrUpdate
         StrValue = 
         Serial.println(StrValue)
         delay(100);
         if (StrValue diff)
         HState = StrUpdate
         } else {
         Serial.print("StrLock")
         analogWrite(DO_RLed, StrValue);
         delay(100)
         Hstate = NoHand }
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