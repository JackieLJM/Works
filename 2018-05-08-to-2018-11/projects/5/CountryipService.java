package com.maystar.jdksuper.dba.service.countryip;
import java.util.Map;
import java.util.List;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maystar.jdksuper.dba.dao.countryip.CountryipDao;
import com.maystar.jdksuper.dba.model.countryip.Countryip;
import com.maystar.mvc.base.BaseService;
@Service
public class CountryipService extends BaseService{
	static Logger logger = Logger.getLogger(CountryipService.class.getName());
	@Autowired
	private CountryipDao countryipDao;
	public JSONArray getAllCountryip() throws Exception{
		List<Map<String,String>> list=countryipDao.getAllCountryip();
		for(int i=0;i<list.size();i++) {
			list.get(i).put("key","cip-"+String.valueOf(i));
		}
		JSONArray allCountryip=new JSONArray(list);
		return allCountryip;
	}
	public JSONObject delCountryipById(String Id) throws Exception {
		JSONObject results = new JSONObject();
		try {
			
			int delCountryip = countryipDao.delCountryipById(Id);
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
	public int updateCountryipById(Countryip countryip,String Id) throws Exception {
		return countryipDao.updateCountryipById(countryip,Id);
	}
	public int addCountryip(Countryip countryip,String code,String country,String remark) throws Exception {
		return countryipDao.addCountryip(countryip, code, country, remark);
	}
	public String findAddCountryipId(Countryip countryip,String code,String country,String remark) throws Exception {
		return countryipDao.findAddCountryipId(countryip, code, country, remark);
	}
}