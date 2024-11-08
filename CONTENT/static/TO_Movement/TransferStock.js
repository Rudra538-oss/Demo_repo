
var origin;
var plant,whsenumber,uom,stgeloc,stockcat_src,stockcat_dest;
var source_type,dest_type;
function loadXMLDoc(filename)
{
var resp;
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	resp = xhttp.responseXML;
	}
};
xhttp.open("GET", filename, false);
xhttp.send();

return resp;
}

function displaySourceDetails(){
var timestamp = new Date();
var scan_source = document.getElementById("id_scan_source").value;
if(scan_source==""){
alert("Scan the GTIN/SSCC/St Type-St Bin barcode");
}
else{
	var stype = scan_source.split("-")[0];
	var sbin = scan_source.split("-")[1];
	xmldoc = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Usability/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+scan_source+"&d="+timestamp+"&Content-Type=text/xml");
	var total_rows = $(xmldoc).find('Row').size();
	console.log(total_rows);
	var err = $(xmldoc).find('ErrorMessage:eq(0)').text();
	source_type = $(xmldoc).find('Flag:eq(0)').text();
	console.log(source_type);
	if(err != ""){
	alert(err);
	clearSourceDetails();
	}
	else{

	if(total_rows>1){
	//modal.style.display = "block";
	document.getElementById("myContent").style.transform="rotateY(180deg)";
	document.getElementById("myModal").style.transform="rotateY(0deg)";
	origin="source";
	document.getElementById("id_scan_destination").value = "";
	document.getElementById("destination_details").style.visibility="hidden";
	document.getElementById("div_sscc_dest").style.visibility ="hidden";
	var table_content = createTable(xmldoc);
	document.getElementById("dialog-body").innerHTML="<div style='overflow-x:auto;'>"+table_content+"</div>" ;
	paginateTable();
	//hideSpecificTableColumns(source_type,stype,sbin);
	}
	else{
	document.getElementById("source_details").style.visibility="visible";
	document.getElementById("id_scan_destination").value = "";
	document.getElementById("destination_details").style.visibility="hidden";
	document.getElementById("div_sscc_dest").style.visibility ="hidden";
	document.getElementById("destination").style.visibility="visible";

	document.getElementById("id_mat_id_source").value =$(xmldoc).find('MATERIAL:eq(0)').text();
	document.getElementById("id_batch_source").value =$(xmldoc).find('BATCH:eq(0)').text();
	document.getElementById("id_sssc_source").value =$(xmldoc).find('STOR_UNIT:eq(0)').text();
	document.getElementById("id_sbin_source").value =$(xmldoc).find('STGE_BIN:eq(0)').text();
	document.getElementById("id_stype_source").value =$(xmldoc).find('STGE_TYPE:eq(0)').text();
	document.getElementById("id_sled_source").value =$(xmldoc).find('EXPIRYDATE:eq(0)').text();
	document.getElementById("id_quantity_source").value =$(xmldoc).find('AVAIL_STCK:eq(0)').text();
	document.getElementById("id_stockcat_source").value =$(xmldoc).find('STOCK_CAT:eq(0)').text();
	document.getElementById("uom_source").innerHTML =$(xmldoc).find('BASE_UOM:eq(0)').text();
	plant = $(xmldoc).find('PLANT:eq(0)').text();
	whsenumber = $(xmldoc).find('WHSENUMBER:eq(0)').text();
	stgeloc = $(xmldoc).find('STGE_LOC:eq(0)').text();
	uom = $(xmldoc).find('BASE_UOM:eq(0)').text();
	stockcat_src = $(xmldoc).find('STOCK_CAT:eq(0)').text();
	}
	}
	if(source_type=="SU"){
	document.getElementById("div_ssce_source").style.display="block";
	}else{
	document.getElementById("div_ssce_source").style.display="none";
	}
}


}

