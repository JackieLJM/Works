package com.maystar.jdkm.warning.vo;

import java.util.Date;

import com.maystar.mvc.base.BaseModel;

public class TSoftInfo extends BaseModel{
	private static final long serialVersionUID = 1L;
	private long id;
	private long equid;
	private String softname;
	private String softid;
	private String groupname;
	private String groupsub;
	private String chinesename;
	private String installdir;
	private long port;
	private char status;
	private Date statustime;
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getEquid() {
		return equid;
	}
	public void setEquid(long equid) {
		this.equid = equid;
	}
	public String getSoftname() {
		return softname;
	}
	public void setSoftname(String softname) {
		this.softname = softname;
	}
	public String getSoftid() {
		return softid;
	}
	public void setSoftid(String softid) {
		this.softid = softid;
	}
	public String getGroupname() {
		return groupname;
	}
	public void setGroupname(String groupname) {
		this.groupname = groupname;
	}
	public String getGroupsub() {
		return groupsub;
	}
	public void setGroupsub(String groupsub) {
		this.groupsub = groupsub;
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
	public long getPort() {
		return port;
	}
	public void setPort(long port) {
		this.port = port;
	}
	public char getStatus() {
		return status;
	}
	public void setStatus(char status) {
		this.status = status;
	}
	public Date getStatustime() {
		return statustime;
	}
	public void setStatustime(Date statustime) {
		this.statustime = statustime;
	}
}