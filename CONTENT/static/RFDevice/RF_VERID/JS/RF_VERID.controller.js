var SelectionPanel;
var oDisplayTable;
var language;
var userLanguage;
var oResourceModelDisplay;
var oBCPStats;
var bcpElement;
var whse, wareNo;
var oWareNoModel;
var oTable, DateNw, whse1;
var stype1, ssec1, sbin1, verifID1;
var client, verifID2, sbin2, stype2;
var oControllerThis;
var userlang, selectedWareNum;
var downloadld;
jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.RF_VERID", {

	goHome: function () {
		window.top.close();
	},

	doLogoff3: function () {
		window.open("/XMII/Illuminator?service=logout&target=/XMII/CM/MaterialHandling/CustomMenu/index.irpt", "_self");
	},


	onInit: function () {

		oControllerThis = this;
		downloadld = this.getView().byId("Download");
		$(document).keydown(function (evt) {
			if (evt.keyCode == 13) {
				evt.preventDefault();
				sap.ui.controller("JS.RF_VERID").doDisplay();
			}
		});


		oSelectionPanel = this.getView().byId("panel2");
		oDisplayTable = this.getView().byId("Table");
		localStorage.clear();


		client = getURLParameter("clientFromURL");
		userlang = getURLParameter("Language");
		//alert(userlang);
		language = window.navigator.userLanguage || window.navigator.language;
		DateNw = new Date();

		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);

		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");


		var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,RF_VERIFID_SELECT_WAREHOUSE,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDASHBOARD_BCPUI_RF_VERIFICATION_ID_LIST,TransferDisplay_tile,TransferDisplay_alert1,TransferDisplay_Message,TransferDisplay_alert2,TransferDisplay_alert3,TransferDisplay_alert9,NPDashboard_Cancel,TransferDisplay_alert10,TransferDisplay_alert5,TransferDisplay_alert6,TransferDisplay_label_VerifID,TransferDisplay_alert8,TransferDisplay_colHeader_VerifID,TransferDisplay_Question,TransferDisplay_alert7";
		oResourceModelDisplay = new sap.ui.model.xml.XMLModel();
		oResourceModelDisplay.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

		document.title = getPropertyValue(oResourceModelDisplay, "NPDASHBOARD_BCPUI_RF_VERIFICATION_ID_LIST");
		var page = this.getView().byId("pageID");
		var identifier = "title1>NPDashboard_Home,title2>InBndMatRecpt_title_BCP,title10>NPDASHBOARD_BCPUI_RF_VERIFICATION_ID_LIST,title10>TransferDisplay_label_VerifIDList,title4>TransferDisplay_title_SelectCriteria,label1>TransferDisplay_label_SLoc,label2>TransferDisplay_label_WHNo,label3>TransferDisplay_label_SType,label4>TransferDisplay_label_SBin,label5>TransferDisplay_label_SSec,label6>TransferDisplay_label_VerifID,button1>TransferDisplay_btn_disp,column7>TransferDisplay_colHeader_updatedby,button2>TransferDisplay_btn_Clear,title5>TransferDisplay_title_StockDisplay,column2>TransferDisplay_colHeader_sType,column3>TransferDisplay_colHeader_sBin,column4>TransferDisplay_colHeader_ssec,column5>TransferDisplay_colHeader_VerifID,column6>TransferDisplay_colHeader_updatedOn,column7>TransferDisplay_colHeader_sled,column8>TransferDisplay_colHeader_avail,column9>TransferDisplay_colHeader_uom,column10>TransferDisplay_colHeader_sUnit,column11>TransferDisplay_colHeader_stckcat,column12>TransferDisplay_colHeader_plant,title24>TransferDisplay_label_DownloadVerID,column14>TransferDisplay_colHeader_unitType,column15>TransferDisplay_colHeader_sLoc,column1>TransferDisplay_colHeader_whNo";
		localize(page, identifier, userLanguage);


		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		if (oBCPStats == "0") {
			downloadld.setEnabled(false);
		} else {
			downloadld.setEnabled(true);
		}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var wareNoDDType = "WHNO_VERIFID";
		oWareNoModel = new sap.ui.model.xml.XMLModel();
		oWareNoModel.setSizeLimit(10000);
		oWareNoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + wareNoDDType + "&Content-Type=text/xml"), "", false);
		wareNo = this.getView().byId("wareNum");
		var owareNoitemline = new sap.ui.core.ListItem();
		owareNoitemline.bindProperty("text", "Value");
		owareNoitemline.bindProperty("key", "Key");
		wareNo.bindItems("/Rowset/Row", owareNoitemline);
		wareNo.setModel(oWareNoModel);
		wareNo.setSelectedKey(oWareNoModel.getProperty("/Rowset/Row/1/Key"));
		oControllerThis.getStoragetype();
		//////////////////////////////////////////////////////////////////////////////////////////////////


	},
	onAfterRendering: function () {
		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////

		var sessionExpMsg = getPropertyValue(oResourceModelDisplay, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModelDisplay, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);


		/////////////////////////////////////////////////////////////////////////// End of Timeout /////////////////////////////////////////////////////////

		setInterval(function () {
			oBCPStats = getBCPStatus(bcpElement, "", "");

			if (oBCPStats == "0") {
				downloadld.setEnabled(false);
			} else {
				downloadld.setEnabled(true);
			}
		}, 30000);

		this.getView().byId("Table").clearSelection();


		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell3").getUser().setUsername(username);
		//this.getView().byId("topPanel").setBackgroundDesign(sap.m.BackgroundDesign.Transparent);

		sap.ui.controller("JS.RF_VERID").doDisplay();


	},
	/////////////////////////////////////////////////////////////////////Get Storage Type////////////////////////////////////////////////////////////////////////

	getStoragetype: function () {

		selectedWareNum = oControllerThis.getView().byId("wareNum").getSelectedKey();
                     	ostoTypeModel = new sap.ui.model.xml.XMLModel();
		ostoTypeModel.setSizeLimit(100000);
		ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetStorageType_RFVerifID&Param.1=" + selectedWareNum + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var sType = this.getView().byId("stype");
		var osTypeitemline = new sap.ui.core.ListItem();
		osTypeitemline.bindProperty("text", "STGE_TYPE");
		osTypeitemline.bindProperty("key", "STGE_TYPE");
		sType.bindItems("/Rowset/Row", osTypeitemline);
		sType.setModel(ostoTypeModel);
	},
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	/////////////////////////////////////////////////////////////////////////////////Download button////////////////////////////////////////////////////////////////////

	dodownload: function () {

		whse = oControllerThis.getView().byId("wareNum").getSelectedKey();
		//stype1 = "ALL";
		if (whse == "" || whse == "---" || whse == "undefined" || whse == undefined || whse == null) {
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.alert(getPropertyValue(oResourceModelDisplay, "RF_VERIFID_SELECT_WAREHOUSE"), sap.m.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelDisplay, "TransferDisplay_Message"));

		} else {
			oTable = new sap.ui.model.xml.XMLModel();
			oTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(0);

			});
			oTable.setSizeLimit(100000);
			oTable.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_RF_VerifID&Param.1=" + whse + "&Param.2=0&Param.8=" + userlang + "&Content-Type=text/xml"), "", true);
			var oDisplayTable = this.getView().byId("Table");

			oTable.attachRequestCompleted(function () {
				var oErrorMessage = oTable.getProperty("/Rowset/Row/ERRORMESSAGE");

				var oType = oTable.getProperty("/Rowset/Row/ERRORTYPE");
				if (oType == "E") {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.error(oErrorMessage);

				}


				sap.ui.controller("JS.RF_VERID").doDisplay();
				sap.ui.core.BusyIndicator.hide();

			});

		}


	},
	/////////////////////////////////////////////////////////////////Clear button/////////////////////////////////////////////////////////////////////////////////////////////////////////
	doRefresh: function () {

		var wareNo = this.getView().byId("wareNum").setSelectedKey();
		stype1 = this.getView().byId("stype").setSelectedKeys("");
		sbin1 = this.getView().byId("sbin").setValue("");
		ssec1 = this.getView().byId("ssec").setValue("");
		verifID1 = this.getView().byId("verif").setValue("");
		var tab1 = this.getView().byId("Table");
		var tab2 = new sap.ui.model.xml.XMLModel();
		tab1.setModel(tab2);
	},
	//////////////////////////////////////////////////////////////////Display button/////////////////////////////////////////////////////////////////////////////////////////////////////
	doDisplay: function () {


		whse = oControllerThis.getView().byId("wareNum").getSelectedKey();
		stype1 = oControllerThis.getView().byId("stype").getSelectedKeys();
		//stype2=stype1.toUpperCase();
		sbin1 = oControllerThis.getView().byId("sbin").getValue();
		sbin2 = sbin1.toUpperCase();
		ssec1 = oControllerThis.getView().byId("ssec").getValue();
		verifID1 = oControllerThis.getView().byId("verif").getValue();
		verifID2 = verifID1.toUpperCase();
                        if (whse == "" || whse == "---" || whse == "undefined" || whse == undefined || whse == null) {
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.alert(getPropertyValue(oResourceModelDisplay, "RF_VERIFID_SELECT_WAREHOUSE"), sap.m.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelDisplay, "TransferDisplay_Message"));

		 } else  {


			oTable = new sap.ui.model.xml.XMLModel();
			oTable.attachRequestSent(function () {
				sap.ui.core.BusyIndicator.show(0);

			});
			if (stype1 == "") {
				stype1 = "ALL";
			}
			oTable.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_RF_VerifID&Param.1=" + whse + "&Param.2=1&Param.3=" + stype1 + "&Param.4=" + encodeURIComponent(sbin2) + "&Param.5=" + ssec1 + "&Param.6=" + encodeURIComponent(verifID2) + "&Param.7=" + client + "&Param.8=" + userlang + "&d=" + DateNw + "&Content-Type=text/xml", "", true);
			var oDisplayTable1 = oControllerThis.getView().byId("Table");
			oTable.setSizeLimit(100000);

			oTable.attachRequestCompleted(function () {


				sap.ui.core.BusyIndicator.hide();
				oDisplayTable1.setModel(oTable);
			});

		}

	}


})