function displayDestinationDetails(){
var timestamp = new Date();
var scan_source = document.getElementById("id_scan_source").value;
var src_sscc = document.getElementById("id_sssc_source").value;
var src_sbin =document.getElementById("id_sbin_source").value;
var src_stype = document.getElementById("id_stype_source").value;
var src_batch = document.getElementById("id_batch_source").value;
var src_mat = document.getElementById("id_mat_id_source").value;
var quantity_src = document.getElementById("id_quantity_source").value;
var scan_destination = document.getElementById("id_scan_destination").value;
if(scan_destination==""){
alert("Scan the GTIN/SSCC/St Type-St Bin barcode");
}
else if(scan_source==scan_destination){
alert("Source and destination Scan cannot be  the same !!");
}
else{
	var if_stype_sbin = scan_destination.indexOf("-");
	console.log(source_type);
	if(source_type=="SU"){
	if(if_stype_sbin==-1){
		xmldoc =loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Usability/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+scan_destination+"&d="+timestamp+"&Content-Type=text/xml");
		var total_rows = $(xmldoc).find('Row').size();
		var err = $(xmldoc).find('ErrorMessage:eq(0)').text();
		stockcat_dest = $(xmldoc).find('STOCK_CAT:eq(0)').text();
		if(err != ""){
		alert(err);
		clearDestinationDetails();
		}
		else{
		document.getElementById("destination_details").style.visibility="visible";
		document.getElementById("div_sscc_dest").style.visibility ="visible";
		document.getElementById("id_quantity_destination").readOnly=true;
		document.getElementById("id_sscc_destination").value =scan_destination;
		document.getElementById("id_sbin_destination").value =$(xmldoc).find('STGE_BIN:eq(0)').text();
		document.getElementById("id_stype_destination").value =$(xmldoc).find('STGE_TYPE:eq(0)').text();
		document.getElementById("id_batch_destination").value =src_batch;
		document.getElementById("id_quantity_destination").value =quantity_src;
		document.getElementById("uom_destination").innerHTML = document.getElementById("uom_source").innerHTML;
		}
	}else{
		var stype = scan_destination.split(/-(.+)/)[0];
		var sbin = scan_destination.split(/-(.+)/)[1].toUpperCase();
		if(stype == src_stype && sbin == src_sbin){
		alert("Source and Destination Storage type and bin cannot be the same !!");
		}
		else{
		xmldoc =loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Usability/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+scan_destination+"&d="+timestamp+"&Content-Type=text/xml");
		var total_rows = $(xmldoc).find('Row').size();
		var err = $(xmldoc).find('ErrorMessage:eq(0)').text();
		dest_type = $(xmldoc).find('Flag:eq(0)').text();
		stockcat_dest = $(xmldoc).find('STOCK_CAT:eq(0)').text();
		console.log(dest_type);
		if(err != ""){
		alert(err);
		clearDestinationDetails();
		}
		if(dest_type=="SU"){
		document.getElementById("destination_details").style.visibility="visible";
		document.getElementById("div_sscc_dest").style.visibility ="visible";
		document.getElementById("id_quantity_destination").readOnly=true;
		document.getElementById("id_sscc_destination").value =src_sscc;
		document.getElementById("id_sbin_destination").value =sbin;
		document.getElementById("id_stype_destination").value =stype;
		document.getElementById("id_batch_destination").value =src_batch;
		document.getElementById("id_quantity_destination").value =quantity_src;
		document.getElementById("uom_destination").innerHTML =document.getElementById("uom_source").innerHTML;
		}
		else if(dest_type=="NONSU"){
		document.getElementById("destination_details").style.visibility="visible";
		document.getElementById("div_sscc_dest").style.visibility ="hidden";
		document.getElementById("id_quantity_destination").readOnly=false;
		document.getElementById("id_sbin_destination").value =sbin;
		document.getElementById("id_stype_destination").value =stype;
		document.getElementById("id_batch_destination").value =src_batch;
		document.getElementById("id_quantity_destination").value =quantity_src;
		document.getElementById("uom_destination").innerHTML =document.getElementById("uom_source").innerHTML;
		}
	}
	}
	}
	
	else if(source_type=="NONSU"){
	if(if_stype_sbin==-1){
		xmldoc =loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Usability/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+scan_destination+"&Param.2="+source_type+"&Param.3="+scan_source+"&Param.4="+src_mat+"&Param.5="+src_batch+"&Param.6="+stockcat_src+"&d="+timestamp+"&Content-Type=text/xml");
		var total_rows = $(xmldoc).find('Row').size();
		var err = $(xmldoc).find('ErrorMessage:eq(0)').text();
		dest_type = $(xmldoc).find('Flag:eq(0)').text();
		stockcat_dest = $(xmldoc).find('STOCK_CAT:eq(0)').text();
		console.log(dest_type);
		if(err != ""){
		alert(err);
		}
		else{
		var dest_mat =$(xmldoc).find('MATERIAL:eq(0)').text();
		var dest_batch =$(xmldoc).find('BATCH:eq(0)').text();
		document.getElementById("destination_details").style.visibility="visible";
		document.getElementById("div_sscc_dest").style.visibility ="visible";
		document.getElementById("id_quantity_destination").readOnly=false;
		document.getElementById("id_sscc_destination").value =scan_destination;
		document.getElementById("id_sbin_destination").value =$(xmldoc).find('STGE_BIN:eq(0)').text();
		document.getElementById("id_stype_destination").value =$(xmldoc).find('STGE_TYPE:eq(0)').text();
		document.getElementById("id_batch_destination").value =src_batch;
		document.getElementById("id_quantity_destination").value =$(xmldoc).find('AVAIL_STCK:eq(0)').text();
		document.getElementById("uom_destination").innerHTML = document.getElementById("uom_source").innerHTML;
		}
	}else{
		var stype = scan_destination.split(/-(.+)/)[0];
		var sbin = scan_destination.split(/-(.+)/)[1].toUpperCase();
		if(stype == src_stype && sbin == src_sbin){
		alert("Source and Destination Storage type and bin cannot be  the same !!");
		}
		else{
		xmldoc =loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Usability/TO_Movement/QueryTemplate/XAC_GetStockEnquiryDetails&Param.1="+scan_destination+"&Param.2="+source_type+"&Param.3="+scan_source+"&Param.4="+src_mat+"&Param.5="+src_batch+"&Param.6="+stockcat_src+"&d="+timestamp+"&Content-Type=text/xml");
		var total_rows = $(xmldoc).find('Row').size();
		var err = $(xmldoc).find('ErrorMessage:eq(0)').text();
		dest_type = $(xmldoc).find('Flag:eq(0)').text();
		stockcat_dest = $(xmldoc).find('STOCK_CAT:eq(0)').text();
		console.log(dest_type);
		if(err != ""){
		alert(err);
		clearDestinationDetails();
		}else{
		if(dest_type=="SU"){      
			if(total_rows>1){
				//modal.style.display = "block";
				document.getElementById("myContent").style.transform="rotateY(180deg)";
				document.getElementById("myModal").style.transform="rotateY(0deg)";
			origin="destination";
			var table_content = createTable(xmldoc);
			console.log(table_content);
			document.getElementById("dialog-body").innerHTML="<div  style='overflow-x:auto;'>"+table_content+"</div>" ;
			paginateTable();
			//hideSpecificTableColumns(dest_type,stype,sbin,origin);
			//document.getElementById("destination_details").style.visibility="visible";
			//document.getElementById("div_sscc_dest").style.visibility ="visible";
			document.getElementById("id_quantity_destination").readOnly=false;
			}
			else{
				document.getElementById("destination_details").style.visibility="visible";
				document.getElementById("div_sscc_dest").style.visibility ="visible";
				document.getElementById("id_sscc_destination").value =$(xmldoc).find('STOR_UNIT:eq(0)').text();
				document.getElementById("id_batch_destination").value =$(xmldoc).find('BATCH:eq(0)').text();
				document.getElementById("id_sbin_destination").value =$(xmldoc).find('STGE_BIN:eq(0)').text();
				document.getElementById("id_stype_destination").value =$(xmldoc).find('STGE_TYPE:eq(0)').text();
				//document.getElementById("id_quantity_destination").value =element.children[6].innerHTML;
				document.getElementById("id_quantity_destination").value =$(xmldoc).find('AVAIL_STCK:eq(0)').text();
				document.getElementById("uom_destination").innerHTML =document.getElementById("uom_source").innerHTML;
				stockcat_dest = $(xmldoc).find('STOCK_CAT:eq(0)').text();
			}
		}
		else if(dest_type=="NONSU"){
		document.getElementById("destination_details").style.visibility="visible";
		document.getElementById("div_sscc_dest").style.visibility ="hidden";
		document.getElementById("id_quantity_destination").readOnly=false;
		document.getElementById("id_sbin_destination").value =sbin;
		document.getElementById("id_stype_destination").value =stype;
		document.getElementById("id_batch_destination").value =src_batch;
		document.getElementById("id_quantity_destination").value =quantity_src;
		document.getElementById("uom_destination").innerHTML =document.getElementById("uom_source").innerHTML;
		}
		}
	}
	}
}
}
}

