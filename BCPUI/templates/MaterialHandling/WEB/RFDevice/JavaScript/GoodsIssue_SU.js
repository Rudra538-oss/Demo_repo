var language, langData;
var siteFromURL, whNoFromURL;
var orderFromURL, clientFromURL;
var matFromURL, desFromURL, stockFromURL, mat;
var plantFromURL, ssccFromURL;
var nodeID, ord, sled, uom, quant, batch, hu;
var resource, resourceGR;
var data, material1, sscc, FormattedSLED;
var matData, mvt_type, type, current_date;
var L_values;
var proceed;
var flag;
var type_Bin, sType, sBin;
var currentMonth1, currentYear1;
var postMonth, postYear, StockQty;
var vRSPOS, stock, uom, baseUom;
document.onkeydown = fkey;
var prodDate,dateformatted1;
var NonBatchManagedFlag;
var consumeRequestFlag = 0;
var outputStatus = 0;
var hu_resp, wh;
var outputDateFormat;

function fkey(e) {
	console.log(e);
	if (e.keyCode == 112 || e.keyCode == 13) {
		doSave();
	}

	if (e.keyCode == 114) {
		doBack();
	}
/**********************************For Future Consume and Request******************************************
	if (e.keyCode == 116) {
		doConsumeRequest();
	}
*************************************************************************************************************/
}

