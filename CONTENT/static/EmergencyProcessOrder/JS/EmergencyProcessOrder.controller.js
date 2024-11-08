var switchBCPElement, ProgressIndicatorModel, OF, LabelGI, LabelGR, SAPGIProgressBar, SAPGRProgressBar, EPOGIProgressBar, EPOGRProgressBar, bcpElement, POTargetQty, Chart, SAPGR, EPOGR, SAPGI, EPOGI, EPOTargetQty, POStockQty, EPOStockQty, wrkcntrdrp1, nodeFromURL, wrkcntrdrp, text, Error, oController, lineNodeID, PieChartModel, tileBCPElement, oStartDate1, oEndDate1, tabKey, pastDate, curntDate, material2, oAssignTable, oBCPStats, userId, dateFormat, material, userLanguage, strtdateFormat, selectedStartDate1, selectedEndDate1, oTable, enddateFormat, oDisplayFormat, oResourceModel, oControllerselectedStartDate, selectedEndDate;

sap.ui.controller("JS.EmergencyProcessOrder", {


	goHome: function () {

		window.top.close();

	},

	onInit: function () {
		jQuery.sap.require("sap.m.MessageBox");

		var DateNw = new Date();
		oController = this.getView();
		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");

		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

		oControllerThis = this;
		var page = this.getView().byId("pageID");
		var identifier = "title13>CustomGR_GMReport_11,NHPortal5>NPDashboard_Line,title29>EPO_UI_AUDIT,column36>EPO_UI_GIProcess,column35>EPO_UI_GRProcess,title20>EPO_EMM_LINK,title12>EPO_UI_GIGR,column25>EPO_UI_UOM,title7>EPO_UI_EmergencyPO,column24>EPO_UI_CREATE,column13>EPO_AssignedEPO,buttonAssign>EPO_UI_Assign,column12>EPO_SourceEPO,column10>EPO_StartTime,title11>EPO_ReportPO,column9>EPO_SAPOrderNumber,column11>EPO_EmergencyPO,column1>EPO_LastProcessOrder,title5>EPO_CreatePO,column4>EPO_ProductionVersion,column5>NPDashboard_Resource,column7>CustomGI_PO_7,column8>EPO_ControlRecipe,title6>EPO_AssignPO,column33>EPO_UI_GR,column34>EPO_UI_GR,label3>EPO_EndTime,label2>label2>EPO_StartTime,title4>TransferDisplay_title_SelectCriteria,column6>CustomGI_CM_6,button2>TransferDisplay_btn_Clear,column1>CustomGR_GR_2,label7>NPDashboard_Plant,label5>CustomGI_PO_2,column4>CustomGI_CM_6,column3>CustomGI_CL_5,label1>NPM_COMMON_ORD_MATERIAL,button2>TransferDisplay_btn_Clear,button1>TransferDisplay_btn_disp,title3>EPO_EmergencyProcessOrder,title1>NPDashboard_Home,title2>InBndMatRecpt_title_BCP,title4>TransferDisplay_title_SelectCriteria";
		localize(page, identifier, userLanguage);

		var details = "EPO_UI_LAST_EXECUTION_DATE,EPO_UI_END_DATE,NPDashboard_Resource,ODATA_Error,NPDashboard_Success,NPM_COMMON_OK,NPDashboard_BCPStatus,GI_Msg21,EPO_UI_Message2,ODATA_Error,EPO_UI_Message1,NPDAHSBOARD_MB_BLANK_LINE,CustomGR_alert_27,EPO_UI_GI,EPO_UI_GR,EPO_UI_PieChart,EPO_AssignedEPO,EPO_UI_BCPOFFMsg,EPO_UI_AUDIT,EPO_UI_CREATEDBY,EPO_UI_AssignedOn,EPO_UI_AssignedBy,EPO_UI_CreatedOn,CustomGR_alert_4,EPO_UI_TOTAL_MSG,EPO_UI_SUCCESS_MSG,EPO_UI_PROCESSING_MSG,EPO_UI_ERROR_MSG,EPO_Assign,POReport_AlertDate3,EPO_UI_Assign,POReport_AlertDate2,EPO_UI_EmergencyPO,TransferDisplay_Message,EPO_SAPOrderNumber,CustomGI_CL_5,EPO_ReportPO,CustomGR_GR_2,EPO_Creation,CustomGI_CM_6,NPM_COMMON_ORD_MATERIAL,NPDashboard_Success,EPO_UI_PV,EPO_UI_PROD_DATE,EPO_UI_CREATE,EPO_UI_Message1,NPDashboard_Close,CustomGI_CM,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE";

		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		OF = getPropertyValue(oResourceModel, "GI_Msg21");
		LabelGI = getPropertyValue(oResourceModel, "EPO_UI_GI");
		LabelGR = getPropertyValue(oResourceModel, "EPO_UI_GR");
		///////////////////////////////////////Get Plant//////////////////////////////////////////////////

		var PlantModel = new sap.ui.model.xml.XMLModel();
		PlantModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		client = PlantModel.getProperty("/Rowset/Row/CLIENT");
		plantLocale = PlantModel.getProperty("/Rowset/Row/PLANT");


		/////////////////////////////////////////////////Date time picker/////////////////////////////////////////////////////

		var oStartDatePicker = this.getView().byId("StartDate");
		oStartDatePicker.addEventDelegate({
			onAfterRendering: function () {
				var oStartDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oStartDateInner[0].id;
				$('#' + oID).attr("disabled", "disabled");
			}
		}, oStartDatePicker);

		var oEndDatePicker = this.getView().byId("EndDate");
		oEndDatePicker.addEventDelegate({
			onAfterRendering: function () {
				var oEndDateInner = this.$().find('.sapMInputBaseInner');
				var oID = oEndDateInner[0].id;
				$('#' + oID).attr("disabled", "disabled");
			}
		}, oEndDatePicker);

		var oStartDatePicker1 = this.getView().byId("StartDate1");
		oStartDatePicker1.addEventDelegate({
			onAfterRendering: function () {
				var oStartDateInner1 = this.$().find('.sapMInputBaseInner');
				var oID = oStartDateInner1[0].id;
				$('#' + oID).attr("disabled", "disabled");
			}
		}, oStartDatePicker1);

		var oEndDatePicker1 = this.getView().byId("EndDate1");
		oEndDatePicker1.addEventDelegate({
			onAfterRendering: function () {
				var oEndDateInner1 = this.$().find('.sapMInputBaseInner');
				var oID = oEndDateInner1[0].id;
				$('#' + oID).attr("disabled", "disabled");
			}
		}, oEndDatePicker1);

		
		curntDate = new Date();
		pastDate = new Date(curntDate.getFullYear(), curntDate.getMonth(), curntDate.getDate() - 14)
		this.getView().byId("StartDate").setDateValue(pastDate);
		this.getView().byId("EndDate").setDateValue(curntDate);
		this.getView().byId("StartDate1").setDateValue(pastDate);
		this.getView().byId("EndDate1").setDateValue(curntDate);

		var oModelDF = new sap.ui.model.xml.XMLModel();
		oModelDF.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
		oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");

		this.getView().byId("StartDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("EndDate").setDisplayFormat(oDisplayFormat);

		this.getView().byId("StartDate1").setDisplayFormat(oDisplayFormat);
		this.getView().byId("EndDate1").setDisplayFormat(oDisplayFormat);
		oStartDate = this.getView().byId("StartDate").getDateValue();
		oEndDate = this.getView().byId("EndDate").getDateValue();

		oStartDate1 = this.getView().byId("StartDate1").getDateValue();
		oEndDate1 = this.getView().byId("EndDate1").getDateValue();


		dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy HH:mm:ss"
		});
		strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy 00:00:00"
		});
		enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy HH:mm:ss"
		});
		selectedStartDate = strtdateFormat.format(new Date(oStartDate));
		selectedEndDate = enddateFormat.format(new Date(oEndDate));
		selectedStartDate1 = strtdateFormat.format(new Date(oStartDate1));
		selectedEndDate1 = enddateFormat.format(new Date(oEndDate1));

		nodeFromURL = decodeURIComponent(getURLParameter("nodeFromURL"));

		///////////////////////////////////////////Create Table //////////////////////////////////////////////////////////////////////
		wrkcntrdrp = oControllerThis.getView().byId("workcenter1");
		lineNodeID = this.getView().byId("workcenter1").getSelectedKey();
		Error = getPropertyValue(oResourceModel, "ODATA_Error");
		sortinglines(plantLocale, client, userLanguage, wrkcntrdrp, Error, 0);
		oControllerThis.getView().byId("workcenter1").setSelectedKey(nodeFromURL);
		oCreateTable = new sap.ui.model.xml.XMLModel();
		material = this.getView().byId("Inputmat").getValue();

		oCreateTable.attachRequestSent(function () {
			sap.ui.core.BusyIndicator.show(1);
		});
		oCreateTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=CREATE&Param.3=" + selectedStartDate + "&Param.4=" + selectedEndDate + "&Param.5=" + material + "&Param.11=" + nodeFromURL + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);
		oCreateTable.attachRequestCompleted(function () {
			sap.ui.core.BusyIndicator.hide();
		});
		var oDisplayCreateTable = this.getView().byId("CreatePOTable");
		oCreateTable.setSizeLimit(100000);
		oDisplayCreateTable.setModel(oCreateTable);


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	},
	onAfterRendering: function (oEvent) {

		userId = document.getElementById("login").value;

		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////


		$(document).keydown(function (evt) {
			if (evt.keyCode == 13) {
				evt.preventDefault();
				sap.ui.controller("JS.EmergencyProcessOrder").doDisplay();
			}
		});


		setInterval(function () {
			oBCPStats = getBCPStatus(bcpElement, "", "");
		}, 30000);
		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell3").getUser().setUsername(username);

	},


	///////////////////////////////////////////////////////////////////////////Tab switch //////////////////////////////////////////////////////////

	doSwitchTab: function () {
		var oTab = this.getView().byId("idIconTabBar");
		tabKey = oTab.getSelectedKey();


		if (tabKey == "EmergencyProcessOrder--AssignPO") {


			wrkcntrdrp = oControllerThis.getView().byId("workcenter");
			lineNodeID = this.getView().byId("workcenter").getSelectedKey();
			Error = getPropertyValue(oResourceModel, "ODATA_Error");
			sortinglines(plantLocale, client, userLanguage, wrkcntrdrp, Error, 0);
			oControllerThis.getView().byId("workcenter").setSelectedKey(nodeFromURL);
			this.ResourceChangeAssign();

			oAssignTable = new sap.ui.model.xml.XMLModel();
			this.getView().byId("InputSAPPO").setValue("");
			this.getView().byId("Inputmat2").setValue("");
			oAssignTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(1);
			});
			oAssignTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfSAPOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=" + lineNodeID + "&Param.3=" + selectedStartDate1 + "&Param.4=" + selectedEndDate1 + "&Param.6=" + plantLocale + "&Param.8=" + client + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);
			oAssignTable.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
			var oDisplayAssignTable = this.getView().byId("AssignPO_TableId");
			oAssignTable.setSizeLimit(100000);
			oDisplayAssignTable.setModel(oAssignTable);

		}  else if (tabKey == "EmergencyProcessOrder--ReportEPO") {
			wrkcntrdrp = oControllerThis.getView().byId("workcenter2");
			
			lineNodeID = this.getView().byId("workcenter2").getSelectedKey();
			Error = getPropertyValue(oResourceModel, "ODATA_Error");
			sortinglines(plantLocale, client, userLanguage, wrkcntrdrp, Error, 0);
			oControllerThis.getView().byId("workcenter2").setSelectedKey(nodeFromURL);
			this.ResourceChangeReport();

			var oReportTable = new sap.ui.model.xml.XMLModel();
			oReportTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(1);
			});

			oReportTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=REPORT&Param.11=" + lineNodeID + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);

			oReportTable.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
			var oDisplayReportTable = this.getView().byId("ReportEPO_TableId");
			oReportTable.setSizeLimit(100000);
			oDisplayReportTable.setModel(oReportTable);


		} else if (tabKey == "EmergencyProcessOrder--CreatePOTab") {
			wrkcntrdrp = oControllerThis.getView().byId("workcenter1");
			lineNodeID = this.getView().byId("workcenter1").getSelectedKey();
			Error = getPropertyValue(oResourceModel, "ODATA_Error");
			sortinglines(plantLocale, client, userLanguage, wrkcntrdrp, Error, 0);
			oControllerThis.getView().byId("workcenter1").setSelectedKey(nodeFromURL);
			this.ResourceChangeCreate();

			this.getView().byId("Inputmat").setValue("");
			oCreateTable = new sap.ui.model.xml.XMLModel();

			oCreateTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(1);
			});
			oCreateTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=CREATE&Param.3=" + selectedStartDate + "&Param.4=" + selectedEndDate + "&Param.11=" + lineNodeID + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);
			oCreateTable.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
			var oDisplayCreateTable = this.getView().byId("CreatePOTable");
			oCreateTable.setSizeLimit(100000);
			oDisplayCreateTable.setModel(oCreateTable);
		}
	},

	ResourceChangeAssign: function () {
		lineNodeID = this.getView().byId("workcenter").getSelectedKey();

	},
	ResourceChangeCreate: function () {
		lineNodeID = this.getView().byId("workcenter1").getSelectedKey();

	},
	ResourceChangeReport: function () {
		lineNodeID = this.getView().byId("workcenter2").getSelectedKey();
		if (lineNodeID == "" || lineNodeID == null || lineNodeID == undefined) {
			sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"),{title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
		} else {
			var oReportTable = new sap.ui.model.xml.XMLModel();
			oReportTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(1);
			});

			oReportTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=REPORT&Param.11=" + lineNodeID + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);
			oReportTable.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
			var oDisplayReportTable = this.getView().byId("ReportEPO_TableId");
			oReportTable.setSizeLimit(100000);
			oDisplayReportTable.setModel(oReportTable);
		}
	},

	onSearch: function (oEvent) {
		var sQuery = oEvent.getSource().getValue();
		var oDisplayTable = this.getView().byId("CreatePOTable");
		var oFilter1 = new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter2 = new sap.ui.model.Filter("PV", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("RESOURCE", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("MATERIALDESC", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("LASTUSED", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("PROCESSORDER", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("QUANTITY", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter8 = new sap.ui.model.Filter("CR", sap.ui.model.FilterOperator.Contains, sQuery);
		var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8], false);

		oDisplayTable.getBinding("rows").filter(allFilter);
	},


	onAssignSearch: function (oEvent) {
		var sQuery = oEvent.getSource().getValue();
		var oDisplayAssignTable = this.getView().byId("AssignPO_TableId");
		var oFilter1 = new sap.ui.model.Filter("PROCESSORDER", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter2 = new sap.ui.model.Filter("PROCESSORDER", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("PV", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("RESOURCE", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("MATERIALDESC", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("STATTIME", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter8 = new sap.ui.model.Filter("QUANTITY", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter9 = new sap.ui.model.Filter("UOM", sap.ui.model.FilterOperator.Contains, sQuery);
		var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9], false);

		oDisplayAssignTable.getBinding("rows").filter(allFilter);
	},

	

	onReportSearch: function (oEvent) {
		var sQuery = oEvent.getSource().getValue();
		var oDisplayAssignTable = this.getView().byId("ReportEPO_TableId");
		var oFilter1 = new sap.ui.model.Filter("EmergencyPO", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter2 = new sap.ui.model.Filter("SourcePO", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("AssignedPO", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("MAKTX", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("ProductionVersion", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("Resource", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter8 = new sap.ui.model.Filter("Quantity", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter9 = new sap.ui.model.Filter("Uom", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter10 = new sap.ui.model.Filter("PlannedStartDate", sap.ui.model.FilterOperator.Contains, sQuery);

		var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10], false);

		oDisplayAssignTable.getBinding("rows").filter(allFilter);


	},


	DisplayCreateTableData: function () {
		this.ResourceChangeCreate();
		if (lineNodeID == "" || lineNodeID == null || lineNodeID == undefined) {
			sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"),{title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
		} else {

			var material = this.getView().byId("Inputmat").getValue();
			oCreateTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(1);
			});
			oCreateTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=CREATE&Param.3=" + selectedStartDate + "&Param.4=" + selectedEndDate + "&Param.5=" + material + "&Param.11=" + lineNodeID + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);
			oCreateTable.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
			var oDisplayCreateTable = this.getView().byId("CreatePOTable");
			oCreateTable.setSizeLimit(100000);
			oDisplayCreateTable.setModel(oCreateTable);
		}
	},

	DisplayAssignTableData: function () {
		this.ResourceChangeAssign();
		if (lineNodeID == "" || lineNodeID == null || lineNodeID == undefined) {
			sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), {title:getPropertyValue(oResourceModel, "NPDashboard_Error")});
		} else {
			var InputSAPOrder = this.getView().byId("InputSAPPO").getValue();

			var material2 = this.getView().byId("Inputmat2").getValue();
			oAssignTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(1);
			});
			oAssignTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfSAPOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=" + lineNodeID + "&Param.3=" + selectedStartDate1 + "&Param.4=" + selectedEndDate1 + "&Param.5=" + material2 + "&Param.6=" + plantLocale + "&Param.7=" + InputSAPOrder + "&Param.8=" + client + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);
			oAssignTable.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
			var oDisplayAssignTable = this.getView().byId("AssignPO_TableId");
			oAssignTable.setSizeLimit(100000);
			oDisplayAssignTable.setModel(oAssignTable);
		}
	},


	getCRXML: function (oEvent) {
		wrkcntrdrp = oControllerThis.getView().byId("workcenter1");
		lineNodeID = this.getView().byId("workcenter1").getSelectedKey();
		Error = getPropertyValue(oResourceModel, "ODATA_Error");
		sortinglines(plantLocale, client, userLanguage, wrkcntrdrp, Error, 0);
		oControllerThis.getView().byId("workcenter1").setSelectedKey(nodeFromURL);
		this.ResourceChangeCreate();
		var oCells = oEvent.getSource().getParent().getCells();
		var selectedMat = oCells[0].getText();
		var selectedPV = oCells[1].getText();
		var selectedresource = oCells[2].getText();
		var crid = oEvent.getSource().getText();
		window.open(encodeURI("/XMII/Runner?Transaction=MaterialHandling/EmergencyProcessOrder/Transaction/BLS_GetListOfOrders&I_Action=GETXML&I_Material=" + selectedMat + "&I_Resource=" + selectedresource + "&I_ProductionVersion=" + selectedPV + "&I_NodeID=" + lineNodeID + "&OutputParameter=O_OutputXML&Content-type=text/xml"));

	},

	pressGetEMMLinkFn: function () {
		window.open(encodeURI("/XMII/CM/NestleDashboardUtility/HTML/ExtendedMessageMonitor.html"));
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////Create Dialog////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	CreateEPO: function (oEvent) {
		if (oBCPStats == "1") {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "EPO_UI_BCPOFFMsg"), {title: getPropertyValue(oResourceModel, "NPDashboard_Warning")});

		} else {
			var oCells = oEvent.getSource().getParent().getCells();
			var selectedPO = oCells[5].getText();
			var selectedMat = oCells[0].getText();
			var selectedPV = oCells[1].getText();
			var selectedDesc = oCells[3].getText();
			var selectedQuantity = oCells[6].getText();
			var selectedResource = oCells[2].getText();

			///////////////////////////////////////////////// Dialog Content ///////////////////////////////////////////////////////////////////
			var selectedUom = selectedQuantity.substring(selectedQuantity.indexOf(" ") + 1, selectedQuantity.length);
			selectedQuantity = selectedQuantity.substring(0, selectedQuantity.indexOf(" "));


			var matInput = new sap.m.Input({
				id: "input1",
				editable: false
			});
			matInput.setValue(selectedMat);

			var descInput = new sap.m.Input({
				id: "input2",
				editable: false
			});
			descInput.setValue(selectedDesc);

			var pvInput = new sap.m.Input({
				id: "input3",
				editable: false
			});
			pvInput.setValue(selectedPV);

			var oQtyInput = new sap.m.Input({
				id: "input4",
				width: "90%",
				editable: true,
				liveChange: validateQuantity

			});
			oQtyInput.setValue(selectedQuantity);
			var oUomInput = new sap.m.Input({
				id: "input5",
				width: "40%",
				editable: false
			});
			oUomInput.setValue(selectedUom);


			/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////

			var DateNw = new Date();
			prodDatePicker = new sap.m.DatePicker({
				id: "EPOStartDate",
				type: "DateTime",
				valueFormat: "MM/dd/yyyy 00:00:00",
				displayFormat: oDisplayFormat,
				width: "50%",
				change: function() {
       				
				sap.ui.controller("JS.EmergencyProcessOrder").handleEPOStartDateChange();
   				 },
				editable: true
			});
			jQuery.sap.require("sap.ui.core.format.DateFormat");
			var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MM/dd/yyyy 00:00:00"
			});

			var datenowNow = timeFormat.format(new Date(DateNw));
			prodDatePicker.setValue(datenowNow);


			prodDatePicker.addEventDelegate({
				onAfterRendering: function () {
					var oDateInner = this.$().find('.sapMInputBaseInner');
					var oID = oDateInner[0].id;
					$('#' + oID).attr("disabled", "disabled");
				}
			}, prodDatePicker);
				
			

			prodDateEndPicker = new sap.m.DatePicker({

				type: "DateTime",
				id: "EPOEndDate",
				valueFormat: "MM/dd/yyyy 23:59:59",
				displayFormat: oDisplayFormat,
				width: "50%",
				change: function() {
       				
				sap.ui.controller("JS.EmergencyProcessOrder").handleEPOStartDateChange();
   				 },
				editable: true
			});
			jQuery.sap.require("sap.ui.core.format.DateFormat");
			var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MM/dd/yyyy 23:59:59"
			});

			var datenowNow = timeFormat.format(new Date(DateNw));
		prodDateEndPicker.setValue(datenowNow);


			prodDateEndPicker.addEventDelegate({
				onAfterRendering: function () {
					var oDateInner = this.$().find('.sapMInputBaseInner');
					var oID = oDateInner[0].id;
					$('#' + oID).attr("disabled", "disabled");
				}
			}, prodDateEndPicker);



			
			/////////////////////////////////////////////////// Form - Emergency PO Creation////////////////////////////////////////////////////////////
			var oLayoutLabel = new sap.ui.layout.form.ResponsiveGridLayout({
				labelSpanL: 5,
				labelSpanM: 5,
				labelSpanS: 5,
				emptySpanL: 0,
				emptySpanM: 0,
				emptySpanS: 0,
				columnsL: 1,
				columnsM: 1,
			});

			var oForm = new sap.ui.layout.form.Form({
				id: "createFrm",
				layout: oLayoutLabel,
				editable: true,
				formContainers: [

					new sap.ui.layout.form.FormContainer({
						formElements: [

							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_MATERIAL"),
								fields: [matInput]
							}),
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "CustomGI_CL_5"),
								fields: [descInput]
							}),
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "EPO_UI_PV"),
								fields: [pvInput]
							}),
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "CustomGI_CM_6"),
								fields: [oQtyInput, oUomInput]

							}),
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "EPO_UI_LAST_EXECUTION_DATE"),
								fields: [prodDatePicker]
							}),
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "EPO_UI_END_DATE"),
								fields: [prodDateEndPicker]
							})
						]
					})
				]
			});

			oLayoutLabel.addStyleClass("epoCreateFrm");

			
			var oDialogEPO = new sap.m.Dialog({
				title: getPropertyValue(oResourceModel, "EPO_Creation"),
				draggable: true,
				resizable: true,
				content: [oForm],
				buttons: [
					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "EPO_UI_CREATE"),
						press: function () {
///////////////////////////////////////////////////////////////////////////////////////Date validation/////////////////////////////////////////////////////////////////////////////////////


		var oStartDateEPO = sap.ui.getCore().byId("EPOStartDate").getDateValue();
		var oEndDateEPO = sap.ui.getCore().byId("EPOEndDate").getDateValue();
		selectedStartDate = strtdateFormat.format(new Date(oStartDateEPO));
		selectedEndDate = enddateFormat.format(new Date(oEndDateEPO));
		var DateNow = dateFormat.format(new Date());

		if (new Date(oStartDateEPO).getTime() > new Date(oEndDateEPO).getTime()) {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate3"), {title:getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else {
			
		

////////////////////////////////////////////////////////////////////////////////////////////End/////////////////////////////////////////////////////////////////////////////////////////////////////////////

							var ProdDate = prodDatePicker.getValue();
							var ProdEndDate= prodDateEndPicker.getValue();

							var Qty = oQtyInput.getValue();
							if (Qty <= 0 || Qty == "") {

								sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CustomGR_alert_4"), { title:getPropertyValue(oResourceModel, "NPDashboard_Error")});
							} else {
								var CreateInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><CreateEPOInputXml><SourcePO>" + selectedPO + "</SourcePO><Uom>" + selectedUom + "</Uom><Material>" + selectedMat + "</Material><Resource>" + selectedResource + "</Resource><ProductionVersion>" + selectedPV + "</ProductionVersion><Quantity>" + Qty + "</Quantity><PlannedStartDate>" + ProdDate + "</PlannedStartDate><PlannedEndDate>" + ProdEndDate + "</PlannedEndDate><Action>CREATE</Action><Language>" + userLanguage + "</Language></CreateEPOInputXml>"
								var oCreateModel = new sap.ui.model.xml.XMLModel();

								oCreateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_CreateEmergencyPO&Param.1=" + CreateInputXML + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);

								var oStatus = oCreateModel.getProperty("/Rowset/Row/Status");
								var oMessage = oCreateModel.getProperty("/Rowset/Row/Message");
								if (oStatus == "SUCCESS") {
									sap.m.MessageBox.success(oMessage,{title: getPropertyValue(oResourceModel, "NPDashboard_Success")});
								} else {
									sap.m.MessageBox.error(oMessage, {title: getPropertyValue(oResourceModel, "NPDashboard_Error")});

								}

								oDialogEPO.destroy();
							}
						}
						}
					}),


					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
						press: function () {
							oDialogEPO.close();
							oDialogEPO.destroy();
						}
					})
				]
			});
			oDialogEPO.onAfterRendering = function () {
				if (sap.m.Dialog.prototype.onAfterRendering) {
					sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
				}
				var footer = this.$().find('footer');
				var spacer = footer.find('.sapMTBSpacer');
				var spacerFlex = footer.find('.sapMTBSpacerFlex');
				var firstBtn = $(footer.find('button')[0]);
				var secondBtn = $(footer.find('button')[1]);
				spacer.remove();
				spacer.insertAfter(firstBtn);
				

			};

			oDialogEPO.setContentWidth("550px");
			oDialogEPO.setContentHeight("330px");
			oDialogEPO.setDraggable(true);
			oDialogEPO.open();
			
		}
	},
	//////////////////////////////////////////////////////////////////////////////////////////////////////////Assign Dialog////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	AssignEPO: function (oEvent) {


		var selectedItem = oEvent.getSource().getType();

		if (selectedItem == "Accept") {

			var oCells = oEvent.getSource().getParent().getCells();
			var selectedSAPO = oCells[1].getText();
			var selectedMat = oCells[2].getText();
			var selectedPV = oCells[3].getText();
			var selectedResource = oCells[4].getText();
			var selectedQuantity = oCells[7].getText();
			var selectedUom = selectedQuantity.substring(selectedQuantity.indexOf(" ") + 1, selectedQuantity.length);
			selectedQuantity = selectedQuantity.substring(0, selectedQuantity.indexOf(" "));
			//////////////////////////////////////////////////////////////////////////////
			var oEPOListModel = new sap.ui.model.xml.XMLModel();
			var refresh = new Date();
			var EPOInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><Rowsets><Rowset><Row><AUFNR>" + selectedSAPO + "</AUFNR><ARBPL>" + selectedResource + "</ARBPL><MATNR>" + selectedMat + "</MATNR><PLNNR>" + selectedPV + "</PLNNR></Row></Rowset></Rowsets>"
			oEPOListModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfEPO&OutputParameter=O_OutputXML&Param.1=" + EPOInputXML + "&Param.2=" + userLanguage + "&Param.3=" + client + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
			var currentEPO = oEPOListModel.getProperty("/Rowset/Row/EmergencyPO");

			var SAPOInput = new sap.m.Input({

				editable: false
			});
			SAPOInput.setValue(selectedSAPO);


			var matInput = new sap.m.Input({

				editable: false
			});
			matInput.setValue(selectedMat);

			var resourceInput = new sap.m.Input({

				editable: false
			});
			resourceInput.setValue(selectedResource);

			var EPODrpdown = new sap.m.Select({
				width: "150px",
				selectedKey: currentEPO,
				change: function (oEvent) {
					var refresh = new Date();
					var selectedItem = oEvent.getSource().getSelectedItem();
					var key = selectedItem.getKey();
					text = selectedItem.getText();
					PieChartModel = new sap.ui.model.xml.XMLModel();
					PieChartModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetGIGRDetailsByOrder&Param.1=" + userLanguage + "&Param.2=" + (selectedSAPO + "," + text) + "&Param.3=" + selectedQuantity + "&Param.4=CHART&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
					PieVizChart.setModel(PieChartModel);

					SAPGI = PieChartModel.getProperty("/Rowset/Row/0/Value");
					SAPGR = PieChartModel.getProperty("/Rowset/Row/1/Value");
					EPOGI = PieChartModel.getProperty("/Rowset/Row/2/Value");
					EPOGR = PieChartModel.getProperty("/Rowset/Row/3/Value");


					ProgressIndicatorModel = new sap.ui.model.xml.XMLModel();
					ProgressIndicatorModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetGIGRDetailsByOrder&Param.1=" + userLanguage + "&Param.2=" + (selectedSAPO + "," + text) + "&Param.3=" + selectedQuantity + "&Param.4=BAR&cache=" + new Date() + "&Content-Type=text/xml"), "", false);

					POTargetQty = ProgressIndicatorModel.getProperty("/Rowset/Row/0/Value");
					EPOTargetQty = ProgressIndicatorModel.getProperty("/Rowset/Row/1/Value");
					POStockQty = ProgressIndicatorModel.getProperty("/Rowset/Row/2/Value");
					EPOStockQty = ProgressIndicatorModel.getProperty("/Rowset/Row/3/Value");


					SAPGI = sap.oee.ui.Formatter.formatQuantityValue(SAPGI);
					POStockQty = sap.oee.ui.Formatter.formatQuantityValue(POStockQty);
					SAPGR = sap.oee.ui.Formatter.formatQuantityValue(SAPGR);
					POTargetQty = sap.oee.ui.Formatter.formatQuantityValue(POTargetQty);
					EPOGI = sap.oee.ui.Formatter.formatQuantityValue(EPOGI);
					EPOStockQty = sap.oee.ui.Formatter.formatQuantityValue(EPOStockQty);
					EPOGR = sap.oee.ui.Formatter.formatQuantityValue(EPOGR);
					EPOTargetQty = sap.oee.ui.Formatter.formatQuantityValue(EPOTargetQty);


					SAPGIProgressBar.setPercentValue(Number(SAPGI));
					SAPGRProgressBar.setPercentValue(Number(SAPGR));
					EPOGIProgressBar.setPercentValue(Number(EPOGI));
					EPOGRProgressBar.setPercentValue(Number(EPOGR));

					SAPGIProgressBar.setDisplayValue(LabelGI + ":" + POStockQty);
					SAPGRProgressBar.setDisplayValue(LabelGR + ":" + POTargetQty);
					EPOGIProgressBar.setDisplayValue(LabelGI + ":" + EPOStockQty);
					EPOGRProgressBar.setDisplayValue(LabelGR + ":" + EPOTargetQty);

				}
			});


			//////////////////////////////////////////////////////////////////////////////////////////////PIE CHART///////////////////////////////////////////////////////////////////////////////////////////////
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					axis: 1,
					name: 'PO',
					value: "{PO}",

				}],
				measures: [{
						name: 'Quantity',
						value: '{Value}'
					}

				],
				data: {
					path: "/Rowset/Row"
				}
			});

			var legendPosition = new sap.viz.ui5.types.Legend({
				layout: {
					position: "right"
				}
			});


			var PieVizChart = new sap.viz.ui5.Pie({
				width: "500px",
				height: "300px",
				title: {},
				dataset: oDataset,
				legendGroup: legendPosition,


				dataLabel: {
					positionPreference: true,
					automaticInOutside: true,
					outsideVisible: true,
					position: 'outside',
					visible: true,
					type: 'string',

				},

			});
			var selectedEPO = EPODrpdown.getSelectedKey();
			PieChartModel = new sap.ui.model.xml.XMLModel();
			PieChartModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetGIGRDetailsByOrder&Param.1=" + userLanguage + "&Param.2=" + (selectedSAPO + "," + selectedEPO) + "&Param.3=" + selectedQuantity + "&Param.4=CHART&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
			PieVizChart.setModel(PieChartModel);

			var oListItemEPO = new sap.ui.core.ListItem();
			oListItemEPO.bindProperty("text", "EmergencyPO");
			oListItemEPO.bindProperty("key", "EmergencyPO");
			EPODrpdown.bindItems("/Rowset/Row", oListItemEPO);
			EPODrpdown.setModel(oEPOListModel);
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			SAPGI = PieChartModel.getProperty("/Rowset/Row/0/Value");
			SAPGR = PieChartModel.getProperty("/Rowset/Row/1/Value");
			EPOGI = PieChartModel.getProperty("/Rowset/Row/2/Value");
			EPOGR = PieChartModel.getProperty("/Rowset/Row/3/Value");


			if (SAPGR == 0 && SAPGI == 0 && EPOGR == 0 && EPOGI == 0) {
				var message = getPropertyValue(oResourceModel, "EPO_UI_Message2");

				var visiblemessage = new sap.m.Text({
					text: message

				});

				visiblemessage.addStyleClass("addColor");

				Chart = visiblemessage;


			} else {
				Chart = PieVizChart;

			}

			///////////////////////////////////////////////////////////////////////////////////PROGRESS INDICATOR ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			var selectedEPO = EPODrpdown.getSelectedKey();

			ProgressIndicatorModel = new sap.ui.model.xml.XMLModel();
			ProgressIndicatorModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetGIGRDetailsByOrder&Param.1=" + userLanguage + "&Param.2=" + (selectedSAPO + "," + selectedEPO) + "&Param.3=" + selectedQuantity + "&Param.4=BAR&cache=" + new Date() + "&Content-Type=text/xml"), "", false);

			POTargetQty = ProgressIndicatorModel.getProperty("/Rowset/Row/0/Value");
			EPOTargetQty = ProgressIndicatorModel.getProperty("/Rowset/Row/1/Value");
			POStockQty = ProgressIndicatorModel.getProperty("/Rowset/Row/2/Value");
			EPOStockQty = ProgressIndicatorModel.getProperty("/Rowset/Row/3/Value");


			SAPGI = sap.oee.ui.Formatter.formatQuantityValue(SAPGI);
			POStockQty = sap.oee.ui.Formatter.formatQuantityValue(POStockQty);
			SAPGR = sap.oee.ui.Formatter.formatQuantityValue(SAPGR);
			POTargetQty = sap.oee.ui.Formatter.formatQuantityValue(POTargetQty);
			EPOGI = sap.oee.ui.Formatter.formatQuantityValue(EPOGI);
			EPOStockQty = sap.oee.ui.Formatter.formatQuantityValue(EPOStockQty);
			EPOGR = sap.oee.ui.Formatter.formatQuantityValue(EPOGR);
			EPOTargetQty = sap.oee.ui.Formatter.formatQuantityValue(EPOTargetQty);

			SAPGIProgressBar = new sap.ui.commons.ProgressIndicator({

				width: "200px",
				height: "100px",
				percentValue: Number(SAPGI),
				displayValue: LabelGI + ":" + POStockQty,
				showValue: true,
				state: "Success"

			});
			SAPGRProgressBar = new sap.ui.commons.ProgressIndicator({

				width: "200px",
				height: "100px",
				percentValue: Number(SAPGR),
				displayValue: LabelGR + ":" + POTargetQty,
				showValue: true,
				state: "Success"

			});

			EPOGIProgressBar = new sap.ui.commons.ProgressIndicator({

				width: "200px",
				height: "100px",
				percentValue: Number(EPOGI),
				displayValue: LabelGI + ":" + EPOStockQty,
				showValue: true
			});

			EPOGRProgressBar = new sap.ui.commons.ProgressIndicator({

				width: "200px",
				height: "100px",
				percentValue: Number(EPOGR),
				displayValue: LabelGR + ":" + EPOTargetQty,
				showValue: true
			});


			/////////////////////////////////////////////////// Form - Emergency PO Assign////////////////////////////////////////////////////////////
			var oLayoutLabel = new sap.ui.layout.form.ResponsiveGridLayout({

			});

			var oForm = new sap.ui.layout.form.Form({
				id: "AssignFrm",

				layout: oLayoutLabel,
				editable: true,
				formContainers: [

					new sap.ui.layout.form.FormContainer({
						formElements: [

							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_MATERIAL"),
								fields: [matInput]
							}),

							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "NPDashboard_Resource"),
								fields: [resourceInput]
							}),
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "EPO_SAPOrderNumber"),
								fields: [SAPOInput, SAPGRProgressBar, SAPGIProgressBar]

							}),

							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "EPO_UI_EmergencyPO"),
								fields: [EPODrpdown, EPOGRProgressBar, EPOGIProgressBar]
							}),


							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "EPO_UI_PieChart"),
								fields: [Chart]
							})
						]
					})
				]
			});


			oLayoutLabel.addStyleClass("epoAssignFrm");


			var oDialogAssignEPO = new sap.m.Dialog({

				title: getPropertyValue(oResourceModel, "EPO_Assign"),
				draggable: true,
				resizable: true,
				content: [oForm],

				buttons: [
					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "EPO_UI_Assign"),

						press: function () {

							var selectedEPO = EPODrpdown.getSelectedKey();
							var AssignInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><AssignEPOInputXml><AssignedPO>" + selectedSAPO + "</AssignedPO><EmergencyPO>" + selectedEPO + "</EmergencyPO><Language>" + userLanguage + "</Language></AssignEPOInputXml>"
							var AssignModel = new sap.ui.model.xml.XMLModel();
							AssignModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_AssignEmergencyPO&Param.1=" + AssignInputXML + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
							var oStatus = AssignModel.getProperty("/Rowset/Row/Status");
							var oMessage = AssignModel.getProperty("/Rowset/Row/Message");
							if (oStatus == "SUCCESS") {

								//sap.m.MessageBox.success(oMessage, sap.m.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));

								sap.m.MessageBox.show(oMessage, {
									icon: sap.m.MessageBox.Icon.SUCCESS,
									title: getPropertyValue(oResourceModel, "NPDashboard_Success"),
									actions: getPropertyValue(oResourceModel, "NPM_COMMON_OK"),
									onClose: function (oAction) {
										oControllerThis.DisplayAssignTableData();
									}
								});
							} else {
								sap.m.MessageBox.error(oMessage,{ title: getPropertyValue(oResourceModel, "NPDashboard_Error")});

							}

							oDialogAssignEPO.destroy();
						}
					}),


					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
						press: function () {

							oDialogAssignEPO.close();
							oDialogAssignEPO.destroy();

						}
					})
				]
			});
			oDialogAssignEPO.onAfterRendering = function () {
				if (sap.m.Dialog.prototype.onAfterRendering) {
					sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
				}
				var footer = this.$().find('footer');
				var spacer = footer.find('.sapMTBSpacer');
				var spacerFlex = footer.find('.sapMTBSpacerFlex');
				var firstBtn = $(footer.find('button')[0]);
				var secondBtn = $(footer.find('button')[1]);
				spacer.remove();
				spacer.insertAfter(firstBtn);

			};

			oDialogAssignEPO.setContentWidth("900px");
			oDialogAssignEPO.setContentHeight("540px");
			oDialogAssignEPO.setDraggable(true);
			oDialogAssignEPO.open();


		} else {

			sap.m.MessageBox.information(getPropertyValue(oResourceModel, "EPO_UI_Message1"), {title : getPropertyValue(oResourceModel, "NPDashboard_Information")});

		}

	},

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



	handleEPOStartDateChange: function () {


		var oStartDateEPO = sap.ui.getCore().byId("EPOStartDate").getDateValue();
		var oEndDateEPO = sap.ui.getCore().byId("EPOEndDate").getDateValue();
		selectedStartDate = strtdateFormat.format(new Date(oStartDateEPO));
		selectedEndDate = enddateFormat.format(new Date(oEndDateEPO));
		var DateNow = dateFormat.format(new Date());

		if (new Date(oStartDateEPO).getTime() > new Date(oEndDateEPO).getTime()) {
			
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate3"), {
 		   title: getPropertyValue(oResourceModel, "NPDashboard_Warning")                              
   
		});
		} else if (((new Date(oEndDateEPO).getTime() - new Date(oStartDateEPO).getTime()) / (1000 * 60 * 60 * 24)) > 60) {
			this.getView().byId("EPOStartDate").setDateValue(oStartDateEPO);
			this.getView().byId("EPOStartDate").setDisplayFormat(oDisplayFormat);

			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate2"),{   title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else {
			oStartDateEPO = this.getView().byId("EPOStartDate").getDateValue();
		}

	},
	handleStartDateChange: function (oEvent) {


		var oCreateStartDate = this.getView().byId("StartDate").getDateValue();
		var oCreateEndDate = this.getView().byId("EndDate").getDateValue();
		selectedStartDate = strtdateFormat.format(new Date(oCreateStartDate));
		selectedEndDate = enddateFormat.format(new Date(oCreateEndDate));
		var DateNow = dateFormat.format(new Date());

		if (new Date(oCreateStartDate).getTime() > new Date(oCreateEndDate).getTime()) {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate3"),{   title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else if (((new Date(oCreateEndDate).getTime() - new Date(oCreateStartDate).getTime()) / (1000 * 60 * 60 * 24)) > 60) {
			this.getView().byId("StartDate").setDateValue(oStartDate);
			this.getView().byId("StartDate").setDisplayFormat(oDisplayFormat);

			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate2"),  {  title: getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else {
			oStartDate = this.getView().byId("StartDate").getDateValue();
		}

	},
	handleEndDateChange: function (oEvent) {


		var oCreateStartDate = this.getView().byId("StartDate").getDateValue();
		var oCreateEndDate = this.getView().byId("EndDate").getDateValue();
		selectedStartDate = strtdateFormat.format(new Date(oCreateStartDate));
		selectedEndDate = enddateFormat.format(new Date(oCreateEndDate));
		var DateNow = dateFormat.format(new Date());

		if (new Date(oCreateStartDate).getTime() > new Date(oCreateEndDate).getTime()) {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate3"), {   title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else if (((new Date(oCreateEndDate).getTime() - new Date(oCreateStartDate).getTime()) / (1000 * 60 * 60 * 24)) > 60) {
			this.getView().byId("EndDate").setDateValue(oEndDate);
			this.getView().byId("EndDate").setDisplayFormat(oDisplayFormat);
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate2"),  {  title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else {
			oEndDate = this.getView().byId("EndDate").getDateValue();
		}
	},


	handleStartDateChange1: function (oEvent) {

		var oAssignStartDate1 = this.getView().byId("StartDate1").getDateValue();
		var oAssignEndDate1 = this.getView().byId("EndDate1").getDateValue();
		selectedStartDate1 = strtdateFormat.format(new Date(oAssignStartDate1));
		selectedEndDate1 = enddateFormat.format(new Date(oAssignEndDate1));
		var DateNow = dateFormat.format(new Date());

		if (new Date(oAssignStartDate1).getTime() > new Date(oAssignEndDate1).getTime()) {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate3"), {   title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else if (((new Date(oAssignEndDate1).getTime() - new Date(oAssignStartDate1).getTime()) / (1000 * 60 * 60 * 24)) > 60) {
			this.getView().byId("StartDate1").setDateValue(oStartDate1);
			this.getView().byId("StartDate1").setDisplayFormat(oDisplayFormat);
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate2"),  {  title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else {
			oStartDate1 = this.getView().byId("StartDate1").getDateValue();
		}

	},
	handleEndDateChange1: function (oEvent) {

		var oAssignStartDate1 = this.getView().byId("StartDate1").getDateValue();
		var oAssignEndDate1 = this.getView().byId("EndDate1").getDateValue();
		selectedStartDate1 = strtdateFormat.format(new Date(oAssignStartDate1));
		selectedEndDate1 = enddateFormat.format(new Date(oAssignEndDate1));

		var DateNow = dateFormat.format(new Date());
		if (new Date(oAssignStartDate1).getTime() > new Date(oAssignEndDate1).getTime()) {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate3"), {   title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else if (((new Date(oAssignEndDate1).getTime() - new Date(oAssignStartDate1).getTime()) / (1000 * 60 * 60 * 24)) > 60) {
			this.getView().byId("EndDate1").setDateValue(oEndDate1);
			this.getView().byId("EndDate1").setDisplayFormat(oDisplayFormat);
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "POReport_AlertDate2"),  {  title:  getPropertyValue(oResourceModel, "NPDashboard_Warning")});
		} else {
			oEndDate1 = this.getView().byId("EndDate1").getDateValue();
		}

	},
	///////////////////////////////////////////////////////////////////////////////////////GR Icon//////////////////////////////////////////////////////////////////////////////////////
	GRIcon: function (oEvent) {

		var oCells = oEvent.getSource().getParent().getCells();
		var selectedEPO = oCells[0].getText();
		var GRPopOverModel = new sap.ui.model.xml.XMLModel();
		GRPopOverModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetMsgPostingDetails&Param.1=" + selectedEPO + "&Param.2=GR&Param.3=" + userLanguage + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
		var oIcon = oEvent.getSource();
		////////////////////////////////////////////////////////////////List /////////////

		var oList = new sap.m.List({
			backgroundDesign: sap.m.BackgroundDesign.Transparent,
			//headerText: getPropertyValue(oResourceModel, "NPDashboard_BCPStatus"),
		});
		var modelAsXML = GRPopOverModel.getXML();
		var oStandardListItem = new sap.m.StandardListItem({
			icon: "{Icon}",
			color: "{Color}",
			infoStateInverted: true,
			title: "{ProcessingStatus}",
			info: "{Count}",
		});

		oList.setModel(GRPopOverModel);
		oList.bindAggregation("items", "/Rowset/Row", oStandardListItem);

		var oPopover = new sap.m.Popover({
			title: getPropertyValue(oResourceModel, "NPDashboard_BCPStatus"),
			placement: "Bottom",
			contentWidth: "15%",
			content: [oList]

		});
		oPopover.openBy(oIcon);
	},


	///////////////////////////////////////////////////////////////////////////////////////GI Icon//////////////////////////////////////////////////////////////////////////////////////
	GIIcon: function (oEvent) {
		var oCells = oEvent.getSource().getParent().getCells();
		var selectedEPO = oCells[0].getText();
		var GIPopOverModel = new sap.ui.model.xml.XMLModel();
		GIPopOverModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetMsgPostingDetails&Param.1=" + selectedEPO + "&Param.2=GI&Param.3=" + userLanguage + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
		var oIcon = oEvent.getSource();

		////////////////////////////////////////////////////////////////List /////////////

		var oList = new sap.m.List({
			backgroundDesign: sap.m.BackgroundDesign.Transparent,
			//headerText: getPropertyValue(oResourceModel, "NPDashboard_BCPStatus"),
		});
		var modelAsXML = GIPopOverModel.getXML();
		var oStandardListItem = new sap.m.StandardListItem({
			icon: "{Icon}",
			color: "{Color}",
			title: "{ProcessingStatus}",
			info: "{Count}"
		});

		oList.setModel(GIPopOverModel);
		oList.bindAggregation("items", "/Rowset/Row", oStandardListItem);

		var oPopover = new sap.m.Popover({
			title: getPropertyValue(oResourceModel, "NPDashboard_BCPStatus"),
			placement: "Bottom",
			contentWidth: "15%",
			content: [oList]

		});
		oPopover.openBy(oIcon);
	},
	///////////////////////////////////////////////////////////////////////////////////////Get Audit List //////////////////////////////////////////////////////////////////////
	pressGetAuditReportFn: function () {


		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					axis: 1,
					name: 'PO',
					value: "{PO}",

				}],
				measures: [{
						name: 'Quantity',
						value: '{Value}'
					}

				],
				data: {
					path: "/Rowset/Row"
				}
			});

			var legendPosition = new sap.viz.ui5.types.Legend({
				layout: {
					position: "right"
				}
			});

			
			var PieVizChart = new sap.viz.ui5.Pie({
				width: "500px",
				height: "280px",
				title: {},
				dataset: oDataset,
				legendGroup: legendPosition,


				dataLabel: {
					positionPreference: true,
					automaticInOutside: true,
					outsideVisible: true,
					position: 'outside',
					visible: true,
					type: 'string',

				},

			});

		


		lineNodeID = this.getView().byId("workcenter2").getSelectedKey();
		if (lineNodeID == "" || lineNodeID == null || lineNodeID == undefined) {
			sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), { title:getPropertyValue(oResourceModel, "NPDashboard_Error")});
		} else {
			var oDisplayReportTable = this.getView().byId("ReportEPO_TableId");
			var matTablindex = oDisplayReportTable.getSelectedIndex();


			if (matTablindex != -1) {
				var oTablindex1 = oDisplayReportTable.getContextByIndex(matTablindex);
				var orderselected = oDisplayReportTable.getModel().getProperty(oTablindex1 + "/EmergencyPO");
				var assignedPO = oDisplayReportTable.getModel().getProperty(oTablindex1 + "/AssignedPO");
				

					

			} else {
				orderselected = "";
			}

			var oEPOAuditTableModel = new sap.ui.model.xml.XMLModel();
			oEPOAuditTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetListOfOrders&Param.1=" + (userLanguage.toUpperCase()) + "&Param.2=REPORT&Param.10=" + orderselected + "&Param.11=" + lineNodeID + "&cache=" + new Date() + "&Content-Type=text/xml"), "", true);


			oEPOAuditTable = new sap.m.Table({
				// headerText: getPropertyValue(oResourceModel, "NPDashboard_BCPHistoryHeader"),
				headerDesign: sap.m.ListHeaderDesign.Standard,
			});

			var EmergencyPO = new sap.m.Column({
				header: new sap.m.Label({
					text: getPropertyValue(oResourceModel, "EPO_UI_EmergencyPO")
				})
			});
			oEPOAuditTable.addColumn(EmergencyPO);

			var CreatedBy = new sap.m.Column({
				header: new sap.m.Label({
					text: getPropertyValue(oResourceModel, "EPO_UI_CREATEDBY")
				})
			});
			oEPOAuditTable.addColumn(CreatedBy);

			var CreatedOn = new sap.m.Column({
				header: new sap.m.Label({
					text: getPropertyValue(oResourceModel, "EPO_UI_CreatedOn")
				})
			});
			oEPOAuditTable.addColumn(CreatedOn);
			var AssignedPO = new sap.m.Column({
				header: new sap.m.Label({
					text: getPropertyValue(oResourceModel, "EPO_AssignedEPO")
				})
			});
			oEPOAuditTable.addColumn(AssignedPO);
			var AssignedBy = new sap.m.Column({
				header: new sap.m.Label({
					text: getPropertyValue(oResourceModel, "EPO_UI_AssignedBy")
				})
			});
			oEPOAuditTable.addColumn(AssignedBy);
			var AssignedOn = new sap.m.Column({
				header: new sap.m.Label({
					text: getPropertyValue(oResourceModel, "EPO_UI_AssignedOn")
				})
			});
			oEPOAuditTable.addColumn(AssignedOn);


			var oEPOAuditTableTemplate = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({
						text: "{EmergencyPO}"
					}),
					new sap.m.Text({
						text: "{CreatedBy}"
					}),

					new sap.m.Text({
						text: "{parts: [{path: 'CreatedOn'}],  formatter : 'oControllerThis.getDateDisplayFormat'}"
					}),
					new sap.m.Text({
						text: "{AssignedPO}"
					}),
					new sap.m.Text({
						text: "{AssignedBy}"
					}),
					new sap.m.Text({
						text: "{parts: [{path: 'AssignedOn'}],  formatter : 'oControllerThis.getDateDisplayFormat'}"
					})
				]
			});
			oEPOAuditTable.bindItems("/Rowset/Row", oEPOAuditTableTemplate);
			oEPOAuditTable.setModel(oEPOAuditTableModel);
			
			


			var oEPOAuditDialog = new sap.m.Dialog({
				title: getPropertyValue(oResourceModel, "EPO_UI_AUDIT"),
				draggable: true,
				

				buttons: [


					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
						press: function () {
							oEPOAuditDialog.close();
							oEPOAuditDialog.destroy();
						}
					})
				]
			});

			if (matTablindex != -1) {
			PieChartModel = new sap.ui.model.xml.XMLModel();
				
			if(assignedPO==" "|| assignedPO=="---"){
			
			
		
			PieChartModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetGIGRDetailsByOrder&Param.1=" + userLanguage + "&Param.2=" +orderselected+ "&Param.4=CHART&Param.5=false&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
				
			}
			else{
			PieChartModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/XACQ_GetGIGRDetailsByOrder&Param.1=" + userLanguage + "&Param.2=" + (assignedPO + "," + orderselected)+ "&Param.4=CHART&Param.5=true&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
			
			}

		
			PieVizChart.setModel(PieChartModel);
			SAPGI = PieChartModel.getProperty("/Rowset/Row/0/Value");
			SAPGR = PieChartModel.getProperty("/Rowset/Row/1/Value");
			EPOGI = PieChartModel.getProperty("/Rowset/Row/2/Value");
			EPOGR = PieChartModel.getProperty("/Rowset/Row/3/Value");

				
			if (SAPGR == 0 && SAPGI == 0 && EPOGR == 0 && EPOGI == 0) {
				var message = getPropertyValue(oResourceModel, "EPO_UI_Message2");

				var visiblemessage = new sap.m.Text({
					text: message

				});

				visiblemessage.addStyleClass("addColor");

				
				oEPOAuditDialog.addContent(oEPOAuditTable);
				oEPOAuditDialog.addContent(visiblemessage);

			}

		else {
				var headerText = new sap.m.Label({text: getPropertyValue(oResourceModel, "EPO_UI_PieChart")});
				oEPOAuditDialog.addContent(oEPOAuditTable);
				oEPOAuditDialog.addContent(headerText);
				oEPOAuditDialog.addContent(PieVizChart);
			}
				
				
			}
		else	{
				oEPOAuditDialog.addContent(oEPOAuditTable);

		}
			oEPOAuditDialog.setContentWidth("900px");
			oEPOAuditDialog.setContentHeight("430px");
			oEPOAuditDialog.setDraggable(true);
			oEPOAuditDialog.open();
		}

	},

	///////////////////////////////////////////////////////////////////////////Export Excel//////////////////////////////////////////////////////////////////////////////////////////////////
	pressGetExcelReportFn: function () {

		var oDisplayReportTable = this.getView().byId("ReportEPO_TableId");
		var refresh = new Date();


		var inpXML = oDisplayReportTable.getModel().getXML();


		var Url = "/XMII/Runner?Transaction=MaterialHandling/EmergencyProcessOrder/Transaction/BLS_ExportEPOReport";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", Url, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = "blob";
		xhr.onload = function (eventInfo) {
			if (this.status == 200) {
				var blob = this.response;
				saveAs(blob, "EPOReport.xls");
			}
		};
		xhr.send("I_InputXML=" + encodeURIComponent(inpXML) + "&cache=" + refresh + "&OutputParameter=O_OutputXML");
		xhr.onloadend = function () {
			sap.ui.core.BusyIndicator.hide();
		};

	},
	/////////////////////////////////////////////////////////////////////////DATE FORMAT////////////////////////////////////////////////////////////////////////////////////////////////////
	getDateDisplayFormat: function (date) {

		if (date === "0000-00-00") {
			return date;
		} else {
			return formatDate(date, "MM/dd/yyyy HH:mm:ss", "YES");
		}
	}


})