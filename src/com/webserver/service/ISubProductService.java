package com.webserver.service;

import java.util.List;

import com.webserver.modal.SubProduct;

public interface ISubProductService {

	public List<SubProduct> getSubProductListByProductId(Long productId);
}
