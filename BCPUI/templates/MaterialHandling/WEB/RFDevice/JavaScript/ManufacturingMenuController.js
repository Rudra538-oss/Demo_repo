var xmldoc;
var resource;
var plantSite;
var siteFromURL;
var plantFromURL;
var nodeID;
var sloc;
var wh,cl;
var language;

document.onkeydown = fkey;
//document.onkeypress = fkey
//document.onkeyup = fkey;

function fkey(e){
	console.log(e);
      	if (e.keyCode == 112) {
	prodDeclaration();
            // alert("f1 pressed");
        }
	if (e.keyCode == 113) {
	pdReversal();
           //  alert("f2 pressed");
        }
	if (e.keyCode == 120) {
	goBack();
	
         //    alert("f9 pressed");
        }
	if (e.keyCode == 115) {
	consumption();
	
          //   alert("f4 pressed");
        }
	if (e.keyCode == 116) {
	consumptionRev();
	
          //   alert("f5 pressed");
        }
	if (e.keyCode == 117) {
	scanStatus();
           //  alert("f6 pressed");
        }
 }

function onLoading() {

callTimeOut();
plantFromURL = getURLParameter("plant");
siteFromURL = getURLParameter("site");
//resource = decodeURIComponent(getURLParameter("resource"));
nodeID = getURLParameter("nodeID");	
sloc = getURLParameter("sloc");
wh = getURLParameter("wh");
cl = getURLParameter("client");
language =  getLanguage();
	
	var DateNw = new Date();
	var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_UI_LABEL_MFGMENU,RF_UI_MFGBCP,RF_UI_SITE,RF_UI_LABEL_RESR,RF_UI_H3_MFG,RF_UI_LABEL_F1_PROD_DEC,RF_UI_LABEL_F1_PROD_REV,RF_UI_LABEL_F3_CON,RF_LINE,RF_UI_LABEL_F4_CON_REV,RF_UI_LABEL_F5_SCAN,RF_UI_LABEL_F9_BK,RF_UI_GoBackBtn";
	
	var L_values =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml");
	console.log("hi"+L_values);
	
	var valHome = getProperty(L_values,'RF_UI_LABEL_MFGMENU');
	//var valNext = getProperty(L_values,'RF_UI_F3BACK');
	var valLogout = getProperty(L_values,'RF_UI_LABEL_F1_PROD_DEC');
	//var valMenu = getProperty(L_values,'RF_UI_LABEL_RESR');
	var valSite = getProperty(L_values,'RF_UI_SITE');
	var valPR = getProperty(L_values,'RF_UI_LABEL_F1_PROD_REV');
	var valBCP = getProperty(L_values,'RF_UI_MFGBCP');
	var valQuit = getProperty(L_values,'RF_UI_H3_MFG');
	var valC = getProperty(L_values,'RF_UI_LABEL_F3_CON');
	var valCR = getProperty(L_values,'RF_UI_LABEL_F4_CON_REV');
	var valSS = getProperty(L_values,'RF_UI_LABEL_F5_SCAN');
	var valBk = getProperty(L_values,'RF_UI_GoBackBtn');
	var valTitle = document.title;
	 valTitle = getProperty(L_values,'RF_LINE');
	//alert(valTitle+ ":"+valHome);
	//document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerText =valSite +":"+"PLANT-"+plantFromURL;
	document.getElementById("idPD").innerHTML = valLogout;
	document.getElementById("idPR").innerHTML = valPR;
	// document.getElementById("idSite").innerHTML = valSite;
	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("idC").innerHTML = valC;
	document.getElementById("idMfg").innerHTML = valQuit;
	document.getElementById("idCR").innerHTML = valCR;
	document.getElementById("idSS").innerHTML = valSS;
	document.getElementById("idBk").innerHTML = valBk;
//var resourceIn=document.getElementById("resourceIn");
//resourceIn.value=resource;

bcpStatus("bcp",L_values);
setInterval(function(){ bcpStatus("bcp",L_values); }, 30000);
}


function scanStatus(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/MaterialStatus.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}

function consumptionRev(){
window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GIOrderMaterial.irpt?plant="+plantFromURL+"&type=REV&client="+cl),"_self");

}

function consumption(){
window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GIOrderMaterial.irpt?plant="+plantFromURL+"&type=CON&client="+cl),"_self");
}

function pdReversal(){

window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/ProductionReversal.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}

function prodDeclaration(){
	// alert("res:"+resource);
	// alert(plantFromURL);
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/StatusOrderMat.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}

function goBack(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/MainMenu.irpt?plant="+plantFromURL+"&client="+cl),"_self");
}
