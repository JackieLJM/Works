package com.maystar.jdksuper.dba.service.geocoord;
import java.util.Map;
import java.util.List;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maystar.jdksuper.dba.dao.geocoord.GeocoordDao;
import com.maystar.jdksuper.dba.model.geocoord.Geocoord;
import com.maystar.mvc.base.BaseService;
@Service
public class GeocoordService extends BaseService{
	static Logger logger = Logger.getLogger(GeocoordService.class.getName());
	@Autowired
	private GeocoordDao geocoordDao;
	public JSONArray getAllGeocoord() throws Exception{
		List<Map<String,String>> list=geocoordDao.getAllGeocoord();
		for(int i=0;i<list.size();i++) {
			list.get(i).put("key","geo-"+String.valueOf(i));
		}
		JSONArray allCountryip=new JSONArray(list);
		return allCountryip;
	}
	public JSONObject delGeocoordById(String Id) throws Exception {
		JSONObject results = new JSONObject();
		try {
			
			int delCountryip = geocoordDao.delGeocoordById(Id);
			if (delCountryip > 0) {
				results.put("success", true);
				results.put("result", "成功");
			} else {
				results.put("success", false);
				results.put("result", "失败");
			}
		} catch (Exception e) {
			throw e;
		}
		return results;
	}
	public int updateGeocoordById(Geocoord geocoord,String Id) throws Exception {
		return geocoordDao.updateGeocoordById(geocoord,Id);
	}
	public int addGeocoord(Geocoord geocoord, long id, String code,String country,String province,String city,
			String longitude,String latitude,String country_en,String citycode,String ipcode,String country_code,String gpslongitude,
			String gpslatitude,String continent,String continent_code,String continentalias) throws Exception {
		return geocoordDao.addGeocoord(geocoord,id, code, country, province, city, longitude, latitude, country_en, citycode, ipcode, country_code, gpslongitude, gpslatitude, continent, continent_code, continentalias);
	}
	public String findAddGeocoordId(Geocoord geocoord, String code,String country,String province,String city,
			String longitude,String latitude,String country_en,String citycode,String ipcode,String country_code,String gpslongitude,
			String gpslatitude,String continent,String continent_code,String continentalias) throws Exception {
		return geocoordDao.findAddGeocoordId(geocoord, code, country, province, city, longitude, latitude, country_en, citycode, ipcode, country_code, gpslongitude, gpslatitude, continent, continent_code, continentalias);
	}
	
}