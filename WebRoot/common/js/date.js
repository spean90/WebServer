/**
 * 格式化当前日期对象
 * @param format y年份，M月份，d天数，H小时，m分钟，s秒钟，S毫秒
 * @return 返回格式化后的字符串
 */
Date.prototype.format = function(format) {
	var pv = {
		"(y+)": this.getFullYear(),
		"(M+)": this.getMonth() + 1,
		"(d+)": this.getDate(),
		"(H+)": this.getHours(),
		"(m+)": this.getMinutes(),
		"(s+)": this.getSeconds(),
		"(S+)": this.getMilliseconds()
	};
	for (var p in pv)
		if (new RegExp(p).test(format))
			format = format.replace(
				RegExp.$1,
				("00" + pv[p]).substr(2 + ("" + pv[p]).length - RegExp.$1.length)
			);
	return format;
};

/**
 * 将字符串按照指定格式解析成日期对象
 * @param format y年份，M月份，d天数，H小时，m分钟，s秒钟，S毫秒
 * @param str format格式字符串
 * @return 是否成功解析
 */
Date.prototype.parse = function(format, str) {
	// 校验格式与解析字符串是否匹配
	if (!format || !str || format.length != str.length) {
		alert("format and str no match!");
		return false;
	}
	// 定义规则对应函数
	var date = this;
	var date_month,date_day;
	var pv = {
		"(y+)": function(year) {date.setFullYear(year);},			
		"(M+)": function(month) {date_month = month;},		 
		"(d+)": function(day) {date_day = day;}, 
		"(H+)": function(hour) {date.setHours(hour);},			   
		"(m+)": function(minute) {date.setMinutes(minute);},		 
		"(s+)": function(second) {date.setSeconds(second);},		 
		"(S+)": function(milliseconds) {date.setMilliseconds(milliseconds);} 
	};
	// 更新当前日期对象
	for (var p in pv) {
		var regexp = new RegExp(p, "g");
		if (regexp.test(format))
			(pv[p])(str.substr(regexp.lastIndex - RegExp.$1.length, RegExp.$1.length));
	}
	// 月份和日期必须同时设置，避免不存在日期产生的自动纠正
	// date_month不能先减1，不然1月的0会被自动转化为false
	if (date_month && date_day) date.setMonth(date_month - 1, date_day);
	else if (date_month) date.setMonth(date_month - 1);
	else if (date_day) date.setDate(date_day);
	return date;
};