function onLoading() {
	callTimeOut();
	flag = 0;
	proceed = 0;
	plantFromURL = getURLParameter("plant");
	ssccFromURL = getURLParameter("sscc");
	siteFromURL = getURLParameter("site");
	vRSPOS = getURLParameter("vRSPOS");
	outputDateFormat = dateConvert();
	var DateNw = new Date();
	// langData=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml");
	language = getLanguage();


	var details = "RF_BCP_STATUS_ON,BCP_COMMON_MSG_QUANTITY,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_GI_LBL,GI_Stage_Success,ALERT_UOM,ALERT_POS_QTY,ALERT_POSTDATE,ALERT_BATCH,ALERT_MSG1,ALERT_ERR_OR,ALERT_ERR,RF_GI_HDR,RF_GI_CONS,RF_GI_BK,RF_GI_RESR,RF_GI_BCP,RF_GI_OR,RF_GI_MAT,RF_GI_SSCC,RF_GI_SLED,RF_GI_BA,RF_GI_PDATE,RF_GI_QTY,RF_GI_SITE,RF_GI_F1REV,CustomGI_alert_3,CustomGI_alert_4,CustomGR_alert_1,CustomGI_alert_7,CustomGI_alert_14";

	L_values = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + language + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml"));
	console.log("hi" + L_values);

	var valReverse = getProperty(L_values, 'RF_GI_SCANSC_REV');

	var valHome = getProperty(L_values, 'RF_GI_HDR');
	var valConsume = getProperty(L_values, 'RF_GI_CONS');


	var valBCP = getProperty(L_values, 'RF_GI_BCP');
	var valOrder = getProperty(L_values, 'RF_GI_OR');
	var valBk = getProperty(L_values, 'RF_GI_BK');
	var valMat = getProperty(L_values, 'RF_GI_MAT');

	var valLblSSCC = getProperty(L_values, 'RF_GI_SSCC');
	var valBat = getProperty(L_values, 'RF_GI_BA');
	var valSLED = getProperty(L_values, 'RF_GI_SLED');
	var valQty = getProperty(L_values, 'RF_GI_QTY');
	var valPDate = getProperty(L_values, 'RF_GI_PDATE');
	var valTitle = document.title;
	valTitle = getProperty(L_values, 'RF_GI_LBL');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BtnBk").innerHTML = valBk;
	document.getElementById("gi_save").innerHTML = valConsume;

	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("qty").innerHTML = valQty;
	document.getElementById("idOrder").innerHTML = valOrder;
	document.getElementById("materialL").innerHTML = valMat;
	document.getElementById("batchL").innerHTML = valBat;
	document.getElementById("sledL").innerHTML = valSLED;
	document.getElementById("postL").innerHTML = valPDate;
	document.getElementById("qty").innerHTML = valQty;
	document.getElementById("ssccL").innerHTML = valLblSSCC;

	nodeID = getURLParameter("nodeID");
	orderFromURL = getURLParameter("order");
	//matFromURL=getURLParameter("material");	
	//desFromURL=getURLParameter("des");
	whNoFromURL = getURLParameter("whNo");
	clientFromURL = getURLParameter("client");
	type = getURLParameter("type");
	
	mvt_type = type == "CON" ? "261" : "262";

	var valSite = getProperty(L_values, 'RF_GI_SITE');
	document.getElementById("labelHdr").innerText = valSite + "PLANT-" + plantFromURL;
	order = document.getElementById("orderArea");
	order.value = orderFromURL;
	ord = orderFromURL;
	//material1=document.getElementById("materialArea");
	//material1.value=matFromURL;
	//des=document.getElementById("descriptionArea");
	//des.value=desFromURL
	sscc = document.getElementById("ssccArea");
	sscc.value = ssccFromURL

	$("#postArea").datepicker().datepicker("setDate", new Date());
	$( '#postArea' ).datepicker( "option", "dateFormat", outputDateFormat);
	current_date = document.getElementById("postArea").value;
	var ordLength = ord.length;
	for (var p = 0; p < (12 - ordLength); p++) {
		ord = "0" + ord;
	}
	bcpStatus("BCPArea", L_values);
	setInterval(function () {
		bcpStatus("BCPArea", L_values);
	}, 30000);

	if (ssccFromURL != "") {
		var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>" + ssccFromURL + "</huNumber><orderNumber>" + ord + "</orderNumber><materialNumber></materialNumber><warehouseNumber>" + whNoFromURL + "</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>" + plantFromURL + "</plant><client>" + clientFromURL + "</client><language>" + language + "</language><RSPOS>" + vRSPOS + "</RSPOS></PackageDetailsInput>"
		matData = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&Content-Type=text/xml"));
		sled = $(matData).find("shelfLifeDate").text();
		uom = $(matData).find("uom").text();
		quant = $(matData).find("stock").text();
		stockFromURL = $(matData).find("stock").text();
		quant = Number(quant).toFixed(3);
		batch = $(matData).find("batchNumber").text();
		hu = $(matData).find("huNumber").text();
		mat = $(matData).find("materialNumber").text();
		prodDate = $(matData).find("ProductionDate").text();

		
		success = $(matData).find("status").text()
		if (success == "S") {
			var exp = document.getElementById("sledArea");
			

                            if(sled!="" && sled!="null" && sled!="---"){
								var dateformatted1 = new Date(sled);
								$( "#sledArea" ).datepicker( "setDate", dateformatted1 );
								$( '#sledArea' ).datepicker( "option", "dateFormat", outputDateFormat);
								FormattedSLED = exp.value;
                                //sled = sled.split("T")[0];
								//dateformatted1 = sled.split("-")[1] + "/" + sled.split("-")[2] + "/" + sled.split("-")[0];
								//exp.value = dateConvert(dateformatted1, "MM/dd/yyyy", "FROM");
								//FormattedSLED = dateConvert(dateformatted1, "MM/dd/yyyy", "FROM");
                                 }
                                   else{
                                           FormattedSLED = "" ;
                                           }

			var unit = document.getElementById("uomArea");
			material1 = document.getElementById("materialArea");
			material1.value = mat;
			populateDropdownData("uomArea", "UOMDESC", "UOM", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1=" + clientFromURL + "&Param.2=" + mat + "&Param.3=" + language + "&Param.4=GI&Param.5=" + vRSPOS + "&Param.6=" + orderFromURL + "&Content-Type=text/xml");
			var selectObj = document.getElementById("uomArea");
			selectObj.remove(0);

					
			var refresh = new Date();

			if (type != "CON") {
				if (batch == "---" || batch == "") {
					batch = "null";
				}
				var qty_consmodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock&Param.1=" + ord + "&Param.2=" + mat + "&Param.3=261&Param.4=" + batch + "&Param.5=" + nodeID + "&Param.6=" + ssccFromURL + "&Param.7=" + vRSPOS + "&cache=" + refresh + "&Content-Type=text/xml");
				var qty_consumption = $(qty_consmodel).find("QTY").text();
				var qty_cons = qty_consumption == "NA" ? 0 : qty_consumption;
				var qty_reversemodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock&Param.1=" + ord + "&Param.2=" + mat + "&Param.3=262&Param.4=" + batch + "&Param.5=" + nodeID + "&Param.6=" + ssccFromURL + "&Param.7=" + vRSPOS + "&cache=" + refresh + "&Content-Type=text/xml");
				var qty_reversed = $(qty_reversemodel).find("QTY").text();
				var qty_rev = qty_reversed == "NA" ? 0 : qty_reversed;
				var actQuanity = qty_cons - qty_rev;
				//alert(actQuanity);
				actQuanity = Number(actQuanity).toFixed(3);

				document.getElementById("quantityArea").value = actQuanity;
				var ID = "quantityArea";
				readQuant(actQuanity, ID);
				//document.getElementById("quantityArea").value = Number(actQuanity).toFixed(3);

				var ConsumedUOM_Model = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_SSCCDetails&Param.1=" + clientFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + nodeID + "&Param.4=" + ord + "&Param.5=" + mat + "&Param.6=" + batch + "&Param.7=" + ssccFromURL + "&Param.8=" + vRSPOS + "&cache=" + refresh + "&Content-Type=text/xml");
				var ConsumedUOM = $(ConsumedUOM_Model).find("REPORT_UOM").text();
				uom = ConsumedUOM;
				stockFromURL = actQuanity;

				var valF1Rev = getProperty(L_values, 'RF_GI_F1REV');
				document.getElementById("gi_save").innerHTML = valF1Rev;
				document.getElementById("postArea").setAttribute("disabled", true);
				//document.getElementById("quantityArea").setAttribute("readonly", true);

			} else {
				document.getElementById("quantityArea").value = quant;
				var ID = "quantityArea";
				readQuant(quant, ID);
			}
			var bchNo = document.getElementById("batchArea");
			if (batch == "null") {
				bchNo.value = "";
			} else {
				bchNo.value = batch + " " + FormattedSLED;

			}
		} else {

			alert($(matData).find("message").text());
			window.history.back();
			//document.getElementById("sledArea").visibility = "hidden";
			document.getElementById("uomArea").visibility = "hidden";
			document.getElementById("quantityArea").visibility = "hidden";
			document.getElementById("batchArea").visibility = "hidden";
		}
	}

	var nonBatchManagedModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + mat + "&d=" + DateNw + "&Content-Type=text/xml"));
	NonBatchManagedFlag = $(nonBatchManagedModel).find("XCHPF").text();

	this.getUom();
	document.getElementById("gi_stageConsume").style.visibility = "hidden";
