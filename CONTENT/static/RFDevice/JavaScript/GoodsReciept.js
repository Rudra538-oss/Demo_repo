var siteFromURL, O_MIIBCPFlag, sLoc_whNo_source;
var I_MIIBCPFlag;
var orderFrmURL;
var matFrmURL;
var plantFromURL;
var nodeID;
var resource;
var data;
var order;
var material1;
var matTrim;
var des;
var desTrim;
var batchData;
var batchNo;
var sledDate;
var date;
var m;
var d;
var day;
var month;
var matData;
var ord;
var matr;
var client, client1;
var uom, uom1;
var coPro, coPro1;
var byPro, byPro1;
var whno, whno1;
var su, su1;
var printer_xml;
var plant;
var lineID;
var resourceGR;
var mvtType, product_type;
var sloc, prodFlag;
var wh, batchArea;
var client;
var sBin_resp;
var sFlag, sBinFlag;
var posting_date, workstation;
var matnr, batch, qty;
var production_date, shelflife_date;
var sBin, loginID;
var posting_date, current_date;
var flag, huManaged, hu_resp;
var LEQuant, LEUoM;
var L_values, print, copies, printerID;
var flag;
var language, NonBatchManagedFlag;
var BCPCurrentState;
var outputDateFormat;
  var storageLoc;
var flag;
var dateNum,monthNum,fullYear;
var oBCPStats;
var ostorageType,ostorageBin,flagEdit;

//oDataInterface = new oDataInterface();

document.onkeydown = fkey;

function fkey(e) {
	console.log(e);

	if (e.keyCode == 113) {
		doClear();
	}
	if (e.keyCode == 114) {
		doBack();
	}
	if (e.keyCode == 117) {
		doBatch();
	}
	if (e.keyCode == 118 || e.keyCode == 13) {
		doGR();
	}
}

function onLoading() {
	callTimeOut();
	flag = "0";
	prodFlag = "0";
	client = getURLParameter("client");
	sFlag = "0";
	product_type = getURLParameter("product");
	mvtType = product_type == "BYPRODUCT" ? "531" : "101";
	plantFromURL = getURLParameter("plant");
	siteFromURL = getURLParameter("site");
	sloc = getURLParameter("sloc");

	//  wh = getURLParameter("wh");
	//resourceGR = decodeURIComponent(getURLParameter("resource"));
	nodeID = getURLParameter("nodeID");
	orderFrmURL = getURLParameter("order");
	matfromURL = getURLParameter("material");
	// alert(matfromURL);
	//resource = document.getElementById("resourceArea");
	//resource.value = resourceGR;
	var valSite = getProperty(L_values, 'RF_GRT_SITE');
	document.getElementById("labelHdr").innerText = valSite + plantFromURL;
	order = document.getElementById("orderArea");
	order.value = orderFrmURL;
	ord = orderFrmURL;
	material1 = document.getElementById("materialArea");
	matTrim = matfromURL.split(" ");
	material1.value = matTrim[0];
	matr = matTrim[0];
	var m1 = matr;
	// alert(matr);
	des = document.getElementById("descriptionArea");
	desTrim = matfromURL.slice(9);
	des.value = desTrim;
	language = getLanguage();
	outputDateFormat = dateConvert();
	var DateNw = new Date();
	var details = "CustomGR_alert_BCPOnDeclarationMsg,TransferType_Lbl_StorageType,TransferType_Lbl_StorageBin,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,CustomGR_alert_29,BCP_COMMON_MSG_QUANTITY,NPORTAL_COMMON_LABEL_NO_OF_COPIES,NPORTAL_COMMON_LABEL_PRINTER_NAME,RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_GRT_LBL,RF_GRT_HDR,RF_GRT_BK,RF_GRT_BA,RF_GRT_BAT,RF_GRT_DEC,RF_GRT_Wait,RF_GRT_RESR,RF_GRT_BCP,RF_GRT_MAT,RF_GRT_DESC,RF_GRT_OR,RF_GRT_PDATE,RF_GRT_SLED,RF_GRT_QTY,RF_GRT_POSTDT,RF_GRT_SBIN,RF_GRT_SSCC,CustomGR_alert_23,CustomGR_alert_24,CustomGR_alert_25,ECCLabel_alert6,CustomGR_alert_1,CustomGR_alert_21,CustomGR_alert_26,CustomGR_alert_23,CustomGI_alert_1,CustomGR_alert_7,NPDashboard_Error,ALERT_POS_QTY,ALERT_PROD_F_DATE,ALERT_PROD_DATE,ALERT_ENT_QTY,ALERT_INV_BATCH,ALERT_UOM,CustomGR_alert_30";

	L_values = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + language + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml");
	// console.log("hi" + L_values);

	var valWait = getProperty(L_values, 'RF_GRT_Wait');

	var valHome = getProperty(L_values, 'RF_GRT_HDR');
	var valDeclare = getProperty(L_values, 'RF_GRT_DEC');

	//var valResr = getProperty(L_values, 'RF_GRT_RESR');

	var valBCP = getProperty(L_values, 'RF_GRT_BCP');
	var valOrder = getProperty(L_values, 'RF_GRT_OR');
	var valBk = getProperty(L_values, 'RF_GRT_BK');
	var valMat = getProperty(L_values, 'RF_GRT_MAT');

	var printLabel = getProperty(L_values, 'NPORTAL_COMMON_LABEL_PRINTER_NAME');
	var printCopiesLabel = getProperty(L_values, 'NPORTAL_COMMON_LABEL_NO_OF_COPIES');

	var valLblSSCC = getProperty(L_values, 'RF_GRT_SSCC');
	var valBat = getProperty(L_values, 'RF_GRT_BA');

	var valSLED = getProperty(L_values, 'RF_GRT_SLED');
	var valDesc = getProperty(L_values, 'RF_GRT_DESC');
	var valPDate = getProperty(L_values, 'RF_GRT_PDATE');
	var valPostDate = getProperty(L_values, 'RF_GRT_POSTDT');
	var valQty = getProperty(L_values, 'RF_GRT_QTY');
	var valSBin = getProperty(L_values, 'RF_GRT_SBIN');
	//var valSSCC = getProperty(L_values,'RF_GRT_SSCC');
	var valBatch = getProperty(L_values, 'RF_GRT_BAT');
	var valTitle = document.title;
	valTitle = getProperty(L_values, 'RF_GRT_LBL');

 	varStype=getProperty(L_values, 'TransferType_Lbl_StorageType');
	varSBin=getProperty(L_values, 'TransferType_Lbl_StorageBin');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BkBtn").innerHTML = valBk;
	document.getElementById("idBatch").innerHTML = valBat;
	document.getElementById("declareId").innerHTML = valDeclare;
	//document.getElementById("idResr").innerHTML = valResr;
	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("idDesc").innerHTML = valDesc;
	document.getElementById("idOrder").innerHTML = valOrder;
	document.getElementById("materialL").innerHTML = valMat;

	document.getElementById("printLbl").innerHTML = printLabel;
	document.getElementById("printCopiesLbl").innerHTML = printCopiesLabel;

	document.getElementById("sledL").innerHTML = valSLED;
	document.getElementById("batchL").innerHTML = valBatch;
	document.getElementById("qty").innerHTML = valQty;

	document.getElementById("postL").innerHTML = valPostDate;
	document.getElementById("bin").innerHTML = valSBin;

	document.getElementById("idProdDate").innerHTML = valPDate;
	document.getElementById("ssccL").innerHTML = valLblSSCC;
	
	document.getElementById("sType").innerHTML = varStype;
	document.getElementById("sBin").innerHTML = varSBin;

	document.getElementById("sType").style.display = "none";
	document.getElementById("sTypeLbl").style.display = "none";
	
	
	document.getElementById("sBin").style.display = "none";	
	document.getElementById("sBinLbl").style.display = "none";
	

            

	$("#prodDateArea").datepicker().datepicker("setDate", new Date());
	$( '#prodDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
	//document.getElementById("prodDateArea").value = dateConvert(document.getElementById("prodDateArea").value, "MM/dd/yyyy", "FROM");

	//////////////////////////////////////////////////////////////////NonBatch Managed Material/////////////////////////////////////////////////////////////
	nonBatchManagedModelModel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + client + "&Param.3=" + matTrim[0] + "&d=" + DateNw + "&Content-Type=text/xml");
	NonBatchManagedFlag = $(nonBatchManagedModelModel).find('XCHPF').text();


	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ordLength = ord.length;
	for (var p = 0; p < (12 - ordLength); p++) {
		ord = "0" + ord;
	}

	var Length = matr.length;

	for (var p = 0; p < (18 - Length); p++) {
		matr = "0" + matr;
	}



	hu_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + matTrim[0] + "&Param.2=" + plantFromURL + "&Param.3=" + client + "&Param.4=" + ord + "&d=" + DateNw + "&Content-Type=text/xml");
	huManaged = $(hu_resp).find("HU_MANAGED").text();
	wh = $(hu_resp).find("WHNumber").text();

  
	var refresh = new Date();
       	oBCPStatusModel=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d=" + refresh + "&Content-Type=text/xml");
      	  oBCPStats= $(oBCPStatusModel).find("O_Flag").text();
	

