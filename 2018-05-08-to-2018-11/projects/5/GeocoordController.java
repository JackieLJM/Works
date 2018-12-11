package com.maystar.jdksuper.dba.controller.geocoord;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;


import com.maystar.common.util.JSONPrintOpt;
import com.maystar.jdksuper.dba.model.geocoord.Geocoord;
import com.maystar.jdksuper.dba.service.geocoord.GeocoordService;
import com.maystar.mvc.base.BaseController;
@Controller
@RequestMapping("/dba/Geo")
public class GeocoordController extends BaseController{
	static Logger logger = Logger.getLogger(GeocoordController.class.getName());

	public GeocoordController() {
		logger.info("GeocoordController 已加载！");
	}
	
	@Autowired
	private GeocoordService geocoordService;
	
	@RequestMapping(value="/getAllGeo")
	public void getAllGeocoord(HttpServletRequest request,HttpServletResponse response,Geocoord geocoord) throws Exception{
		response.setContentType("application/json");
		JSONObject result =new JSONObject();
		result.put("allgeocoord", geocoordService.getAllGeocoord()) ;
		try {
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("getAllGeocoord",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	
	@RequestMapping(value="/delGeo")
	public void delGeocoordById(HttpServletRequest request,HttpServletResponse response,@RequestBody Geocoord geocoord) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		geocoordService.delGeocoordById(String.valueOf(geocoord.getId()));
		try {
			result.put("success", true);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("delGeocoord",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	
	@RequestMapping(value="/addGeo")
	public void addGeocoord(HttpServletRequest request,HttpServletResponse response,@RequestBody Geocoord geocoord) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		long id=geocoord.getId();
		String code= geocoord.getCode();
		String country=geocoord.getCountry();
		String province=geocoord.getProvince();
		String city=geocoord.getCity();
		String longitude=geocoord.getLongitude();
		String latitude=geocoord.getLatitude();
		String country_en=geocoord.getCountry_en();
		String citycode=geocoord.getCitycode();
		String ipcode=geocoord.getIpcode();
		String country_code=geocoord.getCountry_code();
		String gpslongitude=geocoord.getGpslongitude();
		String gpslatitude=geocoord.getGpslatitude();
		String continent=geocoord.getContinent();
		String continent_code=geocoord.getContinent_code();
		String continentalias=geocoord.getContinentalias();
		geocoordService.addGeocoord(geocoord,id, code, country, province, city, longitude, latitude, country_en, citycode, ipcode, country_code, gpslongitude, gpslatitude, continent, continent_code, continentalias);
//		System.out.println(geocoord);
//		System.out.println(id);
		try {
			result.put("success", true);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("addGeocoord",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	@RequestMapping(value="/findAddGeoId")
	public void findAddGeocoord(HttpServletRequest request,HttpServletResponse response,@RequestBody Geocoord geocoord) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		String code= geocoord.getCode();
		String country=geocoord.getCountry();
		String province=geocoord.getProvince();
		String city=geocoord.getCity();
		String longitude=geocoord.getLongitude();
		String latitude=geocoord.getLatitude();
		String country_en=geocoord.getCountry_en();
		String citycode=geocoord.getCitycode();
		String ipcode=geocoord.getIpcode();
		String country_code=geocoord.getCountry_code();
		String gpslongitude=geocoord.getGpslongitude();
		String gpslatitude=geocoord.getGpslatitude();
		String continent=geocoord.getContinent();
		String continent_code=geocoord.getContinent_code();
		String continentalias=geocoord.getContinentalias();
		result.put("id", geocoordService.findAddGeocoordId(geocoord, code, country, province, city, longitude, latitude, country_en, citycode, ipcode, 
				country_code, gpslongitude, gpslatitude, continent, continent_code, continentalias));
		try {
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("addGeocoordId",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
	
	@RequestMapping(value="/updateGeo")
	public void updateGeocoord(HttpServletRequest request,HttpServletResponse response,@RequestBody Geocoord geocoord) throws Exception {
		response.setContentType("application/json");
		JSONObject result=new JSONObject();
		geocoordService.updateGeocoordById(geocoord,String.valueOf(geocoord.getId()));
		System.out.println(geocoord.getId());
		try {
			result.put("success", true);
			JSONPrintOpt.outJSON(request,response,result);
		}catch(Exception e){
			logger.error("updateGeocoord",e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
}