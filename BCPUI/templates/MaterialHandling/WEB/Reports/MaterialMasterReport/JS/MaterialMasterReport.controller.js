var oBCPStatusModel;
var userLanguage;
var oResourceModel;
var plantFromURL,clientFromURL;
var bcpElement;
var storageLocation;
var materialType;
var mType;
var oHeaderTable;
var matNo;
var final_sloc;
var storeLoc;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.MaterialMasterReport",{
onInit : function(){
	oControllerThis = this;
	var refresh = new Date();
	plantFromURL=getURLParameter("plant");
	clientFromURL=getURLParameter("client");
	//plantFromURL="Y213";
	//clientFromURL="103";

	bcpElement = this.getView().byId("bcpStatus");	
	oBCPStats = getBCPStatus(bcpElement,"","");
	var oUserDataModel= new sap.ui.model.xml.XMLModel();
	oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&cache="+refresh+"&Content-Type=text/xml","",false);
	userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

	var details= "NPDashboard_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,CustomGR_GR_23,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GR_1,CustomGR_GMReport_20,CustomGR_GMReport_21";
	oResourceModel= new sap.ui.model.xml.XMLModel();
	oResourceModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&cache="+refresh+"&Content-Type=text/xml"),"",false);
	
	var DateNw = new Date();
	var page = this.getView().byId("pageID");
	var identifier = "MMReport>TransferDisplay_label_SLoc,MMReport1>MMReport_MatType,MMReport2>NPM_COMMON_ORD_MATERIAL,MMReport3>MMReport_Language,MMReport4>CustomGR_PO_3,MMReport5>TransferDisplay_colHeader1_uom,MMReport6>CustomGR_GMReport_16,MMReport7>MMReport_MatCode,MMReport8>MMReport_MatGrp,MMReport9>MMReport_PeriodIndForSLED,MMReport10>MMReport_RoundingRule,MMReport11>MMReport_MatStatus,MMReport12>MMReport_MRPCont,MMReport13>MMReport_BatchManaged,MMReport14>MMReport_BBDCalc,MMReport15>MMReport_FixedBBD,MMReport16>MMReport_CoProd,MMReport17>CustomGI_CM_5,MMReport18>MMReport_UoMTable,MMReport19>MMReport_WMTable,MMReport20>MMReport_Equivalence,MMReport21>MMReport_TechUoM,MMReport22>MMReport_EANCategory,MMReport23>MMReport_EANItemCode,MMReport24>MMReport_EANVariant,MMReport25>MMReport_Vol,MMReport26>MMReport_VolUoM,MMReport27>MMReport_Gross,MMReport28>MMReport_WeightUoM,MMReport29>NPM_COMMON_WAREHOUSE,MMReport30>InBndMatRecpt_colHeader_strgType,MMReport31>InBndMatRecpt_colHeader_strgBin,MMReport32>MMReport_StorageSec,MMReport33>MMReport_WMSpPro,MMReport34>MMReport_BulkInd,MMReport35>MMReport_LEQuant,MMReport36>MMReport_LEUnit,MMReport37>CustomGR_GMReport_11,MMReport38>MMReport_MatDesc,MMReport39>MMReport_SLEDDays,MMReport40>MMReport_ISOCODE,MMReport41>MMReport_ECCButton1,MMReport42>MMReport_ECCButton2,MMReport43>NPDashboard_Material_Master_Report,MMReport44>TransferDisplay_colHeader1_uom,MMReport45>NPDashboard_Back,MMReport46>InBndMatRecpt_title_BCP,MMReport47>CustomGR_GR_6,MMReport48>TransferDisplay_btn_disp,MMReport49>MMReport_SLOC";
	localize(page, identifier,userLanguage);
	var  properties="ODATA_Error,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,CustomGR_GMReport_1,GMReport_NoOfDaysValidation,MMReport_materialTypeSel,TransferDisplay_alert1,TransferDisplay_Message";
	oResourceModel = getResourceModel(properties,userLanguage);


///////////////////////////////////////// Select Storage Location ///////////////////////////////////////////

		var oStoLocModel= new sap.ui.model.xml.XMLModel();
                         oStoLocModel.setSizeLimit(10000);
		oStoLocModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetMaterialDetails&Param.1=3&d="+DateNw+"&OutputParameter=O_SLOC&Content-Type=text/xml"),"",false);
		 storeLoc = this.getView().byId("sLoc");
		 var ostoreLocitemline= new sap.ui.core.ListItem();
		ostoreLocitemline.bindProperty("text", "SLOC");
		ostoreLocitemline.bindProperty("key", "SLOC");
		 storeLoc.bindItems("/Rowset/Row", ostoreLocitemline);
		 storeLoc.setModel(oStoLocModel);
		storeLoc.setSelectedItems(storeLoc.getItems());
		oControllerThis.getSelectedValuesForSLOC();
		

////////////////////////////////////////////// Select Material type ////////////////////////////////////////////

	var oMatTypeModel= new sap.ui.model.xml.XMLModel();
            oMatTypeModel.setSizeLimit(10000);
	oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/SQLQ_GetMaterialType&Param.1="+clientFromURL+"&Param.2="+storageLocation+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
	var matType = this.getView().byId("matType");
	var oMatTypeitemline= new sap.ui.core.ListItem();
	oMatTypeitemline.bindProperty("text", "MTART");
	oMatTypeitemline.bindProperty("key", "MTART");
	matType.bindItems("/Rowset/Row", oMatTypeitemline);
	matType.setModel(oMatTypeModel);
	matType.setSelectedItems(matType.getItems());
	oControllerThis.getSelectedValues();
	//matType.setSelectedKey(oMatTypeModel.getProperty("/Rowset/Row/1/Key")); 
	//materialType = this.getView().byId("matType").getSelectedKey();
	//alert(materialType);

},

