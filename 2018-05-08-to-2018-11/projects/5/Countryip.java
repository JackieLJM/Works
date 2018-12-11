package com.maystar.jdksuper.dba.model.countryip;
import com.maystar.mvc.base.BaseModel;

public class Countryip extends BaseModel {
	private static final long serialVersionUID = 1L;
	private long id;
	private long code;
	private String country;
	private String remark;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getCode() {
		return code;
	}
	public void setCode(long code) {
		this.code = code;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}