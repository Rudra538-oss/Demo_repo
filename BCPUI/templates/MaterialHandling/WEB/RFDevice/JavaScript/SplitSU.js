var xmldoc;
var resource;
var plantSite;
var siteFromURL;
var plantFromURL;
var resourceFromURL;
var ssccNo;
var formattedSSCC;
var msgLabel
var plant;
var sourceSLoc;
var sourceSType;
var sourceSBin;
var matNo;
var batchNo;
var stockCat;
var uom;
var dropdownFlag;
var storageType ;
var availabelStock;
var unitType;
var whNo;
var sled;
var prodDate;
var restricted;
var printingFlag;
var buttonBackIdentifier;
var sloc;
var wh;
var cl;
var L_values;
var printingParams;
var language;
var verifID;
var verifID1;
var InputStype;
var InputSbin;
var InputSbin1;
var outputDateFormat;


document.onkeydown = fkey;
//document.onkeypress = fkey
//document.onkeyup = fkey;

function fkey(e){
	console.log(e);
      	if (e.keyCode == 115 || e.keyCode == 13) {
	
	if($('#nxt').is(":visible") == true){
	next();
	}else if($('#split').is(":visible") == true){
	splitSU();
	}else{
	}
             //alert("f4 pressed");
        }
	if (e.keyCode == 113) {
	Clear();
             //alert("f2 pressed");
        }
	if (e.keyCode == 114) {
	goBack();
            // alert("f3 pressed");
        }
/*
	if (($('#split').is(":visible") == true && e.keyCode == 115) || ($('#split').is(":visible") == true && e.keyCode == 13)) {
	splitSU();
            // alert("f4 pressed");
        }
*/
 }

