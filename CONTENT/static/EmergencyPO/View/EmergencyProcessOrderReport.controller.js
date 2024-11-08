	jQuery.sap.require("sap.ui.core.format.DateFormat");
	jQuery.sap.require("sap.ui.commons.MessageBox");
	jQuery.sap.require("sap.m.MessageBox");
var selectedNodeId;
var userLanguage;
var oResourceModel;
var plant;
var nodeID;
var bDescending;
var sQuery="";
var oEPOtable;
var bcpElement;
var oBCPStats;
var nodeDesc;

sap.ui.controller("ePO.EmergencyProcessOrderReport", {
	

onInit: function() {

	bcpElement = this.getView().byId("bcpHDR");	
	oBCPStats = getBCPStatus(bcpElement,"","");
	bDescending = true;
	var DateNw = new Date();
	var oUserDataModel= new sap.ui.model.xml.XMLModel();
	oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml","",false);
	userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
	var details= "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,ODATA_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,EPOPROP_MESSAGE_TYPE,NPDashboard_Close,EPOPROP_LINE_NAME";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);
		
	var oPlantModel = new sap.ui.model.xml.XMLModel();
	oPlantModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&Param.1="+userLanguage+"&cache="+DateNw+"&Content-Type=text/xml"),"",false); 
	plant= oPlantModel.getProperty("/Rowset/Row/PLANT");
	client= oPlantModel.getProperty("/Rowset/Row/CLIENT");
	/*oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
	this.getView().byId("page").setModel(oResourceModel,"EPO_PROP"); */
	var page = this.getView().byId("page");
		var identifier = "IMReceipt1>NPDashboard_Home,title1>InBndMatRecpt_title_BCP,EPO_PROP1>EPO_UI_EMERGENCY_PO_REPORT,EPO_PROP2>EPO_UI_SELECTION_PANEL,EPO_PROP3>EPO_UI_SELECTION_PANEL,EPO_PROP4>EPO_UI_MATERIAL,EPO_PROP5>EPO_UI_PV,EPO_PROP6>EPO_UI_MATERIAL_SOURCE_PO,EPO_PROP7>EPO_UI_REFRESH,EPO_PROP8>EPO_UI_MATERIAL_SOURCE_PO,EPO_PROP9>EPO_UI_CRID,EPO_PROP10>EPO_UI_MATERIAL,EPO_PROP11>EPO_UI_MAT_DESC,EPO_PROP12>EPO_UI_PV,EPO_PROP13>EPO_UI_QUANTITY,EPO_PROP14>EPO_UI_PROD_DATE,EPO_PROP15>EPO_UI_STATUS,EPO_PROP16>EPO_UI_CREATEDBY,EPO_PROP17>EPO_UI_COMMENTS";
		localize(page, identifier,userLanguage);

	var userName = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;	
	this.getView().byId("usernameIds").setUsername(userName);

	nodeID = decodeURIComponent(getURLParameter("node"));
	var oModel1= new sap.ui.model.xml.XMLModel();
	oModel1.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/SQLQ_GetLineByNode&Param.1="+plant+"&Param.2="+userLanguage+"&Param.3="+nodeID+"&d="+DateNw+"&Content-Type=text/xml","",false);
	nodeDesc = oModel1.getProperty("/Rowset/Row/DESCRIPTION");
	//var msg = getURLParameter("msg");

	var oModel= new sap.ui.model.xml.XMLModel();
	
	this.getView().byId("lineValueHlpBtn").setText(decodeURIComponent(nodeDesc));
	if(nodeID == "" || nodeID == undefined){
		this.getView().byId("lineValueHlpBtn").setText("Click here to select a line");
	}
	

	
	var oEPOTableModel= new sap.ui.model.xml.XMLModel();
                  oEPOTableModel.setSizeLimit(10000);
	oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1="+nodeID+"&Param.2=%&Param.3=%&Param.4=%&Param.5=1&Param.6="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
	oEPOtable = this.getView().byId("iDEPOTble");
	oEPOtable.setModel(oEPOTableModel);
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
this.getView().byId("shell1").getUser().setUsername(username);
},


goBack: function(){
	window.top.close();
},

getDocType: function(){
/*
var refresh = new Date();
var docValueHlpBtn = this.getView().byId("docValueHlpBtn");
var oListXMLModel = new sap.ui.model.xml.XMLModel();

var xmlText = "<Rowsets><Rowset><Row><DESCRIPTION>LOIPRO</DESCRIPTION></Row><Row><DESCRIPTION>Control Recipe</DESCRIPTION></Row></Rowset></Rowsets>";

oListXMLModel.setXML(xmlText);

var searchDoc = new sap.m.SearchField({placeholder: "Search", liveChange: function(oEvent){
				   			var sQuery = oEvent.getSource().getValue();
    							var binding = oListDoc.getBinding("items");
 
    							var filters = [
        							new sap.ui.model.Filter("DESCRIPTION", sap.ui.model.FilterOperator.Contains, sQuery)
   
    								];
    							var oFilter = new sap.ui.model.Filter({
        										aFilters: filters,
        										_bMultiFilter: true
    								      }); 
 
    							binding.filter(oFilter);

							}
					});
var oListDoc= new sap.m.List({
				mode:sap.m.ListMode.SingleSelectMaster , 
				includeItemInSelection: true,
				select: function () {
					var selectedDocType = oListDoc.getSelectedItem().getTitle();	
					docValueHlpBtn.setText(selectedDocType);
					oDialogDocSearch.close();
					oDialogDocSearch.destroy();	
				}
				
		});
var oListItem = new sap.m.StandardListItem({
    				title: "{DESCRIPTION}",
				tooltip: "{DESCRIPTION}"
		});

oListDoc.setModel(oListXMLModel);
oListDoc.bindAggregation("items", "/Rowset/Row", oListItem);

////////////////////////////////////////////////// Dialog for Doc Search /////////////////////////////////////////////////////

	var oDialogDocSearch = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel,"EPOPROP_MESSAGE_TYPE"),
			content: [searchDoc, oListDoc],
			buttons: [
					new sap.m.Button({
					text: getPropertyValue(oResourceModel,"NPDashboard_Close"),
					press: function () {
						oDialogDocSearch.close();
						oDialogDocSearch.destroy();
					}})
				]
					
				});
	
		oDialogDocSearch.setContentWidth("500px");
		oDialogDocSearch.setContentHeight("700px");
		oDialogDocSearch.open();
*/
},


getLines: function () {
		var refresh = new Date();
		var lineValueHlpBtn = this.getView().byId("lineValueHlpBtn");
		var WorkcenterModel = new sap.ui.model.xml.XMLModel();
                       WorkcenterModel.setSizeLimit(10000);
		WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines&Param.1=" + plant + "&Param.2=" + userLanguage + "&Param.4=0&Param.5=0&Param.6=0&cache=" + refresh + "&Content-Type=text/xml", "", false);
		var userLocale1 = WorkcenterModel.getProperty('/Rowset/Row/USER_LANGUAGE');
		var oDataFlag = WorkcenterModel.getProperty('/Rowset/Row/ODATA_FLAG');
		var Error = getPropertyValue(oResourceModel, "ODATA_Error");

		if (oDataFlag == 1) {

			var xsrfidvalue;
			var xsrfid = "/XMII/IlluminatorOData/QueryTemplate?xsrfid=Fetch";
			$.ajax({
				type: "GET",
				async: false,
				success: function (data, textStatus, request) {

					xsrfidvalue = request.getResponseHeader('xsrfid');
				},
				error: function (request, textStatus, errorThrown) {
					console.log(request.getResponseHeader('xsrfid'));

				},
				url: xsrfid
			});
			var data = {
				client: client,
				extensionClient: client,
				extensionPlant: plant,
				plant: plant,

				userLocale: userLocale1
			};

			var eventurl = "/OEEDashboard/DataAccessServlet/GetPHNodesForUserInput?xsrfid=" + xsrfidvalue;
			$.ajax({
				type: "POST",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(data),

				async: false,
				success: function (data) {
					console.log(data);
					var ODataForPH = JSON.stringify(data);

					WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines", "Param.1=" + plant + "&Param.2=" + userLanguage + "&Param.3=" + encodeURIComponent(ODataForPH) + "&Param.4=1&Param.5=0&Param.6=0&cache=" + new Date() + "&Content-Type=text/xml", false, "POST");
 
				},
				error: function (errorThrown) {
					
					
                                                             WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines&Param.1=" + plant + "&Param.2=" + userLanguage + "&Param.4=0&Param.5=1&Param.6=0&cache=" + refresh + "&Content-Type=text/xml", "", false);
				},
				url: eventurl
			});
		}
		var searchLine = new sap.m.SearchField({
			placeholder: "Search for Line",
			liveChange: function (oEvent) {
				var sQuery = oEvent.getSource().getValue();
				var binding = oListLine.getBinding("items");

				var filters = [
					new sap.ui.model.Filter("DESCRIPTION", sap.ui.model.FilterOperator.Contains, sQuery)

				];
				var oFilter = new sap.ui.model.Filter({
					aFilters: filters,
					_bMultiFilter: true
				});

				binding.filter(oFilter);

			}
		});
		var oListLine = new sap.m.List({
			mode: sap.m.ListMode.SingleSelectMaster,
			includeItemInSelection: true,
			select: function () {
				var selectedLine = oListLine.getSelectedItem().getTitle();
				selectedNodeId = oListLine.getSelectedItem().getTooltip();
				lineValueHlpBtn.setText(selectedLine);

				var DateNw = new Date();
				var oEPOTableModel = new sap.ui.model.xml.XMLModel();
				oEPOTableModel.setSizeLimit(10000);
				oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1=" + selectedNodeId + "&Param.2=%&Param.3=%&Param.4=%&Param.5=1&Param.6=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
				oEPOtable.setModel(oEPOTableModel);
				oDialogLineSearch.close();
				oDialogLineSearch.destroy();
			}
		});
		var oListItem = new sap.m.StandardListItem({
			title: "{DESCRIPTION}",
			tooltip: "{NODE_ID}"
		});

		oListLine.setModel(WorkcenterModel);
		oListLine.bindAggregation("items", "/Rowset/Row", oListItem);

		////////////////////////////////////////////////// Dialog for Line Search /////////////////////////////////////////////////////

		var oDialogLineSearch = new sap.m.Dialog({
			title: getPropertyValue(oResourceModel, "EPOPROP_LINE_NAME"),
			content: [searchLine, oListLine],
			buttons: [
				new sap.m.Button({
					text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
					press: function () {
						oDialogLineSearch.close();
						oDialogLineSearch.destroy();
					}
				})
			]

		});

		oDialogLineSearch.setContentWidth("500px");
		oDialogLineSearch.setContentHeight("700px");
		oDialogLineSearch.open();
	},

onFilter: function(oEvent){

	sQuery = oEvent.getSource().getValue();
    	var binding = this.getView().byId("iDEPOTble").getBinding("items");
    	var filters = [
 		         new sap.ui.model.Filter("PO", sap.ui.model.FilterOperator.Contains, sQuery),
		         new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sQuery),
		         new sap.ui.model.Filter("PV", sap.ui.model.FilterOperator.Contains, sQuery)
		        ];
    	var oFilter = new sap.ui.model.Filter({
        						aFilters: filters,
        						_bMultiFilter: true
    						}); 
 
    	binding.filter(oFilter);
},
onSort: function(oEvent){
	bDescending = !bDescending;
	var aSorters = [];
	aSorters.push(new sap.ui.model.Sorter("PLANNED_STDATE", bDescending));
    	var filters = [
 		         new sap.ui.model.Filter("PLANNED_STDATE", sap.ui.model.FilterOperator.Contains, sQuery)
		        
		        ];
	var aFilters =  new sap.ui.model.Filter({
        						aFilters: filters,
        						_bMultiFilter: true
    						}); 
 
	this.byId("iDEPOTble").getBinding("items").filter(aFilters).sort(aSorters);
},


