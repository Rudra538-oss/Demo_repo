jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.commons.MessageBox");

var oControllerIMR;
var oDialog1;
var NonBatchManagedFlag;
var dOrderNotxtFld;
var dOrderItemtxtFld;
var dMaterialtxtFld;

var dBatchNotxtFld;
var dAutoGnrtdBatchCB;
var dAGBtch;
var dMExpiryDate;
var oSelectedBatch;

var dVendorBatchtxtFld;
//var dNoOfLablstxtFld;
var dStrgTypetxtFld;
var dWarehousetxtFld;
var dSLOCtxtFld;
var dStrgBintxtFld;

var dQtytxtFld;
var dQtyUom;

var dOriginWttxtFld1;
var dOriginuom;
var dOriginWttxtFld2;

var dGTINtxtFld;
var dStrgUnitTypetxtFld;
var dVarianttxtFld;
var dItemTxtFld;
var delNoteInptFld;
var dProdcsnDate;
var dExpryDate;
var dPostngDate;

var dSSCCtxtFld;
var dAutoGnrtdCB;
var dFinalDelvryCB;
var dStkTypeSelect;
//var dPrintrSelect;
var dAutoGnrtdExpiryDt;
var oExpiryValue;

var oInboundMatReceiptModel

var oInboundMatReceiptTable;
var oPOItemsTable;

var Plant;
var Client;
var matrl;
var matrlDesc;

var stDate;
var endDate;


var matTablindex;

var oBCPStatusModel;

var okBtn;
var okRptBtn;
var oResourceModel;
var expirydateDt;
var dBatchNotxtFld1;
var ordrNum;
var oLanguage;
var dMatDesctxtFld;
var oBCPStats;
var printerNameSelection;
var noOfCopiesInput;
var printerNameLbl;
var noOfCopies;
var bcpElement;
var MatDescription;
var DateNowFormat;
var inputXMLinStringFormat2;
var userLanguage, oUserDataModel;
var sloc_flag = 0;

jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("customActivity.InboundMaterialReceipt", {

    onInit: function() {

        var DateNw = new Date();
        var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy"
        });
        DateNowFormat = dateFormat.format(new Date());

        oUserDataModel = new sap.ui.model.xml.XMLModel();
        oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);
        userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
        oLanguage = userLanguage.toUpperCase();

        //alert(userLanguage);
        /* oResourceModel = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});

        this.getView().byId("page").setModel(oResourceModel, "IMReceipt");
        this.getView().byId("page").setModel(oResourceModel, "header");
        this.getView().byId("SelectionCarteriaPanel").setModel(oResourceModel, "title");
        this.getView().byId("InboundMaterialGrid").setModel(oResourceModel, "title");
        this.getView().byId("Form1").setModel(oResourceModel, "label");
        this.getView().byId("Form2").setModel(oResourceModel, "label");

        this.getView().byId("lastHour").setModel(oResourceModel, "button");
        this.getView().byId("Today").setModel(oResourceModel, "button");
        this.getView().byId("Yesterday").setModel(oResourceModel, "button");
        this.getView().byId("ThisWeek").setModel(oResourceModel, "button");
        this.getView().byId("Refresh").setModel(oResourceModel, "button");


        this.getView().byId("InboundMatReceiptTable").setModel(oResourceModel, "column");
        this.getView().byId("POItemDetailsTable").setModel(oResourceModel, "column"); */

        var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,IMR_BLS_MSG_BATCH_LIMIT,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,BCP_COMMON_MSG_QUANTITY,IMRDASHBOARD_BCP_OFF_INFO,NPM_COMMON_Message,NPM_COMMON_ORD_NO,NPM_COMMON_ORD_ITEM,NPM_COMMON_ORD_MATERIAL,NPM_COMMON_SSCC,NPM_COMMON_BATCH_NO,NPM_COMMON_VENDOR_BATCH,NPM_COMMON_PROD_DATE,NPM_COMMON_EXPRTION_DATE,IMR_CONTR_NO_OF_LABELS,NPM_COMMON_STORAGE_TYPE,NPM_COMMON_WAREHOUSE,NPM_COMMON_SLOC,NPM_COMMON_STORAGE_BIN,NPM_COMMON_QUANTITY,IMR_CONTR_ORIGIN_WEIGHT,NPM_COMMON_STOCK_TYPE,NPM_COMMON_STORAGE_UNIT_TYPE,NPM_COMMON_POSTING_DATE,IMR_CONTR_FINAL_DELIVERY,IMR_CONTR_ITEM_TEXT,IMR_CONTR_MAT_DESC,IMR_CONTR_MAT_DEL_NOTE_LABEL,NPORTAL_COMMON_LABEL_PRINTER_NAME,NPORTAL_COMMON_LABEL_NO_OF_COPIES,IMR_CONTR_AUTO_GENERATE,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,TransferDisplay_Message,NPM_COMMON_OK,NPM_COMMON_OK_REPEAT,IMR_CONTR_PURCHASE_ORD_RECEIPT,NPM_COMMON_CANCEL,NPM_COMMON_MSG_MANDAT_FIELD,NP_PortalSTypeSBinBlank,NPM_COMMON_MSG_MANDAT_SLED,NPM_COMMON_MSG_EXPIRYDATE,NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER,NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES,NPORTAL_IMR_CONTR_MSG_SU_STYPE_CNF,NPORTAL_IMR_CONTR_MSG_NONSU_STYPE_CNF,NPORTAL_IMR_CONTR_MSG_NONSU_MANAGED_STYPE,NPORTAL_IMR_CONTR_MSG_SU_MANAGED_STYPE,NPORTAL_IMR_CONFIRMATION,NPM_BLS_COMMON_MSG_POSTED,NPM_BLS_COMMON_MSG_POSTED,NPORTAL_IMR_CONTR_MSG_SU_STYPE_CNF,NPORTAL_IMR_CONTR_MSG_NONSU_STYPE_CNF,NPORTAL_IMR_CONTR_MSG_NONSU_MANAGED_STYPE,NPORTAL_IMR_CONTR_MSG_SU_MANAGED_STYPE,NPORTAL_IMR_CONFIRMATION,NPM_COMMON_MSG_MSG_POSTING_SUCCESS,CustomGR_alert_27";
        oResourceModel = new sap.ui.model.xml.XMLModel();
        oResourceModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

        var page = this.getView().byId("page");
        var identifier = "IMReceipt1>NPDashboard_Back,IMReceipt2>InBndMatRecpt_title_BCP,IMReceipt3>InBndMatRecpt_Header_Title,IMReceipt4>InBndMatRecpt_title_SelectCriteria,IMReceipt5>InBndMatRecpt_title_SelectCriteria,IMReceipt6>InBndMatRecpt_title_BCP,IMReceipt7>InBndMatRecpt_Lbl_StartDate,IMReceipt8>InBndMatRecpt_Lbl_EndDate,IMReceipt9>InBndMatRecpt_btn_LastHour,IMReceipt10>InBndMatRecpt_btn_Today,IMReceipt11>InBndMatRecpt_btn_yesterday,IMReceipt12>InBndMatRecpt_btn_thisWeek,IMReceipt13>InBndMatRecpt_Lbl_PO,IMReceipt14>InBndMatRecpt_Lbl_Vendor,IMReceipt15>InBndMatRecpt_Lbl_Material,IMReceipt16>InBndMatRecpt_btn_refresh,IMReceipt17>InBndMatRecpt_title_InbndMatRecptGrid,IMReceipt18>InBndMatRecpt_colHeader_plant,IMReceipt19>InBndMatRecpt_colHeader_Client,IMReceipt20>InBndMatRecpt_colHeader_PO,IMReceipt21>InBndMatRecpt_colHeader_matNr,IMReceipt22>InBndMatRecpt_colHeader_docType,IMReceipt23>InBndMatRecpt_colHeader_docDate,IMReceipt24>InBndMatRecpt_colHeader_poDt,IMReceipt25>InBndMatRecpt_colHeader_Vendor,IMReceipt26>InBndMatRecpt_colHeader_VendorNo,IMReceipt27>InBndMatRecpt_colHeader_VendorName,IMReceipt28>InBndMatRecpt_colHeader_address,IMReceipt29>InBndMatRecpt_colHeader_city,IMReceipt30>InBndMatRecpt_colHeader_psCode,IMReceipt31>InBndMatRecpt_colHeader_countryKey,IMReceipt32>InBndMatRecpt_colHeader_telephone,IMReceipt33>InBndMatRecpt_colHeader_fax,IMReceipt34>InBndMatRecpt_colHeader_langKey,IMReceipt35>InBndMatRecpt_colHeader_region,IMReceipt36>InBndMatRecpt_colHeader_ILNNR,IMReceipt37>InBndMatRecpt_colHeader_SAPlangCode,IMReceipt38>InBndMatRecpt_colHeader_plant,IMReceipt39>InBndMatRecpt_colHeader_PO,IMReceipt40>InBndMatRecpt_colHeader_matNr,IMReceipt41>InBndMatRecpt_colHeader_ActCode,IMReceipt42>InBndMatRecpt_colHeader_itemCatg,IMReceipt43>InBndMatRecpt_colHeader_rcvdQty,IMReceipt44>InBndMatRecpt_colHeader_ordQty,IMReceipt45>InBndMatRecpt_colHeader_Uom,IMReceipt46>InBndMatRecpt_colHeader_qtyPrice,IMReceipt47>InBndMatRecpt_colHeader_qtyPriceUom,IMReceipt48>InBndMatRecpt_colHeader_price,IMReceipt49>InBndMatRecpt_colHeader_priceUnit,IMReceipt50>InBndMatRecpt_colHeader_itemVal,IMReceipt51>InBndMatRecpt_colHeader_netWt,IMReceipt52>InBndMatRecpt_colHeader_wtUOM,IMReceipt53>InBndMatRecpt_colHeader_matrlClass,IMReceipt54>InBndMatRecpt_colHeader_convDenom,IMReceipt55>InBndMatRecpt_colHeader_convNumrtr,IMReceipt56>InBndMatRecpt_colHeader_wrhse,IMReceipt57>InBndMatRecpt_colHeader_strgLoc,IMReceipt58>InBndMatRecpt_colHeader_strgType,IMReceipt59>InBndMatRecpt_colHeader_strgBin,IMReceipt60>InBndMatRecpt_colHeader_dlvryDt,IMReceipt61>InBndMatRecpt_colHeader_matDesc,IMReceipt62>InBndMatRecpt_colHeader_totalWt";
        localize(page, identifier, userLanguage);

        var userName = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
        this.getView().byId("usernameIds").setUsername(userName);

        oControllerIMR = this;
        var curntDate = new Date();
        var pastDate = new Date(curntDate.getFullYear(), curntDate.getMonth(), curntDate.getDate() - 6)

        this.getView().byId("StartDate").setDateValue(pastDate);
        this.getView().byId("EndDate").setDateValue(curntDate);

        oInboundMatReceiptTable = this.getView().byId("InboundMatReceiptTable");

        var reportStartDate = this.getView().byId("StartDate").getDateValue();
        var reportEndDate = this.getView().byId("EndDate").getDateValue();

        var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy 00:00:00"
        });
        var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy HH:mm:ss"
        });

        stDate = strtdateFormat.format(new Date(reportStartDate));
        endDate = enddateFormat.format(new Date(reportEndDate));
        var DateNw = new Date();

        bcpElement = this.getView().byId("bcpHDRIMR");
        oBCPStats = getBCPStatus(bcpElement, "", "");

        oInboundMatReceiptModel = new sap.ui.model.xml.XMLModel();
        oInboundMatReceiptModel.setSizeLimit(10000);
        oInboundMatReceiptModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDO_GetRefreshFnDetails&StartDate=" + stDate + "&EndDate=" + endDate + "&Param.1=%&Param.2=%&Param.3=%&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        oInboundMatReceiptTable.setModel(oInboundMatReceiptModel);
        oInboundMatReceiptTable.bindRows("/Rowset/Row");
        oPOItemsTable = this.getView().byId("POItemDetailsTable");

        /////////////////////////////////////////////////////////////////////////// Date/Time Picker Display Format //////////////////////////////////////////////////////////////////////
        var oModelDF = new sap.ui.model.xml.XMLModel();
        oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache=" + new Date() + "&Content-Type=text/xml", "", false);
        var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");
        this.getView().byId("StartDate").setDisplayFormat(oDisplayFormat);
        this.getView().byId("EndDate").setDisplayFormat(oDisplayFormat);
    },
    onAfterRendering: function() {
        /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
        var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
        var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
        setIdleTime(sessionExpMsg, sessionExpTitle);

        /////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////

        if (oBCPStats == "1") {
            sap.m.MessageBox.show(getPropertyValue(oResourceModel, "IMRDASHBOARD_BCP_OFF_INFO"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        }

        setInterval(function() {
            oBCPStats = getBCPStatus(bcpElement, "", "");
        }, 30000);
    },

    oInboundMatReceiptTableRowChange: function(evt) {
        var DateNw = new Date();
        matTablindex = oInboundMatReceiptTable.getSelectedIndex();
        userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");

        if (matTablindex != -1) {
            var oTablindex1 = oInboundMatReceiptTable.getContextByIndex(matTablindex);
            Client = oInboundMatReceiptTable.getModel().getProperty("/Rowset/Row/" + matTablindex + "/Client");
            var plantVal = oInboundMatReceiptTable.getModel().getProperty("/Rowset/Row/" + matTablindex + "/Plant");
            var poOrd = oInboundMatReceiptTable.getModel().getProperty("/Rowset/Row/" + matTablindex + "/PurchaseOrderNumber");
            var MaterialItem = oInboundMatReceiptTable.getModel().getProperty("Material", oTablindex1);

            oPOItemsTable.setVisible(true);
            var oPOItemsModel = new sap.ui.model.xml.XMLModel();
            oPOItemsModel.setSizeLimit(10000);
            oPOItemsModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetCommBasedOnPODetailsMDO&Param.1=" + poOrd + "&Param.2=" + plantVal + "&Param.3=" + userLanguage + "&Param.4=" + Client + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            oPOItemsTable.setModel(oPOItemsModel);
            oPOItemsTable.bindRows("/Rowset/Row");
        } else {
            oPOItemsTable.setVisible(false);
        }
    },

    oPOItemsTableRowChange: function(evt) {
        var poTablindex = oPOItemsTable.getSelectedIndex();
        var DateNw = new Date();

        oBCPStatusModel = new sap.ui.model.xml.XMLModel();
        oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");

        if (oBCPStats == "1") {
            sap.m.MessageBox.show(getPropertyValue(oResourceModel, "IMRDASHBOARD_BCP_OFF_INFO"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else {
            if (poTablindex != -1) {
                var oModelDF = new sap.ui.model.xml.XMLModel();
                oModelDF.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_FormatDate&cache=" + new Date() + "&Content-Type=text/xml", "", false);
                var oDisplayFormat = oModelDF.getProperty("/Rowset/Row/O_DisplayFormat");

                ordrNum = oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/PurchaseOrderNumber");
                matrl = oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/Material");
                matrlDesc = oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/MaterialDescription");
                var ordrItm = oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/OrderItemNumber");

                Plant = oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/Plant");




                var oGtinModel = new sap.ui.model.xml.XMLModel();
                oGtinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/SQL_GetMaterialDetails&Param.1=" + matrl + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                var dOrdrNo = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_NO")
                });
                var dOrdrItem = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_ITEM")
                });
                var dMaterial = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_MATERIAL")
                });
                var dSSCC = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SSCC")
                });

                var dBatchNo = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_BATCH_NO")
                });
                var dVendorBatch = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_VENDOR_BATCH")
                });
                var dProdDt = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_PROD_DATE"),
                    required: true
                });
                var dExpryDt = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_EXPRTION_DATE")
                });
                // var dprintr = new sap.m.Label({text:"Printer"});
                // var dNoOfLables = new sap.m.Label({text: getPropertyValue(oResourceModel, "IMR_CONTR_NO_OF_LABELS")});
                var dStrgType = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_TYPE")
                });
                var dWarehouse = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_WAREHOUSE"),
                    required: true
                });
                var dSLOC = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SLOC"),
                    required: true
                });
                var dStrgBin = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_BIN")
                });
                var dQty = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_QUANTITY"),
                    required: true
                });
                var dOriginWt = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "IMR_CONTR_ORIGIN_WEIGHT")
                });
                var dStockType = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_STOCK_TYPE")
                });
                var dStrgUnitType = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_UNIT_TYPE"),
                    required: true
                });
                var dPostngDt = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_POSTING_DATE")
                });

                var dFinalDelvry = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "IMR_CONTR_FINAL_DELIVERY")
                });
                var dItemTxt = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "IMR_CONTR_ITEM_TEXT")
                });
                var dMatDesc = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "IMR_CONTR_MAT_DESC")
                });
                var delNoteLabel = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "IMR_CONTR_MAT_DEL_NOTE_LABEL")
                });

                printerNameLbl = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPORTAL_COMMON_LABEL_PRINTER_NAME"),
                    required: true
                });
                printerNameLbl.setVisible(false);
                noOfCopies = new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPORTAL_COMMON_LABEL_NO_OF_COPIES")
                });
                noOfCopies.setVisible(false);

                delNoteInptFld = new sap.m.Input({
                    editable: true
                });
                dMatDesctxtFld = new sap.m.Input({
                    editable: false
                });

                dOrderNotxtFld = new sap.m.Input({
                    editable: false
                });
                dOrderNotxtFld.setValue(ordrNum);

                dOrderItemtxtFld = new sap.m.Input({
                    editable: false
                });
                dOrderItemtxtFld.setValue(ordrItm);

                dMaterialtxtFld = new sap.m.Input({
                    editable: false
                });


                dVendorBatchtxtFld = new sap.m.Input();
                dVendorBatchtxtFld.setValue(oInboundMatReceiptTable.getModel().getProperty("/Rowset/Row/" + matTablindex + "/Vendor_Batch	"));
                //dVendorBatchtxtFld.setValue(oInboundMatReceiptModel.getProperty("/Rowset/Row/Vendor_Number"));

                //dNoOfLablstxtFld = new sap.m.Input();

                dStrgTypetxtFld = new sap.m.Input();
                //dStrgTypetxtFld.setValue(oPOItemsTable.getModel().getProperty("/Rowset/Row/"+poTablindex+"/Storage_Type"));
                //dStrgTypetxtFld.setValue(oPOItemsModel.getProperty("/Rowset/Row/Storage_Type"));

                dWarehousetxtFld = new sap.m.Input({
                    enabled: true,
                    editable: false
                });
                dWarehousetxtFld.setValue(oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/Warehouse"));
                //dWarehousetxtFld.setValue(oPOItemsModel.getProperty("/Rowset/Row/Warehouse"));

                sloc_flag = 0;
                dSLOCtxtFld = new sap.m.Input({});
                dSLOCtxtFld.setValue(oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/Storage_Location"));
                //dSLOCtxtFld.setValue(oPOItemsModel.getProperty("/Rowset/Row/Storage_Location"));
                if (dSLOCtxtFld.getValue() == "---") {
                    sloc_flag = 1;
                    dSLOCtxtFld = new sap.m.Select({
                        change: oControllerIMR.WHOnTheBasisOfSLOC
                    });
                    var sLocDDType = "STORAGELOC";
                    var wareNoDDType = "WAREHOUSENO"

                    var oStoLocModel = new sap.ui.model.xml.XMLModel();
                    oStoLocModel.setSizeLimit(10000);
                    oStoLocModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + sLocDDType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                    var ostoreLocitemline = new sap.ui.core.ListItem();
                    ostoreLocitemline.bindProperty("text", "Value");
                    ostoreLocitemline.bindProperty("key", "Key");
                    dSLOCtxtFld.bindItems("/Rowset/Row", ostoreLocitemline);
                    dSLOCtxtFld.setModel(oStoLocModel);
                    dSLOCtxtFld.setSelectedKey(oStoLocModel.getProperty("/Rowset/Row/0/Key"));


                }
                dStrgBintxtFld = new sap.m.Input({
                    liveChange: function() {
                        dStrgBintxtFld.setValue(dStrgBintxtFld.getValue().toUpperCase());
                    }
                });
                //dStrgBintxtFld.setValue(oPOItemsTable.getModel().getProperty("/Rowset/Row/"+poTablindex+"/Storage_Bin"));
                //dStrgBintxtFld.setValue(oPOItemsModel.getProperty("/Rowset/Row/Storage_Bin"));

                var dGTIN = new sap.m.Label({
                    text: "GTIN"
                });
                var dVariant = new sap.m.Label({
                    text: "Variant"
                });

                dGTINtxtFld = new sap.m.Input();
                dGTINtxtFld.setValue(oGtinModel.getProperty("/Rowset/Row/EAN11"));

                dStrgUnitTypetxtFld = new sap.m.Input({}); /***********need inputs *******/

                dVarianttxtFld = new sap.m.Input();
                dVarianttxtFld.setValue(oGtinModel.getProperty("/Rowset/Row/GTIN_VARIANT"));

                dItemTxtFld = new sap.m.Input();


                dProdcsnDate = new sap.m.DatePicker({
                    type: "DateTime",
                    valueFormat: "MM/dd/yyyy",
                    displayFormat: oDisplayFormat,
                    value: DateNowFormat,
                    change: oControllerIMR.prodDtChng
                });

                var prDat = dProdcsnDate.getValue();
                var pdtFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
                    pattern: "MM/dd/yyyy HH:mm:ss"
                });
                var prodcsnDt = pdtFrmt.format(new Date(prDat));



                var oMatTypeDescModel = new sap.ui.model.xml.XMLModel();
                oMatTypeDescModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/SQL_GetMaterialType_Desc&Param.1=" + Client + "&Param.2=" + matrl + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                var oMatTypeModel = new sap.ui.model.xml.XMLModel();
                oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/SQL_GetMaterialType&Param.1=" + Client + "&Param.2=" + matrl + "&Param.3=" + oLanguage + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                var matTyp = oMatTypeDescModel.getProperty("/Rowset/Row/MTART");
                MatDescription = oMatTypeModel.getProperty("/Rowset/Row/MAKTX");
                NonBatchManagedFlag = oMatTypeDescModel.getProperty('/Rowset/Row/XCHPF');

                var matDesc = matrl.replace("0000000000", "") + " " + oMatTypeModel.getProperty("/Rowset/Row/MAKTX");



                if (oMatTypeModel.getProperty("/Rowset/Row/MAKTX") == "") {
                    var oMatTypeModel_EN = new sap.ui.model.xml.XMLModel();
                    oMatTypeModel_EN.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/SQL_GetMaterialType&Param.1=" + Client + "&Param.2=" + matrl + "&Param.3=EN&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                    var matDesc = matrl.replace("0000000000", "") + " " + oMatTypeModel_EN.getProperty("/Rowset/Row/MAKTX");
                    MatDescription = oMatTypeModel_EN.getProperty("/Rowset/Row/MAKTX");
                }
                dMaterialtxtFld.setValue(matDesc);



                dExpryDate = new sap.m.DatePicker({

                    type: "DateTime",
                    valueFormat: "MM/dd/yyyy",
                    displayFormat: oDisplayFormat,
                    editable: false
                });


                dExpryDate.setLayoutData(new sap.ui.layout.GridData({
                    span: "L4 M4 S12"
                }));
                var oExpiryDtModel = new sap.ui.model.xml.XMLModel();

                oExpiryDtModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetShelfLifeDate_ExpiryDate&Param.1=" + Plant + "&Param.2=" + Client + "&Param.3=" + matrl + "&Param.4=" + matTyp + "&Param.5=" + prodcsnDt + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                oExpiryValue = oExpiryDtModel.getProperty("/Rowset/Row/O_ExpiryDate");

                var expFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
                    pattern: "MM/dd/yyyy"
                });

                expirydateDt = expFrmt.format(new Date(oExpiryValue));



                dExpryDate.setValue(expirydateDt);



                dPostngDate = new sap.m.DatePicker({
                    type: "DateTime",
                    valueFormat: "MM/dd/yyyy HH:mm:ss",
                    displayFormat: oDisplayFormat,
                    value: DateNowFormat
                });



                dSSCCtxtFld = new sap.m.Input({
                    change: function() {
                        if (dSSCCtxtFld.getValue() == "") {
                            dStrgTypetxtFld.setEnabled(true);
                            dStrgBintxtFld.setEnabled(true);
                        } else {

                            dStrgTypetxtFld.setEnabled(false);
                            dStrgTypetxtFld.setValue("");
                            dStrgBintxtFld.setEnabled(false);
                            dStrgBintxtFld.setValue("");
                        }
                    }
                });
                dSSCCtxtFld.setLayoutData(new sap.ui.layout.GridData({
                    span: "L5M5 S12"
                }));

                dAutoGnrtdCB = new sap.m.CheckBox({
                    select: oControllerIMR.autoGenrtdChckBoxSelect
                });
                dAutoGnrtdCB.setLayoutData(new sap.ui.layout.GridData({
                    span: "L1 M1 S12"
                }));

                dAutoGnrtdExpiryDt = new sap.m.CheckBox({
                    select: oControllerIMR.autoGenrtdChckBoxSelectSLED
                });
                dAutoGnrtdExpiryDt.setLayoutData(new sap.ui.layout.GridData({
                    span: "L1 M1 S12"
                }));


                var dAGSSCC = new sap.m.Input({
                    value: "Auto Generate",
                    editable: false
                });
                dAGSSCC.setLayoutData(new sap.ui.layout.GridData({
                    span: "L3 M3 S12"
                }));

                dMExpiryDate = new sap.m.Input({
                    value: "Manual Entry",
                    editable: false
                });
                dMExpiryDate.setLayoutData(new sap.ui.layout.GridData({
                    span: "L3 M3 S12"
                }));



                dBatchNotxtFld = new sap.m.Input({
                    maxLength: 10,

                    liveChange: function(event) {
                        this.setValue(event.getParameter("value").toUpperCase());
                    }
                });
                dBatchNotxtFld.setVisible(false);
                var oBatchListModel = new sap.ui.model.xml.XMLModel();
                oBatchListModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDO_GetReceiptBatchList&Param.1=" + ordrNum + "&Param.2=" + matrl + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                dBatchNotxtFld1 = new sap.m.ComboBox({
                    width: '100%',
                    change: function() {
                        dBatchNotxtFld1.setValue(dBatchNotxtFld1.getValue().toUpperCase());
                        var inputbatch = dBatchNotxtFld1.getValue().toUpperCase();

                        if (inputbatch.length > 10) {
                            dBatchNotxtFld1.setValueState(sap.ui.core.ValueState.Error);




                            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "IMR_BLS_MSG_BATCH_LIMIT"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
                        }

                    },
                    selectionChange: oControllerIMR.batchSelectionChange
                });
                var BatchlistItem = new sap.ui.core.ListItem();
                BatchlistItem.bindProperty("text", "Batch");
                BatchlistItem.bindProperty("key", "Batch");
                dBatchNotxtFld1.bindItems("/Rowset/Row", BatchlistItem);
                dBatchNotxtFld1.setModel(oBatchListModel);
                dBatchNotxtFld1.setVisible(true);



                dBatchNotxtFld.setLayoutData(new sap.ui.layout.GridData({
                    span: "L4 M4 S12"
                }));
                dBatchNotxtFld1.setLayoutData(new sap.ui.layout.GridData({
                    span: "L4 M4 S12"
                }));


                dAutoGnrtdBatchCB = new sap.m.CheckBox({
                    select: oControllerIMR.autoGenrtdBatchChckSelect
                });
                dAutoGnrtdBatchCB.setLayoutData(new sap.ui.layout.GridData({
                    span: "L1 M1 S12"
                }));

                dAGBtch = new sap.m.Input({
                    value: getPropertyValue(oResourceModel, "IMR_CONTR_AUTO_GENERATE"),
                    editable: false
                });
                dAGBtch.setLayoutData(new sap.ui.layout.GridData({
                    span: "L4 M4 S12"
                }));
                //////////////////////////////////////////////////Batch Managed Flag To set Batch field enabled or disabled////////////////////////////////////////
                if (NonBatchManagedFlag != "X") {

                    dBatchNotxtFld1.setEnabled(false);
                    dAutoGnrtdBatchCB.setEnabled(false);

                    dExpryDate.setEnabled(false);
                    dExpryDate.setValue("");
                    dMExpiryDate.setVisible(false);
                    dAutoGnrtdExpiryDt.setVisible(false);


                }
                /////////////////////////////////////////////////////////////End////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                dQtytxtFld = new sap.m.Input({



                    liveChange: function(oEvent) {
                        var control = oEvent.getSource();
                        var sVal = oEvent.getParameter("newValue"); //2,3
                        var sample = 1.2;
                        var decimalSymbol = sample.toLocaleString().substring(1, 2); /// dot

                        if (sVal == "" || sVal == "undefined" || sVal == undefined) {
                            control.setValue("");
                        } else {

                            var lVal = sVal.replace(decimalSymbol, "."); //2.3

                            if (!isNaN(lVal)) {
                                if (lVal.indexOf(".") >= 0 && sVal.indexOf(decimalSymbol) == -1) {
                                    sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_27"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
                                    control.setValue("");
                                    return;
                                }
                            } else {
                                sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "CustomGR_alert_27"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
                                control.setValue("");
                                return;
                            }
                        }
                    }


                });


                dQtytxtFld.setLayoutData(new sap.ui.layout.GridData({
                    span: "L3 M3 S12"
                }));
                dQtytxtFld.setValue("");
                //dQtytxtFld.setValue(oPOItemsModel.getProperty("/Rowset/Row/Quantity"));

                dQtyUom = new sap.m.Input({
                    editable: false
                });
                dQtyUom.setLayoutData(new sap.ui.layout.GridData({
                    span: "L2 M2 S12"
                }));
                dQtyUom.setValue(oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/UOM"));
                //dQtyUom.setValue(oPOItemsModel.getProperty("/Rowset/Row/UOM"));

                dOriginWttxtFld1 = new sap.m.Input();
                dOriginWttxtFld1.setLayoutData(new sap.ui.layout.GridData({
                    span: "L4 M4 S12"
                }));
                dOriginWttxtFld1.setValue(oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/NetWeight"));
                //dOriginWttxtFld1.setValue(oPOItemsModel.getProperty("/Rowset/Row/NetWeight"));

                dOriginuom = new sap.m.Input({
                    value: "UOM",
                    editable: false
                });
                dOriginuom.setLayoutData(new sap.ui.layout.GridData({
                    span: "L2 M2 S12"
                }));

                dOriginWttxtFld2 = new sap.m.Input();
                dOriginWttxtFld2.setLayoutData(new sap.ui.layout.GridData({
                    span: "L3 M3 S12"
                }));
                dOriginWttxtFld2.setValue(oPOItemsTable.getModel().getProperty("/Rowset/Row/" + poTablindex + "/WeightUOM"));
                //dOriginWttxtFld2.setValue(oPOItemsModel.getProperty("/Rowset/Row/WeightUOM"));


                dFinalDelvryCB = new sap.m.CheckBox({});
                dFinalDelvryCB.setLayoutData(new sap.ui.layout.GridData({
                    span: "L1 M1 S1"
                }));
                dStkTypeSelect = new sap.m.Select({});
                var oStckTypeModel = new sap.ui.model.xml.XMLModel();
                oStckTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetStockTypeValues&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                var oStockTypListItem = new sap.ui.core.ListItem();
                oStockTypListItem.bindProperty("text", "StockType");
                oStockTypListItem.bindProperty("key", "StockType");
                dStkTypeSelect.bindItems("/Rowset/Row", oStockTypListItem);
                dStkTypeSelect.setModel(oStckTypeModel);

                printerNameSelection = new sap.m.Select({
                    change: function() {
                        var preNoCpies = printerNameSelection.getSelectedKey().split("---")[2];
                        noOfCopiesInput.setValue(preNoCpies);

                        if (preNoCpies == "") {
                            noOfCopiesInput.setEnabled(false);
                        } else {
                            noOfCopiesInput.setEnabled(true);
                        }
                    }
                });
                printerNameSelection.setVisible(false);
                var dateRefresh = new Date();
                var nodeFromUrl = getURLParameter("nodeId");


                noOfCopiesInput = new sap.m.Input({
                    liveChange: function() {

                        var noOfCopies = noOfCopiesInput.getValue();

                        if (noOfCopies != "") {
                            if (noOfCopies > 0 && !isNaN(noOfCopies) && parseInt(Number(noOfCopies)) == noOfCopies && !isNaN(parseInt(noOfCopies, 10))) {} else {
                                noOfCopiesInput.setValue("");
                                jQuery.sap.require("sap.ui.commons.MessageBox");
                                sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "TransferDisplay_Message"));
                            }
                        }
                    }
                });
                noOfCopiesInput.setVisible(false);

                //dPrintrSelect=new sap.m.Select({});

                var oOrdrDetLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
                    labelSpanL: 3,
                    labelSpanM: 2,
                    labelSpanS: 2,
                    emptySpanL: 0,
                    emptySpanM: 0,
                    emptySpanS: 0,
                    columnsL: 3,
                    columnsM: 3,
                    //breakpointL: 1500,
                    //breakpointM: 400
                });

                var oOrderFormLabels = new sap.ui.layout.form.Form({
                    layout: oOrdrDetLayoutLabels,
                    editable: true,
                    formContainers: [

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_NO"),
                                    fields: [dOrderNotxtFld]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_ITEM"),
                                    fields: [dOrderItemtxtFld]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: getPropertyValue(oResourceModel, "NPM_COMMON_ORD_MATERIAL"),
                                    fields: [dMaterialtxtFld]
                                })
                            ]
                        })
                    ]
                });
                //2


                var oLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
                    labelSpanL: 3,
                    labelSpanM: 3,
                    labelSpanS: 3,
                    emptySpanL: 0,
                    emptySpanM: 0,
                    emptySpanS: 0,
                    columnsL: 3,
                    columnsM: 3,
                    //breakpointL: 1500,
                    //breakpointM: 400
                });

                var oFormLabels = new sap.ui.layout.form.Form({
                    layout: oLayoutLabels,
                    editable: true,
                    formContainers: [


                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dSSCC,
                                    fields: [dSSCCtxtFld, dAutoGnrtdCB, dAGSSCC]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dBatchNo,
                                    fields: [dBatchNotxtFld, dBatchNotxtFld1, dAutoGnrtdBatchCB, dAGBtch]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dVendorBatch,
                                    fields: [dVendorBatchtxtFld]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dProdDt,
                                    fields: [dProdcsnDate]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dExpryDt,
                                    fields: [dExpryDate, dAutoGnrtdExpiryDt, dMExpiryDate]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dStrgType,
                                    fields: [dStrgTypetxtFld]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dSLOC,
                                    fields: [dSLOCtxtFld]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dWarehouse,
                                    fields: [dWarehousetxtFld]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dStrgBin,
                                    fields: [dStrgBintxtFld]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dQty,
                                    fields: [dQtytxtFld, dQtyUom]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dOriginWt,
                                    fields: [dOriginWttxtFld1, dOriginuom, dOriginWttxtFld2]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dStockType,
                                    fields: [dStkTypeSelect]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dPostngDt,
                                    fields: [dPostngDate]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dGTIN,
                                    fields: [dGTINtxtFld]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dVariant,
                                    fields: [dVarianttxtFld]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dFinalDelvry,
                                    fields: [dFinalDelvryCB]
                                })
                            ]
                        }),

                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: dItemTxt,
                                    fields: [dItemTxtFld]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: delNoteLabel,
                                    fields: [delNoteInptFld]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: printerNameLbl,
                                    fields: [printerNameSelection]
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormContainer({
                            formElements: [
                                new sap.ui.layout.form.FormElement({
                                    label: noOfCopies,
                                    fields: [noOfCopiesInput]
                                })
                            ]
                        })



                    ]
                });

                okBtn = new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_OK"),
                    press: oControllerIMR.okDialogFn
                });

                okRptBtn = new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_OK_REPEAT"),
                    press: oControllerIMR.okNReptDialogFn
                });

                oDialog1 = new sap.m.Dialog({
                    title: getPropertyValue(oResourceModel, "IMR_CONTR_PURCHASE_ORD_RECEIPT"),
                    content: [oOrderFormLabels, oFormLabels],
                    buttons: [
                        okBtn,
                        okRptBtn,
                        new sap.m.Button({
                            text: getPropertyValue(oResourceModel, "NPM_COMMON_CANCEL"),
                            press: function() {
                                oInboundMatReceiptTable.setSelectedIndex(-1);
                                oPOItemsTable.setVisible(false);
                                oDialog1.destroy();

                            }
                        })
                    ],

                });

                oDialog1.setContentWidth("1620px");
                oDialog1.setContentHeight("600px");
                oDialog1.open();
            }
        }

    },
    batchSelectionChange: function() {

        var batchNo = dBatchNotxtFld1.getSelectedKey();

        if (batchNo != "") {

            var dateNw = new Date();
            var oBatchModel = new sap.ui.model.xml.XMLModel();
            oBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDOQ_GetSLED&Param.1=" + ordrNum + "&Param.2=" + matrl + "&Param.3=" + batchNo + "&d=" + dateNw + "&Content-Type=text/xml"), "", false);
            var sled = oBatchModel.getProperty("/Rowset/Row/SLED");

            var expFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MM/dd/yyyy"
            });
            expirydateDt = expFrmt.format(new Date(sled));

            dExpryDate.setValue(expirydateDt);
            dExpryDate.setEnabled(false);
            dMExpiryDate.setVisible(false);
            dAutoGnrtdExpiryDt.setVisible(false);

        } else {

            dExpryDate.setEnabled(true);
            dMExpiryDate.setVisible(true);
            dAutoGnrtdExpiryDt.setVisible(true);
            oControllerIMR.updateSled();
        }
    },

    WHOnTheBasisOfSLOC: function() {
        var dateNw = new Date();
        var wareNoDDType = "WAREHOUSENO";
        var storageLocation = dSLOCtxtFld.getSelectedKey();
        var oWareNoModel = new sap.ui.model.xml.XMLModel();
        oWareNoModel.setSizeLimit(10000);
        oWareNoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + wareNoDDType + "&Param.2=" + storageLocation + "&d=" + dateNw + "&Content-Type=text/xml"), "", false);
        var warehuseNo = oWareNoModel.getProperty("/Rowset/Row/Key");
        dWarehousetxtFld.setValue(warehuseNo);

    },

    handleEndDateChange: function(oEvent) {

        this.getView().byId("InboundMatReceiptTable").setVisible(false);
        this.getView().byId("POItemDetailsTable").setVisible(false);



        var reportStartDate = this.getView().byId("StartDate").getDateValue();
        var reportEndDate = this.getView().byId("EndDate").getDateValue();

        var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy HH:mm:ss"
        });

        var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy 00:00:00"
        });
        var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy 23:59:59"
        });

        var stDate = strtdateFormat.format(new Date(reportStartDate));
        var endDate = enddateFormat.format(new Date(reportEndDate));

        var DateNow = dateFormat.format(new Date());

        if (new Date(reportStartDate).getTime() > new Date(reportEndDate).getTime()) {
            sap.ui.commons.MessageBox.alert("End Date should be greater than Start Date.");
        }



    },

    handleStartDateChange: function(oEvent) {
        this.getView().byId("InboundMatReceiptTable").setVisible(false);
        this.getView().byId("POItemDetailsTable").setVisible(false);


        var reportStartDate = this.getView().byId("StartDate").getDateValue();
        var reportEndDate = this.getView().byId("EndDate").getDateValue();

        var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy HH:mm:ss"
        });

        var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy 00:00:00"
        });
        var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy 23:59:59"
        });

        var stDate = strtdateFormat.format(new Date(reportStartDate));
        var endDate = enddateFormat.format(new Date(reportEndDate));

        var DateNow = dateFormat.format(new Date());

        if (new Date(reportStartDate).getTime() > new Date(reportEndDate).getTime()) {
            sap.ui.commons.MessageBox.alert("Start Date should be less than End Date");
        }

    },

    autoGenrtdChckBoxSelect: function(event) {

        var gOrdrNo = dOrderNotxtFld.getValue();

        if (dAutoGnrtdCB.getSelected() == true) {
            dStrgTypetxtFld.setEnabled(false);
            dStrgTypetxtFld.setValue("");
            dStrgBintxtFld.setEnabled(false);
            dStrgBintxtFld.setValue("");
            var dateNw = new Date();
            var oPrinterModel = new sap.ui.model.xml.XMLModel();
            oPrinterModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/PrinterManagementFramework/QueryTemplates/XACQ_Get_PrinterName_LabelType&Param.1=MR&Param.2=" + Client + "&Param.3=" + matrl + "&d=" + dateNw + "&Content-Type=text/xml"), "", false);

            var oPrinterListItem = new sap.ui.core.ListItem();
            oPrinterListItem.bindProperty("text", "VALUE");
            oPrinterListItem.bindProperty("key", "KEY");
            printerNameSelection.bindItems("/Rowset/Row", oPrinterListItem);
            printerNameSelection.setModel(oPrinterModel);
            printerNameSelection.setSelectedKey(oPrinterModel.getProperty("/Rowset/Row/0/KEY"));

            printerNameSelection.setVisible(true);
            noOfCopiesInput.setVisible(true);
            printerNameLbl.setVisible(true);
            noOfCopies.setVisible(true);
            var preNoCpies = printerNameSelection.getSelectedKey().split("---")[2];
            noOfCopiesInput.setValue(preNoCpies);

            if (preNoCpies == "") {
                noOfCopiesInput.setEnabled(false);
            } else {
                noOfCopiesInput.setEnabled(true);
            }

            var oAutoGenrtSSCCModel = new sap.ui.model.xml.XMLModel();
            oAutoGenrtSSCCModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GenerateSSCCNumberBCP&Param.1=" + Plant + "&d=" + dateNw + "&Content-Type=text/xml"), "", false);

            var statusSSCC = oAutoGenrtSSCCModel.getProperty("/Rowset/Row/ErrorMessage");

            if (statusSSCC != "") {
                var errorMesg = oAutoGenrtSSCCModel.getProperty("/Rowset/Row/ErrorMessage");
                sap.ui.commons.MessageBox.alert(errorMesg, sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                dSSCCtxtFld.setEditable(true);
                dAutoGnrtdCB.setSelected(false);
            } else {
                var ssccNum = oAutoGenrtSSCCModel.getProperty("/Rowset/Row/SSCCNumber");

                dSSCCtxtFld.setValue(ssccNum);
                dSSCCtxtFld.setEditable(false);
            }
        } else {
            dStrgTypetxtFld.setEnabled(true);
            dStrgBintxtFld.setEnabled(true);
            dSSCCtxtFld.setValue("");
            dSSCCtxtFld.setEditable(true);
            printerNameSelection.setVisible(false);
            noOfCopiesInput.setVisible(false);
            printerNameLbl.setVisible(false);
            noOfCopies.setVisible(false);
            printerNameSelection.setModel(new sap.ui.model.xml.XMLModel());
            noOfCopiesInput.setValue("");
        }

    },

    autoGenrtdChckBoxSelectSLED: function(event) {

        if (dAutoGnrtdExpiryDt.getSelected() == true) {
            dExpryDate.setValue("");
            dExpryDate.setEditable(true);
        } else {
            dExpryDate.setValue(expirydateDt);
            dExpryDate.setEditable(false);
        }
    },


    autoGenrtdBatchChckSelect: function(event) {



        var gOrdrNo = dOrderNotxtFld.getValue();
        var dateNw = new Date();

        var gPrdnDate = dProdcsnDate.getDateValue();
        var prDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "yyyy-MM-dd"
        });
        var iPrdDate = prDateFormat.format(new Date(gPrdnDate));

        var oMatTypeModel = new sap.ui.model.xml.XMLModel();
        oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/SQL_GetMaterialType_Desc&Param.1=" + Client + "&Param.2=" + matrl + "&d=" + dateNw + "&Content-Type=text/xml"), "", false);

        var matTyp = oMatTypeModel.getProperty("/Rowset/Row/MTART");

        if (dAutoGnrtdBatchCB.getSelected() == true) {
            oControllerIMR.updateSled();
            dExpryDate.setEnabled(true);
            dMExpiryDate.setVisible(true);
            dAutoGnrtdExpiryDt.setVisible(true);
            dBatchNotxtFld1.setVisible(false);
            dBatchNotxtFld.setVisible(true);
            var InputXMLInStringFormat = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><BatchDetailsInput><materialNumber>" + matrl + "</materialNumber><plant>" + Plant + "</plant><client>" + Client + "</client><materialType>" + matTyp + "</materialType><productionDate>" + iPrdDate + "</productionDate></BatchDetailsInput>"

            var InputXML = jQuery.parseXML(InputXMLInStringFormat);
            var oAutoGenrtBatchModel = new sap.ui.model.xml.XMLModel();
            oAutoGenrtBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/GR/QueryTemplates/XACQ_ToGenerateBatch&Param.1=" + InputXMLInStringFormat + "&d=" + dateNw + "&Content-Type=text/xml"), "", false);

            if (oAutoGenrtBatchModel.getProperty("/status") == "E") {
                var errorMsg = oAutoGenrtBatchModel.getProperty("/message");
                sap.ui.commons.MessageBox.alert(errorMsg, sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                dBatchNotxtFld.setEditable(true);
                //dAutoGnrtdBatchCB.setSelected(false);
            } else {
                dBatchNotxtFld.setValue(oAutoGenrtBatchModel.getProperty("/batchNumber"));
                dBatchNotxtFld.setEditable(false);
            }
        } else {
            dBatchNotxtFld.setVisible(false);
            dBatchNotxtFld1.setVisible(true);
            dBatchNotxtFld.setValue("");
            dBatchNotxtFld.setEditable(true);
            dBatchNotxtFld1.setValue("");
            dBatchNotxtFld1.setSelectedKey("");
        }

    },

    prodDtChng: function(event) {
        //alert(dMExpiryDate.getVisible());
        if (dMExpiryDate.getVisible() == true) {
            //var matNmbr = dMaterialtxtFld.getValue();
            var DateNw = new Date();
            var prDat = dProdcsnDate.getValue();
            var pdtFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MM/dd/yyyy HH:mm:ss"
            });
            var pdsnDt = pdtFrmt.format(new Date(prDat));

            var oMatTypeModel = new sap.ui.model.xml.XMLModel();
            oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/SQL_GetMaterialType_Desc&Param.1=" + Client + "&Param.2=" + matrl + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

            var matTyp = oMatTypeModel.getProperty("/Rowset/Row/MTART");

            var oExpiryDtModel = new sap.ui.model.xml.XMLModel();
            oExpiryDtModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetShelfLifeDate_ExpiryDate&Param.1=" + Plant + "&Param.2=" + Client + "&Param.3=" + matrl + "&Param.4=" + matTyp + "&Param.5=" + pdsnDt + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

            //dExpryDate.setValue(oExpiryDtModel.getProperty("/Rowset/Row/O_ExpiryDate"));
            oExpiryValue = oExpiryDtModel.getProperty("/Rowset/Row/O_ExpiryDate");
            expFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "MM/dd/yyyy"
            });
            expirydateDt = expFrmt.format(new Date(oExpiryValue));

            if (NonBatchManagedFlag != "X") {


                dExpryDate.setValue("");
                dAutoGnrtdExpiryDt.setEnabled(false);


            } else {
                dExpryDate.setValue(expirydateDt);
            }
        }
    },
    updateSled: function() {
        var DateNw = new Date();
        var prDat = dProdcsnDate.getValue();
        var pdtFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy HH:mm:ss"
        });
        var pdsnDt = pdtFrmt.format(new Date(prDat));

        var oMatTypeModel = new sap.ui.model.xml.XMLModel();
        oMatTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/SQL_GetMaterialType_Desc&Param.1=" + Client + "&Param.2=" + matrl + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

        var matTyp = oMatTypeModel.getProperty("/Rowset/Row/MTART");


        var oExpiryDtModel = new sap.ui.model.xml.XMLModel();
        oExpiryDtModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_GetShelfLifeDate_ExpiryDate&Param.1=" + Plant + "&Param.2=" + Client + "&Param.3=" + matrl + "&Param.4=" + matTyp + "&Param.5=" + pdsnDt + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

        //dExpryDate.setValue(oExpiryDtModel.getProperty("/Rowset/Row/O_ExpiryDate"));
        oExpiryValue = oExpiryDtModel.getProperty("/Rowset/Row/O_ExpiryDate");
        expFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy"
        });
        expirydateDt = expFrmt.format(new Date(oExpiryValue));
        dExpryDate.setValue(expirydateDt);

    },

    clickLastHour: function(event) {
        this.getView().byId("InboundMatReceiptTable").setVisible(false);
        this.getView().byId("POItemDetailsTable").setVisible(false);

        var today = new Date();
        var dd = (today.getDate());
        if (dd < 10) {
            dd = "0" + dd;
        }
        var MM = (today.getMonth() + 1);
        if (MM < 10) {
            MM = "0" + MM;
        }
        var yyyy = today.getFullYear();

        var hours = (today.getHours());
        if (hours < 10) {
            hours = "0" + hours;
        }
        var min = (today.getMinutes());
        if (min < 10) {
            min = "0" + min;
        }
        var sec = (today.getSeconds());
        if (sec < 10) {
            sec = "0" + sec;
        }

        var lasHr = hours - 1;
        if (lasHr < 10) {
            lasHr = "0" + lasHr;
        }

        var endDt = MM + '/' + dd + '/' + yyyy + " " + hours + ":" + min;
        this.getView().byId("EndDate").setValue(endDt);

        var stDt = MM + '/' + dd + '/' + yyyy + " " + lasHr + ":" + min;
        this.getView().byId("StartDate").setValue(stDt);

    },

    clickToday: function(event) {
        this.getView().byId("InboundMatReceiptTable").setVisible(false);
        this.getView().byId("POItemDetailsTable").setVisible(false);

        var today = new Date();
        var dd = (today.getDate());
        if (dd < 10) {
            dd = "0" + dd;
        }
        var MM = (today.getMonth() + 1);
        if (MM < 10) {
            MM = "0" + MM;
        }
        var yyyy = today.getFullYear();

        var hours = (today.getHours());
        if (hours < 10) {
            hours = "0" + hours;
        }
        var min = (today.getMinutes());
        if (min < 10) {
            min = "0" + min;
        }
        var sec = (today.getSeconds());
        if (sec < 10) {
            sec = "0" + sec;
        }


        var endDt = MM + '/' + dd + '/' + yyyy + " " + hours + ":" + min;
        this.getView().byId("EndDate").setValue(endDt);

        var stDt = MM + '/' + dd + '/' + yyyy + " " + "00:00";
        this.getView().byId("StartDate").setValue(stDt);

    },

    clickYesterday: function(event) {
        this.getView().byId("InboundMatReceiptTable").setVisible(false);
        this.getView().byId("POItemDetailsTable").setVisible(false);

        var curntDate = new Date();
        var pastDate = new Date(curntDate.getFullYear(), curntDate.getMonth(), curntDate.getDate() - 1)

        this.getView().byId("StartDate").setDateValue(pastDate);
        this.getView().byId("EndDate").setDateValue(curntDate);

    },

    clickThisWeek: function(event) {
        this.getView().byId("InboundMatReceiptTable").setVisible(false);
        this.getView().byId("POItemDetailsTable").setVisible(false);

        var curntDate = new Date();
        var pastDate = new Date(curntDate.getFullYear(), curntDate.getMonth(), curntDate.getDate() - 6)

        this.getView().byId("StartDate").setDateValue(pastDate);
        this.getView().byId("EndDate").setDateValue(curntDate);
    },


    doRefreshFn: function(event) {
        this.getView().byId("POItemDetailsTable").setVisible(false);
        this.getView().byId("InboundMatReceiptTable").setVisible(true);

        var PurchaseOrder = this.getView().byId("PurchaseOrder").getValue();
        if (PurchaseOrder == "") {
            PurchaseOrder = "%";
        } else {
            PurchaseOrder = "%" + PurchaseOrder.replace(/[*]/g, "%") + "%";
        }


        var Vendor = this.getView().byId("Vendor").getValue();
        if (Vendor == "") {
            Vendor = "%";
        } else {
            Vendor = "%" + Vendor.replace(/[*]/g, "%") + "%";
        }

        var reportStartDate = this.getView().byId("StartDate").getDateValue();
        var reportEndDate = this.getView().byId("EndDate").getDateValue();

        var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy 00:00:00"
        });
        var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy HH:mm:ss"
        });

        var stDate = strtdateFormat.format(new Date(reportStartDate));
        var endDate = enddateFormat.format(new Date(reportEndDate));
        var DateNw = new Date();
        oInboundMatReceiptModel = new sap.ui.model.xml.XMLModel();
        oInboundMatReceiptModel.setSizeLimit(10000);
        oInboundMatReceiptModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDO_GetRefreshFnDetails&StartDate=" + stDate + "&EndDate=" + endDate + "&Param.1=" + PurchaseOrder + "&Param.2=" + Vendor + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

        Client = oInboundMatReceiptModel.getProperty("/Rowset/Row/Client");
        oInboundMatReceiptTable.setModel(oInboundMatReceiptModel);
        oInboundMatReceiptTable.bindRows("/Rowset/Row");
    },


    okDialogFn: function(event) {
        var printerId = "";
        var noOfCopies = "";




        var oOrdNombr = dOrderNotxtFld.getValue();
        var oOrdItm = dOrderItemtxtFld.getValue();

        var ssccCBFlag;
        var oSsccNum = dSSCCtxtFld.getValue();

        oSsccNum = scanssccno(oSsccNum);

        var oText = dItemTxtFld.getValue();


        var oVndrNum = dVendorBatchtxtFld.getValue();
        //var oNumOfLbl = dNoOfLablstxtFld.getValue();
        var oStrgTypval = dStrgTypetxtFld.getValue();
        var oWarhse = dWarehousetxtFld.getValue();

        if (sloc_flag == 1) {
            var oSLocVal = dSLOCtxtFld.getSelectedKey();
        } else {
            var oSLocVal = dSLOCtxtFld.getValue();
        }
        var oStrgbnval = dStrgBintxtFld.getValue();

        var oQtyval = dQtytxtFld.getValue();
        oQtyval = formatQuantity(oQtyval, "PARSE");
        var oQtyuom = dQtyUom.getValue();

        var oOrgnwt1val = dOriginWttxtFld1.getValue();
        var oOrgnwt2val = dOriginWttxtFld2.getValue();
        //alert(oOrgnwt2val);
        var oGtinval = dGTINtxtFld.getValue();
        var oStrgUnttyp = "902";
        var oVarintval = dVarianttxtFld.getValue();
        var oItmval = dItemTxtFld.getValue();

        var oFindlvry = dFinalDelvryCB.getSelected();
        var delNote = delNoteInptFld.getValue();

        //var oStktyp = dStkTypeSelect.getSelectedItem();
        var oStktyp = dStkTypeSelect.getSelectedKey();
        //var oPrntrsel = dPrintrSelect.getSelectedItem();

        var prDat = dProdcsnDate.getDateValue();
        var pdtFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy HH:mm:ss"
        });
        var oPrddt = pdtFrmt.format(new Date(prDat));
        var pdtFrmt1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "yyyyMMdd"
        });
        var oPrddt1 = pdtFrmt1.format(new Date(prDat));

        var xpdt = dExpryDate.getDateValue();
        var oExpdt = pdtFrmt.format(new Date(xpdt));
        var oExpdt1 = pdtFrmt1.format(new Date(xpdt));


        var pstdt = dPostngDate.getDateValue();
        var oPstngdt = pdtFrmt.format(new Date(pstdt));



        if (dAutoGnrtdCB.getSelected() == true) {

            printerId = printerNameSelection.getSelectedKey().split("---")[0];
            noOfCopies = noOfCopiesInput.getValue();

        } else {
            printerId = "";
            noOfCopies = "";
        }
        if (dAutoGnrtdBatchCB.getSelected() == true) {
            oSelectedBatch = dBatchNotxtFld.getValue();
        } else {
            if (NonBatchManagedFlag != "X") {
                oSelectedBatch = "null";
                oExpdt = "";

            } else {
                oSelectedBatch = dBatchNotxtFld1.getValue();
            }
        }




        if (oWarhse == "" || (oSLocVal == "" || oSLocVal=="---")  || oQtyval == "" || isNaN(oQtyval)) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MANDAT_FIELD"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if (oSsccNum == "" && (oStrgTypval == "" || oStrgbnval == "")) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NP_PortalSTypeSBinBlank"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if ((xpdt == "" || xpdt == null) && NonBatchManagedFlag == "X") {

            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MANDAT_SLED"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if ((oPrddt1 == oExpdt1 || oPrddt1 > oExpdt1) && NonBatchManagedFlag == "X") {

            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_EXPIRYDATE"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if (printerId == "" && dAutoGnrtdCB.getSelected() == true) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if (noOfCopies == "" && printerId != "No Print" && dAutoGnrtdCB.getSelected() == true) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else {

            if (dAutoGnrtdCB.getSelected() == true) {
                ssccCBFlag = 1;
            } else {
                ssccCBFlag = 0;
            }


            var msg = "";
            var agFlag = dAutoGnrtdCB.getSelected();
            var actionFlag = false;
            var postingFlag = true;

            if (oStrgTypval != "") {
                var oSTypeModel = new sap.ui.model.xml.XMLModel();
                oSTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDOQ_CheckSTypeExistance&Param.1=" + oStrgTypval + "&Content-Type=text/xml"), " ", false);
                var storageUnit = oSTypeModel.getProperty("/Rowset/Row/STOR_UNIT");

                if (storageUnit == "") {
                    msg = agFlag ? getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_SU_STYPE_CNF") : getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_NONSU_STYPE_CNF");
                    actionFlag = true;
                } else if (storageUnit == "null" && agFlag == true) {
                    postingFlag = false;
                    sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_NONSU_MANAGED_STYPE"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));

                } else if (storageUnit != "null" && agFlag == false) {
                    postingFlag = false;
                    sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_SU_MANAGED_STYPE"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));

                } else {


                }
            }

            inputXMLinStringFormat2 = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<MaterialReceipt><I_Batch>" + oSelectedBatch + "</I_Batch>" + "<I_ButtonType>ok</I_ButtonType>" + "<I_Copies>" + noOfCopies + "</I_Copies>" + "<I_DeliveryNote>" + delNote + "</I_DeliveryNote>" + "<I_ExpiryDate>" + oExpdt + "</I_ExpiryDate>" + "<I_FinalDelivery>" + oFindlvry + "</I_FinalDelivery>" + "<I_GTIN>" + oGtinval + "</I_GTIN>" + "<I_GTINVariant>" + oVarintval + "</I_GTINVariant>" + "<I_MatDesc>" + encodeURIComponent(matrlDesc) + "</I_MatDesc>" + "<I_Material>" + matrl + "</I_Material>" + "<I_OrderItemNumber>" + oOrdItm + "</I_OrderItemNumber>" + "<I_OrderNumber>" + oOrdNombr + "</I_OrderNumber>" + "<I_OriginWeight>" + oOrgnwt1val + "</I_OriginWeight>" + "<I_Plant>" + Plant + "</I_Plant>" + "<I_PostingDate>" + oPstngdt + "</I_PostingDate>" + "<I_PrinterID>" + printerId + "</I_PrinterID>" + "<I_ProductionDate>" + oPrddt + "</I_ProductionDate>" + "<I_Quantity>" + oQtyval + "</I_Quantity>" + "<I_SLED>365</I_SLED>" + "<I_SSCC>" + oSsccNum + "</I_SSCC>" + "<I_SSCCFlag>" + ssccCBFlag + "</I_SSCCFlag>" +
                "<I_StockCategory>" + oStktyp + "</I_StockCategory>" + "<I_StorageBin>" + encodeURIComponent(oStrgbnval) + "</I_StorageBin>" + "<I_StorageLocation>" + oSLocVal + "</I_StorageLocation>" + "<I_StorageUnitType>" + oStrgTypval + "</I_StorageUnitType>" + "<I_Text>" + oItmval + "</I_Text>" + "<I_UOM>" + oQtyuom + "</I_UOM>" + "<I_VendorBatch>" + oVndrNum + "</I_VendorBatch>" + "<I_Warehouse>" + oWarhse + "</I_Warehouse>" + "<I_WeightUOM>" + oOrgnwt2val + "</I_WeightUOM></MaterialReceipt>";

            if (msg != "") {

                sap.m.MessageBox.show(
                    msg, {
                        icon: sap.m.MessageBox.Icon.INFORMATION,
                        title: getPropertyValue(oResourceModel, "NPORTAL_IMR_CONFIRMATION"),
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function(oAction) {

                            if (oAction === sap.m.MessageBox.Action.YES) {

                                if (actionFlag == true) {

                                    var oMatRcptMapngModel = new sap.ui.model.xml.XMLModel();

                                    oMatRcptMapngModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_MaterialReceiptMapping&Param.1=" + inputXMLinStringFormat2 + "&OutputParameter=O_Message&Content-Type=text/xml", "", false);

                                    var flagChck = oMatRcptMapngModel.getProperty("/Rowset/Row/O_Message");

                                    if (flagChck != getPropertyValue(oResourceModel, "NPM_BLS_COMMON_MSG_POSTED")) {
                                        sap.ui.commons.MessageBox.alert(flagChck, sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                                        okRptBtn.setEnabled(false);
                                    } else {
                                        sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MSG_POSTING_SUCCESS"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                                        oPOItemsTable.setVisible(false);
                                        oDialog1.close();

                                        var DateNw = new Date();
                                        oInboundMatReceiptModel = new sap.ui.model.xml.XMLModel();
                                        oInboundMatReceiptModel.setSizeLimit(10000);
                                        oInboundMatReceiptModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDO_GetRefreshFnDetails&StartDate=" + stDate + "&EndDate=" + endDate + "&Param.1=%&Param.2=%&Param.3=%&d=" + DateNw + "&Content-Type=text/xml"), "", false);

                                        oInboundMatReceiptTable.setModel(oInboundMatReceiptModel);
                                        oInboundMatReceiptTable.bindRows("/Rowset/Row");
                                    }
                                }
                            }
                        }
                    });

            } else {

                if (postingFlag == true) {
                    var oMatRcptMapngModel = new sap.ui.model.xml.XMLModel();
                    oMatRcptMapngModel.attachRequestSent(function() {
                        sap.ui.core.BusyIndicator.show(1);
                    });
                    oMatRcptMapngModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_MaterialReceiptMapping&Param.1=" + inputXMLinStringFormat2 + "&OutputParameter=O_Message&Content-Type=text/xml", "", true);
                    oMatRcptMapngModel.attachRequestCompleted(function() {
                        sap.ui.core.BusyIndicator.hide();
                        var flagChck = oMatRcptMapngModel.getProperty("/Rowset/Row/O_Message");

                        if (flagChck != getPropertyValue(oResourceModel, "NPM_BLS_COMMON_MSG_POSTED")) {
                            sap.ui.commons.MessageBox.alert(flagChck, sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                            okRptBtn.setEnabled(false);
                        } else {
                            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MSG_POSTING_SUCCESS"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                            oPOItemsTable.setVisible(false);
                            oDialog1.close();

                            var DateNw = new Date();
                            var PurchaseOrder = this.getView().byId("PurchaseOrder").getValue();
                            if (PurchaseOrder == "") {
                                PurchaseOrder = "%";
                            }

                            var Material = this.getView().byId("Material").getValue();
                            if (Material == "") {
                                Material = "%";
                            }


                            var Vendor = this.getView().byId("Vendor").getValue();
                            if (Vendor == "") {
                                Vendor = "%";
                            }

                            var reportStartDate = this.getView().byId("StartDate").getDateValue();
                            var reportEndDate = this.getView().byId("EndDate").getDateValue();

                            var strtdateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "MM/dd/yyyy 00:00:00"
                            });
                            var enddateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                                pattern: "MM/dd/yyyy HH:mm:ss"
                            });

                            var stDate = strtdateFormat.format(new Date(reportStartDate));
                            var endDate = enddateFormat.format(new Date(reportEndDate));
                            oInboundMatReceiptModel = new sap.ui.model.xml.XMLModel();
                            oInboundMatReceiptModel.setSizeLimit(10000);
                            oInboundMatReceiptModel.attachRequestSent(function() {
                                sap.ui.core.BusyIndicator.show(1);
                            });


                            oInboundMatReceiptModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDO_GetRefreshFnDetails&StartDate=" + stDate + "&EndDate=" + endDate + "&Param.1=" + PurchaseOrder + "&Param.2=" + Material + "&Param.3=" + Vendor + "&d=" + DateNw + "&Param.29=" + printerId + "&Param.30=" + noOfCopies + "&Content-Type=text/xml"), "", false);
                            //oInboundMatReceiptModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDO_GetRefreshFnDetails&StartDate="+stDate+"&EndDate="+endDate+"&Param.1=%&Param.2=%&Param.3=%&d="+DateNw+"&Content-Type=text/xml"),"",true);
                            oInboundMatReceiptModel.attachRequestCompleted(function() {
                                sap.ui.core.BusyIndicator.hide();
                                oInboundMatReceiptTable.setModel(oInboundMatReceiptModel);
                                oInboundMatReceiptTable.bindRows("/Rowset/Row");
                            });
                        }
                    });
                }
            }

        }


    },

    okNReptDialogFn: function() {

        var printerId = "";
        var noOfCopies = "";



        var oOrdNombr = dOrderNotxtFld.getValue();
        var oOrdItm = dOrderItemtxtFld.getValue();

        var ssccCBFlag;
        var oSsccNum = dSSCCtxtFld.getValue();
        oSsccNum = scanssccno(oSsccNum);


        var oVndrNum = dVendorBatchtxtFld.getValue();
        //var oNumOfLbl = dNoOfLablstxtFld.getValue();
        var oStrgTypval = dStrgTypetxtFld.getValue();
        var oWarhse = dWarehousetxtFld.getValue();
        if (sloc_flag == 1) {
            var oSLocVal = dSLOCtxtFld.getSelectedKey();
        } else {
            var oSLocVal = dSLOCtxtFld.getValue();
        }
        var oStrgbnval = dStrgBintxtFld.getValue();

        var oQtyval = dQtytxtFld.getValue();
        oQtyval = formatQuantity(oQtyval, "PARSE");
        var oQtyuom = dQtyUom.getValue();

        var oOrgnwt1val = dOriginWttxtFld1.getValue();
        var oOrgnwt2val = dOriginWttxtFld2.getValue();

        var oGtinval = dGTINtxtFld.getValue();
        var oStrgUnttyp = "902";
        var oVarintval = dVarianttxtFld.getValue();
        var oItmval = dItemTxtFld.getValue();

        var oFindlvry = dFinalDelvryCB.getSelected();
        var delNote = delNoteInptFld.getValue();
        //var oStktyp = dStkTypeSelect.getSelectedItem();
        var oStktyp = dStkTypeSelect.getSelectedKey();

        //var oPrntrsel = dPrintrSelect.getSelectedItem();

        var prDat = dProdcsnDate.getDateValue();
        var pdtFrmt = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "MM/dd/yyyy HH:mm:ss"
        });
        var oPrddt = pdtFrmt.format(new Date(prDat));
        var pdtFrmt1 = sap.ui.core.format.DateFormat.getDateTimeInstance({
            pattern: "yyyyMMdd"
        });
        var oPrddt1 = pdtFrmt1.format(new Date(prDat));


        var xpdt = dExpryDate.getDateValue();
        var oExpdt = pdtFrmt.format(new Date(xpdt));
        var oExpdt1 = pdtFrmt1.format(new Date(xpdt));

        var pstdt = dPostngDate.getDateValue();
        var oPstngdt = pdtFrmt.format(new Date(pstdt));


        if (dAutoGnrtdCB.getSelected() == true) {

            printerId = printerNameSelection.getSelectedKey().split("---")[0];
            noOfCopies = noOfCopiesInput.getValue();

        } else {
            printerId = "";
            noOfCopies = "";
        }

        if (dAutoGnrtdBatchCB.getSelected() == true) {
            oSelectedBatch = dBatchNotxtFld.getValue();
        } else {
            if (NonBatchManagedFlag != "X") {
                oSelectedBatch = "null";
                oExpdt = "";
            } else {
                oSelectedBatch = dBatchNotxtFld1.getValue();
            }
        }


        if (oWarhse == "" || (oSLocVal == "" || oSLocVal =="---") || oQtyval == "" || isNaN(oQtyval)) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MANDAT_FIELD"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if (oSsccNum == "" && (oStrgTypval == "" || oStrgbnval == "")) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NP_PortalSTypeSBinBlank"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if ((xpdt == "" || xpdt == null) && NonBatchManagedFlag == "X") {

            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MANDAT_SLED"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if ((oPrddt1 == oExpdt1 || oPrddt1 > oExpdt1) && NonBatchManagedFlag == "X") {

            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_EXPIRYDATE"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if (printerId == "" && dAutoGnrtdCB.getSelected() == true) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_SELECT_PRINTER"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else if (noOfCopies == "" && printerId != "No Print" && dAutoGnrtdCB.getSelected() == true) {
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_COMMON_MSG_VALIDATE_PRINT_COPIES"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
        } else {
            if (dAutoGnrtdCB.getSelected() == true) {
                ssccCBFlag = 1;
            } else {
                ssccCBFlag = 0;
            }



            var msg = "";
            var agFlag = dAutoGnrtdCB.getSelected();
            var actionFlag = false;
            var postingFlag = true;

            if (oStrgTypval != "") {

                var oSTypeModel = new sap.ui.model.xml.XMLModel();
                oSTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDOQ_CheckSTypeExistance&Param.1=" + oStrgTypval + "&Content-Type=text/xml"), " ", false);
                var storageUnit = oSTypeModel.getProperty("/Rowset/Row/STOR_UNIT");

                if (storageUnit == "") {
                    msg = agFlag ? getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_SU_STYPE_CNF") : getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_NONSU_STYPE_CNF");
                    actionFlag = true;
                } else if (storageUnit == "null" && agFlag == true) {
                    postingFlag = false;
                    sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_NONSU_MANAGED_STYPE"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                } else if (storageUnit != "null" && agFlag == false) {
                    postingFlag = false;
                    sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPORTAL_IMR_CONTR_MSG_SU_MANAGED_STYPE"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                } else {


                }

            }

            inputXMLinStringFormat2 = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<MaterialReceipt><I_Batch>" + oSelectedBatch + "</I_Batch>" + "<I_ButtonType>okRept</I_ButtonType>" + "<I_Copies>" + noOfCopies + "</I_Copies>" + "<I_DeliveryNote>" + delNote + "</I_DeliveryNote>" + "<I_ExpiryDate>" + oExpdt + "</I_ExpiryDate>" + "<I_FinalDelivery>" + oFindlvry + "</I_FinalDelivery>" + "<I_GTIN>" + oGtinval + "</I_GTIN>" + "<I_GTINVariant>" + oVarintval + "</I_GTINVariant>" + "<I_MatDesc>" + encodeURIComponent(matrlDesc) + "</I_MatDesc>" + "<I_Material>" + matrl + "</I_Material>" + "<I_OrderItemNumber>" + oOrdItm + "</I_OrderItemNumber>" + "<I_OrderNumber>" + oOrdNombr + "</I_OrderNumber>" + "<I_OriginWeight>" + oOrgnwt1val + "</I_OriginWeight>" + "<I_Plant>" + Plant + "</I_Plant>" + "<I_PostingDate>" + oPstngdt + "</I_PostingDate>" + "<I_PrinterID>" + printerId + "</I_PrinterID>" + "<I_ProductionDate>" + oPrddt + "</I_ProductionDate>" + "<I_Quantity>" + oQtyval + "</I_Quantity>" + "<I_SLED>365</I_SLED>" + "<I_SSCC>" + oSsccNum + "</I_SSCC>" + "<I_SSCCFlag>" + ssccCBFlag + "</I_SSCCFlag>" + "<I_StockCategory>" + oStktyp + "</I_StockCategory>" + "<I_StorageBin>" + encodeURIComponent(oStrgbnval) + "</I_StorageBin>" + "<I_StorageLocation>" + oSLocVal + "</I_StorageLocation>" + "<I_StorageUnitType>" + oStrgTypval + "</I_StorageUnitType>" + "<I_Text>" + oItmval + "</I_Text>" + "<I_UOM>" + oQtyuom + "</I_UOM>" + "<I_VendorBatch>" + oVndrNum + "</I_VendorBatch>" + "<I_Warehouse>" + oWarhse + "</I_Warehouse>" + "<I_WeightUOM>" + oOrgnwt2val + "</I_WeightUOM></MaterialReceipt>";

            if (msg != "") {

                sap.m.MessageBox.show(
                    msg, {
                        icon: sap.m.MessageBox.Icon.INFORMATION,
                        title: getPropertyValue(oResourceModel, "NPORTAL_IMR_CONFIRMATION"),
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        onClose: function(oAction) {

                            if (oAction === sap.m.MessageBox.Action.YES) {

                                if (actionFlag == true) {

                                    var DateNw = new Date();
                                    var oMatRcptMapngModel = new sap.ui.model.xml.XMLModel();
                                    oMatRcptMapngModel.attachRequestSent(function() {
                                        sap.ui.core.BusyIndicator.show(1);
                                    });

                                    oSsccNum = dSSCCtxtFld.getValue();
                                    oSsccNum = scanssccno(oSsccNum);
                                    oQtyval = dQtytxtFld.getValue();
                                    oQtyval = formatQuantity(oQtyval, "PARSE");

                                    oMatRcptMapngModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_MaterialReceiptMapping&Param.1=" + inputXMLinStringFormat2 + "&d=" + DateNw + "&Content-Type=text/xml", "", true);
                                    oMatRcptMapngModel.attachRequestCompleted(function() {
                                        sap.ui.core.BusyIndicator.hide();
                                        var flagChck = oMatRcptMapngModel.getProperty("/Rowset/Row/O_Message");

                                        if (flagChck != getPropertyValue(oResourceModel, "NPM_BLS_COMMON_MSG_POSTED")) {
                                            sap.ui.commons.MessageBox.alert(flagChck, sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                                            //okRptBtn.setEnabled(false);
                                        } else {
                                            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MSG_POSTING_SUCCESS"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                                        }
                                    });
                                    var oSsccNum = dSSCCtxtFld.setValue("");
                                    dSSCCtxtFld.setEditable(true);
                                    dAutoGnrtdCB.setSelected(false);
                                    var oQtyval = dQtytxtFld.setValue("");
                                }
                            }
                        }
                    });

            } else {
                if (postingFlag == true) {
                    var DateNw = new Date();
                    var oMatRcptMapngModel = new sap.ui.model.xml.XMLModel();
                    oMatRcptMapngModel.attachRequestSent(function() {
                        sap.ui.core.BusyIndicator.show(1);
                    });
                    oSsccNum = dSSCCtxtFld.getValue();
                    oSsccNum = scanssccno(oSsccNum);
                    oMatRcptMapngModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/XACQ_MaterialReceiptMapping&Param.1=" + inputXMLinStringFormat2 + "&d=" + DateNw + "&Content-Type=text/xml", "", true);
                    oMatRcptMapngModel.attachRequestCompleted(function() {
                        sap.ui.core.BusyIndicator.hide();
                        var flagChck = oMatRcptMapngModel.getProperty("/Rowset/Row/O_Message");

                        if (flagChck != getPropertyValue(oResourceModel, "NPM_BLS_COMMON_MSG_POSTED")) {
                            sap.ui.commons.MessageBox.alert(flagChck, sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                            //okRptBtn.setEnabled(false);
                        } else {
                            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModel, "NPM_COMMON_MSG_MSG_POSTING_SUCCESS"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModel, "NPM_COMMON_Message"));
                        }
                    });
                    var oSsccNum = dSSCCtxtFld.setValue("");
                    dSSCCtxtFld.setEditable(true);
                    dAutoGnrtdCB.setSelected(false);
                    var oQtyval = dQtytxtFld.setValue("");
                }
            }

        }

    },

    onSearch: function(oEvent) {
        var sQuery = oEvent.getSource().getValue();
        var oDisplayTable = this.getView().byId("InboundMatReceiptTable");


        var oFilter1 = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter2 = new sap.ui.model.Filter("Client", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter3 = new sap.ui.model.Filter("PurchaseOrderNumber", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter4 = new sap.ui.model.Filter("Document_Type", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter5 = new sap.ui.model.Filter("Document_Date", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter6 = new sap.ui.model.Filter("PurchaseOrder_Date", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter7 = new sap.ui.model.Filter("Vendor_Number", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter8 = new sap.ui.model.Filter("Vendor_Number_Value", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter9 = new sap.ui.model.Filter("Vendor_Name_Value", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter10 = new sap.ui.model.Filter("Address_Value", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter11 = new sap.ui.model.Filter("City", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter12 = new sap.ui.model.Filter("PostalCode", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter13 = new sap.ui.model.Filter("CountryKey", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter14 = new sap.ui.model.Filter("Telephone", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter15 = new sap.ui.model.Filter("Fax", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter16 = new sap.ui.model.Filter("LanguageKey", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter17 = new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter18 = new sap.ui.model.Filter("ILNNR", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter19 = new sap.ui.model.Filter("SAP_LangCode", sap.ui.model.FilterOperator.Contains, sQuery);
        var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10, oFilter11, oFilter12, oFilter13, oFilter14, oFilter15, oFilter16, oFilter17, oFilter18, oFilter19], false);


        oDisplayTable.getBinding("rows").filter(allFilter);



    },

    doLogoff1: function() {
        window.open("/XMII/Illuminator?service=logout&target=/OEEDashboard/WorkerUI.jsp", "_self");
    },

    handlePressHome: function() {
        window.open("/XMII/Illuminator?service=logout&target=/OEEDashboard/WorkerUI.jsp", "_self");
    },

    closeDialogFn: function() {
        oDialog1.close();
        var DateNw = new Date();
        oInboundMatReceiptModel = new sap.ui.model.xml.XMLModel();
        oInboundMatReceiptModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/InboundMaterialReceipt/QueryTemplates/MDO_GetRefreshFnDetails&StartDate=" + stDate + "&EndDate=" + endDate + "&Param.1=%&Param.2=%&Param.3=%&d=" + DateNw + "&Content-Type=text/xml"), "", false);

        //Client = oInboundMatReceiptModel.getProperty("/Rowset/Row/Client"); 

        oInboundMatReceiptTable.setModel(oInboundMatReceiptModel);
        oInboundMatReceiptTable.bindRows("/Rowset/Row");

        oPOItemsTable.setVisible(false);
    },
    goBack: function() {

        window.top.close();

    },
    getDateDisplayFormat: function(date) {

        if (date === "0000-00-00") {
            return date;
        } else {
            return formatDate(date, "yyyy-MM-dd'T'HH:mm:ss");
        }
    }

});