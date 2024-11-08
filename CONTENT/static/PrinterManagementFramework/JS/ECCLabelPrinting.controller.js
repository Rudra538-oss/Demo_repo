var machine;
var temp;
var pIP, oCopies;
var pPort;
var PrintDesc;
var tmpName;
var PrinIP;
var prinPort;
var oPrinterIP;
var oPrinterPort;
var oGlobalTemp;
var chkboxAll;
var oResourceModel;
var userLanguage;
var copies, tmpPath;
var bcpElement;
var oBCPStats;
var oAltUOMDescQty;
var oIntUOMQty;
var oSSCC, oSSCClist;
var oControllerThis;
var noOfKeyIdentifiers=0;
var isSSCCblank, isInvalidSSCC, invalidSSCC, inputXML, maxNumberSSCC;
jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.ECCLabelPrinting", {


	onInit: function () {


		/////////////////////////////////////////////////////////////////////////////////////////////////BCP Status Logic////////////////////////////////////////////////////////////////////
		var DateNw = new Date();
		bcpElement = this.getView().byId("bcpStatus");
		oBCPStats = getBCPStatus(bcpElement, "", "");
		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
		var RefreshDate = new Date();
		var oUserDataModel = new sap.ui.model.xml.XMLModel();
		oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + RefreshDate + "&Content-Type=text/xml", "", false);
		userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

		//New code start for Localization default to English/////START
		var details = "ECCLabel_Header_Title,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,ECCLabel_alert7,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,ECCLabel_alert1,ECCLabel_alert6,ECCLabel_alert2,ECCLabel_alert5,NPM_COMMON_Message,ECCLabel_alert3,ECCLabel_alert4,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,NPM_COMMON_Message,TransferDisplay_Message,ECCLabel_alert8, ECCLabel_Err2, ECCLabel_Err1,NPORTAL_IMR_CONFIRMATION, ECCLabel_alert9, ECCLabel_alert10,Custom_GR_Error";
		oResourceModel = new sap.ui.model.xml.XMLModel();
		oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);


		var page = this.getView().byId("page");
		var identifier = "PConfig1>NPDashboard_Back,PConfig2>ECCLabel_Header_Title,PConfig3>ECCLabel_Panel_Header,PConfig4>Print_SSCC,PConfig5>Print_Template,PConfig6>Print_GetExistingPrinter,PConfig7>Print_Printer,PConfig8>Print_Template,PConfig9>ECCLabel_PrinterIP,PConfig10>ECCLabel_PrinterPort,PConfig11>CustomGR_GR_16,PConfig20>ECC_Label_ReprintHdr,PConfig21>TransferDisplay_colHeader_uom,PConfig12>Print_Print,title1>InBndMatRecpt_title_BCP,PConfig13>GI_ComponentList_Reset";
		localize(page, identifier, userLanguage);

		//New code start for Localization default to English//// END

		document.title = getPropertyValue(oResourceModel, "ECCLabel_Header_Title");

		machine = document.getElementById("machine").value;
		var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
		this.getView().byId("shell1").getUser().setUsername(username);
		var chkboxAll = this.getView().byId("ChckBox1").setSelected(true);
		temp = this.getView().byId("Template").setEnabled(false);
		pIP = this.getView().byId("PrinterIP").setEnabled(false);
		pPort = this.getView().byId("PrinterPort").setEnabled(false);
		this.getView().byId("reprintUOM0").setEnabled(false);
		var oSSCC = this.getView().byId("SSCC0").getValue();

		oControllerThis = this;
		///////////////////////////////////////// Select Existing Printer ///////////////////////////////////////////
		var oPritDesc = "REPRINT";
		var oExisPrinterModel = new sap.ui.model.xml.XMLModel();
		oExisPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1=" + oPritDesc + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);
		PrintDesc = this.getView().byId("PrinterDesc");
		var oPrintDescline = new sap.ui.core.ListItem();
		oPrintDescline.bindProperty("text", "Value");
		oPrintDescline.bindProperty("key", "Key");
		PrintDesc.bindItems("/Rowset/Row", oPrintDescline);
		PrintDesc.setModel(oExisPrinterModel);
		PrintDesc.setSelectedKey("Select Printer");

		///////////////////////////////////////// Assign Maximum Iteration Number of SSCC to be added ///////////////////////////////////////////
		var oMaximumSSCCModel = new sap.ui.model.xml.XMLModel();
		oMaximumSSCCModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetSSCCmaxCount_Persistant&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);
		maxNumberSSCC=oMaximumSSCCModel.getProperty("/Rowset/Row/maxNumberSSCC_ECCReprintLabel");
		

	},
	onAfterRendering: function () {

		/////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
		var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
		var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
		setIdleTime(sessionExpMsg, sessionExpTitle);

		/////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////

		setInterval(function () {
			oBCPStats = getBCPStatus(bcpElement, "", "");
		}, 30000);
	},

	/**
	 * To fetch SSCC-UOMs
	 */
	doGetSSCCUOM:function() {
	  inputXML = "<Rowsets><Rowset>";
	  invalidSSCC="";
	  isSSCCblank = false;isInvalidSSCC= false;
	  for (let noOfSSCC = 0; noOfSSCC <= noOfKeyIdentifiers; noOfSSCC++) {
		var oSSCCID = oControllerThis.getView().byId("SSCC"+noOfSSCC);
		oSSCCID = ((oSSCCID==undefined) || (oSSCCID=="") || (oSSCCID=="undefined"))?sap.ui.getCore().byId("SSCC"+noOfSSCC) : oSSCCID;
		var AltUOMID = oControllerThis.getView().byId("reprintUOM"+noOfSSCC);
		AltUOMID = ((AltUOMID==undefined) || (AltUOMID=="") || (AltUOMID=="undefined"))?sap.ui.getCore().byId("reprintUOM"+noOfSSCC) : AltUOMID;
		if(oSSCCID!=undefined && AltUOMID!= undefined){
		  if(oSSCCID.getValue()=="" || oSSCCID.getValue()==null){
		    isSSCCblank = true;
		  }else if(AltUOMID.getSelectedItem()== "" || AltUOMID.getSelectedItem()==null || AltUOMID.getSelectedItem().getText()=="" || AltUOMID.getSelectedItem().getText()== null){
		    isInvalidSSCC = true;
		    invalidSSCC = (invalidSSCC=="")?oSSCCID.getValue(): invalidSSCC+", "+oSSCCID.getValue();
		     inputXML= inputXML+ "<Row><SSCC>"+oSSCCID.getValue()+"</SSCC><InternalUOMQuantity/><ALTUOmQTy/></Row>";
		  }else{
		     inputXML= inputXML+ "<Row><SSCC>"+oSSCCID.getValue()+"</SSCC><InternalUOMQuantity>"+AltUOMID.getSelectedKey()
					+"</InternalUOMQuantity><ALTUOmQTy>"+AltUOMID.getSelectedItem().getText()+"</ALTUOmQTy></Row>";
		  }
		}
	}
	inputXML = inputXML+"</Rowset></Rowsets>";
		
	},
	/**
	 * To add SSCC
	 */
	doAddIdentifier:function() {

	     for(let inNum=1; inNum<maxNumberSSCC+1; inNum++){
	       if(sap.ui.getCore().getElementById("SSCC"+inNum)==undefined){
	         noOfKeyIdentifiers= (noOfKeyIdentifiers>inNum)?noOfKeyIdentifiers: inNum;
	         if(inNum==maxNumberSSCC){
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "ECCLabel_alert8").replace("10", maxNumberSSCC), {
			title: getPropertyValue(oResourceModel, "Custom_GR_Error")
		});
		break;
	         } else{
		var inputSSCC = new sap.m.Input({
			id : "SSCC" + inNum,
			width: "60%",
			change: oControllerThis.SSCCValidation
		});
		var selectReprintUOM = new sap.m.Select({
			id : "reprintUOM" + inNum,
			enabled: false,
			items: [new sap.ui.core.Item({key:"{InternalUOM}", text:"{UOMDESC}"})]
		});
		var btnRemoveSSCC = new sap.ui.commons.Image("btn_removeSSCC"+inNum,{
			width: "10%",
			press: oControllerThis.doRemoveIdentifier,
			src: "/XMII/CM/MaterialHandling/PrinterManagementFramework/Common/Image/minusImage.png"
		});
		btnRemoveSSCC.addStyleClass("addPaddingImage");

		var oFormCnt14 = new sap.ui.layout.form.FormContainer("cntnrSSCCConfig"+ inNum, {
								  formElements : [  new sap.ui.layout.form.FormElement({ label: "{PConfig4>Print_SSCC}", fields : [ inputSSCC ]})
								  ]
							  });
		var oFormCnt15 = new sap.ui.layout.form.FormContainer("cntnrReprintUOMConfig"+ inNum, {
								  formElements : [  new sap.ui.layout.form.FormElement({ label: "{PConfig21>TransferDisplay_colHeader_uom}", fields : [ selectReprintUOM, btnRemoveSSCC ]})
								  ]
							  });
		oControllerThis.getView().byId("SSCCConfig").addFormContainer(oFormCnt14);
		oControllerThis.getView().byId("SSCCConfig").addFormContainer(oFormCnt15);
		break;
	         }
	       }

	     }

	},
	/**
	 * To remove ALL SSCC
	 */
	doRemoveALLIdentifier:function(evt) {
	   inputXML="";oSSCClist="";
	   this.getView().byId("SSCC0").setValue(null);
	   this.getView().byId("reprintUOM0").setEnabled(false);
	   var oAltUOMNullModel = new sap.ui.model.xml.XMLModel();
	   this.getView().byId("reprintUOM0").setModel(oAltUOMNullModel);
	   for (let noOfSSCC = 1; noOfSSCC <= noOfKeyIdentifiers; noOfSSCC++) {
		var oSSCCID = sap.ui.getCore().byId("SSCC"+noOfSSCC);
		var AltUOMID = sap.ui.getCore().byId("reprintUOM"+noOfSSCC);
		if(oSSCCID!=undefined && AltUOMID!= undefined){
		  sap.ui.getCore().getElementById("cntnrSSCCConfig"+noOfSSCC+"--Grid").destroy();
		  sap.ui.getCore().getElementById("cntnrReprintUOMConfig"+noOfSSCC+"--Grid").destroy();
		  sap.ui.getCore().getElementById("SSCC"+noOfSSCC).destroy();
		  sap.ui.getCore().getElementById("reprintUOM"+noOfSSCC).destroy();
		  sap.ui.getCore().getElementById("btn_removeSSCC"+noOfSSCC).destroy();
		  sap.ui.getCore().getElementById("cntnrSSCCConfig"+noOfSSCC).destroy();
		  sap.ui.getCore().getElementById("cntnrReprintUOMConfig"+noOfSSCC).destroy();
		}
	   }
	},

	/**
	 * To remove SSCC
	 */
	doRemoveIdentifier:function(evt) {
		var evtSource = evt.getSource().getId();
		var remnoOfKeyIdentifiers = evtSource.replace("btn_removeSSCC", "");
		if(remnoOfKeyIdentifiers>0){
		  oSSCClist = oSSCClist.replace(sap.ui.getCore().getElementById("SSCC"+remnoOfKeyIdentifiers).getValue(),"").replace(",,", ",");
		  sap.ui.getCore().getElementById("cntnrSSCCConfig"+remnoOfKeyIdentifiers+"--Grid").destroy();
		  sap.ui.getCore().getElementById("cntnrReprintUOMConfig"+remnoOfKeyIdentifiers+"--Grid").destroy();
		  sap.ui.getCore().getElementById("SSCC"+remnoOfKeyIdentifiers).destroy();
		  sap.ui.getCore().getElementById("reprintUOM"+remnoOfKeyIdentifiers).destroy();
		  sap.ui.getCore().getElementById("btn_removeSSCC"+remnoOfKeyIdentifiers).destroy();
		  sap.ui.getCore().getElementById("cntnrSSCCConfig"+remnoOfKeyIdentifiers).destroy();
		  sap.ui.getCore().getElementById("cntnrReprintUOMConfig"+remnoOfKeyIdentifiers).destroy();
		}

	},


	GetExistingPrinter: function () {

		var RefreshDate = new Date();
		chkboxAll = this.getView().byId("ChckBox1");
		if (chkboxAll.getSelected() == false) {
			this.getView().byId("copies").setValue("");
			PrintDesc = this.getView().byId("PrinterDesc").setEnabled(false);
			this.getView().byId("PrinterDesc").setSelectedKey(null);
			temp = this.getView().byId("Template").setEnabled(true);
			pIP = this.getView().byId("PrinterIP").setEnabled(true);
			pPort = this.getView().byId("PrinterPort").setEnabled(true);
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////Select Screen type/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			oGlobalTemp = "GLOBAL_TEMPLATE";
			var oGlobalTempModel = new sap.ui.model.xml.XMLModel();
			oGlobalTempModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetData_Dropdowns&Param.1=" + oGlobalTemp + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);

			var selGlobalTemp = this.getView().byId("Template");
			var oListItemGlobalTemp = new sap.ui.core.ListItem();
			oListItemGlobalTemp.bindProperty("text", "Value");
			oListItemGlobalTemp.bindProperty("key", "Key");
			selGlobalTemp.bindItems("/Rowset/Row", oListItemGlobalTemp);
			selGlobalTemp.setModel(oGlobalTempModel);
			selGlobalTemp.setSelectedKey("Select Global Template");

			oPrinterIP = this.getView().byId("PrinterIP").getValue();
			oPrinterPort = this.getView().byId("PrinterPort").setValue("9100");
			pPort = this.getView().byId("PrinterPort").setEnabled(false);

		} else {
			PrintDesc = this.getView().byId("PrinterDesc").setEnabled(true);
			temp = this.getView().byId("Template").setEnabled(false);
			pIP = this.getView().byId("PrinterIP").setEnabled(false);
			pPort = this.getView().byId("PrinterPort").setEnabled(false);
			this.getView().byId("Template").setSelectedKey(null);
			this.getView().byId("copies").setValue("");
			PrintDesc="";PrinIP="";prinPort="";

		}
	},

	PrinterValidation: function ()

	{
		var RefreshDate = new Date();
		PrintDesc = this.getView().byId("PrinterDesc").getSelectedKey();


		///////////////////////////////////////// Get Temp ///////////////////////////////////////////

		var otempModel = new sap.ui.model.xml.XMLModel();
		otempModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/MDOQ_GetTempNameFromPrintID&Param.1=" + PrintDesc + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);
		tmpName = otempModel.getProperty("/Rowset/Row/GLOBAL_TEMPLATE_PATH");
		copies = otempModel.getProperty("/Rowset/Row/COPIES");
		this.getView().byId("copies").setValue(copies);

		///////////////////////////////////////// Get Printer IP ///////////////////////////////////////////

		var oPrintIPModel = new sap.ui.model.xml.XMLModel();
		oPrintIPModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/MDOQ_SelectPrinterConfigIP&Param.1=" + PrintDesc + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);
		pIP = this.getView().byId("PrinterIP");

		PrinIP = oPrintIPModel.getProperty("/Rowset/Row/PRINTER_IP");
		prinPort = oPrintIPModel.getProperty("/Rowset/Row/PRINTER_PORT");

		if (tmpName == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "ECCLabel_alert1"), {
				title: getPropertyValue(oResourceModel, "NPM_COMMON_Message")
			});
		}


	},

	TemplateValidation: function () {
		var RefreshDate = new Date();
		tmpPath = this.getView().byId("Template").getSelectedKey();
		var oCopyModel = new sap.ui.model.xml.XMLModel();
		oCopyModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/MDOQ_Get_CopiesFromTmpPath&Param.1=" + tmpPath + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);

		// copies=oCopyModel.getProperty("/Rowset/Row/COPIES");
		copies = "1"
		this.getView().byId("copies").setValue(copies);

	},



