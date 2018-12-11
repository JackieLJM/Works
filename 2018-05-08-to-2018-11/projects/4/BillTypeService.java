package com.maystar.jdksuper.dba.service.billtype;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Splitter;
import com.maystar.common.dbutils.Page;
import com.maystar.common.util.StringUtils;
import com.maystar.jdksuper.dba.dao.billtype.BillTypeDao;
import com.maystar.jdksuper.dba.model.billtype.BillTypeModel;
import com.maystar.jdksuper.log.Log;
import com.maystar.jdksuper.log.LogFactory;
import com.maystar.jdksuper.log.Operation;
import com.maystar.mvc.base.BaseService;
import com.maystar.mvc.common.util.DBUtil;
import com.maystar.mvc.common.util.LoginUser;
import com.maystar.mvc.common.util.WebUtil;

@Service
public class BillTypeService extends BaseService {
	@Autowired
	public BillTypeDao billTypeDao;
	
	public JSONObject getAllBillType(HttpServletRequest request,BillTypeModel billTypeModel, LoginUser loginUser) throws Exception{
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_QUERY);
			operation.setModuleid("jdksuper_tools_billtype");
			operation.setTablename("tools_billtype");
			operation.setLogmessage("获取所有话单类型信息列表。");
			Page page = billTypeDao.getAllBillType(billTypeModel);
			JSONArray array = new JSONArray(page.getList());
			result.put("result", array);
			result.put("success", true);
			result.put("totalProperty", page.getItemCount());
		} catch (Exception e) {
			operation.setErrorlevel("0");
			throw e;
		}finally{
			Log log = LogFactory.getInstance();
			log.writeLog(loginUser,operation);  
		}
		return result;
	}
	
	/**
	 * 添加系统参数
	 * @param loginUser
	 * @param billTypeModel
	 * @return
	 * @throws Exception
	 */
	public JSONObject addBillType(LoginUser loginUser,BillTypeModel billTypeModel) throws Exception {
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
//		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_ADD);
			operation.setModuleid("jdksuper_tools_billtype");
			operation.setTablename("tools_billtype");
			operation.setTableids(StringUtils.nullToStr(billTypeModel.getId()));
//			String addbillTypeModelList = "";
			Long id = DBUtil.getSeqID(WebUtil.JdksuperDS, "SEQ_DBA_billTypeModel");
			billTypeModel.setId(id.intValue());
			int addbillTypeModel = billTypeDao.addBillType(billTypeModel);
			if(addbillTypeModel > 0){
				result.put("success", true);
				result.put("result", "添加成功！");
				operation.setAudit("system");
				operation.setEventType("1115");
				Map map1 = new HashMap<>();
				map1.put("代码",billTypeModel.getCode());
//				map1.put("参数值",billTypeModel.getValuestr());
				map1.put("名称",billTypeModel.getName());
				operation.setExtendMap(map1);
				
			}else{
				result.put("success", false);
				result.put("result", "添加失败！");
				operation.setErrorlevel("1");
			}
//			if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//			    addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"；备注为 "+billTypeModel.getRemark()+"；备用字段1为 "+billTypeModel.getGroupid()+"；备用字段2为 "+billTypeModel.getBackuppath()+"。  ";
//			}else{
//                if("".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//                	addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"。  ";
//				}
//                if("".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//                	addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；备用字段2为 "+billTypeModel.getBackuppath()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//                	addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//                	addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"；备用字段1为 "+billTypeModel.getGroupid()+"。  ";
//                }
//                if("".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//                	addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；备注为 "+billTypeModel.getRemark()+"；备用字段2为 "+billTypeModel.getBackuppath()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//                	addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"；备用字段2为 "+billTypeModel.getBackuppath()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//                	addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"；备注为 "+billTypeModel.getRemark()+"。  ";
//                }
//				if("".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//					addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；备注为 "+billTypeModel.getRemark()+"；备用字段1为 "+billTypeModel.getGroupid()+"；备用字段2为 "+billTypeModel.getBackuppath()+"。  ";
//				}
//				if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//					addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"；备用字段1为 "+billTypeModel.getGroupid()+"；备用字段2为 "+billTypeModel.getBackuppath()+"。  ";
//				}
//				if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//					addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"；备注为 "+billTypeModel.getRemark()+"；备用字段2为 "+billTypeModel.getBackuppath()+"。  ";
//				}
//				if(!"".equals(StringUtils.nullToStr(billTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(billTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//					addbillTypeModelList += "参数代码为 "+billTypeModel.getCode()+"；参数值为 "+billTypeModel.getValuestr()+"；参数名称为 "+billTypeModel.getName()+"；参数说明为 "+billTypeModel.getDescription()+"；备注为 "+billTypeModel.getRemark()+"；备用字段1为 "+billTypeModel.getGroupid()+"。  ";
//				}
//			}
//			//addbillTypeModelList += billTypeModel.getCode()+"；"+billTypeModel.getValuestr()+"；"+billTypeModel.getName()+"；"+billTypeModel.getDescription()+"；"+billTypeModel.getRemark()+"；"+billTypeModel.getGroupid()+"；"+billTypeModel.getBackuppath()+"。  ";
//			operation.setLogmessage(loginUser.getUsername()+"在 "+new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒").format(System.currentTimeMillis())+"添加了系统参数信息：<br/>"+addbillTypeModelList);
//		} catch (Exception e) {
//			operation.setErrorlevel("0");
//			throw e;
//		}finally{
//			Log log = LogFactory.getInstance();
//			log.writeLog(loginUser,operation);  
//		}
		return result;
	}
	
	/**
	 * 根据id查询系统参数
	 * @param loginUser
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public JSONObject getBillTypeById(LoginUser loginUser,Integer id) throws Exception{
		Operation operation = new Operation();
		operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_QUERY);
		operation.setModuleid("jdksuper_tools_billtype");
		operation.setTablename("tools_billtype");
		operation.setLogmessage("根据id查询话单类型。");
		Log log = LogFactory.getInstance();
		JSONObject result = new JSONObject();
		try{
			Map reMap = billTypeDao.getBillTypeById(id);
			JSONObject jsonObject = new JSONObject(reMap);
			JSONArray array = new JSONArray();
			array.put(jsonObject);	
			result.put("result", array);
			result.put("success", true);
			result.put("totalProperty", array.length());
		} catch (Exception e) {
			operation.setErrorlevel("0");
			throw e;
		}finally{
			log.writeLog(loginUser,operation);  
		}
		return result;
	}
	
	/**
	 * 修改系统参数信息
	 * @param loginUser
	 * @param billTypeModel
	 * @return
	 * @throws Exception
	 */
	public JSONObject updateBillType(LoginUser loginUser,BillTypeModel billTypeModel)  throws Exception{
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
		Map map = new HashMap<>();
		map = billTypeDao.getBillTypeById(billTypeModel.getId());
		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_UPDATE);
			operation.setModuleid("jdksuper_dba_billTypeModel");
			operation.setTablename("dba_billTypeModel");
			operation.setTableids(StringUtils.nullToStr(billTypeModel.getId()));
			String updatebillTypeModelList = "修改系统参数：<br>";
