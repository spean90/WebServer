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
import com.webserver.dao.OperLogDao;
import com.webserver.dao.ProductDao;
import com.webserver.modal.OperLog;
import com.webserver.modal.Product;
import com.webserver.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService {
	private Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
	@Resource
	private ProductDao productDao;
	@Resource
	private OperLogDao operLogDao;
	@Override
	public  PageData<Product> getProductListByParams(Product product,
			PageBean pageBean) {
		 PageData<Product> pageData = new PageData<Product>();
		 List<Product> rows = productDao.getProductListByParams(product, pageBean, pageData);
		 pageData.setRows(rows);
		return pageData;
	}

	@Override
	public int addProduct(Product product, HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("添加套餐："+product.getProductId());
		operLog.setParams(StringUtil.toJson(product));
		try {
			productDao.addProduct(product);
		} catch (Exception e) {
			logger.error("添加套餐err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 0;
	}

	@Override
	public int updateProduct(Product product, HttpServletRequest request) {
		OperLog operLog = new OperLog(request);
		operLog.setOperAction("修改套餐："+product.getProductId());
		operLog.setParams(StringUtil.toJson(product));
		try {
			productDao.updateProduct(product);
		} catch (Exception e) {
			logger.error("修改套餐err:", e);
			operLog.setStatus(0);
		}
		operLogDao.addLog(operLog);
		return 0;
	}

	@Override
	public int deleteProductById(Long productId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Product> getProductListIds(String[] productIds) {
		return productDao.getProductListIds(productIds);
	}

	@Override
	public List<Product> getProductListByProduct(Product product) {
		 List<Product> rows = productDao.getProductListByProduct(product);
		return rows;
	}

}
