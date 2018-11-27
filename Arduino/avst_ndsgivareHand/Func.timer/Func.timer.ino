
int Mintimer = 23;
bool powervalue = false ;
void setup() {
Serial.begin(9600);
  // put your setup code here, to run once:
 // Serial.println(Mintimer);
};
for (int  i=0; i <= Mintimer; i++){
  powervalue=true; 
  delay(6000);
  Serial.println(Mintimer);
  Serial.println(i);
  Serial.println(powervalue);
};
powervalue=false;
Serial.println(powervalue);

void loop() {

  // put your main code here, to run repeatedly:


}
 