function doTransferStock(){

console.log(stockcat_src+"&&&&&&&&"+stockcat_dest);

var src_sscc = document.getElementById("id_sssc_source").value;
var src_sbin =document.getElementById("id_sbin_source").value;
var src_stype = document.getElementById("id_stype_source").value;
var src_batch = document.getElementById("id_batch_source").value;
var material = ("00000000000000000000"+document.getElementById("id_mat_id_source").value).slice(-18);
var dest_sbin = document.getElementById("id_sbin_destination").value;
var dest_stype = document.getElementById("id_stype_destination").value;
var dest_sscc = document.getElementById("id_sscc_destination").value;
var quantity_src = document.getElementById("id_quantity_source").value;
var quantity_dest = document.getElementById("id_quantity_destination").value;
var dest_batch = document.getElementById("id_batch_destination").value;

stockcat_dest=stockcat_src;
if(src_stype == dest_stype && src_sbin == dest_sbin){
alert("Source and  Destination storage type and bin cannot be same !!");
}
else{
if(Number(quantity_dest)>0 && Number(quantity_src)>0){
if(Number(quantity_dest)<=Number(quantity_src)){
	xmldoc = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Usability/TO_Movement/QueryTemplate/XAC_MoveStockDetailstoDestination&Param.1="+plant+"&Param.2="+src_sscc+"&Param.3="+src_stype+"&Param.4="+src_sbin+"&Param.5="+src_batch+"&Param.6="+material+"&Param.7="+dest_stype+"&Param.8="+dest_sbin+"&Param.9="+stgeloc+"&Param.10="+uom+"&Param.11="+whsenumber+"&Param.12="+quantity_src+"&Param.13="+quantity_dest+"&Param.14="+dest_batch+"&Param.15="+dest_sscc+"&Param.16="+material+"&Param.17="+source_type+"&Param.18="+dest_type+"&Param.19="+stockcat_src+"&Param.20="+stockcat_dest+"&Content-Type=text/xml");
	console.log(xmldoc);
	var err_msg = $(xmldoc).find('Message').text();
	console.log(err_msg);
	if(err_msg != ""){
	alert(err_msg);
	}
	else{
	var to_number = $(xmldoc).find('TONumber').text();
	alert("Stock Successfully Transferred with TO Number "+to_number);
	setToEmpty();
	}

}
else{
alert("Destination Quantity should be lesser than or equal to Source quantity.");
}
}
else{
alert("Source and  Destination quantity should be positive.");
}
}
}

