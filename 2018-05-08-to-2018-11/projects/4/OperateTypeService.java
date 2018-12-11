package com.maystar.jdksuper.dba.service.operatetype;

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
import com.maystar.jdksuper.dba.dao.operatetype.OperateTypeDao;
import com.maystar.jdksuper.dba.model.operatetype.OperateTypeModel;
import com.maystar.jdksuper.log.Log;
import com.maystar.jdksuper.log.LogFactory;
import com.maystar.jdksuper.log.Operation;
import com.maystar.mvc.base.BaseService;
import com.maystar.mvc.common.util.DBUtil;
import com.maystar.mvc.common.util.LoginUser;
import com.maystar.mvc.common.util.WebUtil;

@Service
public class OperateTypeService extends BaseService {
	@Autowired
	public OperateTypeDao operateTypeDao;
	
	public JSONObject getAllOperateType(HttpServletRequest request,OperateTypeModel operateTypeModel, LoginUser loginUser) throws Exception{
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_QUERY);
			operation.setModuleid("jdksuper_tools_operatetype");
			operation.setTablename("tools_operatetype");
			operation.setLogmessage("获取所有操作类型信息列表。");
			Page page = operateTypeDao.getAllOperateType(operateTypeModel);
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
	 * @param operateTypeModel
	 * @return
	 * @throws Exception
	 */
	public JSONObject addOperateType(LoginUser loginUser,OperateTypeModel operateTypeModel) throws Exception {
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
//		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_ADD);
			operation.setModuleid("jdksuper_tools_operatetype");
			operation.setTablename("tools_operatetype");
			operation.setTableids(StringUtils.nullToStr(operateTypeModel.getId()));
//			String addOperateTypeList = "";
			Long id = DBUtil.getSeqID(WebUtil.JdksuperDS, "SEQ_TOOLS_OPERATETYPE");
			operateTypeModel.setId(id.intValue());
			int addoperateTypeModel = operateTypeDao.addOperateType(operateTypeModel);
			if(addoperateTypeModel > 0){
				result.put("success", true);
				result.put("result", "添加成功！");
				operation.setAudit("system");
				operation.setEventType("1115");
				Map map1 = new HashMap<>();
				map1.put("代码",operateTypeModel.getCode());
//				map1.put("",operateTypeModel.getValuestr());
				map1.put("中文描述",operateTypeModel.getName());
				operation.setExtendMap(map1);
				
			}else{
				result.put("success", false);
				result.put("result", "添加失败！");
				operation.setErrorlevel("1");
			}
//			if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//			    addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"；备注为 "+operateTypeModel.getRemark()+"；备用字段1为 "+operateTypeModel.getGroupid()+"；备用字段2为 "+operateTypeModel.getBackuppath()+"。  ";
//			}else{
//                if("".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//                	addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"。  ";
//				}
//                if("".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//                	addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；备用字段2为 "+operateTypeModel.getBackuppath()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//                	addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//                	addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"；备用字段1为 "+operateTypeModel.getGroupid()+"。  ";
//                }
//                if("".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//                	addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；备注为 "+operateTypeModel.getRemark()+"；备用字段2为 "+operateTypeModel.getBackuppath()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//                	addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"；备用字段2为 "+operateTypeModel.getBackuppath()+"。  ";
//                }
//                if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//                	addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"；备注为 "+operateTypeModel.getRemark()+"。  ";
//                }
//				if("".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//					addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；备注为 "+operateTypeModel.getRemark()+"；备用字段1为 "+operateTypeModel.getGroupid()+"；备用字段2为 "+operateTypeModel.getBackuppath()+"。  ";
//				}
//				if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && "".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//					addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"；备用字段1为 "+operateTypeModel.getGroupid()+"；备用字段2为 "+operateTypeModel.getBackuppath()+"。  ";
//				}
//				if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//					addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"；备注为 "+operateTypeModel.getRemark()+"；备用字段2为 "+operateTypeModel.getBackuppath()+"。  ";
//				}
//				if(!"".equals(StringUtils.nullToStr(operateTypeModel.getDescription())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark())) && !"".equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) && "".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//					addoperateTypeModelList += "参数代码为 "+operateTypeModel.getCode()+"；参数值为 "+operateTypeModel.getValuestr()+"；参数名称为 "+operateTypeModel.getName()+"；参数说明为 "+operateTypeModel.getDescription()+"；备注为 "+operateTypeModel.getRemark()+"；备用字段1为 "+operateTypeModel.getGroupid()+"。  ";
//				}
//			}
//			addoperateTypeModelList += operateTypeModel.getCode()+"；"+operateTypeModel.getValuestr()+"；"+operateTypeModel.getName()+"；"+operateTypeModel.getDescription()+"；"+operateTypeModel.getRemark()+"；"+operateTypeModel.getGroupid()+"；"+operateTypeModel.getBackuppath()+"。  ";
//			operation.setLogmessage(loginUser.getUsername()+"在 "+new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒").format(System.currentTimeMillis())+"添加了系统参数信息：<br/>"+addoperateTypeModelList);
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
	public JSONObject getOperateTypeById(LoginUser loginUser,Integer id) throws Exception{
		Operation operation = new Operation();
		operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_QUERY);
		operation.setModuleid("jdksuper_tools_operatetype");
		operation.setTablename("tools_operatetype");
		operation.setLogmessage("根据id查询操作类型。");
		Log log = LogFactory.getInstance();
		JSONObject result = new JSONObject();
		try{
			Map reMap = operateTypeDao.getOperateTypeById(id);
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
	 * @param operateTypeModel
	 * @return
	 * @throws Exception
	 */
	public JSONObject updateOperateType(LoginUser loginUser,OperateTypeModel operateTypeModel)  throws Exception{
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
		Map map = new HashMap<>();
		map = operateTypeDao.getOperateTypeById(operateTypeModel.getId());
		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_UPDATE);
			operation.setModuleid("jdksuper_dba_operateTypeModel");
			operation.setTablename("dba_operateTypeModel");
			operation.setTableids(StringUtils.nullToStr(operateTypeModel.getId()));
			String updateoperateTypeModelList = "修改系统参数：<br>";
//			if(!StringUtils.nullToStr(map.get("code")).equals(StringUtils.nullToStr(operateTypeModel.getCode())) || !StringUtils.nullToStr(map.get("valuestr")).equals(StringUtils.nullToStr(operateTypeModel.getValuestr())) || !StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName())) 
//					|| !StringUtils.nullToStr(map.get("description")).equals(StringUtils.nullToStr(operateTypeModel.getDescription())) || !StringUtils.nullToStr(map.get("remark")).equals(StringUtils.nullToStr(operateTypeModel.getRemark())) 
//					|| !StringUtils.nullToStr(map.get("groupid")).equals(StringUtils.nullToStr(operateTypeModel.getGroupid())) || !StringUtils.nullToStr(map.get("backuppath")).equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//						if(!StringUtils.nullToStr(map.get("code")).equals(StringUtils.nullToStr(operateTypeModel.getCode()))){
//							updateoperateTypeModelList += "把参数代码为 "+ map.get("code")+" 修改为 " + operateTypeModel.getCode()+"；";
//							//updateoperateTypeModelList += "把"+ map.get("code")+" 修改为 " + operateTypeModel.getCode()+"；";
//						}
//						if(!StringUtils.nullToStr(map.get("valuestr")).equals(StringUtils.nullToStr(operateTypeModel.getValuestr()))){
//							updateoperateTypeModelList += "把参数值为 "+ map.get("valuestr")+" 修改为 " + operateTypeModel.getValuestr()+"；";
//							//updateoperateTypeModelList += "把"+ map.get("valuestr")+" 修改为 " + operateTypeModel.getValuestr()+"；";
//						}
//						if(!StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//							updateoperateTypeModelList += "把参数名称为 "+ map.get("name")+" 修改为 " + operateTypeModel.getName()+"；";
//							//updateoperateTypeModelList += "把 "+ map.get("name")+" 修改为 " + operateTypeModel.getName()+"；";
//						}
//						if(!StringUtils.nullToStr(map.get("description")).equals(StringUtils.nullToStr(operateTypeModel.getDescription()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getDescription()))){
//							      updateoperateTypeModelList += "把参数说明为 "+ map.get("description")+" 修改为 " + operateTypeModel.getDescription()+"；";
//							     //updateoperateTypeModelList += "把"+ map.get("description")+" 修改为 " + operateTypeModel.getDescription()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getDescription()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//								        updateoperateTypeModelList += "参数名称为"+ map.get("name")+"增加了参数说明：" + operateTypeModel.getDescription()+"；";
//									}else{
//										updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"增加了参数说明：" + operateTypeModel.getDescription()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(operateTypeModel.getDescription()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//								        updateoperateTypeModelList += "参数名称为"+ map.get("name")+"删除了参数说明：" + map.get("description")+"；";
//									}else{
//										updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"删除了参数说明：" + map.get("description")+"；";
//									}
//								}
//							}
//						}
//						if(!StringUtils.nullToStr(map.get("remark")).equals(StringUtils.nullToStr(operateTypeModel.getRemark()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark()))){
//							      updateoperateTypeModelList += "把备注为 "+ map.get("remark")+" 修改为 " + operateTypeModel.getRemark()+"；";
//							      //updateoperateTypeModelList += "把"+ map.get("remark")+" 修改为 " + operateTypeModel.getRemark()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getRemark()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//									     updateoperateTypeModelList += "参数名称为"+ map.get("name")+"增加了备注："+ operateTypeModel.getRemark()+"；";
//									}else{
//										 updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"增加了备注："+ operateTypeModel.getRemark()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(operateTypeModel.getRemark()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//									     updateoperateTypeModelList += "参数名称为"+ map.get("name")+"删除了备注："+ map.get("remark")+"；";
//									}else{
//										 updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"删除了备注："+ map.get("remark")+"；";
//									}
//								}
//							}
//						}
//						if(!StringUtils.nullToStr(map.get("groupid")).equals(StringUtils.nullToStr(operateTypeModel.getGroupid()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getGroupid()))){
//							      updateoperateTypeModelList += "把备用字段1为 "+ map.get("groupid")+" 修改为 " + operateTypeModel.getGroupid()+"；";
//							      //updateoperateTypeModelList += "把 "+ map.get("groupid")+" 修改为 " + operateTypeModel.getGroupid()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getGroupid()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//								         updateoperateTypeModelList += "参数名称为"+ map.get("name")+"增加了备用字段1："+ operateTypeModel.getGroupid()+"；";
//									}else{
//										 updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"增加了备用字段1："+ operateTypeModel.getGroupid()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(operateTypeModel.getGroupid()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//								         updateoperateTypeModelList += "参数名称为"+ map.get("name")+"删除了备用字段1："+ map.get("groupid")+"；";
//									}else{
//										 updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"删除了备用字段1："+ map.get("groupid")+"；";
//									}
//								}
//							}
//						}
//						if(!StringUtils.nullToStr(map.get("backuppath")).equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//							if(!"".equals(StringUtils.nullToStr(map.get("backuppath"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//							    updateoperateTypeModelList += "把备用字段2为 "+ map.get("backuppath")+" 修改为 " + operateTypeModel.getBackuppath()+"；";
//							    //updateoperateTypeModelList += "把 "+ map.get("backuppath")+" 修改为 " + operateTypeModel.getBackuppath()+"；";
//							}else{
//								if("".equals(StringUtils.nullToStr(map.get("backuppath"))) && !"".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//									    updateoperateTypeModelList += "参数名称为"+ map.get("name")+"增加了备用字段2："+ operateTypeModel.getBackuppath()+"；";
//									}else{
//										updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"增加了备用字段2："+ operateTypeModel.getBackuppath()+"；";
//									}
//								}
//								if(!"".equals(StringUtils.nullToStr(map.get("backuppath"))) && "".equals(StringUtils.nullToStr(operateTypeModel.getBackuppath()))){
//									if(StringUtils.nullToStr(map.get("name")).equals(StringUtils.nullToStr(operateTypeModel.getName()))){
//									    updateoperateTypeModelList += "参数名称为"+ map.get("name")+"删除了备用字段2："+ map.get("backuppath")+"；";
//									}else{
//										updateoperateTypeModelList += "参数名称为"+ operateTypeModel.getName()+"删除了备用字段2："+ map.get("backuppath")+"；";
//									}
//								}
//							}
//
//						}
//			}else{
//				updateoperateTypeModelList="没有修改系统参数内容。";
//			}
			operation.setLogmessage(updateoperateTypeModelList);
			operation.setOldTable();
			int updateoperateTypeModel =  operateTypeDao.updateOperateType(operateTypeModel);
			if(updateoperateTypeModel > 0){
				result.put("success", true);
				result.put("result", "修改成功！");
				operation.setAudit("system");
				operation.setEventType("1117");
				Map map1 = new HashMap<>();
				map1.put("代码",operateTypeModel.getCode());
//				map1.put("参数值",operateTypeModel.getValuestr());
				map1.put("中文描述",operateTypeModel.getName());
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
	public JSONObject deleteOperateType(LoginUser loginUser,String ids)  throws Exception{
		Operation operation = new Operation();
		JSONObject result = new JSONObject();
		List<String> list=Splitter.on(',').omitEmptyStrings().splitToList(ids);
		try{
			operation.setLogtype(com.maystar.jdksuper.log.Constants.LOG_TYPE_DELETE);
			operation.setModuleid("jdksuper_tools_operatetype");
			operation.setTablename("tools_operatetype");
//			String deloperateTypeModelList ="共删除"+list.size()+"条话单类型：<br>";
			Map extendMap = new HashMap<>();
			extendMap.put("操作","删除话单类型");
			List extendList = new ArrayList();
			//int j = 0;
			for (String string : list) {
	    	    int i = 0;
				Map<String,String>map=new HashMap<>();
				map=operateTypeDao.getOperateTypeById(Integer.parseInt(string));
				map=operateTypeDao.getOperateTypeById(Integer.valueOf(string));
				String code=StringUtils.nullToStr(map.get("code")).equals("")?"空":StringUtils.nullToStr(map.get("code"));
				String valuestr=StringUtils.nullToStr(map.get("valuestr")).equals("")?"空":StringUtils.nullToStr(map.get("valuestr"));
				String name=StringUtils.nullToStr(map.get("name")).equals("")?"空":StringUtils.nullToStr(map.get("name"));
				
			    operation.setTableids(string);
//			    if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			          delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+map.get("description")+"；备注为 "+map.get("remark")+"；备用字段1为 "+map.get("groupid")+"；备用字段2为 "+map.get("backuppath")+"。  <br>";
//			    }else{
//			         if("".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			             delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"。  <br>";
//			         }
//			         if("".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"；备注为 "+StringUtils.nullToStr(map.get("remark"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && "".equals(StringUtils.nullToStr(map.get("remark"))) && !"".equals(StringUtils.nullToStr(map.get("groupid"))) && "".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+map.get("description")+"；备用字段1为 "+StringUtils.nullToStr(map.get("groupid"))+"。  <br>";
//			         }
//			         if("".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；备注为 "+StringUtils.nullToStr(map.get("remark"))+"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			         if(!"".equals(StringUtils.nullToStr(map.get("description"))) && !"".equals(StringUtils.nullToStr(map.get("remark"))) && "".equals(StringUtils.nullToStr(map.get("groupid"))) && !"".equals(StringUtils.nullToStr(map.get("backuppath")))){
//			        	 delOperateTypeModelList += "参数代码为 "+map.get("code")+"；参数值为 "+map.get("valuestr") +"；参数名称为 "+map.get("name") +"；参数说明为 "+StringUtils.nullToStr(map.get("description"))+"；备注为 "+StringUtils.nullToStr(map.get("remark"))+"；备用字段2为 "+StringUtils.nullToStr(map.get("backuppath"))+"。  <br>";
//			         }
//			    }
			    Map eachMap = new HashMap<>();
			    eachMap.put("代码",code);
//			    eachMap.put("参数值",valuestr);
			    eachMap.put("中文描述",name);
			    extendList.add(eachMap);
			    //deloperateTypeModelList += "第"+(j+1)+"条："+map.get("code")+"；"+map.get("valuestr") + "；" + map.get("name") + "；" + map.get("description") +"；" + map.get("remark") + "；" + map.get("groupid") + "；" + map.get("backuppath") + "。  <br>";
	            i = operateTypeDao.deleteOperateType(string);
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
//	       operation.setLogmessage(loginUser.getUsername()+"在 "+new SimpleDateFormat("yyyy年MM月dd日 HH时mm分ss秒").format(System.currentTimeMillis())+"删除了"+list.size()+"条系统参数：<br/>"+deloperateTypeModelList);
		} catch (Exception e) {
			operation.setErrorlevel("0");
			throw e;
		}finally{
			Log log = LogFactory.getInstance();
			log.writeLog(loginUser,operation);  
		}
		return result;
	}
	
	public List getAllOperateType() throws Exception{
		try{
			return operateTypeDao.getAllOperateType();
		} catch (Exception e) {
			throw e;
		}finally{

		}
	}
	
//	public List getAllSystemInfo() throws Exception{
//		try{
//			return operateTypeDao.getAllSystemInfo();
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
//			return operateTypeDao.getSystemCodeList();
//		} catch (Exception e) {
//			throw e;
//		}finally{
//
//		}
//	}
}