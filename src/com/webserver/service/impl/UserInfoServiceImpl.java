package com.webserver.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.util.ConstantUtil;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.SecurityUtil;
import com.webserver.dao.NewsDao;
import com.webserver.dao.RedeemCodeDao;
import com.webserver.dao.UserInfoDao;
import com.webserver.modal.News;
import com.webserver.modal.RedeemCode;
import com.webserver.modal.UserInfo;
import com.webserver.service.IUserInfoService;

@Service
public class UserInfoServiceImpl implements IUserInfoService {

	@Resource
	private UserInfoDao userInfoDao;
	@Resource
	private RedeemCodeDao redeemCodeDao;
	@Resource
	private NewsDao newsDao;
	@Override
	public PageData<UserInfo> getUserListByParams(UserInfo userInfo,
			PageBean pageBean) throws Exception {
		PageData<UserInfo> pageData = new PageData<UserInfo>();
		List<UserInfo> list = userInfoDao.getUserListByParams(userInfo, pageBean, pageData);
		pageData.setRows(list);
		return pageData;
	}
	@Override
	public int addUser(UserInfo userInfo) throws Exception {
		
		userInfoDao.addUser(userInfo);
		News news = new News();
		news.setTitle("系统消息");
		news.setType(1);
		news.setUserId(userInfo.getUserId());
		news.setCreateTime(DateUtil.getDateTimeString(new Date()));
		news.setStatus(0);
		String content = ConstantUtil.MSG_SIGNUP_SUCCESS();
		news.setContent(content);
		newsDao.addNews(news);
		return 1;
	}
	@Override
	public int updateUser(UserInfo userInfo)  throws Exception {
		return userInfoDao.updateUser(userInfo);
	}
	@Override
	public UserInfo getUserInfoByUser(UserInfo userInfo) throws Exception {
		return userInfoDao.getUserInfoByUser(userInfo);
	}
	@Override
	public int authUser(UserInfo userInfo) throws Exception {
		String redeemCodeString = SecurityUtil.createRedeemCode(userInfo.getUserId());
		RedeemCode redeemCode = new RedeemCode();
		redeemCode.setUserId(userInfo.getUserId());
		redeemCode.setStatus(1);
		redeemCode.setCouponPackageIds("100014");
		redeemCode.setPackageNames("实名认证礼包");
		redeemCode.setRedeemCode(redeemCodeString);
		redeemCode.setCreateTime(DateUtil.getDateTimeString(new Date()));
		redeemCodeDao.addRedeemCode(redeemCode);
		News news = new News();
		news.setTitle("兑换码消息");
		news.setType(2);
		news.setCode(redeemCode.getRedeemCode());
		news.setUserId(redeemCode.getUserId());
		news.setCreateTime(DateUtil.getDateTimeString(new Date()));
		news.setStatus(0);
		String content = ConstantUtil.MSG_SEND_REDEEMCOD(redeemCode.getPackageNames(), redeemCode.getRedeemCode());
		news.setContent(content);
		newsDao.addNews(news);
		
		return  userInfoDao.updateUser(userInfo);
	}

	
}
