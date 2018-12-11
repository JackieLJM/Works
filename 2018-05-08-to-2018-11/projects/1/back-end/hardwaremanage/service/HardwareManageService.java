package com.maystar.jdkm.hardwaremanage.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maystar.common.dbutils.Page;
import com.maystar.common.util.StringUtil;
import com.maystar.common.util.StringUtils;
import com.maystar.jdkm.equip.vo.ServerInfo;
import com.maystar.jdkm.hardwaremanage.dao.HardwareManageDao;
import com.maystar.jdkm.hardwaremanage.vo.Tprocessinfo;
import com.maystar.jdkm.system.util.ParameterUtil;
import com.maystar.jdkm.system.vo.User;
import com.maystar.mvc.base.BaseService;

@Service
public class HardwareManageService extends BaseService {

	static Logger logger = Logger.getLogger(HardwareManageService.class.getName());
	
	@Autowired
	private  HardwareManageDao hardwareManageDao;

	public JSONObject hardwareTree() {
		JSONObject result = new JSONObject();
		try {
			List<Map<String, Object>> list = hardwareManageDao.hardwareTree();
			for (Map<String, Object> map : list) {
				String serverip = StringUtil.nullToStr(map.get("serverip"));
				String servername = StringUtil.nullToStr(map.get("servername"));
				map.put("text", servername + "(" + serverip + ")");
				map.put("leaf", true);
			}
			result.put("result",list);
			result.put("success", true);
		} catch (Exception e) {
			logger.error("hardwareTree", e);
		}
			
		return result;
	}


	public JSONObject findHardwareInfo(Tprocessinfo tprocessinfo){
         JSONObject result = new JSONObject();
		
		try {
			Page page = hardwareManageDao.findHardwareInfo(tprocessinfo);
			
			List<Map<String, Object>> list = page.getList();
			for(Map<String, Object> map : list){
				String hardtype = StringUtils.nullToStr(map.get("hardtype"));
				String hardtypevalue = ParameterUtil.getNameByCodeNotOrNull("100010", hardtype);
				map.put("hardtype", hardtypevalue);
			}
			result.put("result",list);
			result.put("success",true);
			result.put("totalProperty",page.getItemCount());
		} catch (Exception e) {
			logger.error("findHardwareInfo", e);
		}
		return result;
	}


	public JSONObject thardwareInfoList(ServerInfo serverInfo) {
        JSONObject result = new JSONObject();
		
		try {
			Page page = hardwareManageDao.thardwareInfoList(serverInfo);
			List<Map<String ,Object>> list = page.getList();
			for (Map<String, Object> map : list) {
				String hardtype = StringUtil.nullToStr(map.get("hardtype"));
				String hardtypeVal = ParameterUtil.getNameByCodeNotOrNull("100010", hardtype);
				map.put("hardtype", hardtypeVal);
			}
			result.put("result", list);
			result.put("success", true);
			result.put("totalProperty", page.getItemCount());
		} catch (Exception e) {
			logger.error("thardwareInfoList", e);
		}
		
		return result;
	}


	public JSONObject assignSave(String equids, String serverip) {

		JSONObject result = new JSONObject();
		String[] equid = equids.split(",");
		try {
			int num =  hardwareManageDao.assignSave(serverip,equid);
			result.put("result",num );
			result.put("success", true);
		} catch (Exception e) {
   
			logger.error("assignSave",e);
		}
		return result;
	}


	public JSONObject delThardware(String equids, String serverip) {
		JSONObject result = new JSONObject();
		int num =0;
		try {
			num = hardwareManageDao.delThardware(equids,serverip);
			result.put("result", num);
			result.put("success", true);
		} catch (Exception e) {
			logger.error("delThardware", e);
		}
		
		return result;
	}
	




	
	

	
	
	
	
	
}
