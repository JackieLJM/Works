package com.maystar.jdkm.warning.vo;

import java.util.Date;

import com.maystar.mvc.base.BaseModel;

public class TSoftState extends BaseModel{
	private static final long serialVersionUID = 1L;
	private Long id;
	private String softid;
	private String softname;
	private Date datetime;
	private String secname;
	private Long partid;
	private String keyname;
	private String keyvalue;
	private Long maxvalue;
	private Long minvalue;
	private Long warnlevel;
	private char status;
	public Long getMaxvalue() {
		return maxvalue;
	}
	public void setMaxvalue(Long maxvalue) {
		this.maxvalue = maxvalue;
	}
	public Long getMinvalue() {
		return minvalue;
	}
	public void setMinvalue(Long minvalue) {
		this.minvalue = minvalue;
	}
	public Long getWarnlevel() {
		return warnlevel;
	}
	public void setWarnlevel(Long warnlevel) {
		this.warnlevel = warnlevel;
	}
	public char getStatus() {
		return status;
	}
	public void setStatus(char status) {
		this.status = status;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSoftid() {
		return softid;
	}
	public void setSoftid(String softid) {
		this.softid = softid;
	}
	public String getSoftname() {
		return softname;
	}
	public void setSoftname(String softname) {
		this.softname = softname;
	}
	public Date getDatetime() {
		return datetime;
	}
	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}
	public String getSecname() {
		return secname;
	}
	public void setSecname(String secname) {
		this.secname = secname;
	}
	public Long getPartid() {
		return partid;
	}
	public void setPartid(Long partid) {
		this.partid = partid;
	}
	public String getKeyname() {
		return keyname;
	}
	public void setKeyname(String keyname) {
		this.keyname = keyname;
	}
	public String getKeyvalue() {
		return keyvalue;
	}
	public void setKeyvalue(String keyvalue) {
		this.keyvalue = keyvalue;
	}
	
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}