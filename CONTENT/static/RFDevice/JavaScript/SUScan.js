var xmldoc;
var resource;
var plantSite;
var siteFromURL;
var plantFromURL;
var ssccNo;
var countSU = 0;
var allSSCC = [];
var prevSSCC = 0;
var prevSType;
var prevSBin;
var tOMoveFailedCount = 0;
var tOMoveSuccessCount = 0;
var buttonBackIdentifier = 0;
var sloc;
var wh;
var dropdownFlag;
var storageType ;
var cl;
var L_values;
var res = false;
var language, valRFVerifyCheck, verifIDmodel;
var verifID, verifID1;
var VerifFlag = false;
var InputStype, InputSbin, InputSbin1;
var headerFromURL;
document.onkeydown = fkey;
//document.onkeypress = fkey
//document.onkeyup = fkey;
var ssccIndex ;
var currentFocus;
var dropdownSelectFlag=0;

function fkey(e) {
    //console.log(e);
    if (e.keyCode == 115 || e.keyCode == 13) {

        if ($('#nxtBtton').is(":visible") == true) {
            next();
        } else if ($('#moveSUBtton').is(":visible") == true) {
            moveSU();
        } else {}
        //alert("f4 pressed");
    }
    if (e.keyCode == 113) {
        Clear();
        // alert("f2 pressed");
    }
    if (e.keyCode == 114) {
        goBack();
        //  alert("f3 pressed");
    }
////////////////////////////Delete SSCC from dropdown///////////////////////////
  if (e.keyCode == 112) {
        deleteValues();
        //  alert("f1 pressed");
    } 
///////////////////////////////////End/////////////////////////////////////////////  

    /*	if ($('#moveSUBtton').is(":visible") == true){
    	console.log("next");
    	checkVerifID();
                
            } */

}

function onLoading() {

    callTimeOut();
    buttonBackIdentifier = 1;
    plantFromURL = getURLParameter("plant");
    siteFromURL = getURLParameter("site");
    sloc = getURLParameter("sloc");
    wh = getURLParameter("wh");
    cl = getURLParameter("client");
    headerFromURL = decodeURIComponent(getURLParameter("headertype"));
    //alert(headerFromURL);
    var labelHDR = document.getElementById("labelHdr");
    document.getElementById("labelHdr").innerText = "Site: " + "PLANT-" + plantFromURL;


    language = getLanguage();

    var DateNw = new Date();
    var details = "RF_NO_DELETE,RF_UI_DLTMSG,RF_UI_SSCCDLT,RF_ERR_MSG,RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_MSG_BCP_OFF_ER,RF_STORAGEUNITMOVE,RF_UI_SU_LBLHDR ,RF_S,TO_MSG4,RF_UI_LABEL_ERR,RF_UI_LABEL_CLR,RF_PR_BCP,RF_UI_LABEL_NXTBTN,RF_UI_SUSCAN_NXT,RF_UI_SUSCAN_BK,RF_UI_LABEL_BCP,RF_UI_LABEL_SCAN,RF_UI_LABEL_SSCC,RF_UI_SSCC,RF_UI_STORAGE,RF_UI_STORAGE_BIN,RF_UI_OR,RF_UI_VERIFICATION_FIELD,RF_UI_ERR_MSG,RF_UI_LBL_SU,RF_MSG_LBL_NL,RF_MSG_LBL_NW,RF_MSG_LBL_NA,RF_UI_SCANNED,RF_ST_UNIT,RF_UI_LBLTXT,RF_UI_ER_MSG,RF_UI_ER_D_MSG,RF_UI_TO,RF_UI_TO_SUCCESS,RF_UI_TO_F,RF_UI_Part_1,RF_UI_Part_2,RF_MSG_ERR,TransferDisplay_alert17,RF_STORAGE_SCAN,RF_NON_STORAGE,RF_NON_EXIST,RF_NO_SSCC,RF_UI_TO_SUCCESS_1,RF_UI_TO_SUCCESS_2";

    L_values = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + language + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml");

    var valHome = getProperty(L_values, 'RF_STORAGEUNITMOVE');
    var valNxt = getProperty(L_values, 'RF_UI_LABEL_NXTBTN');
    var valF4Nxt = getProperty(L_values, 'RF_UI_SUSCAN_NXT');
    var valClr = getProperty(L_values, 'RF_UI_LABEL_CLR');
    var valSite = getProperty(L_values, 'RF_S');
    var valBCP = getProperty(L_values, 'RF_PR_BCP');
    var valLblScan = getProperty(L_values, 'RF_UI_LABEL_SCAN');
    var valBk = getProperty(L_values, 'RF_UI_SUSCAN_BK');
    var valLblSSCC = getProperty(L_values, 'RF_UI_SCANNED');

    var valSSCC = getProperty(L_values, 'RF_ST_UNIT');
    var valStTyp = getProperty(L_values, 'RF_UI_STORAGE');
    var valStBin = getProperty(L_values, 'RF_UI_STORAGE_BIN');
    var valOr = getProperty(L_values, 'RF_UI_OR');

    var valRFVerify = getProperty(L_values, 'RF_UI_VERIFICATION_FIELD');
    var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
    ///////var valSite = getProperty(L_values,'RF_UI_LBL_SU');
    var valtxt = getProperty(L_values, 'RF_UI_LBLTXT');


    var valUIErMsg = getProperty(L_values, 'RF_UI_ER_MSG');
    var valErDMsg = getProperty(L_values, 'RF_UI_ER_D_MSG');
    var valTO = getProperty(L_values, 'RF_UI_TO');
    var valSuccess = getProperty(L_values, 'RF_UI_TO_SUCCESS');

    var valFail = getProperty(L_values, 'RF_UI_TO_F');
    var valErMsg1 = getProperty(L_values, 'RF_UI_Part_1');
    var valErMsg2 = getProperty(L_values, 'RF_UI_Part_2');
    var valMsgEr = getProperty(L_values, 'RF_MSG_ERR');

    var valStScan = getProperty(L_values, 'RF_STORAGE_SCAN');
    var valNonSt = getProperty(L_values, 'RF_NON_STORAGE');
    var valNonE = getProperty(L_values, 'RF_NON_EXIST');
    var valSSCCNo = getProperty(L_values, 'RF_NO_SSCC');
     var valSSCCDlt = getProperty(L_values, 'RF_NO_DELETE');
 
    var valTitle = document.title;
    valTitle = getProperty(L_values, 'RF_UI_SU_LBLHDR');
    //alert(valErMsg);
    document.getElementById("title").innerHTML = valHome;
    //document.getElementById("labelHdr").innerHTML = valHome;
    document.getElementById("BtnBk").innerHTML = valBk;
    document.getElementById("errorMsg").innerHTML = valErMsg;
    //document.getElementById("labelHdr").innerHTML = valSite;
    document.getElementById("idBCP").innerHTML = valBCP;
    document.getElementById("clr").innerHTML = valClr;
    document.getElementById("nxtBtton").innerHTML = valNxt;
    document.getElementById("moveSUBtton").innerHTML = valF4Nxt;
    document.getElementById("suScanLbl").innerHTML = valLblScan;

    //document.getElementById("check").style.display="none";
    document.getElementById("ssccCountLbl").innerHTML = valLblSSCC;
    document.getElementById("ssccLbl").innerHTML = valSSCC;
    document.getElementById("sTypeId").innerHTML = valStTyp;
    document.getElementById("sBinId").innerHTML = valStBin;
    document.getElementById("or").innerHTML = valOr;
    document.getElementById("verifyId").innerHTML = valRFVerify;

    document.getElementById("BtnDlt").innerHTML = valSSCCDlt;
    //  document.getElementById("check").innerHTML = valRFVerifyCheck;
    bcpStatus("bcp", L_values);
    setInterval(function() {
        bcpStatus("bcp", L_values);
    }, 30000);


	
	
			
}

