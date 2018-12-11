package com.maystar.jdkm.software.controller;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.maystar.jdkm.equip.vo.HardwareType;
import com.maystar.jdkm.log.TLog;
import com.maystar.jdkm.software.model.SoftwareEquipModel;
import com.maystar.jdkm.software.service.SoftwareEquipService;
import com.maystar.mvc.common.util.LoginUser;


@Controller
@RequestMapping("/software")
public class SoftwareEquipController {
	static Logger logger = Logger.getLogger(SoftwareEquipController.class.getName());
	
	@Autowired
	private SoftwareEquipService softwareEquipService;
	
	@RequestMapping("/softwareEquipGridView")
	public void softwareEquipGridView(HttpServletResponse response, HttpServletRequest request,SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			result = softwareEquipService.softwareEquipGridView(request, softwareEquipModel);
		} catch (Exception e) {
			logger.error("getPage", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	/**
	 * 添加软件类型
	 * 
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/softwareEquipAdd")
	public void softwareEquipAdd(HttpServletRequest request,
			HttpServletResponse response, SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.softwareEquipAdd(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "添加",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]添加软件类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	/**
	 * 删除软件类型
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/softwareEquipDelete")
	public void softwareEquipDelete(HttpServletRequest request,
			HttpServletResponse response, SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.softwareEquipAdd(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "添加",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]添加软件类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 上传文件
	 * @param uploadFile
	 * @param request
	 * @param response
	 */
	@RequestMapping("/upFileSoftwareCon")
	public void upFileSoftwareCon(@RequestParam(value = "file", required = false) MultipartFile uploadFile,HttpServletRequest request, HttpServletResponse response){
		PrintWriter out = null;
		response.setContentType("application/json");
		LoginUser loginUser=(LoginUser)request.getSession(true).getAttribute("userInfo");
		JSONObject result = new JSONObject();
		try{
			result = softwareEquipService.upFileSoftwareCon(request,uploadFile);
			TLog.AddLog(loginUser.getLoginname(), "添加",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]上传默认文件", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		}catch(Exception e){
			logger.error("upFilePreview",e);
			result.put("success", false);
			result.put("msg", e.getMessage());
		}finally{
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 添加软件配置
	 * 
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/saveTsoftdefault")
	public void saveTsoftdefault(HttpServletRequest request,
			HttpServletResponse response, SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.saveTsoftdefault(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "添加",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]添加软件配置", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 软件默认配置展示
	 * @param response
	 * @param request
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareConGridView")
	public void softwareConGridView(HttpServletResponse response, HttpServletRequest request,SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			result = softwareEquipService.softwareConGridView(request, softwareEquipModel);
		} catch (Exception e) {
			logger.error("getPage", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 删除软件类型
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/deleteSoftwareCon")
	public void deleteSoftwareCon(HttpServletRequest request,
			HttpServletResponse response, String id) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.deleteSoftwareCon(request, id);
			TLog.AddLog(loginUser.getLoginname(), "删除",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]删除软件默认配置类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	/**
	 * 添加软件配置
	 * 
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/editTsoftdefault")
	public void editTsoftdefault(HttpServletRequest request,
			HttpServletResponse response,String strs) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.editTsoftdefault(request, strs);
			TLog.AddLog(loginUser.getLoginname(), "编辑",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]编剧默认软件配置", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 编辑软件类型
	 * 
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/softwareEquipEdit")
	public void softwareEquipEdit(HttpServletRequest request,
			HttpServletResponse response, SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.softwareEquipEdit(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "编辑",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]编辑软件类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 删除软件类型
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/deleteTsofttype")
	public void deleteTsofttype(HttpServletRequest request,
			HttpServletResponse response, String softnames) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.deleteTsofttype(request, softnames);
			TLog.AddLog(loginUser.getLoginname(), "删除",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]删除软件默认配置类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 查询服务器ip
	 * @param response
	 * @param request
	 */
	@RequestMapping("/getComboBoxIpaddress")
	public void getComboBoxTar(HttpServletResponse response,
			HttpServletRequest request) {
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.getComboBoxIpaddress(request);
		} catch (Exception e) {
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	@RequestMapping("/getComboBoxSoftname")
	public void getComboBoxSoftname(HttpServletResponse response,
			HttpServletRequest request) {
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.getComboBoxSoftname(request);
		} catch (Exception e) {
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	/**
	 * 添加软件类型
	 * 
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/SoftwareManageEquipAdd")
	public void SoftwareManageEquipAdd(HttpServletRequest request,
			HttpServletResponse response, SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.SoftwareManageEquipAdd(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "添加",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]添加软件类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 软件管理页面展示
	 * @param response
	 * @param request
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareManageEquipGridView")
	public void softwareManageEquipGridView(HttpServletResponse response, HttpServletRequest request,SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			result = softwareEquipService.softwareManageEquipGridView(request, softwareEquipModel);
		} catch (Exception e) {
			logger.error("getPage", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	/**
	 * 软件树页面展示
	 * @param response
	 * @param request
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareManageEquipTreeView")
	public void softwareManageEquipTreeView(HttpServletResponse response, HttpServletRequest request,SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			result = softwareEquipService.softwareManageEquipTreeView(request, softwareEquipModel);
		} catch (Exception e) {
			logger.error("getPage", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 软件树页面展示
	 * @param response
	 * @param request
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareManageEquipEdit")
	public void softwareManageEquipEdit(HttpServletResponse response, HttpServletRequest request,SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			result = softwareEquipService.softwareManageEquipEdit(request, softwareEquipModel);
		} catch (Exception e) {
			logger.error("getPage", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 删除服务器软件信息表
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/deleteTsoftinfo")
	public void deleteTsoftinfo(HttpServletRequest request,
			HttpServletResponse response,SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.deleteTsoftinfo(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "删除",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]删除服务器软件信息表", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 软件配置表展示
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareEquipConManageGrid")
	public void softwareEquipConManageStore(HttpServletResponse response, HttpServletRequest request,SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		try {
			result = softwareEquipService.softwareEquipConManageGrid(request, softwareEquipModel);
		} catch (Exception e) {
			logger.error("getPage", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 添加软件配置
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareSaveTsoftios")
	public void softwareSaveTsoftios(HttpServletResponse response, HttpServletRequest request,SoftwareEquipModel softwareEquipModel) {
		JSONObject result = new JSONObject();
		response.setContentType("application/json");
		PrintWriter out = null;
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		try {
			result = softwareEquipService.softwareSaveTsoftios(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "添加",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]增加软件配置", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("getPage", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 删除软件配置
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/deleteSoftwareManageCon")
	public void deleteSoftwareManageCon(HttpServletRequest request,
			HttpServletResponse response, String id) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.deleteSoftwareManageCon(request, id);
			TLog.AddLog(loginUser.getLoginname(), "删除",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]删除软件默认配置类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("deleteSoftwareManageCon", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	/**
	 * 修改软件配置
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareEquipConEditView")
	public void softwareEquipConEditView(HttpServletRequest request,
			HttpServletResponse response, SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.softwareEquipConEditView(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "编辑",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]编辑软件配置", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 软件状态
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/softwareStatus")
	public void softwareStatus(HttpServletRequest request,
			HttpServletResponse response, SoftwareEquipModel softwareEquipModel) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.softwareStatus(request, softwareEquipModel);
			TLog.AddLog(loginUser.getLoginname(), "查看软件状态",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]查看软件状态", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("softwareStatus", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 分组名称
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/getComboBoxGrouptype")
	public void getComboBoxGroupname(HttpServletResponse response,
			HttpServletRequest request,String grouptype) {
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.getComboBoxGroupname(request,grouptype);
		} catch (Exception e) {
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 修改软件状态
	 * 
	 * @param request
	 * @param response
	 * @param foeSuspect
	 */
	@RequestMapping("/updateStatus")
	public void updateStatus(HttpServletRequest request,
			HttpServletResponse response, String ids,String status) {
		HttpSession session = request.getSession(true);
		LoginUser loginUser=(LoginUser)session.getAttribute("userInfo");
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.updateStatus(request,ids,status);
			TLog.AddLog(loginUser.getLoginname(), "编辑",request.getRemoteHost(), "用户["+loginUser.getLoginname()+"]编辑软件类型", "登录地址:["+request.getRemoteAddr()+request.getRemoteHost()+"]");
		} catch (Exception e) {
			logger.error("add", e);
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	
	/**
	 * 参数类型combobox
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/typeCombobox")
	public void typeCombobox(HttpServletResponse response,
			HttpServletRequest request,String grouptype) {
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.typeCombobox(request);
		} catch (Exception e) {
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}
	/**
	 * 参数名称名称
	 * @param request
	 * @param response
	 * @param softwareEquipModel
	 */
	@RequestMapping("/getParameterNameByCodeAndNum")
	public void getParameterNameByCodeAndNum(HttpServletResponse response,
			HttpServletRequest request,String code) {
		PrintWriter out = null;
		response.setContentType("application/json");
		JSONObject result = new JSONObject();
		try {
			result = softwareEquipService.getParameterNameByCodeAndNum(code);
		} catch (Exception e) {
			result.put("success", false);
			result.put("result", e.getMessage());
		} finally {
			try {
				out = response.getWriter();
				out.write(result.toString());
			} catch (Exception e) {
				logger.error("", e);
			} finally {
				if (out != null) {
					out.close();
				}
			}
		}
	}

}