onAfterRendering : function(){
		

	var sessionExpMsg = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
	var sessionExpTitle = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
	setIdleTime(sessionExpMsg,sessionExpTitle);

	setInterval(function(){
		oBCPStats = getBCPStatus(bcpElement,"","");
	},30000);	

	var username = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;
	this.getView().byId("shell3").getUser().setUsername(username);

	//this.getView().byId("labelUoMTable").setVisible(false);
	//this.getView().byId("labelWMTable").setVisible(false);
	var materType = this.getView().byId("matType").setEnabled(false);
	var materType = this.getView().byId("sLoc").setEnabled(false);
	//this.getView().byId("idIconTabBar").setVisible(false);

},

getMMReport : function(){
	
	var DateNw = new Date();

	this.getView().byId("idIconTabBar").setVisible(false);
	this.getView().byId("ECCButton1").setEnabled(false);
	this.getView().byId("ECCButton2").setEnabled(false);

	materialType = sap.ui.getCore().getElementById("MaterialMasterReport--matType").getSelectedKeys();
	sloc_getSelected = sap.ui.getCore().getElementById("MaterialMasterReport--sLoc").getSelectedKeys();
	var chkboxAll = sap.ui.getCore().getElementById("MaterialMasterReport--allChckBox");
	var c1 =chkboxAll.getSelected();

	var chkboxAllForSloc = sap.ui.getCore().getElementById("MaterialMasterReport--allChckBox1");
	var c2 = chkboxAllForSloc.getSelected();
	
	if((sloc_getSelected == "" || sloc_getSelected==null || sloc_getSelected=="---") && chkboxAllForSloc.getSelected() == false){
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferDisplay_alert1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
	}

	else if((materialType == "" || materialType==null || materialType=="---") && chkboxAll.getSelected() == false){
		jQuery.sap.require("sap.ui.commons.MessageBox");
		sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"MMReport_materialTypeSel"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
	}

	oControllerThis.getSelectedValues();
	oControllerThis.getSelectedValuesForSLOC();
	var material = sap.ui.getCore().getElementById("MaterialMasterReport--MatNum").getValue();

	if(chkboxAllForSloc.getSelected() == true) 
	{
		var oStoLocModel= new sap.ui.model.xml.XMLModel();
                         oStoLocModel.setSizeLimit(10000);
		oStoLocModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetMaterialDetails&Param.1=3&d="+DateNw+"&OutputParameter=O_SLOC&Content-Type=text/xml"),"",false);
		var sLocXML = oStoLocModel.getData();
		var Type_sloc = "";
		$(sLocXML).find('Row').each(function()
		{
			var Types_sloc = $(this).find('SLOC');
			var length1 = $(Types_sloc).length;
			$(Types_sloc).each(function(index)
			{
				Type_sloc += "','"+Types_sloc.eq(index).text(); 
			});
		});
			
		var slocSelec = Type_sloc.substr(2,Type_sloc.length);
		storageLocation="("+slocSelec+"')";
	}
	
	if(chkboxAll.getSelected() == true)
	{
		var oMatTypeModel= new sap.ui.model.xml.XMLModel();
     	     	oMatTypeModel.setSizeLimit(10000);
		oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/SQLQ_GetMaterialType&Param.1="+clientFromURL+"&Param.2="+storageLocation+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var mTypexml = oMatTypeModel.getData();
		var Type = "";
		$(mTypexml).find('Row').each(function()
		{
			var Types = $(this).find('MTART');
			var length = $(Types).length;
			$(Types).each(function(index)
			{
				Type += "','"+Types.eq(index).text(); 
			});
		});
			
		var mType1 = Type.substr(2,Type.length);
		materialType="("+mType1+"')";
	}
	
		
	if(storageLocation!= "(undefined)" && materialType!= "(undefined)"){
		this.getView().byId("btnExcelReportId").setEnabled(true);
		oDisplayTable= this.getView().byId("MMTable");
		var MMHeaderReportModel = new sap.ui.model.xml.XMLModel();
		 MMHeaderReportModel.setSizeLimit(10000);
		MMHeaderReportModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetMaterialDetails&Param.1=0&Param.2="+storageLocation+"&Param.3="+materialType+"&Param.4="+material+"&Param.5="+clientFromURL+"&d="+DateNw+"&OutputParameter=O_HeaderXML&Content-Type=text/xml","", false);	
		oDisplayTable.setModel(MMHeaderReportModel);	
	}

},

