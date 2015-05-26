package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.GasCard;

public interface IGasCardService {

	public PageData<GasCard> getGasCardListByParams(GasCard gasCard,PageBean pageBean);
	public int addGasCard(GasCard gasCard);
	public int deleteGasCardById(Long gasId);
	public GasCard getGasCardById(Long gasId);
}
