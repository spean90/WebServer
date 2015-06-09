package com.webserver.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.webserver.common.util.ConstantUtil;
import com.webserver.common.util.DateUtil;
import com.webserver.common.util.StringUtil;
import com.webserver.dao.NewsDao;
import com.webserver.dao.OperLogDao;
import com.webserver.dao.RedeemCodeDao;
import com.webserver.modal.News;
import com.webserver.modal.OperLog;
import com.webserver.modal.RedeemCode;
import com.webserver.service.IRedeemCodeService;
@Service
public class RedeemCodeServiceImpl implements IRedeemCodeService {

	@Resource
	private RedeemCodeDao redeemCodeDao;
	@Resource
	private OperLogDao operLogDao;
	@Resource
	private NewsDao newsDao;
	@Override
	public void addRedeemCode(RedeemCode redeemCode,HttpServletRequest request) {
		
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
		if (request!=null) {
			OperLog operLog = new OperLog(request);
			operLog.setOperAction("发送优惠礼包"+redeemCode.getCouponPackageIds());
			operLog.setParams(StringUtil.toJson(redeemCode));
			operLogDao.addLog(operLog);
		}
	}

	@Override
	public RedeemCode getRedeemCodeByCode(RedeemCode redeemCode,HttpServletRequest request) {
		List<RedeemCode> list = redeemCodeDao.getRedeemCodeByCode(redeemCode);
		if (list!=null && list.size()>0) {
			return list.get(0);
		}
		return null;
	}

}
