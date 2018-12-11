package com.maystar.jdkm.software.service;

import java.io.BufferedReader;
import com.maystar.common.util.WebUtil;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.Socket;
import java.net.UnknownHostException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.maystar.common.dbutils.CommonDBFunc;
import com.maystar.common.dbutils.Page;
import com.maystar.common.dbutils.ResultTable;
import com.maystar.common.dbutils.SqlRunner;
import com.maystar.common.util.StringUtils;
import com.maystar.jdkm.equip.dao.HardwareTypeDao;
import com.maystar.jdkm.equip.vo.HardwareType;
import com.maystar.jdkm.software.dao.SoftwareEquipDao;
import com.maystar.jdkm.software.model.SoftwareEquipModel;
import com.maystar.mvc.base.BaseService;
import com.maystar.mvc.common.util.DBUtil;
import com.maystar.mvc.common.util.LoginUser;

@Service
public class SoftwareEquipService extends BaseService {
	static Logger logger = Logger.getLogger(SoftwareEquipService.class.getName());

	@Autowired
	private SoftwareEquipDao softwareEquipDao;

    /**
     * 获取软件组
     * @param request
     * @param hardwareType
     * @return
     * @throws Exception 
     */
	public JSONObject softwareEquipGridView(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		
		JSONObject result = new JSONObject();
//		LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
		Page page = softwareEquipDao.softwareEquipGridView(softwareEquipModel,"");

		JSONArray array = new JSONArray(page.getList());

		result.put("result", array);
		result.put("success", true);
		result.put("totalProperty", page.getItemCount());
		return result;
	}

	public JSONObject softwareEquipAdd(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
			JSONObject result = new JSONObject();
		    int i = 0;
			StringBuffer tid = new StringBuffer();
			i = softwareEquipDao.softwareEquipAdd(softwareEquipModel);
			if (i > 0) {
				result.put("success", true);
				result.put("id", tid);
				result.put("result", "添加成功！");
			} else {
				result.put("success", false);
				result.put("result", "添加失败！");
			}
		return result;
	}

