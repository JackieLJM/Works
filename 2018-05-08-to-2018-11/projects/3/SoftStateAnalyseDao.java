package com.maystar.jdkm.warning.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.naming.NamingException;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;

import com.maystar.common.dao.BaseDAO;
import com.maystar.common.dbutils.Page;
import com.maystar.common.dbutils.SqlRunner;
import com.maystar.common.util.DateComFunc;
import com.maystar.common.util.WebUtil;
//import com.maystar.jdkm.system.vo.ServerInfo;
//import com.maystar.jdkm.equip.dao.SoftStateAn;
import com.maystar.jdkm.warning.vo.*;

@Repository
public class SoftStateAnalyseDao extends BaseDAO {
	private final Logger logger = Logger.getLogger(SoftStateAnalyseDao.class);

//	treepanel软件栏
	public Page treeNode(TSoftInfo tSoftInfo, String softtype) throws Exception {
		Page page = new Page();
		SqlRunner run = new SqlRunner(WebUtil.ds);
//		page.setCurrentPage(tSoftInfo.getPage());
//		page.setPageSize(tSoftInfo.getPageSize());
//		System.out.println(softtype);
//		System.out.println(softtype != null);
//		System.out.println(softtype.isEmpty());

		run.appendSql("SELECT * FROM tsoftinfo t");

//		System.out.println(softtype);
		if (softtype != null) {
			String[] softtypeArr = softtype.split(",");
			run.buildWhere("where chinesename=?", softtypeArr[0]);
			run.buildWhere("and softname=?", softtypeArr[1]);
		}
		page = run.query(page);
		run.clear();
		return page;
	}

//	combobox软件类型
	public Page softType(TSoftType tSoftType) throws Exception {
		Page page = new Page();
		SqlRunner run = new SqlRunner(WebUtil.ds);
		page.setCurrentPage(tSoftType.getPage());
		page.setPageSize(tSoftType.getPageSize());
		run.appendSql("SELECT * FROM tsofttype t");
		page = run.query(page);
		run.clear();
		return page;
	}

//	treepanel软件栏获取softid
	public Page softId(TSoftInfo tSoftInfo, Map condition) throws Exception {
//		JSONObject json=new JSONObject();
		Page page = new Page();
		JSONArray json = new JSONArray();
		SqlRunner run = new SqlRunner(WebUtil.ds);
//		page.setCurrentPage(tSoftInfo.getPage());
//		page.setPageSize(tSoftInfo.getPageSize());
//		System.out.println(condition);
		HashMap<String, String> conditionHashMap = (HashMap<String, String>) condition;
//		System.out.println(conditionHashMap);
//		即使没有这个键，使用get的时候还是会获取其值，其值为null
		String conditionStr = conditionHashMap.get("condition");
//		System.out.println(conditionStr);
		String chinesename = "";
		String softname = "";
		if (conditionStr != null) {
			Pattern p = Pattern.compile("([\\S]+)\\(([\\S]+)\\)");
			Matcher m = p.matcher(conditionStr);
			m.find();
//			System.out.println(m.group(1));
//			System.out.println(m.group(2));
			chinesename = m.group(1);
			softname = m.group(2);
		}
		if (conditionHashMap.containsKey("condition")) {
			conditionHashMap.remove("condition");

//		System.out.println(conditionHashMap);
			int length = conditionHashMap.values().toString().length();
			String value = conditionHashMap.values().toString().substring(1, length - 1);
//		System.out.println(condition.containsKey("groupname"));
//		System.out.println(condition.containsKey("groupsub"));
//		System.out.println(condition.containsKey("equid"));

			run.appendSql("SELECT softid FROM tsoftinfo t ");
			if (conditionHashMap.containsKey("groupsub")) {
				String valueParent = conditionHashMap.values().toString().substring(1, length - 1).split(",")[1].trim();
				String valueSub = conditionHashMap.values().toString().substring(1, length - 1).split(",")[0].trim();
//			System.out.println(valueParent);
//			System.out.println(valueSub);
				run.buildWhere(" where t.groupsub=? ", valueSub);
				run.buildWhere(" and t.groupname=? ", valueParent);
			} else if (conditionHashMap.containsKey("groupname")) {
				run.buildWhere(" where t.groupname=?", value);
			} else if (conditionHashMap.containsKey("equid")) {
				run.buildWhere(" where t.equid=?", value);
			}
			run.buildWhere("and t.softname=?", softname);
			run.buildWhere("and t.chinesename=?", chinesename);
		}else {
			int length = conditionHashMap.values().toString().length();
			String value = conditionHashMap.values().toString().substring(1, length - 1);

			run.appendSql("SELECT softid FROM tsoftinfo t ");
			if (conditionHashMap.containsKey("groupsub")) {
				String valueParent = conditionHashMap.values().toString().substring(1, length - 1).split(",")[1].trim();
				String valueSub = conditionHashMap.values().toString().substring(1, length - 1).split(",")[0].trim();
				run.buildWhere(" where t.groupsub=? ", valueSub);
				run.buildWhere(" and t.groupname=? ", valueParent);
			} else if (conditionHashMap.containsKey("groupname")) {
				run.buildWhere(" where t.groupname=?", value);
			} else if (conditionHashMap.containsKey("equid")) {
				run.buildWhere(" where t.equid=?", value);
			}
		}
		page = run.query(page);
		run.clear();
//		

//		Page page = new Page();
//		run.query();
//		System.out.println(run.query());
		return page;
	}

//	combobox统计指标
	public Page measure(TSoftOptions tSoftOptions, String softidStr) throws Exception {
		Page page = new Page();
		SqlRunner run = new SqlRunner(WebUtil.ds);
		String[] softidArr = softidStr.split(",");
//		String a= "a";
//		String[] abc=a.split(",");
//		System.out.println(abc[0]);
		if(softidStr.equals("all")) {
			run.appendSql("SELECT * FROM tsoftoptions t");
			page = run.query(page);
			run.clear();
			return page;
		}
//		System.out.println(a);
//		page.setCurrentPage(tSoftOptions.getPage());
//		page.setPageSize(tSoftOptions.getPageSize());
		run.appendSql("SELECT * FROM tsoftoptions t");
		run.buildWhere("where softid=?", softidArr[0]);
//		run.buildWhere("where softid in (?)", softidStr);
//		run.buildFormQueryWhere("where softid in (?)", softidStr);
		if (softidArr.length > 1) {
			for (int i = 1; i < softidArr.length; i++) {
				run.buildWhere("or softid=?", softidArr[i]);
			}
		}
//		System.out.println(run.concatWhere("", ""));
//		System.out.println(run.query());
		page = run.query(page);
//		List<HashMap<String,String>> list=run.query();
		run.clear();
		return page;
	}

