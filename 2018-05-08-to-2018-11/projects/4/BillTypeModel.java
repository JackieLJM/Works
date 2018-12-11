package com.maystar.jdksuper.dba.model.billtype;

import com.maystar.mvc.base.BaseModel;

public class BillTypeModel extends BaseModel{
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String kind;
	private String subkind;
	private String code;
	private String name;
	private String remark;
	private Integer sortmark;
	private String unitekind;
//	public static long getSerialversionuid() {
//		return serialVersionUID;
//	}
//	public static void setSerialversionuid(long serialversionuid) {
//		serialVersionUID = serialversionuid;
//	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
		this.kind = kind;
	}
	public String getSubkind() {
		return subkind;
	}
	public void setSubkind(String subkind) {
		this.subkind = subkind;
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
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Integer getSortmark() {
		return sortmark;
	}
	public void setSortmark(Integer sortmark) {
		this.sortmark = sortmark;
	}
	public String getUnitekind() {
		return unitekind;
	}
	public void setUnitekind(String unitekind) {
		this.unitekind = unitekind;
	}
}