function setToEmpty(){
	clearSourceDetails();
	clearDestinationDetails();
}

function clearSourceDetails(){
	document.getElementById("id_scan_source").value="";
	document.getElementById("id_mat_id_source").value ="";
	document.getElementById("id_batch_source").value ="";
	document.getElementById("id_sssc_source").value ="";
	document.getElementById("id_sbin_source").value ="";
	document.getElementById("id_stype_source").value ="";
	document.getElementById("id_sled_source").value ="";
	document.getElementById("id_quantity_source").value ="";
	document.getElementById("uom_source").innerHTML = "";
	document.getElementById("source_details").style.visibility="hidden";
	document.getElementById("destination").style.visibility="hidden";
	document.getElementById("destination_details").style.visibility="hidden";
	document.getElementById("div_sscc_dest").style.visibility="hidden";
}

function clearDestinationDetails(){
	document.getElementById("id_scan_destination").value="";
	document.getElementById("id_sscc_destination").value ="";
	document.getElementById("id_sbin_destination").value ="";
	document.getElementById("id_stype_destination").value ="";
	document.getElementById("id_batch_destination").value ="";
	document.getElementById("id_quantity_destination").value ="";
	document.getElementById("uom_destination").innerHTML = "";
	document.getElementById("destination_details").style.visibility="hidden";
	document.getElementById("div_sscc_dest").style.visibility="hidden";
}
function getPlant_Timestamp(){

	xmldoc = loadXMLDoc("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Usability/TO_Movement/QueryTemplate/SQL_GetSupportedPlant&Content-Type=text/xml");
	//console.log(xmldoc);
	var plant = $(xmldoc).find('PLANT:eq(0)').text();
	document.getElementById("plant").innerHTML= "<b>Plant : </b>"+plant;
	var x = new Date();
	var datetime = x.toString().substring(4,24);
	document.getElementById("timestamp").innerHTML= "&nbsp;&nbsp;&nbsp;<b>Datetime : </b>"+datetime+"&nbsp;&nbsp;&nbsp;";

}