refresh: function(oEvent){
	
	var DateNw = new Date();
	var MATNR = this.getView().byId("inputMat").getValue();
	var PV = this.getView().byId("inputPV").getValue();
	//var MATDesc = this.getView().byId("inputMatDesc").getValue();
	var PO = this.getView().byId("inputSPO").getValue();

			if (MATNR=="")
				{ MATNR="%"; }
			if (PV=="")
				{ PV="%"; }
		
			if (PO=="")
				{ PO="%"; }

var oEPOTableModel= new sap.ui.model.xml.XMLModel();
          oEPOTableModel.setSizeLimit(10000);
	oEPOTableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/EmergencyPO/QueryTemplates/XACQ_GetLOIPRO_PODetails&Param.1="+nodeID+"&Param.2="+PO+"&Param.3="+MATNR+"&Param.4="+PV+"&Param.5=1&Param.6="+userLanguage+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
	var oEPOtable = this.getView().byId("iDEPOTble");
	oEPOtable.setModel(oEPOTableModel);
	
},
getDateDisplayFormat: function(date){
	
	if(date === "0000-00-00"){
		return date;
	}else{
		return formatDate(date,"MM/dd/yyyy HH:mm:ss","YES");
	}
},

getFormattedQuantityUOM: function(obj1, obj2){
		
		var FormattedQuantity = formatQuantity(obj1, "FORMAT");
		return (FormattedQuantity + " " +obj2);

}
}); 