	public JSONObject upFileSoftwareCon(HttpServletRequest request, MultipartFile uploadFile) {
	    String unicode = StringUtils.nullToStr(request.getParameter("unicode"));
	    String softname = StringUtils.nullToStr(request.getParameter("softname"));
		if("".equals(unicode)){
			unicode="UTF-8";
		}
		InputStream in=null;
      
		JSONObject result = new JSONObject();     
		JSONArray array = new JSONArray();
		try{
			in= uploadFile.getInputStream();
		    BufferedReader br= new BufferedReader(new InputStreamReader(in,unicode));			
			String line = null;
			String secname="";
			Map<String,Set<String>> map=new HashMap<String,Set<String>>();
			Map<String, List<String>> tsoftdefaultMap = softwareEquipDao.tsoftdefaultMap(softname);
			Map<String,Integer> mapSectype=softwareEquipDao.mapSectype(softname);
			while((line = br.readLine()) != null){	
				line=line.trim();
				if(!line.equals("")){
				   if(line.indexOf("=")<0){
					   secname=line;					   
				   }else{
//					   if(tsoftdefaultMap.get(secname)==null||!tsoftdefaultMap.get(secname).contains(line.split("=")[0].trim())){
						   if(map.containsKey(secname)){
							   map.get(secname).add(line.split("=")[0].trim());
							   mapSectype.put(secname, mapSectype.get(secname)+1);
						   }else{
							   Set<String> set=new HashSet<String>();
							   set.add(line.split("=")[0].trim());
							   map.put(secname, set);
							   mapSectype.put(secname, 0);
						   }
//					   }else{
//						   mapSectype.put(secname, mapSectype.get(secname)+1); 
//					   }
				   }
				}
			}
			for (String secnames : map.keySet()) {
				JSONObject obj = new JSONObject();
				obj.put("secname", secnames);
				Set<String> set = map.get(secnames);
				JSONArray leafJArray = new JSONArray();
				for (String keyname : set) {
					JSONObject leafJObj = new JSONObject();
					leafJObj.put("text", keyname);
					leafJObj.put("secname", secnames);
					leafJObj.put("sectype", mapSectype.get(secnames));
					leafJObj.put("leaf", true);
					leafJObj.put("checked", false);
					leafJArray.put(leafJObj);
				}
				obj.put("text", secnames);
				obj.put("checked", false);
				obj.put("children", leafJArray);
				if (leafJArray.length() > 0) {
					obj.put("leaf", false);
				} else {
					obj.put("leaf", true);
				}
				array.put(obj);				
			} 
			result.put("result", array);
			result.put("success", true);
	}catch(Exception e){
		logger.error("",e);
		result.put("msg", e);
		result.put("success", false);
	}finally{
		try {
			if (in != null) {
				in.close();
				in = null;
			}
		} catch (IOException e1) {
			logger.error("importSpecialClue",e1);
			result.put("success", false);
			result.put("msg", e1);
		}
	}
	return result;
}
    /**
     * 保存软件状态表
     * @param request
     * @param softwareEquipModel
     * @return
     * @throws Exception 
     * @throws SQLException 
     */
	public JSONObject saveTsoftdefault(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws SQLException, Exception {
		JSONObject result = new JSONObject();
		String tsoftdefault = softwareEquipModel.getTsoftdefault();
		String softname = softwareEquipModel.getSoftname();		
		String[] tsoftdefaults = tsoftdefault.split(",");
		ArrayList<String> listCount=new ArrayList<>();
//		Map<String,Integer> mapSectype=new HashMap<>();
		Map<String, List<String>> tsoftdefaultMap = softwareEquipDao.tsoftdefaultMap(softname);
		Map<String,Integer> mapSectype=softwareEquipDao.mapSectype(softname);
		for (int i = 0; i < tsoftdefaults.length; i++) {
			String secname=tsoftdefaults[i].split("@_@")[0];
			secname=secname.substring(1, secname.length()-1);
			String keyname=tsoftdefaults[i].split("@_@")[1];
			Integer sectype=Integer.parseInt(tsoftdefaults[i].split("@_@")[2]);			
			if(sectype>0){
				sectype=1;
			}
			 if(tsoftdefaultMap.get(secname)==null||!tsoftdefaultMap.get(secname).contains(keyname)){
				mapSectype.put(secname, sectype);
				long tarTId = DBUtil
							.getSeqID(WebUtil.ds, "SEQ_TSOFTDEFAULT");			
				String sql="insert into tsoftdefault(id,pos,softname,secname,sectype,keyname) "
					                  +"values("+tarTId+",'"+tarTId+"','"+softname+"','"+secname+"','"+sectype+"','"+keyname+"')";
				 listCount.add(sql);
			 }else{
				 mapSectype.put(secname, mapSectype.get(secname)+1); 
			 }
		}
		for (String secname : mapSectype.keySet()) {
			Integer sectype = mapSectype.get(secname);
			if(sectype>0){
				sectype=1;
			}
			String sql="update tsoftdefault  t set sectype="+sectype+" where t.secname='"+secname+"'";
            listCount.add(sql);
		}
		try{
	       CommonDBFunc.exeUpdateList(listCount);
	       result.put("success", true);
		}catch(Exception e){
			logger.error("",e);
			result.put("msg", e);
			result.put("success", false);
		}
		return result;
	}

	public JSONObject softwareConGridView(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		JSONObject result = new JSONObject();
		Page page = softwareEquipDao.softwareConGridView(softwareEquipModel,"");
		JSONArray array = new JSONArray(page.getList());

		result.put("result", array);
		result.put("success", true);
		result.put("totalProperty", page.getItemCount());
		return result;
	}
    
	public JSONObject deleteSoftwareCon(HttpServletRequest request, String id) throws Exception {
		JSONObject result = new JSONObject();
		int count=softwareEquipDao.deleteSoftwareCon(id);
        if(count>0){
		   result.put("success", true);
        }else{
           result.put("success", false);
        }
		return result;
	}

	public JSONObject editTsoftdefault(HttpServletRequest request, String strs) {

		JSONObject result = new JSONObject();
		int i = 0;
		try {
			i = softwareEquipDao.editTsoftdefault(strs);
			if (i > 0) {
				result.put("success", true);
				result.put("result", "修改列成功！");
			} else {
				result.put("success", false);
				result.put("result", "修改列失败！");
			}
		} catch (Exception e) {
			logger.error("修改列值出错", e);
		}
		return result;
	}

	public JSONObject softwareEquipEdit(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		JSONObject result = new JSONObject();
	    int i = 0;
		StringBuffer tid = new StringBuffer();
		i = softwareEquipDao.softwareEquipEdit(softwareEquipModel);
		if (i > 0) {
			result.put("success", true);
			result.put("id", tid);
			result.put("result", "添加成功！");
		} else {
			result.put("success", false);
			result.put("result", "添加失败！");
		}
		return result;
	}

	public JSONObject deleteTsofttype(HttpServletRequest request, String softnames) throws Exception {
		JSONObject result = new JSONObject();
		int count=softwareEquipDao.deleteTsofttype(softnames);
        if(count>0){
		   result.put("success", true);
        }else{
           result.put("success", false);
        }
		return result;
	}

	public JSONObject getComboBoxIpaddress(HttpServletRequest request) throws Exception {
		String sql="select * from thardwareinfo t";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		JSONObject result = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < rt.getListNum(); i++) {
			String equid= rt.getTableValue(i,"equid");
			String ipaddress=rt.getTableValue(i,"ipaddress");
			JSONObject obj = new JSONObject();
			obj.put("equid", equid);
			obj.put("ipaddress", ipaddress);
			jsonArray.put(obj);
		}
		result.put("success", true);
		result.put("result", jsonArray);
		return result;
	}
	public Map<String,String> getMapIpaddress(HttpServletRequest request) throws Exception {
		String sql="select * from thardwareinfo t";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		Map<String,String> map=new HashMap<>();
		for (int i = 0; i < rt.getListNum(); i++) {
			String equid= rt.getTableValue(i,"equid");
			String ipaddress=rt.getTableValue(i,"ipaddress");
			JSONObject obj = new JSONObject();
			map.put(ipaddress, equid);
		}
		return map;
	}
	public JSONObject getComboBoxSoftname(HttpServletRequest request) throws Exception {
		String sql="select * from tsofttype t";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		JSONObject result = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < rt.getListNum(); i++) {
			String softname= rt.getTableValue(i,"softname");
			String id=rt.getTableValue(i,"id");
			JSONObject obj = new JSONObject();
			obj.put("softname", softname);
			obj.put("id", softname);
			jsonArray.put(obj);
		}
		result.put("success", true);
		result.put("result", jsonArray);
		return result;
	}
	public JSONObject SoftwareManageEquipAdd(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		Integer ipnumer = Integer.parseInt(softwareEquipModel.getIpnumer());		
		String ipaddresss = softwareEquipModel.getIpaddress();
		Map<String, String> mapIpaddress = getMapIpaddress(request);
		String ip=ipaddresss.substring(0, ipaddresss.lastIndexOf(".")+1);
		Integer endIp=Integer.parseInt(ipaddresss.substring(ipaddresss.lastIndexOf(".")+1,ipaddresss.length()));
		String softname = softwareEquipModel.getSoftname();
		Integer softid =  Integer.parseInt(softwareEquipModel.getSoftid());
		ArrayList<String> list=new ArrayList<>();
		JSONObject result = new JSONObject();
		int count=0;
		for (int i = 0; i < ipnumer; i++) {
			if(mapIpaddress.containsKey(ip+(endIp+i))){
				String equid=mapIpaddress.get(ip+(endIp+i));
				long tarTId = DBUtil
						.getSeqID(WebUtil.ds, "SEQ_TSOFTTYPE");
				
				String insertTso="insert into tsoftinfo(id,equid,softid,groupname,groupsub,softname,chinesename,installdir,port,status)"
									+"select "+tarTId+","+equid+",'"+(softid+count)+"','"+softwareEquipModel.getGroupname()+"','"+softwareEquipModel.getGroupsub()+"',softname,chinesename,installdir,port ,"
									+ "0 from tsofttype where softname='"+softname+"'";
				list.add(insertTso);
				//复制软件默认配置
				String insertSql="insert into tsoftoptions(id,softid,pos,softname,secname,sectype,keyname,keytype,warnflag,warntype,value,maxvalue,minvalue,warnlevel,partid,paramtype) "
						          + "select  (SEQ_TSOFTOPTIONS.nextval) id,'"+(softid+count)+"',pos,softname,secname,sectype,keyname,keytype,warnflag,warntype,value,maxvalue,minvalue,warnlevel,1,paramtype from tsoftdefault where softname='"+softname+"'";
				list.add(insertSql);
				count++;
			}
		}
		try{
	       CommonDBFunc.exeUpdateList(list);
	       result.put("success", true);
		}catch(Exception e){
			logger.error("",e);
			result.put("msg", e);
			result.put("success", false);
		}
		return result;
	}

	public JSONObject softwareManageEquipGridView(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {		
		JSONObject result = new JSONObject();
//		LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
		Page page = softwareEquipDao.softwareManageEquipGridView(softwareEquipModel,"");

		JSONArray array = new JSONArray(page.getList());

		result.put("result", array);
		result.put("success", true);
		result.put("totalProperty", page.getItemCount());
		return result;
	}

	public JSONObject softwareManageEquipTreeView(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {

		JSONObject result = new JSONObject();
		ResultTable rt =softwareEquipDao.softwareManageEquipTreeView(softwareEquipModel,"");
//		Map<String,Map<String,Map<String,Map<String,List<String>>>>> map=new HashMap<>();
		Map<String, Map<String, Map<String, List<String>>>> mapSoftname = new HashMap<>();
		for (int i = 0; i < rt.getListNum(); i++) {
//			JSONObject obj = new JSONObject();
			String softname= rt.getTableValue(i,"softname");
			String ipaddress= rt.getTableValue(i,"ipaddress");
//			String statetime= rt.getTableValue(i,"statetime");
//			String status= rt.getTableValue(i,"status");
//			String port= rt.getTableValue(i,"port");
//			String installdir= rt.getTableValue(i,"installdir");
//			String chinesename= rt.getTableValue(i,"chinesename");
			String groupsub= rt.getTableValue(i,"groupsub");
			String groupname= rt.getTableValue(i,"groupname");
//			String softid= rt.getTableValue(i,"softid");
//			String equid= rt.getTableValue(i,"equid");
			String id= rt.getTableValue(i,"id");
//			obj.put("id", id);
//			obj.put("equid", equid);
//			obj.put("softid", softid);
//			obj.put("chinesename", chinesename);
//			obj.put("port", port);
//			obj.put("status", status);
//			obj.put("statetime", statetime);
//			obj.put("installdir", installdir);
//			if(map.containsKey(ipaddress)){
//				Map<String, Map<String, Map<String, List<String>>>> mapSoftname = map.get(ipaddress);
				if(mapSoftname.containsKey(softname)){
					Map<String, Map<String, List<String>>> map1 = mapSoftname.get(softname);
					if(map1.containsKey(groupname)){
						Map<String, List<String>> map2 = map1.get(groupname);
						if(map2.containsKey(groupsub)){
							List<String> list = map2.get(groupsub);
							list.add(id);
						}else{
							List<String> list =new ArrayList<>();
							list.add(id);
							map2.put(groupsub, list);
						}
					}else{
						Map<String, List<String>> map2 = new HashMap<>();
						List<String> list =new ArrayList<>();
						list.add(id);
						map2.put(groupsub, list);
						map1.put(groupname, map2);
						
					}
				}else{
					Map<String, Map<String, List<String>>> map1 = new HashMap<>();
					Map<String, List<String>> map2 = new HashMap<>();
					List<String> list =new ArrayList<>();
					list.add(id);
					map2.put(groupsub, list);
					map1.put(groupname, map2);
					mapSoftname.put(softname, map1);
				}
//			}else{
//				Map<String, Map<String, Map<String, List<String>>>> mapSoftname = new HashMap<>();
//				Map<String, Map<String, List<String>>> map1 = new HashMap<>();
//				Map<String, List<String>> map2 = new HashMap<>();
//				List<String> list =new ArrayList<>();
//				list.add(id);
//				map2.put(groupsub, list);
//				map1.put(groupname, map2);
//				mapSoftname.put(softname, map1);
//				map.put(ipaddress, mapSoftname);
//			}

		}
//		JSONArray array = new JSONArray();		
//		for (String  ipaddress : map.keySet()) {
//			JSONObject obj = new JSONObject();
//			StringBuffer sb=new StringBuffer();
//			Map<String, Map<String, Map<String, List<String>>>> mapSoftname = map.get(ipaddress);
			JSONArray arraySoftname = new JSONArray();
			for (String  softname : mapSoftname.keySet()) {
				JSONObject objSoftname = new JSONObject();
				StringBuffer sbSoftname=new StringBuffer();
				Map<String, Map<String, List<String>>> map1 = mapSoftname.get(softname);	
				JSONArray array1 = new JSONArray();
				for (String  groupname : map1.keySet()) {
					JSONObject obj1 = new JSONObject();
					StringBuffer sb1=new StringBuffer();
					Map<String, List<String>> map2 = map1.get(groupname);
					JSONArray array2 = new JSONArray();					
					for (String  groupsub : map2.keySet()) {
						JSONObject obj2 = new JSONObject();
						List<String> list = map2.get(groupsub);
						StringBuffer sb2=new StringBuffer();
                        for (String id : list) {
                        	sb2.append(id+",");
						}
						obj2.put("text", groupsub);
						obj2.put("leaf", true);
						obj2.put("ids", sb2.toString());
//						obj2.put("path", ipaddress+"@_@"+softname+"@_@"+groupname);
						array2.put(obj2);
						sb1.append(sb2.toString());
					}
					if(array2.length()>0){
						obj1.put("leaf", false);
					}else{
						obj1.put("leaf", true);
					}
					obj1.put("text", groupname);
					obj1.put("ids", sb1.toString());
					sbSoftname.append(sb1.toString());
//					obj1.put("path", ipaddress+"@_@"+softname);
					obj1.put("children", array2);
					array1.put(obj1);
				}
				if(array1.length()>0){
					objSoftname.put("leaf", false);
					objSoftname.put("children", array1);
				}else{
					objSoftname.put("leaf", true);
				}				
				objSoftname.put("ids", sbSoftname.toString());
				objSoftname.put("text", softname);
//				objSoftname.put("path", ipaddress);
//				sb.append(sbSoftname.toString());
				arraySoftname.put(objSoftname);
			}
//			obj.put("text", ipaddress);
//			if(arraySoftname.length()>0){
//				obj.put("leaf", false);
//				obj.put("children", arraySoftname);
//			}else{
//				obj.put("leaf", true);
//			}
//			obj.put("ids", sb.toString());
//			array.put(obj);
//		}		
		result.put("children", arraySoftname);
		result.put("leaf", false);
		System.out.println(result);
//		System.out.println(result.getJSONArray("children").getJSONObject(0).getJSONArray("children").getJSONObject(0).getJSONArray("children").getJSONObject(0));
		return result;
	
	}

	public JSONObject softwareManageEquipEdit(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		JSONObject result = new JSONObject();
	    int i = 0;
		StringBuffer tid = new StringBuffer();
		i = softwareEquipDao.softwareManageEquipEdit(softwareEquipModel);
		if (i > 0) {
			result.put("success", true);
			result.put("id", tid);
			result.put("result", "编辑成功！");
		} else {
			result.put("success", false);
			result.put("result", "编辑失败！");
		}
		return result;
	}

	public JSONObject deleteTsoftinfo(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		JSONObject result = new JSONObject();
		int count=softwareEquipDao.deleteTsoftinfo(softwareEquipModel);
        if(count>0){
		   result.put("success", true);
        }else{
           result.put("success", false);
        }
		return result;
	}

	public JSONObject softwareEquipConManageGrid(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		
		JSONObject result = new JSONObject();
		Page page = softwareEquipDao.softwareEquipConManageGrid(softwareEquipModel,"");
		List<Map> list  = page.getList();
		for (Map map : list) {
			Object partid = map.get("partid");
			Object secname = map.get("secname");
			map.put("secnamePartid", secname+"_"+partid);
		}
		JSONArray array = new JSONArray(page.getList());

		result.put("result", array);
		result.put("success", true);
		result.put("totalProperty", page.getItemCount());
		return result;
	}
    /**
     * 增加软件配置
     * @param request
     * @param softwareEquipModel
     * @return
     * @throws Exception 
     */
	public JSONObject softwareSaveTsoftios(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) throws Exception {
		JSONObject result = new JSONObject();
		String szSql = "insert into tsoftoptions(id,secname,softname,sectype,keyname,keytype,warnflag,warntype,value,maxvalue,minvalue,warnlevel,partid,pos,softid,paramtype)  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		String sqlQuery="select max(partid) partid,max(pos) pos from TSOFTOPTIONS t where t.softid = ? and t.secname =?";
		ArrayList<String> list=new ArrayList<>();
		list.add(softwareEquipModel.getSoftid());
		list.add(softwareEquipModel.getSecname());
		ResultTable rtMax = CommonDBFunc.queryOperate(sqlQuery,list);
		Integer partid=Integer.parseInt(rtMax.getTableValue(0, "partid"));
		Integer pos=Integer.parseInt(rtMax.getTableValue(0, "pos"));
		String sql="select sectype,keyname,keytype,warnflag,warntype,value,maxvalue,minvalue,warnlevel,paramtype from TSOFTOPTIONS t where t.softid = ? and t.secname =? and partid=?";
		list.add(softwareEquipModel.getPartid());
		Integer keynamenum = softwareEquipModel.getKeynamenum();
        List listInsert=new ArrayList<>();
		ResultTable rt = CommonDBFunc.queryOperate(sql,list);
		for (int i = 0; i < rt.getListNum(); i++) {
			String sectype=rt.getTableValue(i, "sectype");
			String keyname=rt.getTableValue(i, "keyname");
			String keytype=rt.getTableValue(i, "keytype");
			String warnflag=rt.getTableValue(i, "warnflag");
			String warntype=rt.getTableValue(i, "warntype");
			String value=rt.getTableValue(i, "value");
			String maxvalue=rt.getTableValue(i, "maxvalue");
			String minvalue=rt.getTableValue(i, "minvalue");
			String warnlevel=rt.getTableValue(i, "warnlevel");
			String paramtype=rt.getTableValue(i, "paramtype");
		    for (int j = 1; j <= keynamenum; j++) {
		    	Object[] params = new Object[16];
				params[0] = DBUtil.getSeqID(WebUtil.ds, "SEQ_TSOFTOPTIONS");
				params[1] = softwareEquipModel.getSecname();
				params[2] = softwareEquipModel.getSoftname();
				params[3] = sectype;
				params[4] = keyname;
				params[5] = keytype;
				params[6] = warnflag;
				params[7] = warntype;
				params[8] = value;
				params[9] = maxvalue;
				params[10] = minvalue;
				params[11] = warnlevel;
				params[12] = (partid+j);
				params[13] = (pos+j);
				params[14] = softwareEquipModel.getSoftid();
				params[15] = paramtype;
				listInsert.add(params);
			}
		}
        try{
        	if(listInsert.size()>0){
	        	SqlRunner runner = new SqlRunner(WebUtil.ds);        	
	        	runner.batch(szSql, listInsert);
				runner.clear();
        	}
 	       result.put("success", true);
 		}catch(Exception e){
 			logger.error("",e);
 			result.put("msg", e);
 			result.put("success", false);
 		}
 		return result;
	}

	public JSONObject deleteSoftwareManageCon(HttpServletRequest request, String id) throws Exception {
		JSONObject result = new JSONObject();
		int count=softwareEquipDao.deleteSoftwareManageCon(id);
        if(count>0){
		   result.put("success", true);
        }else{
           result.put("success", false);
        }
		return result;
	}
	public JSONObject softwareEquipConEditView(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		int i = 0;
		try {
			i = softwareEquipDao.softwareEquipConEditView(softwareEquipModel);
			if (i > 0) {
				result.put("success", true);
				result.put("result", "修改列成功！");
			} else {
				result.put("success", false);
				result.put("result", "修改列失败！");
			}
		} catch (Exception e) {
			logger.error("修改列值出错", e);
		}
		return result;
	}

	public JSONObject softwareStatus(HttpServletRequest request, SoftwareEquipModel softwareEquipModel) {
		Socket socket = null;
		InputStream in = null;
		byte[] b = new byte[1024];
		String searchField = StringUtils.changNull(request.getParameter("searchField"));
		
		String ipaddress = softwareEquipModel.getIpaddress();
		Integer port = Integer.parseInt(softwareEquipModel.getPort());
		JSONObject object = new JSONObject();
		JSONArray array = new JSONArray();
		try {
			socket = new Socket(ipaddress,port);		
			in = socket.getInputStream();
			String secname="";
			while (true) {
				JSONObject obj = new JSONObject();
				if (read_stream(4, in, b) == -1)
					break;
				// str_len 长度
				int str_len = toInt(b);
				if (str_len == -1 || str_len > 1024)
					break;
	
				if (read_stream(str_len, in, b) == -1)
					break;
	
				String str = new String(b, 0, str_len);
				if (null != str && str.trim().length() >1) {
					String[] statuss = str.split("=");
					if(statuss.length>1){
						String status=str.split("=")[0];
						obj.put("status", status);
						if(!searchField.equals("")){							
							obj.put("status", status.replaceAll(searchField, "<span style='background-color:yellow'>" + searchField + "</span>"));
						}						
						obj.put("statusValue", str.split("=")[1]);
						obj.put("secname", secname);
						array.put(obj);
					}else{
						secname=str.split("=")[0];
					}											
				}
			}
		} catch (Exception e) {
			logger.error("链接rui异常", e);
		}finally{
			if(in!=null){
				try {
					in.close();
					socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		object.put("success", true);
		object.put("result", array);
		System.out.println(object);
		return object;
	}
	public  int read_stream(int len, InputStream in, byte[] b)throws IOException {
		int k = 0;
		int read_len = 0;
		while (read_len < len) {
			k = in.read(b, read_len, len - read_len);
			if (k == -1)
				return -1;
		
			read_len += k;
		
		}
		return 0;
	}
	public  int toInt(byte[] buf) {
		int result = 0;
		byte temp;
		for (int i = 0; i < 4; i++) {
			temp = buf[i];
			result += (temp & 0xFF) << (8 * (3 - i));
		}
		return result;
	}

	public JSONObject getComboBoxGroupname(HttpServletRequest request,String grouptype) throws Exception {
		String sql="select * from tsoftinfo t";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		JSONObject result = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < rt.getListNum(); i++) {
			String groupname= rt.getTableValue(i,grouptype);
			JSONObject obj = new JSONObject();
			obj.put(grouptype, groupname);
			jsonArray.put(obj);
		}
		result.put("success", true);
		result.put("result", jsonArray);
		return result;
	}

	public JSONObject updateStatus(HttpServletRequest request, String ids, String status) {
		JSONObject result = new JSONObject();
		int i = 0;
		try {
			i = softwareEquipDao.updateStatus(ids,status);
			if (i > 0) {
				result.put("success", true);
				result.put("result", "修改列成功！");
			} else {
				result.put("success", false);
				result.put("result", "修改列失败！");
			}
		} catch (Exception e) {
			logger.error("修改列值出错", e);
		}
		return result;
	}

	public JSONObject typeCombobox(HttpServletRequest request) throws Exception {

		String sql="select * from DBA_PARAMETERTYPE t";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		JSONObject result = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		for (int i = 0; i < rt.getListNum(); i++) {
			String type= rt.getTableValue(i,"type");
			String name=rt.getTableValue(i,"name");
			JSONObject obj = new JSONObject();
			obj.put("name", name);
			obj.put("type", type);
			jsonArray.put(obj);
		}
		result.put("success", true);
		result.put("result", jsonArray);
		return result;
	
	}

	public JSONObject getParameterNameByCodeAndNum(String code) throws Exception {
		String sql="select * from DBA_PARAMETERTYPE t where t.type='"+code+"'";
		ResultTable rt = CommonDBFunc.queryOperate(sql);
		JSONObject result = new JSONObject();
		for (int i = 0; i < rt.getListNum(); i++) {
			String type= rt.getTableValue(i,"type");
			String name=rt.getTableValue(i,"name");
			result.put("name", name);
			result.put("type", type);
		}
		result.put("success", true);
		return result;
	}

}
