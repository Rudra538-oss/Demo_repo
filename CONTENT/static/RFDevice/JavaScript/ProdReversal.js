var siteFromURL;
var plantFromURL;
var nodeID;
var resource;
var resourceGR;
var data,order,material,status,material1;
var matTrim,matr,ord,matData,su,prod_type;
var matr1,desTrim;
var sloc;
var wh,cl;
var order,ord;
var language;
var L_values,hu_resp;
var NonBatchManagedFlag;

document.onkeydown = fkey;
//document.onkeypress = fkey;
//document.onkeyup = fkey;

function fkey(e){
	console.log(e);
	if (e.keyCode == 113) {
	 doClear();
          //   alert("f2 pressed");
        }

	if (e.keyCode == 114) {
	doBack();
            // alert("f3 pressed");
        }
	if (e.keyCode == 115  || e.keyCode == 13) {
	doNext();
           // alert("f4 pressed");
        }
	
 }

function onLoading() {

callTimeOut();
plantFromURL = getURLParameter("plant");
cl = getURLParameter("client");
language =  getLanguage();
	
	var DateNw = new Date();
	var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_PR_LBL,RF_PR_BK,RF_PR_NXT,RF_PR_RESR,RF_PR_BCP,RF_PR_ST,RF_PR_OR,RF_PR_MA,RF_PR_BA,RF_PR_SSCC,RF_PR_SITE,CustomGR_alert_7,ALERT_NO_REC_EX,ALERT_MAT_ERR,ALERT_OR_ERR,ALERT_ST_ERR,ALERT_SSCC,CustomGR_alert_26, GR_EWM_Msg_RF";
	
	L_values =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml");
	console.log("hi"+L_values);
	
	var valQty = getProperty(L_values,'RF_QTY');
	
	var valHome = getProperty(L_values,'RF_PR_LBL');
	var valBtnNxt = getProperty(L_values,'RF_PR_NXT');
	
	var valResr = getProperty(L_values,'RF_PR_RESR');
	var valBCP = getProperty(L_values,'RF_PR_BCP');
	var valMat = getProperty(L_values,'RF_PR_MA');

	var valBk = getProperty(L_values,'RF_PR_BK');

	
	var valLblSSCC = getProperty(L_values,'RF_PR_SSCC');
	var valStatus = getProperty(L_values,'RF_PR_ST');
	var valOrder =  getProperty(L_values,'RF_PR_OR');
	
	var valBatchStatus = getProperty(L_values,'RF_PR_BA');
	var valSite = getProperty(L_values,'RF_PR_SITE');
	
	var valTitle = document.title;
	valTitle = getProperty(L_values,'RF_PR_LBL');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BtnBk").innerHTML = valBk;
	document.getElementById("BtnNxt").innerHTML = valBtnNxt;
	document.getElementById("matL").innerHTML = valMat;
	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("idOrder").innerHTML = valOrder;
	document.getElementById("batchLabel").innerHTML = valBatchStatus;
	document.getElementById("ssccL").innerHTML = valLblSSCC;
document.getElementById("labelHdr").innerText =valSite +"PLANT-"+plantFromURL;
document.getElementById("BtnNxt").disabled=true;
bcpStatus("BCPArea",L_values);
setInterval(function(){ bcpStatus("BCPArea",L_values); }, 30000);

populateDropdownData("linedrp","DESCRIPTION","NODE_ID","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetLines&Param.1="+plantFromURL+"&Param.2="+language+"&Content-Type=text/xml");

}

function doLineDrp(){
var order = document.getElementById("order");
var nodeID = document.getElementById("linedrp").value;
var day1=document.getElementById("inputDayId").value;
var DateNw = new Date();

populateDropdownData("order","Order","Order","/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_ProcessOrderDetails&Param.1="+cl+"&Param.2="+nodeID+"&Param.3="+plantFromURL+"&Param.4="+language+"&Param.5="+day1+"&d="+DateNw+"&Content-Type=text/xml");
} 

