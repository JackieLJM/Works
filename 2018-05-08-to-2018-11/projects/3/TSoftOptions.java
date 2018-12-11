package com.maystar.jdkm.warning.vo;

import com.maystar.mvc.base.BaseModel;

public class TSoftOptions extends BaseModel{
	private static final long serialVersionUID = 1L;
	private long id;
	private long pos;
	private String softname;
	private String secname;
	private char sectype;
	private String keyname;
	private char keytype;
	private char warnflag;
	private char warntype;
	private String value;
	private long maxvalue;
	private long minvalue;
	private long warnlevel;
	private String softid;
	private long partid;
	private String paramtype;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getPos() {
		return pos;
	}
	public void setPos(long pos) {
		this.pos = pos;
	}
	public String getSoftname() {
		return softname;
	}
	public void setSoftname(String softname) {
		this.softname = softname;
	}
	public String getSecname() {
		return secname;
	}
	public void setSecname(String secname) {
		this.secname = secname;
	}
	public char getSectype() {
		return sectype;
	}
	public void setSectype(char sectype) {
		this.sectype = sectype;
	}
	public String getKeyname() {
		return keyname;
	}
	public void setKeyname(String keyname) {
		this.keyname = keyname;
	}
	public char getKeytype() {
		return keytype;
	}
	public void setKeytype(char keytype) {
		this.keytype = keytype;
	}
	public char getWarnflag() {
		return warnflag;
	}
	public void setWarnflag(char warnflag) {
		this.warnflag = warnflag;
	}
	public char getWarntype() {
		return warntype;
	}
	public void setWarntype(char warntype) {
		this.warntype = warntype;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public long getMaxvalue() {
		return maxvalue;
	}
	public void setMaxvalue(long maxvalue) {
		this.maxvalue = maxvalue;
	}
	public long getMinvalue() {
		return minvalue;
	}
	public void setMinvalue(long minvalue) {
		this.minvalue = minvalue;
	}
	public long getWarnlevel() {
		return warnlevel;
	}
	public void setWarnlevel(long warnlevel) {
		this.warnlevel = warnlevel;
	}
	public String getSoftid() {
		return softid;
	}
	public void setSoftid(String softid) {
		this.softid = softid;
	}
	public long getPartid() {
		return partid;
	}
	public void setPartid(long partid) {
		this.partid = partid;
	}
	public String getParamtype() {
		return paramtype;
	}
	public void setParamtype(String paramtype) {
		this.paramtype = paramtype;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}