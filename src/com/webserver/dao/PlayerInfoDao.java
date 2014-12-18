package com.webserver.dao;

import org.apache.ibatis.annotations.Param;

import com.webserver.modal.PlayerInfo;

public interface PlayerInfoDao {

	public int insertPlayer(@Param("playerInfo")PlayerInfo playerInfo);
	public PlayerInfo getPlayerById(@Param("playerId")String playerId);
}
