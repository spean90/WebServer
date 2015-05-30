package com.webserver.common.util;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.apkinfo.api.util.AXmlResourceParser;
import org.apkinfo.api.util.TypedValue;
import org.apkinfo.api.util.XmlPullParser;

/**
 * 分析APK文件，取得APK文件中的 包名、版本号及图标
 */
public class AnalysisApk {
	/**
     * 解压 zip 文件(apk可以当成一个zip文件)，注意不能解压 rar 文件哦，只能解压 zip 文件 解压 rar 文件 会出现 
     * java.io.IOException: Negative seek offset 异常 create date:2009- 6- 9 author:Administrator
     * @param apkUrl
     *             zip 文件，注意要是正宗的 zip 文件哦，不能是把 rar 的直接改为 zip 这样会出现 java.io.IOException:
     *             Negative seek offset 异常
     * @param logoUrl
     * 			   图标生成的地址
     * @throws IOException
     */
   public static String[] unZip(String apkUrl, String logoUrl) 
   {   
	  //[0]:版本号;[1]包名
      String[] st = new String[2];
      byte b[] = new byte [1024];
      int length; 
      ZipFile zipFile;
      try {
          zipFile = new ZipFile( new File(apkUrl));       
          Enumeration enumeration = zipFile.entries();
          ZipEntry zipEntry = null ;           
          while (enumeration.hasMoreElements()) {
             zipEntry = (ZipEntry) enumeration.nextElement();           
             if (zipEntry.isDirectory()) {
                
             } else {
                 if("AndroidManifest.xml".equals(zipEntry.getName()))
                 {
             		try {
             			AXmlResourceParser parser=new AXmlResourceParser();
             			parser.open(zipFile.getInputStream(zipEntry));
             			while (true) {
             				int type=parser.next();
             				if (type==XmlPullParser.END_DOCUMENT) {
             					break;
             				}
             				switch (type) {
             					case XmlPullParser.START_TAG:
             					{
             						for (int i=0;i!=parser.getAttributeCount();++i) {
             							if("versionName".equals(parser.getAttributeName(i))){
             								st[0] = getAttributeValue(parser,i);
             							}else if("package".equals(parser.getAttributeName(i))){
             								st[1] = getAttributeValue(parser,i);
             							}
             						}
             					}
             				}
             			}
             		}
             		catch (Exception e) {
             			e.printStackTrace();
             		}
                 }
                 
                 if("res/drawable-ldpi/icon.png".equals(zipEntry.getName())){
               	  OutputStream outputStream = new FileOutputStream(logoUrl);
                     InputStream inputStream = zipFile.getInputStream(zipEntry); 
                     while ((length = inputStream.read(b)) > 0)
                        outputStream.write(b, 0, length);
                 }
             }
          }
          zipFile.close();
      } catch (IOException e) {
          e.printStackTrace();
      }
      return st;
   }
   
   private static String getAttributeValue(AXmlResourceParser parser,int index) {
		int type=parser.getAttributeValueType(index);
		int data=parser.getAttributeValueData(index);
		if (type==TypedValue.TYPE_STRING) {
			return parser.getAttributeValue(index);
		}
		if (type==TypedValue.TYPE_ATTRIBUTE) {
			return String.format("?%s%08X",getPackage(data),data);
		}
		if (type==TypedValue.TYPE_REFERENCE) {
			return String.format("@%s%08X",getPackage(data),data);
		}
		if (type==TypedValue.TYPE_FLOAT) {
			return String.valueOf(Float.intBitsToFloat(data));
		}
		if (type==TypedValue.TYPE_INT_HEX) {
			return String.format("0x%08X",data);
		}
		if (type==TypedValue.TYPE_INT_BOOLEAN) {
			return data!=0?"true":"false";
		}
		if (type==TypedValue.TYPE_DIMENSION) {
			return Float.toString(complexToFloat(data))+
				DIMENSION_UNITS[data & TypedValue.COMPLEX_UNIT_MASK];
		}
		if (type==TypedValue.TYPE_FRACTION) {
			return Float.toString(complexToFloat(data))+
				FRACTION_UNITS[data & TypedValue.COMPLEX_UNIT_MASK];
		}
		if (type>=TypedValue.TYPE_FIRST_COLOR_INT && type<=TypedValue.TYPE_LAST_COLOR_INT) {
			return String.format("#%08X",data);
		}
		if (type>=TypedValue.TYPE_FIRST_INT && type<=TypedValue.TYPE_LAST_INT) {
			return String.valueOf(data);
		}
		return String.format("<0x%X, type 0x%02X>",data,type);
	}
   
   private static String getPackage(int id) {
		if (id>>>24==1) {
			return "android:";
		}
		return "";
	}
   
   /////////////////////////////////// ILLEGAL STUFF, DONT LOOK :)
	public static float complexToFloat(int complex) {
		return (float)(complex & 0xFFFFFF00)*RADIX_MULTS[(complex>>4) & 3];
	}
	
	private static final float RADIX_MULTS[]={
		0.00390625F,3.051758E-005F,1.192093E-007F,4.656613E-010F
	};
	private static final String DIMENSION_UNITS[]={
		"px","dip","sp","pt","in","mm","",""
	};
	private static final String FRACTION_UNITS[]={
		"%","%p","","","","","",""
	};
	
	public static void main(String[] args) {
		String[] s= AnalysisApk.unZip("E:/aa.apk", "E:/");
		System.out.println(s[0]);
		System.out.println(s[1]);
	}
}