function next() {

    dropdownSelectFlag=1;
 
    document.getElementById("ssccList").style.display = "none";
    var flag = getBCPStatus();


            buttonBackIdentifier = 2;
            var msgLabel = document.getElementById("errorMsg");
           //  ssccNo = document.getElementById("ssuIn").value;
	ssccNo=allSSCC[0];
	if(ssccNo==undefined){
	ssccNo="";
	}
	

	ssccNo = scanssccno(ssccNo);

        
        if (ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo == "undefined") {
	
            msgLabel.style.color = "red";
            msgLabel.style.fontweight = "bold";
            msgLabel.style.display = "block";
            var valtxt = getProperty(L_values, 'RF_UI_LBLTXT');
            msgLabel.innerText = valtxt;
            document.getElementById("ssuIn").focus();
        } else if (allSSCC.length <= 0) {

            msgLabel.style.color = "red";
            msgLabel.style.fontweight = "bold";
            msgLabel.style.display = "block";
            var valtxt = getProperty(L_values, 'RF_ERR_MSG');
            msgLabel.innerText = valtxt;
            document.getElementById("ssuIn").focus();
        } else {

        var formattedSSCC = ssccNo;
 	//var formattedSSCC = allSSCC[0]

            var refresh = new Date();
            var stockXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1=" + formattedSSCC + "&Param.7=" + language + "&cache=" + refresh + "&Content-Type=text/xml"));
            var errMsg = $(stockXML).find("ErrorMessage").text();
            var suSloc = $(stockXML).find("STGE_LOC:first").text();
            var suWh = $(stockXML).find("WHSENUMBER:first").text();

            if (errMsg != "") {

                var errorMsg = document.getElementById("errorMsg");
                var valMsgErr = getProperty(L_values, 'RF_ERR_MSG');
                errorMsg.style.color = "red";
                errorMsg.style.fontweight = "bold";
                errorMsg.style.display = "block";
                errorMsg.innerText = valMsgErr;
                document.getElementById("ssuIn").focus();
            } else {

                msgLabel.style.display = "none";
                var msg = document.getElementById("message");
                msg.style.display = "none";
                document.getElementById("errorMsg").style.color = "black";
                var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
                document.getElementById("errorMsg").innerText = valErMsg;
                document.getElementById("suScanLbl").style.display = "none";
                document.getElementById("ssuIn").style.display = "none";
                document.getElementById("clr").style.display = "none";
                var countIn = document.getElementById("countIn");
                countIn.style.display = "none";
                var ssccCountLbl = document.getElementById("ssccCountLbl");
                ssccCountLbl.style.display = "none";
                document.getElementById("nxtBtton").style.display = "none";
                document.getElementById("moveSUBtton").style.display = "inline-block";
	 document.getElementById("ssccLbl").style.display = "block";
	document.getElementById("BtnDlt").style.display = 'none';
	
////////////////////////////////////////////////////////////SSCC dropdown ////////////////////////////////////////////////	

	   if(countSU<=1){

               
                var ssccIn = document.getElementById("sSCCIn");
                ssccIn.style.display = "block";
                ssccIn.readOnly = true;
                ssccIn.value = ssccNo;
	    document.getElementById("ssccList").style.display = "none";     
	   }
	  else{
	  
	   document.getElementById("ssccList").style.display ="block";
	 
	}

//////////////////////////////////////////////////////END////////////////////////////////////////////////////////////////////////////
               
                document.getElementById("sTypeId").style.display = "block";
                document.getElementById("sTypeIn").style.display = "block";
                document.getElementById("sBinId").style.display = "block";
                document.getElementById("sBinIn").style.display = "block";
                //document.getElementById("or").style.display= "block";
                document.getElementById("verifyId").style.display = "block";
                document.getElementById("verifyIn").style.display = "block";
	     document.getElementById("verifyIn").focus();

	   document.getElementById("STypedrop").style.display = "none";
	   document.getElementById("SBindrop").style.display = "none";
             }

          }
      

}