var MyDate = {
	datetime: "2012-09-23 22:14:20",
		
	/**
	 * 获取当前年份
	 * @return {}
	 */
	getNowYear: function() {
		var myDate = new Date();
		var year = myDate.getFullYear();
		
	   	return String(year);
	},
	
	/**
	 * 获取当前月份
	 * @return {}
	 */
	getNowMonth: function() {
		var myDate = new Date();
		var date = myDate.getDate();
		var month = myDate.getMonth() + 1;
		if(date > 20) {
			month += 1;
		}
		
		if(month < 10) {
			month = "0" + month;
		}
	
	   	return String(month);
	},
	// 3200 4800 6400
	/**
	 * 获取当前年月
	 * @return {}
	 */
	getNowYM: function() {
		var myDate = new Date();
		var year = myDate.getFullYear();
		var month = myDate.getMonth() + 1;
		
		if(month < 10) {
			month = "0" + month;
		}

		var ym = year + "-" + month;
	
	   	return ym;
	},
	
	/**
	 * 获取当前日期
	 * @return {}
	 */
	getNowFormatDate: function() {
		var day = new Date();
	
		var Year = 0;
		var Month = 0;
		var Day = 0;
		var CurrentDate = "";
		//初始化时间
		Year = day.getFullYear();//ie火狐下都可以
		Month = day.getMonth()+1;
		Day = day.getDate();
	   
		CurrentDate += Year + "-";
	   
		if (Month >= 10 )
		{
			CurrentDate += Month + "-";
		}
		else
		{
			CurrentDate += "0" + Month + "-";
		}
		if (Day >= 10 )
		{
	    	CurrentDate += Day ;
		}
		else
		{
	    	CurrentDate += "0" + Day ;
	   	}
	
	   	return CurrentDate;
	},
	
	/**
	 * 获取当前时分
	 * @return {}
	 */
	getNowTime: function() {
		var myDate = new Date();
		var hours = myDate.getHours();
		var minutes = myDate.getMinutes();
		var seconds = myDate.getSeconds();
		
		if(hours < 10) {
			hours = "0" + hours;
		}
		
		if(minutes < 10) {
			minutes = "0" + minutes;
		}
		
		if(seconds < 10) {
			seconds = "0" + seconds;
		}
		
		var CurrentDate = hours + ":" + minutes + ":" + seconds;
	
	   	return CurrentDate;
	},
	
	getTime: function(myDate) {
		var hours = myDate.getHours();
		var minutes = myDate.getMinutes();
		var seconds = myDate.getSeconds();
		
		if(hours < 10) {
			hours = "0" + hours;
		}
		
		if(minutes < 10) {
			minutes = "0" + minutes;
		}
		
		if(seconds < 10) {
			seconds = "0" + seconds;
		}
		
		var CurrentDate = hours + ":" + minutes + ":" + seconds;
	
	   	return CurrentDate;
	},
	
	/**
	 * 获取当前日期num天后的日期
	 * @param {} num
	 * @return {}
	 */
	addDay: function(num) {
		var day = new Date();
		day.setDate(day.getDate() + parseInt(num));
	
		var Year = 0;
		var Month = 0;
		var Day = 0;
		var CurrentDate = "";
		//初始化时间
		Year = day.getFullYear();//ie火狐下都可以
		Month = day.getMonth()+1;
		Day = day.getDate();
	   
		CurrentDate += Year + "-";
	   
		if (Month >= 10 )
		{
			CurrentDate += Month + "-";
		}
		else
		{
			CurrentDate += "0" + Month + "-";
		}
		if (Day >= 10 )
		{
	    	CurrentDate += Day ;
		}
		else
		{
	    	CurrentDate += "0" + Day ;
	   	}
	
	   	return CurrentDate;
	},
	
	/**
	 * 比较两个日期相差天数
	 * @param {} sDate1
	 * @param {} sDate2
	 * @return {}
	 */
	dateDiff: function(sDate1, sDate2)  {
	    var aDate, oDate1, oDate2, iDays;  
	    aDate = sDate1.split("-");  
	    oDate1 = new Date(aDate[0],aDate[1]-1,aDate[2]);  
	    aDate = sDate2.split("-");  
	    oDate2 = new Date(aDate[0],aDate[1]-1,aDate[2]);  
	      
	    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);    
	    if((oDate1 - oDate2)<0){  
	        return -iDays;  
	    }  
	    return iDays;   
	},
	
	/**
	 * 获取当月的天数
	 * @param {} y
	 * @param {} m
	 * @return {}
	 */
	solarDays: function(y, m) {
		var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if(m == 2) {
	      	return(((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0))? 29: 28);
	   	}
	   	else {
			return(solarMonth[m - 1]);
	   	}
	},
	
	/**
	 * 根据年月返回该月的周
	 * @param {} year
	 * @param {} month
	 */
	calldate: function(year, month) {
  		var day = this.solarDays(year, month);
  		
  		var dayList = new Array();
		for(var i=1; i<=day; i++) {
			var temp_btime = new Date(year + "/" + month + "/" + i);	//获取选择年月的1号
     		var tempnum = temp_btime.getDay();	//获取选择日期的星期几0表示日
  
  			if(tempnum == 0) {
  				tempnum = 7;
  			}

 			if(tempnum == 1) {
    			var endweek = (new Date(temp_btime.setDate((temp_btime.getDate() + 6))));
    			var t_year = endweek.getYear() + 1990;
 				var t_month = endweek.getMonth() + 1;
    			var t_date = endweek.getDate();
    			
    			t_month = t_month < 10 ? '0' + t_month : t_month;
    			t_date = t_date < 10 ? '0' + t_date : t_date;
    			i = i < 10 ? '0' + i : i;
  				
    			var name = month + "月" + i + "日-" + t_month + "月" + t_date + "日";
    			var value = year + '-' + month + "-" + i + "~" + t_year + '-' + t_month + "-" + t_date;

    			dayList.push({'name': name, 'value': value});
 			}
 		}
 		
 		var states = Ext.create('Ext.data.Store', {
		    fields: ['value', 'name'],
		    data : dayList
		});
 		
 		return states;
 	},
   
	dateTostr: function(date, format) {
		var ndata = format.replace('yyyy', date.substring(0, 4));
		ndata = ndata.replace('mm', date.substring(4, 6));
		return ndata;
	},
	
	validateDateRange: function(date1, date2) {
		date1 = date1.indexOf(":") < 0 ? date1 + " 00:00:00" : date1;
		date2 = date2.indexOf(":") < 0 ? date2 + " 23:59:59" : date2;
		
		var sDate = new Date(date1.replace(/-/g, "/"));
		var eDate = new Date(date2.replace(/-/g, "/"));
		
		if(Date.parse(sDate) > Date.parse(eDate)) {
			Ext.myMsg.show("开始时间不得大于结束时间");
			return true;
		}
		else {
			return false;
		}
	},
	
	/**
	 * 获取服务器日期
	 * @return {}
	 */
	getServerFormatDate: function() {
		var day = null;
		if(this.datetime) {
			day = new Date().parse("yyyy-MM-dd HH:mm:ss", this.datetime);
		}
		else {
			day = new Date();
		}
	
		var Year = 0;
		var Month = 0;
		var Day = 0;
		var CurrentDate = "";
		//初始化时间
		Year = day.getFullYear();//ie火狐下都可以
		Month = day.getMonth()+1;
		Day = day.getDate();
	   
		CurrentDate += Year + "-";
	   
		if (Month >= 10 )
		{
			CurrentDate += Month + "-";
		}
		else
		{
			CurrentDate += "0" + Month + "-";
		}
		if (Day >= 10 )
		{
	    	CurrentDate += Day ;
		}
		else
		{
	    	CurrentDate += "0" + Day ;
	   	}
	
	   	return CurrentDate;
	},
	
	/**
	 * 获取服务器日期num天后的日期
	 * @param {} num
	 * @return {}
	 */
	diffServerDate: function(num) {
		var day = null;
		if(this.datetime) {
			day = new Date().parse("yyyy-MM-dd HH:mm:ss", this.datetime);
		}
		else {
			day = new Date();
		}
		
		day.setDate(day.getDate() + parseInt(num));
	
		var Year = 0;
		var Month = 0;
		var Day = 0;
		var CurrentDate = "";
		//初始化时间
		Year = day.getFullYear();//ie火狐下都可以
		Month = day.getMonth()+1;
		Day = day.getDate();
	   
		CurrentDate += Year + "-";
	   
		if (Month >= 10 )
		{
			CurrentDate += Month + "-";
		}
		else
		{
			CurrentDate += "0" + Month + "-";
		}
		if (Day >= 10 )
		{
	    	CurrentDate += Day ;
		}
		else
		{
	    	CurrentDate += "0" + Day ;
	   	}
	
	   	return CurrentDate;
	}
};