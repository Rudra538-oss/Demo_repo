var clientFromURL;
var oBCPStatusModel;
var userLanguage, oResourceModel;
var plantFromURL, orderFromURL, nodeFromURL;
var headerFromURL, pDateFromURL;
var oDisplayTable, day1, resFromURL;
var bcpElement;
var POrder;
var colId, colValue, totalCol;
var ReportModel, GITitle;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.GIReport", {

	onInit: function () {

		// alert("Hi");
		jQuery.sap.require("sap.ui.commons.MessageBox");
		oControllerThis = this;
		var DateNw = new Date();
		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);

		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,CustomGI_GI_23,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDashboard_Goods_Issue,CustomGR_GMReport_21,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,POPOVER_LOGOUT,NPDashboard_Confirm,NPDashboard_Close";
		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		this.getView().byId("pageID").setModel(oResourceModel, "header");
		this.getView().byId("GMTable").setModel(oResourceModel, "column");
		this.getView().byId("Search").setModel(oResourceModel, "search"); */
		var page = this.getView().byId("pageID");
		var identifier = "GIRev1>NPDashboard_Back,GIRev16>NPM_COMMON_BCP_STATUS,GIRev2>InBndMatRecpt_title_BCP,GIRev3>CustomGR_GMReport_1,GIRev4>CustomGR_GRR_2,GIRev5>CustomGR_GMReport_11,GIRev6>CustomGR_GMReport_10,GIRev7>CustomGR_GMReport_2,GIRev8>CustomGR_GMReport_3,GIRev9>CustomGR_GMReport_4,GIRev10>CustomGR_GMReport_5,GIRev11>TransferDisplay_colHeader_batch,GIRev12>CustomGR_GMReport_7,GIRev13>CustomGR_GMReport_8,GIRev14>CustomGR_GMReport_9,GMReport14>CustomGR_GMReport_16";
		localize(page, identifier, userLanguage);
		//document.title=getPropertyValue(oResourceModel, "NPDashboard_Goods_Issue");
		plantFromURL = getURLParameter("plantFromURL");
		orderFromURL = getURLParameter("orderFromURL");
		nodeFromURL = decodeURIComponent(getURLParameter("nodeFromURL"));
		clientFromURL = getURLParameter("clientFromURL");
		resFromURL = decodeURIComponent(getURLParameter("resFromURL"));
		GITitle = getPropertyValue(oResourceModel, "CustomGI_GI_23");
		document.title = GITitle + "-" + resFromURL;
		headerFromURL = decodeURIComponent(getURLParameter("headerFromURL"));
		pDateFromURL = getURLParameter("pDateFromURL");
		day1 = getURLParameter("day1");
		var ord = orderFromURL;

		ord = orderFromURL;
		
		var processOrder=getPO(ord);
		ord=processOrder[0];
		POrder=processOrder[1];
		
		this.getView().byId("ProcessOrder").setValue(orderFromURL);
		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GoodsMovemetReportInput><language>" + userLanguage + "</language><client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant><nodeID>" + nodeFromURL + "</nodeID><orderNumber>" + POrder + "</orderNumber><routingOperationNumber/></GoodsMovemetReportInput>"
		// alert(InputXMLInStringFormat);
		ReportModel = new sap.ui.model.xml.XMLModel();
		ReportModel.setSizeLimit(10000);
		ReportModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GIReport&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		// alert("hi");
		oDisplayTable = this.getView().byId("GMTable");
		oDisplayTable.setModel(ReportModel);
		oDisplayTable.bindRows("/Rowset/Row");
	},

	onSearch: function (oEvent) {
		var sQuery = oEvent.getSource().getValue();
		oDisplayTable = this.getView().byId("GMTable");


		var oFilter1 = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter2 = new sap.ui.model.Filter("Batch", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter3 = new sap.ui.model.Filter("StorageUnit", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter4 = new sap.ui.model.Filter("UserID", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter5 = new sap.ui.model.Filter("Quantity", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter6 = new sap.ui.model.Filter("UoM", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter7 = new sap.ui.model.Filter("MovementType", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter8 = new sap.ui.model.Filter("MaterialDescription", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter9 = new sap.ui.model.Filter("PostingDate", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter10 = new sap.ui.model.Filter("BCPStatus", sap.ui.model.FilterOperator.Contains, sQuery);

		var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10], false);
		oDisplayTable.getBinding("rows").filter(allFilter);

	},

	onAfterRendering: function () {
		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
		setInterval(function () {
			oBCPStats = getBCPStatus(bcpElement, "", "");
		}, 30000);
		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell3").getUser().setUsername(username);
	},

	pressGetExcelReportFn: function () {
		var dateRefresh = new Date();
		oDisplayTable = this.getView().byId("GMTable");

		sap.ui.core.BusyIndicator.show(1);

		var inpXML = oDisplayTable.getModel().getXML();
		//console.log(inpXML);
		// alert($(inpXML).find('Row').text());
		var Url = "/XMII/Runner?Transaction=MaterialHandling/CustomGR/Transaction/BLS_ExportDataOfGoodsMovement";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", Url, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = "blob";
		xhr.onload = function (eventInfo) {
			if (this.status == 200) {
				var blob = this.response;
				// FileSaver.js usage:
				saveAs(blob, "Exported.xls");
			}
		};
		xhr.send("Order=" + encodeURIComponent(orderFromURL) + "&InputXML=" + encodeURIComponent(inpXML) + "&d=" + dateRefresh + "&OutputParameter=Data");
		xhr.onloadend = function () {
			sap.ui.core.BusyIndicator.hide();
		};

	},
	goHome: function () {
		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
	},
	/* colorRow: function(Material, oEvent){

	var rowId;
	var oDisplayTable= this.getView().byId("GMTable");

	var items = oDisplayTable.getRows();
	var len = items.length;
	var indx=getPropertyValue(oResourceModel, "CustomGR_GMReport_21");
	for(var i=0;i<len;i++){
	var item = items[i];
	if(item.getCells()[0].getText().indexOf(indx) >= 0){
	// console.log(item.getId());
	if(rowId == "" || rowId == undefined || rowId == "undefined"){
	rowId ="#"+ item.getId();

	}else{
	rowId =rowId+",#"+ item.getId();
	}
	}
	}

	// console.log(rowId);
	var css = rowId+"{background: #c5e2ea;}";
	var head = document.head || document.getElementsByTagName('head')[0];
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);
	return Material;

	}, */
	formatMat: function (Material) {

		var indx = getPropertyValue(oResourceModel, "CustomGR_GMReport_21");
		console.log(indx);
		if (Material.indexOf(indx) >= 0) {
			return indx;
		} else {
			return Material;
		}
	},
	getDateDisplayFormat: function (date) {

		if (date === "0000-00-00") {
			return date;
		} else {
			return formatDate(date, "yyyy-MM-dd'T'HH:mm:ss", "YES");
		}
	}

});