//			if(!StringUtils.nullToStr(map.get("code")).equals(StringUtils.nullToStr(billTypeModel.getCode())) || !StringUtils.nullToStr(map.get("valuestr")).equals(StringUtils.nullToStr(billTypeModel.getValuestr())) || !StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName())) 
//					|| !StringUtils.nullToStr(map.get("description")).equals(StringUtils.nullToStr(billTypeModel.getDescription())) || !StringUtils.nullToStr(map.get("remark")).equals(StringUtils.nullToStr(billTypeModel.getRemark())) 
//					|| !StringUtils.nullToStr(map.get("groupid")).equals(StringUtils.nullToStr(billTypeModel.getGroupid())) || !StringUtils.nullToStr(map.get("backuppath")).equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//						if(!StringUtils.nullToStr(map.get("code")).equals(StringUtils.nullToStr(billTypeModel.getCode()))){
//							updatebillTypeModelList += "把参数代码为 "+ map.get("code")+" 修改为 " + billTypeModel.getCode()+"；";
//							//updatebillTypeModelList += "把"+ map.get("code")+" 修改为 " + billTypeModel.getCode()+"；";
//						}
//						if(!StringUtils.nullToStr(map.get("valuestr")).equals(StringUtils.nullToStr(billTypeModel.getValuestr()))){
//							updatebillTypeModelList += "把参数值为 "+ map.get("valuestr")+" 修改为 " + billTypeModel.getValuestr()+"；";
//							//updatebillTypeModelList += "把"+ map.get("valuestr")+" 修改为 " + billTypeModel.getValuestr()+"；";
//						}
//						if(!StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//							updatebillTypeModelList += "把参数名称为 "+ map.get("name")+" 修改为 " + billTypeModel.getName()+"；";
//							//updatebillTypeModelList += "把 "+ map.get("name")+" 修改为 " + billTypeModel.getName()+"；";
//						}
//						if(!StringUtils.nullToStr(map.get("description")).equals(StringUtils.nullToStr(billTypeModel.getDescription()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getDescription()))){
//							      updatebillTypeModelList += "把参数说明为 "+ map.get("description")+" 修改为 " + billTypeModel.getDescription()+"；";
//							     //updatebillTypeModelList += "把"+ map.get("description")+" 修改为 " + billTypeModel.getDescription()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getDescription()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//								        updatebillTypeModelList += "参数名称为"+ map.get("name")+"增加了参数说明：" + billTypeModel.getDescription()+"；";
//									}else{
//										updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"增加了参数说明：" + billTypeModel.getDescription()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(billTypeModel.getDescription()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//								        updatebillTypeModelList += "参数名称为"+ map.get("name")+"删除了参数说明：" + map.get("description")+"；";
//									}else{
//										updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"删除了参数说明：" + map.get("description")+"；";
//									}
//								}
//							}
//						}
//						if(!StringUtils.nullToStr(map.get("remark")).equals(StringUtils.nullToStr(billTypeModel.getRemark()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark()))){
//							      updatebillTypeModelList += "把备注为 "+ map.get("remark")+" 修改为 " + billTypeModel.getRemark()+"；";
//							      //updatebillTypeModelList += "把"+ map.get("remark")+" 修改为 " + billTypeModel.getRemark()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getRemark()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//									     updatebillTypeModelList += "参数名称为"+ map.get("name")+"增加了备注："+ billTypeModel.getRemark()+"；";
//									}else{
//										 updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"增加了备注："+ billTypeModel.getRemark()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(billTypeModel.getRemark()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//									     updatebillTypeModelList += "参数名称为"+ map.get("name")+"删除了备注："+ map.get("remark")+"；";
//									}else{
//										 updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"删除了备注："+ map.get("remark")+"；";
//									}
//								}
//							}
//						}
//						if(!StringUtils.nullToStr(map.get("groupid")).equals(StringUtils.nullToStr(billTypeModel.getGroupid()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getGroupid()))){
//							      updatebillTypeModelList += "把备用字段1为 "+ map.get("groupid")+" 修改为 " + billTypeModel.getGroupid()+"；";
//							      //updatebillTypeModelList += "把 "+ map.get("groupid")+" 修改为 " + billTypeModel.getGroupid()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getGroupid()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//								         updatebillTypeModelList += "参数名称为"+ map.get("name")+"增加了备用字段1："+ billTypeModel.getGroupid()+"；";
//									}else{
//										 updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"增加了备用字段1："+ billTypeModel.getGroupid()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(billTypeModel.getGroupid()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//								         updatebillTypeModelList += "参数名称为"+ map.get("name")+"删除了备用字段1："+ map.get("groupid")+"；";
//									}else{
//										 updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"删除了备用字段1："+ map.get("groupid")+"；";
//									}
//								}
//							}
//						}
//						if(!StringUtils.nullToStr(map.get("backuppath")).equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("backuppath"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//							    updatebillTypeModelList += "把备用字段2为 "+ map.get("backuppath")+" 修改为 " + billTypeModel.getBackuppath()+"；";
//							    //updatebillTypeModelList += "把 "+ map.get("backuppath")+" 修改为 " + billTypeModel.getBackuppath()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("backuppath"))) && !"".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//									    updatebillTypeModelList += "参数名称为"+ map.get("name")+"增加了备用字段2："+ billTypeModel.getBackuppath()+"；";
//									}else{
//										updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"增加了备用字段2："+ billTypeModel.getBackuppath()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("backuppath"))) && "".equals(StringUtils.nullToStr(billTypeModel.getBackuppath()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(billTypeModel.getName()))){
//									    updatebillTypeModelList += "参数名称为"+ map.get("name")+"删除了备用字段2："+ map.get("backuppath")+"；";
//									}else{
//										updatebillTypeModelList += "参数名称为"+ billTypeModel.getName()+"删除了备用字段2："+ map.get("backuppath")+"；";
//									}
//								}
//							}
//
//						}
//			}else{
//				updatebillTypeModelList="没有修改系统参数内容。";
//			}
			operation.setLogmessage(updatebillTypeModelList);
			operation.setOldTable();
			int updatebillTypeModel =  billTypeDao.updateBillType(billTypeModel);
			if(updatebillTypeModel > 0){
				result.put("success", true);
				result.put("result", "修改成功！");
				operation.setAudit("system");
				operation.setEventType("1117");
				Map map1 = new HashMap<>();
				map1.put("代码",billTypeModel.getCode());
//				map1.put("参数值",billTypeModel.getValuestr());
				map1.put("名称",billTypeModel.getName());
				operation.setExtendMap(map1);
			}else{
				result.put("success", false);
				result.put("result", "修改失败！");
				operation.setErrorlevel("1");
			}
		} catch (Exception e) {
			operation.setErrorlevel("0");
			throw e;
		}finally{
			Log log = LogFactory.getInstance();
			log.writeLog(loginUser,operation);  
		}
		return result;
	}
	
    /**
     * 删除系统参数
     * @param loginUser
     * @param ids
     * @return
     * @throws Exception
     */
	public JSONObject deleteBillType(LoginUser loginUser,String ids)  throws Exception{
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
		List<String> list=Splitter.on(',').omitEmptyStrings().splitToList(ids);
		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_DELETE);
			operation.setModuleid("jdksuper_tools_billtype");
			operation.setTablename("tools_billtype");