getSLOC : function(){

	var DateNw = new Date();
	var oMatTypeModel= new sap.ui.model.xml.XMLModel();
            oMatTypeModel.setSizeLimit(10000);
	oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/SQLQ_GetMaterialType&Param.1="+clientFromURL+"&Param.2="+storageLocation+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
	var matType = this.getView().byId("matType");
	var oMatTypeitemline= new sap.ui.core.ListItem();
	oMatTypeitemline.bindProperty("text", "MTART");
	oMatTypeitemline.bindProperty("key", "MTART");
	matType.bindItems("/Rowset/Row", oMatTypeitemline);
	matType.setModel(oMatTypeModel);
},

/*getMatType : function(){
	
	var DateNw = new Date();
	var matType1 = this.getView().byId("matType").setEnabled(true);
	var oMatTypeModel= new sap.ui.model.xml.XMLModel();
            oMatTypeModel.setSizeLimit(10000);
	oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/SQLQ_GetMaterialType&Param.1="+clientFromURL+"&Param.2="+storageLocation+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
	var matType = this.getView().byId("matType");
	var oMatTypeitemline= new sap.ui.core.ListItem();
	oMatTypeitemline.bindProperty("text", "MTART");
	oMatTypeitemline.bindProperty("key", "MTART");
	matType.bindItems("/Rowset/Row", oMatTypeitemline);
	matType.setModel(oMatTypeModel);

},*/

getSelectedValues : function(){
	var DateNw = new Date();
	var mtype;
	var material_type = this.getView().byId("matType").getSelectedKeys();

	var j = material_type.length;
		
		for (var i = 0; i< j ; i++)																																									            		
		{	
		var matTypeString = material_type[i];

		if(matTypeString.length>0){
		if(i==0){
		mtype= "'"+matTypeString+"'";
		
			}
		else{
	 	mtype= mtype+",'"+matTypeString+"'";
			}	
		}
		}
		materialType = "("+mtype+")";
},

