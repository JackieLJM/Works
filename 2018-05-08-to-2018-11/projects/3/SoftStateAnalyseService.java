package com.maystar.jdkm.warning.service;


import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.HashSet;
import java.util.Set;
import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
//import javax.swing.plaf.synth.SynthSliderUI;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.google.gson.JsonObject;
//import com.hxtt.sql.da;
import com.maystar.common.dbutils.Page;
import com.maystar.common.util.DateComFunc;
import com.maystar.common.util.StringUtils;
//import com.maystar.jdkm.equip.dao.WarnDao;
//import com.maystar.jdkm.equip.service.WarnService;
import com.maystar.jdkm.system.util.ParameterUtil;
import com.maystar.jdkm.warning.dao.SoftStateAnalyseDao;
import com.maystar.jdkm.warning.vo.*;
import com.maystar.mvc.base.BaseService;
import com.maystar.mvc.common.util.LoginUser;

@Service
public class SoftStateAnalyseService extends BaseService{
	private final Logger logger = Logger.getLogger(WarningService.class);

	@Autowired
	private SoftStateAnalyseDao softStateAnalyseDao;
//	treepanel软件栏
	public JSONObject treeNode(TSoftInfo tSoftInfo,String softtype) throws Exception{
		JSONObject result = new JSONObject();
		Page page = softStateAnalyseDao.treeNode(tSoftInfo,softtype);
		JSONArray array= new JSONArray(page.getList());
//		System.out.println(page.getList());
//		ArrayList list=(ArrayList)page.getList();
//		System.out.println(array.getJSONObject(0));
//		list.forEach();
//		System.out.println(array.getClass());
		 
		int length=array.length();
		
		
		Set<Map<String,Object>> setGroup = new HashSet<Map<String,Object>>();
		Set<Map<String,Object>> setDevice = new HashSet<Map<String,Object>>();
//		遍历第一层，用set存储
		for(int i=0;i<length;i++){
			JSONObject obj= (JSONObject) array.get(i);
			Map<String,Object> objGroup=new HashMap<String,Object>();
			Map<String,Object> objDevice=new HashMap<String,Object>();
//			Map<String,Object> obj22=new HashMap<String,Object>();
//			JSONObject obj2=new JSONObject();
//			obj22.put("text", "子分组："+obj.get("groupsub"));
//			obj22.put("leaf", true);
			
//			objGroup.put("text", "");
//			if(result.get("children")!=obj.get("groupname")) {
//				if(obj.get("groupname")=)
//			先添加分组
			objGroup.put("children", new HashSet<Map<String,Object>>());
			objGroup.put("text", "分组："+obj.get("groupname"));
//			if(objGroup.get("softid")==null) {System.out.println("empty");}
//			objGroup.put("softid", obj.get("softid"));
			objGroup.put("expanded",true);
			objGroup.put("leaf", false);	
			setGroup.add(objGroup);
//			}
//			再添加设备
			objDevice.put("children", new HashSet<Map<String,Object>>());
			objDevice.put("text","设备："+obj.get("equid"));
//			objDevice.put("softid", obj.get("softid"));
			objDevice.put("expanded",true);
			objDevice.put("leaf", false);
			setDevice.add(objDevice);
//			obj.put("children", array.get(i));
//			System.out.println(obj);
//			System.out.println(array.get(i));
		}
//		遍历第二层，用set存储
//		一个子分组只有一个softid
		for(int i=0;i<length;i++){
//			先添加分组
			JSONObject obj= (JSONObject) array.get(i);
//			System.out.println(obj);
			Map<String,Object> objSub=new HashMap<String,Object>();
			
//			JSONObject obj2=new JSONObject();
			objSub.put("text","子分组："+obj.get("groupsub"));
//			objSub.put("softid", obj.get("softid"));
			objSub.put("leaf", true);
//			System.out.println(obj22);
//			for(Object item:set){
//				item.get("groupname");
//			}
//			for(int j=0;j<set.size();j++) {
//				set.;
//			if(obj.get("groupname")==)}
			Iterator<Map<String,Object>> it=setGroup.iterator();
			while(it.hasNext()) {
				Map<String,Object> item = it.next();
//				System.out.println(item);
//				System.out.println(item.get("text"));
//				
//				System.out.println(obj.get("groupname"));
//				System.out.println(item.get("text").equals(obj.get("groupname")));
//				System.out.println(obj22);
//				
//				System.out.println(item.get("text")=="1");
//				System.out.println(obj.get("groupname")=="1");
				if(item.get("text").equals("分组："+obj.get("groupname"))) {
					Set<Map<String,Object>> children =(HashSet<Map<String,Object>>)item.get("children");
					children.add(objSub);
//					System.out.println(children);
					
				}
			
			
			}
			
			
//			再添加设备
//			设备下都是独立的softid
			Map<String,Object> devSub=new HashMap<String,Object>();
			
//			JSONObject obj2=new JSONObject();
			devSub.put("text","软件编号："+obj.get("softid"));
//			objSub.put("softid", obj.get("softid"));
			devSub.put("leaf", true);
			Iterator<Map<String,Object>> itt=setDevice.iterator();
			while(itt.hasNext()) {
				Map<String,Object> item = itt.next();
//				System.out.println(item);
//				System.out.println(item.get("text"));
//				
//				System.out.println(obj.get("groupname"));
//				System.out.println(item.get("text").equals(obj.get("groupname")));
//				System.out.println(obj22);
//				
//				System.out.println(item.get("text")=="1");
//				System.out.println(obj.get("groupname")=="1");
//				System.out.println(item.get("text").equals("设备："+obj.get("equid")));
				if(item.get("text").equals("设备："+obj.get("equid"))) {
					Set<Map<String,Object>> children =(HashSet<Map<String,Object>>)item.get("children");
					children.add(devSub);
//					System.out.println(children);
					
				}
			}
		}
//		System.out.println(setDevice);
//		System.out.println();
		
		JSONObject resultGroup= new JSONObject();
		JSONObject resultDevice=new JSONObject();
		JSONArray arrGroup=new JSONArray(setGroup);
		JSONArray arrDevice=new JSONArray(setDevice);
		
		resultGroup.put("children", arrGroup);
		if(arrGroup.length()==0) {resultGroup.put("text", "分组统计（无此软件类型）");}
		else{resultGroup.put("text", "分组统计");}
		resultGroup.put("expanded",true);
		resultGroup.put("leaf",false);
		
		resultDevice.put("children", arrDevice);
		if(arrDevice.length()==0) {resultDevice.put("text", "单机统计（无此软件类型）");}
		else{resultDevice.put("text", "单机统计");}
		resultDevice.put("expanded",true);
		resultDevice.put("leaf", false);
		
		result.append("children", resultGroup);
		result.append("children", resultDevice);
//		System.out.println(arr);
//		System.out.println(result);
//		result.put("success",true);
//		result.put("totalProperty", page.getItemCount());
//		这个result只包含treeStore所需要的数据
//		System.out.println(result);
		return result;
	}
//	treepanel软件栏获取softid
	public JSONArray softId(TSoftInfo tSoftInfo,Map condition) throws Exception{
		JSONArray result = new JSONArray();
		Page softid=softStateAnalyseDao.softId(tSoftInfo,condition);
		List<HashMap<String,String>> array=softid.getList();
//		System.out.println(array);
		for(Object object:array) {
			result.put(object);
		}
		return result;
	}
	
//	combobox软件类型
	public JSONArray softType(TSoftType tSoftType) throws Exception{
		JSONObject result= new JSONObject();
		Page page=softStateAnalyseDao.softType(tSoftType);
//		JSONArray array= new JSONArray(page.getList());
		List<HashMap<String,String>> array=page.getList();
//		System.out.println(array);
		JSONArray json=new JSONArray();
//		Map<String,String> first= new HashMap<String,String>();
//		first.put("key","0");
//		first.put("value", "所有");
//		json.put(first);
		for (int i = 0; i < array.size(); i++) {
//			System.out.println(array.get(i));
//			System.out.println(array.get(i).get("softname"));
			Map<String,String> item= new HashMap<String,String>();
			item.put("key", String.valueOf(i));
			item.put("value", array.get(i).get("chinesename")+"("+array.get(i).get("softname")+")");
//			item.put("softid", array.get(i).get("softid"));
			json.put(item);
		}
//		System.out.println(json);
		result.put("root", json);
//		result.put("success", true);
//		result.put("totalProperty", page.getItemCount());
//		System.out.println(json);
		return json;
	}
	
//	combobox统计指标
	public JSONArray measure(TSoftOptions tSoftOptions,String softidStr) throws Exception{
//		JSONObject result = new JSONObject();
		JSONArray json=new JSONArray();
		Page page =softStateAnalyseDao.measure(tSoftOptions,softidStr);
		List<HashMap<String,String>> array=page.getList();
		HashSet apple=new HashSet();
		//		System.out.println(array);
		for (int i = 0; i < array.size(); i++) {
//			System.out.println(array.get(i));
//			System.out.println(array.get(i).get("softname"));
			Map<String,String> item= new HashMap<String,String>();
			
			item.put("value",array.get(i).get("secname")+"，"+array.get(i).get("keyname"));
//			item.put("softid", array.get(i).get("softid"));
			apple.add(item);
			
		}
		List<HashMap<String,String>> banana=new ArrayList(apple);
//		Object[] banana=apple.toArray();
//		banana.
//		json.put(apple);
//		JSONArray banana=json.getJSONArray(0);
		for(int i = 0;i<banana.size();i++){
			banana.get(i).put("key", String.valueOf(i));
			json.put(banana.get(i));
		}
//		System.out.println(banana);
//		for(Object object:array) {
//			json.put(object);
//		}
		return json;
	}
	
//	统计按钮
	public JSONArray analyse(Date starttime,Date endtime,String target,List<String> softid) throws Exception{
		JSONArray json =new JSONArray();
		ArrayList<ArrayList> array=(ArrayList<ArrayList>)softStateAnalyseDao.statisticAnalysis(starttime,endtime,target,softid);
		//将keyvalue的值转化为数字形式的值
//		List<HashMap<String,Object>> arr=(ArrayList<HashMap<String,Object>>)softStateAnalyseDao.datatime();
//		System.out.println(array);
////		System.out.println(array.size());
//		Pattern pp =Pattern.compile("([\\S]+)\\s");
////		
//		for(int i=0;i<arr.size();i++) {
//			System.out.println(arr.get(i).get("datatime").toString());
//			Matcher m=pp.matcher(arr.get(i).get("datatime").toString());
//			System.out.println(m.group(0));
//		}
		
		//		System.out.println(array);
//		String a=array.get(0).get("datatime").toString();
//		System.out.println(array);
		
//		Date ac=mate.parse(a);
//		System.out.println(ab);
//		遍历取出list里面的list
		SimpleDateFormat mate=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date=new Date();
//		------------------------------------------两天的显示-----------------------------------------------
		
//		------------------------------------------两天以上的显示---------------------------------------------
		for(int i=0;i<array.size();i++) {
			ArrayList<HashMap<String,Object>> list=(ArrayList)array.get(i);
			ArrayList<HashMap<String,Object>> listlist=new ArrayList();
//			System.out.println(list);
//			按照每一天的日期划分存储为新的list
//			----------------------下面要包装成方法使用---------------------------
			int length= list.size();
			Pattern p=Pattern.compile("([\\S]+)\\s");
			
			
//			从softid list取出一个list，并格式化成唯一天的日期
			HashSet<String> datatimeset=new HashSet<String>();
			for(int j=0;j<length;j++) {
				String datatime=list.get(j).get("datatime").toString();
				Matcher m = p.matcher(datatime);
				m.find();
				m.group(1);
				datatimeset.add(m.group(1));	
			}
			List datatimelist=new ArrayList(datatimeset);
//			System.out.println(datatimeset);
//			String midtime=list.get(0).get("datatime").toString();
//			Matcher a = p.matcher(midtime);
//			a.find();
			
//			将soft id list按照不同的日期分割成不同的list,listPerDay就是包含很多同一天子list的list
			ArrayList<ArrayList<HashMap<String,Object>>> listPerDay=new ArrayList<ArrayList<HashMap<String,Object>>>(datatimelist.size());
//			System.out.println(datatimelist);
			for(int k=0;k<datatimelist.size();k++) {
				
				listPerDay.add(k,new ArrayList<HashMap<String,Object>>());
//				System.out.println(listPerDay);
//				System.out.println(datatimelist.size());
				for(int j=0;j<length;j++) {
				
					String datatime=list.get(j).get("datatime").toString();
	//				System.out.println(datatime);
					
					Matcher m = p.matcher(datatime);
					m.find();
					m.group(1);
					if(datatimelist.get(k).equals(m.group(1))) {
						listPerDay.get(k).add(list.get(j));
					
	//				System.out.println(datatimelist);
	//				listPerDay.add(datatimelist.get(k));
					}
				}
//				
//				if(m.group(1).equals(a.group(1))==false)
//				if(m.group(1).equals()) {
				
//				a.add(list.get(j));
//				System.out.println(list.get(j));
//				list.remove(j);
//				}else {
					
//				}
//				System.out.println(a);
//				System.out.println(j+","+m.group(1));
//				System.out.println(list.get(j));
			}
//			System.out.println(listPerDay);
//			下面的list是每一天的list,如果是同一个softid的list,会造成取一个值
			for(int n=0;n<listPerDay.size();n++) {
//				System.out.println(listPerDay.get(n));
				if(listPerDay.get(n).size()>1) {
//				当每一天的list的数据长度大于1时，使用该函数取出当天所记录的时间的那个最大数
				long maxtime= maxtime(listPerDay.get(n));
//				System.out.println(maxtime);
				date.setTime(maxtime);
//				String maxtimeStr= String.valueOf(maxtime);
				String format=mate.format(date);
				for(int m=0;m<listPerDay.get(n).size();m++) {
//					System.out.println(listPerDay.get(n).get(m).get("datatime").toString());
					if(listPerDay.get(n).get(m).get("datatime").toString().equals(format+".0")) {
//						System.out.println(listPerDay.get(n).get(m));
						listlist.add(listPerDay.get(n).get(m));
					}
					
				}
				}else if(listPerDay.get(n).size()==1) {
					listlist.add(listPerDay.get(n).get(0));
				}
//				System.out.println(format);
			}
//			System.out.println(listlist);
			json.put(listlist);
//			System.out.println(json);
//			Date date= mate.parse(maxtimeStr);
//			return json;
		}
		
		
		return json;
	}
	public List perday(List list) throws Exception{
		return list;
	}
	public long maxtime(ArrayList<HashMap<String,Object>> list) throws Exception{
		
		SimpleDateFormat mate=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		long maxtime;
		long ab=mate.parse(list.get(0).get("datatime").toString()).getTime();
		for(int j=0;j<list.size();j++) {
//			HashMap map=new HashMap();
			long abc=mate.parse(list.get(j+1).get("datatime").toString()).getTime();
			if(ab>abc) {
//				ab=ab;
//				map=list.get(j+1);
//				System.out.println(maxtime);
				if((j+1)==(list.size()-1)) {
					return ab;
				}
			}else if(ab<=abc) {
				ab=abc;
//				map=list.get(j+1);
//				System.out.println(maxtime);
				if((j+1)==(list.size()-1)) {
					return ab;
				}
			}
//			if(Date.from(object.get("datatime"))){};
//			System.out.println(object.get("datatime"));
//			System.out.println(abc.getTime());
//			json.put(object);
				
		}
		
		return ab;
	}
}