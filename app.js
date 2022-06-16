const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})


app.post("/",function(req,res){
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apikey = "3127c6f19161522c3ab26c2051654c63";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units=" + unit;
  https.get(url,function(response){
    console.log(response);
    response.on("data",function(data){
      const weatherdata = JSON.parse(data);

      const temp = weatherdata.main.temp;
      const description = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
      res.write("<p>The weather is currently" + description + "<p>");
      res.write("<h1>The temp is " + temp + "degree Celsius</h1>");
      res.write("<img src =" + imageURL +">");
      // console.log(weatherdata);
      res.send();
    })
  })
})



app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