function doOrder(){
nodeID=document.getElementById("linedrp").value;
var material = document.getElementById("material");
order = document.getElementById("order").value;

populateDropdownData("material","Value","Key","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterials_GR&Param.1="+order+"&Param.2="+language+"&Content-Type=text/xml");

}

function doMaterial() {
var DateNw=new Date();
var mtr=document.getElementById("material");
material1 = mtr.options[mtr.selectedIndex].text;
su=mtr.value.split("---")[2];
prod_type = mtr.value.split("---")[1];

matTrim=material1.split(" ");
matr=matTrim[0];
matr1=matr;

var mvt_type_declare= prod_type=="BYPRODUCT" ? "531" : "101"; 
var mvt_type_reverse= prod_type=="BYPRODUCT" ? "532" : "102"; 

desTrim=material1.slice(9);
if(order=="" || order== null || order== undefined ){
	order=POManual;
}

var ordLength = order.length;
		for(var p=0; p<(12-ordLength); p++){
			order = "0"+order;
		}

var Length = matr.length;

		for(var p=0; p<(18-Length); p++){
			matr = "0"+matr;
		}


if(su=="X"){
$('#batchLabel').hide();
$('#batch').hide();
$('#ssccL').show();
$('#ssccArea').show();
populateDropdownData("ssccArea","Value","Key","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetSSCC_Reversal&Param.1="+order+"&Param.2="+matr1+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&d="+DateNw+"&Content-Type=text/xml");

}

else if(su=="---" || su==""){
$('#ssccL').hide();
$('#ssccArea').hide();
var nonBatchManagedModelModel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetBatchManagedDetails&Param.1=" + plantFromURL + "&Param.2=" +cl+ "&Param.3=" +matr1+ "&d=" + DateNw + "&Content-Type=text/xml");
NonBatchManagedFlag = $(nonBatchManagedModelModel).find('XCHPF').text();

populateDropdownData("batch","Value","Key","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetBatch_GRReversal&Param.1="+order+"&Param.2="+matr1+"&Param.3="+mvt_type_declare+"&Param.4="+mvt_type_reverse+"&Param.5="+language+"&Param.6="+cl+"&d="+DateNw+"&Content-Type=text/xml");
var bchNo=document.getElementById("batch");
var length = bchNo.options.length;
console.log(bchNo.options);
console.log(document.getElementById("batch").value);
if(length >1)
{
$('#batchLabel').show();
$('#batch').show();
if (NonBatchManagedFlag == "X") {
		document.getElementById("batch").disabled = false;
		}
		else{
		bchNo.disabled = true;
		try{
			bchNo.options[2].selected=true;
		}catch(e){}
		}
}
// alert("BN:"+bchNo);
else{
var valAlertNoRecordExists= getProperty(L_values,'ALERT_NO_REC_EX');
alert(valAlertNoRecordExists);
$('#batchLabel').hide();
$('#batch').hide();
}

}

}

function OnManualScanOfPO() {
var DateNw = new Date();
POManual = document.getElementById("POManualScan").value;

if(POManual != ""){
	var GetNodeID = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_ProcessOrderDetails&Param.1="+cl+"&Param.3="+plantFromURL+"&Param.6="+POManual+"&d=" + DateNw + "&Content-Type=text/xml");
 	nodeID=$(GetNodeID).find("NodeID").text();
	var material = document.getElementById("material");
	populateDropdownData("material","Value","Key","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterials_GR&Param.1="+POManual+"&Param.2="+language+"&Content-Type=text/xml");

		}
}

function POManualNotBlank(){
POManual = document.getElementById("POManualScan").value;
if(POManual !=""){
	document.getElementById("linedrp").disabled=true;
	document.getElementById("order").disabled=true;
	document.getElementById("inputDayId").disabled=true;
}
else{
	document.getElementById("linedrp").disabled=false;
	document.getElementById("order").disabled=false;
	document.getElementById("inputDayId").disabled=false;
	}
}

function selectLine(){
	document.getElementById("POManualScan").disabled=true;
	var lineDropdown=document.getElementById("linedrp").value;
	if(lineDropdown==""){
		document.getElementById("POManualScan").disabled=false;
	}
}

function handleDayChange(){
	nodeID=document.getElementById("linedrp").value;
		if(nodeID==""){
	}
	else {
		doLineDrp();
	}
}


function MaterialNotBlank(){
	document.getElementById("BtnNxt").disabled=false;
	var materialSelection=document.getElementById("material").value;
	if(materialSelection==""){
		document.getElementById("BtnNxt").disabled=true;
	}
}

function doBatch() {

}

function doNext() {
var DateNw=new Date();
var sLoc_whNo_source ="";
var materialVal = document.getElementById("material").value;
var orderVal = document.getElementById("order").value;
var ssccVal = document.getElementById("ssccArea").value;

if(orderVal=="" || orderVal== null || orderVal== undefined ){
	orderVal=POManual;
}

hu_resp = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + matr1 + "&Param.2=" + plantFromURL + "&Param.3="+cl+"&Param.4=" + order + "&d=" + DateNw + "&Content-Type=text/xml");
    wh=$(hu_resp).find("WHNumber").text();
if(orderVal.length>0){
   var nwOrd=orderVal;
   for(var p=0; p<(12-orderVal.length); p++){
			nwOrd = "0"+nwOrd;
		}
   var ogetSlocAndWh= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+nwOrd+"&Param.2=" +cl+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml");   
   var storageLoc = $(ogetSlocAndWh).find("LGORT").text();
   var ogetSource= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&d=" + DateNw + "&Content-Type=text/xml");
   sLoc_whNo_source = $(ogetSource).find("source").text();
}

if(orderVal=="" || orderVal== null || orderVal== undefined ){
var valAlertNoOrder = getProperty(L_values,'ALERT_OR_ERR');
alert(valAlertNoOrder);
}
else if(sLoc_whNo_source== "EWM"){
     alert(getProperty(L_values,'GR_EWM_Msg_RF'));
}
else if(materialVal=="" || materialVal== null || materialVal== undefined ){
var valAlertMatErr = getProperty(L_values,'ALERT_MAT_ERR');
alert(valAlertMatErr);
 
}
else if(wh=="" || wh=="-" || wh=="---"){
alert(getProperty(L_values,'CustomGR_alert_26'));
}
else {
var ssccField=document.getElementById("ssccArea").value;
var batchNumber=document.getElementById("batch").value;
if (ssccField!="") {
var flag="SU";
if(ssccVal=="" || ssccVal== null || ssccVal== undefined ){
var valAlertSSCC = getProperty(L_values,'ALERT_SSCC');
alert(valAlertSSCC);
}
else{
window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GRReversal.irpt?order="+order+"&material="+matr1+"&plant="+plantFromURL+"&nodeID="+ nodeID+"&sscc="+ssccField+"&flag="+flag+"&description="+desTrim+"&product="+prod_type+"&client="+cl),"_self");
}
}
else if(ssccField=="" && batchNumber!="") {
var flag="NONSU";
var bchNo=document.getElementById("batch");
 batch_key = bchNo.value;
batchNumber=bchNo.options[bchNo.selectedIndex].text;
window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GRReversal.irpt?order="+order+"&material="+matr1+"&plant="+plantFromURL+"&nodeID="+ nodeID+"&batch="+batchNumber+"&flag="+flag+"&description="+desTrim+"&batch_details="+batch_key+"&product="+prod_type+"&client="+cl),"_self");
}
}
}

function doBack(){
window.history.back();
}
function changeStyle(elementID){
	try{
	document.getElementById(elementID).options[0].style.fontSize = "60px";
	}catch(err){}
}