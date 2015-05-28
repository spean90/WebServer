package com.webserver.common.util;

import java.util.Date;
import java.util.UUID;

import com.sun.org.apache.xml.internal.security.utils.Base64;

public class SecurityUtil {
	
	public static String createToken(Long userId){
		String uuid = UUID.randomUUID().toString().replace("-", "").substring(26);
		String str = uuid +"-"+ userId+"-"+new Date().getTime();
		String token = Base64.encode(str.getBytes());
		return token;
	}
	
	public static boolean isValidate(String token ,Long userId) {
		boolean result = false;
		try {
			String s = new String(Base64.decode(token.getBytes()));
			String[] arr = s.split("-");
			if (Long.parseLong(arr[1])!=userId) {
				result = false;
			}else{
				Long now = new Date().getTime();
				long i = now - Long.parseLong(arr[2]);
				if (i>1000*60*60*24) {
					result = false;
				}else{
					result = true;
				}
			}
		} catch (Exception e) {
			return false;
		}
		return result;
	}
	

	
	public static void main(String[] args) {
		
		String s = SecurityUtil.createToken(117l);
		//System.out.println("MTE3LTE0MzI3MzQ2NDQ3NTQ=");
		
		//boolean r = SecurityUtil.isValidate("ODBmMTAwLTExNy0xNDMyNzM0OTU4MTkx", 117l);
		System.out.println(s);
	}
}
