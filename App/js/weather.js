  var weather = function(lat, long){
    this.lat = lat;
    this.long = long;
  }
  
  weather.prototype.show = function(){
	  //Get geolocation
			//Retrieve weather from geolocation
			  var URL = "https://api.forecast.io/forecast/7d08f5b9529fca760325d65623581165/"+this.lat+","+this.long;
   var now = new Date();
   if(localStorage.getItem("limit") <= now){   
      var limit = new Date();
      limit.setHours(now.getHours()+1);
      localStorage.setItem("limit", limit);
      var location = $.ajax({
			url: URL,
			dataType: "jsonp",
			success: function(response){
				 localStorage.setItem("Forecast", JSON.stringify(response));
				getForecast();
            }
		  });
	}
		else{
            getForecast();
		}
  }
  
  function getForecast(){
					  var date = document.getElementById("date");
				 var C = document.getElementById("temp");
				 var loc = document.getElementById("location");
				var text =  document.getElementById("desc");
	           var weather =$.parseJSON( localStorage.getItem("Forecast"));
				var curTime = Time(weather.currently.time);
				var zone = weather.timezone.split("/");
			  $("#icon").addClass(showIcon(weather.currently.icon));
			  date.innerHTML = "<strong>"+getDay(curTime[0])+", "+curTime[2]+"/"+getMonth(curTime[1])+"/"+curTime[3]+"<br />"+curTime[4].substr(0,5)+"</strong>";
			  C.innerHTML = Math.round((weather.currently.temperature - 32)/1.8)+"&deg;C";
			 
			  loc.innerHTML = zone[1]+", "+zone[0];
			  text.innerHTML = weather.currently.summary;
              
              
			  //Daily forecast
              for(var i = 1; i < 8;++i){
              var day1 = document.getElementById(i);
              var timed1= Time(weather.daily.data[i].time);
                day1.innerHTML = getDay(timed1[0])+" "+timed1[2] +"/"+getMonth(timed1[1])+": "+Math.round((weather.daily.data[i].temperatureMax - 32)/1.8)+" &deg;C <br >";
		}
	 }


  weather.prototype.updateLocation = function(x,y){
    var Weather = new weather(x,y);
		  //Get geolocation
var date = document.getElementById("date");
 var C = document.getElementById("temp");
 var loc = document.getElementById("location");
var text =  document.getElementById("desc");
			//Retrieve weather from geolocation
			  var URL = "https://api.forecast.io/forecast/7d08f5b9529fca760325d65623581165/"+x+","+y;
   var now = new Date();
     var limit = new Date();
      limit.setHours(now.getHours()+1);
      localStorage.setItem("limit", limit);
      var location = $.ajax({
			url: URL,
			dataType: "jsonp",
			success: function(response){
				 localStorage.setItem("Forecast", JSON.stringify(response));
				getForecast();
            }
		  });
  }
 function Time(timeStamp){
   var curDate = new Date(timeStamp*1000).toString();
   curDate = curDate.split(' ');
   return curDate;
}
  function getMonth(Month){
    switch(Month){
      case "Jan" : return "01"; break;
      case "Feb" : return "02"; break;
      case "Mar" : return "03"; break;
      case "Apr" : return "04"; break;
      case "May" : return "05"; break;
      case "Jun" : return "06"; break;
      case "Jul" : return "07"; break;
      case "Aug" : return "08"; break;
      case "Sep" : return "09"; break;
      case "Oct" : return "10"; break;
      case "Nov" : return "11"; break;
      case "Dec" : return "12"; break;
    }
  }
  
  function getDay(day){
    switch(day){
      case "Mon" : return "Monday"; break;
      case "Tue" : return "Tuesday"; break;
      case "Wed" : return "Wednesday"; break;
      case "Thu" : return "Thursday"; break;
      case "Fri" : return "Friday"; break;
     case "Sat" : return "Saturday"; break;
        case "Sun" : return "Sunday"; break;
    }
  }
  
  function showIcon(ico){
    switch(ico){
      case "partly-cloudy-night": return "cloudyN"; break; 
      case "partly-cloudy-day": return "cloudyD"; break;
      case "clear-day": return "sunny"; break; 
      case "clear-night": return "clearNight"; break;
    }
  }
  
  
