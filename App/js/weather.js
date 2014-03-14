  var weather = function(lat, long){
    this.lat = lat;
    this.long = long;
  }
  
  weather.prototype.show = function(){
	  //Get geolocation
var date = document.getElementById("date");
 var C = document.getElementById("temp");
  var x = document.getElementById("x");
 var loc = document.getElementById("location");
var text =  document.getElementById("desc");
			//Retrieve weather from geolocation
			  var URL = "https://api.forecast.io/forecast/7d08f5b9529fca760325d65623581165/"+this.lat+","+this.long;
		//if(localStorage.getItem("location") == null){
		var location = $.ajax({
			url: URL,
			dataType: "jsonp",
			success: function(response){
				localStorage.setItem("location", response.timezone);
				localStorage.setItem("temperature", response.currently.temperature);
				localStorage.setItem("time", response.currently.time);
				localStorage.setItem("desc", response.currently.summary);
			  localStorage.setItem("icon", response.currently.icon);
				var location = localStorage.getItem("location");
				var temp = localStorage.getItem("temperature");
				var time = localStorage.getItem("time");
			  var icon = localStorage.getItem("icon");       
				var curTime = Time(time);
				var zone = location.split("/");
			var desc = localStorage.getItem("desc");
			  alert(icon);
			  $("#icon").addClass(showIcon(icon));
			  date.innerHTML = "<strong>"+getDay(curTime[0])+", "+curTime[2]+"/"+getMonth(curTime[1])+"/"+curTime[3]+"<br />"+curTime[4].substr(0,5)+"</strong>";
			  C.innerHTML = Math.round((temp - 32)/1.8)+"°C";
			  loc.innerHTML = zone[1]+", "+zone[0];
			  text.innerHTML = desc;
			  
			}
		  });
		/*}
		else{
			alert("storage!");
			var location = localStorage.getItem("location");
				var temp = localStorage.getItem("temperature");
				var time = localStorage.getItem("time");
			  var icon = localStorage.getItem("icon");       
				var curTime = Time(time);
				var zone = location.split("/");
			var desc = localStorage.getItem("desc");
			  alert(icon);
			  $("#icon").addClass(showIcon(icon));
			  date.innerHTML = "<strong>"+getDay(curTime[0])+", "+curTime[2]+"/"+getMonth(curTime[1])+"/"+curTime[3]+"<br />"+curTime[4].substr(0,5)+"</strong>";
			  C.innerHTML = Math.round((temp - 32)/1.8)+"°C";
			  loc.innerHTML = zone[1]+", "+zone[0];
			  text.innerHTML = desc;
		}*/
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
    }
  }
  
  function showIcon(ico){
    switch(ico){
      case "partly-cloudy-night": return "cloudy"; break; 
      case "clear-day": return "sunny"; break; 
      case "clear-night": return "clearNight"; break;
    }
  }

