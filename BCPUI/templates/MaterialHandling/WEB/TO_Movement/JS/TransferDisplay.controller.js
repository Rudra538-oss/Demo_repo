var language;
var oBCPStatusModel;
var sLoc, sType, wareHNo, sBin, material;
var oDialog1, oDialog12;
var oTablindex;
var oTablindex1;
var okBtn;
var oDisplayTable, oDisplayTable2;
var oStockDisplaytems;
var oControllerIMR;
var index;
var selectList;
var all = "%";
var oResourceModelTransDisplay;
var StorageType;
var inpXML;
var flag = "0";
var sTypeFromURL,sBinFromURL, slocFromURL, whFromURL;
var wareNum1, storType1, storBin1, material1, selectedItem, sLoc1, DisplayID1, RefreshID1;
var oallChckBox3, oallChckBox2, oallChckBox1;
var TrasferType, oMaterialNo, oBatchNo, oStorageBin, oBatchStatus, wareNo, sscc, oStockCategory, storeLoc, oStockStatus, oBCPStats, wareNo, paramECCTransferType;
var TOBatchFlag = 0;
var oSelectedContext;
var oSelectionPanel;
var userLanguage;
var timeOut, oWareNoModel;
var isOpenCnf = false;
var bcpElement;
var oUOM;
var commercialUOM;
var oView;


jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("JS.TransferDisplay", {


    goHome: function() {
        // var app = sap.ui.getCore().byId("idTransferDisplay");
        // app.to("dNestlePortal_BCP","show");
        window.top.close();
    },

    doLogoff3: function() {
        window.open("/XMII/Illuminator?service=logout&target=/XMII/CM/MaterialHandling/CustomMenu/index.irpt", "_self");
    },

    /////////////////////////////////////////////////////////////////////////// Timeout Supporting Functions //////////////////////////////////////////////////////////////////////

    /* reset: function() {
        window.clearTimeout(timeOut);
        timeOut = setTimeout(function(){sap.ui.controller("JS.TransferDisplay").showTimeoutMsg()} , 600000 );
    },

    showTimeoutMsg: function() {

    if(isOpenCnf == false){
       isOpenCnf = true;
      sap.m.MessageBox.show(
          	getPropertyValue(oResourceModelTransDisplay, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG"), {
             	icon: sap.m.MessageBox.Icon.QUESTION,
             	title: getPropertyValue(oResourceModelTransDisplay, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE"),
           		actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
          		onClose: function(oAction){
           			if(oAction === sap.m.MessageBox.Action.NO){
    				window.location.reload();	
    			}else{
    				isOpenCnf = false;
    				sap.ui.controller("JS.TransferDisplay").reset();
    			}
    		}
    	});
        }
    },  */
    /////////////////////////////////////////////////////////////////////////// End of  Timeout Supporting Function///////////////////////////////////////////////////////////

    onInit: function() {

        /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////

        /* window.onload = setTimeout(function(){sap.ui.controller("JS.TransferDisplay").showTimeoutMsg()} , 600000 );

        window.onmousemove = function(){sap.ui.controller("JS.TransferDisplay").reset();};
        window.onkeypress = function(){sap.ui.controller("JS.TransferDisplay").reset();};
        window.onclick = function(){sap.ui.controller("JS.TransferDisplay").reset();};

        */

        /////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////

        $(document).keydown(function(evt) {
            if (evt.keyCode == 13) {
                evt.preventDefault();
                sap.ui.controller("JS.TransferDisplay").doDisplay();
            }
        });


        //oSelectionPanel = this.getView().byId("SelectionCriteriaPanel");
        oDisplayTable2 = this.getView().byId("TransferStockTable2");
        localStorage.clear();

        var lineFrmURL,matFromURL;
        var urlDecoded = decodeURI(window.location.search);
        var url = urlDecoded.substring(1);
        if (url != null || url != "" || url != " ") {
            var param = url.split("&");
            for (var i = 0; i < param.length; i++) {

                var splitter = param[i].split("=");
                if (splitter[0] == "plant") {
                    lineFrmURL = decodeURIComponent(splitter[1]);
                }if (splitter[0] == "sTypeFromURL") {
                    sTypeFromURL = splitter[1];
                }if (splitter[0] == "sBinFromURL") {
                    sBinFromURL = decodeURIComponent(splitter[1]);
                } if (splitter[0] == "matFromURL") {
                    matFromURL = splitter[1];
                    this.getView().byId("mat").setValue(matFromURL);
                }if (splitter[0] == "slocFromURL") {
                    slocFromURL = splitter[1];
                }

            }

        }
        //this.getView().byId("label_header3").setText(lineFrmURL);
        language = window.navigator.userLanguage || window.navigator.language;

        oDisplayTable = this.getView().byId("TransferStockTable");
        oStockDisplaytems = this.getView().byId("StockDisplayItems");
        sLoc1 = this.getView().byId("sLoc");
        wareNum1 = this.getView().byId("wareNum");
        storType1 = this.getView().byId("sType");
        storBin1 = this.getView().byId("sBin");
        material1 = this.getView().byId("mat");
        DisplayID1 = this.getView().byId("DisplayID");
        RefreshID1 = this.getView().byId("RefreshID");
        oallChckBox1 = this.getView().byId("allChckBox1");
        oallChckBox2 = this.getView().byId("allChckBox2");
        //oallChckBox3 = this.getView().byId("allChckBox3");
        var DateNw = new Date();

        var oUserDataModel = new sap.ui.model.xml.XMLModel();
        oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);

        userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");


        var details = "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,TransferDisplay_tile,TransferDisplay_alert1,TransferDisplay_Message,TransferDisplay_alert2,TransferDisplay_alert3,TransferDisplay_alert9,NPDashboard_Cancel,TransferDisplay_alert10,TransferDisplay_alert5,TransferDisplay_alert6,TransferDisplay_alert8,TransferDisplay_Question,TransferDisplay_alert7,TransferDisplay_NonBatchMsg,TransferDisplay_alert18,TO_TransferTypeSelect_ECC";
        oResourceModelTransDisplay = new sap.ui.model.xml.XMLModel();
        oResourceModelTransDisplay.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetResourceProperty&Param.2=" + userLanguage + "&Param.3=" + details + "&d=" + DateNw + "&Content-Type=text/xml", "", false);

        /*oResourceModelTransDisplay = new sap.ui.model.resource.ResourceModel({bundleUrl:"/XMII/CM/MaterialHandling/Common/resources/"+userLanguage+".properties"});
         oallChckBox1.setLayoutData(new sap.ui.layout.GridData({span: "L4 M4 S4"})); 
        oallChckBox2.setLayoutData(new sap.ui.layout.GridData({span: "L4 M4 S4"})); 
         //oallChckBox3.setLayoutData(new sap.ui.layout.GridData({span: "L4 M4 S4"})); 
        this.getView().byId("pageID").setModel(oResourceModelTransDisplay, "header");
        this.getView().byId("topPanel").setModel(oResourceModelTransDisplay, "title");
        //this.getView().byId("SelectionCriteriaPanel").setModel(oResourceModelTransDisplay, "title");
        this.getView().byId("tabelPanel").setModel(oResourceModelTransDisplay, "title");
        this.getView().byId("Form1").setModel(oResourceModelTransDisplay, "label");
        this.getView().byId("Form8").setModel(oResourceModelTransDisplay, "label");
        this.getView().byId("DisplayID").setModel(oResourceModelTransDisplay, "button");
        this.getView().byId("RefreshID").setModel(oResourceModelTransDisplay, "button");
        this.getView().byId("getExcelReport").setModel(oResourceModelTransDisplay, "button");
        this.getView().byId("TransferStockTable").setModel(oResourceModelTransDisplay, "column");
        this.getView().byId("TransferStockTable2").setModel(oResourceModelTransDisplay, "column");*/

        document.title = getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_tile");
        var page = this.getView().byId("pageID");
        var identifier = "title1>NPDashboard_Home,title2>InBndMatRecpt_title_BCP,title3>TransferDisplay_title_StockDisplayTitle,column18>TransferDisplay_colHeader_pick,column19>TransferDisplay_colHeader_putaway,title4>TransferDisplay_title_SelectCriteria,label1>TransferDisplay_label_SLoc,label2>TransferDisplay_label_WHNo,label3>TransferDisplay_label_SType,title7>CustomGI_CL_4,label4>TransferDisplay_label_SBin,label5>TransferDisplay_label_Mat,button1>TransferDisplay_btn_disp,button2>TransferDisplay_btn_Clear,title5>TransferDisplay_title_StockDisplay,title6>TransferDisplay_title_StockDisplay,button3>TransferDisplay_btn_excel,column1>TransferDisplay_colHeader_sType,column2>TransferDisplay_colHeader_sBin,column3>TransferDisplay_colHeader_matdes,column4>TransferDisplay_colHeader_mat,column5>TransferDisplay_colHeader_status,column6>TransferDisplay_colHeader_batch,column7>TransferDisplay_colHeader_sled,column8>TransferDisplay_colHeader_avail,column9>TransferDisplay_colHeader_uom,column10>TransferDisplay_colHeader_sUnit,column11>TransferDisplay_colHeader_stckcat,column12>TransferDisplay_colHeader_plant,column13>TransferDisplay_colHeader_prodDate,column14>TransferDisplay_colHeader_unitType,column15>TransferDisplay_colHeader_sLoc,column16>TransferDisplay_colHeader_whNo,column17>TransferDisplay_colHeader_BatchRestricted,column18>TransferDisplay_colHeader1_sType,column19>TransferDisplay_colHeader1_sBin,column20>TransferDisplay_colHeader1_matdes,column21>TransferDisplay_colHeader1_mat,column22>TransferDisplay_colHeader1_status,column23>TransferDisplay_colHeader1_batch,column24>TransferDisplay_colHeader1_sled,column25>TransferDisplay_colHeader1_avail,column26>TransferDisplay_colHeader_uom,column27>TransferDisplay_colHeader1_sUnit,column28>TransferDisplay_colHeader1_stckcat,column29>TransferDisplay_colHeader1_plant,column30>TransferDisplay_colHeader1_prodDate,column31>TransferDisplay_colHeader_unitType,column32>TransferDisplay_colHeader_sLoc,column33>TransferDisplay_colHeader_whNo,column34>TransferDisplay_colHeader_StockStatus";
        localize(page, identifier, userLanguage);
        var sLocDDType = "STORAGELOC";
        var wareNoDDType = "WAREHOUSENO";
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        oControllerIMR = this;
        var wareNum = this.getView().byId("wareNum").getValue();

        bcpElement = this.getView().byId("bcpStatus");
        oBCPStats = getBCPStatus(bcpElement, "", "");

        ///////////////////////////////////////// Select Storage Location ///////////////////////////////////////////

        var oStoLocModel = new sap.ui.model.xml.XMLModel();
        oStoLocModel.setSizeLimit(10000);
        oStoLocModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + sLocDDType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var storeLoc = this.getView().byId("sLoc");
        // var ostoreLocitemline=oStoLocModel.getProperty('/Rowset/Row/Value');
        // storeLoc.setValue(ostoreLocitemline);
        var ostoreLocitemline = new sap.ui.core.ListItem();
        ostoreLocitemline.bindProperty("text", "Value");
        ostoreLocitemline.bindProperty("key", "Key");
        storeLoc.bindItems("/Rowset/Row", ostoreLocitemline);
        storeLoc.setModel(oStoLocModel);	
        if (slocFromURL!=undefined && slocFromURL!="undefined" && slocFromURL!= null && slocFromURL!="" && slocFromURL!="---"){
                storeLoc.setSelectedKey(slocFromURL);
        } else{
                storeLoc.setSelectedKey(oStoLocModel.getProperty("/Rowset/Row/1/Key"));
        }

        var storageLocation = this.getView().byId("sLoc").getSelectedKey();


        ///////////////////////////////////////// Select WarehouseNo ///////////////////////////////////////////

        oWareNoModel = new sap.ui.model.xml.XMLModel();
        oWareNoModel.setSizeLimit(10000);
        oWareNoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + wareNoDDType + "&Param.2=" + storageLocation + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var wareNum = this.getView().byId("wareNum");
        var warehuseNo = oWareNoModel.getProperty("/Rowset/Row/Key");
        wareNum.setValue(warehuseNo);
        this.getView().byId("wareNum").setEnabled(false);
        //wareNo.setSelectedKey(oWareNoModel.getProperty("/Rowset/Row/1/Key")); 
        oControllerIMR.getStorageType();


        /////////////////////////////// Get Stock Download Schedulers info //////////////////////////////////////////////


        oView = this.getView();
        this.getSchedInfo();


    },

    onAfterRendering: function() {
        /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////

        var sessionExpMsg = getPropertyValue(oResourceModelTransDisplay, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
        var sessionExpTitle = getPropertyValue(oResourceModelTransDisplay, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
        setIdleTime(sessionExpMsg, sessionExpTitle);



        /////////////////////////////////////////////////////////////////////////// End of Timeout /////////////////////////////////////////////////////////

        setInterval(function() {
            oBCPStats = getBCPStatus(bcpElement, "", "");
        }, 30000);

        setInterval(function() {
            oControllerIMR.getSchedInfo();
        }, 360000);


        this.getView().byId("TransferStockTable").clearSelection();
        this.getView().byId("TransferStockTable2").clearSelection();
        TOBatchFlag = 0;
        var oBatchFlagBack = localStorage.getItem("BatchFlagBack");
        if (oBatchFlagBack == 1) {
            var daterefresh = new Date();
            oDisplayTable2.setVisible(false);
            var oTOStockCat = localStorage.getItem("TOStockCat");
            var oTOStorageUnit = localStorage.getItem("TOStorageUnit");
            var oTOStorageLoc = localStorage.getItem("TOStorageLoc");
            var oTOWHNumber = localStorage.getItem("TOWHNumber");
            var oTOStorageType = localStorage.getItem("TOStorageType");
            var oTOStorageBin = localStorage.getItem("TOStorageBin");
            var oTOBatchNumber = localStorage.getItem("TOBatchNumber");
            var oTOMaterialNumber = localStorage.getItem("TOMaterialNumber");
            var oTOBatchStatus = localStorage.getItem("TOBatchStatus");
            var DateNw = new Date();
            var oTODestDisplayModel = new sap.ui.model.xml.XMLModel();
            oTODestDisplayModel.setSizeLimit(10000);
            oTODestDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.1=" + oTOStockCat + "&Param.2=" + oTOStorageLoc + "&Param.3=" + oTOWHNumber + "&Param.4=" + oTOStorageType + "&Param.5=" + encodeURIComponent(oTOStorageBin) + "&Param.6=" + oTOBatchNumber + "&Param.7=" + oTOMaterialNumber + "&Param.8=6&Param.10=" + userLanguage + " &Param.11=" + oTOStorageUnit + "&Param.20=" + oTOBatchStatus + "&Param.21=" + commercialUOM + "&d=" + DateNw + "&OutputParameter=O_TOXML&Content-Type=text/xml"), "", false);
            oDisplayTable = this.getView().byId("TransferStockTable");
            oDisplayTable.setModel(oTODestDisplayModel);
            oDisplayTable.bindRows("/Rowset/Row");
            //alert(oTODestDisplayModel.getProperty("/Rowset/Row/CommUOM"));
            //alert(userLanguage);
            //alert("CommUOM: "+commercialUOM);
            //alert(oBaseUOM);


        } else {
            oDisplayTable2.setVisible(false);
        }
        var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
        this.getView().byId("shell3").getUser().setUsername(username);
        //this.getView().byId("topPanel").setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
        //this.getView().byId("mat").createPicker(sap.m.Popover);

    },

    getSLoc: function() {
        // alert();
        var DateNw = new Date();
        this.getView().byId("wareNum").setValue();
        var storageLocation = this.getView().byId("sLoc").getSelectedKey();
        var wareNoDDType = "WAREHOUSENO";
        oWareNoModel = new sap.ui.model.xml.XMLModel();
        oWareNoModel.setSizeLimit(10000);
        oWareNoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + wareNoDDType + "&Param.2=" + storageLocation + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        wareNo = this.getView().byId("wareNum");
        var warehuseNo = oWareNoModel.getProperty("/Rowset/Row/Key");
        wareNo.setValue(warehuseNo);
        //this.getView().byId("sType").setEnabled(false);
        //this.getView().byId("allChckBox1").setEnabled(false);
        //this.getView().byId("allChckBox2").setEnabled(false);
        //this.getView().byId("allChckBox3").setEnabled(false);
        //this.getView().byId("sBin").setEnabled(false);
        //this.getView().byId("mat").setEnabled(false);
        this.getView().byId("sType").setSelectedKeys("");
        this.getView().byId("sBin").setSelectedKeys("");
        //this.getView().byId("mat").setSelectedKeys("");
        this.getView().byId("allChckBox1").setSelected(false);
        this.getView().byId("allChckBox2").setSelected(false);
        //this.getView().byId("allChckBox3").setSelected(false);
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();

        this.getView().byId("wareNum").setEnabled(false);

        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        var wareNum = this.getView().byId("wareNum").getValue();
        ///////////////////////////////////////// Select StorageType ///////////////////////////////////////////

        var storeType1 = this.getView().byId("sType").setEnabled(true);
        var chkboxAll1 = this.getView().byId("allChckBox1").setEnabled(true);
        var ostoTypeModel = new sap.ui.model.xml.XMLModel();
        ostoTypeModel.setSizeLimit(10000);
        ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageType&Param.1=" + storeLoc + "&Param.2=" + wareNum + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var sType = this.getView().byId("sType");
        var osTypeitemline = new sap.ui.core.ListItem();
        osTypeitemline.bindProperty("text", "STGE_TYPE");
        osTypeitemline.bindProperty("key", "STGE_TYPE");
        sType.bindItems("/Rowset/Row", osTypeitemline);
        sType.setModel(ostoTypeModel);
        // alert(storeLoc);
        // alert(wareNum);
        if (storeLoc == "---" || wareNum == "---") {
            this.getView().byId("sType").setEnabled(false);
            this.getView().byId("sType").setSelectedKeys("");
            this.getView().byId("allChckBox1").setEnabled(false);
            this.getView().byId("allChckBox1").setSelected(false);
            this.getView().byId("allChckBox2").setEnabled(false);
            //this.getView().byId("allChckBox3").setEnabled(false);
            this.getView().byId("sBin").setEnabled(false);
            //this.getView().byId("mat").setEnabled(false);
            this.getView().byId("sBin").setSelectedKeys("");
            //this.getView().byId("mat").setSelectedKeys("");
            //this.getView().byId("allChckBox3").setSelected(false);
            this.getView().byId("allChckBox2").setSelected(false);
        } else {
            this.getView().byId("allChckBox2").setEnabled(false);
            //this.getView().byId("allChckBox3").setEnabled(false);
            this.getView().byId("sBin").setEnabled(false);
            //this.getView().byId("mat").setEnabled(false);
            this.getView().byId("sBin").setSelectedKeys("");
            //this.getView().byId("mat").setSelectedKeys("");
            //this.getView().byId("allChckBox3").setSelected(false);
            this.getView().byId("allChckBox2").setSelected(false);
        }
    },
    getStorageType: function() {
        var DateNw = new Date();
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        var wareNum = this.getView().byId("wareNum").getValue();
        ///////////////////////////////////////// Select StorageType ///////////////////////////////////////////

        var storeType1 = this.getView().byId("sType").setEnabled(true);
        var chkboxAll1 = this.getView().byId("allChckBox1").setEnabled(true);
        var ostoTypeModel = new sap.ui.model.xml.XMLModel();
        ostoTypeModel.setSizeLimit(10000);
        ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageType&Param.1=" + storeLoc + "&Param.2=" + wareNum + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var sType = this.getView().byId("sType");
        var osTypeitemline = new sap.ui.core.ListItem();
        osTypeitemline.bindProperty("text", "STGE_TYPE");
        osTypeitemline.bindProperty("key", "STGE_TYPE");
        sType.bindItems("/Rowset/Row", osTypeitemline);
        sType.setModel(ostoTypeModel);
        // alert(storeLoc);
        // alert(wareNum);
        if (storeLoc == "---" || wareNum == "---") {
            this.getView().byId("sType").setEnabled(false);
            this.getView().byId("sType").setSelectedKeys("");
            this.getView().byId("allChckBox1").setEnabled(false);
            this.getView().byId("allChckBox1").setSelected(false);
            this.getView().byId("allChckBox2").setEnabled(false);
            //this.getView().byId("allChckBox3").setEnabled(false);
            this.getView().byId("sBin").setEnabled(false);
            //this.getView().byId("mat").setEnabled(false);
            this.getView().byId("sBin").setSelectedKeys("");
            //this.getView().byId("mat").setSelectedKeys("");
            //this.getView().byId("allChckBox3").setSelected(false);
            this.getView().byId("allChckBox2").setSelected(false);
        } else if (sTypeFromURL!=undefined && sTypeFromURL!="undefined" && sTypeFromURL!= null && sTypeFromURL!="" && sTypeFromURL!="---"){
            this.getView().byId("allChckBox2").setSelected(false);
            sType.setSelectedKeys([sTypeFromURL]);
            sType.fireSelectionFinish();
        }else {
            this.getView().byId("allChckBox2").setEnabled(false);
            //this.getView().byId("allChckBox3").setEnabled(false);
            this.getView().byId("sBin").setEnabled(false);
            //this.getView().byId("mat").setEnabled(false);
            this.getView().byId("sBin").setSelectedKeys("");
            //this.getView().byId("mat").setSelectedKeys("");
            //this.getView().byId("allChckBox3").setSelected(false);
            this.getView().byId("allChckBox2").setSelected(false);
        }

    },

    doRefresh: function() {
        var storeLoc = this.getView().byId("sLoc").setSelectedKey();
        var wareNo = this.getView().byId("wareNum").setValue();
        var storeType = this.getView().byId("sType").setSelectedKeys("");
        var storeType1 = this.getView().byId("sType").setEnabled(false);
        var storBin = this.getView().byId("sBin").setSelectedKeys("");
        var storBin1 = this.getView().byId("sBin").setEnabled(false);
        //var material = this.getView().byId("mat").setSelectedKeys("");
        //var material1 = this.getView().byId("mat").setEnabled(false);
        var exlBtn = this.getView().byId("getExcelReport").setVisible(false);
        var chkboxAll1 = this.getView().byId("allChckBox1").setEnabled(false);
        var chkboxAll2 = this.getView().byId("allChckBox2").setEnabled(false);
        var boxAll1 = this.getView().byId("allChckBox1").setSelected(false);
        var boxAll2 = this.getView().byId("allChckBox2").setSelected(false);
        //var boxAll3 = this.getView().byId("allChckBox3").setSelected(false);
        var oDisplayStockTransferModel = new sap.ui.model.xml.XMLModel();
        oDisplayTable = this.getView().byId("TransferStockTable");
        oDisplayTable2 = this.getView().byId("TransferStockTable2");
        oDisplayTable.setModel(oDisplayStockTransferModel);
        oDisplayTable2.setVisible(false);
        this.getView().byId("mat").setValue("");
        this.getView().byId("sunit").setValue("");
        this.getView().byId("Batch").setValue("");
        var aColumns = oDisplayTable.getColumns();
        for (var i = 0; i < aColumns.length; i++) {
            aColumns[i].setSorted(false);
        }

    },

    doDisplay: function() {
        TOBatchFlag = "0";
        flag = "0";
        oDisplayTable.setTitle("");
        var aColumns = oDisplayTable.getColumns();
        for (var i = 0; i < aColumns.length; i++) {
            aColumns[i].setSorted(false);
        }

        oDisplayTable2.setVisible(false);
        var DateNw = new Date();
        storeLoc = sap.ui.getCore().getElementById("TransferDisplay--sLoc").getSelectedKey();

        wareNo = sap.ui.getCore().getElementById("TransferDisplay--wareNum").getValue();

        var storeType = sap.ui.getCore().getElementById("TransferDisplay--sType").getSelectedKeys();
        var storBin = sap.ui.getCore().getElementById("TransferDisplay--sBin").getSelectedKeys();
        var material = sap.ui.getCore().getElementById("TransferDisplay--mat").getValue();
        var sscc = sap.ui.getCore().getElementById("TransferDisplay--sunit").getValue();
        sscc = scanssccno(sscc);

        var batch = sap.ui.getCore().getElementById("TransferDisplay--Batch").getValue();
        var chkboxAll1 = sap.ui.getCore().getElementById("TransferDisplay--allChckBox1");
        var chkboxAll2 = sap.ui.getCore().getElementById("TransferDisplay--allChckBox2");
        //var chkboxAll3 = sap.ui.getCore().getElementById("TransferDisplay--allChckBox3");
        var c1 = chkboxAll1.getSelected();
        var c2 = chkboxAll2.getSelected();



        if (storeLoc == "---" || storeLoc == "" || storeLoc == null) {
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert1"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
        } else if (wareNo == "" || wareNo == "---" || wareNo == null) {
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert2"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
        }




        if ((chkboxAll1.getSelected() == true || storeType == "" || storeType == "undefined") && storeLoc != "---" && wareNo != "---") {
            // alert("storeType-"+storeType);
            var ostoTypeModel = new sap.ui.model.xml.XMLModel();
            ostoTypeModel.setSizeLimit(10000);
            ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageType&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            var sTypexml = ostoTypeModel.getData();
            var Type = "";
            $(sTypexml).find('Row').each(function() {
                var Types = $(this).find('STGE_TYPE');
                var length = $(Types).length;
                $(Types).each(function(index) {
                    Type += "','" + Types.eq(index).text();
                });
            });

            var sType1 = Type.substr(2, Type.length);
            sType = "(" + sType1 + "')";
            // alert("sType1-"+sType);
        }
        if ((chkboxAll2.getSelected() == true || storBin == "" || storBin == undefined || storBin == null) && storeLoc != "---" && wareNo != "---" && sType != "(')") {
            // alert("storBin:"+storBin);
            var ostoBinModel = new sap.ui.model.xml.XMLModel();
            ostoBinModel.setSizeLimit(10000);
            ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageBin&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&Param.3=" + sType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            var sBinxml = ostoBinModel.getData();
            var Bin = "";
            $(sBinxml).find('Row').each(function() {
                var Bins = $(this).find('STGE_BIN');
                var length = $(Bins).length;
                $(Bins).each(function(index) {
                    Bin += "','" + Bins.eq(index).text();
                });
            });
            var sBin1 = Bin.substr(2, Bin.length);
            sBin = "(" + sBin1 + "')";

        }

        ///////////////////////////////////////// Display Table ///////////////////////////////////////////


        var exlBtn = sap.ui.getCore().getElementById("TransferDisplay--getExcelReport").setVisible(true);
        var oDisplayStockTransferModel = new sap.ui.model.xml.XMLModel();
        oDisplayStockTransferModel.attachRequestSent(function() {
            sap.ui.core.BusyIndicator.show(1);
        });

        if (storeLoc != "---" && wareNo != "---" && sType != "(')") {


            //oDisplayStockTransferModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStockInventory_Results"),"Param.2="+storeLoc+"&Param.3="+wareNo+"&Param.4="+sType+"&Param.5="+encodeURIComponent(sBin)+"&Param.6="+batch+"&Param.7="+material+"&Param.11="+sscc+"&d="+DateNw+"&Content-Type=text/xml", true,"POST");	
            oDisplayStockTransferModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU"), "Param.2=" + storeLoc + "&Param.3=" + wareNo + "&Param.4=" + sType + "&Param.5=" + encodeURIComponent(sBin) + "&Param.6=" + batch + "&Param.7=" + material + "&Param.8=4&Param.10=" + userLanguage + "&Param.11=" + sscc + "&d=" + DateNw + "&OutputParameter=O_TODisplayDataXML&Content-Type=text/xml", true, "GET");

        }
        oDisplayStockTransferModel.attachRequestCompleted(function() {
            sap.ui.core.BusyIndicator.hide();
            oDisplayTable = sap.ui.getCore().getElementById("TransferDisplay--TransferStockTable");
            oDisplayStockTransferModel.setSizeLimit(100000);
            oDisplayTable.setModel(oDisplayStockTransferModel);


        });

        //oDisplayTable.bindRows("/Rowset/Row");  


        oDisplayTable = sap.ui.getCore().getElementById("TransferDisplay--TransferStockTable");

    },
    pressGetExcelReportFn: function() {
        var dateRefresh = new Date();
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        var wareNo = this.getView().byId("wareNum").getValue();

        odisplayTable = this.getView().byId("TransferStockTable");

        // alert(oDisplayTable.getFixedRowCount());

        inpXML = oDisplayTable.getModel().getXML();
        //console.log(inpXML);
        // alert($(inpXML).find('Row').text());
        var Url = "/XMII/Runner?Transaction=MaterialHandling/TO_Movement/Transactions/BLS_ExportDataOfTransferStock";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", Url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = "blob";
        xhr.onload = function(eventInfo) {
            if (this.status == 200) {
                var blob = this.response;
                // FileSaver.js usage:
                saveAs(blob, "Exported.xls");
            }
        };
        xhr.send("SLoc=" + encodeURIComponent(storeLoc) + "&WareHouseNo=" + encodeURIComponent(wareNo) + "&InputXML=" + encodeURIComponent(inpXML) + "&d=" + dateRefresh + "&OutputParameter=Data");
    },

    getSelectedValues: function() {
        var storageLocation;
        var warehouseNo;
        var storageType;
        var DateNw = new Date();
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        var wareNo = this.getView().byId("wareNum").getValue();
        var storeType = this.getView().byId("sType").getSelectedKeys();

        var sB = this.getView().byId("sBin").setEnabled(true);
        var chkboxAll2 = this.getView().byId("allChckBox2").setEnabled(true);

        var j = storeType.length;

        for (var i = 0; i < j; i++) {
            var storeTypeString = storeType[i];

            if (storeTypeString.length > 0) {
                if (i == 0) {
                    storageType = "'" + storeTypeString + "'";

                } else {
                    storageType = storageType + ",'" + storeTypeString + "'";
                }
            }
        }
        sType = "(" + storageType + ")";


        // alert(sType);


        ///////////////////////////////////////// Select StorageBin ///////////////////////////////////////////

        var ostoBinModel = new sap.ui.model.xml.XMLModel();
        ostoBinModel.setSizeLimit(10000);
        ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageBin&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&Param.3=" + sType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var sBin = this.getView().byId("sBin");
        var osBinitemline = new sap.ui.core.ListItem();
        osBinitemline.bindProperty("text", "STGE_BIN");
        osBinitemline.bindProperty("key", "STGE_BIN");
        sBin.bindItems("/Rowset/Row", osBinitemline);
        sBin.setModel(ostoBinModel);
        if (sBinFromURL!=undefined && sBinFromURL!="undefined" && sBinFromURL!= null && sBinFromURL!="" && sBinFromURL!="---"){
          sBin.setSelectedKeys([sBinFromURL]);
          sBin.fireSelectionFinish();
          oControllerIMR.doDisplay();
        }
        //this.getView().byId("mat").setEnabled(false);
        //this.getView().byId("mat").setSelectedKeys("");
        //this.getView().byId("allChckBox3").setSelected(false);
        //this.getView().byId("allChckBox3").setEnabled(false);
    },

    getStorageBin: function() {
        var DateNw = new Date();
        var stoBin;
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        var wareNo = this.getView().byId("wareNum").getValue();
        var storeBin = this.getView().byId("sBin").getSelectedKeys();
        var chkboxAll1 = this.getView().byId("allChckBox1");
        var material1 = this.getView().byId("mat").setEnabled(true);
        //var chkboxAll3 = this.getView().byId("allChckBox3").setEnabled(true);
        var j = storeBin.length;

        for (var i = 0; i < j; i++) {
            var storeBinString = storeBin[i];
            if (i == 0) {
                stoBin = "'" + storeBinString + "'";
            } else if (i > 0 && storeBinString != "") {
                stoBin = stoBin + ",'" + storeBinString + "'";
            }
        }
        sBin = "(" + stoBin + ")";
        if (chkboxAll1.getSelected() == true) {
            var ostoTypeModel = new sap.ui.model.xml.XMLModel();
            ostoTypeModel.setSizeLimit(10000);
            ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageType&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

            var sTypexml = ostoTypeModel.getData();
            var Type = "";
            $(sTypexml).find('Row').each(function() {
                var Types = $(this).find('STGE_TYPE');
                var length = $(Types).length;
                $(Types).each(function(index) {
                    Type += "','" + Types.eq(index).text();
                });
            });
            var sType1 = Type.substr(2, Type.length);
            sType = "(" + sType1 + "')";
        }
        ///////////////////////////////////////// Select Material ///////////////////////////////////////////

        var oMaterialModel = new sap.ui.model.xml.XMLModel();
        oMaterialModel.setSizeLimit(10000);
        oMaterialModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetMaterial&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&Param.3=" + sType + "&Param.4=" + sBin + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        var mat = this.getView().byId("mat");
        var omatitemline = new sap.ui.core.ListItem();
        omatitemline.bindProperty("text", "MATERIAL");
        omatitemline.bindProperty("key", "MATERIAL");
        // mat.bindItems("/Rowset/Row", omatitemline);
        mat.setModel(oMaterialModel);
    },

    ChartMultiComboSelection1: function() {
        var DateNw = new Date();
        var chkboxAll1 = this.getView().byId("allChckBox1");
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        var wareNo = this.getView().byId("wareNum").getValue();
        if (chkboxAll1.getSelected() == true) {
            var storeType1 = this.getView().byId("sType").setSelectedKeys("");
            var storeType = this.getView().byId("sType").setEnabled(false);
            var sB = this.getView().byId("sBin").setEnabled(true);
            var chkboxAll2 = this.getView().byId("allChckBox2").setEnabled(true);

            ///////////////////////////////////////// Select StorageBin ///////////////////////////////////////////

            var ostoTypeModel = new sap.ui.model.xml.XMLModel();
            ostoTypeModel.setSizeLimit(10000);
            ostoTypeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageType&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            var sTypexml = ostoTypeModel.getData();
            var Type = "";
            $(sTypexml).find('Row').each(function() {
                var Types = $(this).find('STGE_TYPE');
                var length = $(Types).length;
                $(Types).each(function(index) {
                    Type += "','" + Types.eq(index).text();
                });
            });

            var sType1 = Type.substr(2, Type.length);
            sType = "(" + sType1 + "')";

            var ostoBinModel = new sap.ui.model.xml.XMLModel();
            ostoBinModel.setSizeLimit(10000);
            ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageBin&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&Param.3=" + sType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            var sBin = this.getView().byId("sBin");
            var osBinitemline = new sap.ui.core.ListItem();
            osBinitemline.bindProperty("text", "STGE_BIN");
            osBinitemline.bindProperty("key", "STGE_BIN");
            sBin.bindItems("/Rowset/Row", osBinitemline);
            sBin.setModel(ostoBinModel);
        } else {
            var storeType = this.getView().byId("sType").setEnabled(true);
        }
    },

    ChartMultiComboSelection2: function() {
        var DateNw = new Date();
        var chkboxAll1 = this.getView().byId("allChckBox1");
        var chkboxAll2 = this.getView().byId("allChckBox2");
        var storeLoc = this.getView().byId("sLoc").getSelectedKey();
        var wareNo = this.getView().byId("wareNum").getValue();

        if (chkboxAll2.getSelected() == true) {
            var storBin1 = this.getView().byId("sBin").setSelectedKeys("");
            var storeBin = this.getView().byId("sBin").setEnabled(false);
            var material1 = this.getView().byId("mat").setEnabled(true);
            //var chkboxAll3 = this.getView().byId("allChckBox3").setEnabled(true);
            var ostoBinModel = new sap.ui.model.xml.XMLModel();
            ostoBinModel.setSizeLimit(10000);
            ostoBinModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetStorageBin&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&Param.3=" + sType + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);

            var sBinxml = ostoBinModel.getData();
            var Bin = "";
            $(sBinxml).find('Row').each(function() {
                var Bins = $(this).find('STGE_BIN');
                var length = $(Bins).length;
                $(Bins).each(function(index) {
                    Bin += "','" + Bins.eq(index).text();
                });
            });

            var sBin1 = Bin.substr(2, Bin.length);
            sBin = "(" + sBin1 + "')";


            var oMaterialModel = new sap.ui.model.xml.XMLModel();
            oMaterialModel.setSizeLimit(10000);
            oMaterialModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/MDOQ_GetMaterial&Param.1=" + storeLoc + "&Param.2=" + wareNo + "&Param.3=" + sType + "&Param.4=" + sBin + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
            var mat = this.getView().byId("mat");
            var omatitemline = new sap.ui.core.ListItem();
            omatitemline.bindProperty("text", "MATERIAL");
            omatitemline.bindProperty("key", "MATERIAL");
            mat.bindItems("/Rowset/Row", omatitemline);
            oMaterialModel.setSizeLimit(50000);
            mat.setModel(oMaterialModel);
        } else {

            var storeBin = this.getView().byId("sBin").setEnabled(true);
        }

    },



    rowSelectionDialog: function() {

        var DateNw = new Date();
        oBCPStatusModel = new sap.ui.model.xml.XMLModel();
        oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetBCPStatus&d=" + DateNw + "&Content-Type=text/xml"), "", false);
        oBCPStats = oBCPStatusModel.getProperty("/Rowset/Row/O_Flag");
        if (oBCPStats == "0" || oBCPStats == "2") {

            TOBatchFlag = 0;
            var DateNw = new Date();
            oDisplayTable = this.getView().byId("TransferStockTable");
            oSelectedContext = oDisplayTable.getSelectedIndex();
            if (oSelectedContext !== -1) {

                oTablindex1 = oDisplayTable.getContextByIndex(oSelectedContext);

                sscc = oDisplayTable.getModel().getProperty("STOR_UNIT", oTablindex1);
                localStorage.setItem("StorageUnit", sscc);

                storeLoc = oDisplayTable.getModel().getProperty("STGE_LOC", oTablindex1);
                localStorage.setItem("oStorageLoc", storeLoc);

                wareNo = oDisplayTable.getModel().getProperty("WHSENUMBER", oTablindex1);
                localStorage.setItem("oWHNumber1", wareNo);

                oMaterialNo = oDisplayTable.getModel().getProperty("MATERIAL", oTablindex1);
                localStorage.setItem("MaterialNo", oMaterialNo.replace(/^0+/, ''));

                oBatchNo = oDisplayTable.getModel().getProperty("BATCH", oTablindex1);
                localStorage.setItem("BatchNo", oBatchNo);

                oSLED = oDisplayTable.getModel().getProperty("EXPIRYDATE", oTablindex1);
                localStorage.setItem("SLED1", oSLED);

                oStorageBin = oDisplayTable.getModel().getProperty("STGE_BIN", oTablindex1);
                localStorage.setItem("StorageBin1", oStorageBin);
                //alert(oStorageBin);

                oQuantity = oDisplayTable.getModel().getProperty("AVAIL_STCK", oTablindex1);
                localStorage.setItem("Quantity1", oQuantity);

                oStorageType = oDisplayTable.getModel().getProperty("STGE_TYPE", oTablindex1);
                localStorage.setItem("StorageType", oStorageType);
                //alert(oStorageType);

                oStockCategory = oDisplayTable.getModel().getProperty("STOCK_CAT", oTablindex1);
                localStorage.setItem("StockCategory1", oStockCategory);

                oPlant = oDisplayTable.getModel().getProperty("PLANT", oTablindex1);
                localStorage.setItem("Plant", oPlant);

                oUOM = oDisplayTable.getModel().getProperty("CommercialUOM", oTablindex1);
                localStorage.setItem("CommUOM", oUOM);

                commercialUOM = oUOM;

                oBaseUOM = oDisplayTable.getModel().getProperty("BASE_UOM", oTablindex1);
                localStorage.setItem("UOM", oBaseUOM);
                //alert(oBaseUOM);

                oProdDate = oDisplayTable.getModel().getProperty("PROD_DATE", oTablindex1);
                localStorage.setItem("ProdDate", oProdDate);

                oUnitType = oDisplayTable.getModel().getProperty("UNITTYPE_1", oTablindex1);
                localStorage.setItem("UnitType", oUnitType);

                oBatchStatus = oDisplayTable.getModel().getProperty("RESTRICTED", oTablindex1);
                localStorage.setItem("SBatchStatus", oBatchStatus);

                oStockStatus = oDisplayTable.getModel().getProperty("RESTRICTED", oTablindex1);

                if (oQuantity <= 0) {
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert3"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
                }
                /*else if(oBatchNo=="---" || oBatchNo=="" || oBatchNo==null)
		{

		           sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay,"TransferDisplay_alert18"),sap.ui.commons.MessageBox.Icon.INFORMATION,getPropertyValue(oResourceModelTransDisplay,"TransferDisplay_Message"));
		}*/
                else {
                    if (flag == 0) {

                        oTablindex = oDisplayTable.getSelectedIndex().toString();
                        var len = oTablindex.length;
                        index = oTablindex.substr(len - 1, len);
                        var trasferSu = "TRANSFERTYPESU";
                        var trasferNonSu = "TRANSFERTYPENONSU";

                        selectList = new sap.m.SelectList({
                            selectionChange: sap.ui.controller("JS.TransferDisplay").okDialogFn
                        });
                        var odialogItemline = new sap.ui.core.ListItem();
                        odialogItemline.bindProperty("text", "Value");
                        odialogItemline.bindProperty("key", "Key");
                        selectList.bindItems("/Rowset/Row", odialogItemline);

                        if (sscc != "---") {
                            TrasferType = "SU";
                            var odialogModel1 = new sap.ui.model.xml.XMLModel();
                            odialogModel1.setSizeLimit(10000);
                            odialogModel1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + trasferSu + "&Param.4=" + oStorageType + "&Param.12=" + encodeURIComponent(oStorageBin) + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                            selectList.setModel(odialogModel1);
                        } else {
                            TrasferType = "NONSU";
                            var odialogModel2 = new sap.ui.model.xml.XMLModel();
                            odialogModel2.setSizeLimit(10000);
                            odialogModel2.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=" + trasferNonSu + "&Param.4=" + oStorageType + "&Param.12=" + encodeURIComponent(oStorageBin) + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                            selectList.setModel(odialogModel2);
                        }
                        var oDialogLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
                            labelSpanL: 2,
                            labelSpanM: 1,
                            labelSpanS: 1,
                            emptySpanL: 0,
                            emptySpanM: 0,
                            emptySpanS: 0,
                            columnsL: 1,
                            columnsM: 1,

                        });

                        var oDialogFormLabels = new sap.ui.layout.form.Form({
                            layout: oDialogLayoutLabels,
                            formContainers: [
                                new sap.ui.layout.form.FormContainer({
                                    formElements: [
                                        new sap.ui.layout.form.FormElement({
                                            fields: [selectList]
                                        })
                                    ]
                                })

                            ]
                        });
                        oDialog1 = new sap.m.Dialog({
                            title: getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert9"),
                            content: [selectList],
                            buttons: [

                                new sap.m.Button({
                                    text: getPropertyValue(oResourceModelTransDisplay, "NPDashboard_Cancel"),
                                    press: function() {


                                        oDialog1.close();
                                    }

                                })
                            ],


                        });

                        oDialog1.setContentWidth("500px");
                        oDialog1.setContentHeight("300px");
                        oDialog1.open();
                    } else {
                        oDisplayTable2.setVisible(true);
                    }
                }
            } else {

            }
        } else {
          
            oDisplayTable = this.getView().byId("TransferStockTable");
            oSelectedContext = oDisplayTable.getSelectedIndex();
            if (oSelectedContext !== -1) {

                oTablindex1 = oDisplayTable.getContextByIndex(oSelectedContext);
                sscc = oDisplayTable.getModel().getProperty("STOR_UNIT", oTablindex1).replace(/^0+/, '');
                storeLoc = oDisplayTable.getModel().getProperty("STGE_LOC", oTablindex1);
                wareNo = oDisplayTable.getModel().getProperty("WHSENUMBER", oTablindex1);
                oMaterialNo = oDisplayTable.getModel().getProperty("MATERIAL", oTablindex1).replace(/^0+/, '');
                oBatchNo = oDisplayTable.getModel().getProperty("BATCH", oTablindex1);
                oStorageBin = oDisplayTable.getModel().getProperty("STGE_BIN", oTablindex1);
                oStorageType = oDisplayTable.getModel().getProperty("STGE_TYPE", oTablindex1);
                oStockCategory = oDisplayTable.getModel().getProperty("STOCK_CAT", oTablindex1);
                oPlant = oDisplayTable.getModel().getProperty("PLANT", oTablindex1);
                paramECCTransferType = "Param.1=" + (oBatchNo=="---"?"":oBatchNo) + "&Param.2=" +(oStorageType=="---"? "":oStorageType)+ "&Param.3=" +(oStorageBin=="---"? "": encodeURIComponent(oStorageBin))+ "&Param.4=" +sscc
						+ "&Param.5=" +oPlant+ "&Param.7=" +oMaterialNo+ "&Param.8=" +(storeLoc=="---"? "":storeLoc)
						+ "&Param.9=" +(wareNo=="---" ?"":wareNo)+ "&Param.10=" +(oStockCategory=="---"?"":oStockCategory);

                var mList_dialogContent= new sap.m.List({
						itemPress : sap.ui.controller("JS.TransferDisplay").okDialogFnBCPOFF });
                var listItem = new sap.m.DisplayListItem({type: "Active"});
                listItem.bindProperty("label", "Value");
                listItem.bindProperty("value", "Key");
                mList_dialogContent.bindItems("/Rowset/Row", listItem);
                var odialogModel1 = new sap.ui.model.xml.XMLModel();
                if (sscc=="" || sscc=="---"){
                    odialogModel1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=ECCTRANSFER&Param.13=NONSU&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                } else{
                    odialogModel1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetData_ComboBox&Param.1=ECCTRANSFER&Param.13=SU&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                }
                mList_dialogContent.setModel(odialogModel1);

                oDialog12 = new sap.m.Dialog({
                            title: getPropertyValue(oResourceModelTransDisplay, "TO_TransferTypeSelect_ECC"),
                            content: [mList_dialogContent],
                            buttons: [ new sap.m.Button({
                                    text: getPropertyValue(oResourceModelTransDisplay, "NPDashboard_Cancel"),
                                    press: function() { oDialog12.close(); }
                                })],
                        });
                oDialog12.setContentWidth("500px");
                oDialog12.setContentHeight("300px");
                oDialog12.open();
                }
          }
    },

   okDialogFnBCPOFF: function(evt){

        var iTCode= evt.getParameters()["listItem"].getValue();
        var oECCURLModel = new sap.ui.model.xml.XMLModel();
        oECCURLModel.attachRequestSent(function() {
            sap.ui.core.BusyIndicator.show(1);
        });
        var dateRefresh = new Date();
        paramECCTransferType= paramECCTransferType+"&Param.6=" +iTCode;
        oECCURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetECCTransferTypesURL&"+paramECCTransferType+"&cache=" + dateRefresh + "&Content-Type=text/xml"), "", true);
        oECCURLModel.attachRequestCompleted(function() {
            sap.ui.core.BusyIndicator.hide();
            var oURL = oECCURLModel.getProperty("/Rowset/Row/O_ECCURL");
            window.open(oURL); oDialog12.close();
        });
},
    okDialogFn: function(event) {
        selectedItem = selectList.getSelectedKey();
       
        localStorage.setItem("HeaderType", selectedItem);
        var oSelectedItem = selectList.getSelectedItem().getText();

        localStorage.setItem("HeaderTypeText", oSelectedItem);

        TOBatchFlag = 0;
        if (selectedItem == "") {
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert5"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
        } else if (selectedItem == "STOCK_STATUS" && oStockCategory != "---") {
            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert6"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
            oDialog1.destroy();
        } else if (selectedItem == "B.NSU_B.NSU" || selectedItem == "B.SU_B.SU" || selectedItem == "B.MERGE_NSU" || selectedItem == "B.MERGE_SU") {
            /********************************************Restricting transfer from batch to batch for non Batch managed******************************/

            if (oBatchNo == "---" || oBatchNo == "" || oBatchNo == null) {

                sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_NonBatchMsg"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
            }

            /***************************************************************End***************************************************************************************/
            else {
                if (oStockStatus == "---" && oStockCategory == "---") {
                    oDisplayTable2.setVisible(true);
                    oDisplayTable.setTitle("Source");
                    oDisplayTable2.setTitle("Destination");
                    //oSelectionPanel.setExpanded(false);
                    flag = "1";
                    var dateRefresh = new Date();

                    var oDisplayModel = new sap.ui.model.xml.XMLModel();
                    oDisplayModel.setSizeLimit(10000);
                    oDisplayModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.1=" + oStockCategory + "&Param.2=" + storeLoc + "&Param.3=" + wareNo + "&Param.4=" + oStorageType + "&Param.5=" + encodeURIComponent(oStorageBin) + "&Param.6=" + oBatchNo + "&Param.7=" + oMaterialNo + "&Param.8=5&Param.9=" + TrasferType + "&Param.10=" + userLanguage + "&Param.11=" + sscc + "&Param.12=" + oQuantity + "&Param.13=" + oSLED + "&Param.14=" + oUnitType + "&Param.15=" + oPlant + "&Param.16=" + oProdDate + "&Param.17=" + oBaseUOM + "&Param.20=" + oBatchStatus + "&Param.21=" + oUOM + "&d=" + dateRefresh + "&OutputParameter=O_SelectedTODataXML&Content-Type=text/xml"), "", false);
                    oDisplayTable.setModel(oDisplayModel);
                    oDisplayTable.bindRows("/Rowset/Row");

                    var oDisplayTOModel = new sap.ui.model.xml.XMLModel();
                    oDisplayModel.setSizeLimit(10000);
                    oDisplayTOModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XACQ_GetSSCCDetails_NonSUToSU&Param.2=" + storeLoc + "&Param.3=" + wareNo + "&Param.7=" + oMaterialNo + "&Param.8=1&Param.9=" + TrasferType + "&Param.10=" + userLanguage + "&d=" + dateRefresh + "&OutputParameter=O_TODisplayXML&Content-Type=text/xml"), "", false);
                    oDisplayTable2.setModel(oDisplayTOModel);
                    oDisplayTable2.bindRows("/Rowset/Row");

                    oDialog1.destroy();
                } else {
                    oDialog1.destroy();
                    jQuery.sap.require("sap.ui.commons.MessageBox");
                    sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert8"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
                }
            }
        } else {
            var page2 = sap.ui.view({
                id: "TransferOrder",
                viewName: "JS.TransferOrder",
                type: sap.ui.core.mvc.ViewType.XML
            });
            document.getElementById("tType").value = selectedItem;

            var app = sap.ui.getCore().byId("idapp");
            app.addPage(page2);
            app.to("TransferOrder", "show");
            oDialog1.destroy();
        }
    },
    rowSelectionDialog1: function(event) {
        oDisplayTable2 = this.getView().byId("TransferStockTable2");
        oSelectedContext = oDisplayTable2.getSelectedIndex();
        if (oSelectedContext !== -1) {
            var oTablindex2 = oDisplayTable2.getContextByIndex(oSelectedContext);

            storeLoc = oDisplayTable2.getModel().getProperty("STGE_LOC", oTablindex2);
            localStorage.setItem("oStorageLoc", storeLoc);

            wareNo = oDisplayTable2.getModel().getProperty("WHSENUMBER", oTablindex2);
            localStorage.setItem("oWHNumber1", wareNo);

            var Destsscc = oDisplayTable2.getModel().getProperty("STOR_UNIT", oTablindex2);
            localStorage.setItem("DestStorageUnit", Destsscc);

            var oBatchNo1 = oDisplayTable2.getModel().getProperty("BATCH", oTablindex2);
            localStorage.setItem("DestBatchNo", oBatchNo1);

            var oUnitType = oDisplayTable2.getModel().getProperty("UNITTYPE_1", oTablindex2);
            localStorage.setItem("DestUnitType", oUnitType);

            var oSLED1 = oDisplayTable2.getModel().getProperty("EXPIRYDATE", oTablindex2);
            localStorage.setItem("DestSLED", oSLED1);

            var oStorageBin1 = oDisplayTable2.getModel().getProperty("STGE_BIN", oTablindex2);
            localStorage.setItem("DestStorageBin", oStorageBin1);

            var oQuantity1 = oDisplayTable2.getModel().getProperty("AVAIL_STCK", oTablindex2);
            localStorage.setItem("DestQuantity", oQuantity1);

            var oStorageType1 = oDisplayTable2.getModel().getProperty("STGE_TYPE", oTablindex2);
            localStorage.setItem("DestStorageType", oStorageType1);

            var oStockCategory1 = oDisplayTable2.getModel().getProperty("STOCK_CAT", oTablindex2);
            localStorage.setItem("DestStockCategory", oStockCategory1);

            var oDestBatchStatus = oDisplayTable2.getModel().getProperty("BATCH_STATUS", oTablindex2);
            localStorage.setItem("DestBatchStatus", oDestBatchStatus);

            var DestStockStatus = oDisplayTable2.getModel().getProperty("RESTRICTED", oTablindex2);

            jQuery.sap.require("sap.ui.commons.MessageBox");
            sap.ui.commons.MessageBox.confirm(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert7"), fnCallbackConfirm, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Question"));

            function fnCallbackConfirm(bResult) {
                if (bResult == true) {
                    if (oStockStatus == "---" && oStockCategory == "---") {
                        var page2 = sap.ui.view({
                            id: "TransferOrder",
                            viewName: "JS.TransferOrder",
                            type: sap.ui.core.mvc.ViewType.XML
                        });
                        var app = sap.ui.getCore().byId("idapp");
                        app.addPage(page2);
                        app.to("TransferOrder", "show");
                        TOBatchFlag = 1;
                        localStorage.setItem("TOBatchFlag1", TOBatchFlag);
                    } else {
                        jQuery.sap.require("sap.ui.commons.MessageBox");
                        sap.ui.commons.MessageBox.alert(getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_alert8"), sap.ui.commons.MessageBox.Icon.INFORMATION, getPropertyValue(oResourceModelTransDisplay, "TransferDisplay_Message"));
                    }
                }

            }
        } else {}
    },
    getDateDisplayFormat: function(EXPIRYDATE) {

        if (EXPIRYDATE == "0000-00-00") {
            return EXPIRYDATE;
        } else {
            return formatDate(EXPIRYDATE, "yyyy-MM-dd");

        }
    },
    onSearch: function(oEvent) {
        var sQuery = oEvent.getSource().getValue();
        var oDisplayTable = this.getView().byId("TransferStockTable");


        var oFilter1 = new sap.ui.model.Filter("STGE_TYPE", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter2 = new sap.ui.model.Filter("STGE_BIN", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter3 = new sap.ui.model.Filter("MaterialDescription", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter4 = new sap.ui.model.Filter("MATERIAL", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter5 = new sap.ui.model.Filter("BATCH_STATUS", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter6 = new sap.ui.model.Filter("BATCH", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter7 = new sap.ui.model.Filter("EXPIRYDATE", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter8 = new sap.ui.model.Filter("PROD_DATE", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter9 = new sap.ui.model.Filter("AVAIL_STCK", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter10 = new sap.ui.model.Filter("CommercialUOM", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter11 = new sap.ui.model.Filter("STOR_UNIT", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter12 = new sap.ui.model.Filter("STOCK_CAT", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter13 = new sap.ui.model.Filter("PLANT", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter14 = new sap.ui.model.Filter("UNITTYPE_1", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter15 = new sap.ui.model.Filter("STGE_LOC", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter16 = new sap.ui.model.Filter("WHSENUMBER", sap.ui.model.FilterOperator.Contains, sQuery);
        var oFilter17 = new sap.ui.model.Filter("RESTRICTED", sap.ui.model.FilterOperator.Contains, sQuery);
        var allFilter = new sap.ui.model.Filter([oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8, oFilter9, oFilter10, oFilter11, oFilter12, oFilter13, oFilter14, oFilter15, oFilter16, oFilter17], false);


        oDisplayTable.getBinding("rows").filter(allFilter);



    },
    getSchedInfo: function() {


        var oXMLModelSched = new sap.ui.model.xml.XMLModel();
        oXMLModelSched.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/TO_Movement/QueryTemplate/XAC_GetStockDownloadSchedulersInfo&d=" + new Date() + "&Content-Type=text/xml"), "", false);

        var responseFast = oXMLModelSched.getProperty("/Rowset/Row/Fast_Movement_Type");
        oView.byId("FastID").setText(responseFast);
        var responseFreq = oXMLModelSched.getProperty("/Rowset/Row/Frequent_Movement_Type");
        oView.byId("FreqID").setText(responseFreq);
        var responseSlow = oXMLModelSched.getProperty("/Rowset/Row/Slow_Movement_Type");
        oView.byId("SlowID").setText(responseSlow);
    },


    getMateriaFormat: function(MATERIAL) {
        //console.log(MATERIAL);
        if (MATERIAL == null) {
            return "---";
        } else {
            return MATERIAL.replace(/^0+/, '');
        }
    }

});