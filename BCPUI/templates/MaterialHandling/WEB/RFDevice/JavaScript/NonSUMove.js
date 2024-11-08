var xmldoc;
var resource;
var plantSite;
var siteFromURL;
var plantFromURL;
var ssccNo;
var buttonBackIdentifier=1;
var sloc;
var wh;
var cl;
var L_values;
var res=false;
var language;
var verifID;
var verifID1;
var InputStype;
var InputSbin;
var InputSbin1;
var dropdownFlag;
var storageType ;


document.onkeydown = fkey;
//document.onkeypress = fkey
//document.onkeyup = fkey;

function fkey(e){
	console.log(e);
      	if (e.keyCode == 115 || e.keyCode == 13) {
	
	if($('#nxtBtton').is(":visible") == true){
	next();
	}else if($('#moveSUBtton').is(":visible") == true){
	moveSU();
	}else{
	}
             //alert("f4 pressed");
        }
	if (e.keyCode == 113) {
	Clear();
            // alert("f2 pressed");
        }
	if (e.keyCode == 114) {
	goBackNow();
            // alert("f3 pressed");
        }
/*
	if (($('#moveSUBtton').is(":visible") == true && e.keyCode == 115) || ($('#moveSUBtton').is(":visible") == true && e.keyCode == 13)) {
	moveSU();
           //  alert("f4 pressed");
        }
*/
}

