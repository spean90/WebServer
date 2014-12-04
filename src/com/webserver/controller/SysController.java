package com.webserver.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.util.ConstantUtil;
import com.webserver.modal.User;
import com.webserver.service.ISysService;

@Controller
@RequestMapping("sys")
public class SysController {
	
	@Resource
	private ISysService sysService;

	@RequestMapping("login.do")
	@ResponseBody
	public Object login(HttpServletRequest request,String account,String password,String authCode) {
		
		return sysService.login(request,account, password, authCode);
	}
	

	/**
	 * 验证码生成
	 * 
	 * @param response
	 * @throws Exception
	 */
	
	@RequestMapping("createAuthcode.do")
	@ResponseBody
	public void createAuthcode(HttpServletRequest request,HttpServletResponse response) throws IOException {
		Map<String, Object> map = sysService.createAuthcode(request.getSession());
		response.setHeader("P3P", "CP=CAO PSA OUR");
		BufferedImage image = (BufferedImage) map.get(ConstantUtil.AUTHCODE_IMAGE);
		ImageIO.write(image, "JPEG", response.getOutputStream());
		return;
	}
	
	
}
