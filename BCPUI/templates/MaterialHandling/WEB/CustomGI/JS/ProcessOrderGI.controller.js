var oResourceModel,oBCPStatusModel;
var userLanguage,oControllerThis;
var oResModel;
var client,plant;
var nodeID;
var oDisplayTable;
var oSelectedContext,oTablindex;
var order,matNo,des;
var prodType,pDateFromURL;
var nodeFromURL,oDialog1;
var selectList,selectedItem,selectedKey;
var resFromURL;
var res,plannedDate,pDateFromURL;
var day1,clientFromURL,plantFromURL;
var bcpElement,GITitle;
var resFromURL,linedesc;
var sLoc_whNo_source, storageLoc, whNo;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.ProcessOrderGI",{


onInit : function(){


		$(document).keydown(function(evt){
 		  if (evt.keyCode==13){
   		    evt.preventDefault();
   		sap.ui.controller("JS.ProcessOrderGI").doRefresh();
   			}
});
		jQuery.sap.require("sap.ui.commons.MessageBox");
		jQuery.sap.require("sap.ui.core.format.DateFormat"); 
		var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
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
		var details="NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,ODATA_Error,CustomGI_GI_23,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDashboard_Goods_Issue,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,NPDashboard_Confirm,NPDashboard_Close,POPOVER_LOGOUT,EPO_UI_GIMessage,NPM_COMMON_Message, NPDashboard_Error,GI_EWM_Msg";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
		/* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
		this.getView().byId("pageID").setModel(oResourceModel, "header");
		this.getView().byId("Form1").setModel(oResourceModel, "label");
		this.getView().byId("Search").setModel(oResourceModel, "search");
		this.getView().byId("ProcessOrderTable").setModel(oResourceModel, "column"); */
		//document.title=getPropertyValue(oResourceModel, "NPDashboard_Goods_Issue");
                       resFromURL=decodeURIComponent(getURLParameter("resFromURL"));
                        GITitle=getPropertyValue(oResourceModel, "CustomGI_GI_23"); 
                          document.title=GITitle+"-"+resFromURL;
		var page = this.getView().byId("pageID");
		var identifier = "GIPO1>NPDashboard_Back,GIPO2>InBndMatRecpt_title_BCP,GIPO3>CustomGI_PO_1,GIPO4>CustomGI_PO_2,GIPO5>CustomGI_PO_3,GIPO6>CustomGI_PO_4,GIPO7>CustomGI_PO_5,GIPO8>CustomGI_PO_6,GIPO9>CustomGI_PO_7,GIPO10>CustomGI_PO_8,GIPO11>CustomGI_PO_9,GIPO12>CustomGI_PO_Days,GIPO13>CustomGI_PO_DateRange";
		localize(page, identifier,userLanguage);
		range2=this.getView().byId("range2").getValue();
		nodeFromURL=decodeURIComponent(getURLParameter("nodeFromURL"));
		range2=this.getView().byId("range2").getValue();
	          //oControllerThis.ResourceChange();
	
		

	//////////////////////////////////////////////////////////////////////////////////////BUSINESS METRICS//////////////////////////////////////////////////////////////////////////////////////
                         var oBusinessMetricsModel= new sap.ui.model.xml.XMLModel();
                    	oBusinessMetricsModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/BusinessMetrics/QueryTemplates/XACQ_GI_CountOfCallsOfScreen&d="+DateNw+"&Content-Type=text/xml"),"",false);
		
           ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			
	},