function onLoading() {
callTimeOut();
buttonBackIdentifier = 1;
plantFromURL = getURLParameter("plant");
siteFromURL = getURLParameter("site");
resourceFromURL = decodeURIComponent(getURLParameter("resource"));
sloc = getURLParameter("sloc");
wh = getURLParameter("wh");
cl = getURLParameter("client");

var labelHDR = document.getElementById("labelHdr");
document.getElementById("labelHdr").innerText ="Site: " +siteFromURL;

	language =  getLanguage();
	outputDateFormat = dateConvert();

	var DateNw = new Date();
	var details = "SSCC_MSG1,RF_SSC_QTY,BCP_COMMON_MSG_QUANTITY,RF_UI_VERIFICATION_FIELD,NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,NPORTAL_COMMON_LABEL_NO_OF_COPIES,NPORTAL_COMMON_LABEL_PRINTER_NAME,RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_MSG_BCP_OFF_ER,RF_SPLITSTORAGE_UNIT,RF_SS_LBL,RF_SS_HDR,TO_MSG4,RF_CLR,RF_NXT,RF_F4NXT,RF_BK,RF_SS_BCP,TransferDisplay_alert17,RF_SS_UNIT,RF_SS_LBL_RESR,RF_SS_STUNIT,RF_SS_MAT,RF_SS_DESC,RF_SS_BA,RF_SS_SLED,RF_SS_ST_CAT,RF_SS_QTY,RF_SS_STYP,RF_SS_SBIN,RF_SS_SITE,RF_SS_SCAN_No,RF_SS_Valid,RF_SS_Loc,RF_SS_WH,RF_SS_QTY_V,RF_SS_QTY,RF_SS_UF,RF_SS_USplit,RF_QTY_MORE,RF_MSG_SPLIT_F,RF_DEST_ERR,RF_SS_NA,RF_SSCC_RETRY,RF_To_1,RF_To_2,RF_To_3,RF_TO_FAILED";
	
	L_values =loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml"));
	console.log("hi"+L_values);
	
	var valHome = getProperty(L_values,'RF_SPLITSTORAGE_UNIT');
	var valNxt = getProperty(L_values,'RF_NXT');
	var valF4Nxt = getProperty(L_values,'RF_F4NXT');
	var valClr = getProperty(L_values,'RF_CLR');
	var valSite = getProperty(L_values,'RF_UI_SITE');
	var valBCP = getProperty(L_values,'RF_SS_BCP');
	var valLblScan = getProperty(L_values,'RF_SS_UNIT');
	var valBk = getProperty(L_values,'RF_BK');
	var valresr = getProperty(L_values,'RF_SS_LBL_RESR');
	var valLblSSCC = getProperty(L_values,'RF_SS_STUNIT');
	var valMat = getProperty(L_values,'RF_SS_MAT');
	var valDesc = getProperty(L_values,'RF_SS_DESC');
	var valBat = getProperty(L_values,'RF_SS_BA');
	var valSLED = getProperty(L_values,'RF_SS_SLED');
	var valStockCat = getProperty(L_values,'RF_SS_ST_CAT');
	var valQty = getProperty(L_values,'RF_SS_QTY');
	var valErMsg = getProperty(L_values,'RF_SS_QTY');
	var valQLbl = getProperty(L_values,'RF_SSC_QTY');
             var valRFVerify = getProperty(L_values,'RF_UI_VERIFICATION_FIELD');
	var printLabel = getProperty(L_values,'NPORTAL_COMMON_LABEL_PRINTER_NAME');
	var printCopiesLabel = getProperty(L_values,'NPORTAL_COMMON_LABEL_NO_OF_COPIES');

	var valStTyp = getProperty(L_values,'RF_SS_STYP');
	var valStBin = getProperty(L_values,'RF_SS_SBIN');
	
	var valTitle = document.title;
	 valTitle = getProperty(L_values,'RF_SS_LBL');
	
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("bckBtn").innerHTML = valBk;
	document.getElementById("errorMsg").innerHTML = valErMsg;
	document.getElementById("resrcLbl").innerHTML = valresr;
	document.getElementById("bcpLbl").innerHTML = valBCP;
	document.getElementById("clr").innerHTML = valClr;
	document.getElementById("nxt").innerHTML = valF4Nxt;
	document.getElementById("split").innerHTML = valF4Nxt;
	document.getElementById("scanSU").innerHTML = valLblScan;
	document.getElementById("ssccLbl").innerHTML = valLblSSCC;
	
	document.getElementById("printLbl").innerHTML = printLabel;
	document.getElementById("printCopiesLbl").innerHTML = printCopiesLabel;

	document.getElementById("matLbl").innerHTML = valMat;
	
	document.getElementById("descLbl").innerHTML = valDesc;
	document.getElementById("batchLbl").innerHTML = valBat;
	document.getElementById("sledLbl").innerHTML = valSLED;
	document.getElementById("sCategoryLbl").innerHTML = valStockCat;
	
	document.getElementById("quantityLbl").innerHTML = valQLbl;
            document.getElementById("verifyId").innerHTML = valRFVerify;
	document.getElementById("sTypeLbl").innerHTML = valStTyp;
	document.getElementById("sBinLbl").innerHTML = valStBin;

	//populateDropdownData("printSelect","DESCRIPTION","STATUS","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetStatus&Param.1="+language+"&cache="+refresh+"&Content-Type=text/xml");
var sSCCIn = document.getElementById("sSCCIn");
bcpStatus("bcp",L_values);
setInterval(function(){ bcpStatus("bcp",L_values); }, 30000);
}
function next(){
	var flag = getBCPStatus();


	buttonBackIdentifier = 2;
	msgLabel = document.getElementById("errorMsg");
   	ssccNo= document.getElementById("ssuIn").value;
	ssccNo=scanssccno(ssccNo);
	

   if(ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo== "undefined"){

	msgLabel.style.color= "red";
	msgLabel.style.fontweight="bold";
	msgLabel.style.display= "block";
	var valScanText = getProperty(L_values,'RF_SS_SCAN_No');
	msgLabel.innerText = valScanText ;
	document.getElementById("ssuIn").focus();
    }else{

	formattedSSCC = ssccNo;
	var refresh= new Date();
	var ssccLen = ssccNo.length;

	
	var stockXML= loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+formattedSSCC+"&Param.7="+language+"&cache="+refresh+"&Content-Type=text/xml"));
	plant =$(stockXML).find("PLANT").text();
	sourceSLoc=$(stockXML).find("STGE_LOC:first").text();
	sourceSType=$(stockXML).find("STGE_TYPE").text();
	sourceSBin=$(stockXML).find("STGE_BIN").text();
	matNo=$(stockXML).find("MATERIAL").text();
	batchNo=$(stockXML).find("BATCH").text();
	uom=$(stockXML).find("BASE_UOM").text();
	commUOM= $(stockXML).find("CommUOM").text();
	availabelStock=$(stockXML).find("AVAIL_STCK").text();
	unitType=$(stockXML).find("UNITTYPE_1").text();
	whNo=$(stockXML).find("WHSENUMBER:first").text();
	stockCat=$(stockXML).find("STOCK_CAT").text();	
	sled=$(stockXML).find("EXPIRYDATE").text();
	prodDate=$(stockXML).find("PROD_DATE").text();
	restricted = $(stockXML).find("RESTRICTED").text();
	var errorMessage = $(stockXML).find("ErrorMessage").text();

	if(errorMessage != ""){
	var errorMsg = document.getElementById("errorMsg");
	errorMsg.style.color= "red";
	errorMsg.style.fontweight="bold";
	errorMsg.style.display= "block";
	var valValidSSCC = getProperty(L_values,'RF_SS_Valid');
	errorMsg.innerText = valValidSSCC;
	document.getElementById("ssuIn").focus();

	}
	else{
	document.getElementById("errorMsg").style.display = "none";
	msgLabel.style.display= "none";
	document.getElementById("nxt").style.display = "none";
	document.getElementById("clr").style.display="none";
	document.getElementById("scanSU").style.display= "none";
	document.getElementById("ssuIn").style.display= "none";
	document.getElementById("message").style.display= "none";
           //document.getElementById("check").style.display= "block";
           document.getElementById("sTypeIn").disabled = false;
            document.getElementById("sBinIn").disabled = false;
	document.getElementById("ssccLbl").style.display= "block";
	var ssccInFld = document.getElementById("sSCCIn");
	ssccInFld.value=ssccNo;
	ssccInFld.style.display= "block";
	document.getElementById("split").style.display= "inline-block";
	//document.getElementById("resrcLbl").style.display= "block";
	var resourceIn = document.getElementById("resourceIn");
	//resourceIn.style.display= "block";
	resourceIn.value = resourceFromURL;
	document.getElementById("matLbl").style.display= "block";
	var matIn = document.getElementById("matIn");
	matIn.style.display= "block";
	document.getElementById("descLbl").style.display= "block";
	var matDescLbl = document.getElementById("matDescLbl");
	matDescLbl.style.display= "block";
	document.getElementById("batchLbl").style.display= "block";
	var batchIn = document.getElementById("batchIn");
	batchIn.style.display= "block";
	document.getElementById("sledLbl").style.display = "block";
	var sledIn = document.getElementById("sledIn");
	sledIn.style.display= "block";
	document.getElementById("sCategoryLbl").style.display= "block";
	var sCategoryIn = document.getElementById("sCategoryIn");
	sCategoryIn.style.display= "block";
	document.getElementById("quantityLbl").style.display= "block";
	var quantitytIn = document.getElementById("quantitytIn");
	quantitytIn.style.display= "block";
          document.getElementById("verifyId").style.display= "block";
	var verifyIn = document.getElementById("verifyIn");
            verifyIn.style.display= "block";
	document.getElementById("sTypeLbl").style.display= "block";
	var sTypeIn = document.getElementById("sTypeIn");
	sTypeIn.style.display= "block";
	document.getElementById("sBinLbl").style.display= "block";
	var sBinIn = document.getElementById("sBinIn");
	sBinIn.style.display= "block";
	var uOMIn = document.getElementById("uOMIn");
	uOMIn.style.display= "block";
	var printLbl = document.getElementById("printLbl");
	printLbl.style.display= "block";
	var printSelect = document.getElementById("printSelect");
	printSelect.style.display= "block";
	var printCopiesLbl = document.getElementById("printCopiesLbl");
	printCopiesLbl.style.display= "block";
	var printCopiesInput = document.getElementById("printCopiesInput");
	printCopiesInput.style.display= "block";


	document.getElementById("STypedrop").style.display = "none";
	document.getElementById("SBindrop").style.display = "none";


	populateDropdownData("printSelect","VALUE","KEY","/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=TO&Param.2="+cl+"&Param.3="+matNo+"&cache="+refresh+"&Content-Type=text/xml");
	$("#printSelect").prop("selectedIndex", 1);
	onPrinterSelection();
	matIn.value = matNo;

	var matXML= loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMatDesc&Param.1="+matNo+"&Param.2="+language+"&cache="+refresh+"&Content-Type=text/xml"));
	var matDesc=$(matXML).find("MAKTX").text();	
	matDescLbl.value = matDesc;
	
	batchIn.value = batchNo;
	var sled_format = new Date(sled);
	$( "#sledIn" ).datepicker( "setDate", sled_format );
	$( '#sledIn' ).datepicker( "option", "dateFormat", outputDateFormat);
	

	if(stockCat == "null" || stockCat =="---" || stockCat == "------" || stockCat == ""){
		sCategoryIn.value = "---";
	}else{
		sCategoryIn.value = stockCat;
	}

	//quantitytIn.value = availabelStock;
	uOMIn.value = commUOM;
	//sTypeIn.value = sourceSType;
	//sBinIn.value = sourceSBin;
     }
}

}