function moveSU() {

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    verifID = document.getElementById("verifyIn").value;
    verifID1 = verifID.toUpperCase();
////////////////////////////////////////////////////////////////Dropdown To Populate Multiple Storage type and Storage Bin//////////////////////////////////////////////////////////
     if(dropdownFlag==1){

     InputStype=  $("#STypedrop option:selected").text() ;
     InputSbin =     $("#SBindrop option:selected").text() ;

     }
    else{
    InputStype = document.getElementById("sTypeIn").value;
    InputSbin = document.getElementById("sBinIn").value;

    }
////////////////////////////////////////////////////////////////////////End//////////////////////////////////////////////////////



        InputSbin1 = InputSbin.toUpperCase();
        if (verifID1 != "") {
	
        var refresh = new Date();
        verifIDmodel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GET_StypeAndSBin_BasedOnVerifID&Param.1=" + cl + "&Param.2=" + wh + "&Param.3=" + encodeURIComponent(verifID1) + "&Param.5=" + InputStype + "&Param.4=" + encodeURIComponent(InputSbin1) + "&Param.6=" + language + "&Param.7=1" + "&Param.8=" + ssccNo + "&cache=" + refresh + "&Content-Type=text/xml"), "", true);
        var oErrorMsg = $(verifIDmodel).find("ErrorMessage").text();
        var oType = $(verifIDmodel).find("ErrorType").text();

        if (oType == "E") {
           
            document.getElementById("errorMsg").style.display = "none"
            document.getElementById("moveSUBtton").style.display = "inline-block";
            document.getElementById("verifyIn").value = "";

              if(dropdownFlag==1){



           document.getElementById("sTypeIn").style.display = "block";
           document.getElementById("STypedrop").style.display = "none";
           document.getElementById("sBinIn").style.display = "block";
           document.getElementById("SBindrop").style.display = "none";
         
	}
	else{

	  document.getElementById("sTypeIn").value = "";
           document.getElementById("sBinIn").value = "";
	document.getElementById("sTypeIn").disabled = false;
   	 document.getElementById("sBinIn").disabled = false;

	}
        } else {
            this.moveSUtype();
        }

    } else {
        this.moveSUtype();
    }

}

//////////////////////////////////////////////////////////////////////////////////

