var data;
var plant;
var siteFromURL;
var plantFromURL;
var language;
var loginID;

document.onkeydown = fkey;
//document.onkeypress = fkey;
//document.onkeyup = fkey;

function fkey(e){
	console.log(e);
      	if (e.keyCode == 112) {
	manufacturing();
            // alert("f1 pressed");
        }
	if (e.keyCode == 113) {
	 internal();
          //   alert("f2 pressed");
        }
	if (e.keyCode == 114) {
	changeLang();
           // alert("f3 pressed");
        }
	if (e.keyCode == 115 || e.keyCode == 13) {
	doLogout();
          //   alert("f4 pressed");
        }
	
 }

 function loading(){

callTimeOut();
siteFromURL = getURLParameter("site");
plantFromURL= getURLParameter("plant");
//sloc = getURLParameter("sloc");
//wh = getURLParameter("wh");
//cl = getURLParameter("client");

	var timestamp = new Date();
	
	var oLocModel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_LanguageForLocalization&Param.1=READ&Content-type=text/xml");
	toggleDisabled = $(oLocModel).find("O_ToggleDisabled").text();
	var oLocLang = $(oLocModel).find("O_Lang").text();
	var oLocLangCode = $(oLocModel).find("O_LangCode").text();
	var oToLang = $(oLocModel).find("O_ToLang").text();

	var combo = document.getElementById("combo");
	console.log(navigator.language+"------"+navigator.userLanguage);
	var userLang = navigator.language || navigator.userLanguage; 
	language = getLanguage();

	language =  getLanguage();
	
	var DateNw = new Date();
	var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_UI_LABELHDR_MAINMENU,RF_UI_SITE,RF_UI_BCP,RF_UI_H_MENU,RF_UI_F1MANUFACTURING,RF_UI_F2INTERNAL,RF_UI_F9QUIT,RF_UI_F8CHANGESITE";
	
	var L_values =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml");
	console.log("hi"+L_values);
	
	var valHome = getProperty(L_values,'RF_UI_LABELHDR_MAINMENU');
	var valNext = getProperty(L_values,'RF_UI_F1MANUFACTURING');
	var valLogout = getProperty(L_values,'RF_UI_F2INTERNAL');
	var valMenu = getProperty(L_values,'RF_UI_H_MENU');
	var valSite = getProperty(L_values,'RF_UI_SITE');
	var valBCP = getProperty(L_values,'RF_UI_BCP');
	var valQuit = getProperty(L_values,'RF_UI_F9QUIT');
	var valTitle = document.title;
	 valTitle = getProperty(L_values,'RF_UI_LABELHDR_MAINMENU');
	
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("F1_mfg").innerHTML = valNext;
	document.getElementById("idMenu").innerHTML = valMenu;
	document.getElementById("idSite").innerHTML = valSite;
	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("F1_int").innerHTML = valLogout;
	
	var bOlngtId = document.getElementById("cOLang");
	var bEnlngtId = document.getElementById("cEnLang");

	var disable=toggleDisabled=="false"?false:true;

	if(oLocLangCode == "en"){
		bOlngtId.innerHTML = "F3 "+oToLang;
		bOlngtId.style.display = "block";
		bEnlngtId.style.display = "none";
		bOlngtId.disabled = disable;

	}else{
		bOlngtId.style.display = "none";
		bEnlngtId.style.display = "block";
		bOlngtId.disabled = disable;

	}
	var ClientModel=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&d=" + DateNw + "&Content-Type=text/xml", "", false);
	var plantLocale = $(ClientModel).find("PLANT").text();
	cl = $(ClientModel).find("CLIENT").text();

	/*var xmldoc =loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetPlant_SLOC_WH&d="+DateNw+"&Content-Type=text/xml");
	var Plant_WH= $(xmldoc).find("Key").text();
	alert(Plant_WH);*/

var site=document.getElementById("siteArea");
site.value="PLANT-"+ plantLocale;
plant = plantLocale;

var flag = bcpStatus("bcp",L_values);     


loginID = document.getElementById("login").value;

var UMEGroup = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_CheckUserAccess&Param.1="+loginID+"&d="+DateNw+"&Content-Type=text/xml");
var checkFlag = $(UMEGroup).find("Flag").text();

if(checkFlag==1){
			$("#F1_mfg").hide();
		}	



//////////////////////////////////////////////////////////////////////////////////////BUSINESS METRICS//////////////////////////////////////////////////////////////////////////////////////
                        
         var  oBusinessMetricsModel=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RDDevice_CountOfCallsOfScreen&d="+DateNw+"&Content-Type=text/xml");
		
           ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
} 

function loadXMLDoc(filename)
{
var resp;
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	resp = xhttp.responseText;
	}
};
xhttp.open("GET", filename, false);
xhttp.send();

return resp;
}

function manufacturing(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/ManufactruingMenu.irpt?plant="+ plant+"&client="+cl),"_self");
}
function internal(){
	window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/SUMainMenu.irpt?plant="+plant+"&client="+cl),"_self");
}

function doLogout(){
window.open("/XMII/Illuminator?service=logout&target=/XMII/CM/MaterialHandling/RFDevice/Page/MainMenu.irpt","_self");
}
function changeLang(){
var proceed = toggleDisabled == "true"?false:true;

if(proceed){
	var oLocModel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_LanguageForLocalization&Param.1=UPDATE&Content-type=text/xml");
	var success = $(oLocModel).find("O_Status").text();

	if(success == "SUCCESS"){

		window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/MainMenu.irpt"),"_self");
	}
}

}