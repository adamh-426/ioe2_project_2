////Code developed by Steve Hudak to be used//////
////with Sheridan IxD Thinger guide 2////////

#include <ThingerESP8266.h>
#include <ESP8266WiFi.h>

#define USERNAME "sammybro098"
#define DEVICE_ID "esp8266"
#define DEVICE_CREDENTIAL "Z$IKjLz72mk9oZzz"

#define SSID "YOURWIFINAME"
#define SSID_PASSWORD "WIFIPASS"

ThingerESP8266 thing(USERNAME, DEVICE_ID, DEVICE_CREDENTIAL);

// digital pin, pin that goes to your LED
#define LED1 13
#define LED2 12
#define BUTTON1 14
#define BUTTON2 15

void setup() {
  Serial.begin(115200);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(BUTTON1, INPUT);
  pinMode(BUTTON2, INPUT);

  thing.add_wifi(SSID, SSID_PASSWORD);

  // pin control example (i.e. turning on/off a light, a relay, etc)
  thing["led1"]<< digitalPin(LED1);
  thing["led2"]<< digitalPin(LED2);
  thing["button1"] >> [](pson& out){
      int button1 = 0;
      button1 = digitalRead(BUTTON1);
      Serial.println(button1);
      out = button1;
      };
  thing["button2"] >> [](pson& out){
      int button2 = 0;
      button2 = digitalRead(BUTTON2);
      Serial.println(button2);
      out = button2;
      };
}

void loop() {
  thing.handle();
  
}
