var five = require('johnny-five');
var board = new five.Board({port:'/dev/ttyACM0'});
const express = require('express')
const app = express();
var led = null
var led2 = null
app.set("view engine","ejs")
app.set("views","./views")

app.get("/",(req,res)=>{
  res.render("index")
})
app.get("/:mode",(req,res)=>{
  if(req.params.mode == 'ON'){
    if(req.query.led == '1'){
      led.stop();
      led.on();
    }
    else{
      led2.stop();
      led2.on()
    }
  }
  if(req.params.mode == 'OFF'){
    if(req.query.led == '1'){
      led.stop();
      led.off();
    }
    else{
      led2.stop()
      led2.off()
    }
  }
  if(req.params.mode == 'BLINK'){
    if(req.query.led == '1'){
      led.blink(100)
    }
    else{
      led2.blink(100)
    }
  }
  res.render("index")
})

board.on('ready', function() {
  led = new five.Led(13); // pin 13
  led2 = new five.Led(12); // pin 13
});


app.listen(8080,()=> console.log('Server listen on port 8080'));