onAfterRendering : function(){
if(nodeFromURL != "" && nodeFromURL!=undefined ){
		
		var DateNw = new Date();
		day1=getURLParameter("day1");
		 range2=this.getView().byId("range2").setValue(day1);
		day1=this.getView().byId("range2").getValue();
		 this.getView().byId("resource").setSelectedKey(nodeFromURL);
		var oTableDisplayModel= new sap.ui.model.xml.XMLModel();
                          oTableDisplayModel.setSizeLimit(10000);
		oTableDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_ProcessOrderDetails_GI&Param.1="+clientFromURL+"&Param.2="+nodeFromURL+"&Param.3="+plantFromURL+"&Param.4="+userLanguage+"&Param.5="+day1+"&Param.7=EPO&d="+DateNw+"&Content-Type=text/xml"),"",false);
		oDisplayTable= this.getView().byId("ProcessOrderTable");
		oDisplayTable.setModel(oTableDisplayModel);
		//var ProcessOrderItems = this.getView().byId("ProcessOrderItems");
		//oDisplayTable.bindItems("/Rowset/Row",ProcessOrderItems); 
		}
		var res="RESOURCES"
                        var Error=getPropertyValue(oResourceModel,"ODATA_Error");
                        var resourceSelect = this.getView().byId("resource");
                        sortinglines(plantFromURL,clientFromURL,userLanguage,resourceSelect,Error,0);	
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
doRefresh : function(){

var aColumns = oDisplayTable.getColumns();
			for (var i=0; i<aColumns.length; i++)
			{
				aColumns[i].setSorted(false);
				aColumns[i].setFiltered(false);
			}	
sap.ui.getCore().getElementById("ProcessOrderGI--Search").setValue("");
range2=sap.ui.getCore().getElementById("ProcessOrderGI--range2").getValue();
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
		oTableDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_ProcessOrderDetails_GI&Param.1="+clientFromURL+"&Param.2="+nodeID+"&Param.3="+plantFromURL+"&Param.4="+userLanguage+"&Param.5="+range2+"&Param.7=EPO&d="+DateNw+"&Content-Type=text/xml"),"",true);
		oTableDisplayModel.attachRequestCompleted(function()
								{
									sap.ui.core.BusyIndicator.hide();
									
								});
		oDisplayTable= this.getView().byId("ProcessOrderTable");
		oDisplayTable.setModel(oTableDisplayModel);
		//var ProcessOrderItems = this.getView().byId("ProcessOrderItems");
		//oDisplayTable.bindItems("/Rowset/Row",ProcessOrderItems); 
		res=this.getView().byId("resource").getSelectedItem().getText();
		 
	 linedesc=this.getView().byId("resource").getValue();	
             document.title=GITitle+"-"+linedesc;	
		// alert(res);
},

onSearch : function(oEvent){
			var sQuery =oEvent.getSource().getValue();
			oDisplayTable= this.getView().byId("ProcessOrderTable");
			
	    		var oFilter1 = new sap.ui.model.Filter("Order",sap.ui.model.FilterOperator.Contains,sQuery); 
			var oFilter2 = new sap.ui.model.Filter("Material",sap.ui.model.FilterOperator.Contains,sQuery);  
			var oFilter3 = new sap.ui.model.Filter("MaterialDescription",sap.ui.model.FilterOperator.Contains,sQuery);  
			var oFilter4 = new sap.ui.model.Filter("PlannedStart",sap.ui.model.FilterOperator.Contains,sQuery);
			var oFilter5 = new sap.ui.model.Filter("Target",sap.ui.model.FilterOperator.Contains,sQuery); 
			var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2,oFilter3,oFilter4,oFilter5], false); 
			oDisplayTable.getBinding("rows").filter(allFilter); 

},

