package com.webserver.apicontroller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.webserver.common.PageData;
import com.webserver.common.ResultBean;
import com.webserver.common.util.SecurityUtil;
import com.webserver.modal.GasCard;
import com.webserver.modal.Product;
import com.webserver.modal.SubProduct;
import com.webserver.service.IGasCardService;
import com.webserver.service.IProductService;
import com.webserver.service.ISubProductService;

@Controller
@RequestMapping("api")
public class IProductController {

	private Logger logger = LoggerFactory.getLogger(IProductController.class);
	
	@Resource
	private IProductService productService;
	@Resource
	private IGasCardService gasCardService;
	@Resource
	private ISubProductService subProductService;
	
	@RequestMapping("getProductListByParam")
	@ResponseBody
	public Object getProductListByParam(Product product,Long userId,String token){
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, userId)) {
			try {
				List<Product> productList = productService.getProductListByProduct(product);
				resultBean.setObject(productList);
			} catch (Exception e) {
				logger.error("err:",e);
				resultBean.setCode("5001");
				resultBean.setMsg(e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
	@RequestMapping("getType1Product")
	@ResponseBody
	public Object getType1Product(Product product,Long userId,String token){
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, userId)) {
			try {
				List<Product> productList = productService.getProductListByProduct(product);
				Map<String, Object> obj = new HashMap<String, Object>();
				GasCard gasCard = new GasCard();
				gasCard.setUserId(userId);
				PageData<GasCard> p = gasCardService.getGasCardListByParams(gasCard, null);
				if (p.getRows()!=null&&p.getRows().size()>0) {
					gasCard = p.getRows().get(0);
				}
				obj.put("productList", productList);
				obj.put("gasCard", gasCard);
				resultBean.setObject(obj);
			} catch (Exception e) {
				logger.error("err:",e);
				resultBean.setCode("5001");
				resultBean.setMsg(e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
	@RequestMapping("getSubProductList")
	@ResponseBody
	public Object getSubProductList(SubProduct subProduct,Long userId,String token){
		ResultBean resultBean = new ResultBean();
		if (SecurityUtil.isValidate(token, userId)) {
			try {
				subProduct.setStatus(1);
				List<SubProduct> list = subProductService.getSubProductListByParam(subProduct);
				resultBean.setObject(list);
			} catch (Exception e) {
				logger.error("err:",e);
				resultBean.setCode("5001");
				resultBean.setMsg(e.getMessage());
			}
		}else{
			resultBean.setCode("3004");
			resultBean.setMsg("token失效请重新登录");
		}
		return resultBean;
	}
	
}
