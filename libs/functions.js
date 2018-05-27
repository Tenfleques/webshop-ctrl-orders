Date.prototype.getWeekOfMonth = function() {
  var firstWeekday = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  var offsetDate = this.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
}

Date.prototype.addDays = function(days) {
		this.setDate(this.getDate() + parseInt(days));
		return this;
	};
Date.prototype.removeDays = function(days) {
	this.setDate(this.getDate() - parseInt(days));
	return this;
};


Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
	  if(u.hasOwnProperty(this[i])) {
		 continue;
	  }
	  a.push(this[i]);
	  u[this[i]] = 1;
   }
   return a;
}
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
//yyyy-mm-dd hh:ii
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDateTime:  "yyyy-mm-dd HH:MM",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"вс", "пн", "вт", "ср", "чт", "пт", "сб","Воскресенье" ," понедельник" ," вторник" ," среда" ," четверг" ," пятница" ,"суббота"
	],
	monthNames: [
		"янв", "Фев", "Мар", "апр", "май", "июн", "июл", "авг", "сeн", "окт", "ноя", "дек","Январь", "Февраль", "Марта", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

if (!Array.prototype.last) {
	Array.prototype.last = function () {
		return this[this.length - 1];
	};
};
var rad = function(x) {
  return x * Math.PI / 180;
};
var getDistance = function(p1, p2) {
	//console.log(p1, p2);
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2[0] - p1[0]);
  var dLong = rad(p2[1] - p1[1]);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) *
	Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};
function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
function isDefined(x) {
	var undefined;
	return x !== undefined;
}
function currentPage(){
	var loc = window.location;
	var pathName = loc.pathname.substring(loc.pathname.lastIndexOf('/') + 1);
	return pathName.substring(0,pathName.indexOf('.html'));
}
function getTimestamp(dateTime, gmtoffset){
	var timest = new Date(dateTime).getTime() + ((typeof(gmtoffset)!=='undefined')? gmtoffset * 1000 * 60 * 60: 0); //return microseconds
	return timest;
}
function dayTime(timest, sec){ //timest in milliseconds
	var date = new Date(timest);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	return hours + ':' + minutes.substr(-2) +(sec)? (':' + seconds.substr(-2)):"";
}
function ddmmyyTime(timest, sec){
	console.log(timest)
	var date = new Date(timest);
	var year = date.getFullYear();
	var month = "0" + date.getMonth();
	var day = "0" + date.getDay();
	//dd MM yyyy - hh:ii
	return day.substr(-2) +'/'+ month.substr(-2) + '/'+ year +' ' + dayTime(timest, sec)
}
function yearMonthDay(timest){ //timest in seconds
	var date = new Date(timest * 1000);
	var year = date.getFullYear();
	var month = "0" + date.getMonth();
	var day = "0" + date.getDay();
	return year + '/' + month.substr(-2) + '/' + day.substr(-2);
}
function fullDateTime(timest){//timest in seconds
	if(!arguments[1])
		var date = new Date(timest);
	else
		var date = new Date(timest * 1000);
	return date.toLocaleString()//format('mm/dd/yyyy HH:MM');
}
function getDuration(totalMilliSeconds){
	if(totalMilliSeconds !== 0){
			totalSeconds = totalMilliSeconds /1000;
			hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			minutes = Math.floor(totalSeconds / 60);
			seconds = Math.floor(totalSeconds % 60);
			h_pad = (hours)? hours + ' ч ':'';
			m_pad = (minutes)? minutes +' мин ':'';
			s_pad = (seconds)? seconds + ' сек ' :'';
			return h_pad + m_pad + s_pad;
	}
	return '-';
}
function Timer(callback, delay) {
	var timerId, start, remaining = delay;
	this.updateInterval = function(nuval){
		delay = 5000*nuval/100 ;
	}
	this.pause = function() {
		window.clearTimeout(timerId);
		remaining -= new Date() - start;
	};

	this.resume = function() {
		start = new Date();
		window.clearTimeout(timerId);
		timerId = window.setTimeout(callback, remaining);
	};
	this.resume();
}

function goBack() {
    window.history.back();
}

//excpections
function exceptionHandler(e){
	console.log(e);
}

function reverseSort(a,b){
	if(a < b)
		return 1;
	if (a > b)
		return -1;
	return 0;
}
function platformFormatter(platform){
	let field = (arguments[0])?arguments[0]:"device"
}
function ctrlIndex(){
	let currentIndex = arguments[0];
	let array = arguments[1];
	this.inc = () =>{
	  if(currentIndex < array.length - 1)
		return currentIndex + 1;
	  return 0;
	}
}