//			String delbillTypeModelList ="共删除"+list.size()+"条话单类型：<br>";
			Map extendMap = new HashMap<>();
			extendMap.put("操作","删除系统参数");
			List extendList = new ArrayList();
			//int j = 0;
			for (String string : list) {
	    	    int i = 0;
				Map<String,String>map=new HashMap<>();
				map=billTypeDao.getBillTypeById(Integer.parseInt(string));
				map=billTypeDao.getBillTypeById(Integer.valueOf(string));
				String code=StringUtils.nullToStr(map.get("code")).equals("")?"空":StringUtils.nullToStr(map.get("code"));
				String valuestr=StringUtils.nullToStr(map.get("valuestr")).equals("")?"空":StringUtils.nullToStr(map.get("valuestr"));
				String name=StringUtils.nullToStr(map.get("name")).equals("")?"空":StringUtils.nullToStr(map.get("name"));
				
			    operation.setTableids(string);
//			    if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			          delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+map.get("description")+"；备注为 "+map.get("remark")+"；备用字段1为 "+map.get("groupid")+"；备用字段2为 "+map.get("backuppath")+"。  <br>";
//			    }else{
//			         if("".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			             delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"。  <br>";
//			         }
//			         if("".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"；备注为 "+StringUtils.nullToStr(map.get("remark"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+map.get("description")+"；备用字段1为 "+StringUtils.nullToStr(map.get("groupid"))+"。  <br>";
//			         }
//			         if("".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；备注为 "+StringUtils.nullToStr(map.get("remark"))+"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delbillTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"；备注为 "+StringUtils.nullToStr(map.get("remark"))+"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			    }
			    Map eachMap = new HashMap<>();
			    eachMap.put("代码",code);
//			    eachMap.put("参数值",valuestr);
			    eachMap.put("名称",name);
			    extendList.add(eachMap);
			    //delbillTypeModelList += "第"+(j+1)+"条："+map.get("code")+"；"+map.get("valuestr") + "；" + map.get("name") + "；" + map.get("description") +"；" + map.get("remark") + "；" + map.get("groupid") + "；" + map.get("backuppath") + "。  <br>";
	            i = billTypeDao.deleteBillType(string);
	            if(i > 0){
		           result.put("success", true);
		           result.put("result", "删除成功！");
		           operation.setAudit("system");
   				operation.setEventType("1116");
   				operation.setExtendMap(extendMap);
	            }else{
		           result.put("success", false);
		           result.put("result", "删除失败！");
		           operation.setErrorlevel("1");
	            }
	            //j++;
	       }
		   extendMap.put("系统参数", extendList);
//	       operation.setLogmessage(loginUser.getUsername()+"在 "+new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒").format(System.currentTimeMillis())+"删除了"+list.size()+"条系统参数：<br/>"+delbillTypeModelList);
		} catch (Exception e) {
			operation.setErrorlevel("0");
			throw e;
		}finally{
			Log log = LogFactory.getInstance();
			log.writeLog(loginUser,operation);  
		}
		return result;
	}
	
	public List getAllBillType() throws Exception{
		try{
			return billTypeDao.getAllBillType();
		} catch (Exception e) {
			throw e;
		}finally{

		}
	}
	
//	public List getAllSystemInfo() throws Exception{
//		try{
////			return billTypeDao.getAllSystemInfo();
//		} catch (Exception e) {
//			throw e;
//		}finally{
//
//		}
//	}
	/**
	 * 获取设备ID与系统代码的对应关系
	 * @return
	 * @throws Exception
	 */
//	public List getSystemCodeList() throws Exception{
//		try{
//			return billTypeDao.getSystemCodeList();
//		} catch (Exception e) {
//			throw e;
//		}finally{
//
//		}
//	}
}