rowSelectionPage : function()
{
	var h="";
	var DateNw = new Date();
	day1=oControllerThis.getView().byId("range2").getValue();
	oDisplayTable=this.getView().byId("ProcessOrderTable");
	//matTablindex = oPOHdrTable.getSelectedIndex();
	var matTablindex = oDisplayTable.getSelectedIndex();
	if(matTablindex!= -1){
	  oSelectedContext = oDisplayTable.getContextByIndex(matTablindex);
	   //orderselected = oPOHdrTable.getModel().getProperty("/Rowset/Row/" + matTablindex + "/Order");
	  order = oDisplayTable.getModel().getProperty(oSelectedContext + "/Order");
	  //orderselected = oPOHdrTable.getModel().getProperty(oTablindex1 + "/AUFNR");
	  // alert(order);
	  oBCPStatusModel= new sap.ui.model.xml.XMLModel();
	  oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d="+DateNw+"&Content-Type=text/xml"),"",false);
	  oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");
	
	  matNo = oDisplayTable.getModel().getProperty(oSelectedContext+"/Material");
	  des = oDisplayTable.getModel().getProperty(oSelectedContext+"/MaterialDescription");
	  prodType = oDisplayTable.getModel().getProperty(oSelectedContext+"/ProdType");
	  plannedDate=oDisplayTable.getModel().getProperty(oSelectedContext+"/PlannedStart");
	  var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern : "yyyy-MM-dd"}); 
	  pDateFromURL = dateFormat.format(new Date(plannedDate));	
		pDateFromURL=pDateFromURL+"T00:00:00Z";
	  // alert(plannedDate);
	  nodeID = oControllerThis.getView().byId("resource").getSelectedKey();
	  res=oControllerThis.getView().byId("resource").getSelectedItem().getText();

	  ////////////////////////////////////////////////WarehouseNo//////////////////////////////////////////////////////////////
	  var whModel = new sap.ui.model.xml.XMLModel();
	  whModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + matNo + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + getPO(order)[0] + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
	  whNo = whModel.getProperty('/Rowset/Row/WHNumber');

	  ////////////////////////////////////////////////SLOC//////////////////////////////////////////////////////////////
	  var ogetSlocAndWh= new sap.ui.model.xml.XMLModel();
	  ogetSlocAndWh.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/SQL_GetStorageLocation&Param.1="+getPO(order)[0]+"&Param.2=" +clientFromURL+ "&Param.3="+plantFromURL+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);   
	  storageLoc = ogetSlocAndWh.getProperty("/Rowset/Row/LGORT");

	  ////////////////////////////////////////////////EWMorECC//////////////////////////////////////////////////////////////
	  var ogetSource= new sap.ui.model.xml.XMLModel();
	  ogetSource.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_getSource_SLOC_WHNO&Param.1="+storageLoc+"&d=" + DateNw + "&Content-Type=text/xml"), "", false);
	  sLoc_whNo_source = ogetSource.getProperty("/Rowset/Row/source");
	  if(sLoc_whNo_source=="EWM"){
	    sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "GI_EWM_Msg"),{ title: getPropertyValue(oResourceModel, "NPDashboard_Error")});
	  } else if(nodeFromURL !="" && nodeFromURL !="undefined" && nodeFromURL != undefined){
	    window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL="+order+"&matFromURL="+matNo+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+encodeURIComponent(h)+"&pDateFromURL="+pDateFromURL+"&desFromURL="+encodeURIComponent(des)+"&typeFromURL="+prodType+"&nodeFromURL="+encodeURIComponent(nodeID)+"&resFromURL="+encodeURIComponent(res)),"_self");
	  } else{
	   window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ComponentList.irpt?orderFromURL="+order+"&matFromURL="+matNo+"&day1="+day1+"&clientFromURL="+clientFromURL+"&plantFromURL="+plantFromURL+"&headerFromURL="+encodeURIComponent(h)+"&pDateFromURL="+pDateFromURL+"&desFromURL="+encodeURIComponent(des)+"&typeFromURL="+prodType+"&nodeFromURL="+encodeURIComponent(nodeID)+"&resFromURL="+encodeURIComponent(res)),"_self");
	  }
	}

},
getDateDisplayFormat: function(date){
	
	if(date === "0000-00-00"){
		return date;
	}else{
		return formatDate(date,"yyyy/MM/dd");
	}
},

getFormattedQuantityUOM: function(obj1, obj2){
	
	var FormattedQuantity = formatQuantity(obj1, "FORMAT");
		return (FormattedQuantity + " " +obj2);

}

});