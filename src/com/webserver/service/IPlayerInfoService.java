package com.webserver.service;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.PlayerInfo;

/**
 * 用户表相关service
* 
* @author Huangsp
* @date 2014年12月18日 
*
 */
public interface IPlayerInfoService {

	public int insertPlayer(PlayerInfo playerInfo) throws Exception;
	public PlayerInfo getPlayerInfoById(String playerId) throws Exception;
	public PageData<PlayerInfo> getPlayerListByPage(PlayerInfo playerInfo,PageBean pageBean);
	
}
