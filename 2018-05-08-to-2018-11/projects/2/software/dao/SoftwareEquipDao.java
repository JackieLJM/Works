package com.maystar.jdkm.software.dao;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.naming.NamingException;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.maystar.common.dbutils.CommonDBFunc;
import com.maystar.common.dbutils.Page;
import com.maystar.common.dbutils.ResultTable;
import com.maystar.common.dbutils.SqlRunner;
import com.maystar.common.util.StringUtils;
import com.maystar.common.util.WebUtil;
import com.maystar.jdkm.equip.vo.HardwareType;
import com.maystar.jdkm.software.model.SoftwareEquipModel;
import com.maystar.mvc.base.BaseDao;
import com.maystar.mvc.common.util.DBUtil;

@Repository
public class SoftwareEquipDao extends BaseDao {
	static Logger logger = Logger.getLogger(SoftwareEquipDao.class.getName());
	

	public Page softwareEquipGridView(SoftwareEquipModel softwareEquipModel, String string) throws Exception {
		Page page = new Page();
		page.setCurrentPage(softwareEquipModel.getPage());
		page.setPageSize(softwareEquipModel.getPageSize());
		//page.setPageSize(2);
		
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.appendSql("select * from TSOFTTYPE t where 1=1");
		if (softwareEquipModel.getSoftandchinese() != null&& !"".equals(softwareEquipModel.getSoftandchinese())) {
			String sql = " and t.softname like'%"
					+ softwareEquipModel.getSoftandchinese() + "%' or t.chinesename like '%"
					+ softwareEquipModel.getSoftandchinese()+ "%' ";
			run.appendSql(sql);
		}
		page.setOrderBySql("order by t.id desc");		
		page= run.query(page);
		return page;
	
	}


	public int softwareEquipAdd(SoftwareEquipModel softwareEquipModel) throws Exception {
		SqlRunner runner = new SqlRunner(WebUtil.ds);
		long tarTId = DBUtil
				.getSeqID(WebUtil.ds, "SEQ_TSOFTTYPE");
		runner.setInsertTable("TSOFTTYPE");
		runner.buildInsert("id", tarTId);

		runner.buildInsert("softname", softwareEquipModel.getSoftname());
		runner.buildInsert("chinesename", softwareEquipModel.getChinesename());
		runner.buildInsert("installdir", softwareEquipModel.getInstalldir());
		runner.buildInsert("port", softwareEquipModel.getPort());
		if(softwareEquipModel.getNotes()!=null&&!"".equals(softwareEquipModel.getNotes())){
		  runner.buildInsert("notes", softwareEquipModel.getNotes());
		}
		runner.cleanInsert();
		int result = runner.update();
		runner.clear();
		return result;
	}


	public Page softwareConGridView(SoftwareEquipModel softwareEquipModel, String string) throws Exception {
		Page page = new Page();
		page.setCurrentPage(softwareEquipModel.getPage());
		page.setPageSize(softwareEquipModel.getPageSize());	
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.appendSql("select * from tsoftdefault t where 1=1");
		run.buildWhere("and softname=?", softwareEquipModel.getSoftname());
		page.setOrderBySql("order by t.id desc");		
		page= run.query(page);
		return page;
	}


	public Map<String, List<String>> tsoftdefaultMap(String softname) throws Exception {
		Map<String,List<String>> map=new HashMap<String, List<String>>();
		String sql="select * from TSOFTDEFAULT t where softname='"+softname+"'";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		for (int i = 0; i < rt.getListNum(); i++) {
			String secname= rt.getTableValue(i,"secname");
			String keyname=rt.getTableValue(i,"keyname");
			if(map.containsKey(secname)){
				map.get(secname).add(keyname);
			}else{
				List<String> list=new ArrayList<>();
				list.add(keyname);
				map.put(secname, list);
			}
		}
		
		return map;
	}


	public Map<String, Integer> mapSectype(String softname) throws Exception {
		Map<String, Integer> map=new HashMap<String, Integer>();
		String sql="select * from TSOFTDEFAULT t where softname='"+softname+"'";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		for (int i = 0; i < rt.getListNum(); i++) {
			String secname= rt.getTableValue(i,"secname");
			Integer sectype=Integer.parseInt(rt.getTableValue(i,"sectype"));
			map.put(secname, sectype);
		}		
		return map;
	}

	public int deleteSoftwareCon(String id) throws Exception {
		String sql="delete from TSOFTDEFAULT t where t.id="+id;
		return CommonDBFunc.execUpdateSql(sql);
	}


