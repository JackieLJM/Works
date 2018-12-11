package com.maystar.jdkm.hardwaremanage.vo;

import com.maystar.mvc.base.BaseModel;

public class Tprocessinfo extends BaseModel{

	//序列化ID
	private static final long serialVersionUID = 1L;
	
	private String id;//编号
	private String equid;//硬件编号
	private String serverip;//服务器地址
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEquid() {
		return equid;
	}
	public void setEquid(String equid) {
		this.equid = equid;
	}
	public String getServerip() {
		return serverip;
	}
	public void setServerip(String serverip) {
		this.serverip = serverip;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

	
}
