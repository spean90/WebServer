package com.webserver.common.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

	private static DateFormat dateTimeFormater = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static DateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
	
	public static String getDateTimeString(Date date){
		return dateTimeFormater.format(date);
	}
	public static Date getDateTime(String dateTimeString){
		Date date = new Date();
		try {
			date = dateTimeFormater.parse(dateTimeString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	
	public static String getDateString(Date date){
		return dateFormater.format(date);
	}
	public static Date getDate(String dateString){
		Date date = new Date();
		try {
			date = dateTimeFormater.parse(dateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
}
