package com.maystar.jdkm.warning.controller;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.restlet.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

//import com.maystar.common.util.DateComFunc;
import com.maystar.common.dbutils.Page;
import com.maystar.common.util.JSONPrintOpt;
import com.maystar.jdkm.log.TLog;
import com.maystar.jdkm.warning.service.SoftStateAnalyseService;
import com.maystar.jdkm.warning.vo.*;
import com.maystar.jdkm.warning.dao.SoftStateAnalyseDao;
import com.maystar.mvc.common.util.LoginUser;

@Controller
@RequestMapping("softstateanalyse")
public class SoftStateAnalyseController{
	static Logger logger = Logger.getLogger(SoftStateAnalyseController.class.getName());
	
	@Autowired
	private SoftStateAnalyseService softStateAnalyseService;
//	private SoftStateAnalyseDao softStateAnalyseDao;
	//	treepanel软件栏
	//	从tsoftinfo表里获取统计条件信息
	@RequestMapping(value="/treenode")
	public void treeNode(HttpServletRequest request,HttpServletResponse response,TSoftInfo tSoftInfo
//			,@RequestBody Map softtype 
//			,@RequestParam String softtype
			) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONObject result =new JSONObject();
		String softtype=request.getParameter("softtype");
//		System.out.println(softtype);
//		System.out.println(tSoftInfo);
//		String softtypee="";
		try {
			result = softStateAnalyseService.treeNode(tSoftInfo, softtype);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("treeNode",e);
			JSONPrintOpt.outException(request, response, e);
		}
		
	}
//	combobox软件类型
	//调用tsofttype表，传参数给ui的软件类型一栏，客户端选择选项时给软件栏设定约束条件，以显示更少或更多行信息，多个id时图表显示多条线
	@ResponseBody
	@RequestMapping(value="/soft")
	public void softType(HttpServletRequest request,HttpServletResponse response,TSoftType tSoftType) {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
//		JSONObject result=new JSONObject();
		JSONArray result=new JSONArray();
		try {
			result=softStateAnalyseService.softType(tSoftType);
//			System.out.println(result);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e) {
			logger.error("softtype",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	//根据客户端传来的统计条件分组信息设备信息，获取tsoftinfo里的softid值
//	treepanel软件栏获取softid
	@ResponseBody
	@RequestMapping(value="/softid")
	public void softid(HttpServletRequest request,HttpServletResponse response,TSoftInfo tSoftInfo,@RequestBody Map condition) throws Exception {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
//		JSONObject result=new JSONObject();
		JSONArray result=new JSONArray();
//		System.out.println(condition);
		try {
			result=softStateAnalyseService.softId(tSoftInfo,condition);
//			System.out.println(result);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e) {
			logger.error("softinfo",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	
//	combobox统计指标
	//根据info表里的equid,groupname,subgroup来获取options表里的数据，多个id时，支持多选	 	
	@ResponseBody
	@RequestMapping(value="/measure")
	public void softType(@RequestParam String softidStr,HttpServletRequest request,HttpServletResponse response,TSoftOptions tSoftOptions) throws Exception {
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
//		response.addHeader("2312", "123123");
//		JSONObject result=new JSONObject();
//		第一种获取请求参数的方式
//		Object a=request.getParameter("text");
//		System.out.println(a);
//		第二种获取请求参数的方式
//		System.out.println(text);
//		Pattern p= Pattern.compile("([\\S]+：)([\\S]+)");
//		Matcher m = p.matcher();
//		m.find();
//		System.out.println(m.group(1));
//		System.out.println(m.group(2));
//		String condition=m.group(1);
//		String answer=m.group(2);
//		if(condition.equals("分组：")){
//			System.out.println("condition1");
//			Page softid=softStateAnalyseDao.measureParameter(answer);
//			System.out.println("condition2");
//			System.out.println(softid);
//		}
//		else if(condition.equals("子分组：")){
//			Page softid=softStateAnalyseDao.measureParameter(answer);
//			System.out.println(softid);
//		}
//		else if(condition.equals("设备：")) {
//			 Page softid=softStateAnalyseDao.measureParameter(answer);
//			 System.out.println(softid);
//		}
		
//		System.out.println(m.group(2));
//		System.out.println(m.groupCount());
//		String condition = Pattern.matches("",text);
		JSONArray result=new JSONArray();
//		System.out.println(softidStr.split(",").getClass());
//		System.out.println(softidStr);
		try {
			
			result=softStateAnalyseService.measure(tSoftOptions,softidStr);
//			System.out.println(result);
//			System.out.println(tSoftInfo);
//			System.out.println(tSoftOptions);
//			System.out.println(result.get(0).getClass());
//			for(int i=0;i<result.length();i++) {
//				 result.get(i);
//				for(int j=0;j<result.length();j++) {
//					
//				}
//			}
			
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e) {
			logger.error("softtype",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	
//	@ResponseBody
//	@RequestMethod()
//	这里返回给客户端的是指定类型每一天最后被记录的数据
	@RequestMapping(value="/analyse")
	public void Analyse (HttpServletRequest request,HttpServletResponse response,
			@DateTimeFormat(pattern="yyyy-MM-dd")
	@RequestParam(value="starttime",required = false)Date starttime,
			@DateTimeFormat(pattern="yyyy-MM-dd")
	@RequestParam(value="endtime",required =false)Date endtime,
	@RequestParam(value="target",required=false)String target,
	@RequestParam(value="softid",required=false)List<String> softid
//	,@RequestBody Map jsonData
	) {
//		System.out.println(starttime);
//		System.out.println(endtime);
//		System.out.println(target);
//		System.out.println(softid);
		response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
		JSONArray result = new JSONArray();
		try {
			result=softStateAnalyseService.analyse(starttime,endtime,target,softid);
			System.out.println(result);
			JSONPrintOpt.outJSON(request, response, result);
			System.out.println(result);
		}catch(Exception e) {
			logger.error("softstate",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
}