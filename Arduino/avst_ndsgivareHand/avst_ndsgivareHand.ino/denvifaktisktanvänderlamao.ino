typedef enum HandStates{ //sätter deklarationer där enum cases är de kommande:
  Hand,
  Hand2,
  NoHand,
  NoHand2,
};

HandStates HState; //med detta slipper vi skriva HandStates och kan istället använda HState för att byta case

#define AI_Pot 0 //definerar AI_Pot till en pin
#define DO_RLed 13 //definerar DO_RLed till en pin

int PotValue = 512; //sätter PotValue till 512

void setup() { //körs en gång
  pinMode(DO_RLed, OUTPUT); //sätter DO_RLed till output
  pinMode(AI_Pot, INPUT); //AI_Pot till input
  Serial.begin(9600); //sätter data hastighet i 9600 bits/s
  analogWrite(DO_RLed, PotValue); //sätter på lampan till 512 för PotValue = 512
  HState = NoHand; //byter case till NoHand
}

void loop() { //körs föralltid
  switch (HState){ //de cases som byts kommer vara HState cases alltså HandStates cases alltså de cases vi deklarerade ovan
    
    case NoHand: //detta är NoHand
      PotValue = analogRead(AI_Pot); //den ändrar PotValue till det avstånssensorn läser av
      Serial.println(PotValue); //skriver det i serialmonitor
      delay(100); //väntar 100 ms
    if (PotValue > 250)  { //om PotValue > 250 
      HState = Hand; //ändrar den case
    } else{ //annars
      Serial.print("a"); //skriver den a
      HState = NoHand; //och gör casen om igen
    }
  break; //går ut ur casen
  
    case Hand: //detta är Hand
      PotValue = analogRead(AI_Pot); //den ändrar PotValue till det avstånssensorn läser av
      Serial.println(PotValue); //skriver det i serialmonitor
      delay(100); //väntar 100 ms
    if (PotValue < 250)  {//om PotValue < 250 
      HState = NoHand2; //ändrar den case
    } else { //anars
      Serial.print("b"); //skriver den b
      HState = Hand; //och gör casen om igen
      }
    break; //går ut ur casen

    case NoHand2: //detta är NoHand2
      for (int q=0; q <= 50; q++){ //den använder en for loop för att utföra casen 50 ggr
        PotValue = analogRead(AI_Pot); //den ändrar PotValue till det avstånssensorn läser av
        Serial.println(PotValue); //skriver det i serialmonitor
        delay(100); //väntar 100 ms
      if (PotValue > 250) { //om PotValue > 250 
        HState = Hand2; //ändrar den till sista casen
        break; //går ut ur casen
      } else { //annars 
        Serial.print("c"); //skriver den c 
        }
      }
    if (PotValue < 250){ //om potvalue < 250
      HState = NoHand; //byter den case
    }
  break; //går ut ur casen

    case Hand2:
      PotValue = analogRead(AI_Pot); ////den ändrar PotValue till det avstånssensorn läser av
      Serial.println(PotValue); //skriver det i serialmonitor
      if (PotValue < 250) {  //om potvalue < 250
        HState=NoHand; //byter den case
      } 
      else { //annars
      Serial.print("d"); //skriver den d
      analogWrite(DO_RLed, PotValue); //ändrar värdet på lampans ljustyrka till potvalue
      delay(100); //väntar 100ms
      HState = Hand2; //byter case 
      }
  break; //går ut ur casen
  }
}