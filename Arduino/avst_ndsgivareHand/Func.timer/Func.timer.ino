int i = 0;
int Mintimer = 23;
bool powervalue = false ;
void setup() {
Serial.begin(9600);
  // put your setup code here, to run once:
 // Serial.println(Mintimer);
};

void loop() {

  // put your main code here, to run repeatedly:

 while ( i <= Mintimer ){
  delay(60000);
  powervalue=true;
  Serial.println(Mintimer);
  Serial.println(i);
  Serial.println(powervalue);
  i++;
 }
 while (i > Mintimer) {
powervalue=false;
delay(200);
Serial.println(powervalue);
Serial.print("abcderfh");
break;
}


 }


 
