package com.webserver.test;

import com.biappstore.security.MD5Utils;
import com.biappstore.security.SecurityUtils;
import com.google.zxing.utils.ZxingUtils;

public class Test {
	public static void main(String[] args) {
		// 加密（普通字符）
//		System.out.println("加密（普通字符）:" + SecurityUtils.encryptByTDES("1234567890ABCDEF", "111111111111111111111111"));
//		// 解密（普通字符）
//		System.out.println("解密（普通字符）:" + SecurityUtils.decryptByTDES("hYsXbaixJQNlM+0ZRe3fsQ==", "111111111111111111111111"));
//		// 加密（中文全半角）
//		System.out.println("加密（中文全半角）:" + SecurityUtils.encryptByTDES("你好百度91abcABC?？ＥＦＧｈｉ～~《》百度？", "111111111111111111111111"));
//		// 解密（中文全半角）
//		System.out.println("解密（中文全半角）:"
//				+ SecurityUtils.decryptByTDES("B3j/QaJST43kvnPjzNul1FvRrzfrmp8jITjzsks2hcaDfaIgMKhffchoTquvGHZctA2W7YKBN8PNs4bkjELBtA==",
//						"111111111111111111111111"));
//		// MD5生成
//		System.out.println("MD5生成:" + MD5Utils.getMD5("1234567890ABCDEF"));
//		// MD5校验
//		System.out.println("MD5校验:" + MD5Utils.CheckMD5("1234567890ABCDEF", "3A6BFF0799C7389F522F3847C33A468F"));
		// 生成二维码
		System.out.println("生成二维码：" + ZxingUtils.createQRCode("http://115.28.65.214/api/downLoadApk.do?managerAccount=admin", 200, 200, "D://", "test.png"));
	}
}