function paginateTable(){

$('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 10;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertBefore($table).find('span.page-number:first').addClass('active');
});

}

function doRowHover(rows){
$(rows).addClass('selected').siblings().removeClass('selected');
}

function doSelect(element){
	console.log(element.children[0].innerHTML);
	if(origin=="source"){
	document.getElementById("source_details").style.visibility="visible";
	document.getElementById("destination").style.visibility="visible";

	document.getElementById("id_mat_id_source").value =element.children[0].innerHTML;
	document.getElementById("id_batch_source").value =element.children[1].innerHTML;
	document.getElementById("id_sssc_source").value =element.children[2].innerHTML;
	document.getElementById("id_sbin_source").value =element.children[3].innerHTML;
	document.getElementById("id_stype_source").value =element.children[4].innerHTML;
	document.getElementById("id_sled_source").value =element.children[5].innerHTML;
	document.getElementById("id_quantity_source").value =element.children[6].innerHTML;
	document.getElementById("id_stockcat_source").value =element.children[11].innerHTML;
	plant = element.children[7].innerHTML;
	whsenumber = element.children[8].innerHTML;
	stgeloc = element.children[9].innerHTML;
	uom = element.children[10].innerHTML;
	stockcat_src = element.children[11].innerHTML;
	document.getElementById("uom_source").innerHTML = uom;
	console.log(plant+"&&"+whsenumber+"&&"+stgeloc+"&&"+uom);
	//modal.style.display = "none";	
	document.getElementById("myContent").style.transform="rotateY(0deg)";
	document.getElementById("myModal").style.transform="rotateY(180deg)";	
	}
	else{
	var src_batch = document.getElementById("id_batch_source").value;
	var src_mat = document.getElementById("id_mat_id_source").value;

	document.getElementById("destination_details").style.visibility="visible";
	document.getElementById("div_sscc_dest").style.visibility ="visible";
	document.getElementById("id_sscc_destination").value =element.children[2].innerHTML;
	document.getElementById("id_batch_destination").value =element.children[1].innerHTML;
	document.getElementById("id_sbin_destination").value =element.children[3].innerHTML;
	document.getElementById("id_stype_destination").value =element.children[4].innerHTML;
	document.getElementById("id_quantity_destination").value =element.children[6].innerHTML;
	//document.getElementById("id_quantity_destination").value =document.getElementById("id_quantity_source").value
	document.getElementById("uom_destination").innerHTML = document.getElementById("uom_source").innerHTML ;
	stockcat_dest = element.children[11].innerHTML;
	//modal.style.display = "none";	
	document.getElementById("myContent").style.transform="rotateY(0deg)";
	document.getElementById("myModal").style.transform="rotateY(180deg)";	
	
	}

}

