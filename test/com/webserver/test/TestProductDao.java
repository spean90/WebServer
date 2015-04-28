package com.webserver.test;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.webserver.dao.ProductDao;
import com.webserver.modal.Product;

public class TestProductDao {
	ApplicationContext context = new ClassPathXmlApplicationContext("cfg/applicationContext.xml");
	ProductDao dao =  context.getBean(ProductDao.class);
	
	//@Test
	public void addProduct() {
		Product product = new Product();
		product.setProductName("套餐3");
		product.setPrice(2900.0);
		product.setLimitTime(30);
		product.setProductDesc("....");
		product.setProductType(2);
		product.setCreateTime(new Date().toLocaleString());
		dao.addProduct(product);
		
	}
	//@Test
	public void updateProduct() {
		Product product = new Product();
		product.setPrice(2800.0);
		product.setProductDesc("2800送3000");
		product.setProductId(10002l);
		dao.updateProduct(product);
		
	}
	//@Test
	public void deleteProduct() {
		
		dao.deleteProductById(10001l);
	}
	@Test
	public void getListByParams() {
		Product product = new Product();
		product.setProductType(2);;
		dao.getProductListByParams(product, null, null);
		
	}

}
