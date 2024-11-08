	var language,langData;
var siteFromURL,whNoFromURL;
var orderFromURL,clientFromURL;
var matFromURL,desFromURL;
var plantFromURL,ssccFromURL;
var nodeID,ord,sled,uom,quant,batch,hu;
var resource,resourceGR;
var data,material1,sscc;
var matData,mvt_type,type;
var vRSPOS;

document.onkeydown = fkey;
document.onkeypress = fkey;
document.onkeyup = fkey;

function fkey(e){
	console.log(e);
	if (e.keyCode == 112) {
	 doSave();
          //   alert("f1 pressed");
        }

	if (e.keyCode == 114) {
	doBack();
            // alert("f3 pressed");
        }
	
 }

function onLoading(){

callTimeOut();
plantFromURL=getURLParameter("plant");
ssccFromURL=getURLParameter("sscc");
siteFromURL = getURLParameter("site");
resourceGR = decodeURIComponent(getURLParameter("resource"));
nodeID = getURLParameter("nodeID");	
orderFromURL=getURLParameter("order");	
matFromURL=getURLParameter("material");	
desFromURL=getURLParameter("des");
whNoFromURL=getURLParameter("whNo");	
clientFromURL=getURLParameter("client");
type = getURLParameter("type");
vRSPOS = getURLParameter("vRSPOS");

mvt_type = type=="CON" ? "261" : "262" ;
resource=document.getElementById("resourceArea");
resource.value=resourceGR;
document.getElementById("labelHdr").innerText ="Site: " +siteFromURL;
order=document.getElementById("orderArea");
order.value=orderFromURL;
ord=orderFromURL;
material1=document.getElementById("materialArea");
material1.value=matFromURL;
des=document.getElementById("descriptionArea");
des.value=desFromURL
sscc=document.getElementById("ssccArea");
sscc.value=ssccFromURL

$("#postArea").datepicker().datepicker("setDate", new Date());

var ordLength = ord.length;
		for(var p=0; p<(12-ordLength); p++){
			ord = "0"+ord;
		}
data= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&Content-Type=text/xml");
var flag=$(data).find("O_Flag").text();
if (flag=="0")
{

var t=document.getElementById("BCPArea");
t.value="ON"
t.style.backgroundColor='red';
}
else
{
var t=document.getElementById("BCPArea");
t.value="OFF"
t.style.backgroundColor='green';
}
var DateNw = new Date();
//langData=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml");
//language=$(langData).find("O_Language").text();
language =  getLanguage();

if(ssccFromURL!=""){
var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>"+ssccFromURL+"</huNumber><orderNumber>"+ord+"</orderNumber><warehouseNumber>"+whNoFromURL+"</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>"+plantFromURL+"</plant><client>"+clientFromURL+"</client><language>"+language+"</language><RSPOS>"+vRSPOS+"</RSPOS></PackageDetailsInput>" 
// alert(InputXMLInStringFormat);
matData=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1="+InputXMLInStringFormat+"&Param.2="+language+"&Content-Type=text/xml");
sled=$(matData).find("shelfLifeDate").text();
uom=$(matData).find("uom").text();
quant=$(matData).find("stock").text();
batch=$(matData).find("batchNumber").text();
hu=$(matData).find("huNumber").text();

success = $(matData).find("status").text()
if(success=="S"){
var exp=document.getElementById("sledArea");
exp.value=sled;
var unit=document.getElementById("uomArea");
unit.value=uom;
//var quantity=document.getElementById("quantityArea");
//quantity.value=quant;
var refresh = new Date();
if(type != "CON"){
var qty_consmodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock&Param.1="+ord+"&Param.2="+matFromURL+"&Param.3=261&Param.4="+batch+"&Param.5="+nodeID+"&Param.6="+ssccFromURL+"&Param.7="+vRSPOS+"&cache="+refresh+"&Content-Type=text/xml");
var qty_consumption = $(qty_consmodel).find("QTY").text();
var qty_cons = qty_consumption=="NA" ? 0:qty_consumption;

var qty_reversemodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock&Param.1="+ord+"&Param.2="+matFromURL+"&Param.3=262&Param.4="+batch+"&Param.5="+nodeID+"&Param.6="+ssccFromURL+"&Param.7="+vRSPOS+"&cache="+refresh+"&Content-Type=text/xml");
var qty_reversed = $(qty_reversemodel).find("QTY").text();
var qty_rev = qty_reversed=="NA" ? 0:qty_reversed;

document.getElementById("quantityArea").value = qty_cons-qty_rev;
document.getElementById("gi_save").innerHTML="F1 Reverse";
}
else{
document.getElementById("quantityArea").value = qty;
}
var bchNo=document.getElementById("batchArea");
bchNo.value=batch;
}
else{
alert($(matData).find("message").text());
window.history.back();
document.getElementById("sledArea").visibility = "hidden";
document.getElementById("uomArea").visibility = "hidden";
document.getElementById("quantityArea").visibility = "hidden";
document.getElementById("batchArea").visibility = "hidden";
}
}
}
function doSave(){

var postDate1 = document.getElementById("postArea").value;
					var postingYear = parseInt(postDate1.split('/')[2]);
					var postingMonth = parseInt(postDate1.split('/')[0]);
					var postingDate = parseInt(postDate1.split('/')[1]); 
	var posting_date= postingYear+"-"+('0'+postingMonth).slice(-2)+"-"+('0'+postingDate).slice(-2)+"T00:00:00Z";
	var loginID = document.getElementById("login").value;

var qty  = document.getElementById("quantityArea").value ;
if(uom==""){
	alert("Please select the UOM!!");
	}
else{
if(qty=="" || qty <=0){
alert("Please enter positive quantity !!");
}

else if(batch==""){
alert("Please select Batch!!");
}
else{
var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails><txnPath>GoodsMovementApp/GI/BLS/BLS_GoodsIssueConsumptionReversal</txnPath>"+
	     "<client>"+clientFromURL+"</client><plant>"+plantFromURL+"</plant><nodeID>"+nodeID+"</nodeID><orderNumber>"+ord+"</orderNumber><RSPOS>"+vRSPOS+"</RSPOS><warehouseNumber>"+whNoFromURL+"</warehouseNumber><userId>"+loginID+"</userId>"+ 
	    "<goodsMovementItems><client>"+clientFromURL+"</client><goodsMovementItem><postingDate>"+posting_date+"</postingDate><huNumber>"+ssccFromURL+"</huNumber><materialNumber>"+matFromURL+"</materialNumber>"+ 
            "<quantityInReportUom>"+qty+"</quantityInReportUom><reportUom>"+uom+"</reportUom><reservationNumber></reservationNumber><recordType/><psaNumber/>"+ 
            "<reservationItemNumber></reservationItemNumber><batchNumber>"+batch+"</batchNumber><movementType>"+mvt_type+"</movementType><shelfLifeDate>"+sled+"</shelfLifeDate>"+
	    "<storageType></storageType><storageBin></storageBin><documentNumber/><documentYear/><postingID></postingID><proceedWithWarning>false</proceedWithWarning>"+ 
           "<goodsMovementPostingMessages><client>"+clientFromURL+"</client><goodsMovementPostingMessage><status/><message/></goodsMovementPostingMessage>"+
             "</goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems></IOReportGoodsMovementDetails>" ;

//alert(InputXMLInStringFormat);
gi_response= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_GoodsIssueConsumptionReversal&Param.1="+InputXMLInStringFormat+"&Param.2="+language+"&Content-Type=text/xml");
console.log(gi_response);

var if_success = $(gi_response).find("status").text();
	if(if_success=="S"){
///////////////////////////////////////////Business Metrics/////////////////////////////////////////
var businessmetrics_gi = loadXMLDoc(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_RFGI_CountOfTransactions&Content-Type=text/xml"));
////////////////////////////////////////////////////////////////////////////////////////////////////////	
	alert("Transaction successful with document no "+ $(gi_response).find("documentNumber").text());
	document.getElementById("sledArea").value="";
	document.getElementById("quantityArea").value="";
	document.getElementById("uomArea").value="";
	document.getElementById("batchArea").value="";
	}
	else{
	alert("Error:"+$(gi_response).find("message").text());
	}
}
}
}
function quantityChange(){
var quantity =document.getElementById("quantityArea").value;
Validate(quantity);

}

function doBack(){
window.history.back();
}