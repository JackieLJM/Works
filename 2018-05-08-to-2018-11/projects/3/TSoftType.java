package com.maystar.jdkm.warning.vo;

import com.maystar.mvc.base.BaseModel;

public class TSoftType extends BaseModel{
	private static final long serialVersionUID = 1L;
	private Long id;
	private String softname;
	private String chinesename;
	private String installdir;
	private Long port;
	private String notes;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSoftname() {
		return softname;
	}
	public void setSoftname(String softname) {
		this.softname = softname;
	}
	public String getChinesename() {
		return chinesename;
	}
	public void setChinesename(String chinesename) {
		this.chinesename = chinesename;
	}
	public String getInstalldir() {
		return installdir;
	}
	public void setInstalldir(String installdir) {
		this.installdir = installdir;
	}
	public Long getPort() {
		return port;
	}
	public void setPort(Long port) {
		this.port = port;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}