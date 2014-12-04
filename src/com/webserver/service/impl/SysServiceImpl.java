package com.webserver.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Service;

import com.webserver.common.util.AuthCodeUtil;
import com.webserver.common.util.ConstantUtil;
import com.webserver.common.util.MD5;
import com.webserver.dao.UserDao;
import com.webserver.modal.User;
import com.webserver.service.ISysService;

@Service
public class SysServiceImpl implements ISysService {
	
	@Resource
	private UserDao userDao;

	@Override
	public Map<String, Object> login(HttpServletRequest request,String account, String password,
			String authCode) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		List<User> userList = userDao.login(account, MD5.md5(password));
		HttpSession session = request.getSession();
		if(userList.size() > 0) {
			// 验证码判断
			String authCodeSession = (String)session.getAttribute(ConstantUtil.AUTHCODE);
			if (authCodeSession.equalsIgnoreCase(authCode)) {
				User userInfo = userList.get(0);
				session.setAttribute("user", userInfo);
				map.put(ConstantUtil.RETURN_SUCCESS, true);
			} else {
				map.put(ConstantUtil.RETURN_SUCCESS, false);
				map.put(ConstantUtil.RETURN_MESSAGE, "验证码错误");
			}
		} else {
			map.put(ConstantUtil.RETURN_SUCCESS, false);
			map.put(ConstantUtil.RETURN_MESSAGE, "帐号或密码错误");
		}
		
		return map;
	}
	
	@Override
	public Map<String, Object> createAuthcode(HttpSession httpSession) {
		// 生成验证码对象
		AuthCodeUtil rc = new AuthCodeUtil();
		Map<String, Object> map = rc.createRandImage();
		// 验证码保存到session
		String authcode = (String) map.get(ConstantUtil.AUTHCODE);
		httpSession.setAttribute(ConstantUtil.AUTHCODE, authcode);
		return map;
	}
}
