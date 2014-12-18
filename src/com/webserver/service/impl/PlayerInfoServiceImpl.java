package com.webserver.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.common.util.ImageBase64Util;
import com.webserver.dao.PlayerInfoDao;
import com.webserver.modal.PlayerInfo;
import com.webserver.service.IPlayerInfoService;

@Service
public class PlayerInfoServiceImpl implements IPlayerInfoService {
	
	@Resource
	private PlayerInfoDao playerInfoDao;
	
	@Override
	public int insertPlayer(PlayerInfo playerInfo) throws Exception {
		return playerInfoDao.insertPlayer(playerInfo);
	}

	@Override
	public PlayerInfo getPlayerInfoById(String playerId) throws Exception {
		return playerInfoDao.getPlayerById(playerId);
	}

	@Override
	public PageData<PlayerInfo> getPlayerListByPage(PlayerInfo playerInfo,
			PageBean pageBean) {
		PageData<PlayerInfo> pageData = new PageData<PlayerInfo>();
		List<PlayerInfo> list = playerInfoDao.getPlayerByParams(playerInfo, pageBean, pageData);
		if (list!=null&&list.size()>0) {
			for(PlayerInfo pInfo:list) {
				pInfo.setHeadImgBase64Str(ImageBase64Util.getImageStrFromByte(pInfo.getHeadImg()));
			}
		}
		pageData.setRows(list);
		return pageData;
	}

}