	public int editTsoftdefault(String strs) {
		
		String[] strarry=strs.split("=");
		ArrayList<String> listsql = new ArrayList<String>();
		for(int i=0;i<strarry.length;i++){
			String str =strarry[i];
			String[] str2arry = str.split(",");
			String sql = "update tsoftdefault t set ";
			String sqlWhere = " where 1=1 ";
			StringBuffer sqlSet = new StringBuffer();
			for(int j=0;j<str2arry.length;j++){
				String[] str3arry=str2arry[j].split(":");
				String key = str3arry[0];
				String value = str3arry.length==2?str3arry[1]:"";
				if(key.equals("keytype")){
					sqlSet.append(", t.keytype='" +value+"'");
				}
				if(key.equals("keyname")){
					sqlSet.append(", t.keyname='" +value+"'");
				}		
				if(key.equals("filetype")){
					sqlSet.append(", t.filetype='" +value+"'");
				}		
				if(key.equals("sectype")){
					sqlSet.append(", t.sectype='" +value+"'");
				}		
				if(key.equals("secname")){
					sqlSet.append(", t.secname='"+value+"'");
				}
				if(key.equals("minvalue")){
					sqlSet.append(", t.minvalue='"+value+"'");
				}
				if(key.equals("maxvalue")){
					sqlSet.append(", t.maxvalue='"+value+"'");
				}
				if(key.equals("value")){
					sqlSet.append(", t.value='"+value+"'");
				}
				if(key.equals("warntype")){
					sqlSet.append(", t.warntype='"+value+"'");
				}
				if(key.equals("warnflag")){
					sqlSet.append(", t.warnflag='"+value+"'");
				}
				if(key.equals("warnlevel")){
					sqlSet.append(", t.warnflag='"+value+"'");
				}
				if(key.equals("paramtype")){
					sqlSet.append(", t.paramtype='"+value+"'");
				}
				//条件拼接
				if(key.equals("id")){
					sqlWhere = sqlWhere + " and t.id='"+value+"'";
				}
				
			}
			if(sqlSet.toString().startsWith(",")){
				sql = sql + sqlSet.toString().substring(1, sqlSet.toString().length()) + sqlWhere;
				listsql.add(sql);
			}
		}
		try {
			if(listsql.size()>0){
				CommonDBFunc.exeUpdateList(listsql);
			}
			return 1;
		} catch (Exception e) {
			return 0;
		}
	}


	public int softwareEquipEdit(SoftwareEquipModel softwareEquipModel) throws Exception {
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.setUpdateTable("TSOFTTYPE");
		run.buildUpdate("chinesename", softwareEquipModel.getChinesename());
		run.buildUpdate("installdir", softwareEquipModel.getInstalldir());
		run.buildUpdate("port", softwareEquipModel.getPort());
		run.buildUpdate("notes", softwareEquipModel.getNotes());
		run.cleanUpdate();// 去掉最后一个逗号
		run.appendSql("where 1=1 ");
		run.appendSql("and id =" + softwareEquipModel.getId());
		int result = run.update();
		run.clear();
		return result;
	}


	public int deleteTsofttype(String softnames) throws Exception {
		String sql="delete from TSOFTDEFAULT t where t.softname in("+softnames+")";//删除默认配置文件
		
		CommonDBFunc.execUpdateSql(sql);
		
        String sqlType="delete from TSOFTTYPE t where t.softname in("+softnames+")";//删除类型
		
		return CommonDBFunc.execUpdateSql(sqlType);
	}


	public Page softwareManageEquipGridView(SoftwareEquipModel softwareEquipModel, String string) throws Exception {
		Page page = new Page();
		page.setCurrentPage(softwareEquipModel.getPage());
		page.setPageSize(softwareEquipModel.getPageSize());
		//page.setPageSize(2);
		
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.appendSql("select t.*,d.ipaddress from tsoftinfo t left join thardwareinfo d on t.equid=d.equid where 1=1");
		String id=softwareEquipModel.getId();//点击做侧树节点名

		if(id!=null&&!"".equals(id)){			
		    id=StringUtils.deleteLastChar(id, ',');
			run.appendSql(" and t.id in ("+id+")");
		}

		if(softwareEquipModel.getStatus() != null){
			run.buildWhere(" and t.status = ?",softwareEquipModel.getStatus());
		}
				
		if (softwareEquipModel.getSoftandchinese() != null&& !"".equals(softwareEquipModel.getSoftandchinese())) {
		 String sql = " and (t.softname like'%"
				+ softwareEquipModel.getSoftandchinese() + "%' or d.ipaddress like '%"
				+ softwareEquipModel.getSoftandchinese()+ "%') ";
			run.appendSql(sql);
	    }
		page.setOrderBySql("order by t.id desc");
		page= run.query(page);
		return page;
	}


	public ResultTable softwareManageEquipTreeView(SoftwareEquipModel softwareEquipModel, String string) throws Exception {
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.appendSql("select t.*,d.ipaddress from tsoftinfo t left join thardwareinfo d on t.equid=d.equid where 1=1");
		if (softwareEquipModel.getSoftandchinese() != null&& !"".equals(softwareEquipModel.getSoftandchinese())) {
			String sql = " and t.softname like'%"
					+ softwareEquipModel.getSoftandchinese() + "%' or t.chinesename like '%"
					+ softwareEquipModel.getSoftandchinese()+ "%' ";
			run.appendSql(sql);
		}
		ResultTable table=new ResultTable((ArrayList) run.query());

		return table;
	}