function splitSU(){
//////////////////////////////////////
                verifID =document.getElementById("verifyIn").value;        
                verifID1= verifID.toUpperCase();
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

 	    InputSbin1=InputSbin.toUpperCase();


         if(verifID1!=""){
                var refresh= new Date();
	    verifIDmodel=loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GET_StypeAndSBin_BasedOnVerifID&Param.1="+cl+"&Param.2="+wh+"&Param.3="+encodeURIComponent(verifID1)+"&Param.5="+InputStype+"&Param.4="+encodeURIComponent(InputSbin1)+"&Param.6="+language+"&Param.7=1" + "&Param.8=" + ssccNo + "&cache="+refresh+"&Content-Type=text/xml"),"",true);
                var oErrorMsg=$(verifIDmodel).find("ErrorMessage").text();
                var oType=$(verifIDmodel).find("ErrorType").text(); 

                 if(oType=="E")
                  {
                  alert(oErrorMsg);
                  document.getElementById("errorMsg").style.display="none"
	      //document.getElementById("nxt").style.display ="inline-block";
                  document.getElementById("verifyIn").value =""; 

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
                                 } 

	            else{
	                           this.moveSplittype();
	                     }
                        }
             else {

                   this.moveSplittype();
                       }

 }




/////////////////////////////////////
function moveSplittype(){
	var noPrintCopies = document.getElementById("printCopiesInput").value;
	var printSlct = document.getElementById("printSelect").value;
	var printSlctSplit = printSlct.split("---");
	printingParams = printSlctSplit[0]+"---"+printSlctSplit[1]+","+noPrintCopies;
	var destSType;
            var destSBin;

	var flag = getBCPStatus();


	buttonBackIdentifier = 3;
	var quantitytIn = document.getElementById("quantitytIn");

	if(dropdownFlag==1){

   	 destSType=  $("#STypedrop option:selected").text() ;
  	 destSBin =     $("#SBindrop option:selected").text() ;

   	  }
    	else{
   	 destSType = document.getElementById("sTypeIn").value.trim();
   	 destSBin = document.getElementById("sBinIn").value.trim();

 	 }
	
	var res=false;
	

	var quantity = quantitytIn.value;
	//alert(quantity);
	var symbolXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
	var symbol=$(symbolXML).find("O_SymbolQuantity").text();
	quantity=quantity.replace(symbol,".")
	     quantity=("0"+quantity);
	//alert(quantity);
	if(isNaN(quantity) || quantity =="" || quantity ==" " || quantity == null || quantity == "undefined"){
		msgLabel.style.color= "red";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";
		if(isNaN(quantity)){
		var valValidQty = getProperty(L_values,'RF_SS_QTY_V');
		msgLabel.innerText = valValidQty ;
		}else{
		var valSSQty = getProperty(L_values,'RF_SS_QTY');
		msgLabel.innerText = valSSQty;
		}
	}else{
	var refresh = new Date();
	quantity = Number(quantity);
	try{
	destSBin = destSBin.toUpperCase();
	}
	catch(err){
	}
	if(availabelStock <= 0 || quantity <= 0 || quantity >= availabelStock || destSType == "" || destSBin == "" ||  printSlct == "" || printSlct == undefined || printSlct == 'undefined' || (noPrintCopies <= 0 && !document.getElementById("printCopiesInput").disabled)){
	// (destSType == sourceSType && destSBin == sourceSBin) 
		msgLabel.style.color= "red";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";

		if(availabelStock <= 0){
			var valSSUF = getProperty(L_values,'RF_SS_UF');
			msgLabel.innerText = valSSUF ;
		}
		else if(quantity <= 0 && availabelStock > 0){
			var valSSUSplit = getProperty(L_values,'RF_SS_USplit');
			msgLabel.innerText = valSSUSplit;
		}
		else if(quantity >= availabelStock && availabelStock > 0){
			var valQtyMore = getProperty(L_values,'RF_QTY_MORE');
			msgLabel.innerText = valQtyMore+"(" + availabelStock +" "+commUOM+").";
		} 
//  (destSType == sourceSType && destSBin == sourceSBin) 
		else if(destSType == "" || destSType == "" ){

			if(destSType == "" || destSBin == ""){
			var valEntStOrBin = getProperty(L_values,'RF_MSG_SPLIT_F');
			msgLabel.innerText = valEntStOrBin ;
			}else{
			var valDestErr = getProperty(L_values,'RF_DEST_ERR');
			msgLabel.innerText = valDestErr ;
			}
		} 
		else if(printSlct == "" || printSlct == undefined || printSlct == 'undefined'){
			var printSelect = getProperty(L_values,'NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER');
			msgLabel.innerText = printSelect;
		}
		else if(noPrintCopies <= 0){
			var noOfCopies = getProperty(L_values,'NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES');
			msgLabel.innerText = noOfCopies;
			
		}
		else{
			//msgLabel.innerText = "Storage Unit-Split Not Allowed - the stock is blocked/restricted.";
		}
	
	}else{
	var changedUOM = uOMIn.value;

	var ssccXML= loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GenerateSSCCNumberBCP&Param.1="+plant+"&cache="+refresh+"&Content-Type=text/xml"));
	var errMsg=$(ssccXML).find("ErrorMessage").text();
	var generatedSSCC=$(ssccXML).find("SSCCNumber").text();


	if(errMsg != "" ){
		msgLabel.style.color= "red";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";
		var valRetry = getProperty(L_values,'SSCC_MSG1');
		msgLabel.innerText = valRetry ;

	}else{
	document.getElementById("clr").style.display="none";
	document.getElementById("errorMsg").style.display="none";
	document.getElementById("ssccLbl").style.display= "none";
	document.getElementById("sSCCIn").style.display= "none";
	document.getElementById("split").style.display= "none";
	document.getElementById("matLbl").style.display= "none";
	document.getElementById("matIn").style.display= "none";
	document.getElementById("descLbl").style.display= "none";
	document.getElementById("matDescLbl").style.display= "none";
	document.getElementById("batchLbl").style.display= "none";
	document.getElementById("batchIn").style.display= "none";
	document.getElementById("sledLbl").style.display = "none";
	document.getElementById("sledIn").style.display = "none";
	document.getElementById("sCategoryLbl").style.display= "none";
	document.getElementById("sCategoryIn").style.display= "none";
	document.getElementById("quantityLbl").style.display= "none";
	document.getElementById("quantitytIn").style.display= "none";
            document.getElementById("verifyId").style.display= "none";
 	document.getElementById("verifyIn").style.display= "none";
	document.getElementById("sTypeLbl").style.display= "none";
 	document.getElementById("sTypeIn").style.display= "none";
	document.getElementById("sBinLbl").style.display= "none";
	document.getElementById("sBinIn").style.display= "none";
	document.getElementById("uOMIn").style.display= "none";

	document.getElementById("STypedrop").style.display = "none";
	document.getElementById("SBindrop").style.display = "none";


	var printLbl = document.getElementById("printLbl");
	printLbl.style.display= "none";
	var printSelect = document.getElementById("printSelect");
	printSelect.style.display= "none";
	var printCopiesLbl = document.getElementById("printCopiesLbl");
	printCopiesLbl.style.display= "none";
	var printCopiesInput = document.getElementById("printCopiesInput");
	printCopiesInput.style.display= "none";
 //document.getElementById("check").style.display="none";
	if( stockCat == "" || stockCat == " " || stockCat== null || stockCat =="null"){
	stockCat = "---";
	}
	if( restricted == "" || restricted == " " || restricted== null || restricted=="null"){
	restricted = "---";
	}
	printingFlag = "true";


	//To Accomodate more than 32 params to be sent  convert params to XML
	
	var queryString ="<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
									"<TransferOrderDetails>"+
									"<I_DestBatch>"+batchNo+"</I_DestBatch>"+
									"<I_DestMaterial>"+matNo+"</I_DestMaterial>"+
									"<I_DestProdDate>"+prodDate+"</I_DestProdDate>"+
									"<I_DestSLED>"+sled+"</I_DestSLED>"+
									"<I_DestSLOC>"+sourceSLoc+"</I_DestSLOC>"+
									"<I_DestSSCCNum>"+generatedSSCC+"</I_DestSSCCNum>"+
									"<I_DestSTBin>"+encodeURIComponent(destSBin)+"</I_DestSTBin>"+
									"<I_DestStockCat>"+stockCat+"</I_DestStockCat>"+
									"<I_DestSTType>"+destSType+"</I_DestSTType>"+
									"<I_DestUnitType>"+unitType+"</I_DestUnitType>"+
									"<I_DestWHNo>"+whNo+"</I_DestWHNo>"+
									"<I_HeaderType>SU_SPLIT</I_HeaderType>"+
									"<I_MovementType></I_MovementType>"+
									"<I_MovementType_Dest>SU</I_MovementType_Dest>"+
									"<I_MovementType_Source>SU</I_MovementType_Source>"+
									"<I_Plant>"+plant+"</I_Plant>"+
									"<I_PrintingFlag>true</I_PrintingFlag>"+
									"<I_PrintingParams>"+printingParams+"</I_PrintingParams>"+
									"<I_Quantity_Dest>"+quantity+"</I_Quantity_Dest>"+
									"<I_Quantity_Source>"+availabelStock+"</I_Quantity_Source>"+
									"<I_SourceBatch>"+batchNo+"</I_SourceBatch>"+
									"<I_SourceBatchStatus>"+restricted+"</I_SourceBatchStatus>"+
									"<I_SourceMaterial>"+matNo+"</I_SourceMaterial>"+
									"<I_SourceProdDate>"+prodDate+"</I_SourceProdDate>"+
									"<I_SourceSLED>"+sled+"</I_SourceSLED>"+
									"<I_SourceSSCCNum>"+formattedSSCC+"</I_SourceSSCCNum>"+
									"<I_SourceSTBin>"+encodeURIComponent (sourceSBin)+"</I_SourceSTBin>"+
									"<I_SourceStockCat>"+stockCat+"</I_SourceStockCat>"+
									"<I_SourceSTType>"+sourceSType+"</I_SourceSTType>"+
									"<I_SourceUnitType>"+unitType+"</I_SourceUnitType>"+
									"<I_StorageLOC>"+sourceSLoc+"</I_StorageLOC>"+
									"<I_UOM>"+uom+"</I_UOM>"+
									"<I_WHNumber>"+whNo+"</I_WHNumber>"+
									"<I_UserLanguage>"+language+"</I_UserLanguage>"+
									"<I_BinFlag>0</I_BinFlag>"+
									"</TransferOrderDetails>";
				
	var stockMovemntXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_MoveStockDetailstoDestination&Param.1="+queryString+"&cache="+refresh+"&Content-Type=text/xml"));
	var message=$(stockMovemntXML).find("Message").text();
	var transOrdNo=$(stockMovemntXML).find("TONumber").text();
	var msgSuccess = document.getElementById("message");
	var valToMsg4 = getProperty(L_values,'TO_MSG4');

	if(message == valToMsg4 && transOrdNo == "---"){
	
		res = confirm(valToMsg4);



	}else{
	}

	if(res == true && transOrdNo == "---"){
		queryString=queryString.replace("<I_BinFlag>0</I_BinFlag></TransferOrderDetails>","<I_BinFlag>1</I_BinFlag></TransferOrderDetails>");
		
		stockMovemntXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_MoveStockDetailstoDestination&Param.1="+queryString+"&cache="+refresh+"&Content-Type=text/xml"));
		message=$(stockMovemntXML).find("Message").text();
		transOrdNo=$(stockMovemntXML).find("TONumber").text();	


	}else{
	if(message == valToMsg4){
	document.getElementById("clr").style.display="none";
	document.getElementById("errorMsg").style.display="none";
	document.getElementById("ssccLbl").style.display= "block";
	document.getElementById("sSCCIn").style.display= "block";
	document.getElementById("split").style.display= "inline-block";
	document.getElementById("matLbl").style.display= "block";
	document.getElementById("matIn").style.display= "block";
	document.getElementById("descLbl").style.display= "block";
	document.getElementById("matDescLbl").style.display= "block";
	document.getElementById("batchLbl").style.display= "block";
	document.getElementById("batchIn").style.display= "block";
	document.getElementById("sledLbl").style.display = "block";
	document.getElementById("sledIn").style.display = "block";
	document.getElementById("sCategoryLbl").style.display= "block";
	document.getElementById("sCategoryIn").style.display= "block";
	document.getElementById("quantityLbl").style.display= "block";
	document.getElementById("quantitytIn").style.display= "block";
           document.getElementById("verifyId").style.display= "block";
 	document.getElementById("verifyIn").style.display= "block";
	document.getElementById("sTypeLbl").style.display= "block";
 	document.getElementById("sTypeIn").style.display= "block";
	document.getElementById("sBinLbl").style.display= "block";
	document.getElementById("sBinIn").style.display= "block";
	document.getElementById("uOMIn").style.display= "block";
	var printLbl = document.getElementById("printLbl");
	printLbl.style.display= "block";
	var printSelect = document.getElementById("printSelect");
	printSelect.style.display= "block";
	var printCopiesLbl = document.getElementById("printCopiesLbl");
	printCopiesLbl.style.display= "block";
	var printCopiesInput = document.getElementById("printCopiesInput");
	printCopiesInput.style.display= "block";
	}
	}
	if(message != valToMsg4){
	if(( message == "" || message == " " || message == null || message == "NA" || message == "---") && transOrdNo != "---"){

		msgSuccess.style.color= "green";
		msgSuccess.style.fontweight="bold";
		msgSuccess.style.display= "block";
		var valRFTo1 = getProperty(L_values,'RF_To_1');
		var valRFTo2 = getProperty(L_values,'RF_To_2');
		var valRFTo3 = getProperty(L_values,'RF_To_3');
		msgSuccess.innerText = valRFTo1+transOrdNo+" "+valRFTo2+generatedSSCC+")"+" "+valRFTo3;
	///////////////////////////////////////////Business Metrics/////////////////////////////////////////
var businessmetrics_TO = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFTO_CountOfTransactions&Content-Type=text/xml"));
////////////////////////////////////////////////////////////////////////////////////////////////////////	
	}else{
		msgSuccess.style.color= "red";
		msgSuccess.style.fontweight="bold";
		msgSuccess.style.display= "block";
		var valRFToFailed = getProperty(L_values,'RF_TO_FAILED');
		msgSuccess.innerText = valRFToFailed ;
	}
	}

	}
	}
     }



}
function goBack(){
if(buttonBackIdentifier == 1){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/SUMainMenu.irpt?plant="+plantFromURL+"&client="+cl),"_self");
	buttonBackIdentifier = 1;
}
if(buttonBackIdentifier == 2){
	location.reload();
	buttonBackIdentifier = 1;
}
if(buttonBackIdentifier == 3){
	//next();
	location.reload();
	buttonBackIdentifier = 2;
	document.getElementById("errorMsg").style.display = "none";
	document.getElementById("message").style.display = "none";
}

}
function Clear(){
	document.getElementById("ssuIn").value="";
	document.getElementById("ssuIn").focus();
}
function changeStyle(){
	document.getElementById("printSelect").options[0].style.fontSize = "60px";
}
function validateNoOfPrintCopies(){
	var inputValue= document.getElementById("printCopiesInput");
	var noOfCopies = inputValue.value;
	var errorMsg = document.getElementById("errorMsg");

	if(noOfCopies>0 && !isNaN(noOfCopies) && parseInt(Number(noOfCopies)) == noOfCopies && !isNaN(parseInt(noOfCopies, 10))){
     	errorMsg.style.display= "none";

	}else{
	inputValue.value = "";
     	errorMsg.style.color= "red";
     	errorMsg.style.fontweight="bold";
     	errorMsg.style.display= "block";
	var valMsgEr = getProperty(L_values,'NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES');
     	errorMsg.innerText = valMsgEr ;
	}
}
function onPrinterSelection(){
var printSelect = document.getElementById("printSelect").value;
var nOCopy =  printSelect.split("---")[2];
document.getElementById("printCopiesInput").value = nOCopy;
if(nOCopy == ""){
document.getElementById("printCopiesInput").disabled = true;
}else{
document.getElementById("printCopiesInput").disabled = false;
}
}
function quantityChange(){
var quantity =document.getElementById("quantitytIn").value;
var ID="quantitytIn";
Validate(quantity,ID);


}

function changeStyle(elementID){

	try{
	document.getElementById(elementID).options[0].style.fontSize = "60px";
	}catch(err){}
}

/* function Check(){
var checkbox1 = document.getElementById("check");
console.log(checkbox1.checked);
if(checkbox1.checked==false){



document.getElementById("verifyIn").disabled= true;
document.getElementById("sTypeIn").disabled = false;
document.getElementById("sBinIn").disabled = false;
}
else{
document.getElementById("verifyIn").disabled= false;
document.getElementById("sTypeIn").disabled = true;
document.getElementById("sBinIn").disabled = true;
}


} */

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

}