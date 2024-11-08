var oBCPStatusModel;
var oResourceModel;
var oPlant;
var oSourceSUnit;
var oSourceSType;
var oSourceSBin;
var oSourceBatch;
var oSourceMaterial;
var oDestSType;
var oDestSBin;
var oStorageLoc;
var oUOM;
var Batchflag=0;
var oWHNumber;
var oSourceQuantity;
var oDestQuantity;
var oDestBatch;
var oDestSUnit;
var oDestMaterial;
var oSourceMovType;
var oDestMovType;
var oSorceStockCat;
var oDestStockCat;
var oProdDate;
var oUOM;
var oQuantity;
var oProdDate;	
var oUnitType;
var oSourceWHNumber;
var oSLED;
var oPlant;
var oFlag;
var SSCCNSUSU;
var oHeaderType ;
var oStockCategory;
var oBatchNumber;
var TOBatchFlag;
var oStorageUnite;
var oBatchStatus;
var oTONumber;
var oMessage;
var oHeaderTypeText;
var SSCCNumber;
var oSSCCFlag;
var oManualEntry;
var printingFlag;
var printerName;
var noOfCopiesInput;
var printingParams;
var nodeFromUrl;
var oDestSLED;
var bcpElement;
var oCommUOM,client;

sap.ui.controller("JS.TransferOrder", {

	onInit: function() 
	{
		///////////////////////////////////////////////////////////////////////////////////URL Parameter/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		nodeFromUrl = getURLParameter("nodeId");
		///////////////////////////////////////////////////////////////////////////////////DropDown/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var sLocDDType="STORAGELOC";
		var wareNoDDType="WAREHOUSENO";

		///////////////////////////////////////// Select Storage Location ///////////////////////////////////////////
		var dateRefresh=new Date();
		var oStoLocModel= new sap.ui.model.xml.XMLModel();
		oStoLocModel.setSizeLimit(10000);
		oStoLocModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+sLocDDType+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);
		var storeLoc = this.getView().byId("StorageLoc1");
		var ostoreLocitemline= new sap.ui.core.ListItem();
		ostoreLocitemline.bindProperty("text", "Value");
		ostoreLocitemline.bindProperty("key", "Value");
		storeLoc.bindItems("/Rowset/Row", ostoreLocitemline);
		storeLoc.setModel(oStoLocModel);
		storeLoc.setSelectedKey("Select SLOC");

		///////////////////////////////////////// Select WarehouseNo ///////////////////////////////////////////

		/*var oWareNoModel= new sap.ui.model.xml.XMLModel();
            oWareNoModel.setSizeLimit(10000);
	oWareNoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+wareNoDDType+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);
	var wareNo = this.getView().byId("Warehouse1");
	var warehuseNo= oWareNoModel.getProperty("/Rowset/Row/Key");
	wareNo.setValue(warehuseNo);*/


		var DateNw = new Date();

		var oUserDataModel= new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d="+DateNw+"&Content-Type=text/xml","",false);
		var userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

		var details="SSCC_MSG1,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,BCP_COMMON_MSG_QUANTITY,TransferDisplay_tile,TransferDisplay_Message,TransferType_alert_DestQuantityPositive,TransferType_alert_DQuantityLesserSQuantity,TransferType_alert_DestSledGreaterSourceSled,TransferType_alert_SelectStorageBin,TransferType_alert_LengthStorageBin,TransferType_alert_DestSTypeandBin,TransferType_alert_LengthStorageUnit,NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,TransferType_alert_SelectStoageType,TransferType_alert_SelectStorageUnit,TransferType_alert_ExistSBIN,TransferType_alert_SelectStoageType,TransferType_alert_SelectSLoc,TransferType_alert_SelectWHNumber,TransferType_alert_SelectStoageType,TransferType_alert_SLocNotEqualDestLoc,TO_MSG4,TransferDisplay_Confirm,TransferType_alert_TONumber,TransferType_alert_SuccessCreated,TransferDisplay_Success,BCP_COMMON_VALID_QUANTITY,CustomGR_alert_27";
		oResourceModel= new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2="+userLanguage+"&Param.3="+details+"&d="+DateNw+"&Content-Type=text/xml","",false);

		/*oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});

	this.getView().byId("page").setModel(oResourceModel, "header");
	this.getView().byId("SourcePanel").setModel(oResourceModel, "title");
	this.getView().byId("DestinationPanel").setModel(oResourceModel, "title");
	this.getView().byId("Form1").setModel(oResourceModel, "label");
	this.getView().byId("Form2").setModel(oResourceModel, "label");
	this.getView().byId("CreateTransferOrder").setModel(oResourceModel, "button");*/
		document.title=getPropertyValue(oResourceModel,"TransferDisplay_tile");

		var page = this.getView().byId("page");
		var identifier = "buttonCreateTO>TrasferType_btn_CreateTransferOrder,title1>InBndMatRecpt_title_BCP,title2>TransferType_title_Source,label1>TransferType_Lbl_StorageLocation,label2>TransferDisplay_label_WHNo,label3>TransferType_Lbl_StorageType,label4>TransferType_Lbl_StorageBin,label5>TransferType_Lbl_UnitType,label6>TransferType_Lbl_StorageUnite,label7>TransferType_Lbl_MatNumber,label8>TransferType_Lbl_BatchNumber,label9>TransferType_Lbl_SLED,label10>TransferType_Lbl_StockCategory,label11>TransferType_Lbl_Quantity,label12>TransferType_Lbl_BatchStatus,title3>TransferType_title_Destination,label13>TransferType_Lbl_StorageLocation,label14>TransferDisplay_label_WHNo,label15>TransferType_Lbl_StorageType,label16>TransferType_Lbl_StorageType,label17>TransferType_Lbl_StorageBin,label18>TransferType_Lbl_StorageBin,label19>TransferType_Lbl_UnitType,label20>TransferType_Lbl_StorageUnite,label21>TransferType_Lbl_StorageUnite,label22>TransferType_Lbl_MatNumber,label23>TransferType_Lbl_BatchNumber,label24>TransferType_Lbl_SLED,label25>TransferType_Lbl_StockCategory,label26>TransferType_Lbl_Quantity,label27>TransferType_Lbl_BatchStatus,label28>NPORTAL_COMMON_LABEL_PRINTER_NAME,label29>NPORTAL_COMMON_LABEL_NO_OF_COPIES,buttonCTO>TrasferType_btn_CreateTransferOrder";
		localize(page, identifier,userLanguage);

		var userName = document.getElementById("firstname").value+" "+document.getElementById("lastname").value;	
		this.getView().byId("usernameIds").setUsername(userName);
///////////////////////////////////////////////////////////////////Client/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var ClientModel = new sap.ui.model.xml.XMLModel();
		ClientModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&d=" + DateNw + "&Content-Type=text/xml", "", false);
		client = ClientModel.getProperty("/Rowset/Row/CLIENT");
		////////////////////////////////////////////////////////////////////////////////////////////////////BCP Status /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		bcpElement = this.getView().byId("bcpHDRIMR");	
		oBCPStats = getBCPStatus(bcpElement,"","");

/////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
		var oModelDF= new sap.ui.model.xml.XMLModel();
		oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache="+new Date()+"&Content-Type=text/xml","",false);
		var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
		//this.getView().byId("SLED").setDisplayFormat(oDisplayFormat);
		this.getView().byId("SLED1").setDisplayFormat(oDisplayFormat);

	},

	onAfterRendering : function()
	{

/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel,"NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg,sessionExpTitle); 



		bcpElement = this.getView().byId("bcpHDRIMR");
		oBCPStats = getBCPStatus(bcpElement,"","");
		setInterval(function(){
			oBCPStats = getBCPStatus(bcpElement,"","");
		},30000);



		this.getView().byId("printerName").setModel(new sap.ui.model.xml.XMLModel());
		oStorageUnite =localStorage.getItem("StorageUnit");
		oMatNumber =localStorage.getItem("MaterialNo");
		oBatchNumber =localStorage.getItem("BatchNo");
		var oSLED =localStorage.getItem("SLED1");
		oStorageType =localStorage.getItem("StorageType");
		oStorageBin =localStorage.getItem("StorageBin1");

		oQuantity =localStorage.getItem("Quantity1");
		//var oQuantity_Parse= formatQuantity(oQuantity, "PARSE");

		var Quantity_Format = formatQuantity(oQuantity, "FORMAT");
		this.getView().byId("Quantity").setValue(Quantity_Format);

		var Quantity_Format1 = formatQuantity(oQuantity, "FORMAT");
		this.getView().byId("Quantity1").setValue(Quantity_Format1);

		oStockCategory =localStorage.getItem("StockCategory1");
		oWHNumber =localStorage.getItem("oWHNumber1");
		oStorageLoc =localStorage.getItem("oStorageLoc");

		oHeaderType =localStorage.getItem("HeaderType");
		oPlant =localStorage.getItem("Plant");
		oUOM =localStorage.getItem("UOM");
		oCommUOM=localStorage.getItem("CommUOM");
		oFlag=localStorage.getItem("FlagDest");
		oProdDate =localStorage.getItem("ProdDate");
		oUnitType=localStorage.getItem("UnitType");
		TOBatchFlag=localStorage.getItem("TOBatchFlag1");
		oBatchStatus=localStorage.getItem("SBatchStatus");	
		oHeaderTypeText=localStorage.getItem("HeaderTypeText");	

		this.getView().byId("Measure1").setValue(oCommUOM);
		this.getView().byId("Measure").setValue(oCommUOM);
		this.getView().byId("StorageLoc").setValue(oStorageLoc);
		this.getView().byId("Warehouse").setValue(oWHNumber);
		this.getView().byId("StorageUnite").setValue(oStorageUnite);
		this.getView().byId("MatNumber").setValue(oMatNumber);
		this.getView().byId("BatchNumber").setValue(oBatchNumber);
		this.getView().byId("SLED").setValue(oSLED);
		this.getView().byId("StorageType").setValue(oStorageType);
		this.getView().byId("StorageBin").setValue(oStorageBin);
		this.getView().byId("StockCategory").setValue(oStockCategory);
		this.getView().byId("UnitType").setValue(oUnitType);
		this.getView().byId("Header").setValue(oHeaderTypeText);
		this.getView().byId("BatchStatus").setValue(oBatchStatus);

		this.getView().byId("StockCategory1").setValue(oStockCategory);
		this.getView().byId("MatNumber1").setValue(oMatNumber);


		this.getView().byId("MatNumber1").setEnabled(false);
		this.getView().byId("SLED1").setEnabled(false);
		this.getView().byId("StockCategory1").setEnabled(false);
		this.getView().byId("BatchStatus1").setEnabled(false);

		this.getView().byId("noOfCopies").setVisible(false);
		this.getView().byId("printerSel").setVisible(false);

		if (oStorageUnite=="---")
		{
			if(oHeaderType=="B.NSU_B.NSU" || TOBatchFlag==1 || oHeaderType=="B.MERGE_NSU")
			{


				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);	
				this.getView().byId("StorageBin1").setVisible(true);	
				this.getView().byId("StorageBinLabel1").setVisible(true);	
				this.getView().byId("StorageBin2Label").setVisible(false);	
				this.getView().byId("StorageBin2").setVisible(false);	
				this.getView().byId("ManualEntry").setVisible(false);

				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(false);
				this.getView().byId("StorageBin1").setEnabled(false);
				this.getView().byId("Quantity1").setEnabled(true);
				this.getView().byId("BatchNumber1").setEnabled(false);

				this.getView().byId("ManualEntryST").setVisible(false);
				this.getView().byId("StorageType2").setVisible(false);
				this.getView().byId("StorageType1").setVisible(true);
				this.getView().byId("StorageTypeLabel1").setVisible(true);	
				this.getView().byId("StorageTypeLabel2").setVisible(false);	

				var oDestStorageUnite =localStorage.getItem("DestStorageUnit");
				var oDestBatchNumber =localStorage.getItem("DestBatchNo");
				var oSLED =localStorage.getItem("DestSLED");
				var StorageType =localStorage.getItem("DestStorageType");
				var oStorageBin =localStorage.getItem("DestStorageBin");
				var oDestUnitType =localStorage.getItem("DestUnitType");
				var oStockCategory =localStorage.getItem("DestStockCategory");
				var oDestBatchStatus=localStorage.getItem("DestBatchStatus");


				this.getView().byId("StorageType1").addItem(new sap.ui.core.Item({text:StorageType, key:StorageType}));
				this.getView().byId("StorageType1").setSelectedKey(StorageType);
				//this.getView().byId("StorageType1").setSelectedItem(new sap.ui.core.Item({text:StorageType}));
				this.getView().byId("BatchNumber1").setValue(oDestBatchNumber);
				this.getView().byId("StorageUnite1").setValue(oDestStorageUnite);			
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);
				this.getView().byId("StorageBin1").setValue(oStorageBin);
				this.getView().byId("UnitType1").setValue(oDestUnitType);
				this.getView().byId("BatchStatus1").setValue(oDestBatchStatus);
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("Header").setValue(oHeaderTypeText);

				TOBatchFlag=0;
			}
			if (oHeaderType=="NSU_SU")
			{
				this.showPrinterSelection();
				this.getView().byId("noOfCopies").setVisible(true);
				this.getView().byId("printerSel").setVisible(true);
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(true);			
				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setVisible(true);

				//this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(true);
				this.getView().byId("StorageBin1").setEnabled(true);
				this.getView().byId("Quantity1").setEnabled(true);
				this.getView().byId("BatchNumber1").setEnabled(false);	
				this.getView().byId("StorageUnite1").setEnabled(false);	
				this.getView().byId("AutoGenerateID").setEnabled(false);
				this.getView().byId("AutoGenerateID").setSelected(true);


				this.getView().byId("BatchNumber1").setValue(oBatchNumber);	
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);	
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);
				var oAutoGenerate=this.getView().byId("AutoGenerateID").getSelected();

				if(oAutoGenerate==true)
				{


					var dateRefresh=new Date();
					var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
					oSSCCTypeModel.setSizeLimit(10000);
					oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GenerateSSCCNumberBCP&param.1="+oPlant+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);
					SSCCNSUSU=oSSCCTypeModel.getProperty("/Rowset/Row/SSCCNumber");
					var oErrorMessage=oSSCCTypeModel.getProperty("/Rowset/Row/ErrorMessage");

					if(oErrorMessage=="")
					{
						this.getView().byId("StorageUnite1").setValue(SSCCNSUSU);	
					}
					else
					{

						jQuery.sap.require("sap.ui.commons.MessageBox");
						//sap.ui.commons.MessageBox.alert(+oErrorMessage,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
						sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "SSCC_MSG1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
					}	


				}

				var oTransferType= "SU";
				var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
				var wareNum = this.getView().byId("Warehouse1").getValue();
				///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
				var dateRefresh=new Date();
				var ostoTypeModel= new sap.ui.model.xml.XMLModel();
				ostoTypeModel.setSizeLimit(10000);
				ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
				var sType = this.getView().byId("StorageType1");
				var osTypeitemline= new sap.ui.core.ListItem();
				osTypeitemline.bindProperty("text", "STYPE");
				osTypeitemline.bindProperty("key", "STYPE");
				sType.bindItems("/Rowset/Row", osTypeitemline);
				sType.setModel(ostoTypeModel);
				sType.setSelectedKey("Select S Type");

			}
			if(oHeaderType=="NSU_NSU")
			{

				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);			
				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setVisible(true);

				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(true);
				this.getView().byId("StorageBin1").setEnabled(true);
				this.getView().byId("Quantity1").setEnabled(true);
				this.getView().byId("BatchNumber1").setEnabled(false);	

				this.getView().byId("BatchNumber1").setValue(oBatchNumber);	
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);	
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);

				var oTransferType= "NONSU";
				var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
				var wareNum = this.getView().byId("Warehouse1").getValue();
				///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
				var dateRefresh=new Date();
				var ostoTypeModel= new sap.ui.model.xml.XMLModel();
				ostoTypeModel.setSizeLimit(10000);
				ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
				var sType = this.getView().byId("StorageType1");
				var osTypeitemline= new sap.ui.core.ListItem();
				osTypeitemline.bindProperty("text", "STYPE");
				osTypeitemline.bindProperty("key", "STYPE");
				sType.bindItems("/Rowset/Row", osTypeitemline);
				sType.setModel(ostoTypeModel);
				sType.setSelectedKey("Select S Type");
			}
			if(oHeaderType=="STOCK_STATUS")
			{

				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);
				this.getView().byId("StorageBin1").setVisible(true);	
				this.getView().byId("StorageBinLabel1").setVisible(true);	
				this.getView().byId("StorageBin2Label").setVisible(false);	
				this.getView().byId("StorageBin2").setVisible(false);	
				this.getView().byId("ManualEntry").setVisible(false);
				this.getView().byId("ManualEntryST").setVisible(false);	
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(false);
				this.getView().byId("StorageBin1").setEnabled(false);
				this.getView().byId("Quantity1").setEnabled(false);
				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("BatchNumber1").setEnabled(false);

				//this.getView().byId("StorageType1").setSelectedItem(new sap.ui.core.Item({text:oStorageType}));
				this.getView().byId("StorageType1").addItem(new sap.ui.core.Item({text:oStorageType, key:oStorageType}));
				this.getView().byId("StorageType1").setSelectedKey(oStorageType);

				this.getView().byId("StorageBin1").setValue(oStorageBin);
				this.getView().byId("BatchNumber1").setValue(oBatchNumber);
				this.getView().byId("StorageUnite1").setValue(oStorageUnite);		
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("StockCategory1").setValue("Blocked");
				this.getView().byId("MatNumber1").setValue(oMatNumber);
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);
			}
			if(oHeaderType=="N.SLOC_N.SLOC")
			{
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);	


				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setVisible(true);
				this.getView().byId("BatchNumber1").setEnabled(false);
				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(true);
				this.getView().byId("StorageBin1").setEnabled(true);
				this.getView().byId("Quantity1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(true);
				this.getView().byId("Warehouse1").setEnabled(false);

				this.getView().byId("BatchNumber1").setValue(oBatchNumber);
				this.getView().byId("StorageUnite1").setValue(oStorageUnite);		
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);
			}

		}
		else
		{	
			if(oHeaderType=="B.SU_B.SU" || TOBatchFlag==1 || oHeaderType=="B.MERGE_SU")
			{
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);	
				this.getView().byId("StorageBin1").setVisible(true);	
				this.getView().byId("StorageBinLabel1").setVisible(true);	
				this.getView().byId("StorageBin2Label").setVisible(false);	
				this.getView().byId("StorageBin2").setVisible(false);	
				this.getView().byId("ManualEntry").setVisible(false);

				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(false);
				this.getView().byId("StorageBin1").setEnabled(false);
				this.getView().byId("Quantity1").setEnabled(true);
				this.getView().byId("BatchNumber1").setEnabled(false);

				this.getView().byId("ManualEntryST").setVisible(false);
				this.getView().byId("StorageType2").setVisible(false);
				this.getView().byId("StorageType1").setVisible(true);
				this.getView().byId("StorageTypeLabel1").setVisible(true);	
				this.getView().byId("StorageTypeLabel2").setVisible(false);	


				var oDestStorageUnite =localStorage.getItem("DestStorageUnit");
				var  DestBatchNumber =localStorage.getItem("DestBatchNo");
				var oDestSLED =localStorage.getItem("DestSLED");
				var StorageType =localStorage.getItem("DestStorageType");
				var oStorageBin =localStorage.getItem("DestStorageBin");
				//var oQuantity =localStorage.getItem("DestQuantity");
				var oDestUnitType =localStorage.getItem("DestUnitType");
				var oStockCategory =localStorage.getItem("DestStockCategory");
				var oDestBatchStatus=localStorage.getItem("DestBatchStatus");

				//this.getView().byId("StorageType1").setSelectedItem(new sap.ui.core.Item({text:StorageType}));
				this.getView().byId("StorageType1").addItem(new sap.ui.core.Item({text:StorageType, key:StorageType}));
				this.getView().byId("StorageType1").setSelectedKey(StorageType);
				this.getView().byId("BatchNumber1").setValue(DestBatchNumber);
				this.getView().byId("StorageUnite1").setValue(oDestStorageUnite);		
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);
				this.getView().byId("StorageBin1").setValue(oStorageBin);
				this.getView().byId("BatchStatus1").setValue(oDestBatchStatus);
				this.getView().byId("SLED1").setValue(oDestSLED);
				this.getView().byId("Header").setValue(oHeaderTypeText);
				this.getView().byId("UnitType1").setValue(oDestUnitType);
			}
			if(oHeaderType=="SU_SU WMSUMO" || oHeaderType=="SU_SU WMTORD")
			{

				this.getView().byId("noOfCopies").setVisible(false);
				this.getView().byId("printerSel").setVisible(false);
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(true);	
				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setVisible(true);	
				this.getView().byId("ManualEntryST").setVisible(true);

				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("BatchNumber1").setEnabled(false);
				this.getView().byId("StorageBin2").setEnabled(false);
				this.getView().byId("Quantity1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(true);
				this.getView().byId("ManualEntry").setEnabled(false);	
				this.getView().byId("Quantity1").setEnabled(false);
				this.getView().byId("StorageUnite2").setEnabled(false);	
				this.getView().byId("AutoGenerateID").setEnabled(true);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);
				this.getView().byId("BatchNumber1").setValue(oBatchNumber);
				this.getView().byId("StorageUnite1").setValue(oStorageUnite);		
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("UnitType1").setValue(oUnitType);

				var oTransferType= "SU";
				var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
				var wareNum = this.getView().byId("Warehouse1").getValue();
				///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
				var dateRefresh=new Date();
				var ostoTypeModel= new sap.ui.model.xml.XMLModel();
				ostoTypeModel.setSizeLimit(10000);
				ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
				var sType = this.getView().byId("StorageType1");
				var osTypeitemline= new sap.ui.core.ListItem();
				osTypeitemline.bindProperty("text", "STYPE");
				osTypeitemline.bindProperty("key", "STYPE");
				sType.bindItems("/Rowset/Row", osTypeitemline);
				sType.setModel(ostoTypeModel);
				sType.setSelectedKey("Select S Type");

			}
			if(oHeaderType=="SU_NSU")
			{

				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);	

				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setVisible(true);	
				this.getView().byId("BatchNumber1").setEnabled(false);
				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(true);
				this.getView().byId("StorageBin1").setEnabled(true);
				this.getView().byId("Quantity1").setEnabled(true);
				this.getView().byId("ManualEntryST").setVisible(true);
				this.getView().byId("BatchNumber1").setValue(oBatchNumber);			
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);

				var oTransferType= "NONSU";
				var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
				var wareNum = this.getView().byId("Warehouse1").getValue();
				///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
				var dateRefresh=new Date();
				var ostoTypeModel= new sap.ui.model.xml.XMLModel();
				ostoTypeModel.setSizeLimit(10000);
				ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
				var sType = this.getView().byId("StorageType1");
				var osTypeitemline= new sap.ui.core.ListItem();
				osTypeitemline.bindProperty("text", "STYPE");
				osTypeitemline.bindProperty("key", "STYPE");
				sType.bindItems("/Rowset/Row", osTypeitemline);
				sType.setModel(ostoTypeModel);
				sType.setSelectedKey("Select S Type");

			}

			if(oHeaderType=="SU_SPLIT")
			{
				this.showPrinterSelection();
				this.getView().byId("noOfCopies").setVisible(true);
				this.getView().byId("printerSel").setVisible(true);
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(true);
				this.getView().byId("AutoGenerateID").setEnabled(true);
				this.getView().byId("AutoGenerateID").setSelected(true);

				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setVisible(true);	
				this.getView().byId("ManualEntryST").setVisible(true);
				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(true);
				this.getView().byId("StorageBin1").setEnabled(true);
				this.getView().byId("BatchNumber1").setEnabled(false);

				this.getView().byId("BatchNumber1").setValue(oBatchNumber);
				//this.getView().byId("StorageUnite1").setValue(oStorageUnite);		
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);
				this.getView().byId("SLED1").setValue(oSLED);	
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);

				var oTransferType= "SU";
				var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
				var wareNum = this.getView().byId("Warehouse1").getValue();
				///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
				var dateRefresh=new Date();
				var ostoTypeModel= new sap.ui.model.xml.XMLModel();
				ostoTypeModel.setSizeLimit(10000);
				ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
				var sType = this.getView().byId("StorageType1");
				var osTypeitemline= new sap.ui.core.ListItem();
				osTypeitemline.bindProperty("text", "STYPE");
				osTypeitemline.bindProperty("key", "STYPE");
				sType.bindItems("/Rowset/Row", osTypeitemline);
				sType.setModel(ostoTypeModel);
				sType.setSelectedKey("Select S Type");

				/////////////////////////////////////// Set Auto Generate SSCC True ///////////////////////////

				var dateRefresh=new Date();
				var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
				oSSCCTypeModel.setSizeLimit(100);
				oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GenerateSSCCNumberBCP&param.1="+oPlant+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);
				var SSCC=oSSCCTypeModel.getProperty("/Rowset/Row/SSCCNumber");
				var oErrorMessage=oSSCCTypeModel.getProperty("/Rowset/Row/ErrorMessage");
				if(oErrorMessage=="")
				{
					this.getView().byId("StorageUnite1").setValue(SSCC);	
				}
				else
				{

					jQuery.sap.require("sap.ui.commons.MessageBox");
					//sap.ui.commons.MessageBox.alert(+oErrorMessage,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
					sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "SSCC_MSG1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
				}	               
			}

			if(oHeaderType=="SLOC_SLOC")
			{

				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);	


				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setVisible(true);
				this.getView().byId("BatchNumber1").setEnabled(false);
				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(true);
				this.getView().byId("StorageBin1").setEnabled(true);
				this.getView().byId("Quantity1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(true);
				this.getView().byId("Warehouse1").setEnabled(false);

				this.getView().byId("BatchNumber1").setValue(oBatchNumber);
				this.getView().byId("StorageUnite1").setValue(oStorageUnite);		
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);
			}
			if(oHeaderType=="STOCK_STATUS")
			{

				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("AutoGenerateID").setVisible(false);
				this.getView().byId("StorageBin1").setVisible(true);	
				this.getView().byId("StorageBinLabel1").setVisible(true);	
				this.getView().byId("StorageBin2Label").setVisible(false);	
				this.getView().byId("StorageBin2").setVisible(false);	
				this.getView().byId("ManualEntry").setVisible(false);
				this.getView().byId("ManualEntryST").setVisible(false);
				this.getView().byId("Warehouse1").setEnabled(false);
				this.getView().byId("StorageLoc1").setEnabled(false);
				this.getView().byId("StorageType1").setEnabled(false);

				this.getView().byId("StorageType2").setVisible(false);
				this.getView().byId("StorageType1").setVisible(true);
				this.getView().byId("StorageTypeLabel1").setVisible(true);	
				this.getView().byId("StorageTypeLabel2").setVisible(false);	

				this.getView().byId("StorageBin1").setEnabled(false);
				this.getView().byId("Quantity1").setEnabled(false);
				this.getView().byId("StorageUnite1").setEnabled(false);
				this.getView().byId("BatchNumber1").setEnabled(false);

				//this.getView().byId("StorageType1").setSelectedKey(oStorageType);
				this.getView().byId("StorageType1").addItem(new sap.ui.core.Item({text:oStorageType, key:oStorageType}));
				this.getView().byId("StorageType1").setSelectedKey(oStorageType);
				this.getView().byId("StorageBin1").setValue(oStorageBin);
				this.getView().byId("BatchNumber1").setValue(oBatchNumber);
				this.getView().byId("StorageUnite1").setValue(oStorageUnite);		
				this.getView().byId("Warehouse1").setValue(oWHNumber);
				this.getView().byId("StorageLoc1").setSelectedKey(oStorageLoc);
				this.getView().byId("SLED1").setValue(oSLED);
				this.getView().byId("StockCategory1").setValue("Blocked");
				this.getView().byId("MatNumber1").setValue(oMatNumber);
				this.getView().byId("UnitType1").setValue(oUnitType);
				this.getView().byId("BatchStatus1").setValue(oBatchStatus);
			}


		}

	},
	WarehouseValidation: function()
	{

		var oTransferType= "SU";
		var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
		var wareNum = this.getView().byId("Warehouse1").getValue();
		///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
		var dateRefresh=new Date();
		var ostoTypeModel= new sap.ui.model.xml.XMLModel();
		ostoTypeModel.setSizeLimit(10000);
		ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
		var sType = this.getView().byId("StorageType1");
		var osTypeitemline= new sap.ui.core.ListItem();
		osTypeitemline.bindProperty("text", "STYPE");
		osTypeitemline.bindProperty("key", "STYPE");
		sType.bindItems("/Rowset/Row", osTypeitemline);
		sType.setModel(ostoTypeModel);
		sType.setSelectedKey("Select S Type");
	},

	goToTransferDisplay : function()
	{
		var app = sap.ui.getCore().byId("idapp");
		app.back("TransferDisplay","show");
		localStorage.removeItem("StorageUnit");
		localStorage.removeItem("StorageUnit");
		localStorage.removeItem("MaterialNo");
		localStorage.removeItem("BatchNo");
		localStorage.removeItem("SLED1");

		localStorage.removeItem("StorageType");
		localStorage.removeItem("StorageBin1");
		localStorage.removeItem("Quantity1");
		localStorage.removeItem("StockCategory1");
		localStorage.removeItem("oWHNumber1");
		localStorage.removeItem("oStorageLoc");
		localStorage.removeItem("HeaderType");
		localStorage.removeItem("Plant");
		localStorage.removeItem("UOM");
		localStorage.removeItem("CommUOM");
		localStorage.removeItem("FlagDest");
		localStorage.removeItem("TOBatchFlag");
		localStorage.removeItem("BatchFlagBack");
		localStorage.removeItem("SBatchStatus");
		localStorage.removeItem("oHeaderTypeText");
		var r = sap.ui.getCore().byId("TransferOrder");
		r.destroy();
	},
	StorageLocDestValidation : function()
	{	
		if(oHeaderType=="SLOC_SLOC" || oHeaderType=="N.SLOC_N.SLOC")
		{	
			var DateNw = new Date();
			//this.getView().byId("wareNum").setValue();
			var storageLocation = this.getView().byId("StorageLoc1").getSelectedKey();
			var wareNoDDType="WAREHOUSENO";
			oWareNoModel= new sap.ui.model.xml.XMLModel();
			oWareNoModel.setSizeLimit(10000);
			oWareNoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+wareNoDDType+"&Param.2="+storageLocation+"&d="+DateNw+"&Content-Type=text/xml"),"",false);

			var wareNo = this.getView().byId("Warehouse1");
			var warehuseNo= oWareNoModel.getProperty("/Rowset/Row/Key");
			wareNo.setValue(warehuseNo);

			var storageUnit = this.getView().byId("StorageUnite1").getValue();
			if(storageUnit=="---"){
				var oTransferType= "NONSU";
			}
			else{
				var oTransferType= "SU";
			}

			var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
			var wareNum = this.getView().byId("Warehouse1").getValue();
			///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
			var dateRefresh=new Date();
			var ostoTypeModel= new sap.ui.model.xml.XMLModel();
			ostoTypeModel.setSizeLimit(10000);
			ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
			var sType = this.getView().byId("StorageType1");
			var osTypeitemline= new sap.ui.core.ListItem();
			osTypeitemline.bindProperty("text", "STYPE");
			osTypeitemline.bindProperty("key", "STYPE");
			sType.bindItems("/Rowset/Row", osTypeitemline);
			sType.setModel(ostoTypeModel);
			sType.setSelectedKey("Select S Type");

			var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
			if(oManualEntryST==true)
			{
				var sTypeInput = this.getView().byId("StorageType2");
				sTypeInput.setValue("");
			}
			else
			{
				var sType = this.getView().byId("StorageType1");
				sType.setSelectedKey("Select S Type");
			}
			var oManualEntry=this.getView().byId("ManualEntry").getSelected();
			if(oManualEntry==true)
			{
				var sBinInput = this.getView().byId("StorageBin1");
				sBinInput.setValue("");
			}
			else
			{
				var sBin = this.getView().byId("StorageBin2");
				sBin.setSelectedKey("Select S Bin");
			}


		}
	},

	SelectManualEntryST: function()
	{
		var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
		if(oHeaderType=="SU_SU WMSUMO" || oHeaderType=="SU_SU WMTORD" || oHeaderType=="SU_NSU" || oHeaderType=="SU_SPLIT" || oHeaderType=="SLOC_SLOC" || oHeaderType=="NSU_SU"|| oHeaderType=="NSU_NSU" || oHeaderType=="N.SLOC_N.SLOC" )
		{
			if(oManualEntryST==true)
			{

				this.getView().byId("StorageType1").setVisible(false);	
				this.getView().byId("StorageType2").setVisible(true);	
				this.getView().byId("StorageTypeLabel1").setVisible(false);	
				this.getView().byId("StorageTypeLabel2").setVisible(true);	
				this.getView().byId("StorageType2").setEnabled(true);	
				this.getView().byId("StorageBin1").setVisible(true);	
				this.getView().byId("StorageBinLabel1").setVisible(true);
				this.getView().byId("StorageBin2Label").setVisible(false);	
				this.getView().byId("StorageBin2").setVisible(false);	
				this.getView().byId("ManualEntry").setEnabled(false);	
				this.getView().byId("ManualEntry").setSelected(true);	
			}
			else
			{

				this.getView().byId("StorageType1").setVisible(true);
				this.getView().byId("StorageType2").setVisible(false);	
				this.getView().byId("StorageTypeLabel1").setVisible(true);	
				this.getView().byId("StorageTypeLabel2").setVisible(false);					
				this.getView().byId("ManualEntry").setEnabled(false);	
				//this.getView().byId("StorageBin2").setEnabled(true);	
				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("ManualEntry").setEnabled(true);	
				this.getView().byId("ManualEntry").setSelected(false);	
				var DateNw=new Date();
				var oTransferType= "SU";
				var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
				var wareNum = this.getView().byId("Warehouse1").getValue();
				///////////////////////////////////////// Select StorageType ///////////////////////////////////////////
				var dateRefresh=new Date();
				var ostoTypeModel= new sap.ui.model.xml.XMLModel();
				ostoTypeModel.setSizeLimit(10000);
				ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.8=2&Param.9="+oTransferType+"&Param.10="+userLanguage+"&d="+dateRefresh+"&OutputParameter=O_STYPEXML&Content-Type=text/xml"),"",false);
				var sType = this.getView().byId("StorageType1");
				var osTypeitemline= new sap.ui.core.ListItem();
				osTypeitemline.bindProperty("text", "STYPE");
				osTypeitemline.bindProperty("key", "STYPE");
				sType.bindItems("/Rowset/Row", osTypeitemline);
				sType.setModel(ostoTypeModel);
				sType.setSelectedKey("Select S Type");

			}
		}
	},

	SelectAutoGenerate: function()
	{

		var oAutoGenerate=this.getView().byId("AutoGenerateID").getSelected();

		if(oHeaderType=="SU_SPLIT")
		{

			if(oAutoGenerate==true)
			{

				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				var dateRefresh=new Date();

				var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
				oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GenerateSSCCNumberBCP&param.1="+oPlant+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);
				var SSCC=oSSCCTypeModel.getProperty("/Rowset/Row/SSCCNumber");
				var oErrorMessage=oSSCCTypeModel.getProperty("/Rowset/Row/ErrorMessage");
				this.getView().byId("AutoGenerateID").setSelected(true);
				if(oErrorMessage=="")
				{
					this.getView().byId("StorageUnite1").setValue(SSCC);	
				}
				else
				{

					jQuery.sap.require("sap.ui.commons.MessageBox");
					//sap.ui.commons.MessageBox.alert(+oErrorMessage,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
					sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "SSCC_MSG1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
				}	


			}
			else
			{
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("StorageUnite1").setValue(null);	

			}

		}

		else if(oHeaderType=="SU_SU WMSUMO" || oHeaderType=="SU_SU WMTORD")
		{
			if(oAutoGenerate==true)
			{
				this.showPrinterSelection();

				this.getView().byId("noOfCopies").setVisible(true);
				this.getView().byId("printerSel").setVisible(true);
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUnite1").setValue(null);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	

				var dateRefresh=new Date();
				var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
				oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GenerateSSCCNumberBCP&Param.1="+oPlant+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);
				var SSCC=oSSCCTypeModel.getProperty("/Rowset/Row/SSCCNumber");
				var oErrorMessage=oSSCCTypeModel.getProperty("/Rowset/Row/ErrorMessage");

				if(oErrorMessage=="")
				{
					this.getView().byId("StorageUnite1").setValue(SSCC);	
				}
				else
				{

					jQuery.sap.require("sap.ui.commons.MessageBox");
					//sap.ui.commons.MessageBox.alert(+oErrorMessage,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
					sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "SSCC_MSG1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
				}	

			}
			else
			{
				this.getView().byId("printerName").setModel(new sap.ui.model.xml.XMLModel());
				this.getView().byId("noOfCopiesInput").setValue("");
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("StorageUnite1").setValue(oStorageUnite);	
				this.getView().byId("noOfCopies").setVisible(false);
				this.getView().byId("printerSel").setVisible(false);

			}

		}		
		else
		{
			if(oHeaderType=="NSU_SU")

			{
				if(oAutoGenerate==true)
				{

					this.showPrinterSelection();

					this.getView().byId("noOfCopies").setVisible(true);
					this.getView().byId("printerSel").setVisible(true);

				}
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("StorageUnite1").setEnabled(false);
				var dateRefresh=new Date();
				var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
				oSSCCTypeModel.setSizeLimit(10000);
				oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GenerateSSCCNumberBCP&Param.1="+oPlant+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);
				var SSCC=oSSCCTypeModel.getProperty("/Rowset/Row/SSCCNumber");
				var oErrorMessage=oSSCCTypeModel.getProperty("/Rowset/Row/ErrorMessage");

				if(oErrorMessage=="")
				{
					this.getView().byId("StorageUnite1").setValue(SSCC);	
				}
				else
				{

					jQuery.sap.require("sap.ui.commons.MessageBox");
					//sap.ui.commons.MessageBox.alert(+oErrorMessage,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
					sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "SSCC_MSG1"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
				}	

			}
			else
			{
				if(oHeaderType=="NSU_SU"){

					this.getView().byId("printerName").setModel(new sap.ui.model.xml.XMLModel());
					this.getView().byId("noOfCopies").setVisible(false);
					this.getView().byId("printerSel").setVisible(false);
				}
				this.getView().byId("StorageUniteLabel1").setVisible(false);	
				this.getView().byId("StorageUnite1").setVisible(false);	
				this.getView().byId("StorageUniteLabel2").setVisible(true);	
				this.getView().byId("StorageUnite2").setVisible(true);	
				var dateRefresh=new Date();
				var SourceSSCCSType=this.getView().byId("StorageType").getValue();
				var StorageSSCCBin=this.getView().byId("StorageBin").getValue();	
				var StorageType=this.getView().byId("StorageType1").getSelectedKey();
				var StorageBin=this.getView().byId("StorageBin2").getSelectedKey();
				var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
				oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.1="+oStockCategory+"&Param.2="+oStorageLoc+"&Param.3="+oWHNumber+"&Param.4="+StorageType+"&Param.5="+encodeURIComponent(StorageBin)+"&Param.6="+oBatchNumber+"&Param.7="+oMatNumber+"&Param.8=0&Param.10="+userLanguage+"&Param.18="+SourceSSCCSType+"&Param.19="+encodeURIComponent(StorageSSCCBin)+"&Param.20="+oBatchStatus+"&d="+dateRefresh+"&OutputParameter=O_SSCCXML&Content-Type=text/xml"),"",false);
				var sUnit = this.getView().byId("StorageUnite2");

				var osUnitItemline= new sap.ui.core.ListItem();
				osUnitItemline.bindProperty("text", "SSCC");
				osUnitItemline.bindProperty("key", "SSCC");
				sUnit.bindItems("/Rowset/Row", osUnitItemline);
				sUnit.setModel(oSSCCTypeModel);
				sUnit.setSelectedKey("Select SSCC Number");	

			}
		}
	},


	SelectManualEntry :  function()
	{
		var oManualEntry=this.getView().byId("ManualEntry").getSelected();
		if(oHeaderType=="NSU_SU")
		{
			if(oManualEntry==true)
			{
				this.showPrinterSelection();

				this.getView().byId("noOfCopies").setVisible(true);
				this.getView().byId("printerSel").setVisible(true);
				this.getView().byId("StorageBin1").setVisible(true);	
				this.getView().byId("StorageBinLabel1").setVisible(true);
				this.getView().byId("StorageBin2Label").setVisible(false);	
				this.getView().byId("StorageBin2").setVisible(false);	
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("StorageUnite1").setEnabled(false);	
				this.getView().byId("AutoGenerateID").setEnabled(true);
				this.getView().byId("StorageUnite1").setValue(SSCCNSUSU);	
				this.getView().byId("StorageBin1").setEnabled(true);
				this.getView().byId("AutoGenerateID").setSelected(true);
			}
			else
			{
				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	
				this.getView().byId("StorageUniteLabel1").setVisible(true);	
				this.getView().byId("StorageUnite1").setVisible(true);	
				this.getView().byId("StorageUniteLabel2").setVisible(false);	
				this.getView().byId("StorageUnite2").setVisible(false);	
				this.getView().byId("StorageUnite1").setEnabled(false);	
				this.getView().byId("AutoGenerateID").setEnabled(true);		
				this.getView().byId("AutoGenerateID").setSelected(true);
				this.getView().byId("StorageUnite1").setValue(SSCCNSUSU);

				/*this.getView().byId("StorageUnite2").setSelectedKey(null);
			var DateNw=new Date();
			var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
			var wareNum = this.getView().byId("Warehouse1").getSelectedKey();	
			var ostorageType = this.getView().byId("StorageType1").getSelectedKey();
			var oStorageBin="STORAGEBIN";
			///////////////////////////////////////// Select StorageBin ///////////////////////////////////////////

			var ostoBinModel= new sap.ui.model.xml.XMLModel();
                                   ostoBinModel.setSizeLimit(10000);
			ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+oStorageBin+"&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.4="+ostorageType+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
			var sBin = this.getView().byId("StorageBin2");
			var osBinitemline= new sap.ui.core.ListItem();
			osBinitemline.bindProperty("text", "Value");
			osBinitemline.bindProperty("key", "Value");
			sBin.bindItems("/Rowset/Row", osBinitemline);
			sBin.setModel(ostoBinModel);*/
			}
		}
		else
		{
			if(oManualEntry==true)
			{
				this.getView().byId("StorageBin1").setVisible(true);	
				this.getView().byId("StorageBinLabel1").setVisible(true);
				this.getView().byId("StorageBin2Label").setVisible(false);	
				this.getView().byId("StorageBin2").setVisible(false);	
			}
			else
			{
				this.getView().byId("StorageBin1").setVisible(false);	
				this.getView().byId("StorageBinLabel1").setVisible(false);	
				this.getView().byId("StorageBin2Label").setVisible(true);	
				this.getView().byId("StorageBin2").setVisible(true);	

				var DateNw=new Date();
				var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
				var wareNum = this.getView().byId("Warehouse1").getValue();	
				var ostorageType = this.getView().byId("StorageType1").getSelectedKey();
				var oStorageBin="STORAGEBIN";
				///////////////////////////////////////// Select StorageBin ///////////////////////////////////////////

				var ostoBinModel= new sap.ui.model.xml.XMLModel();
				ostoBinModel.setSizeLimit(10000);
				ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+oStorageBin+"&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.4="+ostorageType+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
				var sBin = this.getView().byId("StorageBin2");
				var osBinitemline= new sap.ui.core.ListItem();
				osBinitemline.bindProperty("text", "Value");
				osBinitemline.bindProperty("key", "Value");
				sBin.bindItems("/Rowset/Row", osBinitemline);
				sBin.setModel(ostoBinModel);
			}
		}
	},

	StorageType1Validation :  function()
	{
		this.getView().byId("ManualEntry").setEnabled(true);	
		this.getView().byId("StorageBin2").setEnabled(true);	
		var DateNw=new Date();
		var storeLoc = this.getView().byId("StorageLoc1").getSelectedKey();
		var wareNum = this.getView().byId("Warehouse1").getValue();	
		var ostorageType = this.getView().byId("StorageType1").getSelectedKey();
		var oStorageBin="STORAGEBIN";

		///////////////////////////////////////// Select StorageBin ///////////////////////////////////////////

		var ostoBinModel= new sap.ui.model.xml.XMLModel();
		ostoBinModel.setSizeLimit(10000);
		ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+oStorageBin+"&Param.2="+storeLoc+"&Param.3="+wareNum+"&Param.4="+ostorageType+"&d="+DateNw+"&Content-Type=text/xml"),"",false);
		var sBin = this.getView().byId("StorageBin2");
		var osBinitemline= new sap.ui.core.ListItem();
		osBinitemline.bindProperty("text", "Value");
		osBinitemline.bindProperty("key", "Value");
		sBin.bindItems("/Rowset/Row", osBinitemline);
		sBin.setModel(ostoBinModel);
	},
	StorageBinDestValidation :  function()
	{

		if(oHeaderType=="SU_SPLIT")
		{	
			this.getView().byId("AutoGenerateID").setSelected(false);
			this.getView().byId("StorageUnite2").setVisible(true);	
		}
		else if(oHeaderType=="NSU_SU")
		{
			this.showPrinterSelection();

			this.getView().byId("noOfCopies").setVisible(true);
			this.getView().byId("printerSel").setVisible(true);
			this.getView().byId("AutoGenerateID").setSelected(true);
			this.getView().byId("StorageUniteLabel1").setVisible(true);	
			this.getView().byId("StorageUnite1").setVisible(true);	
			this.getView().byId("StorageUniteLabel2").setVisible(false);	
			this.getView().byId("StorageUnite2").setVisible(false);	
			this.getView().byId("AutoGenerateID").setEnabled(true);

		}
		else
		{
			this.getView().byId("StorageUnite2").setEnabled(true);	
			this.getView().byId("AutoGenerateID").setEnabled(true);
			this.getView().byId("AutoGenerateID").setSelected(false);
			var dateRefresh=new Date();
			var StorageType=this.getView().byId("StorageType1").getSelectedKey();
			var StorageBin=this.getView().byId("StorageBin2").getSelectedKey();
			var SourceSSCCSType=this.getView().byId("StorageType").getValue();
			var StorageSSCCBin=this.getView().byId("StorageBin").getValue();	
			var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
			oSSCCTypeModel.setSizeLimit(10000);
			oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.1="+oStockCategory+"&Param.2="+oStorageLoc+"&Param.3="+oWHNumber+"&Param.4="+StorageType+"&Param.5="+encodeURIComponent (StorageBin)+"&Param.6="+oBatchNumber+"&Param.7="+oMatNumber+"&Param.8=0&Param.10="+userLanguage+"&Param.18="+SourceSSCCSType+"&Param.19="+encodeURIComponent(StorageSSCCBin)+"&Param.20="+oBatchStatus+"&d="+dateRefresh+"&OutputParameter=O_SSCCXML&Content-Type=text/xml"),"",false);
			var sUnit = this.getView().byId("StorageUnite2");
			var osUnitItemline= new sap.ui.core.ListItem();
			osUnitItemline.bindProperty("text", "SSCC");
			osUnitItemline.bindProperty("key", "SSCC");
			sUnit.bindItems("/Rowset/Row", osUnitItemline);
			sUnit.setModel(oSSCCTypeModel);
			sUnit.setSelectedKey("Select SSCC Number");
			SSCCNumber=oSSCCTypeModel.getProperty("/Rowset/Row/SSCC");	
		}


	},

	toTransferOrder : function()
	{

		oBatchStatus=this.getView().byId("BatchStatus").getValue();
		oSourceQuantity=this.getView().byId("Quantity").getValue();
		oSourceQuantity= formatQuantity(oSourceQuantity, "PARSE");
//		alert(oSourceQuantity);
		oDestQuantity=this.getView().byId("Quantity1").getValue();
		oDestQuantity=formatQuantity(oDestQuantity, "PARSE");
//		alert(oDestQuantity);

		oSourceUnitType=this.getView().byId("UnitType").getValue();
		oDestUnitType=this.getView().byId("UnitType1").getValue();
		if(oHeaderType=="B.SU_B.SU" || oHeaderType=="B.NSU_B.NSU" || oHeaderType=="B.MERGE_NSU" || oHeaderType=="B.MERGE_SU" || TOBatchFlag==1)
		{
			printingParams = "";
			var oManualEntry=this.getView().byId("ManualEntry").getSelected();
			oDestSBin=this.getView().byId("StorageBin1").getValue();	
			oDestSUnit=this.getView().byId("StorageUnite1").getValue();
			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();
			oDestSType=this.getView().byId("StorageType1").getSelectedItem().getText();

			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity= formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();
			oDestQuantity=formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();

			if(oSourceSUnit=="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";
			}
			else
			{
				oDestMovType="SU";
			}

			if(oDestQuantity <= 0)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if ((oHeaderType=="B.SU_B.SU" || oHeaderType=="B.NSU_B.NSU") && oSourceSLED<oDestSLED)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestSledGreaterSourceSled"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{
				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}	
		}

		if(oHeaderType=="SU_SU WMSUMO" || oHeaderType=="SU_SU WMTORD")
		{

			var printerSplit = this.getView().byId("printerName").getSelectedKey().split("---");
			printerName = printerSplit[0]+"---"+printerSplit[1];

			noOfCopiesInput = this.getView().byId("noOfCopiesInput").getValue();
			printingParams = printerName+","+parseInt(noOfCopiesInput,10);

			var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
			if(oManualEntryST==true)
			{
				oDestSType=this.getView().byId("StorageType2").getValue();
			}
			else
			{
				oDestSType=this.getView().byId("StorageType1").getSelectedKey();
			}
			var oManualEntry=this.getView().byId("ManualEntry").getSelected();
			if(oManualEntry==true)
			{
				var DestSBin=this.getView().byId("StorageBin1").getValue();	
				oDestSBin=DestSBin.toUpperCase();
			}
			else
			{
				oDestSBin=this.getView().byId("StorageBin2").getSelectedKey();
			}

			var oAutoGenerate=this.getView().byId("AutoGenerateID").getSelected();


			if(oAutoGenerate == false){
				printingParams ="";
			}
			oDestSUnit=this.getView().byId("StorageUnite1").getValue();

			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();

			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity= formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();
			oDestQuantity= formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();
			if(oSourceSUnit=="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";
			}
			else
			{
				oDestMovType="SU";
			}
			if(oDestSType=="" || oDestSType=="Select S Type")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStoageType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin=="" || oDestSBin=="Select S Bin")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}

			else if(oDestSBin.length > 10)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestQuantity <= 0)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oSourceSType==oDestSType && oSourceSBin==oDestSBin)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestSTypeandBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}  
			else if(oDestSUnit.length != 20)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageUnit"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(selectedPrinter == "" && oAutoGenerate)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(noOfCopiesInput == "" && printerSplit!="No Print,NA," && oAutoGenerate)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{
				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}	
		}	
		if(oHeaderType=="SU_NSU")
		{
			printingParams = "";
			var oManualEntry=this.getView().byId("ManualEntry").getSelected();
			var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
			if(oManualEntryST==true)
			{
				oDestSType=this.getView().byId("StorageType2").getValue();
			}
			else
			{
				oDestSType=this.getView().byId("StorageType1").getSelectedKey();
			}
			if(oManualEntry==true)
			{
				var DestSBin=this.getView().byId("StorageBin1").getValue();	
				oDestSBin=DestSBin.toUpperCase();
			}
			else
			{
				oDestSBin=this.getView().byId("StorageBin2").getSelectedKey();
			}

			oDestSUnit=this.getView().byId("StorageUnite1").getValue();
			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();

			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity= formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();
			oDestQuantity= formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();

			if(oSourceSUnit=="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";
			}
			else
			{
				oDestMovType="SU";
			}

			if(oDestSType=="" || oDestSType=="Select S Type")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStoageType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin=="" || oDestSBin=="Select S Bin")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin.length > 10)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestQuantity <= 0)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oSourceSType==oDestSType && oSourceSBin==oDestSBin)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestSTypeandBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{
				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}	
		}	
		if (oHeaderType=="NSU_SU")
		{

			var printerSplit = this.getView().byId("printerName").getSelectedKey().split("---");
			printerName = printerSplit[0]+"---"+printerSplit[1];

			noOfCopiesInput = this.getView().byId("noOfCopiesInput").getValue();
			printingParams = printerName+","+parseInt(noOfCopiesInput,10);

			var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
			if(oManualEntryST==true)
			{
				oDestSType=this.getView().byId("StorageType2").getValue();
			}
			else
			{
				oDestSType=this.getView().byId("StorageType1").getSelectedKey();
			}
			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();

			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity=formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();
			oDestQuantity= formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();
			var oManualEntry=this.getView().byId("ManualEntry").getSelected();


			if(oManualEntry==true)
			{
				var DestSBin=this.getView().byId("StorageBin1").getValue();	
				oDestSBin=DestSBin.toUpperCase();
				var dateRefresh=new Date();
				var oSSCCTypeModel= new sap.ui.model.xml.XMLModel();
				oSSCCTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.1="+oStockCategory+"&Param.2="+oStorageLoc+"&Param.3="+oWHNumber+"&Param.4="+oDestSType+"&Param.5="+encodeURIComponent (oDestSBin)+"&Param.6="+oBatchNumber+"&Param.7="+oMatNumber+"&Param.8=0&Param.10="+userLanguage+"&Param.18="+oSourceSType+"&Param.19="+encodeURIComponent (oSourceSBin)+"&Param.20="+oBatchStatus+"&d="+dateRefresh+"&OutputParameter=O_SSCCXML&Content-Type=text/xml"),"",false);
				SSCCNumber=oSSCCTypeModel.getProperty("/Rowset/Row/SSCC");	
				var DateNw=new Date();

				var oStorageBinCombo="STORAGEBIN";

				///////////////////////////////////////// Select StorageBin ///////////////////////////////////////////
				var ostoBinModel= new sap.ui.model.xml.XMLModel();
				ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1="+oStorageBinCombo+"&Param.2="+oDestStorageLoc+"&Param.3="+oDestWHNumber+"&Param.4="+oDestSType+"&d="+DateNw+"&Content-Type=text/xml"),"",false);

				var SBinNamexml = ostoBinModel.getData();
				var Node = $(SBinNamexml).find("Rowset").children().size()- 1;
				var flag=0;	
				for(var i=0; i<Node; i++)
				{
					var oDestStorageBinMDO=ostoBinModel.getProperty("/Rowset/Row/"+i+"/Value");
					if(oDestStorageBinMDO==oDestSBin)
					{
						flag=1;
						break;
					}
					else
					{	
						flag=0;
					}
				}
			}
			else
			{
				oDestSBin=this.getView().byId("StorageBin2").getSelectedKey();
			}
			var oAutoGenerate=this.getView().byId("AutoGenerateID").getSelected();
			if(oAutoGenerate==true)
			{
				oDestSUnit=this.getView().byId("StorageUnite1").getValue();
				printingFlag = "true";
			}
			else
			{
				oDestSUnit=this.getView().byId("StorageUnite2").getSelectedKey();
			}
			if(oSourceSUnit=="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";
			}
			else
			{
				oDestMovType="SU";
			}

			var oSBin1=this.getView().byId("StorageBin1");
			var oManualEntry5=this.getView().byId("ManualEntry");	
			var oSbin2=this.getView().byId("StorageBin2");
			var oSUnit1=this.getView().byId("StorageUnite1");
			var oSUnitLabel1=this.getView().byId("StorageUniteLabel1");	
			var oSUnitLabel2=this.getView().byId("StorageUniteLabel2");
			var oSUnit2=	this.getView().byId("StorageUnite2");
			var oAutogenerate5=this.getView().byId("AutoGenerateID");
			//var sUnit = this.getView().byId("StorageUnite2");
			if(oDestSType=="" || oDestSType=="Select S Type")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStoageType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}

			else if(oDestSBin=="" || oDestSBin=="Select S Bin")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}

			else if(oDestSUnit=="" || oDestSUnit=="Select SSCC Number")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageUnit"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}

			else if(oDestSBin.length > 10)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestQuantity <= 0)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oSourceSType==oDestSType && oSourceSBin==oDestSBin)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestSTypeandBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSUnit.length != 20)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageUnit"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(flag==1 && SSCCNumber != "" && oSSCCFlag!=1)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.confirm(getPropertyValue(oResourceModel,"TransferType_alert_ExistSBIN"),fnCallbackConfirm,sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));

				function fnCallbackConfirm(ok)
				{
					if(ok)
					{
						sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
					}
					else
					{
						oSBin1.setEnabled(false);	
						oSbin2.setSelectedKey(null);
						//oManualEntry5.setSelected(false);
						oSUnit1.setVisible(false);	
						oSUnitLabel1.setVisible(false);	
						oSUnitLabel2.setVisible(true);	
						oSUnit2.setVisible(true);
						oSUnit2.setEnabled(true);

						oAutogenerate5.setEnabled(false);
						oAutogenerate5.setSelected(false);

						var osUnitItemline= new sap.ui.core.ListItem();
						osUnitItemline.bindProperty("text", "SSCC");
						osUnitItemline.bindProperty("key", "SSCC");
						oSUnit2.bindItems("/Rowset/Row", osUnitItemline);
						oSUnit2.setModel(oSSCCTypeModel);
						oSSCCFlag=1;
					}
				}
			}
			else if(selectedPrinter == "")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(noOfCopiesInput == "" && printerSplit!="No Print,NA,")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{
				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}	
		}	
		if(oHeaderType=="NSU_NSU")
		{
			printingParams = "";
			oDestSUnit=this.getView().byId("StorageUnite1").getValue();
			var oManualEntry=this.getView().byId("ManualEntry").getSelected();
			if(oManualEntry==true)
			{
				var DestSBin=this.getView().byId("StorageBin1").getValue();	
				oDestSBin=DestSBin.toUpperCase();

			}
			else
			{
				oDestSBin=this.getView().byId("StorageBin2").getSelectedKey();
			}

			var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
			if(oManualEntryST==true)
			{
				oDestSType=this.getView().byId("StorageType2").getValue();
			}
			else
			{
				oDestSType=this.getView().byId("StorageType1").getSelectedKey();
			}


			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();
			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity=formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();
			oDestQuantity= formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();

			if(oSourceSUnit="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";
			}
			else
			{
				oDestMovType="SU";
			}

			if(oDestSType=="" || oDestSType=="Select S Type")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStoageType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin=="" || oDestSBin=="Select S Bin")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin.length > 10)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestQuantity <= 0)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oSourceSType==oDestSType && oSourceSBin==oDestSBin)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestSTypeandBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{
				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}	
		}	
		if(oHeaderType=="STOCK_STATUS")
		{
			printingParams = "";
			oDestSBin=this.getView().byId("StorageBin1").getValue();	
			oDestSUnit=this.getView().byId("StorageUnite1").getValue();
			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();
			oDestSType=this.getView().byId("StorageType1").getSelectedItem().getText();
			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity=formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();
			oDestQuantity= formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();
			if(oSourceSUnit=="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";
			}
			else
			{
				oDestMovType="SU";
			}
			if(oDestQuantity <= 0)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{
				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}
		}	

		if(oHeaderType=="SU_SPLIT")
		{

			var selectedPrinter = this.getView().byId("printerName").getSelectedKey();
			var printerSplit = selectedPrinter.split("---");
			printerName = printerSplit[0]+"---"+printerSplit[1];
			noOfCopiesInput = this.getView().byId("noOfCopiesInput").getValue();
			printingParams = printerName+","+parseInt(noOfCopiesInput,10);

			var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
			if(oManualEntryST==true)
			{
				oDestSType=this.getView().byId("StorageType2").getValue();
			}
			else
			{
				oDestSType=this.getView().byId("StorageType1").getSelectedKey();
			}
			var oAutoGenerate=this.getView().byId("AutoGenerateID").getSelected();
			if(oAutoGenerate == true){
				printingFlag = "true";
			}
			var oManualEntry=this.getView().byId("ManualEntry").getSelected();
			if(oManualEntry==true)
			{
				var DestSBin=this.getView().byId("StorageBin1").getValue();	
				oDestSBin=DestSBin.toUpperCase();
			}
			else
			{
				oDestSBin=this.getView().byId("StorageBin2").getSelectedKey();
			}

			oDestSUnit=this.getView().byId("StorageUnite1").getValue();
			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();

			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity= formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();
			oDestQuantity= formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();


			if(oSourceSUnit=="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";
			}
			else
			{
				oDestMovType="SU";
			}

			if(oDestSType=="" || oDestSType=="Select S Type")
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStoageType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin=="" || oDestSBin=="Select S Bin")
			{
				;
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSUnit=="---" || oDestSUnit=="")
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageUnit"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin.length > 10)
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestQuantity <= 0)
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			/*		else if(oSourceSType==oDestSType && oSourceSBin==oDestSBin)
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestSTypeandBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
		}    */
			else if(oDestSUnit.length != 20)
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageUnit"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(selectedPrinter == "")
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(noOfCopiesInput == "" && printerSplit!="No Print,NA,")
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{

				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}	

		}
		if(oHeaderType=="SLOC_SLOC" || oHeaderType=="N.SLOC_N.SLOC")
		{
			printingParams = "";
			var oManualEntryST=this.getView().byId("ManualEntryST").getSelected();
			if(oManualEntryST==true)
			{
				oDestSType=this.getView().byId("StorageType2").getValue();
			}
			else
			{
				oDestSType=this.getView().byId("StorageType1").getSelectedKey();
			}
			oDestSUnit=this.getView().byId("StorageUnite1").getValue();
			oSourceSUnit=this.getView().byId("StorageUnite").getValue();
			oSourceSType=this.getView().byId("StorageType").getValue();
			oSourceSBin=this.getView().byId("StorageBin").getValue();
			oSourceBatch=this.getView().byId("BatchNumber").getValue();
			oSourceMaterial=this.getView().byId("MatNumber").getValue();

			oDestStorageLoc=this.getView().byId("StorageLoc1").getSelectedKey();
			oDestWHNumber=this.getView().byId("Warehouse1").getValue();
			oSourceQuantity=this.getView().byId("Quantity").getValue();
			oSourceQuantity= formatQuantity(oSourceQuantity, "PARSE");
			oDestQuantity=this.getView().byId("Quantity1").getValue();	
			oDestQuantity= formatQuantity(oDestQuantity, "PARSE");
			oDestBatch=this.getView().byId("BatchNumber1").getValue();
			oSourceStorageLoc=this.getView().byId("StorageLoc").getValue();
			oSourceWHNumber=this.getView().byId("Warehouse").getValue();
			oDestMaterial=this.getView().byId("MatNumber1").getValue();
			oSorceStockCat=this.getView().byId("StockCategory").getValue();
			oDestStockCat=this.getView().byId("StockCategory1").getValue();
			oSourceSLED=this.getView().byId("SLED").getValue();
			oDestSLED=this.getView().byId("SLED1").getValue();
			oManualEntry=this.getView().byId("ManualEntry").getSelected();

			if(oSourceSUnit=="---" )
			{
				oSourceMovType="NONSU";
			}
			else
			{
				oSourceMovType="SU";
			}
			if(oDestSUnit=="---" || oDestSUnit=="")
			{
				oDestMovType="NONSU";

			}
			else
			{
				oDestMovType="SU";
			}

			if(oManualEntry==true)
			{
				var DestSBin=this.getView().byId("StorageBin1").getValue();	
				oDestSBin=DestSBin.toUpperCase();

			}
			else
			{
				oDestSBin=this.getView().byId("StorageBin2").getSelectedKey();
			}

			if(oDestStorageLoc=="" || oDestStorageLoc=="Select S Location")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectSLoc"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestWHNumber=="" || oDestWHNumber=="Select WH Number")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectWHNumber"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSType=="" || oDestSType=="Select S Type")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStoageType"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin=="" || oDestSBin=="Select S Bin")
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SelectStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oDestSBin.length > 10)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_LengthStorageBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(oSourceStorageLoc==oDestStorageLoc)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_SLocNotEqualDestLoc"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
				this.getView().byId("StorageType1").setSelectedKey("null");
				this.getView().byId("StorageLoc1").setSelectedKey("null");
				this.getView().byId("Warehouse1").setValue("null");
				if(oManualEntry==true)
				{
					this.getView().byId("StorageBin1").setValue("null");	
				}
				else
				{
					this.getView().byId("StorageBin2").setSelectedKey("null");
				}
			}
			else if(oSourceSType == oDestSType && oSourceSBin == oDestSBin)
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestSTypeandBin"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
				this.getView().byId("StorageType1").setSelectedKey("null");
				this.getView().byId("StorageLoc1").setSelectedKey("null");
				this.getView().byId("Warehouse1").setValue("null");
				if(oManualEntry==true)
				{
					this.getView().byId("StorageBin1").setValue("null");	
				}
				else
				{

					this.getView().byId("StorageBin2").setSelectedKey("null");
				}

			}

			else if(oDestQuantity <= 0)
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if(isNaN(oDestQuantity)){
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DestQuantityPositive"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else if (parseInt(oDestQuantity) > parseInt(oSourceQuantity))
			{
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"TransferType_alert_DQuantityLesserSQuantity"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
			else
			{
				sap.ui.controller("JS.TransferOrder").CreateTransferOrder(this); 
			}	
		}		
	},
	CreateTransferOrder : function()
	{


		if(oDestSUnit=="")
		{
			oDestSUnit="---";
		}
		if(oSourceBatch=="---")
		{
			oSourceBatch="null";
		}
		if(oDestBatch=="---")
		{
			oDestBatch="null";
		}
		var DateNw=new Date();


		var oCreateTOModel= new sap.ui.model.xml.XMLModel();

		oCreateTOModel.attachRequestSent(function(){
			sap.ui.core.BusyIndicator.show(1);
		}); 

//		To Accomodate more than 32 params to be sent  convert params to XML

		var inputRequestParamToXMLformat="<?xml version=\"1.0\" encoding=\"UTF-8\"?><TransferOrderDetails><I_BinFlag>false</I_BinFlag><I_DestBatch>"+oDestBatch+"</I_DestBatch>"+
		"<I_DestMaterial>"+oDestMaterial+"</I_DestMaterial>"+
		"<I_DestProdDate>"+oProdDate+"</I_DestProdDate>"+
		"<I_DestSLED>"+oDestSLED+"</I_DestSLED>"+
		"<I_DestSLOC>"+oDestStorageLoc+"</I_DestSLOC><I_DestSSCCNum>"+oDestSUnit+"</I_DestSSCCNum><I_DestSTBin>"+encodeURIComponent (oDestSBin)+"</I_DestSTBin>"+
		"<I_DestStockCat>"+oDestStockCat+"</I_DestStockCat><I_DestSTType>"+oDestSType+"</I_DestSTType><I_DestUnitType>"+oDestUnitType+"</I_DestUnitType>"+
		"<I_DestWHNo>"+oDestWHNumber+"</I_DestWHNo><I_HeaderType>"+oHeaderType+"</I_HeaderType><I_MovementType></I_MovementType>"+
		"<I_MovementType_Dest>"+oDestMovType+"</I_MovementType_Dest><I_MovementType_Source>"+oSourceMovType+"</I_MovementType_Source><I_Plant>"+oPlant+"</I_Plant>"+
		"<I_PrintingFlag>true</I_PrintingFlag><I_PrintingParams>"+printingParams+"</I_PrintingParams><I_Quantity_Dest>"+oDestQuantity+"</I_Quantity_Dest>"+
		"<I_Quantity_Source>"+oSourceQuantity+"</I_Quantity_Source><I_SourceBatch>"+oSourceBatch+"</I_SourceBatch>"+
		"<I_SourceBatchStatus>"+oBatchStatus+"</I_SourceBatchStatus><I_SourceMaterial>"+oSourceMaterial+"</I_SourceMaterial>"+
		"<I_SourceProdDate>"+oProdDate+"</I_SourceProdDate><I_SourceSLED>"+oSourceSLED+"</I_SourceSLED><I_SourceSSCCNum>"+oSourceSUnit+"</I_SourceSSCCNum>"+
		"<I_SourceSTBin>"+encodeURIComponent (oSourceSBin)+"</I_SourceSTBin><I_SourceStockCat>"+oSorceStockCat+"</I_SourceStockCat><I_SourceSTType>"+oSourceSType+"</I_SourceSTType>"+
		"<I_SourceUnitType>"+oSourceUnitType+"</I_SourceUnitType><I_StorageLOC>"+oSourceStorageLoc +"</I_StorageLOC><I_UOM>"+oUOM+"</I_UOM>"+
		"<I_WHNumber>"+oSourceWHNumber+"</I_WHNumber></TransferOrderDetails>";



		console.log("inputRequestParamToXMLformat"+inputRequestParamToXMLformat);



		oCreateTOModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_MoveStockDetailstoDestination&Param.1="+inputRequestParamToXMLformat+"&d="+DateNw+"&Content-Type=text/xml"),"",true);

		oCreateTOModel.attachRequestCompleted(function(){
			sap.ui.core.BusyIndicator.hide();

			oMessage =oCreateTOModel.getProperty("/Rowset/Row/Message");
			oTONumber  =oCreateTOModel.getProperty("/Rowset/Row/TONumber");

			if(oMessage==getPropertyValue(oResourceModel,"TO_MSG4"))	
			{

				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.confirm(oMessage,fnCallbackConfirm, getPropertyValue(oResourceModel,"TransferDisplay_Confirm"));

				function fnCallbackConfirm(ok)
				{
					if(ok)
					{
						var oTOModel= new sap.ui.model.xml.XMLModel();
						/*
				oTOModel.attachRequestSent(function(){
					sap.ui.core.BusyIndicator.show(1);
				});
						 */
						oTOModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_MoveStockDetailstoDestination&Param.1="+inputRequestParamToXMLformat+"&Param.2=1&d="+DateNw+"&Content-Type=text/xml"),"",false);

//						oTOModel.attachRequestCompleted(function(){
						//sap.ui.core.BusyIndicator.hide();
						oTONumber  =oTOModel.getProperty("/Rowset/Row/TONumber");
						oMessage =oTOModel.getProperty("/Rowset/Row/Message");



						sap.ui.controller("JS.TransferOrder").NavToTransferDisplay(this); 	
						//});
					}
					else
					{

					}
				}

			}	

			else
			{
				sap.ui.controller("JS.TransferOrder").NavToTransferDisplay(this); 	
			}	
		});
	},
	NavToTransferDisplay : function()
	{

		if(oMessage=="" && oTONumber!="")
		{
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert((getPropertyValue(oResourceModel,"TransferType_alert_TONumber")+oTONumber+" "+getPropertyValue(oResourceModel,"TransferType_alert_SuccessCreated")),fnCallbackConfirm,sap.ui.commons.MessageBox.Icon.SUCCESS);
			function fnCallbackConfirm(bResult)
			{
				var app = sap.ui.getCore().byId("idapp");

				var app = sap.ui.getCore().byId("idapp");
				app.back("TransferDisplay","show");

				localStorage.removeItem("StorageUnit");
				localStorage.removeItem("StorageUnit");
				localStorage.removeItem("MaterialNo");
				localStorage.removeItem("BatchNo");
				localStorage.removeItem("SLED1");
				localStorage.removeItem("BatchStatus1");
				localStorage.removeItem("StorageType");
				localStorage.removeItem("StorageBin1");
				localStorage.removeItem("Quantity1");
				localStorage.removeItem("StockCategory1");
				localStorage.removeItem("oWHNumber1");
				localStorage.removeItem("oStorageLoc");
				localStorage.removeItem("HeaderType");
				localStorage.removeItem("Plant");
				localStorage.removeItem("UOM");
				localStorage.removeItem("CommUOM");
				localStorage.removeItem("FlagDest");
				localStorage.removeItem("SBatchStatus");
				localStorage.removeItem("oHeaderTypeText");
				localStorage.setItem("TOStorageUnit", oDestSUnit);
				localStorage.setItem("TOStockCat", oDestStockCat);
				localStorage.setItem("TOStorageLoc", oDestStorageLoc);
				localStorage.setItem("TOWHNumber", oDestWHNumber);
				localStorage.setItem("TOStorageType", oDestSType);
				localStorage.setItem("TOStorageBin", oDestSBin);
				localStorage.setItem("TOBatchNumber", oDestBatch);
				localStorage.setItem("TOMaterialNumber", oDestMaterial);
				localStorage.setItem("TOBatchStatus",oBatchStatus);
				Batchflag=1;
				localStorage.setItem("BatchFlagBack",Batchflag);
				var r = sap.ui.getCore().byId("TransferOrder");
				oSSCCFlag=0;
				r.destroy();


			}

		}

		else
		{

			//sap.ui.controller("JS.TransferOrder").NavToTransferDisplay(this); 	
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.alert(oMessage);

		}	
	},
	validateNoOfPrintCopies: function(){
		var inputValue= this.getView().byId("noOfCopiesInput");
		var noOfCopies = inputValue.getValue();

		if(noOfCopies !=""){
			if(noOfCopies>0 && !isNaN(noOfCopies) && parseInt(Number(noOfCopies)) == noOfCopies && !isNaN(parseInt(noOfCopies, 10))){
			}else{
				inputValue.setValue("");
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel,"NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel,"TransferDisplay_Message"));
			}
		}
	},
	showPrinterSelection: function(){

		var dateRefresh = new Date();
		var printerNameSelection = this.getView().byId("printerName");
		var oPrinterModel= new sap.ui.model.xml.XMLModel();
		var materialNo=this.getView().byId("MatNumber1").getValue();
		oPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=TO&Param.2="+client+"&Param.3="+materialNo+"&d="+dateRefresh+"&Content-Type=text/xml"),"",false);

		var oPrinterListItem= new sap.ui.core.ListItem();
		oPrinterListItem.bindProperty("text", "VALUE");
		oPrinterListItem.bindProperty("key", "KEY");
		printerNameSelection.bindItems("/Rowset/Row", oPrinterListItem);
		printerNameSelection.setModel(oPrinterModel);
		printerNameSelection.setSelectedKey(oPrinterModel.getProperty("/Rowset/Row/0/KEY"));
		this.getView().byId("noOfCopiesInput").setValue(printerNameSelection.getSelectedKey().split("---")[2]);

	},

	onPrinterSelection: function(){

		var printerNameSelection = this.getView().byId("printerName");

		this.getView().byId("noOfCopiesInput").setValue(printerNameSelection.getSelectedKey().split("---")[2]);
		if(this.getView().byId("printerName").getSelectedKey()=="No Print---NA---")
		{
			this.getView().byId("noOfCopiesInput").setEnabled(false);
		}
		else
		{
			this.getView().byId("noOfCopiesInput").setEnabled(true);
		}
	},
	/*onLiveChange:function(oEvent){
		var quantityValue=this.getView().byId("Quantity1").getValue();
		if(quantityValue != ""){
				var quantity= formatQuantity(quantityValue, "PARSE");

				if(isNaN(quantity) || quantity ==  "undefined" || quantity == undefined){
					jQuery.sap.require('sap.ui.commons.MessageBox');
					sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "BCP_COMMON_VALID_QUANTITY"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModel, "TransferDisplay_Message"));
					this.getView().byId("Quantity1").setValue(""); 
			}
				this.getView().byId("Quantity1").setEnabled(true); 
		}
}, */
	onTest: function(){

	}

});