var oResourceModel,oBCPStatusModel;
var userLanguage,oControllerThis;
var oResModel;
var client,plant;
var nodeID;
var oDisplayTable;
var oSelectedContext,oTablindex;
var order,matNo,des;
var prodType;
var nodeFromURL,oDialog1;
var selectList,selectedItem,selectedKey; 
var resFromURL;
var clientFromURL,plantFromURL;
var lineDescFromURL;
var res,range2,plannedDate;
var day1,headerFromURL,count;
var oTableDisplayModel,pDateFromURL;
var bcpElement,GRTitle,linedesc;
var storageLoc, sLoc_whNo_source;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.ProcessOrder",{

onInit : function(){

		$(document).keydown(function(evt){
 		  if (evt.keyCode==13){
   		    evt.preventDefault();
   		sap.ui.controller("JS.ProcessOrder").doSave();
   			}
			});
		jQuery.sap.require("sap.ui.commons.MessageBox");
		oControllerThis = this;
		plantFromURL=getURLParameter("plantFromURL");
		clientFromURL=getURLParameter("clientFromURL");
		
		range2=this.getView().byId("range2").setValue("30");
		 var DateNw = new Date();

		bcpElement = this.getView().byId("bcpStatus");	
		oBCPStats = getBCPStatus(bcpElement,"","");

		var oUserDataModel= new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml","",false);
		
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
		var details= "CustomGR_GR_1,CustomGR_GR_23,CustomGR_alert_19,ODATA_Error,NPDashboard_Cancel,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDashboard_Yes,NPDashboard_No,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,NPDashboard_Confirm,NPDashboard_Close,POPOVER_LOGOUT,EPO_UI_GRMessage,NPM_COMMON_Message, GR_EWM_Msg,NPDashboard_Error";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		this.getView().byId("pageID").setModel(oResourceModel, "header");
		this.getView().byId("Form1").setModel(oResourceModel, "label");
		this.getView().byId("Search").setModel(oResourceModel, "search");
		this.getView().byId("ProcessOrderTable").setModel(oResourceModel, "column"); */

		
                         GRTitle=getPropertyValue(oResourceModel, "CustomGR_GR_23")
		
		var page = this.getView().byId("pageID");

		var identifier = "GRPO1>NPDashboard_Back,GRPO2>InBndMatRecpt_title_BCP,GRPO3>CustomGR_PO_1,GRPO4>CustomGR_PO_2,GRPO5>CustomGR_PO_3,GRPO6>CustomGR_PO_4,GRPO7>CustomGR_PO_5,GRPO8>CustomGR_PO_6,GRPO9>CustomGR_PO_7,GRPO10>CustomGR_PO_8,GRPO11>CustomGR_PO_9,GRPO12>CustomGR_PO_10,GRPO13>CustomGR_PO_11,GRPO14>CustomGR_PO_12";
		localize(page, identifier,userLanguage);
		nodeFromURL=getURLParameter("nodeFromURL");
	             resFromURL=decodeURIComponent(getURLParameter("resFromURL"));
		range2=this.getView().byId("range2").getValue();
		document.title=GRTitle+"-"+resFromURL;
		 if(nodeFromURL != "" && nodeFromURL!=undefined ){
		var DateNw = new Date();
		
		day1=getURLParameter("day1");
		 range2=this.getView().byId("range2").setValue(day1);
		day1=this.getView().byId("range2").getValue();
		 this.getView().byId("resource").setSelectedKey(nodeFromURL);
	 	// nodeID = this.getView().byId("resource").getSelectedKey();
		oTableDisplayModel= new sap.ui.model.xml.XMLModel();
                        oTableDisplayModel.setSizeLimit(10000);
		oTableDisplayModel.attachRequestSent(function()
	{
		sap.ui.core.BusyIndicator.show(1);
	});  
		oTableDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_ProcessOrderDetails&Param.1="+clientFromURL+"&Param.2="+nodeFromURL+"&Param.3="+plantFromURL+"&Param.4="+userLanguage+"&Param.5="+day1+"&Param.7=EPO&d="+DateNw+"&Content-Type=text/xml"),"",true);
		oTableDisplayModel.attachRequestCompleted(function()
								{        
									sap.ui.core.BusyIndicator.hide();		

		oDisplayTable= oControllerThis.getView().byId("ProcessOrderTable");
		oDisplayTable.setModel(oTableDisplayModel);
		/*var xmlDoc = oTableDisplayModel.getXML();
		var i =0;
		$(xmlDoc).find("Row").each(function() {

			var percentValue = oTableDisplayModel.getProperty("/Rowset/Row/"+i+"/Tar");
			percentValue=percentValue*1;
			sap.ui.getCore().getElementById("ProcessOrder--pi-col7-row"+ (i%8) +"").setPercentValue(percentValue);
			i++;
		});*/
		}); 
		}
                      var Error=getPropertyValue(oResourceModel,"ODATA_Error");
                       var resourceSelect = this.getView().byId("resource");	   
                       sortinglines(plantFromURL,clientFromURL,userLanguage,resourceSelect,Error,0);			
	           var res="RESOURCES"
		
		SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(elem) { return elem.getScreenCTM().inverse().multiply(this.getScreenCTM()); };
		
           //////////////////////////////////////////////////////////////////////////////////////BUSINESS METRICS//////////////////////////////////////////////////////////////////////////////////////
                         var oBusinessMetricsModel= new sap.ui.model.xml.XMLModel();
                    	oBusinessMetricsModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_GR_CountOfCallsOfScreen&d="+DateNw+"&Content-Type=text/xml"),"",false);
		
           ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	},

