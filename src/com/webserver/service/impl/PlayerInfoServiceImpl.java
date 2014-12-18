package com.webserver.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

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

}
