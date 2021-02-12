// jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  //console.log(req.body.cityName);
  const queryCity = req.body.cityName;

  const apiKey = "4df136e18ebe9c5dd5e4fcd063a4648e";
  url = "https://api.openweathermap.org/data/2.5/weather?q="+queryCity+"&units=metric&appid="+apiKey;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      const temperature = weatherData.main.temp;
      console.log(temperature);

      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);

      const iconID = weatherData.weather[0].icon;
      console.log(iconID);
      const iconURL = "http://openweathermap.org/img/wn/"+iconID+"@4x.png";

      res.write("<h1>The temperature in "+queryCity+" is "+temperature+" degrees Celcius</h1>");
      res.write("<p>The weather is "+weatherDescription+"</p>");
      res.write("<img src="+iconURL+">");
      res.send();
    });
  });
});

app.listen(port, function(){
  console.log("Server started at port " + port);
});