getSelectedValuesForSLOC: function(){
	var DateNw = new Date();
	var sloc;
	var sloc_selected = this.getView().byId("sLoc").getSelectedKeys();

	var j = sloc_selected.length;
		
		for (var i = 0; i< j ; i++)																																									            		
		{	
		var slocString = sloc_selected[i];

		if(slocString.length>0){
		if(i==0){
		sloc= "'"+slocString+"'";
		
			}
		else{
	 	sloc= sloc+",'"+slocString+"'";
			}	
		}
		}	
		storageLocation = "("+sloc+")";
},

ChartMultiComboSelection: function(){
	var DateNw = new Date();
	var chkboxAll = this.getView().byId("allChckBox");
	if(chkboxAll.getSelected() == true){
		var matType = this.getView().byId("matType");
		var matType1 = this.getView().byId("matType").setSelectedKeys("");
		var materType = this.getView().byId("matType").setEnabled(false);
		var oMatTypeModel= new sap.ui.model.xml.XMLModel();
     	     	oMatTypeModel.setSizeLimit(10000);
		oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/SQLQ_GetMaterialType&Param.1="+clientFromURL+"&Param.2="+storageLocation+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var mTypexml = oMatTypeModel.getData();
		var Type = "";
		matType.setSelectedItems(matType.getItems());
		$(mTypexml).find('Row').each(function()
		{
			var Types = $(this).find('MTART');
			var length = $(Types).length;
			$(Types).each(function(index)
			{
				Type += "','"+Types.eq(index).text(); 
			});
		});
			
		var mType1 = Type.substr(2,Type.length);
		mType="("+mType1+"')";
	}
	else{
		this.getView().byId("matType").setSelectedKeys("");
		var matType = this.getView().byId("matType").setEnabled(true);
	}
	
},

ChartMultiComboSelection1: function(){
	var DateNw = new Date();
	var chkboxAll_sloc = this.getView().byId("allChckBox1");
	if(chkboxAll_sloc.getSelected() == true){
		var sloc1 = this.getView().byId("sLoc").setSelectedKeys("");
		var slocCheck = this.getView().byId("sLoc").setEnabled(false);
		var oStoLocModel= new sap.ui.model.xml.XMLModel();
                         oStoLocModel.setSizeLimit(10000);
		oStoLocModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetMaterialDetails&Param.1=3&d="+DateNw+"&OutputParameter=O_SLOC&Content-Type=text/xml"),"",false);
		var sLocXML = oStoLocModel.getData();
		var Type_sloc = "";
		storeLoc.setSelectedItems(storeLoc.getItems());
		$(sLocXML).find('Row').each(function()
		{
			var Types_sloc = $(this).find('SLOC');
			var length1 = $(Types_sloc).length;
			$(Types_sloc).each(function(index)
			{
				Type_sloc += "','"+Types_sloc.eq(index).text(); 
			});
		});
			
		var slocSelec = Type_sloc.substr(2,Type_sloc.length);
		slocs="("+slocSelec+"')";
	}
	else{
		this.getView().byId("sLoc").setSelectedKeys("");
		var slocVisible = this.getView().byId("sLoc").setEnabled(true);
	}
},