function moveSUtype() {






    var flag = getBCPStatus();


        buttonBackIdentifier = 3;
        var j = 0;
        var flag = true;
        var ssccCnt = 0;
        var destSTpe;
        var destSBin;
        var verifyIn = document.getElementById("verifyIn");
        document.getElementById("verifyId").style.display = "block";
        //document.getElementById("verifyIn").style.display= "block";
        var sBinIn = document.getElementById("sBinIn");
        var sTypeIn = document.getElementById("sTypeIn");
        var errorMsg = document.getElementById("errorMsg");
        var msgLabel = document.getElementById("message");





        msgLabel.style.display = "none";
        errorMsg.style.display = "none";
        document.getElementById("errorMsg").style.color = "black";
        var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
        document.getElementById("errorMsg").innerText = valErMsg;
        //document.getElementById("errorMsg").innerText = "Please wait...";
        var proceed = false;

        if ((InputStype == "" || InputStype == " " || InputStype == null || InputStype == "undefined") ||
            (InputSbin == "" || InputSbin == " " || InputSbin == null || InputSbin == "undefined")) {

            if (verifyIn.value == "" || verifyIn.value == " " || verifyIn.value == null || verifyIn.value == "undefined") {

            } else {

                destSTpe = verifyIn.value.split("-")[0].trim();
                destSBin = verifyIn.value.split("-")[1].trim();
                destSBin = destSBin.toUpperCase();
            }

        } else {
     if(dropdownFlag==1){

    destSTpe=  $("#STypedrop option:selected").text() ;
    destSBin =     $("#SBindrop option:selected").text() ;

     }
    else{
    destSTpe = document.getElementById("sTypeIn").value.trim();
    destSBin = document.getElementById("sBinIn").value.trim();

  }
          //  destSTpe = sTypeIn.value.trim();
         //   destSBin = sBinIn.value.trim();
            destSBin = destSBin.toUpperCase();
        }

        if (ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo == "undefined" ||
            destSTpe == "" || destSTpe == " " || destSTpe == null || destSTpe == "undefined" ||
            destSBin == "" || destSBin == " " || destSBin == null || destSBin == "undefined") {

            errorMsg.style.color = "red";
            errorMsg.style.fontweight = "bold";
            errorMsg.style.display = "block";
            var moveSUbttn = document.getElementById("moveSUBtton");

            if (ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo == "undefined") {
                var valtxt = getProperty(L_values, 'RF_UI_LBLTXT');
                errorMsg.innerText = valtxt;
                moveSUbttn.style.display = "inline-block";
            }
            /* else if(oType!=""){
            
            document.getElementById("errorMsg").style.display="none"

	document.getElementById("moveSUBtton").style.display ="inline-block";

  } */
            else if (destSTpe == "" || destSTpe == " " || destSTpe == null || destSTpe == "undefined" || destSBin == "" || destSBin == " " || destSBin == null || destSBin == "undefined") {

                var valUIErMsg = getProperty(L_values, 'RF_UI_ER_MSG');
                errorMsg.innerText = valUIErMsg;
                moveSUbttn.style.display = "inline-block";
            }


        } else {
            var refresh = new Date();
            var storage = destSTpe + "-" + destSBin;

            var storageXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1=" + encodeURIComponent(storage) + "&cache=" + refresh + "&Content-Type=text/xml"));
            var suFlag = $(storageXML).find("Flag:first").text();

            var oXMLModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetStockSBinSType&Param.1=" + plantFromURL + "&Param.2=" + encodeURIComponent(destSBin) + "&Param.3=" + destSTpe + "&cache=" + refresh + "&Content-Type=text/xml"));
            var rowCount = $(oXMLModel).find("Row").size();


            if ((rowCount > 0 && (suFlag == "SU" || suFlag == "su")) || rowCount <= 0) {

                for (j = 0; j < allSSCC.length; j++) {
                    ssccNo = allSSCC[j];
                    formattedSSCC = ssccNo;
                    ssccCnt = ssccCnt + 1;
                    var formattedSSCC = ssccNo;
                    var ssccLen = ssccNo.length;

                    for (var i = 0; i < (20 - ssccLen); i++) {
                        formattedSSCC = "0" + formattedSSCC;
                    }


                    var stockXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1=" + formattedSSCC + "&cache=" + refresh + "&Content-Type=text/xml"));

                    var plant = $(stockXML).find("PLANT").text();
                    var sourceSLoc = $(stockXML).find("STGE_LOC").text();
                    var sourceSType = $(stockXML).find("STGE_TYPE").text();
                    var sourceSBin = $(stockXML).find("STGE_BIN").text();
                    var matNo = $(stockXML).find("MATERIAL").text();
                    var batchNo = $(stockXML).find("BATCH").text();
                    var uom = $(stockXML).find("BASE_UOM").text();
                    var availabelStock = $(stockXML).find("AVAIL_STCK").text();
                    var unitType = $(stockXML).find("UNITTYPE_1").text();
                    var whNo = $(stockXML).find("WHSENUMBER").text();
                    var stockCat = $(stockXML).find("STOCK_CAT").text();
                    var sled = $(stockXML).find("EXPIRYDATE").text();
                    var prodDate = $(stockXML).find("PROD_DATE").text();
                    var restricted = $(stockXML).find("RESTRICTED").text();


                    if (ssccCnt == 1 && (destSTpe == sourceSType && destSBin == sourceSBin)) {

                        flag = false;
                        errorMsg = document.getElementById("errorMsg");
                        errorMsg.style.color = "red";
                        errorMsg.style.fontweight = "bold";
                        errorMsg.style.display = "block";
                        var valErDMsg = getProperty(L_values, 'RF_UI_ER_D_MSG');
                        errorMsg.innerText = valErDMsg;
                        var moveSUBtton = document.getElementById("moveSUBtton");
                        moveSUBtton.style.display = "inline-block";
                        var msgLabel = document.getElementById("message");
                        msgLabel.style.display = "none";

                    } else {
                        if (flag == true) {
                            if (ssccCnt == 1) {

                                //document.getElementById("check").style.display="none";
                                errorMsg.style.display = "none";
                                document.getElementById("errorMsg").style.color = "black";
                                var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
                                document.getElementById("errorMsg").innerText = valErMsg;
                                var moveSUBtton = document.getElementById("moveSUBtton");
                                moveSUBtton.style.display = "none";
                                var nxtBtton = document.getElementById("nxtBtton");
                                nxtBtton.style.display = "none";
                                var ssccLbl = document.getElementById("ssccLbl");
                                ssccLbl.style.display = "none";
                                var sSCCIn = document.getElementById("sSCCIn");
                                sSCCIn.style.display = "none";
                                var sTypeId = document.getElementById("sTypeId");
                                sTypeId.style.display = "none";
                                sTypeIn.style.display = "none";
                                var sBinId = document.getElementById("sBinId");
                                sBinId.style.display = "none";
                                sBinIn.style.display = "none";
                                var or = document.getElementById("or");
                                or.style.display = "none";
                                var verifyId = document.getElementById("verifyId");
                                verifyId.style.display = "none";
                                verifyIn.style.display = "none";
                                msgLabel.style.display = "block";
		        
 		        document.getElementById("STypedrop").style.display = "none";
 	                   
  		        document.getElementById("SBindrop").style.display = "none";

////////////////////////////////////////////////////////////////////////////////Hide SSCC dropdown///////////////////////////////////////////////////
		        
		        document.getElementById("ssccList").style.display ="none";
		        document.getElementById("BtnDlt").style.display ="none";
		      
		      
///////////////////////////////////////////////////////END//////////////////////////////////////////////////////////////////////////////			

                            }

                            if (stockCat == "" || stockCat == " " || stockCat == null || stockCat == "null") {
                                stockCat = "---";
                            }
                            if (restricted == "" || restricted == " " || restricted == null || restricted == "null") {
                                restricted = "---";
                            }
                            var queryString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                                "<TransferOrderDetails>" +
                                "<I_DestBatch>" + batchNo + "</I_DestBatch>" +
                                "<I_DestMaterial>" + matNo + "</I_DestMaterial>" +
                                "<I_DestProdDate>" + prodDate + "</I_DestProdDate>" +
                                "<I_DestSLED>" + sled + "</I_DestSLED>" +
                                "<I_DestSLOC>" + sourceSLoc + "</I_DestSLOC>" +
                                "<I_DestSSCCNum>" + formattedSSCC + "</I_DestSSCCNum>" +
                                "<I_DestSTBin>" + encodeURIComponent(destSBin) + "</I_DestSTBin>" +
                                "<I_DestStockCat>" + stockCat + "</I_DestStockCat>" +
                                "<I_DestSTType>" + destSTpe + "</I_DestSTType>" +
                                "<I_DestUnitType>" + unitType + "</I_DestUnitType>" +
                                "<I_DestWHNo>" + whNo + "</I_DestWHNo>" +
                                "<I_HeaderType>" + headerFromURL + "</I_HeaderType>" +
                                "<I_MovementType></I_MovementType>" +
                                "<I_MovementType_Dest>SU</I_MovementType_Dest>" +
                                "<I_MovementType_Source>SU</I_MovementType_Source>" +
                                "<I_Plant>" + plant + "</I_Plant>" +
                                "<I_PrintingFlag>false</I_PrintingFlag>" +
                                "<I_PrintingParams></I_PrintingParams>" +
                                "<I_Quantity_Dest>" + availabelStock + "</I_Quantity_Dest>" +
                                "<I_Quantity_Source>" + availabelStock + "</I_Quantity_Source>" +
                                "<I_SourceBatch>" + batchNo + "</I_SourceBatch>" +
                                "<I_SourceBatchStatus>" + restricted + "</I_SourceBatchStatus>" +
                                "<I_SourceMaterial>" + matNo + "</I_SourceMaterial>" +
                                "<I_SourceProdDate>" + prodDate + "</I_SourceProdDate>" +
                                "<I_SourceSLED>" + sled + "</I_SourceSLED>" +
                                "<I_SourceSSCCNum>" + formattedSSCC + "</I_SourceSSCCNum>" +
                                "<I_SourceSTBin>" + encodeURIComponent(sourceSBin) + "</I_SourceSTBin>" +
                                "<I_SourceStockCat>" + stockCat + "</I_SourceStockCat>" +
                                "<I_SourceSTType>" + sourceSType + "</I_SourceSTType>" +
                                "<I_SourceUnitType>" + unitType + "</I_SourceUnitType>" +
                                "<I_StorageLOC>" + sourceSLoc + "</I_StorageLOC>" +
                                "<I_UOM>" + uom + "</I_UOM>" +
                                "<I_WHNumber>" + whNo + "</I_WHNumber>" +
                                "<I_UserLanguage>" + language + "</I_UserLanguage>" +
                                "<I_BinFlag>0</I_BinFlag>" +
                                "</TransferOrderDetails>";


                            if (proceed == true) {
                                if (ssccCnt == 2) {
                                    queryString = queryString.replace("<I_BinFlag>0</I_BinFlag></TransferOrderDetails>", "<I_BinFlag>1</I_BinFlag></TransferOrderDetails>");

                                }
                            } else {}

                            var stockMovemntXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_MoveStockDetailstoDestination&Param.1=" + queryString + "&cache=" + refresh + "&Content-Type=text/xml"));
                            var message = $(stockMovemntXML).find("Message").text();
                            var transOrdNo = $(stockMovemntXML).find("TONumber").text();
                            var res = false;
                            var valToMsg4 = getProperty(L_values, 'TO_MSG4');

                            if (ssccCnt == 1 && message == valToMsg4) {
                                if (message == valToMsg4) {

                                    res = confirm(valToMsg4);
                                } else {}
                                if (res == true && ssccCnt == 1 && (InputStype != "" || InputSbin1 != "")) {
                                    queryString = queryString.replace("<I_BinFlag>0</I_BinFlag></TransferOrderDetails>", "<I_BinFlag>1</I_BinFlag></TransferOrderDetails>");
                                    proceed = true;
                                    stockMovemntXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_MoveStockDetailstoDestination&Param.1=" + queryString + "&cache=" + refresh + "&Content-Type=text/xml"));

                                    message = $(stockMovemntXML).find("Message").text();
                                    transOrdNo = $(stockMovemntXML).find("TONumber").text();
		
                                } else {
                                    if (ssccCnt == 1) {

                                        proceed = false;
                                        errorMsg.style.display = "none";
                                        document.getElementById("errorMsg").style.color = "black";
                                        var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
                                        document.getElementById("errorMsg").innerText = valErMsg;
                                        var moveSUBtton = document.getElementById("moveSUBtton");
                                        moveSUBtton.style.display = "inline-block";
                                        //  var nxtBtton= document.getElementById("nxtBtton");
                                        //nxtBtton.style.display= "block";
                                        var ssccLbl = document.getElementById("ssccLbl");
                                        ssccLbl.style.display = "block";
                                        var sSCCIn = document.getElementById("sSCCIn");
                                        sSCCIn.style.display = "block";
                                        var sTypeId = document.getElementById("sTypeId");
                                        sTypeId.style.display = "block";
                                        sTypeIn.style.display = "block";
                                        var sBinId = document.getElementById("sBinId");
                                        sBinId.style.display = "block";
                                        sBinIn.style.display = "block";
                                        var or = document.getElementById("or");
                                        //or.style.display= "block";
                                        var verifyId = document.getElementById("verifyId");
                                        verifyId.style.display = "block";
                                        verifyIn.style.display = "block";
                                        msgLabel.style.display = "none";
                                        break;
                                    }
                                }
                            } else {

                            }
                            if (message != valToMsg4) {
                                if ((message == "" || message == " " || message == null || message == "NA" || message == "---") && transOrdNo != "") {

                                    tOMoveSuccessCount = tOMoveSuccessCount + 1;

                                } else {
                                    if (message != "") {
                                        tOMoveFailedCount = tOMoveFailedCount + 1;
                                        var valTO = getProperty(L_values, 'RF_UI_TO');
                                        msgLabel.innerText = valTO;
                                    }
                                }
                            }
                        }

                    }

                    if (allSSCC.length == tOMoveSuccessCount && tOMoveSuccessCount > 0) {

                        msgLabel.style.color = "green";
                        msgLabel.style.fontweight = "bold";
                        msgLabel.style.display = "block";
                        //var valSuccess = getProperty(L_values, 'RF_UI_TO_SUCCESS');
                        //msgLabel.innerText = valSuccess + tOMoveSuccessCount + ".";
						var valSuccess1 = getProperty(L_values, 'RF_UI_TO_SUCCESS_1');
						var valSuccess2 = getProperty(L_values, 'RF_UI_TO_SUCCESS_2');
						msgLabel.innerText = valSuccess1 +" "+ destSTpe +" "+ destSBin +". "+ valSuccess2 + tOMoveSuccessCount;
	///////////////////////////////////////////Business Metrics/////////////////////////////////////////
			var businessmetrics_TO = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFTO_CountOfTransactions&Content-Type=text/xml"));
	////////////////////////////////////////////////////////////////////////////////////////////////////////	
						
						

                    } else if (tOMoveFailedCount == allSSCC.length && tOMoveFailedCount > 0) {
                        msgLabel.style.color = "red";
                        msgLabel.style.fontweight = "bold";
                        msgLabel.style.display = "block";
                        var valFail = getProperty(L_values, 'RF_UI_TO_F');
                        msgLabel.innerText = valFail + tOMoveFailedCount + ".";
                    } else {
                        if (tOMoveFailedCount > 0 && tOMoveSuccessCount > 0) {
                            msgLabel.style.color = "blue";
                            msgLabel.style.fontweight = "bold";
                            msgLabel.style.display = "block";
                            var valErMsg1 = getProperty(L_values, 'RF_UI_Part_1');
                            var valErMsg1 = getProperty(L_values, 'RF_UI_Part_2');
                            msgLabel.innerText = valErMsg1 + tOMoveSuccessCount + valErMsg2 + tOMoveFailedCount + ".";
                        }
                    }
                }
            } else {

                errorMsg.style.color = "red";
                errorMsg.style.fontweight = "bold";
                errorMsg.style.display = "block";
                var valMsgEr = getProperty(L_values, 'RF_MSG_ERR');
                errorMsg.innerText = valMsgEr;
                document.getElementById("moveSUBtton").style.display = "inline-block";
            }

        }
    
}



