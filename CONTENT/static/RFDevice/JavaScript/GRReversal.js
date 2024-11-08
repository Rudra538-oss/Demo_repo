var siteFromURL, orderFromURL, ssccFromURL, desFromURL, sLoc_whNo_source,ord, storageLoc;
var plantFromURL, materialFromURL, batchFromURL;
var nodeID, batch, sscc, flagFromURL;
var resource, resourceGR, order, material;
var data, revData, batchSCCC, expiryDate, batch;
var postingDate, prodDate, quant, uom, productDate, sledDate, postDate;
var quantity, baseUom, des;
var sloc, mvtType, client, pDate;
var wh, doc_no, product_type;
var L_values;
var language;
var wh_resp;
var getUOM;
var IntUOM;
var outputDateFormat;
var storageType="";
var storageBin="";
var dateNum,monthNum,fullYear;
document.onkeydown = fkey;

function fkey(e) {
    console.log(e);
    if (e.keyCode == 112 || e.keyCode == 13) {
        doSave();
    }

    if (e.keyCode == 114) {
        doBack();
    }

}

function onLoading() {

	callTimeOut();
    product_type = getURLParameter("product");
    mvtType = product_type == "BYPRODUCT" ? "532" : "102";
    client = getURLParameter("client");
    plantFromURL = getURLParameter("plant");
    nodeID = getURLParameter("nodeID");
    orderFromURL = getURLParameter("order");
    materialFromURL = getURLParameter("material");
    flagFromURL = getURLParameter("flag");
    desFromURL = getURLParameter("description");

     language = getLanguage();
	 outputDateFormat = dateConvert();

    var DateNw = new Date();
    var details = "RF_BCP_STATUS_ON,BCP_COMMON_MSG_QUANTITY,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_GR_LBL,RF_GR_HDR,RF_GR_BTNREV,RF_GR_BTNBK,RF_GR_Wait,RF_GR_RESR,RF_GR_BCP,RF_GR_OR,RF_GR_MAT,RF_GR_PDATE,RF_GR_POSTDT,RF_GR_BA,RF_GR_SLED,RF_GR_QTY,RF_GR_SSCC,RF_GR_SITE,CustomGR_alert_21,CustomGI_alert_1,CustomGR_alert_4,CustomGR_alert_10,CustomGR_alert_8,NPDashboard_Error";

    L_values = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + language + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml");
    console.log("hi" + L_values);

    var valWait = getProperty(L_values, 'RF_GR_Wait');

    var valHome = getProperty(L_values, 'RF_GR_HDR');
    var valBtnRev = getProperty(L_values, 'RF_GR_BTNREV');

    var valResr = getProperty(L_values, 'RF_GR_RESR');
    var valBCP = getProperty(L_values, 'RF_GR_BCP');
    var valMat = getProperty(L_values, 'RF_GR_MAT');
    var valOrder = getProperty(L_values, 'RF_GR_OR');
    var valBk = getProperty(L_values, 'RF_GR_BTNBK');


    var valLblSSCC = getProperty(L_values, 'RF_GR_SSCC');
    var valBat = getProperty(L_values, 'RF_GR_BA');
    var valSLED = getProperty(L_values, 'RF_GR_SLED');

    var valPDate = getProperty(L_values, 'RF_GR_PDATE');
    var valPostDate = getProperty(L_values, 'RF_GR_POSTDT');
    var valQty = getProperty(L_values, 'RF_GR_QTY');
    var valSite = getProperty(L_values, 'RF_GR_SITE');
    var valTitle = document.title;
    valTitle = getProperty(L_values, 'RF_GR_LBL');
    //alert(valTitle+ ":"+valHome);
    document.getElementById("title").innerHTML = valTitle;
    document.getElementById("labelHdr").innerHTML = valHome;
    document.getElementById("BtnBk").innerHTML = valBk;
    document.getElementById("saveId").innerHTML = valBtnRev;
    document.getElementById("errorMsg").innerHTML = valWait;
    document.getElementById("idBCP").innerHTML = valBCP;
    //document.getElementById("idStatus").innerHTML = valStatus;
    document.getElementById("idOrder").innerHTML = valOrder;
    document.getElementById("materialL").innerHTML = valMat;
    document.getElementById("ssccL").innerHTML = valLblSSCC;

    document.getElementById("prodL").innerHTML = valPDate;
    document.getElementById("postL").innerHTML = valPostDate;
    document.getElementById("qty").innerHTML = valQty;
    //document.getElementById("ssccL").innerHTML = valLblSSCC;
    var valSite = getProperty(L_values, 'RF_GR_SITE');
    document.getElementById("labelHdr").innerText = valSite + "PLANT-"+plantFromURL;

    batch = document.getElementById("batchArea");
    order = document.getElementById("orderArea");
    order.value = orderFromURL;
    material = document.getElementById("materialArea");
    material.value = materialFromURL;
    des = document.getElementById("descriptionArea");
    des.value = desFromURL;

bcpStatus("BCPArea",L_values);
setInterval(function(){ bcpStatus("BCPArea",L_values); }, 30000);

	 wh_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + materialFromURL + "&Param.2=" + plantFromURL + "&Param.3="+client+"&Param.4=" + orderFromURL + "&d=" + DateNw + "&Content-Type=text/xml");
    wh=$(wh_resp).find("WHNumber").text();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var ordLength = orderFromURL.length;
	ord= orderFromURL;
	for (var p = 0; p < (12 - ordLength); p++) {
		ord = "0" + ord;
	}
