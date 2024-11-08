
var siteFromURL;
var orderFromURL;
var matFromURL;
var plantFromURL,suFromURL;
var nodeID,ord;
var resource,resourceGR;
var data;
var order,language,langData;
var material1;
var matTrim,suTrim,whNo,sLoc,client,type;
var des,su;
var desTrim;
var mat,language;
var batchXML,mvt_type, qty;
var type_Bin,sType,sBin;

document.onkeydown = fkey;
document.onkeypress = fkey;
document.onkeyup = fkey;

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

	if (e.keyCode == 115) {
	doNext();
            // alert("f4 pressed");
        }
	
 }

function OnLoading(){
callTimeOut();
clientFromURL=getURLParameter("client");
plantFromURL=getURLParameter("plant");
suFromURL=getURLParameter("su");
siteFromURL = getURLParameter("site");
resourceGR = getURLParameter("resource");
nodeID = getURLParameter("nodeID");	
orderFromURL=getURLParameter("order");	
matFromURL=getURLParameter("material");	
type = getURLParameter("type");	
mvt_type = type=="CON" ? "261" : "262" ;

resource=document.getElementById("resourceArea");
resource.value=resourceGR;
document.getElementById("labelHdr").innerText ="Site: " +siteFromURL;
order=document.getElementById("orderArea");
order.value=orderFromURL;
ord=orderFromURL;
material1=document.getElementById("materialArea");
matTrim=matFromURL.split(" ");
material1.value=matTrim[0];
mat=matTrim[0];
matr=matTrim[0];
var Length = matr.length;
var timestamp = new Date();

var ordLength = ord.length;
		for(var p=0; p<(12-ordLength); p++){
			ord = "0"+ord;
		}

des=document.getElementById("descriptionArea");
desTrim=matFromURL.slice(9);
des.value=desTrim;

suTrim=suFromURL.split(" ");
// material1.value=matTrim[0];
su=suTrim[0];
client=suTrim[1];
whNo=suTrim[2];
sLoc=suTrim[3];
// alert(whNo);

var DateNw = new Date();
 type_Bin = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/SQL_GetSTyoe_Sbin&Param.1="+matr+"&Param.2="+plantFromURL+"&Param.3="+ord+"&Param.4="+clientFromURL+"&cache="+DateNw+"&Content-Type=text/xml");
sType = $(type_Bin).find("STORAGE_TYPE").text();
sBin= $(type_Bin).find("STORAGE_BIN").text();
// langData=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml");
language=getLanguage();

bcpStatus("BCPArea",L_values);
setInterval(function(){ bcpStatus("BCPArea",L_values); }, 30000);

if(su=="---" || su==""){
$('#ssccL').hide();
$('#ssccArea').hide();
$('#batchL').show();
$('#batchArea').show();
$('#sledL').show();
$('#sledArea').show();
$('#qtyL').show();
$('#qtyArea').show();
$('#postL').show();
$('#postArea').show();
$('#uomArea').show();

var refresh = new Date();

$("#postArea").datepicker().datepicker("setDate", new Date());

var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><MaterialDetailsInput><materialNumber>"+matr+"</materialNumber><plant>"+plantFromURL+"</plant><client>"+client+"</client><warehouseNumber>"+whNo+"</warehouseNumber><orderNumber>"+ord+"</orderNumber><isReversal/><storageBin/><storageType/><storageLocation>"+sLoc+"</storageLocation><productionSupplyArea/></MaterialDetailsInput>" 
console.log(InputXMLInStringFormat);
batchXML = populateDropdownData("batchArea","batchNumber","batchNumber","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_ToGetBatchList&Param.1="+InputXMLInStringFormat+"&Param.2="+language+"&d="+refresh+"&Content-Type=text/xml");
success = $(batchXML).find("status").text();
alert(success);
if(success=="E"){
alert($(batchXML).find("message").text());
}
populateDropdownData("uomArea","MEINS","MEINS","/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/SQLQ_GetMaterialDetailsByOrderMat&Param.1="+ord+"&Param.2="+matTrim[0]+"&cache="+refresh+"&Content-Type=text/xml");
document.getElementById("uomArea").remove(0);
}

else if(su=="X")
{
//alert("else");
$('#ssccL').show();
$('#ssccArea').show();
$('#batchL').hide();
$('#batchArea').hide();

}
}

function doBatchChange(){
var refresh = new Date();
var batchIndex = document.getElementById("batchArea").selectedIndex-1;
qty = $(batchXML).find("Quantity:eq("+batchIndex+")").text();
var sled = $(batchXML).find("shelfLifeDate:eq("+batchIndex+")").text();
var batch = document.getElementById("batchArea").value;

if(type != "CON"){
var qty_consmodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock_NonSU&Param.1="+ord+"&Param.2="+matTrim[0]+"&Param.3=261&Param.4="+batch+"&Param.5="+nodeID+"&cache="+refresh+"&Content-Type=text/xml");
var qty_consumption = $(qty_consmodel).find("QTY").text();
var qty_cons = qty_consumption=="NA" ? 0:qty_consumption;

var qty_rvrsemodel = loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/MDOQ_GetGI_ConsumedStock_NonSU&Param.1="+ord+"&Param.2="+matTrim[0]+"&Param.3=262&Param.4="+batch+"&Param.5="+nodeID+"&cache="+refresh+"&Content-Type=text/xml");
var qty_reversed = $(qty_rvrsemodel).find("QTY").text();
var qty_rev = qty_reversed=="NA" ? 0:qty_reversed;

document.getElementById("qtyArea").value = qty_cons-qty_rev;
}
else{
document.getElementById("qtyArea").value = qty;
}
document.getElementById("sledArea").value = sled.split("-")[1]+"/"+sled.split("-")[2]+"/"+sled.split("-")[0];
}

