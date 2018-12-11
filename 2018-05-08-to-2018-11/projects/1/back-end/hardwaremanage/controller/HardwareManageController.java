package com.maystar.jdkm.hardwaremanage.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.maystar.common.util.JSONPrintOpt;
import com.maystar.jdkm.equip.vo.ServerInfo;
import com.maystar.jdkm.hardwaremanage.service.HardwareManageService;
import com.maystar.jdkm.hardwaremanage.vo.Tprocessinfo;
import com.maystar.jdkm.log.TLog;
import com.maystar.mvc.common.util.LoginUser;

@Controller
@RequestMapping("/hardwaremanage")
public class HardwareManageController {

	static Logger logger = Logger.getLogger(HardwareManageController.class.getName());

	@Autowired
	private HardwareManageService hardwareManageService;

	/**
	 * 服务器树
	 * @author liqq
	 * @param request
	 * @param response
	 */
	@RequestMapping("/hardwareTree")
	public void hardwareTree(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject result = new JSONObject();
		try {
			result = hardwareManageService.hardwareTree();
			JSONPrintOpt.outJSON(request, response, result.getJSONArray("result"));
		} catch (Exception e) {
			logger.error("hardwareTree", e);
		}
		
	}
	
	/**
	 * 根据服务器ip查询数据
	 * @author liqq
	 * @param request
	 * @param response
	 */
	@RequestMapping("/findHardwareInfo")
	public void findHardwareInfo(HttpServletRequest request, HttpServletResponse response,Tprocessinfo tprocessinfo) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject result = new JSONObject();
		try {
			result = hardwareManageService.findHardwareInfo(tprocessinfo);
			//result.getJSONArray("result"
			JSONPrintOpt.outJSON(request, response, result);
		} catch (Exception e) {
			logger.error("findServerIP", e);
		}
		
	}
	
	/**
	 * 分配  服务器
	 * @author liqq
	 * @param request
	 * @param response
	 */
	@RequestMapping("/thardwareInfoList")
	public void thardwareInfoList(HttpServletRequest request, HttpServletResponse response,ServerInfo serverInfo) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject result = new JSONObject();
		try {
			result = hardwareManageService.thardwareInfoList(serverInfo);
			JSONPrintOpt.outJSON(request, response, result.getJSONArray("result"));
			
		} catch (Exception e) {
			logger.error("thardwareInfoList", e);
		}
		
	}
	
	

	/***
	 * 分配 设备到 服务器 
	 * liqq
	 * @param request
	 * @param response
	 * @param equids
	 * @param serverip
	 */
	@RequestMapping("/assignSave")
	public void assignSave( HttpServletRequest request,
							HttpServletResponse response,
							String equids,
							String serverip) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		LoginUser loginUser=(LoginUser)request.getSession().getAttribute("userInfo");
		JSONObject result = new JSONObject();
		try {
			result = hardwareManageService.assignSave(equids,serverip);
			JSONPrintOpt.outJSON(request, response, result);
			TLog.AddLog(loginUser.getLoginname(), "分配", request.getRemoteHost(),
					"用户[" + loginUser.getLoginname() + "]分配服务器",
					"用户[" + loginUser.getLoginname() + "]分配服务器");
		} catch (Exception e) {
			logger.error("assignSave", e);
			JSONPrintOpt.outException(request, response, e);
		}
		
	}
	
	/***
	 * 删除服务器 相应的设备
	 * @param request
	 * @param response
	 * @param equids
	 * @param serverip
	 */
	@RequestMapping(value = "/delThardware")
	public void delThardware(HttpServletRequest request, HttpServletResponse response, String equids,String serverip) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject result = new JSONObject();
		LoginUser loginUser = (LoginUser) request.getSession().getAttribute("userInfo");
		
		try {
			result = hardwareManageService.delThardware(equids,serverip);
			JSONPrintOpt.outJSON(request, response, result);

			TLog.AddLog(loginUser.getLoginname(), "删除", request.getRemoteHost(),
					"用户[" + loginUser.getLoginname() + "]删除服务器 相应的设备",
					"用户[" + loginUser.getLoginname() + "]删除服务器 相应的设备");
		} catch (Exception e) {
			logger.error("delThardware", e);
			JSONPrintOpt.outException(request, response, e);
		}

	}
	
	
}
