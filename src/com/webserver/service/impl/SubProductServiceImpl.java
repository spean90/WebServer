package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.dao.SubProductDao;
import com.webserver.modal.SubProduct;
import com.webserver.service.ISubProductService;
@Service
public class SubProductServiceImpl implements ISubProductService {

	@Resource
	private SubProductDao subProductDao;
	@Override
	public List<SubProduct> getSubProductListByProductId(Long productId) {
		return subProductDao.getSubProductListByProductId(productId);
	}

}