onRowSelection : function(){
		var DateNw = new Date();
		oHeaderTable = this.getView().byId("MMTable");
		var oHeaderTableModel = oHeaderTable.getModel();
		var headerTablindex = oHeaderTable.getSelectedIndex();
		if(headerTablindex != -1){
			var oSelectedIndex = oHeaderTable.getSelectedIndex();
			var oSelectedContext = oHeaderTable.getContextByIndex(oSelectedIndex);
			var matNo= oHeaderTableModel.getProperty("MATERIAL_NUMBER",oSelectedContext);
			var selectedSLOC= oHeaderTableModel.getProperty("SLOC",oSelectedContext);
		
			this.getView().byId("MatNumber").setValue(matNo);
			this.getView().byId("MatNumber_WM").setValue(matNo);
					
			var baseUoM= oHeaderTableModel.getProperty("MEINS",oSelectedContext);
			this.getView().byId("baseuom").setValue(baseUoM);

			this.getView().byId("ECCButton1").setEnabled(true);
			this.getView().byId("ECCButton2").setEnabled(true);
			this.getView().byId("idIconTabBar").setVisible(true);
			this.getView().byId("labelUoMTable").setVisible(true);
			this.getView().byId("labelWMTable").setVisible(true);
			this.getView().byId("idIconTabBar").setSelectedKey("user_tabfilter");
		
			oDisplayUoMTable= this.getView().byId("MMTable_UoM");
			oDisplayWMTable= this.getView().byId("MMTable_WM");
			var MMReport_uomWmModel = new sap.ui.model.xml.XMLModel();
			//MMReport_uomModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetMaterialDetails&Param.1=1&Param.4="+matNo+"&d="+DateNw+"&OutputParameter=O_UoMXML&Content-Type=text/xml","", false);	
			
			MMReport_uomWmModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetMaterialDetails&Param.1=1&Param.2="+selectedSLOC+"&Param.4="+matNo+"&Param.5="+clientFromURL+"&d="+DateNw+"&OutputParameter=O_UOMAndWMTable&Content-Type=text/xml","", false);	
		
			//var b = MMReport_uomWmModel.getData("/Rowsets/Rowset/0/Row");
			//var a = MMReport_uomWmModel.getData("/Rowsets/Rowset/1/Row");

			oDisplayUoMTable.bindRows("/Rowset/0/Row");
			//oDisplayUoMTable.setModel(MMReport_uomModel);	
	
			oDisplayWMTable.bindRows("/Rowset/1/Row");

			oDisplayUoMTable.setModel(MMReport_uomWmModel);
			oDisplayWMTable.setModel(MMReport_uomWmModel);

			oDisplayUoMTable.invalidate();
			oDisplayWMTable.invalidate();
			
			/*oDisplayWMTable= this.getView().byId("MMTable_WM");
			var MMReport_wmModel = new sap.ui.model.xml.XMLModel();
			MMReport_wmModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetMaterialDetails&Param.1=2&Param.4="+matNo+"&d="+DateNw+"&OutputParameter=O_WMXML&Content-Type=text/xml","", false);	
			oDisplayWMTable.setModel(MMReport_wmModel);	*/
			
			  
			//sap.ui.getCore().byId("MaterialMasterReport--MMTable_UoM-tableCCnt").setFocus();

		}
		else{
			this.getView().byId("idIconTabBar").setVisible(false);
			this.getView().byId("ECCButton1").setEnabled(false);
			this.getView().byId("ECCButton2").setEnabled(false);
		}
		
		//window.scrollTo(0,document.querySelector(".scrollingContainer").scrollHeight);
		/*$("html, body").animate({ 
                  	  scrollTop: $( 'html, body').get(0).scrollHeight 
                	}, 2000); */
},


