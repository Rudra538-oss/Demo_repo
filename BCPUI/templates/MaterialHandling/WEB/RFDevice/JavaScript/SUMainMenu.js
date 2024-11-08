var xmldoc;
var resource;
var plantSite;
var siteFromURL;
var plantFromURL;
var sloc,wh,client;
var language;
var header;
var MsgType = [];
var WMSUMO_true = 0;
var WMTORD_true = 0;
var Final_NodeValue;

document.onkeydown = fkey;
//document.onkeypress = fkey
//document.onkeyup = fkey;

function fkey(e){
	console.log(e);
      	if (e.keyCode == 112 || e.keyCode == 117) {
	moveSU(event);
            // alert("f1 pressed");
        }
	if (e.keyCode == 113) {
	moveSUToNonSU();
             //alert("f2 pressed");
        }
	if (e.keyCode == 120) {
	goBack();
           //  alert("f9 pressed");
        }
	if (e.keyCode == 115) {
	stockStatusChange();
            // alert("f4 pressed");
        }
	if (e.keyCode == 116) {
	splitSU();
            // alert("f5 pressed");
        }
	if (e.keyCode == 118) {
	scanStatus();
           //  alert("f7 pressed");
        }
 }

function onLoading() {
callTimeOut();
plantFromURL = getURLParameter("plant");
siteFromURL = getURLParameter("site");
sloc = getURLParameter("sloc");
wh = getURLParameter("wh");
cl = getURLParameter("client");

language= getLanguage();
	
	var DateNw = new Date();
	var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_UI_LABEL_H3 ,RF_UI_LABEL_HDR_SU,RF_UI_SU_BCP ,RF_UI_SU_SITE,RF_UI_LABEL_F1_ST_UNIT,RF_UI_LABEL_F1_UNIT_NON_SU,RF_UI_LABEL_F6_ST_UNIT_WMTORD,RF_UI_LABEL_STATUS_CHANGE,RF_UI_LABEL_F1_ST_UNIT_WMSUMO,RF_UI_LABEL_STORAGE_UNIT,RF_UI_SU_F9,RF_UI_GoBackBtn,RF_UI_LABEL_F7_STATUSSCAN";
	
	var L_values =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml");
	console.log("hi"+L_values);
	
             var valSuWmtord=getProperty(L_values,'RF_UI_LABEL_F6_ST_UNIT_WMTORD');
            var valSuWmSumo=getProperty(L_values,'RF_UI_LABEL_F1_ST_UNIT_WMSUMO');
	var valHome = getProperty(L_values,'RF_UI_LABEL_HDR_SU');
	//var valStUnit = getProperty(L_values,'RF_UI_LABEL_F1_ST_UNIT');
	var valNonSu = getProperty(L_values,'RF_UI_LABEL_F1_UNIT_NON_SU');
	var valStatusChng = getProperty(L_values,'RF_UI_LABEL_STATUS_CHANGE');
	var valSite = getProperty(L_values,'RF_UI_SU_SITE');
	var valBCP = getProperty(L_values,'RF_UI_SU_BCP');
	var valUnit = getProperty(L_values,'RF_UI_LABEL_STORAGE_UNIT');
	var valStatusScan = getProperty(L_values,'RF_UI_LABEL_F7_STATUSSCAN');
	var valBk = getProperty(L_values,'RF_UI_GoBackBtn');
	var valTitle = document.title;
	 valTitle = getProperty(L_values,'RF_UI_LABEL_H3');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("Btnmove1").innerHTML = valSuWmtord;
	document.getElementById("Btnmove").innerHTML = valSuWmSumo;
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BtnBk").innerHTML = valBk;
	document.getElementById("BtnUnit").innerHTML = valUnit;
	document.getElementById("idSite").innerHTML = valSite;
	document.getElementById("idBCP").innerHTML = valBCP;
	//document.getElementById("Btnmove").innerHTML = valStUnit;
	document.getElementById("idMfg").innerHTML = valTitle;
	document.getElementById("BtnNonSu").innerHTML = valNonSu;
	document.getElementById("BtnStock").innerHTML = valStatusChng;
	document.getElementById("BtnStatusScan").innerHTML = valStatusScan;

var plantDescXML =  loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CustomMenu/QueryTemplates/SQLQ_GetPlantDescbyPlantID&Param.2=" +plantFromURL+"&Content-Type=text/xml");
var plantDesc=$(plantDescXML).find("DESCRIPTION").text();

var siteIn=document.getElementById("siteIn");
siteIn.value="PLANT-"+plantFromURL + " " + plantDesc;

var MsgTypeXML = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_TOMessageType&Param.1=0&OutputParameter=O_MessageType&Content-Type=text/xml");

$(MsgTypeXML).find("Row").each(
        function (i,e)
        {
            var nodeName = $(e).find("NodeName").text();
            var nodeValue =$(e).find("NodeValue").text();

	if(nodeValue == "true" && nodeName == "WMSUMO"){
		WMSUMO_true = 1;
	}
	else if(nodeValue == "true" && nodeName == "WMTORD"){
		WMTORD_true = 1;
	}
	Final_NodeValue = WMSUMO_true+":"+WMTORD_true;
	
      });

	if(Final_NodeValue == "1:1"){
		document.getElementById("Btnmove").style.display='block';
		document.getElementById("Btnmove1").style.display='block';
	}
	else if(Final_NodeValue == "0:0"){
		document.getElementById("Btnmove").style.display='none';
		document.getElementById("Btnmove1").style.display='none';
	}
	else if(Final_NodeValue == "1:0"){
		document.getElementById("Btnmove").style.display='block';
		document.getElementById("Btnmove1").style.display='none';
	}
	else if(Final_NodeValue == "0:1"){
		document.getElementById("Btnmove1").style.display='block';
		document.getElementById("Btnmove").style.display='none';
	}



/* var MessageTypes = $(MsgTypeXML).find("O_TransferTypeRF").text();
var Split_Number = MessageTypes.split("-")[0];
var Split_MsgName =  MessageTypes.split("-")[3];

if(Split_Number == "1" && Split_MsgName == "WMSUMO"){
		document.getElementById("Btnmove1").style.display='none';
	}

else if(Split_Number == "1" && Split_MsgName == "WMTORD"){
		document.getElementById("Btnmove").style.display='none';
	}
else if(Split_Number == "2"){
		document.getElementById("Btnmove").style.display='block';
		document.getElementById("Btnmove1").style.display='block';
	}	
else{
	document.getElementById("Btnmove1").style.display='none';
	document.getElementById("Btnmove").style.display='none';
} */
		



/*var WMSUMO_exists = MsgTypeXML.getElementsByTagName("NodeValue")[0].innerHTML;
//alert(WMSUMO_exists);
var WMTORD_exists = MsgTypeXML.getElementsByTagName("NodeValue")[1].innerHTML;
//alert(WMTORD_exists);

if(WMSUMO_exists=="" && WMTORD_exists==""){
	document.getElementById("Btnmove").style.display='none';
	document.getElementById("Btnmove1").style.display='none';
}
else if(WMSUMO_exists==""){
	document.getElementById("Btnmove").style.display='none';
}
else if(WMTORD_exists==""){
	document.getElementById("Btnmove1").style.display='none';
}
else{
}*/

/*var checkBox1SelectionCheck = $(MsgTypeXML).find("NodeValue").text();
alert(checkBox1SelectionCheck);
//console.log(checkBox1SelectionCheck);
if(checkBox1SelectionCheck="truetrue"){
	//document.getElementById("Btnmove").style.display='none';
}

if(checkBox1SelectionCheck="true"){
alert("Hi");
}*/

bcpStatus("bcp",L_values);
setInterval(function(){ bcpStatus("bcp",L_values); }, 30000);
}
function moveSU(event){

var btnid=event.target.id;
if(btnid=="Btnmove")
{
header="SU_SU WMSUMO";
}

else{
header="SU_SU WMTORD";
}
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/SUScan.irpt?plant="+plantFromURL+"&headertype="+header+"&client="+cl),"_self");
}
function moveSUToNonSU(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/NonSUMove.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}
function stockStatusChange(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/StockStatusChange.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}
function splitSU(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/SplitSU.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}
function scanStatus(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/MaterialStatus.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}
function goBack(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/MainMenu.irpt?plant="+plantFromURL+"&client="+cl),"_self");
	//window.open("/XMII/CM/MaterialHandling/RFDevice/Page/home.irpt","_self");
}
