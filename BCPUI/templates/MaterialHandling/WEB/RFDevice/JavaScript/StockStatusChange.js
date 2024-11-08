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
var availabelStock;
var unitType;
var whNo;
var sled;
var prodDate;
var restricted;
var buttonBackIdentifier = 0;
var sloc;
var wh;
var cl;
var L_values ;
var language;
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
	changeSUStatus();
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
           //  alert("f3 pressed");
        }
/*
	if (($('#split').is(":visible") == true && e.keyCode == 115 ) || ($('#split').is(":visible") == true && e.keyCode == 13)) {
	changeSUStatus();
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
	var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_SBIN,RF_STYPE,RF_MSG_BCP_OFF_ER,RF_SSC_LBL,RF_SSC_HDR,RF_SSC_CLR,RF_SSC_NXT,RF_F4NXT,RF_SSC_BK,RF_SSC_BCP,RF_SSC_UNIT,RF_SSC_RESR,RF_SSC_ST_UNIT,RF_SSC_MAT,RF_SSC_DESC,RF_SSC_BAT,RF_SSC_SL,RF_SSC_STOCK_CAT,RF_SSC_QTY,RF_SSC_STYP,RF_SSC_SBIN,RF_SSC_SITE,RF_SSC_SCAN,RF_SSC_MSG_VALID,RF_SSC_LOC,RF_SSC_WH,RF_SSC_NA,RF_MSG_1,RF_MSG_2,RF_SSC_TO_F";
	
	L_values =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml");
	console.log("hi"+L_values);
	
	var valHome = getProperty(L_values,'RF_SSC_HDR');
	var valNxt = getProperty(L_values,'RF_SSC_NXT');
	var valF4Nxt = getProperty(L_values,'RF_F4NXT');
	var valClr = getProperty(L_values,'RF_SSC_CLR');
	var valSite = getProperty(L_values,'RF_UI_SITE');
	var valBCP = getProperty(L_values,'RF_SSC_BCP');
	var valLblScan = getProperty(L_values,'RF_SSC_UNIT');
	var valBk = getProperty(L_values,'RF_SSC_BK');
	var valresr = getProperty(L_values,'RF_SSC_RESR');
	var valLblSSCC = getProperty(L_values,'RF_SSC_ST_UNIT');
	var valMat = getProperty(L_values,'RF_SSC_MAT');
	var valDesc = getProperty(L_values,'RF_SSC_DESC');
	var valBat = getProperty(L_values,'RF_SSC_BAT');
	var valSLED = getProperty(L_values,'RF_SSC_SL');
	var valStockQty = getProperty(L_values,'RF_SSC_STOCK_CAT');
	var valQty = getProperty(L_values,'RF_SSC_QTY');
	
	var valStTyp = getProperty(L_values,'RF_STYPE');
	var valStBin = getProperty(L_values,'RF_SBIN');

	var valTitle = document.title;
	 valTitle = getProperty(L_values,'RF_SSC_LBL');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BtnBk").innerHTML = valBk;
	document.getElementById("scanSU").innerHTML = valLblScan;
	
	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("clr").innerHTML = valClr;
	document.getElementById("nxt").innerHTML = valF4Nxt;
	document.getElementById("split").innerHTML = valF4Nxt;
	document.getElementById("resrcLbl").innerHTML = valresr;
	
	
	
	document.getElementById("ssccLbl").innerHTML = valLblSSCC;
	document.getElementById("matLbl").innerHTML = valMat;
	document.getElementById("descLbl").innerHTML = valDesc;
	
	document.getElementById("batchLbl").innerHTML = valBat;
	document.getElementById("sledLbl").innerHTML = valMat;
	document.getElementById("sledLbl").innerHTML = valSLED;
	document.getElementById("sCategoryLbl").innerHTML = valStockQty;
	document.getElementById("quantityLbl").innerHTML = valQty;
	document.getElementById("sTypeLbl").innerHTML = valStTyp;
	document.getElementById("sBinLbl").innerHTML = valStBin;

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
	var valScanSSC = getProperty(L_values,'RF_SSC_SCAN');
	msgLabel.innerText = valScanSSC ;
	document.getElementById("ssuIn").focus();
    }else{
	formattedSSCC = ssccNo;
	var refresh= new Date();
	var ssccLen = ssccNo.length;

	for(var i=0; i<(20- ssccLen); i++){
	formattedSSCC = "0"+formattedSSCC;
	}
	var stockXML= loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+formattedSSCC+"&Param.7="+language+"&cache="+refresh+"&Content-Type=text/xml"));
	plant =$(stockXML).find("PLANT").text();
	sourceSLoc=$(stockXML).find("STGE_LOC").text();
	sourceSType=$(stockXML).find("STGE_TYPE").text();
	sourceSBin=$(stockXML).find("STGE_BIN").text();
	matNo=$(stockXML).find("MATERIAL").text();
	batchNo=$(stockXML).find("BATCH").text();
	uom=$(stockXML).find("BASE_UOM").text();
	commUOM = $(stockXML).find("CommUOM").text();
	availabelStock=$(stockXML).find("AVAIL_STCK").text();
	unitType=$(stockXML).find("UNITTYPE_1").text();
	whNo=$(stockXML).find("WHSENUMBER").text();
	stockCat=$(stockXML).find("STOCK_CAT").text();	
	sled=$(stockXML).find("EXPIRYDATE").text();
	prodDate=$(stockXML).find("PROD_DATE").text();
	restricted = $(stockXML).find("RESTRICTED").text();
	var errorMessage = $(stockXML).find("ErrorMessage").text();

	if(errorMessage != ""){

	msgLabel.style.color= "red";
	msgLabel.style.fontweight="bold";
	msgLabel.style.display= "block";
	var valValidSSCC = getProperty(L_values,'RF_SSC_MSG_VALID');
	msgLabel.innerText = valValidSSCC ;
	document.getElementById("ssuIn").focus();

	}
	else{

	msgLabel.style.display= "none";
	document.getElementById("nxt").style.display = "none";
	document.getElementById("scanSU").style.display= "none";
	document.getElementById("ssuIn").style.display= "none";
	document.getElementById("message").style.display= "none";
	document.getElementById("clr").style.display= "none";

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

	document.getElementById("sTypeLbl").style.display= "block";
	var sTypeIn = document.getElementById("sTypeIn");
	sTypeIn.style.display= "block";
	document.getElementById("sBinLbl").style.display= "block";
	var sBinIn = document.getElementById("sBinIn");
	sBinIn.style.display= "block";
	var uOMIn = document.getElementById("uOMIn");
	uOMIn.style.display= "block";



	matIn.value = matNo;
/*
	var formattedMatNo = matNo;
	var matLen = matNo.length;

	for(var i=0; i<(18- matLen); i++){
	formattedMatNo = "0"+formattedMatNo;
	}
	
*/
	var matXML= loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMatDesc&Param.1="+matNo+"&Param.2="+language+"&cache="+refresh+"&Content-Type=text/xml"));
	var matDesc=$(matXML).find("MAKTX").text();	
	matDescLbl.value = matDesc;
	
	batchIn.value = batchNo;
	var sled_format = new Date(sled);
	$( "#sledIn" ).datepicker( "setDate", sled_format );
	$( '#sledIn' ).datepicker( "option", "dateFormat", outputDateFormat);
	