function goBack() {

	

    if (buttonBackIdentifier == 1) {
        window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/SUMainMenu.irpt?plant=" + plantFromURL + "&client=" + cl), "_self");
        buttonBackIdentifier = 1;
    }
    if (buttonBackIdentifier == 2) {
        location.reload();
        buttonBackIdentifier = 1;
    }
    if (buttonBackIdentifier == 3) {
        //next();
        location.reload();
        buttonBackIdentifier = 2;
        document.getElementById("errorMsg").style.display = "none";
        document.getElementById("message").style.display = "none";
    }

}


function countSSCC() {


    var flag = getBCPStatus();

 
        var len = document.getElementById("ssuIn").value.trim().length;
        var value = document.getElementById("ssuIn").value.trim();

	value = scanssccno(value);

        if (len == 20 || len == 40 || len == 18 || len == 36 || len == 38) {

            if ((len == 18 && value.substr(0, 2) != "00") || (len == 20 && value.substr(0, 2) == "00") || (len == 40 && value.substr(0, 2) == "00") ||
                (len == 36 && (value.substr(0, 2) != "00" && value.substr(18, 2) != "00")) || (len == 38 && ((value.substr(0, 2) == "00" && value.substr(20, 2) != "00") || (value.substr(0, 2) != "00" && value.substr(18, 2) == "00")))) {

                var refresh = new Date();
                var msgLabel = document.getElementById("errorMsg");
                var suFld = document.getElementById("ssuIn");
                var sscc = suFld.value;
		 sscc = scanssccno(sscc);
                var len = sscc.length;
                var prevLen = prevSSCC.length;

                var formattedSSCC;
                var isScanned = false;
                if ((prevLen == 18 || prevLen == 20) && (len == 36 || len == 38 || len == 40)) {

                    sscc = sscc.substr(prevLen, (len - prevLen));
                }
                len = sscc.length;
                formattedSSCC = sscc;

                if (len == 18 || len == 20) {
                    if (!isNaN(sscc)) {


                        for (var i = 0; i < allSSCC.length; i++) {
                            if ((sscc == allSSCC[i]) || (sscc == allSSCC[i].substr(2, 18))) {

                                isScanned = true;
                            }
                        }
                        if (isScanned) {

                            if (prevLen == 18 || prevLen == 20) {


                                suFld.value = prevSSCC;
                            } else {
                                suFld.value = "";

                            }
                            var valStScan = getProperty(L_values, 'RF_STORAGE_SCAN');

                            msgLabel.innerText = valStScan;
                            msgLabel.style.display = "block";
                            msgLabel.style.color = "red";
                            msgLabel.style.fontweight = "bold";

                        } else {
                            for (var i = 0; i < (20 - len); i++) {
                                formattedSSCC = "0" + formattedSSCC;
                            }
                            var stockXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1=" + formattedSSCC + "&cache=" + refresh + "&Content-Type=text/xml"));
                            var sourceSType = $(stockXML).find("STGE_TYPE:first").text();
                            var sourceSBin = $(stockXML).find("STGE_BIN:first").text();
                            var stockCat = $(stockXML).find("STOCK_CAT:first").text();
                            var restricted = $(stockXML).find("RESTRICTED:first").text();
                            var availabelStock = $(stockXML).find("AVAIL_STCK:first").text();
                            var suSloc = $(stockXML).find("STGE_LOC:first").text();
                            var suWh = $(stockXML).find("WHSENUMBER:first").text();

                            if (sourceSType == " " || sourceSBin == " " || sourceSType == "" || sourceSBin == "" || sourceSType == null || sourceSBin == null || sourceSType == "---" || sourceSBin == "---") {

                                if (prevLen == 18 || prevLen == 20) {
                                    suFld.value = prevSSCC;
                                } else {
                                    suFld.value = "";
                                }
                                var valNonSt = getProperty(L_values, 'RF_NON_STORAGE');
                                msgLabel.innerText = valNonSt;
                                msgLabel.style.display = "block";
                                msgLabel.style.color = "red";
                                msgLabel.style.fontweight = "bold";

                            } else {

                                if (countSU == 0 || ((sourceSType == prevSType) && (sourceSBin == prevSBin))) {

                                    if (availabelStock <= 0) {
                                        if (prevLen == 18 || prevLen == 20) {
                                            suFld.value = prevSSCC;
                                        } else {
                                            suFld.value = "";
                                        }
                                        if (availabelStock <= 0) {
                                            var valNA = getProperty(L_values, 'RF_MSG_LBL_NA');
                                            msgLabel.innerText = valNA;
                                        }
                                        msgLabel.style.display = "block";
                                        msgLabel.style.color = "red";
                                        msgLabel.style.fontweight = "bold";
                                    } else {
										
                                        countSU = countSU + 1;
									
                                        allSSCC.push(sscc);
                                        prevSType = sourceSType;
                                        prevSBin = sourceSBin;
                                        prevSSCC = sscc;
                                        suFld.value = prevSSCC;
                                        var countFld = document.getElementById("countIn");
                                        countFld.value = countSU;
                                        msgLabel.style.display = "none";
                                       document.getElementById("errorMsg").style.color = "black";
                                       var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
                                      document.getElementById("errorMsg").innerText = valErMsg;


//////////////////////////////////////////////////////////SSCC dropdown///////////////////////////////////////////////////
			
			var selectDropdown = document.getElementById("ssccList");
			selectDropdown.options[selectDropdown.options.length] = new Option(sscc);			
				
			 selectDropdown.selectedIndex= selectDropdown.options.length-1;
			selectDropdown.style.display = "block";
			
			var len = document.getElementById("ssuIn").value.trim().length;
     		            var value = document.getElementById("ssuIn").value.trim();
                                    value = scanssccno(value);
			document.getElementById("ssuIn").value = "";
			document.getElementById("ssuIn").focus();

/////////////////////////////////////////////////////////END///////////////////////////////////////////////////////////////////////
                                    }
                                    } else {
                                    if (prevLen == 18 || prevLen == 20) {
                                        suFld.value = prevSSCC;
                                    } else {
                                        suFld.value = "";
                                    }

                                    var valNonE = getProperty(L_values, 'RF_NON_EXIST');
                                    msgLabel.innerText = valNonE;
                                    msgLabel.style.display = "block";
                                    msgLabel.style.color = "red";
                                    msgLabel.style.fontweight = "bold";
                                }

                            }
                        }
                    }
                } else {
                    if (prevLen == 18 || prevLen == 20) {
                        suFld.value = prevSSCC;
                    } else {
                        suFld.value = "";
                    }

                    var valSSCCNo = getProperty(L_values, 'RF_NO_SSCC');
                    msgLabel.innerText = valSSCCNo;
                    msgLabel.style.display = "block";
                    msgLabel.style.color = "red";
                    msgLabel.style.fontweight = "bold";
                }
            }
        }
}


