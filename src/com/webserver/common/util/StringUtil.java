package com.webserver.common.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @ClassName: StringUtil
 * @Description: 字符串工具类
 * @author
 * @since 2012/5/15
 * 
 */
public class StringUtil {

	/**
	 * 判断是否为空
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str) {
		if (str == null || "".equals(str)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 去除空格
	 * 
	 * @param str
	 * @return
	 */
	public static String trim(String str) {
		return (str == null ? "" : str.trim());
	}

	/**
	 * 判断一个字符串是不是数字,如果是就返回TRUE，如果不是就返回FALSE
	 * 
	 * @param obj
	 * @return boolean
	 */
	public static boolean isNum(String obj) {
		boolean flag = true;
		Pattern pattern = Pattern.compile("[0-9]*");
		Matcher isNumber = pattern.matcher(obj);

		if (!isNumber.matches()) {
			flag = false;
		}
		return flag;
	}

	/**
	 * 判断性别是否为“男”或“女”，如果是就返回TRUE，如果不是就返回FALSE
	 * 
	 * @param obj
	 * @return boolean
	 */
	public static boolean isSex(String obj) {
		boolean flag = true;
		Pattern pattern = Pattern.compile("[男女]{1}");
		Matcher isRightSex = pattern.matcher(obj);

		if (!isRightSex.matches()) {
			flag = false;
		}

		return flag;
	}

	/**
	 * 转换Double数据类型精度为
	 * 
	 * @param value
	 *            要转换的数据
	 * @param precision
	 *            小数点后的位数
	 * @return double 转换的数据
	 */
	public static double convertPrecision(double value, int precision) {
		String strDoubleValue = String.valueOf(value);
		int len = strDoubleValue.indexOf(".");
		if (len != -1) {
			String integerValue = strDoubleValue.substring(0, len);
			String precisionValue = strDoubleValue.substring(len + 1);
			if (precisionValue.length() > precision) {
				precisionValue = precisionValue.substring(0, precision);
			}
			strDoubleValue = integerValue + "." + precisionValue;
		}
		return Double.parseDouble(strDoubleValue);
	}

	/**
	 * 清除字符串中的空格、回车、换行符、制表符
	 * 
	 * @author CJianY
	 * @date 2014-5-11
	 * 
	 * @param str
	 * @return
	 */
	public static String replaceBlank(String str) {
		String dest = "";
		if (str != null) {
			Pattern p = Pattern.compile("\\s*|\t|\r|\n");
			Matcher m = p.matcher(str);
			dest = m.replaceAll("");
		}
		return dest;
	}

}
