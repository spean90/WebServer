package com.webserver.test;

import java.util.Date;

import org.eclipse.jdt.internal.compiler.batch.Main;

import com.sun.org.apache.xml.internal.security.exceptions.Base64DecodingException;
import com.sun.org.apache.xml.internal.security.utils.Base64;

public class TestMain {

	public static void main(String[] args) {
//		String s = "sdfsdfsdfsfdsfds";
//		String baseStr = Base64.encode(s.getBytes());
//		System.out.println(Base64.encode(s.getBytes()));
//		try {
//			System.out.println(new String(Base64.decode(baseStr)));
//		} catch (Base64DecodingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		System.out.println(new Date());
		System.out.println(new Date(System.currentTimeMillis()));
		java.text.DecimalFormat   df   =new   java.text.DecimalFormat("#0.00"); 
		double d = 0.100004;
		d = Double.parseDouble(df.format(d));
		System.out.println(d);
		double dd=0.1;
		System.out.println(d==dd);
	}
}