	public int softwareManageEquipEdit(SoftwareEquipModel softwareEquipModel) throws Exception {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.setUpdateTable("tsoftinfo");
		run.buildUpdate("softid", softwareEquipModel.getSoftid());
		run.buildUpdate("status", softwareEquipModel.getStatus());
		run.buildUpdate("groupname", softwareEquipModel.getGroupname());
		run.buildUpdate("groupsub", softwareEquipModel.getGroupsub());
		run.buildUpdate("chinesename", softwareEquipModel.getChinesename());
		run.buildUpdate("installdir", softwareEquipModel.getInstalldir());
		run.buildUpdate("port", softwareEquipModel.getPort());
		run.buildUpdate("statustime", new Timestamp(sdf.parse(softwareEquipModel.getStatetime()).getTime()));
		run.cleanUpdate();// 去掉最后一个逗号
		run.appendSql("where 1=1 ");
		run.appendSql("and id =" + softwareEquipModel.getId());
		int result = run.update();
		run.clear();
		return result;
	}


	public int deleteTsoftinfo(SoftwareEquipModel softwareEquipModel) throws Exception {
		
        String sql="delete from tsoftoptions t where t.softid in("+softwareEquipModel.getSoftid()+")";//删除软件配置文件
		
		CommonDBFunc.execUpdateSql(sql);
		
        String sqlInfo="delete from tsoftinfo t where t.id in("+softwareEquipModel.getId()+")";//删除类型
		
		return CommonDBFunc.execUpdateSql(sqlInfo);
	}


	public Page softwareEquipConManageGrid(SoftwareEquipModel softwareEquipModel, String string) throws Exception {
		Page page = new Page();
		page.setCurrentPage(softwareEquipModel.getPage());
		page.setPageSize(softwareEquipModel.getPageSize());	
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.appendSql("select * from TSOFTOPTIONS t where 1=1");
		run.buildWhere("and softid=?", softwareEquipModel.getSoftid());
		page.setOrderBySql("order by t.secname,t.partid");		
		page= run.query(page);
		return page;
	}


	public int softwareEquipConEditView(SoftwareEquipModel softwareEquipModel) throws Exception {
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.setUpdateTable("tsoftoptions");
		//run.buildUpdate("sectype", softwareEquipModel.getSectype());
		run.buildUpdate("keytype", softwareEquipModel.getKeytype());
		run.buildUpdate("warnflag", softwareEquipModel.getWarnflag());
		run.buildUpdate("warntype", softwareEquipModel.getWarntype());
		run.buildUpdate("value", softwareEquipModel.getValue());
		run.buildUpdate("maxvalue", softwareEquipModel.getMaxvalue());
		run.buildUpdate("minvalue", softwareEquipModel.getMinvalue());
		run.buildUpdate("warnlevel", softwareEquipModel.getWarnlevel());
		run.cleanUpdate();// 去掉最后一个逗号
		run.appendSql("where 1=1 ");
		if(softwareEquipModel.getUpdatetype().equals("1")){//修改多个
			//本软件相同类型都进行修改
			if(softwareEquipModel.getUpdatescope().equals("0")){
				run.buildWhere("and softname =?" ,softwareEquipModel.getSoftname());
				run.buildWhere("and keyname =?" ,softwareEquipModel.getKeyname());	
			}else if(softwareEquipModel.getUpdatescope().equals("1")){
				//本大组相同类型进行修改
				run.appendSql("and softid in ( select softid from tsoftinfo t where 1=1  and softname='"+softwareEquipModel.getSoftname()+"' and GROUPNAME ='"+softwareEquipModel.getGroupname()+"')");//("and softid =?" ,softwareEquipModel.getSoftid());
				run.buildWhere("and keyname =?" ,softwareEquipModel.getKeyname());	
			}else if(softwareEquipModel.getUpdatescope().equals("2")){
				//本小组相同类型进行修改
				run.appendSql("and softid in ( select softid from tsoftinfo t where 1=1  and softname='"+softwareEquipModel.getSoftname()+"' and groupsub ='"+softwareEquipModel.getGroupsub()+"')");//("and softid =?" ,softwareEquipModel.getSoftid());
				run.buildWhere("and keyname =?" ,softwareEquipModel.getKeyname());	
			}else if(softwareEquipModel.getUpdatescope().equals("3")){
				//本软件配置修改
				run.buildWhere("and softid =?" ,softwareEquipModel.getSoftid());
				run.buildWhere("and keyname =?" ,softwareEquipModel.getKeyname());
			}				
		}else{
			run.appendSql("and id =" + softwareEquipModel.getId());
		}
		
		int result = run.update();
		run.clear();
		return result;
	}


	public int deleteSoftwareManageCon(String id) throws Exception {
		 String sql="delete from tsoftoptions t where t.id ="+id;//删除软件配置文件
			
		 return CommonDBFunc.execUpdateSql(sql);
	}


	public int updateStatus(String ids, String status) throws Exception {
		SqlRunner run = new SqlRunner(WebUtil.ds);
		run.setUpdateTable("tsoftinfo");
		run.buildUpdate("status",status);
		run.cleanUpdate();// 去掉最后一个逗号
		run.appendSql("where 1=1 ");
		run.appendSql("and id in("+ids+")");
		int result = run.update();
		run.clear();
		return result;
	}
}