	public List statisticAnalysis(Date starttime,Date endtime,String target,List<String> softid) throws Exception {
//		Page page = new Page();
		SqlRunner run = new SqlRunner(WebUtil.ds);
		Pattern p=Pattern.compile("([\\S]+)\\(([\\S]+)，([\\S]+)\\)");
		Matcher m = p.matcher(target);
		m.find();
		String softname=m.group(1);
		String secname=m.group(2);
		String keyname=m.group(3);
//		System.out.println(softname);
//		System.out.println(secname);
//		System.out.println(keyname);
//		page.setCurrentPage(tSoftState.getPage());
//		page.setPageSize(tSoftState.getPageSize());
		
		
//		starttime.setTime(starttime.getTime()+86400000);
//		System.out.println(starttime);
//		System.out.println(endtime);
		List<List> list=new ArrayList();
		for(int i=0;i<softid.size();i++) {
//			if(i==softid.size()-1){
			run.appendSql("select distinct partid from tsoftstate t" );
			run.buildWhere("where t.softid=?", softid.get(i));
			List<HashMap> partid=(ArrayList) run.query();
//			HashSet<HashMap> bSet =new HashSet(partid);
			run.clear();
			for(int j=0;j<partid.size();j++) {
			run.appendSql("SELECT keyvalue,datatime,id,softname,softid,partid FROM tsoftstate t");
			run.buildWhere("where t.softname=?", softname);
			run.buildWhere("and t.secname=?", secname);
			run.buildWhere("and t.keyname=?", keyname);
			run.buildWhere("and t.datatime>=?", starttime);
			run.buildWhere("and t.datatime<=?", endtime);
			run.buildWhere("and t.softid=? ", softid.get(i));
			run.buildWhere("and t.partid=?", partid.get(j).get("partid"));
			List<HashMap> all=(ArrayList) run.query();
			run.clear();
			
			list.add(all);
			}
//			else {
//				run.buildWhere("t.softid=? or", softid.get(i));
//			}
		}
//		long time= endtime.getTime()-starttime.getTime();
//		long days=time/86400000;
//		for(int i=0;i<=days;i++) {
//			starttime.setTime(starttime.getTime()+86400000);
//		}
		
//		List<Object[]> listBatchParams= new ArrayList<>();
//		String sql="SELECT * FROM (SELECT datatime,keyvalue,rownum from tsoftstate t where t.datatime>=? and t.datatime<=? and t.softname=? and t.secname=? and t.keyname=? and t.softid=?)";
//		
//		int[] batch = run.batch(sql,listBatchParams);
//		System.out.println(run.query().getClass());
//		page = run.query(page);
//		run.clear();
		System.out.println(list);
		return list;
	}
	
//	public List datatime() throws Exception{
//		SqlRunner run = new SqlRunner(WebUtil.ds);
//		run.appendSql("select datatime from tsoftstate t");
//		return run.query();
//	}
}