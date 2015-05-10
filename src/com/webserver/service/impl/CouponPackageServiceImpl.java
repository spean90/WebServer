package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.util.StringUtil;
import com.webserver.dao.CouponPackageDao;
import com.webserver.dao.OperLogDao;
import com.webserver.modal.CouponPackage;
import com.webserver.modal.OperLog;
import com.webserver.service.ICouponPackageService;

/**
 * 优惠券
 * @author hsp
 *
 */
@Service
public class CouponPackageServiceImpl implements ICouponPackageService {
	@Resource
	private CouponPackageDao couponPackageDao;
	@Resource
	private OperLogDao operLogDao;
	private Logger logger = LoggerFactory.getLogger(CouponPackageServiceImpl.class);
	@Override
	public PageData<CouponPackage> getCouponPackageListByParams(
			CouponPackage couponPackage, PageBean pageBean) throws Exception {
		PageData<CouponPackage> pageData = new PageData<CouponPackage>();
		List<CouponPackage> rows = couponPackageDao.getCouponPackageListByParams(couponPackage, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}
	@Override
	public int addCouponPackage(CouponPackage couponPackage,
			HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("添加优惠券礼包");
		operLog.setParams(StringUtil.toJson(couponPackage));
		try {
			couponPackageDao.addCouponPackage(couponPackage);
		} catch (Exception e) {
			logger.error("添加优惠券礼包err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 1;
	}
	@Override
	public int updateCouponPackage(CouponPackage couponPackage,
			HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("修改优惠券礼包");
		operLog.setParams(StringUtil.toJson(couponPackage));
		try {
			couponPackageDao.updateCouponPackage(couponPackage);
		} catch (Exception e) {
			logger.error("修改优惠券礼包err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 0;
	}
	@Override
	public int deleteCouponPackageById(Long couponPackageId,
			HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("删除优惠券礼包");
		operLog.setParams(couponPackageId+"");
		try {
			couponPackageDao.deleteCouponPackageById(couponPackageId);
		} catch (Exception e) {
			logger.error("优惠券礼包err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 0;
	}
	
	

}