function onLoading() {
callTimeOut();
buttonBackIdentifier = 1;
plantFromURL = getURLParameter("plant");
siteFromURL = getURLParameter("site");
sloc = getURLParameter("sloc");
wh = getURLParameter("wh");
cl = getURLParameter("client");

var labelHDR = document.getElementById("labelHdr");
document.getElementById("labelHdr").innerText ="Site: " +siteFromURL;

	language =  getLanguage();
	
	var DateNw = new Date();
	var details = "RF_BCP_STATUS_ON,RF_BCP_STATUS_AUTO_ON,RF_BCP_STATUS_OFF,RF_MSG_BCP_OFF_ER,RF_STORAGE_UNIT_NSU,RF_UI_NONSU ,TO_MSG4,RF_UI_BCP,RF_UI_LBL_NONSU,RF_BTN_CLR,RF_BTN_NXT,RF_F4BTN_NXT,RF_BTN_BK,RF_LBL_ SCAN,RF_SSCC_LBL,RF_STYPE,RF_SBIN,RF_LBL_OR,RF_LBL_VERIFY,RF_UI_SITE,RF_MSG_LABEL,RF_ERR_MSG,RF_MSG_LBL_NL,RF_MSG_LBL_NW,RF_ENTER_BIN_OR_TYP,RF_MSG_LBL_ALLOWN,RF_MSG_LBL_F,RF_MSG_LBL_NA,RF_MSG_1,RF_MSG_2,RF_TO_F,RF_ERR_TYP";
	
	 L_values =loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+language+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml"));
	console.log("hi"+L_values);
	
	var valHome = getProperty(L_values,'RF_STORAGE_UNIT_NSU');
	var valNxt = getProperty(L_values,'RF_BTN_NXT');
	var valF4Nxt = getProperty(L_values,'RF_F4BTN_NXT');
	var valClr = getProperty(L_values,'RF_BTN_CLR');
	var valSite = getProperty(L_values,'RF_UI_SITE');
	var valBCP = getProperty(L_values,'RF_UI_BCP');
	var valLblScan = getProperty(L_values,'RF_LBL_ SCAN');
	var valBk = getProperty(L_values,'RF_BTN_BK');
	var valLblSSCC = getProperty(L_values,'RF_SSCC_LBL');
	var valErMsg = getProperty(L_values,'RF_ERR_MSG');
	
	var valStTyp = getProperty(L_values,'RF_STYPE');
	var valStBin = getProperty(L_values,'RF_SBIN');
	var valOr = getProperty(L_values,'RF_LBL_OR');
	
	var valRFVerify = getProperty(L_values,'RF_LBL_VERIFY');
	var valTitle = document.title;
	 valTitle = getProperty(L_values,'RF_UI_NONSU');
	//alert(valTitle+ ":"+valHome);
	document.getElementById("title").innerHTML = valTitle;
	document.getElementById("labelHdr").innerHTML = valHome;
	document.getElementById("BtnBk").innerHTML = valBk;
	document.getElementById("errorMsg").innerHTML = valErMsg;
	//document.getElementById("idSite").innerHTML = valSite;
	document.getElementById("idBCP").innerHTML = valBCP;
	document.getElementById("clr").innerHTML = valClr;
	document.getElementById("nxtBtton").innerHTML = valF4Nxt;
	document.getElementById("moveSUBtton").innerHTML = valF4Nxt;
	document.getElementById("suScanLbl").innerHTML = valLblScan;
	
	
	document.getElementById("ssccLbl").innerHTML = valLblSSCC;
	document.getElementById("sTypeId").innerHTML = valStTyp;
	document.getElementById("sBinId").innerHTML = valStBin;
	document.getElementById("or").innerHTML = valOr;
	document.getElementById("verifyId").innerHTML = valRFVerify;
// document.getElementById("check").style.display="none";

bcpStatus("bcp",L_values);
setInterval(function(){ bcpStatus("bcp",L_values); }, 30000);
}
function goBackNow(){

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
function doClear(){
	document.getElementById("ssuIn").value="";
	document.getElementById("ssuIn").focus();
}
function next(){
	var flag = getBCPStatus();


	buttonBackIdentifier = 2;
	var msgLabel = document.getElementById("errorMsg");
   	ssccNo= document.getElementById("ssuIn").value;
	ssccNo=scanssccno(ssccNo);
	

   if(ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo== "undefined"){
	var valMsgLbl = getProperty(L_values,'RF_MSG_LABEL');
	msgLabel.style.color= "red";
	msgLabel.style.fontweight="bold";
	msgLabel.style.display= "block";
	msgLabel.innerText = valMsgLbl ;
	document.getElementById("ssuIn").focus();
    }else{
	
	var formattedSSCC = ssccNo;
	var ssccLen = ssccNo.length;

	
	var refresh = new Date();
	var stockXML= loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+formattedSSCC+"&Param.7="+language+"&cache="+refresh+"&Content-Type=text/xml"));
	var errMsg = $(stockXML).find("ErrorMessage").text();
	var suSloc = $(stockXML).find("STGE_LOC:first").text();
	var suWh=$(stockXML).find("WHSENUMBER:first").text();

	if(errMsg != ""){
	var errorMsg = document.getElementById("errorMsg");
	var valMsgErr = getProperty(L_values,'RF_ERR_MSG');
	errorMsg.style.color= "red";
	errorMsg.style.fontweight="bold";
	errorMsg.style.display= "block";
	errorMsg.innerText = valMsgErr ;
	document.getElementById("ssuIn").focus();
	}
	else{
	errorMsg = document.getElementById("errorMsg");
	errorMsg.style.display = "none";
	msgLabel.style.display= "none";
	document.getElementById("clr").style.display="none";
	document.getElementById("suScanLbl").style.display="none";
	document.getElementById("ssuIn").style.display="none";
	
	document.getElementById("nxtBtton").style.display="none";
	document.getElementById("moveSUBtton").style.display ="inline-block";

	document.getElementById("ssccLbl").style.display= "block";
	var ssccIn = document.getElementById("sSCCIn");
	ssccIn.style.display= "block";
	ssccIn.readOnly= true;
	ssccIn.value = ssccNo;


	document.getElementById("sTypeId").style.display= "block";
	document.getElementById("sTypeIn").style.display= "block";
	document.getElementById("sBinId").style.display= "block";
	document.getElementById("sBinIn").style.display= "block";
	//document.getElementById("or").style.display= "block";
	document.getElementById("verifyId").style.display= "block";
	document.getElementById("verifyIn").style.display= "block";
              document.getElementById("sTypeIn").disabled = false;
	document.getElementById("sBinIn").disabled = false;
	//document.getElementById("check").style.display= "block";


	document.getElementById("STypedrop").style.display = "none";
	document.getElementById("SBindrop").style.display = "none";

	}

    }

   
}