/*
	if(stockCat.toUpperCase()== "S"){
		sCategoryIn.value = "Restricted";
	}else{
		sCategoryIn.value = "Unrestricted";
	}
*/

	if(stockCat == "null" || stockCat =="---" || stockCat == "------" || stockCat == ""){
		sCategoryIn.value = "---";
	}else{
		sCategoryIn.value = stockCat;
	}

	quantitytIn.value = availabelStock;
	//alert(availabelStock);
	var ID="quantitytIn";
            readQuant(availabelStock,ID);
	uOMIn.value = commUOM;
	sTypeIn.value = sourceSType;
	sBinIn.value = sourceSBin;
     }
}

    
}

function changeSUStatus(){
	var flag = getBCPStatus();


	buttonBackIdentifier = 3;
	var refresh = new Date();
	if(stockCat.toUpperCase()== "S"){

		msgLabel.style.color= "red";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";
		var valSSCNA = getProperty(L_values,'RF_SSC_NA');
		msgLabel.innerText = valSSCNA;
	}else{
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
	document.getElementById("sTypeLbl").style.display= "none";
 	document.getElementById("sTypeIn").style.display= "none";
	document.getElementById("sBinLbl").style.display= "none";
	document.getElementById("sBinIn").style.display= "none";
	document.getElementById("uOMIn").style.display= "none";

	if( stockCat == "" || stockCat == " " || stockCat== null || stockCat =="null"){
	stockCat = "---";
	}
	if( restricted == "" || restricted == " " || restricted== null || restricted=="null"){
	restricted = "---";
	}


	var symbolXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetsymbolvalvueformSharedMemory&Content-Type=text/xml");
	var symbol=$(symbolXML).find("O_SymbolQuantity").text();
	availabelStock = availabelStock.replace(symbol,".");
	 availabelStock=("0"+availabelStock);
	
	var queryString = 	"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
									"<TransferOrderDetails>"+
									"<I_DestBatch>"+batchNo+"</I_DestBatch>"+
									"<I_DestMaterial>"+matNo+"</I_DestMaterial>"+
									"<I_DestProdDate>"+prodDate+"</I_DestProdDate>"+
									"<I_DestSLED>"+sled+"</I_DestSLED>"+
									"<I_DestSLOC>"+sourceSLoc+"</I_DestSLOC>"+
									"<I_DestSSCCNum>"+formattedSSCC+"</I_DestSSCCNum>"+
									"<I_DestSTBin>"+encodeURIComponent(sourceSBin)+"</I_DestSTBin>"+
									"<I_DestStockCat>"+stockCat+"</I_DestStockCat>"+
									"<I_DestSTType>"+sourceSType+"</I_DestSTType>"+
									"<I_DestUnitType>"+unitType+"</I_DestUnitType>"+
									"<I_DestWHNo>"+whNo+"</I_DestWHNo>"+
									"<I_HeaderType>STOCK_STATUS</I_HeaderType>"+
									"<I_MovementType></I_MovementType>"+
									"<I_MovementType_Dest>SU</I_MovementType_Dest>"+
									"<I_MovementType_Source>SU</I_MovementType_Source>"+
									"<I_Plant>"+plant+"</I_Plant>"+
									"<I_PrintingFlag>false</I_PrintingFlag>"+
									"<I_PrintingParams></I_PrintingParams>"+
									"<I_Quantity_Dest>"+availabelStock+"</I_Quantity_Dest>"+
									"<I_Quantity_Source>"+availabelStock+"</I_Quantity_Source>"+
									"<I_SourceBatch>"+batchNo+"</I_SourceBatch>"+
									"<I_SourceBatchStatus>"+restricted+"</I_SourceBatchStatus>"+
									"<I_SourceMaterial>"+matNo+"</I_SourceMaterial>"+
									"<I_SourceProdDate>"+prodDate+"</I_SourceProdDate>"+
									"<I_SourceSLED>"+sled+"</I_SourceSLED>"+
									"<I_SourceSSCCNum>"+formattedSSCC+"</I_SourceSSCCNum>"+
									"<I_SourceSTBin>"+encodeURIComponent(sourceSBin)+"</I_SourceSTBin>"+
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
	if( message == "" || message == " " || message == null || message == "NA" || message == "---"){

		msgSuccess.style.color= "green";
		msgSuccess.style.fontweight="bold";
		msgSuccess.style.display= "block";
		var valMsg1= getProperty(L_values,'RF_MSG_1');
		var valMsg2= getProperty(L_values,'RF_MSG_2');
		msgSuccess.innerText = valMsg1+transOrdNo+") "+ valMsg2 ;
///////////////////////////////////////////Business Metrics/////////////////////////////////////////
var businessmetrics_TO = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFTO_CountOfTransactions&Content-Type=text/xml"));
////////////////////////////////////////////////////////////////////////////////////////////////////////	


	
	}else{
		msgSuccess.style.color= "red";
		msgSuccess.style.fontweight="bold";
		msgSuccess.style.display= "block";
		var valSSCF= getProperty(L_values,'RF_SSC_TO_F');
		msgSuccess.innerText = valSSCF ;
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