onAfterRendering : function(){
/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg,sessionExpTitle);

/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
setInterval(function(){
oBCPStats = getBCPStatus(bcpElement,"","");
},30000);	


var username = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;
this.getView().byId("shell3").getUser().setUsername(username);
},

onSearch : function(oEvent){
	var sQuery =oEvent.getSource().getValue();
	oDisplayTable= this.getView().byId("ProcessOrderTable");
	
	//oControllerThis.clearFilterSortProcessOrderTable(oDisplayTable);
	var oFilter1 = new sap.ui.model.Filter("Order",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter2 = new sap.ui.model.Filter("Material",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter3 = new sap.ui.model.Filter("MaterialDescription",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter4 = new sap.ui.model.Filter("DeclaredQuantity",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter5 = new sap.ui.model.Filter("Target",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter6 = new sap.ui.model.Filter("Tar",sap.ui.model.FilterOperator.Contains,sQuery);  
	var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5,oFilter6], false); 
	oDisplayTable.getBinding("rows").filter(allFilter); 
		
},

doSave : function(){
sap.ui.getCore().getElementById("ProcessOrder--Search").setValue("");
range2=sap.ui.getCore().getElementById("ProcessOrder--range2").getValue();
oControllerThis.ResourceChange();

},
ResourceChange : function()
{
	var DateNw = new Date();
	 nodeID = this.getView().byId("resource").getSelectedKey();
	range2=this.getView().byId("range2").getValue();
	var oTableDisplayModel= new sap.ui.model.xml.XMLModel();
            oTableDisplayModel.setSizeLimit(10000); 
	oTableDisplayModel.attachRequestSent(function()
	  {
	   sap.ui.core.BusyIndicator.show(1);
	   });  
	oTableDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_ProcessOrderDetails&Param.1="+clientFromURL+"&Param.2="+nodeID+"&Param.3="+plantFromURL+"&Param.4="+userLanguage+"&Param.5="+range2+"&Param.7=EPO&d="+DateNw+"&Content-Type=text/xml"),"",true);
	oTableDisplayModel.attachRequestCompleted(function()
	  {      
		sap.ui.core.BusyIndicator.hide();		
		oDisplayTable= oControllerThis.getView().byId("ProcessOrderTable");
		oDisplayTable.setModel(oTableDisplayModel);
		oControllerThis.clearFilterSortProcessOrderTable(oDisplayTable);////////////Clear the SORTorFilter selection on Process Order Table////////// Userstory 1088994///////////////////////////////
		res=oControllerThis.getView().byId("resource").getSelectedItem().getText();					
	});							
		
	linedesc=this.getView().byId("resource").getValue();	
             document.title=GRTitle+"-"+linedesc;

},

///////////////////////////////////////////////Clear the SORTorFilter selection on Process Order Table////////// Userstory 1088994///////////////////////////////
clearFilterSortProcessOrderTable : function(uiTableID)
{
	uiTableID.clearSelection();
	var iTotalCols = uiTableID.getColumns().length;
	var oListBinding = uiTableID.getBinding();
	if (oListBinding) {
	  oListBinding.aSorters = null;
	  oListBinding.aFilters = null;
	}
	uiTableID.getModel().refresh(true);
	for (var iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
	  uiTableID.getColumns()[iColCounter].setSorted(false);
	  uiTableID.getColumns()[iColCounter].setFilterValue("");
	  uiTableID.getColumns()[iColCounter].setFiltered(false);
	}
},

rowSelectionPage : function(evt)
{
	var DateNw = new Date();
	//oDisplayTable=oControllerThis.getView().byId("ProcessOrderTable");
	var oSourceTable=evt.getSource();
	nodeID = oControllerThis.getView().byId("resource").getSelectedKey();
	var selectedIndex= oSourceTable.getSelectedIndex();
	if(selectedIndex!= -1){console.log(selectedIndex);
	oSelectedContext = oSourceTable.getBinding().getPath() +"/"+ oSourceTable.getBinding().aIndices[selectedIndex];
	order = oSourceTable.getModel().getProperty(oSelectedContext+"/Order");console.log(order);
	//console.log(order);
	//console.log(oBCPStats);
 	oBCPStatusModel= new sap.ui.model.xml.XMLModel();
	oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d="+DateNw+"&Content-Type=text/xml"),"",false);
	oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");
	
	matNo = oSourceTable.getModel().getProperty(oSelectedContext+"/Material");
	des = oSourceTable.getModel().getProperty(oSelectedContext+"/MaterialDescription");
	prodType = oSourceTable.getModel().getProperty(oSelectedContext+"/ProdType");
	plannedDate=oSourceTable.getModel().getProperty(oSelectedContext+"/PlannedStart");
	jQuery.sap.require("sap.ui.core.format.DateFormat"); 
	var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
	pDateFromURL = dateFormat.format(new Date(plannedDate));	
	pDateFromURL=pDateFromURL+"T00:00:00Z";
	headerFromURL=matNo+"*"+des;
	var odialogModel1= new sap.ui.model.xml.XMLModel();
             odialogModel1.setSizeLimit(10000);
	odialogModel1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetMaterials_GR&Param.1="+order+"&Param.2="+userLanguage+"&Param.3="+nodeID+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
	 selectList = new sap.m.SelectList({selectionChange: sap.ui.controller("JS.ProcessOrder").okDialogFn});
			var odialogItemline= new sap.ui.core.ListItem();
			odialogItemline.bindProperty("text", "Value");
			odialogItemline.bindProperty("key", "Key");
			selectList.bindItems("/Rowset/Row", odialogItemline);
			selectList.setModel(odialogModel1);
			count = selectList.getItems().length;
			
			if(count>1){
			oDialog1 = new sap.m.Dialog({
			title:getPropertyValue(oResourceModel, "CustomGR_alert_19"),			
			content:[selectList],
			buttons: [		
				
					new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
					press: function () {
					
					 
					oDialog1.close();
				//oSourceTable.removeSelections(true);
					}

					})
				],
	});
	
				oDialog1.setContentWidth("520px");
				oDialog1.setContentHeight("200px");
					oDialog1.open(); 

			
	}
	else{
	
	var prodType1 = oSourceTable.getModel().getProperty(oSelectedContext+"/ProdType");
	var a=prodType1.split("---");
	prodType=a[0];
	su=a[1];
	day1=oControllerThis.getView().byId("range2").getValue();
 	nodeID = oControllerThis.getView().byId("resource").getSelectedKey();
	res=oControllerThis.getView().byId("resource").getSelectedItem().getText();
	if (oControllerThis.checkIfSLOC_EWM(order,clientFromURL,plantFromURL) && (prodType=="COPRODUCT" || prodType=="BYPRODUCT")){
	  sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "GR_EWM_Msg"),{ title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
	} else {
	  window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GoodReceipt.irpt?orderFromURL="+order+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+headerFromURL+"&matFromURL="+matNo+"&desFromURL="+encodeURIComponent(des)+"&day1="+day1+"&typeFromURL="+prodType+"&pDateFromURL="+pDateFromURL+"&nodeFromURL="+nodeID+"&resFromURL="+encodeURIComponent(res)+"&suFromURL="+su),"_self");
	}

		}
	}
	
},

okDialogFn : function(){

selectedKey = selectList.getSelectedKey();
selectedItem = selectList.getSelectedItem().getText();
oDialog1.destroy();
var a = selectedKey.split("---");
var b = selectedItem.split("--")[1];
des=b;
//alert(encodeURIComponent(des));
matNo=a[1];
prodType=a[0];
su=a[2];
day1=oControllerThis.getView().byId("range2").getValue();
 nodeID = oControllerThis.getView().byId("resource").getSelectedKey();
res=oControllerThis.getView().byId("resource").getSelectedItem().getText();

if (oControllerThis.checkIfSLOC_EWM(order,clientFromURL,plantFromURL) && (prodType=="COPRODUCT" || prodType=="BYPRODUCT")){
  sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "GR_EWM_Msg"),{ title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
} else if(nodeFromURL !="" && nodeFromURL !="undefined" && nodeFromURL != undefined){
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GoodReceipt.irpt?orderFromURL="+order+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+headerFromURL+"&matFromURL="+matNo+"&desFromURL="+encodeURIComponent(des)+"&day1="+day1+"&typeFromURL="+prodType+"&pDateFromURL="+pDateFromURL+"&nodeFromURL="+nodeID+"&resFromURL="+encodeURIComponent(res)+"&suFromURL="+su),"_self");
} else{
window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/GoodReceipt.irpt?orderFromURL="+order+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+headerFromURL+"&matFromURL="+matNo+"&desFromURL="+encodeURIComponent(des)+"&day1="+day1+"&typeFromURL="+prodType+"&pDateFromURL="+pDateFromURL+"&nodeFromURL="+nodeID+"&resFromURL="+encodeURIComponent(res)+"&suFromURL="+su),"_self");
}

},

checkIfSLOC_EWM: function(ord,clientFromURL,plantFromURL){
	var DateNw = new Date();
    ////////////////////////////////////////////////SLOC//////////////////////////////////////////////////////////////
    var ogetSlocAndWh= new sap.ui.model.xml.XMLModel();
    ogetSlocAndWh.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+getPO(ord)[0]+"&Param.2=" +clientFromURL+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);   
    storageLoc = ogetSlocAndWh.getProperty("/Rowset/Row/LGORT");

     ////////////////////////////////////////////////EWMorECC//////////////////////////////////////////////////////////////
     var ogetSource= new sap.ui.model.xml.XMLModel();
     ogetSource.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);
     sLoc_whNo_source = ogetSource.getProperty("/Rowset/Row/source");
    return sLoc_whNo_source=="EWM";
},

getFormattedQuantityUOM: function(obj1, obj2){
  var formattedQuantity = formatQuantity(obj1, "FORMAT");
  return (formattedQuantity+" "+obj2);
},

getDateDisplayFormat: function(date){
	
	if(date === "0000-00-00"){
		return date;
	}else{
		return formatDate(date,"yyyy/MM/dd");
	}
}
});