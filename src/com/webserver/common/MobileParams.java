package com.webserver.common;

import java.io.Serializable;

public class MobileParams implements Serializable {
	
	//"时间格式yyyyMMddhhmmss"
	String time; 
	//Android为imei，iOS为IDFA"
	String driverId; 
	//"ios/android/web"
	String platform; 
	//"Android为系统版本号如4.0，iOS如8.0 8.1"
	String release; 
	//"设备型号"
	String brand;
	//"设备型号"
	String model; 
	//"wifi/gprs"
	String netype; 
	//"例如1.0.2"
	String version;
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getPlatform() {
		return platform;
	}
	public void setPlatform(String platform) {
		this.platform = platform;
	}
	public String getRelease() {
		return release;
	}
	public void setRelease(String release) {
		this.release = release;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getNetype() {
		return netype;
	}
	public void setNetype(String netype) {
		this.netype = netype;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	
	

}
