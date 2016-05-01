var five = require("johnny-five"),
    http = require('http'),
    config = require('./config');

five.Board().on("ready", function() {

  var led = new five.Led.RGB({
    pins: {
      red: 3,
      green: 5,
      blue: 6
    }
  });

    setInterval(function() {
        http.get({ host: config.url }, function(res) {
            if (res.statusCode === 200 ) {  
              console.log("Sin errores en " +config.url);
              led.on();
              led.color("#00FF00");  
            } else {
              console.log("Respuesta Http "+res.statusCode+" en " +config.url);
              led.on();
              led.color("#0000FF");
            }    
        }).on('error', function(e) {
          console.log(e);
            console.log("Con errores -> La respuesta de "+config.url+" es "+e.message  );
            led.on();
            led.color("#FF0000");
        });
    }, config.frecuency);

});