/*************************************************************************************************
	///////////////////////////////////////////////////////////////////GI CONSUME AND REQUEST FOR FUTURE USE/////////////////////////////////////////////////////////////////////////////////////////
	var gi_stageconfig=loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStagingConfiguration&Param.1=1&Content-Type=text/xml"));
			

			var GIStageEnable = $(gi_stageconfig).find("Output").text();
				
			if ((GIStageEnable == "Plant") || GIStageEnable.indexOf(nodeID) != "-1") {
			document.getElementById("gi_stageConsume").style.visibility = "visible";
        } else {
		
            document.getElementById("gi_stageConsume").style.visibility = "hidden";
        }

************************************************************************************************************/
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*var AltUom = document.getElementById("uomArea").value;
	if(stockFromURL!=""  && uom!=""){
	 var StockQty1;
	        StockQty1= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_QuantityConversion&Param.1="+clientFromURL+"&Param.2="+mat+"&Param.3="+stockFromURL+"&Param.4="+language+"&Param.5="+uom+"&Param.6="+AltUom+"&Content-Type=text/xml");
	       
	                                var ConvertedQty1=$(StockQty1).find("O_ConvertedQuantity").text();
	                                var oErrorMessage1=$(StockQty1).find("O_ErrorMessage").text();
	                                var oType1=$(StockQty1).find("O_Type").text();
	           		ConvertedQty1 = formatQuantity(ConvertedQty1,"FORMAT");		
	                        
	 oType1 = $(StockQty1).find("O_Type").text();
		if(oType1=="E"){
		alert($(StockQty1).find("O_ErrorMessage").text());
		document.getElementById("errorMsg").style.display= "none";
	              document.getElementById("quantityArea").value=" " ;
		}
	                          else
	                                    {
	                            
	                                       document.getElementById("quantityArea").value= ConvertedQty1;
		                        }  
	}*/
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function doSave() {
	var today = new Date();
	var time = new Date();
	var DateNw = new Date();
	currentMonth1 = DateNw.getMonth();
	currentYear1 = DateNw.getFullYear();

	time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
	
	
	var postDate1 = $('#postArea').datepicker('getDate');
	var posting_date = dateInGMTFormat(postDate1)+"T"+time+"Z";

	
	
	var currentDate1 = $('#postArea').datepicker('getDate');
	var current_datenow = dateInGMTFormat(currentDate1)+"T"+time+"Z";

	var loginID = document.getElementById("login").value;
	postMonth = new Date(postDate1);
	
	postYear = new Date(postDate1);
	postMonth = postMonth.getMonth();
	postYear = postYear.getFullYear();
	
	var qty = document.getElementById("quantityArea").value;
	var symbolXML = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
	var symbol = $(symbolXML).find("O_SymbolQuantity").text();
	qty = qty.replace(symbol, ".");
	//qty=("0"+qty);
	//qty = Number(qty).toFixed(3);
	if (batch == "" && NonBatchManagedFlag == "X") {
		var valAlertBatch = getProperty(L_values, 'ALERT_BATCH');
		alert(valAlertBatch);
	} else if (postDate1 == "") {
		var valAlertPost = getProperty(L_values, 'ALERT_POSTDATE');
		alert(valAlertPost);
	} else if (qty == "" || qty <= 0) {
		var valAlertPosQty = getProperty(L_values, 'ALERT_POS_QTY');
		alert(valAlertPosQty);
	} else if (uom == "") {
		var valAlertUOM = getProperty(L_values, 'ALERT_UOM');
		alert(valAlertUOM);
	} else if (posting_date > current_datenow) {
		alert(getProperty(L_values, 'CustomGR_alert_1'));
	} else {
		sled = sled + "T00:00:00Z";
		if (current_datenow > sled && type == "CON" && NonBatchManagedFlag == "X") {
			var valStockExpiry = getProperty(L_values, 'CustomGI_alert_7');
			var r = confirm(valStockExpiry);
			if (r == true) {
				proceed = 1;
				flag = 1;
			} else {
				proceed = 0;
				flag = 0;
			}
		} else {
			proceed = 1;
			flag = 1;
		}
		if (flag == 1 && ((postMonth < currentMonth1 && postYear == currentYear1) || (postMonth > currentMonth1 && postYear < currentYear1)) && bcpStatus != 1 && type == "CON") {
			var closePeriod = getProperty(L_values, 'CustomGI_alert_14');
			var r = confirm(closePeriod);
			if (r == true)
				proceed = 1;
			else {
				proceed = 0;
				flag = 0;
			}
		}
		if (proceed == 1) {

			data = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetSTyoe_Sbin&Param.1=" + mat + "&Param.2=" + plantFromURL + "&Param.3=" + ord + "&Param.4=" + clientFromURL + "&Param.5=" + vRSPOS + "&cache=" + DateNw + "&Content-Type=text/xml");

			var st_type = $(data).find("STORAGE_TYPE").text();
			var st_bin = $(data).find("STORAGE_BIN").text();
			uom = document.getElementById("uomArea").value;
			var sloc = $(data).find("LGORT").text();
			prodDate = prodDate + "T00:00:00Z";
			if (batch == "null" || batch == "undefined" || batch == "---") {
				batch = "";
			}
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails><txnPath>GoodsMovementApp/GI/BLS/BLS_GoodsIssueConsumptionReversal</txnPath>" +
				"<client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant><nodeID>" + nodeID + "</nodeID><orderNumber>" + ord + "</orderNumber><RSPOS>" + vRSPOS + "</RSPOS><warehouseNumber>" + whNoFromURL + "</warehouseNumber><userId>" + loginID + "</userId>" +
				"<goodsMovementItems><client>" + clientFromURL + "</client><goodsMovementItem><postingDate>" + posting_date + "</postingDate><huNumber>" + ssccFromURL + "</huNumber><materialNumber>" + mat + "</materialNumber>" +
				"<quantityInReportUom>" + qty + "</quantityInReportUom><availableStock>" + quant + "</availableStock><reportUom>" + uom + "</reportUom><flag>OFF</flag><reservationNumber></reservationNumber><recordType/><psaNumber/>" +
				"<reservationItemNumber></reservationItemNumber><batchNumber>" + batch + "</batchNumber><movementType>" + mvt_type + "</movementType><productionDate>" + prodDate + "</productionDate><shelfLifeDate>" + sled + "</shelfLifeDate>" +
				"<storageType>" + st_type + "</storageType><storageBin>" + encodeURIComponent(st_bin) + "</storageBin><documentNumber/><documentYear/><postingID></postingID><proceedWithWarning>false</proceedWithWarning>" +
				"<goodsMovementPostingMessages><client>" + clientFromURL + "</client><goodsMovementPostingMessage><status/><message/></goodsMovementPostingMessage>" +
				"</goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems></IOReportGoodsMovementDetails>";

			//alert(InputXMLInStringFormat);
			gi_response = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_GoodsIssueConsumptionReversal&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&Content-Type=text/xml"));
			console.log(gi_response);

			var if_success = $(gi_response).find("status").text();
			if (if_success == "S") {
				///////////////////////////////////////////Business Metrics/////////////////////////////////////////
				var businessmetrics_gi = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFGI_CountOfTransactions&Content-Type=text/xml"));
				////////////////////////////////////////////////////////////////////////////////////////////////////////											  
																																		 
													 
				if (type == "CON") {
					var valAlertMsg1 = getProperty(L_values, 'CustomGI_alert_3')+ " " + $(gi_response).find("documentNumber").text();
					if (consumeRequestFlag == 1) {
                   
                					   var GIStageInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GIStageInput><Plant>" + plantFromURL + "</Plant><Client>" + clientFromURL + "</Client><materialNumber>" + mat + "</materialNumber><Order>" + orderFromURL + "</Order><SLOC>" + sloc + "</SLOC><Warehouse>" + whNoFromURL + "</Warehouse><Quantity>" + qty + "</Quantity><UOM>" + uom + "</UOM><language>" + language + "</language><SType>" + st_type + "</SType><SBin>" + st_bin + "</SBin></GIStageInput>";
                  					 gi_stageresponse = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_MaterialStagingMapping_GI&Param.1=" + GIStageInputXML + "&Content-Type=text/xml"));
						console.log(gi_stageresponse);

						outputStatus = $(gi_stageresponse).find("StatusMsg").text();
                  						  if (outputStatus == "SUCCESS") {

                    							    valAlertMsg1 = valAlertMsg1 + ".\n " + getProperty(L_values, 'GI_Stage_Success');
                   						 } else {
                        						valAlertMsg1 = valAlertMsg1 + ".\n " + outputStatus;
                 							   }
					consumeRequestFlag =0;
               				 }				
					alert(valAlertMsg1);
				} else {
					var valAlertMsg1 = getProperty(L_values, 'CustomGI_alert_4');
					alert(valAlertMsg1 + " " + $(gi_response).find("documentNumber").text());
				}
				document.getElementById("errorMsg").style.display = "none";
				document.getElementById("sledArea").value = "";
				document.getElementById("quantityArea").value = "";
				document.getElementById("uomArea").value = "";
				document.getElementById("batchArea").value = "";
				window.history.back();
			} else {
				document.getElementById("errorMsg").style.display = "none";
				alert("Error:" + $(gi_response).find("message").text());
				window.location.reload();

			}
		}
	}
	document.getElementById("errorMsg").style.display = "none";
}


