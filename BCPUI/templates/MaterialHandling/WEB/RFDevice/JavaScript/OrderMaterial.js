// var bcpXML;
var xmlresource;
var data;
var xmlstatus;
var xmlorder;
var plant;
var resourceGR;
var resource;
var siteFromURL;
var plantFromURL;
var nodeID,material1;
var ord;
var sloc;
var wh,cl;
var L_values,DateNw,POValue,POManual;
var language,hu_resp;
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

function loadStatus(){

callTimeOut();
plantFromURL = getURLParameter("plant");
cl = getURLParameter("client");
language =  getLanguage();
	
	var DateNw = new Date();
	var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_PD_LBL,RF_PD_HDR,RF_PD_BK,RF_PD_NXT,RF_PD_RESR,RF_PD_BCP,RF_PD_STATUS,RF_PD_SO,RF_PD_SELMAT,RF_PD_SITE,Print_Select_Status,RF_PR_OR,RF_PR_MA,RF_PD_ALRT1,RF_PD_ALRT2,RF_PD_ALRT3,ALERT_ST_ERR,ALERT_OR_ERR,ALERT_MAT_ERR,CustomGR_alert_26, GR_EWM_Msg_RF";
	
	 L_values =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml");
	console.log("hi"+L_values);
	
	
	
	var valHome = getProperty(L_values,'RF_PD_HDR');
	var valBtnNxt = getProperty(L_values,'RF_PD_NXT');
	
	var valResr = getProperty(L_values,'RF_PD_RESR');
	var valBCP = getProperty(L_values,'RF_PD_BCP');
	var valMat = getProperty(L_values,'RF_PD_SELMAT');

	var valBk = getProperty(L_values,'RF_PD_BK');

	
	
	//var valStatus = getProperty(L_values,'RF_PD_STATUS');
	var valOrder =  getProperty(L_values,'RF_PD_SO');
	

	var valSite = getProperty(L_values,'RF_PD_SITE');
	
	var valTitle = document.title;
	valTitle = getProperty(L_values,'RF_PD_LBL');
	// alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BtnBk").innerHTML = valBk;
	document.getElementById("nxt").innerHTML = valBtnNxt;
	//document.getElementById("btn_nonsu").innerHTML = valNonSU;
	//document.getElementById("idResr").innerHTML = valResr;
	document.getElementById("idBCP").innerHTML = valBCP;
	//document.getElementById("idStatus").innerHTML = valStatus;
	document.getElementById("idOrder").innerHTML = valOrder;
	document.getElementById("matL").innerHTML = valMat;
	
document.getElementById("labelHdr").innerText =valSite +"PLANT-"+plantFromURL;
document.getElementById("nxt").disabled=true;
bcpStatus("BCPArea",L_values);
setInterval(function(){ bcpStatus("BCPArea",L_values); }, 30000);

populateDropdownData("linedrp","DESCRIPTION","NODE_ID","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetLines&Param.1="+plantFromURL+"&Param.2="+language+"&Content-Type=text/xml");

}

function doLineDrp(){
var order = document.getElementById("order");
var nodeID = document.getElementById("linedrp").value;
var day1=document.getElementById("inputDayId").value;
var DateNw = new Date();

populateDropdownData("order","Order","Order","/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_ProcessOrderDetails&Param.1="+cl+"&Param.2="+nodeID+"&Param.3="+plantFromURL+"&Param.4="+language+"&Param.5="+day1+"&Param.6=&d="+DateNw+"&Content-Type=text/xml");
}

function doOrder(){
nodeID=document.getElementById("linedrp").value;
var material = document.getElementById("material");
var order = document.getElementById("order").value;

populateDropdownData("material","Value","Key","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterials_GR&Param.1="+order+"&Param.2="+language+"&Content-Type=text/xml");

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
	if(nodeID!="" && nodeID!=null){
		doLineDrp();
	}
}

function MaterialNotBlank(){
	document.getElementById("nxt").disabled=false;
	var materialSelection=document.getElementById("material").value;
	if(materialSelection==""){
		document.getElementById("nxt").disabled=true;
	}
}

function doNext(){
var DateNw= new Date();
var materialVal = document.getElementById("material").value;
//var statusVal = document.getElementById("status").value;
var orderVal = document.getElementById("order").value;
ord=orderVal;
var ordLength = orderVal.length;

		for(var p=0; p<(12-ordLength); p++){
			ord = "0"+ord;
		}
if(orderVal=="" || orderVal== null || orderVal== undefined ){
	orderVal=POManual;
}

if(orderVal=="" || orderVal== null || orderVal== undefined ){
var valAlertNoOrder = getProperty(L_values,'ALERT_OR_ERR');
alert(valAlertNoOrder);
}

else if(materialVal=="" || materialVal== null || materialVal== undefined ){
var valAlertMatErr = getProperty(L_values,'ALERT_MAT_ERR');
alert(valAlertMatErr);
 
}

else {
var order = document.getElementById("order").value;
//var status = document.getElementById("status").value;
var material1 = document.getElementById("material");
var material = material1.options[material1.selectedIndex].text;
var mat=material1.value;

if(order=="")
{
	order=POManual;
}

if(order=="")
{
var ErrAlertSelOrder = getProperty(L_values,'RF_PD_ALRT2');
//var ErrAlertSelOrder = getProperty(L_values,'RF_PR_OR');

alert(ErrAlertSelOrder);
}
else if(material=="")
{
var ErrAlertSelMaterial = getProperty(L_values,'RF_PD_ALRT3');
alert(ErrAlertSelMaterial);
}
else
{
   var nwOrd=order;
   for(var p=0; p<(12-order.length); p++){
			nwOrd = "0"+nwOrd;
		}
   var ogetSlocAndWh= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+nwOrd+"&Param.2=" +cl+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml");   
   var storageLoc = $(ogetSlocAndWh).find("LGORT").text();
   var ogetSource= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&d=" + DateNw + "&Content-Type=text/xml");
   var sLoc_whNo_source = $(ogetSource).find("source").text();
   if(sLoc_whNo_source== "EWM"){
     alert(getProperty(L_values,'GR_EWM_Msg_RF'));
   } else{
     var prod_type = mat.split("---")[1];
     window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GoodsReciept.irpt?order="+order+"&material="+material+"&plant="+plantFromURL+"&nodeID="+ nodeID+"&product="+prod_type+"&client="+cl),"_self");
   }
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
function doBack(){
window.history.back();
}
function changeStyle(elementID){

	try{
	document.getElementById(elementID).options[0].style.fontSize = "60px";
	}catch(err){}
}

