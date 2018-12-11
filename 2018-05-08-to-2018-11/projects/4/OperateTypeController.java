/**
 * @author lujm
 */
package com.maystar.jdksuper.dba.controller.operatetype;

import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.maystar.jdksuper.dba.model.operatetype.OperateTypeModel;
import com.maystar.jdksuper.dba.service.operatetype.OperateTypeService;
import com.maystar.jdksuper.dba.util.ParameterUtil;
import com.maystar.jdksuper.dba.util.SystemUtil;
import com.maystar.jdksuper.dba.util.UserUtil;
import com.maystar.mvc.base.BaseController;
import com.maystar.mvc.common.util.LoginUser;
import com.maystar.common.util.DateComFunc;
import com.maystar.common.util.JSONPrintOpt;
@Controller
@RequestMapping("/dba/operateType/")
public class OperateTypeController extends BaseController {
	private static Logger logger = Logger.getLogger(OperateTypeController.class);
	@Autowired
	public OperateTypeService operateTypeService;
	public OperateTypeController() {
		logger.info("@OperateTypeController初始化成功！！");
	}
	/**
	 */
	@RequestMapping("/getAllOperateType")
	public void getAllOperateTypeValue(HttpServletResponse response, HttpServletRequest request, OperateTypeModel operateTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = operateTypeService.getAllOperateType(request, operateTypeModel, loginUser);
		} catch (Exception e) {
			logger.error("getList",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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
	
	/**
	 */
	@RequestMapping("/addOperateType")
	public void addOperateType(HttpServletResponse response, HttpServletRequest request, OperateTypeModel operateTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = operateTypeService.addOperateType(loginUser,operateTypeModel);
		} catch (Exception e) {
			logger.error("add",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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

	/**
	 */
	@RequestMapping("/getOperateTypeById")
	public void getOperateTypeById(HttpServletResponse response, HttpServletRequest request, OperateTypeModel operateTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = operateTypeService.getOperateTypeById(loginUser,operateTypeModel.getId());
		} catch (Exception e) {
			logger.error("getById",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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

	/**
	 */
	@RequestMapping("/updateOperateType")
	public void updateOperateType(HttpServletResponse response, HttpServletRequest request, OperateTypeModel operateTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = operateTypeService.updateOperateType(loginUser, operateTypeModel);
		} catch (Exception e) {
			logger.error("update",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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

	/**
	 */
	@RequestMapping("/delOperateType")
	public void delOperateType(HttpServletResponse response,HttpServletRequest request, String id) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = operateTypeService.deleteOperateType(loginUser, id);
		} catch (Exception e) {
			logger.error("del",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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
	
	/**
	 */
	@RequestMapping("/reloadOperateType")
	public void reload(HttpServletResponse response,HttpServletRequest request) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			ParameterUtil.getInstance().initParameter();
			result.put("success", true);
		} catch (Exception e) {
			logger.error("init",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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
	
	/***
	 * 重载序列 
	 * @param response
	 * @param request
	 * @throws Exception
	 */
	@RequestMapping("/reloadId")
	public void avoidIdRepeat(HttpServletResponse response,HttpServletRequest request) throws Exception{
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");	
			SystemUtil.avoidIdRepeat();
			result.put("success", true);
		} catch (Exception e) {
			logger.error("init",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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
	
	/**
	 * @param response
	 * @param request
	 */
	 @RequestMapping("/getDefultProvince")
	public void getDefultProvince(HttpServletResponse response,HttpServletRequest request) {
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		PrintWriter out = null;
		try {
			String defultProvince = ParameterUtil.getValue("DefultProvince");
			result.put("success", true);
			result.put("result", defultProvince);
		} catch (Exception e) {
			logger.error("获取系统默认省份异常！",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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
	
	 @RequestMapping("/getDefultmodulByid")
	public void getDefultmodulByid(HttpServletResponse response,HttpServletRequest request) {
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		PrintWriter out = null;
		String flag = "";
		try {
			LoginUser loginUser = (LoginUser) request.getSession()
					.getAttribute("loginUser");
			if(loginUser.getLoginname().equals("admin")||loginUser.getLoginname().equals("lizhanwei")||loginUser.getLoginname().equals("fanxiong")){
				result.put("success", true);
				result.put("result", "false");
			}else{
				List list = UserUtil.getDefultmodulByid(loginUser.getUserid());
				if(list.size()==0){
					flag = "true";
				}else{
					flag = "false";
				}
				result.put("success", true);
				result.put("result", flag);
			}
		} catch (Exception e) {
			logger.error("个人门户获取权限异常",e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
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
	
	 @RequestMapping("/getDuration")
	public void getDuration(HttpServletRequest request, HttpServletResponse response,
			String duration) throws Exception {
		JSONObject result = new JSONObject();
		try {
			String times = DateComFunc.getTimes(Long.parseLong(duration));
			result.put("result", times);
			JSONPrintOpt.outJSON(request, response, result);
		} catch (Exception e) {
			logger.error("DataProcessController.getDataListByDataType", e);
			JSONPrintOpt.outException(request, response, e);
		}
	}
}