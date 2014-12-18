package com.webserver.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.webserver.common.PageBean;
import com.webserver.common.PageData;
import com.webserver.modal.PlayerInfo;

public interface PlayerInfoDao {

	public int insertPlayer(@Param("playerInfo")PlayerInfo playerInfo);
	public PlayerInfo getPlayerById(@Param("playerId")String playerId);
	public List<PlayerInfo> getPlayerByParams(@Param("playerInfo")PlayerInfo playerInfo,@Param("pageBean")PageBean pageBean,
			@Param("pageData")PageData<PlayerInfo> pageData);
}
