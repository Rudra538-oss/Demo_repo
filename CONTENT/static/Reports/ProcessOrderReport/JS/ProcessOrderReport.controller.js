var oBCPStatusModel;
var userLanguage;
var oResourceModel;
var plantFromURL, nodeFromURL, clientFromURL;
var bcpElement;
var stDate;
var endDate;
var orderselected;
var oDisplayFormat;
var reporteselectedStartDate;
var reporteselectedEndDate;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.ProcessOrderReport", {
	onInit: function() {
		oControllerThis = this;
		var refresh = new Date();

		plantFromURL = getURLParameter("plant");
		clientFromURL = getURLParameter("client");
		nodeFromURL = getURLParameter("node");

		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&cache=" + refresh + "&Content-Type=text/xml", "", false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

		var details = "NPDashboard_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,TransferDisplay_Message";
		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);


		var page = this.getView().byId("pageID");
		var identifier = "POReport>InBndMatRecpt_Lbl_StartDate,POReport>TransferDisplay_colHeader_status,POReport>NPORTAL_IMR_CONFIRMATION,POReport>PO_Declaration,POReport>PO_Consumption,POReport>CustomGR_GR_2,IMReceipt16>InBndMatRecpt_btn_refresh,POReport>InBndMatRecpt_Lbl_Material,POReport>NPDashboard_Line,POReport>POReport_PODetails,POReport>POReport_CompDetails,POReport>InBndMatRecpt_Lbl_EndDate,POReport>POReport_HDR,POReport>NPDashboard_Back,POReport>InBndMatRecpt_title_BCP,POReport>TransferDisplay_btn_disp,POReport>NPDashboard_Process_Order_Report,POReport>CustomGR_GMReport_11,GMReport10>CustomGR_PO_3,POReport>CustomGR_GMReport_2,POReport>CustomGR_GMReport_16,POReport>CustomGR_PO_11,POReport>RF_UI_LABEL_RESR,POReport>POReport_Start,POReport>POReport_End,POReport>POReport_PV,POReport>CustomGI_PO_8,POReport>NPM_COMMON_SLOC,POReport>POReport_WH,POReport>POReport_Bin,POReport>POReport_Type,POReport>POReport_PreBatch,POReport>POReport_Comp,POReport>CustomGR_GR_2,POReport>POReport_Operation,POReport>POReport_Phase,POReport>POReport_Item,POReport>POReport_MatItem,POReport>SU_Manag,POReport>POReport_BACKFLUSH,POReport>PO_Consumption,POReport>CustomGR_GMReport_4,POReport>CustomGR_GMReport_5,POReport>TransferDisplay_colHeader_batch,POReport>CustomGR_GMReport_7,POReport>CustomGR_GMReport_8,POReport>CustomGR_GMReport_17,POReport>CustomGR_GMReport_9,POReport>NPM_COMMON_BCP_STATUS,POReport>PO_Declaration";
		localize(page, identifier, userLanguage);
		var properties = "ODATA_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GMReport_1,GMReport_NoOfDaysValidation,POReport_AlertDate1,TransferDisplay_Message,POReport_AlertDate2,PrintMsg_Msg10,POReport_AlertDate3";
		oResourceModel = getResourceModel(properties, userLanguage);
		var Error = getPropertyValue(oResourceModel, "ODATA_Error");


		var oLineDropdown = oControllerThis.getView().byId("selLineId");
		sortinglines(plantFromURL, clientFromURL, userLanguage, oLineDropdown, Error, 0);

		if(oLineDropdown.getSelectedKeys(0)=="")
		{
			oLineDropdown.removeItem(0);
		}
		oLineDropdown.setSelectedKeys(nodeFromURL);



		var oStatusModel = new sap.ui.model.xml.XMLModel();
		oStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/ProcessOrderReport/QueryTemplate/XAC_GetOrderStatus&Param.1=" + userLanguage + "&d=" + refresh + "&Content-Type=text/xml"), "", false);
		var StatDropDown = this.getView().byId("Status");
		StatDropDown.setModel(oStatusModel);
		StatDropDown.setEnabled(false);
		//var statuskey = StatDropDown.getSelectedKeys();


		var chkbox = this.getView().byId("allChckBox");
		chkbox.setSelected(true);


		var curntDate = new Date();
		var pastDate = new Date(curntDate.getFullYear(), curntDate.getMonth(), curntDate.getDate() - 6)
		this.getView().byId("StartDate").setDateValue(pastDate);
		this.getView().byId("EndDate").setDateValue(curntDate);
		var oModelDF= new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache="+new Date()+"&Content-Type=text/xml","",false);
		oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
		this.getView().byId("StartDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("EndDate").setDisplayFormat(oDisplayFormat);

		reporteselectedStartDate = this.getView().byId("StartDate").getDateValue();
		reporteselectedEndDate = this.getView().byId("EndDate").getDateValue();
		

	},

	onAfterRendering: function() {


		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		setInterval(function() {
			oBCPStats = getBCPStatus(bcpElement, "", "");
		}, 30000);

		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell3").getUser().setUsername(username);

		var reportStartDate = this.getView().byId("StartDate").getDateValue();
		var reportEndDate = this.getView().byId("EndDate").getDateValue();
		var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy 00:00:00"
		});
		var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy HH:mm:ss"
		});

		stDate = strtdateFormat.format(new Date(reportStartDate));
		endDate = enddateFormat.format(new Date(reportEndDate));
		var nodeID="'"+nodeFromURL+"'";
		var refresh = new Date();
		oPOTable = this.getView().byId("POTable");
		var oPOModel = new sap.ui.model.xml.XMLModel();
		oPOModel.setSizeLimit(10000);
		oPOModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/ProcessOrderReport/QueryTemplate/XAC_POHeaderMatDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + nodeID + "&Param.4=" + userLanguage + "&Param.5=All&Param.8=" + stDate + "&Param.9=" + endDate + "&d=" + refresh + "&Content-Type=text/xml"), "", false);
		oPOTable.setModel(oPOModel);
		var oRowCountXML = oPOModel.getXML();
		objectCount = $(oRowCountXML).find('Row').size();
		this.getView().byId("objectCount").setValue(objectCount);
	},

	doRefreshFn: function() {
		var refresh = new Date();
		var commaSeparatedstatus;
		var commaSeparatedLine;
		nodeFromURL = this.getView().byId("selLineId").getSelectedKeys();

		if(nodeFromURL!=""){

			var oHdrPanel= this.getView().byId("tabelPanel");
			oHdrPanel.setExpanded(true);
			var status = this.getView().byId("Status").getSelectedKeys();
			status.forEach(function(input) {
				commaSeparatedstatus = (commaSeparatedstatus == "" || commaSeparatedstatus == undefined) ? "'" + input + "'" : commaSeparatedstatus + ",'" + input + "'";
			});

			commaSeparatedstatus = (commaSeparatedstatus == "" || commaSeparatedstatus == undefined || commaSeparatedstatus == "'All'") ? "All" : commaSeparatedstatus;

			var LineComboBox = this.getView().byId("selLineId").getSelectedKeys();
			LineComboBox.forEach(function(input) {
				commaSeparatedLine = (commaSeparatedLine == "" || commaSeparatedLine == undefined) ? "'" + input + "'" : commaSeparatedLine + ",'" + input + "'";
			});


			var reportStartDate = this.getView().byId("StartDate").getDateValue();
			var reportEndDate = this.getView().byId("EndDate").getDateValue();

			var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MM/dd/yyyy 00:00:00"
			});
			var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MM/dd/yyyy HH:mm:ss"
			});

			stDate = strtdateFormat.format(new Date(reportStartDate));
			endDate = enddateFormat.format(new Date(reportEndDate));

			var order = this.getView().byId("ProcessOrder").getValue();
			var material = this.getView().byId("Material").getValue();


			var otablePanelComp = this.getView().byId("tablePanelComp");
			otablePanelComp.setVisible(false);
			var oCompToolbar = this.getView().byId("ComponentsPanel");
			oCompToolbar.setVisible(false);
			var chkbox = this.getView().byId("allChckBox");
			if (chkbox.getSelected() == true) {
				commaSeparatedstatus = 'All';
			}