function deleteValues() {

       ssccIndex =  document.getElementById("ssccList").selectedIndex;
       var ssccDropdownId = document.getElementById("ssccList");
       var ssccNumber=  ssccDropdownId.options[ssccDropdownId.selectedIndex].value;

    
       if(dropdownSelectFlag==0){

	if(ssccIndex==undefined || ssccIndex== -1){

          var msgLabel = document.getElementById("errorMsg");
            msgLabel.style.color = "red";
            msgLabel.style.fontweight = "bold";
            msgLabel.style.display = "block";
            var dltxt = getProperty(L_values, 'RF_UI_DLTMSG');
            msgLabel.innerText = dltxt;
            document.getElementById("ssuIn").focus();
	}

	/////////////////////////////////////////////////Deletion of SSCC from dropdown////////////////////////
       else{

	var deletionMsg= getProperty(L_values, 'RF_UI_SSCCDLT')+ "  "+ssccNumber+"?";
   	if (confirm(deletionMsg) == true) {
   		  var dropDown = document.getElementById("ssccList");
       	for (var i = 0; i <= dropDown.options.length; i++) {
            if (dropDown.options[i].selected) { 
            dropDown.removeChild(dropDown.options[i]);
	
             break;
              }
              }

	
	 allSSCC.splice(ssccIndex, 1);
            countSU= allSSCC.length;
	document.getElementById("countIn").value=countSU;

	
           
	if(countSU==0){
	     
	 allSSCC.length = 0;
  	 allSSCC = [];
 	 countSU = 0;
 	 var err = document.getElementById("errorMsg");
  	 err.style.display = "none";
 	 err.style.color = "black";
 	 var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
 	 err.innerText = valErMsg;
   	 document.getElementById("ssuIn").value = "";
   	 document.getElementById("countIn").value = "0";
   	 document.getElementById("ssuIn").focus();
 	  document.getElementById("ssccList").style.display = "none";
	 document.getElementById("ssccList").innerHTML="";
	
	}
	
           	}
     
           }
  
/////////////////////////////////////////////////////END///////////////////////////////////////////////////////////////////////////////

}

             else{
                 return;

             }
	

	

	
   }


