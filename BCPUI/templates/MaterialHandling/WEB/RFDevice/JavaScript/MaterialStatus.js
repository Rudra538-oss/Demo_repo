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
var whNo,cl;
var sled;
var prodDate;
var restricted;
var rescan;
var cl;
var sloc;
var wh;
var L_values;
var language;
var outputDateFormat;

document.onkeydown = fkey;
//document.onkeypress = fkey;
//document.onkeyup = fkey;

function fkey(e){
	console.log(e);
	if (e.keyCode == 113) {
	 clearInput();
          //   alert("f2 pressed");
        }

	if (e.keyCode == 114) {
	goBack();
            // alert("f3 pressed");
        }

	if (e.keyCode == 115 || e.keyCode == 13) {
	next();
            // alert("f4 pressed");
        }
	
      if (e.keyCode == 113) {
	Clear();
            // alert("f2 pressed");
        }
 }


function onLoading() {

callTimeOut();
plantFromURL = getURLParameter("plant");
siteFromURL = getURLParameter("site");
resourceFromURL = decodeURIComponent(getURLParameter("resource"));
cl =  getURLParameter("client");
sloc= getURLParameter("sloc");
wh= getURLParameter("wh");

language =  getLanguage();
outputDateFormat = dateConvert();
	
	var DateNw = new Date();
	var details = "RF_SU_STATUS_SCAN,RF_UI_STATUS_SCAN,RF_ERR_MSG,RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_UI_LBL_SU,RF_TO_BTCH_STTUS,RF_SSC_LBL,RF_SUSCAN_HDR,RF_GIORDMAT_BK,RF_GIORDMAT_NXT,RF_GIORDMAT_BCP,RF_UI_LABEL_SCAN,RF_GIORDMAT_RESR,RF_ST_UNIT,RF_GI_SCANSC_MAT,RF_GI_SCANSC_DESC,RF_BATCH,RF_SLED,RF_BAT_ST,RF_S_CTG,RF_QTY,RF_UI_STORAGE,RF_SBIN,RF_SLT,RF_MSG_LBL_NW,RF_MSG_LBL_NL,RF_UI_LBLTXT";
	
	L_values =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml");
	console.log("hi"+L_values);
	
	var valQty = getProperty(L_values,'RF_QTY');
	
	var valHome = getProperty(L_values,'RF_SUSCAN_HDR');
	var valBtnNxt = getProperty(L_values,'RF_GIORDMAT_NXT');
	
	var pageTitle = getProperty(L_values,'RF_SU_STATUS_SCAN');
	var valResr = getProperty(L_values,'RF_GIORDMAT_RESR');
	var valBCP = getProperty(L_values,'RF_GIORDMAT_BCP');
	var valMat = getProperty(L_values,'RF_GI_SCANSC_MAT');
	var valDesc = getProperty(L_values,'RF_GI_SCANSC_DESC');
	var valBk = getProperty(L_values,'RF_GIORDMAT_BK');
	var valBatchStatus = getProperty(L_values,'RF_TO_BTCH_STTUS');
	
	var valLblSSCC = getProperty(L_values,'RF_UI_LABEL_SCAN');
	var valBat = getProperty(L_values,'RF_BATCH');
	var valStUnit =  getProperty(L_values,'RF_ST_UNIT');
	var valStBin =  getProperty(L_values,'RF_SBIN');
	var valSLED = getProperty(L_values,'RF_SLED');
	//var valBatchStatus = getProperty(L_values,'RF_BAT_ST');
	var valStCat = getProperty(L_values,'RF_S_CTG');
	var valStorageType = getProperty(L_values,'RF_UI_STORAGE');
	var valTitle = document.title;
	valTitle = getProperty(L_values,'RF_SSC_LBL');
	var valTabTtle = getProperty(L_values,'RF_UI_STATUS_SCAN');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BtnBk").innerHTML = valBk;
	document.getElementById("nxt").innerHTML = valBtnNxt;
	document.getElementById("ssccLbl").innerHTML = valStUnit;
	document.getElementById("resrcLbl").innerHTML = valResr;
	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("descLbl").innerHTML = valDesc;
	//document.getElementById("idOrder").innerHTML = valOrder;
	document.getElementById("matLbl").innerHTML = valMat;
	document.getElementById("scanSU").innerHTML = valLblSSCC;

	document.getElementById("batchLbl").innerHTML = valBat;
	document.getElementById("sledLbl").innerHTML = valSLED;
	document.getElementById("batchStatusLbl").innerHTML = valBatchStatus;
	document.getElementById("sCategoryLbl").innerHTML = valStCat;
	document.getElementById("quantityLbl").innerHTML = valQty;
	document.getElementById("sTypeLbl").innerHTML = valStorageType;
	document.getElementById("sBinLbl").innerHTML=  valStBin;
	document.title = pageTitle;
var labelHDR = document.getElementById("labelHdr");
var valSite = getProperty(L_values,'RF_UI_LBL_SU');
document.getElementById("labelHdr").innerText =valSite+"PLANT-"+plantFromURL;

var sSCCIn = document.getElementById("sSCCIn");

bcpStatus("bcp",L_values);
setInterval(function(){ bcpStatus("bcp",L_values); }, 30000);
}
function next(){

	msgLabel = document.getElementById("errorMsg");
   	ssccNo= document.getElementById("ssuIn").value;
	ssccNo=scanssccno(ssccNo);
	
   if(ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo== "undefined"){

	msgLabel.style.color= "red";
	msgLabel.style.fontweight="bold";
	msgLabel.style.display= "block";
	var valLblScan = getProperty(L_values,'RF_UI_LBLTXT');
	msgLabel.innerText = valLblScan;
	document.getElementById("ssuIn").focus();
    }else{
	rescan=1;
	msgLabel.style.display= "none";
	$("#nxt").hide();
	document.getElementById("scanSU").style.display= "none";
	document.getElementById("ssuIn").style.display= "none";
	document.getElementById("message").style.display= "none";



	formattedSSCC = ssccNo;
	var refresh= new Date();
	var ssccLen = ssccNo.length;

	for(var i=0; i<(20- ssccLen); i++){
	formattedSSCC = "0"+formattedSSCC;
	}
	var stockXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+formattedSSCC+"&Param.7="+language+"&cache="+refresh+"&Content-Type=text/xml");
	var error = $(stockXML).find("ErrorMessage").text();
	var sourceSLoc=$(stockXML).find("STGE_LOC").text();
	var whNo=$(stockXML).find("WHSENUMBER").text();

	if(error =="" || error ==" " || error ==null || error=="---" ){
	
	document.getElementById("ssccLbl").style.display= "block";
	var ssccInFld = document.getElementById("sSCCIn");
	ssccInFld.value=ssccNo;
	ssccInFld.style.display= "block";
	document.getElementById("clr").style.display= "none";
	//document.getElementById("resrcLbl").style.display= "block";
	//var resourceIn = document.getElementById("resourceIn");
	//resourceIn.style.display= "block";
	//resourceIn.value = resourceFromURL;
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
	document.getElementById("clr").style.display="none";
	document.getElementById("batchStatusLbl").style.display="block";
	document.getElementById("batchStatusIn").style.display="block";


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
	batchStat = $(stockXML).find("BATCH_STATUS").text();
	var stat ="";
	if(restricted == "X" || restricted == "x"){
		stat= "X";
	}
	else if(restricted == "---" || restricted == "null" || restricted == "" || restricted == "------"){
		stat = "---";
	}else{
		stat = restricted;
	}
	document.getElementById("batchStatusIn").value = stat;
	matIn.value = matNo;
/*
	var formattedMatNo = matNo;
	var matLen = matNo.length;

	for(var i=0; i<(18- matLen); i++){
	formattedMatNo = "0"+formattedMatNo;
	}
	
*/
	var matXML= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMatDesc&Param.1="+matNo+"&Param.2="+language+"&cache="+refresh+"&Content-Type=text/xml");
	var matDesc=$(matXML).find("MAKTX").text();	
	matDescLbl.value = matDesc;
	
	batchIn.value = batchNo;
	var sled_format = new Date(sled);
	$( "#sledIn" ).datepicker( "setDate", sled_format );
	$( '#sledIn' ).datepicker( "option", "dateFormat", outputDateFormat);

/*
	if(stockCat.toUpperCase()== "S" || restricted.toUpperCase() == "X"){
		sCategoryIn.value = "Restricted";
	}else{
		sCategoryIn.value = "Unrestricted";
	}
	sCategoryIn.value = stockCat;
*/

	if(stockCat == "null" || stockCat =="---" || stockCat == "------" || stockCat == ""){
		sCategoryIn.value = "---";
	}else{
		sCategoryIn.value = stockCat;
	}

	quantitytIn.value = availabelStock;
	var ID="quantitytIn";
	readQuant(availabelStock,ID);

	uOMIn.value = commUOM;
	sTypeIn.value = sourceSType;
	sBinIn.value = sourceSBin;
            }
	else if(error !="" && error !=" " && error !=null && error !="---" ){
	document.getElementById("clr").style.display="none";
	msgLabel.style.color= "red";
	msgLabel.style.fontweight="bold";
	msgLabel.style.display= "block";
	var valSLT = getProperty(L_values,'RF_ERR_MSG');
	msgLabel.innerText = valSLT ;
	$("#nxt").show();
	document.getElementById("scanSU").style.display= "block";
	document.getElementById("ssuIn").style.display= "block";
            }
	
	else{
	document.getElementById("clr").style.display="none";
	msgLabel.style.color= "red";
	msgLabel.style.fontweight="bold";
	msgLabel.style.display= "block";
	var valSLT = getProperty(L_values,'RF_SLT');
	msgLabel.innerText = valSLT ;
	$("#nxt").show();
	document.getElementById("scanSU").style.display= "block";
	document.getElementById("ssuIn").style.display= "block";
        }
     }

}


