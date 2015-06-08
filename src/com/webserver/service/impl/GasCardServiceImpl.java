package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.dao.GasCardDao;
import com.webserver.dao.GasOrderDao;
import com.webserver.modal.GasCard;
import com.webserver.service.IGasCardService;

@Service
public class GasCardServiceImpl implements IGasCardService {

	@Resource
	private GasCardDao gasCardDao;
	@Resource
	private GasOrderDao gasOrderDao;
	
	@Override
	public PageData<GasCard> getGasCardListByParams(GasCard gasCard,
			PageBean pageBean) {
		PageData<GasCard> pageData = new PageData<GasCard>();
		List<GasCard> rows = gasCardDao.getGasCardListByParams(gasCard, pageBean, pageData);
		pageData.setRows(rows);
		return pageData;
	}

	@Override
	public int addGasCard(GasCard gasCard) {
		// TODO Auto-generated method stub
		return gasCardDao.addGasCard(gasCard);
	}

	@Override
	public int deleteGasCardById(Long gasId) {
		// TODO Auto-generated method stub
		return gasCardDao.deleteGasCardById(gasId);
	}

	@Override
	public GasCard getGasCardById(Long gasId) {
		// TODO Auto-generated method stub
		return gasCardDao.getGasCardById(gasId);
	}

	@Override
	public GasCard getGasCardByUser(GasCard gasCard) {
		// TODO Auto-generated method stub
		return gasCardDao.getGasCardByUser(gasCard);
	}

	@Override
	public void updateGasCard(GasCard gasCard) {
		if (gasCard.getStatus()!=null && gasCard.getStatus()==3) {
			//如果是接触绑定,删除未支付的订单
			gasOrderDao.updateGasOrderForDeleteGasCard(gasCard.getUserId());
		}
		gasCardDao.updateGasCard(gasCard);
	}

}