function xslt_Transform(xml){
console.log(xml);
xsl = loadXMLDoc("/XMII/CM/PerformanceManagement/Usability/TO_Movement/XML_to_HTML.xsl");
console.log(xsl);
// code for IE
if (window.ActiveXObject)
  {
  resultDocument = xml.transformNode(xsl);
  //document.getElementById("example").innerHTML = resultDocument;
  }
// code for Chrome, Firefox, Opera, etc.
else if (document.implementation && document.implementation.createDocument)
  {
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  resultDocument = xsltProcessor.transformToFragment(xml, document);
  //document.getElementById("example").appendChild(resultDocument);
  }

return resultDocument;
}

function createTable(xmldoc){

var total_rows = $(xmldoc).find('Row').size();
//table_html= '<table id="popupTable" class="paginated" border="1"> <col class="col1"/> <col class="col2"/> <col class="col3"/> <col class="col4"/> <col class="col5"/> <col class="col6"/> <col class="col7"/> <col class="col8"/> <col class="col9"/> <col class="col10"/> <col class="col11"/> <col class="col12"/>';

console.log(dest_type+"&&&"+origin+"&&&"+source_type);
if(dest_type=="SU" && origin=="destination"){
table_html = '<table id="popupTable" class="paginated" border="1"><tr bgcolor="#9acd32"><th style="display:none">MATERIAL</th><th style="display:none">BATCH</th><th>SSCC</th><th style="display:none">Sbin</th><th style="display:none">SType</th><th style="display:none">SLed</th><th>Qty</th><th style="display:none">PLANT</th><th style="display:none">WHSENUMBER</th><th style="display:none">STGE LOC</th><th style="display:none">BASE UOM</th><th style="display:none">Stock Cat</th></tr>'
}
else if(source_type=="NONSU"){
table_html = '<table id="popupTable" class="paginated" border="1"><tr bgcolor="#9acd32"><th>MATERIAL</th><th>BATCH</th><th style="display:none">SSCC</th><th style="display:none">Sbin</th><th style="display:none">SType</th><th>SLed</th><th>Qty</th><th style="display:none">PLANT</th><th style="display:none">WHSENUMBER</th><th style="display:none">STGE LOC</th><th style="display:none">BASE UOM</th><th>Stock Cat</th></tr>'
}
else{
table_html = '<table id="popupTable" class="paginated" border="1"><tr bgcolor="#9acd32"><th>MATERIAL</th><th>BATCH</th><th>SSCC</th><th style="display:none">Sbin</th><th style="display:none">SType</th><th>SLed</th><th>Qty</th><th style="display:none">PLANT</th><th style="display:none">WHSENUMBER</th><th style="display:none">STGE LOC</th><th style="display:none">BASE UOM</th><th>Stock Cat</th></tr>'
}
for(var i=0; i<total_rows;i++){

	var mat =$(xmldoc).find('MATERIAL').eq(i).text();
	var bat=$(xmldoc).find('BATCH').eq(i).text();
	var ssce =$(xmldoc).find('STOR_UNIT').eq(i).text();
	var sbin =$(xmldoc).find('STGE_BIN').eq(i).text();
	var stype =$(xmldoc).find('STGE_TYPE').eq(i).text();
	var sled =$(xmldoc).find('EXPIRYDATE').eq(i).text();
	var qty =$(xmldoc).find('AVAIL_STCK').eq(i).text();
	var plant = $(xmldoc).find('PLANT').eq(i).text();
	var whsenumber = $(xmldoc).find('WHSENUMBER').eq(i).text();
	var stgeloc = $(xmldoc).find('STGE_LOC').eq(i).text();
	var uom = $(xmldoc).find('BASE_UOM').eq(i).text();
	var stock_cat = $(xmldoc).find('STOCK_CAT').eq(i).text();

	var row = "";
	if(dest_type=="SU" && origin=="destination"){
	row = "<tr onmouseover='doRowHover(this)' onclick='doSelect(this)'><td style='display:none'>"+mat+"</td><td style='display:none'>"+bat+"</td><td>"+ssce+"</td><td style='display:none'>"+sbin+"</td><td style='display:none'>"+stype+"</td><td style='display:none'>"+sled+"</td><td>"+qty+"</td><td style='display:none'>"+plant+"</td><td style='display:none'>"+whsenumber+"</td><td style='display:none'>"+stgeloc+"</td><td style='display:none'>"+uom+"</td><td style='display:none'>"+stock_cat+"</td></tr>"
	}
	else if(source_type=="NONSU"){
	row = "<tr onmouseover='doRowHover(this)' onclick='doSelect(this)'><td>"+mat+"</td><td>"+bat+"</td><td style='display:none'>"+ssce+"</td><td style='display:none'>"+sbin+"</td><td style='display:none'>"+stype+"</td><td>"+sled+"</td><td>"+qty+"</td><td style='display:none'>"+plant+"</td><td style='display:none'>"+whsenumber+"</td><td style='display:none'>"+stgeloc+"</td><td style='display:none'>"+uom+"</td><td>"+stock_cat+"</td></tr>"
	}
	else{
	row = "<tr onmouseover='doRowHover(this)' onclick='doSelect(this)'><td>"+mat+"</td><td>"+bat+"</td><td>"+ssce+"</td><td style='display:none'>"+sbin+"</td><td style='display:none'>"+stype+"</td><td>"+sled+"</td><td>"+qty+"</td><td style='display:none'>"+plant+"</td><td style='display:none'>"+whsenumber+"</td><td style='display:none'>"+stgeloc+"</td><td style='display:none'>"+uom+"</td><td>"+stock_cat+"</td></tr>"
	}
	table_html+=row; 
}
return table_html;

}

