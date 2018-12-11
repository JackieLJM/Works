package com.maystar.jdksuper.dba.model.operatetype;

import com.maystar.mvc.base.BaseModel;

public class OperateTypeModel extends BaseModel{
	private static final long serialVersionUID=1L;
	private Integer id;
	private String code;
	private String name;
	private String servertype;
	private String remark;
	private Integer direction;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getServertype() {
		return servertype;
	}
	public void setServertype(String servertype) {
		this.servertype = servertype;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Integer getDirection() {
		return direction;
	}
	public void setDirection(Integer direction) {
		this.direction = direction;
	}
}