onSearch: function(oEvent){
	var sQuery =oEvent.getSource().getValue();
	var oMMTable= this.getView().byId("MMTable");
		
			
	var oFilter2 = new sap.ui.model.Filter("MATERIAL_NUMBER",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter3 = new sap.ui.model.Filter("MAKTX",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter4 = new sap.ui.model.Filter("MTART",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter5 = new sap.ui.model.Filter("MATNR_CODE",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter6 = new sap.ui.model.Filter("MATKL",sap.ui.model.FilterOperator.Contains,sQuery);
	var oFilter7 = new sap.ui.model.Filter("MEINS",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter9 = new sap.ui.model.Filter("SLED",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter10 = new sap.ui.model.Filter("SLED_PERIOD",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter11 = new sap.ui.model.Filter("ROUNDING_RULE",sap.ui.model.FilterOperator.Contains,sQuery);  
	var oFilter12 = new sap.ui.model.Filter("PSTAT",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter13 = new sap.ui.model.Filter("MRP_CONTROLLER",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter14 = new sap.ui.model.Filter("XCHPF",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter15 = new sap.ui.model.Filter("BBD_FLAG",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter16 = new sap.ui.model.Filter("IPKRZ_PAL",sap.ui.model.FilterOperator.Contains,sQuery); 
	var oFilter17 = new sap.ui.model.Filter("COPRODUCT_FLAG",sap.ui.model.FilterOperator.Contains,sQuery); 
	var allFilter = new sap.ui.model.Filter([oFilter2,oFilter3,oFilter4, oFilter5,oFilter6,oFilter7,oFilter9,oFilter10,oFilter11,oFilter12,oFilter13,oFilter14,oFilter15,oFilter16,oFilter17], false); 
	oMMTable.getBinding("rows").filter(allFilter);
},

goToECC_DISP: function(){
		
	var oMMTable = this.getView().byId("MMTable");
	var oMMTableModel = oMMTable.getModel();
	var oSelectedIndex = oMMTable.getSelectedIndex();
	var oSelectedContext = oMMTable.getContextByIndex(oSelectedIndex);
	var materialnum= oMMTableModel.getProperty("MATERIAL_NUMBER",oSelectedContext);
	var refresh = new Date();
	var oECCURLModel= new sap.ui.model.xml.XMLModel();
	oECCURLModel.attachRequestSent(function(){
		sap.ui.core.BusyIndicator.show(1);
	});

	oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetECCURL&Param.1="+plantFromURL+"&Param.2="+materialnum+"&Param.3=MMDISP&cache="+refresh+"&Content-Type=text/xml"),"",true);

	oECCURLModel.attachRequestCompleted(function(){
		sap.ui.core.BusyIndicator.hide();
		var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
		window.open(oURL);
	});

},

goToECC_MM03: function(){
		
var oMMTable = this.getView().byId("MMTable");
	var oMMTableModel = oMMTable.getModel();
	var oSelectedIndex = oMMTable.getSelectedIndex();
	var oSelectedContext = oMMTable.getContextByIndex(oSelectedIndex);
	var materialnum= oMMTableModel.getProperty("MATERIAL_NUMBER",oSelectedContext);
	var refresh = new Date();
	var oECCURLModel= new sap.ui.model.xml.XMLModel();
	oECCURLModel.attachRequestSent(function(){
		sap.ui.core.BusyIndicator.show(1);
	});

	oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Reports/MaterialMasterReport/QueryTemplate/XACQ_GetECCURL&Param.2="+materialnum+"&Param.3=MM03&cache="+refresh+"&Content-Type=text/xml"),"",true);

	oECCURLModel.attachRequestCompleted(function(){
		sap.ui.core.BusyIndicator.hide();
		var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
		window.open(oURL);
	});

},

getExcelReport: function(){
	var inpXML;
	var oRowCount = 0;
	var refresh = new Date();
	var oMMTable = this.getView().byId("MMTable");
			
	
	try{
		inpXML= oMMTable.getModel().getXML(); 
		oRowCount = $(inpXML).find('Row').size();
	}catch(e){

	}
	
	if(oRowCount > 0){
		sap.ui.core.BusyIndicator.show(1);
		var Url = "/XMII/Runner?Transaction=MaterialHandling/Reports/MaterialMasterReport/Transactions/BLS_ExportMMReport";
		var xhr = new XMLHttpRequest();
		xhr.open("POST", Url, true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = "blob";
		xhr.onload = function(eventInfo)
		{
			if (this.status == 200)
			{
				var blob = this.response;
  		     	 	saveAs(blob, "MMReport.xls");
			}
		};
		xhr.send("I_InputXML="+encodeURIComponent(inpXML)+"&cache="+refresh+"&OutputParameter=O_MMReport");
		xhr.onloadend = function(){
			sap.ui.core.BusyIndicator.hide();  
		};
	}
},

getSLEDPERIODFormat : function(period){

if(period=="1"){
return "W";
}
else if (period =="2"){
return "M";
}
else if (period =="3"){
return "Y";
}
else{
return "D";
}

},

goHome : function(){
	window.top.close();
}
});