function hideSpecificTableColumns(type,stype,sbin,org){

var tbl = document.getElementById('popupTable');
console.log(type);
document.getElementById("header_dialog").innerHTML="<h3>Select Material From SType "+stype+" Sbin "+sbin+"</h3>";

if(type=="NONSU"){
var col = tbl.getElementsByTagName('col')[2];
console.log(col);
   if (col) {
     col.style.visibility="collapse";
   }
}

if(type=="SU" && org=="destination"){
var col = tbl.getElementsByTagName('col')[0];
console.log(col);
   if (col) {
     col.style.visibility="collapse";
   }
var col = tbl.getElementsByTagName('col')[1];
console.log(col);
   if (col) {
     col.style.visibility="collapse";
   }
var col = tbl.getElementsByTagName('col')[3];
console.log(col);
   if (col) {
     col.style.visibility="collapse";
   }
var col = tbl.getElementsByTagName('col')[4];
console.log(col);
   if (col) {
     col.style.visibility="collapse";
   }

var col = tbl.getElementsByTagName('col')[5];
console.log(col);
   if (col) {
     col.style.visibility="collapse";
   }

}
}

function checkifPartial(){

if(source_type=="SU" && dest_type=="SU"){
console.log("dd"+document.getElementById("id_quantity_source").value);
document.getElementById("id_quantity_destination").readOnly=true;
document.getElementById("id_quantity_destination").value=document.getElementById("id_quantity_source").value;
}

else if(source_type=="SU" && dest_type=="NONSU")
document.getElementById("id_quantity_destination").readOnly=false;

else if(source_type=="NONSU" && dest_type=="NONSU")
document.getElementById("id_quantity_destination").readOnly=false;

else if(source_type=="NONSU" && dest_type=="SU")
document.getElementById("id_quantity_destination").readOnly=false;


}

function doLogout(){
window.open("/XMII/Illuminator?service=logout&target=/XMII/CM/PerformanceManagement/Usability/TO_Movement/Transfer_Stock.irpt","_self");
}

function customAlert(msg){
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = msg;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}