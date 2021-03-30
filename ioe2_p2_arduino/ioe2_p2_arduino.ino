////Code developed by Steve Hudak to be used//////
////with Sheridan IxD Thinger guide 2////////

#include <ThingerESP8266.h>
#include <ESP8266WiFi.h>

#define USERNAME "sammybro098"
#define DEVICE_ID "esp8266"
#define DEVICE_CREDENTIAL "Z$IKjLz72mk9oZzz"

#define SSID "COGECO-2C940"
#define SSID_PASSWORD "0988DCOGECO"

ThingerESP8266 thing(USERNAME, DEVICE_ID, DEVICE_CREDENTIAL);

// digital pin, pin that goes to your LED
#define LED1 13
#define LED2 12
#define BUTTON1 14
//#define BUTTON2 15

void setup() {
  Serial.begin(115200);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(BUTTON1, INPUT);
  //pinMode(BUTTON2, INPUT);

  thing.add_wifi(SSID, SSID_PASSWORD);

  // pin control example (i.e. turning on/off a light, a relay, etc)
  thing["led1"]<< digitalPin(LED1);
  thing["led2"]<< digitalPin(LED2);
  thing["input1"] >> [](pson& out){
      int input1 = 0;
      input1 = digitalRead(BUTTON1);
      Serial.println(input1);
      out = input1;
      };
//  thing["input2"] >> [](pson& out){
//      int input2 = 0;
//      input2 = digitalRead(BUTTON2);
//      Serial.println(input2);
//      out = input2;
//      };
}

void loop() {
  thing.handle();
  
}
