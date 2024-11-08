var oControllerThis;
var userGrpSelect;
var dashboardSelect;
var userId, oDataFlag;
var line_NodeID, sortlines;
var resourceId, nodeID;
var plantId, lineNodeID;
var client;
var oUsrGrpDashbrdTable;
var saveBtton;
var goodsIssue_tile;
var goodsReceipt_tile;
var stockDisplayTrnsfr_tile;
var nestlePrfmnceMngmnt_tile, EPO_tile;
var processOrdValidation_tile;
var reprintLable_tile;
var printQ_tile, processordrpt_tile, materialrpt_tile,todashboard_tile;
var selectedSLocWhnoItem, selectedSourceState;
//var goodsmvt_tile;
var QMS_tile;
var inspectionRsltsRec_tile;
var AMM_tile;
var stock_tile;
var inbndMatRecpt_tile;
var rPrntLabel_tile;
var PrntQ_tile;
var tileDashboardAssignmnt;
var tileStorageFreqDisplay;
var tileReports;
var tileConfigurePrinter;
var oResourceModel;
var NodeModel;
var node_id;
var lineNodeId;
var line;
var planId_Desc;
var oBCPStats;
var tileBCP;
var eProcessOrder_tile;
var tileAppVersion;
var tileLUReports;
var tileMTBSReports;
var tileORReports;
var tileAIReports;
var tileSAReports;
var tileAIRReports;
var tileDPRReports;
var tileECCRRReports;
var tileSRReports;
var tileNSAMConfig;
var switchBCPElement;
var bcpElement;
var tileBCPElement;
var monitorMRF_tile;
var tileSSPATCHER;
var tileBCPUIConfig;
var oNumRangeTable;
var tileLaborManagement;
var LMEnabledStatusFlag;
var tileSupportLbr;
var monitorEMM_tile;
var userLanguage;
var tileLMReports;
var linedesc, selectedPlant;
var rfDevice_tile;
var plantStageSelected, resourceStageSelected, TOStageSelected,PSAStageSelected;
var commaSeparatedLine;
var BKTXTmapping, SGTXTmapping;
var arrayForSTypeSBin = [];
var SbinStypeArray = [];
var intialAssignDashboardButton, userLocale;
var oFlag_OnAfterRendering, plantName;
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.CheckBox");
sap.ui.controller("nav.NestlePortal", {
    onInit: function() {
        oControllerThis = this;
        var DateNw = new Date();
        switchBCPElement = this.getView().byId("switchBCP");
        bcpElement = this.getView().byId("bcpHDR");
        tileBCPElement = this.getView().byId("image_bcp");
        oBCPStats = getBCPStatus(bcpElement, switchBCPElement, tileBCPElement);
        oFlag_OnAfterRendering = 0;
        goodsIssue_tile = this.getView().byId("goodsIssue_tile");
        goodsIssue_tile.setVisible(false);
        goodsReceipt_tile = this.getView().byId("goodsReceipt_tile");
        goodsReceipt_tile.setVisible(false);
        rfDevice_tile = this.getView().byId("RFDevice_tile");

        stockDisplayTrnsfr_tile = this.getView().byId("stockDisplayTrnsfr_tile");
        stockDisplayTrnsfr_tile.setVisible(false);
        nestlePrfmnceMngmnt_tile = this.getView().byId("nestlePrfmnceMngmnt_tile");
        nestlePrfmnceMngmnt_tile.setVisible(false);
        processOrdValidation_tile = this.getView().byId("processOrdValidation_tile");
        processOrdValidation_tile.setVisible(false);
        reprintLable_tile = this.getView().byId("reprintLable_tile");
        reprintLable_tile.setVisible(false);
        printQ_tile = this.getView().byId("printQ_tile");
        printQ_tile.setVisible(false);
        //goodsmvt_tile = this.getView().byId("goodsmvt_tile");
        //goodsmvt_tile.setVisible(false);
        materialrpt_tile = this.getView().byId("materialrpt_tile");
        materialrpt_tile.setVisible(false);
        processordrpt_tile = this.getView().byId("processordrpt_tile");
        processordrpt_tile.setVisible(false);
	    todashboard_tile = this.getView().byId("todashboard_tile");
        todashboard_tile.setVisible(false);
        QMS_tile = this.getView().byId("QMS_tile");
        QMS_tile.setVisible(false);
        stock_tile = this.getView().byId("stock_tile");
        stock_tile.setVisible(false);
        inbndMatRecpt_tile = this.getView().byId("inbndMatRecpt_tile");
        inbndMatRecpt_tile.setVisible(false);
        rPrntLabel_tile = this.getView().byId("rPrntLabel_tile");
        rPrntLabel_tile.setVisible(false);
        PrntQ_tile = this.getView().byId("PrntQ_tile");
        PrntQ_tile.setVisible(false);
        tileDashboardAssignmnt = this.getView().byId("tileDashboardAssignmnt");
        tileDashboardAssignmnt.setVisible(false);
        tileStorageFreqDisplay = this.getView().byId("tileStorageFreqDisplay");
        tileStorageFreqDisplay.setVisible(false);
        //tileConfigurePrinter = this.getView().byId("tileConfigurePrinter");
        //tileConfigurePrinter.setVisible(false);
        tileBCP = this.getView().byId("tileBCP");
        tileBCP.setVisible(false);
        eProcessOrder_tile = this.getView().byId("eProcessOrder_tile");
        eProcessOrder_tile.setVisible(false);
        tileNSAMConfig = this.getView().byId("tileNSAMConfig");
        tileNSAMConfig.setVisible(false);
        monitorMRF_tile = this.getView().byId("monitorMRF_tile");
        monitorMRF_tile.setVisible(false);
        tileSSPATCHER = this.getView().byId("tileSSPATCHER");
        tileSSPATCHER.setVisible(false);
        tileBCPUIConfig = this.getView().byId("tileBCPUIConfig");
        tileBCPUIConfig.setVisible(false);
        monitorEMM_tile = this.getView().byId("monitorEMM_tile");
        monitorEMM_tile.setVisible(false);
        EPO_tile = this.getView().byId("emergencyprocessorder_tile");
        EPO_tile.setVisible(false);
        //Labor Management  
        tileLaborManagement = this.getView().byId("tileLaborManagement");
        tileLaborManagement.setVisible(false);
        tileSupportLbr = this.getView().byId("tileSupportLbr");
        tileSupportLbr.setVisible(false);
        ///////////////////////////////FeatOutage Info//////////////////////////////////////////
        var sharedPropModel = new sap.ui.model.xml.XMLModel();
        //sharedPropModel.loadData(encodeURI("/XMII/Catalog?Mode=GetRuntimePropertyList&Project=MaterialHandling&Content-Type=text/xml&d="+new Date()), "", false);
        sharedPropModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XAC_GetSPAsXML&Content-Type=text/xml&d=" + new Date()), "", false);
        var sharedPropXMLDoc = sharedPropModel.getData();
        var value_swsp_label = " ";
        var swsp_label = this.getView().byId("SWSPOutage");
        $(sharedPropXMLDoc).find('Property').each(function(index) {
            if ($(this).attr("Name") == "OutageTiming") {
                value_swsp_label = $(this).find("RuntimeValue").text();
            }
        });
        swsp_label.setText(value_swsp_label);
        //////////////////////////////////////////////////////////////////////// Report tiles /////////////////////////////////////////////////////////
        tileSRReports = this.getView().byId("tileSRReports");
        tileSRReports.setVisible(false);
        tileLMReports = this.getView().byId("tileLMReports");
        tileLMReports.setVisible(false);
        tileAIReports = this.getView().byId("tileAIReports");
        tileAIReports.setVisible(false);
        tileDPRReports = this.getView().byId("tileDPRReports");
        tileDPRReports.setVisible(false);
        tileECCRRReports = this.getView().byId("tileECCRRReports");
        tileECCRRReports.setVisible(false);
        //////////////////////////////////////////EPO and BCP tile for 2033 role///////////////////////////////////////////
        tileBCPorders = this.getView().byId("eBCPOrders_tile");
        tileBCPorders.setVisible(false);

        tileEPorders = this.getView().byId("emergencyOrder_tile");
        tileEPorders.setVisible(false);
        ///////////////////////////////////////////////////////////
        var oUserDataModel = new sap.ui.model.xml.XMLModel();
        oUserDataModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_GetUserData&d=" + DateNw + "&Content-Type=text/xml", "", false);
        userLanguage = oUserDataModel.getProperty("/Rowset/Row/O_Language");
        //alert("2 "+userLanguage);
        var page = this.getView().byId("tiles");
        var identifier = "NPortal46>NPDashboard_Report_LM,title30>EPO_EmergencyProcessOrder,NPortal54>NPDashboard_Process_Order_Report,NPortal64>MaterialReplinishment_Title,NPortal50>NPDashboard_Material_Master_Report,NPortalMRFEMM>NPDashboard_MRF_EMM,NPortal29>NPDashboard_SupportLbrHrs,NHPortal1>NPDashboard_Home,NPortal64>TO_DashboardTitle,NHPortal3>NPDashboard_Nestle_Portal,NHPortal71>NPDashboard_SaveDefault,NHPortal4>NPDashboard_Plant,NHPortal5>NPDashboard_Line,NHPortal6>NPDashboard_Resource,NPortal7>NPDashboard_SaveDefault,NPortalBCPUIConfig>NPDASHBOARD_TILE_BCP_UI_CONFIG,NPortalSSPATCHER>NPDashboard_SS_PATCHER_DISPLAY,NPortalMRFMonitor>NPDashboard_MRF_MONITOR,NPortal1>NPDashboard_Back,NPortal2>InBndMatRecpt_title_BCP,NPortal3>NPDashboard_MFG,NPortal4>NPDashboard_MFG,NPortal5>NPDashboard_Goods_Issue,NPortal6>NPDashboard_Goods_Receipt,NPortal7>NPDashboard_Stock_Display_Transfer,NPortal8>NPDashboard_Nestle_Performance_Management,NPortal9>NPDashboard_Process_Order_Validation,NPortal10>NPDashboard_Reprint_Label,NPortal11>NPDashboard_Print_Queue,NPortal12>NPDashboard_Goods_Movement_Report,NPortal13>NPDashboard_QM,NPortal14>NPDashboard_QM,NPortal15>NPDashboard_QMS,NPortal16>NPDashboard_Inspection_Lot_Results_Recording,NPortal17>NPDashboard_AMM,NPortal18>NPDashboard_AMM,NPortal19>NPDashboard_AMM,NPortal20>NPDashboard_Stock_Mgmt,NPortal21>NPDashboard_Stock_Management,NPortal22>NPDashboard_Stock_Display_Transfer,NPortal23>NPDashboard_Inbound_Material_Receipt,NPortal24>NPDashboard_Reprint_Label,NPortal25>NPDashboard_Print_Queue,NPortal26>NPDashboard_Admin,NPortal27>NPDashboard_Admin,NPortal28>NPDashboard_User_Dashboard_Assignment,NPortal29>NPDashboard_Storage_Type_Enquiry_Frequency_Display,NPortal30>NPDashboard_Configure_Printer,NPortal31>NPDashboard_Update_SP_StorageType,NPortal32>NPDashboard_MES_SYNC,NPortal33>NPDashboard_NSAM_CONFIG,NPortal34>EPO_UI_TILE_HEADER,NPortal35>NPDashboard_MAT_STRG_MAPPING,NPortal36>NPDashboard_BCP,NPortal39>NPDashboard_Report,NPortal40>NPDashboard_Report,NPortal41>NPDashboard_Report_LU,NPortal42>NPDashboard_Report_MTBS,NPortal43>NPDashboard_Report_OR,NPortal44>NPDashboard_Report_SA,NPortal45>NPDashboard_Report_AIR,NPortal46>NPDashboard_Report_SR,NPortal47>NPDashboard_ABOUT,NPortal48>NPDashboard_ABOUT,NPortal51>NPDashboard_Report_AI,NPortal52>NPDashboard_Report_DPR,NPortal53>NPDashboard_Report_ECCRR,NPortal49>NPDashboard_Version_Info,HealthCheck>NPDashboard_MRF_HealthCheck";
        localize(page, identifier, userLanguage);
        var properties = "NPDashboard_NSAM_Configurations_Report,NPM_HALB_MAT,NPM_ZRWK_MAT,POPOVER_LOGOUT,GI_Stage_Enable_Backflush,TO_DashboardConfigLabel,NPM_EWM_GR_SUIndicator,TODashboard_PSAEditable,LOGOFF_CONFIRM_MSG,LOGOFF_ERROR,LOGOFF_CONFIRMATION,TO_DashboardTitle,GI_Stage_SelectResc,GI_Stage_Enable,GI_Stage_Plant,GI_Stage_Resource,CUSTOM_MSG1,NPDASHBOARD_BCPUI_GR_PALLETINFOFIELD,NPDASHBOARD_BCPUI_BATCHMERGE,NPDASHBOARD_BCPUI_RFDEVICE,NPDASHBOARD_BCPUI_RFCHECKBOX,NPM_SGTXT_MAPPING,GI_Stage_ConfigBtn,PrintMsg_Msg14,NPM_Pallet_User,NPM_Pallet_Mand,NPM_Pallet_Header,NPM_Pallet_Item,NPM_BKTXT_MAPPING,NPM_BKTXT_USNAME_MAPPING,Custom_GR_UpdateSuccess,NPDASHBOARD_BCPUI_GR_BIN_DETERMINATION,NPDASHBOARD_BCPUI_GIGR_CONFIRMATION,NPDASHBOARD_BCPUI_GRMSG_CONFIRMATION,NPDASHBOARD_BCPUI_GIMSG_CONFIRMATION,NPDASHBOARD_BCPUI_GISLED_CONFIRMATION,NPDASHBOARD_BCPUI_CLEARRESERVATION_CONFIRMATION,NPDASHBOARD_BCPUI_GRBATCH_CONFIRMATION,NPDASHBOARD_BATCH_FORMAT_SUCCESS_MESSAGE,TransferDisplay_BCPStatus,NPDashboard_Error_Occurred_InvalidValues,NPDAHSBOARD_DOC_NUMBER_RANGE_UPDATE_ERROR,NPDASHBOARD_ERROR_MESAGE,PrintMsg_Msg14,TransferType_Lbl_StorageLocation,NP_PortalDownload,NP_PortalSLOCWHUpdate,NP_PortalSLOCWHRemove,NP_PortalSLOCWHBlank,NP_PortalDownloadSuccess,NPDASHBOARD_GR_CONFIRMATION_ENABLED,NPDASHBOARD_GR_CONFIRMATION_DISABLED,ODATA_Error,NPM_JULIAN_DATE_FORMAT,NPDashboard_False,NPDashboard_True,NPM_PLANT_CODE_FORMAT,NPDashboard_ProcessOrder_ShiftConfiguration,NPDashboard_Reason_code_Assignment_Report,NPDASHBOARD_BCPUI_RF_VERIFICATION_ID_LIST,NPDashboard_Reason_code_Report,NPDASHBOARD_BCPUI_CR_STATUS_CONFIG,NPDASHBOARD_BCPUI_HALB_MATERIAL_TYPE,NPDASHBOARD_CR_STATUS_CHNAGE_SUCCESS_MESAGE,NPM_Successfully_Inserted,NPDASHBOARD_MES_STOCK_SYNC_Inbound,NPM_FICO_codes_inserted,NPM_Labor_Category_codes_inserted,NPM_Labor_Activity_codes_inserted,NPM_Linked_codes_inserted,NPM_Present_Already,NPM_Delta_FICO_codes_inserted_successfully,NPM_Delta_Labor_Activity_codes_inserted_successfully,NPM_Delta_Linked_Error,NPM_Delta_Linked_Success,NPM_Delta_Labor_Activity_Error,NPM_Delta_Fico_Error,NPM_Delta_Labor_Category_Error,NPM_Delta_Labor_Category_Success,NPM_COMMON_SELECT_PLANT,NPDashboard_Select_Plnt,NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE,NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG,NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_DIGITS_FR,NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_DIGITS_TR,NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_DIGITS_PN,NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_FR,NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_TR,NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_PN,NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_COMMON,NPDAHSBOARD_DOC_NUMBER_RANGE_UPDATE_SUCCESS,NPDAHSBOARD_DOC_NUMBER_RANGE_UPDATE_ERROR,NPDASHBOARD_DOC_NUM_RANGES,NPDASHBOARD_CONFIG_PRINTER,NPDASHBOARD_DOC_NAME,NPDASHBOARD_DOC_FROM_RANGE,NPDASHBOARD_DOC_TO_RANGE,NPDASHBOARD_DOC_PRESENT_RANGE,NPDashboard_Update_SP_StorageType,NPDashboard_MES_SYNC,NPDashboard_NSAM_CONFIG,NPDashboard_MAT_STRG_MAPPING,NPDASHBOARD_CUR_DT_FRMT,NPDASHBOARD_DECIMAL_SYMBL,NPDASHBOARD_VERIFY,NPDASHBOARD_CHANGE,NPORTAL_IMR_CONFIRMATION,NPDASHBOARD_TILE_BCP_UI_CONFIG,NPDASHBOARD_BCPUI_GR_CONFIRMATION,NPDashboard_Save,NPDASHBOARD_DF_CHNAGE_SUCCESS_MESAGE,NPDASHBOARD_ERROR_MESAGE,NPDASHBOARD_INPUT_ERROR_MESAGE,NPDASHBOARD_INPUT_SYMBOL_ERROR_MESAGE,NPDashboard_Success,NPDASHBOARD_SF_CHNAGE_SUCCESS_MESAGE,NPDASHBOARD_MST_ACCESS_LIMITED,NPDashboard_Warning,BCP_SWITCHING_ERROR_ALREADY_OFF,NPDashboard_Error,BCP_SWITCHING_ERROR_ALREADY_ON,BCP_SWITCHING_ERROR,NPDashboard_Error,NPDashboard_Add,NPDashboard_User_Group_Field_Blank,NPDashboard_Dashboard_Field_Blank,NPDashboard_SingleUserGroup_Dashboard_Assignment_Successful,NPDASHBOARD_MSGTYPE_CHANGE_SUCCESS_MESSAGE,NPDashboard_Information,NPDashboard_AllUserGroup_Dashboard_Assignment_successful,NPDashboard_Addition_Failed_Error_Occurred,NPDashboard_SingleAddition_Failed_UserGroup_Dashboard_Assignment_Already_Exist,NPDashboard_AllAddition_Failed_UserGroup_Dashboard_Assignment_Already_Exist,NPDashboard_AdditionFailed_InvalidValues,NPDashboard_BETWEEN,NPDashboard_User_Group_Dashboard_AssignmentPartialSuccessful,NPDashboard_Successful,NPDashboard_And,NPDashboard_Addition_Partial_Successful,NPDashboard_Warning,NPDashboard_Among,NPDashboard_User_Group_Dashboard_AssignmentPartialSuccessful,NPDashboard_Error_Occurred_InvalidValues,NPDashboard_Delete,NPDashboard_Select_User_Group_Dashboard_To_delete,NPDashboard_Successful_Deletion_UserGroupDashboard,NPDashboard_UserGroupDashboard_Deletion_Failed,NPDashboard_UserGroupDashboard_Part_Deletion_Success_Count,NPDashboard_UserGroupDashboard_Part_Deletion_Failed_Count,NPDashboard_User_Group,NPDashboard_Dashboard,NPDashboard_User_Group_Custom_Dashboard,NPDashboard_User_Group,NPDashboard_Dashboard,NPDashboard_Reported_Date,NPDashboard_Reported_User,NPDashboard_User_Dashboard_Assignment,NPDASHBOARD_TO_MSGTYPE,NPDashboard_Close,NPDashboard_User_Group,NPDashboard_Ok,NPDashboard_Close,NPDashboard_Dashboard,NPDashboard_Close,NPDashboard_Scheduler,NPDashboard_Frequency,NPDashboard_Storage_Type_Configured,NPDashboard_BCP_Inventory_Download_Jobs,NPDashboard_BCP_Inventory_Download_Jobs,NPDASHBOARD_EXISTING_ST,NPDASHBOARD_MB_ST_FAST_MOVING,NPDASHBOARD_MB_ST_FREQ_MOVING,NPDASHBOARD_MB_ST_Slow_MOVING,NPDASHBOARD_MB_ST_NEW,NPDASHBOARD_MB_ST_VALIDATION_MSG,NPDASHBOARD_MB_ST_NEW,Print_Update,NPDASHBOARD_MB_ADD,NPDASHBOARD_MB_NEW_ADD,NPDASHBOARD_MB_NEW_ADD_VLDTION,NPDASHBOARD_MB_NEW_ADD_VLDTION,NPDASHBOARD_MB_ST_NEW,NPDASHBOARD_MB_INPUT_VLDTION,NPDASHBOARD_MB_INPUT_VLDTION,NPDASHBOARD_UST_STORAGE_TYPE,NPDASHBOARD_UST_STORAGE_TYPE,NPM_COMMON_SAVE,NPDAHSBOARD_MB_UPDATE_STORATETYPE_SUCCESS,NPDAHSBOARD_MB_UPDATE_STORATETYPE_ERROR,NPM_COMMON_CANCEL,NPDASHBOARD_MB_NEW_ADD,NPDASHBOARD_MES_STOCK_SYNC_HDR,NPDASHBOARD_MSS_SEARCH,NPDashboard_MES_Stock_Sync_Configuration,NPM_COMMON_SAVE,NPDAHSBOARD_MSS_UPDATE_MES_STOCK_SYNC_ERROR,NPDAHSBOARD_MSS_UPDATE_MES_STOCK_SYNC_SUCCESS,NPDASHBOARD_MES_STOCK_SYNC_INFO,NPDashboard_App_Version_Tbl_Hdr,NPDashboard_Version,NPDashboard_LAST_MODIFIED_DATE,NPDashboard_App_Version_Dialog_Hdr,NPDAHSBOARD_OEE_REPORTS_ERROR,NPDashboard_NSAM_CONFIG_LINK_GEN_CONFIG,NPDashboard_NSAM_CONFIG_LINK_ACTIVITY_CONFIG,NPDashboard_NSAM_CONFIG_LINK_DASHBOARD_CONFIG,NPDashboard_NSAM_CONFIG_LINK_DATA_UPLOAD_CONFIG,NPDashboard_NSAM_CONFIG_LINK_ORDER_DISPATCH_CONFIG,NPDashboard_NSAM_CONFIG_LINK_AUDIT_LOG_CONFIG,NPDashboard_NSAM_CONFIG_DIALOG_HDR,NPDashboard_Confirm,NPDashboard_BCPSwitchOff,NPDashboard_BCPMovement,NPDashboard_BCPSwitch,NPDashboard_BCPHistory,NPDashboard_BCPHistoryHeader,NPDashboard_BCPUser,NPDashboard_BCPTime,NPDashboard_BCPStatus,NPDashboard_BCPStatusTable,NPDashboard_BCPSwitchingMenu,NPDASHBOARD_TILE_LABOR_MANAGEMENT_CONFIG,NPDAHSBOARD_MB_BLANK_LINE,NPDAHSBOARD_MB_BLANK_LINE_ERROR,NPDashboard_No,NPDashboard_Yes,NPDashboard_Resource_And_Cost_Center,NPDashboard_FICO_ActivityType,NPDashboard_Initial_assignment,NPDAHSBOARD_MB_SAVE_LINE_DEF,NPDashboard_User_Group_Field_Save_Error,NPDashboard_Initial_UserGroup_Dashboard_Assignment_Successful,NPDashboard_Labor_Category_Activity,NPDashboard_Labor_Category,NPDASHBOARD_Labor_Rates,NPDASHBOARD_Labor_Standard,NPDASHBOARD_Labor_Planned_excepted,NPDashboard_Import_Global_Codes,NPDashboard_Start_Import_Global_Codes,Custom_GR_Error,NPDAHSBOARD_MB_SAVE_LINE_BLANK_ALERT,NPDashboard_Import_Delta_Global_Codes,NPDashboard_Matching_Delta_Global_Codes,NPDashboard_Inserting_Delta_Fico_Codes,NPDashboard_Inserting_Delta_Labor_Activity_Codes,NPDashboard_Inserting_Delta_Labor_Category_Codes,NPDashboard_Inserting_Delta_Linked_Codes,NPDashboard_Download_Templates,NPDashboard_Budgeted_Labor_Hours,NPDashboard_Plant_Hierarchy_Report,NPDashboard_NSAM_CONFIG_POSTINGDATE_CONFIG,SLOC_WHNO_DISPLAY,NPM_COMMON_SLOC,NPM_COMMON_WAREHOUSE,NPM_COMMON_STORAGE_TYPE,NPM_COMMON_STORAGE_BIN,NP_PortalSTypeSBinBlank,NPPortal_SameSTypeAndSBin,NP_BatchMergeEnable,NP_BatchMergeSaveMsg,NPDASHBOARD_NSAM_CONFIG_LINK_MASTERDATA,GI_ComponentList_Reset,GR_PRODUCTION_CONF_DATE,GR_PRODUCTION_JULIAN_DATE,GR_PRODUCTION_SHIFT_DATE,GI_PALLET_CONF";
        oResourceModel = getResourceModel(properties, userLanguage);
        var ClientModel = new sap.ui.model.xml.XMLModel();
        ClientModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/SQLQ_GetPlant_v1&d=" + DateNw + "&Content-Type=text/xml", "", false);
        client = ClientModel.getProperty("/Rowset/Row/CLIENT");
        plantLocale = ClientModel.getProperty("/Rowset/Row/PLANT");
        var PlantModel = new sap.ui.model.xml.XMLModel();
        PlantModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetPlantWithoutNode&Param.1=" + userLanguage + "&Content-Type=text/xml", "", false);
        //var plantdrp = this.getView().byId("plant");
        //var oListItemPlant = new sap.ui.core.ListItem();
        //oListItemPlant.bindProperty("text", "PLANT");
        //oListItemPlant.bindProperty("key", "PLANT");
        //plantdrp.bindItems("/Rowset/Row", oListItemPlant);
        //plantdrp.setModel(PlantModel);
        //plantdrp.setSelectedKey(plantLocale);
        this.getView().byId("plant").setValue(plantLocale);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////sorting lines//////////////////////////////////////////////////
        var Error = getPropertyValue(oResourceModel, "ODATA_Error");
        lineNodeID = this.getView().byId("workcenter").getSelectedKey();
        nodeID = lineNodeID == "" ? "NA" : lineNodeID;
        //selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        selectedPlant = oControllerThis.getView().byId("plant").getValue();
        var wrkcntrdrp = oControllerThis.getView().byId("workcenter");
        sortinglines(selectedPlant, client, userLanguage, wrkcntrdrp, Error, 0);
        ////  fetching line from previous selection /////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
        userId = document.getElementById("login").value;
        /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
        var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
        var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
        setIdleTime(sessionExpMsg, sessionExpTitle);
        /////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
        ////  fetching line from previous selection close /////

        ////////////Traslation Cockpit Tile Visibility only inside J34    /////////////////////
        var TranslationCockpitModel = new sap.ui.model.xml.XMLModel();
        TranslationCockpitModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetSIDForTranslationCockpit&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var TCSid = TranslationCockpitModel.getProperty("/Rowset/Row/OutputSid");
        if (TCSid == "J34") {
            oControllerThis.byId("TranslationCockpit_tile").setVisible(true);
        }

    },
    onAfterRendering: function(oEvent) {
        if (oFlag_OnAfterRendering == 0) {
            userId = document.getElementById("login").value;
            /////////////////////////////////////////////////////////////////////////// Timeout //////////////////////////////////////////////////////////////////////
            var sessionExpMsg = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_MESG");
            var sessionExpTitle = getPropertyValue(oResourceModel, "NPDAHSBOARD_TIMEOUT_CONFIRMATION_TITLE");
            setIdleTime(sessionExpMsg, sessionExpTitle);
            /////////////////////////////////////////////////////////////////////////// End of Timeout //////////////////////////////////////////////////////////
            ///////////////////////disable input in combo box////////////////////
            var comboboxName = this.getView().byId("workcenter");
            comboboxName.onAfterRendering = function() {
                if (sap.m.ComboBox.prototype.onAfterRendering) {
                    sap.m.ComboBox.prototype.onAfterRendering.apply(this);
                }
                document.getElementById("idNestlePortal--workcenter-inner").enabled = true;
            }
            ///////////////////////////close disable input in combo box////////////////
            setInterval(function() {
                oBCPStats = getBCPStatus(bcpElement, switchBCPElement, tileBCPElement);
            }, 30000);
            var DateNw = new Date();
            var panelAMM = this.getView().byId("panelAMM");
            panelAMM.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
            var panelMFG = this.getView().byId("panelMFG");
            panelMFG.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
            var panelQM = this.getView().byId("panelQM");
            panelQM.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
            var panelStock = this.getView().byId("panelStock");
            panelStock.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
            var panelReports = this.getView().byId("panelReports");
            panelReports.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
            var panelAdmin = this.getView().byId("panelAdmin");
            panelAdmin.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
            var iconTabBar = this.getView().byId("idIconTabBarNoIcons");
            iconTabBar.setBackgroundDesign(sap.m.BackgroundDesign.Transparent);
            var username = document.getElementById("firstname").value + " " + document.getElementById("lastname").value;
            oControllerThis.byId("shell2").getUser().setUsername(username);
            var clearNow = new Date();
            //var sPlant = oControllerThis.getView().byId("plant").getSelectedKey();
            var sPlant = oControllerThis.getView().byId("plant").getValue();
            var oLineCB = this.getView().byId("workcenter");
            var LineNode_id = this.getView().byId("workcenter").getSelectedKey();
            plantId = sPlant == "" ? plantLocale : sPlant;
            node_id = LineNode_id == undefined ? oControllerThis.getView().byId("workcenter").getSelectedKey() : LineNode_id;
            var oFeatPortalTransactionModel = new sap.ui.model.xml.XMLModel();
            oFeatPortalTransactionModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_OnLoadFeatPortalTransactions&Param.1=" + plantId + "&Param.2=" + client + "&Param.3=" + userLanguage + "&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
            if (oFeatPortalTransactionModel.getProperty("/Rowset/Row/LineNodeID") == "---" || oFeatPortalTransactionModel.getProperty("/Rowset/Row/LineNodeID") == "" || oFeatPortalTransactionModel.getProperty("/Rowset/Row/LineNodeID") == null || oFeatPortalTransactionModel.getProperty("/Rowset/Row/LineNodeID") == undefined) {
                oLineCB.setSelectedItem(oLineCB.getFirstItem());
            } else {
                this.getView().byId("workcenter").setSelectedKey(oFeatPortalTransactionModel.getProperty("/Rowset/Row/LineNodeID"));
            }
            var plant = oFeatPortalTransactionModel.getProperty("/Rowset/Row/Plant");
            plantName = oFeatPortalTransactionModel.getProperty("/Rowset/Row/PlantDescription");
            var headerLabel = oControllerThis.byId("label_header2");
            headerLabel.setText(plant + " - " + plantName);
            planId_Desc = plantId + " - " + plantName;
            LMEnabledStatusFlag = oFeatPortalTransactionModel.getProperty("/Rowset/Row/O_LMEnabled");
            sap.ui.controller("nav.NestlePortal").setDashboardVisibility(nodeID);
        }
        oFlag_OnAfterRendering = 1;
    },
    setDashboardVisibility: function(plantNodeID, dashboard) {

        var refresh = new Date();
        var visiblilityFlag = false;
        //var sPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var sPlant = oControllerThis.getView().byId("plant").getValue();
        //plantId = oControllerThis.getView().byId("plant").getSelectedKey() == "" ? plantLocale : sPlant;
        plantId = oControllerThis.getView().byId("plant").getValue() == "" ? plantLocale : sPlant;
        node_id = plantNodeID == undefined ? oControllerThis.getView().byId("workcenter").getSelectedKey() : plantNodeID;
	var oStageTOModel = new sap.ui.model.xml.XMLModel();
        oStageTOModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStagingConfiguration&Param.1=1&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var GIStageEnable = oStageTOModel.getProperty('/Rowset/Row/Output');
        var GIStageTODashboardEnable = oStageTOModel.getProperty('/Rowset/Row/OutputDashboard');
        var oAccessDetailsModel = new sap.ui.model.xml.XMLModel();
        oAccessDetailsModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetDashboardAccessDetails&Param.1=" + plantId + "&Param.2=" + client + "&Param.3=" + node_id + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var dashboardCount = $(oAccessDetailsModel.getXML()).find("Row").size();
        for (var i = 0; i < dashboardCount; i++) {
            if (dashboard == undefined || dashboard == "" || dashboard == null) {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Goods Issue(GI)") {

                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        goodsIssue_tile.setVisible(true);
                    } else {
                        goodsIssue_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Goods Receipt(GR)") {

                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        goodsReceipt_tile.setVisible(true);
                    } else {
                        goodsReceipt_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "RF Device Testing(RF_DEVICE)") {

                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        rfDevice_tile.setVisible(true);

                    } else {

                        rfDevice_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "OEE DASHBOARD(OEE_DASHBOARD)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        nestlePrfmnceMngmnt_tile.setVisible(true);
                    } else {
                        nestlePrfmnceMngmnt_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Reprint Label(REPRINT_LABEL)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        reprintLable_tile.setVisible(true);
                        rPrntLabel_tile.setVisible(true);
                    } else {
                        reprintLable_tile.setVisible(false);
                        rPrntLabel_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Process Order Validation(PROC_ORD_VALIDATION)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {

                        processOrdValidation_tile.setVisible(true);
                    } else {

                        processOrdValidation_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Inbound Material Receipt(INBND_MAT_RCPT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        inbndMatRecpt_tile.setVisible(true);
                    } else {
                        inbndMatRecpt_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Stock Display and Transfer(STOCK_DISPLAY_TRNSFR)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        stock_tile.setVisible(true);
                        stockDisplayTrnsfr_tile.setVisible(true);
                    } else {
                        stock_tile.setVisible(false);
                        stockDisplayTrnsfr_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Print Queue(PRINT_Q)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        printQ_tile.setVisible(true);
                        PrntQ_tile.setVisible(true);
                    } else {
                        printQ_tile.setVisible(false);
                        PrntQ_tile.setVisible(false);
                    }
                }
                /*
                		if(oAccessDetailsModel.getProperty("/Rowset/Row/"+i+"/Dashboard") == "Goods Movement Report(GOODS_MVMNT_REPORT)"){

                				if(oAccessDetailsModel.getProperty("/Rowset/Row/"+i+"/HasAccess") == "YES"){
                					goodsmvt_tile.setVisible(true);
                				}else{
                					goodsmvt_tile.setVisible(false);
                				}
                		}
                */
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Material Master Report(MATERIAL_MASTER_REPORT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        materialrpt_tile.setVisible(true);
                    } else {
                        materialrpt_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Process Order Report(PROCESS_ORDER_REPORT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        processordrpt_tile.setVisible(true);
                    } else {
                        processordrpt_tile.setVisible(false);
                    }
                }
	if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Transfer Order Dashboard(TRANSFER_ORDER_DASHBOARD)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                       if (GIStageEnable != "0" && GIStageTODashboardEnable == "1" ) {

       		todashboard_tile.setVisible(true);
                    } else {
                        todashboard_tile.setVisible(false);
                    }
		}
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "QMS(QMS)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        QMS_tile.setVisible(true);
                    } else {
                        QMS_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "User Group Dashboard Assignment(USER_GRP_DASHBRD_ASSIGNMNT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileDashboardAssignmnt.setVisible(true);
                    } else {
                        tileDashboardAssignmnt.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Storage Type and Frequency Display(STORGE_T_FREQ_DISPLAY)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileStorageFreqDisplay.setVisible(true);
                    } else {
                        tileStorageFreqDisplay.setVisible(false);
                    }
                }
                /*if(oAccessDetailsModel.getProperty("/Rowset/Row/"+i+"/Dashboard") == "Configure Printer(CONFIG_PRINTER)" ){

                		if(oAccessDetailsModel.getProperty("/Rowset/Row/"+i+"/HasAccess") == "YES"){
                			tileConfigurePrinter.setVisible(true);
                		}else{
                			tileConfigurePrinter.setVisible(false);
                		}
                }*/
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "BCP(BCP)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileBCP.setVisible(true);
                    } else {
                        tileBCP.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "BCP Process Order(BCP_PROCESS_ORDER)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {

                        eProcessOrder_tile.setVisible(true);
                    } else {
                        eProcessOrder_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "NSAM Configurations(NSAM_CONFIG)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileNSAMConfig.setVisible(true);
                    } else {
                        tileNSAMConfig.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "MRF Message Status Monitor(MRF_MSG_MONITOR)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        monitorMRF_tile.setVisible(true);
                    } else {
                        monitorMRF_tile.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Software Stack Patcher Display(SS_PATCHER_DISPLAY)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileSSPATCHER.setVisible(true);
                    } else {
                        tileSSPATCHER.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Emergency Process Order(EMERGENCY_PROCESS_ORDER)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        EPO_tile.setVisible(true);
                    } else {
                        EPO_tile.setVisible(false);
                    }
                }
                ///////////////////////////////////////////EPO and BCP process order tile display for 2033//////////////////////////////////////////

                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Emergency Process Order_2033User(EMERGENCY_PROCESS_ORDER_2033)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileEPorders.setVisible(true);
                    } else {
                        tileEPorders.setVisible(false);
                    }
                }

                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "BCP Process Order_2033User(BCP_PROCESS_ORDER_2033)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileBCPorders.setVisible(true);
                    } else {
                        tileBCPorders.setVisible(false);
                    }
                }
                ///////////////////////////////////////////////////////////////////////////////////////////END///////////////////////////////////////////////////////////////////////////
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "BCP UI Configurations(BCP_UI_CONFIG)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileBCPUIConfig.setVisible(true);
                    } else {
                        tileBCPUIConfig.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Extended Message Monitor(EMM)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        monitorEMM_tile.setVisible(true);
                    } else {
                        monitorEMM_tile.setVisible(false);
                    }
                }
                //Support Labour Hours
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Support Labour Hour(SM)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileSupportLbr.setVisible(true);
                    } else {
                        tileSupportLbr.setVisible(false);
                    }
                }
                /////////////////////////////////////////////////////////////////////////////// Report Tiles /////////////////////////////////////////////////////////////////////
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Detailed Stoppage Report(S_REPORT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileSRReports.setVisible(false);
                    } else {
                        tileSRReports.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Labour Management Report(LM_REPORT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileLMReports.setVisible(true);
                    } else {
                        tileLMReports.setVisible(false);
                    }
                }
                //Labor Management 
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Labour Management(LM)" && (LMEnabledStatusFlag == "ON")) {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileLaborManagement.setVisible(true);
                    } else {
                        tileLaborManagement.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Detailed AI Report-Free Anaysis(DETAILED_AI_REPORT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileAIReports.setVisible(true);
                    } else {
                        tileAIReports.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Daily Performance Report(DPR_REPORT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileDPRReports.setVisible(true);
                    } else {
                        tileDPRReports.setVisible(false);
                    }
                }
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "ECC Reconciliation Report(ECC_RECONCILIATION_REPORT)") {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        tileECCRRReports.setVisible(true);
                    } else {
                        tileECCRRReports.setVisible(false);
                    }
                }
            } else {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == dashboard) {
                    if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    },
    doLogoff2: function() {
        window.open("/XMII/Illuminator?service=logout&target=/XMII/CM/MaterialHandling/CustomMenu/index.irpt", "_blank");
    },
    doBCP: function() {
        var DateNw = new Date();
        var Status = oBCPStats;
        var dialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_Confirm"),
            type: 'Message',
            content: oBCPStats == "0" ? new sap.m.Text({
                text: getPropertyValue(oResourceModel, "NPDashboard_BCPSwitchOff") + '?'
            }) : new sap.m.Text({
                text: getPropertyValue(oResourceModel, "NPDashboard_BCPMovement") + '?'
            }),
            beginButton: new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_Yes"),
                press: function() {
                    if (oBCPStats == "1") {
                        var changeBCPModel = new sap.ui.model.xml.XMLModel();
                        changeBCPModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_StartStopECCServices&Param.1=stop&d=" + DateNw + "&Content-Type=text/xml", "", false);
                        var output_status = changeBCPModel.getProperty("/Rowset/Row/Output_Staus");
                        if (output_status == 1) {
                            sap.ui.getCore().byId("idNestlePortal--switchBCP").setState(false);
                            sap.ui.getCore().byId("idNestlePortal--bcpHDR").setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-Manual-On.png");
                            sap.ui.getCore().byId("idNestlePortal--image_bcp").setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-Manual-On.png");
                            //MessageToast.show('BCP ON !!');
                            oBCPStats = 0;
                        } else if (output_status == 2) {
                            oBCPStats = 1;
                            sap.ui.getCore().byId("idNestlePortal--bcpHDR").setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
                            sap.ui.getCore().byId("idNestlePortal--image_bcp").setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "BCP_SWITCHING_ERROR_ALREADY_OFF"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (output_status == 3) {
                            oBCPStats = 0;
                            sap.ui.getCore().byId("idNestlePortal--bcpHDR").setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-Auto-On.png");
                            sap.ui.getCore().byId("idNestlePortal--image_bcp").setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-Auto-On.png");
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "BCP_SWITCHING_ERROR_ALREADY_ON"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "BCP_SWITCHING_ERROR"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                    } else {
                        var changeBCPModel = new sap.ui.model.xml.XMLModel();
                        changeBCPModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/Common/QueryTemplates/XACQ_StartStopECCServices&Param.1=start&d=" + DateNw + "&Content-Type=text/xml", "", false);
                        var output_status = changeBCPModel.getProperty("/Rowset/Row/Output_Staus");
                        if (output_status == 1) {
                            sap.ui.getCore().byId("idNestlePortal--switchBCP").setState(true);
                            sap.ui.getCore().byId("idNestlePortal--bcpHDR").setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
                            sap.ui.getCore().byId("idNestlePortal--image_bcp").setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
                            //MessageToast.show('BCP OFF !!');
                            oBCPStats = 1;
                        } else if (output_status == 2) {
                            oBCPStats = 1;
                            sap.ui.getCore().byId("idNestlePortal--bcpHDR").setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
                            sap.ui.getCore().byId("idNestlePortal--image_bcp").setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-OFF-1.png");
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "BCP_SWITCHING_ERROR_ALREADY_OFF"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (output_status == 3) {
                            oBCPStats = 0;
                            sap.ui.getCore().byId("idNestlePortal--bcpHDR").setIcon("/XMII/CM/MaterialHandling/Common/Images/BCP-Manual-On.png");
                            sap.ui.getCore().byId("idNestlePortal--image_bcp").setSrc("/XMII/CM/MaterialHandling/Common/Images/BCP-Manual-On.png");
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "BCP_SWITCHING_ERROR_ALREADY_ON"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "BCP_SWITCHING_ERROR"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                    }
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
        var switchBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_BCPSwitch"),
            press: function() {
                dialogBCP.destroyContent();
                dialogBCP.destroy();
                dialog.open();
            }
        });
        switchBtn.addStyleClass("bgColor");
        if (oBCPStats == "2") {
            switchBtn.setEnabled(false);
        } else {
            switchBtn.setEnabled(true);
        }
        var historyBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_BCPHistory"),
            press: function() {
                dialogBCP.destroyContent();
                dialogBCP.destroy();
                var oBCPStatusModel = new sap.ui.model.xml.XMLModel();
                var clearNow = new Date();
                oBCPStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_SelectBCPHistory&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
                oBCPStatusTable = new sap.m.Table({
                    headerText: getPropertyValue(oResourceModel, "NPDashboard_BCPHistoryHeader"),
                    headerDesign: sap.m.ListHeaderDesign.Standard,
                });
                var userName = new sap.m.Column({
                    header: new sap.m.Label({
                        text: getPropertyValue(oResourceModel, "NPDashboard_BCPUser")
                    })
                });
                oBCPStatusTable.addColumn(userName);
                var timeNow = new sap.m.Column({
                    header: new sap.m.Label({
                        text: getPropertyValue(oResourceModel, "NPDashboard_BCPTime")
                    })
                });
                oBCPStatusTable.addColumn(timeNow);
                var statusBCP = new sap.m.Column({
                    header: new sap.m.Label({
                        text: getPropertyValue(oResourceModel, "NPDashboard_BCPStatus")
                    })
                });
                oBCPStatusTable.addColumn(statusBCP);
                var oTemplate = new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({
                            text: "{User}"
                        }),
                        new sap.m.Text({
                            text: "{parts: [{path: 'Time'}],  formatter : 'oControllerThis.getDateDisplayFormat'}"
                        }),
                        new sap.m.Text({
                            text: "{Status}"
                        })
                    ]
                });
                oBCPStatusTable.bindItems("/Rowset/Row", oTemplate);
                oBCPStatusTable.setModel(oBCPStatusModel);
                var dialogStatusTable = new sap.m.Dialog({
                    title: getPropertyValue(oResourceModel, "NPDashboard_BCPStatusTable"),
                    content: [oBCPStatusTable],
                    endButton: new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                        press: function() {
                            dialogStatusTable.close();
                            dialogStatusTable.destroyContent();
                            dialogStatusTable.destroy();
                        }
                    })
                });
                dialogStatusTable.open();
            }
        });
        historyBtn.addStyleClass("colorButton");
        var bar4 = new sap.m.Bar({
            contentMiddle: [switchBtn, historyBtn]
            //contentRight:[historyBtn]
        });
        //bar4.addStyleClass("bgBar");
        var dialogBCP = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_BCPSwitchingMenu"),
            content: [bar4],
            endButton: new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                contentWidth: "120px",
                press: function() {
                    dialogBCP.close();
                    dialogBCP.destroyContent();
                    dialogBCP.destroy();
                }
            })
        });
        //dialogBCP.addStyleClass("bgDialog");
        dialogBCP.open();
    },
    doGoodsIssue: function() {
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE_ERROR"));
        } else {
            linedesc = this.getView().byId("workcenter").getValue();
            window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/ProcessOrderGI.irpt?nodeFromURL=" + node_id + "&day1=3&plantFromURL=" + plantId + "&resFromURL=" + encodeURIComponent(linedesc) + "&clientFromURL=" + client), "_blank");
        }
    },
    doGoodsReceipt: function() {
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {
            linedesc = this.getView().byId("workcenter").getValue();
            window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGR/Page/ProcessOrder.irpt?nodeFromURL=" + node_id + "&day1=3&plantFromURL=" + plantId + "&resFromURL=" + encodeURIComponent(linedesc) + "&clientFromURL=" + client), "_blank");
        }
    },

    doRFDevice: function() {

        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {

            window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/Page/MainMenu.irpt"));
        }
    },
    doStockDisplayTransfer: function() {
        var refresh = new Date();
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        planId_Desc = plantId + "-" + plantName;
        window.open(encodeURI("/XMII/CM/MaterialHandling/TO_Movement/Page/TransferDisplayOrder.irpt?plant=" + encodeURIComponent(planId_Desc)), "_blank");
    },
    doNestlePrfmnceMngmnt: function() {
        var refresh = new Date();
        //var plant = oControllerThis.getView().byId("plant").getSelectedKey();
        var plant = oControllerThis.getView().byId("plant").getValue();
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {
            var refresh = new Date();
            var oDefaultLanguageModel = new sap.ui.model.xml.XMLModel();
            oDefaultLanguageModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetDefaultLanguageValueFromSharedMemory&cache=" + refresh + "&Content-Type=text/xml", "", false);
            var defaultLanguage = oDefaultLanguageModel.getProperty("/Rowset/Row/DefaultLanguage");
            if (defaultLanguage == "") {
                window.open("/OEEDashboard/WorkerUI.jsp?plant=" + plant + "&client=" + client + "&defaultWorkcenter=" + node_id, "_blank");
            } else {
                window.open("/OEEDashboard/WorkerUI.jsp?plant=" + plant + "&client=" + client + "&defaultWorkcenter=" + node_id + "&sap-ui-language=" + defaultLanguage, "_blank")
            }
        }
    },
    doProcOrdValidation: function() {
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {
            window.open(encodeURI("/XMII/CM/PerformanceManagement/WebContent/HealthCheck.irpt?line=" + node_id), "_blank");
        }
    },
    doReprintLabel: function() {
        window.open("/XMII/CM/MaterialHandling/PrinterManagementFramework/Page/ECCLabelPrinting.irpt", "_blank");
    },
    doPrintQueue: function() {
        window.open("/XMII/CM/MaterialHandling/PrinterManagementFramework/Page/QueueMonitor.irpt", "_blank");
    },
    doGoodsMvt: function() {
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {
            window.open(encodeURI("/XMII/CM/MaterialHandling/GMReport/GMReport.irpt?plant=" + plantId + "&client=" + client + "&node=" + node_id), "_blank");
        }
    },
    MaterialMasterReport: function() {
        window.open(encodeURI("/XMII/CM/MaterialHandling/Reports/MaterialMasterReport/Page/MaterialMasterReport.irpt?plant=" + selectedPlant + "&client=" + client), "_blank");
    },
    ProcessOrderReport: function() {
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id != "" && node_id != null && node_id != undefined) {
            window.open(encodeURI("/XMII/CM/MaterialHandling/Reports/ProcessOrderReport/Page/ProcessOrderReport.irpt?plant=" + selectedPlant + "&client=" + client + "&node=" + node_id), "_blank");
        } else {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        }
    },
	TODashboard: function() {
        
        var plantId = oControllerThis.getView().byId("plant").getValue();
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE_ERROR"));
        } else {
            linedesc = this.getView().byId("workcenter").getValue();
            window.open(encodeURI("/XMII/CM/MaterialHandling/CustomGI/Page/TransferOrderDashboard.irpt?nodeFromURL=" + node_id + "&day1=14&plantFromURL=" + plantId + "&resFromURL=" + encodeURIComponent(linedesc) + "&clientFromURL=" + client), "_blank");
        }
    },
    doQMS: function() {
        var refresh = new Date();
        var oQMSModel = new sap.ui.model.xml.XMLModel();
        oQMSModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetQMSURL&cache=" + refresh + "&Content-Type=text/xml", "", false);
        var urlQMS = oQMSModel.getProperty("/Rowset/Row/O_QMS_URL");
        window.open(urlQMS, "_blank");
    },
    doInspctionRsltRec: function() {},
    doAMM: function() {},
    doInboundMatRecpt: function() {
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        window.open("/XMII/CM/MaterialHandling/InboundMaterial/Page/InboundMaterialReceipt.irpt", "_blank");
    },
    doRprntlbl: function() {
        window.open("/XMII/CM/MaterialHandling/PrinterManagementFramework/Page/ECCLabelPrinting.irpt", "_blank");
    },
    doPrntQ: function() {
        window.open("/XMII/CM/MaterialHandling/PrinterManagementFramework/Page/QueueMonitor.irpt", "_blank");
    },
    assignDashboard: function() {
        userGrpSelect = new sap.m.MultiInput({
            valueHelpRequest: oControllerThis.getHelp
        });
        dashboardSelect = new sap.m.MultiInput({
            valueHelpRequest: oControllerThis.getDashboardHelp
        });
        dashboardSelect.setEnableMultiLineMode(true);
        intialAssignDashboardButton = new sap.m.Button({
                icon: "sap-icon://add-activity",
                text: getPropertyValue(oResourceModel, "NPDashboard_Initial_assignment"),
                width: "180px",
                press: function() {
                    refresh = new Date();
                    var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern: "MM/dd/yyyy HH:mm:ss"
                    });
                    var today = dateFormat.format(new Date());
                    var oXMLModel = new sap.ui.model.xml.XMLModel();
                    oXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_InitialDashBoadAssignment&Param.1=" + plantId + "&Param.2=" + client + "&Param.3=" + today + "&Param.4=" + userId + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                    var dashBoardAssignmentStatus = oXMLModel.getProperty("/Rowset/Row/o_status");
                    if (dashBoardAssignmentStatus == 'Success') {
                        sap.m.MessageBox.information(getPropertyValue(oResourceModel, "NPDashboard_Initial_UserGroup_Dashboard_Assignment_Successful"), {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Information")
                        });
                        refresh = new Date();
                        var oUsrGrpDahsbrdModel = new sap.ui.model.xml.XMLModel();
                        oUsrGrpDahsbrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_GetUserGrpDashboard&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                        oUsrGrpDashbrdTable.setModel(oUsrGrpDahsbrdModel);
                    } else {
                        sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_User_Group_Field_Save_Error"), {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                        });
                    }
                }
            }),
            saveBtton = new sap.m.Button({
                icon: "sap-icon://add",
                text: getPropertyValue(oResourceModel, "NPDashboard_Add"),
                width: "80px",
                press: function() {
                    var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern: "MM/dd/yyyy HH:mm:ss"
                    });
                    var today = dateFormat.format(new Date());
                    var userGroup = userGrpSelect.getValue();
                    var dashboard = dashboardSelect.getValue();
                    var refresh = new Date();
                    var invalidCount = 0;
                    var existanceCount = 0;
                    var failedCount = 0;
                    var successCount = 0;
                    var userMultidashboardValues = dashboardSelect.getTokens();
                    var len = userMultidashboardValues.length;
                    var totalLen = len;
                    if (dashboard.length > 0) {
                        totalLen = len + 1;
                    }
                    if (userGroup == null || userGroup == "" || userGroup == " ") {
                        sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_User_Group_Field_Blank"), {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                        });
                    } else if ((dashboard == null || dashboard == "" || dashboard == " ") && len == 0) {
                        sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Dashboard_Field_Blank"), {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                        });
                    } else {
                        for (var i = 0; i < totalLen; i++) {
                            if (i == len) {
                                dashboard = dashboardSelect.getValue();
                            } else {
                                dashboard = userMultidashboardValues[i].getText();
                            }
                            refresh = new Date();
                            var oXMLModel = new sap.ui.model.xml.XMLModel();
                            oXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_CheckUsrGrpDashbrdExistance&Param.1=" + userGroup + "&Param.2=" + dashboard + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                            var checkExistance = oXMLModel.getProperty("/Rowset/Row/exist");
                            if (checkExistance == "NO") {
                                invalidCount = invalidCount + 1;
                            } else {
                                refresh = new Date();
                                var oModel = new sap.ui.model.xml.XMLModel();
                                oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDQ_CheckDashboardAssignmentExists&Param.1=" + plantId + "&Param.2=" + client + "&Param.3=" + userGroup + "&Param.4=" + dashboard + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                                var checkExists = oModel.getProperty("/Rowset/Row/USERGROUP");
                                if (checkExists == null || checkExists == "" || checkExists == " ") {
                                    today = dateFormat.format(new Date());
                                    var oSaveXMLModel = new sap.ui.model.xml.XMLModel();
                                    oSaveXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_SaveUserGrpdashboardAssignment&Param.1=" + plantId + "&Param.2=" + client + "&Param.3=" + userGroup + "&Param.4=" + dashboard + "&Param.5=" + today + "&Param.6=" + userId + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                                    var message = oSaveXMLModel.getProperty("/Messages/Message");
                                    if (message == "Command Query Successful") {
                                        successCount = successCount + 1;
                                    } else {
                                        failedCount = failedCount + 1;
                                    }
                                } else {
                                    existanceCount = existanceCount + 1;
                                }
                            }
                        }
                        if (successCount == totalLen && successCount != 0) {
                            if (successCount == 1) {
                                sap.m.MessageBox.information(getPropertyValue(oResourceModel, "NPDashboard_SingleUserGroup_Dashboard_Assignment_Successful"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Information")
                                });
                            } else {
                                sap.m.MessageBox.information(getPropertyValue(oResourceModel, "NPDashboard_AllUserGroup_Dashboard_Assignment_successful"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Information")
                                });
                            }
                            refresh = new Date();
                            var oUsrGrpDahsbrdModel = new sap.ui.model.xml.XMLModel();
                            oUsrGrpDahsbrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_GetUserGrpDashboard&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                            oUsrGrpDashbrdTable.setModel(oUsrGrpDahsbrdModel);
                        } else if (failedCount == totalLen && failedCount != 0) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Addition_Failed_Error_Occurred"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (existanceCount == totalLen && existanceCount != 0) {
                            if (existanceCount == 1) {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_SingleAddition_Failed_UserGroup_Dashboard_Assignment_Already_Exist"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                                });
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_AllAddition_Failed_UserGroup_Dashboard_Assignment_Already_Exist"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                                });
                            }
                        } else if (invalidCount == totalLen && invalidCount != 0) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_AdditionFailed_InvalidValues"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else {
                            if (successCount > 0) {
                                var fail = totalLen - successCount;
                                if (totalLen == 2) {
                                    sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "NPDashboard_BETWEEN") + " " + len + " " + getPropertyValue(oResourceModel, "NPDashboard_User_Group_Dashboard_AssignmentPartialSuccessful") + " " + successCount + " " + getPropertyValue(oResourceModel, "NPDashboard_Successful") + " " + getPropertyValue(oResourceModel, "NPDashboard_And") + " " + fail + " " + getPropertyValue(oResourceModel, "NPDashboard_Addition_Partial_Successful"), {
                                        title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                                    });
                                } else {
                                    sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "NPDashboard_Among") + " " + len + " " + getPropertyValue(oResourceModel, "NPDashboard_User_Group_Dashboard_AssignmentPartialSuccessful") + " " + successCount + " " + getPropertyValue(oResourceModel, "NPDashboard_Successful") + " " + getPropertyValue(oResourceModel, "NPDashboard_And") + " " + fail + " " + getPropertyValue(oResourceModel, "NPDashboard_Addition_Partial_Successful"), {
                                        title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                                    });
                                }
                                refresh = new Date();
                                var oUsrGrpDahsbrdModel = new sap.ui.model.xml.XMLModel();
                                oUsrGrpDahsbrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_GetUserGrpDashboard&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                                oUsrGrpDashbrdTable.setModel(oUsrGrpDahsbrdModel);
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Error_Occurred_InvalidValues"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                                });
                            }
                        }
                    }
                }
            });
        var delButton = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_Delete"),
            press: function() {
                var successCount = 0;
                var failedCount = 0;
                var tableXMLModel = oUsrGrpDashbrdTable.getModel();
                var context = oUsrGrpDashbrdTable.getSelectedContexts();
                var contextLen = context.length;
                if (contextLen == 0) {
                    sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_User_Group_Dashboard_To_delete"), {
                        title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                    });
                } else {
                    for (var i = 0; i < contextLen; i++) {
                        var userGroup = tableXMLModel.getProperty(context[i] + "/USERGROUP");
                        var dashboard = tableXMLModel.getProperty(context[i] + "/DASHBOARD");
                        var refresh = new Date();
                        if (userGroup == null || userGroup == "" || userGroup == " " || dashboard == null || dashboard == "" || dashboard == " ") {} else {
                            var oDeleteXMLModel = new sap.ui.model.xml.XMLModel();
                            oDeleteXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_DeleteUserGrpDashbrdAssignment&Param.1=" + plantId + "&Param.2=" + client + "&Param.3=" + userGroup + "&Param.4=" + dashboard + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                            var message = oDeleteXMLModel.getProperty("/Messages/Message");
                            if (message == "Command Query Successful") {
                                successCount = successCount + 1;
                            } else {
                                failedCount = failedCount + 1;
                            }
                        }
                    }
                    if (successCount == contextLen) {
                        sap.m.MessageBox.information(getPropertyValue(oResourceModel, "NPDashboard_Successful_Deletion_UserGroupDashboard"), {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Information")
                        });
                        var oUsrGrpDahsbrdModel = new sap.ui.model.xml.XMLModel();
                        refresh = new Date();
                        oUsrGrpDahsbrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_GetUserGrpDashboard&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                        oUsrGrpDashbrdTable.setModel(oUsrGrpDahsbrdModel);
                    } else if (failedCount == contextLen) {
                        sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_UserGroupDashboard_Deletion_Failed"), {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                        });
                    } else if (successCount > 0 && successCount < contextLen && failedCount > 0 && failedCount < contextLen) {
                        sap.m.MessageBox.warning(getPropertyValue(oResourceModel, "NPDashboard_UserGroupDashboard_Part_Deletion_Success_Count") + " " + successCount + " " + getPropertyValue(oResourceModel, "NPDashboard_UserGroupDashboard_Part_Deletion_Failed_Count") + " " + failedCount, {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                        });
                        var oUsrGrpDahsbrdModel = new sap.ui.model.xml.XMLModel();
                        refresh = new Date();
                        oUsrGrpDahsbrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_GetUserGrpDashboard&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                        oUsrGrpDashbrdTable.setModel(oUsrGrpDahsbrdModel);
                    }
                }
            }
        });
        /////////////////////////////////////////////////// User Group Custom Dashboard Assignment Form ///////////////////////////////////////////
        var oUserGrpDashbrdLayoutLabels = new sap.ui.layout.form.ResponsiveGridLayout({
            labelSpanL: 4,
            labelSpanM: 4,
            labelSpanS: 3,
            emptySpanL: 0,
            emptySpanM: 0,
            emptySpanS: 0,
            columnsL: 3,
            columnsM: 3,
        });
        var oUserGrpDashbrdForm = new sap.ui.layout.form.Form({
            layout: oUserGrpDashbrdLayoutLabels,
            editable: true,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "NPDashboard_User_Group"),
                            fields: [userGrpSelect]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            label: getPropertyValue(oResourceModel, "NPDashboard_Dashboard"),
                            fields: [dashboardSelect]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer({
                    formElements: [
                        new sap.ui.layout.form.FormElement({
                            fields: [saveBtton, intialAssignDashboardButton]
                        })
                    ]
                })
            ]
        });
        /////////////////////////////////////////////////// User Group Custom Dashboard Table ///////////////////////////////////////////
        var oUsrGrpDahsbrdModel = new sap.ui.model.xml.XMLModel();
        var refresh = new Date();
        oUsrGrpDahsbrdModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_GetUserGrpDashboard&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        oUsrGrpDashbrdTable = new sap.m.Table({
            headerText: getPropertyValue(oResourceModel, "NPDashboard_User_Group_Custom_Dashboard"),
            headerDesign: sap.m.ListHeaderDesign.Standard,
            mode: sap.m.ListMode.MultiSelect
        });
        var col3 = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPDashboard_User_Group")
            })
        });
        oUsrGrpDashbrdTable.addColumn(col3);
        var col4 = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPDashboard_Dashboard")
            })
        });
        oUsrGrpDashbrdTable.addColumn(col4);
        var col5 = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPDashboard_Reported_Date")
            })
        });
        oUsrGrpDashbrdTable.addColumn(col5);
        var col6 = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPDashboard_Reported_User")
            })
        });
        oUsrGrpDashbrdTable.addColumn(col6);
        var oTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.Text({
                    text: "{USERGROUP}"
                }),
                new sap.m.Text({
                    text: "{DASHBOARD}"
                }),
                new sap.m.Text({
                    text: "{parts: [{path: 'REPORTED_CHANGED_DATE'}],  formatter : 'oControllerThis.getDateDisplayFormat'}"
                }),
                new sap.m.Text({
                    text: "{REPORTED_CHANGED_BY}"
                })
            ]
        });
        oUsrGrpDashbrdTable.bindItems("/Rowset/Row", oTemplate);
        oUsrGrpDashbrdTable.setModel(oUsrGrpDahsbrdModel);
        ////////////////////////////////////////////////// Dialog for User Group Dashboard Assignment /////////////////////////////////////////////////////
        var oDialogDashboardAssignmnt = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_User_Dashboard_Assignment"),
            content: [oUserGrpDashbrdForm, oUsrGrpDashbrdTable],
            buttons: [
                delButton,
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDialogDashboardAssignmnt.close();
                    }
                })
            ],
        });
        oDialogDashboardAssignmnt.setContentWidth("1600px");
        oDialogDashboardAssignmnt.setContentHeight("500px");
        oDialogDashboardAssignmnt.attachAfterClose(function() {
            sap.ui.controller("nav.NestlePortal").setDashboardVisibility();
        });
        oDialogDashboardAssignmnt.open();
    },
    getHelp: function() {
        var refresh = new Date();
        var oListXMLModel = new sap.ui.model.xml.XMLModel();
        oListXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetUserGroups&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var searchUserGroup = new sap.m.SearchField({
            placeholder: "Search for User Group",
            liveChange: function(oEvent) {
                var sQuery = oEvent.getSource().getValue();
                var binding = oListUserGroup.getBinding("items");
                var filters = [
                    new sap.ui.model.Filter("UserGroup", sap.ui.model.FilterOperator.Contains, sQuery)
                ];
                var oFilter = new sap.ui.model.Filter({
                    aFilters: filters,
                    _bMultiFilter: true
                });
                binding.filter(oFilter);
            }
        });
        var oListUserGroup = new sap.m.List({
            mode: sap.m.ListMode.SingleSelectLeft,
            includeItemInSelection: true
        });
        var oListItem = new sap.m.StandardListItem({
            title: "{UserGroup}",
            tooltip: "{UserGroup}}"
        });
        oListUserGroup.setModel(oListXMLModel);
        oListUserGroup.bindAggregation("items", "/Rowset/Row", oListItem);
        ////////////////////////////////////////////////// Dialog for User Group Search /////////////////////////////////////////////////////
        var oDialogUserGroupSearch = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_User_Group"),
            content: [searchUserGroup, oListUserGroup],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                    press: function() {
                        var selectedUserGroup = oListUserGroup.getSelectedItem().getTitle(); //TODO
                        userGrpSelect.setValue(selectedUserGroup);
                        var refresh = new Date();
                        var oModel = new sap.ui.model.xml.XMLModel();
                        oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDQ_GetDashBoardForUserGroup&Param.1=" + selectedUserGroup + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                        oUsrGrpDashbrdTable.setModel(oModel);
                        //var checkExists = oModel.getProperty("/Rowset/Row/DASHBOARD");
                        oDialogUserGroupSearch.close();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDialogUserGroupSearch.close();
                    }
                })
            ],
        });
        oDialogUserGroupSearch.setContentWidth("500px");
        oDialogUserGroupSearch.setContentHeight("700px");
        oDialogUserGroupSearch.open();
    },
    getDashboardHelp: function() {
        var refresh = new Date();
        var oListXMLModel = new sap.ui.model.xml.XMLModel();
        oListXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetCustomDashboards&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var searchDashboard = new sap.m.SearchField({
            placeholder: "Search for Dashboard",
            liveChange: function(oEvent) {
                var sQuery = oEvent.getSource().getValue();
                var binding = oListDashboard.getBinding("items");
                var filters = [
                    new sap.ui.model.Filter("keyValue", sap.ui.model.FilterOperator.Contains, sQuery)
                ];
                var oFilter = new sap.ui.model.Filter({
                    aFilters: filters,
                    _bMultiFilter: true
                });
                binding.filter(oFilter);
            }
        });
        var oListDashboard = new sap.m.List({
            mode: sap.m.ListMode.MultiSelect,
            includeItemInSelection: true
        });
        var oListItem = new sap.m.StandardListItem({
            title: "{keyValue}",
            tooltip: "{keyValue}"
        });
        oListDashboard.setModel(oListXMLModel);
        oListDashboard.bindAggregation("items", "/Rowset/Row", oListItem);
        ////////////////////////////////////////////////// Dialog for Custom Dashboard Search /////////////////////////////////////////////////////
        var oDialogDashboardSearch = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_Dashboard"),
            content: [searchDashboard, oListDashboard],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Ok"),
                    press: function() {
                        var tokensArr = [];
                        var selectedItems = oListDashboard.getSelectedItems();
                        var len = selectedItems.length;
                        for (var i = 0; i < len; i++) {
                            var token = new sap.m.Token();
                            token.setKey(selectedItems[i].getTitle());
                            token.setText(selectedItems[i].getTitle());
                            tokensArr.push(token);
                        }
                        dashboardSelect.setTokens(tokensArr);
                        oDialogDashboardSearch.close();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDialogDashboardSearch.close();
                    }
                })
            ],
        });
        oDialogDashboardSearch.setContentWidth("750px");
        oDialogDashboardSearch.setContentHeight("750px");
        oDialogDashboardSearch.open();
    },
    displayStorageFreqInfo: function() {
        var refresh = new Date();
        var oSchedulerXMLModel = new sap.ui.model.xml.XMLModel();
        oSchedulerXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetSchedulerInfo&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var rowCount = oSchedulerXMLModel.getProperty("/Rowset/Row/0/ROW_COUNT");
        var storageTypeFM;
        var statusFM;
        var freqFM;
        var storageTypeSM;
        var statusSM;
        var freqSM;
        var storageTypeFrM;
        var statusFrm;
        var freqFrm;
        var schedulerNameFF
        var schedulerNameFrF;
        var schedulerNameSF;
        for (var i = 0; i < rowCount; i++) {
            var schedulerStr = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/SCHEDULER");
            if (schedulerStr.toUpperCase().match("FASTMOVING")) {
                storageTypeFM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/STORAGE_TYPE");
                statusFM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/STATUS");
                freqFM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/FREQUENCY");
                schedulerNameFF = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/SCHEDULER");
            }
            if (schedulerStr.toUpperCase().match("SLOWMOVING")) {
                storageTypeSM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/STORAGE_TYPE");
                statusSM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/STATUS");
                freqSM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/FREQUENCY");
                schedulerNameSF = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/SCHEDULER");
            }
            if (schedulerStr.toUpperCase().match("FREQMOVING")) {
                storageTypeFrM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/STORAGE_TYPE");
                statusFrM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/STATUS");
                freqFrM = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/FREQUENCY");
                schedulerNameFrF = oSchedulerXMLModel.getProperty("/Rowset/Row/" + i + "/SCHEDULER");
            }
        }
        var nameFMTxtFld = new sap.m.Input({
            editable: false
        });
        nameFMTxtFld.setValue(schedulerNameFF);
        var statusFMTxtFld = new sap.m.Input({
            editable: false
        });
        statusFMTxtFld.setValue("5 MINS");
        var storagyeTypeFMTxtFld = new sap.m.Input({
            editable: false
        });
        storagyeTypeFMTxtFld.setValue(storageTypeFM);
        var nameSMTxtFld = new sap.m.Input({
            editable: false
        });
        nameSMTxtFld.setValue(schedulerNameSF);
        var statusSMTxtFld = new sap.m.Input({
            editable: false
        });
        statusSMTxtFld.setValue("60 MINS");
        var storagyeTypeSMTxtFld = new sap.m.Input({
            editable: false
        });
        storagyeTypeSMTxtFld.setValue(storageTypeSM);
        var nameFrMTxtFld = new sap.m.Input({
            editable: false
        });
        nameFrMTxtFld.setValue(schedulerNameFrF);
        var statusFrMTxtFld = new sap.m.Input({
            editable: false
        });
        statusFrMTxtFld.setValue("15 MINS");
        var storagyeTypeFrMTxtFld = new sap.m.Input({
            editable: false
        });
        storagyeTypeFrMTxtFld.setValue(storageTypeFrM);
        var scheduler = new sap.m.Label({
            textAlign: "Left"
        });
        scheduler.setText(getPropertyValue(oResourceModel, "NPDashboard_Scheduler"));
        var freq = new sap.m.Label();
        freq.setText(getPropertyValue(oResourceModel, "NPDashboard_Frequency"));
        var storgeTpe = new sap.m.Label();
        storgeTpe.setText(getPropertyValue(oResourceModel, "NPDashboard_Storage_Type_Configured"));
        var scheduler1 = scheduler.getText() + ": " + nameFMTxtFld.getValue();
        var freq1 = freq.getText() + ": " + statusFMTxtFld.getValue();
        var sType1 = storgeTpe.getText() + ": " + storagyeTypeFMTxtFld.getValue();
        var scheduler2 = scheduler.getText() + ": " + nameFrMTxtFld.getValue();
        var freq2 = freq.getText() + ": " + statusFrMTxtFld.getValue();
        var sType2 = storgeTpe.getText() + ": " + storagyeTypeFrMTxtFld.getValue();
        var scheduler3 = scheduler.getText() + ": " + nameSMTxtFld.getValue();
        var freq3 = freq.getText() + ": " + statusSMTxtFld.getValue();
        var sType3 = storgeTpe.getText() + ": " + storagyeTypeSMTxtFld.getValue();
        var oFlexBoxFast = new sap.m.FlexBox({
            direction: "Column",
            alignItems: "Start",
            items: [new sap.m.Text({
                text: scheduler1
            }).addStyleClass("sapMDialogText"), new sap.m.Text({
                text: freq1
            }).addStyleClass("sapMDialogText"), new sap.m.Text({
                text: sType1
            }).addStyleClass("sapMDialogText")]
        });
        var oFlexBoxFreq = new sap.m.FlexBox({
            direction: "Column",
            alignItems: "Start",
            items: [new sap.m.Text({
                text: scheduler2
            }).addStyleClass("sapMDialogText"), new sap.m.Text({
                text: freq2
            }).addStyleClass("sapMDialogText"), new sap.m.Text({
                text: sType2
            }).addStyleClass("sapMDialogText")]
        });
        var oFlexBoxSlow = new sap.m.FlexBox({
            direction: "Column",
            alignItems: "Start",
            items: [new sap.m.Text({
                text: scheduler3
            }).addStyleClass("sapMDialogText"), new sap.m.Text({
                text: freq3
            }).addStyleClass("sapMDialogText"), new sap.m.Text({
                text: sType3
            }).addStyleClass("sapMDialogText")]
        });
        var oPanelFast = new sap.m.Panel({
            backgroundDesign: "Transparent",
            content: [oFlexBoxFast]
        });
        var oPanelFreq = new sap.m.Panel({
            backgroundDesign: "Transparent",
            content: [oFlexBoxFreq]
        });
        var oPanelSlow = new sap.m.Panel({
            backgroundDesign: "Transparent",
            content: [oFlexBoxSlow]
        });
        var spacer = new sap.m.OverflowToolbar({
            design: "Transparent"
        });
        var spacer1 = new sap.m.OverflowToolbar({
            design: "Transparent"
        });
        var spacer2 = new sap.m.OverflowToolbar({
            design: "Transparent"
        });
        var textInfo = new sap.m.Text();
        textInfo.setText("Info: To change the frequency of the jobs, go to home page, MII Menu/System Management/Schedulers.");
        textInfo.addStyleClass("sapMDialogText");
        var oDialogGr = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_BCP_Inventory_Download_Jobs"),
            content: [oPanelFast, spacer1, oPanelFreq, spacer2, oPanelSlow],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDialogGr.close();
                    }
                })
            ],
        });
        oDialogGr.setContentWidth("640px");
        oDialogGr.setContentHeight("400px");
        oDialogGr.open();
    },
    updateSharedProperty: function() {
        var refresh = new Date();
        var oFetchModel = new sap.ui.model.xml.XMLModel();
        oFetchModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XAC_GetSharedProperty&Param.1=StorageType_FastMoving_TO&cache=" + refresh + "&Content-Type=text/xml", "", false);
        var stringModel = oFetchModel.getXML();
        oFetchModel.setSizeLimit($(stringModel).find("Row").size());
        var oListStorageType = new sap.m.List({
            backgroundDesign: sap.m.BackgroundDesign.Transparent,
            mode: "Delete",
            delete: function(oEvent) {
                var oList = oEvent.getSource(),
                    oItem = oEvent.getParameter("listItem");
                var selectedItem = oItem.getTitle();
                var selectedDescription = oItem.getDescription();
                stringModel = sap.ui.controller("nav.NestlePortal").removeItemFromModel(selectedItem, selectedDescription, stringModel);
                oFetchModel.setSizeLimit($(stringModel).find("Row").size());
                oFetchModel.setXML(stringModel);
                oList.setModel(oFetchModel);
            },
            enableBusyIndicator: true,
            headerText: getPropertyValue(oResourceModel, "NPDASHBOARD_EXISTING_ST"),
            growing: false,
        });
        var oStandardListItem = new sap.m.StandardListItem({
            title: "{StorageType}",
            description: "{Description}"
        });
        oListStorageType.setModel(oFetchModel);
        oListStorageType.bindAggregation("items", "/Rowset/Row", oStandardListItem);
        var oSelect = new sap.m.Select({
            width: "200px",
            items: [
                new sap.ui.core.Item({
                    key: "StorageType_FastMoving_TO",
                    text: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ST_FAST_MOVING")
                }),
                new sap.ui.core.Item({
                    key: "StorageType_FrequentlyMoving_TO",
                    text: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ST_FREQ_MOVING")
                }),
                new sap.ui.core.Item({
                    key: "StorageType_SlowMoving_TO",
                    text: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ST_Slow_MOVING")
                })
            ],
            selectedKey: "StorageType_FastMoving_TO",
            change: function(oEvent) {
                var refresh = new Date();
                var selectedItem = oEvent.getSource().getSelectedItem();
                var key = selectedItem.getKey();
                var text = selectedItem.getText();
                oFetchModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XAC_GetSharedProperty&Param.1=" + key + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
                stringModel = oFetchModel.getXML();
                oFetchModel.setSizeLimit($(stringModel).find("Row").size());
                oListStorageType.setModel(oFetchModel);
                searchStorageType.setValue("");
                var binding = oListStorageType.getBinding("items");
                binding.filter(null);
                oInput.setValue("");
                oInput.setPlaceholder(getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ST_NEW"));
                oInput.removeStyleClass("errorInput");
            }
        });
        var oInput = new sap.m.Input({
            width: "200px",
            valueStateText: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ST_VALIDATION_MSG"),
            placeholder: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ST_NEW")
        });
        var oAddBttn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ADD"),
            icon: "sap-icon://add",
            press: function(oEvent) {
                var oListCurrentItems = oListStorageType.getItems();
                var newValue = oInput.getValue();
                var duplicate = false;
                if (newValue != "") {
                    newValue = newValue.toUpperCase();
                    if (newValue.length > 0) {
                        var newItem = new sap.m.StandardListItem({
                            title: newValue,
                            description: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_NEW_ADD")
                        });
                        var len = oListCurrentItems.length;
                        for (var i = 0; i < len; i++) {
                            if (oListCurrentItems[i].getTitle() == newValue.trim()) {
                                duplicate = true;
                            }
                        }
                        if (duplicate) {
                            oInput.setValue("");
                            oInput.setPlaceholder(getPropertyValue(oResourceModel, "NPDASHBOARD_MB_NEW_ADD_VLDTION"));
                            oInput.addStyleClass("errorInput");
                        } else {
                            var refresh = new Date();
                            var oStorageTypeModel = new sap.ui.model.xml.XMLModel();
                            oStorageTypeModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_CheckStorageTypeExistance&Param.1=" + newValue.trim() + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
                            var response = oStorageTypeModel.getProperty("/Rowset/Row/Flag");
                            var mType = oStorageTypeModel.getProperty("/Rowset/Row/MovementType");
                            var selectedMType = oSelect.getSelectedItem().getKey();
                            if (response == 1 && selectedMType != mType) {
                                oInput.setValue("");
                                oInput.setPlaceholder(getPropertyValue(oResourceModel, "NPDASHBOARD_MB_NEW_ADD_VLDTION"));
                                oInput.addStyleClass("errorInput");
                            } else {
                                stringModel = sap.ui.controller("nav.NestlePortal").addItemToModel(newValue, stringModel);
                                oFetchModel.setSizeLimit($(stringModel).find("Row").size());
                                oFetchModel.setXML(stringModel);
                                oListStorageType.setModel(oFetchModel);
                                oInput.setValue("");
                                oInput.setPlaceholder(getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ST_NEW"));
                                oInput.removeStyleClass("errorInput");
                            }
                        }
                    } else {
                        oInput.setValue("");
                        oInput.setPlaceholder(getPropertyValue(oResourceModel, "NPDASHBOARD_MB_INPUT_VLDTION"));
                        oInput.addStyleClass("errorInput");
                    }
                } else {
                    oInput.setValue("");
                    oInput.setPlaceholder(getPropertyValue(oResourceModel, "NPDASHBOARD_MB_INPUT_VLDTION"));
                    oInput.addStyleClass("errorInput");
                }
            }
        });
        var searchStorageType = new sap.m.SearchField({
            width: "200px",
            placeholder: getPropertyValue(oResourceModel, "NPDASHBOARD_UST_STORAGE_TYPE"),
            liveChange: function(oEvent) {
                var sQuery = oEvent.getSource().getValue();
                var binding = oListStorageType.getBinding("items");
                var filters = [
                    new sap.ui.model.Filter("StorageType", sap.ui.model.FilterOperator.Contains, sQuery)
                ];
                var oFilter = new sap.ui.model.Filter({
                    aFilters: filters,
                    _bMultiFilter: true
                });
                binding.filter(oFilter);
            }
        });
        var oDialogUpdate = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_Storage_Type_Configuration"),
            content: [oSelect, oInput, oAddBttn, searchStorageType],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {
                        var item = oListStorageType.getItems();
                        var len = item.length;
                        var oListModified = "";
                        for (var i = 0; i < len; i++) {
                            var value = item[i].getTitle();
                            if (value != "") {
                                if (i == 0) {
                                    oListModified = value;
                                } else {
                                    oListModified = oListModified + "," + item[i].getTitle();
                                }
                            }
                        }
                        if (true) {
                            var refresh = new Date();
                            var key = oSelect.getSelectedItem().getKey();
                            var oStorageTypeModel = new sap.ui.model.xml.XMLModel();
                            oStorageTypeModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_UpdateStorageType&Param.1=" + oListModified + "&Param.2=" + key + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
                            var response = oStorageTypeModel.getProperty("/Rowset/Row/O_Result");
                            if (response == "SUCCESS") {
                                sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_UPDATE_STORATETYPE_SUCCESS"), getPropertyValue(oResourceModel, "NPDashboard_Success"));
                                oStorageTypeModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XAC_GetSharedProperty&Param.1=" + key + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
                                stringModel = oStorageTypeModel.getXML();
                                oStorageTypeModel.setSizeLimit($(stringModel).find("Row").size());
                                oListStorageType.setModel(oStorageTypeModel);
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_UPDATE_STORATETYPE_ERROR"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
                            }
                        }
                        oInput.removeStyleClass("errorInput");
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_CANCEL"),
                    press: function() {
                        oDialogUpdate.close();
                    }
                })
            ],
        });
        oDialogUpdate.setContentWidth("600px");
        oDialogUpdate.setContentHeight("400px");
        oDialogUpdate.addContent(oListStorageType);
        oDialogUpdate.open();
    },
    addItemToModel: function(newValue, stringModel) {
        var columnIndex = stringModel.indexOf("</Columns>") + "</Columns>".length;
        var rowModel = stringModel.substring(columnIndex, stringModel.length + 1);
        var newRow = "<Row><StorageType>" + newValue + "</StorageType><Description>" + getPropertyValue(oResourceModel, "NPDASHBOARD_MB_NEW_ADD") + "</Description></Row>";
        var updatedRowModel = newRow + rowModel;
        var updatedModel = stringModel.substring(0, columnIndex) + updatedRowModel;
        return updatedModel;
    },
    addItemToModelSLOC: function(newSLOC, newWH, newSource, stringModel, rowCount) {
        if (rowCount == 0) {
            var updatedModel = "<Rowsets><Rowset><Columns></Columns><Row><SLOC>" + newSLOC + "</SLOC><WHNO>" + newWH + "</WHNO><SOURCE>" + newSource + "</SOURCE></Row></Rowset></Rowsets>";
            stringModel = updatedModel;
        } else {
            var columnIndex = stringModel.indexOf("</Columns>") + "</Columns>".length;
            var rowModel = stringModel.substring(columnIndex, stringModel.length + 1);
            var newRow = "<Row><SLOC>" + newSLOC + "</SLOC><WHNO>" + newWH + "</WHNO><SOURCE>" + newSource + "</SOURCE></Row>";
            var updatedRowModel = newRow + rowModel;
            var updatedModel = stringModel.substring(0, columnIndex) + updatedRowModel;
        }
        return updatedModel;

    },
    removeItemFromModelSLOC: function(item, stringModel) {

        var length = item.length;
        var mid = item.indexOf("-");
        if (mid >= 0) {
            var itempart = item.split("-");
            var newSLOC = itempart[0].trim();
            var newWH = itempart[1].trim();
            var newSource = itempart[2].trim();
            var row = "";
            var columnIndex;
            if (item != "") {
                row = "<Row><SLOC>" + newSLOC + "</SLOC><WHNO>" + newWH + "</WHNO><SOURCE>" + newSource + "</SOURCE></Row>";
                columnIndex = stringModel.lastIndexOf("<Row><SLOC>" + newSLOC + "</SLOC><WHNO>" + newWH + "</WHNO><SOURCE>" + newSource + "</SOURCE></Row>");
                if (columnIndex == -1) {
                    columnIndex = stringModel.lastIndexOf("<Row><SLOC>" + newSLOC + "</SLOC><WHNO>" + newWH + "</WHNO><SOURCE>" + newSource + "</SOURCE></Row>");

                    row = "<Row><SLOC>" + newSLOC + "</SLOC><WHNO>" + newWH + "</WHNO><SOURCE>" + newSource + "</SOURCE></Row>";
                }
            }
        }
        var len = row.length;
        var firstRowModel = stringModel.substring(0, columnIndex);
        var lastRowModel = stringModel.substring(columnIndex + len, stringModel.length);
        var updatedModel = firstRowModel + lastRowModel;
        return updatedModel;
    },
    removeItemFromModel: function(item, desc, stringModel) {
        var row = "";
        var columnIndex;
        if (desc != "") {
            row = "<Row><StorageType>" + item + "</StorageType><Description>" + desc + "</Description></Row>";
            columnIndex = stringModel.lastIndexOf("<Row><StorageType>" + item + "</StorageType><Description>" + desc + "</Description></Row>");
        } else {
            if (item != "") {
                row = "<Row><StorageType>" + item + "</StorageType><Description/></Row>";
                columnIndex = stringModel.lastIndexOf("<Row><StorageType>" + item + "</StorageType><Description/></Row>");
                if (columnIndex == -1) {
                    columnIndex = stringModel.lastIndexOf("<Row><StorageType>" + item + "</StorageType><Description /></Row>");
                    row = "<Row><StorageType>" + item + "</StorageType><Description /></Row>";
                }
            } else {
                row = "<Row><StorageType /><Description /></Row>";
                columnIndex = stringModel.lastIndexOf("<Row><StorageType /><Description /></Row>");
                if (columnIndex == -1) {
                    columnIndex = stringModel.lastIndexOf("<Row><StorageType/><Description/></Row>");
                    row = "<Row><StorageType/><Description/></Row>";
                }
                if (columnIndex == -1) {
                    columnIndex = stringModel.lastIndexOf("<Row><StorageType/><Description /></Row>");
                    row = "<Row><StorageType/><Description /></Row>";
                }
                if (columnIndex == -1) {
                    columnIndex = stringModel.lastIndexOf("<Row><StorageType /><Description/></Row>");
                    row = "<Row><StorageType /><Description/></Row>";
                }
            }
        }
        var len = row.length;
        var firstRowModel = stringModel.substring(0, columnIndex);
        var lastRowModel = stringModel.substring(columnIndex + len, stringModel.length);
        var updatedModel = firstRowModel + lastRowModel;
        return updatedModel;
    },

    addItemToModelBatchMergeSimu: function(STypeVal, SBinVal, stringModelForBatchMerge, rowCount) {

        if (rowCount == 0) {

            var updatedModel = "<Rowsets><Rowset><Columns><Column Description=" + '""' + " MaxRange=" + '"1"' + " MinRange=" + '"0"' + " Name=" + '"SType"' + " SQLDataType=" + '"1"' + " SourceColumn=" + '"SType"' + "/><Column Description=" + '""' + " MaxRange=" + '"1"' + " MinRange=" + '"0"' + " Name=" + '"SBin"' + " SQLDataType=" + '"1"' + " SourceColumn=" + '"SBin"' + "/></Columns><Row><SType>" + STypeVal + "</SType><SBin>" + SBinVal + "</SBin></Row></Rowset></Rowsets>";
            stringModelForBatchMerge = updatedModel;

        } else {
            var columnIndex = stringModelForBatchMerge.indexOf("</Columns>") + "</Columns>".length;
            var rowModel = stringModelForBatchMerge.substring(columnIndex, stringModelForBatchMerge.length + 1);
            var newRow = "<Row><SType>" + STypeVal + "</SType><SBin>" + SBinVal + "</SBin></Row>";
            var updatedRowModel = newRow + rowModel;
            var updatedModel = stringModelForBatchMerge.substring(0, columnIndex) + updatedRowModel;
        }
        return updatedModel;
        //console.log(updatedModel);
    },

    removeItemFromModelBatchMergeSimu: function(STypeVal, SBinVal, stringModelForBatchMerge) {
        var row = "";
        var columnIndex;
        if (STypeVal != "" && SBinVal != "") {
            row = "<Row><SType>" + STypeVal + "</SType><SBin>" + SBinVal + "</SBin></Row>";
            columnIndex = stringModelForBatchMerge.lastIndexOf("<Row><SType>" + STypeVal + "</SType><SBin>" + SBinVal + "</SBin></Row>");
            if (columnIndex == -1) {
                columnIndex = stringModelForBatchMerge.lastIndexOf("<Row><SType>" + STypeVal + "</SType><SBin>" + SBinVal + "</SBin></Row>");

                row = "<Row><SType>" + STypeVal + "</SType><SBin>" + SBinVal + "</SBin></Row>";
            }
        }
        var len = row.length;
        var firstRowModel = stringModelForBatchMerge.substring(0, columnIndex);
        var lastRowModel = stringModelForBatchMerge.substring(columnIndex + len, stringModelForBatchMerge.length);
        var updatedModel = firstRowModel + lastRowModel;
        return updatedModel;


    },

    configurePrinter: function() {
        window.open(encodeURI("/XMII/CM/MaterialHandling/PrinterManagementFramework/Page/Printer_Config_Template.irpt?clientFromURL=" + client + "&plantFromURL=" + selectedPlant), "_blank");
    },
    configureMESSync: function() {
        var refresh = new Date();
        var textInfo;
        var title;
        var value;
        var oFetchModel = new sap.ui.model.xml.XMLModel();
        oFetchModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_Get_MES_STOCK_SYNC_PersistentProperty&cache=" + refresh + "&Content-Type=text/xml", "", false);
        var modelAsXML = oFetchModel.getXML();
        var oListMESStockSync = new sap.m.List({
            backgroundDesign: sap.m.BackgroundDesign.Transparent,
            mode: sap.m.ListMode.MultiSelect,
            enableBusyIndicator: true,
            headerText: getPropertyValue(oResourceModel, "NPDASHBOARD_MES_STOCK_SYNC_HDR"),
        });
        var oStandardListItem = new sap.m.StandardListItem({
            title: "{Name}",
            description: "",
        });
        oStandardListItem.addStyleClass("MSTInfo");
        oListMESStockSync.setModel(oFetchModel);
        oListMESStockSync.bindAggregation("items", "/Rowset/Row", oStandardListItem);
        var listItem = oListMESStockSync.getItems();
        var k = 0;
        $(modelAsXML).find('Row').each(function() {
            title = $(this).find('Name').text();
            value = $(this).find('Value').text();
            if (value == "1") {
                oListMESStockSync.setSelectedItem(listItem[k], true);
            }
            k++;
        });
        var oSearch = new sap.m.SearchField({
            placeholder: getPropertyValue(oResourceModel, "NPDASHBOARD_MSS_SEARCH"),
            liveChange: function(oEvent) {
                var sQuery = oEvent.getSource().getValue();
                var binding = oListMESStockSync.getBinding("items");
                //
                var binding1 = oListMESStockSync1.getBinding("items");
                //
                var filters = [
                    new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery)
                ];
                var oFilter = new sap.ui.model.Filter({
                    aFilters: filters,
                    _bMultiFilter: true
                });
                binding.filter(oFilter);
                binding1.filter(oFilter);
            }
        });
        var oDialogUpdate = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_MES_Stock_Sync_Configuration"),
            content: [oSearch],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {
                        var refresh = new Date();
                        var selectedItem = oListMESStockSync.getSelectedItems();
                        var item = oListMESStockSync.getItems();
                        var len = item.length;
                        var selectedItemLen = selectedItem.length;
                        //
                        //
                        var mapString = "";
                        var mapParam = "";
                        var count = 0;
                        var check = false;
                        for (var j = 0; j < len; j++) {
                            value = item[j].getTitle();
                            for (var i = 0; i < selectedItemLen; i++) {
                                title = selectedItem[i].getTitle();
                                check = false;
                                if (value == title) {
                                    check = true;
                                    break;
                                }
                            }
                            if (check) {
                                if (j == 0) {
                                    mapParam = "\"" + value + "\",true";
                                    count++;
                                } else {
                                    mapParam = mapParam + ",\"" + value + "\",true";
                                    count++;
                                }
                            } else {
                                if (j == 0) {
                                    mapParam = "\"" + value + "\",false";
                                    count++;
                                } else {
                                    mapParam = mapParam + ",\"" + value + "\",false";
                                    count++;
                                }
                            }
                        }
                        mapString = "map(" + mapParam + ")";
                        ///////////////////////////////////////////////////////////////
                        var selectedItem1 = oListMESStockSync1.getSelectedItems();
                        var item1 = oListMESStockSync1.getItems();
                        var len1 = item1.length;
                        var selectedItemLen1 = selectedItem1.length;
                        var mapString1 = "";
                        var mapParam1 = "";
                        var count1 = 0;
                        var check1 = false;
                        for (var m = 0; m < len1; m++) {
                            value1 = item1[m].getTitle();
                            for (var n = 0; n < selectedItemLen1; n++) {
                                title1 = selectedItem1[n].getTitle();
                                check1 = false;
                                if (value1 == title1) {
                                    check1 = true;
                                    break;
                                }
                            }
                            if (check1) {
                                if (m == 0) {
                                    mapParam1 = "\"" + value1 + "\",true";
                                    count1++;
                                } else {
                                    mapParam1 = mapParam1 + ",\"" + value1 + "\",true";
                                    count1++;
                                }
                            } else {
                                if (m == 0) {
                                    mapParam1 = "\"" + value1 + "\",false";
                                    count1++;
                                } else {
                                    mapParam1 = mapParam1 + ",\"" + value1 + "\",false";
                                    count1++;
                                }
                            }
                        }
                        mapString1 = "map(" + mapParam1 + ")"
                        //////////////////////////////////////////////////////////
                        if ((mapString != "" && (count === len)) || (mapString1 != "" && (count1 === len1))) {
                            var refresh = new Date();
                            var oUpdateModel = new sap.ui.model.xml.XMLModel();
                            var oUpdateModel1 = new sap.ui.model.xml.XMLModel();
                            oUpdateModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_Update_MES_STOCK_SYNC_Persistent&Param.1=" + encodeURIComponent(mapString) + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
                            oUpdateModel1.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_Update_MES_STOCK_SYNC_Inbound&Param.1=" + encodeURIComponent(mapString1) + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
                            var response = oUpdateModel.getProperty("/Rowset/Row/O_Response");
                            mapParam = "";
                            mapParam1 = "";
                            if (response == "ERROR") {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MSS_UPDATE_MES_STOCK_SYNC_ERROR"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
                            } else {
                                sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDAHSBOARD_MSS_UPDATE_MES_STOCK_SYNC_SUCCESS"), getPropertyValue(oResourceModel, "NPDashboard_Success"));
                            }
                        }
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDialogUpdate.close();
                        oDialogUpdate.destroy();
                    }
                })
            ],
        });
        /////////////////////////////////////////////////////////////////////////////////////MES_STOCK_SYNC_INBOUND///////////////////////////////////////////////////
        var oFetchModel1 = new sap.ui.model.xml.XMLModel();
        oFetchModel1.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_Get_MES_STOCK_SYNC_PersistentPropertyInbound&cache=" + refresh + "&Content-Type=text/xml", "", false);
        var modelAsXML1 = oFetchModel1.getXML();
        var oListMESStockSync1 = new sap.m.List({
            backgroundDesign: sap.m.BackgroundDesign.Transparent,
            mode: sap.m.ListMode.MultiSelect,
            enableBusyIndicator: true,
            headerText: getPropertyValue(oResourceModel, "NPDASHBOARD_MES_STOCK_SYNC_Inbound"),
        });
        var oStandardListItem1 = new sap.m.StandardListItem({
            title: "{Name}",
            description: "",
        });
        oStandardListItem1.addStyleClass("MSTInfo");
        oListMESStockSync1.setModel(oFetchModel1);
        oListMESStockSync1.bindAggregation("items", "/Rowset/Row", oStandardListItem1);
        var listItem1 = oListMESStockSync1.getItems();
        var l = 0;
        $(modelAsXML1).find('Row').each(function() {
            var title1 = $(this).find('Name').text();
            var value1 = $(this).find('Value').text();
            if (value1 == "1") {
                oListMESStockSync1.setSelectedItem(listItem1[l], true);
            }
            l++;
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var spacer = new sap.m.OverflowToolbar({
            design: "Transparent"
        });
        textInfo = new sap.m.Text();
        textInfo.setText(getPropertyValue(oResourceModel, "NPDASHBOARD_MES_STOCK_SYNC_INFO"));
        textInfo.addStyleClass("sapMDialogText");
        var oVbox1 = new sap.m.VBox({
            width: "100%"
        });
        var oVbox3 = new sap.m.VBox({
            width: "100%"
        });
        oVbox1.addItem(oListMESStockSync);
        oVbox3.addItem(oListMESStockSync1);
        var hbox = new sap.m.HBox({
            width: "100%"
        });
        hbox.addItem(oListMESStockSync);
        hbox.addItem(oListMESStockSync1);
        oDialogUpdate.setContentWidth("700px");
        oDialogUpdate.setContentHeight("600px");
        oDialogUpdate.addContent(hbox);
        oDialogUpdate.addContent(spacer);
        oDialogUpdate.addContent(textInfo);
        oDialogUpdate.open();
    },
    openEProcessOrderUI: function() {
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {
            window.open("/XMII/CM/MaterialHandling/EmergencyPO/Page/EmergencyProcessOrder.irpt?clientFromURL=" + client + "&node=" + node_id, "_blank");
        }
    },
    mapMatSType: function() {
        window.open("/XMII/CM/MaterialHandling/CustomGR/Page/MaterialType.irpt?plantFromURL=" + plantId + "&clientFromURL=" + client, "_blank");
    },
    ////////Added for LaborManagement Task /////////////////////////////////////////
    mapResourceAndCostCenter: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (plantId.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            window.open(encodeURI("/XMII/CM/LaborManagement/ResourceAndCostCenter/Page/ResourceAndCostCenter.irpt?Plant=" + selectedPlant), "_blank");
        }
    },
    mapLaborCatagoryAndActivity: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            window.open(encodeURI("/XMII/CM/LaborManagement/LaborCategoriesAndActivities/Page/LaborCategoriesAndActivities.irpt?Plant=" + selectedPlant), "_blank");
        }
    },
    mapFICOActType: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            window.open(encodeURI("/XMII/CM/LaborManagement/Fico/Page/FicoActType.irpt?Plant=" + selectedPlant), "_blank");
        }
    },
    mapLaborCategory: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            window.open(encodeURI("/XMII/CM/LaborManagement/LaborCategory/Page/LaborCategory.irpt?Plant=" + selectedPlant), "_blank");
        }
    },
    mapBdgLbrHrs: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            window.open(encodeURI("/XMII/CM/LaborManagement/BudgetLabourHours/Page/BudgetLabourHours.irpt?Plant=" + selectedPlant), "_blank");
        }
    },
    mapLaborStandard: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            window.open(encodeURI("/XMII/CM/LaborManagement/LabourStandard/Page/LabourStandard.irpt?Plant=" + selectedPlant), "_blank");
        }
    },
    OpenSupportLbrHrsUI: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            window.open(encodeURI("/XMII/CM/LaborManagement/SupportLabourHour/Page/SupportLbrHrs.irpt?Plant=" + selectedPlant), "_blank");
        }
    },
    displayAppVersion: function() {
        /////////////////////////////////////////////////// App Version Table ///////////////////////////////////////////
        var oVersionModel = new sap.ui.model.xml.XMLModel();
        var refresh = new Date();
        oVersionModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetAppVersion_V2&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var odeployedPatchModel = new sap.ui.model.xml.XMLModel();
        refresh = new Date();
        odeployedPatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=SWSP/Query/MDOQ_SelectLatestPatchHistory&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var patchId = $(odeployedPatchModel.getData()).find("PatchID").text();
        var relNoteURL = $(odeployedPatchModel.getData()).find("ReleaseNoteURL").text();
        oVersionTable = new sap.m.Table({
            headerText: getPropertyValue(oResourceModel, "NPDashboard_App_Version_Tbl_Hdr"),
            headerDesign: sap.m.ListHeaderDesign.Standard,
            mode: sap.m.ListMode.SingleSelectMaster
        });
        var colVersion = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPDashboard_Version")
            })
        });
        oVersionTable.addColumn(colVersion);
        var colLastDate = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPDashboard_LAST_MODIFIED_DATE")
            })
        });
        oVersionTable.addColumn(colLastDate);
        var oVersionTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.Text({
                    text: "{Version}"
                }),
                new sap.m.Text({
                    text: "{parts: [{path: 'ModifiedDate'}],  formatter : 'oControllerThis.getDateDisplayFormat'}"
                }),
            ]
        });
        oVersionTable.bindItems("/Rowset/Row", oVersionTemplate);
        oVersionTable.setModel(oVersionModel);
        ////////////////////////////////////////////////// Dialog for App Version /////////////////////////////////////////////////////
        var oAppVersionDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_App_Version_Dialog_Hdr"),
            content: [oVersionTable],
            subHeader: new sap.m.Bar({
                contentMiddle: [new sap.m.Link({
                    text: patchId,
                    press: function() {
                        window.open(relNoteURL);
                    }
                })]
            }),
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oAppVersionDialog.destroy();
                    }
                })
            ],
        });
        oAppVersionDialog.setContentWidth("650px");
        oAppVersionDialog.setContentHeight("600px");
        oAppVersionDialog.open();
    },
    displayReport: function(oEvent) {
        var refresh = new Date();
        var tileID = oEvent.getSource().getId();
        var reportName = "";
        if (tileID.indexOf("tileSRReports") >= 0) {
            reportName = "SR";
        }
        if (tileID.indexOf("tileLMReports") >= 0) {
            reportName = "LMR";
        }
        if (tileID.indexOf("tileAIReports") >= 0) {
            reportName = "AI";
        }
        if (tileID.indexOf("tileDPRReports") >= 0) {
            reportName = "DPR";
        }
        if (tileID.indexOf("tileECCRRReports") >= 0) {
            reportName = "ECCRR";
        }
        var oURLModel = new sap.ui.model.xml.XMLModel();
        oURLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetOEEReportURL&Param.1=" + reportName + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var reportURL = oURLModel.getProperty("/Rowset/Row/O_ReportURL");
        if (reportURL == "") {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_OEE_REPORTS_ERROR"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {
            window.open(encodeURI(reportURL), "_blank");
        }
    },
    configureNSAM: function() {
        ////////////////////////////////////////////////////////////////////// Links for NSAM Configurations //////////////////////////////////////////////////////////////////////
        var genConfigLink = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_LINK_GEN_CONFIG"),
            press: function() {
                window.open(encodeURI("/OEEDashboard/UserGroupAssignment.jsp"), "_blank");
            }
        }).addStyleClass("sapMBtnCustom");
        var activityConfigLink = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_LINK_ACTIVITY_CONFIG"),
            press: function() {
                window.open(encodeURI("/OEEDashboard/ActivityConfiguration.jsp"), "_blank");
            }
        }).addStyleClass("sapMBtnCustom");
        var dashboardConfigLink = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_LINK_DASHBOARD_CONFIG"),
            press: function() {
                window.open(encodeURI("/OEEDashboard/PODConfiguration.jsp"), "_blank");
            }
        }).addStyleClass("sapMBtnCustom");
        var dataUploadConfigLink = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_LINK_DATA_UPLOAD_CONFIG"),
            press: function() {
                window.open(encodeURI("/OEEDashboard/UploadData.jsp"), "_blank");
            }
        }).addStyleClass("sapMBtnCustom");
        var ordDispatchConfigLink = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_LINK_ORDER_DISPATCH_CONFIG"),
            press: function() {
                window.open(encodeURI("/OEEDashboard/ManualReleaseQuantity.jsp"), "_blank");
            }
        }).addStyleClass("sapMBtnCustom");
        var auditLogConfigLink = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_LINK_AUDIT_LOG_CONFIG"),
            press: function() {
                window.open(encodeURI("/OEEDashboard/AuditLog.jsp"), "_blank");
            }
        }).addStyleClass("sapMBtnCustom");
        var ERPMasterDataLink = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_NSAM_CONFIG_LINK_MASTERDATA"),
            press: function() {
                window.open(encodeURI("/OEEDashboard/MasterData.jsp"), "_blank");
            }
        }).addStyleClass("sapMBtnCustom");
        var PlantHierarchyReport = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_Plant_Hierarchy_Report"),
            press: function() {
                //var Plant = oControllerThis.getView().byId("plant").getSelectedKey();
                var Plant = oControllerThis.getView().byId("plant").getValue();
                var refresh = new Date();
                window.open(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Adhoc/Query Template/XAC_GetPHReport&Param.1=" + userLanguage + "&Param.2=" + Plant + "&cache=" + refresh + "&Content-Type=text/csv", "", false));
            }
        }).addStyleClass("sapMBtnCustom");
        var NSAMConfigurationsReport = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_Configurations_Report"),
            press: function() {
                //var Plant = oControllerThis.getView().byId("plant").getSelectedKey();
                var Plant = oControllerThis.getView().byId("plant").getValue();
                var refresh = new Date();
                window.open(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Adhoc/Query Template/XAC_GetNSAMConfigurations&Param.1=" + userLanguage + "&Param.2=" + Plant + "&cache=" + refresh + "&Content-Type=text/csv", "", false));
            }
        }).addStyleClass("sapMBtnCustom");
        var ReasoncodeAssignmentReport = new sap.m.Button({
            width: "299px",
            height: "350px",
            text: getPropertyValue(oResourceModel, "NPDashboard_Reason_code_Assignment_Report"),
            press: function() {
                //var Plant = oControllerThis.getView().byId("plant").getSelectedKey();
                var Plant = oControllerThis.getView().byId("plant").getValue();
                var refresh = new Date();
                window.open(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Adhoc/Query Template/XAC_GetRCAssignment&Param.1=" + Plant + "&Param.2=" + userLanguage + "&cache=" + refresh + "&Content-Type=text/csv", "", false));
            }
        }).addStyleClass("sapMBtnCustom");
        var ShiftPostingDateConfig = new sap.m.Button({
            width: "299px",
            text: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_POSTINGDATE_CONFIG"),
            press: function() {
                var refresh = new Date();
                //var Plant = oControllerThis.getView().byId("plant").getSelectedKey();
                var Plant = oControllerThis.getView().byId("plant").getValue();
                window.open(encodeURI("/XMII/CM/PerformanceManagement/ProcessOrderConfiguration/ProcessOrderConfiguration.irpt"));
            }
        }).addStyleClass("sapMBtnCustom");
        var ReasoncodeReport = new sap.m.Button({
                width: "299px",
                text: getPropertyValue(oResourceModel, "NPDashboard_Reason_code_Report"),
                press: function() {
                    var refresh = new Date();
                    //var Plant = oControllerThis.getView().byId("plant").getSelectedKey();
                    var Plant = oControllerThis.getView().byId("plant").getValue();
                    window.open(encodeURI("/XMII/Illuminator?QueryTemplate=PerformanceManagement/Adhoc/Query Template/XAC_GetAllReasonCodeList&Param.1=" + Plant + "&Param.2=" + userLanguage + "&Param.3=" + client + "&cache=" + refresh + "&Content-Type=text/csv", "", false));
                }
            })
            /* .addStyleClass("sapMBtnCustom");
	var ProcessOrderShiftConfiguration = new sap.m.Button({
					width: "299px",
					text: getPropertyValue(oResourceModel,"NPDashboard_ProcessOrder_ShiftConfiguration"),
					press: function(){      
								var refresh = new Date();
								 //var Plant = oControllerThis.getView().byId("plant").getSelectedKey();
	var Plant = oControllerThis.getView().byId("plant").getValue();
								window.open(encodeURI("/XMII/CM/PerformanceManagement/ProcessOrderConfiguration/ProcessOrderConfiguration.irpt"));
								   }
	})  */
            .addStyleClass("sapMBtnCustom");
        var varticalLayout = new sap.ui.layout.VerticalLayout({
            content: [genConfigLink, activityConfigLink, dashboardConfigLink, dataUploadConfigLink, ordDispatchConfigLink, auditLogConfigLink, ERPMasterDataLink, PlantHierarchyReport, NSAMConfigurationsReport, ReasoncodeAssignmentReport, ReasoncodeReport, ShiftPostingDateConfig]
        }).addStyleClass("sapMBtnCustom");
        //////////////////////////////////////////////////////////////////////////////// CSS For Buttons ////////////////////////////////////////////////////////////////////////////////
        var b1 = activityConfigLink.getId();
        var b2 = genConfigLink.getId();
        var b3 = dashboardConfigLink.getId();
        var b4 = dataUploadConfigLink.getId();
        var b5 = ordDispatchConfigLink.getId();
        var b6 = auditLogConfigLink.getId();
        var b7 = PlantHierarchyReport.getId();
        var b8 = NSAMConfigurationsReport.getId();
        var b9 = ReasoncodeAssignmentReport.getId();
        var b10 = ReasoncodeReport.getId();
        var b11 = ShiftPostingDateConfig.getId();
        var b12 = ERPMasterDataLink.getId();
        var css = "#" + b1 + "-content.sapMBtnContent,#" + b2 + "-content.sapMBtnContent,#" + b3 + "-content.sapMBtnContent,#" + b4 + "-content.sapMBtnContent,#" + b5 + "-content.sapMBtnContent,#" + b6 + "-content.sapMBtnContent,#" + b12 + "-content.sapMBtnContent,#" + b7 + "-content.sapMBtnContent,#" + b8 + "-content.sapMBtnContent,#" + b9 + "-content.sapMBtnContent,#" + b10 + "-content.sapMBtnContent,#" + b11 + "-content.sapMBtnContent{font-size: 1rem;white-space: normal;line-height: 18px;margin-top: 7px;}";
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        ////////////////////////////////////////////////// Dialog for  NSAM Config /////////////////////////////////////////////////////
        var oNSAMConfigDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDashboard_NSAM_CONFIG_DIALOG_HDR"),
            content: [varticalLayout],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oNSAMConfigDialog.destroy();
                    }
                })
            ],
        });
        oNSAMConfigDialog.setContentWidth("550px");
        oNSAMConfigDialog.setContentHeight("600px");
        oNSAMConfigDialog.open();
    },
    openEMM: function() {
        window.open("/XMII/CM/NestleDashboardUtility/HTML/ExtendedMessageMonitor.html", "_blank");
    },
    openMRFMonitor: function() {
        window.open("/XMII/CM/MessageRoutingFramework/HTML/MessageStatusMonitor.html", "_blank");
    },
    openHealthCheck: function() {
        window.open("/XMII/CM/MessageRoutingFramework/HTML/HealthCheck.html", "_blank");
    },
    openTranslationCockpit: function() {
        window.open("/XMII/CM/Translation/TranslationCockpit/TranslationCockpit.html", "_blank");
    },
    openSSPatcher: function() {
        window.open("/XMII/CM/SWSP/HTML/PatchRunner.irpt", "_blank");
    },
    getWorkcenter: function() {
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            var emptyModel = new sap.ui.model.xml.XMLModel();
            var line = this.getView().byId("workcenter");
            line.setEnabled(true);
            line.setValue("");
            line.setModel(emptyModel);
        } else {
            oControllerThis.noDialogFn();
        }
    },
    noDialogFn: function() {
        //alert("noDialogFunc");
        //var selectedPlant = oControllerThis.getView().byId("plant").getSelectedKey();
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        var WorkcenterModel = new sap.ui.model.xml.XMLModel();
        var refresh = new Date();
        var line = oControllerThis.getView().byId("workcenter");
        line.setValue("");
        line.setEnabled(true);
        WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines&Param.1=" + selectedPlant + "&Param.2=" + userLanguage + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
        var rowCount = $(WorkcenterModel.getXML()).find("Row").size();
        if (rowCount == 1) {
            WorkcenterModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetLines&Param.1=" + selectedPlant + "&Param.2=en&cache=" + refresh + "&Content-Type=text/xml", "", false);
            rowCount = $(WorkcenterModel.getXML()).find("Row").size();
        }
        var wrkcntrdrp = oControllerThis.getView().byId("workcenter");
        WorkcenterModel.setSizeLimit(rowCount);
        var oListItemwrkcntrdrp = new sap.ui.core.ListItem();
        oListItemwrkcntrdrp.bindProperty("text", "DESCRIPTION");
        oListItemwrkcntrdrp.bindProperty("key", "NODE_ID");
        wrkcntrdrp.bindItems("/Rowset/Row", oListItemwrkcntrdrp);
        wrkcntrdrp.setModel(WorkcenterModel);
        ////  fetching line from previous selection /////
        if (userId != undefined) {
            var clearNow = new Date();
            var oLineCB = this.getView().byId("workcenter");
            var oLineSelectModel = new sap.ui.model.xml.XMLModel();
            oLineSelectModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_SelectLineFromSavePlantDefinition&Param.1=" + userId + "&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
            if (oLineSelectModel.getProperty("/Rowset/Row/LineNodeID") == "---" || oLineSelectModel.getProperty("/Rowset/Row/LineNodeID") == "" || oLineSelectModel.getProperty("/Rowset/Row/LineNodeID") == null || oLineSelectModel.getProperty("/Rowset/Row/LineNodeID") == undefined) {
                oLineCB.setSelectedItem(oLineCB.getFirstItem());
            } else {
                this.getView().byId("workcenter").setSelectedKey(oLineSelectModel.getProperty("/Rowset/Row/LineNodeID"));
            }
        }
        ////  fetching line from previous selection close /////
    },
    saveDefault: function() {
        //var plantId = oControllerThis.getView().byId("plant").getSelectedKey();
        var plantId = oControllerThis.getView().byId("plant").getValue();
        if (plantId.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            line_NodeID = oControllerThis.getView().byId("workcenter").getSelectedKey();
            /*if(line_NodeID == "" || line_NodeID == null || line_NodeID == undefined){
            sap.m.MessageBox.error(getPropertyValue(oResourceModel,"NPDAHSBOARD_MB_SAVE_LINE_BLANK_ALERT"), {title: getPropertyValue(oResourceModel,"NPDashboard_Error")});
            }
            else {*/
            refresh = new Date();
            var oModel = new sap.ui.model.xml.XMLModel();
            oModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_SelectDetailsFromSavePlantDefinition&Param.1=" + userId + "&Param.2=" + plantId + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
            var rowCount = $(oModel.getData()).find("Row").size();
            if (rowCount == 0) {
                var oSaveXMLModel = new sap.ui.model.xml.XMLModel();
                oSaveXMLModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_SaveDefaultPlantDefinition&Param.1=" + plantId + "&Param.2=" + line_NodeID + "&Param.3=" + userId + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                var message = oSaveXMLModel.getProperty("/Messages/Message");
                if (message == "Command Query Successful") {
                    sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_SAVE_LINE_DEF"), getPropertyValue(oResourceModel, "NPDashboard_Success"));
                }
            } else {
                refresh = new Date();
                var oUpdateModel = new sap.ui.model.xml.XMLModel();
                oUpdateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/MDOQ_UpdateSavedPlantDefinition&Param.1=" + userId + "&Param.2=" + plantId + "&Param.3=" + line_NodeID + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                var message = oUpdateModel.getProperty("/Messages/Message");
                if (message == "Command Query Successful") {
                    sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_SAVE_LINE_DEF"), getPropertyValue(oResourceModel, "NPDashboard_Success"));
                }
            }
            // }
        }
    },
    configBCPUI: function() {
        /////////////////////////////////////////////////// Change Date Format ///////////////////////////////////////////
        var oDFModel = new sap.ui.model.xml.XMLModel();
        var refresh = new Date();
        oDFModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetRFDateFormat&OutputParameter=O_DateFormat&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var curDF = oDFModel.getProperty("/Rowset/Row/O_DateFormat");
        var currentFormat = new sap.m.Label({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_CUR_DT_FRMT")
        });
        var oDFSelect = new sap.m.ComboBox({
            selectedKey: curDF
        });
        var oDFSelectModel = new sap.ui.model.xml.XMLModel();
        oDFSelectModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetRFDateFormat&OutputParameter=O_DateFormatsXML&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var oListItemDF = new sap.ui.core.ListItem();
        oListItemDF.bindProperty("text", "DateFormat");
        oListItemDF.bindProperty("key", "DateFormat");
        oDFSelect.bindItems("/Rowset/Row", oListItemDF);
        oDFSelect.setModel(oDFSelectModel);
        var oDFInput = new sap.m.Input({
            enabled: false,
            value: curDF
        });
        var oValBttn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_VERIFY"),
            press: function() {
                jQuery.sap.require("sap.ui.core.format.DateFormat");
                var dateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                    pattern: oDFSelect.getSelectedKey()
                });
                var vDate = dateFormat.format(new Date());
                sap.m.MessageBox.information(vDate, {
                    title: getPropertyValue(oResourceModel, "NPDashboard_Information")
                });
            }
        }).addStyleClass("sapMBtnRFDFCustom");
        ////////////////////////////////////////////////// Dialog for Change Date Format /////////////////////////////////////////////////////
        var oDFDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_TILE_BCP_UI_CONFIG"),
            content: [currentFormat, oDFInput, oDFSelect, oValBttn],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Save"),
                    press: function() {
                        var changedDF = oDFSelect.getSelectedKey();
                        if (changedDF.length > 0) {
                            var oDFChngModel = new sap.ui.model.xml.XMLModel();
                            var refresh = new Date();
                            oDFChngModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_ChangeRFDateFormat&Param.1=" + changedDF + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                            var status = oDFChngModel.getProperty("/Rowset/Row/O_Status");
                            if (status == "SUCCESS") {
                                sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDASHBOARD_DF_CHNAGE_SUCCESS_MESAGE"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                                });
                                oDFModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetRFDateFormat&OutputParameter=O_DateFormat&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                                var curDF = oDFModel.getProperty("/Rowset/Row/O_DateFormat");
                                oDFInput.setValue(curDF);
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDASHBOARD_ERROR_MESAGE"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                                });
                            }
                        } else {
                            sap.m.MessageBox.information(getPropertyValue(oResourceModel, "NPDASHBOARD_INPUT_ERROR_MESAGE"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDFDialog.destroy();
                    }
                })
            ],
        });
        oDFDialog.setContentWidth("300px");
        oDFDialog.setContentHeight("200px");
        oDFDialog.open();
    },
    setBCPConfigButtonsVisibility: function(STypeManageBtn, stockMESSyncBtn, manageGRBinBtn, dateFormatBtn, docNumRngBtn, configurePrinterBtn, cRStatusBtn, VerifIdBtn) {
        var refresh = new Date();
        var visiblilityFlag = false;
        plantId = oControllerThis.getView().byId("plant").getValue();
        var LineNode = oControllerThis.getView().byId("workcenter").getSelectedKey();
        node_id = (LineNode == undefined || LineNode == "") ? "NA" : LineNode;
        var oAccessDetailsModel = new sap.ui.model.xml.XMLModel();
        oAccessDetailsModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetDashboardAccessDetails&Param.1=" + plantId + "&Param.2=" + client + "&Param.3=" + node_id + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var dashboardCount = oAccessDetailsModel.getProperty("/Rowset/Row/0/Count");
        for (var i = 0; i < dashboardCount; i++) {
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Storage Type Configuration(STORAGE_TYPE_CONFIGURATION)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    STypeManageBtn.setVisible(true);
                } else {
                    STypeManageBtn.setVisible(false);
                }
            }
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "MES Stock Sync(MES_STOCK_SYNC)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    stockMESSyncBtn.setVisible(true);
                } else {
                    stockMESSyncBtn.setVisible(false);
                }
            }
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Material-Storage Mapping(MAT_STORAGE_MAPPING)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    manageGRBinBtn.setVisible(true);
                } else {
                    manageGRBinBtn.setVisible(false);
                }
            }
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "RF Date Format(RF_DATE_FORMAT)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    dateFormatBtn.setVisible(true);
                } else {
                    dateFormatBtn.setVisible(false);
                }
            }
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Doc Number Ranges Configuration(DOC_NO_RANGE_CONFIG)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    docNumRngBtn.setVisible(true);
                } else {
                    docNumRngBtn.setVisible(false);
                }
            }
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Configure Printer(CONFIG_PRINTER)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    configurePrinterBtn.setVisible(true);
                } else {
                    configurePrinterBtn.setVisible(false);
                }
            }
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "Control Recipe Status Config(CR_STATUS_CONFIG)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    cRStatusBtn.setVisible(true);
                } else {
                    cRStatusBtn.setVisible(false);
                }
            }
            if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/Dashboard") == "RF Verification Id List(RF_VERIFICATION_ID_LIST)") {
                if (oAccessDetailsModel.getProperty("/Rowset/Row/" + i + "/HasAccess") == "YES") {
                    VerifIdBtn.setVisible(true);
                } else {
                    VerifIdBtn.setVisible(false);
                }
            }
        }
    },
    configDecimalSymbol: function() {
        //var DecimalSymbol = new sap.m.Label({text:getPropertyValue(oResourceModel,"NPDASHBOARD_DECIMAL_SYMBL")});
        var oDSModel = new sap.ui.model.xml.XMLModel();
        oDSModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XAC_GetSymbolFormat&OutputParameter=O_SymbolFormat&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var curDS = oDSModel.getProperty("/Rowset/Row/O_SymbolFormat");
        var oDSInput = new sap.m.Input({
            enabled: false,
            value: curDS
        });
        var oDSSelect = new sap.m.Select({
            id: "DropdownSel",
            width: "300px",
            selectedKey: curDS,
            change: function() {
                var Quantity = '20.12';
                var changedDS1 = oDSSelect.getSelectedKey();
                if (changedDS1.length > 0) {
                    var vSymbol = Quantity.replace(".", changedDS1);
                    textField.setValue(vSymbol);
                } else {
                    textField.setValue(Quantity);
                }
            }
        });
        var oDSSelectModel = new sap.ui.model.xml.XMLModel();
        oDSSelectModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XAC_GetSymbolFormat&OutputParameter=O_SymbolFormatXml&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var oListItemDS = new sap.ui.core.ListItem();
        oListItemDS.bindProperty("text", "SymbolFormat");
        oListItemDS.bindProperty("key", "SymbolFormat");
        oDSSelect.bindItems("/Rowset/Row", oListItemDS);
        oDSSelect.setModel(oDSSelectModel);
        var textField = new sap.m.Input({
            enabled: true,
            editable: false,
            width: "40%"
        });
        var LabelText = new sap.m.Label({
            text: "Select the Decimal Symbol to be used:"
        });
        LabelText.addStyleClass("myText");
        /*var oValBttn = new sap.m.Button({text: getPropertyValue(oResourceModel,"NPDASHBOARD_VERIFY"),
					press:function()
	{

				  var curSymbl=oDSSelect.getSelectedKey();
			alert(curSymbl);
		var Quantity=  '20.12';
		if(curSymbl.length>0){
		  var vSymbol=Quantity.replace(".",curSymbl);
		sap.m.MessageBox.information(vSymbol, {title: getPropertyValue(oResourceModel,"NPDashboard_Information")}); 
		}
		else{
		sap.m.MessageBox.information(Quantity, {title: getPropertyValue(oResourceModel,"NPDashboard_Information")}); 
			}
	}});*/
        ///////////////////////////////////////////// Dialog for change Symbol format ////////////////////////////////////////////////////////////////
        var oDSDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_DECIMAL_SYMBL"),
            content: [LabelText, oDSSelect, textField],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Save"),
                    press: function() {
                        var changedDS = oDSSelect.getSelectedKey();
                        if (changedDS.length > 0) {
                            var oDSChngModel = new sap.ui.model.xml.XMLModel();
                            oDSChngModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_ChangeDSFormat&Param.1=" + encodeURIComponent(changedDS) + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);

                            var status = oDSChngModel.getProperty("/Rowset/Row/O_Status");
                            if (status == "SUCCESS") {
                                sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDASHBOARD_SF_CHNAGE_SUCCESS_MESAGE"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                                });
                                oDSModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XAC_GetSymbolFormat&OutputParameter=O_SymbolFormat&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
                                var curDS = oDSModel.getProperty("/Rowset/Row/O_SymbolFormat");
                                oDSInput.setValue(curDS);
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDASHBOARD_ERROR_MESAGE"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                                });
                            }
                        } else {
                            sap.m.MessageBox.information(getPropertyValue(oResourceModel, "NPDASHBOARD_INPUT_SYMBOL_ERROR_MESAGE"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                        oDSDialog.close();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDSDialog.destroy();
                    }
                })
            ],
            afterOpen: function() {
                var Quantity = '20.12';
                var changedDS1 = oDSSelect.getSelectedKey();
                if (changedDS1.length > 0) {
                    var vSymbol = Quantity.replace(".", changedDS1);
                    textField.setValue(vSymbol);
                } else {
                    textField.setValue(Quantity);
                }
            },
        });
        oDSDialog.onAfterRendering = function() {
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
        oDSDialog.setContentWidth("300px");
        oDSDialog.setContentHeight("150px");
        oDSDialog.open();
    },
    configMessageType: function() {
        var LabelText_MsgType = new sap.m.Label({
            text: "Select the Message Type:"
        });
        LabelText_MsgType.addStyleClass("myText");
        var checkbox1 = new sap.m.CheckBox({
            text: "WMSUMO",
            useEntireWidth: true,
            width: "300px"
        });
        //var checkBox1Checked = checkbox1.getSelected();
        //alert(IfCheckBox1Checked);
        var checkbox2 = new sap.m.CheckBox({
            text: "WMTORD",
            useEntireWidth: true,
            width: "300px"
        });
        //var checkBox2Checked = checkbox2.getSelected();
        var clearNow = new Date();
        var TOMsgType_Model = new sap.ui.model.xml.XMLModel();
        TOMsgType_Model.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_TOMessageType&Param.1=0&OutputParameter=O_MessageType&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
        var checkBox1SelectionCheck = TOMsgType_Model.getProperty("/Rowset/Row/0/NodeValue");
        checkbox1.setSelected(checkBox1SelectionCheck);
        var checkBox2SelectionCheck = TOMsgType_Model.getProperty("/Rowset/Row/1/NodeValue");
        checkbox2.setSelected(checkBox2SelectionCheck);
        var oMsgTypeDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_TO_MSGTYPE"),
            content: [LabelText_MsgType, checkbox1, checkbox2],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Save"),
                    press: function() {
                        var checkBox1Checked = checkbox1.getSelected();
                        var checkBox2Checked = checkbox2.getSelected();
                        var clearNow = new Date();
                        var TOMsgType_Model = new sap.ui.model.xml.XMLModel();
                        TOMsgType_Model.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_TOMessageType&Param.1=1&OutputParameter=O_MessageType&Param.2=" + checkBox1Checked + "&Param.3=" + checkBox2Checked + "&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
                        sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDASHBOARD_MSGTYPE_CHANGE_SUCCESS_MESSAGE"), {
                            title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                        });
                        oMsgTypeDialog.close();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oMsgTypeDialog.destroy();
                    }
                })
            ],
        });
        oMsgTypeDialog.onAfterRendering = function() {
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
        oMsgTypeDialog.setContentWidth("300px");
        oMsgTypeDialog.setContentHeight("150px");
        oMsgTypeDialog.open();
    },
    configureBCPUI: function() {
        ////////////////////////////////////////////////////////////////////// Links for BCP UI Configurations //////////////////////////////////////////////////////////////////////
        var selectedPlant = oControllerThis.getView().byId("plant").getValue();
        if (selectedPlant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            var STypeManageBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_Update_SP_StorageType"),
                press: sap.ui.controller("nav.NestlePortal").updateSharedProperty
            }).addStyleClass("sapMBtnCustom");
            var obtnGR_PRODUCTION_DATE = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "GR_PRODUCTION_CONF_DATE"),
                press: sap.ui.controller("nav.NestlePortal").changeGRProductionDateSettings
            }).addStyleClass("sapMBtnCustom");
            var oAddBttn_SLOCWH = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "SLOC_WHNO_DISPLAY"),
                press: sap.ui.controller("nav.NestlePortal").fetchSLOC_WH
            }).addStyleClass("sapMBtnCustom");
            var stockMESSyncBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_MES_SYNC"),
                press: sap.ui.controller("nav.NestlePortal").configureMESSync
            }).addStyleClass("sapMBtnCustom");
            var manageGRBinBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_MAT_STRG_MAPPING"),
                press: sap.ui.controller("nav.NestlePortal").mapMatSType
            }).addStyleClass("sapMBtnCustom");
            var dateFormatBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_CUR_DT_FRMT"),
                press: sap.ui.controller("nav.NestlePortal").configBCPUI
            }).addStyleClass("sapMBtnCustom");
            var decimalSymblBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_DECIMAL_SYMBL"),
                press: sap.ui.controller("nav.NestlePortal").configDecimalSymbol
            }).addStyleClass("sapMBtnCustom");
            var TOMsgBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_TO_MSGTYPE"),
                press: sap.ui.controller("nav.NestlePortal").configMessageType
            }).addStyleClass("sapMBtnCustom");
            var docNumRngBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_DOC_NUM_RANGES"),
                press: sap.ui.controller("nav.NestlePortal").configureDocNumberRanges
            }).addStyleClass("sapMBtnCustom");
            var configurePrinterBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_CONFIG_PRINTER"),
                press: sap.ui.controller("nav.NestlePortal").configurePrinter
            }).addStyleClass("sapMBtnCustom");
            var cRStatusBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_CR_STATUS_CONFIG"),
                press: sap.ui.controller("nav.NestlePortal").configCRStatus
            }).addStyleClass("sapMBtnCustom");
            var VerifIdBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_RF_VERIFICATION_ID_LIST"),
                press: sap.ui.controller("nav.NestlePortal").configRfVerifId
            }).addStyleClass("sapMBtnCustom");
            var HalbBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_HALB_MATERIAL_TYPE"),
                press: sap.ui.controller("nav.NestlePortal").configHALBMatType
            }).addStyleClass("sapMBtnCustom");
            var GRBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GIGR_CONFIRMATION"),
                press: sap.ui.controller("nav.NestlePortal").configGRMsgConfirm
            }).addStyleClass("sapMBtnCustom");
            var BatchMergeConfig = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_BATCHMERGE"),
                press: sap.ui.controller("nav.NestlePortal").configBatchMerge
            }).addStyleClass("sapMBtnCustom");

            //////////////////////////////////////////////////////////////////////////////////////////////////////Goods Rceipt Pallet Info Field/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var GRPalletInfoBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GR_PALLETINFOFIELD"),
                press: sap.ui.controller("nav.NestlePortal").configGRPalletInfoConfirm
            }).addStyleClass("sapMBtnCustom");
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //////////////////////////////////////////////////////////////////////////////////////////////////////RF Device/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var RFDeviceInfoBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_RFDEVICE"),
                press: sap.ui.controller("nav.NestlePortal").configRFDeviceInfoConfirm
            }).addStyleClass("sapMBtnCustom");
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////End //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////Goods Issue Pallet/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var GIPalletBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "GI_PALLET_CONF"),
                press: sap.ui.controller("nav.NestlePortal").configGIPallet
            }).addStyleClass("sapMBtnCustom");
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////Goods Issue Staging/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var GIStageBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "GI_Stage_ConfigBtn"),
                press: sap.ui.controller("nav.NestlePortal").configGIStage
            }).addStyleClass("sapMBtnCustom");
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	 //////////////////////////////////////////////////////////////////////////////////////////////////////EWM GR SU Indicator/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            var EWMGRSUBtn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPM_EWM_GR_SUIndicator"),
                press: sap.ui.controller("nav.NestlePortal").configEWMGRSUIndicator
            }).addStyleClass("sapMBtnCustom");
            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            sap.ui.controller("nav.NestlePortal").setBCPConfigButtonsVisibility(obtnGR_PRODUCTION_DATE,GIPalletBtn,oAddBttn_SLOCWH, GIStageBtn, STypeManageBtn, stockMESSyncBtn, manageGRBinBtn,EWMGRSUBtn, dateFormatBtn, decimalSymblBtn, TOMsgBtn, BatchMergeConfig, docNumRngBtn, HalbBtn, GRBtn, configurePrinterBtn, cRStatusBtn, VerifIdBtn, GRPalletInfoBtn, RFDeviceInfoBtn);
            var varticalLayout = new sap.ui.layout.VerticalLayout({
                content: [oAddBttn_SLOCWH, GIStageBtn, STypeManageBtn, stockMESSyncBtn, manageGRBinBtn, EWMGRSUBtn,dateFormatBtn, decimalSymblBtn, TOMsgBtn, BatchMergeConfig, docNumRngBtn, configurePrinterBtn, cRStatusBtn, VerifIdBtn, HalbBtn, GIPalletBtn, obtnGR_PRODUCTION_DATE, GRBtn, GRPalletInfoBtn, RFDeviceInfoBtn]
            }).addStyleClass("sapMBtnCustom");
            //////////////////////////////////////////////////////////////////////////////// CSS For Buttons ////////////////////////////////////////////////////////////////////////////////
            var b1 = STypeManageBtn.getId();
            var b2 = stockMESSyncBtn.getId();
            var b3 = manageGRBinBtn.getId();
            var b5 = dateFormatBtn.getId();
            var b6 = docNumRngBtn.getId();
            var b7 = configurePrinterBtn.getId();
            var b8 = cRStatusBtn.getId();
            var b9 = decimalSymblBtn.getId();
            var b10 = VerifIdBtn.getId();
            var b11 = TOMsgBtn.getId();
            var b12 = HalbBtn.getId();
            var b13 = oAddBttn_SLOCWH.getId();
            var b14 = GRBtn.getId();
            var b15 = GRPalletInfoBtn.getId();
            var b16 = RFDeviceInfoBtn.getId();
            var b17 = BatchMergeConfig.getId();
            var b18 = GIStageBtn.getId();
            var b19 = obtnGR_PRODUCTION_DATE.getId();
	var b20 = EWMGRSUBtn.getId();
	var b21 = GIPalletBtn.getId();
            var css = "#" + b21 + "-content.sapMBtnContent,#" + b19 + "-content.sapMBtnContent,#" + b13 + "-content.sapMBtnContent,#" + b15 + "-content.sapMBtnContent,#" + b16 + "-content.sapMBtnContent,#" + b1 + "-content.sapMBtnContent,#" + b2 + "-content.sapMBtnContent,#" + b3 + "-content.sapMBtnContent,#" + b5 + "-content.sapMBtnContent,#" + b6 + "-content.sapMBtnContent,#" + b7 + "-content.sapMBtnContent,#" + b8 + "-content.sapMBtnContent,#" + b9 + "-content.sapMBtnContent,#" + b12 + "-content.sapMBtnContent,#" + b14 + "-content.sapMBtnContent,#" + b11 + "-content.sapMBtnContent,#" + b17 + "-content.sapMBtnContent,#" + b18 + "-content.sapMBtnContent,#" + b20 + "-content.sapMBtnContent,#" + b10 + "-content.sapMBtnContent{font-size: 1rem;}";
            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
            ////////////////////////////////////////////////// Dialog for  BCP UI Configurations /////////////////////////////////////////////////////
            var oNSAMConfigDialog = new sap.m.Dialog({
                title: getPropertyValue(oResourceModel, "NPDASHBOARD_TILE_BCP_UI_CONFIG"),
                content: [varticalLayout],
                buttons: [
                    new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                        press: function() {
                            oNSAMConfigDialog.destroy();
                        }
                    })
                ],
            });
            oNSAMConfigDialog.setContentWidth("650px");
            oNSAMConfigDialog.setContentHeight("800px");
            oNSAMConfigDialog.open();
        }
    },
    OpenLaborManagementConfig: function() {
        ////////////////////////////////////////////////////////////////////// Links for Labor Management//////////////////////////////////////////////////////////////////////
        ///////////IMPORT GLOBAL CODES////////////////////
        var SImportGlobalCodesBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_Import_Global_Codes"),
            id: "globalcodeImport_btn",
            press: sap.ui.controller("nav.NestlePortal").mapImportGlobalCodes
        }).addStyleClass("sapMBtnCustom");
        ///////////RESOURCE AND COST CENTER PAGE NAVIGATION///////////
        var SResourceAndCostCtnrBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_Resource_And_Cost_Center"),
            id: "resourceandcostcenter_btn",
            enabled: false,
            press: sap.ui.controller("nav.NestlePortal").mapResourceAndCostCenter
        }).addStyleClass("sapMBtnCustom");
        ////////////FICO Activity PAGE NAVIGATION/////////////
        var ficoActivityBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_FICO_ActivityType"),
            id: "ficoActivity_btn",
            enabled: false,
            press: sap.ui.controller("nav.NestlePortal").mapFICOActType
        }).addStyleClass("sapMBtnCustom");
        ///Labor Category//////////////////////////////
        var laborCategoryBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_Labor_Category"),
            id: "laborCategory_btn",
            enabled: false,
            press: sap.ui.controller("nav.NestlePortal").mapLaborCategory
        }).addStyleClass("sapMBtnCustom");
        ////LABOR ACTIVITY NAVIGATION PAGE////////////////////
        var laborActivityBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_Labor_Category_Activity"),
            id: "laborActivity_btn",
            enabled: false,
            press: sap.ui.controller("nav.NestlePortal").mapLaborCatagoryAndActivity
        }).addStyleClass("sapMBtnCustom");
        ///Labor rates
        /////BUDGETED LABOR HOURS
        var BudgetedLaborHoursBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_Budgeted_Labor_Hours"),
            id: "budgetedLaborHours_btn",
            enabled: false,
            press: sap.ui.controller("nav.NestlePortal").mapBdgLbrHrs
        }).addStyleClass("sapMBtnCustom");
        ///Labor Standard
        var laborStandardBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_Labor_Standard"),
            id: "docNumRngStd_btn",
            enabled: false,
            press: sap.ui.controller("nav.NestlePortal").mapLaborStandard
        }).addStyleClass("sapMBtnCustom");
        //Planned
        /////////////////DOWNLOAD TEMPLATES
        var SDownloadTemplatesBtn = new sap.m.Button({
            text: getPropertyValue(oResourceModel, "NPDashboard_Download_Templates"),
            id: "downloadTemplates_btn",
            enabled: false,
            press: sap.ui.controller("nav.NestlePortal").mapDownloadTemplates
        }).addStyleClass("sapMBtnCustom");
        var varticalLayout = new sap.ui.layout.VerticalLayout({
            content: [SImportGlobalCodesBtn, SResourceAndCostCtnrBtn, ficoActivityBtn, laborCategoryBtn, laborActivityBtn, , BudgetedLaborHoursBtn, laborStandardBtn, SDownloadTemplatesBtn]
        }).addStyleClass("sapMBtnCustom");
        var DateNw = new Date();
        var oCountModel = new sap.ui.model.xml.XMLModel();
        oCountModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/Common/QueryTemplates/XAC_CompareCodes&Param.1=" + plantId + "&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var count = oCountModel.getProperty("/Rowset/Row/Output");
        //alert(count);
        if (count == "Equal") {
            sap.ui.getCore().byId("resourceandcostcenter_btn").setEnabled(true);
            sap.ui.getCore().byId("ficoActivity_btn").setEnabled(true);
            sap.ui.getCore().byId("laborCategory_btn").setEnabled(true);
            sap.ui.getCore().byId("laborActivity_btn").setEnabled(true);
            sap.ui.getCore().byId("docNumRngStd_btn").setEnabled(true);
            sap.ui.getCore().byId("globalcodeImport_btn").setEnabled(false);
            sap.ui.getCore().byId("downloadTemplates_btn").setEnabled(true);
            sap.ui.getCore().byId("budgetedLaborHours_btn").setEnabled(true);
        } else {
            sap.ui.getCore().byId("globalcodeImport_btn").setEnabled(true);
        }
        //////////////////////////////////////////////////////////////////////////////// CSS For Buttons ////////////////////////////////////////////////////////////////////////////////
        var b1 = SResourceAndCostCtnrBtn.getId();
        var b2 = ficoActivityBtn.getId();
        var b3 = laborCategoryBtn.getId();
        var b4 = laborActivityBtn.getId();
        var b6 = laborStandardBtn.getId();
        var b8 = SDownloadTemplatesBtn.getId();
        var b9 = BudgetedLaborHoursBtn.getId();
        var css = "#" + b1 + "-content.sapMBtnContent,#" + b2 + "-content.sapMBtnContent,#" + b3 + "-content.sapMBtnContent,#" + b4 + "-content.sapMBtnContent,#" + b6 + "-content.sapMBtnContent,#" + b8 + "-content.sapMBtnContent,#" + b9 + "-content.sapMBtnContent{font-size: 1rem;}";
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
        ////////////////////////////////////////////////// Dialog for  BCP UI Configurations /////////////////////////////////////////////////////
        var oNSAMConfigDialog1 = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_TILE_LABOR_MANAGEMENT_CONFIG"),
            content: [varticalLayout],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oNSAMConfigDialog1.destroy();
                    }
                })
            ],
        });
        oNSAMConfigDialog1.setContentWidth("650px");
        oNSAMConfigDialog1.setContentHeight("450px");
        oNSAMConfigDialog1.open();
    },
    mapDownloadTemplates: function() {
        window.open("/XMII/CM/LaborManagement/Templates/Labour  Act and Resource.csv");
        window.open("/XMII/CM/LaborManagement/Templates/Labour Activity.csv");
        window.open("/XMII/CM/LaborManagement/Templates/Labour Resource and Cost Center Template.csv");
        //window.open("/XMII/CM/LaborManagement/Templates/Templates");
    },
    mapBudgetedlaborHours: function() {},
    mapImportGlobalCodes: function() {
        var DateNw = new Date();
        var oCountModel = new sap.ui.model.xml.XMLModel();
        oCountModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/FicoActivityTypeManagement/QueryTemplates/MDOQ_GetFICOCodeCount&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var count = oCountModel.getProperty("/Rowset/Row/col1");
        var oCountLabCatModel = new sap.ui.model.xml.XMLModel();
        oCountLabCatModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/LaborCategory/QueryTemplates/MDOQ_GetLabCatCodeCount&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var countLabCat = oCountLabCatModel.getProperty("/Rowset/Row/col1");
        var oCountLabActModel = new sap.ui.model.xml.XMLModel();
        oCountLabActModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/LaborCategoriesAndActivities/QueryTemplate/MDOQ_GetLabActCodeCount&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var countLabAct = oCountLabActModel.getProperty("/Rowset/Row/col1");
        var oCountLinkedModel = new sap.ui.model.xml.XMLModel();
        oCountLinkedModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/LaborCategoriesAndActivities/QueryTemplate/MDOQ_GetLinkedCodeCount&d=" + DateNw + "&Content-Type=text/xml", "", false);
        var oCountLinked = oCountLinkedModel.getProperty("/Rowset/Row/col1");
        if (count == 0) {
            var DateNw = new Date();
            var oGlobalCodesModel = new sap.ui.model.xml.XMLModel();
            oGlobalCodesModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/Common/QueryTemplates/XAC_InitializeLinkedFiCoActivities&d=" + DateNw + "&Content-Type=text/xml", "", false);
            var executionMSG = getPropertyValue(oResourceModel, oGlobalCodesModel.getProperty("/Rowset/Row/ExecutionMSG"));
            var oMsgModel = new sap.ui.model.xml.XMLModel();
            oMsgModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/Common/QueryTemplates/MDOQ_SelectCurrentMsg&d=" + DateNw + "&Content-Type=text/xml", "", false);
            var FicoMsg = getPropertyValue(oResourceModel, oMsgModel.getProperty("/Rowset/Row/0/Message"));
            var LabCatMsg = getPropertyValue(oResourceModel, oMsgModel.getProperty("/Rowset/Row/1/Message"));
            var LabActMsg = getPropertyValue(oResourceModel, oMsgModel.getProperty("/Rowset/Row/2/Message"));
            var LinkedMsg = getPropertyValue(oResourceModel, oMsgModel.getProperty("/Rowset/Row/3/Message"));
            var busyDialog = new sap.m.BusyDialog();
            busyDialog.open();
            if (executionMSG.match("Error")) {
                //sap.m.MessageBox.error(executionMSG, {title: getPropertyValue(oResourceModel,"NPDashboard_Error")});
                window.setTimeout(function() {
                    busyDialog.setText(executionMSG);
                }, 2000);
                window.setTimeout(function() {
                    busyDialog.close();
                }, 6000);
            } else {
                window.setTimeout(function() {
                    busyDialog.setText(FicoMsg);
                }, 1000);
                window.setTimeout(function() {
                    busyDialog.setText(LabCatMsg);
                }, 3000);
                window.setTimeout(function() {
                    busyDialog.setText(LabActMsg);
                }, 5000);
                window.setTimeout(function() {
                    busyDialog.setText(LinkedMsg);
                }, 7000);
                window.setTimeout(function() {
                    busyDialog.setText(executionMSG);
                }, 10000);
                window.setTimeout(function() {
                    busyDialog.close();
                }, 14000);
                //busyDialog.setText(LabCatMsg);
                //sap.m.MessageBox.success(executionMSG, {title: getPropertyValue(oResourceModel,"NPDashboard_Confirm")});
                sap.ui.getCore().byId("resourceandcostcenter_btn").setEnabled(true);
                sap.ui.getCore().byId("ficoActivity_btn").setEnabled(true);
                sap.ui.getCore().byId("laborCategory_btn").setEnabled(true);
                sap.ui.getCore().byId("laborActivity_btn").setEnabled(true);
                //sap.ui.getCore().byId("dateFormat_btn").setEnabled(true);
                sap.ui.getCore().byId("docNumRngStd_btn").setEnabled(true);
                //sap.ui.getCore().byId("docNumRngPlanned_btn").setEnabled(true);
                sap.ui.getCore().byId("globalcodeImport_btn").setEnabled(false);
                sap.ui.getCore().byId("downloadTemplates_btn").setEnabled(true);
                sap.ui.getCore().byId("budgetedLaborHours_btn").setEnabled(true);
            }
        } else {
            var outputMsgFICO, outputMsgLabCat, outputMsgLabAct, outputMsgLinkedCode, outputMsg;
            var DateNw = new Date();
            var oGlobalCodesModel = new sap.ui.model.xml.XMLModel();
            oGlobalCodesModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/Common/QueryTemplates/XAC_GetGlobalCodesCount&d=" + DateNw + "&Content-Type=text/xml", "", false);
            var FICO = oGlobalCodesModel.getProperty("/Rowset/Row/Fico");
            var LabCat = oGlobalCodesModel.getProperty("/Rowset/Row/LabCat");
            var LabAct = oGlobalCodesModel.getProperty("/Rowset/Row/LabAct");
            var Linked = oGlobalCodesModel.getProperty("/Rowset/Row/Linked");
            if (FICO != count) {
                var DateNw = new Date();
                var oInsertModel = new sap.ui.model.xml.XMLModel();
                oInsertModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/FicoActivityTypeManagement/QueryTemplates/XAC_InsertDeltaFICOCodes&d=" + DateNw + "&Content-Type=text/xml", "", false);
                outputMsgFICO = getPropertyValue(oResourceModel, oInsertModel.getProperty("/Rowset/Row/Output"));
            }
            if (LabCat != countLabCat) {
                var DateNw = new Date();
                var oInsertModel = new sap.ui.model.xml.XMLModel();
                oInsertModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/LaborCategory/QueryTemplates/XAC_InsertDeltaLabCatCodes&d=" + DateNw + "&Content-Type=text/xml", "", false);
                outputMsgLabCat = getPropertyValue(oResourceModel, oInsertModel.getProperty("/Rowset/Row/Output"));
            }
            if (LabAct != countLabAct) {
                var DateNw = new Date();
                var oInsertModel = new sap.ui.model.xml.XMLModel();
                oInsertModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/LaborCategoriesAndActivities/QueryTemplate/XAC_InsertDeltaLabActCodes&d=" + DateNw + "&Content-Type=text/xml", "", false);
                outputMsgLabAct = getPropertyValue(oResourceModel, oInsertModel.getProperty("/Rowset/Row/Output"));
            }
            if (Linked != oCountLinked) {
                var DateNw = new Date();
                var oInsertModel = new sap.ui.model.xml.XMLModel();
                oInsertModel.loadData("/XMII/Illuminator?QueryTemplate=LaborManagement/LaborCategoriesAndActivities/QueryTemplate/XAC_InsertDeltaLinkedCodes&d=" + DateNw + "&Content-Type=text/xml", "", false);
                outputMsgLinkedCode = getPropertyValue(oResourceModel, oInsertModel.getProperty("/Rowset/Row/Output"));
            }
            sap.ui.getCore().byId("globalcodeImport_btn").setEnabled(false);
            sap.ui.getCore().byId("resourceandcostcenter_btn").setEnabled(true);
            sap.ui.getCore().byId("ficoActivity_btn").setEnabled(true);
            sap.ui.getCore().byId("laborCategory_btn").setEnabled(true);
            sap.ui.getCore().byId("laborActivity_btn").setEnabled(true);
            //sap.ui.getCore().byId("dateFormat_btn").setEnabled(true);
            sap.ui.getCore().byId("docNumRngStd_btn").setEnabled(true);
            //sap.ui.getCore().byId("docNumRngPlanned_btn").setEnabled(true);
            sap.ui.getCore().byId("downloadTemplates_btn").setEnabled(true);
            sap.ui.getCore().byId("budgetedLaborHours_btn").setEnabled(true);
            var busyDialog = new sap.m.BusyDialog();
            busyDialog.open();
            window.setTimeout(function() {
                busyDialog.setText(getPropertyValue(oResourceModel, "NPDashboard_Matching_Delta_Global_Codes"));
            }, 1);
            window.setTimeout(function() {
                busyDialog.setText(getPropertyValue(oResourceModel, "NPDashboard_Inserting_Delta_Fico_Codes"));
            }, 501);
            window.setTimeout(function() {
                busyDialog.setText(outputMsgFICO);
            }, 1001);
            window.setTimeout(function() {
                busyDialog.setText(getPropertyValue(oResourceModel, "NPDashboard_Inserting_Delta_Labor_Category_Codes"));
            }, 1501);
            window.setTimeout(function() {
                busyDialog.setText(outputMsgLabCat);
            }, 2001);
            window.setTimeout(function() {
                busyDialog.setText(getPropertyValue(oResourceModel, "NPDashboard_Inserting_Delta_Labor_Activity_Codes"));
            }, 2501);
            window.setTimeout(function() {
                busyDialog.setText(outputMsgLabAct);
            }, 3001);
            window.setTimeout(function() {
                busyDialog.setText(getPropertyValue(oResourceModel, "NPDashboard_Inserting_Delta_Linked_Codes"));
            }, 3501);
            window.setTimeout(function() {
                busyDialog.setText(outputMsgLinkedCode);
            }, 4001);
            window.setTimeout(function() {
                busyDialog.close();
            }, 4501);
        }
    },
    configureDocNumberRanges: function() {
        var plant = oControllerThis.getView().byId("plant").getValue();
        if (plant.trim() == getPropertyValue(oResourceModel, "NPM_COMMON_SELECT_PLANT").trim()) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDashboard_Select_Plnt"), {
                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
            });
        } else {
            var oNumbRangesModel = new sap.ui.model.xml.XMLModel();
            var refresh = new Date();
            var plant = oControllerThis.getView().byId("plant").getValue();
            oNumbRangesModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_GetBCPAllTrx_RangeFromSP&Param.1=" + plant + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
            oNumRangeTable = new sap.m.Table({
                headerText: getPropertyValue(oResourceModel, "NPDASHBOARD_DOC_NUM_RANGES"),
                headerDesign: sap.m.ListHeaderDesign.Standard,
                mode: sap.m.ListMode.None
            });
            var colOpr = new sap.m.Column({
                header: new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPDASHBOARD_DOC_NAME")
                })
            });
            oNumRangeTable.addColumn(colOpr);
            var colFromRange = new sap.m.Column({
                header: new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPDASHBOARD_DOC_FROM_RANGE")
                })
            });
            oNumRangeTable.addColumn(colFromRange);
            var colToRange = new sap.m.Column({
                header: new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPDASHBOARD_DOC_TO_RANGE")
                })
            });
            oNumRangeTable.addColumn(colToRange);
            var colPresentNum = new sap.m.Column({
                header: new sap.m.Label({
                    text: getPropertyValue(oResourceModel, "NPDASHBOARD_DOC_PRESENT_RANGE")
                })
            });
            oNumRangeTable.addColumn(colPresentNum);
            var colEditImg = new sap.m.Column({
                header: new sap.m.Label(),
                width: "20px"
            });
            oNumRangeTable.addColumn(colEditImg);
            jQuery.sap.require("sap.ui.core.IconPool");
            var sURI = sap.ui.core.IconPool.getIconURI("sap-icon://edit");
            var oDocNumTemplate = new sap.m.ColumnListItem({
                cells: [
                    new sap.m.Text({
                        text: "{OperationName}"
                    }),
                    new sap.m.Input({
                        value: "{FromRange}",
                        enabled: false
                    }),
                    new sap.m.Input({
                        value: "{ToRange}",
                        enabled: false
                    }),
                    new sap.m.Input({
                        value: "{PresentNo}",
                        enabled: false
                    }),
                    new sap.ui.core.Icon({
                        src: {
                            parts: ['OperationShortID'],
                            formatter: function(OperationShortID) {
                                if (OperationShortID == 'SSCC') {
                                    return sURI;
                                }
                            }
                        },
                        press: function(oEvent) {
                            oSaveBttn.setEnabled(true);
                            var elements = oEvent.getSource().getParent().getCells();
                            var len = elements.length;
                            var element;
                            for (var i = 0; i < len; i++) {
                                element = elements[i].toString();
                                if (element.indexOf("sap.m.Input") >= 0) {
                                    elements[i].setEnabled(true);
                                    ///////// Disabling the Present Number Edit for the first entry ////////
                                    var presentNoElemnt = elements[3];
                                    var presentNo = presentNoElemnt.getValue();
                                    if (presentNo == "" || presentNo == "---" || presentNo == undefined || presentNo == null) {
                                        presentNoElemnt.setEnabled(false);
                                    } else {
                                        presentNoElemnt.setEnabled(true);
                                    }
                                    ///////// End - Disabling the Present Number Edit for the first entry ////////
                                }
                            }
                        }
                    }),
                ]
            });
            oNumRangeTable.bindItems("/Rowset/Row", oDocNumTemplate);
            oNumRangeTable.setModel(oNumbRangesModel);
            oNumRangeTable.addStyleClass("sapMListTblCellWithoutPadding");
            ///////////////////////////////////////////////// CSS for oNumRangeTable /////////////////////////////////////////////////////
            var tableItems = oNumRangeTable.getItems();
            var noOfCells = oNumRangeTable.getColumns().length;
            var i = 0;
            var elementID;
            var cell;
            tableItems.forEach(function() {
                for (var j = 0; j < noOfCells; j++) {
                    cell = "#" + tableItems[i].getId().toString() + "_cell" + j;
                    elementID = (elementID == "" || elementID == undefined) ? cell : elementID + "," + cell;
                }
                i++;
            });
            var css = elementID + "{padding: 0.2rem;vertical-align: baseline;font-size: 0.87rem;}";
            var head = document.head || document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
            /////////////////////////////////////////////////// Save Button ///////////////////////////////////////////////
            var oSaveBttn = new sap.m.Button({
                text: getPropertyValue(oResourceModel, "NPDashboard_Save"),
                enabled: false,
                press: function() {
                    var elementInputs = oNumRangeTable.getItems()[1].getCells();
                    var fromField = elementInputs[1];
                    var toField = elementInputs[2];
                    var presentField = elementInputs[3];
                    var fromRangeInput = fromField.getValue();
                    var toRangeInput = toField.getValue();
                    var presentRangeInput = presentField.getValue();
                    var afterChangeXML = oNumRangeTable.getModel().getXML();
                    var isFirstEntry = presentField.getEnabled() ? false : true;
                    if ((fromRangeInput != "" && toRangeInput != "" && (presentRangeInput != "" || isFirstEntry) && fromRangeInput > 0 && fromRangeInput < toRangeInput) && (toRangeInput > 0 && toRangeInput > fromRangeInput) && ((presentRangeInput >= fromRangeInput && presentRangeInput < toRangeInput) || isFirstEntry) && !isNaN(fromRangeInput) && parseInt(Number(fromRangeInput)) == fromRangeInput && !isNaN(parseInt(fromRangeInput, 10)) && !isNaN(toRangeInput) && parseInt(Number(toRangeInput)) == toRangeInput && !isNaN(parseInt(toRangeInput, 10)) && ((!isNaN(presentRangeInput) && parseInt(Number(presentRangeInput)) == presentRangeInput && !isNaN(parseInt(presentRangeInput, 10))) || isFirstEntry) && Number(fromRangeInput).toString().length == 17 && Number(toRangeInput).toString().length == 17 && (Number(presentRangeInput).toString().length == 17 || isFirstEntry)) {
                        var plant = oControllerThis.getView().byId("plant").getValue();
                        var oRangeChngModel = new sap.ui.model.xml.XMLModel();
                        var refresh = new Date();
                        oRangeChngModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_UpdateAllTrxRange&Param.1=" + plant + "&Param.2=" + afterChangeXML + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                        var status = oRangeChngModel.getProperty("/Rowset/Row/O_Status");
                        if (fromField.getEnabled() && toField.getEnabled()) {
                            if (status == "SUCCESS") {
                                sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_UPDATE_SUCCESS"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                                });
                                fromField.setEnabled(false);
                                toField.setEnabled(false);
                                presentField.setEnabled(false);
                                oSaveBttn.setEnabled(false);
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_UPDATE_ERROR"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                                });
                            }
                        }
                    } else {
                        if (fromRangeInput <= 0 || isNaN(fromRangeInput) || parseInt(Number(fromRangeInput)) != fromRangeInput || isNaN(parseInt(fromRangeInput, 10))) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_FR"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (toRangeInput <= 0 || isNaN(toRangeInput) || parseInt(Number(toRangeInput)) != toRangeInput || isNaN(parseInt(toRangeInput, 10))) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_TR"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (!isFirstEntry && (presentRangeInput <= 0 || isNaN(presentRangeInput) || parseInt(Number(presentRangeInput)) != presentRangeInput || isNaN(parseInt(presentRangeInput, 10)))) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_PN"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (Number(fromRangeInput).toString().length != 17) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_DIGITS_FR"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (Number(toRangeInput).toString().length != 17) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_DIGITS_TR"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (Number(presentRangeInput).toString().length != 17 && !isFirstEntry) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_DIGITS_PN"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (fromRangeInput >= toRangeInput) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_FR"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else if (!isFirstEntry && (presentRangeInput < fromRangeInput || presentRangeInput >= toRangeInput)) {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_PN"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_INPUT_VALIDATION_COMMON"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                    }
                }
            });
            ////////////////////////////////////////////////// Dialog for App Version /////////////////////////////////////////////////////
            var oDialog = new sap.m.Dialog({
                title: getPropertyValue(oResourceModel, "NPDASHBOARD_DOC_NUM_RANGES"),
                content: [oNumRangeTable],
                buttons: [, oSaveBttn,
                    new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                        press: function() {
                            oDialog.destroy();
                        }
                    })
                ],
            });
            oDialog.setContentWidth("1000px");
            oDialog.setContentHeight("500px");
            oDialog.open();
        }
    },
    getDateDisplayFormat: function(date) {
        if (date === "0000-00-00") {
            return date;
        } else {
            return formatDate(date, "yyyy-MM-dd'T'HH:mm:ss", "YES");
        }
    },
    configCRStatus: function() {
        /////////////////////////////////////////////////// Change CR Status ///////////////////////////////////////////
        var oCRStatusModel = new sap.ui.model.xml.XMLModel();
        var refresh = new Date();
        oCRStatusModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_CRStatus&OutputParameter=O_OutputCRStatusXML&Param.1=ALL&Param.2=" + userLanguage + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var currentCRStatus = oCRStatusModel.getProperty("/Rowset/Row/CRStatus");
        var oCRStatusConfigHeader = new sap.m.Label({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_CR_STATUS_CONFIG")
        });
        var oCRStatusSelect = new sap.m.Select({
            width: "300px",
            selectedKey: currentCRStatus
        });
        var oListItemCRStatus = new sap.ui.core.ListItem();
        oListItemCRStatus.bindProperty("text", "StatusValue");
        oListItemCRStatus.bindProperty("key", "StatusKey");
        oCRStatusSelect.bindItems("/Rowset/Row", oListItemCRStatus);
        oCRStatusSelect.setModel(oCRStatusModel);
        ////////////////////////////////////////////////// Dialog for Change CR Status Change /////////////////////////////////////////////////////
        var oCRDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_TILE_BCP_UI_CONFIG"),
            content: [oCRStatusConfigHeader, oCRStatusSelect],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Save"),
                    press: function() {
                        var changedCRStatus = oCRStatusSelect.getSelectedKey();
                        if (changedCRStatus.length > 0) {
                            var oCRStatusChngModel = new sap.ui.model.xml.XMLModel();
                            var refresh = new Date();
                            oCRStatusChngModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_CRStatus&OutputParameter=O_Response&Param.1=UPDATE&Param.3=" + changedCRStatus + "&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                            var status = oCRStatusChngModel.getProperty("/Rowset/Row/O_Response");
                            if (status == "SUCCESS") {
                                sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDASHBOARD_CR_STATUS_CHNAGE_SUCCESS_MESAGE"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                                });
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDASHBOARD_ERROR_MESAGE"), {
                                    title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                                });
                            }
                        }
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oCRDialog.destroy();
                    }
                })
            ],
        });
        oCRDialog.setContentWidth("300px");
        oCRDialog.setContentHeight("200px");
        oCRDialog.open();
    },
    configRfVerifId: function() {
        window.open(encodeURI("/XMII/CM/MaterialHandling/RFDevice/RF_VERID/Page/RF_VERID.irpt?clientFromURL=" + client + "&Language=" + userLanguage), "_blank");
    },