function Clear() {


    allSSCC.length = 0;
    allSSCC = [];
    countSU = 0;
    var err = document.getElementById("errorMsg");
    err.style.display = "none";
    err.style.color = "black";
    var valErMsg = getProperty(L_values, 'RF_UI_ERR_MSG');
    err.innerText = valErMsg;
    document.getElementById("ssuIn").value = "";
    document.getElementById("countIn").value = "0";
    document.getElementById("ssuIn").focus();

    if(dropdownSelectFlag==0){

     document.getElementById("ssccList").style.display = "none";
     document.getElementById("ssccList").innerHTML="";

   }

}

////////////////////////////////////////////////////////////////Dropdown To Populate Multiple Storage type and Storage Bin//////////////////////////////////////////////////////////

function onStorageTypeSelection() {


    storageType = $("#STypedrop option:selected").text() ;


  var refresh = new Date();
  populateDropdownData("SBindrop","VALUE","KEY","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GET_MultiSBin_BasedOnStorageType&Param.1=" + cl + "&Param.2=" + encodeURIComponent(verifID1) + "&Param.3=" + storageType + "&cache=" + refresh + "&Content-Type=text/xml");
  $("#SBindrop").prop("selectedIndex", 1);

}

function checkinput() {

   
    dropdownFlag=0;
    verifID = document.getElementById("verifyIn").value;
    verifID1 = verifID.toUpperCase();
    var refresh = new Date();
    var storageModel= "/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GET_StypeAndSBin_BasedOnVerifID&Param.1=" + cl + "&Param.2=" + wh + "&Param.3=" + encodeURIComponent(verifID1)+"&Param.6=" + language + "&Param.8=" + ssccNo + "&cache=" + refresh + "&Content-Type=text/xml";
   verifIDmodel = loadXMLDoc(encodeURI(storageModel), "", false);
 
    var noOfStorageType = $(verifIDmodel).find("COUNT").text();

    if(noOfStorageType>1){
   dropdownFlag=1;
   document.getElementById("sTypeIn").style.display = "none";
   document.getElementById("STypedrop").style.display = "block";
   document.getElementById("sBinIn").style.display = "none";
   document.getElementById("SBindrop").style.display = "block";

	
	
  populateDropdownData("STypedrop","VALUE","KEY",storageModel);
  $("#STypedrop").prop("selectedIndex", 1);
  onStorageTypeSelection();
 
 }
  else{

  document.getElementById("sTypeIn").style.display = "block";
  document.getElementById("STypedrop").style.display = "none";
  document.getElementById("sBinIn").style.display = "block";
  document.getElementById("SBindrop").style.display = "none";


   var stype = $(verifIDmodel).find("STGE_TYPE").text();
   var sbin = $(verifIDmodel).find("STGE_BIN").text();
	

  document.getElementById("sBinIn").value = sbin;
  document.getElementById("sTypeIn").value = stype;

   if (stype == "" || sbin == "") {
   document.getElementById("sTypeIn").disabled = false;
   document.getElementById("sBinIn").disabled = false;

  } else {

    document.getElementById("sTypeIn").disabled = true;
    document.getElementById("sBinIn").disabled = true;
    }
    }   

   

///////////////////////////////////////////////////////////////////////////////////////////////////////End///////////////////////////////////////////////////////////////////////////////
}