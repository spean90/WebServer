package com.webserver.common.util;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

public class BaseUtil {

	
	public static String createToken() {
		String uuid = UUID.randomUUID().toString().replace("-", "");
		return uuid;
	}
	
	public static String getRequestIp(HttpServletRequest request) {
		String ip = request.getHeader("X-Real-IP");
        if (ip != null && !"".equals(ip) && !"unknown".equalsIgnoreCase(ip)) {
            return ip;
        }
        ip = request.getHeader("X-Forwarded-For");
        if (ip != null && !"".equals(ip) && !"unknown".equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个IP值，第一个为真实IP。
            int index = ip.indexOf(',');
            if (index != -1) {
                return ip.substring(0, index);
            } else {
                return ip;
            }
        } else {
            return request.getRemoteAddr();
        }
	}
	
	/**
	 * 获取文件名后缀
	 * 
	 * @param filename
	 * @return
	 */
	public static String getExtension(String filename) {
		if ((filename != null) && (filename.length() > 0)) {
			int i = filename.lastIndexOf('.');

			if ((i > -1) && (i < (filename.length() - 1))) {
				return filename.substring(i + 1);
			}
		}
		return "";
	}
	
	/**
	 * 获取URL请求的域名
	 * 
	 * @param request
	 * @return
	 */
	public static String getDomain(HttpServletRequest request) {
		String contextPath = request.getContextPath();
		String scheme = request.getScheme();
		String serverName = request.getServerName();
		Integer serverPort = request.getServerPort();
		String domain = scheme + "://" + serverName + ((serverPort == 80) ? "" : (":" + serverPort)) + contextPath;
		return domain;
	}
}