///////////////////////////////////////////////////////////////////////////////Storage Type and Storage Bin/////////////////////////////////////////////////////////////////

         var ogetSlocAndWh= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+ord+"&Param.2=" +client+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml");   
         storageLoc = $(ogetSlocAndWh).find("LGORT").text();

////////////////////////////////////////////////EWMorECC//////////////////////////////////////////////////////////////
         var ogetSource= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&d=" + DateNw + "&Content-Type=text/xml");
         sLoc_whNo_source = $(ogetSource).find("source").text();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (flagFromURL == "NONSU") {
        $('#ssccL').hide();
        $('#ssccArea').hide();
        batchFromURL = getURLParameter("batch");
        batchDetails = getURLParameter("batch_details");
        batch.value = batchFromURL;
        //alert(batchDetails);
        sledDate = document.getElementById("sledArea");
       var dateFormattedSLED= batchDetails.split("---")[2];
        var a = batchDetails.split("---")[2];
       
		var sled_format = new Date(dateFormattedSLED);
		$( "#sledArea" ).datepicker( "setDate", sled_format );
		$( '#sledArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		
        quantity = document.getElementById("quantityArea");

        quantity.value = batchDetails.split("---")[0];
        quant= batchDetails.split("---")[0];


        var quantityVal=quantity.value;
	quantityVal=Math.round(quantityVal*1000)/1000;
	//alert(quantityVal);
	var quantityVal=Number(quantityVal).toFixed(3);
	//alert(quantityVal);

	var ID="quantityArea";
            readQuant(quantityVal,ID); 
        baseUom = document.getElementById("unitArea");
        baseUom.value = batchDetails.split("---")[5];
	IntUOM = batchDetails.split("---")[1];
        doc_no = batchDetails.split("---")[3];
        pDate = batchDetails.split("---")[4];
       
		var dateformatted1 = new Date(pDate);
		$( "#prodDateArea" ).datepicker( "setDate", dateformatted1 );
		$( '#prodDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		
        baseUom.readOnly = true;
        $("#postDateArea").datepicker().datepicker("setDate", new Date());
		$( '#postDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		}

    if (flagFromURL == "SU") {
document.getElementById("quantityArea").disabled=true;
        ssccFromURL = getURLParameter("sscc");
        sscc = document.getElementById("ssccArea");
        sscc.value = ssccFromURL;
      //revData = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetDetailsBasedOnSSCC&Param.1=" + orderFromURL + "&Param.2=" + materialFromURL + "&Param.3=" + ssccFromURL + "&Content-Type=text/xml");
        getUOM =  loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetUOMBasedOnMDO&Param.1=" + orderFromURL + "&Param.2=" + materialFromURL + "&Param.3=" + ssccFromURL +" &Param.4=" + language + "&Param.5=" + client + "&d="+DateNw+ "&Content-Type=text/xml");
	
        batchSCCC = $(getUOM).find("BatchSCCC").text();
        expiryDate = $(getUOM).find("ExpiryDate").text();
        postingDate = $(getUOM).find("PostingDate").text();
        prodDate = $(getUOM).find("ProductionDate").text();
        quant = $(getUOM).find("Quantity").text();
        quant=Number(quant).toFixed(3);
        uom = $(getUOM).find("UOM").text();
        doc_no = $(getUOM).find("Doc_No").text();
	IntUOM = $(getUOM).find("InternalUOM").text();
	//alert(IntUOM);
        batch.value = batchSCCC;
        productDate = document.getElementById("prodDateArea");
        //productDate.value = dateConvert(prodDate.split("T")[0].split("-")[1] + "/" + prodDate.split("T")[0].split("-")[2] + "/" + prodDate.split("T")[0].split("-")[0],"MM/dd/yyyy","FROM");
		var dateformatted1 = new Date(prodDate);
		$( "#prodDateArea" ).datepicker( "setDate", dateformatted1 );
		$( '#prodDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
			
        productDate.readOnly = true;
        sledDate = document.getElementById("sledArea");
        //sledDate.value = dateConvert(expiryDate.split("T")[0].split("-")[1] + "/" + expiryDate.split("T")[0].split("-")[2] + "/" + expiryDate.split("T")[0].split("-")[0],"MM/dd/yyyy","FROM");
		var sled_format = new Date(expiryDate);
		$( "#sledArea" ).datepicker( "setDate", sled_format );
		$( '#sledArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		
        $("#postDateArea").datepicker().datepicker("setDate", new Date());
		$( '#postDateArea' ).datepicker( "option", "dateFormat", outputDateFormat);
		//document.getElementById("postDateArea").value = dateConvert(document.getElementById("postDateArea").value,"MM/dd/yyyy","FROM");
        quantity = document.getElementById("quantityArea");
        quantity.value = quant;
        quantity.readOnly = true;
        baseUom = document.getElementById("unitArea");
        baseUom.value = uom;
        baseUom.readOnly = true;
    }
}

function doSave() {

    var today = new Date();
     var time = new Date();
  time=time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    var uom = document.getElementById("unitArea").value;
    var matnr = document.getElementById("materialArea").value;
    var qty = document.getElementById("quantityArea").value;
    var symbolXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
     var symbol=$(symbolXML).find("O_SymbolQuantity").text();
     qty = qty.replace(symbol,".");
    // qty=("0"+qty);

    var batch = document.getElementById("batchArea").value;
    var hu_no = document.getElementById("ssccArea").value;
	
	var postDate1 = $('#postDateArea').datepicker('getDate');
	var posting_date = dateInGMTFormat(postDate1)+ "T" + time + "Z";
	
	var prdDate1 = $('#prodDateArea').datepicker('getDate');
	var production_date = dateInGMTFormat(prdDate1)+ "T00:00:00Z";
	
	var shlfDate1 = $('#sledArea').datepicker('getDate');
	var shelflife_date = dateInGMTFormat(shlfDate1)+ "T00:00:00Z";
	

    var loginID = document.getElementById("login").value;
	qty=parseInt (qty);

    if (postDate1 == "") {
      var valEntPostDt = getProperty(L_values,'CustomGR_alert_21');
        alert(valEntPostDt);
    } else if (batch == "") {
	var valSelectBatchAlert = getProperty(L_values,'CustomGI_alert_1');
        alert(valSelectBatchAlert);
    } else if (qty <= 0 || qty == "") {
  var valEntPositiveNumber = getProperty(L_values,'CustomGR_alert_4');
        alert(valEntPositiveNumber);
    } else if (qty > quant) { 
	var valRevQtyMore = getProperty(L_values,'CustomGR_alert_10');
        alert(valRevQtyMore);
    } else{
  if(batch=="---" || batch=="null")	
		{
		batch="";
		}	

var shelflife_date1=document.getElementById("sledArea").value;
if(shelflife_date1=="TimeUnavailable" || shelflife_date1=="")
		{
		shelflife_date="0000-00-00T00:00:00Z";
		}
		

        var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails>" +
            "<txnPath>MaterialHandling/GR/BLS/BLS_GoodsRecieptDeclarationReversal</txnPath><client>" + client + "</client><plant>" + plantFromURL + "</plant>" +
            "<nodeID>" + nodeID + "</nodeID><orderNumber>" + orderFromURL + "</orderNumber><warehouseNumber>" + wh + "</warehouseNumber>" +
            "<userId>" + loginID + "</userId> <goodsMovementItems><client>" + client + "</client><goodsMovementItem><postingDate>" + posting_date + "</postingDate>" +
            "<productionDate>" + production_date + "</productionDate><huNumber>" + hu_no + "</huNumber><materialNumber>" + matnr + "</materialNumber> " +
            "<quantityInReportUom>" + qty + "</quantityInReportUom> <reportUom>" + IntUOM + "</reportUom><type>" + product_type + "</type><storagetype>"+storageType+"</storagetype><storagebin>"+storageBin+"</storagebin><batchNumber>" + batch + "</batchNumber>" +
            "<movementType>" + mvtType + "</movementType><shelfLifeDate>" + shelflife_date + "</shelfLifeDate><documentNumber>" + doc_no + "</documentNumber><documentYear/> <postingID/>" +
            "<proceedWithWarning>false</proceedWithWarning><goodsMovementPostingMessages><I_MIIEWMFlag>" + sLoc_whNo_source + "</I_MIIEWMFlag><client>" + client + "</client><goodsMovementPostingMessage>" +
            "<status/><message/></goodsMovementPostingMessage></goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems>" +
            "</IOReportGoodsMovementDetails>";

        
	

        gr_response = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_GoodsReceiptDeclarationReversal&Param.1=" + InputXMLInStringFormat + "&Param.2=" + language + "&Content-Type=text/xml");
        console.log(gr_response);

        var if_success = $(gr_response).find("status").text();
        if (if_success == "S") {
///////////////////////////////////////////Business Metrics/////////////////////////////////////////
var businessmetrics_gr = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFGR_CountOfTransactions&Content-Type=text/xml"));
////////////////////////////////////////////////////////////////////////////////////////////////////////	
	var valAlertSuccess = getProperty(L_values,'CustomGR_alert_8');
            alert(valAlertSuccess +" "+ $(gr_response).find("documentNumber").text());
            errorMsg.style.display = "none";
            window.history.back();
            document.getElementById("sledArea").value = "";
            document.getElementById("quantityArea").value = "";
            document.getElementById("unitArea").value = "";
            document.getElementById("batchArea").value = "";
            document.getElementById("ssccArea").value = "";
        } else {
	var valAlertError = getProperty(L_values,'NPDashboard_Error');
            alert(valAlertError + $(gr_response).find("message").text());
            errorMsg.style.display = "none";
        }

    }
}
/*function quantityChange(){
var quantity =document.getElementById("quantityArea").value;
var valSelectBatchAlert = getProperty(L_values,'CustomGI_alert_1');
Validate(quantity,valSelectBatchAlert);

} */
function doBack() {
    window.history.back();
}
function quantityChange(){
var quantity =document.getElementById("quantityArea").value;
var ID="quantityArea";
Validate(quantity,ID);


}

function changeStyle(elementID){

	try{
	document.getElementById(elementID).options[0].style.fontSize = "60px";
	}catch(err){}
}