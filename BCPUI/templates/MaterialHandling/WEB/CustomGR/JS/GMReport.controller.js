var clientFromURL;
var oBCPStatusModel;
var userLanguage, oResourceModel;
var plantFromURL, orderFromURL, nodeFromURL;
var oDisplayTable, day1, resFromURL;
var ord, suFromURL, pDateFromURL;
var typeFromURL, desFromURL;
var matFromURL, headerFromURL;
var flag;
var timeOut;
var isOpenCnf = false;
var bcpElement;
var colId, colValue, totalCol;
var ReportModel, GRTitle;
var a;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.GMReport", {

	/////////////////////////////////////////////////////////////////////////// Timeout Supporting Functions //////////////////////////////////////////////////////////////////////

	/* reset: function() {
	    window.clearTimeout(timeOut);
	    timeOut = setTimeout(function(){sap.ui.controller("JS.GMReport").showTimeoutMsg()} , 600000 );
	},

	showTimeoutMsg: function() {

	if(isOpenCnf == false){
	   isOpenCnf = true;

	  sap.m.MessageBox.show(
	      	getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG"), {
	         	icon: sap.m.MessageBox.Icon.QUESTION,
	         	title: getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE"),
	       		actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
	      		onClose: function(oAction){
	       			if(oAction === sap.m.MessageBox.Action.NO){
					window.location.reload();	
				}else{
					isOpenCnf = false;
					sap.ui.controller("JS.GMReport").reset();
				}
			}
		});
	      }
	},  */
	/////////////////////////////////////////////////////////////////////////// End of  Timeout Supporting Function///////////////////////////////////////////////////////////

	onInit: function () {
		/*
		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////

		window.onload = setTimeout(function(){sap.ui.controller("JS.GMReport").showTimeoutMsg()} , 600000 );

		window.onmousemove = function(){sap.ui.controller("JS.GMReport").reset();};
		window.onkeypress = function(){sap.ui.controller("JS.GMReport").reset();};
		window.onclick = function(){sap.ui.controller("JS.GMReport").reset();}; */

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////

		oControllerThis = this;
		var DateNw = new Date();
		a = 20;
		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);

		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,CustomGR_GR_23,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GR_1,CustomGR_GMReport_20,CustomGR_GMReport_21,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,POPOVER_LOGOUT,NPDashboard_Confirm,NPDashboard_Close";
		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

		// oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		// this.getView().byId("pageID").setModel(oResourceModel, "header");
		// this.getView().byId("GMTable").setModel(oResourceModel, "column");
		// this.getView().byId("Search").setModel(oResourceModel, "search");


		var page = this.getView().byId("pageID");
		var identifier = "GMReport1>NPDashboard_Back,GMReport26>NPM_COMMON_Message,GMReport25>NPM_COMMON_BCP_STATUS,GMReport2>InBndMatRecpt_title_BCP,GMReport3>CustomGR_GMReport_1,GMReport4>CustomGR_GRR_2,GMReport5>CustomGR_GMReport_11,GMReport6>CustomGR_GMReport_2,GMReport7>CustomGR_GMReport_3,GMReport8>CustomGR_GMReport_4,GMReport9>CustomGR_GMReport_5,GMReport10>TransferDisplay_colHeader_batch,GMReport11>CustomGR_GMReport_7,GMReport12>CustomGR_GMReport_8,GMReport13>CustomGR_GMReport_9,GMReport14>CustomGR_GMReport_10,GMReport14>CustomGR_GMReport_16,GMReport15>CustomGR_GMReport_17";
		localize(page, identifier, userLanguage);
		flag = getURLParameter("flag");
		plantFromURL = getURLParameter("plantFromURL");
		orderFromURL = getURLParameter("orderFromURL");
		nodeFromURL = getURLParameter("nodeFromURL");
		clientFromURL = getURLParameter("clientFromURL");
		resFromURL = decodeURIComponent(getURLParameter("resFromURL"));
		GRTitle = getPropertyValue(oResourceModel, "CustomGR_GR_23");
		document.title = GRTitle + "-" + resFromURL;
		matFromURL = getURLParameter("matFromURL");
		desFromURL = decodeURIComponent(getURLParameter("desFromURL"));
		typeFromURL = getURLParameter("typeFromURL");
		pDateFromURL = getURLParameter("pDateFromURL");
		headerFromURL = getURLParameter("headerFromURL");
		day1 = getURLParameter("day1");
		suFromURL = getURLParameter("suFromURL");
		ord = orderFromURL;
		var ordLength = ord.length;
		if(ord.indexOf("E") == "-1"){
		for (var p = 0; p < (12 - ordLength); p++) {
			ord = "0" + ord;
		}
		}
		this.getView().byId("ProcessOrder").setValue(orderFromURL);
		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GoodsMovemetReportInput><language>" + userLanguage + "</language><client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant><nodeID>" + nodeFromURL + "</nodeID><orderNumber>" + ord + "</orderNumber><routingOperationNumber/></GoodsMovemetReportInput>"
		// alert(InputXMLInStringFormat);
		ReportModel = new sap.ui.model.xml.XMLModel();
		ReportModel.setSizeLimit(10000);
		ReportModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GMReport&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		// alert("hi");
		oDisplayTable = this.getView().byId("GMTable");
		// var GMItems = this.getView().byId("GMItems");
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
		var oFilter10 = new sap.ui.model.Filter("PalletInfo", sap.ui.model.FilterOperator.Contains, sQuery);
		var oFilter11 = new sap.ui.model.Filter("BCPStatus", sap.ui.model.FilterOperator.Contains, sQuery);
                         var oFilter12 = new sap.ui.model.Filter("Message", sap.ui.model.FilterOperator.Contains, sQuery);

		var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10, oFilter11,oFilter12], false);
		oDisplayTable.getBinding("rows").filter(allFilter);

	},

	onAfterRendering: function () {

		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		/////////////////////////////////////////////////////////////////////////// End of Timeout /////////////////////////////////////////////////////////
		setInterval(function () {
			oBCPStats = getBCPStatus(bcpElement, "", "");
		}, 30000);
		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell3").getUser().setUsername(username);


		oDisplayTable = this.getView().byId("GMTable");
		var GMItems = this.getView().byId("GMItems");
		oDisplayTable.setModel(ReportModel);
		oDisplayTable.bindRows("/Rowset/Row");
		var tabData = ReportModel.getXML();

	},

	pressGetExcelReportFn: function () {
		var dateRefresh = new Date();
		oDisplayTable = this.getView().byId("GMTable");

		sap.ui.core.BusyIndicator.show(1);

		var inpXML = oDisplayTable.getModel().getXML();
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

		if (flag == 1) {

			window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GoodReceipt.irpt?orderFromURL=" + orderFromURL + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&headerFromURL=" + headerFromURL + "&matFromURL=" + matFromURL + "&desFromURL=" + encodeURIComponent(desFromURL) + "&day1=" + day1 + "&typeFromURL=" + typeFromURL + "&pDateFromURL=" + pDateFromURL + "&nodeFromURL=" + nodeFromURL + "&resFromURL=" + encodeURIComponent(resFromURL) + "&suFromURL=" + suFromURL), "_self");
		} else if (flag == 2) {

			window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/Reversal.irpt?orderFromURL=" + orderFromURL + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&headerFromURL=" + headerFromURL + "&matFromURL=" + matFromURL + "&desFromURL=" + encodeURIComponent(desFromURL) + "&day1=" + day1 + "&typeFromURL=" + typeFromURL + "&pDateFromURL=" + pDateFromURL + "&nodeFromURL=" + nodeFromURL + "&resFromURL=" + encodeURIComponent(resFromURL) + "&suFromURL=" + suFromURL), "_self");
		} else {
			window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/Rework.irpt?orderFromURL=" + orderFromURL + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&headerFromURL=" + headerFromURL + "&matFromURL=" + matFromURL + "&desFromURL=" + encodeURIComponent(desFromURL) + "&day1=" + day1 + "&typeFromURL=" + typeFromURL + "&pDateFromURL=" + pDateFromURL + "&nodeFromURL=" + nodeFromURL + "&resFromURL=" + encodeURIComponent(resFromURL) + "&suFromURL=" + suFromURL), "_self");
		}
	},
	/* colorRow: function(Material, oEvent){

	var rowId;
	var oDisplayTable= this.getView().byId("GMTable");

	var items = oDisplayTable.getRows();
	 // console.log("Items:"+items);
	var len = items.length;
	// console.log(len);
	var indx=getPropertyValue(oResourceModel, "CustomGR_GMReport_20");


	for(var i=0;i<len;i++){
	var item = items[i];

	var txt=item.getCells()[0].getText();
	 console.log("Text--"+txt);
	// if(txt.indexOf(indx) >= 0){
	if (txt==indx){
	 console.log(txt+":"+indx );
	if(rowId == "" || rowId == undefined || rowId == "undefined"){
	rowId ="#"+ item.getId();
	// console.log("If :"+rowId);
	}else{

	rowId =rowId+",#"+ item.getId();
	// console.log("Else: "+rowId);
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

		var indx = getPropertyValue(oResourceModel, "CustomGR_GMReport_20");
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