function moveSU(){

              verifID =document.getElementById("verifyIn").value;        
               verifID1= verifID.toUpperCase();

	 if(dropdownFlag==1){

   	  InputStype=  $("#STypedrop option:selected").text() ;
   	 InputSbin =     $("#SBindrop option:selected").text() ;

  	   }
   	else{
    	InputStype = document.getElementById("sTypeIn").value;
   	 InputSbin = document.getElementById("sBinIn").value;

  }
             
 	   var  InputSbin1=InputSbin.toUpperCase();

         if(verifID1!=""){
                var refresh= new Date();
	    verifIDmodel=loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GET_StypeAndSBin_BasedOnVerifID&Param.1="+cl+"&Param.2="+wh+"&Param.3="+encodeURIComponent(verifID1)+"&Param.5="+InputStype+"&Param.4="+encodeURIComponent(InputSbin1)+"&Param.6="+language+"&Param.7=1" + "&Param.8=" + ssccNo + "&cache="+refresh+"&Content-Type=text/xml"),"",true);
                var oErrorMsg=$(verifIDmodel).find("ErrorMessage").text();
                var oType=$(verifIDmodel).find("ErrorType").text(); 

              if(oType=="E")
              {
                   alert(oErrorMsg);
                   document.getElementById("errorMsg").style.display="none"
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
				 this.moveSUtype();
			 }


             }
        else {
              this.moveSUtype();
                  }

}

