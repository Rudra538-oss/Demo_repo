    //BOOTSTRAP FILE  
    var moduleArray = ['MIIUI5Visualization','MIIi5Util','MIIi5Constants','MIIi5Global','MIIi5Exception','DataModel','ModelMetaData','ModelData','ChartComponentModel',  
                       'QueryTemplate','Query','TAGQuery','XMLQuery','SQLQuery','KPIQuery','AlarmQuery','AggregateQuery','CatalogQuery','MDOQuery','OLAPQuery','PCoQuery','XacuteQuery',  
                       'ChartTemplate','ChartPropertyConfig','AppToolBar','ExtendedMenuItem','ExtendedLabel','ToolBar','TitleBar','MessageArea','TimeBar'];  
    //Creates the RootNameSpace  
    function createRootNameSpace(){  
        com = {  
      sap : {  
      xmii : {  
      }  
      }  
        }    
    };  
    //Get the Script Param  
    function getScriptParam(attr){  
      var attrVal = '';  
      var attrName = 'data-'+attr;  
        var scripts = document.getElementsByTagName('script');  
          
        for(i in scripts){  
        currentScript = scripts[i];  
        if((currentScript.attributes)&&(typeof currentScript.attributes[attrName]!= "undefined"))  
        attrVal = currentScript.getAttribute(attrName);  
        }  
        return attrVal;   
    };  
    //Function loads Ui5Core along with other libs.This has to loaded synchronously.How to load synchronously?  
    function loadUI5Core(){  
        var ui5Url = '<scr' + 'ipt id="sap-ui-bootstrap" type="text/javascript" src=';  
        ui5Url = ui5Url+'"/sapui5/resources/sap-ui-core.js" data-sap-ui-libs="sap.viz,sap.m,sap.ui.commons,sap.ui.table" data-sap-ui-theme="sap_bluecrystal">';  
        ui5Url = ui5Url+'</scr' + 'ipt>';  
       document.write(ui5Url);  
    };  
    //Load Module   
    function loadModuleFromFlat(moduleName){  
        var moduleDetails = '<scr' + 'ipt type="text/javascript" src="/XMII/JavaScript/';  
        moduleDetails = moduleDetails+moduleName+'.js'+'"></scr' + 'ipt>';  
        document.write(moduleDetails);  
    };  
    //Load Specific Lib  
    function loadSpecificLib(libToBeLoaded){  
        if(libToBeLoaded != "" && libToBeLoaded != undefined) {  
      var libsArray = libToBeLoaded.split(',');  
      for(var i=0; i<libsArray.length; i++) {  
      if(libsArray[i]==='i5Chart')  
          loadModuleFromFlat(libsArray[i]);  
      else if(libsArray[i]==='i5Grid')  
         loadModuleFromFlat(libsArray[i]);  
      }  
    }  
    }  
    //Main Code  
    loadUI5Core();  
    var libToBeLoaded = getScriptParam("libs");  
    for(var j=0;j<moduleArray.length;j++){  
        var moduleName = moduleArray[j];  
        loadModuleFromFlat(moduleName);  
    }  
    loadSpecificLib(libToBeLoaded);  