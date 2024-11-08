var oResourceModel, oBCPStatusModel;
var userLanguage, oControllerThis;
var typeFromURL, nodeFromURL;
var orderFromURL, matFromURL, desFromURL;
var ord, plantFromURL, mvtType, mvt_type_reverse;
var oSelectedContext, oDisplayTable;
var fname, lname, GIToastMsg;
var dateNow, client;
var res, resFromURL, suFromURL, ConfirmMsgFromURL, GIConsume;
var clientFromURL, target, produced;
var selectedKey, oDialog1;
var su, whNo, sLoc, conQuant, reqQuant;
var reqQuantUOM, conQuantUOM;
var mat, matDes;
var day1, hu_No, wh;
var clientFromURL, plantFromURL;
var headerFromURL, pDateFromURL;
var barCodeFlag;
var sType, sBin;
var unit;
var bcpElement;
var PSAEditable;
var RSPOS;
var prodDate, GITitle;
var ssccvalue;
var avlQuantStage, dAvlQuantInptFld, remainQuantStage;
var avialableQuant, currentReqQuantity, dPalletsInptFld, dQuantInptFld;
var transferStagePrio;
var reqPallet;
var stageQuant, stageUOM;
var GIStageEnableFlag = 0;
var LEQuantStage;
var oCameraScanDialog = null;
var oDialog1 = null;
var DeviceName;
var oView;
var oCameraBarcodeFlag = 0;
var InputssccId;
var palletsStage;
var SSCC_No, phaseNumber, storageType, storageBin;
var loginID;
var StageOpenFlag = 0;
var Input_Flag = 0;
var CamID, backCamID;
var facingmodecamera, last_camera;
var POrder = 0;
var rearAvailableFlag = 0;
jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.ComponentList", {


    onInit: function() {

        oControllerThis = this;
        oView = this.getView();
        DeviceName = "Unknown OS";
        if (navigator.userAgent.indexOf("Win") != -1) DeviceName =
            "Windows OS";
        if (navigator.userAgent.indexOf("Mac") != -1) DeviceName =
            "Macintosh";
        if (navigator.userAgent.indexOf("Linux") != -1) DeviceName =
            "Linux OS";
        if (navigator.userAgent.indexOf("Android") != -1) DeviceName =
            "Android OS";
        if (navigator.userAgent.indexOf("like Mac") != -1) DeviceName =
            "iOS";
        if (DeviceName == "Windows OS") {
            sap.ui.getCore().getElementById("ComponentList--camerascan").setVisible(true);
        }

        if (navigator.userAgent.indexOf("Trident") != -1) {
            this.getView().byId("DeviceInfo").setEnabled(false);

        }


        $(document).keydown(function(evt) {
            if (evt.keyCode == 13) {
                evt.preventDefault();

                if (oControllerThis.getView().byId("barsscc").getEnabled() == false) {
                    sap.ui.controller("JS.ComponentList").okDialogFn();
                } else {
                    sap.ui.controller("JS.ComponentList").OKID();
                }
            }
        });
        jQuery.sap.require("sap.ui.commons.MessageBox");
        var DateNw = new Date();
        sFlag = "0";
        bcpElement = this.getView().byId("bcpStatus");
        oBCPStats = getBCPStatus(bcpElement, "", "");

        if (oBCPStats == 0) {
            sap.ui.getCore().getElementById("ComponentList--CResvId").setVisible(false);
            sap.ui.getCore().getElementById("ComponentList--ProlistBtn").setVisible(false);
            sap.ui.getCore().getElementById("ComponentList--IdocBtn").setVisible(false);

        }
        var oUserDataModel = new sap.ui.model.xml.XMLModel();
        oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);

        userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
        var details = "CustomGI_PO_6,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,CustomGI_GI_23,CustomGI_alert_3,GI_Pallet_Available,GI_Pallet_copy_error,GI_Pallet_copy,GI_Pallet_copysscc,TransferDisplay_colHeader_sUnit,TransferDisplay_colHeader_avail,TransferDisplay_colHeader_sled,CustomGI_PO_Days,BCP_COMMON_MSG_QUANTITY,GI_Stage_SelectStype,GI_Stage_SelectSbin,GI_Stage_EnterQty,GI_Stage_ColHdr,GI_Stage_History_ReqNo,CustomGR_GRR_2,GI_Stage_History,GI_Stage_History_ReqOn,CustomGI_CL_4,GI_Stage_History_ReqBy,GI_Stage_TransPrio,GI_Stage_Error2,GI_Stage_Error5,NPDashboard_And,GI_Stage_Confirm1,GI_Stage_Error3,GI_Stage_Success,NPDashboard_Information,GI_Stage_ExecuteButton,GI_Stage_StockECC,GI_Stage_LT24,GI_Stage_LT22,GI_Stage_Error1,GI_Stage_LB10,CustomGI_GIR_6,GI_Stage_AvlQuant,GI_Stage_RemQuant,GI_Stage_Pallets,NPM_COMMON_STORAGE_BIN,NPM_COMMON_STORAGE_TYPE,GI_Stage_CompMat,GI_Stage_StockMII,CustomGI_CL_3,GI_Stage_ConfigBtn,NPDashboard_Confirmation,RearCam_DevInfo,RearCam_Success,RearCam_Present,RearCam_Hdr,RearCam_Msg,RearCam_Alert,NPM_COMMON_SAVE,NPDashboard_No,TransferDisplay_label_SType,TransferDisplay_label_SBin,NPDashboard_Yes,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDashboard_Goods_Issue,CustomGI_alert_5,CustomGI_alert_6,NPDashboard_Ok,EPO_UI_ERROR_MSG,NPDashboard_Cancel,NPDashboard_Error,NPDashboard_Warning,NPDashboard_Success,CustomGI_alert_9,TO_MSG3,TransferDisplay_Message,CustomGR_alert_26,CustomGI_alert_16,CustomGI_alert_17,CustomGI_alert_18,CustomGI_alert_19,CustomGI_alert_8,Custom_GI_ClearReservation,Custom_GI_BCPONAlert,CustomGI_SureToResetConfirmation,CustomGI_SelectValues,NPDAHSBOARD_MSS_UPDATE_MES_STOCK_SYNC_SUCCESS,LOGOFF_ERROR,LOGOFF_CONFIRMATION,LOGOFF_CONFIRM_MSG,POPOVER_LOGOUT,NPDashboard_Confirm,NPDashboard_Close";
        oResourceModel = new sap.ui.model.xml.XMLModel();
        oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

        var page = this.getView().byId("pageID");
        var identifier = "CompList15>NPM_COMMON_OK,CompList20>TransferDisplay_colHeader_batch,CompList25>GI_Stage_Pallets,CompListIdoc>TO_DashboardTitleHdr,CompListIdoc>GI_Stage_IdocList,CompList23>POReport_BACKFLUSH,CompListHistory>GI_Stage_History,CompListCRS1>GI_Stage_Prolist,CompList1>NPDashboard_Back,CompList21>GI_Stage_ColHdr,CompList22>GI_Stage_ColRow,CompList2>InBndMatRecpt_title_BCP,CompList27>GI_Stage_AvlQuant,CompListCR1>Custom_GI_ClearReserve,CompList3>CustomGI_CL_1,CompList4>CustomGR_GRR_2,CompList5>CustomGI_CL_3,CompList6>CustomGI_CL_4,CompList7>CustomGI_CL_10,CompList8>CustomGI_CL_11,CompList9>CustomGI_CL_6,CompList10>CustomGI_CL_7,CompList11>CustomGI_CL_8,CompList12>CustomGI_CL_9,CompList13>CustomGI_CL_12,CompList14>CustomGI_CL_13,CompList16>NPM_COMMON_STORAGE_TYPE,CompList17>NPM_COMMON_STORAGE_BIN,GMReport21>GMReport_ECCGoodsMvmt,CompList19>POReport_Phase,CompList20>TransferDisplay_label_SType,CompList21>TransferDisplay_label_SBin,CompList22>NPDashboard_SaveDefault,CompList23>GI_ComponentList_Reset,CompList24>NPDashboard_Line,CompList30>RearCam_DevInfo";
        localize(page, identifier, userLanguage);
        clientFromURL = getURLParameter("clientFromURL");
        plantFromURL = getURLParameter("plantFromURL");
        resFromURL = decodeURIComponent(getURLParameter("resFromURL"));
        GITitle = getPropertyValue(oResourceModel, "CustomGI_GI_23");
        document.title = GITitle + "-" + resFromURL;
        orderFromURL = getURLParameter("orderFromURL");
        matFromURL = getURLParameter("matFromURL");
        DocuNoFromURL = getURLParameter("DocuNoFromURL");
        GIConsume = (getURLParameter("GIConsume"));
        desFromURL = decodeURIComponent(getURLParameter("desFromURL"));
        typeFromURL = getURLParameter("typeFromURL");
        nodeFromURL = decodeURIComponent(getURLParameter("nodeFromURL"));
        headerFromURL = decodeURIComponent(getURLParameter("headerFromURL"));
        // alert(headerFromURL);

        day1 = getURLParameter("day1");
        if (headerFromURL != "") {
            // alert(headerFromURL);
            var spl = headerFromURL.split("*");
            matFromURL = spl[0];
            desFromURL = spl[1];
            this.getView().byId("Material").setValue(matFromURL);
            this.getView().byId("MatDes").setValue(desFromURL);
        } else {
            headerFromURL = matFromURL + "*" + desFromURL;
            this.getView().byId("Material").setValue(matFromURL);
            this.getView().byId("MatDes").setValue(desFromURL);
        }

        pDateFromURL = getURLParameter("pDateFromURL");
        prod = typeFromURL;

        fname = document.getElementById("firstname").value;
        lname = document.getElementById("lastname").value;

        loginID = document.getElementById("login").value;
        workstation = document.getElementById("machine").value;

        this.getView().byId("ProcessOrder").setValue(orderFromURL);

        this.getView().byId("resDes").setValue(resFromURL);


        ord = orderFromURL;


        var processOrder = getPO(ord);
        ord = processOrder[0];

        POrder = processOrder[1];



        ////////////////////////////////////////////////WarehouseNo//////////////////////////////////////////////////////////////
        var whModel = new sap.ui.model.xml.XMLModel();
        whModel.setSizeLimit(10000);
        whModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/CR_Inbound/QUERY/MDO_GETHU_MANAGED&Param.1=" + matFromURL + "&Param.2=" + plantFromURL + "&Param.3=" + clientFromURL + "&Param.4=" + POrder + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        whNo = whModel.getProperty('/Rowset/Row/WHNumber');

        if (whNo == "" || whNo == "---") {
            var oWareNoModel = new sap.ui.model.xml.XMLModel();
            oWareNoModel.setSizeLimit(10000);
            oWareNoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=GI&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            whNo = oWareNoModel.getProperty('/Rowset/Row/Value');
        }



        this.clearReservationButtonVisibility();

        if (GI_ClearReservationVisible == 1 && oBCPStats == 1) {
            sap.ui.getCore().getElementById("ComponentList--CResvId").setVisible(true);
        } else {
            sap.ui.getCore().getElementById("ComponentList--CResvId").setVisible(false);
        }



        ////////////////////////////////////////////////Phase-Stype-SBin Selection///////////////////////////////////////////////////



        var oDropdownModel = new sap.ui.model.xml.XMLModel();
        oDropdownModel.setSizeLimit(10000);

        oDropdownModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_SaveDefaultInfoInGI&Param.1=" + ord + "&Param.2=&Param.3=&Param.4=&Param.5=1&OutputParameter=O_DropdownXML&d=" + DateNw + "&Content-Type=text/xml"), "", false);


        var phaseNum = this.getView().byId("PhaseNum");
        var oPhaseItem = new sap.ui.core.ListItem();
        oPhaseItem.bindProperty("text", "Item");
        oPhaseItem.bindProperty("key", "Item");
        phaseNum.bindItems("/Rowset/0/Row", oPhaseItem);
        phaseNum.setModel(oDropdownModel);


        var SType = this.getView().byId("SType");
        var oSTypeItem = new sap.ui.core.ListItem();
        oSTypeItem.bindProperty("text", "Item");
        oSTypeItem.bindProperty("key", "Item");
        SType.bindItems("/Rowset/1/Row", oSTypeItem);
        SType.setModel(oDropdownModel);

        var SBin = this.getView().byId("SBin");
        var oSBinItem = new sap.ui.core.ListItem();
        oSBinItem.bindProperty("text", "Item");
        oSBinItem.bindProperty("key", "Item");
        SBin.bindItems("/Rowset/2/Row", oSBinItem);
        SBin.setModel(oDropdownModel);


        /////////////////////////////////Fetch Saved Default Values////////////////////////////////////////
        var DateNw = new Date();
        var SavedDefaultModel = new sap.ui.model.xml.XMLModel();
        SavedDefaultModel.setSizeLimit(10000);
        SavedDefaultModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/MDOQ_GetSaveDefaultGIInfo&Param.1=" + POrder + "&Param.2=" + loginID + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var SavedDefaultModelXML = SavedDefaultModel.getXML();
        var rowCount = $(SavedDefaultModelXML).find('Row').size();

        if (rowCount > 0) {
            var phaseDropVal = this.getView().byId("PhaseNum");
            var SBinDropVal = this.getView().byId("SBin");
            var STypeDropVal = this.getView().byId("SType");

            for (var i = 0; i < rowCount; i++) {
                var PhaseSel = SavedDefaultModel.getProperty("/Rowset/Row/" + i + "/PHASE")
                var STypeSel = SavedDefaultModel.getProperty("/Rowset/Row/" + i + "/STYPE");
                var SBinSel = SavedDefaultModel.getProperty("/Rowset/Row/" + i + "/SBIN");


                phaseDropVal.addSelectedKeys(PhaseSel);
                STypeDropVal.addSelectedKeys(STypeSel);
                SBinDropVal.addSelectedKeys(SBinSel);
            }

        } else {
            this.getView().byId("Reset").setEnabled(false);
        }

        oControllerThis.selectedAllCheckbox();

        ////////////////////////////////////GI Staging Column////////////////////////////////////////////////////////////////////
        var oGIStageNodeModel = new sap.ui.model.xml.XMLModel();

        oGIStageNodeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStagingConfiguration&Param.1=1&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var GIStageEnable = oGIStageNodeModel.getProperty('/Rowset/Row/Output');
        var GIStageDashboardEnable = oGIStageNodeModel.getProperty('/Rowset/Row/OutputDashboard');
	 PSAEditable = oGIStageNodeModel.getProperty('/Rowset/Row/OutputSupplyArea');

        if ((GIStageEnable == "Plant") || GIStageEnable.indexOf(nodeFromURL) != "-1") {

            if (GIStageDashboardEnable == "1") {
                this.getView().byId("GIStageBar").setVisible(true);
	 this.getView().byId("TODashboardBtn").setVisible(true);
                this.getView().byId("GIStage").setVisible(false);
            } else {
                this.getView().byId("GIStage").setVisible(true);
	 this.getView().byId("GIStageBar").setVisible(false);
                this.getView().byId("TODashboardBtn").setVisible(false);
            }
        } else {
            this.getView().byId("GIStage").setVisible(false);
            this.getView().byId("GIStageBar").setVisible(false);
	this.getView().byId("TODashboardBtn").setVisible(false);
            sap.ui.getCore().getElementById("ComponentList--HisttBtn").setVisible(false);
        }

	   ////////////////////////////////////GI Pallet Configuration////////////////////////////////////////////////////////////////////
        var oGIPalletConfigModel = new sap.ui.model.xml.XMLModel();

        oGIPalletConfigModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIPalletConfiguration&Param.1=1&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var GIPalletInfo = oGIPalletConfigModel.getProperty('/Rowset/Row/Output');
	if((GIPalletInfo == "Plant") || GIPalletInfo.indexOf(nodeFromURL) != "-1")
	{
	  this.getView().byId("getPalletID").setVisible(true);

	}
    },

    onAfterRendering: function() {
        ///////////////////////////////////////////////////////////////Load Table////////////////////////////////////////////////////////////////////////////////////////////////
        var DateNw = new Date();
        oControllerThis.getSelectedValuesForPhase();
        oControllerThis.getSelectedValuesForSType();
        oControllerThis.getSelectedValuesForsBin();

        oDisplayTable = this.getView().byId("ComponentTable");
        var oTableDisplayModel = new sap.ui.model.xml.XMLModel();
        oTableDisplayModel.setSizeLimit(10000);
        oTableDisplayModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetComponentMaterial&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + orderFromURL + "&Param.4=" + plantFromURL + "&Param.5=261&Param.6=262&Param.8=" + userLanguage + "&Param.10=" + encodeURIComponent(storageType) + "&Param.11=" + encodeURIComponent(storageBin) + "&Param.12=" + phaseNumber + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
        oDisplayTable.setModel(oTableDisplayModel);

        if ($(oTableDisplayModel.getXML()).find('Row').size() == 0) {
            this.getView().byId("allChckBox1").setSelected(false);
            this.getView().byId("allChckBox2").setSelected(false);
            this.getView().byId("allChckBox3").setSelected(false);
        }


        /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
        var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
        var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
        setIdleTime(sessionExpMsg, sessionExpTitle);
        //////////////////////////////////////////////////////////////////////////////ToastMsg////////////////////////////////////////////////////////////////////////////////////////////
        GIToastMsg = (getPropertyValue(oResourceModel, "CustomGI_alert_3") + " " + DocuNoFromURL);
        if (GIConsume == "True") {
            sap.m.MessageToast.show(GIToastMsg, {
                duration: 3000
            });
        }

        /////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
        setInterval(function() {
            oBCPStats = getBCPStatus(bcpElement, "", "");
            if (oBCPStats == 0) {
                sap.ui.getCore().getElementById("ComponentList--CResvId").setVisible(false);
                sap.ui.getCore().getElementById("ComponentList--ProlistBtn").setVisible(false);
                sap.ui.getCore().getElementById("ComponentList--IdocBtn").setVisible(false);
                if (StageOpenFlag == 1) {
                    sap.ui.getCore().getElementById("LB10BtnID").setEnabled(false);
                    sap.ui.getCore().getElementById("LT22BtnID").setEnabled(false);
                    sap.ui.getCore().getElementById("LT24BtnID").setEnabled(false);
                    sap.ui.getCore().getElementById("stockECCBtnID").setEnabled(false);
                }
            } else if (oBCPStats == 1) {

                sap.ui.getCore().getElementById("ComponentList--ProlistBtn").setVisible(true);

                sap.ui.getCore().getElementById("ComponentList--IdocBtn").setVisible(true);

                if (StageOpenFlag == 1) {
                    sap.ui.getCore().getElementById("LB10BtnID").setEnabled(true);
                    sap.ui.getCore().getElementById("LT22BtnID").setEnabled(true);
                    sap.ui.getCore().getElementById("LT24BtnID").setEnabled(true);
                    sap.ui.getCore().getElementById("stockECCBtnID").setEnabled(true);
                }
                sap.ui.controller("JS.ComponentList").clearReservationButtonVisibility();
                if (GI_ClearReservationVisible == 1) {
                    sap.ui.getCore().getElementById("ComponentList--CResvId").setVisible(true);
                } else {
                    sap.ui.getCore().getElementById("ComponentList--CResvId").setVisible(false);
                }
            }
        }, 30000);

        var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
        this.getView().byId("shell3").getUser().setUsername(username);
    },

    onSearch: function(oEvent) {
        var sQuery = oEvent.getSource().getValue();
        oDisplayTable = this.getView().byId("ComponentTable");


        var oFilter1 = new sap.ui.model.Filter("Material", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter2 = new sap.ui.model.Filter("MaterialDes", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter3 = new sap.ui.model.Filter("StorageType", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter4 = new sap.ui.model.Filter("StorageBin", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter5 = new sap.ui.model.Filter("ConsumedQuantity", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter6 = new sap.ui.model.Filter("RequiredQuantity", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter7 = new sap.ui.model.Filter("Action", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter8 = new sap.ui.model.Filter("MaterialItem", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter9 = new sap.ui.model.Filter("Phase", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter10 = new sap.ui.model.Filter("PredefinedBatch", sap.ui.model.FilterOperator.Contains, sQuery);
        var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10], false);


        oDisplayTable.getBinding("rows").filter(allFilter);



    },

    clearReservationButtonVisibility: function() {
        var clearNow = new Date();
        oGIClearReservationFlag = new sap.ui.model.xml.XMLModel();
        oGIClearReservationFlag.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGR_ConfirmationMsgFlag&Param.1=" + 1 + "&d=" + clearNow + "&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
        GI_ClearReservationVisible = oGIClearReservationFlag.getProperty("/Rowset/Row/GI_ClearReservation");
    },

    _initQuagga: function(oTarget, CamID) {

        var oDeferred = jQuery.Deferred();
        var oView1 = this.getView();
        // Initialise Quagga plugin - see https://serratus.github.io/quaggaJS/#configobject for details

        if (CamID == undefined || CamID == null || CamID == "") {
            facingmodecamera = "environment";
        }

        Quagga.init({
            inputStream: {
                type: "LiveStream",
                target: oTarget,
                constraints: {
                    width: {
                        min: 640
                    },
                    height: {
                        min: 480
                    },
                    deviceId: CamID,
                    facingmode: facingmodecamera
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            frequency: 10,
            decoder: {
                readers: [{
                    format: "code_128_reader",
                    config: {}
                }]
            },
            locate: true
        }, function(error) {
            if (error) {

                oDeferred.reject(error);
            } else {
                oDeferred.resolve();
            }
        });

        if (!this._oQuaggaEventHandlersAttached) {

            // Attach event handlers...

            Quagga.onProcessed(function(result) {

                var drawingCtx = Quagga.canvas.ctx.overlay,
                    drawingCanvas = Quagga.canvas.dom.overlay;

                if (result) {
                    // The following will attempt to draw boxes around detected barcodes
                    if (result.boxes) {
                        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                        result.boxes.filter(function(box) {
                            return box !== result.box;
                        }).forEach(function(box) {
                            Quagga.ImageDebug.drawPath(box, {
                                x: 0,
                                y: 1
                            }, drawingCtx, {
                                color: "green",
                                lineWidth: 2
                            });

                        });
                    }

                    if (result.box) {
                        Quagga.ImageDebug.drawPath(result.box, {
                            x: 0,
                            y: 1
                        }, drawingCtx, {
                            color: "#00F",
                            lineWidth: 2
                        });
                    }

                    if (result.codeResult && result.codeResult.code) {
                        Quagga.ImageDebug.drawPath(result.line, {
                            x: 'x',
                            y: 'y'
                        }, drawingCtx, {
                            color: 'red',
                            lineWidth: 3
                        });
                    }
                }
            }.bind(this));

            Quagga.onDetected(function(result) {
                // Barcode has been detected, value will be in result.codeResult.code. If requierd, validations can be done 
                // on result.codeResult.code to ensure the correct format/type of barcode value has been picked up

                // Set barcode value in input field
                ssccvalue = result.codeResult.code;

                //ssccvalue=sap.ui.getCore().byId("inputsscc").setValue(result.codeResult.code);




                // Close dialog
                this._oCameraScanDialog.close();
                if (oCameraBarcodeFlag == 1) {
                    this.onScanDialog();
                    InputssccId.setValue(ssccvalue);
                } else {
                    sap.ui.getCore().getElementById("ComponentList--barsscc").setValue(ssccvalue);
                }
            }.bind(this));

            // Set flag so self event handlers are only attached once...
            this._oQuaggaEventHandlersAttached = true;
        }

        return oDeferred.promise();
    },

    rearCameraID: function() {

        self = this;

        //sap.ui.getCore().getElementById("switchCam").setEnabled(false);

        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
                var DateNw = new Date();
                var oSaveCameraModel = new sap.ui.model.xml.XMLModel();

                Input_Flag = 0;

                oSaveCameraModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_CameraDeviceLabel_UserMapping&Param.1=" + Input_Flag + "&d=" + DateNw + "&Content-Type=text/xml", "", false);


                var savedDevice = oSaveCameraModel.getProperty('/Rowset/Row/O_DeviceLabel');


                devices.forEach(function(device) {

                    if ((device.kind == "videoinput" && device.label.match(/Rear/) !== null) || (device.kind == "videoinput" && device.label.match(/Back/) !== null)) {
                        backCamID = device.deviceId;
                        facingmodecamera = "environment";
                        CamID = backCamID;
                        rearAvailableFlag = 1;
                    } else {
                        var currentRearLabel = ";;;" + device.label + ";;;";

                        if (device.kind == "videoinput" && savedDevice.match(currentRearLabel) !== null) {
                            backCamID = device.deviceId;
                            facingmodecamera = "environment";
                            CamID = backCamID;
                            rearAvailableFlag = 1;


                        }
                    }
                    if (device.kind === "videoinput") {
                        last_camera = device.deviceId;

                    }
                });

                if (CamID === null || CamID === undefined) {
                    CamID = last_camera;


                }
                if (rearAvailableFlag == 1) {
                    sap.ui.getCore().getElementById("switchCam").setEnabled(true);
                }
                self._initQuagga(oView.byId("scanContainer").getDomRef(), CamID).done(function() {
                    // Initialisation done, start Quagga
                    Quagga.start();

                }).fail(function(oError) {
                    // Failed to initialise, show message and close dialog...this should not happen as we have
                    // already checked for camera device ni /model/models.js and hidden the scan button if none detected

                    alert(oError);
                    self._oCameraScanDialog.close();
                });

            })
            .catch(function(err) {});


    },
    onScanDialog: function() {

        if (!oDialog1) {


            oDialog1 = new sap.m.Dialog({
                title: getPropertyValue(oResourceModel, "CustomGI_alert_5"),
                content: [new sap.m.Label({
                        text: getPropertyValue(oResourceModel, "CustomGI_alert_6")
                    }),

                    new sap.m.Input({
                        maxLength: 50,
                        id: "inputsscc"

                    })
                ],

                buttons: [new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                        press: oControllerThis.okDialogFn

                    }),
                    new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
                        press: function() {
                            oControllerThis.getView().byId("barsscc").setEnabled(true);
                            oDialog1.close();

                            oDisplayTable.removeSelections(true);

                        }

                    })
                ],
            });
            InputssccId = sap.ui.getCore().byId("inputsscc");
            oDialog1.setContentWidth("200px");
            oDialog1.setContentHeight("110px");

        }
        oDialog1.open();
    },

    onCameraScanDialog: function() {
        var self = this;
        if (!this._oCameraScanDialog) {
            this._oCameraScanDialog = new sap.m.Dialog({
                title: getPropertyValue(oResourceModel, "CustomGI_alert_18"),
                contentWidth: "640px",
                contentHeight: "480px",
                horizontalScrolling: false,
                verticalScrolling: false,
                stretchOnPhone: true,
                content: [new sap.ui.core.HTML({
                    id: oView.createId("scanContainer"),
                    content: "<div />"
                })],
                buttons: [
                    new sap.m.Button({
                        id: "switchCam",
                        enabled: false,
                        icon: "sap-icon://camera",
                        text: getPropertyValue(oResourceModel, "CustomGI_alert_19"),
                        press: function(oEvent) {

                            ///////////////////////////////////Start of Camera Selection Code///////////////////////////////////////////////

                            if (CamID != "user") {
                                CamID = "user";
                                facingmodecamera = "user";
                            } else {
                                CamID = backCamID;
                            }
                            self._initQuagga(oView.byId("scanContainer").getDomRef(), CamID).done(function() {
                                // Initialisation done, start Quagga
                                Quagga.start();

                            }).fail(function(oError) {
                                // Failed to initialise, show message and close dialog...this should not happen as we have
                                // already checked for camera device ni /model/models.js and hidden the scan button if none detected

                                alert(oError);
                                self._oCameraScanDialog.close();
                            });
                            ///////////////////////////////////End of Camera Selection Code///////////////////////////////////////////////
                        }.bind(this)
                    }),
                    new sap.m.Button({
                        text: "Cancel",
                        press: function(oEvent) {
                            this._oCameraScanDialog.close();
                        }.bind(this)
                    }),
                ],
                afterOpen: function() {
                    self.rearCameraID();

                }.bind(this),
                afterClose: function() {
                    // Dialog closed, stop Quagga
                    Quagga.stop();

                }
            });
            this._oCameraScanDialog.onAfterRendering = function() {
                if (sap.m.Dialog.prototype.onAfterRendering) {
                    sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
                }
                var footer = this.$().find('footer');
                var spacer = footer.find('.sapMTBSpacer');
                var spacerFlex = footer.find('.sapMTBSpacerFlex');
                var firstBtn = $(footer.find('button')[0]);
                var secondBtn = $(footer.find('button')[1]);
                spacer.remove();
                spacer.insertAfter(firstBtn);

            };

            oView.addDependent(this._oCameraScanDialog);
        }
        this._oCameraScanDialog.open();

    },


    onPress: function(oEvent) {
        var DateNw = new Date();
        var eve = oEvent.getSource().getBindingContext();
        mat = oDisplayTable.getModel().getProperty(eve + "/Material");
        matDes = oDisplayTable.getModel().getProperty(eve + "/MaterialDes");
        reqQuant = oDisplayTable.getModel().getProperty(eve + "/ConsumedQuant");
        reqQuantUOM = oDisplayTable.getModel().getProperty(eve + "/ConsumedQuantUOM");
        conQuant = oDisplayTable.getModel().getProperty(eve + "/RequiredQuant");
        conQuantUOM = oDisplayTable.getModel().getProperty(eve + "/RequiredQuantUOM");
        var other = oDisplayTable.getModel().getProperty(eve + "/Other");
        RSPOS = oDisplayTable.getModel().getProperty(eve + "/RSPOS");
        var part = other.split(",");
        su = part[0];
        client = part[1];
        wh = part[2];
        sLoc = part[3];
        sType = part[4];
        sBin = part[5];
        if (su == "X") {
            barCodeFlag = "0";
            this.getView().byId("barsscc").setEnabled(false);

            //////////////////////////////Scan/////////////////////////////
            if (DeviceName == "Windows OS") {
                this.onScanDialog();
            } else {
                oCameraBarcodeFlag = 1;
                this.onCameraScanDialog();
            }
        } else {



            hu_No = "";
            window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ConsumeMaterial.irpt?orderFromURL=" + orderFromURL + "&matFromURL=" + mat + "&day1=" + day1 + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(matDes) + "&huFromURL=" + encodeURIComponent(hu_No) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL) + "&reqFromURL=" + reqQuant + "&reqUOMFromURL=" + reqQuantUOM + "&conFromURL=" + conQuant + "&conUOMFromURL=" + conQuantUOM + "&whFromURL=" + whNo + "&clientFromURL=" + client + "&sTypeFromURL=" + sType + "&slocFromURL=" + sLoc + "&sBinFromURL=" + sBin + "&plantFromURL=" + plantFromURL + "&RSPOSFromURL=" + RSPOS), "_self");

        }
    },

    OKID: function() {
        barCodeFlag = "1";
        hu_No = sap.ui.getCore().getElementById("ComponentList--barsscc").getValue();
        mat = "";
        RSPOS = "";
        oControllerThis.okDialogFn();
    },

    okDialogFn: function() {
        var DateNw = new Date();
        if (barCodeFlag == 0) {
            hu_No = sap.ui.getCore().byId("inputsscc").getValue();
        }
        hu_No = scanssccno(hu_No);



        if (hu_No == "") {

            alert(getPropertyValue(oResourceModel, "CustomGI_alert_9"));
        } else {

            var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><PackageDetailsInput><huNumber>" + hu_No + "</huNumber><orderNumber>" + ord + "</orderNumber><EPorder>" + POrder + "</EPorder><materialNumber>" + mat + "</materialNumber><warehouseNumber>" + whNo + "</warehouseNumber><routingOperationNumber/><parentOperationNumber/><isReversal/><plant>" + plantFromURL + "</plant><client>" + clientFromURL + "</client><language>" + userLanguage + "</language><RSPOS>" + RSPOS + "</RSPOS></PackageDetailsInput>"
            //alert(InputXMLInStringFormat);
            var materialList = new sap.ui.model.xml.XMLModel();
            materialList.setSizeLimit(10000);
            materialList.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/RFDevice/QueryTemplate/XACQ_GetMaterialList&Param.1=" + InputXMLInStringFormat + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            var status = materialList.getProperty('/packageMessages/packageMessage/status');
            hu_No = materialList.getProperty('/packageItems/packageItem/huNumber');
            //alert(status);
            if (status == "E") {
                var message = materialList.getProperty('/packageMessages/packageMessage/message');
                //sap.ui.commons.MessageBox.alert(message);
                sap.m.MessageBox.error(message, {
                    title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
                });
            } else if (status = "S" && hu_No != "") {

                var matList = materialList.getProperty('/packageItems/packageItem/materialNumber');

                var batch = materialList.getProperty('/packageItems/packageItem/batchNumber');
                var stock = materialList.getProperty('/packageItems/packageItem/stock');
                var uom = materialList.getProperty('/packageItems/packageItem/uom');
                hu_No = materialList.getProperty('/packageItems/packageItem/huNumber');
                var shelf1 = materialList.getProperty('/packageItems/packageItem/shelfLifeDate');

                prodDate = materialList.getProperty('/packageItems/packageItem/ProductionDate');
                RSPOS = materialList.getProperty('/packageItems/packageItem/RSPOS');
                var Consume = "261";
                var Reverse = "262";
                // var sCat=materialList.getProperty('/packageItems/packageItem/stockcat');

                if (barCodeFlag == 1) {
                    var oTabModel = new sap.ui.model.xml.XMLModel();
                    oTabModel.setSizeLimit(10000);

                    oTabModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetComponentMaterial&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + orderFromURL + "&Param.4=" + plantFromURL + "&Param.5=261&Param.6=262&Param.7=" + matList + "&Param.8=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                    mat = oTabModel.getProperty("/Rowset/Row/Material");

                    matDes = oTabModel.getProperty("/Rowset/Row/MaterialDes");
                    reqQuant = oTabModel.getProperty("/Rowset/Row/ConsumedQuant");
                    reqQuantUOM = oTabModel.getProperty("/Rowset/Row/ConsumedQuantUOM");
                    conQuant = oTabModel.getProperty("/Rowset/Row/RequiredQuant");
                    conQuantUOM = oTabModel.getProperty("/Rowset/Row/RequiredQuantUOM");
                    //RSPOS=oTabModel.getProperty("/Rowset/Row/RSPOS");
                    var other = oTabModel.getProperty("/Rowset/Row/Other");
                    //conQuant=conQuant.split(" ")[0];
                    //unit=reqQuant.split(" ")[1];
                    //conQuant=conQuant+" "+unit;
                    var part = other.split(",");
                    su = part[0];
                    client = part[1];
                    wh = part[2];
                    sLoc = part[3];
                    sType = part[4];
                    sBin = part[5];
                }


                if (Number(stock) != 0) {

                    window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ConsumeMaterial.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&matFromURL=" + matList + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(matDes) + "&huFromURL=" + encodeURIComponent(hu_No) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&sTypeFromURL=" + sType + "&sBinFromURL=" + sBin + "&resFromURL=" + encodeURIComponent(resFromURL) + "&slocFromURL=" + sLoc + "&whFromURL=" + whNo + "&reqFromURL=" + reqQuant + "&reqUOMFromURL=" + reqQuantUOM + "&conFromURL=" + conQuant + "&conUOMFromURL=" + conQuantUOM + "&batchFromURL=" + batch + "&shelfFromURL=" + shelf1 + "&ProdDateFromURL=" + prodDate + "&stockFromURL=" + stock + "&uomFromURL=" + uom + "&RSPOSFromURL=" + RSPOS), "_self");
                } else {


                    if (shelf1 != null && shelf1 != "---" && shelf1 != "") {
                        shelf1 = shelf1.substring(0, 10);
                    }



                    var dialog = new sap.m.Dialog({
                        title: getPropertyValue(oResourceModel, "CustomGI_alert_8"),
                        draggable: true,
                        contentWidth: "15%",
                        icon: "sap-icon://sys-help",
                        type: 'Message',

                        content: [new sap.m.Text({
                            text: getPropertyValue(oResourceModel, "CustomGI_alert_16")
                        })],
                        beginButton: new sap.m.Button({

                            text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                            press: function() {

                                window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ReverseMaterial.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&matFromURL=" + matList + "&pDateFromURL=" + pDateFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&desFromURL=" + encodeURIComponent(matDes) + "&huFromURL=" + encodeURIComponent(hu_No) + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL) + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&whFromURL=" + whNo + "&reqFromURL=" + reqQuant + "&reqUOMFromURL=" + reqQuantUOM + "&conFromURL=" + conQuant + "&conUOMFromURL=" + conQuantUOM + "&batchFromURL=" + batch + "&sTypeFromURL=" + sType + "&sBinFromURL=" + sBin + "&shelfFromURL=" + shelf1 + "&stockFromURL=" + stock + "&uomFromURL=" + uom + "&RSPOSFromURL=" + RSPOS), "_self");

                                dialog.close();
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
                            press: function() {
                                dialog.close();
                                if (barCodeFlag == 0) {
                                    sap.ui.getCore().byId("inputsscc").setValue("");
                                } else {
                                    oView.byId("barsscc").setValue("");
                                }




                            }
                        }),

                        afterClose: function() {
                            dialog.destroy();
                        }
                    });
                    dialog.onAfterRendering = function() {
                        if (sap.m.Dialog.prototype.onAfterRendering) {
                            sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
                        }
                        var footer = this.$().find('footer');
                        var spacer = footer.find('.sapMTBSpacer');
                        var firstBtn = $(footer.find('button')[0]);
                        spacer.remove();
                        spacer.insertAfter(firstBtn);
                    };
                    dialog.open();
                }
            } else {
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "TO_MSG3"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "TO_MSG3"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
            }
        }
        if (barCodeFlag == 0) {

            oControllerThis.getView().byId("barsscc").setEnabled(true);
            oDialog1.close();


        }
    },
    doReport: function() {

        window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/GIReport.irpt?orderFromURL=" + orderFromURL + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&headerFromURL=" + encodeURIComponent(headerFromURL) + "&pDateFromURL=" + pDateFromURL + "&nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
    },

    onClearReservation: function() {
        var DateNw = new Date();
        oBCPStats = getBCPStatus(bcpElement, "", "");

        if (oBCPStats == 0) {
            //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "Custom_GI_BCPONAlert"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "Custom_GI_BCPONAlert"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
            });
        } else if (oBCPStats == 1) {
            this.clearReservationButtonVisibility();
            if (GI_ClearReservationVisible == 0) {
                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "Custom_GI_ClearReservation"), {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                });
                //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "Custom_GI_ClearReservation"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            } else if (GI_ClearReservationVisible == 1) {

                var dialog = new sap.m.Dialog({
                    title: getPropertyValue(oResourceModel, "CustomGI_alert_8"),
                    draggable: true,
                    contentWidth: "15%",
                    icon: "sap-icon://sys-help",
                    type: 'Message',

                    content: [new sap.m.Text({
                        text: getPropertyValue(oResourceModel, "CustomGI_alert_17") + " " + orderFromURL
                    })],
                    beginButton: new sap.m.Button({

                        text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                        press: function() {

                            var CRModel = new sap.ui.model.xml.XMLModel();
                            CRModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_ClearReservation_GI&Param.1=" + ord + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                            var status = CRModel.getProperty("/Rowset/Row/Message");
                            dialog.close();
                            //sap.ui.commons.MessageBox.alert(status, sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
                            sap.m.MessageBox.information(status, {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Information")
                            });
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Cancel"),
                        press: function() {
                            dialog.close();
                        }
                    }),

                    afterClose: function() {
                        dialog.destroy();
                    }
                });
            }
        }
        dialog.onAfterRendering = function() {
            if (sap.m.Dialog.prototype.onAfterRendering) {
                sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
            }
            var footer = this.$().find('footer');
            var spacer = footer.find('.sapMTBSpacer');
            var firstBtn = $(footer.find('button')[0]);
            spacer.remove();
            spacer.insertAfter(firstBtn);
        };
        dialog.open();

    },
    goHome: function() {
        window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ProcessOrderGI.irpt?nodeFromURL=" + encodeURIComponent(nodeFromURL) + "&day1=" + day1 + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&resFromURL=" + encodeURIComponent(resFromURL)), "_self");
    },

    getFormattedQuantityUOM: function(obj1, obj2) {

        var FormattedQuantity = formatQuantity(obj1, "FORMAT");
        return (FormattedQuantity + " " + obj2);


    },

    getSelectedValuesForPhase: function() {

        var DateNw = new Date();
        var phase;
        var phase_selected = this.getView().byId("PhaseNum").getSelectedKeys();
        var sTypeValue = this.getView().byId("SType").getSelectedKeys();
        var sBinValue = this.getView().byId("SBin").getSelectedKeys();

        var j = phase_selected.length;

        for (var i = 0; i < j; i++) {
            var phaseString = phase_selected[i];

            if (phaseString.length > 0) {
                if (i == 0) {
                    phase = "'" + phaseString + "'";

                } else {
                    phase = phase + ",'" + phaseString + "'";
                }
            }
        }
        phaseNumber = "(" + phase + ")";
        if (storageType == "") {
            sTypeValue = "";

        }
        if (storageBin == "") {
            sBinValue = "";
        }

        if (Input_Flag == 1 && phaseNumber != "(undefined)") {
            oControllerThis.changeDropdownValues(phaseNumber, sTypeValue, sBinValue);
        }

        oControllerThis.selectedAllCheckbox();
    },

    getSelectedValuesForSType: function() {

        var DateNw = new Date();
        var sType1;
        var stype_selected1 = this.getView().byId("SType").getSelectedKeys();
        var phaseValue = this.getView().byId("PhaseNum").getSelectedKeys();
        var sBinValue = this.getView().byId("SBin").getSelectedKeys();
        var j = stype_selected1.length;


        for (var i = 0; i < j; i++) {
            var stypeString = stype_selected1[i];

            if (stypeString.length > 0) {
                if (i == 0) {
                    sType1 = "'" + stypeString + "'";

                } else {
                    sType1 = sType1 + ",'" + stypeString + "'";
                }
            }
        }
        storageType = "(" + sType1 + ")";

        if (storageBin == "") {
            sBinValue = "";

        }
        if (phaseNumber == "") {
            phaseValue = "";
        }

        if (Input_Flag == 1 && storageType != "(undefined)") {
            oControllerThis.changeDropdownValues(phaseValue, storageType, sBinValue);
        }

        oControllerThis.selectedAllCheckbox();

    },

    getSelectedValuesForsBin: function() {

        var DateNw = new Date();
        var sBin1;
        var sBin_selected1 = this.getView().byId("SBin").getSelectedKeys();
        var sTypeValue = this.getView().byId("SType").getSelectedKeys();
        var phaseValue = this.getView().byId("SType").getSelectedKeys();

        var j = sBin_selected1.length;

        for (var i = 0; i < j; i++) {
            var sBinString = sBin_selected1[i];

            if (sBinString.length > 0) {
                if (i == 0) {
                    sBin1 = "'" + sBinString + "'";

                } else {
                    sBin1 = sBin1 + ",'" + sBinString + "'";
                }
            }
        }
        storageBin = "(" + sBin1 + ")";

        if (phaseNumber == "") {
            phaseValue = "";

        }
        if (storageType == "") {
            sTypeValue = "";
        }

        if (Input_Flag == 1 && storageBin != "(undefined)") {
            oControllerThis.changeDropdownValues(phaseValue, sTypeValue, storageBin);
        }

        oControllerThis.selectedAllCheckbox();
    },

    ChartMultiComboSelection1: function() {

        var PhaseDropDown = this.getView().byId("PhaseNum");
        var chkboxAll_Phase = this.getView().byId("allChckBox1");
        var PhaseItems = PhaseDropDown.getItems();
        if (chkboxAll_Phase.getSelected() == true) {
            PhaseDropDown.setSelectedItems(PhaseItems);
            storageType = "";
            storageBin = "";
            Input_Flag = 1;
            oControllerThis.getSelectedValuesForPhase();

        } else {
            PhaseDropDown.setEnabled(true);
            PhaseDropDown.setSelectedItems("");
            this.getView().byId("SType").setSelectedItems("");
            this.getView().byId("allChckBox2").setSelected(false);
            this.getView().byId("SBin").setSelectedItems("");
            this.getView().byId("allChckBox3").setSelected(false);
            storageType = "";
            storageBin = "";
            phaseNumber = "";
        }


    },

    ChartMultiComboSelection2: function() {

        var STypeDropDown = this.getView().byId("SType");
        var chkboxAll_SType = this.getView().byId("allChckBox2");
        var STypeItems = STypeDropDown.getItems();
        if (chkboxAll_SType.getSelected() == true) {
            STypeDropDown.setSelectedItems(STypeItems);
            storageBin = "";
            phaseNumber = "";
            Input_Flag = 1;
            oControllerThis.getSelectedValuesForSType();

        } else {
            STypeDropDown.setEnabled(true);
            STypeDropDown.setSelectedItems("");
            this.getView().byId("PhaseNum").setSelectedItems("");
            this.getView().byId("allChckBox1").setSelected(false);
            this.getView().byId("SBin").setSelectedItems("");
            this.getView().byId("allChckBox3").setSelected(false);
            storageType = "";
            storageBin = "";
            phaseNumber = "";
        }


    },

    ChartMultiComboSelection3: function() {

        var SBinDropDown = this.getView().byId("SBin");
        var chkboxAll_SBin = this.getView().byId("allChckBox3");
        var SBinItems = SBinDropDown.getItems();
        if (chkboxAll_SBin.getSelected() == true) {
            SBinDropDown.setSelectedItems(SBinItems);
            phaseNumber = "";
            storageType = "";
            Input_Flag = 1;
            oControllerThis.getSelectedValuesForsBin();

        } else {
            SBinDropDown.setEnabled(true);
            SBinDropDown.setSelectedItems("");
            this.getView().byId("SType").setSelectedItems("");
            this.getView().byId("allChckBox2").setSelected(false);
            this.getView().byId("PhaseNum").setSelectedItems("");
            this.getView().byId("allChckBox1").setSelected(false);
            storageType = "";
            storageBin = "";
            phaseNumber = "";
        }


    },
    getComponentReport: function() {
        Input_Flag = 0;
        var DateNw = new Date();
        phaseSelc = sap.ui.getCore().getElementById("ComponentList--PhaseNum").getSelectedKeys();
        StypeSel = sap.ui.getCore().getElementById("ComponentList--SType").getSelectedKeys();
        SbinSel = sap.ui.getCore().getElementById("ComponentList--SBin").getSelectedKeys();
        var chkboxAll = sap.ui.getCore().getElementById("ComponentList--allChckBox1");


        oControllerThis.getSelectedValuesForPhase();
        oControllerThis.getSelectedValuesForSType();
        oControllerThis.getSelectedValuesForsBin();

        oDisplayTable = this.getView().byId("ComponentTable");
        var oTableDisplayModel = new sap.ui.model.xml.XMLModel();
        oTableDisplayModel.setSizeLimit(10000);
        oTableDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetComponentMaterial&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + orderFromURL + "&Param.4=" + plantFromURL + "&Param.5=261&Param.6=262&Param.8=" + userLanguage + "&Param.10=" + encodeURIComponent(storageType) + "&Param.11=" + encodeURIComponent(storageBin) + "&Param.12=" + phaseNumber + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        oDisplayTable.setModel(oTableDisplayModel);


        var aColumns = oDisplayTable.getColumns();
        for (var i = 0; i < aColumns.length; i++) {
            aColumns[i].setSorted(false);
            aColumns[i].setFiltered(false);
        }

    },

    doSaveReport: function() {

        var DateNw = new Date();
        var oSaveReportModel = new sap.ui.model.xml.XMLModel();

        if ((phaseNumber == "" || phaseNumber == "(undefined)") && (storageType == "" || storageType == "(undefined)") && (storageBin == "" || storageBin == "(undefined)")) {
            //sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGI_SelectValues"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
            sap.m.MessageBox.information(getPropertyValue(oResourceModel, "CustomGI_SelectValues"), {
                title: getPropertyValue(oResourceModel, "TransferDisplay_Message")
            });
        } else {
            Input_Flag = 0;
            phaseNumber = this.getView().byId("PhaseNum").getSelectedKeys();
            storageType = this.getView().byId("SType").getSelectedKeys();
            storageBin = this.getView().byId("SBin").getSelectedKeys();

            oControllerThis.getSelectedValuesForPhase();
            oControllerThis.getSelectedValuesForSType();
            oControllerThis.getSelectedValuesForsBin();


            oSaveReportModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_SaveDefaultInfoInGI&Param.1=" + POrder + "&Param.2=" + phaseNumber + "&Param.3=" + encodeURIComponent(storageType) + "&Param.4=" + encodeURIComponent(storageBin) + "&Param.5=0&Param.6=" + matFromURL + "&OutputParameter=O_Message&d=" + DateNw + "&Content-Type=text/xml", "", false);


            var output_Message = oSaveReportModel.getProperty('/Rowset/Row/O_Message');

            if (output_Message == "S") {
                this.getView().byId("Reset").setEnabled(true);
                sap.m.MessageToast.show(getPropertyValue(oResourceModel, "NPDAHSBOARD_MSS_UPDATE_MES_STOCK_SYNC_SUCCESS"), {
                    duration: 2000
                });


            } else {
                sap.m.MessageToast.show(output_Message, {
                    duration: 2000
                });
            }
        }


    },

    doReset: function() {
        var DateNw = new Date();

        ord = orderFromURL;
        var phaseDrop = this.getView().byId("PhaseNum");
        var SBinDrop = this.getView().byId("SBin");
        var STypeDrop = this.getView().byId("SType");

        var ResetButton = this.getView().byId("Reset");

        var checkboxForPhase = this.getView().byId("allChckBox1");
        var checkboxForStype = this.getView().byId("allChckBox2");
        var checkBoxForSBin = this.getView().byId("allChckBox3");
        var ordLength = ord.length;
        for (var p = 0; p < (12 - ordLength); p++) {
            ord = "0" + ord;
        }

        var dialog = new sap.m.Dialog({
            title: "Confirmation",
            draggable: true,
            contentWidth: "15%",
            icon: "sap-icon://sys-help",
            type: 'Message',

            content: [new sap.m.Text({
                text: getPropertyValue(oResourceModel, "CustomGI_SureToResetConfirmation")
            })],
            beginButton: new sap.m.Button({

                text: getPropertyValue(oResourceModel, "NPDashboard_Yes"),
                press: function() {
                    var resetModel = new sap.ui.model.xml.XMLModel();
                    resetModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/MDOQ_DeleteFromSaveDefaultGIInfo&Param.1=" + ord + "&Param.2=" + loginID + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                    ResetButton.setEnabled(false);
                    SBinDrop.setSelectedKeys("");
                    STypeDrop.setSelectedKeys("");
                    phaseDrop.setSelectedKeys("");

                    checkboxForPhase.setSelected(false);
                    checkboxForStype.setSelected(false);
                    checkBoxForSBin.setSelected(false);

                    phaseNumber = "";
                    storageType = "";
                    storageBin = "";

                    oDisplayTable = oView.byId("ComponentTable");
                    var oTableDisplayModel = new sap.ui.model.xml.XMLModel();
                    oTableDisplayModel.setSizeLimit(10000);
                    oTableDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetComponentMaterial&Param.1=" + clientFromURL + "&Param.2=" + nodeFromURL + "&Param.3=" + orderFromURL + "&Param.4=" + plantFromURL + "&Param.5=261&Param.6=262&Param.8=" + userLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                    oDisplayTable.setModel(oTableDisplayModel);

                    dialog.close();



                }

            }),
            endButton: new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_No"),
                press: function() {
                    dialog.close();


                }
            }),

            afterClose: function() {
                dialog.destroy();
            }
        });
        dialog.onAfterRendering = function() {
            if (sap.m.Dialog.prototype.onAfterRendering) {
                sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
            }
            var footer = this.$().find('footer');
            var spacer = footer.find('.sapMTBSpacer');
            var firstBtn = $(footer.find('button')[0]);
            spacer.remove();
            spacer.insertAfter(firstBtn);
        };
        dialog.open();


    },

    changeDropdownValues: function(PhaseNumber1, StorageType1, StorageBin1) {
        var DateNw = new Date();
        var phaseDrop2 = this.getView().byId("PhaseNum");
        var SBinDrop2 = this.getView().byId("SBin");
        var STypeDrop2 = this.getView().byId("SType");


        var oDropdownSelModel = new sap.ui.model.xml.XMLModel();
        oDropdownSelModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_SaveDefaultInfoInGI&Param.1=" + ord + "&Param.2=" + PhaseNumber1 + "&Param.3=" + encodeURIComponent(StorageType1) + "&Param.4=" + encodeURIComponent(StorageBin1) + "&Param.5=1&OutputParameter=O_DropdownXML&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var oDropdownSelModelXML = oDropdownSelModel.getXML();
        var rowCount = [];
        if (PhaseNumber1 != "" && StorageType1 == "" && StorageBin1 == "") {
            $($.parseXML(oDropdownSelModelXML)).find("Rowset").each(function(i) {

                rowCount[i] = $(this).find("Row").length;

                for (var j = 0; j < rowCount[i]; j++) {

                    if (i == 0) {
                        var STypeSel = oDropdownSelModel.getProperty("/Rowset/0/Row/" + j + "/Item");
                        STypeDrop2.addSelectedKeys(STypeSel);
                    } else {
                        var SBinSel = oDropdownSelModel.getProperty("/Rowset/1/Row/" + j + "/Item");
                        SBinDrop2.addSelectedKeys(SBinSel);
                    }
                }
            });
        } else if (StorageType1 != "" && PhaseNumber1 == "" && StorageBin1 == "") {

            $($.parseXML(oDropdownSelModelXML)).find("Rowset").each(function(k) {
                rowCount[k] = $(this).find("Row").length;
                for (var l = 0; l < rowCount[k]; l++) {

                    if (k == 0) {
                        var PhaseSel = oDropdownSelModel.getProperty("/Rowset/0/Row/" + l + "/Item");
                        phaseDrop2.addSelectedKeys(PhaseSel);
                    } else {
                        var SBinSel = oDropdownSelModel.getProperty("/Rowset/1/Row/" + l + "/Item");
                        SBinDrop2.addSelectedKeys(SBinSel);
                    }
                }
            });

        } else if (StorageBin1 != "" && PhaseNumber1 == "" && StorageType1 == "") {
            $($.parseXML(oDropdownSelModelXML)).find("Rowset").each(function(m) {

                rowCount[m] = $(this).find("Row").length;
                for (var n = 0; n < rowCount[m]; n++) {

                    if (m == 0) {
                        var PhaseSel = oDropdownSelModel.getProperty("/Rowset/0/Row/" + n + "/Item");
                        phaseDrop2.addSelectedKeys(PhaseSel);
                    } else {
                        var STypeSel = oDropdownSelModel.getProperty("/Rowset/1/Row/" + n + "/Item");
                        STypeDrop2.addSelectedKeys(STypeSel);
                    }
                }
            });
        }

    },

    handleSelectionChangePhase: function() {

        var SBinDrop1 = this.getView().byId("SBin");
        var STypeDrop1 = this.getView().byId("SType");

        SBinDrop1.setSelectedKeys("");
        STypeDrop1.setSelectedKeys("");

        Input_Flag = 1;



    },

    handleSelectionChangeSType: function() {

        var SBinDrop1 = this.getView().byId("SBin");
        var phaseDrop2 = this.getView().byId("PhaseNum");

        SBinDrop1.setSelectedKeys("");
        phaseDrop2.setSelectedKeys("");

        Input_Flag = 1;


    },
    handleSelectionChangeBin: function() {

        var phaseDrop2 = this.getView().byId("PhaseNum");
        var STypeDrop1 = this.getView().byId("SType");

        phaseDrop2.setSelectedKeys("");
        STypeDrop1.setSelectedKeys("");

        Input_Flag = 1;

    },

    selectedAllCheckbox: function() {

        var phaseDrop = this.getView().byId("PhaseNum");
        var STypeDrop = this.getView().byId("SType");
        var SBinDrop = this.getView().byId("SBin");

        var phaseDropAll = phaseDrop.getItems();
        var phaseDropAllCount = phaseDropAll.length;

        var phaseDropSelected = phaseDrop.getSelectedItems();
        var phaseDropSelectedCount = phaseDropSelected.length;

        if (phaseDropAllCount == phaseDropSelectedCount) {
            this.getView().byId("allChckBox1").setSelected(true);
        } else {
            this.getView().byId("allChckBox1").setSelected(false);
        }

        var STypeDropAll = STypeDrop.getItems();

        var STypeDropAllCount = STypeDropAll.length;

        var STypeDropSelected = STypeDrop.getSelectedItems();
        var STypeDropSelectedCount = STypeDropSelected.length;

        if (STypeDropAllCount == STypeDropSelectedCount) {
            this.getView().byId("allChckBox2").setSelected(true);
        } else {
            this.getView().byId("allChckBox2").setSelected(false);
        }

        var SBinDropAll = SBinDrop.getItems();

        var SBinDropAllCount = SBinDropAll.length;

        var SBinDropSelected = SBinDrop.getSelectedItems();
        var SBinDropSelectedCount = SBinDropSelected.length;

        if (SBinDropAllCount == SBinDropSelectedCount) {
            this.getView().byId("allChckBox3").setSelected(true);
        } else {
            this.getView().byId("allChckBox3").setSelected(false);
        }

    },


    getDeviceInfo: function() {
        var devInfo;
        var Text1 = new sap.m.Text({
            id: "textForCamera",
            text: getPropertyValue(oResourceModel, "RearCam_Msg")
        });

        var oItemTemplate = new sap.ui.core.ListItem({
            key: "{label}",
            text: "{label}"

        });
        var sList = new sap.m.SelectList({

            showSecondaryValues: true,
            width: "100%",
            items: {
                path: "/",
                template: oItemTemplate
            }
        });




        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {


                devInfo = devices.filter(function(b) {
                    return b.kind === 'videoinput' && b.label !== '';
                });


                var attModel = new sap.ui.model.json.JSONModel()
                attModel.setData(devInfo);


                sList.setModel(attModel);


            });

        var dialog = new sap.m.Dialog({
            id: "dialogForDeviceInfo",
            title: getPropertyValue(oResourceModel, "RearCam_Hdr"),
            contentWidth: "30%",
            contentHeight: "35%",
            resizable: true,
            draggable: true,
            icon: "sap-icon://sys-help",
            type: 'Message',

            content: [Text1, sList],
            beginButton: new sap.m.Button({

                text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                icon: "sap-icon://accept",
                press: function() {

                    var oSModel = sList.getModel();
                    var rearLabel = sList.getSelectedKey();


                    if (rearLabel == "" || rearLabel == undefined) {
                        var toastRear = sap.m.MessageToast.show(getPropertyValue(oResourceModel, "RearCam_Alert"), {
                            duration: 2000
                        });
                        $(".sapMMessageToast").addClass("RearClass");
                        //console.log(sap.ui.getCore().getElementById("toastRear").getProperty());
                    } else {
                        var DateNw = new Date();
                        var oSaveCameraModel = new sap.ui.model.xml.XMLModel();

                        Input_Flag = 1;

                        oSaveCameraModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_CameraDeviceLabel_UserMapping&Param.1=" + Input_Flag + "&Param.2=" + rearLabel + "&d=" + DateNw + "&Content-Type=text/xml", "", false);


                        var output_Message = oSaveCameraModel.getProperty('/Rowset/Row/O_DeviceLabel');

                        dialog.close();
                        if (output_Message == "S") {


                            sap.m.MessageBox.success(rearLabel + " " + getPropertyValue(oResourceModel, "RearCam_Success"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                            });
                        } else {

                            sap.m.MessageBox.warning(output_Message, {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                            });
                        }

                    }
                }
            }),
            endButton: new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                icon: "sap-icon://decline",
                press: function() {
                    dialog.close();
                }
            }),

            afterClose: function() {
                dialog.destroy();
            }
        });
        dialog.onAfterRendering = function() {
            if (sap.m.Dialog.prototype.onAfterRendering) {
                sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
            }
            var footer = this.$().find('footer');
            var spacer = footer.find('.sapMTBSpacer');
            var firstBtn = $(footer.find('button')[0]);
            spacer.remove();
            spacer.insertAfter(firstBtn);
        };
        dialog.open();
    },
    onStage: function(oEvent) {
        var that = oControllerThis;
        var DateNw = new Date();
        var eve = oEvent.getSource().getBindingContext();
        mat = oDisplayTable.getModel().getProperty(eve + "/Material");
        matDes = oDisplayTable.getModel().getProperty(eve + "/MaterialDes");
        reqQuant = oDisplayTable.getModel().getProperty(eve + "/ConsumedQuant");
        reqQuantUOM = oDisplayTable.getModel().getProperty(eve + "/ConsumedQuantUOM");
        conQuant = oDisplayTable.getModel().getProperty(eve + "/RequiredQuant");
        conQuantUOM = oDisplayTable.getModel().getProperty(eve + "/RequiredQuantUOM");
        var other = oDisplayTable.getModel().getProperty(eve + "/Other");
	
        var part = other.split(",");
        su = part[0];
        client = part[1];
        wh = part[2];
        sLoc = part[3];
        sType = part[4];
        sBin = part[5];
	
        var dCompMatInptFld = new sap.m.Input({
            editable: false,
            value: mat
        });
        var dCompMatDescFld = new sap.m.Input({
            id: "CompMatDesc",
            editable: false,
            value: matDes
        });

        var dMatInptFld = new sap.m.Input({
            editable: false,
            value: matFromURL
        });
        var dSTypeFld = new sap.m.ComboBox({
            width: "70%",
            placeholder: getPropertyValue(oResourceModel, "GI_Stage_SelectStype"),
            selectionChange: function() {
                sType = dSTypeFld.getSelectedKey();
                var storType = "('" + sType + "')";
                dSTypeFld.setValueState("None");
                dSBinFld.setValueState("None");
                var ostoBinModel = new sap.ui.model.xml.XMLModel();
                ostoBinModel.setSizeLimit(10000);
                ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageBin&Param.1=" + sLoc + "&Param.2=" + wh + "&Param.3=" + storType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                var osBinitemline = new sap.ui.core.ListItem();
                osBinitemline.bindProperty("text", "STGE_BIN");
                osBinitemline.bindProperty("key", "STGE_BIN");
                dSBinFld.bindItems("/Rowset/Row", osBinitemline);
                dSBinFld.setModel(ostoBinModel);
                sBin = ostoBinModel.getProperty("/Rowset/Row/0/STGE_BIN");
                dSBinFld.setSelectedKey(sBin);
                var avlStockStageFldLabel = getPropertyValue(oResourceModel, "GI_Stage_AvlQuant") + " (" + getPropertyValue(oResourceModel, "TransferDisplay_label_SType") + ": " + sType + " " + getPropertyValue(oResourceModel, "NPDashboard_And") + " " + getPropertyValue(oResourceModel, "TransferDisplay_label_SBin") + ": " + sBin + ")";
                avlStockStageFld.setLabel(avlStockStageFldLabel);
                that.getAvlQuantity();
                that.formatAvlQuantity();

            }
        });

        var dSBinFld = new sap.m.ComboBox({
            width: "70%",
            placeholder: getPropertyValue(oResourceModel, "GI_Stage_SelectSbin"),
            selectionChange: function() {
                sType = dSTypeFld.getSelectedKey();
                sBin = dSBinFld.getSelectedKey();
                dSBinFld.setValueState("None");
                var avlStockStageFldLabel = getPropertyValue(oResourceModel, "GI_Stage_AvlQuant") + " (" + getPropertyValue(oResourceModel, "TransferDisplay_label_SType") + ": " + sType + " " + getPropertyValue(oResourceModel, "NPDashboard_And") + " " + getPropertyValue(oResourceModel, "TransferDisplay_label_SBin") + ": " + sBin + ")";
                avlStockStageFld.setLabel(avlStockStageFldLabel);
                that.getAvlQuantity();
                that.formatAvlQuantity();

            }
        });

	////////////////////////////////////////////////////////////Configure Supply Area Editable///////////////////////////////////////////////
	if(PSAEditable=="0"){
		dSTypeFld.setEditable(false);
		dSBinFld.setEditable(false);
	}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        dQuantInptFld = new sap.m.Input({
            editable: true,
            textAlign: "Center",
            placeholder: getPropertyValue(oResourceModel, "GI_Stage_EnterQty"),
            liveChange: function() {
                currentReqQuantity = dQuantInptFld.getValue();
                if (dPalletsInptFld.getEnabled()) {
                    reqPallet = Math.ceil(currentReqQuantity / LEQuantStage);
                    //reqPallet=(reqPallet>9?LEQuantStage*9:reqPallet);

                    if (reqPallet <= 9) {
                        dPalletsInptFld.setSelectedKey(reqPallet);
                    } else {
                        dPalletsInptFld.setSelectedKey(9);
                        dQuantInptFld.setValue(LEQuantStage * 9);
                    }
                }
                that.formatAvlQuantity();
            }
        });

        var dUOMInptFld = new sap.m.Input({
            editable: false,
            value: reqQuantUOM
        });
        dAvlQuantInptFld = new sap.m.Input({
            editable: false
        });


        var dPalletsInptFld = new sap.m.ComboBox({
            width: "70%",
            textAlign: "Center",
            selectionChange: function() {
                var palletCount = dPalletsInptFld.getSelectedKey();

                currentReqQuantity = LEQuantStage * palletCount;
                dQuantInptFld.setValue(currentReqQuantity);
                that.formatAvlQuantity();
            },
            change: function() {
                var palletCount = dPalletsInptFld.getSelectedKey();
                if (palletCount == "") {
                    dPalletsInptFld.setSelectedKey(1);
                    currentReqQuantity = LEQuantStage;
                    dQuantInptFld.setValue(currentReqQuantity);
                    that.formatAvlQuantity();
                }
            }

        });

        var oPalletXMLModel = new sap.ui.model.xml.XMLModel();
        oPalletXMLModel.setSizeLimit(10000);
        oPalletXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetTransferPriority_GIStage&d=" + DateNw + "&OutputParameter=OutputXML_Pallet&Content-Type=text/xml"), "", false);
        var opalletList = new sap.ui.core.ListItem();
        opalletList.bindProperty("text", "PalletCount");
        opalletList.bindProperty("key", "PalletCount");
        dPalletsInptFld.bindItems("/Rowset/Row", opalletList);
        dPalletsInptFld.setModel(oPalletXMLModel);
        dPalletsInptFld.setSelectedKey(1);



        var dRemQuantInptFld = new sap.m.Input({
            editable: false
        });
        var oStockMII = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "GI_Stage_StockMII"),
            width: "70%",
            press: function() {
                window.open(encodeURI("/XMII/CM/MaterialHandling/TO_Movement/Page/TransferDisplayOrder.irpt?matFromURL=" + mat + "&slocFromURL=" + sLoc + "&sTypeFromURL=" + sType + "&sBinFromURL=" + encodeURIComponent(sBin)), "_blank");
            }
        });

        var dTransPriority = new sap.m.ComboBox({
            width: "70%",
            textAlign: "Center"
        });
        var oStockECC = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "GI_Stage_StockECC"),
            id: "stockECCBtnID",
            width: "70%",
            enabled: (oBCPStats == "0" ? false : true),
            class: ".borderButton",
            press: function() {

                var refresh = new Date();
                var oLS24Model = new sap.ui.model.xml.XMLModel();
                oLS24Model.attachRequestSent(function() {
                    sap.ui.core.BusyIndicator.show(1);
                });

                var TCode = "LS24";
                oLS24Model.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetECCURL_GIStage&Param.1=" + TCode + "&Param.2=" + plantFromURL + "&Param.4=" + wh + "&Param.5=" + mat + "&Param.6=" + sLoc + "&Param.7=" + sType + "&Param.8=" + encodeURIComponent(sBin) + "&cache=" + refresh + "&Content-Type=text/xml"), "", true);

                oLS24Model.attachRequestCompleted(function() {
                    sap.ui.core.BusyIndicator.hide();
                    var oURL = oLS24Model.getProperty("/Rowset/Row/O_ECCURL");
                    window.open(oURL);
                });
            }
        });
        var oBtnLT24 = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "GI_Stage_LT24"),
            id: "LT24BtnID",
            width: "70%",
            enabled: (oBCPStats == "0" ? false : true),
            press: function() {
                var refresh = new Date();
                var oLT24Model = new sap.ui.model.xml.XMLModel();
                oLT24Model.attachRequestSent(function() {
                    sap.ui.core.BusyIndicator.show(1);
                });

                var TCode = "LT24";
                oLT24Model.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetECCURL_GIStage&Param.1=" + TCode + "&Param.4=" + wh + "&Param.5=" + mat + "&cache=" + refresh + "&Content-Type=text/xml"), "", true);

                oLT24Model.attachRequestCompleted(function() {
                    sap.ui.core.BusyIndicator.hide();
                    var oURL = oLT24Model.getProperty("/Rowset/Row/O_ECCURL");
                    window.open(oURL);
                });
            }
        });
        var oBtnLT22 = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "GI_Stage_LT22"),
            id: "LT22BtnID",
            width: "70%",
            enabled: (oBCPStats == "0" ? false : true),
            press: function() {
                var refresh = new Date();
                var oLT22Model = new sap.ui.model.xml.XMLModel();
                oLT22Model.attachRequestSent(function() {
                    sap.ui.core.BusyIndicator.show(1);
                });
                //console.log(encodeURIComponent(encodeURIComponent(sBin)));
                var TCode = "LT22";
                oLT22Model.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetECCURL_GIStage&Param.1=" + TCode + "&Param.4=" + wh + "&Param.7=" + sType + "&Param.8=" + encodeURIComponent(sBin) + "&cache=" + refresh + "&Content-Type=text/xml"), "", true);

                oLT22Model.attachRequestCompleted(function() {
                    sap.ui.core.BusyIndicator.hide();
                    var oURL = oLT22Model.getProperty("/Rowset/Row/O_ECCURL");
                    window.open(oURL);
                });
            }
        });
        var oBtnLB10 = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "GI_Stage_LB10"),
            id: "LB10BtnID",
            width: "70%",
            enabled: (oBCPStats == "0" ? false : true),
            press: function() {
                var refresh = new Date();
                var oLB10Model = new sap.ui.model.xml.XMLModel();
                oLB10Model.attachRequestSent(function() {
                    sap.ui.core.BusyIndicator.show(1);
                });

                var TCode = "LB10";
                oLB10Model.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetECCURL_GIStage&Param.1=" + TCode + "&Param.4=" + wh + "&Param.7=" + sType + "&cache=" + refresh + "&Content-Type=text/xml"), "", true);

                oLB10Model.attachRequestCompleted(function() {
                    sap.ui.core.BusyIndicator.hide();
                    var oURL = oLB10Model.getProperty("/Rowset/Row/O_ECCURL");
                    window.open(oURL);
                });
            }
        });
        remainQuantStage = reqQuant - conQuant;
        oControllerThis.getAvlQuantity();
        reqPallet = 1 //initially 1 pallet request on dialog open
        dRemQuantInptFld.setValue(remainQuantStage + " " + reqQuantUOM);
        var oLEQuantModel = new sap.ui.model.xml.XMLModel();

        oLEQuantModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetLEQuant_GIStage&Param.1=" + mat + "&Param.2=" + sLoc + "&Param.3=" + wh + "&Param.4=" + client + "&Param.5=" + reqQuantUOM + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        if(su=="X"){
	LEQuantStage = oLEQuantModel.getProperty('/Rowset/Row/Output');
	} else{
	LEQuantStage="";
	}
        dQuantInptFld.setValue(LEQuantStage);
        currentReqQuantity = LEQuantStage;
        that.formatAvlQuantity();
        if (LEQuantStage == "") {
            dPalletsInptFld.setSelectedKey(1);
            dPalletsInptFld.setEnabled(false);
        }

        var ostoTypeModel = new sap.ui.model.xml.XMLModel();
        ostoTypeModel.setSizeLimit(10000);
        ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageType&Param.1=" + sLoc + "&Param.2=" + wh + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var osTypeitemline = new sap.ui.core.ListItem();
        osTypeitemline.bindProperty("text", "STGE_TYPE");
        osTypeitemline.bindProperty("key", "STGE_TYPE");
        dSTypeFld.bindItems("/Rowset/Row", osTypeitemline);
        dSTypeFld.setModel(ostoTypeModel);
        dSTypeFld.setSelectedKey(sType);

        var storType = "('" + sType + "')";
        var ostoBinModel = new sap.ui.model.xml.XMLModel();
        ostoBinModel.setSizeLimit(10000);
        ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageBin&Param.1=" + sLoc + "&Param.2=" + wh + "&Param.3=" + storType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var osBinitemline = new sap.ui.core.ListItem();
        osBinitemline.bindProperty("text", "STGE_BIN");
        osBinitemline.bindProperty("key", "STGE_BIN");
        dSBinFld.bindItems("/Rowset/Row", osBinitemline);
        dSBinFld.setModel(ostoBinModel);
        dSBinFld.setSelectedKey(sBin);

        var oTransferPrioModel = new sap.ui.model.xml.XMLModel();
        oTransferPrioModel.setSizeLimit(10000);
        oTransferPrioModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetTransferPriority_GIStage&d=" + DateNw + "&OutputParameter=OutputXML&Content-Type=text/xml"), "", false);
        var oTransferPrio = new sap.ui.core.ListItem();
        oTransferPrio.bindProperty("text", "TransPriorityText");
        oTransferPrio.bindProperty("key", "TransPriority");
        dTransPriority.bindItems("/Rowset/Row", oTransferPrio);
        dTransPriority.setModel(oTransferPrioModel);
        dTransPriority.setSelectedKey(5);

        var avlStockStageFld = new sap.ui.layout.form.FormElement({
            label: getPropertyValue(oResourceModel, "GI_Stage_AvlQuant") + " (" + getPropertyValue(oResourceModel, "TransferDisplay_label_SType") + ": " + sType + " " + getPropertyValue(oResourceModel, "NPDashboard_And") + " " + getPropertyValue(oResourceModel, "TransferDisplay_label_SBin") + ": " + sBin + ")",
            fields: [dAvlQuantInptFld],
            align: "Center"
        });
        var oGIStageLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
            labelSpanL: 4,
            labelSpanM: 4,
            labelSpanS: 4,
            emptySpanL: 0,
            emptySpanM: 0,
            emptySpanS: 0,
            columnsL: 2,
            columnsM: 2,

        });

        var oGIStageLabels = new sap.ui.layout.form.Form({
            layout: oGIStageLayoutLabels,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "GI_Stage_CompMat"),
                            fields: [dCompMatInptFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({

                            fields: [dCompMatDescFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "CustomGI_CL_3"),
                            fields: [dMatInptFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: []
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_TYPE"),
                            fields: [dSTypeFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_BIN"),
                            fields: [dSBinFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "CustomGI_GIR_6"),
                            fields: [dQuantInptFld, dUOMInptFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        avlStockStageFld
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "GI_Stage_Pallets"),
                            fields: [dPalletsInptFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "GI_Stage_RemQuant"),
                            fields: [dRemQuantInptFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "GI_Stage_TransPrio"),
                            fields: [dTransPriority]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: [oStockMII]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: []
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: []
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: [oBtnLT24]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: [oStockECC]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: [oBtnLT22]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: "",
                            fields: [oBtnLB10]
                        })
                    ]
                }),

            ]
        });


        var oGIStageDialog = new sap.m.Dialog({
            id: "GIStageDialogID",
            title: getPropertyValue(oResourceModel, "GI_Stage_ConfigBtn"),
            draggable: true,
            resizable: true,
            content: [oGIStageLabels],
            buttons: [
                new sap.m.Button({
                    id: "GIStageDialogBtnID",
                    text: getPropertyValue(oResourceModel, "GI_Stage_ExecuteButton"),
                    press: function() {
                        var DateNw = new Date();
                        var warningMsg;
                        stageQuant = dQuantInptFld.getValue();
                        stageUOM = reqQuantUOM;
                        var remQuantity = dRemQuantInptFld.getValue();
                        var remQuantitypart = remQuantity.split(" ");
                        remQuantity = remQuantitypart[0];
                        remQuantity = Number(remQuantity);
                        var avlStockQty = dAvlQuantInptFld.getValue();
                        var avlStockQtypart = avlStockQty.split(" ");
                        avlStockQty = avlStockQtypart[0];
                        avlStockQty = Number(avlStockQty);
                        transferStagePrio = dTransPriority.getSelectedKey();
                        palletsStage = dPalletsInptFld.getSelectedKey();

                        if (stageQuant == "" || stageQuant <= 0 || stageQuant == "NaN" || sType == "" || sBin == "") {

                            if (stageQuant == "" || stageQuant <= 0 || stageQuant == "NaN") {
                                dQuantInptFld.setValueState("Error");
                                dQuantInptFld.setValueStateText(getPropertyValue(oResourceModel, "BCP_COMMON_MSG_QUANTITY"));
                                sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "BCP_COMMON_MSG_QUANTITY"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                                });

                            }
                            if (sType == "") {
                                dSTypeFld.setValueState("Error");
                            }
                            if (sBin == "") {
                                dSBinFld.setValueState("Error");
                            }
                        } else {
                            if (stageQuant <= remQuantity && stageQuant <= avlStockQty) {

                                that.onStageRequest();
                                StageOpenFlag = 0;
                                oGIStageDialog.destroy();
                            } else {

                                if (stageQuant > remQuantity && stageQuant > avlStockQty) {

                                    warningMsg = getPropertyValue(oResourceModel, "GI_Stage_Error3");
                                } else if (stageQuant > remQuantity) {

                                    warningMsg = getPropertyValue(oResourceModel, "GI_Stage_Error2");
                                } else if (stageQuant > avlStockQty) {

                                    warningMsg = getPropertyValue(oResourceModel, "GI_Stage_Error1");
                                }
                                var dialogStagingConfirm = new sap.m.Dialog({
                    title: getPropertyValue(oResourceModel, "CustomGI_alert_8"),
                    draggable: true,
                    contentWidth: "30%",
                    icon: "sap-icon://sys-help",
                    type: 'Message',

                    content: [new sap.m.Text({
                        text: warningMsg + ". " + getPropertyValue(oResourceModel, "GI_Stage_Confirm1") + " " + stageQuant + " " + stageUOM
                    })],
                    beginButton: new sap.m.Button({

                        text: getPropertyValue(oResourceModel, "NPDashboard_Yes"),
                        press: function() {
		dialogStagingConfirm.close();
		that.onStageRequest();
                            StageOpenFlag = 0;
                            oGIStageDialog.destroy();
                           
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_No"),
                        press: function() {
                            dialogStagingConfirm.close();
                        }
                    }),

                    afterClose: function() {
                        dialogStagingConfirm.destroy();
                    }
                });

        dialogStagingConfirm.onAfterRendering = function() {
            if (sap.m.Dialog.prototype.onAfterRendering) {
                sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
            }
            var footer = this.$().find('footer');
            var spacer = footer.find('.sapMTBSpacer');
            var firstBtn = $(footer.find('button')[0]);
            spacer.remove();
            spacer.insertAfter(firstBtn);
        };
        dialogStagingConfirm.open();

                            }
                        }



                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        StageOpenFlag = 0;
                        oGIStageDialog.destroy();
                    }
                })
            ],
        });
        oGIStageDialog.onAfterRendering = function() {
            if (sap.m.Dialog.prototype.onAfterRendering) {
                sap.m.Dialog.prototype.onAfterRendering.apply(this, arguments);
            }
            var footer = this.$().find('footer');
            var spacer = footer.find('.sapMTBSpacer');
            var spacerFlex = footer.find('.sapMTBSpacerFlex');
            var firstBtn = $(footer.find('button')[0]);
            var secondBtn = $(footer.find('button')[1]);
            spacer.remove();
            spacer.insertAfter(firstBtn);
            StageOpenFlag = 1;

        };
        oGIStageDialog.setContentWidth("1000px");
        oGIStageDialog.setContentHeight("500px");
        oGIStageDialog.open();

    },
    onStageRequest: function() {
        var DateNw = new Date();
        var oGIStageStartModel = new sap.ui.model.xml.XMLModel();

        var GIStageInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><GIStageInput><Plant>" + plantFromURL + "</Plant><Client>" + clientFromURL + "</Client><materialNumber>" + mat + "</materialNumber><Order>" + orderFromURL + "</Order><SLOC>" + sLoc + "</SLOC><Warehouse>" + wh + "</Warehouse><Quantity>" + stageQuant + "</Quantity><UOM>" + stageUOM + "</UOM><Pallet>" + palletsStage + "</Pallet><language>" + userLanguage + "</language><TransferPriority>" + transferStagePrio + "</TransferPriority><SType>" + sType + "</SType><SBin>" + encodeURIComponent(sBin) + "</SBin></GIStageInput>"
        oGIStageStartModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_MaterialStagingMapping_GI&Param.1=" + GIStageInputXML + "&d=" + DateNw + "&Content-Type=text/xml"), "", false, "POST");
        var outputStatus = oGIStageStartModel.getProperty('/StatusMsg');
        //var outputStatusXML = oGIStageStartModel.getProperty('/Rowset/Row/OutputXML');
        if (outputStatus == "SUCCESS") {

            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "GI_Stage_Success"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Success")
            });
        } else {
            sap.m.MessageBox.error(outputStatus, {
                title: getPropertyValue(oResourceModel, "EPO_UI_ERROR_MSG")
            });
        }

    },
    getAvlQuantity: function() {
        var DateNw = new Date();
        var oAvlQuantModel = new sap.ui.model.xml.XMLModel();

        oAvlQuantModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetAvailableQuant_GIStage&Param.1=" + mat + "&Param.2=" + sType + "&Param.3=" + encodeURIComponent(sBin) + "&Param.4=" + client + "&Param.5=" + reqQuantUOM + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        avlQuantStage = oAvlQuantModel.getProperty('/Rowset/Row/Output');
        dAvlQuantInptFld.setValue(avlQuantStage + " " + reqQuantUOM);

    },
    formatAvlQuantity: function() {

        currentReqQuantity = Number(currentReqQuantity);

        if (reqPallet > 9) {
            dQuantInptFld.setValueState("Error");

            dQuantInptFld.setValueStateText(getPropertyValue(oResourceModel, "GI_Stage_Error5"));
        } else if (currentReqQuantity <= avlQuantStage && avlQuantStage != 0) {


            dAvlQuantInptFld.removeStyleClass("warningInputtxt");
            dAvlQuantInptFld.addStyleClass("availableInputtxt");
            dQuantInptFld.setValueState("None");
        } else if (currentReqQuantity > avlQuantStage || avlQuantStage == 0) {

            dAvlQuantInptFld.removeStyleClass("availableInputtxt");
            dAvlQuantInptFld.addStyleClass("warningInputtxt");
            dQuantInptFld.setValueState("Error");
            dQuantInptFld.setValueStateText(getPropertyValue(oResourceModel, "GI_Stage_Error1"));
        }

    },

    onProlist: function() {

        var refresh = new Date();
        var oProListModel = new sap.ui.model.xml.XMLModel();
        oProListModel.attachRequestSent(function() {
            sap.ui.core.BusyIndicator.show(1);
        });
        var TCode = "/GLB/UGTPT00_PROLIST";
        oProListModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetECCURL_GIStage&Param.1=" + TCode + "&Param.2=" + plantFromURL + "&Param.3=" + orderFromURL + "&cache=" + refresh + "&Content-Type=text/xml"), "", true);

        oProListModel.attachRequestCompleted(function() {
            sap.ui.core.BusyIndicator.hide();
            var oURL = oProListModel.getProperty("/Rowset/Row/O_ECCURL");
            window.open(oURL);

        });
    },

    onIDOClist: function() {

        var refresh = new Date();
        var oProListModel = new sap.ui.model.xml.XMLModel();
        oProListModel.attachRequestSent(function() {
            sap.ui.core.BusyIndicator.show(1);
        });
        var TCode = "ZCMCL";
        oProListModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetECCURL_GIStage&Param.1=" + TCode + "&Param.2=" + plantFromURL + "&cache=" + refresh + "&Content-Type=text/xml"), "", true);

        oProListModel.attachRequestCompleted(function() {
            sap.ui.core.BusyIndicator.hide();
            var oURL = oProListModel.getProperty("/Rowset/Row/O_ECCURL");
            window.open(oURL);
        });
    },
    getStageHistory: function() {
        /////////////////////////////////////////////////// GI Stage History Table ///////////////////////////////////////////

        daysFld = new sap.m.Input({
            value: 3,
            width: "30%",
            textAlign: "Center",
            liveChange: function() {
                sOrderSelected = dPOStageHistory.getSelectedKey();
                sDaysSelected = daysFld.getValue();
                var oHistoryModel = new sap.ui.model.xml.XMLModel();
                var refresh = new Date();
                oHistoryModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStageHistory&Param.1=" + sOrderSelected + "&Param.2=" + sDaysSelected + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                oHistoryTable.setModel(oHistoryModel);
                oHistoryTable.bindRows("/Rowset/Row");

                var oPOHistoryModel = new sap.ui.model.xml.XMLModel();
                oPOHistoryModel.setSizeLimit(10000);
                oPOHistoryModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIDistinctPOStageHistory&Param.1=" + sDaysSelected + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                var oPOline = new sap.ui.core.ListItem();
                oPOline.bindProperty("text", "Order");
                oPOline.bindProperty("key", "Order");
                dPOStageHistory.bindItems("/Rowset/Row", oPOline);
                dPOStageHistory.setModel(oPOHistoryModel);
            }
        });

        var dPOStageHistory = new sap.m.ComboBox({
            selectionChange: function() {
                sOrderSelected = dPOStageHistory.getSelectedKey();
                sDaysSelected = daysFld.getValue();
                var oHistoryModel = new sap.ui.model.xml.XMLModel();
                var refresh = new Date();
                oHistoryModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStageHistory&Param.1=" + sOrderSelected + "&Param.2=" + sDaysSelected + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                oHistoryTable.setModel(oHistoryModel);
                oHistoryTable.bindRows("/Rowset/Row");
            }

        });

        var searchStageHistory = new sap.m.SearchField({
            placeholder: getPropertyValue(oResourceModel, "CustomGI_CL_4"),

            liveChange: function(oEvent) {
                var sQuery = oEvent.getSource().getValue();

                var oFilter1 = new sap.ui.model.Filter("Order", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter2 = new sap.ui.model.Filter("ComponentMaterial", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter3 = new sap.ui.model.Filter("SType", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter4 = new sap.ui.model.Filter("SBin", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter5 = new sap.ui.model.Filter("Quantity", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter6 = new sap.ui.model.Filter("Pallet", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter7 = new sap.ui.model.Filter("TransferPriority", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter8 = new sap.ui.model.Filter("User", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter9 = new sap.ui.model.Filter("RequestedOn", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter10 = new sap.ui.model.Filter("RequestNumber", sap.ui.model.FilterOperator.Contains, sQuery);
                var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10], false);
                oHistoryTable.getBinding("rows").filter(allFilter);

            }
        });
        var oPOHistoryModel = new sap.ui.model.xml.XMLModel();
        oPOHistoryModel.setSizeLimit(10000);
        oPOHistoryModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIDistinctPOStageHistory&Param.1=3&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var oPOline = new sap.ui.core.ListItem();
        oPOline.bindProperty("text", "Order");
        oPOline.bindProperty("key", "Order");
        dPOStageHistory.bindItems("/Rowset/Row", oPOline);
        dPOStageHistory.setModel(oPOHistoryModel);
        dPOStageHistory.setSelectedKey(orderFromURL);
        dPOStageHistory.setPlaceholder(orderFromURL);

        var oGIStageHistoryLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
            id: "StageHistoryGridLayoutID",
            labelSpanL: 4,
            labelSpanM: 4,
            labelSpanS: 4,
            emptySpanL: 0,
            emptySpanM: 0,
            emptySpanS: 0,
            columnsL: 3,
            columnsM: 3,

        });

        var oGIStageHistoryLabels = new sap.ui.layout.form.Form({
            id: "StageHistoryLayoutID",
            layout: oGIStageHistoryLayoutLabels,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "CustomGR_GRR_2"),
                            fields: [dPOStageHistory]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "CustomGI_PO_Days"),
                            fields: [daysFld]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({

                            fields: [searchStageHistory]
                        })
                    ]
                })
            ]
        });

        oHistoryTable = new sap.ui.table.Table({
            selectionMode: sap.ui.table.SelectionMode.None,
            visibleRowCount: 16
        });

        var orderGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "CustomGR_GRR_2"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{Order}",
                textAlign: "Center"
            }),
            sortProperty: "Order",
            filterProperty: "Order",
        });
        orderGIStage.setHAlign("Center");
        oHistoryTable.addColumn(orderGIStage);

        var MaterialGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "CustomGI_CL_3"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{ComponentMaterial}",
                textAlign: "Center"
            }),
            sortProperty: "ComponentMaterial",
            filterProperty: "ComponentMaterial",
            hAlign: "Center"
        });
        oHistoryTable.addColumn(MaterialGIStage);

        var sTypeGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_TYPE"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{SType}",
                textAlign: "Center"
            }),
            sortProperty: "SType",
            filterProperty: "SType",
            hAlign: "Center",
            width: "8%"
        });
        oHistoryTable.addColumn(sTypeGIStage);

        var sBinStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_BIN"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{SBin}",
                textAlign: "Center"
            }),
            sortProperty: "SBin",
            filterProperty: "SBin",
            hAlign: "Center"
        });
        oHistoryTable.addColumn(sBinStage);

        var palletGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "CustomGI_GIR_6"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{Quantity}",
                textAlign: "Center"
            }),
            sortProperty: "Quantity",
            filterProperty: "Quantity",
            hAlign: "Center"
        });
        oHistoryTable.addColumn(palletGIStage);

        var MaterialGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "GI_Stage_Pallets"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{Pallet}",
                textAlign: "Center"
            }),
            sortProperty: "Pallet",
            filterProperty: "Pallet",
            hAlign: "Center",
            width: "5%"
        });
        oHistoryTable.addColumn(MaterialGIStage);

        var sPriorityGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "GI_Stage_TransPrio"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{TransferPriority}",
                textAlign: "Center"
            }),
            sortProperty: "TransferPriority",
            filterProperty: "TransferPriority",
            hAlign: "Center",
            width: "9%"
        });
        oHistoryTable.addColumn(sPriorityGIStage);

        var reqNoGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "GI_Stage_History_ReqNo"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{RequestNumber}",
                textAlign: "Center"
            }),
            sortProperty: "RequestNumber",
            filterProperty: "RequestNumber",
            hAlign: "Center"
        });
        oHistoryTable.addColumn(reqNoGIStage);

        var userGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "GI_Stage_History_ReqBy"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{User}",
                textAlign: "Center"
            }),
            sortProperty: "User",
            filterProperty: "User",
            hAlign: "Center"
        });
        oHistoryTable.addColumn(userGIStage);

        var requestedOnGIStage = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: getPropertyValue(oResourceModel, "GI_Stage_History_ReqOn"),
                textAlign: "Center"
            }),
            template: new sap.ui.commons.TextView({
                text: "{RequestedOn}",
                textAlign: "Center"
            }),
            sortProperty: "RequestedOn",
            filterProperty: "RequestedOn",
            hAlign: "Center"
        });
        oHistoryTable.addColumn(requestedOnGIStage);

        var oHistoryModel = new sap.ui.model.xml.XMLModel();
        var refresh = new Date();
        oHistoryModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStageHistory&Param.1=" + orderFromURL + "&Param.2=3&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        oHistoryTable.setModel(oHistoryModel);
        oHistoryTable.bindRows("/Rowset/Row");
        ////////////////////////////////////////////////// Dialog for GI Stage History /////////////////////////////////////////////////////
        var oStageHistoryDialog = new sap.m.Dialog({
            id: "stageHistoryDialogID",
            title: getPropertyValue(oResourceModel, "GI_Stage_History"),
            content: [oGIStageHistoryLabels, oHistoryTable],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oStageHistoryDialog.destroy();
                    }
                })
            ],
        });
        oStageHistoryDialog.setContentWidth("1250px");
        oStageHistoryDialog.setContentHeight("600px");
        oStageHistoryDialog.open();
    },

    getAvlPallets: function() {
        /////////////////////////////////////////////////// GI Get available Pallets ///////////////////////////////////////////
        var oPalletModel = new sap.ui.model.xml.XMLModel();
        var refresh = new Date();
        oPalletModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetAvailablePallets&Param.1=" + ord + "&Param.2=" + plantFromURL + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);


        oPalletList = new sap.m.Table({
            id: "PalletTable",
            headerText: "",
            headerDesign: sap.m.ListHeaderDesign.Standard
        });
        var storageUnit = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "TransferDisplay_colHeader_sUnit")
            }),
            hAlign: "Center",
            width: "30%"
        });
        oPalletList.addColumn(storageUnit);
        var Material = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "CustomGI_CL_3")

            }),
            hAlign: "Center"
        });
        oPalletList.addColumn(Material);


       var MaterialDesc = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "CustomGI_PO_6")

            }),
            hAlign: "Center"
        });

        oPalletList.addColumn(MaterialDesc);
        var expiry = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "TransferDisplay_colHeader_sled")

            }),
            hAlign: "Center"
        });
        oPalletList.addColumn(expiry);
        var StockQuantity = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "TransferDisplay_colHeader_avail")

            }),
            hAlign: "Center"
        });
        oPalletList.addColumn(StockQuantity);

        var oPalletTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.FlexBox({
                    justifyContent: "SpaceAround",
                    items: [
                        new sap.m.Link({
                            text: "{STOR_UNIT}",
                            press: function(oEvent) {
                                var suSelected = oEvent.getSource().getText();

                                oPalletDialog.destroy();
                                oControllerThis.getView().byId("barsscc").setValue(suSelected);
                            }
                        }),
                        new sap.ui.core.Icon({
                            src: "sap-icon://copy",
                            alt: "{STOR_UNIT}",
                            hoverColor: "black",
                            color: "gray",
                            tooltip: getPropertyValue(oResourceModel, "GI_Pallet_copysscc"),
                            press: function(oEvent) {
                                var suSelected = oEvent.getSource().getAlt();

                                if (navigator.clipboard != undefined) {
                                    navigator.clipboard.writeText(suSelected).then(function() {
                                        sap.m.MessageToast.show(getPropertyValue(oResourceModel, "TransferDisplay_colHeader_sUnit") + " " + suSelected + " " + getPropertyValue(oResourceModel, "GI_Pallet_copy"), {
                                            width: "50%"
                                        });
                                    }, function(err) {
                                        sap.m.MessageToast.show(getPropertyValue(oResourceModel, "GI_Pallet_copy_error"));
                                    });
                                } else if (window.clipboardData) {

                                    try {
                                        window.clipboardData.setData("Text", suSelected);
                                        sap.m.MessageToast.show(getPropertyValue(oResourceModel, "TransferDisplay_colHeader_sUnit") + " " + suSelected + " " + getPropertyValue(oResourceModel, "GI_Pallet_copy"), {
                                            width: "30%"
                                        });
                                    } catch (e) {
                                        sap.m.MessageToast.show(getPropertyValue(oResourceModel, "GI_Pallet_copy_error"));
                                    }
                                } else {}
                            }
                        })
                    ]
                }),
                new sap.m.Text({
                    text: "{MATERIAL}",
                    textAlign: "Center"
                }),
	      new sap.m.Text({
                    text: "{MATERIALDESC}",
                    textAlign: "Center"
                }),
                new sap.m.Text({
                    text: "{EXPIRYDATE}",
                    textAlign: "Center"
                }),
                new sap.m.Text({
                    text: "{AVAIL_STCK}",
                    textAlign: "Center"
                })

            ]
        });
        oPalletList.bindItems("/Rowset/Row", oPalletTemplate);
        oPalletList.setModel(oPalletModel);

        var searchPallets = new sap.m.SearchField({
            placeholder: getPropertyValue(oResourceModel, "CustomGI_CL_4"),
            liveChange: function(oEvent) {
                var sQuery = oEvent.getSource().getValue();
                var oFilter1 = new sap.ui.model.Filter("STOR_UNIT", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter2 = new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter3 = new sap.ui.model.Filter("EXPIRYDATE", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilter4 = new sap.ui.model.Filter("AVAIL_STCK", sap.ui.model.FilterOperator.Contains, sQuery);
	    var oFilter5 = new sap.ui.model.Filter("MATERIALDESC", sap.ui.model.FilterOperator.Contains, sQuery);

                var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4,oFilter5], false);
                oPalletList.getBinding("items").filter(allFilter);
            }
        });
        ////////////////////////////////////////////////// Dialog for GI Stage History /////////////////////////////////////////////////////
        var oPalletDialog = new sap.m.Dialog({
            draggable: true,
            title: getPropertyValue(oResourceModel, "GI_Pallet_Available"),
            content: [searchPallets, oPalletList],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oPalletDialog.destroy();
                    }
                })
            ],
        });
        oPalletDialog.setContentWidth("900px");
        oPalletDialog.setContentHeight("900px");
        oPalletDialog.open();

    },
	onTODashboard: function() {
		window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/TransferOrderDashboard.irpt?orderFromURL=" + orderFromURL + "&clientFromURL=" + clientFromURL + "&plantFromURL=" + plantFromURL + "&nodeFromURL=" + encodeURIComponent(nodeFromURL)+ "&resFromURL=" + encodeURIComponent(resFromURL)), "_blank");
	},
    goToECCGM: function() {

        var refresh = new Date();
        var oECCURLModel = new sap.ui.model.xml.XMLModel();
        oECCURLModel.attachRequestSent(function() {
            sap.ui.core.BusyIndicator.show(1);
        });

        oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GMReport/QueryTemplates/XACQ_GetECCURL&Param.1=" + orderFromURL + "&Param.2=GI&cache=" + refresh + "&Content-Type=text/xml"), "", true);

        oECCURLModel.attachRequestCompleted(function() {
            sap.ui.core.BusyIndicator.hide();
            var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
            window.open(oURL);
        });
    }
});