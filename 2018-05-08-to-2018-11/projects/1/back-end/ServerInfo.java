/**
 * 
 * 
 * @author liujm
 */
package com.maystar.jdkm.system.vo;

import com.maystar.mvc.base.BaseModel;

public class ServerInfo extends BaseModel {

	private static final long serialVersionUID = 1L;

	private Long id;

	private String serverip;

	private String servername;

	public Long getId() {
		return id;
	}

	public void setId(long i) {
		this.id = i;
	}

	public String getServerip() {
		return serverip;
	}

	public void setServerip(String serverip) {
		this.serverip = serverip;
	}

	public String getServername() {
		return servername;
	}

	public void setServername(String servername) {
		this.servername = servername;
	}
}