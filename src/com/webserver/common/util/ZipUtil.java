package com.webserver.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipUtil {

	public static File createZipFile(File file){
		try {
			FileInputStream fin = new FileInputStream(file);
			byte[] content = new byte[1024];
			ZipOutputStream zout = new ZipOutputStream(new FileOutputStream("E:\\b.zip"));
			ZipEntry zipEntry = new ZipEntry("c.mp4");
			zout.putNextEntry(zipEntry);
			while(fin.read(content) != -1){
				zout.write(content);
			}
			fin.close();
			zout.closeEntry();
			zout.finish();
			zout.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void createGZIPFile(File file,String gzipFileName) throws Exception {
		FileInputStream fin = new FileInputStream(file);
		byte[] b = new byte[1024];
		GZIPOutputStream gzipOutputStream = new GZIPOutputStream(new FileOutputStream(gzipFileName));
		while(fin.read(b)!=-1){
			gzipOutputStream.write(b);
		}
		fin.close();
		gzipOutputStream.finish();
		gzipOutputStream.close();
	}
	public static byte[] getByteFromGZIPFile(File file) throws Exception {
		GZIPInputStream gin = new GZIPInputStream(new FileInputStream(file));
		byte[] b = new byte[gin.available()];
		gin.read(b);
		System.out.println(b.length);
		return b;
	}
	
	public static void main(String[] args) throws Exception {
		//ZipUtil.createGZIPFile(new File("E:\\ab.mp4"),"E:\\ab.mp4.gz");
		//ZipUtil.getByteFromGZIPFile(new File("E:\\ab.mp4.tar.gz"));
		ZipUtil.createZipFile(new File("E:\\ab.mp4"));
	}
}
