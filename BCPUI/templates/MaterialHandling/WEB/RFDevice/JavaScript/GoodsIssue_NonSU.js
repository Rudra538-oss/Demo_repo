var loadXMLDoc;
var siteFromURL;
var orderFromURL;
var matFromURL;
var plantFromURL, suFromURL;
var nodeID, ord;
var resource, resourceGR, stockFromURL;
var data;
var order, language, langData;
var material1;
var matTrim, suTrim, whNo, sLoc, client, type;
var des, su;
var desTrim, stock;
var mat, language;
var batchXML, mvt_type, qty, current_date;
var sled, batch_qty, selectObj;
var L_values;
var proceed, clientFromURL;
var flag;
var consumeRequestFlag = 0;
var outputStatus = 0;
var currentMonth1, currentYear1;
var postMonth, postYear;
var vRSPOS, baseUom, BaseUOMForBatch;
var prodDate, NonBatchManagedFlag;
var outputDateFormat;

document.onkeydown = fkey;
//document.onkeypress = fkey;
//document.onkeyup = fkey;

function fkey(e) {
	console.log(e);
	if (e.keyCode == 113) {
		doClear();
		//   alert("f2 pressed");
	}

	if (e.keyCode == 114) {
		doBack();
		// alert("f3 pressed");
	}

	if (e.keyCode == 115 || e.keyCode == 13) {
		doNext();
		// alert("f4 pressed");
	}
/**********************************For Future Consume and Request******************************************
	if (e.keyCode == 116) {
		doConsumeRequest();
		// alert("f5 pressed");
	}
*****************************************************************************************************************/

}

