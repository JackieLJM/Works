package com.maystar.jdksuper.dba.model.geocoord;
import com.maystar.mvc.base.BaseModel;

public class Geocoord extends BaseModel {
	private static final long serialVersionUID = 1L;
	private long id;
	private String country;
	private String province;
	private String city;
	private String longitude;
	private String latitude;
	private String country_en;
	private String code;
	private String citycode;
	private String ipcode;
	private String country_code;
	private String gpslongitude;
	private String gpslatitude;
	private String continent;
	private String continent_code;
	private String continentalias;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getCountry_en() {
		return country_en;
	}
	public void setCountry_en(String country_en) {
		this.country_en = country_en;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCitycode() {
		return citycode;
	}
	public void setCitycode(String citycode) {
		this.citycode = citycode;
	}
	public String getIpcode() {
		return ipcode;
	}
	public void setIpcode(String ipcode) {
		this.ipcode = ipcode;
	}
	public String getCountry_code() {
		return country_code;
	}
	public void setCountry_code(String country_code) {
		this.country_code = country_code;
	}
	public String getGpslongitude() {
		return gpslongitude;
	}
	public void setGpslongitude(String gpslongitude) {
		this.gpslongitude = gpslongitude;
	}
	public String getGpslatitude() {
		return gpslatitude;
	}
	public void setGpslatitude(String gpslatitude) {
		this.gpslatitude = gpslatitude;
	}
	public String getContinent() {
		return continent;
	}
	public void setContinent(String continent) {
		this.continent = continent;
	}
	public String getContinent_code() {
		return continent_code;
	}
	public void setContinent_code(String continent_code) {
		this.continent_code = continent_code;
	}
	public String getContinentalias() {
		return continentalias;
	}
	public void setContinentalias(String continentalias) {
		this.continentalias = continentalias;
	}	
	
}