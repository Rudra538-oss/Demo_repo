jQuery.sap.declare("sap.oee.ui.Formatter");
sap.oee.ui.Formatter = function(){
return {
		formatTextInBrackets : function(obj1,obj2,obj3){
			if(obj1 != undefined && obj2 != undefined && obj3 != undefined){
				return obj1 + " ("+obj2 + " - " + obj3 + ")";
			}
			return "";
		},
		
		// this method has been used in Review Order Screen
		formatTextInBracket : function(obj1,obj2,obj3){
			if(obj1!= undefined && obj2 != undefined && obj3 != undefined){
				obj4 = Date.parse(obj2+" "+obj3);
				date = sap.oee.ui.Utils.oeeDateFormatter.format(new Date(parseFloat(obj4)));
				time = sap.oee.ui.Utils.oeeTimeFormatter.format(new Date(parseFloat(obj4)));
				return obj1 + " ("+date + " - " + time + ")";
			}
			return "";
		},
		
		formatTextInBracketsForShift : function(obj1,obj2,obj3,obj4,obj5){
			if(obj1 != undefined && obj2 != undefined && obj3 != undefined && obj4 != undefined){
				obj6 = Date.parse(obj2+" "+obj3);
				date = sap.oee.ui.Utils.oeeDateFormatter.format(new Date(parseFloat(obj6)));
				time = sap.oee.ui.Utils.oeeTimeFormatter.format(new Date(parseFloat(obj6)));
				obj7 = Date.parse(obj4+" "+obj5);
				time2 = sap.oee.ui.Utils.oeeTimeFormatter.format(new Date(parseFloat(obj7)));
				return obj1 +" - "+ date  +" ("+time + " - " + time2 + ")"; 
			}
			return "";
		},
		
		formatDateAndShiftDescription : function(obj1,obj2,obj3){
			if(obj1 != undefined && obj1 != "" && obj2 != undefined && obj2 != "" && obj3 != undefined && obj3 != ""){
				obj4 = Date.parse(obj1+" "+obj2);
				date = sap.oee.ui.Utils.oeeDateFormatter.format(new Date(parseFloat(obj4)));
				return date+" - "+obj3;
			}
			return "";
		},
		
		formatQuantityWithOEEDecimalPrecision : function(quantity,precision){
			if(quantity != undefined && precision != undefined){
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				var newQuantity = new Number(quantity).toFixed(precision || 2);
				if(oNumberFormatter != undefined){
					return oNumberFormatter.format(newQuantity);
				}
				
			}
		},
		
		formatDuration : function(seconds){
			var date;
			if(seconds != undefined && !isNaN(seconds)){
				date = new Date(null);
				date.setSeconds(seconds);
				 return date.toISOString().substr(11, 8);
			}
			else
				return "";
		},
		
		formatIDAndDescriptionText : function(obj1,obj2){
			if(obj1 != undefined && obj2 != undefined){
				return obj1 + " ("+obj2 +")";
			}
			return "";
		},
		
		showIfRunExists : function(obj){
			return !(obj == "" || obj == undefined);
		},
		
		showIfRunDoesntExist : function(obj){
			return (obj == "" || obj == undefined);
		},
		
		formatOrderNumber : function(obj1,obj2){
			if(obj1 != undefined && obj2 != undefined){
				return obj1.replace(/^[0]+/g,"") + " - "+obj2;
			}
			return "";
		},
		
		formatOrderAndOperationForOrderCard : function(obj1,obj2,obj3,obj4){
			var obj5 = sap.oee.ui.Formatter.formatOrderNumber(obj1, obj2);
			if(obj4 != undefined && obj4 != ""){
				obj6 = obj3 + " / " + obj4 ;
				return obj5 + "\n" + obj6;
			}
			return obj5 + "\n" + obj3 ;
			
		},
		
		formatMaterialID : function(obj1){
			if(obj1 != undefined){
				return obj1.replace(/^[0]+/g,"");
			}
			return "";
		},
		
		formatQuantity : function(obj1,obj2,obj3,precision){
			var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
			var newNum = new Number(obj2).toFixed(precision || 2);
			if(oNumberFormatter != undefined){
				var text = obj1 +" : "+ oNumberFormatter.format(newNum) + " "+obj3;
				return text;
			} 
			/*var text = obj1 +" : "+new Number(obj2).toFixed(precision) + " "+obj3;
			return text;*/
		},
		
		formatTimeStampWithLabel  : function(obj1,obj2,offset,plantTimezoneKey){
			var zoneObject, offsetInMinutes;
			if(obj2 != "" && obj2 != undefined){
				if(plantTimezoneKey != undefined && plantTimezoneKey != null){
					var zoneObject = moment.tz.zone(plantTimezoneKey);
					if(zoneObject && zoneObject != null){
						offsetInMinutes = zoneObject.parse(parseFloat(obj2));
						offset =  -1 * (parseFloat(offsetInMinutes * 60 * 1000));
					}
				}
				var time = sap.oee.ui.Utils.getPlantTimezoneTime(parseFloat(obj2),offset);
				return obj1+" : " + sap.oee.ui.Utils.oeeDateTimeFormatter.format(new Date(parseFloat(time)));
			}
			return "";
		},
		
		formatTimeIntervalWithLocale  : function(obj,obj2,offset){
			if( obj != undefined && obj2 != undefined){
				var time = sap.oee.ui.Utils.getPlantTimezoneTime(parseFloat(obj),offset);
				var time2 = sap.oee.ui.Utils.getPlantTimezoneTime(parseFloat(obj2),offset);
				return sap.oee.ui.Utils.oeeTimeFormatter.format(new Date(parseFloat(time))) + " - "+ sap.oee.ui.Utils.oeeTimeFormatter.format(new Date(parseFloat(time2)));
			}
			return "";
		},
		
		formatTimeWithLocale  : function(obj,offset){
			if(obj != undefined){
				var time = sap.oee.ui.Utils.getPlantTimezoneTime(parseFloat(obj),offset);
				return sap.oee.ui.Utils.oeeTimeFormatter.format(new Date(parseFloat(time)));
			}
			return "";
		},
		
		formatTimeStampWithoutLabel  : function(obj1,offset, plantTimezoneKey){
			var zoneObject, offsetInMinutes;
			if(obj1 != "" && obj1 != undefined){
				if(plantTimezoneKey != undefined && plantTimezoneKey != null){
					var zoneObject = moment.tz.zone(plantTimezoneKey);
					if(zoneObject && zoneObject != null){
						offsetInMinutes = zoneObject.parse(parseFloat(obj1));
						offset =  -1 * (parseFloat(offsetInMinutes * 60 * 1000));
					}
				}
				obj1 = new Date(obj1).getTime();
				var time = sap.oee.ui.Utils.getPlantTimezoneTime(parseFloat(obj1),offset);
				return sap.oee.ui.Utils.oeeDateTimeFormatter.format(new Date(parseFloat(time)));
			}
			return "";
		},
		
		formatDateTimeWithLabel  : function(obj1,obj2,obj3){
			var oDateForOrderStartTime = new Date((new Date).toDateString() + ' ' + obj3);
			var iHour = oDateForOrderStartTime.getHours();
			var iMinutes = oDateForOrderStartTime.getMinutes();
			if(iHour<10){
				iHour='0'+iHour;
			} 
			if(iMinutes< 10)
			{
				iMinutes='0'+iMinutes;
			} 
			
			return obj1+": " + obj2 + " "+ iHour + ":" +iMinutes;
			
		},
		
		formatTimeStamp : function(obj){
			if(obj != undefined && obj != 0)
		{
				var oTimezoneoffset = new Date(0).getTimezoneOffset() * 60 * 1000;
					var dDate = new Date(parseFloat(obj) - oTimezoneoffset);
					var latestTimeStamp = dDate.toDateString() + " " + dDate.toLocaleTimeString();
					return (latestTimeStamp);
			}
			return "";
		},
		
		
		formatTimeInMinutes  : function(obj1){
			return sap.oee.ui.Formatter.formatDuration(obj1 * 60);
		},
		
		formatQuantityForSelectOrderScreen : function(obj1,obj2,precision){
			if(obj1 != undefined && obj2 != undefined){
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				var newNum1 = new Number(obj1).toFixed(precision || 2);
				if(oNumberFormatter != undefined){	
					var text =  oNumberFormatter.format(newNum1) +" "+ obj2 ;
					return text;
				}
			}
			return "";
		},
		
		formatOperationForSelectOrderScreen : function(obj1,obj2,obj3,obj4){
			var text = obj1 +" / "+obj2 ;
			if(obj3 != "" && obj3 != undefined){
				text += "\n" + obj3 + " / "+obj4;
			}
			return text;
		},
		
		formatOperationForGiScreen : function(obj1,obj2,obj3,obj4,obj5){
			var text;
			if(obj1 != undefined){
			text = obj1.replace(/^[0]+/g,"");
			if(obj2 != "" && obj2 != undefined){
			 text += "\n" + obj2 +" / "+obj3 ;
			}
			if(obj4 != "" && obj4 != undefined){
				text += "\n" + obj4 + " / "+obj5;
			}
			return text;
			}
			return "";
		},
		
		formatTextQuantityAndDuration : function(obj1,obj2,obj3,obj4,obj5,precision){
			var precision = precision || 2;
			var text;
			if(obj2){
				var obj2 = parseFloat(obj2);
				var newNum1 = obj2.toFixed(precision || 2) ;
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(oNumberFormatter != undefined){
					obj2 = oNumberFormatter.format(newNum1);
				}
			}
			if(obj3){
				var obj3 = parseFloat(obj3);
				var newNum2 = obj3.toFixed(precision || 2) ;
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(oNumberFormatter != undefined){
					obj3 = oNumberFormatter.format(newNum2);
				}
			}
			text = obj1 +" : " + obj2 + " " + obj4 + "/" + obj3 + " " + obj5 ;
			return text;
		},
		
		formatDateTimeForSelectOrderScreen  : function(obj1,obj2){
			if(obj1 != undefined && obj1 != "" && obj2 != undefined && obj2 != ""){
			var oDateForOrderStartTime = new Date((new Date).toDateString() + ' ' + obj2);
			var iHour = oDateForOrderStartTime.getHours();
			var iMinutes = oDateForOrderStartTime.getMinutes();
			if(iHour<10){
				iHour='0'+iHour;
			} 
			if(iMinutes< 10)
			{
				iMinutes='0'+iMinutes;
			} 
			
			return obj1 + " "+ iHour + ":" +iMinutes;
			}
			return "";
			
		},
		
		formatDateTimeInLocaleForSelectOrderScreen : function(obj1,obj2){
			if(obj1!= undefined && obj1!= "" &&  obj2 != undefined && obj2 != ""){
				obj3 = Date.parse(obj1+" "+obj2);
				date = sap.oee.ui.Utils.oeeDateFormatter.format(new Date(parseFloat(obj3)));
				time = sap.oee.ui.Utils.oeeTimeFormatter.format(new Date(parseFloat(obj3)));
				return date + " " + time;
			}
			return "";
		},
		
		formatStartEndDateTimeForSelectOrderScreen : function(obj1, obj2, obj3, obj4){
			var startDateTime, endDateTime;
			if(obj1 != undefined && obj1 != "" && obj2 != undefined && obj2 != ""){
				startDateTime = sap.oee.ui.Formatter.formatDateTimeInLocaleForSelectOrderScreen(obj1, obj2);

				if(obj3 != undefined && obj3 != "" && obj4 != undefined && obj4 != ""){
					endDateTime = sap.oee.ui.Formatter.formatDateTimeInLocaleForSelectOrderScreen(obj3, obj4);
				}

				if(endDateTime){
					return startDateTime + "\n" + endDateTime;
				}else{
					return startDateTime;
				}
			}
			return "";
		},
		
		formatDateTimeToString : function(obj1){
			if(obj1 != undefined && obj1 != ""){
				var iHour = obj1.getHours();
				var iMinutes = obj1.getMinutes();
				var iSeconds = obj1.getSeconds();
				if(iHour<10){
					iHour='0'+iHour;
				}
				if(iMinutes< 10)
				{
					iMinutes='0'+iMinutes;
				} 
				if(iSeconds< 10)
				{
					iSeconds='0'+iSeconds;
				} 
				return iHour + ":" +iMinutes+":"+iSeconds;
			}
		},
		
		formatRemainingQuantityWithoutUom : function(obj1,obj2,precision){
			var quantity = (obj2 >= 0)?obj2 : 0;
			var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
			var newNum1 = new Number(quantity).toFixed(precision || 2);
			if(oNumberFormatter != undefined){
				var text = obj1 +" : "+ oNumberFormatter.format(newNum1);
				return text;
			}
			
		},
		
		minsFormatter : function(obj1,obj2){
			if(new Number(obj2) > 0){
				var text = new Number(obj2/60).toFixed(2) +" "+ obj1;
				return text;
			}
			else 
				return "";
		},
		
		hideIfEmpty : function(obj){
			if(obj != undefined && obj != "")
				return true;
			return false;
		},
		
		appendArgumentsWithSpace : function(){
			var sText = "";
			for(i in arguments){
				sText += arguments[i] + " ";
			}
			
			return sText;
		},
		
		formatMaterialForSelectOrderScreen : function(obj1,obj2){
			var obj = sap.oee.ui.Formatter.formatOrderNo(obj1);
			return (obj + "\n" + obj2);
		},
		
		hideIfLessThanOrEqualToZero : function(obj1){
			if(obj1 != undefined){
				return (new Number(obj1) > 0.0);
			}
			else return false;
		},
		
		visibleIfOnlyComplete : function(obj1){
			if(obj1 != sap.oee.ui.oeeConstants.status.COMPLETED)
			{
				return false;
			}
			else
			{
				return true;
			}
		},
		
		showSplitButtonText : function(obj1, obj2, obj3){
			var oBindingContext = this.getBindingContext();
			if(oBindingContext != undefined && oBindingContext.sPath != undefined)
			{
				var index = oBindingContext.sPath.split("/")[2];
				return (index == 0)?obj2:obj3;
			}
			return obj3;
		},
		
		showReasonCodeButtonText : function(obj1,obj2){
			if(obj1 === undefined){
				return obj2;
			}
			return obj1;
		},
		
		showSplitElementLabel : function(obj){
			var oBindingContext = this.getBindingContext();
			if(oBindingContext != undefined && oBindingContext.sPath != undefined)
			{
				var index = oBindingContext.sPath.split("/")[2];
				return (index == 0)?"Time To Split":"Split Time";
			}
			return "Split Time";
		},
		
		showSplitButtonIcon : function(obj){
			var oBindingContext = this.getBindingContext();
			if(oBindingContext != undefined && oBindingContext.sPath != undefined)
			{
				var index = oBindingContext.sPath.split("/")[2];
				return (index == 0)?"sap-icon://dimension":"sap-icon://sys-cancel";
			}
			return "sap-icon://sys-cancel";
		},
		
		formatEndedAtVisibility : function(obj){
			if(obj == sap.oee.ui.oeeConstants.status.COMPLETED)
				return true;
			return false;
		},
		
		formatStatusTextAndActivity : function(obj1,obj2){
			if(obj1 != undefined){
				if(obj2 != undefined && obj2 != ""){
					return obj1 + " ("+obj2 +")";
				}
				else
					return obj1;
			}
			return "";
		},
		
		invertBoolean : function(obj){
			if(obj == true)
				return false;
			else return true;
		},
		
		reasonCodeButttonFormatter : function(rcBtnText,existingRcDesc){ 
			if(existingRcDesc == "" || existingRcDesc == undefined){
				return rcBtnText;
			}
			
			return existingRcDesc;
		},
		
		visibleIfIsLossTypeFormatter : function(obj){
			if(obj == sap.oee.ui.oeeConstants.dcElementTypeConstantForRejectedQuantity)
			{
				return true;
			}
			
			return false;
		},
		
		formatQuantityAndUOMText : function(obj1, obj2,precision){
			if(obj1 != undefined){
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(obj2 != undefined && obj2 != ""){
					var newNum1 = new Number(obj1).toFixed(precision || 2) ;
					if(oNumberFormatter != undefined){
						return oNumberFormatter.format(newNum1) + " " + obj2;
					}
				}
				else{
					var newNum2 = new Number(obj1).toFixed(precision || 2) ;
					if(oNumberFormatter != undefined){
						return oNumberFormatter.format(newNum2);
					}
				}
			}
			return "";
		},
		
		formatQuantityAndUOMTextForOrderDispatch : function(obj1, obj2,precision){
			if(obj1 != undefined && obj1 != ""){
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(obj2 != undefined && obj2 != ""){
					var newNum1 = new Number(obj1).toFixed(precision || 2) ;
					if(oNumberFormatter != undefined){
						return oNumberFormatter.format(newNum1) + " " + obj2;
					}
				}
				else{
					var newNum2 = new Number(obj1).toFixed(precision || 2) ;
					if(oNumberFormatter != undefined){
						return oNumberFormatter.format(newNum2);
					}
				}
			}
			return "";
		},
		
		
		formatValue : function(val,precision){
			var newNum = new Number(val).toFixed(precision);
			var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
			if(oNumberFormatter != undefined){
				return oNumberFormatter.format(newNum);
			}
			
		},
		
		formatTimestampsForHourlyScreens : function(obj1, obj2){
			var formatToTwoDigits = function(obj){
				if(obj){
					if(obj.length<2){
						obj = "0" + obj;
					}
					return obj;
				}
				return "00";
			}
			if(obj1 != undefined){
				var obj1Date = new Date(parseFloat(obj1));
				if(obj2 != undefined && obj2 != ""){
					var obj2Date = new Date(parseFloat(obj2));
					return formatToTwoDigits(obj1Date.getHours().toString()) + ":" + formatToTwoDigits(obj1Date.getMinutes().toString()) + " - " + 
					formatToTwoDigits(obj2Date.getHours().toString()) + ":" + formatToTwoDigits(obj2Date.getMinutes().toString()) ;
				}
				else
					return formatToTwoDigits(obj1Date.getHours().toString()) + ":" + formatToTwoDigits(obj1Date.getMinutes().toString()) + " - ";
			}
			return "";
		},
		
		formatIconForIconTabFilterForTimeElementCategory : function(obj){
			if(obj){
				if(obj == sap.oee.ui.oeeConstants.timeElementCategoryForLoss){
					return "sap-icon://pull-down";
				}
			}
			return "sap-icon://product";
		},
		
		formatSecondsToMinutes : function(obj){
			if(obj != undefined){
				return (parseInt(obj))/60;
			}
			return "00";
		},
		
		formatQuantityOrTimeInDetailsScreen : function(quantity,precision,effectiveDuration,dcElementDimensionType){
			if(dcElementDimensionType == sap.oee.ui.oeeConstants.dcElementDimensionTimeType){
				return sap.oee.ui.Formatter.formatDuration(effectiveDuration);
			}else{ // By Default Assume as quantity dimension type
				if(quantity != undefined && precision != undefined){
					var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
					var newNum = new Number(quantity).toFixed(precision);
					if(oNumberFormatter != undefined){
						return oNumberFormatter.format(newNum);
					}
				}
			}
		},
		
		formatCapacityNodesVisibilityInOrderCard : function(obj){
			if(!obj){
				return false;
			}
			
			return true;
		},
		
		formatCapacityNodesInOrderCardWithLabel : function(sLabel,aCapacityNodes){
			if(aCapacityNodes != undefined && aCapacityNodes.length != 0){
				var capacityString = " : ";
				
				for(var iterator in aCapacityNodes){
					capacityString += ""+aCapacityNodes[iterator].nodeDescription;
					if(iterator != aCapacityNodes.length - 1){
						capacityString += ",";
					}
				}
				
				return sLabel+""+capacityString;
			}
			
			return "";
		},
		
		formatOrderNo : function(obj1){
			if(obj1 != undefined){
				return obj1.replace(/^[0]+/g,"");
			}
			return "";
		},
		
		formatRemoveLeadingZero: function(obj){
			if(obj!== "" && obj !== undefined){
			obj = obj.replace(/^0+/g,"");
			}
			return obj;
		},
		
		formatBatchNumberDetails: function(text,batchNumber){ 
			return text+" : "+batchNumber;
		},
		
		formatDurations: function(obj){
			if(obj){
				return parseFloat(obj/60);
			}
		},
		
		formatQuantityForOrderCard: function(obj){
			
			if(obj != undefined){
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter();
				
				if(oNumberFormatter != undefined){
					obj1 = oNumberFormatter.format(obj);
					
				}
				
				return obj1;
				
			}
			
			if(obj === ""){
				
				return parseFloat(0);
			}
			
			
			
		},
		
		
		formatStatus :function(obj1,obj2,obj3){
			if(obj1 === "P"){
				return obj2;
			}
			if(obj1 === "D"){
				return obj3;
			}
		},
		
		formatQuantityAndDuration: function(obj1,obj2,obj3,obj4,precision){
			var precision = precision || 2;
			var text;
			if(obj1){
				var obj1 = parseFloat(obj1);
				var newNum1 = obj1.toFixed(precision || 2);
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(oNumberFormatter != undefined){
					obj1 = oNumberFormatter.format(newNum1);
				}
			}
			if(obj2){
				var obj2 = parseFloat(obj2);
				var newNum2 = obj2.toFixed(precision || 2);
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(oNumberFormatter != undefined){
					obj2 = oNumberFormatter.format(newNum2);
				}

			}
			text = obj1 + " " + obj3+ " / " + obj2 + " " + obj4 ;
			return text;
			
		},

		formatQuantityAndDurationForBaseUoM: function(obj1,obj2,obj3,obj4,precision){
			if(obj3 != ""){
				var precision = precision || 2;
				var text;
				if(obj1){
					var obj1 = parseFloat(obj1);
					var newNum1 = obj1.toFixed(precision || 2);
					var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
					if(oNumberFormatter != undefined){
						obj1 = oNumberFormatter.format(newNum1);
					}

				}
				if(obj2){
					var obj2 = parseFloat(obj2);
					var newNum2 = obj2.toFixed(precision || 2);
					var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
					if(oNumberFormatter != undefined){
						obj2 = oNumberFormatter.format(newNum2);
					}

				}
				text = obj1 + " " + obj3+ " / " + obj2 + " " + obj4 ;
				return text;
			}
			return "";	
		},
		
		
		formatQuantityAndUOMTextForTarget : function(obj1, obj2,precision){
			if(obj1){
				var object1 = parseFloat(obj1);
				var newNum = object1.toFixed(precision || 2);
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(oNumberFormatter != undefined){
					object1 = oNumberFormatter.format(newNum);
				}

				if(obj2){
					return object1 + " "+obj2 ;
				}
				else
					return object1;
			}
			return "";
		},
		
		formatUsername : function(obj1,obj2){
			if(obj1){
				if(obj2){
					return obj1+", "+obj2;
				}else{
					return obj1;
				}
			}
		},
	
		formatButtonType : function(obj){
			if(obj){
				for(var keys in sap.oee.ui.oeeConstants.buttonType){
					if(sap.oee.ui.oeeConstants.buttonType[keys].key === obj){
						return sap.oee.ui.oeeConstants.buttonType[keys].value;
					}
				}
			}
		},
				
		formatButtonTypeLink : function(obj,obj2){
			if(obj){
				if(obj === sap.oee.ui.oeeConstants.buttonType["NORMAL"].key){
					return false;
				}else if(obj === sap.oee.ui.oeeConstants.buttonType["GROUP"].key){
					if(obj2 && obj2 !== ""){
						return true;
					}
					return false;
				}
			} 
		},
				
		formatActivityEnabled: function(obj){
			if(obj){
				if(obj === sap.oee.ui.oeeConstants.buttonType["NORMAL"].key){
					return true;
				}else if(obj === sap.oee.ui.oeeConstants.buttonType["GROUP"].key){
					return false;
				}
			}
		},
		
		formatIconForButtons : function(obj,obj1){
			if(obj1){
				if(obj){
					return "";
				}
				else{
					return obj1;
				}
			}
		},
		
		formatClientAndPlant :function(obj1,obj2,obj3,obj4){
			if(obj1 && obj2 && obj3 && obj4){
				return obj1+" "+obj3+" - "+obj2+" "+obj4;
			}
		},

		formatId : function(obj,obj2){
			if(obj && obj2){
				if(obj === ""){ 
					return true;
				}else{
					if(obj2.length>0){
						if(obj2[0].podId === obj){
							return false;
						}
					}
				}
				return true;
			}
		},
		
		formatTargetStatusColor : function(obj){
			if(obj === "sap-icon://status-negative"){
				return "Negative";
			}
			if(obj === "sap-icon://status-in-process"){
				return "Critical";
			}
			if(obj === "sap-icon://status-positive"){
				return "Positive";
			}
		},
		formatTargetStatusTooltip : function(obj1,obj2,obj3,obj4){
			if(obj1 === "sap-icon://status-negative"){
				return obj4;
			}
			if(obj1 === "sap-icon://status-in-process"){
				return obj3;
			}
			if(obj1 === "sap-icon://status-positive"){
				return obj2;
			}
		},
		
		formatDefaultUser: function(obj1,obj2,obj3){
			var text;
			if(obj1){ 
				if(obj2){
					text = obj1+", "+obj2;
				}else{
					text =  obj1;
				}
			}
			if(obj3){
				return obj3+" "+text;
			}
		},
		
		formatProductionVersion: function(label,order){ 
            if(order != undefined){
                  return label+" : "+order;
            }
      },
		
		formatCrewSize: function(label,size){ 
			if(size){
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter();
				if(oNumberFormatter != undefined){
					size = oNumberFormatter.format(size);
				}
				return label+" : "+ size;
			}
			if(size === ""){
				return label+" : "+parseFloat(0);
			}
		},
		
		formatBooleanValue : function(obj1,obj2,obj3){
			if(obj1 === true || obj1 === 'X'){
				return obj2;
			}
			if(obj1 === false || obj1 === ''){
				return obj3;
			}
		},
		
		formatPODImageLink: function(obj,obj2){  
			if(obj2){
				if(obj){
					return obj;
				}else{
					return obj2;
				}
			}
		},
		formatCrewSizeVisibilityForDowntime  :function(obj1,obj2){
			if((obj1 === sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown || 
				obj1 === sap.oee.ui.oeeConstants.timeElementTypes.changeOver ||
				obj1 === sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown) && 
				obj2 === sap.oee.ui.oeeConstants.checkBooleanValue.TRUE){
				return true ;
			}
			return false;
		},
		formatStandardDurationVisibility : function(obj){
			if(obj === sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown){
				return true ;
			}
			if(obj === sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown || obj === sap.oee.ui.oeeConstants.timeElementTypes.changeOver ){
				return false ;
			}
			return false;
		},
		formatChangeoverVisibility : function(obj){
			if(obj === sap.oee.ui.oeeConstants.timeElementTypes.changeOver){
				return true ;
			}
			if(obj === sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown || obj === sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown){
				return false ;
			}
			return false;
		},
		formatNotificationVisibility : function(obj){
			if(obj === sap.oee.ui.oeeConstants.timeElementTypes.changeOver){
				return false ;
			}
			if(obj === sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown || obj === sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown ){
				return true ;
			}
			return false;
		},
		formatStandardDuration : function(obj){
			if(obj === sap.oee.ui.oeeConstants.checkBooleanValue.TRUE){
				return false;
			}else{
				return true;
			}
		},
		formatCrewSizeVisibility : function(obj){
			if(obj){
				if(obj === sap.oee.ui.oeeConstants.checkBooleanValue.TRUE){
					return true ;
				}
				return false;
			}
				return false;
		},
		
		formatUsrGrp: function(obj){
			if(obj){
				return false;
			}else{
				return true;
			}
		},
		
		checkCustomizationMandatory: function(obj1,obj2){
			if(obj1 || obj2){
				return true;
			}else{
				return false;
			}
		},
		
		checkCustomizationMandatoryDesign: function(obj1,obj2){
			if(obj1 || obj2){
				return sap.m.LabelDesign.Bold;
			}else{
				return sap.m.LabelDesign.Standard;
			}
		},
		
		checkBoolean: function(obj){
			if(obj){
				return true;
			}else{
				return false;
			}
		}, 
		
		formatCustomizationSwitchValue: function(obj){
			if(obj){
				if(obj === "YES"){
					return true;
				}else{
					return false;
				}
			}
		},
		
		formatTimeBasedCustomization: function(obj1,obj2,obj3){
			if(obj1 || obj2){
				if(obj3 && obj3.length > 0){
					if(obj3.length === 1 && obj3[0].customizationValueId === ""){
						return true;
					}
					return false;
				}
				return true;
			}
				return true;
		},
		
		formatMaterialVisibility : function(obj){
			if(obj === ''){
				return false;
			}
			if(obj !== "" && obj !== undefined){
				return true;
			}else{
				return false;
			}
			return false;
		},
		
		formatActivityInputsVisibility : function(obj){
			if(obj == 'X'){
				return false;
			}else {
				return true;
			}
		},
		formatActivityTableMode : function(obj){
			if(obj == 'X'){
				return "None";
			}else {
				return "Delete";
			}
		},
		
		formatExtensionsEnable: function(obj){
			if(obj){
				return false;
			}else{
				return true;
			}
		},
		
		formatMachineNameVisibility : function(obj){
			if(obj === sap.oee.ui.oeeConstants.userAssignmentScreenNodeType.MACHINE){
				return true ;
			}
			return false;
		},
		
		formatChangeLogValues : function(val, option){
			if(option === sap.oee.ui.oeeConstants.changeLogTypes.DISPOPTION){
				if(sap.oee.ui.oeeConstants.changeLogTypes.dispValue[val] !== undefined)
					return sap.oee.ui.oeeConstants.changeLogTypes.dispValue[val];
				else
					return val ;
			}
			else
				return val ;
		},
		
		formatChangeLogTimeStamp  : function(obj1, offset){
			if(obj1 != undefined){
				var time = sap.oee.ui.Utils.getPlantTimezoneTime(parseFloat(obj1),offset);
				return sap.oee.ui.Utils.oeeDateTimeFormatter.format(new Date(parseFloat(time)));
			}
			return "";
		},
		
		formatimpactsLineVisibility : function(obj){
			if(obj === true){
				return true;
			}
			return false;
		},
		assignOrderToButtonOnDialogFormatter : function(obj1, orderSelected){
			if(orderSelected != ""){
            return sap.oee.ui.Formatter.formatOrderNumber(orderSelected.orderNo, orderSelected.operationNo);
        }
			return obj1;
		},
		
		formatDate : function(obj){
			if(obj != "" && obj != undefined){
				var time = Date.parse(obj);
				return sap.oee.ui.Utils.oeeDateFormatter.format(new Date(parseFloat(time)));
			}
			return "";
		},
		
		formatBasedOnStatus : function(obj1,obj2){
			if(obj1){
				if(obj1 === "RELEASED" || obj1 === "RELEASED_P"  || obj2 === true) {
					return true;
				}
			}
			return false;
		},
		
		formatOrderDispatchScreenTexts: function(obj1,obj2,obj3){
			var text;
			if(obj1){
				if(obj2){
					if(obj3){
						return obj1+" / "+obj3+" ("+obj2+") ";
					}
					return obj1+" ("+obj2+") ";
				}
				return obj1;
			}
		},
		
		formatQuantityForOrderDispatch: function(obj1,obj2,precision,obj3){
			var quantity;
			if(obj1 && obj2){
				if((parseFloat(obj1)-parseFloat(obj2))=== 0){
					quantity = 0;
				}else{
					var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
					if(oNumberFormatter != undefined){
						quantity = oNumberFormatter.format((parseFloat(obj1)-parseFloat(obj2)));
					}
					//quantity = (parseFloat(obj1)-parseFloat(obj2)).toFixed(precision);
				}
			}
			if(obj3){
				return quantity+" "+obj3;
			}
			return quantity;
		},
		
		formatValueForOrderDispatch: function(obj,precision){
			if(obj && obj!==""){
				var newNum1 = new Number(obj).toFixed(precision || 2) ;
				var oNumberFormatter =  sap.oee.ui.Utils.getOeeNumberFormatter(precision);
				if(oNumberFormatter != undefined){
					return oNumberFormatter.format(newNum1);
				}
			}else{
				return "";
			}
		},
		
		formatStatusForOrderDispatch: function(obj){
			if(obj){
				return sap.oee.ui.oeeConstants.orderDispatchStatus[obj];
			}
		},
		
		formatDowntimeForDurationBased : function(obj1,obj2,offset, plantTimezoneKey){
			var formattedString;
			if(obj1){
				if(obj2){
					if(obj1 === obj2){
						return "Not Applicable";
					}
				}
				formattedString = sap.oee.ui.Formatter.formatTimeStampWithoutLabel(obj1, offset, plantTimezoneKey);
			}
			return formattedString ;
		},
		
		formatDateButton : function(obj,obj1,obj2){
			if(obj === obj1 || obj === obj2){
				return true;
			}
			return false;
		},
		
		formatDateButtonVisibility:function(obj){ 
			if(obj === 0){
				return false ;
			}
			return true;
		},
		
		formatDateButtonVisibilityForLastStartTime : function(obj1,obj2,obj3){
			if(obj1 === 0 && obj2 !== obj3){
				return false;
			}else{
				return true;
			}
			return true;
		},
		
		formatProductionActivityButton : function(obj1,obj2,obj3,obj4){
			if(obj1 === false){
				return false;
			}
			
			if(obj1 === true){
				var currentTime = new Date(new Date().toUTCString()).getTime();
				
				if(currentTime > obj3 && currentTime < obj4){
					return true;
				}else{
					return false;
				}
			}
			
			return false;
		},
		
		formatMultiplierValue: function(objLabel, objValue){
			if(objLabel === this.getModel("i18n").getResourceBundle().getText("OEE_LABEL_MULTIPLIER")){
				return objValue * 100 + "%";
			}
			return objValue;
		},

		formatQuantityValue: function(quanity){
			var sample=1.2; 
			var decimalSymbol=sample.toLocaleString().substring(1,2); /// dot
			if(quanity != null){
			quanity= quanity.replace(".",decimalSymbol);
			return quanity;	
			}else
			{}
			

		}
		
		
		
}; // End of Formatter function, add new formatter functions after this closure.
}();