function OnLoading() {
	callTimeOut();
	flag = 0;
	proceed = 0;
	clientFromURL = getURLParameter("client");
	plantFromURL = getURLParameter("plant");
	suFromURL = getURLParameter("su");
	vRSPOS = getURLParameter("vRSPOS");
	wh = getURLParameter("wh");

	language = getLanguage();
	outputDateFormat = dateConvert();

	var DateNw = new Date();

	var details = "RF_BCP_STATUS_ON,BCP_COMMON_MSG_QUANTITY,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,GI_Stage_Success,RF_GI_SCANSC_LBL,ALERT_UOM,ALERT_POS_QTY,ALERT_POSTDATE,ALERT_BATCH,RF_GI_SCANSC_HDR,RF_GI_SACNSC_BTNBK,RF_GI_SCANSC_BTNNXT,RF_GI_SACNSC_RESR,RF_GI_SCANSC_BCP,RF_GI_SCANSC_OR,RF_GI_SCANSC_MAT,RF_GI_SCANSC_DESC,RF_GI_SCANSC_SSCC,RF_GI_SCANSC_BA,RF_GI_SCANSC_SLED,RF_GI_SCANSC_QTY,RF_GI_SCANSC_PDATE,RF_GI_SCANSC_SITE,RF_GI_SCANSC_CONSUME,RF_GI_SCANSC_REV,CustomGI_alert_3,CustomGI_alert_4,CustomGR_alert_1,CustomGI_alert_7,CustomGI_alert_9,CustomGI_alert_14";

	L_values = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + language + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml");
	console.log("hi" + L_values);

	//var valSSScanNo = getProperty(L_values,'RF_SS_SCAN_No');

	var valHome = getProperty(L_values, 'RF_GI_SCANSC_HDR');
	var valNxt = getProperty(L_values, 'RF_GI_SCANSC_BTNNXT');

	var valResr = getProperty(L_values, 'RF_GI_SACNSC_RESR');
	var valStatus = getProperty(L_values, 'RF_GIORDMAT_SELSTAT');
	var valBCP = getProperty(L_values, 'RF_GI_SCANSC_BCP');
	var valOrder = getProperty(L_values, 'RF_GI_SCANSC_OR');
	var valBk = getProperty(L_values, 'RF_GI_SACNSC_BTNBK');
	var valMat = getProperty(L_values, 'RF_GI_SCANSC_MAT');
	var valDesc = getProperty(L_values, 'RF_GI_SCANSC_DESC');
	var valLblSSCC = getProperty(L_values, 'RF_GI_SCANSC_SSCC');
	var valBat = getProperty(L_values, 'RF_GI_SCANSC_BA');
	var valSLED = getProperty(L_values, 'RF_GI_SCANSC_SLED');
	var valQty = getProperty(L_values, 'RF_GI_SCANSC_QTY');
	var valPDate = getProperty(L_values, 'RF_GI_SCANSC_PDATE');
	var valTitle = document.title;
	valTitle = getProperty(L_values, 'RF_GI_SCANSC_LBL');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BkBtn").innerHTML = valBk;
	document.getElementById("btn_next").innerHTML = valNxt;

	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("idDesc").innerHTML = valDesc;
	document.getElementById("idOrder").innerHTML = valOrder;
	document.getElementById("materialL").innerHTML = valMat;

	document.getElementById("batchL").innerHTML = valBat;
	document.getElementById("sledL").innerHTML = valSLED;
	document.getElementById("qtyL").innerHTML = valQty;
	document.getElementById("postL").innerHTML = valPDate;
	document.getElementById("ssccL").innerHTML = valLblSSCC;
	siteFromURL = getURLParameter("site");
	nodeID = getURLParameter("nodeID");
	orderFromURL = getURLParameter("order");
	matFromURL = getURLParameter("material");
	type = getURLParameter("type");
	mvt_type = type == "CON" ? "261" : "262";


	var valScanSCSite = getProperty(L_values, 'RF_GI_SCANSC_SITE');
	document.getElementById("labelHdr").innerText = valScanSCSite + "PLANT-" + plantFromURL;
	order = document.getElementById("orderArea");
	order.value = orderFromURL;
	ord = orderFromURL;
	material1 = document.getElementById("materialArea");
	matTrim = matFromURL.split(" ");
	material1.value = matTrim[0];
	mat = matTrim[0];
	matr = matTrim[0];
	var Length = matr.length;
	var timestamp = new Date();
	/*
			for(var p=0; p<(18-Length); p++){
				matr = "0"+matr;
			}
	*/

	var ordLength = ord.length;
	for (var p = 0; p < (12 - ordLength); p++) {
		ord = "0" + ord;
	}

	des = document.getElementById("descriptionArea");
	desTrim = matFromURL.slice(9);
	des.value = desTrim;

	suTrim = suFromURL.split(" ");
	// material1.value=matTrim[0];
	su = suTrim[0];
	client = suTrim[1];
	whNo = suTrim[2];
	sLoc = suTrim[3];
	if (whNo == "" || whNo == "---") {

		hu_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=GI&d=" + DateNw + "&Content-Type=text/xml");
		whNo = $(hu_resp).find("Value").text();
	}

	var DateNw = new Date();
	langData = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml");
	language = $(langData).find("O_Language").text();

	//////////////////////////////////////////NONBATCH QUERY CALL//////////////////////////////////

	nonBatchManagedModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" + clientFromURL + "&Param.3=" + matr + "&d=" + DateNw + "&Content-Type=text/xml"));
	NonBatchManagedFlag = $(nonBatchManagedModel).find("XCHPF").text();

	//////////////////////////////////////////////////////////////////////////////////////////////////	


	bcpStatus("BCPArea", L_values);
	setInterval(function () {
		bcpStatus("BCPArea", L_values);
	}, 30000);

	if (su == "---" || su == "") {
		$('#ssccL').hide();
		$('#ssccArea').hide();
		$('#batchL').show();
		$('#batchArea').show();
		$('#sledL').show();
		$('#sledArea').show();
		$('#qtyL').show();
		$('#qtyArea').show();
		$('#postL').show();
		$('#postArea').show();
		$('#uomArea').show();

		if (type == "CON") {
			var valConsume = getProperty(L_values, 'RF_GI_SCANSC_CONSUME');
			document.getElementById("btn_next").innerHTML = valConsume;
		} else {

			var valReverse = getProperty(L_values, 'RF_GI_SCANSC_REV');
			//alert(valReverse);
			document.getElementById("btn_next").innerHTML = valReverse;
			document.getElementById("postArea").readOnly = true;
			document.getElementById("postArea").disabled = true;
		}
		var refresh = new Date();

		$("#postArea").datepicker().datepicker("setDate", new Date());
		$( '#postArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		current_date = document.getElementById("postArea").value;

		if (type == "CON") {
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><MaterialDetailsInput><materialNumber>" + matr + "</materialNumber><plant>" + plantFromURL + "</plant><client>" + client + "</client><warehouseNumber>" + wh + "</warehouseNumber><orderNumber>" + ord + "</orderNumber><isReversal/><storageBin/><storageType/><storageLocation>" + sLoc + "</storageLocation><RSPOS>" + vRSPOS + "</RSPOS><productionSupplyArea/></MaterialDetailsInput>"
			console.log(InputXMLInStringFormat);
			batchXML = populateDropdownData("batchArea", "SLEDFormattedDate", "batchNumber", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_ToGetBatchList&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&d=" + refresh + "&Content-Type=text/xml");
			baseUom = $(batchXML).find('BaseUOM').text();


			success = $(batchXML).find("status").text();
			var preDefinedFlg = $(batchXML).find("PreDefinedBatchFalg").text();
			//alert("Pre-defined flag :: " + preDefinedFlg);
			if (success == "E") {
				alert($(batchXML).find("message").text());
			}
			//Check if Pre-defined flag is exists
			if (preDefinedFlg != "" && preDefinedFlg == "PreDefinedBatchExist") {
				document.getElementById("batchArea").value = $(batchXML).find("batchNumber").text();
				document.getElementById("batchArea").disabled = true;
				//set the SLED area value
				var qtyPreDfnd = $(batchXML).find("Quantity:eq(" + 0 + ")").text();
				batch_qty = qtyPreDfnd;
				var sledPreDfnd = $(batchXML).find("shelfLifeDate:eq(" + 0 + ")").text();
				
				document.getElementById("qtyArea").value = qtyPreDfnd;
				sledFormatting(sledPreDfnd);
				
				//document.getElementById("sledArea").value = dateConvert(sledPreDfnd.split("-")[1] + "/" + sledPreDfnd.split("-")[2] + "/" + sledPreDfnd.split("-")[0], "MM/dd/yyyy", "FROM");
				prodDate = $(batchXML).find("ProductionDate").text();


			}
		} else {
			document.getElementById("postArea").setAttribute("disabled", true);
			batchXML = populateDropdownData("batchArea", "SLEDFormattedDate", "BATCH_NO", "/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1=" + client + "&Param.2=" + plantFromURL + "&Param.3=" + nodeID + "&Param.4=" + ord + "&Param.5=" + matr + "&Param.6=&Param.7=" + su + "&Param.8=" + vRSPOS + "&d=" + refresh + "&Content-Type=text/xml");
		}
		populateDropdownData("uomArea", "UOMDESC", "UOM", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUoMGR&Param.1=" + client + "&Param.2=" + matr + "&Param.3=" + language + "&Param.4=GI&Param.5=" + vRSPOS + "&Param.6=" + orderFromURL + "&Content-Type=text/xml");
		var selectObj = document.getElementById("uomArea");
		//AltUom=selectObj;
		//var uom = $(data).find("UOMDESC").text();


		selectObj.remove(0);
		data = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetMaterialDetailsByOrderMat&Param.1=" + ord + "&Param.2=" + matTrim[0] + "&Param.3=" + vRSPOS + "&cache=" + refresh + "&Content-Type=text/xml");
		var selected_uom = $(data).find("MEINS").text();
		//baseUom=selected_uom;
		//alert(selected_uom);
		/*for (var i = 0; i < selectObj.options.length; i++) {
			//alert(selectObj.options[i].value);
		        if (selectObj.options[i].value== selected_uom) {
		            selectObj.options[i].selected = true;
		        }
		    } */

	} else if (su == "X") {
		//alert("else");
		$('#ssccL').show();
		$('#ssccArea').show();
		$('#batchL').hide();
		$('#batchArea').hide();

	}

	if (NonBatchManagedFlag != "X") {
		this.doBatchChange();
	}

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


}

function doBatchChange() {

	var refresh = new Date();
	var batchIndex = document.getElementById("batchArea").selectedIndex - 1;

	var batch = document.getElementById("batchArea").value;

	if (type != "CON") {
		if (batch == "---" || batch == "") {
			batch = "null";
		}

		var qty_consmodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock_NonSU&Param.1=" + ord + "&Param.2=" + matTrim[0] + "&Param.3=261&Param.4=" + batch + "&Param.5=" + nodeID + "&Param.6=" + vRSPOS + "&cache=" + refresh + "&Content-Type=text/xml");
		var qty_consumption = $(qty_consmodel).find("QTY").text();
		var qty_cons = qty_consumption == "NA" ? 0 : qty_consumption;

		var qty_rvrsemodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock_NonSU&Param.1=" + ord + "&Param.2=" + matTrim[0] + "&Param.3=262&Param.4=" + batch + "&Param.5=" + nodeID + "&Param.6=" + vRSPOS + "&cache=" + refresh + "&Content-Type=text/xml");
		var qty_reversed = $(qty_rvrsemodel).find("QTY").text();
		var qty_rev = qty_reversed == "NA" ? 0 : qty_reversed;
		var actQuanity = qty_cons - qty_rev;
		actQuanity = Number(actQuanity).toFixed(3);
		document.getElementById("qtyArea").value = actQuanity;

		var ID = "qtyArea";
		readQuant(actQuanity, ID);
		//document.getElementById("qtyArea").value = qty_cons-qty_rev;

		var qty_consmodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetConsumedQuant&Param.1=" + clientFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + nodeID + "&Param.4=" + ord + "&Param.5=" + matTrim[0] + "&Param.6=" + batch + "&Param.7=&Param.8=" + vRSPOS + "&cache=" + refresh + "&Content-Type=text/xml");
		//sled = $(qty_consmodel).find("SLED").text().split("T")[0];
		sled = $(qty_consmodel).find("SLED").text();

		stockFromURL = $(qty_consmodel).find("QTY_IN_REPORT_UOM").text();
		//alert(stockFromURL);
		stockFromURL = Math.round(stockFromURL * 1000) / 1000;
		//alert(stockFromURL);

		batch_qty = stockFromURL;
		var ID1 = "qtyArea";
		readQuant(stockFromURL, ID1);
		//document.getElementById("qtyArea").value=stockFromURL;
		//var dateformatted1 = sled.split("-")[1] + "/" + sled.split("-")[2] + "/" + sled.split("-")[0];
		//document.getElementById("sledArea").value = dateConvert(dateformatted1, "MM/dd/yyyy", "FROM");
		sledFormatting(sled);
		
		document.getElementById("postArea").setAttribute("readonly", true);
		//alert(sled);
		if (NonBatchManagedFlag == "X") {
			BaseUOMForBatch = $(batchXML).find("UOM:eq(" + batchIndex + ")").text();
		} else {
			BaseUOMForBatch = $(batchXML).find("UOM").text();
			document.getElementById("batchArea").setAttribute("disabled", true);
			document.getElementById("batchArea").setAttribute("readonly", true);
		}

		this.getUom();

	} else {

		if (NonBatchManagedFlag == "X") {
			qty = $(batchXML).find("Quantity:eq(" + batchIndex + ")").text();
			BaseUOMForBatch = $(batchXML).find("BaseUOM:eq(" + batchIndex + ")").text();
		} else {
			qty = $(batchXML).find("Quantity").text();
			BaseUOMForBatch = $(batchXML).find("BaseUOM").text();
			document.getElementById("batchArea").setAttribute("disabled", true);
			document.getElementById("batchArea").setAttribute("readonly", true);
		}

		//alert(BaseUOMForBatch);
		batch_qty = qty;
		stockFromURL = batch_qty;
		this.getUom();
		//var ID="qtyArea";
		//readQuant(qty,ID);


		//alert(sled);
		//document.getElementById("qtyArea").value = qty;
		sled = $(batchXML).find("shelfLifeDate:eq(" + batchIndex + ")").text();
		sledFormatting(sled);
		//document.getElementById("sledArea").value = dateConvert(sled.split("-")[1] + "/" + sled.split("-")[2] + "/" + sled.split("-")[0], "MM/dd/yyyy", "FROM");

	}

}


function doNext() {
	var refresh = new Date();
	var sscc = document.getElementById("ssccArea").value;
	var ssccLen = sscc.length;
	//alert(sscc);
	if (su == "X") {
		if (sscc == "") {
			var valAlertEntSSCC = getProperty(L_values, 'CustomGI_alert_9');
			alert(valAlertEntSSCC);
		} else {
			var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>" + sscc + "</huNumber><orderNumber>" + ord + "</orderNumber><warehouseNumber>" + wh + "</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>" + plantFromURL + "</plant><client>" + clientFromURL + "</client><language>" + language + "</language><RSPOS>" + vRSPOS + "</RSPOS></PackageDetailsInput>"
			// alert(InputXMLInStringFormat);
			matData = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&cache=" + refresh + "&Content-Type=text/xml");
			success = $(matData).find("status").text()
			if (success == "S") {
				window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GoodsIssue.irpt?order=" + orderFromURL + "&material=" + mat + "&resource=" + encodeURIComponent(resourceGR) + "&plant=" + plantFromURL + "&nodeID=" + nodeID + "&site=" + siteFromURL + "&des=" + desTrim + "&sscc=" + sscc + "&whNo=" + wh + "&client=" + client + "&type=" + type + "&vRSPOS=" + vRSPOS), "_self");
			} else {
				alert($(matData).find("message").text());
			}
		}
	} else if (su != "X") {
		var today = new Date();
		var time = new Date();
		var DateNw = new Date();
		currentMonth1 = DateNw.getMonth();
		currentYear1 = DateNw.getFullYear();

		time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
		/*var postDate1 = dateConvert(document.getElementById("postArea").value, "MM/dd/yyyy", "TO");
		var postingYear = parseInt(postDate1.split('/')[2]);
		var postingMonth = parseInt(postDate1.split('/')[0]);
		var postingDate = parseInt(postDate1.split('/')[1]);
		//var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var posting_date = postingYear + "-" + ('0' + postingMonth).slice(-2) + "-" + ('0' + postingDate).slice(-2) + "T" + time + "Z";*/
		// alert(posting_date);
		
		var postDate1 = $('#postArea').datepicker('getDate');
		var posting_date =  dateInGMTFormat(postDate1)+"T"+time+"Z";
		
		/*var currentYear = parseInt(current_date.split('/')[2]);
		var currentMonth = parseInt(current_date.split('/')[0]);
		var currentDate = parseInt(current_date.split('/')[1]);
		var current_datenow = currentYear + "-" + ('0' + currentMonth).slice(-2) + "-" + ('0' + currentDate).slice(-2) + "T" + time + "Z";*/
		
		var currentDate1 = $('#postArea').datepicker('getDate');
		var current_datenow = dateInGMTFormat(currentDate1)+"T"+time+"Z";
		
		postMonth = new Date(postDate1);
		postYear = new Date(postDate1);
		postMonth = postMonth.getMonth();
		postYear = postYear.getFullYear();
		// alert(currentMonth1+" "+currentYear1+" "+postMonth+" "+postYear);
		var batch = document.getElementById("batchArea").value;
		var quant = document.getElementById("qtyArea").value;

		var symbolXML = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
		var symbol = $(symbolXML).find("O_SymbolQuantity").text();

		quant = quant.replace(symbol, ".");
		quant = ("0" + quant);
		var uom = document.getElementById("uomArea").value;
		var loginID = document.getElementById("login").value;
		//alert(uom);
		if ((batch == "" || batch == undefined) && NonBatchManagedFlag == "X") {
			alert(getProperty(L_values, 'ALERT_BATCH'));
		} else if (postDate1 == "") {
			alert(getProperty(L_values, 'ALERT_POSTDATE'));
		} else if (quant <= 0 || quant == "") {
			alert(getProperty(L_values, 'ALERT_POS_QTY'));
		} else if (uom == "") {
			alert(getProperty(L_values, 'ALERT_UOM'));
		} else if (posting_date > current_datenow) {
			alert(getProperty(L_values, 'CustomGR_alert_1'));
		} else {
			var timeadd = "T00:00:00";
			//sled = sled + "T00:00:00Z";
			if(sled.indexOf(timeadd)!=-1){
				sled = sled + "Z";
			}
			else{
				sled = sled + "T00:00:00Z";
			}
			
			//alert(sled);
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
			if (((postMonth < currentMonth1 && postYear == currentYear1) || (postMonth > currentMonth1 && postYear < currentYear1)) && flag == 1 && bcpStatus != 1 && type == "CON") {
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
				prodDate = $(batchXML).find("ProductionDate").text();
				prodDate = prodDate + "T00:00:00Z";

				data = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetSTyoe_Sbin&Param.1=" + matr + "&Param.2=" + plantFromURL + "&Param.3=" + ord + "&Param.4=" + clientFromURL + "&Param.5=" + vRSPOS + "&cache=" + DateNw + "&Content-Type=text/xml");

				var st_type = $(data).find("STORAGE_TYPE").text();
				var st_bin = $(data).find("STORAGE_BIN").text();
				var sloc = $(data).find("LGORT").text();

				var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails><txnPath>GoodsMovementApp/GI/BLS/BLS_GoodsIssueConsumptionReversal</txnPath>" +
					"<client>" + clientFromURL + "</client><plant>" + plantFromURL + "</plant><nodeID>" + nodeID + "</nodeID><orderNumber>" + ord + "</orderNumber><RSPOS>" + vRSPOS + "</RSPOS><warehouseNumber>" + wh + "</warehouseNumber><userId>" + loginID + "</userId>" +
					"<goodsMovementItems><client>" + clientFromURL + "</client><goodsMovementItem><postingDate>" + posting_date + "</postingDate><huNumber></huNumber><materialNumber>" + matr + "</materialNumber>" +
					"<quantityInReportUom>" + quant + "</quantityInReportUom><availableStock>" + batch_qty + "</availableStock><reportUom>" + uom + "</reportUom><flag>OFF</flag><reservationNumber></reservationNumber><recordType/><psaNumber/>" +
					"<reservationItemNumber></reservationItemNumber><batchNumber>" + batch + "</batchNumber><movementType>" + mvt_type + "</movementType><productionDate>" + prodDate + "</productionDate><shelfLifeDate>" + sled + "</shelfLifeDate>" +
					"<storageType>" + st_type + "</storageType><storageBin>" + encodeURIComponent(st_bin) + "</storageBin><documentNumber/><documentYear/><postingID></postingID><proceedWithWarning>false</proceedWithWarning>" +
					"<goodsMovementPostingMessages><client>" + clientFromURL + "</client><goodsMovementPostingMessage><status/><message/></goodsMovementPostingMessage>" +
					"</goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems></IOReportGoodsMovementDetails>";

				//alert(InputXMLInStringFormat);
				gi_response = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_GoodsIssueConsumptionReversal&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&Content-Type=text/xml");
				console.log(gi_response);

				var if_success = $(gi_response).find("status").text();
				if (if_success == "S") {
				///////////////////////////////////////////Business Metrics/////////////////////////////////////////
						var businessmetrics_gi = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFGI_CountOfTransactions&Content-Type=text/xml"));
				////////////////////////////////////////////////////////////////////////////////////////////////////////	
					document.getElementById("errorMsg").style.display = "none";
					document.getElementById("sledArea").value = "";
					document.getElementById("qtyArea").value = "";
					// document.getElementById("uomArea").value="";
					document.getElementById("batchArea").value = "";
					if (type == "CON") {
						var valAlertMsg1 = getProperty(L_values, 'CustomGI_alert_3')+ " " + $(gi_response).find("documentNumber").text();
					if (consumeRequestFlag == 1) {
                   
                					 var GIStageInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GIStageInput><Plant>" + plantFromURL + "</Plant><Client>" + clientFromURL + "</Client><materialNumber>" + matr + "</materialNumber><Order>" + orderFromURL + "</Order><SLOC>" + sloc + "</SLOC><Warehouse>" + wh + "</Warehouse><Quantity>" + quant + "</Quantity><UOM>" + uom + "</UOM><language>" + language + "</language><SType>" + st_type + "</SType><SBin>" + st_bin + "</SBin></GIStageInput>";
                 					  gi_stageresponse = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_MaterialStagingMapping_GI&Param.1=" + GIStageInputXML + "&Content-Type=text/xml"));
			

						outputStatus = $(gi_stageresponse).find("StatusMsg").text();
                   					 if (outputStatus == "SUCCESS") {

                       						 valAlertMsg1 = valAlertMsg1 + ".\n " + getProperty(L_values, 'GI_Stage_Success');
                   				 	} else {
                       						 valAlertMsg1 = valAlertMsg1 + ".\n " + outputStatus;
                  					  }
						consumeRequestFlag =0;
               				 }				
					alert(valAlertMsg1);
						var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><MaterialDetailsInput><materialNumber>" + matr + "</materialNumber><plant>" + plantFromURL + "</plant><client>" + client + "</client><warehouseNumber>" + wh + "</warehouseNumber><orderNumber>" + ord + "</orderNumber><isReversal/><storageBin/><storageType/><storageLocation>" + sLoc + "</storageLocation><RSPOS>" + vRSPOS + "</RSPOS><productionSupplyArea/></MaterialDetailsInput>"
						console.log(InputXMLInStringFormat);
						batchXML = populateDropdownData("batchArea", "SLEDFormattedDate", "batchNumber", "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_ToGetBatchList&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&d=" + refresh + "&Content-Type=text/xml");
						success = $(batchXML).find("status").text();
						if (success == "E") {
							//alert($(batchXML).find("message").text());
							document.getElementById("errorMsg").style.display = "none";
						}
						//Set the droipdown value in case of Pre-defined batch
						var preDefinedFlg = $(batchXML).find("PreDefinedBatchFalg").text();
						//alert("Pre-defined flag :: " + preDefinedFlg);
						//Check if Pre-defined flag is exists
						if (preDefinedFlg != "" && preDefinedFlg == "PreDefinedBatchExist") {
							document.getElementById("batchArea").value = $(batchXML).find("batchNumber").text();
							document.getElementById("batchArea").disabled = true;
							//set the SLED area value
							var qtyPreDfnd = $(batchXML).find("Quantity:eq(" + 0 + ")").text();

							batch_qty = qtyPreDfnd;
							stockFromURL = qtyPreDfnd;
							var sledPreDfnd = $(batchXML).find("shelfLifeDate:eq(" + 0 + ")").text();
							// alert(sled);
							document.getElementById("qtyArea").value = qtyPreDfnd;
							//document.getElementById("sledArea").value = dateConvert(sledPreDfnd.split("-")[1] + "/" + sledPreDfnd.split("-")[2] + "/" + sledPreDfnd.split("-")[0], "MM/dd/yyyy", "FROM");
							sledFormatting(sledPreDfnd);

						}
						//End of Pre-defined batch
					} else {
						var valAlertMsg1 = getProperty(L_values, 'CustomGI_alert_4');
						alert(valAlertMsg1 + " " + $(gi_response).find("documentNumber").text());
					}
				} else {
					alert("Error:" + $(gi_response).find("message").text());
					document.getElementById("errorMsg").style.display = "none";
				}

			}
		}
	}

}

function getUom() {

	var AltUom = document.getElementById("uomArea").value;

	if (stockFromURL != "" && baseUom != "") {

		var StockQty = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_QuantityConversion&Param.1=" + clientFromURL + "&Param.2=" + matr + "&Param.3=" + stockFromURL + "&Param.4=" + language + "&Param.5=" + BaseUOMForBatch + "&Param.6=" + AltUom + "&Content-Type=text/xml");

		var ConvertedQty = $(StockQty).find("O_ConvertedQuantity").text();
		var oErrorMessage = $(StockQty).find("O_ErrorMessage").text();
		var oType = $(StockQty).find("O_Type").text();


		if (oType == "E") {
			alert(oErrorMessage);
			document.getElementById("errorMsg").style.display = "none";
			document.getElementById("qtyArea").value = "";

		} else {

			document.getElementById("qtyArea").value = ConvertedQty;

		}
	}
	var ID = "qtyArea";
	readQuant(ConvertedQty, ID);
}

function quantityChange() {
	var quantity = document.getElementById("qtyArea").value;
	var ID = "qtyArea";
	Validate(quantity, ID);
}

function doBack() {
	window.history.back();
}

function doConsumeRequest(){
 consumeRequestFlag = 1;
doNext();
}

function sledFormatting(sledDateInput){
			var sled_format = new Date(sledDateInput);
			$( "#sledArea" ).datepicker( "setDate", sled_format );
			$( '#sledArea' ).datepicker( "option", "dateFormat", outputDateFormat);
}

function changeStyle(elementID) {
	try {
		document.getElementById(elementID).options[0].style.fontSize = "60px";
	} catch (err) {}
}