function doNext(){
var refresh = new Date();
var sscc=document.getElementById("ssccArea").value;
var ssccLen=sscc.length;
//alert(sscc);
if(su=="X"){
if(sscc==""){
alert("Please enter SSCC Number");
}
else{
var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>"+sscc+"</huNumber><orderNumber>"+ord+"</orderNumber><warehouseNumber>"+whNo+"</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>"+plantFromURL+"</plant><client>"+clientFromURL+"</client><language>"+language+"</language></PackageDetailsInput>" 
// alert(InputXMLInStringFormat);
matData=loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1="+InputXMLInStringFormat+"&Param.2="+language+"&cache="+refresh+"&Content-Type=text/xml");
success = $(matData).find("status").text()
if(success=="S"){
window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/GoodsIssue.irpt?order="+orderFromURL+"&material="+mat+"&resource="+resourceGR+"&plant="+plantFromURL+"&nodeID="+ nodeID+"&site="+siteFromURL+"&des="+desTrim+"&sscc="+sscc+"&whNo="+whNo+"&client="+client+"&type="+type),"_self");
}
else{
alert($(matData).find("message").text());
}
}
}
else if(su!="X")
{
var postDate1 = document.getElementById("postArea").value;
					var postingYear = parseInt(postDate1.split('/')[2]);
					var postingMonth = parseInt(postDate1.split('/')[0]);
					var postingDate = parseInt(postDate1.split('/')[1]); 
	var posting_date= postingYear+"-"+('0'+postingMonth).slice(-2)+"-"+('0'+postingDate).slice(-2)+"T00:00:00Z";

var batch = document.getElementById("batchArea").value ;
var quant = document.getElementById("qtyArea").value ;
var uom = document.getElementById("uomArea").value ;
var loginID = document.getElementById("login").value;

	if(uom==""){
	alert("Please select the UOM!!");
	}
	else{
	if(quant <=0 || quant==""){
	alert("Please give positive quantity !!");
	}
	else if(batch==""){
	alert("Please select batch!!");
	}
	else{
var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><IOReportGoodsMovementDetails><txnPath>GoodsMovementApp/GI/BLS/BLS_GoodsIssueConsumptionReversal</txnPath>"+
	     "<client>"+clientFromURL+"</client><plant>"+plantFromURL+"</plant><nodeID>"+nodeID+"</nodeID><orderNumber>"+ord+"</orderNumber><warehouseNumber>"+whNo+"</warehouseNumber><userId>"+loginID+"</userId>"+ 
	    "<goodsMovementItems><client>"+clientFromURL+"</client><goodsMovementItem><postingDate>"+posting_date+"</postingDate><huNumber></huNumber><materialNumber>"+matr+"</materialNumber>"+ 
            "<quantityInReportUom>"+quant+"</quantityInReportUom><reportUom>"+uom+"</reportUom><reservationNumber></reservationNumber><recordType/><psaNumber/>"+ 
            "<reservationItemNumber></reservationItemNumber><batchNumber>"+batch+"</batchNumber><movementType>"+mvt_type+"</movementType><shelfLifeDate></shelfLifeDate>"+
	    "<storageType>"+sType+"</storageType><storageBin>"+sBin+"</storageBin><documentNumber/><documentYear/><postingID></postingID><proceedWithWarning>false</proceedWithWarning>"+ 
           "<goodsMovementPostingMessages><client>"+clientFromURL+"</client><goodsMovementPostingMessage><status/><message/></goodsMovementPostingMessage>"+
             "</goodsMovementPostingMessages></goodsMovementItem></goodsMovementItems></IOReportGoodsMovementDetails>" ;

//alert(InputXMLInStringFormat);
gi_response= loadXMLDoc("/XMII/Illuminator?QueryTemplate=MaterialHandling/GI/QueryTemplates/XACQ_GoodsIssueConsumptionReversal&Param.1="+InputXMLInStringFormat+"&Param.2="+language+"&Content-Type=text/xml");
console.log(gi_response);

var if_success = $(gi_response).find("status").text();
	if(if_success=="S"){
	alert("Transaction successful with document no "+ $(gi_response).find("documentNumber").text());

	document.getElementById("sledArea").value="";
	document.getElementById("qtyArea").value="";
	document.getElementById("uomArea").value="";
	document.getElementById("batchArea").value="";
	}
	else{
	alert("Error:"+$(gi_response).find("message").text());
	}
}
}
}

}

function doBack(){
window.history.back();
}