package com.webserver.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
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
//			ZipInputStream zin = new ZipInputStream(new FileInputStream(file));
//			zin.
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public static void createGZIPFile(File file) throws Exception {
		FileInputStream fin = new FileInputStream(file);
		byte[] b = new byte[1024];
		GZIPOutputStream gzipOutputStream = new GZIPOutputStream(new FileOutputStream("E:\\gg.tar.gz"));
		while(fin.read(b)!=-1){
			gzipOutputStream.write(b);
		}
		fin.close();
		gzipOutputStream.finish();
		gzipOutputStream.close();
	}
	
	public static void main(String[] args) throws Exception {
		ZipUtil.createGZIPFile(new File("E:\\b.log"));
	}
}
