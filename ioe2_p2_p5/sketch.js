//url for the LED widgets
let urla = 'https://api.thinger.io/v3/users/sammybro098/devices/esp8266/resources/button1?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfcDJfcmVtb3RlX2JhbmQiLCJ1c3IiOiJzYW1teWJybzA5OCJ9.y8uX6DWKxhcr7FAbBHWc2nQdNtinB0oAI0chOCtYBfw';

let urlb = 'https://api.thinger.io/v3/users/sammybro098/devices/esp8266/resources/button2?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfcDJfcmVtb3RlX2JhbmQiLCJ1c3IiOiJzYW1teWJybzA5OCJ9.y8uX6DWKxhcr7FAbBHWc2nQdNtinB0oAI0chOCtYBfw';

//url for the button widgets
let url1 = 'https://api.thinger.io/v3/users/sammybro098/devices/esp8266/resources/led1?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfcDJfcmVtb3RlX2JhbmQiLCJ1c3IiOiJzYW1teWJybzA5OCJ9.y8uX6DWKxhcr7FAbBHWc2nQdNtinB0oAI0chOCtYBfw';

let url2 = 'https://api.thinger.io/v3/users/sammybro098/devices/esp8266/resources/led2?authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfcDJfcmVtb3RlX2JhbmQiLCJ1c3IiOiJzYW1teWJybzA5OCJ9.y8uX6DWKxhcr7FAbBHWc2nQdNtinB0oAI0chOCtYBfw';

var Auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfcDJfcmVtb3RlX2JhbmQiLCJ1c3IiOiJzYW1teWJybzA5OCJ9.y8uX6DWKxhcr7FAbBHWc2nQdNtinB0oAI0chOCtYBfw";

////// variables for the 2 seperate data sets and the 2 seperate buttons
var data;
var data1;
var data2;
var myButton1;
var myButton2;

let counter = 0;

let clicked = false;

let canvasW = 1366, canvasH = 768;

//let font;

let myButton;

let mwar1, mwar2;
let bwar;
let drop, rumble;

let fft;
let w;
let amp;
let volHistory = [];
let button;
let start;
let resize;
let bgcR = 0;
let bgcG = 0;
let bgcB = 0;
let change = 0;

//while our audio is playing,
//this will be set to true
let sampleIsLooping = false;

let outData = '0';

function preload() {
    soundFormats('wav');
    mwar1 = loadSound('assets/mwar1');
    mwar2 = loadSound('assets/mwar2');
    bwar = loadSound('assets/bwar');
    drop = loadSound('assets/drop');
    rumble = loadSound('assets/rumble');
    //font = loadFont('assets/papyrus.ttc');
}

function setup() {
    createCanvas(canvasW, canvasH);
    angleMode(DEGREES);
    amp = new p5.Amplitude();
}

function draw() {
    
    mwar1.amp(0.8);
    mwar2.amp(0.0);
    bwar.amp(0.8);  
    
    background(0);
    noStroke();
    textAlign(CENTER);
    fill(255);
    textSize(60);
    start = text('CLICK TO START!', width / 2, height / 2);
    
//    if (counter % 20 == 0) {
//        getData1();
//    }
    
//testing with mouse position.
//  bgcR = map(mouseX, 0, canvasW, 1, 150);
//  bgcG = map(mouseY, canvasH, 0, 1, 150);
    
    counter++;
    
    if (sampleIsLooping) {
        resize = 5;
        background(0);
        let vol = amp.getLevel();
        volHistory.push(vol);
        noFill();
        stroke(bgcR, 200, bgcB);
        
        translate(width / 2, height / 2);
        beginShape();
        for (i = 0; i < 360; i++) {
            let r = map(volHistory[i], 0, 1, canvasH / 10, canvasH/ 2);
            strokeWeight(resize);
            let x = r * cos(i);
            let y = r * sin(i);
            vertex(x, y);
        }
        endShape();

        if (volHistory.length > 360) {
            volHistory.splice(0, 1);
        }
        
        if (data1 == '1') {
                mwar1.amp(0.0);
                mwar2.amp(0.8);
            }
        
        if (data2 == '1') {
                bwar.amp(0.0);
            }
        
    }
    
}

function mouseClicked() {
    if (!sampleIsLooping) {
        mwar1.loop();
        mwar2.loop();
        bwar.loop();
        sampleIsLooping = true;
    }
    
    //Because my Feather Huzzah stopped working, I commented out the getData functions and used the mouseClicked function as an alternative to test out the interactions that should have been with data got from Thinger.io.
    
    if (sampleIsLooping) {
        if(mouseX > canvasW / 2){
        bgcR = 200;
        data1 = 1;
        }else{
        bgcR = 100;
        data1 = 0;
        }
        if(mouseY < canvasH / 2){
        bgcB = 50;
        data2 = 1;
        }else{
        bgcB = 200;
        data2 = 0;
        }
    }
}

function dropIt() {
    if(sampleIsLooping) {
    drop.play();
    }
    }

function rumblin() {
    if (sampleIsLooping) {
    rumble.play();
    }
}

function keyPressed() {
    if (sampleIsLooping) {
        if (key === 'z'){
        dropIt();
        bgcB = 250;
        resize = 10;
        sendData1(true);
        }else{
        sendData1(false);
        }
        if (key === '/'){
        rumblin();
        bgcR = 250;
        bgcG = 250;
        bgcB = 250;
        resize = 20;
        sendData2(true);
        }else{
        sendData2(false);
        }
    }
}

//function getData1() {
//    httpGet(urla, 'json', function(response) {
//    console.log(response);
//    data1 = response;
//    if(response){
//        bgcR = 200;
//        bgcG = 200;
//        bgcB = 100;
//    } else {
//        bgcR = 100;
//        bgcG = 200;
//        bgcB = 100;
//    }
//    });
//}
//
//function getData2() {
//    httpGet(urlb, 'json', function(response) {
//    console.log(response);
//    data2 = response;
//    if(response){
//        bgcR = 200;
//        bgcG = 200;
//        bgcB = 50;
//    } else {
//        bgcR = 100;
//        bgcG = 200;
//        bgcB = 100;
//    }
//    });
//}

////// this function sends the data1 boolean state to 
////// thinger.io using a json with the authorization, 
////// the specific resource address, and correct data type  

function sendData1(data1) {
    let postData = {
        method: "POST",
        Headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': Auth,
            'Accept': "application/json, text/plain, */*"
        },

        "in": data1
    };
    httpPost(url1, 'application/json', postData, function (result) {
        console.log(postData);
    });
}

////// this function sends the data2 boolean state to 
////// thinger.io using a json with the authorization, 
////// the specific resource address, and correct data type 

function sendData2(data2) {
    let postData = {
        method: "POST",
        Headers: {
            'Content-Type': "application/json;charset=UTF-8",
            'Authorization': Auth,
            'Accept': "application/json, text/plain, */*"
        },

        "in": data2
    };
    httpPost(url2, 'application/json', postData, function (result) {
        console.log(postData);
    });
}
