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
import com.webserver.common.util.StringUtil;
import com.webserver.dao.ManagerDao;
import com.webserver.dao.OperLogDao;
import com.webserver.modal.Manager;
import com.webserver.modal.OperLog;
import com.webserver.service.ISysService;

@Service
public class SysServiceImpl implements ISysService {

	@Resource
	private ManagerDao managerDao;
	@Resource
	private OperLogDao operLogDao;

	@Override
	public Map<String, Object> login(HttpServletRequest request,
			String account, String password, String authCode) {
		Map<String, Object> map = new HashMap<String, Object>();

		HttpSession session = request.getSession();

		// 验证码判断
		String authCodeSession = (String) session
				.getAttribute(ConstantUtil.AUTHCODE);
		if (authCodeSession.equalsIgnoreCase(authCode)) {
			List<Manager> managerList = managerDao.login(account, MD5.md5(password));
			if (managerList.size() > 0) {
				Manager manager = managerList.get(0);
				session.setAttribute("manager", manager);
				map.put(ConstantUtil.RETURN_SUCCESS, true);
				OperLog operLog = new OperLog(request);
				operLog.setOperAction("登录");
				operLog.setParams(StringUtil.toJson(manager));
				operLogDao.addLog(operLog);
			} else {
				map.put(ConstantUtil.RETURN_SUCCESS, false);
				map.put(ConstantUtil.RETURN_MESSAGE, "帐号或密码错误");
			}
		} else {
			map.put(ConstantUtil.RETURN_SUCCESS, false);
			map.put(ConstantUtil.RETURN_MESSAGE, "验证码错误");
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