function getUom() {

	var AltUom = document.getElementById("uomArea").value;
	if (stockFromURL != "" && uom != "") {
		StockQty = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_QuantityConversion&Param.1=" + clientFromURL + "&Param.2=" + mat + "&Param.3=" + stockFromURL + "&Param.4=" + language + "&Param.5=" + uom + "&Param.6=" + AltUom + "&Content-Type=text/xml");

		var ConvertedQty = $(StockQty).find("O_ConvertedQuantity").text();
		var oErrorMessage = $(StockQty).find("O_ErrorMessage").text();
		var oType = $(StockQty).find("O_Type").text();

		oType = $(StockQty).find("O_Type").text();
		if (oType == "E") {
			alert(oErrorMessage);
			document.getElementById("errorMsg").style.display = "none";
			document.getElementById("quantityArea").value = "";

		} else {

			document.getElementById("quantityArea").value = ConvertedQty;
		}
	}
	var ID = "quantityArea";
	readQuant(ConvertedQty, ID);
}

function doConsumeRequest(){
 consumeRequestFlag = 1;
//document.getElementById("errorMsg").setAttribute("hidden", false);
//document.getElementById("errorMsg").style.display = "inline";
//document.getElementById("errorMsg").visibility = "visible";
doSave();

}

function quantityChange() {
	var quantity = document.getElementById("quantityArea").value;
	var ID = "quantityArea";
	Validate(quantity, ID);
}

function doBack() {
	window.history.back();
}

function changeStyle(elementID) {
	try {
		document.getElementById(elementID).options[0].style.fontSize = "60px";
	} catch (err) {}
}