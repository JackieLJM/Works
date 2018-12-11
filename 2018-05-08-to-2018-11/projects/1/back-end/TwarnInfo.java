package com.maystar.jdkm.system.vo;

import java.util.Date;

import com.maystar.mvc.base.BaseModel;

public class TwarnInfo extends BaseModel{

	private static final long serialVersionUID = 1L;
	
	private Long id;//编号
	private Long equid;//设备编号
	private Long softid;//软件编号
	private Date warntime;//告警时间
	private String value;//告警值
	private String readtime;//阅读时间
	private String reader;//阅读人
	private String level;//告警级别
	private String msg;//警告描述
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getEquid() {
		return equid;
	}
	public void setEquid(Long equid) {
		this.equid = equid;
	}
	public Long getSoftid() {
		return softid;
	}
	public void setSoftid(Long softid) {
		this.softid = softid;
	}
	public Date getWarntime() {
		return warntime;
	}
	public void setWarntime(Date warntime) {
		this.warntime = warntime;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getReadtime() {
		return readtime;
	}
	public void setReadtime(String readtime) {
		this.readtime = readtime;
	}
	public String getReader() {
		return reader;
	}
	public void setReader(String reader) {
		this.reader = reader;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
}