///////////////////////////////////////////////POST CALL//////////////////////////////////////////////////////	

			var oXMLDataURL=encodeURI("Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + commaSeparatedLine + "&Param.4=" + userLanguage + "&Param.5="+commaSeparatedstatus+ "&Param.6=" + order + "&Param.7=" + material + "&Param.8=" + stDate + "&Param.9=" + endDate + "&d=" + refresh + "&Content-Type=text/xml");

			var oPOModel = new sap.ui.model.xml.XMLModel();
			oPOModel.attachRequestSent(function()
					{
				sap.ui.core.BusyIndicator.show();
					});


			sap.ui.core.BusyIndicator.show();
			oPOModel.setSizeLimit(10000);
			oPOModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/ProcessOrderReport/QueryTemplate/XAC_POHeaderMatDetails",oXMLDataURL, true,"POST");
			oPOModel.attachRequestCompleted(function()
					{
				sap.ui.core.BusyIndicator.hide();
				oPOTable.setModel(oPOModel);
				var oRowCountXML = oPOModel.getXML();
				objectCount = $(oRowCountXML).find('Row').size();
				console.log(objectCount);
				oControllerThis.getView().byId("objectCount").setValue(objectCount);
					}); 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		

			var aColumns = oPOTable.getColumns();
			for (var i=0; i<aColumns.length; i++)
			{
				aColumns[i].setSorted(false);
				aColumns[i].setFiltered(false);
			}	
			this.getView().byId("searchFieldPOTableId").setValue("");
			this.getView().byId("searchFieldCompTableId").setValue("");
			this.getView().byId("searchFieldConsTableId").setValue("");
			this.getView().byId("searchFieldDeclTableId").setValue("");
		}else{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "PrintMsg_Msg10"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));

		}
	},


	onRowSelectionHdr: function() {
		var oPOHdrTable = this.getView().byId("POTable");
		var oCompTable = this.getView().byId("CompTable");
		var otablePanelComp = this.getView().byId("tablePanelComp");
		otablePanelComp.setVisible(true);
		var oHdrPanel= this.getView().byId("tabelPanel");


		var oCompToolbar = this.getView().byId("ComponentsPanel");
		oCompToolbar.setVisible(true);
		var DateNw = new Date();
		matTablindex = oPOHdrTable.getSelectedIndex();


		if (matTablindex != -1) {
			var oTablindex1 = oPOHdrTable.getContextByIndex(matTablindex);

			var oTab = this.getView().byId("iconTabBar");
			var key = oTab.getSelectedKey();
			if (key != "ProcessOrderReport--compTab") {
				oTab.setSelectedKey("ProcessOrderReport--compTab");
			}
			orderselected = oPOHdrTable.getModel().getProperty(oTablindex1 + "/AUFNR");
			this.getView().byId("CompTableInp").setValue(orderselected);
			this.getView().byId("ConsTableInp").setValue(orderselected);
			this.getView().byId("DeclTableInp").setValue(orderselected);

			var oPOCompModel = new sap.ui.model.xml.XMLModel();
			oPOCompModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/ProcessOrderReport/QueryTemplate/XAC_POComponentMatDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + orderselected + "&Param.4=" + userLanguage + "&Param.6=" + 1 + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			oCompTable.setModel(oPOCompModel);
			oHdrPanel.setExpanded(false);
		} else {
			otablePanelComp.setVisible(false);
			oCompToolbar.setVisible(false);
		}

	},
	onSearchHdr: function(oEvent) {
		var sQuery = oEvent.getSource().getValue();
		var oPOHdrTable = this.getView().byId("POTable");
		var oHdrPanel= this.getView().byId("tabelPanel");
		oHdrPanel.setExpanded(true);

		var oFilter1 = new sap.ui.model.Filter("STATUS", sap.ui.model.FilterOperator.Contains, sQuery);						
		var oFilter2 = new sap.ui.model.Filter("AUFNR", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("MATNR", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("MAKTX", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("ARBPL", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("START_DATE", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter8 = new sap.ui.model.Filter("END_DATE", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter9 = new sap.ui.model.Filter("PLNNR", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter10 = new sap.ui.model.Filter("QTY_RELEASED", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter11 = new sap.ui.model.Filter("QTY_RELEASED_UOM", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter12 = new sap.ui.model.Filter("LGORT", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter13 = new sap.ui.model.Filter("LGNUM", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter14 = new sap.ui.model.Filter("STRG_BIN", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter15 = new sap.ui.model.Filter("STRG_TYPE", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter16 = new sap.ui.model.Filter("CHARG", sap.ui.model.FilterOperator.Contains, sQuery);
		var allFilter = new sap.ui.model.Filter([oFilter1,oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10, oFilter11, oFilter12, oFilter13, oFilter14, oFilter15,oFilter16], false);
		oPOHdrTable.getBinding("rows").filter(allFilter);

	},
	onSearchComp: function(oEvent) {
		var sQuery = oEvent.getSource().getValue();
		var oPOCompTable = this.getView().byId("CompTable");


		var oFilter2 = new sap.ui.model.Filter("Order", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("MATNR", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("MAKTX", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("BDMNG", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("LGORT", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter9 = new sap.ui.model.Filter("WAREHOUSE_NO", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter10 = new sap.ui.model.Filter("RSPOS", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter11 = new sap.ui.model.Filter("POSNR", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter12 = new sap.ui.model.Filter("HU_MANAGED", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter13 = new sap.ui.model.Filter("BACKFLUSH", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter14 = new sap.ui.model.Filter("CHARG", sap.ui.model.FilterOperator.Contains, sQuery);

		var allFilter = new sap.ui.model.Filter([oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter9, oFilter10, oFilter11, oFilter12, oFilter13, oFilter14], false);
		oPOCompTable.getBinding("rows").filter(allFilter);

	},

	doSwitchTab: function() {
		var oTab = this.getView().byId("iconTabBar");
		var tabKey = oTab.getSelectedKey();
		var oCompTable = this.getView().byId("CompTable");
		var oDeclTable = this.getView().byId("DeclTable");
		var oConsTable = this.getView().byId("ConsTable");

		var DateNw = new Date();
		var oPOHdrTable = this.getView().byId("POTable");
		var matTablindex = oPOHdrTable.getSelectedIndex();

		if (matTablindex != -1) {
			var oTablindex1 = oPOHdrTable.getContextByIndex(matTablindex);

			orderselected = oPOHdrTable.getModel().getProperty(oTablindex1 + "/AUFNR");

		}

		if (tabKey == "ProcessOrderReport--consTab") {
			console.log(orderselected);
			console.log(userLanguage);
			var oPOConsModel = new sap.ui.model.xml.XMLModel();
			oPOConsModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/ProcessOrderReport/QueryTemplate/XAC_POComponentMatDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + orderselected + "&Param.4=" + userLanguage + "&Param.5=" + nodeFromURL + "&Param.6=" + 2 + "&Param.7=" + stDate + "&Param.8=" + endDate + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			oConsTable.setModel(oPOConsModel);
		} else if (tabKey == "ProcessOrderReport--declTab") {
			console.log(orderselected);
			console.log(userLanguage);
			var oPODeclModel = new sap.ui.model.xml.XMLModel();
			oPODeclModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/ProcessOrderReport/QueryTemplate/XAC_POComponentMatDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + orderselected + "&Param.4=" + userLanguage + "&Param.5=" + nodeFromURL + "&Param.6=" + 3 + "&Param.7=" + stDate + "&Param.8=" + endDate + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			oDeclTable.setModel(oPODeclModel);
		}
	},
	MultiComboSelect: function() {
		var StatDropDown = this.getView().byId("Status");
		var chkbox = this.getView().byId("allChckBox");
		if (chkbox.getSelected() == true) {
			StatDropDown.setEnabled(false);
		} else {
			StatDropDown.setEnabled(true);
		}
	},
	LineMultiComboSelect: function(oEvent) {
		var LineDropDown = this.getView().byId("selLineId");
		var Linechkbox = this.getView().byId("allLineChckBox");
		var lineDrop=LineDropDown.getItems();
		if (Linechkbox.getSelected() == true) {

			LineDropDown.setSelectedItems(lineDrop);

		} else {
			LineDropDown.setEnabled(true);
			LineDropDown.setSelectedItems("");
		}
	},
	handleStartDateChange: function(oEvent) {


		var reportStartDate = this.getView().byId("StartDate").getDateValue();
		var reportEndDate = this.getView().byId("EndDate").getDateValue();

		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy HH:mm:ss"
		});

		var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy 00:00:00"
		});
		var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy 23:59:59"
		});

		var stDate = strtdateFormat.format(new Date(reportStartDate));
		var endDate = enddateFormat.format(new Date(reportEndDate));

		var DateNow = dateFormat.format(new Date());

		if (new Date(reportStartDate).getTime() > new Date(reportEndDate).getTime()) {
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "POReport_AlertDate3"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		} else if (((new Date(reportEndDate).getTime() - new Date(reportStartDate).getTime()) / (1000 * 60 * 60 * 24)) > 60) {
			this.getView().byId("StartDate").setDateValue(reporteselectedStartDate);
			this.getView().byId("StartDate").setDisplayFormat(oDisplayFormat);
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "POReport_AlertDate2"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));

		}
		else{
			reporteselectedStartDate = this.getView().byId("StartDate").getDateValue();
		}

	},
	handleEndDateChange: function(oEvent) {

		var reportStartDate = this.getView().byId("StartDate").getDateValue();
		var reportEndDate = this.getView().byId("EndDate").getDateValue();

		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy HH:mm:ss"
		});

		var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy 00:00:00"
		});
		var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy 23:59:59"
		});

		var stDate = strtdateFormat.format(new Date(reportStartDate));
		var endDate = enddateFormat.format(new Date(reportEndDate));

		var DateNow = dateFormat.format(new Date());
		if (new Date(reportStartDate).getTime() > new Date(reportEndDate).getTime()) {
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "POReport_AlertDate3"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		} else if (((new Date(reportEndDate).getTime() - new Date(reportStartDate).getTime()) / (1000 * 60 * 60 * 24)) > 60) {
			this.getView().byId("EndDate").setDateValue(reporteselectedEndDate);
			this.getView().byId("EndDate").setDisplayFormat(oDisplayFormat);
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "POReport_AlertDate2"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
		}
		else{
			reporteselectedEndDate = this.getView().byId("EndDate").getDateValue();
		}



	},
	onSearchDecl: function(oEvent) {
		var sQuery = oEvent.getSource().getValue();
		var oDeclTable = this.getView().byId("DeclTable");


		var oFilter2 = new sap.ui.model.Filter("ProcOrd", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("MaterialDescription", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("Quantity", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("CommUOM", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("MovementType", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter9 = new sap.ui.model.Filter("StorageUnit", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter10 = new sap.ui.model.Filter("PostingDate", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter11 = new sap.ui.model.Filter("Pallet_Info", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter12 = new sap.ui.model.Filter("UserID", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter13 = new sap.ui.model.Filter("BCPStatus", sap.ui.model.FilterOperator.Contains, sQuery);

		var allFilter = new sap.ui.model.Filter([oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter9, oFilter10, oFilter11, oFilter12, oFilter13], false);
		oDeclTable.getBinding("rows").filter(allFilter);

	},
	onSearchCons: function(oEvent) {
		var sQuery = oEvent.getSource().getValue();
		var oConsTable = this.getView().byId("ConsTable");


		var oFilter2 = new sap.ui.model.Filter("ProcOrd", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("MaterialDescription", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("Quantity", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("CommUOM", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("MovementType", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter9 = new sap.ui.model.Filter("StorageUnit", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter10 = new sap.ui.model.Filter("PostingDate", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter11 = new sap.ui.model.Filter("Pallet_Info", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter12 = new sap.ui.model.Filter("UserID", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter13 = new sap.ui.model.Filter("BCPStatus", sap.ui.model.FilterOperator.Contains, sQuery);

		var allFilter = new sap.ui.model.Filter([oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter9, oFilter10, oFilter11, oFilter12, oFilter13], false);
		oConsTable.getBinding("rows").filter(allFilter);

	},
	getExcelReport: function() {
		var inpXML;
		var oRowCount = 0;
		var refresh = new Date();
		var oPOTable = this.getView().byId("POTable");


		try {
			inpXML = oPOTable.getModel().getXML();

			oRowCount = $(inpXML).find('Row').size();
		} catch (e) {

		}

		if (oRowCount > 0) {
			sap.ui.core.BusyIndicator.show(1);
			var Url = "/XMII/Runner?Transaction=MaterialHandling/Reports/ProcessOrderReport/Transaction/BLS_ExportPOReport";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", Url, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.responseType = "blob";
			xhr.onload = function(eventInfo) {
				if (this.status == 200) {
					var blob = this.response;
					saveAs(blob, "POReport.xls");
				}
			};
			xhr.send("I_InputXML=" + encodeURIComponent(inpXML) + "&cache=" + refresh + "&OutputParameter=O_POOutput");
			xhr.onloadend = function() {
				sap.ui.core.BusyIndicator.hide();
			};
		}
	},
	formatDateTime: function (date,time) {
		if((date!="" && date!=null) && (time!=null && time!="")){

			var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : oDisplayFormat});
			dateVal = dateFormat.format(new Date(date));	
			timeVal = time.substring(time.indexOf("T")+1);
			var datTime= dateVal + " " + timeVal;
			return datTime;
		}

	},

	onLineSelect: function(){
		var LineDropDown = this.getView().byId("selLineId");
		var lineDropAll=LineDropDown.getItems();

		var lineDropAllCount=lineDropAll.length;

		var lineDropSelected=LineDropDown.getSelectedItems();
		var lineDropSelectedCount=lineDropSelected.length;

		if(lineDropAllCount==lineDropSelectedCount){
			this.getView().byId("allLineChckBox").setSelected(true);
		}else{
			this.getView().byId("allLineChckBox").setSelected(false);
		}
	}


});