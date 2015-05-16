package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.webserver.common.util.StringUtil;
import com.webserver.dao.OperLogDao;
import com.webserver.dao.SubProductDao;
import com.webserver.modal.OperLog;
import com.webserver.modal.SubProduct;
import com.webserver.service.ISubProductService;
@Service
public class SubProductServiceImpl implements ISubProductService {
	private Logger logger = LoggerFactory.getLogger(SubProductServiceImpl.class);
	@Resource
	private SubProductDao subProductDao;
	@Resource
	private OperLogDao operLogDao;
	@Override
	public List<SubProduct> getSubProductListByProductId(Long productId) {
		return subProductDao.getSubProductListByProductId(productId);
	}
	@Override
	public void addSubProduct(SubProduct subProduct, HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("添加折扣");
		operLog.setParams(StringUtil.toJson(subProduct));
		try {
			subProductDao.addSubProduct(subProduct);
		} catch (Exception e) {
			logger.error("添加折扣err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
	}
	@Override
	public void updateSubProduct(SubProduct subProduct,
			HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("修改折扣");
		operLog.setParams(StringUtil.toJson(subProduct));
		try {
			subProductDao.updateSubProduct(subProduct);
		} catch (Exception e) {
			logger.error("修改折扣err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
	}

}