///////////////////////////////////////////////////////////////////////////////Storage Type and Storage Bin/////////////////////////////////////////////////////////////////

         ogetSlocAndWh= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+ord+"&Param.2=" +client+ "&Param.3="+plantFromURL+"&d=" + refresh + "&Content-Type=text/xml");   
         storageLoc = $(ogetSlocAndWh).find("LGORT").text();

////////////////////////////////////////////////EWMorECC//////////////////////////////////////////////////////////////
         var ogetSource= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&d=" + refresh + "&Content-Type=text/xml");
         sLoc_whNo_source = $(ogetSource).find("source").text();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var bat = "BATCHES";
	var batch_xml = populateDropdownData("batchList", "Key", "Value", "/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox_PreDefinedBatch&Param.1=" + bat + "&Param.5=" + client + "&Param.6=" + plantFromURL + "&Param.7=" + nodeID + "&Param.8=" + ord + "&Param.9=" + matTrim[0] + "&Param.10=" + mvtType + "&Param.12=" + product_type + "&d=" + DateNw + "&Content-Type=text/xml");
	// populateDropdownData("batchList","BATCH_NO","BATCH_NO","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetDistinctBatches&Param.1="+client+"&Param.2="+plantFromURL+"&Param.3="+nodeID+"&Param.4="+ord+"&Param.5="+matTrim[0]+"&Param.6="+mvtType+"&d=" + DateNw + "&Content-Type=text/xml");
	populateDropdownData("unitArea", "UOMDESC", "UOM", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1=" + client + "&Param.2=" + m1 + "&Param.3=" + language + "&Param.4=ISOCODE" + "&d=" + DateNw + "&Content-Type=text/xml");
	//alert(language);
	var selectObj = document.getElementById("unitArea");
	batchArea = document.getElementById("batchArea");
	var first_batch = $(batch_xml).find('Key:eq(0)').text();
	var preDfnFlg = $(batch_xml).find('PreDefinedBachFlag:eq(0)').text();
	var statusFlg = $(batch_xml).find('status:eq(0)').text();
	var msgString = $(batch_xml).find('message:eq(0)').text();
	if (statusFlg == "E") {
		errorMsg.style.display = "none";
		var valAlertErrorMsgGR = getProperty(L_values, 'NPDashboard_Error');
		alert(valAlertErrorMsgGR + msgString);
		document.getElementById("prodDateArea").disabled = true;
		document.getElementById("sledArea").disabled = true;
		document.getElementById("batchArea").disabled = true;
		document.getElementById("idBatch").disabled = true;
		document.getElementById("declareId").disabled = true;
	} else if (statusFlg == "S" && preDfnFlg == "PreDefined") {
		document.getElementById("idBatch").disabled = true;

		var sledPreDfnd = $(batch_xml).find("SLED").text();
		var prodPreDfnd = $(batch_xml).find("PRODUCTION_DATE").text();

		document.getElementById("prodDateArea").disabled = true;
		document.getElementById("sledArea").disabled = true;
		document.getElementById("batchArea").disabled = true;
		//var sled_format_pre_defined = sledPreDfnd.split("T")[0];
		//sled_format_pre_defined = sled_format_pre_defined.split("-")[1] + "/" + sled_format_pre_defined.split("-")[2] + "/" + sled_format_pre_defined.split("-")[0];
		//document.getElementById("sledArea").value = dateConvert(sled_format_pre_defined, "MM/dd/yyyy", "FROM");
		sledFormatting(sledPreDfnd);
		prodDateFormatting(prodPreDfnd);

		batchArea.value = first_batch;
		if (first_batch != "") {
			selectBatch();
		}
		selectObj.remove(0);
	} else if (NonBatchManagedFlag != "X") {
		document.getElementById("idBatch").disabled = true;
		document.getElementById("prodDateArea").disabled = false;
		document.getElementById("batchArea").disabled = true;

	} else if (statusFlg == "S" && preDfnFlg == "IncorrectFormatBatch") {
		//Show error msg on incorrect batch format
		var valAlertIncorrectBatch = getProperty(L_values, 'CustomGR_alert_30');
		alert(valAlertIncorrectBatch);
		errorMsg.style.display = "none";
	
		document.getElementById("prodDateArea").disabled = true;
		document.getElementById("sledArea").disabled = true;
		document.getElementById("batchArea").disabled = true;
		document.getElementById("idBatch").disabled = true;
		document.getElementById("declareId").disabled = true;
	} else {
		//fill the non-pre-difined batch values
		document.getElementById("prodDateArea").disabled = false;
		document.getElementById("sledArea").disabled = false;
		document.getElementById("batchArea").disabled = false;
		document.getElementById("idBatch").disabled = false;
		document.getElementById("declareId").disabled = false;

		batchArea.value = first_batch;
		if (first_batch != "") {
			selectBatch();
		}
		selectObj.remove(0);
	}
	/*batchArea.value = first_batch;
	if (first_batch != "") {
	    selectBatch();
	}
	selectObj.remove(0);*/
	LEModel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetLEUOMGR&Param.1=" + plantFromURL + "&Param.2=" + client + "&Param.3=" + m1 + "&Param.4=" + language + "&Param.5=" + ord +"&Param.6=" + product_type+ "&d=" + DateNw + "&Content-Type=text/xml");
	LEUoM = $(LEModel).find('UOM').text();
	LEQuant = $(LEModel).find('QUANTITY').text();

	if (product_type == "HEADER") {
		if (LEQuant == "" || LEQuant == "---") {
			data = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQLQ_GetGMEIN&Param.1=" + ord + "&Param.2=" + client + "&Param.3=" + plantFromURL + "&d=" + DateNw + "&Content-Type=text/xml");
			var selected_uom = $(data).find("GMEIN").text();

			for (var i = 0; i < selectObj.options.length; i++) {
				//alert(selectObj.options[i].value);
				if (selectObj.options[i].value == selected_uom) {
					selectObj.options[i].selected = true;
				}
			}
		} else {
			for (var i = 0; i < selectObj.options.length; i++) {
				//alert(selectObj.options[i].value);
				if (selectObj.options[i].value == LEUoM) {
					selectObj.options[i].selected = true;
				}
			}

			// document.getElementById("quantityArea").value = LEQuant;
			var ID = "quantityArea";
			readQuant(LEQuant, ID);
		}
	} else {
		if (LEQuant == "" || LEQuant == "---") {
			data = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetUnitAreaForCo_ByProd&Param.1=" + ord + "&Param.2=" + m1 + "&cache=" + refresh + "&Content-Type=text/xml");
			var selected_uom = $(data).find("MEINS").text();
			for (var i = 0; i < selectObj.options.length; i++) {
				//alert(selectObj.options[i].value);
				if (selectObj.options[i].value == selected_uom) {
					selectObj.options[i].selected = true;
				}
			}
		} else {

			for (var i = 0; i < selectObj.options.length; i++) {
				//alert(selectObj.options[i].value);
				if (selectObj.options[i].value == LEUoM) {
					selectObj.options[i].selected = true;
				}
			}

			// document.getElementById("quantityArea").value = LEQuant;
			var ID = "quantityArea";
			readQuant(LEQuant, ID);

		}
	}


	flag = bcpStatus("BCPArea", L_values);

	if (flag != 1 && huManaged == "X") { //BCP ON
		BCPCurrentState = "ON";

		printer_xml = populateDropdownData("printSelect", "VALUE", "KEY", "/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=" + nodeID + "&Param.2=" + client + "&Param.3=" + m1 + "&cache=" + refresh + "&Content-Type=text/xml");
		print = $(printer_xml).find('KEY:eq(0)').text();
		document.getElementById("printSelect").value = print;
		copies = print.split("---")[2];
		document.getElementById("printCopiesInput").value = copies;

		$('#printLbl').show();
		$('#printSelect').show();
		$('#printCopiesLbl').show();
		$('#printCopiesInput').show();
		document.getElementById("printCopiesInput").disabled = false;
	} else if (flag == 1 && huManaged == "X") { ////BCP OFF
		BCPCurrentState = "OFF";

		printer_xml = populateDropdownData("printSelect", "VALUE", "KEY", "/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType_BCPOFF&Param.1=" + nodeID + "&Param.2=" + client + "&Param.3=" + m1 + "&cache=" + refresh + "&Content-Type=text/xml");
		print = $(printer_xml).find('KEY:eq(0)').text();
		document.getElementById("printSelect").value = print;


		$('#printLbl').show();
		$('#printSelect').show();
	}

	setInterval(function () {
		flag = bcpStatus("BCPArea", L_values);

		if (flag != 1 && huManaged == "X" && BCPCurrentState == "OFF") { //BCP ON ,was BCP off
			BCPCurrentState = "ON";

			printer_xml = populateDropdownData("printSelect", "VALUE", "KEY", "/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=" + nodeID + "&Param.2=" + client + "&Param.3=" + m1 + "&cache=" + refresh + "&Content-Type=text/xml");
			print = $(printer_xml).find('KEY:eq(0)').text();
			document.getElementById("printSelect").value = print;
			copies = print.split("---")[2];
			document.getElementById("printCopiesInput").value = copies;

			$('#printLbl').show();
			$('#printSelect').show();
			$('#printCopiesLbl').show();
			$('#printCopiesInput').show();
			print = document.getElementById("printSelect").value;
			copies = print.split("---")[2];
			if (copies == "") {

				document.getElementById("printCopiesInput").disabled = true;
			} else
				document.getElementById("printCopiesInput").disabled = false;
		} else if (flag == 1 && huManaged == "X" && BCPCurrentState == "ON") {
			BCPCurrentState = "OFF";

			printer_xml = populateDropdownData("printSelect", "VALUE", "KEY", "/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType_BCPOFF&Param.1=" + nodeID + "&Param.2=" + client + "&Param.3=" + m1 + "&cache=" + refresh + "&Content-Type=text/xml");
			print = $(printer_xml).find('KEY:eq(0)').text();
			document.getElementById("printSelect").value = print;


			$('#printLbl').show();
			$('#printSelect').show();
			$('#printCopiesLbl').hide();
			$('#printCopiesInput').hide();
		}

	}, 30000);

	// document.getElementById("prodDateArea").readOnly = true;
	document.getElementById("prodDateArea").disabled = true;
	document.getElementById("sledArea").disabled = true;
	$("#postDateArea").datepicker().datepicker("setDate", new Date());
	$( '#postDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
	//postChange();
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var today = mm + '/' + dd + '/' + yyyy;
	current_date = today;



	

}

 function getStorageType(){

	  var DateNw = new Date();
	 var sType=document.getElementById("sType").value;
	
             
  	 populateDropdownData("sBin", "STGE_BIN", "STGE_BIN", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetStorageBin&Param.1="+sType+"&Param.2="+ostorageBin+"&Param.3=" + storageLoc + "&Param.4=" + wh + "&Param.5="+ostorageType+"&d=" + DateNw + "&Content-Type=text/xml");
	
 	 							
 	$("#sBin").prop("selectedIndex", 1);
	
   
 }

function getStorageBin(){

	  var sbinselect=document.getElementById("sBin").value;
	
}
function doClear() {

}

function prodChange() {
	prodFlag = "1";
	doBatch();
}


function selectPrinter() {
	print = document.getElementById("printSelect").value;
	// var print1=document.getElementById("printSelect").text;

	copies = print.split("---")[2];
	document.getElementById("printCopiesInput").value = copies;
	document.getElementById("printCopiesInput").disabled = false;
	if (copies == "") {

		document.getElementById("printCopiesInput").disabled = true;
	}
}

function doBack() {

}

function fetchSTypeAndSBin() {

	



	document.getElementById("sType").style.display = "block";
	document.getElementById("sTypeLbl").style.display = "block";
	

	document.getElementById("sBin").style.display = "block";	
	document.getElementById("sBinLbl").style.display = "block";
	
	document.getElementById("sType").disabled= false;
	document.getElementById("sBin").disabled= false;

	var batchForRF=document.getElementById("batchArea").value;

	var refresh = new Date();
	var ostorageTypeBinModel= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_GetstorageTypeBin_BCPOn&Param.1="+plantFromURL+"&Param.2="+client+"&Param.3="+ord+"&Param.4="+matTrim[0]+"&Param.5="+product_type+"&Param.6="+nodeID+"&Param.7="+batchForRF+"&d=" + refresh + "&Content-Type=text/xml");
         	 ostorageType = $(ostorageTypeBinModel).find("StorageType").text();
      	 ostorageBin =$(ostorageTypeBinModel).find("StorageBin").text();
	  flagEdit= $(ostorageTypeBinModel).find("Flag").text();


	populateDropdownData("sType", "STGE_TYPE", "STGE_TYPE", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetStorageType&Param.1="+ostorageType+"&Param.2="+ostorageBin+"&Param.3=" + storageLoc + "&Param.4=" + wh + "&d=" + refresh + "&Content-Type=text/xml");
	  
	
  	
	 populateDropdownData("sBin", "STGE_BIN", "STGE_BIN", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetStorageBin&Param.1="+ostorageType+"&Param.2="+ostorageBin+"&Param.3=" + storageLoc + "&Param.4=" + wh + "&Param.5="+ostorageType+"&d=" + refresh + "&Content-Type=text/xml");
	
	document.getElementById("sType").style.display = "block";
	document.getElementById("sBin").style.display = "block";	
	document.getElementById("sType").value = ostorageType;
	document.getElementById("sBin").value = ostorageBin;

	
	if(flagEdit==2)

			{
				document.getElementById("sType").disabled= "true";
				document.getElementById("sBin").disabled= "true";
			}
			


			
				
}

function selectBatch() {

	var batch = document.getElementById("batchArea").value;
	var material = document.getElementById("materialArea").value;
	if (batch != "") {


		////////////////////////////////to Reconsider existing batch as new, if it has total 0 quantity declared//////////////////////////////////////
		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GoodsMovemetReportInput><language>" + language + 
						"</language><client>" + client + "</client><plant>" + plantFromURL + 
						"</plant><nodeID>" + nodeID + "</nodeID><matrNumber>" + material + 
						"</matrNumber><BatchNumber>"+batch+"</BatchNumber><routingOperationNumber/></GoodsMovemetReportInput>";
		var BatchReportModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_BatchPostedGoodsMovement_GR&Param.1=" + InputXMLInStringFormat + "&Content-Type=text/xml"));
	  	var batchQuantity= $(BatchReportModel).find('oQuantity').text();
	  	var existingBatch= (batchQuantity=="0" || batchQuantity=="NA")? "0": "1";

		if(oBCPStats == "0" || oBCPStats == "2"){
		  fetchSTypeAndSBin();
		}

		if(existingBatch=="0"){

		var today = new Date();
		var dd = today.getDate();
		var MM = today.getMonth() + 1; //January is 0!
		var HH= today.getHours();
		var mm =today.getMinutes();

		var yyyy = today.getFullYear();
		if (dd < 10) {
		  dd = '0' + dd;
		}
		if (MM < 10) {
		  MM = '0' + MM;
		}
		if (HH < 10) {
		  HH = '0' + HH;
		}
		if (mm < 10) {
		  mm = '0' + mm;
		}
		today = yyyy+"-"+MM+"-"+dd+ "T"+HH+":"+mm+":00";
	  	var GetProdDateModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGRProdDate&Param.1=" + today + "&Param.2=" + plantFromURL + "&Param.3=" + client + "&Param.4=" + nodeID+ "&Content-Type=text/xml"));
	  	var oProdDateNw= $(GetProdDateModel).find("oProdDate").text();
		$("#prodDateArea").datepicker().datepicker("setDate", new Date(oProdDateNw));
		var prodDate= oProdDateNw.split("T")[0];
		prodDate = prodDate.split("-")[1]+"/"+prodDate.split("-")[2]+"/"+prodDate.split("-")[0]+" "+oProdDateNw.split("T")[1];//////////format---------MM/dd/yyyy HH:mm:ss
	  	var GetMaterialTypeModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetMaterialType&Param.1=" + client + "&Param.2=" + material + "&Content-Type=text/xml"));
	  	var noOfRows_materialType = $(GetMaterialTypeModel).find("Row").size();
		if (noOfRows_materialType > 0) {
		  var matType = $(GetMaterialTypeModel).find("MTART").text();
		  var GetShelfLifeDateModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetShelfLifeDate_ExpiryDate&Param.1=" + plantFromURL + "&Param.2=" + client + "&Param.3=" + material + "&Param.4=" + matType + "&Param.5=" + prodDate + "&Content-Type=text/xml"));
		  var val_shelfLifeDate = $(GetShelfLifeDateModel).find("O_ExpiryDate").text();
		  if (val_shelfLifeDate != "") {
		    $("#sledArea").datepicker().datepicker("setDate", new Date(val_shelfLifeDate));
		    $( '#sledArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		   };
		  document.getElementById("prodDateArea").disabled = false;
		  document.getElementById("sledArea").disabled = false;
		  }
		}else {

		  sled_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetSLED_by_Batch&Param.1=" + client + "&Param.2=" + plantFromURL + "&Param.3=" + nodeID + "&Param.4=" + ord + "&Param.5=" + matTrim[0] + "&Param.6=" + mvtType + "&Param.7=" + batch + "&Content-Type=text/xml");
		  var sled = $(sled_resp).find("SLED:eq(" + 0 + ")").text();
		
		  var sledExistbatch = sled.split("T")[0];

		  var prod = $(sled_resp).find("PRODUCTION_DATE:eq(" + 0 + ")").text();

		  var nodes = $(sled_resp).find("Row").size();
		  if (nodes != 0) {
			document.getElementById("prodDateArea").disabled = true;
			document.getElementById("sledArea").disabled = true;
			//sled_format = sled.split("T")[0];
			//sled_format = sled_format.split("-")[1] + "/" + sled_format.split("-")[2] + "/" + sled_format.split("-")[0];
			//document.getElementById("sledArea").value = dateConvert(sled_format, "MM/dd/yyyy", "FROM");

			//prod = prod.split("T")[0];
			//var dateformatted1 = prod.split("-")[1] + "/" + prod.split("-")[2] + "/" + prod.split("-")[0];
			//var prodDate = document.getElementById("prodDateArea");
			//prodDate.value = dateConvert(dateformatted1, "MM/dd/yyyy", "FROM");
			
			
			
			sledFormatting(sledExistbatch);
			prodDateFormatting(prod);
		} else {
			document.getElementById("prodDateArea").disabled = false;
			document.getElementById("sledArea").disabled = false;
		}

		}
	}
}

function doBatch() {



	//document.getElementById("prodDateArea").readOnly = false;
	document.getElementById("prodDateArea").disabled = false;
	document.getElementById("sledArea").disabled = false;
	material1 = document.getElementById("materialArea").value;
	if (prodFlag == "0") {
		$("#prodDateArea").datepicker().datepicker("setDate", new Date());
		$( '#prodDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		//document.getElementById("prodDateArea").value = dateConvert(document.getElementById("prodDateArea").value, "MM/dd/yyyy", "FROM");
	}
	var matType = "undefined";
	var dateInGMT = $('#prodDateArea').datepicker('getDate');

	var dateformatted = dateInGMTFormat(dateInGMT);

	
	/*var d1 = dateConvert(document.getElementById("prodDateArea").value, "MM/dd/yyyy", "TO");
	date = new Date(d1);
	m = date.getMonth() + 1;
	d = date.getDate();

	if (d < 10) {
		day = "0" + d;
	} else {
		day = d;
	}
	if (m < 10) {
		month = "0" + m;
	} else {
		month = m;
	}
	var dateformatted = date.getFullYear() + "-" + month + "-" + day;*/

	var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><BatchDetailsInput><materialNumber>" + material1 + "</materialNumber><plant>" + plantFromURL + "</plant><client>"+client+"</client><materialType>" + matType + "</materialType><productionDate>" + dateformatted + "</productionDate></BatchDetailsInput>"

	var InputXML = jQuery.parseXML(InputXMLInStringFormat);
	batchData = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_ToGenerateBatch&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&Content-Type=text/xml");

	var generated_batch = $(batchData).find("batchNumber").text();
	var expiryDate = $(batchData).find("expiryDate").text();

	var status = $(batchData).find("status").text();
	var message = $(batchData).find("message").text();
	batchNo = document.getElementById("batchArea");
	sledDate = document.getElementById("sledArea");

	//batchNo.options.length = 0
	if (prodFlag == "0") {
		batchNo.value = generated_batch;
	} else {
		prodFlag = "0";
	}

	if (status == "S") {
		//var dateformatted1 = expiryDate.split("-")[1] + "/" + expiryDate.split("-")[2] + "/" + expiryDate.split("-")[0];
		//sledDate.value = dateConvert(dateformatted1, "MM/dd/yyyy", "FROM");

		sledFormatting(expiryDate);
		document.getElementById("sledArea").disabled = false;


   			  if(oBCPStats == "0" || oBCPStats == "2"){
				fetchSTypeAndSBin();

				}
	} else {
		alert(message);
	}

}

function doGR() {

	var today = new Date();
	var time = new Date();
	time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
	workstation = document.getElementById("machine").value;
	uom = document.getElementById("unitArea").value;
	//alert(uom);
	matnr = document.getElementById("materialArea").value;
	qty = document.getElementById("quantityArea").value;
	var symbolXML = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
	var symbol = $(symbolXML).find("O_SymbolQuantity").text();
	qty = qty.replace(symbol, '.');
	qty = ("0" + qty);
	//var batch =  document.getElementById("batchArea").options[document.getElementById("batchArea").selectedIndex].text;
	batch = document.getElementById("batchArea").value;
	var batchLen = batch.length;
	// alert(batchLen);
	var currentYear = parseInt(current_date.split('/')[2]);
	var currentMonth = parseInt(current_date.split('/')[0]);
	var currentDate = parseInt(current_date.split('/')[1]);
	current_datenow = currentYear + "-" + ('0' + currentMonth).slice(-2) + "-" + ('0' + currentDate).slice(-2) + "T" + time + "Z";
	//alert(current_datenow);
	/*var postDate1 = dateConvert(document.getElementById("postDateArea").value, "MM/dd/yyyy", "TO");
	var postingYear = parseInt(postDate1.split('/')[2]);
	var postingMonth = parseInt(postDate1.split('/')[0]);
	var postingDate = parseInt(postDate1.split('/')[1]);
	//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	// alert(time);
	posting_date = postingYear + "-" + ('0' + postingMonth).slice(-2) + "-" + ('0' + postingDate).slice(-2) + "T" + time + "Z";

	var prdDate1 = dateConvert(document.getElementById("prodDateArea").value, "MM/dd/yyyy", "TO");
	var prdYear = parseInt(prdDate1.split('/')[2]);
	var prdMonth = parseInt(prdDate1.split('/')[0]);
	var prdDate = parseInt(prdDate1.split('/')[1]);
	production_date = prdYear + "-" + ('0' + prdMonth).slice(-2) + "-" + ('0' + prdDate).slice(-2) + "T00:00:00Z";

	var shlfDate1 = dateConvert(document.getElementById("sledArea").value, "MM/dd/yyyy", "TO");
	var shlfYear = parseInt(shlfDate1.split('/')[2]);
	var shlfMonth = parseInt(shlfDate1.split('/')[0]);
	var shlfDate = parseInt(shlfDate1.split('/')[1]);
	shelflife_date = shlfYear + "-" + ('0' + shlfMonth).slice(-2) + "-" + ('0' + shlfDate).slice(-2) + "T00:00:00Z";*/
	
	var postDate1 = $('#postDateArea').datepicker('getDate');
	posting_date = dateInGMTFormat(postDate1)+ "T" + time + "Z";
	
	var prdDate1 = $('#prodDateArea').datepicker('getDate');
	production_date = dateInGMTFormat(prdDate1)+ "T00:00:00Z";
	
	var shlfDate1 = $('#sledArea').datepicker('getDate');
	shelflife_date = dateInGMTFormat(shlfDate1)+ "T00:00:00Z";
	
	print = document.getElementById("printSelect").value;
	printerID = print.split("---")[0];
	copies = document.getElementById("printCopiesInput").value;

	sBin_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + matTrim[0] + "&Param.2=" + plantFromURL + "&Param.3=103&Param.4=" + ord + "&Content-Type=text/xml");
	sBin = $(sBin_resp).find("STRG_BIN").text();
	//document.getElementById("binArea").value=sBin;

	loginID = document.getElementById("login").value;
	if (wh == "" || wh == "---" || wh == "-") {
		var valAlertwhNo = getProperty(L_values, 'CustomGR_alert_26');
		alert(valAlertwhNo);
	} else if (postDate1 == "") {
		var valAlertEntPostDt = getProperty(L_values, 'CustomGR_alert_21');
		alert(valAlertEntPostDt);
	} else if (batch == "" && NonBatchManagedFlag == "X") {
		var valAlertSelBatch = getProperty(L_values, 'CustomGI_alert_1');
		alert(valAlertSelBatch);
	} else if (qty <= 0 || qty == "") {
		var valAlertPosQty = getProperty(L_values, 'ALERT_POS_QTY');
		alert(valAlertPosQty);
	} else if (uom == "") {
		var valAlertUOM = getProperty(L_values, 'ALERT_UOM');
		alert(valAlertUOM);
	} else if (batchLen > 10) {
		var valAlertInvBatch = getProperty(L_values, 'ALERT_INV_BATCH');
		alert(valAlertInvBatch);
	} else if ((LEQuant != "" && LEQuant != "---") && Number(qty) > Number(LEQuant) && uom == LEUoM) {
		var valAlertEntQty = getProperty(L_values, 'ALERT_ENT_QTY');
		alert(valAlertEntQty);
	} else if (posting_date > current_datenow) {
		alert(getProperty(L_values, 'CustomGR_alert_1'));
	} else if (production_date > current_datenow) {
		var valAlertProdDate = getProperty(L_values, 'ALERT_PROD_DATE');
		alert(valAlertProdDate);
	} else if (production_date >= shelflife_date) {
		alert(getProperty(L_values, 'CustomGR_alert_23'));
	} else if (production_date > posting_date) {
		var valAlertProdFDate = getProperty(L_values, 'ALERT_PROD_F_DATE');
		alert(valAlertProdFDate);
	} else if (production_date >= shelflife_date) {
		var valAlertProdFDate = getProperty(L_values, 'CustomGR_alert_23');
		alert(valAlertProdFDate);
	} else if (flag != 1 && huManaged == "X" && printerID == "") {
		var valAlertPrinter = getProperty(L_values, 'CustomGR_alert_24');
		alert(valAlertPrinter);
	} else if (flag != 1 && huManaged == "X" && copies == "" && printerID != "No Print") {

		var valAlertCopies = getProperty(L_values, 'ECCLabel_alert6');
		alert(valAlertCopies);
	} else {
		I_MIIBCPFlag = 0;
		declare();
		
	}
	errorMsg.style.display = "none";
}

function doBack() {
	window.history.back();
}

function declare() {
	
	var info = "";
	flag = bcpStatus("BCPArea", L_values);
	//alert($('#printSelect').is(":hidden"));
	if (flag != 1 && huManaged == "X" && $('#printSelect').is(":hidden")) {
		alert(getProperty(L_values, 'CustomGR_alert_25'));
		$('#printLbl').show();
		$('#printSelect').show();
		$('#printCopiesLbl').show();
		$('#printCopiesInput').show();
	} else {
		batch = batch.toUpperCase();
		document.getElementById("batchArea").value = batch;

		if (batch == "---" || batch == "null") {
			batch = "";
		}
		var shelflife_date1 = document.getElementById("sledArea").value;
		if (shelflife_date1 == "TimeUnavailable" || shelflife_date1 == "") {
			shelflife_date = "";
		}

	var storageType="";
	var storageBin="";


		  if(oBCPStats == "0" || oBCPStats == "2"){

			storageType=document.getElementById("sType").value;
			storageBin=document.getElementById("sBin").value;

		}
		
		/*var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails>" +
			"<txnPath>MaterialHandling/GR/BLS/BLS_GoodsRecieptDeclarationReversal</txnPath><workstation>" + workstation + "</workstation><client>" + client + "</client><plant>" + plantFromURL + "</plant>" +
			"<nodeID>" + nodeID + "</nodeID><orderNumber>" + ord + "</orderNumber><warehouseNumber>" + wh + "</warehouseNumber>" +
			"<userId>" + loginID + "</userId> <goodsMovementItems><client>" + client + "</client><goodsMovementItem><postingDate>" + posting_date + "</postingDate><storagebin>" + encodeURIComponent(sBin) + "</storagebin>" +
			"<productionDate>" + production_date + "</productionDate><huNumber/> <materialNumber>" + matnr + "</materialNumber> <flag>" + flag + "</flag>" +
			"<quantityInReportUom>" + qty + "</quantityInReportUom> <reportUom>" + uom + "</reportUom><type>" + product_type + "</type><storagetype>"+storageType+"</storagetype><storagebin>"+storageBin+"</storagebin><batchNumber>" + batch + "</batchNumber><printerID>" + printerID + "</printerID><copies>" + copies + "</copies><info>" + info + "</info>" +
			"<movementType>" + mvtType + "</movementType><shelfLifeDate>" + shelflife_date + "</shelfLifeDate><NonBatchManagedFlag>" + NonBatchManagedFlag + "</NonBatchManagedFlag><documentNumber/><documentYear/> <postingID/>" +
			"<proceedWithWarning>false</proceedWithWarning><goodsMovementPostingMessages><I_MIIBCPFlag>" + I_MIIBCPFlag + "</I_MIIBCPFlag><client>" + client + "</client><goodsMovementPostingMessage>" +
			"<status/><message/></goodsMovementPostingMessage></goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems>" +
			"</IOReportGoodsMovementDetails>"; */

		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails>" +
			"<txnPath>MaterialHandling/GR/BLS/BLS_GoodsRecieptDeclarationReversal</txnPath><workstation>" + workstation + "</workstation><client>" + client + "</client><plant>" + plantFromURL + "</plant>" +
			"<nodeID>" + nodeID + "</nodeID><orderNumber>" + ord + "</orderNumber><warehouseNumber>" + wh + "</warehouseNumber>" +
			"<userId>" + loginID + "</userId> <goodsMovementItems><client>" + client + "</client><goodsMovementItem><postingDate>" + posting_date + "</postingDate>" +
			"<productionDate>" + production_date + "</productionDate><huNumber/> <materialNumber>" + matnr + "</materialNumber> <flag>" + flag + "</flag>" +
			"<quantityInReportUom>" + qty + "</quantityInReportUom> <reportUom>" + uom + "</reportUom><type>" + product_type + "</type><storagetype>"+storageType+"</storagetype><storagebin>"+storageBin+"</storagebin><batchNumber>" + batch + "</batchNumber><printerID>" + printerID + "</printerID><copies>" + copies + "</copies><info>" + info + "</info>" +
			"<movementType>" + mvtType + "</movementType><shelfLifeDate>" + shelflife_date + "</shelfLifeDate><NonBatchManagedFlag>" + NonBatchManagedFlag + "</NonBatchManagedFlag><documentNumber/><documentYear/> <postingID/>" +
			"<proceedWithWarning>false</proceedWithWarning><goodsMovementPostingMessages><I_MIIBCPFlag>" + I_MIIBCPFlag + "</I_MIIBCPFlag><I_MIIEWMFlag>" + sLoc_whNo_source + "</I_MIIEWMFlag><client>" + client + "</client><goodsMovementPostingMessage>" +
			"<status/><message/></goodsMovementPostingMessage></goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems>" +
			"</IOReportGoodsMovementDetails>";

		 
		var InputXML = jQuery.parseXML(InputXMLInStringFormat);

		gr_response = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_GoodsReceiptDeclarationReversal&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&Content-Type=text/xml"));
		
		O_MIIBCPFlag = $(gr_response).find("I_MIIBCPFlag").text();
		var if_success = $(gr_response).find("status").text();
                       var final_message = $(gr_response).find("message").text();
		if (if_success == "S") {

			var valAlertGoodsPosted = getProperty(L_values, 'CustomGR_alert_7');
			alert(final_message);
			errorMsg.style.display = "none";
			var bat = "BATCHES";
			populateDropdownData("batchList", "Key", "Value", "/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + bat + "&Param.5=" + client + "&Param.6=" + plantFromURL + "&Param.7=" + nodeID + "&Param.8=" + ord + "&Param.9=" + matTrim[0] + "&Param.10=" + mvtType + "&Content-Type=text/xml");
			document.getElementById("prodDateArea").disabled = true;
			document.getElementById("sledArea").disabled = true;

//////////////////////////////////////////Storage Type And Storage Bin Display//////////////////////////////////////////////////////////////////////////////

			  if(oBCPStats == "0" || oBCPStats == "2"){
				
				document.getElementById("sType").disabled= "true";
				document.getElementById("sBin").disabled= "true";
				}
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////Business Metrics/////////////////////////////////////////
var businessmetrics_gr = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFGR_CountOfTransactions&Content-Type=text/xml"));
////////////////////////////////////////////////////////////////////////////////////////////////////////	
			
		} else {
                                     if (O_MIIBCPFlag == 1) {
			
			var r = confirm(getProperty(L_values, 'CustomGR_alert_29'));
			if (r == true) {
				I_MIIBCPFlag = 1;
				
				declare();
			}
		
                          } else{
			errorMsg.style.display = "none";
			var valAlertErrorMsgGR = getProperty(L_values, 'NPDashboard_Error');
			alert(valAlertErrorMsgGR + $(gr_response).find("message").text());
			
		}
}

		//    $('#bin').hide();
		//   $('#binArea').hide();
		//flag = "0"
		errorMsg.style.display = "none";

	}
}

function changeStyle(elementID) {
	try {
		document.getElementById(elementID).options[0].style.fontSize = "60px";
	} catch (err) {}
}

function validateNoOfPrintCopies() {
	var inputValue = document.getElementById("printCopiesInput");
	var noOfCopies = inputValue.value;
	if (noOfCopies != "") {
		if (noOfCopies > 0 && !isNaN(noOfCopies) && parseInt(Number(noOfCopies)) == noOfCopies && !isNaN(parseInt(noOfCopies, 10))) {


		} else {
			inputValue.value = "";
			var valMsgEr = getProperty(L_values, 'NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES');
			alert(valMsgEr);
		}
	}
}

function sledFormatting(sledDateInput){

			var sled_format = new Date(sledDateInput+"T00:00:00");

			//var sled_format = new Date(sledDateInput);

			$( "#sledArea" ).datepicker( "setDate", sled_format);
			$( '#sledArea' ).datepicker( "option", "dateFormat", outputDateFormat);
}

function prodDateFormatting(prodDateInput){
			var dateformatted1 = new Date(prodDateInput);

			$( "#prodDateArea" ).datepicker( "setDate", dateformatted1 );
			$( '#prodDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
}


function quantityChange() {
	var quantity = document.getElementById("quantityArea").value;
	var ID = "quantityArea";
	Validate(quantity, ID);
}