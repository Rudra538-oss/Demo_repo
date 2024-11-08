var oPrinterID;
var machine;
var oResource;
var userLanguage;
var bcpElement;
var oBCPStats;
var proceed;
var oController,oLineNodeID;
var oTemplateID,MaterialType;
var label_type, getline;
jQuery.sap.require("sap.m.MessageBox");
var bcpElement,obcpstatus;
var oBCPStats, plantFromURL, clientFromURL;
var checkbox, BCPOnStatus, BCPSelectedStatus, BCPStatusValues;
sap.ui.controller("JS.PrinterConfig", {

	onInit: function () {

		var RefreshDate = new Date();
		machine = document.getElementById("machine").value;
		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell1").getUser().setUsername(username);
		oController=this;

		var ClientModel = new sap.ui.model.xml.XMLModel();
		ClientModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&d=" + DateNw + "&Content-Type=text/xml", "", false);
		clientFromURL = ClientModel.getProperty("/Rowset/Row/CLIENT");
		plantFromURL = ClientModel.getProperty("/Rowset/Row/PLANT");

		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + RefreshDate + "&Content-Type=text/xml", "", false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var oDisplayPrinterConfigModel = new sap.ui.model.xml.XMLModel();
		oDisplayPrinterConfigModel.setSizeLimit(10000);
		oDisplayPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_PrinterConfigTemplates&Param.1=" + userLanguage + "&d=" + RefreshDate + "&Content-Type=text/xml", "", false);
		var oPrinterConfigTable = this.getView().byId("PrinterConfigTable");
		oPrinterConfigTable.setModel(oDisplayPrinterConfigModel);
		this.doColorChangePrinterConfigTable(oPrinterConfigTable);

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Label and Workcenter type/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		var oLine = "BCPSTATUS";
		var oLineModel = new sap.ui.model.xml.XMLModel();

		oLineModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1=" + oLine + "&d=" + RefreshDate + "&Param.4=" + userLanguage + "&Content-Type=text/xml"), "", false);
		var oLineDrop = this.getView().byId("status");
		var oListItem = new sap.ui.core.ListItem();
		oListItem.bindProperty("text", "Value");
		oListItem.bindProperty("key", "Value");
		oLineDrop.bindItems("/Rowset/Row", oListItem);
		oLineDrop.setModel(oLineModel);
		BCPOnStatus = oLineModel.getProperty("/Rowset/Row/Value");
		this.getView().byId("status").setSelectedKeys();
                        

                        //////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var oLine = "LABEL_TYPE";
		var oLineModel = new sap.ui.model.xml.XMLModel();

		oLineModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1=" + oLine + "&d=" + RefreshDate + "&Param.4=" + userLanguage + "&Content-Type=text/xml"), "", false);

		var oLineDrop = this.getView().byId("LabelTypeID");
		var oListItem = new sap.ui.core.ListItem();
		oListItem.bindProperty("text", "Value");
		oListItem.bindProperty("key", "Key");
		oLineDrop.bindItems("/Rowset/Row", oListItem);
		oLineDrop.setModel(oLineModel);
                  ////////////////////////////////////////////////////////////////////////// Material Type////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var oMatType = "MATERIALTYPE";
		var oMatTypeModel = new sap.ui.model.xml.XMLModel();

		oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1=" + oMatType + "&Param.4=" + userLanguage + "&Param.5=" + clientFromURL + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);

		var oMatType = this.getView().byId("MatType");
		var oMatTypeItem = new sap.ui.core.ListItem();
		oMatTypeItem.bindProperty("text", "Value");
		oMatTypeItem.bindProperty("key", "Key");
		oMatType.bindItems("/Rowset/Row", oMatTypeItem);
		oMatType.setModel(oMatTypeModel);


		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Global Template/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		var oGlobal = "GLOBAL_TEMPLATE";
		var oGlobalTemplateModel = new sap.ui.model.xml.XMLModel();
		oGlobalTemplateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1=" + oGlobal + "&d=" + RefreshDate + "&Param.4=" + userLanguage + "&Content-Type=text/xml"), "", false);

		var selGlobalTemplate = this.getView().byId("template");
		var oListItemGlobalTemplate = new sap.ui.core.ListItem();
		oListItemGlobalTemplate.bindProperty("text", "Value");
		oListItemGlobalTemplate.bindProperty("key", "Key");
		selGlobalTemplate.bindItems("/Rowset/Row", oListItemGlobalTemplate);
		selGlobalTemplate.setModel(oGlobalTemplateModel);
		selGlobalTemplate.setSelectedKey("Select Global Template");

		//oResource = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties?refresh="+Math.random()});
		//this.getView().byId("page").setModel(oResource, "PConfig");

		var DateNw = new Date();
		//New code start for Localization default to English/////START
		var details = "PrintMsg_Msg21,Print_BCPStatus,PrintMsg_Msg36,PrintMsg_Msg23,Print_Select_MatType,NPCommon_Enable,Print_Disable,PrintMsg_Msg37,ODATA_Error,Print_Select_Line,Print_Select_Global_Template,Print_Select_LabelType,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,PrintMsg_Msg4,PrintMsg_Msg5,PrintMsg_Msg6,PrintMsg_Msg7,PrintMsg_Msg8,PrintMsg_Msg9,PrintMsg_Msg10,PrintMsg_Msg11,PrintMsg_Msg12,PrintMsg_Msg13,PrintMsg_Msg14,PrintMsg_Msg15,PrintMsg_Msg16,PrintMsg_Msg33,Print_Message,Print_Question,EPO_UI_SUCCESS_MSG,EPO_UI_ERROR_MSG";
		oResource = new sap.ui.model.xml.XMLModel();
		oResource.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

		var page = this.getView().byId("page");
		var identifier = "PConfig1>NPDashboard_Back,PConfig33>Custom_GR_MaterialType,PConfig2>PrinterConfig_Header_Title,PConfig3>Print_PrinterConfiguration,PConfig4>Print_PrimaryPrinterIP,PConfig31>Print_Enable,PConfig32>Print_Disable,PConfig5>Print_PrimaryPrinterPort,PConfig6>Print_PrimaryPrinterName,PConfig7>Print_BackupPrinterIP,PConfig8>Print_BackupPrinterPort,PConfig9>Print_BackupPrinterName,PConfig10>Print_Workcenter,PConfig11>Print_Label_Type,PConfig28>Print_Copies,PConfig12>Print_Global_Template,PConfig13>Print_Add,PConfig14>Print_Update,PConfig15>Print_Delete,PConfig16>Print_Workcenter,PConfig17>Print_PrimaryPrinterIP,PConfig18>Print_PrimaryPrinterPort,PConfig19>Print_PrimaryPrinterName,PConfig20>Print_BackupPrinterIP,PConfig21>Print_BackupPrinterPort,PConfig22>Print_BackupPrinterName,PConfig23>Print_Label_Type,PConfig24>Print_Copies,PConfig25>Print_Global_Template,PConfig26>Print_CreatedBy,PConfig30>Print_Status,PConfig27>Print_Print_ID,PConfig34>Print_SAPDefaultPrinter,PConfig35>Print_SAPDefault";
		localize(page, identifier, userLanguage);

		//New code start for Localization default to English//// END
		var Error = getPropertyValue(oResource, "ODATA_Error");
		var oLineID = this.getView().byId("Line");
		sortinglines(plantFromURL, clientFromURL, userLanguage, oLineID, Error, 1);

		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");

	},
	onAfterRendering: function () {
		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResource, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResource, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
		setInterval(function () {
			oBCPStats = getBCPStatus(bcpElement, "", "");
		}, 30000);
		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell1").getUser().setUsername(username);

	},
	doLogoff1: function () {
		window.open("/XMII/Illuminator?service=logout&target=/XMII/CM/MaterialHandling/PrinterManagementFramework/Page/Printer_Config_Template.irpt", "_self");
	},

	doRowSelect: function (oEvent) {
		this.getView().byId("Add").setEnabled(true);
		this.getView().byId("UpdateID").setEnabled(true);
		this.getView().byId("DeleteID").setEnabled(true);
		this.getView().byId("EnableID").setEnabled(true);
                     
		var oPrinterConfigTable = this.getView().byId("PrinterConfigTable");
		var selected_Item = oPrinterConfigTable.getSelectedContexts();
		var oPrinterConfigModel = oPrinterConfigTable.getModel();
		 obcpstatus=[];
		var oPrinterIP = oPrinterConfigModel.getProperty(selected_Item + "/PRINTER_IP");
		oPrinterID = oPrinterConfigModel.getProperty(selected_Item + "/PRINTER_ID");
		var oPrinterPort = oPrinterConfigModel.getProperty(selected_Item + "/PRINTER_PORT");
		var oPrinterName = oPrinterConfigModel.getProperty(selected_Item + "/PRINTER_DESC");
		var oBackupIP = oPrinterConfigModel.getProperty(selected_Item + "/BACKUP_IP");
		var oBackupPort = oPrinterConfigModel.getProperty(selected_Item + "/BACKUP_PORT");
		var oBackupName = oPrinterConfigModel.getProperty(selected_Item + "/BACKUP_DESC");
		var line = oPrinterConfigModel.getProperty(selected_Item + "/WORKCENTER");
                        var material_type = oPrinterConfigModel.getProperty(selected_Item + "/MATERIAL_TYPE");
                        var isSAPDefaultset = oPrinterConfigModel.getProperty(selected_Item + "/SAPDefault");
                       
		label_type = oPrinterConfigModel.getProperty(selected_Item + "/LABEL_TYPE");
		var copies = oPrinterConfigModel.getProperty(selected_Item + "/COPIES");
		var template = oPrinterConfigModel.getProperty(selected_Item + "/GLOBAL_TEMPLATE_PATH");
		oTemplateID = oPrinterConfigModel.getProperty(selected_Item + "/TEMPLATE_ID");
		var nodeid = oPrinterConfigModel.getProperty(selected_Item + "/NODEID");
                        oLineNodeID=nodeid;
                        obcpstatus=oPrinterConfigModel.getProperty(selected_Item + "/BCP_STATUS");
		var enableStat=oPrinterConfigModel.getProperty(selected_Item + "/ENABLE_STATUS");   
                        this.getView().byId("status").setSelectedKeys(obcpstatus);
		this.handleSelectionChange();//***UserStory 109283 Upadated by Madhu
                        this.getView().byId("id_switchSAPdefPr").setState(Number(isSAPDefaultset)==1);//***UserStory 109283 Upadated by Madhu
		this.getView().byId("PrinterIP").setValue(oPrinterIP);
		this.getView().byId("PrinterPort").setValue(oPrinterPort);
		this.getView().byId("PrinterName").setValue(oPrinterName);
		this.getView().byId("BackupIP").setValue(oBackupIP);
		this.getView().byId("BackupPort").setValue(oBackupPort);
		this.getView().byId("BackupName").setValue(oBackupName);
		this.getView().byId("Line").setSelectedKey(nodeid);
		this.getView().byId("LabelTypeID").setSelectedKey(label_type);
		this.getView().byId("noCopies").setValue(copies);
		this.getView().byId("template").setSelectedKey(template);
                        this.getView().byId("MatType").setSelectedKey(material_type);
		if(enableStat==1){this.getView().byId("EnableID").setText(getPropertyValue(oResource, "Print_Disable"));
			this.getView().byId("EnableID").setType("Reject");
			this.getView().byId("EnableID").setIcon("sap-icon://decline");
			}else{
			this.getView().byId("EnableID").setText(getPropertyValue(oResource, "NPCommon_Enable"));
			this.getView().byId("EnableID").setIcon("sap-icon://accept");
			this.getView().byId("EnableID").setType("Accept");
		}
		getline = this.getView().byId("Line").getSelectedKey();
		if (line == "TO" || line == "MR") {
			this.getView().byId("status").setSelectedKeys(BCPOnStatus);
                                   this.getView().byId("status").setEditable(false);
			//this.getView().byId("status").setEnabled(false);
		} else {
			this.getView().byId("status").setEditable(true);
			
		}

	},

	LineSelectionChange: function () {
		getline = this.getView().byId("Line").getSelectedKey();
		this.getView().byId("status").clearSelection();
		this.getView().byId("id_switchSAPdefPr").setState(false);
		this.getView().byId("id_switchSAPdefPr").setEnabled(false);//***UserStory 109283 Upadated by Madhu

		if (getline == "TO" || getline == "MR") {

			this.getView().byId("status").setSelectedKeys(BCPOnStatus);
			this.getView().byId("status").setEditable(false);
			this.getView().byId("Add").setEnabled(true);
                                  //  this.getView().byId("status").setEnabled(false);
		} else {
                                     this.getView().byId("status").setEditable(true);
			this.getView().byId("Add").setEnabled(true);
			
		}

	},

/***UserStory 109283
****GR Printer config - Ability to have SAP Default printer set by default for particular line
****Upadated by Madhu*/
	handleSelectionChange: function () {

		BCPSelectedStatus = this.getView().byId("status").getSelectedKeys();
		var chkBCPOff=BCPSelectedStatus.indexOf("BCP OFF");
		if(chkBCPOff==-1){
		this.getView().byId("id_switchSAPdefPr").setState(false);
		this.getView().byId("id_switchSAPdefPr").setEnabled(false);
		}else{
		this.getView().byId("id_switchSAPdefPr").setEnabled(true);
		}
	},  

	doAdd: function () {

		var oPrinterIP = this.getView().byId("PrinterIP").getValue();
		var oPrinterPort = this.getView().byId("PrinterPort").getValue();
		var oPrinterName = this.getView().byId("PrinterName").getValue();
		var oBackupIP = this.getView().byId("BackupIP").getValue();
		var oBackupPort = this.getView().byId("BackupPort").getValue();
                        BCPSelectedStatus = this.getView().byId("status").getSelectedKeys();      
		var oBackupName = this.getView().byId("BackupName").getValue();
		var oLine = this.getView().byId("Line").getSelectedItem().getKey();
		var oLabelType = this.getView().byId("LabelTypeID").getSelectedItem().getKey();
		var oGlobalTemp = this.getView().byId("template").getSelectedItem().getKey();
		var oCopies = this.getView().byId("noCopies").getValue();
		MaterialType=this.getView().byId("MatType").getSelectedKey();      
		var isSapDefaultPrinterSet= this.getView().byId("id_switchSAPdefPr").getState();/////UserStory 109283, Upadated by Madhu

		var DateNow = new Date();
		if (BCPSelectedStatus.length==0) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "Print_BCPStatus"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		
		} else{
			validate = this.doValidation();
			if (validate == 1 && BCPSelectedStatus.length!=0) {

				
					var oPrinterConfigModel = new sap.ui.model.xml.XMLModel();
					oPrinterConfigModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Insert_PrinterConfig&Param.1=" + oPrinterIP + "&Param.2=" + oPrinterPort + "&Param.3=" + oPrinterName + "&Param.4=" + oBackupIP + "&Param.5=" + oBackupPort + "&Param.6=" + oBackupName + "&Param.7=" + oLine + "&Param.8=" + oLabelType + "&Param.9=" + oGlobalTemp + "&Param.10=" + oCopies + "&Param.12=0&Param.14=" + BCPSelectedStatus + "&Param.17=" + plantFromURL + "&Param.19=" + MaterialType +"&Param.20=" +isSapDefaultPrinterSet+ "&d=" + DateNow + "&Content-Type=text/xml"), "", false);
				
				if (oPrinterConfigModel.getProperty("/Rowset/Row/O_Success") == 0) {
					sap.m.MessageBox.warning(oPrinterConfigModel.getProperty("/Rowset/Row/O_Msg"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
                                                          
				} else {
					sap.m.MessageBox.success(getPropertyValue(oResource, "PrintMsg_Msg12"),{title: getPropertyValue(oResource, "EPO_UI_SUCCESS_MSG")});

					this.doClear();
				}
				var DateNow = new Date();
				var oDisplayPrinterConfigModel = new sap.ui.model.xml.XMLModel();
				oDisplayPrinterConfigModel.setSizeLimit(10000);
				oDisplayPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_PrinterConfigTemplates&Param.1=" + userLanguage + "&d=" + DateNow + "&Content-Type=text/xml", "", false);
				var oPrinterConfigTable = this.getView().byId("PrinterConfigTable");
				oPrinterConfigTable.setModel(oDisplayPrinterConfigModel);
				oPrinterConfigTable.bindItems("/Rowset/Row", oController.getView().byId("PrinterConfigItems"));
				this.doColorChangePrinterConfigTable(oPrinterConfigTable);
			}
		}
	},

	doUpdate: function () {
		var oPrinterIP = this.getView().byId("PrinterIP").getValue();
		var oPrinterPort = this.getView().byId("PrinterPort").getValue();
		var oPrinterConfigTable = this.getView().byId("PrinterConfigTable");
		var oPrinterName = this.getView().byId("PrinterName").getValue();
		var oBackupIP = this.getView().byId("BackupIP").getValue();
		var oBackupPort = this.getView().byId("BackupPort").getValue();
		var oBackupName = this.getView().byId("BackupName").getValue();
		var oLine = this.getView().byId("Line").getSelectedItem().getKey();
		var oLabelType = this.getView().byId("LabelTypeID").getSelectedItem().getKey();
		var oGlobalTemp = this.getView().byId("template").getSelectedItem().getKey();
		var oCopies = this.getView().byId("noCopies").getValue();
		var selectedIndex = oPrinterConfigTable.indexOfItem(oPrinterConfigTable.getSelectedItem());
		BCPSelectedStatus = this.getView().byId("status").getSelectedKeys();
		var isSapDefaultPrinterSet= this.getView().byId("id_switchSAPdefPr").getState();/////UserStory 109283, Upadated by Madhu
		var oPrinterIP = this.getView().byId("PrinterIP").getValue();
		var oPrinterConfigTable = this.getView().byId("PrinterConfigTable");
		var selected_Item = oPrinterConfigTable.getSelectedContexts();
		var oPrinterConfigModel = oPrinterConfigTable.getModel();
 		var ostatus=oPrinterConfigModel.getProperty(selected_Item + "/ENABLE_STATUS");
                        MaterialType=this.getView().byId("MatType").getSelectedKey();                         
   
                       if (BCPSelectedStatus.length ==0 || BCPSelectedStatus.length==2) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg37"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		
		}  else{
		validate = this.doValidation();

		if (selectedIndex == -1) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg13"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});

		} else if (validate == 1 ) {
			             var DateNow = new Date();
			            var oPrinterConfigModel = new sap.ui.model.xml.XMLModel();
				oPrinterConfigModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Insert_PrinterConfig&Param.1=" + oPrinterIP + "&Param.2=" + oPrinterPort + "&Param.3=" + oPrinterName + "&Param.4=" + oBackupIP + "&Param.5=" + oBackupPort + "&Param.6=" + oBackupName + "&Param.7=" + oLine + "&Param.8=" + oLabelType + "&Param.9=" + oGlobalTemp + "&Param.10=" + oCopies + "&Param.11=" + oPrinterID + "&Param.12=1&Param.13=" + oTemplateID + "&Param.14=" + BCPSelectedStatus + "&Param.15=" + obcpstatus + "&Param.16=" + oLineNodeID + "&Param.17=" + plantFromURL + "&Param.19="+MaterialType+"&Param.20="+isSapDefaultPrinterSet+"&d=" + DateNow + "&Content-Type=text/xml"), "", false);
			
			if (oPrinterConfigModel.getProperty("/Rowset/Row/O_Success") == 0) {
				sap.m.MessageBox.warning(oPrinterConfigModel.getProperty("/Rowset/Row/O_Msg"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
                                               
			} else {
				sap.m.MessageBox.success(getPropertyValue(oResource, "PrintMsg_Msg14"),{title: getPropertyValue(oResource, "EPO_UI_SUCCESS_MSG")});

				this.doClear();
			}
			var oDisplayPrinterConfigModel = new sap.ui.model.xml.XMLModel();
			oDisplayPrinterConfigModel.setSizeLimit(10000);
			oDisplayPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_PrinterConfigTemplates&Param.1=" + userLanguage + "&d=" + DateNow + "&Content-Type=text/xml", "", false);

			oPrinterConfigTable.setModel(oDisplayPrinterConfigModel);
			oPrinterConfigTable.bindItems("/Rowset/Row", oController.getView().byId("PrinterConfigItems"));
			this.doColorChangePrinterConfigTable(oPrinterConfigTable);
                              }
		}
	},
	doDelete: function () {
		var oPrinterIP = this.getView().byId("PrinterIP");
		var oPrinterPort = this.getView().byId("PrinterPort");
		var oPrinterName = this.getView().byId("PrinterName");
		var oBackupIP = this.getView().byId("BackupIP");
		var oBackupPort = this.getView().byId("BackupPort");
		var oBackupName = this.getView().byId("BackupName");
		var oPrinterConfigTable = this.getView().byId("PrinterConfigTable");
		var PrinterConfigItems = this.getView().byId("PrinterConfigItems");
		var Line = this.getView().byId("Line");
                        var oMaterialType=this.getView().byId("MatType");
		var GlobalTemp = this.getView().byId("template");
		var LabelType = this.getView().byId("LabelTypeID");
		var Copies = this.getView().byId("noCopies");
		var oPrinterInput = this.getView().byId("PrinterIP").getValue();
		var LineInput = this.getView().byId("Line").getSelectedItem().getKey();
                        BCPSelectedStatus = this.getView().byId("status").getSelectedKeys();    
                         var BCPStatusInput = this.getView().byId("status");    
		var selectedIndex = oPrinterConfigTable.indexOfItem(oPrinterConfigTable.getSelectedItem());
                         this.getView().byId("searchFieldPrintTableId").setValue("");    
                         if (BCPSelectedStatus.length ==0 || BCPSelectedStatus.length==2) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg37"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		
		}  else{
                        
                                if (BCPSelectedStatus!=obcpstatus){
                                    sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg36"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		

                      }else{

		      if (selectedIndex == -1) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg13"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});

		} else {
			var DateNow = new Date();
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.confirm(getPropertyValue(oResource, "PrintMsg_Msg15"), fnCallbackConfirm, getPropertyValue(oResource, "Print_Question"));

			function fnCallbackConfirm(bResult) {
				if (bResult == true) {

					var oPrinterConfigModel = new sap.ui.model.xml.XMLModel();
					oPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/MDOQ_Delete_PrinterConfig&Param.1=" + oPrinterID + "&d=" + DateNow + "&Content-Type=text/xml", "", false);

					var oPrinterConfigModel = new sap.ui.model.xml.XMLModel();
					oPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/MDOQ_Delete_PrinterTemplate_FromPrinterConfig&Param.1=" + oPrinterID + "&d=" + DateNow + "&Content-Type=text/xml", "", false);


					var oPrinterConfigStatusModel = new sap.ui.model.xml.XMLModel();
					oPrinterConfigStatusModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/MDOQ_Delete_PrinterConfig_Status&Param.1=" + oPrinterID + "&d=" + DateNow + "&Content-Type=text/xml", "", false);


					if (oPrinterConfigModel.getProperty("/FatalError") != "") {
						sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg11"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
					} else {
						sap.m.MessageBox.success(getPropertyValue(oResource, "PrintMsg_Msg16"),{title: getPropertyValue(oResource, "EPO_UI_SUCCESS_MSG")});
						oController.doClear();
					}

					var oDisplayPrinterConfigModel = new sap.ui.model.xml.XMLModel();
					oDisplayPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_PrinterConfigTemplates&Param.1=" + userLanguage + "&d=" + DateNow + "&Content-Type=text/xml", "", false);
					oPrinterConfigTable.setModel(oDisplayPrinterConfigModel);
					oPrinterConfigTable.bindItems("/Rowset/Row", oController.getView().byId("PrinterConfigItems"));
					oController.doColorChangePrinterConfigTable(oPrinterConfigTable);

					oPrinterIP.setValue(null);
					oPrinterPort.setValue(null);
					oPrinterName.setValue(null);
					oBackupIP.setValue(null);
					oBackupPort.setValue(null);
					oBackupName.setValue(null);
					Line.setSelectedKey(getPropertyValue(oResource, "Print_Select_Line"));
					GlobalTemp.setSelectedKey(getPropertyValue(oResource, "Print_Select_Global_Template"));
					LabelType.setSelectedKey(getPropertyValue(oResource, "Print_Select_LabelType"));
					Copies.setValue(null);
                                                           BCPStatusInput.setSelectedKeys(null); 
					oMaterialType.setSelectedKey(getPropertyValue(oResource, "Print_Select_MatType"));
				}
                                           }
			}
		}
	}
},

	toTemplatePage: function () {

		//alert("!");
		var app = sap.ui.getCore().byId("idapp");
		app.to("TemplateManagement", "show");
	},
	goBack: function () {

		window.top.close();

	},
	doEnable:function () {
		var oEnbStatus;
		var oPrinterConfigTable = this.getView().byId("PrinterConfigTable");
		var selected_Item = oPrinterConfigTable.getSelectedContexts();
		var oPrinterConfigModel = oPrinterConfigTable.getModel();
 		var ostatus=oPrinterConfigModel.getProperty(selected_Item + "/ENABLE_STATUS");
			 
		if(ostatus==1){
			oEnbStatus=0;
				}else{
			oEnbStatus=1;
				}
	
		var selectedIndex = oPrinterConfigTable.indexOfItem(oPrinterConfigTable.getSelectedItem());
		BCPSelectedStatus = this.getView().byId("status").getSelectedKeys();

                       if (BCPSelectedStatus.length ==0 || BCPSelectedStatus.length==2) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg37"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		
		}  else{
		

		if (selectedIndex == -1) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg13"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});

		} else{
			             var DateNow = new Date();
			            var oPrinterConfigModel = new sap.ui.model.xml.XMLModel();

				oPrinterConfigModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Insert_PrinterConfig&Param.11=" + oPrinterID + "&Param.12=2&Param.14=" + BCPSelectedStatus + "&Param.18=" + oEnbStatus + "&d=" + DateNow + "&Content-Type=text/xml"), "", false);
			
			if (oPrinterConfigModel.getProperty("/Rowset/Row/O_Success") == 0) {
				sap.m.MessageBox.warning(oPrinterConfigModel.getProperty("/Rowset/Row/O_Msg"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
                                               
			} else {
				sap.m.MessageBox.success(getPropertyValue(oResource, "PrintMsg_Msg14"),{title: getPropertyValue(oResource, "EPO_UI_SUCCESS_MSG")});

				this.doClear();
			}
			var oDisplayPrinterConfigModel = new sap.ui.model.xml.XMLModel();
			oDisplayPrinterConfigModel.setSizeLimit(10000);
			oDisplayPrinterConfigModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_PrinterConfigTemplates&Param.1=" + userLanguage + "&d=" + DateNow + "&Content-Type=text/xml", "", false);

			oPrinterConfigTable.setModel(oDisplayPrinterConfigModel);
			var PrinterConfigItems = this.getView().byId("PrinterConfigItems");
			oPrinterConfigTable.bindItems("/Rowset/Row", PrinterConfigItems);
                              }
		}
},
	doValidation: function () {

		proceed = 0;

		var oPrinterIP = this.getView().byId("PrinterIP").getValue();
		var oPrinterPort = this.getView().byId("PrinterPort").getValue();
		var oPrinterName = this.getView().byId("PrinterName").getValue();
		var oBackupIP = this.getView().byId("BackupIP").getValue();
		var oBackupPort = this.getView().byId("BackupPort").getValue();
		var oBackupName = this.getView().byId("BackupName").getValue();
		//var oLine = this.getView().byId("Line").getSelectedItem().getText();
                        var oLine = this.getView().byId("Line").getSelectedKey();
		var oLabelType = this.getView().byId("LabelTypeID").getSelectedItem().getText();
		var oGlobalTemp = this.getView().byId("template").getSelectedItem().getText();
		var oCopies = this.getView().byId("noCopies").getValue();

		if (oPrinterIP == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg4"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oPrinterPort == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg5"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oPrinterName == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg6"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oBackupIP == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg7"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oBackupPort == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg8"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oBackupName == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg9"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oLine == "" ||oLine == "---" || oLine == getPropertyValue(oResource, "Print_Select_Line")) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg10"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oGlobalTemp == getPropertyValue(oResource, "Print_Select_Global_Template")) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg23"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oLabelType == getPropertyValue(oResource, "Print_Select_LabelType")) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg21"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else if (oCopies == "" || isNaN(oCopies) || oCopies <= 0) {
			sap.m.MessageBox.warning(getPropertyValue(oResource, "PrintMsg_Msg33"), {title: getPropertyValue(oResource, "EPO_UI_ERROR_MSG")});
		} else {
			proceed = 1;
		}

		return proceed;
	},
	onSearchPrint :function(oEvent){
	var sQuery =oEvent.getSource().getValue();
	var oConsTable= this.getView().byId("PrinterConfigTable");
		
			
	var oFilter2 = new sap.ui.model.Filter("WORKCENTER",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter3 = new sap.ui.model.Filter("PRINTER_IP",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter4 = new sap.ui.model.Filter("PRINTER_PORT",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter5 = new sap.ui.model.Filter("PRINTER_DESC",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter6 = new sap.ui.model.Filter("BACKUP_IP",sap.ui.model.FilterOperator.Contains,sQuery);
	var oFilter7 = new sap.ui.model.Filter("BACKUP_PORT",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter9 = new sap.ui.model.Filter("BACKUP_DESC",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter10 = new sap.ui.model.Filter("LABEL_TYPE",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter11 = new sap.ui.model.Filter("COPIES",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter12 = new sap.ui.model.Filter("GLOBAL_TEMPLATE_PATH",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter13 = new sap.ui.model.Filter("CREATED_BY",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter14 = new sap.ui.model.Filter("PRINTER_ID",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter15 = new sap.ui.model.Filter("TEMPLATE_ID",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter16 = new sap.ui.model.Filter("NODEID",sap.ui.model.FilterOperator.Contains,sQuery);
	var oFilter17 = new sap.ui.model.Filter("BCP_STATUS",sap.ui.model.FilterOperator.Contains,sQuery);	
            var oFilter18= new sap.ui.model.Filter("MATERIAL_TYPE",sap.ui.model.FilterOperator.Contains,sQuery);	
	
	var allFilter = new sap.ui.model.Filter([oFilter2,oFilter3,oFilter4, oFilter5,oFilter6,oFilter7,oFilter9,oFilter10,oFilter11,oFilter12,oFilter13,oFilter14,oFilter15,oFilter16,oFilter17,oFilter18], false); 
	oConsTable.getBinding("items").filter(allFilter); 

},

	doColorChangePrinterConfigTable: function (oPrinterConfigTable) {
		var displayItems = oPrinterConfigTable.getItems();
		if (displayItems && displayItems.length > 0) {
			for (var i = 0; i < displayItems.length; i++) {
				if (displayItems[i].getCells()[17].getSrc().indexOf("accept")>0) {
				  displayItems[i].addStyleClass("greyout");
				}
			}
		}
	},
	doClear: function () {

		this.getView().byId("PrinterIP").setValue(null);
		this.getView().byId("PrinterPort").setValue(null);
		this.getView().byId("PrinterName").setValue(null);
		this.getView().byId("BackupIP").setValue(null);
		this.getView().byId("BackupPort").setValue(null);
		this.getView().byId("BackupName").setValue(null);
		this.getView().byId("searchFieldPrintTableId").setValue("");
		this.getView().byId("Line").setSelectedKey(getPropertyValue(oResource, "Print_Select_Line"));
		this.getView().byId("template").setSelectedKey(getPropertyValue(oResource, "Print_Select_Global_Template"));
		this.getView().byId("LabelTypeID").setSelectedKey(getPropertyValue(oResource, "Print_Select_LabelType"));
		this.getView().byId("noCopies").setValue(null);
                        this.getView().byId("status").setSelectedKeys(null);
		this.getView().byId("id_switchSAPdefPr").setState(false);/////UserStory 109283, Upadated by Madhu
		this.getView().byId("id_switchSAPdefPr").setEnabled(false);
                         this.getView().byId("status").setEditable(true); 
		this.getView().byId("PrinterConfigTable").removeSelections();
                       this.getView().byId("MatType").setSelectedKey(getPropertyValue(oResource, "Print_Select_MatType"));

	}
});