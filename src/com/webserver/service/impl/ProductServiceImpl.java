package com.webserver.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.ProductDao;
import com.webserver.modal.Product;
import com.webserver.modal.UserInfo;
import com.webserver.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService {

	@Resource
	private ProductDao productDao;
	@Override
	public  PageData<Product> getProductListByParams(Product product,
			PageBean pageBean) {
		 PageData<Product> pageData = new PageData<Product>();
		 List<Product> rows = productDao.getProductListByParams(product, pageBean, pageData);
		 pageData.setRows(rows);
		return pageData;
	}

	@Override
	public int addProduct(Product product) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateProduct(Product product) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteProductById(Long productId) {
		// TODO Auto-generated method stub
		return 0;
	}

}