function moveSUtype()
{
	var flag = getBCPStatus();



	buttonBackIdentifier = 3;
	var destSTpe;
	var destSBin;
	var verifyIn= document.getElementById("verifyIn");
	var sBinIn= document.getElementById("sBinIn");
	var sTypeIn= document.getElementById("sTypeIn");
	var msgLabel = document.getElementById("errorMsg");



	

	if((InputStype =="" || InputStype==" " || InputStype == null || InputStype == "undefined") ||
					 (InputSbin =="" || InputSbin==" " || InputSbin == null || InputSbin == "undefined")){

		if(verifyIn.value == "" || verifyIn.value == " " || verifyIn.value == null || verifyIn.value == "undefined"){

		}else{
			destSTpe = verifyIn.value.split("-")[0].trim();
			destSBin = verifyIn.value.split("-")[1].trim();
			destSBin= destSBin.toUpperCase();
		}

	}else{

		  if(dropdownFlag==1){

   		 destSTpe=  $("#STypedrop option:selected").text() ;
  		  destSBin =     $("#SBindrop option:selected").text() ;

 		    }
 	   else{
   	 destSTpe = document.getElementById("sTypeIn").value.trim();
  	  destSBin = document.getElementById("sBinIn").value.trim();

  }
		destSBin= destSBin.toUpperCase();
	}

     if(ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo== "undefined" || 
			destSTpe == "" || destSTpe == " " || destSTpe == null || destSTpe == "undefined" || 
						destSBin == "" || destSBin ==" " || destSBin == null || destSBin == "undefined"){

		msgLabel.style.color= "red";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";

    	if(ssccNo == "" || ssccNo == " " || ssccNo == null || ssccNo== "undefined"){
		var valMsgLBL = getProperty(L_values,'RF_MSG_LABEL');
		msgLabel.innerText = valMsgLBL;
	
	}
	else if(destSTpe == "" || destSTpe == " " || destSTpe == null || destSTpe == "undefined" || destSBin == "" || destSBin ==" " || destSBin == null || destSBin == "undefined"){
	var valBinOrTyp = getProperty(L_values,'RF_ENTER_BIN_OR_TYP');	
	msgLabel.innerText = valBinOrTyp ;
	}


    }
    else{

            var refresh= new Date();
    	var storage = destSTpe+"-"+destSBin;
	
    	var storageXML = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+storage+"&Param.7="+language+"&cache="+refresh+"&Content-Type=text/xml"));
    	var flag =$(storageXML).find("Flag:first").text();

	var oXMLModel = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetStockSBinSType&Param.1="+plantFromURL+"&Param.2="+encodeURIComponent(destSBin)+"&Param.3="+destSTpe+"&cache="+refresh+"&Content-Type=text/xml"));
	var rowCount = $(oXMLModel).find("Row").size();

   	if((rowCount > 0 && flag == "NONSU" || flag== "nonsu") || rowCount <=0){
    	
	msgLabel.style.display= "none";
	var formattedSSCC = ssccNo;
	var ssccLen = ssccNo.length;

	for(var i=0; i<(20- ssccLen); i++){
	formattedSSCC = "0"+formattedSSCC;
	}
	var moveSUBtton=  document.getElementById("moveSUBtton");
	moveSUBtton.style.display ="none";
	var nxtBtton= document.getElementById("nxtBtton");
	nxtBtton.style.display= "none";
	var ssccLbl= document.getElementById("ssccLbl");
	ssccLbl.style.display= "none";
	var sSCCIn= document.getElementById("sSCCIn");
	sSCCIn.style.display= "none";
	var sTypeId= document.getElementById("sTypeId");
	sTypeId.style.display= "none";
	sTypeIn.style.display= "none";
	var sBinId= document.getElementById("sBinId");
	sBinId.style.display= "none";

	sBinIn.style.display= "none";
	var or= document.getElementById("or");
	or.style.display= "none";
	var verifyId= document.getElementById("verifyId");
	verifyId.style.display= "none";
	verifyIn.style.display="none";
	var msgLabel = document.getElementById("message");
	msgLabel.style.display= "block";
//document.getElementById("check").style.display= "none";

	 document.getElementById("STypedrop").style.display = "none";
 	                   
	document.getElementById("SBindrop").style.display = "none";

	var stockXML= loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+formattedSSCC+"&Param.7="+language+"&cache="+refresh+"&Content-Type=text/xml"));
	var plant =$(stockXML).find("PLANT").text();
	var sourceSLoc=$(stockXML).find("STGE_LOC").text();
	var sourceSType=$(stockXML).find("STGE_TYPE").text();
	var sourceSBin=$(stockXML).find("STGE_BIN").text();
	var matNo=$(stockXML).find("MATERIAL").text();
	var batchNo=$(stockXML).find("BATCH").text();
	var uom=$(stockXML).find("BASE_UOM").text();
	var CommUOM= $(stockXML).find("CommUOM").text();
	var availabelStock=$(stockXML).find("AVAIL_STCK").text();
	var unitType=$(stockXML).find("UNITTYPE_1").text();
	var whNo=$(stockXML).find("WHSENUMBER").text();
	var stockCat=$(stockXML).find("STOCK_CAT").text();	
	var sled=$(stockXML).find("EXPIRYDATE").text();
	var prodDate=$(stockXML).find("PROD_DATE").text();
	var restricted = $(stockXML).find("RESTRICTED").text();
	var errMsg = $(stockXML).find("ErrorMessage").text();

	if(availabelStock <= 0 || (destSTpe == sourceSType && destSBin == sourceSBin) || errMsg != ""){

		msgLabel.style.color= "red";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";

		if(destSTpe == sourceSType && destSBin == sourceSBin){
			msgLabel.style.color= "red";
			msgLabel.style.fontweight="bold";
			msgLabel.style.display= "block";
			var valBinOrTyp = getProperty(L_values,'RF_MSG_LBL_ALLOWN');
			msgLabel.innerText = valBinOrTyp ;
		}
		else if(errMsg != ""){
			msgLabel.style.color= "red";
			msgLabel.style.fontweight="bold";
			msgLabel.style.display= "block";
			var valInvSSCC = getProperty(L_values,'RF_MSG_LBL_F');
			msgLabel.innerText = valInvSSCC ;
		}
		else{
			
			msgLabel.style.color= "red";
			msgLabel.style.fontweight="bold";
			msgLabel.style.display= "block";
			var valLblNA = getProperty(L_values,'RF_MSG_LBL_NA');
			msgLabel.innerText = valLblNA ;
		}
	
	}else{

	if( stockCat == "" || stockCat == " " || stockCat== null || stockCat =="null"){
	stockCat = "---";
	}
	if( restricted == "" || restricted == " " || restricted== null || restricted=="null"){
	restricted = "---";
	}

	var queryString = 	"<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
									"<TransferOrderDetails>"+
									"<I_DestBatch>"+batchNo+"</I_DestBatch>"+
									"<I_DestMaterial>"+matNo+"</I_DestMaterial>"+
									"<I_DestProdDate>"+prodDate+"</I_DestProdDate>"+
									"<I_DestSLED>"+sled+"</I_DestSLED>"+
									"<I_DestSLOC>"+sourceSLoc+"</I_DestSLOC>"+
									"<I_DestSSCCNum></I_DestSSCCNum>"+
									"<I_DestSTBin>"+encodeURIComponent(destSBin)+"</I_DestSTBin>"+
									"<I_DestStockCat>"+stockCat+"</I_DestStockCat>"+
									"<I_DestSTType>"+destSTpe+"</I_DestSTType>"+
									"<I_DestUnitType>"+unitType+"</I_DestUnitType>"+
									"<I_DestWHNo>"+whNo+"</I_DestWHNo>"+
									"<I_HeaderType>Transfer SU to non SU (within same Storage Location)</I_HeaderType>"+
									"<I_MovementType></I_MovementType>"+
									"<I_MovementType_Dest>NONSU</I_MovementType_Dest>"+
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
	var moveSUBtton=  document.getElementById("moveSUBtton");
	moveSUBtton.style.display ="inline-block";
	var nxtBtton= document.getElementById("nxtBtton");
	nxtBtton.style.display= "none";
	var ssccLbl= document.getElementById("ssccLbl");
	ssccLbl.style.display= "block";
	var sSCCIn= document.getElementById("sSCCIn");
	sSCCIn.style.display= "block";
	var sTypeId= document.getElementById("sTypeId");
	sTypeId.style.display= "block";
	sTypeIn.style.display= "block";
	var sBinId= document.getElementById("sBinId");
	sBinId.style.display= "block";

	sBinIn.style.display= "block";
	var or= document.getElementById("or");
	//or.style.display= "block";
	var verifyId= document.getElementById("verifyId");
	verifyId.style.display= "block";
	verifyIn.style.display="block";
	var msgLabel = document.getElementById("message");
	msgLabel.style.display= "block";
	}
	}
	if(message != valToMsg4){
	if( (message == "" || message == " " || message == null || message == "NA" || message == "---") && transOrdNo != "---"){

		msgLabel.style.color= "green";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";
		var valMsg_1 = getProperty(L_values,'RF_MSG_1');
		var valMsg_2 = getProperty(L_values,'RF_MSG_2');
		msgLabel.innerText = valMsg_1+transOrdNo+ ") "+valMsg_2 ;
	///////////////////////////////////////////Business Metrics/////////////////////////////////////////
var businessmetrics_TO = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFTO_CountOfTransactions&Content-Type=text/xml"));
////////////////////////////////////////////////////////////////////////////////////////////////////////	
	}else{
		msgLabel.style.color= "red";
		msgLabel.style.fontweight="bold";
		msgLabel.style.display= "block";
		var valTOF = getProperty(L_values,'RF_TO_F');
		msgLabel.innerText = valTOF ;
	}
	}

	}
       }
    	else{
	var er = document.getElementById("errorMsg");
     	er.style.color= "red";
     	er.style.fontweight="bold";
     	er.style.display= "block";
	var valerror = getProperty(L_values,'RF_ERR_TYP');
     	er.innerText = valerror ;
    	}
     }

}
/*function Check(){
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

