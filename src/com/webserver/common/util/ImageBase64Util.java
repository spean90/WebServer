package com.webserver.common.util;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
/**
 * 图片与BASE64编码互转工具类
 * @author wangwei
 *
 */
public class ImageBase64Util {
    
    public static void main(String[] args) {
        // 测试从Base64编码转换为图片文件
//        String strImg = "xxxxx"; \\图片BASE64字符串
//        GenerateImage(strImg, "D:\\wangyc.jpg");
        // 测试从图片文件转换为Base64编码
        //System.out.println(GetImageStr("d:\\0.jpg"));
        
        GenerateImage(GetImageStr("E:\\logo.png"), "E:\\logo22.png");
    }
    
    /**
     * 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
     * @param imgFilePath 图片路径
     * @return String
     */
    public static String GetImageStr(String imgFilePath) {
        byte[] data = null;
        // 读取图片字节数组
        try {
            InputStream in = new FileInputStream(imgFilePath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        System.out.println(data.length);
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(data);// 返回Base64编码过的字节数组字符串
    }
    /**
     * 对字节数组字符串进行Base64解码并生成图片
     * @param imgStr Base64字符串
     * @param imgFilePath 生成图片保存路径 
     * @return boolean
     */
    public static boolean GenerateImage(String imgStr, String imgFilePath) {
    	System.out.println("fff:"+imgStr.getBytes().length);
        if (imgStr == null) // 图像数据为空
            return false;
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            // Base64解码
            byte[] bytes = decoder.decodeBuffer(imgStr);
            for (int i = 0; i < bytes.length; ++i) {
                if (bytes[i] < 0) {// 调整异常数据
                    bytes[i] += 256;
                }
            }
            // 生成jpeg图片
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(bytes);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * 对字节数组字符串进行Base64解码并生成图片
     * @param imgStr 图片字符串
     * @return byte[]
     */
    public static byte[] getBytesFromStr(String imgStr) { 
        if (imgStr == null) // 图像数据为空
            return null;
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            // Base64解码
            byte[] bytes = decoder.decodeBuffer(imgStr);
            for (int i = 0; i < bytes.length; ++i) {
                if (bytes[i] < 0) {// 调整异常数据
                    bytes[i] += 256;
                }
            }
            // 生成jpeg图片
            return bytes;
        } catch (Exception e) {
            return null;
        }
    }
    /**
     * byte[]转化为字节数组字符串，并对其进行Base64编码处理
     * @param imgByte 图片byte[]
     * @return String
     */
    public static String getImageStrFromByte(byte[] imgByte) {
    	if (imgByte==null||imgByte.length==0) {
			return "";
		}
        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(imgByte);// 返回Base64编码过的字节数组字符串
    }
} 