function goBack(){	

	if(rescan==1)
	reScanSSCC();
	else
	window.history.back();

	//window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/ManufactruingMenu.irpt?plant="+plantFromURL+"&site="+siteFromURL+"&resource="+encodeURIComponent(resourceFromURL)+"&client="+cl),"_self");
}
function clearInput(){
document.getElementById("ssuIn").value="";
}

function reScanSSCC(){

$("#nxt").show();

document.getElementById("scanSU").style.display="block";
document.getElementById("ssuIn").style.display="block";
document.getElementById("ssuIn").value="";
document.getElementById("ssccLbl").style.display="none";
document.getElementById("batchStatusLbl").style.display="none";
document.getElementById("batchStatusIn").style.display="none";
var ssccInFld = document.getElementById("sSCCIn");
	ssccInFld.style.display= "none";
	//var resourceIn = document.getElementById("resourceIn");
	//resourceIn.style.display= "block";
	//resourceIn.value = resourceFromURL;
	document.getElementById("matLbl").style.display= "none";
	var matIn = document.getElementById("matIn");
	matIn.style.display= "none";
	document.getElementById("descLbl").style.display= "none";
	var matDescLbl = document.getElementById("matDescLbl");
	matDescLbl.style.display= "none";
	document.getElementById("batchLbl").style.display= "none";
	var batchIn = document.getElementById("batchIn");
	batchIn.style.display= "none";
	document.getElementById("sledLbl").style.display = "none";
	var sledIn = document.getElementById("sledIn");
	sledIn.style.display= "none";
	document.getElementById("sCategoryLbl").style.display= "none";
	var sCategoryIn = document.getElementById("sCategoryIn");
	sCategoryIn.style.display= "none";
	document.getElementById("quantityLbl").style.display= "none";
	var quantitytIn = document.getElementById("quantitytIn");
	quantitytIn.style.display= "none";

	document.getElementById("sTypeLbl").style.display= "none";
	var sTypeIn = document.getElementById("sTypeIn");
	sTypeIn.style.display= "none";
	document.getElementById("sBinLbl").style.display= "none";
	var sBinIn = document.getElementById("sBinIn");
	sBinIn.style.display= "none";
	var uOMIn = document.getElementById("uOMIn");
	uOMIn.style.display= "none";
	document.getElementById("errorMsg").style.display= "none";

rescan=0;

}  

function Clear(){

document.getElementById("ssuIn").value="";
document.getElementById("ssuIn").focus();
}