//////////////////////////////////commented as part of VSTS 66062//////////////////////////////////////////////////////////////////////////////////////
	/*doCheckBCPstatusPrint: function () {
                       oBCPStats = getBCPStatus(bcpElement, "", "");
		if (oBCPStats == 1) {
			
			sap.m.MessageBox.show(getPropertyValue(oResourceModel, "ECCLabel_alert7"), {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Warning",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === sap.m.MessageBox.Action.YES) {
						oControllerThis.print();
					} 
				}
			});
		} else {
			oControllerThis.print();
		}
	},*/

	print:function(){
	    chkboxAll = this.getView().byId("ChckBox1");
	    PrintDesc = this.getView().byId("PrinterDesc").getSelectedKey();
	    //oSSCC_UOMxml = oControllerThis.doGetSSCCUOM();
	    var RefreshDate = new Date();
	    if (chkboxAll.getSelected() == false) {
	        oGlobalTemp = this.getView().byId("Template").getSelectedKey();
	        oPrinterIP = this.getView().byId("PrinterIP").getValue();
	        oPrinterPort = this.getView().byId("PrinterPort").getValue();
	        if (oPrinterIP == "" || oGlobalTemp == "---") {
	            sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "ECCLabel_alert5"), {
	                title: getPropertyValue(oResourceModel, "Custom_GR_Error")
	            });
	        } else {
	            var oLabelPrintingModel = new sap.ui.model.xml.XMLModel();
		oLabelPrintingModel.attachRequestSent(function(){
			sap.ui.core.BusyIndicator.show(1);
		});
	            oLabelPrintingModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_ToCheckSSCCNo&Param.1=" + inputXML + "&Param.2=" + oGlobalTemp + "&Param.3=" + oPrinterIP + "&Param.4=" + oPrinterPort + "&Param.5=" + oCopies + "&Param.6=" + PrintDesc + "&d=" + RefreshDate + "&Content-Type=text/xml", "", true);
	            //oLabelPrintingModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_ToCheckSSCCNo&Param.1=" + oSSCC + "&Param.2=" + oGlobalTemp + "&Param.3=" + oPrinterIP + "&Param.4=" + oPrinterPort + "&Param.5=" + oCopies + "&Param.6=" + PrintDesc + "&Param.7=" + encodeURIComponent(oAltUOMDescQty) + "&Param.8=" + encodeURIComponent(oIntUOMQty) + "&d=" + RefreshDate + "&Content-Type=text/xml", "", false);

		oLabelPrintingModel.attachRequestCompleted(function(){
			sap.ui.core.BusyIndicator.hide();
	            	var oSuccessFlag = oLabelPrintingModel.getProperty("/Rowset/Row/O_SuccessFlag");
			var oErrMessage = oLabelPrintingModel.getProperty("/Rowset/Row/O_ErrorMessage");
			if (oSuccessFlag== 0) {
			  sap.m.MessageBox.error(oErrMessage, {
			     title: getPropertyValue(oResourceModel, "Custom_GR_Error")
			   });
			} else {
			  sap.m.MessageBox.success(getPropertyValue(oResourceModel, "ECCLabel_alert3")+". "+oErrMessage, {
			    title: getPropertyValue(oResourceModel, "NPM_COMMON_Message")
			  });
			 oControllerThis.doRemoveALLIdentifier();
			}
		});


	        }
	    } else  {
	        var oLabelPrintingModel = new sap.ui.model.xml.XMLModel();

	        if (tmpName == "" || PrinIP == "" || tmpName == undefined || PrinIP == undefined || tmpName == " " || PrinIP == " " || tmpName == null || PrinIP == null) {
	            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "ECCLabel_alert4"), {
	                title: getPropertyValue(oResourceModel, "Custom_GR_Error")
	            });
	        } else {
		oLabelPrintingModel.attachRequestSent(function(){
			sap.ui.core.BusyIndicator.show(1);
		});
	            oLabelPrintingModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_ToCheckSSCCNo&Param.1=" + inputXML + "&Param.2=" + tmpName + "&Param.3=" + PrinIP + "&Param.4=" + prinPort + "&Param.5=" + oCopies + "&Param.6=" + PrintDesc + "&d=" + RefreshDate + "&Content-Type=text/xml", "", true);
	            //oLabelPrintingModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_ToCheckSSCCNo&Param.1=" + oSSCC + "&Param.2=" + tmpName + "&Param.3=" + PrinIP + "&Param.4=" + prinPort + "&Param.5=" + oCopies + "&Param.6=" + PrintDesc + "&Param.7=" + encodeURIComponent(oAltUOMDescQty) + "&Param.8=" + encodeURIComponent(oIntUOMQty) + "&d=" + RefreshDate + "&Content-Type=text/xml", "", false);

		oLabelPrintingModel.attachRequestCompleted(function(){
			sap.ui.core.BusyIndicator.hide();
			var oSuccessFlag = oLabelPrintingModel.getProperty("/Rowset/Row/O_SuccessFlag");console.log(oSuccessFlag);
			var oErrMessage = oLabelPrintingModel.getProperty("/Rowset/Row/O_ErrorMessage");
			if (oSuccessFlag == 0) {
			   sap.m.MessageBox.error(oErrMessage, {
			      title: getPropertyValue(oResourceModel, "Custom_GR_Error")
			   });
			} else {
			  sap.m.MessageBox.success(getPropertyValue(oResourceModel, "ECCLabel_alert3")+". "+oErrMessage, {
			      title: getPropertyValue(oResourceModel, "NPM_COMMON_Message")
			  });
			  oControllerThis.doRemoveALLIdentifier();
			}
		});

	        }
	    }
	},
	doClearPrint : function () {
	  sap.m.MessageBox.show(getPropertyValue(oResourceModel, "ECCLabel_alert10"), {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: getPropertyValue(oResourceModel, "NPORTAL_IMR_CONFIRMATION"),
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === sap.m.MessageBox.Action.YES) {
						noOfKeyIdentifiers=0;
						PrintDesc="";PrinIP="";prinPort="";temp="";
						oControllerThis.getView().byId("PrinterIP").setValue(null);
						oControllerThis.getView().byId("Template").setSelectedKey("---");
						oControllerThis.getView().byId("PrinterDesc").setSelectedKey("");
						oControllerThis.getView().byId("PrinterPort").setValue(null);
						oControllerThis.getView().byId("copies").setValue(null);
						oControllerThis.getView().byId("ChckBox1").setSelected(true).fireSelect();
						oControllerThis.doRemoveALLIdentifier();
					} 
				}
			});
	},
	
	SSCCValidation :function (evt) {
	  var evtSource = evt.getSource();
	  var evtSourceId = evt.getSource().getId();
	  var noOfSSCC = evtSourceId.substring(evtSourceId.length-1);
	oSSCC = evtSource.getValue();
	var RefreshDate = new Date();
	var AltUOMID = oControllerThis.getView().byId("reprintUOM"+noOfSSCC);
	AltUOMID = ((AltUOMID==undefined) || (AltUOMID=="") || (AltUOMID=="undefined"))?sap.ui.getCore().byId("reprintUOM"+noOfSSCC) : AltUOMID;

	if (oSSCC!="" && oSSCC.length >=18)
	{

	///////////////////////////////////////// Select AltUOM Details  ///////////////////////////////////////////
		
		var oAltUOMModel = new sap.ui.model.xml.XMLModel();
		oAltUOMModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_GetUOMReprintLabel&Param.1=" + oSSCC + "&d=" + RefreshDate + "&Content-Type=text/xml"), "", false);
		if ($(oAltUOMModel.getData()).find("Row").size()==0){
		   sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "ECCLabel_Err2"), {
				title: getPropertyValue(oResourceModel, "Custom_GR_Error")
		   });
		   AltUOMID.setEnabled(false);
		   var oAltUOMNullModel = new sap.ui.model.xml.XMLModel();
		   AltUOMID.setModel(oAltUOMNullModel);
		} else{
		   if(oSSCClist!=undefined && oSSCClist!="" && oSSCClist.indexOf(oSSCC)>=0){
		      evtSource.setValue("");
		      AltUOMID.setEnabled(false);
		      var oAltUOMNullModel = new sap.ui.model.xml.XMLModel();
		      AltUOMID.setModel(oAltUOMNullModel);
		      sap.m.MessageBox.warning("SSCC Already Scanned. Please scan another.", {
				title: getPropertyValue(oResourceModel, "Custom_GR_Error")
		      });
		   } else{
		      oSSCClist= (oSSCClist=="" || oSSCClist!=undefined)?oSSCC:oSSCClist+","+oSSCC;
		      AltUOMID.setEnabled(true);
		      var oAltUOMDesc = new sap.ui.core.ListItem();
		      oAltUOMDesc.bindProperty("text", "UOMDESC");
		      oAltUOMDesc.bindProperty("key", "InternalUOM");
		      AltUOMID.bindItems("/Rowset/Row", oAltUOMDesc);
		      AltUOMID.setModel(oAltUOMModel);
		   }
		}
	} else{
		AltUOMID.setEnabled(false);
		var oAltUOMNullModel = new sap.ui.model.xml.XMLModel();
		AltUOMID.setModel(oAltUOMNullModel);
		sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "ECCLabel_Err1"), {
				title: getPropertyValue(oResourceModel, "Custom_GR_Error")
		});
	}
		
		
	},
	doPrint: function () {
		oCopies = this.getView().byId("copies").getValue();
		//oAltUOMDescQty = this.getView().byId("reprintUOM").getSelectedItem().getText();
		//oIntUOMQty=this.getView().byId("reprintUOM").getSelectedKey();
		//oSSCC = this.getView().byId("SSCC").getValue();
		oControllerThis.doGetSSCCUOM();
		if(isSSCCblank){
		    sap.m.MessageBox.error(getPropertyValue(oResourceModel, "ECCLabel_alert2"), {
				title: getPropertyValue(oResourceModel, "Custom_GR_Error")
		     });
		}else if (oCopies == "") {
			sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "ECCLabel_alert6"), {
				title: getPropertyValue(oResourceModel, "Custom_GR_Error")
			});
		} else {
			if (isInvalidSSCC) {
			
			  sap.m.MessageBox.show(invalidSSCC+ " - "+getPropertyValue(oResourceModel, "ECCLabel_alert9"), {
				icon: sap.m.MessageBox.Icon.WARNING,
				title: "Warning",
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function (oAction) {
					if (oAction === sap.m.MessageBox.Action.YES) {
						oControllerThis.print();
					} 
				}
			  });
			} else {
			   oControllerThis.print();
			}
		}
		//this.getView().byId("copies").setValue("");

	},

	validateNoOfPrintCopies: function () {

		var inputValue = this.getView().byId("copies");
		var noOfCopies = inputValue.getValue();

		if (noOfCopies != "") {
			if (noOfCopies > 0 && !isNaN(noOfCopies) && parseInt(Number(noOfCopies)) == noOfCopies && !isNaN(parseInt(noOfCopies, 10))) {} else {
				inputValue.setValue("");
				sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"), {
					title: getPropertyValue(oResourceModel, "Custom_GR_Error")
				});
			}
		}
	},

	goBack: function () {

		window.top.close();

	}


});