changeGRProductionDateSettings: function(){

        var refresh = new Date();
        //var itemsGRProductionDate = [];

        var oGRProdDateSettingModel = new sap.ui.model.xml.XMLModel();
        oGRProdDateSettingModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&"
						+"Param.2=GR_PROD_DATE_SETTING&Param.1=0&cache=" + refresh + "&Content-Type=text/xml"), "", false);
        var grProdDateSetting = oGRProdDateSettingModel.getProperty("/Rowset/Row/GRProdDateType");
        var radioGroupGRProdDate = new sap.m.RadioButtonGroup({
							select: function(){sap.ui.getCore().getElementById("btn_grProdSAVE").setEnabled(true);},
							buttons:[
								new sap.m.RadioButton({text: getPropertyValue(oResourceModel, "GR_PRODUCTION_SHIFT_DATE"),
										id:"rBtn_gr_prod_shiftDate"
								}),
								new sap.m.RadioButton({text: getPropertyValue(oResourceModel, "GR_PRODUCTION_JULIAN_DATE"),
										id:"rBtn_gr_prod_JulianDate"
								})
																					]});
        var oDialogGRProdDate = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "GR_PRODUCTION_CONF_DATE"),
            content: [radioGroupGRProdDate],
            buttons: [
                new sap.m.Button({
                    id:"btn_grProdSAVE",
                    enabled: false,
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {
                        if(sap.ui.getCore().getElementById("rBtn_gr_prod_JulianDate").getSelected()){
                          grProdDateSetting = "JULIANDATE";
                        }else{
                          grProdDateSetting = "SHIFTDATE";
                        }
                        var oGRProdDateSettingUpdateModel = new sap.ui.model.xml.XMLModel();
                        oGRProdDateSettingUpdateModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&"
						+"Param.2=GR_PROD_DATE_SETTING&Param.1=1&Param.5="+grProdDateSetting+"&cache=" + refresh + "&Content-Type=text/xml"), "", false);
                        oDialogGRProdDate.close();
                        oDialogGRProdDate.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDialogGRProdDate.close();
                        oDialogGRProdDate.destroy();
                    }
                })
            ]
        });
        if(grProdDateSetting=="JULIANDATE"){
          sap.ui.getCore().getElementById("rBtn_gr_prod_JulianDate").setSelected(true);
        } else{
          sap.ui.getCore().getElementById("rBtn_gr_prod_shiftDate").setSelected(true);
        }

        oDialogGRProdDate.setContentWidth("23%");
        oDialogGRProdDate.setContentHeight("17%");
        oDialogGRProdDate.open();

},

    fetchSLOC_WH: function() {
        var refresh = new Date();
        var SlocWHnoArray = [];
        var modifiedItem = "",
            beforeModifiedItem = "";
        var oSLOCWHModel = new sap.ui.model.xml.XMLModel();
        oSLOCWHModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_FetchSLOC_WhNo&Param.1=" + 1 + "&cache=" + refresh + "&OutputParameter=O_OutputXML&Content-Type=text/xml"), "", false);
        var stringModel = oSLOCWHModel.getXML();
        var rowCount = $(stringModel).find("Row").size();
        for (var i = 0; i < rowCount; i++) {
            var context = "/Rowset/Row/" + i + "/";
            SlocWHnoArray.push(oSLOCWHModel.getProperty(context + "SLOC") + " - " + oSLOCWHModel.getProperty(context + "WHNO") + " - " + oSLOCWHModel.getProperty(context + "SOURCE"));
        }
        oSLocWhnoTable = new sap.m.Table({
            mode: sap.m.ListMode.SingleSelectMaster,
            selectionChange: function(oEvent) {
                selectedSLocWhnoItem = oEvent.getSource().getSelectedItem().getBindingContext();
                var selectedSloc = selectedSLocWhnoItem.getProperty("SLOC");
                var selectedWH = selectedSLocWhnoItem.getProperty("WHNO");
                var selectedSource = selectedSLocWhnoItem.getProperty("SOURCE");
                selectedSourceState = (selectedSource == "EWM");
                oSwitchEWM.setState(selectedSourceState);
                oInputSLOC.setEnabled(false);
                oInputSLOC.setValue(selectedSloc);
                oInputWH.setEnabled(false);
                oInputWH.setValue(selectedWH);
                oInputErr.setText("");
                oInputErr.setVisible(false);
                oAddBttn.setVisible(false);
                oEditBttn.setVisible(true);
                oEditBttn.setEnabled(false);
                var refresh = new Date();
                beforeModifiedItem = selectedSloc + " - " + selectedWH + " - " + selectedSource;
                modifiedItem = selectedSloc + " - " + selectedWH;

            }
        });
        var SLocName = new sap.m.Column({
            header: new sap.m.Label({
                design: "Bold",
                text: getPropertyValue(oResourceModel, "TransferType_Lbl_StorageLocation")
            }),
            width: "35%"
        });
        oSLocWhnoTable.addColumn(SLocName);
        var SWHName = new sap.m.Column({
            header: new sap.m.Label({
                design: "Bold",
                text: getPropertyValue(oResourceModel, "NPM_COMMON_WAREHOUSE"),
            }),
            width: "30%"
        });
        oSLocWhnoTable.addColumn(SWHName);
        var EWMImg = new sap.m.Column({
            header: new sap.m.Label({
                design: "Bold",
                text: "EWM"
            }),
            width: "25%"
        });
        oSLocWhnoTable.addColumn(EWMImg);
        var deleteImg = new sap.m.Column({
            header: new sap.m.Label(),
            width: "10%"
        });
        oSLocWhnoTable.addColumn(deleteImg);
        jQuery.sap.require("sap.ui.core.IconPool");
        var icon_delete = sap.ui.core.IconPool.getIconURI("sap-icon://delete");

        var oSLocWhnoTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.Text({
                    text: "{SLOC}"
                }),
                new sap.m.Text({
                    text: "{WHNO}"
                }),
                new sap.m.HBox({
                    justifyContent: "Center",
                    items: [
                        new sap.ui.core.Icon({
                            src: "sap-icon://accept",
                            color: "Green",
                            visible: {
                                parts: [{
                                    path: 'SOURCE'
                                }],
                                formatter: function(source) {
                                    var result = (source.toUpperCase() === 'EWM');
                                    return result;
                                }
                            }
                        }),
                        new sap.m.Text({
                            visible: {
                                parts: [{
                                    path: 'SOURCE'
                                }],
                                formatter: function(source) {
                                    var result = (source.toUpperCase() === 'ECC');
                                    return result;
                                }
                            }
                        })
                    ]
                }),
                new sap.ui.core.Icon({
                    src: sap.ui.core.IconPool.getIconURI("sap-icon://delete"),
                    color: "red",
                    press: function(oEvent) {
                        var selectedItem = oEvent.getSource().getBindingContext();
                        var selectedSlocWH = selectedItem.getProperty("SLOC") + " - " + selectedItem.getProperty("WHNO") + " - " + selectedItem.getProperty("SOURCE");
                        var dialog = new sap.m.Dialog({
                            title: getPropertyValue(oResourceModel, "NPORTAL_IMR_CONFIRMATION"),
                            draggable: true,
                            contentWidth: "15%",
                            icon: "sap-icon://sys-help",
                            type: 'Message',
                            content: [new sap.m.Text({
                                text: getPropertyValue(oResourceModel, "NP_PortalSLOCWHRemove"),
                            })],
                            beginButton: new sap.m.Button({
                                width: "15%",
                                text: getPropertyValue(oResourceModel, "NPDashboard_Yes"),
                                press: function() {
                                    stringModel = sap.ui.controller("nav.NestlePortal").removeItemFromModelSLOC(selectedSlocWH, stringModel);
                                    oSLOCWHModel.setSizeLimit($(stringModel).find("Row").size());
                                    rowCount = $(stringModel).find("Row").size();
                                    oSLOCWHModel.setXML(stringModel);
                                    oSLocWhnoTable.setModel(oSLOCWHModel);
                                    SlocWHnoArray.slice(SlocWHnoArray.indexOf(selectedSlocWH), 1);
                                    sap.ui.getCore().getElementById("saveBtn").setEnabled(true);
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
                    }
                }),
            ]
        });
        oSLocWhnoTable.bindItems("/Rowset/Row", oSLocWhnoTemplate);
        oSLocWhnoTable.setModel(oSLOCWHModel);
        var spacer = new sap.m.ToolbarSpacer({});
        var oInputSLOC = new sap.m.Input({
            width: "30%",
            placeholder: getPropertyValue(oResourceModel, "TransferType_Lbl_StorageLocation")
        });
        var oInputWH = new sap.m.Input({
            width: "30%",
            placeholder: getPropertyValue(oResourceModel, "NPM_COMMON_WAREHOUSE")
        });
        var oSwitchEWM = new sap.m.Switch({
            customTextOn: "EWM",
            customTextOff: "ECC",
            change: function(oEvt) {
                if (selectedSourceState == oSwitchEWM.getState()) {
                    oEditBttn.setEnabled(false);
                } else {
                    oEditBttn.setEnabled(true);
                }
            }
        });
        var oInputErr = new sap.m.Text({
            visible: false,
            text: getPropertyValue(oResourceModel, "NP_PortalSLOCWHBlank")
        });
        var oEditBttn = new sap.m.Button({
            id: "swEditbutton",
            text: getPropertyValue(oResourceModel, "Print_Update"),
            icon: "sap-icon://edit",
            visible: false,
            enabled: false,
            press: function(oEvent) {
                modifiedItem = modifiedItem + " - " + (oSwitchEWM.getState() ? "EWM" : "ECC");
                var dialog = new sap.m.Dialog({
                    title: getPropertyValue(oResourceModel, "NPORTAL_IMR_CONFIRMATION"),
                    draggable: true,
                    contentWidth: "15%",
                    icon: "sap-icon://sys-help",
                    type: 'Message',
                    content: [new sap.m.Text({
                        text: getPropertyValue(oResourceModel, "NP_PortalSLOCWHUpdate") + " " + (oSwitchEWM.getState() ? "EWM" : "ECC"),
                    })],
                    beginButton: new sap.m.Button({
                        width: "15%",
                        text: getPropertyValue(oResourceModel, "NPDashboard_Yes"),
                        press: function() {
                            stringModel = sap.ui.controller("nav.NestlePortal").removeItemFromModelSLOC(beforeModifiedItem, stringModel);
                            SlocWHnoArray.slice(SlocWHnoArray.indexOf(beforeModifiedItem), 1);
                            stringModel = sap.ui.controller("nav.NestlePortal").addItemToModelSLOC(oInputSLOC.getValue(), oInputWH.getValue(), oSwitchEWM.getState() ? "EWM" : "ECC", stringModel, rowCount);
                            oSLOCWHModel.setSizeLimit($(stringModel).find("Row").size());
                            oSLOCWHModel.setXML(stringModel);
                            SlocWHnoArray.push(modifiedItem);
                            oSLocWhnoTable.setModel(oSLOCWHModel);
                            sap.ui.getCore().getElementById("saveBtn").setEnabled(true);
                            oAddBttn.setVisible(true);
                            oEditBttn.setVisible(false);
                            oInputSLOC.setEnabled(true);
                            oInputSLOC.setValue("");
                            oInputWH.setEnabled(true);
                            oInputWH.setValue("");
                            oSLocWhnoTable.removeSelections(true);
                            dialog.close();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: getPropertyValue(oResourceModel, "NPDashboard_No"),
                        press: function() {
                            oAddBttn.setVisible(true);
                            oEditBttn.setVisible(false);
                            oEditBttn.setEnabled(false);
                            oInputSLOC.setEnabled(true);
                            oInputSLOC.setValue("");
                            oInputWH.setEnabled(true);
                            oInputWH.setValue("");
                            oSwitchEWM.setState(false);
                            oSLocWhnoTable.removeSelections(true);
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
            }
        });
        var oResetBttn = new sap.m.Button({
            id: "swResetbutton",
            icon: "sap-icon://reset",
            tooltip: getPropertyValue(oResourceModel, "GI_ComponentList_Reset"),
            press: function() {
                sap.ui.getCore().getElementById("saveBtn").setEnabled(false);
                oAddBttn.setVisible(true);
                oEditBttn.setVisible(false);
                oEditBttn.setEnabled(false);
                oInputSLOC.setEnabled(true);
                oInputSLOC.setValue("");
                oInputWH.setEnabled(true);
                oInputWH.setValue("");
                oSwitchEWM.setState(false);
                oSLocWhnoTable.removeSelections(true);
            }
        });
        var oAddBttn = new sap.m.Button({
            id: "swbutton",
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ADD"),
            icon: "sap-icon://add",
            color: "white",
            press: function(oEvent) {
                oInputErr.setVisible(false);
                var newSLOC = oInputSLOC.getValue();
                var newWH = oInputWH.getValue();
                var newSource = oSwitchEWM.getState() ? "EWM" : "ECC";
                var duplicate = false;
                if (newSLOC != "" && newWH != "") {
                    newSLOC = newSLOC.toUpperCase().trim();
                    newWH = newWH.toUpperCase().trim();
                    var newSLOCWH = newSLOC + " - " + newWH + " - " + newSource;
                    if (SlocWHnoArray.indexOf(newSLOCWH) > -1) {
                        duplicate = true;
                    }
                    if (duplicate) {
                        oInputSLOC.setValue("");
                        oInputErr.setText(getPropertyValue(oResourceModel, "NPDashboard_Error_Occurred_InvalidValues"))
                        oInputSLOC.addStyleClass("errorInput");
                        oInputErr.setVisible(true);
                        oInputWH.setValue("");
                        oInputErr.addStyleClass("errorInputtxt");
                        oInputWH.addStyleClass("errorInput");
                    } else {
                        stringModel = sap.ui.controller("nav.NestlePortal").addItemToModelSLOC(newSLOC, newWH, newSource, stringModel, rowCount);
                        rowCount = rowCount + 1;
                        oSLOCWHModel.setSizeLimit($(stringModel).find("Row").size());
                        oSLOCWHModel.setXML(stringModel);
                        SlocWHnoArray.push(newSLOCWH);
                        oSLocWhnoTable.setModel(oSLOCWHModel);
                        sap.ui.getCore().getElementById("Downloadbtn").setVisible(false);
                        oInputSLOC.setValue("");
                        oInputSLOC.removeStyleClass("errorInput");
                        oInputWH.setValue("");
                        oInputWH.removeStyleClass("errorInput");
                        oInputErr.setVisible(false);
                        sap.ui.getCore().getElementById("saveBtn").setEnabled(true);
                    }
                } else {
                    oInputErr.setText(getPropertyValue(oResourceModel, "NP_PortalSLOCWHBlank"))
                    oInputSLOC.addStyleClass("errorInput");
                    oInputWH.addStyleClass("errorInput");
                    oInputErr.setVisible(true);
                    oInputErr.addStyleClass("errorInputtxt");
                }
            }
        });
        var oDialogSLOCWH = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "SLOC_WHNO_DISPLAY"),
            content: [oInputSLOC, oInputWH, oSwitchEWM, oAddBttn, oEditBttn, oResetBttn, oInputErr],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NP_PortalDownload"),
                    id: "Downloadbtn",
                    icon: "sap-icon://download",
                    press: function() {
                        var refresh = new Date();
                        var oSLOCWhModelDown = new sap.ui.model.xml.XMLModel();
                        oSLOCWhModelDown.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ__GetSLOC_WHFromECC&cache=" + refresh + "&Content-Type=text/xml", "", false);
                        var response = oSLOCWhModelDown.getProperty("/Rowset/Row/O_OutputXML");
                        if (response == "SUCCESS") {
                            oDialogSLOCWH.destroy();
                            oControllerThis.fetchSLOC_WH();
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NP_PortalDownloadSuccess"));
                        } else if (response == "ECCdown") {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "TransferDisplay_BCPStatus"));
                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDASHBOARD_ERROR_MESAGE"));
                        }
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    id: "saveBtn",
                    enabled: false,
                    press: function() {
                        var item = oSLocWhnoTable.getItems();
                        var len = item.length;
                        var oListModified = "";
                        for (var i = 0; i < len; i++) {
                            var value = item[i].getBindingContext();
                            if (value != "") {
                                if (i == 0) {
                                    oListModified = value.getProperty("SLOC") + " - " + value.getProperty("WHNO") + " - " + value.getProperty("SOURCE");
                                } else {
                                    oListModified = oListModified + "," + value.getProperty("SLOC") + " - " + value.getProperty("WHNO") + " - " + value.getProperty("SOURCE");
                                }
                            }
                        }
                        if (true) {
                            var refresh = new Date();
                            var oSLOCWhModel = new sap.ui.model.xml.XMLModel();
                            oSLOCWhModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_FetchSLOC_WhNo&Param.1=" + 0 + "&Param.2=" + oListModified + "&cache=" + refresh + "&Content-Type=text/xml", "", false);
                            var response = oSLOCWhModel.getProperty("/Rowset/Row/Output");
                            if (response == "SUCCESS") {
                                sap.m.MessageBox.success(getPropertyValue(oResourceModel, "PrintMsg_Msg14"));
                            } else {
                                sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_UPDATE_ERROR"));
                            }
                        }
                        oInputSLOC.removeStyleClass("errorInput");
                        oInputWH.removeStyleClass("errorInput");
                        oDialogSLOCWH.close();
                        oDialogSLOCWH.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oDialogSLOCWH.close();
                        oDialogSLOCWH.destroy();
                    }
                })
            ],
        });
        var DownloadFlag;
        if (rowCount != 0 || oBCPStats == 0) {
            DownloadFlag = 0;
            sap.ui.getCore().getElementById("Downloadbtn").setVisible(false);
        }
        oDialogSLOCWH.setContentWidth("43%");
        oDialogSLOCWH.setContentHeight("46%");
        oDialogSLOCWH.addContent(oSLocWhnoTable);
        oDialogSLOCWH.onAfterRendering = function() {
            oInputSLOC.addStyleClass("slocwhpadding");
            oResetBttn.addStyleClass("custom-padding-left");
            oInputSLOC.addStyleClass("custom-padding-left");
            oInputWH.addStyleClass("slocwhpadding");
            oSwitchEWM.addStyleClass("slocwhpadding");
            if (DownloadFlag != 0) {
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
            }
        };
        oDialogSLOCWH.open();
    },
    configGRMsgConfirm: function() {
        var DateNw = new Date();
        var changedFlag;
        var clearNow = new Date();
        var checkbox_1 = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GRMSG_CONFIRMATION")
        });
        var checkbox_2 = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GIMSG_CONFIRMATION")
        });
        var checkbox_3 = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GRBATCH_CONFIRMATION")
        });
        var checkbox_4 = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GISLED_CONFIRMATION")
        });
        var checkbox_5 = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_CLEARRESERVATION_CONFIRMATION")
        });
        var checkbox_6 = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GR_BIN_DETERMINATION")
        });
        var oGRFlag = new sap.ui.model.xml.XMLModel();
        oGRFlag.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGR_ConfirmationMsgFlag&Param.1=" + 1 + "&d=" + DateNw + "&cache=" + clearNow + "&Content-Type=text/xml"), "", false);
        var checkBoxSelectionCheck_1 = oGRFlag.getProperty("/Rowset/Row/GR_Msg") == "1" ? 1 : 0;
        checkbox_1.setSelected(checkBoxSelectionCheck_1);
        var checkBoxSelectionCheck_2 = oGRFlag.getProperty("/Rowset/Row/GI_Msg") == "1" ? 1 : 0;
        checkbox_2.setSelected(checkBoxSelectionCheck_2);
        var checkBoxSelectionCheck_3 = oGRFlag.getProperty("/Rowset/Row/GR_Batch_Msg") == "1" ? 1 : 0;
        checkbox_3.setSelected(checkBoxSelectionCheck_3);
        var checkBoxSelectionCheck_4 = oGRFlag.getProperty("/Rowset/Row/GI_Sled_Msg") == "1" ? 1 : 0;
        checkbox_4.setSelected(checkBoxSelectionCheck_4);
        var checkBoxSelectionCheck_5 = oGRFlag.getProperty("/Rowset/Row/GI_ClearReservation") == "1" ? 1 : 0;
        checkbox_5.setSelected(checkBoxSelectionCheck_5);
        var checkBoxSelectionCheck_6 = oGRFlag.getProperty("/Rowset/Row/GR_Bin_Determination_In_MES_Stock_Sync") == "1" ? 1 : 0;
        checkbox_6.setSelected(checkBoxSelectionCheck_6);
        var oGRMsgConfirm = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GIGR_CONFIRMATION"),
            content: [checkbox_1, checkbox_2, checkbox_3, checkbox_4, checkbox_5, checkbox_6],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {
                        var checkBoxChecked_1 = checkbox_1.getSelected();
                        var checkBoxChecked_2 = checkbox_2.getSelected();
                        var checkBoxChecked_3 = checkbox_3.getSelected();
                        var checkBoxChecked_4 = checkbox_4.getSelected();
                        var checkBoxChecked_5 = checkbox_5.getSelected();
                        var checkBoxChecked_6 = checkbox_6.getSelected();
                        var oGRFlag = new sap.ui.model.xml.XMLModel();
                        oGRFlag.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGR/QueryTemplate/XACQ_GetGR_ConfirmationMsgFlag&Param.1=" + 0 + "&Param.2=" + checkBoxChecked_1 + "&Param.3=" + checkBoxChecked_2 + "&Param.4=" + checkBoxChecked_3 + "&Param.5=" + checkBoxChecked_4 + "&Param.6=" + checkBoxChecked_5 + "&Param.7=" + checkBoxChecked_6 + "&d=" + DateNw + "&Content-Type=text/xml"), "", false);
                        var status = oGRFlag.getProperty("/Rowset/Row/O_Status");
                        if (status == "SUCCESS") {
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "Custom_GR_UpdateSuccess"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                            });
                        }
                        oGRMsgConfirm.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oGRMsgConfirm.destroy();
                    }
                })
            ],
        });
        oGRMsgConfirm.onAfterRendering = function() {
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
        oGRMsgConfirm.setContentWidth("500px");
        oGRMsgConfirm.setContentHeight("350px");
        oGRMsgConfirm.open();
    },
    configBatchMerge: function() {

        var checkbox1 = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NP_BatchMergeEnable"),
            useEntireWidth: true,
            width: "300px",
            select: function() {
                var CheckBoxCurrent = checkbox1.getSelected();
                if (CheckBoxCurrent == true) {
                    checkbox1.setSelected(true);
                    oInputSType.setEnabled(true);
                    oInputSBin.setEnabled(true);
                    oAddBttn.setEnabled(true);
                    oSTypeSBinTable.setVisible(true);
                } else {
                    checkbox1.setSelected(false);
                    oInputSType.setEnabled(false);
                    oInputSBin.setEnabled(false);
                    oAddBttn.setEnabled(false);
                    oSTypeSBinTable.setVisible(false);
                }
            }
        });

        oSTypeSBinTable = new sap.m.Table({
            mode: sap.m.ListMode.None
        });
        var STypeName = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_TYPE")
            })
        });
        oSTypeSBinTable.addColumn(STypeName);
        var SBinName = new sap.m.Column({
            header: new sap.m.Label({
                text: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_BIN")
            })
        });
        oSTypeSBinTable.addColumn(SBinName);
        var deleteImg = new sap.m.Column({
            header: new sap.m.Label(),
            width: "20px"
        });
        oSTypeSBinTable.addColumn(deleteImg);
        jQuery.sap.require("sap.ui.core.IconPool");
        var icon_delete = sap.ui.core.IconPool.getIconURI("sap-icon://delete");

        var oTableTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.Text({
                    text: "{SType}"
                }),
                new sap.m.Text({
                    text: "{SBin}"
                }),
                new sap.ui.core.Icon({
                    src: sap.ui.core.IconPool.getIconURI("sap-icon://delete"),
                    press: function(oEvent) {

                        var DeleteRecord = oEvent.getSource().getBindingContext();
                        var STypeVal = DeleteRecord.getProperty("SType");
                        var SBinVal = DeleteRecord.getProperty("SBin");
                        SBinVal = SBinVal.replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&apos;');

                        stringModelForBatchMerge = sap.ui.controller("nav.NestlePortal").removeItemFromModelBatchMergeSimu(STypeVal, SBinVal, stringModelForBatchMerge);
                        oBatchMergeModel.setSizeLimit($(stringModelForBatchMerge).find("Row").size());
                        rowCount = $(stringModelForBatchMerge).find("Row").size();
                        oBatchMergeModel.setXML(stringModelForBatchMerge);
                        oSTypeSBinTable.setModel(oBatchMergeModel);
                    }
                }),
            ]
        });

        var spacer = new sap.m.ToolbarSpacer({});
        var oInputSType = new sap.m.Input({
            width: "40%",
            placeholder: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_TYPE")
        });
        var oInputSBin = new sap.m.Input({
            width: "40%",
            placeholder: getPropertyValue(oResourceModel, "NPM_COMMON_STORAGE_BIN")
        });
        var oInputErr = new sap.m.Text({
            visible: false,
            text: getPropertyValue(oResourceModel, "NP_PortalSTypeSBinBlank")
        });
        var oAddBttn = new sap.m.Button({
            id: "swbutton",
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_MB_ADD"),
            icon: "sap-icon://add",
            press: function(oEvent) {
                var STypeVal = oInputSType.getValue();
                var SBinVal = oInputSBin.getValue();
                var combineSTypeSBin = STypeVal + "-" + SBinVal;

                SBinVal = SBinVal.replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&apos;');


                if (STypeVal == "" || SBinVal == "") {
                    sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NP_PortalSTypeSBinBlank"));
                } else if (SbinStypeArray.indexOf(combineSTypeSBin) > -1) {
                    sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPPortal_SameSTypeAndSBin"));
                    oInputSType.setValue("");
                    oInputSBin.setValue("");
                } else {

                    stringModelForBatchMerge = sap.ui.controller("nav.NestlePortal").addItemToModelBatchMergeSimu(STypeVal, SBinVal, stringModelForBatchMerge, rowCount);
                    //stringModelForBatchMerge=encodeURI(stringModelForBatchMerge);
                    SbinStypeArray.push(combineSTypeSBin);
                    rowCount = rowCount + 1;
                    oBatchMergeModel.setSizeLimit($(stringModelForBatchMerge).find("Row").size());
                    oBatchMergeModel.setXML(stringModelForBatchMerge);
                    oSTypeSBinTable.setModel(oBatchMergeModel);

                    oInputSType.setValue("");
                    oInputSBin.setValue("");
                }
            }
        });

        var oBatchEnableModel = new sap.ui.model.xml.XMLModel();
        oBatchEnableModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.2=BATCHMERGESIMULATION&Param.4=1&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var batchenable = oBatchEnableModel.getProperty("/Rowset/Row/ENABLE_BATCHMERGE");

        if (batchenable == 1) {
            checkbox1.setSelected(true);
        } else {
            checkbox1.setSelected(false);
            oInputSType.setEnabled(false);
            oInputSBin.setEnabled(false);
            oAddBttn.setEnabled(false);
            oSTypeSBinTable.setVisible(false);
            //icon_delete.setEnabled(false);
        }

        var oBatchMergeModel = new sap.ui.model.xml.XMLModel();
        oBatchMergeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.2=BATCHMERGESIMULATION&Param.4=0&cache=" + new Date() + "&Content-Type=text/xml"), "", false);

        var stringModelForBatchMerge = oBatchMergeModel.getXML();
        //var stringModelForBatchMerge = oBatchMergeModel.getProperty("/Rowset/0");
        var rowCount = $(stringModelForBatchMerge).find("Row").size();

        oSTypeSBinTable.bindItems("/Rowset/Row", oTableTemplate);
        oSTypeSBinTable.setModel(oBatchMergeModel);

        for (var i = 0; i < rowCount; i++) {
            var StypeFromXML = oBatchMergeModel.getProperty("/Rowset/Row/" + i + "/SType");
            var SBinFromXML = oBatchMergeModel.getProperty("/Rowset/Row/" + i + "/SBin");
            var CombineStypeSbin = StypeFromXML + "-" + SBinFromXML;
            SbinStypeArray.push(CombineStypeSbin);
        }

        var oBatchMergeConfigDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_TILE_BCP_UI_CONFIG"),
            content: [checkbox1, oInputSType, oInputSBin, oInputErr, oAddBttn, oSTypeSBinTable],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {
                        var BatchMergeEnableFlag;
                        //alert(SbinStypeArray);
                        //localStorage.setItem("StypeSbinValues", JSON.stringify(SbinStypeArray));

                        var CheckboxSelected = checkbox1.getSelected();
                        if (CheckboxSelected == true) {
                            BatchMergeEnableFlag = 1;
                        } else {
                            BatchMergeEnableFlag = 0;
                        }

                        var updatedXML = stringModelForBatchMerge.replace(/&/g, '%26');



                        var oBatchMergeModel = new sap.ui.model.xml.XMLModel();
                        oBatchMergeModel.loadData("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.2=BATCHMERGESIMULATION&Param.3=" + updatedXML + "&Param.4=2&Param.5=" + BatchMergeEnableFlag + "&cache=" + new Date() + "&Content-Type=text/xml", "", false);

                        var SuccessFlag = oBatchMergeModel.getProperty("/Rowset/Row/O_Status");

                        if (SuccessFlag == "Success") {
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NP_BatchMergeSaveMsg"));
                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_DOC_NUMBER_RANGE_UPDATE_ERROR"));
                        }

                        SbinStypeArray = [];
                        oBatchMergeConfigDialog.close();
                        oBatchMergeConfigDialog.destroy();
                    }

                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oBatchMergeConfigDialog.destroy();
                        SbinStypeArray = [];
                    }
                })
            ],
        });
        oBatchMergeConfigDialog.setContentWidth("570px");
        oBatchMergeConfigDialog.setContentHeight("530px");
        oBatchMergeConfigDialog.onAfterRendering = function() {
            oInputSType.addStyleClass("slocwhpadding");
            oInputSBin.addStyleClass("slocwhpadding");

        }
        oBatchMergeConfigDialog.open();
    },
    ////////////////////////////////////////////////////////////////////////////////////Rework material type batch format configuration//////////////////////////////////////////
    configHALBMatType: function() {
        var changedFormat;
        var changedFormatRWK;
        var HALBTxt = new sap.m.Label({
            text: getPropertyValue(oResourceModel, "NPM_HALB_MAT")
        });
        var ZRWKTxt = new sap.m.Label({
            text: getPropertyValue(oResourceModel, "NPM_ZRWK_MAT")
        });
        var radiobuttonHALB = new sap.m.RadioButtonGroup({
            select: function(e) {},
            buttons: [
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_PLANT_CODE_FORMAT")
                }),
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_JULIAN_DATE_FORMAT")
                })
            ]

        });
        var radiobuttonZRWK = new sap.m.RadioButtonGroup({
            select: function(e) {},
            buttons: [
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_PLANT_CODE_FORMAT")
                }),
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_JULIAN_DATE_FORMAT")
                })
            ]

        });

        var oFlexBoxHALB = new sap.m.FlexBox({
            direction: "Column",
            alignItems: "Center",
            items: [radiobuttonHALB]
        });
        var oFlexBoxZRWK = new sap.m.FlexBox({
            direction: "Column",
            alignItems: "Center",
            items: [radiobuttonZRWK]
        });
        var oBatchModel = new sap.ui.model.xml.XMLModel();
        oBatchModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=0&Param.2=BATCHFORMAT&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var matformat = oBatchModel.getProperty("/Rowset/Row/BATCH_FORMAT");
        var reworkBatchFormat = oBatchModel.getProperty("/Rowset/Row/ZWRK_BATCH_FORMAT");

        if (matformat == "PLANT_CODE") {
            radiobuttonHALB.setSelectedIndex(0);
        } else {
            radiobuttonHALB.setSelectedIndex(1);
        }

        if (reworkBatchFormat == "PLANT_CODE") {
            radiobuttonZRWK.setSelectedIndex(0);
        } else {
            radiobuttonZRWK.setSelectedIndex(1);
        }
        var oHalbMatType = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_TILE_BCP_UI_CONFIG"),
            content: [HALBTxt, oFlexBoxHALB, ZRWKTxt, oFlexBoxZRWK],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {
                        var radiobtnkey = radiobuttonHALB.getSelectedIndex();
                        var radiobtnkeyZRWK = radiobuttonZRWK.getSelectedIndex();
                        if (radiobtnkey == 0) {
                            changedFormat = "PLANT_CODE";
                        } else {
                            changedFormat = "JULIAN_CODE";
                        }

                        if (radiobtnkeyZRWK == 0) {
                            changedFormatRWK = "PLANT_CODE";
                        } else {
                            changedFormatRWK = "JULIAN_CODE";
                        }

                        var oBatchFormatModel = new sap.ui.model.xml.XMLModel();
                        var oBatchFormatInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><InputXML><txnPath>MaterialHandling/CustomMenu/Transaction/BLS_SharedPropertyConfigurations</txnPath><I_BATCHFORMAT>" + changedFormat + "</I_BATCHFORMAT><I_RWKBATCHFORMAT>" + changedFormatRWK + "</I_RWKBATCHFORMAT></InputXML>";
                        oBatchFormatModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=1&Param.2=BATCHFORMAT&Param.3=" + oBatchFormatInputXML + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
                        var status = oBatchFormatModel.getProperty("/Rowset/Row/O_Status");
                        if (status == "SUCCESS") {
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "NPDASHBOARD_BATCH_FORMAT_SUCCESS_MESSAGE"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                            });
                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CUSTOM_MSG1"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                        oHalbMatType.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oHalbMatType.destroy();
                    }
                })
            ],
        });
        oHalbMatType.setContentWidth("400px");
        oHalbMatType.setContentHeight("300px");
        oHalbMatType.open();
    },

    /////////////////////////////////////////////////////////////////////////////////////EPO////////////////////////////////////////////////////////////////////////////
    openEmergencyProcessOrderUI: function() {
        var node_id = oControllerThis.getView().byId("workcenter").getSelectedKey();
        if (node_id == "" || node_id == null || node_id == undefined) {
            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "NPDAHSBOARD_MB_BLANK_LINE"), getPropertyValue(oResourceModel, "NPDashboard_Error"));
        } else {

            window.open(encodeURI("/XMII/CM/MaterialHandling/EmergencyProcessOrder/Page/EmergencyProcessOrder.irpt?nodeFromURL=" + node_id), "_blank");

        }
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////RF Device Testing//////////////////////////////////////////////////////////////////////////////////////
    configRFDeviceInfoConfirm: function() {

        var RFConfig = "";
        var RFcheckbox = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_RFCHECKBOX")
        });



        var oRFDeviceConfCheckModel = new sap.ui.model.xml.XMLModel();
        oRFDeviceConfCheckModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=0&Param.2=RFDEVICE&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var RFEnableStatus = oRFDeviceConfCheckModel.getProperty("/Rowset/Row/RFDeviceEnable");

        if (RFEnableStatus == 1) {
            RFcheckbox.setSelected(true);
            rfDevice_tile.setVisible(true);
        } else {
            RFcheckbox.setSelected(false);
            rfDevice_tile.setVisible(false);
        }


        var oRFDeviceInfo = new sap.m.Dialog({

            title: getPropertyValue(oResourceModel, "NPDASHBOARD_TILE_BCP_UI_CONFIG"),
            content: [RFcheckbox],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {
                        var checkboxKey = RFcheckbox.getSelected();



                        var oRFDeviceModel = new sap.ui.model.xml.XMLModel();
                        var RFDeviceInfoInputXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><InputXML><txnPath>MaterialHandling/CustomMenu/Transaction/BLS_SharedPropertyConfigurations</txnPath><I_RFCONFIG>" + checkboxKey + "</I_RFCONFIG></InputXML>";
                        oRFDeviceModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=1&Param.2=RFDEVICE&Param.3=" + RFDeviceInfoInputXML + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
                        var oRFStatus = oRFDeviceModel.getProperty("/Rowset/Row/O_Status");
                        if (oRFStatus == "SUCCESS") {
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "PrintMsg_Msg14"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Success")


                            });
                            if (checkboxKey == 1) {

                                rfDevice_tile.setVisible(true);
                            } else {

                                rfDevice_tile.setVisible(false);
                            }

                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CUSTOM_MSG1"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                        oRFDeviceInfo.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oRFDeviceInfo.destroy();
                    }
                })
            ],
        });

        oRFDeviceInfo.setContentWidth("300px");
        oRFDeviceInfo.setContentHeight("100px");
        oRFDeviceInfo.open();
    },
    //////////////////////////////////////////////////////////////Goods Issue Staging//////////////////////////////////////////////////////////////////////////////////////
  configGIStage: function() {

        var checkboxEnable = new sap.m.CheckBox({
           text: getPropertyValue(oResourceModel, "GI_Stage_Enable"),
            useEntireWidth: true,
            width: "300px",
            select: function() {
                var CheckBoxCurrent = checkboxEnable.getSelected();

                if (CheckBoxCurrent == true) {
                    checkboxEnable.setSelected(true);
                    radioSelectStage.setVisible(true);
                 
                    oFlexBoxTOStage.setVisible(true);
                       oFlexBoxPSAStage.setVisible(true);
                       oFlexBoxBackflush.setVisible(true);
                    if (radioResource.getSelected() == true) {
                        oResourceSelect.setVisible(true);
                    } else {
                        oResourceSelect.setVisible(false);
                    }
                } else {
                    checkboxEnable.setSelected(false);
                    oResourceSelect.setVisible(false);
                    radioSelectStage.setVisible(false);
                    
                    oFlexBoxTOStage.setVisible(false);
                       oFlexBoxBackflush.setVisible(false);
                       oFlexBoxPSAStage.setVisible(false);
                }
            }
        });
        

        var oResourceSelect = new sap.m.MultiComboBox({
            id: "stageResource",
            visible: false,
            width: "100%"
        });
        sortinglines(selectedPlant, client, userLanguage, oResourceSelect, Error, 0);

        if (oResourceSelect.getSelectedKeys(0) == "") {
            oResourceSelect.removeItem(0);
        }
        //oResourceSelect.setSelectedKeys(node_id);


        var radioPlant = new sap.m.RadioButton({
            select: function(e) {
                if (radioPlant.getSelected() == true) {
                    oResourceSelect.setVisible(false);
                } else {
                    oResourceSelect.setVisible(true);
                }

            },
            text: getPropertyValue(oResourceModel, "GI_Stage_Plant"),

        });

        var radioResource = new sap.m.RadioButton({
            select: function(e) {
                if (radioResource.getSelected() == true) {
                    oResourceSelect.setVisible(true);
                    oResourceSelect.setPlaceholder(getPropertyValue(oResourceModel, "GI_Stage_SelectResc"));

                } else {
                    oResourceSelect.setVisible(false);
                }

            },
            text: getPropertyValue(oResourceModel, "GI_Stage_Resource")
        });

        var radioSelectStage = new sap.m.RadioButtonGroup({
            select: function(e) {},
            visible: false,
            buttons: [radioPlant, radioResource]
        });
        var TOSwitch = new sap.m.Switch({
            type: "AcceptReject",
            change: function(oEvt) {}
        });
        var TOSwitchLabel = new sap.m.Label({
            text: getPropertyValue(oResourceModel, "TO_DashboardConfigLabel"),
            vAlign: "Bottom",
               id: "TOSwitchLabelID",
        });
        var oFlexBoxTOStage = new sap.m.FlexBox({
            id: "oFlexBoxTOStageID",
            alignItems: "Center",
            items: [TOSwitch, TOSwitchLabel]
        });
               var PSASwitch = new sap.m.Switch({
            type: "AcceptReject",
            change: function(oEvt) {}
        });
        var PSASwitchLabel = new sap.m.Label({
            text: getPropertyValue(oResourceModel, "TODashboard_PSAEditable"),
            vAlign: "Bottom",
               id: "PSASwitchLabelID",
        });
        var oFlexBoxPSAStage = new sap.m.FlexBox({
            id: "oFlexBoxPSAStageID",
            alignItems: "Center",
               alignContent:"SpaceAround",
            items: [PSASwitch, PSASwitchLabel]
        });
        var BackflushSwitch = new sap.m.Switch({
            type: "AcceptReject",
            change: function(oEvt) {}
        });
        var BackflushSwitchLabel = new sap.m.Label({
           text: getPropertyValue(oResourceModel, "GI_Stage_Enable_Backflush"),
            vAlign: "Bottom",
               id: "BackflushSwitchLabelID"
        });
        var oFlexBoxBackflush = new sap.m.FlexBox({
            id: "oFlexBoxBackflushID",
            alignItems: "Center",
            items: [BackflushSwitch, BackflushSwitchLabel]
        });
        var oFlexBoxItemStage = new sap.m.FlexBox({
            id: "oFlexBoxItemStageID",
            direction: "Column",
            items: [radioSelectStage]
        });


        var oGIStageNodeModel = new sap.ui.model.xml.XMLModel();

        oGIStageNodeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStagingConfiguration&Param.1=1&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var GIStageEnable = oGIStageNodeModel.getProperty('/Rowset/Row/Output');
        var GIStageDashboardEnable = oGIStageNodeModel.getProperty('/Rowset/Row/OutputDashboard');
               var PSAEditable = oGIStageNodeModel.getProperty('/Rowset/Row/OutputSupplyArea');
	 var BackflushEnable= oGIStageNodeModel.getProperty('/Rowset/Row/OutputBackflush');
        if (GIStageEnable == 0) {
            checkboxEnable.setSelected(false);
            oResourceSelect.setVisible(false);
            radioSelectStage.setVisible(false);
        
            oFlexBoxTOStage.setVisible(false);
               oFlexBoxPSAStage.setVisible(false);
               oFlexBoxBackflush.setVisible(false);
        } else if (GIStageEnable == "Plant") {
            checkboxEnable.setSelected(true);
            radioSelectStage.setVisible(true);
            radioPlant.setSelected(true);
        } else {
            checkboxEnable.setSelected(true);
            radioSelectStage.setVisible(true);
            radioResource.setSelected(true);
            oResourceSelect.setVisible(true);
            var nodesConfigured = GIStageEnable.split(',');
            oResourceSelect.setSelectedKeys(nodesConfigured);
        }
        if (GIStageDashboardEnable == 0) {   
            TOSwitch.setState(false);
        } else {           
            TOSwitch.setState(true);      
        }
               if (PSAEditable == 0) {   
            PSASwitch.setState(false);
        } else {           
           PSASwitch.setState(true);      
        }
	if (BackflushEnable == 0) {   
            BackflushSwitch.setState(false);
        } else {           
           BackflushSwitch.setState(true);      
        }
	

        var oGIStageCongigDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "GI_Stage_ConfigBtn"),
            draggable: true,

            content: [checkboxEnable, oFlexBoxTOStage,oFlexBoxPSAStage, oFlexBoxBackflush,oFlexBoxItemStage, oResourceSelect],
            buttons: [
                new sap.m.Button({
                    enabled: true,
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {

                        if (checkboxEnable.getSelected() == 1) {

                            if (radioPlant.getSelected() == 1) {
                                plantStageSelected = "Plant";
                                resourceStageSelected = 0;
                            } else {
                                plantStageSelected = 0;
                                commaSeparatedLine = "";
                                var nodeStageID = oResourceSelect.getSelectedKeys();


                                nodeStageID.forEach(function(input) {
                                    commaSeparatedLine = (commaSeparatedLine == "" || commaSeparatedLine == undefined) ? input : commaSeparatedLine + "," + input;
                                });
                                resourceStageSelected = commaSeparatedLine;
                            }
                            if (TOSwitch.getState() == 1) {
                                TOStageSelected = 1;
                            } else {
                                TOStageSelected = 0;
                            }
                              if (PSASwitch.getState() == 1) {
                                PSAStageSelected = 1;
                            } else {
                               PSAStageSelected = 0;
                            }
                              if (BackflushSwitch.getState() == 1) {
                               BackflushSwitchSelected = 1;
                            } else {
                               BackflushSwitchSelected = 0;
                            }

                        } else {
                            plantStageSelected = 0;
                            resourceStageSelected = 0;
                            TOStageSelected = 0;
                                  PSAStageSelected = 0;
                            BackflushSwitchSelected = 0;
                        }




                        var oGIStageNodeModel = new sap.ui.model.xml.XMLModel();

                        oGIStageNodeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIStagingConfiguration&Param.1=0&Param.2=" + plantStageSelected + "&Param.3=" + resourceStageSelected + "&Param.4=" + TOStageSelected + "&Param.5=" + PSAStageSelected + "&Param.6=" +BackflushSwitchSelected+ "&d=" + new Date() + "&Content-Type=text/xml"), "", false);
                        var GIStageEnable = oGIStageNodeModel.getProperty('/Rowset/Row/Output');

                        if (GIStageEnable == "SUCCESS") {
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "PrintMsg_Msg14"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                            });
                        } else {
                            sap.m.MessageBox.warning(GIStageEnable, {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                            });
                        }
                        oGIStageCongigDialog.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oGIStageCongigDialog.destroy();
                    }
                })
            ],
        });
        oGIStageCongigDialog.onAfterRendering = function() {
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
        oGIStageCongigDialog.setContentWidth("600px");
        oGIStageCongigDialog.setContentHeight("500px");
        oGIStageCongigDialog.open();

    },

    //////////////////////////////////////////////////////////////Goods Issue Pallet//////////////////////////////////////////////////////////////////////////////////////
    configGIPallet: function() {

        var checkboxEnable = new sap.m.CheckBox({
            text: getPropertyValue(oResourceModel, "GI_PALLET_CONF"),
            useEntireWidth: true,
            select: function() {
                var CheckBoxCurrent = checkboxEnable.getSelected();

                if (CheckBoxCurrent == true) {
                    checkboxEnable.setSelected(true);
                    radioSelectPallet.setVisible(true);
                    if (radioResource.getSelected() == true) {
                        oResourceSelect.setVisible(true);
                    } else {
                        oResourceSelect.setVisible(false);
                    }
                } else {
                    checkboxEnable.setSelected(false);
                    oResourceSelect.setVisible(false);
                    radioSelectPallet.setVisible(false);

                }
            }
        });
        

        var oResourceSelect = new sap.m.MultiComboBox({
            visible: false,
            width: "100%"
        });
        sortinglines(selectedPlant, client, userLanguage, oResourceSelect, Error, 0);

        if (oResourceSelect.getSelectedKeys(0) == "") {
            oResourceSelect.removeItem(0);
        }
        //oResourceSelect.setSelectedKeys(node_id);


        var radioPlant = new sap.m.RadioButton({
            select: function(e) {
                if (radioPlant.getSelected() == true) {
                    oResourceSelect.setVisible(false);
                } else {
                    oResourceSelect.setVisible(true);
                }

            },
            text: getPropertyValue(oResourceModel, "GI_Stage_Plant"),

        });

        var radioResource = new sap.m.RadioButton({
            select: function(e) {
                if (radioResource.getSelected() == true) {
                    oResourceSelect.setVisible(true);
                    oResourceSelect.setPlaceholder(getPropertyValue(oResourceModel, "GI_Stage_SelectResc"));

                } else {
                    oResourceSelect.setVisible(false);
                }

            },
            text: getPropertyValue(oResourceModel, "GI_Stage_Resource")
        });

        var radioSelectPallet = new sap.m.RadioButtonGroup({
            select: function(e) {},
            visible: false,
            buttons: [radioPlant, radioResource]
        });
        var oFlexBoxItemPallet = new sap.m.FlexBox({
            direction: "Column",
            items: [radioSelectPallet]
        });


        var oGIPalletNodeModel = new sap.ui.model.xml.XMLModel();

        oGIPalletNodeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIPalletConfiguration&Param.1=1&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var GIPalletEnable = oGIPalletNodeModel.getProperty('/Rowset/Row/Output');console.log(GIPalletEnable);
        if (GIPalletEnable == 0) {
            checkboxEnable.setSelected(false);
            oResourceSelect.setVisible(false);
            radioSelectPallet.setVisible(false);
        } else if (GIPalletEnable == "Plant") {
            checkboxEnable.setSelected(true);
            radioSelectPallet.setVisible(true);
            radioPlant.setSelected(true);
        } else {
            checkboxEnable.setSelected(true);
            radioSelectPallet.setVisible(true);
            radioResource.setSelected(true);
            oResourceSelect.setVisible(true);
            var nodesConfigured = GIPalletEnable.split(',');
            oResourceSelect.setSelectedKeys(nodesConfigured);
        }

        var  oGIPalletConfigDialog = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "GI_PALLET_CONF"),
            draggable: true,

            content: [checkboxEnable, oFlexBoxItemPallet, oResourceSelect],
            buttons: [
                new sap.m.Button({
                    enabled: true,
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {

                        if (checkboxEnable.getSelected() == 1) {

                            if (radioPlant.getSelected() == 1) {
                                plantStageSelected = "Plant";
                                resourceStageSelected = 0;
                            } else {
                                plantStageSelected = 0;
                                commaSeparatedLine = "";
                                var nodeStageID = oResourceSelect.getSelectedKeys();


                                nodeStageID.forEach(function(input) {
                                    commaSeparatedLine = (commaSeparatedLine == "" || commaSeparatedLine == undefined) ? input : commaSeparatedLine + "," + input;
                                });
                                resourceStageSelected = commaSeparatedLine;
                            }

                        } else {
                            plantStageSelected = 0;
                            resourceStageSelected = 0;
                        }




                        var oGIPalletNodeModel = new sap.ui.model.xml.XMLModel();

                        oGIPalletNodeModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomGI/QueryTemplate/XACQ_GetGIPalletConfiguration&Param.1=0&Param.2=" + plantStageSelected + "&Param.3=" + resourceStageSelected + "&d=" + new Date() + "&Content-Type=text/xml"), "", false);
                        var GIStageEnable = oGIPalletNodeModel.getProperty('/Rowset/Row/Output');

                        if (GIStageEnable == "SUCCESS") {
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "PrintMsg_Msg14"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                            });
                        } else {
                            sap.m.MessageBox.warning(GIStageEnable, {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Warning")
                            });
                        }
                        oGIPalletConfigDialog.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                         oGIPalletConfigDialog.destroy();
                    }
                })
            ],
        });
        oGIPalletConfigDialog.onAfterRendering = function() {
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
        oGIPalletConfigDialog.setContentWidth("30%");
        oGIPalletConfigDialog.setContentHeight("30%");
        oGIPalletConfigDialog.open();

    },

	configEWMGRSUIndicator: function() {
		window.open("/XMII/CM/MaterialHandling/CustomGR/Page/EWMSUIndicator.irpt?plantFromURL=" + plantId + "&clientFromURL=" + client, "_blank");
	},
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Goods  Receipt pallet Info field//////////////////////////////////////////////////////////////////////////////////////
    configGRPalletInfoConfirm: function() {

        var headerCheckbox = new sap.m.CheckBox({
            select: function(e) {
                if (headerCheckbox.getSelected() == true) {
                    radioHeader.setVisible(true);
                } else {
                    radioHeader.setVisible(false);
                }
            },
            text: getPropertyValue(oResourceModel, "NPM_Pallet_Header")
        });

        var radioHeader = new sap.m.RadioButtonGroup({
            select: function(e) {},
            visible: false,
            buttons: [
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_Pallet_User")
                }),
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_Pallet_Mand")
                })
            ]
        });

        var itemCheckbox = new sap.m.CheckBox({
            select: function(e) {
                if (itemCheckbox.getSelected() == true) {
                    radioItem.setVisible(true);
                } else {
                    radioItem.setVisible(false);
                }
            },
            text: getPropertyValue(oResourceModel, "NPM_Pallet_Item")
        });

        var radioItem = new sap.m.RadioButtonGroup({
            select: function(e) {},
            visible: false,
            buttons: [
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_Pallet_User")
                }),
                new sap.m.RadioButton({
                    text: getPropertyValue(oResourceModel, "NPM_Pallet_Mand")
                })

            ]
        });

        var oFlexBoxHead = new sap.m.FlexBox({
            direction: "Column",
            alignItems: "Center",
            items: [radioHeader]
        });
        var oFlexBoxItem = new sap.m.FlexBox({
            direction: "Column",
            alignItems: "Center",
            items: [radioItem]
        });
        var oGRPalletInfoModel = new sap.ui.model.xml.XMLModel();

        oGRPalletInfoModel.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=0&Param.2=GR_PALLETINFOFIELD&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
        var SGTXTStatus = oGRPalletInfoModel.getProperty("/Rowset/Row/SGTXT");
        var BKTXTStatus = oGRPalletInfoModel.getProperty("/Rowset/Row/BKTXT");
        //var BKTXT_USNAMEStatus = oGRPalletInfoModel.getProperty("/Rowset/Row/BKTXT_USNAME");


        if (BKTXTStatus == "USNAME") {
            headerCheckbox.setSelected(true);
            radioHeader.setVisible(true);
            radioHeader.setSelectedIndex(0);
        } else if (BKTXTStatus == "MANDAT") {
            headerCheckbox.setSelected(true);
            radioHeader.setVisible(true);
            radioHeader.setSelectedIndex(1);
        } else {
            headerCheckbox.setSelected(false);
            radioHeader.setVisible(false);
        }

        if (SGTXTStatus == "USNAME") {
            itemCheckbox.setSelected(true);
            radioItem.setVisible(true);
            radioItem.setSelectedIndex(0);
        } else if (SGTXTStatus == "MANDAT") {
            itemCheckbox.setSelected(true);
            radioItem.setVisible(true);
            radioItem.setSelectedIndex(1);
        } else {
            itemCheckbox.setSelected(false);
            radioItem.setVisible(false);
        }

        var oGRPalletInfo = new sap.m.Dialog({
            title: getPropertyValue(oResourceModel, "NPDASHBOARD_BCPUI_GR_PALLETINFOFIELD"),
            draggable: true,

            content: [headerCheckbox, oFlexBoxHead, itemCheckbox, oFlexBoxItem],
            buttons: [
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPM_COMMON_SAVE"),
                    press: function() {



                        if (headerCheckbox.getSelected() == true) {
                            BKTXTmapping = radioHeader.getSelectedIndex();
                        } else {
                            BKTXTmapping = "null";
                        }
                        if (itemCheckbox.getSelected() == true) {
                            SGTXTmapping = radioItem.getSelectedIndex();
                        } else {
                            SGTXTmapping = "null";
                        }


                        var oGRPalletInfoModel1 = new sap.ui.model.xml.XMLModel();
                        var GRPalletInfoInputXML1 = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><InputXML><txnPath>MaterialHandling/CustomMenu/Transaction/BLS_SharedPropertyConfigurations</txnPath><I_SGTXT>" + SGTXTmapping + "</I_SGTXT><I_BKTXT>" + BKTXTmapping + "</I_BKTXT></InputXML>";
                        oGRPalletInfoModel1.loadData(encodeURI("/XMII/Illuminator?QueryTemplate=MaterialHandling/CustomMenu/QueryTemplates/XACQ_SharedPropertyConfigurations&Param.1=1&Param.2=GR_PALLETINFOFIELD&Param.3=" + GRPalletInfoInputXML1 + "&cache=" + new Date() + "&Content-Type=text/xml"), "", false);
                        var oStatus = oGRPalletInfoModel1.getProperty("/Rowset/Row/O_Status");
                        if (oStatus == "SUCCESS") {
                            sap.m.MessageBox.success(getPropertyValue(oResourceModel, "PrintMsg_Msg14"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Success")
                            });
                        } else {
                            sap.m.MessageBox.error(getPropertyValue(oResourceModel, "CUSTOM_MSG1"), {
                                title: getPropertyValue(oResourceModel, "NPDashboard_Error")
                            });
                        }
                        oGRPalletInfo.destroy();
                    }
                }),
                new sap.m.Button({
                    text: getPropertyValue(oResourceModel, "NPDashboard_Close"),
                    press: function() {
                        oGRPalletInfo.destroy();
                    }
                })
            ],
        });
        oGRPalletInfo.setContentWidth("500px");
        oGRPalletInfo.setContentHeight("350px");
        oGRPalletInfo.open();
    }
});