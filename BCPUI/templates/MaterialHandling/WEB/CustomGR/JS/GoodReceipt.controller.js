var oResourceModel, oBCPStatusModel;
var userLanguage, oControllerThis;
var typeFromURL, nodeFromURL;
var orderFromURL, matFromURL, desFromURL, GRToastMsgEnable;
var ord, plantFromURL, mvtType, mvt_type_reverse;
var prev_batch, batch, qty, oGRFlag;
var prod, sled;
var sBin, loginID, BKTXT_USNAMEStatus, oGRPalletInfoModel;
var post, su;
var flag, sFlag, isValidUOM;
var prod, prod_type;
var expiryDate, expiryDate1;
var storageBin;
var strBin;
var postDate, prodDate;
var loginID, workstation;
var client, whNo,sLoc_whNo_source, oBCPStats;
var postDate, info;
var fname, lname;
var dateNow, odialog;
var res, resFromURL, suFromURL;
var clientFromURL, target, produced, parcentProd;
var selectedKey, pDateFromURL;
var day1, batchFlag, headerFromURL;
var selectBatchModel, selectList, selectedItem;
var LEQuant, LEUoM;
var selectedKey;
var count, odialog2;
var print, PrintDesc, copies, printUOM;
var bcpElement, changeMat, chgMat;
var oBCPCurrentStatus;
var dSBinFld ;
var PreDefinedBatchFlag;
var targetUOM, producedUOM,TargetIntUOM;
var NonBatchManagedFlag;
var sutype;
var O_MIIBCPFlag;
var I_MIIBCPFlag;
var EPorder = 0;
var AssignedPO;
var  storageLoc;
var dSTypeFld;
var ostoBinModel;
var ostorageType,ostorageBin,flagEdit,storageType,storageBin,selectSTypeList;
var SGTXTStatus, BKTXTStatus, infoheader, infoitem, infoheaderInput, infoitemInput;
jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("JS.GoodReceipt", {
	onInit: function() {
		batchFlag = "0";
		oControllerThis = this;
		jQuery.sap.require("sap.ui.core.format.DateFormat");
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-dd"
		});
 		var dateTimeFormat_xml = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
 		});
		var DateNw = new Date();
		dateNow = dateFormat.format(new Date(DateNw));
		sFlag = "0";
		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details = "CustomGR_alert_BCPOnDeclarationMsg,CustomGR_DeclarationInformation,CustomGR_STypeBinLabel,CustomGR_GR_8,CustomGR_GMReport_2,NPM_COMMON_STORAGE_TYPE,NPM_COMMON_STORAGE_BIN,CustomGR_STypeBin,TransferType_Lbl_StorageType,TransferType_alert_SelectStoageType,TransferType_Lbl_StorageBin,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,EPO_AlreadyAssigned,CustomGR_Alert_Pallet,CustomGR_Alert_Item,CustomGR_Alert_Header,NPM_COMMON_Message,NPDashboard_Confirm,NPDashboard_Close,POPOVER_LOGOUT,CustomGR_GR_1,CustomGR_alert_34,CustomGR_alert_35,CustomGR_GR_23,CustomGR_alert_15,CustomGR_alert_14,NPDashboard_Cancel,NPDashboard_Ok,NPDashboard_Yes,NPDashboard_No,CustomGR_alert_28,CustomGR_alert_29,CustomGR_GRR_8,CustomGR_GRR_23,CustomGR_GRR_24,CustomGR_GRR_25,CustomGR_GRR_2,CustomGR_alert_21,TransferDisplay_Message,CustomGR_alert_22,CustomGR_alert_17,CustomGR_alert_36,CustomGR_alert_16,CustomGR_alert_1,CustomGR_alert_2,CustomGR_alert_23,CustomGR_alert_3,CustomGR_alert_18,CustomGR_alert_4,CustomGR_alert_5,CustomGR_alert_6,CustomGR_alert_24,ECCLabel_alert6,CustomGR_alert_25,CustomGR_alert_7,NPDashboard_Error,CustomGR_alert_19,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_alert_26,CustomGR_alert_30,BCP_COMMON_MSG_QUANTITY,CustomGR_alert_27, CustomGI_alert_13, CustomGI_GIR_13, EPO_UI_ERROR_MSG,NPM_COMMON_UOM4";
		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
        this.getView().byId("pageID").setModel(oResourceModel, "page");
        //this.getView().byId("PanelTitle").setModel(oResourceModel, "panel");
        this.getView().byId("Panel2").setModel(oResourceModel, "panel");
        this.getView().byId("Form1").setModel(oResourceModel, "label");
        this.getView().byId("Form2").setModel(oResourceModel, "label");
        this.getView().byId("CreateBatch").setModel(oResourceModel, "button"); */
		getPropertyValue(oResourceModel, "CustomGR_GR_1");
		var page = this.getView().byId("pageID");
		var identifier = "GR1>NPDashboard_Back,GR2>InBndMatRecpt_title_BCP,GR3>CustomGR_GR_1,GR4>CustomGR_GRR_2,GR5>CustomGR_GR_3,GR6>CustomGR_GR_4,GR7>CustomGR_GR_5,GR8>CustomGR_GR_6,GR9>CustomGR_GR_7,GR10>CustomGR_GR_8,GR11>CustomGR_GR_9,GR12>CustomGR_GR_10,GR13>CustomGR_GR_11,GR14>CustomGR_GR_12,GR15>CustomGR_GR_13,GR16>CustomGR_GR_15,GR17>CustomGR_GR_16,GR18>CustomGR_GRR_14,GR19>CustomGR_GRR_12,GR20>CustomGR_GRR_15,GR21>CustomGR_GMReport_1,GR22>CustomGR_GRR_22,GMReport21>GMReport_ECCGoodsMvmt,GR23>CustomGR_FinalDelivery,GR15>CustomGR_GR_Header,GR18>CustomGR_GR_Item,GR16>CustomGR_GR_PrintUOM";
		localize(page, identifier, userLanguage);
		this.getView().byId("PostDate").setDateValue(DateNw);
		this.getView().byId("ProdDate").setDateValue(DateNw).setEnabled(false);
		plantFromURL = getURLParameter("plantFromURL");
		clientFromURL = getURLParameter("clientFromURL");
		resFromURL = decodeURIComponent(getURLParameter("resFromURL"));
		GRTitle = getPropertyValue(oResourceModel, "CustomGR_GR_23")
		document.title = GRTitle + "-" + resFromURL;
		// alert(decodeURIComponent(getURLParameter("resFromURL")));
		orderFromURL = getURLParameter("orderFromURL");
		matFromURL = getURLParameter("matFromURL");
		desFromURL = decodeURIComponent(getURLParameter("desFromURL"));
		typeFromURL = getURLParameter("typeFromURL");
		nodeFromURL = getURLParameter("nodeFromURL");
		pDateFromURL = getURLParameter("pDateFromURL");
		headerFromURL = getURLParameter("headerFromURL");
		day1 = getURLParameter("day1");
		suFromURL = getURLParameter("suFromURL");
		prod = typeFromURL;
		su = suFromURL;
		// alert(suFromURL);
		fname = document.getElementById("firstname").value;
		lname = document.getElementById("lastname").value;
		loginID = document.getElementById("login").value;
		workstation = document.getElementById("machine").value;
		this.getView().byId("Target").setValue(target);
		this.getView().byId("Produced").setValue(produced);
		this.getView().byId("ProcessOrder").setValue(orderFromURL);
		this.getView().byId("Material").setValue(matFromURL);
		this.getView().byId("MatDes").setValue(desFromURL);
		this.getView().byId("resDes").setValue(resFromURL);
		ord = orderFromURL;
		//EPorder=orderFromURL;
		mvtType = prod == "BYPRODUCT" ? "531" : "101";
		mvt_type_reverse = prod == "BYPRODUCT" ? "532" : "102";

		var processOrder = getPO(ord);
		ord = processOrder[0];
		EPorder = processOrder[1];

		var oBCPStatusModel = new sap.ui.model.xml.XMLModel();
		oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");

		var oTargetModel = new sap.ui.model.xml.XMLModel();
		oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + plantFromURL + "&Param.4=" + EPorder + "&Param.5=" + matFromURL + "&Param.6=" + mvtType + "&Param.7=" + mvt_type_reverse + "&Param.8=" + su + "&Param.9=" + prod + "&Param.10=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
		target = oTargetModel.getProperty("/Rowset/Row/Target");
		targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
		produced = oTargetModel.getProperty("/Rowset/Row/Produced");
		producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");
		TargetIntUOM = oTargetModel.getProperty("/Rowset/Row/TargetIntUOM");
		var formattedTarget = formatQuantity(target, "FORMAT");
		this.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
		var formattedProduced = formatQuantity(produced, "FORMAT");
		this.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);
		////////////////////////////added for progress indicator Userstory 108894/////////////////////////////////
		parcentProd = (produced / target) * 100;
		parcentProd = parcentProd < 100 ? parcentProd : 100;
		this.getView().byId("pi").setPercentValue(parcentProd);
		this.getView().byId("pi").setDisplayValue(formattedProduced + " of " + formattedTarget + " " + producedUOM);
		if (parcentProd < 100) {
			this.getView().byId("pi").setState("Success");
		} else {
			this.getView().byId("pi").setState("Error");
		} ///////////END///////
		////////////////////////////////////////////////WarehouseNo//////////////////////////////////////////////////////////////
		var whModel = new sap.ui.model.xml.XMLModel();

		whModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + matFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + ord + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		whNo = whModel.getProperty('/Rowset/Row/WHNumber');

		////////////////////////////////////////////////SLOC//////////////////////////////////////////////////////////////
		var ogetSlocAndWh= new sap.ui.model.xml.XMLModel();
		ogetSlocAndWh.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+ord+"&Param.2=" +clientFromURL+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);   
		storageLoc = ogetSlocAndWh.getProperty("/Rowset/Row/LGORT");

		////////////////////////////////////////////////EWMorECC//////////////////////////////////////////////////////////////
		var ogetSource= new sap.ui.model.xml.XMLModel();
		ogetSource.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&Param.2=" +whNo+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		sLoc_whNo_source = ogetSource.getProperty("/Rowset/Row/source");
		if (sLoc_whNo_source=="EWM" && typeFromURL=="HEADER"){
		  this.getView().byId("changeMatID").setEnabled(false);
		  this.getView().byId("btnECCGMId").setVisible(false);
		}
		//////////////////////////////////////////////////// PRINTER ////////////////////////////////////////////////////////////////////////////////////////////
		if (suFromURL == "X" && (oBCPStats != "1" || sLoc_whNo_source=="EWM")) //BCP ON
		{
			oBCPCurrentStatus = "ON";
			var oExisPrinterModel = new sap.ui.model.xml.XMLModel();
			oExisPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=" + nodeFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			PrintDesc = this.getView().byId("printerID");
			var oPrintDescline = new sap.ui.core.ListItem();
			oPrintDescline.bindProperty("text", "VALUE");
			oPrintDescline.bindProperty("key", "KEY");
			PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
			PrintDesc.setModel(oExisPrinterModel);
			print = oExisPrinterModel.getProperty('/Rowset/Row/KEY');
			copies = print.split("---")[2];
			this.getView().byId("copies").setValue(copies);
			this.getView().byId("printerID").setVisible(true);
			this.getView().byId("printerLabel").setVisible(true);
			this.getView().byId("copies").setVisible(true);
			this.getView().byId("copyLabel").setVisible(true);
			this.getView().byId("printerUOM").setVisible(true);
			// var oPritDesc="PRINTER_DESC";
		} else if (suFromURL == "X" && oBCPStats == 1) //BCP OFF
		{
			oBCPCurrentStatus = "OFF";
			var oExisPrinterModelBCPOFF = new sap.ui.model.xml.XMLModel();
			oExisPrinterModelBCPOFF.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType_BCPOFF&Param.1=" + nodeFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			PrintDesc = this.getView().byId("printerID");
			var oPrintDescline = new sap.ui.core.ListItem();
			oPrintDescline.bindProperty("text", "VALUE");
			oPrintDescline.bindProperty("key", "KEY");
			PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
			PrintDesc.setModel(oExisPrinterModelBCPOFF);
			this.getView().byId("printerID").setVisible(true);
			this.getView().byId("printerLabel").setVisible(true);
			this.getView().byId("printerUOM").setVisible(false);
			this.getView().byId("copies").setVisible(false);
			this.getView().byId("copyLabel").setVisible(false);
			// var oPritDesc="PRINTER_DESC";
		}

		/////////////////////////////////////////////////////////////////////////// FETCH UOM //////////////////////////////////////////////////////////////////////
		var prodUomModel = new sap.ui.model.xml.XMLModel();
		prodUomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&Param.3=" + userLanguage + "&Param.4=ISOCODE" + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var prodUom = this.getView().byId("uom");
		var prodUomitemline = new sap.ui.core.ListItem();
		prodUomitemline.bindProperty("text", "UOMDESC");
		prodUomitemline.bindProperty("key", "UOM");
		prodUom.bindItems("/Rowset/Row", prodUomitemline);
		prodUom.setModel(prodUomModel);
		var LEModel = new sap.ui.model.xml.XMLModel();
		var uomModel = new sap.ui.model.xml.XMLModel();
		LEModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetLEUOMGR&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&Param.4=" + userLanguage + "&Param.5=" + ord +"&Param.6=" + prod + "&Param.7=" + target + "&Param.8=" + targetUOM + "&Param.9=" + TargetIntUOM + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var uom = this.getView().byId("uom");console.log(LEModel.getXML());
		LEUoM = LEModel.getProperty('/Rowset/Row/UOM');
		LEQuant = LEModel.getProperty('/Rowset/Row/QUANTITY');
		var FormattedQuantity = formatQuantity(LEQuant, "FORMAT");
		if (prod == "HEADER") {
			if (LEQuant == "" || LEQuant == "---") {
				uomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQLQ_GetGMEIN&Param.1=" + ord + "&Param.2=" + clientFromURL + "&Param.3=" + plantFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				var uom = this.getView().byId("uom");
				var uom1 = uomModel.getProperty('/Rowset/Row/GMEIN');
				uom.setSelectedKey(uom1);
			} else {
				this.getView().byId("quant").setValue(FormattedQuantity);
				this.getView().byId("uom").setSelectedKey(LEUoM);
			}
		} else {
			if (LEQuant == "" || LEQuant == "---") {
				uomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetUnitAreaForCo_ByProd&Param.1=" + ord + "&Param.2=" + matFromURL + "&cache=" + DateNw + "&Content-Type=text/xml"), "", false);
				var uom = this.getView().byId("uom");
				var uom1 = uomModel.getProperty('/Rowset/Row/MEINS');
				uom.setSelectedKey(uom1);
			} else {
				this.getView().byId("quant").setValue(FormattedQuantity);
				this.getView().byId("uom").setSelectedKey(LEUoM);
			}
		}

		if (suFromURL == "X" && (oBCPStats != "1" || sLoc_whNo_source=="EWM")) //BCP ON
		{

			this.altUOMDisplay();
		}
		/* var odialogModel1= new sap.ui.model.xml.XMLModel();
        odialogModel1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetMaterials_GR_ByProd&Param.1="+ord+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
        selectedKey = odialogModel1.getProperty("/Rowset/Row/Key");

        if(selectedKey==""){
        this.getView().byId("reworkID").setVisible(false);
        }
		 */
		///// FOR Batches and Predefined Batches
		var bat = "BATCHES";
		prev_batch = "";
		selectBatchModel = new sap.ui.model.xml.XMLModel();
		selectBatchModel.setSizeLimit(10000);


		selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox_PreDefinedBatch&Param.1=" + bat + "&Param.5=" + clientFromURL + "&Param.6=" + plantFromURL + "&Param.7=" + nodeFromURL + "&Param.8=" + ord + "&Param.9=" + matFromURL + "&Param.10=" + mvtType + "&Param.11=" + userLanguage + "&Param.12=" + typeFromURL + "&Param.13=" + EPorder + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		PreDefinedBatchFlag = selectBatchModel.getProperty('/Rowset/Row/PreDefinedBachFlag');

		var statusSuccess = selectBatchModel.getProperty('/Rowset/Row/status');
		var message = selectBatchModel.getProperty('/Rowset/Row/message');
		////////////////Nonbatch managed Query call////////////////////////////////
		nonBatchManagedModel = new sap.ui.model.xml.XMLModel();
		nonBatchManagedModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		NonBatchManagedFlag = nonBatchManagedModel.getProperty('/Rowset/Row/XCHPF');
		var selectBatch = this.getView().byId("batchNo");
		var CreateBatchButton = this.getView().byId("CreateBatch");
		var sled = this.getView().byId("sledDate");
		var DeclareButton = this.getView().byId("decID");console.log("PreDefinedBatchFlag: "+PreDefinedBatchFlag+" NonBatchManagedFlag: "+NonBatchManagedFlag+" suFromURL: "+suFromURL);
		if (PreDefinedBatchFlag == "PreDefined" && statusSuccess == "S") {
			var batc = selectBatchModel.getProperty('/Rowset/Row/Value');
			selectBatch.setValue(batc);
			oControllerThis.populateSLEDdateProdDate(batc);
			selectBatch.setEnabled(false);
			CreateBatchButton.setEnabled(false);
			oControllerThis.getView().byId("sledDate").setEnabled(true);
			oControllerThis.getView().byId("ProdDate").setEnabled(true);
			if (expiryDate1 != "") {
				//var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
				//expiryDate = dateFormat1.format(new Date(expiryDate1));	
				sled.setValue(expiryDate1.substring(0, 10));
				oControllerThis.calculateSledDaysCount(expiryDate1.substring(0, 10));
			}
		} else if (PreDefinedBatchFlag == "IncorrectFormatBatch" && statusSuccess == "S") {
			CreateBatchButton.setEnabled(false);
			DeclareButton.setEnabled(false);
			selectBatch.setEnabled(false);
		} else if ((PreDefinedBatchFlag == "IncorrectFormatBatch" || PreDefinedBatchFlag == "PreDefined") && statusSuccess == "E") {
			alert(message);
			CreateBatchButton.setEnabled(false);
			DeclareButton.setEnabled(false);
			selectBatch.setEnabled(false);
		} else if (NonBatchManagedFlag != "X") {
			this.getView().byId("batchNo").setEnabled(false);
			CreateBatchButton.setEnabled(false);
			var GetProdDateModel = new sap.ui.model.xml.XMLModel();
			GetProdDateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGRProdDate&Param.1=" + dateTimeFormat_xml.format(DateNw) + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + nodeFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			var oProdDateNw= GetProdDateModel.getProperty('/Rowset/Row/oProdDate');
			console.log("DateNw: "+oProdDateNw);
			oControllerThis.getView().byId("ProdDate").setDateValue(new Date(oProdDateNw));
			oControllerThis.getView().byId("ProdDate").setEnabled(true);
			oControllerThis.getView().byId("sledDate").setEnabled(false);
		} else {
			var batc = selectBatchModel.getProperty('/Rowset/Row/Value');
			selectBatch.setValue(batc);
			selectBatch.setEnabled(true);
			oControllerThis.populateSLEDdateProdDate(batc);
		}
		///////////////////////////////////////////////////////Change Material/////////////////////////////////////////////
		var changeMaterialModel = new sap.ui.model.xml.XMLModel();
		changeMaterialModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetChangeMaterial&Param.1=" + ord + "&Param.2=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		changeMat = this.getView().byId("changeMatID");
		var changeMatline = new sap.ui.core.ListItem();
		changeMatline.bindProperty("text", "Value");
		changeMatline.bindProperty("key", "Key");
		changeMat.bindItems("/Rowset/Row", changeMatline);
		changeMat.setModel(changeMaterialModel);
		chgMat = changeMaterialModel.getProperty('/Rowset/Row/Key');
		var xmlDoc = changeMaterialModel.getXML();
		var i = 0;
		//alert($(xmlDoc).find("Row:contains(matFromURL)"));
		$(xmlDoc).find("Row").each(function() {
			if (($(this).find("Value").text().split("-")[0]) == matFromURL) {
				changeMat.setSelectedKey($(this).find("Key").text());
			}
		});
		//var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
		//pDate = dateFormat1.format(new Date(pDate));	
		//oControllerThis.getView().byId("ProdDate").setValue(pDate.substring(0, 10));
		//oControllerThis.getView().byId("sledDate").setEnabled(false);
		//oControllerThis.getView().byId("ProdDate").setEnabled(false);
		/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
		var oModelDF = new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache=" + new Date() + "&Content-Type=text/xml", "", false);
		var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
		this.getView().byId("ProdDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("sledDate").setDisplayFormat(oDisplayFormat);
		this.getView().byId("PostDate").setDisplayFormat(oDisplayFormat);
		//////////////////////////////////////////////////////////////////////////GRToastMsg/////////////////////////////////////////////////////////////////////
		var DateNw = new Date();
		oGRFlag = new sap.ui.model.xml.XMLModel();
		oGRFlag.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGR_ConfirmationMsgFlag&Param.1=" + 1 + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

		///////////////////////////////////////////////////////////////////////////GR Pallet Info Field///////////////////////////////////////////////////////////////////////////////////////////////	
		oGRPalletInfoModel = new sap.ui.model.xml.XMLModel();
		oGRPalletInfoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=0&Param.2=GR_PALLETINFOFIELD&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
		//BKTXT_USNAMEStatus = oGRPalletInfoModel.getProperty("/Rowset/Row/BKTXT_USNAME");
		BKTXTStatus = oGRPalletInfoModel.getProperty("/Rowset/Row/BKTXT");
		SGTXTStatus = oGRPalletInfoModel.getProperty("/Rowset/Row/SGTXT");

		if (BKTXTStatus == "USNAME") {
			this.getView().byId("info").setEnabled(false);
			this.getView().byId("info").setValue(loginID.toUpperCase());
		} else if (BKTXTStatus == "MANDAT") {
			var infoLab = this.getView().byId("infoLabel").getLabelControl();
			infoLab.setRequired(true);
		}

		if (SGTXTStatus == "USNAME") {
			this.getView().byId("itemInfo").setEnabled(false);
			this.getView().byId("itemInfo").setValue(loginID.toUpperCase());
		} else if (SGTXTStatus == "MANDAT") {
			var itemInfoLab = this.getView().byId("itemInfoLabel").getLabelControl();
			itemInfoLab.setRequired(true);
		}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	},
	onAfterRendering: function() {
		var DateNw = new Date();
		var FormatDate = getUTCCurrentDateSeconds(DateNw);
		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);
		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
		var PrinterIDRefresh = this.getView().byId("printerID");
		var PrinterlabelRefresh = this.getView().byId("printerLabel");
		var CopiesRefresh = this.getView().byId("copies");
		var CopyLabelRefresh = this.getView().byId("copyLabel");
		var PrinterUOMRefresh = this.getView().byId("printerUOM");
		//PrinterIDRefresh.setVisible(true);		
		//PrinterlabelRefresh.setVisible(true);
		setInterval(function() {
			oBCPStats = getBCPStatus(bcpElement, "", "");
			var DateNw = new Date();
			//alert(this.getView().byId("printerID"));
			if (suFromURL == "X" && oBCPStats == 1 && oBCPCurrentStatus == "ON" && sLoc_whNo_source!="EWM") //BCPOFF, was ON
			{
				oBCPCurrentStatus = "OFF";
				var oExisPrinterModelBCPOFF = new sap.ui.model.xml.XMLModel();
				oExisPrinterModelBCPOFF.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType_BCPOFF&Param.1=" + nodeFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				PrintDesc = oControllerThis.getView().byId("printerID");
				var oPrintDescline = new sap.ui.core.ListItem();
				oPrintDescline.bindProperty("text", "VALUE");
				oPrintDescline.bindProperty("key", "KEY");
				PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
				PrintDesc.setModel(oExisPrinterModelBCPOFF);
				oControllerThis.getView().byId("printerID").setVisible(true);
				oControllerThis.getView().byId("printerLabel").setVisible(true);
				oControllerThis.getView().byId("copies").setVisible(false);
				oControllerThis.getView().byId("copyLabel").setVisible(false);
				oControllerThis.getView().byId("printerUOM").setVisible(false);
				//PrinterIDRefresh.setVisible(true);		
				//PrinterlabelRefresh.setVisible(true);
				//CopiesRefresh.setVisible(false);		
				//CopyLabelRefresh.setVisible(false);
			} else if (suFromURL == "X" && ((oBCPStats != 1 && oBCPCurrentStatus == "OFF") || sLoc_whNo_source=="EWM")) //BCPON,was ON
			{
				oBCPCurrentStatus = "ON";
				var oExisPrinterModel = new sap.ui.model.xml.XMLModel();
				oExisPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=" + nodeFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				PrintDesc = oControllerThis.getView().byId("printerID");
				var oPrintDescline = new sap.ui.core.ListItem();
				oPrintDescline.bindProperty("text", "VALUE");
				oPrintDescline.bindProperty("key", "KEY");
				PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
				PrintDesc.setModel(oExisPrinterModel);
				print = oExisPrinterModel.getProperty('/Rowset/Row/KEY');
				copies = print.split("---")[2];
				oControllerThis.getView().byId("copies").setValue(copies);
				oControllerThis.getView().byId("printerID").setVisible(true);
				oControllerThis.getView().byId("printerLabel").setVisible(true);
				oControllerThis.getView().byId("copies").setVisible(true);
				oControllerThis.getView().byId("copyLabel").setVisible(true);
				oControllerThis.getView().byId("printerUOM").setVisible(true);
				oControllerThis.altUOMDisplay();
				//PrinterIDRefresh.setVisible(true);		
				//PrinterlabelRefresh.setVisible(true);
				//CopiesRefresh.setVisible(true);		
				//CopyLabelRefresh.setVisible(true);
			}
		}, 30000);
		//Message for Incorrect Format Predefined Batch
		if (PreDefinedBatchFlag == "IncorrectFormatBatch") {
			sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CustomGR_alert_30"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		}
		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell3").getUser().setUsername(username);
	},
	getSlocAndWhNo: function() {
		var ogetSlocAndWh= new sap.ui.model.xml.XMLModel();
		ogetSlocAndWh.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+ord+"&Param.2=" +clientFromURL+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);   
		storageLoc = ogetSlocAndWh.getProperty("/Rowset/Row/LGORT");
	},
	calculateSledDaysCount: function(sledDate) {
		var date1 = new Date(sledDate);
		var date2 = new Date(oControllerThis.getView().byId("ProdDate").getValue());
		var timeDiff = (date1.getTime() - date2.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		/********************************************************VSTS 101552************************************************************/
		if (diffDays < 0) {
			oControllerThis.getView().byId("shelfDays").setValue("");
		} else {
			oControllerThis.getView().byId("shelfDays").setValue(diffDays + " " + getPropertyValue(oResourceModel, "CustomGI_GIR_13")); //
		}
	},
	getPrinter: function() {
		print = this.getView().byId("printerID").getSelectedKey();
		// alert(print);
		copies = print.split("---")[2];
		this.getView().byId("copies").setValue(copies);
		this.getView().byId("copies").setEnabled(true);
		if (copies == "") {
			this.getView().byId("copies").setEnabled(false);
		}
	},
	handlePostingDateChange: function() {
		var DateNw = new Date();
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-dd"
		});
		dateNow = dateFormat.format(new Date(DateNw));
	},
	getBatch: function() {
		var DateNw = new Date();
		selectList = new sap.m.SelectList({
			selectionChange: sap.ui.controller("JS.GoodReceipt").okDialogFn
		});
		var odialogItemline = new sap.ui.core.ListItem();
		odialogItemline.bindProperty("text", "Value");
		odialogItemline.bindProperty("key", "Key");
		selectList.bindItems("/Rowset/Row", odialogItemline);
		selectList.setModel(selectBatchModel);
		var searchBatch = new sap.m.SearchField({
			placeholder: getPropertyValue(oResourceModel, "CustomGR_alert_15"),
			liveChange: function(oEvent) {
				var sQuery = oEvent.getSource().getValue();
				var binding = selectList.getBinding("items");
				var filters = [
					new sap.ui.model.Filter("Key", sap.ui.model.FilterOperator.Contains, sQuery)
					];
				var oFilter = new sap.ui.model.Filter({
					aFilters: filters,
					_bMultiFilter: true
				});
				binding.filter(oFilter);
			}
		});
		oDialog = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "CustomGR_alert_14"),
			content: [searchBatch, selectList],
			buttons: [
				new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
					press: function() {
						oDialog.close();
					}
				})
				],
		});
		oDialog.setContentWidth("130px");
		oDialog.setContentHeight("300px");
		oDialog.open();
	},
	populateSLEDdateProdDate: function(batc) {
	  var DateNw= new Date();
	  var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-dd"
	  });
	  var sled = oControllerThis.getView().byId("sledDate");
	  if (batc == "" || batc == "---") {
		batc = "null";
	  }else{
	  ////////////////////////////////to Reconsider existing batch as new, if it has total 0 quantity declared//////////////////////////////////////
	  var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GoodsMovemetReportInput><language>" + userLanguage + 
						"</language><client>" + clientFromURL + "</client><plant>" + plantFromURL + 
						"</plant><nodeID>" + nodeFromURL + "</nodeID><matrNumber>" + matFromURL + 
						"</matrNumber><BatchNumber>"+batc+"</BatchNumber><routingOperationNumber/></GoodsMovemetReportInput>";
	  console.log(InputXMLInStringFormat);
	  var BatchReportModel = new sap.ui.model.xml.XMLModel();
	  BatchReportModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_BatchPostedGoodsMovement_GR&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
	  var batchQuantity= BatchReportModel.getProperty('/Rowset/Row/oQuantity');
	  console.log("hi"+batchQuantity);
	  existingBatch= (batchQuantity=="0" || batchQuantity=="NA")? "0": "1";
	}
	var dateTimeFormat_prodDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "MM/dd/yyyy HH:mm:ss"
 	});
 	var dateTimeFormat_xml = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
 	});
	console.log("DateNw: "+dateTimeFormat_xml.format(DateNw));
	var GetProdDateModel = new sap.ui.model.xml.XMLModel();
	GetProdDateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGRProdDate&Param.1=" + dateTimeFormat_xml.format(DateNw) + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + nodeFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
	var oProdDateNw= GetProdDateModel.getProperty('/Rowset/Row/oProdDate');
	console.log("DateNw: "+oProdDateNw);
	oControllerThis.getView().byId("ProdDate").setDateValue(new Date(oProdDateNw));
	if (batc!="null" && (batchQuantity=="0" || batchQuantity=="NA")){
	  oControllerThis.getView().byId("sledDate").setEnabled(true);
	  oControllerThis.getView().byId("ProdDate").setEnabled(true);
	  prodDate = oControllerThis.getView().byId("ProdDate").getValue();
	  var GetMaterialTypeModel = new sap.ui.model.xml.XMLModel();
	  GetMaterialTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetMaterialType&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
	  var noOfRows_materialType = $(GetMaterialTypeModel.getData()).find("Row").size();
	  if (noOfRows_materialType > 0) {
		var matType = GetMaterialTypeModel.getProperty("/Rowset/Row/MTART");
		prodDate = dateTimeFormat_prodDate.format(new Date(prodDate+"T00:00:00"));
		var GetShelfLifeDateModel = new sap.ui.model.xml.XMLModel();
		GetShelfLifeDateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetShelfLifeDate_ExpiryDate&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&Param.4=" + matType + "&Param.5=" + prodDate + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var val_shelfLifeDate = GetShelfLifeDateModel.getProperty("/Rowset/Row/O_ExpiryDate");
		if (val_shelfLifeDate != "") {
		  val_shelfLifeDate = dateFormat.format(new Date(val_shelfLifeDate));
		  oControllerThis.getView().byId("sledDate").setValue(val_shelfLifeDate);
		  oControllerThis.calculateSledDaysCount(val_shelfLifeDate);
		}
	  }

	}else{
	  var expiryDate1 = selectBatchModel.getProperty('/Rowset/Row/SLED');
	  var pDate = selectBatchModel.getProperty('/Rowset/Row/PRODUCTION_DATE');

	  var sledModel = new sap.ui.model.xml.XMLModel();
	  sledModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetSLED_by_Batch_OrderIndependent&Param.1=" + clientFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + nodeFromURL + "&Param.4=" + matFromURL + "&Param.5=" + mvtType + "&Param.6=" + batc + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
	  expiryDate1 = sledModel.getProperty('/Rowset/Row/SLED');
	  pDate = sledModel.getProperty('/Rowset/Row/PRODUCTION_DATE');
	  if (expiryDate1 != "") {
		//var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"});
		//expiryDate = dateFormat1.format(new Date(expiryDate1));
		sled.setValue(expiryDate1.substring(0, 10));
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-dd"
		});
		pDate = dateFormat1.format(new Date(pDate));
		oControllerThis.getView().byId("ProdDate").setValue(pDate).setEnabled(false);
		oControllerThis.calculateSledDaysCount(expiryDate1.substring(0, 10));
		oControllerThis.getView().byId("sledDate").setEnabled(false);
	 }else{
		oControllerThis.getView().byId("ProdDate").setEnabled(true);
		oControllerThis.getView().byId("sledDate").setValue("").setEnabled(false);
	 }
	}
	  /////////// Batch END/////////////////

	},

	okDialogFn: function(event) {
		var DateNw = new Date();
		batch = selectList.getSelectedItem().getText();
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-dd"
		});
		oControllerThis.populateSLEDdateProdDate(batch);
		oControllerThis.getView().byId("batchNo").setValue(batch);
		oDialog.destroy();
		oControllerThis.getView().byId("PostDate").setDateValue(DateNw); /////////////////////////////////RESET POSTING DATE-101552
		// oControllerThis.getView().byId("batchNo").setEnabled(false);
		//existingBatchFlag="1";
	},

	checkExistBatch: function(obj) {
		batchFlag = "1";
		//existingBatchFlag = "0";
		var existingBatch = "0";
		var DateNw = new Date();
		var batch = this.getView().byId("batchNo").getValue();
		batch = batch.toUpperCase();
		this.getView().byId("batchNo").setValue(batch);
		if (batch == "" || batch == "---") {
			batch = "null";
		}

		$(selectBatchModel.getData()).find("Row").each(function() {
			var batchValue = $(this).find("Value").text();
			if (batchValue == batch) {
				existingBatch = "1";
			}
		});

		////////////////////////////////to Reconsider existing batch as new, if it has total 0 quantity declared//////////////////////////////////////
		//if (existingBatch == "1") {
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GoodsMovemetReportInput><language>" + userLanguage + "</language><client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant><nodeID>" + nodeFromURL + "</nodeID><matrNumber>" + matFromURL + "</matrNumber><BatchNumber>"+batch+"</BatchNumber><routingOperationNumber/></GoodsMovemetReportInput>"
			console.log(InputXMLInStringFormat);
			var BatchReportModel = new sap.ui.model.xml.XMLModel();
			BatchReportModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_BatchPostedGoodsMovement_GR&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			var batchQuantity= BatchReportModel.getProperty('/Rowset/Row/oQuantity');
			console.log("hi"+batchQuantity);
			existingBatch= (batchQuantity=="0" || batchQuantity=="NA")? "0": "1";
		//}
		var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-dd"
		});

		this.getView().byId("PostDate").setDateValue(DateNw); /////////////////////////////////RESET POSTING DATE
		//////////////////////////////////////////////////////////////////////////Enable And Disable of SLED & PROD Date on Batch Input/////////////////////////////////////////////////////////////
		if (existingBatch == "1") {
			var batchExistModel = new sap.ui.model.xml.XMLModel();
			batchExistModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetSLED_by_Batch_OrderIndependent&Param.1=" + clientFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + nodeFromURL + "&Param.4=" + matFromURL + "&Param.5=" + mvtType + "&Param.6=" + batch + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			var noOfRows = $(batchExistModel.getData()).find("Row").size();
			if (noOfRows > 0) {
				//existingBatchFlag="1";
				var sled = oControllerThis.getView().byId("sledDate");
				var expiryDate1 = batchExistModel.getProperty('/Rowset/Row/SLED');
				var pDate = batchExistModel.getProperty('/Rowset/Row/PRODUCTION_DATE');
				pDate = dateFormat1.format(new Date(pDate));
				oControllerThis.getView().byId("ProdDate").setValue(pDate);
				if (expiryDate1 != "") {
					expiryDate = dateFormat1.format(new Date(expiryDate1));
					// var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MMMM dd, yyyy"});
					// sledDate = dateFormat.format(new Date(expiryDate1));	
					sled.setValue(expiryDate);
					oControllerThis.calculateSledDaysCount(expiryDate);
				}
				oControllerThis.getView().byId("sledDate").setEnabled(false);
				oControllerThis.getView().byId("ProdDate").setEnabled(false);

			}
			prev_batch = "";
		} else {

			if (!oControllerThis.getView().byId("sledDate").getEnabled() || (prev_batch != "" && prev_batch != "undefined" && prev_batch != batch && batch.length <= prev_batch.length)) {
				oControllerThis.getView().byId("ProdDate").setEnabled(true);
				oControllerThis.getView().byId("sledDate").setEnabled(true);
				var dateTimeFormat_prodDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "MM/dd/yyyy HH:mm:ss"
				});
				var dateTimeFormat_xml = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "yyyy-MM-ddTHH:mm:ss"
				});
				var DateNw = new Date();//////////////////////////////////////////////////////////////////////////////////////////madhu///////////////////////////////////////////////
				console.log("DateNw: "+dateTimeFormat_xml.format(DateNw));
				var GetProdDateModel = new sap.ui.model.xml.XMLModel();
				GetProdDateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGRProdDate&Param.1=" + dateTimeFormat_xml.format(DateNw) + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + nodeFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				var oProdDateNw= GetProdDateModel.getProperty('/Rowset/Row/oProdDate');
				console.log("DateNw: "+oProdDateNw);
				
				oControllerThis.getView().byId("ProdDate").setDateValue(new Date(oProdDateNw));
				prodDate = oControllerThis.getView().byId("ProdDate").getValue();
				var GetMaterialTypeModel = new sap.ui.model.xml.XMLModel();
				GetMaterialTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetMaterialType&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				var noOfRows_materialType = $(GetMaterialTypeModel.getData()).find("Row").size();
				if (noOfRows_materialType > 0) {
					var matType = GetMaterialTypeModel.getProperty("/Rowset/Row/MTART");
					prodDate = dateTimeFormat_prodDate.format(new Date(prodDate+"T00:00:00"));


					var GetShelfLifeDateModel = new sap.ui.model.xml.XMLModel();
					GetShelfLifeDateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetShelfLifeDate_ExpiryDate&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&Param.4=" + matType + "&Param.5=" + prodDate + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
					var val_shelfLifeDate = GetShelfLifeDateModel.getProperty("/Rowset/Row/O_ExpiryDate");
					if (val_shelfLifeDate != "") {
						val_shelfLifeDate = dateFormat1.format(new Date(val_shelfLifeDate));
						oControllerThis.getView().byId("sledDate").setValue(val_shelfLifeDate);
						oControllerThis.calculateSledDaysCount(val_shelfLifeDate);
					}else{
						oControllerThis.getView().byId("ProdDate").setEnabled(true);
						oControllerThis.getView().byId("sledDate").setValue("").setEnabled(false);
					}
				}else{
					oControllerThis.getView().byId("ProdDate").setEnabled(true);
					oControllerThis.getView().byId("sledDate").setValue("").setEnabled(false);
				 }
			}
			prev_batch = batch;
		}
		///////////////////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	},
	pressBatch: function() {
		var DateNw = new Date();
		var matType = "undefined";
		if (this.getView().byId("ProdDate").getEnabled() == false) {
			this.getView().byId("ProdDate").setDateValue(DateNw);
		}
		prodDate = this.getView().byId("ProdDate").getValue();
		this.getView().byId("PostDate").setDateValue(DateNw); /////////////////////////////////RESET POSTING DATE
		var bool = oControllerThis.getView().byId("ProdDate").getEnabled();
		if (!bool || (prev_batch != "" && prev_batch != "undefined")) {
			var DateNw = new Date();
				var dateTimeFormat_xml = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "yyyy-MM-ddTHH:mm:ss"
				});
			console.log("DateNw: "+dateTimeFormat_xml.format(DateNw));
			var GetProdDateModel = new sap.ui.model.xml.XMLModel();
			GetProdDateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGRProdDate&Param.1=" + dateTimeFormat_xml.format(DateNw) + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + nodeFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			var oProdDateNw= GetProdDateModel.getProperty('/Rowset/Row/oProdDate');
			console.log("DateNw: "+oProdDateNw);
				
			oControllerThis.getView().byId("ProdDate").setDateValue(new Date(oProdDateNw));
			//this.getView().byId("ProdDate").setDateValue(DateNw);
			prodDate = this.getView().byId("ProdDate").getValue();
		}
		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><BatchDetailsInput><materialNumber>" + matFromURL + "</materialNumber><plant>" + plantFromURL + "</plant><client>" + clientFromURL + "</client><materialType>" + matType + "</materialType><productionDate>" + prodDate + "</productionDate></BatchDetailsInput>"
		var BatchModel = new sap.ui.model.xml.XMLModel();
		BatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_ToGenerateBatch&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false, 'POST');
		var BatchNo = this.getView().byId("batchNo");
		var batc = BatchModel.getProperty('/batchNumber');
		BatchNo.setValue(batc);
		var message = BatchModel.getProperty('/message');
		expiryDate = BatchModel.getProperty('/expiryDate');
		// var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MMMM dd, yyyy"});
		// var sled = dateFormat.format(new Date(expiryDate));	
		this.getView().byId("sledDate").setValue(expiryDate);
		oControllerThis.calculateSledDaysCount(expiryDate);
		var status = BatchModel.getProperty('/status');
		if (status = "S") {
			sap.m.MessageToast.show(message);
		} else {
			alert(message);
		}
		this.getView().byId("batchNo").setEnabled(true);
		batchFlag = "1";
		prev_batch = batc;
		//////////////////////////////////////////////////////////////////////////Enable And Disable of SLED & PROD Date on Batch Input/////////////////////////////////////////////////////////////
		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GoodsMovemetReportInput><language>" + userLanguage + "</language><client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant><nodeID>" + nodeFromURL + "</nodeID><matrNumber>" + matFromURL + "</matrNumber><BatchNumber>"+batc+"</BatchNumber><routingOperationNumber/></GoodsMovemetReportInput>"
		console.log(InputXMLInStringFormat);
		var BatchReportModel = new sap.ui.model.xml.XMLModel();
		BatchReportModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_BatchPostedGoodsMovement_GR&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var batchQuantity= BatchReportModel.getProperty('/Rowset/Row/oQuantity');
		console.log("hi"+batchQuantity);
		existingBatch= (batchQuantity=="0" || batchQuantity=="NA")? "0": "1";

		if (batchQuantity=="0" || batchQuantity=="NA") {
			oControllerThis.getView().byId("ProdDate").setEnabled(true);
			oControllerThis.getView().byId("sledDate").setEnabled(true);
		} else {
			var batchExistModel = new sap.ui.model.xml.XMLModel();
			batchExistModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetSLED_by_Batch_OrderIndependent&Param.1=" + clientFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + nodeFromURL + "&Param.4=" + matFromURL + "&Param.5=" + mvtType + "&Param.6=" + batc + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			/////////////////////////var noOfRows = $(batchExistModel.getData()).find("Row").size();////////////////noOfRows > 0
			var sled = oControllerThis.getView().byId("sledDate");
			var expiryDate1 = batchExistModel.getProperty('/Rowset/Row/SLED');
			var pDate = batchExistModel.getProperty('/Rowset/Row/PRODUCTION_DATE');console.log("batchExistModel: "+pDate);
			var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-dd"
			});
			pDate = dateFormat1.format(new Date(pDate));
			oControllerThis.getView().byId("ProdDate").setValue(pDate);
			if (expiryDate1 != "") {
				var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "yyyy-MM-dd"
				});
				expiryDate = dateFormat1.format(new Date(expiryDate1));
				// var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MMMM dd, yyyy"});
				// sledDate = dateFormat.format(new Date(expiryDate1));	
				sled.setValue(expiryDate);
				oControllerThis.calculateSledDaysCount(expiryDate);
			}
			oControllerThis.getView().byId("batchNo").setValue(batc);
			oControllerThis.getView().byId("sledDate").setEnabled(false);
			oControllerThis.getView().byId("ProdDate").setEnabled(false);
		}
		/* /////////////////////////////////////////////////////////////////////////////Goods Receipt Pallet Info field/////////////////////////////////////////////////////////////////////////////////////////////////////////
         if (BKTXT_USNAMEStatus == 1) {
             this.getView().byId("info").setEnabled(false);
             this.getView().byId("info").setValue(loginID.toUpperCase());
         }
         ///////////////////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
	},

	handleSledDateChange: function(evt) {
		oControllerThis.calculateSledDaysCount(evt.getSource().getValue());
	},

	handleProdDateChange: function() {
		var DateNw = new Date();
		if (batchFlag == "1") {
			batch = this.getView().byId("batchNo").getValue();
			var matType = "undefined";
			prodDate = this.getView().byId("ProdDate").getValue();
			
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><BatchDetailsInput><materialNumber>" + matFromURL + "</materialNumber><plant>" + plantFromURL + "</plant><client>" + clientFromURL + "</client><materialType>" + matType + "</materialType><productionDate>" + prodDate + "</productionDate></BatchDetailsInput>"
			var BatchModel = new sap.ui.model.xml.XMLModel();
			BatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_ToGenerateBatch&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			expiryDate = BatchModel.getProperty('/expiryDate');
			// var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "MMMM dd, yyyy"});
			// var sled = dateFormat.format(new Date(expiryDate));	
			this.getView().byId("sledDate").setValue(expiryDate);
			oControllerThis.calculateSledDaysCount(expiryDate);
		}
	},


	////////////////////////////////////////////////////////////Select Storage Type And Bin in BCP ON Mode///////////////////////////////////////////////////////////
	performGR: function(){

		var material= this.getView().byId("Material").getValue();


		var DateNw = new Date();
		var batchGR= this.getView().byId("batchNo").getValue();
		var ogetSlocAndWh= new sap.ui.model.xml.XMLModel();
		ogetSlocAndWh.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+ord+"&Param.2=" +clientFromURL+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);   
		storageLoc = ogetSlocAndWh.getProperty("/Rowset/Row/LGORT");

		if((oBCPStats == "0" || oBCPStats == "2") && sLoc_whNo_source!= "EWM"){
			var ostorageTypeBinModel = new sap.ui.model.xml.XMLModel();
			ostorageTypeBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_GetstorageTypeBin_BCPOn&Param.1="+plantFromURL+"&Param.2="+clientFromURL+"&Param.3="+ord+"&Param.4="+material+"&Param.5="+prod+"&Param.6="+nodeFromURL+"&Param.7="+batchGR+"&Param.8="+EPorder+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			ostorageType = ostorageTypeBinModel.getProperty("/Rowset/Row/StorageType");
			ostorageBin = ostorageTypeBinModel .getProperty("/Rowset/Row/StorageBin");
			flagEdit=  ostorageTypeBinModel .getProperty("/Rowset/Row/Flag");
			var dStypeLabel= new sap.m.Label({
				text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_TYPE"),
			});
			var dSBinLabel= new sap.m.Label({
				text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_BIN"),
			});
			dSTypeFld = new sap.m.Input({
				id: "sTypeInput",
				showValueHelp:true,
				valueHelpOnly:true,
				valueHelpRequest: oControllerThis.getStorageType
			});
			dSBinFld = new sap.m.Input({
				showValueHelp:true,
				valueHelpOnly:true,
				valueHelpRequest: oControllerThis.getStorageBin
			});

			var dMatInptFld = new sap.m.Input({
				editable: false,
				value:  material

			});



			var dBatchFld = new sap.m.Input({
				editable: false,
				value:  ((batchGR=="")? "NA": batchGR)

			});

			
		var dMessagelabel= new sap.m.Label({
				editable: false,
				visible:false,
				text: getPropertyValue(oResourceModel, "CustomGR_DeclarationInformation"),
			});


	dMessagelabel.addStyleClass("messageText");



			var oSTypeBinLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
				labelSpanL: 5,
				labelSpanM: 5,
				labelSpanS: 5,
				emptySpanL: 0,
				emptySpanM: 0,
				emptySpanS: 0,
				columnsL: 2,
				columnsM: 2,

			});

			var oSTypeBinLabels = new sap.ui.layout.form.Form({
				layout: oSTypeBinLayoutLabels,
				formContainers: [
					



					new sap.ui.layout.form.FormContainer({
						formElements: [
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "CustomGR_GR_8"),
								fields: [dBatchFld]
							})

							]
					}),

					new sap.ui.layout.form.FormContainer({
						formElements: [
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "CustomGR_GMReport_2"),
								fields: [dMatInptFld]
							})
							]
					}),


					new sap.ui.layout.form.FormContainer({
						formElements: [
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_TYPE"),
								fields: [dSTypeFld]
							})
							]
					}),
					new sap.ui.layout.form.FormContainer({
						formElements: [
							new sap.ui.layout.form.FormElement({
								label: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_BIN"),
								fields: [dSBinFld]
							})
							]
					}),

					




					]
			});

			if(flagEdit==2)

			{
				dSTypeFld.setShowValueHelp(false);
				dSBinFld.setShowValueHelp(false);
				dSTypeFld.setEnabled(false);
				dSBinFld.setEnabled(false);
				dMessagelabel.setVisible(true);	
			}
				dSTypeFld.setValue(ostorageType);
				dSBinFld.setValue(ostorageBin);
			


			var oStypeBinDialog = new sap.m.Dialog({
				id: "StypeBinDialog",
				title: getPropertyValue(oResourceModel, "CustomGR_STypeBinLabel"),
				draggable: true,
				resizable:true,
				content: [oSTypeBinLabels,dMessagelabel],
				buttons: [
					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
						press: function() {

							if( dSTypeFld.getValue()=="" || dSBinFld.getValue()=="")
							{

								sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CustomGR_STypeBin"));
							}
							else{
								storageType=  dSTypeFld.getValue();
								storageBin= dSBinFld.getValue();
								oStypeBinDialog.destroy();
								oControllerThis.declare();
							}
						}
					}),
					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
						press: function() {
							oStypeBinDialog.destroy();
						}
					})
					],
			});


			oStypeBinDialog.setContentWidth("900px");

			oStypeBinDialog.open();

		}

		else{
			storageType="";
			storageBin="";
			oControllerThis.declare();
		}
	},


	getStorageType: function(){

		var DateNw = new Date();

		var ostoTypeModel = new sap.ui.model.xml.XMLModel();
		ostoTypeModel.setSizeLimit(10000);
		ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetStorageType&Param.1="+ostorageType+"&Param.2="+ostorageBin+"&Param.3="+storageLoc+"&Param.4="+whNo+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);

		selectSTypeList = new sap.m.SelectList({
				selectionChange:  function() {
				dSTypeFld.setValue(this.getSelectedItem().getText());
				var sType=this.getSelectedItem().getText();
				var ostoBinModel = new sap.ui.model.xml.XMLModel();
				ostoBinModel.setSizeLimit(10000);
				ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetStorageBin&Param.1="+sType+"&Param.2="+ostorageBin+"&Param.3="+storageLoc+"&Param.4="+whNo+"&Param.5="+ostorageType+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				dSBinFld.setValue(ostoBinModel.getProperty("/Rowset/Row/0/STGE_BIN"));
				oDialogsType.close();

			}
		});
		var osTypeitemline = new sap.ui.core.ListItem();
		osTypeitemline.bindProperty("text", "STGE_TYPE");
		osTypeitemline.bindProperty("key", "STGE_TYPE");
		selectSTypeList.bindItems("/Rowset/Row", osTypeitemline);
		selectSTypeList.setModel(ostoTypeModel);	

		var searchsType = new sap.m.SearchField({

			liveChange: function(oEvent) {
				var sQuery = oEvent.getSource().getValue();
				var binding = selectSTypeList.getBinding("items");
				var filters = [
					new sap.ui.model.Filter("STGE_TYPE", sap.ui.model.FilterOperator.Contains, sQuery)
					];
				var oFilters = new sap.ui.model.Filter({
					aFilters: filters,
					_bMultiFilter: true
				});
				binding.filter(oFilters);
			}
		});
		oDialogsType = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "TransferType_Lbl_StorageType"),
			content: [searchsType, selectSTypeList],
			buttons: [
				new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
					press: function() {
						oDialogsType.close();
					}
				})
				],
			afterClose: function() {
						oDialogsType.destroy();
					}
		});
		oDialogsType.setContentWidth("130px");
		oDialogsType.setContentHeight("300px");
		oDialogsType.open();



	},


	getStorageBin: function(){

			var sType= dSTypeFld.getValue();


		if(sType==""){

			sap.m.MessageBox.error(getPropertyValue(oResourceModel, "TransferType_alert_SelectStoageType"));

		}

		else{
			

			var ostoBinModel = new sap.ui.model.xml.XMLModel();
			ostoBinModel.setSizeLimit(10000);
			ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetStorageBin&Param.1="+sType+"&Param.2="+ostorageBin+"&Param.3="+storageLoc+"&Param.4="+whNo+"&Param.5="+ostorageType+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);

			


			var DateNw = new Date();
			var sBinselectList = new sap.m.SelectList({
				selectionChange:  function() {
					dSBinFld.setValue(this.getSelectedItem().getText());
					oDialogsBin.close();

				}
			});
			var osBinitemline = new sap.ui.core.ListItem();
			osBinitemline.bindProperty("text", "STGE_BIN");
			osBinitemline.bindProperty("key", "STGE_BIN");
			sBinselectList.bindItems("/Rowset/Row", osBinitemline);
			sBinselectList.setModel(ostoBinModel);	



			var searchSBin = new sap.m.SearchField({

				liveChange: function(oEvent) {
					var sQuery = oEvent.getSource().getValue();
					var binding = sBinselectList.getBinding("items");
					var filters = [
						new sap.ui.model.Filter("STGE_BIN", sap.ui.model.FilterOperator.Contains, sQuery)
						];
					var oFilter = new sap.ui.model.Filter({
						aFilters: filters,
						_bMultiFilter: true
					});
					binding.filter(oFilter);
				}
			});
			oDialogsBin = new sap.m.Dialog({
				title: getPropertyValue(oResourceModel, "TransferType_Lbl_StorageBin"),
				content: [searchSBin, sBinselectList],
				buttons: [
					new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
						press: function() {
							oDialogsBin.close();
						}
					})
					],
				afterClose: function() {
						oDialogsBin.destroy();
					}
			});
			oDialogsBin.setContentWidth("130px");
			oDialogsBin.setContentHeight("300px");
			oDialogsBin.open();
			
		}
	},
///////////////////////////////////////////////End/////////////////////////////////////////////////////////////////////////////////////////////////////
	doGR: function() {
		var DateNw = new Date();
		if (EPorder.indexOf("E_") == "0") {

			var EPOrdModel = new sap.ui.model.xml.XMLModel();
			EPOrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyProcessOrder/QueryTemplates/MDO_GetSourcePO&Param.1=" + EPorder + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			AssignedPO = EPOrdModel.getProperty('/Rowset/Row/AssignedPO');

		}

		if ((AssignedPO != "---") && EPorder.indexOf("E") != "-1") {
			sap.m.MessageBox.information(getPropertyValue(oResourceModel, "EPO_AlreadyAssigned"));
		} else {
			flag = oGRFlag.getProperty("/Rowset/Row/GR_Batch_Msg");
			if (flag == "0") {
				oControllerThis.doGRDeclare();
			} else {
				batch = this.getView().byId("batchNo").getValue();
				qty = this.getView().byId("quant").getValue();
				qty = formatQuantity(qty, "PARSE");
				uom = this.getView().byId("uom").getSelectedKey();
				if (uom=="" || uom==null || uom==undefined || uom== "undefined" || uom == "null") {
					uom=oControllerThis.getView().byId("uom").getValue();
				}
				if (suFromURL == "X") {
					sutype = "SU";
				} else {
					sutype = "NONSU";
				}
				var dialog = new sap.m.Dialog({
					title: getPropertyValue(oResourceModel, "CustomGR_alert_28"),
					draggable: true,
					contentWidth: "15%",
					icon: "sap-icon://sys-help",
					type: 'Message',
					content: [new sap.m.Text({
						text: getPropertyValue(oResourceModel, "CustomGR_GRR_23") + " " + sutype + " " + qty + " " + uom + " " + getPropertyValue(oResourceModel, "CustomGR_GRR_24") + " " + orderFromURL + " " + getPropertyValue(oResourceModel, "CustomGR_GRR_25") + " " + batch
					})],
					beginButton: new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_Yes"),
						press: function() {
							oControllerThis.doGRDeclare();
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: getPropertyValue(oResourceModel, "NPDashboard_No"),
						press: function() {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
				dialog.onAfterRendering = function() {
					if (sap.m.Dialog.prototype.onAfterRendering) {
						sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
					}
					var footer = this.$().find('footer');
					var spacer = footer.find('.sapMTBSpacer');
					var firstBtn = $(footer.find('button')[0]);
					spacer.remove();
					spacer.insertAfter(firstBtn);
				};
				dialog.open();
			}
		}
	},
	doGRDeclare: function() {
		var DateNw = new Date();
		if (suFromURL == "X") {
			print = this.getView().byId("printerID").getSelectedKey();
			// alert(print);
			print = print.split("---")[0];
			copies = this.getView().byId("copies").getValue();
			printUOM = this.getView().byId("altuom").getSelectedKey();
			printUOM = ((printUOM=="")&& (oBCPStats != "1" || sLoc_whNo_source=="EWM"))? this.getView().byId("altuom").getValue(): printUOM;////////////when BCPONorEWM fetch the UOM manual input too, if any
		} else {
			print = "";
			copies = "";
			printUOM = "";
		}
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-dd"
		});
		var refresh = dateFormat.format(new Date(DateNw));
		dateNow = dateFormat.format(new Date(DateNw));
		var dateTod = dateFormat.format(new Date(DateNw));
		dateNow = dateNow + "T00:00:00Z";
		// this.getView().byId("PostDate").setValue(DateNow);
		postDate = this.getView().byId("PostDate").getValue();
		prodDate = this.getView().byId("ProdDate").getValue();
		var pDate = postDate;
		var prodD = prodDate;
		expiryDate = this.getView().byId("sledDate").getValue();
		// alert(prodD);
		// expiryDate = dateFormat.format(new Date(expiryDate));	
		var postToday = postDate;
		prodDate = prodDate + "T00:00:00Z";
		if (expiryDate == "") {
			expiryDate = "";
		} else {
			expiryDate = expiryDate + "T00:00:00Z";
		}
		//expiryDate=expiryDate+"T00:00:00Z";
		batch = this.getView().byId("batchNo").getValue();
		var batchLen = batch.length;
		qty = this.getView().byId("quant").getValue();
		qty = formatQuantity(qty, "PARSE");
		//alert(qty);

		infoheaderInput = this.getView().byId("info");
		infoheader = infoheaderInput.getValue();
		infoitemInput = this.getView().byId("itemInfo");
		infoitem = infoitemInput.getValue();
		uom = this.getView().byId("uom").getSelectedKey();
		isValidUOM= false;
		if (uom=="" || uom==null || uom==undefined || uom== "undefined" || uom == "null") {
			uom=oControllerThis.getView().byId("uom").getValue();
			if(uom!="") {isValidUOM=true;}
		} else{isValidUOM=true;}

		var DateNw = new Date();
		var timeFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "'T'HH:mm:ss'Z'"
		});
		var timeNow = timeFormat.format(new Date(DateNw));
		postDate = postDate + timeNow;
		if (whNo == "---" || whNo == "" || whNo == "-") { //warehouse number doesnot exists
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_26"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (pDate == "") { //enter posting date
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_21"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (prodD == "") { //enter production date
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_22"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (batch == "" && NonBatchManagedFlag == "X") { //Please select batch
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_17"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if ((expiryDate == "" || expiryDate == undefined) && NonBatchManagedFlag == "X") { // enter SLED date
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_36"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if ((LEQuant != "" && LEQuant != "---") && Number(qty) > Number(LEQuant) && uom == LEUoM) { // entered Quantity cannot be greater than LE quantity
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_16"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (pDate > refresh) { //posting date cannot be a future date
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_1"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (prodDate > dateNow) { //production date cannot be a future date
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_2"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if ((prodDate >= expiryDate) && (expiryDate != "")) { // SLEDdate cannot be less or equal to production date
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_23"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		}
		/*
        	else if(postDate<pDateFromURL){
        	sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_3"),{title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")});
        	}
		 */
		else if (prodDate > postDate) {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_18"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (qty <= 0 || qty == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (isNaN(qty)) { //Please select a positive quantity
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_4"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (!isValidUOM){
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_5"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (batchLen > 10) {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_6"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (suFromURL == "X" && oBCPStats != "1" && print == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_24"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if (suFromURL == "X" && oBCPStats != "1" && copies == "" && print != "No Print") {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "ECCLabel_alert6"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else if ((infoheader == "" && BKTXTStatus == "MANDAT") || (infoitem == "" && SGTXTStatus == "MANDAT")) {
			if (infoheader == "" && BKTXTStatus == "MANDAT") {
				infoheaderInput.setValueState(sap.ui.core.ValueState.Error);
				infoheaderInput.setPlaceholder(getPropertyValue(oResourceModel, "CustomGR_Alert_Header"));
				infoheaderInput.addStyleClass("errorInput");
			}
			if (infoitem == "" && SGTXTStatus == "MANDAT") {
				infoitemInput.setValueState(sap.ui.core.ValueState.Error);
				infoitemInput.setPlaceholder(getPropertyValue(oResourceModel, "CustomGR_Alert_Item"));
				infoitemInput.addStyleClass("errorInput");
			}
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_Alert_Pallet"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});
		} else {
			I_MIIBCPFlag = 0;
			oControllerThis.performGR();
		}
	},
	declare: function() {

		var DateNw = new Date();
		var oBCPStatusModel = new sap.ui.model.xml.XMLModel();
		oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");
		var PrinterIDRefresh = this.getView().byId("printerID");
		var PrinterlabelRefresh = this.getView().byId("printerLabel");
		var CopiesRefresh = this.getView().byId("copies");
		var CopyLabelRefresh = this.getView().byId("copyLabel");
		var PrinterUOMRefresh = this.getView().byId("printerUOM");
		var PrintVisible = PrinterIDRefresh.getVisible();

		if (suFromURL == "X" && PrintVisible == false && (oBCPStats == "0" || oBCPStats == "2")) { //BCP ON Please Select printer
			var DateNw = new Date();
			PrinterIDRefresh.setVisible(true);
			PrinterlabelRefresh.setVisible(true);
			CopiesRefresh.setVisible(true);
			CopyLabelRefresh.setVisible(true);
			PrinterUOMRefresh.setVisible(true);
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_25"), {
				title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
			});

		} else {
			// sFlag="0";
			// storageBin=oControllerThis.getView().byId("sBin").getValue();
			batch = batch.toUpperCase();
			batch = batch.trim();
			this.getView().byId("batchNo").setValue(batch);
			if (batch == "---" || batch == "null") {
				batch = "";
			}
			var finalDelivery = this.getView().byId("idFinalDelivery").getSelected();
			
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails>" + "<txnPath>MaterialHandling/GR/BLS/BLS_GoodsRecieptDeclarationReversal</txnPath><workstation>" + workstation + "</workstation><client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant>" + "<nodeID>" + nodeFromURL + "</nodeID><orderNumber>" + ord + "</orderNumber><EPorder>" + EPorder + "</EPorder><warehouseNumber>" + whNo + "</warehouseNumber>" + "<userId>" + loginID + "</userId> <goodsMovementItems><client>" + clientFromURL + "</client><goodsMovementItem><postingDate>" + postDate + "</postingDate>" + "<productionDate>" + prodDate + "</productionDate><huNumber/> <materialNumber>" + matFromURL + "</materialNumber>" + "<quantityInReportUom>" + qty + "</quantityInReportUom> <reportUom>" + uom + "</reportUom><type>" + prod + "</type><storagetype>"+storageType+"</storagetype><storagebin>"+storageBin+"</storagebin><batchNumber>" + batch + "</batchNumber><finalDelivery>" + finalDelivery + "</finalDelivery><printerID>" + print + "</printerID><copies>" + copies + "</copies><printUOM>" + printUOM + "</printUOM><infoheader>" + infoheader + "</infoheader><infoitem>" + infoitem + "</infoitem><movementType>" + mvtType + "</movementType><shelfLifeDate>" + expiryDate + "</shelfLifeDate><documentNumber/><documentYear/> <postingID/>" + "<proceedWithWarning>false</proceedWithWarning><goodsMovementPostingMessages><I_MIIBCPFlag>" + I_MIIBCPFlag + "</I_MIIBCPFlag><I_MIIEWMFlag>" + sLoc_whNo_source + "</I_MIIEWMFlag><client>" + clientFromURL + "</client><NonBatchManagedFlag>" + NonBatchManagedFlag + "</NonBatchManagedFlag><goodsMovementPostingMessage>" + "<status/><message/></goodsMovementPostingMessage></goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems>" + "</IOReportGoodsMovementDetails>";
			// alert(InputXMLInStringFormat);
			var GRModel = new sap.ui.model.xml.XMLModel();
			GRModel.attachRequestSent(function() {
				sap.ui.core.BusyIndicator.show(1);
			});
			GRModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_GoodsReceiptDeclarationReversal&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), true, "POST");
			GRModel.attachRequestCompleted(function() {
				sap.ui.core.BusyIndicator.hide();
				var status = GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/status');
				O_MIIBCPFlag = GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/I_MIIBCPFlag');
				console.log(GRModel.getXML());
				var GRDeclareMessage = GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message');
				GRToastMsgEnable = oGRFlag.getProperty("/Rowset/Row/GR_Msg");
				if (status == "S") {
					if (GRToastMsgEnable == 1) {
						sap.m.MessageToast.show((GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message')), {
							duration: 3000
						});
					} else {
						sap.m.MessageBox.success(GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'));
					}

					var bat = "BATCHES";
					selectBatchModel = new sap.ui.model.xml.XMLModel();
					selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + bat + "&Param.5=" + clientFromURL + "&Param.6=" + plantFromURL + "&Param.7=" + nodeFromURL + "&Param.8=" + EPorder + "&Param.9=" + matFromURL + "&Param.10=" + mvtType + "&Param.11=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
					var oTargetModel = new sap.ui.model.xml.XMLModel();
					oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + plantFromURL + "&Param.4=" + EPorder + "&Param.5=" + matFromURL + "&Param.6=" + mvtType + "&Param.7=" + mvt_type_reverse + "&Param.8=" + su + "&Param.9=" + prod + "&Param.10=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
					target = oTargetModel.getProperty("/Rowset/Row/Target");
					targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
					produced = oTargetModel.getProperty("/Rowset/Row/Produced");
					producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");
					TargetIntUOM = oTargetModel.getProperty("/Rowset/Row/TargetIntUOM");
					var formattedTarget = formatQuantity(target, "FORMAT");
					oControllerThis.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
					var formattedProduced = formatQuantity(produced, "FORMAT");
					oControllerThis.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);
					////////////////////////////added for progress indicator Userstory 108894/////////////////////////////////
					parcentProd = (produced / target) * 100;
					parcentProd = parcentProd < 100 ? parcentProd : 100;
					oControllerThis.getView().byId("pi").setPercentValue(parcentProd);
					oControllerThis.getView().byId("pi").setDisplayValue(formattedProduced + " of " + formattedTarget + " " + producedUOM);
					if (parcentProd < 100) {
						oControllerThis.getView().byId("pi").setState("Success");
					} else {
						oControllerThis.getView().byId("pi").setState("Error");
					} ///////////END///////
					////////////////////////////////////////////////////////////////////////////Enable and Disable SLED and PROD DATE Field based on Existing Batch///////////////////////////////////////////////
					if (PreDefinedBatchFlag != "PreDefined") {
						if (NonBatchManagedFlag != "X") {
							oControllerThis.getView().byId("batchNo").setEnabled(false);
							oControllerThis.getView().byId("sledDate").setEnabled(false);
							oControllerThis.getView().byId("ProdDate").setEnabled(true);
						} else {
							oControllerThis.getView().byId("batchNo").setEnabled(true);
							oControllerThis.getView().byId("sledDate").setEnabled(false);
							oControllerThis.getView().byId("ProdDate").setEnabled(false);
						}
					} else {
						oControllerThis.getView().byId("batchNo").setEnabled(false);
						oControllerThis.getView().byId("sledDate").setEnabled(true);
						oControllerThis.getView().byId("ProdDate").setEnabled(true);
					}

					////////////////////////////////////////////////////////////////////////////END///////////////////////////////////////////////

					//oControllerThis.getView().byId("info").setValue("");
				} else {
					if (O_MIIBCPFlag == 1) {

						sap.m.MessageBox.show(getPropertyValue(oResourceModel, "CustomGR_alert_29"), {
							icon: sap.m.MessageBox.Icon.QUESTION,
							title: getPropertyValue(oResourceModel, "CustomGR_alert_28"),
							actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
							onClose: function(oAction) {
								if (oAction === sap.m.MessageBox.Action.YES) {
									I_MIIBCPFlag = 1;
									oControllerThis.declare();
								}
							}
						});
					} else {
						sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Error") + GRModel.getProperty('/goodsMovementItems/goodsMovementItem/goodsMovementPostingMessages/goodsMovementPostingMessage/message'), {
							title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
						});
						batchFlag = "1";
					}
				}
				/////////////////////////////////////////////////////////////////////////////Goods Receipt Pallet Info field/////////////////////////////////////////////////////////////////////////////////////////////////////////


				if (BKTXTStatus == "USNAME") {
					infoheaderInput.setEnabled(false);
					infoheaderInput.setValue(loginID.toUpperCase());
				} else if (BKTXTStatus == "MANDAT") {
					//infoheaderInput.setValue("");
					infoheaderInput.setValueState(sap.ui.core.ValueState.None);
					infoheaderInput.removeStyleClass("errorInput");
					infoheaderInput.setPlaceholder("");
				}
				if (SGTXTStatus == "USNAME") {
					infoitemInput.setEnabled(false);
					infoitemInput.setValue(loginID.toUpperCase());
				} else if (SGTXTStatus == "MANDAT") {
					// infoitemInput.setValue("");
					infoitemInput.setValueState(sap.ui.core.ValueState.None);
					infoitemInput.removeStyleClass("errorInput");
					infoitemInput.setPlaceholder("");
				}

				///////////////////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			});
			var DateNw = new Date();
			var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-dd"
			});
			// this.getView().byId("PostDate").setDateValue(DateNw);
			batchFlag = "0";
		}
	},
	doReverse: function() {
		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/Reversal.irpt?orderFromURL=" + orderFromURL + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&headerFromURL=" + headerFromURL + "&day1=" + day1 + "&matFromURL=" + matFromURL + "&pDateFromURL=" + pDateFromURL + "&desFromURL=" + encodeURIComponent(desFromURL) + "&typeFromURL=" + prod + "&nodeFromURL=" + nodeFromURL + "&resFromURL=" + encodeURIComponent(resFromURL) + "&suFromURL=" + su), "_self");
	},
	goHome: function() {
		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/ProcessOrder.irpt?nodeFromURL=" + nodeFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
	},
	/* doRework : function(){
    var DateNw = new Date();
    var odialogModel1= new sap.ui.model.xml.XMLModel();
    	odialogModel1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetMaterials_GR_ByProd&Param.1="+orderFromURL+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
    	 selectList = new sap.m.SelectList({selectionChange: sap.ui.controller("JS.GoodReceipt").okFn});
    			var odialogItemline= new sap.ui.core.ListItem();
    			odialogItemline.bindProperty("text", "Value");
    			odialogItemline.bindProperty("key", "Key");
    			selectList.bindItems("/Rowset/Row", odialogItemline);
    			selectList.setModel(odialogModel1);
    			count = selectList.getItems().length;

    			if(count>1){
    			oDialog2 = new sap.m.Dialog({
    			title:getPropertyValue(oResourceModel, "CustomGR_alert_19"),
    			content:[selectList],
    			buttons: [		

    					new sap.m.Button({
    					text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
    					press: function () {				

    					oDialog2.close();
    					oDialog2.destroy();
    					}


    					})
    				],
    	});

    				oDialog2.setContentWidth("450px");
    				oDialog2.setContentHeight("200px");
    					oDialog2.open(); 


    	}
    	else{
    		prod="BYPRODUCT";
    		selectedKey = odialogModel1.getProperty("/Rowset/Row/Key");
    		selectedItem = odialogModel1.getProperty("/Rowset/Row/Value");

    		var a = selectedKey.split("---");
    		var b = selectedItem.slice(9);
    		des=b;
    		matNo=a[0];
    		prodType=a[1];
    		su=a[2];
    		prod=prodType; 
    		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/Rework.irpt?orderFromURL="+orderFromURL+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+headerFromURL+"&day1="+day1+"&matFromURL="+matNo+"&pDateFromURL="+pDateFromURL+"&desFromURL="+encodeURIComponent(des)+"&typeFromURL="+prod+"&nodeFromURL="+nodeFromURL+"&resFromURL="+encodeURIComponent(resFromURL)+"&suFromURL="+su),"_self");
    		}
    },

    okFn : function(){

    selectedKey = selectList.getSelectedKey();
    selectedItem = selectList.getSelectedItem().getText();
    oDialog2.destroy();
    var a = selectedKey.split("---");
    var b = selectedItem.slice(9);
    des=b;
    matNo=a[0];
    prodType=a[1];
    su=a[2];

    window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/Rework.irpt?orderFromURL="+orderFromURL+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+headerFromURL+"&day1="+day1+"&matFromURL="+matNo+"&pDateFromURL="+pDateFromURL+"&desFromURL="+encodeURIComponent(des)+"&typeFromURL="+prodType+"&nodeFromURL="+nodeFromURL+"&resFromURL="+encodeURIComponent(resFromURL)+"&suFromURL="+su),"_self");
    },
	 */
	validateNoOfPrintCopies: function() {
		var inputValue = this.getView().byId("copies");
		var noOfCopies = inputValue.getValue();
		if (noOfCopies != "") {
			if (noOfCopies > 0 && !isNaN(noOfCopies) && parseInt(Number(noOfCopies)) == noOfCopies && !isNaN(parseInt(noOfCopies, 10))) {} else {
				inputValue.setValue("");
				sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"), {
					title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
				});
			}
		}
	},
	doReport: function() {
		var flag = 1;
		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GMReport.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&headerFromURL=" + headerFromURL + "&resFromURL=" + encodeURIComponent(resFromURL) + "&plantFromURL=" + plantFromURL + "&matFromURL=" + matFromURL + "&pDateFromURL=" + pDateFromURL + "&desFromURL=" + encodeURIComponent(desFromURL) + "&typeFromURL=" + prod + "&nodeFromURL=" + nodeFromURL + "&suFromURL=" + su + "&flag=" + flag), "_self");
	},
	changeMaterial: function() {
		chgMat = this.getView().byId("changeMatID").getSelectedKey();
		var DateNw = new Date();
		typeFromURL = chgMat.split("---")[0];
		suFromURL = chgMat.split("---")[2];
		desFromURL = chgMat.split("---")[3];
		matFromURL = chgMat.split("---")[1];
		su = suFromURL;
		prod = typeFromURL;
		mvtType = prod == "BYPRODUCT" ? "531" : "101";
		mvt_type_reverse = prod == "BYPRODUCT" ? "532" : "102";
		var oTargetModel = new sap.ui.model.xml.XMLModel();
		oTargetModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetTarget_Produced&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + plantFromURL + "&Param.4=" + EPorder + "&Param.5=" + matFromURL + "&Param.6=" + mvtType + "&Param.7=" + mvt_type_reverse + "&Param.8=" + su + "&Param.9=" + prod + "&Param.10=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
		// alert(prod);
		target = oTargetModel.getProperty("/Rowset/Row/Target");
		targetUOM = oTargetModel.getProperty("/Rowset/Row/TargetUOM");
		produced = oTargetModel.getProperty("/Rowset/Row/Produced");
		producedUOM = oTargetModel.getProperty("/Rowset/Row/ProducedUOM");
		TargetIntUOM = oTargetModel.getProperty("/Rowset/Row/TargetIntUOM");
		var formattedTarget = formatQuantity(target, "FORMAT");
		this.getView().byId("Target").setValue(formattedTarget + " " + targetUOM);
		var formattedProduced = formatQuantity(produced, "FORMAT");
		this.getView().byId("Produced").setValue(formattedProduced + " " + producedUOM);
		////////////////////////////added for progress indicator Userstory 108894/////////////////////////////////
		parcentProd = (produced / target) * 100;
		parcentProd = parcentProd < 100 ? parcentProd : 100;
		this.getView().byId("pi").setPercentValue(parcentProd);
		this.getView().byId("pi").setDisplayValue(formattedProduced + " of " + formattedTarget + " " + producedUOM);
		if (parcentProd < 100) {
			this.getView().byId("pi").setState("Success");
		} else {
			this.getView().byId("pi").setState("Error");
		} ///////////END///////
		this.getView().byId("Material").setValue(matFromURL);
		this.getView().byId("MatDes").setValue(desFromURL);
		this.getView().byId("CreateBatch").setEnabled(true);
		////////////////////////////////////////////////////////////////////////// FETCH UOM //////////////////////////////////////////////////////////////////////
		var prodUomModel = new sap.ui.model.xml.XMLModel();
		prodUomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&Param.3=" + userLanguage + "&Param.4=ISOCODE" + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var prodUom = this.getView().byId("uom");
		var prodUomitemline = new sap.ui.core.ListItem();
		prodUomitemline.bindProperty("text", "UOMDESC");
		prodUomitemline.bindProperty("key", "UOM");
		prodUom.bindItems("/Rowset/Row", prodUomitemline);
		prodUom.setModel(prodUomModel);
		var LEModel = new sap.ui.model.xml.XMLModel();
		var uomModel = new sap.ui.model.xml.XMLModel();
		LEModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetLEUOMGR&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&Param.4=" + userLanguage + "&Param.5=" + ord +"&Param.6=" + prod +"&Param.7=" + target + "&Param.8=" + targetUOM + "&Param.9=" + TargetIntUOM + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		var uom = this.getView().byId("uom");
		LEUoM = LEModel.getProperty('/Rowset/Row/UOM');
		LEQuant = LEModel.getProperty('/Rowset/Row/QUANTITY');
		FormattedQuantity = formatQuantity(LEQuant, "FORMAT");
 		var dateTimeFormat_xml = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "yyyy-MM-ddTHH:mm:ss"
 		});
		if (prod == "HEADER") {
			if (LEQuant == "" || LEQuant == "---") {
				uomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQLQ_GetGMEIN&Param.1=" + ord + "&Param.2=" + clientFromURL + "&Param.3=" + plantFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				var uom = this.getView().byId("uom");
				var uom1 = uomModel.getProperty('/Rowset/Row/GMEIN');
				uom.setSelectedKey(uom1);
				this.getView().byId("quant").setValue("");
			} else {
				this.getView().byId("quant").setValue(FormattedQuantity);
				this.getView().byId("uom").setSelectedKey(LEUoM);
			}
		} else {
			if (LEQuant == "" || LEQuant == "---") {
				uomModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetUnitAreaForCo_ByProd&Param.1=" + ord + "&Param.2=" + matFromURL + "&cache=" + DateNw + "&Content-Type=text/xml"), "", false);
				var uom = this.getView().byId("uom");
				var uom1 = uomModel.getProperty('/Rowset/Row/MEINS');
				uom.setSelectedKey(uom1);
				this.getView().byId("quant").setValue("");
			} else {
				this.getView().byId("quant").setValue(FormattedQuantity);
				this.getView().byId("uom").setSelectedKey(LEUoM);
			}
		}

		var bat = "BATCHES";
		selectBatchModel = new sap.ui.model.xml.XMLModel();
		selectBatchModel.setSizeLimit(10000);
		selectBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox_PreDefinedBatch&Param.1=" + bat + "&Param.5=" + clientFromURL + "&Param.6=" + plantFromURL + "&Param.7=" + nodeFromURL + "&Param.8=" + ord + "&Param.9=" + matFromURL + "&Param.10=" + mvtType + "&Param.11=" + userLanguage + "&Param.12=" + typeFromURL + "&Param.13=" + EPorder + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		PreDefinedBatchFlag = selectBatchModel.getProperty('/Rowset/Row/PreDefinedBachFlag');
		var statusSuccess = selectBatchModel.getProperty('/Rowset/Row/status');
		var message = selectBatchModel.getProperty('/Rowset/Row/message');
		var selectBatch = oControllerThis.getView().byId("batchNo");
		var CreateBatchButton = oControllerThis.getView().byId("CreateBatch");
		var sled = oControllerThis.getView().byId("sledDate");
		var DeclareButton = oControllerThis.getView().byId("decID");
		var ProdDate = oControllerThis.getView().byId("ProdDate");console.log("PreDefinedBatchFlag: "+PreDefinedBatchFlag+"NonBatchManagedFlag: "+NonBatchManagedFlag+"suFromURL: "+suFromURL);
		if (PreDefinedBatchFlag == "PreDefined" && statusSuccess == "S") {
			var batc = selectBatchModel.getProperty('/Rowset/Row/Value');
			selectBatch.setValue(batc);
			oControllerThis.populateSLEDdateProdDate(batc);
			selectBatch.setEnabled(false);
			CreateBatchButton.setEnabled(false);
			oControllerThis.getView().byId("sledDate").setEnabled(true);
			oControllerThis.getView().byId("ProdDate").setEnabled(true);
			if (expiryDate1 != "") {
				var dateFormat1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "yyyy-MM-dd"
				});
				expiryDate = dateFormat1.format(new Date(expiryDate1));
				sled.setValue(expiryDate);
				oControllerThis.calculateSledDaysCount(expiryDate);
			}
		} else if (PreDefinedBatchFlag == "IncorrectFormatBatch" && statusSuccess == "S") {
			CreateBatchButton.setEnabled(false);
			DeclareButton.setEnabled(false);
			selectBatch.setEnabled(false);
		} else if ((PreDefinedBatchFlag == "IncorrectFormatBatch" || PreDefinedBatchFlag == "PreDefined") && statusSuccess == "E") {
			alert(message);
			CreateBatchButton.setEnabled(false);
			DeclareButton.setEnabled(false);
			selectBatch.setEnabled(false);
		} else {
			var batc = selectBatchModel.getProperty('/Rowset/Row/Value');
			CreateBatchButton.setEnabled(true);
			selectBatch.setValue(batc);
			selectBatch.setEnabled(true);
			oControllerThis.populateSLEDdateProdDate(batc);
			prev_batch = "";
			///////////////////////////////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}
		////////////////////////////////////////////////WarehouseNo//////////////////////////////////////////////////////////////
		var whModel = new sap.ui.model.xml.XMLModel();
		whModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + matFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + ord + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		whNo = whModel.getProperty('/Rowset/Row/WHNumber');
		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		if (suFromURL == "X" && oBCPStats != "1") //BCP ON
		{
			oBCPCurrentStatus = "ON";
			var oExisPrinterModel = new sap.ui.model.xml.XMLModel();
			oExisPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=" + nodeFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			PrintDesc = this.getView().byId("printerID");
			var oPrintDescline = new sap.ui.core.ListItem();
			oPrintDescline.bindProperty("text", "VALUE");
			oPrintDescline.bindProperty("key", "KEY");
			PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
			PrintDesc.setModel(oExisPrinterModel);
			print = oExisPrinterModel.getProperty('/Rowset/Row/KEY');
			copies = print.split("---")[2];
			this.getView().byId("copies").setValue(copies);
			this.getView().byId("printerID").setVisible(true);
			this.getView().byId("printerLabel").setVisible(true);
			this.getView().byId("copies").setVisible(true);
			this.getView().byId("copyLabel").setVisible(true);
			///////////////////////////////////////////////ALT UOM////////////////////////////////
			this.getView().byId("printerUOM").setVisible(true);
			this.altUOMDisplay();
			////////////////////////////////////////////////////////////////////////////////////
			// var oPritDesc="PRINTER_DESC";
		} else if (suFromURL == "X" && oBCPStats == 1) //BCP OFF
		{
			oBCPCurrentStatus = "OFF";
			var oExisPrinterModelBCPOFF = new sap.ui.model.xml.XMLModel();
			oExisPrinterModelBCPOFF.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType_BCPOFF&Param.1=" + nodeFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			PrintDesc = this.getView().byId("printerID");
			var oPrintDescline = new sap.ui.core.ListItem();
			oPrintDescline.bindProperty("text", "VALUE");
			oPrintDescline.bindProperty("key", "KEY");
			PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
			PrintDesc.setModel(oExisPrinterModelBCPOFF);
			this.getView().byId("printerID").setVisible(true);
			this.getView().byId("printerLabel").setVisible(true);
			this.getView().byId("copies").setVisible(false);
			this.getView().byId("copyLabel").setVisible(false);
			this.getView().byId("printerUOM").setVisible(false);
			// var oPritDesc="PRINTER_DESC";
		} else if (suFromURL == "") {
			this.getView().byId("printerID").setVisible(false);
			this.getView().byId("printerLabel").setVisible(false);
			this.getView().byId("copies").setVisible(false);
			this.getView().byId("copyLabel").setVisible(false);
			this.getView().byId("printerUOM").setVisible(false);
		}
		////////////////////////NONBatchMaterial////////////////////////////
		nonBatchManagedModel = new sap.ui.model.xml.XMLModel();
		nonBatchManagedModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
		NonBatchManagedFlag = nonBatchManagedModel.getProperty('/Rowset/Row/XCHPF');
		if (NonBatchManagedFlag != "X") {
			var GetProdDateModel = new sap.ui.model.xml.XMLModel();
			GetProdDateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGRProdDate&Param.1=" + dateTimeFormat_xml.format(DateNw) + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + nodeFromURL + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
			var oProdDateNw= GetProdDateModel.getProperty('/Rowset/Row/oProdDate');
			console.log("DateNw: "+oProdDateNw);
			oControllerThis.getView().byId("ProdDate").setDateValue(new Date(oProdDateNw));
			this.getView().byId("CreateBatch").setEnabled(false);
			this.getView().byId("ProdDate").setEnabled(true);
			this.getView().byId("sledDate").setEnabled(false);
			this.getView().byId("sledDate").setValue("");
			this.getView().byId("shelfDays").setValue("");
			this.getView().byId("batchNo").setValue("");
			this.getView().byId("batchNo").setEnabled(false);
		}
	},

	altUOMDisplay: function() {
		var quant = this.getView().byId("quant").getValue();
		quant = formatQuantity(quant, "PARSE");

		var RefreshDate = new Date();
		var AltUOMID = this.getView().byId("altuom");
		var baseuom = this.getView().byId("uom").getSelectedKey();
		if (quant != "" && baseuom != "") {
			AltUOMID.setEnabled(true);

			///////////////////////////////////////// Select AltUOM Details  ///////////////////////////////////////////

			var oAltUOMModel = new sap.ui.model.xml.XMLModel();
			oAltUOMModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetAltUOMGR_PrintLabel&Param.1=" + baseuom + "&Param.2=" + quant + "&Param.3=" + matFromURL + "&Param.4=" + clientFromURL + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);
			var oAltUOMDesc = new sap.ui.core.ListItem();
			//oAltUOMDesc.bindProperty("text", "UOMDESC");
			//oAltUOMDesc.bindProperty("key", "InternalUOM");
			//AltUOMID.bindItems("/Rowset/Row", oAltUOMDesc);
			AltUOMID.setModel(oAltUOMModel);

		} else if (quant != "" && this.getView().byId("uom").getValue() != "") {
			AltUOMID.setValue(quant+" "+this.getView().byId("uom").getValue());
		} else {
			AltUOMID.setEnabled(false);
			var oAltUOMNullModel = new sap.ui.model.xml.XMLModel();
			AltUOMID.setModel(oAltUOMNullModel);
		}


	},

    getUom: function(evt) {

        AltUom = this.getView().byId("uom").getSelectedKey();
        isValidUOM= false;
        if (AltUom=="" || AltUom==null || AltUom==undefined || AltUom== "undefined" || AltUom == "null") {
	 AltUom=oControllerThis.getView().byId("uom").getValue();
	    if(AltUom!=""){
		 isValidUOM=true;
	    }
        } else{isValidUOM=true;}

        if (!isValidUOM) {
                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CustomGR_alert_5"), {
                    title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
                });
                this.getView().byId("uom").setSelectedKey("");
         } else if (LEUoM != "" && LEQuant != "") {
            var StockQty = new sap.ui.model.xml.XMLModel();
            StockQty.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_QuantityConversion_GR&Param.1=" + clientFromURL + "&Param.2=" + matFromURL + "&Param.3=" + LEQuant + "&Param.4=" + userLanguage + "&Param.5=" + LEUoM + "&Param.6=" + AltUom + "&Content-Type=text/xml"), "", false);
            var ConvertedQty = StockQty.getProperty("/Rowset/Row/O_ConvertedQuantity");
            var oErrorMessage = StockQty.getProperty("/Rowset/Row/O_ErrorMessage");
            var oType = StockQty.getProperty("/Rowset/Row/O_Type");
            ConvertedQty = formatQuantity(ConvertedQty, "FORMAT");

            if (oType == "E") {
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.error(oErrorMessage, {
                    title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
                });
                //sap.m.MessageBox.error(oErrorMessage);
                this.getView().byId("quant").setValue("");
                this.getView().byId("uom").setSelectedKey("");
            } else {

                this.getView().byId("quant").setValue(ConvertedQty);
            }
        }
        if (suFromURL == "X" && (oBCPStats != "1" || sLoc_whNo_source=="EWM")) //BCP ON
		{
			oControllerThis.altUOMDisplay();
		}
    },

	validateQuant: function(oEvt) {
		validateQuantity(oEvt);
		if (suFromURL == "X" && (oBCPStats != "1" || sLoc_whNo_source=="EWM")) //BCP ON
		{
			this.altUOMDisplay();
		}
	},

	goToECCGM: function() {
		var refresh = new Date();
		var oECCURLModel = new sap.ui.model.xml.XMLModel();
		oECCURLModel.attachRequestSent(function() {
			sap.ui.core.BusyIndicator.show(1);
		});
		oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetECCURL&Param.1=" + orderFromURL + "&Param.2=GR&cache=" + refresh + "&Content-Type=text/xml"), "", true);
		oECCURLModel.attachRequestCompleted(function() {
			sap.ui.core.BusyIndicator.hide();
			var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
			window.open(oURL);
		});
	}
	/*quantInput : function(event) { 

    		var quantityValue=this.getView().byId("quant").getValue();
    		if(quantityValue != ""){
    		var quantity= formatQuantity(quantityValue, "PARSE");

    		if(isNaN(quantity) || quantity ==  "undefined" || quantity == undefined){
    			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "CustomGR_alert_27"),{title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")});
    			this.getView().byId("quant").setValue(""); 
    		}
    			this.getView().byId("quant").setEnabled(true); 
    		}

    }*/
});