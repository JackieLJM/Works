/**
 * @author liujm
 */
package com.maystar.jdksuper.dba.controller.billtype;

import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.maystar.jdksuper.dba.model.billtype.BillTypeModel;
import com.maystar.jdksuper.dba.service.billtype.BillTypeService;
import com.maystar.jdksuper.dba.util.ParameterUtil;
import com.maystar.jdksuper.dba.util.SystemUtil;
import com.maystar.jdksuper.dba.util.UserUtil;
import com.maystar.mvc.base.BaseController;
import com.maystar.mvc.common.util.LoginUser;
import com.maystar.common.util.DateComFunc;
import com.maystar.common.util.JSONPrintOpt;
@Controller
@RequestMapping("/dba/billType/")
public class BillTypeController extends BaseController {
	private static Logger logger = Logger.getLogger(BillTypeController.class);
	@Autowired
	public BillTypeService billTypeService;
	public BillTypeController() {
		logger.info("@BillTypeController初始化成功！！");
	}
	/**
	 */
	@RequestMapping("/getAllBillType")
	public void getAllBillType(HttpServletResponse response, HttpServletRequest request, BillTypeModel billTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = billTypeService.getAllBillType(request, billTypeModel, loginUser);
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
	@RequestMapping("/addBillType")
	public void addBillType(HttpServletResponse response, HttpServletRequest request, BillTypeModel billTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = billTypeService.addBillType(loginUser,billTypeModel);
			System.out.println(result);
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
	@RequestMapping("/getBillTypeById")
	public void getBillTypeById(HttpServletResponse response, HttpServletRequest request, BillTypeModel billTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = billTypeService.getBillTypeById(loginUser,billTypeModel.getId());
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
	@RequestMapping("/updateBillType")
	public void updateBillType(HttpServletResponse response, HttpServletRequest request, BillTypeModel billTypeModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = billTypeService.updateBillType(loginUser, billTypeModel);
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
	 @RequestMapping("/delBillType")
	public void delBillType(HttpServletResponse response,HttpServletRequest request, String id) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
			result = billTypeService.deleteBillType(loginUser, id);
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
	 @RequestMapping("/reloadBillType")
	public void reload(HttpServletResponse response,HttpServletRequest request) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			LoginUser loginUser = (LoginUser) request.getSession().getAttribute("loginUser");
//			maystar 方法调用
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