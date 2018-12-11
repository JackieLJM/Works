package com.maystar.jdksuper.dba.controller.countryip;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RequestParam;

import com.maystar.common.util.JSONPrintOpt;
import com.maystar.jdksuper.dba.model.countryip.Countryip;
import com.maystar.jdksuper.dba.service.countryip.CountryipService;
//import com.maystar.jdksuper.dba.util.ParameterUtil;
import com.maystar.mvc.base.BaseController;
import com.maystar.mvc.common.util.LoginUser;
@Controller
@RequestMapping("/dba/countryIp")
public class CountryipController extends BaseController{
	private static Logger logger = Logger.getLogger(CountryipController.class.getName());

	

	@Autowired
	public CountryipService countryipService;
	public CountryipController() {
		logger.info("CountryipController 已加载！");
	}
	@RequestMapping("/getAllCIp")
	public void getAllCountryip(HttpServletRequest request,HttpServletResponse response) throws Exception{
		response.setContentType("application/json");
		JSONObject result =new JSONObject();
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result.put("allcountryip", countryipService.getAllCountryip());
//			System.out.println(result);
//			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("getAllCountryip",e);
			System.out.println(result);
			result.put("success", false);
			result.put("result", e.getMessage());
//			JSONPrintOpt.outException(request, response, e);
		}finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("",e);
			}finally{
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	@RequestMapping(value="/delCIp")
	public void delCountryip(HttpServletRequest request,HttpServletResponse response,@RequestBody Countryip countryip) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		countryipService.delCountryipById(String.valueOf(countryip.getId()));
		try {
			result.put("success", true);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("delCountryip",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	@ResponseBody
	@RequestMapping(value="/addCIp")
	public void addCountryip(HttpServletRequest request,HttpServletResponse response,@RequestBody Countryip countryip) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		String code=String.valueOf(countryip.getCode());
		String country=countryip.getCountry();
		String remark=countryip.getRemark();
		countryipService.addCountryip(countryip, code, country, remark);
		System.out.println(countryip);
		try {
			result.put("success", true);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("addCountryip",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	@RequestMapping(value="/findAddCIpId")
	public void findAddCountry(HttpServletRequest request,HttpServletResponse response,@RequestBody Countryip countryip) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		String code=String.valueOf(countryip.getCode());
		String country=countryip.getCountry();
		String remark=countryip.getRemark();
		result.put("id", countryipService.findAddCountryipId(countryip, code, country, remark));
		try {
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("addCountryipId",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	
	@RequestMapping(value="/updateCIp")
	public void updateCountryip(HttpServletRequest request,HttpServletResponse response,@RequestBody Countryip countryip) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		countryipService.updateCountryipById(countryip,String.valueOf(countryip.getId()));
		try {
			result.put("success", true);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("updateCountryip",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
}