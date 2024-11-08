jQuery.sap.require("sap.ui.core.format.NumberFormat");
jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.declare("sap.oee.ui.Utils");
sap.oee.ui.Utils = function(){
		return { // start Of Utils Object
			appComponent : undefined,
			eventBus : undefined,
			oOEEBundle : undefined,
			appData : undefined,
			interfaces : undefined,
			machineListForCurrentWC : {
				machineList : undefined,
				machineListWithBottleneckInfo : {}
			},
			
			setBundle : function(oBundle){
				this.oOEEBundle = oBundle;
			},
			
			initialize : function(oComponent,oBundle){
				this.appComponent = oComponent;
				this.appData = this.appComponent.getAppGlobalData();
				this.interfaces = this.appComponent.getODataInterface();
				this.oOEEBundle = oBundle;
				this.eventBus = this.appComponent.getEventBus();
				
				var fClearMachineList = function(Utils){
					return function(channelId, eventId, data){
					   if(eventId === "wcChange" || "orderChanged"){
						    Utils.machineListForCurrentWC.machineList = undefined; //Clear reference
						    Utils.machineListForCurrentWC.machineListWithBottleneckInfo = {}; //Clear reference
					   }
					};
				}(this);
				
				this.appComponent.getEventBus().subscribe(this.appComponent.getId(),"wcChange",fClearMachineList,this);
				
				this.appComponent.getEventBus().subscribe(this.appComponent.getId(),"orderChanged",fClearMachineList,this);
			},	
			
			oeeDateTimeFormatter : sap.ui.core.format.DateFormat.getDateTimeInstance({style : "medium"}),
			oeeTimeFormatter : sap.ui.core.format.DateFormat.getTimeInstance({style : "medium"}),
			oeeDateFormatter: sap.ui.core.format.DateFormat.getDateInstance({style:"medium",locale:sap.ui.getCore().getConfiguration().getLanguage()}),
			getOeeNumberFormatter : function(precision){
				this.fFormatter = this.fFormatter || sap.ui.core.format.NumberFormat.getFloatInstance({
	                groupingEnabled : true,
	                maxFractionDigits : precision || 2
	            });
				
				return this.fFormatter;
			},
			
			closeDialog : function(oEvent){
				oEvent.getSource().getParent().close();
			},
			
			getActivityOptionValues : function(activityOptions, optionName) {	
				if (activityOptions != undefined) {
					for (var i = 0 ; i < activityOptions.length; i++) {
						if (activityOptions[i].optionName == optionName) {
							if (activityOptions[i].activityOptionValueDTOList != undefined) {
								if (activityOptions[i].activityOptionValueDTOList.results != undefined) {
									var optionValues = activityOptions[i].activityOptionValueDTOList.results;
									if (optionValues.length > 0) {
										return optionValues;
									}
								}
							}
						}
					}
				}
			},
			
			format :  function(s) {
				if (!s) {
					return s;
				}
				var i = 1;
				var args = Array.prototype.slice.call(arguments);
				if (args.length <= 1) {
					return s;
				}
				return s.replace(/%((%)|s)/g, function(m) {
					return m[2] || (args[i++]);
				});
			},
			
			toastError :  function(message) {
				sap.m.MessageToast.show(message, {
					duration: 3000,
					width: "35em"
				});
			},
			
			toast : function(message) {
				sap.m.MessageToast.show(message, {
					duration: 3000,
					width: "35em"
				});
			},
			
			updateModel : function(oModel){
				if(oModel){
					oModel.checkUpdate();
				}
			},
			
			isQuantityValid  : function(sValue,oControl){
				var value = new Number(sValue);
				if(isNaN(value)) {
					this.createMessage(this.oOEEBundle.getText("OEE_ERROR_MSG_INVALID_INPUT"), sap.ui.core.MessageType.Error);
					return false;
				} else{
					return true;
				}
			},
			
			createMessage : function(message,messageType,callback){
				jQuery.sap.require("sap.m.MessageBox");
				if(messageType == sap.ui.core.MessageType.Error) //Adding this to reduce rework after moving to Bluecrystal
					messageType =sap.m.MessageBox.Icon.ERROR;
				 sap.m.MessageBox.show(
						   message, {
					          icon: messageType,
					          title: this.oOEEBundle.getText("OEE_HEADER_ERROR"),
					          actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					          onClose: function(oAction) {
							   		if(callback){
							   			callback();
							   		}
						   	  }
					      });
			},
			
			inputNumberValidation : function(oEvent){
			    var control = oEvent.getSource();
			    if(control){
			           var sVal = control.getValue();
			           var fVal = new Number(0);
			           jQuery.sap.require("sap.ui.core.format.NumberFormat");
			           if(sVal == ""){
			                 control.setValueState(sap.ui.core.ValueState.None);
			           }
			           var floatFormatter= sap.ui.core.format.NumberFormat.getFloatInstance();
			
			           fVal = floatFormatter.parse(sVal);
			           if(sVal !== "" && floatFormatter.parse(sVal) < 0){
			                 control.setValueState(sap.ui.core.ValueState.Error);
			                  control.setValueStateText(this.oOEEBundle.getText("OEE_ERROR_VALIDATION"));
			           }
			           else if(sVal !== "" && isNaN(fVal)){
			        	   control.setValueState(sap.ui.core.ValueState.Error);
			               control.setValueStateText(this.oOEEBundle.getText("OEE_ERR_MSG_INVALID_QTY"));
			                
			                  return false;
			           }
			           else
			           {
			               control.setValueState(sap.ui.core.ValueState.None);
			               control.setValueStateText(undefined);
			           }
			    }
			},
			
			isQuantityValidForLocale : function(sVal,control){


				var fVal = new Number(0);
				jQuery.sap.require("sap.ui.core.format.NumberFormat");
				var floatFormatter= sap.ui.core.format.NumberFormat.getFloatInstance();
				fVal = floatFormatter.parse(sVal);
				if(sVal !== "" && isNaN(fVal)){
					this.createMessage(this.oOEEBundle.getText("OEE_ERROR_MSG_INVALID_INPUT"), sap.ui.core.MessageType.Error);
					return false;
				}
				else
				{
					return true;
				}


			},
			
			getMostRecentReportingTime : function(startTimestamp,endTimestamp,orderStartTimestamp){
				var effectiveReportingTime = {};
				
				if(startTimestamp != undefined && endTimestamp != undefined && orderStartTimestamp != undefined) {
					if (orderStartTimestamp < endTimestamp) {
						if (orderStartTimestamp < startTimestamp) {
							return startTimestamp;
						} else if (	orderStartTimestamp >= startTimestamp) {
							//else take the order's start time
							return orderStartTimestamp;
						}
					}
				}
			},
			
			
			// Takes the Global App Object as Parameter
			searchForActivitiesInTheAssignedPodForUserAndReturnActivityObject  : function(oGlobalAppObject,sActivityID){
				var oActivityDetails;
				if(oGlobalAppObject != undefined){
					if(oGlobalAppObject.PODs != undefined){
						// Search in Button List First
						var oPods = oGlobalAppObject.PODs;
						var buttonPrefix = "button_";
						var i;
						for(i=0;i<oPods.subButtons;i++){
							var buttonDetails = oPods[buttonPrefix + i];
							if(buttonDetails.buttonType != oGlobalAppObject.standardExtendableButtonType)
							{
								var activityID = buttonDetails.activityAssigned;
								var isActivityEnabled = true;
								if(buttonDetails.activityAssigned1.activityEnabled != "" && buttonDetails.activityAssigned1.activityEnabled != undefined){
									isActivityEnabled = buttonDetails.activityAssigned1.activityEnabled;
								}
								if (isActivityEnabled) {								
									if (activityID == "" || activityID == null || activityID == undefined) { // Check if it is a grouped button and loop over subButtons if it is.
										if (buttonDetails.subButtons != undefined) {
											if (buttonDetails.subButtons > 0) {
												for ( var j = 0; j < buttonDetails.subButtons; j++) {
													var menuActivityID = buttonDetails[buttonPrefix + j].activityAssigned;
													if(menuActivityID == sActivityID){
														oActivityDetails = buttonDetails[buttonPrefix + j].activityAssigned1;
														break;
													}
												}
											}
										}
									} else{
										if(activityID == sActivityID){
											oActivityDetails = buttonDetails.activityAssigned1;
											break;
										}
									}
								}	
								else 
									continue;
							}
						}
					}
				}
				if(oActivityDetails == undefined){ // Then Search for Activity in Panel List
					if (oPods.podPanelDTOList != undefined) {
						var panels = oPods.podPanelDTOList.results;
						if (panels.length > 0) {
							for (var i = 0; i < panels.length; i++) {
								if(panels[i].activity.activityId == sActivityID){
									oActivityDetails = panels[i].activity;
									break;
								}
							}
						}
					}
				}
				return oActivityDetails;
			},
			
			getActivityDescriptionForActivity : function(oGlobalAppObject,sActivityID){
				var desc = "";
				var oActivityObject = sap.oee.ui.Utils.searchForActivitiesInActivityList(oGlobalAppObject,sActivityID);
				if(oActivityObject && oActivityObject.activityDescDTOList && oActivityObject.activityDescDTOList.results && oActivityObject.activityDescDTOList.results.length){
					var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
					$.each(oActivityObject.activityDescDTOList.results,function(index,obj){
						if(obj.language === sCurrentLocale){
							desc = obj.description;
						}
					});
				}
				
				return desc;
			},
			
			calculateEndTimeByDurationInMins : function(startDate, startTime, durationInMins) {
				var endTimeStamp = {};
				var startTimeInMillis = new Date(startDate.toDateString() + ' ' + startTime).getTime();
				var durationInMillis = durationInMins * 60 * 1000;
				var endTimeInMillis = startTimeInMillis + durationInMillis;
				
				endTimeStamp.endDate = new Date(endTimeInMillis);
				endTimeStamp.endTime = new Date(endTimeInMillis).toTimeString().split(" ")[0];
				return endTimeStamp;
			},
			
				
			//Fuzzy Search Implementation
			
			//controller: name of controller that invokes fuzzySearch()
			//jsonModel: json model that needs to be filtered
			//sValue: string that we want to search
			//oBinding: binding that we want to apply filter on and then update the table with new data
			//propOfModel: properties of model which are binded to table and are used to make filters
			//oFilters: list of filters that are applied on data before fuzzy search is applied on the data.
			
			
			fuzzySearch : function(controller, jsonModel, sValue, oBinding, sEvent, propOfModel, prevFilters,andModeOnPrevFilters){
				sValue = sValue.trim();
				var newFilters = [];
			    if(jsonModel != undefined && propOfModel != undefined && oBinding != undefined){  
			         
			    	//generating filters for properties of model binded to the control in the ui
			    	for(i in propOfModel){
							    			
				      var tFilter = new sap.ui.model.Filter(propOfModel[i], sap.ui.model.FilterOperator.Contains, sValue);
					  newFilters.push(tFilter);
				    }
			    	
					var orOfNewFilter = new sap.ui.model.Filter({ filters: newFilters, and: false });
					
					if(prevFilters != undefined && prevFilters.length > 0)
					{ 
					  var andMode = (andModeOnPrevFilters == undefined)?false:andModeOnPrevFilters;
					  var orOfPrevFilter = new sap.ui.model.Filter({ filters: prevFilters, and: andMode });
					  var andOfPrevNewFilter = new sap.ui.model.Filter({ filters:[orOfNewFilter, orOfPrevFilter], and: true});
					  oBinding.filter([andOfPrevNewFilter]);
					}
					
					else
					{
					 oBinding.filter([orOfNewFilter]);
					}
					
				}			
			},
			
			//Takes the Global App Object as Parameter
			searchForActivitiesInActivityList  : function(oGlobalAppObject,sActivityID){
				var oActivityDetails;
				if(oGlobalAppObject != undefined){
					if(oGlobalAppObject.activityList != undefined){
						// Search in ActivityList
						var oActivities = oGlobalAppObject.activityList.activityDetails.results;
						var i;
						for(i=0;i<oActivities.length;i++){
								var activityDetails = oActivities[i];
								var activityID = activityDetails.activityId;
										if(activityID == sActivityID){
											if (activityDetails.activityEnabled) {
												oActivityDetails = activityDetails;
												oActivityDetails = sap.oee.ui.Utils.getActivityDescriptionBasedOnLogonLanguage(oActivityDetails);
												break;
											}
										}
						}
					}
				}
				return oActivityDetails;
			},
			
			getActivityDescriptionBasedOnLogonLanguage : function(activityDetails){
				var logonLanguage = sap.ui.getCore().getConfiguration().getLocale().getLanguage();
				
				// Change Language code in case of Hebrew Language
				if(logonLanguage === 'he'){
					logonLanguage = 'iw';
				}
				
				// Description based on Logon language
				if(activityDetails.activityDescDTOList.results.length > 0){
					$.each(activityDetails.activityDescDTOList.results,function(index,obj){
						if(obj.language == logonLanguage){
							activityDetails.activityDescription = obj.description;
							activityDetails.activityDescriptionLanguage = obj.language;
						}
					});
				}

				// If Logon Language description is not found, try to get english language description
				if(activityDetails.activityDescription == undefined || activityDetails.activityDescription == ""){
					$.each(activityDetails.activityDescDTOList.results,function(index,obj){
						if(obj.language == sap.oee.ui.oeeConstants.locales.ENGLISH.key){
							activityDetails.activityDescription = obj.description;
							activityDetails.activityDescriptionLanguage = obj.language;
						}
					});
				}

				// If English Language is also not maintained, pick description of first language in activity description list
				if(activityDetails.activityDescription == undefined || activityDetails.activityDescription == ""){
					activityDetails.activityDescription = activityDetails.activityDescDTOList.results[0].description;
					activityDetails.activityDescriptionLanguage = activityDetails.activityDescDTOList.results[0].language;
				}

				return activityDetails;
			},
			
			updateCurrentOrderDetails : function(oAppComponent,invokingControllerReference){
				if(oAppComponent != undefined){
					var oAppData = oAppComponent.getAppGlobalData();
					if(oAppData != undefined){
						if(oAppData.selected.runID != undefined && oAppData.selected.runID != ""){
							oAppComponent.getEventBus().publish(oAppComponent.getId(), "refreshOrderDetails"); // Refresh selected order details
						}
						else
							console.log("No Order is set in the app context");
					}
				}
			},
			
			attachChangeOrderDetails : function(oAppComponent,orderFragmentId,invokingControllerReference){
				var orderCardHeader = invokingControllerReference.byId(sap.ui.core.Fragment.createId(orderFragmentId,"orderCardHeader"));
				if(orderCardHeader != undefined){
					orderCardHeader.attachTitleSelectorPress(function(oEvent){
						oAppComponent.getEventBus().publish(oAppComponent.getId(), "openOrderChangePopover"); // Fire Change Order Event
					});
				}
			},
			
			calculateStartAndEndDatesWithDuration : function (
					downtimeDates, startDateField, startTimeField, endDateField, endTimeField, durationField, setCurrentStartTimeField, setCurrentEndTimeField, interfaces) {
				var currentTimeStamp, dateObject, timeObject;
				if (downtimeDates != undefined && startTimeField != undefined && startDateField != undefined
						&& endTimeField != undefined && endDateField != undefined && durationField != undefined) {
					if (	(downtimeDates.firstFillField == "START_TIME" && downtimeDates.secondFillField == "DURATION") ||
							(downtimeDates.firstFillField == "DURATION" && downtimeDates.secondFillField == "START_TIME")) {			
						endTimeField.setEnabled(false);
						endDateField.setEnabled(false);
						setCurrentEndTimeField.setEnabled(false);
						if (	downtimeDates.startTimeStamp != undefined &&
								downtimeDates.duration != undefined) {
							 if(sap.ui.getCore().byId("downtimeDialog--endTime")){
								 if(sap.ui.getCore().byId("downtimeDialog--endTime").getDisplayFormat()=="medium"){
										var durationInMillis = downtimeDates.duration * 60 * 1000;
									}else{
										var durationInMillis = parseInt(downtimeDates.duration) * 60 * 1000;
									}
							 }else{
								 var durationInMillis = parseInt(downtimeDates.duration) * 60 * 1000;
							 }
							
							
							var endTimeInMillis = downtimeDates.startTimeStamp + durationInMillis;
							//downtimeDates.endTimeStamp = new Date(interfaces.interfacesGetTimeInMsAfterTimezoneAdjustmentsForTimeStamp(new Date(endTimeInMillis).getTime()));
							downtimeDates.endTimeStamp = endTimeInMillis;
							dateObject = new Date(downtimeDates.endTimeStamp);
							timeObject = dateObject.getHours() +':'+ dateObject.getMinutes() + ':' + dateObject.getSeconds();
							if (downtimeDates.endTimeStamp != undefined) {
								endDateField.setDateValue(dateObject);
								endTimeField.setValue(timeObject);
							}
						}
					} else if (	(downtimeDates.firstFillField == "END_TIME" && downtimeDates.secondFillField == "DURATION") ||
								(downtimeDates.firstFillField == "DURATION" && downtimeDates.secondFillField == "END_TIME")) {			
						startTimeField.setEnabled(false);
						startDateField.setEnabled(false);
						setCurrentStartTimeField.setEnabled(false);
						if (	downtimeDates.endTimeStamp != undefined &&
								downtimeDates.duration != undefined) {
							if(sap.ui.getCore().byId("downtimeDialog--endTime")){
								if(sap.ui.getCore().byId("downtimeDialog--endTime").getDisplayFormat()=="medium"){
									var durationInMillis = downtimeDates.duration * 60 * 1000;
								}else{
									var durationInMillis = parseInt(downtimeDates.duration) * 60 * 1000;
								}
								
							}else{
								var durationInMillis = parseInt(downtimeDates.duration) * 60 * 1000;
							}
							
							
							var startTimeInMillis = downtimeDates.endTimeStamp - durationInMillis;
							//downtimeDates.startTimeStamp = new Date(interfaces.interfacesGetTimeInMsAfterTimezoneAdjustmentsForTimeStamp(new Date(startTimeInMillis).getTime()));
							downtimeDates.startTimeStamp = startTimeInMillis;
							dateObject = new Date(downtimeDates.startTimeStamp);
							timeObject = dateObject.getHours() +':'+ dateObject.getMinutes() + ':' + dateObject.getSeconds();
							if (downtimeDates.startTimeStamp != undefined) {
								startDateField.setDateValue(dateObject);
								startTimeField.setValue(timeObject);
							}
						}
					} else if (	(downtimeDates.firstFillField == "START_TIME" && downtimeDates.secondFillField == "END_TIME") ||
								(downtimeDates.firstFillField == "END_TIME" && downtimeDates.secondFillField == "START_TIME")) {			
						durationField.setEnabled(false);
						if (	downtimeDates.endTimeStamp != undefined &&
								downtimeDates.startTimeStamp != undefined) {
							var durationInMilliSecs = downtimeDates.endTimeStamp - downtimeDates.startTimeStamp;
							var durationInMins = durationInMilliSecs / (1000 * 60);
							if (durationInMins != undefined) {
								if(sap.ui.getCore().byId("downtimeDialog--endTime")){
									if(sap.ui.getCore().byId("downtimeDialog--endTime").getDisplayFormat()=="medium"){
										downtimeDates.duration = durationInMins;
										durationField.setValue(durationInMins);
									}else{
										downtimeDates.duration = durationInMins.toFixed(0);
										durationField.setValue(durationInMins.toFixed(0));
									}
								}else
									{
									downtimeDates.duration = durationInMins.toFixed(0);
									durationField.setValue(durationInMins.toFixed(0));
									}
								
								
								
							}
						}
					} else if (	downtimeDates.firstFillField == undefined ||
								downtimeDates.secondFillField == undefined) {
						if (startTimeField.getEnabled() == false || startDateField.getEnabled() == false) {
							currentTimeStamp = new Date(interfaces.interfacesGetTimeInMsAfterTimezoneAdjustmentsForTimeStamp(new Date().getTime()));
							startTimeField.setEnabled(true);
							startDateField.setEnabled(true);
							setCurrentStartTimeField.setEnabled(true);
							dateObject = new Date(currentTimeStamp);
							timeObject = dateObject.getHours() +':'+ dateObject.getMinutes() + ':' + dateObject.getSeconds();
							
							startDateField.setDateValue(currentTimeStamp);
							startTimeField.setValue(timeObject);
						}
						
						if (endTimeField.getEnabled() == false || endDateField.getEnabled() == false) {
							currentTimeStamp = new Date(interfaces.interfacesGetTimeInMsAfterTimezoneAdjustmentsForTimeStamp(new Date().getTime()));
							endTimeField.setEnabled(true);
							endDateField.setEnabled(true);
							setCurrentEndTimeField.setEnabled(true);	
							dateObject = new Date(currentTimeStamp);
							timeObject = dateObject.getHours() +':'+ dateObject.getMinutes() + ':' + dateObject.getSeconds();
							
							endDateField.setDateValue(currentTimeStamp);
							endTimeField.setValue(timeObject);
						}
						
						if (durationField.getEnabled() == false) {
							durationField.setEnabled(true);
							durationField.setValue('');				
						}
						
						if (setCurrentStartTimeField.getEnabled() == false) {
							setCurrentStartTimeField.setEnabled(true);
						}
						
						if (setCurrentEndTimeField.getEnabled() == false) {
							setCurrentEndTimeField.setEnabled(true);
						}
						
						if (	downtimeDates.firstFillField != "START_TIME" &&
								downtimeDates.secondFillField == undefined) {
							downtimeDates.startDate = undefined;
							downtimeDates.startTime = undefined;
						}
						
						if (	downtimeDates.firstFillField != "END_TIME" &&
								downtimeDates.secondFillField == undefined) {
							downtimeDates.endDate = undefined;
							downtimeDates.endTime = undefined;
						}
						
						if (	downtimeDates.firstFillField != "DURATION" &&
								downtimeDates.secondFillField == undefined) {
							downtimeDates.duration = undefined;
						}
					}	
				}
				return downtimeDates;
			},
			
			convertContextToJSONObjects : function(aContextArray){
				var aObjs = [],i, context;
				for(i in aContextArray){
					context = JSON.parse(JSON.stringify(aContextArray[i].getObject()));
					aObjs.push(context);
				}
				
				return aObjs;
			},
			
			buildPerformanceStrip : function(oController,performanceDetailJSON,offset){
				var aColorPallete = [];

				var dataset = new sap.viz.core.FlattenedDataset({
					dimensions : [ 
									{
									  axis : 1,
									  name : 'Availability',
									  value : "{stripDetails}"
									},
						            {
									  axis : 2,
									  name : 'Data',
						              value : "{counter}"
						            }
					              ],
					              measures : [ 
					                {
				                  	  name : 'width',
				                   	  value : '{width}'
				                    }
				                 ],
					             data : {
									path : "/data"
									}
				});
				
				
				var performanceStrip = new sap.viz.ui5.StackedColumn({
					width : "100%",
					height : "11rem",
				  	toolTip : {
					visible : false
					},
					title : {
						visible : false,
						text : ''
					},
					plotArea : {
						animation : {
							dataLoading : false, 
							dataUpdating : false, 
							resizing : false
						}
					},
					xAxis : new sap.viz.ui5.types.Axis({visible : true}),
					yAxis : new sap.viz.ui5.types.Axis({visible:false}),
			        background : new sap.viz.ui5.types.Background({visible:false}),
					dataset : dataset
				});
				
				if(performanceDetailJSON != undefined ){
						if(performanceDetailJSON.details !== undefined){
						if(performanceDetailJSON.details.results.length != 0){
							$.each(performanceDetailJSON.details.results,function(index,obj){
								obj.counter = index;
								if(obj.color == "RED")
									obj.color = sap.oee.ui.oeeConstants.redCSSColor;
								else if (obj.color == "GREEN")
									obj.color = sap.oee.ui.oeeConstants.greenCSSColor;
								
								aColorPallete.push(obj.color);
								performanceDetailJSON.details.results[index].stripDetails = "Performance Strip"; // Dummy String as Axis
								performanceDetailJSON.details.results[index].width  = parseFloat(performanceDetailJSON.details.results[index].width);
							});
						}
						
						performanceStrip.getPlotArea().setColorPalette(aColorPallete);
						performanceStrip.getLegend().setVisible(false);
		
						// workaround for formatting of axis label workaround
						performanceStrip.attachInitialized(function(oEvent){sap.oee.ui.Utils.fXAxisFormatter(oEvent,performanceDetailJSON,offset);});
		
						var oModel2D = new sap.ui.model.json.JSONModel({
							data: performanceDetailJSON.details.results
						});
						
						performanceStrip.setModel(oModel2D);
						performanceStrip.attachBeforeCreateViz(function(e) {
							var usrOptions = e.getParameter("usrOptions");
							// make the vertical stacked bar a horizontal stacked bar
							usrOptions.type = "viz/stacked_bar";
		
						});
					}
				}
				
				return performanceStrip;
			},
	
			getPlantTimezoneTime : function(timeInMillis,plantTimezoneOffset){
				var timeInMillisAfterAdjustments = undefined, offsetInMinutes;
				var date = new Date(timeInMillis);
				
				/*
				 * Adjusting plantTimezoneOffset based on DST if applicable
				 */
				if(this.appData){
					offsetInMinutes = sap.oee.ui.Utils.getPlantTimezoneOffsetBasedOnTimezoneKeyForTimestamp(timeInMillis, this.appData.plantTimezoneKey);
					if(offsetInMinutes !== undefined){
						plantTimezoneOffset = parseFloat(offsetInMinutes);
					}
				}
				
				if (plantTimezoneOffset !== undefined && 
						plantTimezoneOffset !== '') {
					var browserTimezoneOffset = -1 * (date.getTimezoneOffset() * 60 * 1000);
					if (plantTimezoneOffset != browserTimezoneOffset) {
						timeInMillisAfterAdjustments = timeInMillis + (plantTimezoneOffset - browserTimezoneOffset);		
					} else {
						timeInMillisAfterAdjustments = timeInMillis;
					}
				} else {
					timeInMillisAfterAdjustments = timeInMillis;
				}	
				return timeInMillisAfterAdjustments;
			},
			
			getPlantTimezoneOffsetBasedOnTimezoneKeyForTimestamp : function(timeInMillis, plantTimezoneKey){
				var offset, zoneObject, offsetInMinutes;
				if(timeInMillis != "" && timeInMillis != undefined){
					if(plantTimezoneKey != undefined && plantTimezoneKey != null){
						var zoneObject = moment.tz.zone(plantTimezoneKey);
						if(zoneObject){
							offsetInMinutes = zoneObject.parse(parseFloat(timeInMillis));
							offset =  -1 * (parseFloat(offsetInMinutes * 60 * 1000));
						}
					}
				}
				return offset;
			},
			
			removePlantTimezoneTimeOffsetAndSendUTC : function(timeInMillis,plantTimezoneOffset){
				var timeInMillisAfterAdjustments = undefined, offsetInMinutes, dateTimeString;
				var date = new Date(timeInMillis);
				
				/*
				 * Adjusting plantTimezoneOffset based on DST if applicable
				 */
				if(this.appData){
					dateTimeString = sap.oee.ui.Utils.getDateTimeStringFromTimestamp(timeInMillis);
					offsetInMinutes = sap.oee.ui.Utils.getPlantTimezoneOffsetBasedOnTimezoneKey(dateTimeString, this.appData.plantTimezoneKey);
					if(offsetInMinutes !== undefined){
						plantTimezoneOffset = parseFloat(offsetInMinutes);
					}
				}
				
				if (plantTimezoneOffset !== undefined && 
						plantTimezoneOffset !== '') {
					var browserTimezoneOffset = -1 * (date.getTimezoneOffset() * 60 * 1000);
					if (plantTimezoneOffset != browserTimezoneOffset) {
						timeInMillisAfterAdjustments = timeInMillis - (plantTimezoneOffset - browserTimezoneOffset);		
					} else {
						timeInMillisAfterAdjustments = timeInMillis;
					}
				} else {
					timeInMillisAfterAdjustments = timeInMillis;
				}	
				return timeInMillisAfterAdjustments;
			},
			
			getPlantTimezoneOffsetBasedOnTimezoneKey : function(dateTimeString, plantTimezoneKey){
				var offset, offsetInMinutes;
				if(dateTimeString != "" && dateTimeString != undefined){
					if(plantTimezoneKey != undefined && plantTimezoneKey != null){
						momentObject = moment.tz(dateTimeString , plantTimezoneKey);
						if(momentObject){
							offsetInMinutes = momentObject._offset;
							offset =  parseFloat(offsetInMinutes * 60 * 1000);
						}
					}
				}
				return offset;
			},
			
			getDateTimeStringFromTimestamp : function (timeInMilliSeconds){
				var date, dateString, month, timeString, dateTimeString = "";
				if(timeInMilliSeconds != "" && timeInMilliSeconds != undefined){
					date = new Date(timeInMilliSeconds);
					month = date.getMonth() + 1;
					dateValue = date.getDate();
					hours = ((date.getHours()<10)?"0"+date.getHours():date.getHours());
					minutes = ((date.getMinutes()<10)?"0"+date.getMinutes():date.getMinutes());
					seconds = ((date.getSeconds()<10)?"0"+date.getSeconds():date.getSeconds());	
					dateString = (date.getFullYear())+"-"+((month<10)?"0"+month:month)+"-"+((dateValue<10)?"0"+dateValue:dateValue);
					timeString = (hours)+":"+(minutes)+":"+(seconds);
					dateTimeString = dateString + ' '+ timeString;
				}
				return dateTimeString;
			},
			
			removeBrowserTimezoneTimeOffsetAndSendUTC : function(timeInMillis){
				var timeInMillisAfterAdjustments = undefined;
				var date = new Date(timeInMillis);
				var browserTimezoneOffset = date.getTimezoneOffset() * 60 * 1000;
				timeInMillisAfterAdjustments = timeInMillis - browserTimezoneOffset;		
				return timeInMillisAfterAdjustments;
			},
			
			fXAxisFormatter : function(oEvent,performanceDetailJSON,offset) {
				var sAxisSelector = ".v-m-xAxis text";
				var oDomContext = oEvent.getSource().getDomRef();
				if(oDomContext == null || oDomContext == undefined || oDomContext == "")
					return;
				var iNoOfAxisLabels = jQuery(sAxisSelector,oDomContext).length;
				if(iNoOfAxisLabels > 0){
					var s = this.getPlantTimezoneTime(parseFloat(performanceDetailJSON.startTimestamp), parseFloat(offset));
					var s1 = this.getPlantTimezoneTime(parseFloat(performanceDetailJSON.endTimestamp), parseFloat(offset));
					
					var differenceInTime = (s1 - s);
					var incrementalValue = differenceInTime / (iNoOfAxisLabels - 1);
					var timeAxisArray = [];
					for( i= 0; i< iNoOfAxisLabels; i++){
					    var incrementalTime = new Date(s + (incrementalValue * i));
					    var hour = incrementalTime.getHours();
					    var min = incrementalTime.getMinutes();
					    var h = (hour <= 9)?("0"+hour):hour;
					    var m = (min <= 9)?("0"+min):min;
					    var eachTimeAxisLabel = h + ":" + m;
					    timeAxisArray.push(eachTimeAxisLabel);
					}
					
					jQuery(sAxisSelector, oEvent.getSource().getDomRef()).each(function(i, e) {
							if(i%2 == 0 || i== (iNoOfAxisLabels - 1)){
								this.style.fontWeight = "bold";
								this.style.fontSize = "18px";
								this.textContent = timeAxisArray[i];
							}
							else
								this.textContent = "";
					});
				}
			},
			
			isTimeStampWithinShiftBoundaries : function(timeStampToCompareWith,shiftObject){
				var shiftStartTime = shiftObject.startTimestamp;
				var shiftEndTime = shiftObject.endTimestamp;
				return (timeStampToCompareWith >= shiftStartTime && timeStampToCompareWith <= shiftEndTime)?true : false;
			},
			
			convertReasonCodeDataObjectToRcFields : function(rcObject,reasonCodeData){
				var iterator;
				
				if(rcObject == undefined || reasonCodeData == undefined)
					return;
				
				for(iterator=1;iterator <=  sap.oee.ui.oeeConstants.rcLevel;iterator++){
					if(reasonCodeData["reasonCode" +iterator] != undefined){
						rcObject["rc"+iterator] = reasonCodeData["reasonCode" +iterator];
					}
					else
						break;
				}
			},
			
			convertRcFieldsObjectToReasonCodeDataObject : function(rcObject,reasonCodeData){
					var iterator;
					
					if(rcObject == undefined || reasonCodeData == undefined)
						return;
					
					for(iterator=1;iterator <=  sap.oee.ui.oeeConstants.rcLevel;iterator++){
						if(rcObject["rc" +iterator] != undefined){
							reasonCodeData["reasonCode"+iterator] = rcObject["rc" +iterator];
						}
						else
							break;
					}
			},
			
			convertReasonCodeToRcFields : function(dataRecord){
				var iterator;
				
				if(dataRecord == undefined)
					return;
				
				for(iterator=1;iterator <=  sap.oee.ui.oeeConstants.rcLevel;iterator++){
					if(dataRecord.reasonCode["reasonCode" +iterator] != undefined){
						dataRecord["rc"+iterator] = dataRecord.reasonCode["reasonCode" +iterator];
					}
					else
						break;
				}
			},
			
			convertProductionData : function(dataRecord){
				var exclusionList = ["reasonCodeData","descriptionOfDcElement","descriptionOfParameter","descriptionOfMaterial","reasonCode","descriptionOfReasonCode","ioDataAssociatedReasonCodeList","startDateUtc","startTimeUtc","endDateUtc","endTimeUtc","creationTimestamp","changeTimestamp","erpSendTime","hanaSendTime","startDate","endDate","endTime","startTime","timeElementcategory","dataCollectionElementType","uomDescription"];
				
				if(dataRecord.rootcauseMachines != undefined && dataRecord.rootcauseMachines.results != undefined && dataRecord.rootcauseMachines.results.length == 0){
					delete dataRecord.rootcauseMachines;
				}
				
				if(dataRecord.associatedProductionEvents != undefined && dataRecord.associatedProductionEvents.results != undefined){
					if(dataRecord.associatedProductionEvents.results.length > 0 ){
						$.each(dataRecord.associatedProductionEvents.results,function(index,obj){
							delete obj.productionEvent;
						});
					}else{
						delete dataRecord.associatedProductionEvents
					}
				}
				
				if(dataRecord.reasonCode != undefined && dataRecord.reasonCode != "")
				{
					this.convertReasonCodeToRcFields(dataRecord);
				}
				
				for (i in dataRecord) {
					if (exclusionList.indexOf(i) != -1 || dataRecord[i] == "") {
						delete dataRecord[i];
					}
				}
			},
			
			convertProductionRunDownRecord : function(downRecord){
				var exclusionList = ["effectiveDurationForStartAndEndTime","descriptionOfDcElement","descriptionOfParameter","descriptionOfMaterial","reasonCode","descriptionOfReasonCode","ioDataAssociatedReasonCodeList","startDateUtc","startTimeUtc","endDateUtc","endTimeUtc","creationTimestamp","changeTimestamp","erpSendTime","hanaSendTime","startDate","endDate","endTime","startTime","timeElementcategory","dataCollectionElementType"];
				 
				
				if(downRecord.associatedProductionEvents != undefined && downRecord.associatedProductionEvents.results != undefined){
					if(downRecord.associatedProductionEvents.results.length > 0 ){
						$.each(downRecord.associatedProductionEvents.results,function(index,obj){
							delete obj.productionEvent;
						});
					}else{
						delete downRecord.associatedProductionEvents
					}
				}
				
				if(downRecord.rootcauseMachines != undefined && downRecord.rootcauseMachines.results != undefined && downRecord.rootcauseMachines.results.length == 0){
						delete downRecord.rootcauseMachines;
				}
				if(downRecord.sharingProductionRuns != undefined && downRecord.sharingProductionRuns.results != undefined && downRecord.sharingProductionRuns.results.length == 0 ){
						delete downRecord.sharingProductionRuns;
				}
				
				if(downRecord.reasonCode != undefined && downRecord.reasonCode != "")
				{
					this.convertReasonCodeToRcFields(downRecord);
				}
				
				for (i in downRecord) {
					if (exclusionList.indexOf(i) != -1 || downRecord[i] == "" || downRecord[i] == undefined ) {
						delete downRecord[i];
					}
				}
			},
			
			convertProductionRunDownRecordWithoutDependencies : function(downRecord){
				var exclusionList = ["effectiveDurationForStartAndEndTime","associatedProductionEvents","rootcauseMachines","sharingProductionRuns","descriptionOfDcElement","descriptionOfParameter","descriptionOfMaterial","reasonCode","descriptionOfReasonCode","ioDataAssociatedReasonCodeList","startDateUtc","startTimeUtc","endDateUtc","endTimeUtc","creationTimestamp","changeTimestamp","erpSendTime","hanaSendTime","startDate","endDate","endTime","startTime","timeElementcategory","dataCollectionElementType","associatedPMNotifications"];
				downRecord.noChangeOfDependencies = true;
				if(downRecord.reasonCode != undefined && downRecord.reasonCode != "")
				{
					this.convertReasonCodeToRcFields(downRecord);
				}
				
				for (i in downRecord) {
					if (exclusionList.indexOf(i) != -1 || downRecord[i] == "" || downRecord[i] == undefined ) {
						delete downRecord[i];
					}
				}
			},
			
			getUrlProgramForActivity : function(urlProgram){
				 if(urlProgram.indexOf("http") !== -1 || urlProgram.indexOf("/XMII/") !== -1){
					if(urlProgram.indexOf("/customActivity/") !== -1){
						
						/*Changes done to enable relative path URL in case of custom activities
						*/
						if(urlProgram.indexOf("http") == -1){
							//urlProgram = document.URL.split("/OEEDashboard/")[0] + urlProgram ;
							urlProgram = window.location.origin + urlProgram ;
						}
						customViewPath = urlProgram.split("/customActivity/")[0] + "/customActivity/";
						jQuery.sap.registerModulePath("customActivity", customViewPath);
						urlProgram = "customActivity." + urlProgram.split("/customActivity/")[1];
					} else {
						urlProgram = undefined;
					}
				}
				return urlProgram;
			},
			
			uomSearch : function(oSearchField,model,binding,properties){
				sap.oee.ui.Utils.fuzzySearch(this,model,oSearchField.getValue(),
						binding,oSearchField,properties,
						[]);
			},
			
			setShiftInformationForApplication : function(shiftJSON,appData,appModel){
				if(shiftJSON == undefined || (shiftJSON != undefined && shiftJSON.shiftDefinition == undefined)){
					appData.shift.description = null;
					 appData.shift.endDate = undefined
					 appData.shift.endTime = undefined
					 appData.shift.endTimestamp = undefined
					 appData.shift.isCurrentShift = undefined
					 appData.shift.shiftGrouping = undefined
					 appData.shift.shiftID = undefined
					 appData.shift.startDate = undefined
					 appData.shift.startTime = undefined
					 appData.shift.startTimestamp = undefined
					 appData.shift.workBreakSchedule = undefined
					return;
			     }
				
				else if(shiftJSON && shiftJSON.shiftDefinition){
					appData.shift.description=shiftJSON.description;
			        appData.shift.startTime=shiftJSON.startTime;
			        appData.shift.endTime=shiftJSON.endTime;
			        appData.shift.startDate=shiftJSON.startDate;
			        appData.shift.endDate=shiftJSON.endDate;
			        appData.shift.workBreakSchedule=shiftJSON.workBreakSchedule;
			        appData.shift.shiftGrouping=shiftJSON.shiftGrouping;
			        appData.shift.shiftID =shiftJSON.shiftDefinition;
			       
			        appData.shift.startTimestamp = parseFloat(shiftJSON.startTimestamp);
			        appData.shift.endTimestamp = parseFloat(shiftJSON.endTimestamp);
			        
			        //Is it the Current Shift?
			        var currentTimestamp = new Date().getTime();
			        appData.shift.isCurrentShift = (currentTimestamp >= appData.shift.startTimestamp &&  currentTimestamp <= appData.shift.endTimestamp);
			        
			        sap.oee.ui.Utils.updateModel(appModel);
				}
			},
			
			getHelpLink : function(activityID){
				var documentID;
				
				switch(activityID){
					case "ACT_ORD":
					case "ACT_ORD_DET": 
						documentID = "/AA/5169549A252257E10000000A44176D";
						break;
					case "ACT_DOWN_LIST":
						documentID = "/8E/936A54DC4B054EE10000000A423F68";
						break;
					case "ACT_SL":
					case "ACT_SL_HR": 
						documentID = "/43/8765546AD62357E10000000A44176D";
						break;
					case "ACT_REP_QTY":
					case "ACT_REP_QTY_HR": 
						documentID = "/97/7A65546AD62357E10000000A44176D";
						break;
					case "ACT_REV_SFT":
					case "ACT_SA_REV_SFT": 
						documentID = "/19/629BA4735C4EE3AE4E05E2F34F07E7";
						break;
					case "ACT_GENERIC":
						documentID = "/ED/876A54DC4B054EE10000000A423F68";
						break;
					default :
						documentID = "/36/0cc523c349497fa1874166e88bfeb2";

						break;
			}
			
				var helpDestinationURL = "help.sap.com/saphelp_mii151sp03/helpdata/";
				
				var oeeHelpLink = "http://"+ helpDestinationURL + sap.ui.getCore().getConfiguration().getLocale().getLanguage() + documentID + "/frameset.htm";
				
				return oeeHelpLink;
			},
			
			getMachineListForCurrentWC : function(bBottleneckDetailsNeeded,dcElement){
				if(bBottleneckDetailsNeeded && dcElement){
					if(!this.machineListForCurrentWC.machineListWithBottleneckInfo[dcElement]){
						this.machineListForCurrentWC.machineListWithBottleneckInfo[dcElement] = this.interfaces.getNodeAndImmediateChildrenDetails(this.appData.node.nodeID,
								this.appData.selected.operationNo, 
								this.appData.selected.material.id,
								this.appData.selected.runID,
								dcElement) || [];
					}
					return this.machineListForCurrentWC.machineListWithBottleneckInfo[dcElement];
				}
				if(this.appData.machineListForCurrentWC == undefined){
					this.appData.machineListForCurrentWC = (this.interfaces.getNodeAndImmediateChildrenDetails(this.appData.node.nodeID, null, null,null,null)) || [];
					this.machineListForCurrentWC.machineList = this.appData.machineListForCurrentWC ;
				}
				else{
					this.machineListForCurrentWC.machineList = this.appData.machineListForCurrentWC ;
				}
				
				return this.machineListForCurrentWC.machineList; //Return machine List by default;
			},
			
			bindMachineList : function(payload){
					try{
						var oList,oSearchField,oMachineTemplate,properties;
						if(payload.sFragmentId && payload.controller && payload.fItemSelect){
							
							if(payload.properties){
								if(payload.properties.length > 3){
									throw "Parameters missing/incorrect for binding Machines";
								}
							}
							
							properties = payload.properties || ["description"];
							
							oList = payload.controller.byId(sap.ui.core.Fragment.createId(payload.sFragmentId,"machineListFragment.machinesList"));
							oSearchField = payload.controller.byId(sap.ui.core.Fragment.createId(payload.sFragmentId,"searchMachineList"));
							
							var oMachineData = payload.data;
							if(!oMachineData){ // Then Retrieve Machine List for current WC
								if(payload.markBottleneck && payload.dcElementForBottleneck){
									oMachineData = this.getMachineListForCurrentWC(true,payload.dcElementForBottleneck);
								}else{
									oMachineData = this.getMachineListForCurrentWC(); // Fill only machine list if any of the params missing
								}
								
								if(oMachineData.details && oMachineData.details.results){
									oMachineData = oMachineData.details.results;
								}
							}
							
							oMachineTemplate = payload.template; // Read Template;
							
							
							var setItemSelected = function(){
								var itemList = oList.getItems();
								if(itemList && itemList.length){
									oList.setSelectedItem(itemList[0]);
									oList.fireSelectionChange({listItem : itemList[0], selected : true});
								}
							};
							
							oList.attachSelectionChange(payload.fItemSelect,payload.controller);
							oList.attachUpdateFinished(setItemSelected);
							
							var oMachineModel = new sap.ui.model.json.JSONModel({machineList : oMachineData});
							
							var searchTriggered = function(oEvent){
								sap.oee.ui.Utils.fuzzySearch(null,oMachineModel,oEvent.getSource().getValue(),
										oList.getBinding("items"),oEvent.getSource(),properties);
							};
							
							oSearchField.attachSearch(searchTriggered).attachLiveChange(searchTriggered);
							
							var bottleNeckFormatter = function(obj){
								return obj && payload.markBottleneck;
							};
							
							if(!oMachineTemplate){
								oMachineTemplate = new sap.m.ObjectListItem({ 
									type : "Active",press : [payload.fItemSelect,payload.controller],
									markFlagged : {path : "bottleNeck",formatter : bottleNeckFormatter}, showMarkers: true
								});
								
								for(var i=0;i < properties.length; i++){
									switch(i){
										case 0 : 
											oMachineTemplate.bindProperty("title",properties[i]);
											break;
										case 1 :
											oMachineTemplate.bindProperty("number",properties[i]);
											break;
										case 2 :
											oMachineTemplate.bindProperty("numberUnit",properties[i]);
											break;
									}
								}
							}
							
							oList.bindItems("/machineList",oMachineTemplate);
							oList.setModel(oMachineModel);
						}else{
							throw "Parameters missing/incorrect for binding Machines";
						}
				}catch(e){
					sap.oee.ui.Utils.createMessage(e,sap.ui.core.MessageType.Error);
				}
			},
			
			debounceCall : function(context,func,wait,executeNow){
				var delay = null;
				return function(){
					var args = arguments,context = this;
					clearTimeout(delay);
					
					var invokeLater = function(){
						delay = null;
						if(!executeNow){
							func.apply(context,args);
						}
					};

					var callNow = !delay && executeNow;
					delay = setTimeout(invokeLater,wait);
					
					if(callNow){
						func.apply(context,args);
					}
				};
			},
			
			bindMasterForConfigurationScreens : function(controller,sItemSelect,sSelectClientAndPlant,type,sFragmentId,header,model,properties,sHelpLink,errorMessage,buttons,searchFields) {
				try {
					var node,template,selectedNode,selected,map;
					var masterModel,listStatus,menuButton,userButton,setItemSelected,searchItem;
					if (controller && sItemSelect && type && sFragmentId && sSelectClientAndPlant && sHelpLink) {
							var oShell = controller.byId(sap.ui.core.Fragment.createId(sFragmentId, "oeeShell"));
							var masterpage = controller.byId(sap.ui.core.Fragment.createId(sFragmentId, "masterPage"));
							var oSearchField = controller.byId(sap.ui.core.Fragment.createId(sFragmentId, "searchList"));
							var headerBar = controller.byId(sap.ui.core.Fragment.createId(sFragmentId, "headerBar"));
							var footerBar = controller.byId(sap.ui.core.Fragment.createId(sFragmentId, "footerBar"));
							if(model){
								 masterModel = model;
							}
							masterpage.setTitle(header);
						// create the master Page structure 
							if(controller.noDataFound && type === sap.oee.ui.oeeConstants.configurationScreenMasterPageControlType.TREE){
								node = new sap.m.Text({text:errorMessage}).addStyleClass("sapUiTinyMargin");
							}else{
								if (type === sap.oee.ui.oeeConstants.configurationScreenMasterPageControlType.TREE) {
									footerBar.setVisible(false);
									node = new sap.ui.commons.Tree({showHeaderIcons:false,showHeader:false,selectionMode:"Single"});
									template = new sap.ui.commons.TreeNode();
									template.setExpanded(true);
									template.addStyleClass("sapUiSmallMarginBottom");
									template.bindProperty("text", properties.description);
									template.addCustomData(new sap.ui.core.CustomData({key : 'isWorkUnit', value : '{isWorkUnit}'}));
									node.bindAggregation("nodes", "/root",template);
									node.attachSelect(sItemSelect, controller); 
									searchItem = "nodes";
								}else if(type ===  sap.oee.ui.oeeConstants.configurationScreenMasterPageControlType.LIST){
									if(buttons){
										footerBar.removeAllContentRight();
										for(var i =0;i<buttons.length;i++){
											footerBar.addContentRight(buttons[i]);
										}
									}
									node = new sap.m.List({mode:"SingleSelectMaster",noDataText:errorMessage});
									if(properties.firstStatus){
										listStatus = new sap.m.ObjectStatus();
									}
									if(properties.secondStatus){
										listSecondStatus = new sap.m.ObjectStatus();
									}
									template =  new sap.m.ObjectListItem({ 
										type : "Active",press:[sItemSelect,controller] });
									for(var keys in properties){
										switch(keys){
										case "description" : 
											if(properties.hasOwnProperty("type") && properties.type === "order"){
												 template.bindProperty("title",{path:properties.description,formatter:sap.oee.ui.Formatter.formatRemoveLeadingZero});
											}else{
												  template.bindProperty("title",properties.description);
											}
											break;
										case "number" :
											template.bindProperty("number",properties.number);
											break;
										case "numberUnit" :
											template.bindProperty("numberUnit",properties.numberUnit);
											break;
										case "firstStatus":
											listStatus.bindProperty("text",properties.firstStatus);
											template.setFirstStatus(listStatus);
											break;
										case "secondStatus":
											if(properties.hasOwnProperty("type") && properties.type === "order"){
												listSecondStatus.bindProperty("text",{path:properties.secondStatus,formatter:sap.oee.ui.Formatter.formatDate});
												template.setSecondStatus(listSecondStatus);
											}
											break;
										}
									}
									
									node.bindItems("/root",template);
									node.attachSelectionChange(sItemSelect,controller);
									searchItem = "items";
								}
								if(searchFields){
									if(searchFields.field1){
										properties.field1 = searchFields.field1
									}
									if(searchFields.field2){
										properties.field2 = searchFields.field2
									}
								}
								var searchTriggered = function(oEvent){
									sap.oee.ui.Utils.fuzzySearch(null,masterModel,oEvent.getSource().getValue(),
											node.getBinding(searchItem),oEvent.getSource(),properties);
									if(searchItem === "nodes" && controller.selectedMasterNode && oEvent.getSource().getValue() === ""){
										selectedNode = node;
										for(index=0;index<controller.selectedMasterNode.length;index++){
											selected = parseFloat(controller.selectedMasterNode[index]);
											selectedNode = selectedNode.getNodes()[selected];
										}
										map = {};
										map.node = selectedNode;
										map["node"].setIsSelected(true);
									}
								};
								
								oSearchField.attachSearch(searchTriggered).attachLiveChange(searchTriggered);
								masterModel.setSizeLimit(10000); // since the data(plant hierarchy) is in the nested form so we can't get its length , so we have set its default value as 10000
								node.setModel(masterModel);
								//Select the first node of tree
								if (node.getNodes) {
									var treeNodes = node.getNodes();
									map ={};
									map.node = treeNodes[0];
									map["node"].setIsSelected(true);
									node.fireSelect(map);
								} 
								
								//Select the first list of list
								if(node.getItems){
									var itemList = node.getItems();
									if(itemList && itemList.length){
										node.setSelectedItem(itemList[0]);
										node.fireSelectionChange({listItem : itemList[0], selected : true});
									}
								}
							}
							
							masterpage.removeAllContent()
							masterpage.addContent(node);
							
							// shell details
							
							menuButton = controller.byId(sap.ui.core.Fragment.createId(	sFragmentId, "shellPane"));
							menuButton.attachPress(this.showMaster.bind(this,oShell));
							
							userButton = controller.byId(sap.ui.core.Fragment.createId(sFragmentId, "iduser"));
							userButton.attachPress(this.openUser.bind(this,controller,sSelectClientAndPlant,sHelpLink));
							return node;
						}
				
				}catch(e){
					sap.oee.ui.Utils.createMessage(e.message,sap.ui.core.MessageType.Error);
				}

			},
			
			showMaster: function(shell){
				var bState = shell.getShowPane();
				shell.setShowPane(!bState);
			},
			
			openUser: function(){
				var controller = arguments[0];
				var sSelectClientAndPlant = arguments[1];
				var sHelpLink = arguments[2];
				var oEvent = arguments[3];
				var that = this;
				var oBtn = oEvent.getSource();
				var oPopover =new sap.m.ActionSheet({
						buttons:[new sap.m.Button({text:controller.oBundle.getText("OEE_BTN_CHANGE_CLIENT_AND_PLANT"),icon:"sap-icon://action-settings",press:that.onChangeClientAndPlant.bind(that,controller,sSelectClientAndPlant)}),
								new sap.m.Button({text:controller.oBundle.getText("OEE_HYPERLINK_HELP"),icon:"sap-icon://sys-help",press:that.helpLink.bind(that,sHelpLink)}),
								new sap.m.Button({text:controller.oBundle.getText("OEE_LOGOUT_BTN"),icon:"sap-icon://log",press:that.logoutUser.bind(that,controller)})]
				});
				if(controller.getView().sViewName !== "" && controller.getView().sViewName !== undefined){
					if(controller.getView().sViewName === "sap.oee.m.configuration.ActivityConfigurations"){
						oPopover.addButton(new sap.m.Button({ text : controller.oBundle.getText("OEE_BUTTON_COPY_ALL_ACTIVITIES") , icon:"sap-icon://duplicate",press:controller.onPressCopyActivities.bind(that,controller)}));
					}else if(controller.getView().sViewName === "sap.oee.m.configuration.PODConfigurations"){						
						oPopover.addButton(new sap.m.Button({ text : controller.oBundle.getText("OEE_BUTTON_COPY_ALL_PODS") , icon : "sap-icon://duplicate" , press:controller.onCopyPOD.bind(that,controller)}));
					}else if(controller.getView().sViewName === "sap.oee.m.configuration.OrderStatusMaster"){
						oPopover.addButton(new sap.m.Button({text : controller.oBundle.getText("OEE_BUTTON_COPY_ALL_ORDER_STATUS"), icon:"sap-icon://duplicate" , press : controller.onPressCopyOrderStatus.bind(that,controller)}));
					}
				}
				oPopover.openBy(oBtn);
			},
			
			onChangeClientAndPlant: function(){
				var controller = arguments[0];
				var sSelectClientAndPlant = arguments[1];
				var that = this;
				var i18nModel = controller.i18nModel;
				var data = controller.interfaces.interfacesGetAllSupportedClientAndPlant();
				if(!this.clientPlantDialog){
					this.clientPlantDialog = new sap.m.Dialog({title:controller.oBundle.getText("OEE_LABEL_SELECT_CLIENTPLANT")});
					if(!dialogModel){
						var dialogModel = new sap.ui.model.json.JSONModel();
					}
					dialogModel.setData({root:data.details.results});
					var oList = new sap.m.List({mode:"SingleSelectMaster",itemPress: that.onSelectClientAndPlant.bind(that,controller,sSelectClientAndPlant)});
					var listItem =  new sap.m.StandardListItem({ 
									type : "Active",
									title:"{parts:[{path:'i18n>OEE_LABEL_CLIENT'},{path:'i18n>OEE_LABEL_PLANT'},{path:'client'},{path:'plant'}],									formatter:'sap.oee.ui.Formatter.formatClientAndPlant'}"});
					oList.bindItems("/root",listItem);
					this.clientPlantDialog.setModel(dialogModel);
					this.clientPlantDialog.setModel(i18nModel,'i18n');
					this.clientPlantDialog.addContent(oList);
					this.clientPlantDialog.addButton(new sap.m.Button({text:controller.oBundle.getText("OEE_BTN_CANCEL"),press:that.closeclientPlantDialog.bind(that)}));
				}
				this.clientPlantDialog.open();
			},
			
			closeclientPlantDialog: function(){
				this.clientPlantDialog.close();
			}, 
			
			onSelectClientAndPlant : function(){
				var controller = arguments[0];
				var sSelectClientAndPlant = arguments[1];
				var oEvent  = arguments[2];
				sSelectClientAndPlant.call(controller,oEvent);
				this.closeclientPlantDialog();
			},
			
			helpLink : function(){
				var documentID = arguments[0];
				var helpDestinationURL = "help.sap.com/saphelp_mii151sp03/helpdata/";
				var oeeHelpLink = "http://"+ helpDestinationURL + sap.ui.getCore().getConfiguration().getLocale().getLanguage() + documentID + "/frameset.htm";
				if(oeeHelpLink){
					window.open(oeeHelpLink);
				}
			},
			
			logoutUser: function(){
				var controller = arguments[0];
				controller.interfaces.interfacesLogout();
			},
			
			buildPerformanceStripNew: function(oController,performanceDetailJSON,downtimeDetailModel,downtimeDetailsDialog,offset){
				var that=this,currentTime,currentTimeBasedOnPlantZone;
				var available=[],scheduled=[],unscheduled=[],shiftBrks=[];
				currentTime = new Date().getTime();
				currentTimeBasedOnPlantZone = this.getPlantTimezoneTime(currentTime,offset);		
				var downtimeEntries = performanceDetailJSON.ioDowntimeList.results;
				this.removeDurationBasedDowntime(downtimeEntries);
				var lineDowns = this.getDowntimesFromLineDown(downtimeEntries);
				var shiftBreaks=this.getShiftBreaks(performanceDetailJSON);
				if(shiftBreaks && shiftBreaks.length > 0){
					lineDowns[sap.oee.ui.oeeConstants.dtTypes.SHIFTBREAKS]= shiftBreaks;
				}
				var performanceData = this.preparePerformanceData(lineDowns,performanceDetailJSON);
				
				performanceData = this.prepareDataToBePlottedOnAvailabilityStrip(performanceData);
				
				performanceData.sort(function(elem1,elem2){
					if(elem1.startTimestamp<elem2.startTimestamp){
						return -1;
					}else{
						return 1;
					}
				});
				performanceData.reverse();
				if(performanceData && performanceData.length > 0){
						performanceData.forEach(that.updateResults.bind(that,available,scheduled,unscheduled,shiftBrks));
						var performanceChart=this.createPerformanceChart(performanceData,available,scheduled,unscheduled,shiftBrks,performanceDetailJSON,downtimeDetailModel,downtimeDetailsDialog,offset);
						return performanceChart;
				}
			},
			
			prepareDataToBePlottedOnAvailabilityStrip : function(performanceData){
				var availableIntervals =[],eventObject={},eventAffectingWorkcenter=[], performaceDataNew = [];
				var modifiedObject, count, index,indexOverlapingIntervals, oController = this;
				
				/*Flow of how data is built : 
				 * - Get Available interval from the performance data
				 * - Check if particular event(shift break, flowtime, changeover, downtimes) lies in available interval and how any intervals are affected by event
				 * - Adjust available interval and event times if required
				 * 
				 * - numberOfAvailableIntervalsEventIsAffecting method is used to check number of intervals affected by particular event getting considered
				 *  Suppose available intervals are from 13:00 - 14:00 and 15:00-16:00 and event getting processed is from 13:30 to 15:30.
				 *  This event if affecting two intervals and both needs to be adjusted.
				 */
				
				
				// Loop over all event objects to prepare data bsed on different types
				for(index=0 ; index < performanceData.length; index++){
					var type = performanceData[index].eventType;
					if(!eventObject.hasOwnProperty(type)){
						eventObject[type] = [];
					}
					
					eventObject[type].push(performanceData[index]);
				}
				
				// Available Intervals data object
				if(eventObject.hasOwnProperty(this.appComponent.oBundle.getText("OEE_LABEL_AVAILABLE"))){
					availableIntervals = eventObject[this.appComponent.oBundle.getText("OEE_LABEL_AVAILABLE")];
				}
				
				//Shift Breaks data object
				if(eventObject.hasOwnProperty(this.appComponent.oBundle.getText("OEE_LABEL_SHIFT_BRKS"))){
					eventAffectingWorkcenter = eventObject[this.appComponent.oBundle.getText("OEE_LABEL_SHIFT_BRKS")];
					adjustIntervalsAndEventObject(eventAffectingWorkcenter);
				}

				//Flow time data object
				if(eventObject.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.flowTime)){
					eventAffectingWorkcenter = eventObject[sap.oee.ui.oeeConstants.timeElementTypes.flowTime];
					adjustIntervalsAndEventObject(eventAffectingWorkcenter);
				}
				
				//Changeover data object
				if(eventObject.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.changeOver)){
					eventAffectingWorkcenter = eventObject[sap.oee.ui.oeeConstants.timeElementTypes.changeOver];
					adjustIntervalsAndEventObject(eventAffectingWorkcenter);
				}
				
				//Scheduled downtime object
				if(eventObject.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown)){
					eventAffectingWorkcenter = eventObject[sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown];
					adjustIntervalsAndEventObject(eventAffectingWorkcenter);
				}
				
				//Unscheduled downtime object
				if(eventObject.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown)){
					eventAffectingWorkcenter = eventObject[sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown];
					adjustIntervalsAndEventObject(eventAffectingWorkcenter);
				}
				
				function adjustIntervalsAndEventObject(eventAffectingWorkcenter){
					count = 0 , indexOverlapingIntervals = 0;
					for(index=0; index<eventAffectingWorkcenter.length; index++){
						count = oController.numberOfAvailableIntervalsEventIsAffecting(availableIntervals, eventAffectingWorkcenter[index]);
						for(indexOverlapingIntervals=0; indexOverlapingIntervals < count; indexOverlapingIntervals ++ ){
							modifiedObject = oController.adjustAvailableIntervals(availableIntervals, eventAffectingWorkcenter[index]);
							if(modifiedObject.newAvailableIntervals && modifiedObject.eventObject){
								availableIntervals = modifiedObject.newAvailableIntervals;
								performaceDataNew.push(modifiedObject.eventObject);
							}
						}
					}
				}
				
				// Push all available intervals in performace new array which is final processed array
				$.each(availableIntervals, function(intervalIndex, newAvailableInterval){
					performaceDataNew.push(newAvailableInterval);
				});
				
				return performaceDataNew;
			},
			
			numberOfAvailableIntervalsEventIsAffecting: function(availableInterval, eventObject){
				var index; affectedIntervals =[];
				
				// Sort available intervals as per start time stamp
				availableInterval.sort(function(elem1,elem2){
					if(elem1.startTimestamp<elem2.startTimestamp){
						return -1;
					}else{
						return 1;
					}
				});

				for(index = 0; index < availableInterval.length; index ++){
					if(eventObject.startTimestamp >= availableInterval[index].startTimestamp 
							&&  eventObject.startTimestamp <= availableInterval[index].endTimestamp){
						if(checkIfEntryAlreadyExsists(affectedIntervals, availableInterval[index])){
							affectedIntervals.push(availableInterval[index]);
						}
					}

					if(eventObject.endTimestamp >= availableInterval[index].startTimestamp 
							&&  eventObject.endTimestamp <= availableInterval[index].endTimestamp){
						if(checkIfEntryAlreadyExsists(affectedIntervals, availableInterval[index])){
							affectedIntervals.push(availableInterval[index]);
						}
					}
				}
				
				return (affectedIntervals.length);
				
				function checkIfEntryAlreadyExsists(affectedIntervalsList, availableInterval){
					var index;
					if(affectedIntervalsList.length > 0){
						for(index = 0; index < affectedIntervalsList.length; index ++){
							if(affectedIntervalsList[index].downtimeType === availableInterval.downtimeType){
								return false;
							}else{
								return true;
							}
						}
					}else{
						return true;
					}
				}
				
			},
			
			/*
			 * Adjust available intervals based on the event start and end timestamp
			 * Check if event overlaps with the interval start timestamp, end time stamp or both.
			 * Adjust the available intervals accordingly and also adjust the event object to be plotted on availability strip
			 * 
			 */
			adjustAvailableIntervals: function(availableIntervals, eventObject){
				var modifiedObjectAfterAdjustment = {}, oController = this,newAvailableIntervals = [], matchedIndex, newObjectToBeAdjusted;
				var eventObjectToBePlotted = Object.create(eventObject);
				$.each(availableIntervals,function(indexInterval, eachInterval){
					// If eventObject lies in between the available intervals
					if(eventObject.startTimestamp >= eachInterval.startTimestamp && eventObject.endTimestamp <= eachInterval.endTimestamp){
						newAvailableIntervals.push(oController.createNewAvailableIntervalWithTimestamps(eachInterval.startTimestamp, eventObject.startTimestamp));
						newAvailableIntervals.push(oController.createNewAvailableIntervalWithTimestamps(eventObject.endTimestamp, eachInterval.endTimestamp));
						matchedIndex = indexInterval;
						return false;
					}

					// If eventObject overlaps with available interval start time stamp
					if(eventObject.startTimestamp < eachInterval.startTimestamp && eventObject.endTimestamp <= eachInterval.endTimestamp
							&& eventObject.endTimestamp > eachInterval.startTimestamp){
						newAvailableIntervals.push(oController.createNewAvailableIntervalWithTimestamps(eventObject.endTimestamp, eachInterval.endTimestamp));
						matchedIndex = indexInterval;
						eventObjectToBePlotted.startTimestamp = eachInterval.startTimestamp;
						eventObjectToBePlotted.endTimestamp = eventObject.endTimestamp;
						eventObjectToBePlotted.downtimeType = eventObject.eventType + oController.counter;
						oController.counter++;

						// Modify actual event object for next comparison in case of overlap with other intervals
						eventObject.endTimestamp = eachInterval.startTimestamp;
						eventObject.duration = (eventObject.endTimestamp - eventObject.startTimestamp)/(60*1000);
						return false;
					}

					// If eventObject overlaps with available interval end time stamp
					if(eventObject.startTimestamp >= eachInterval.startTimestamp && eventObject.endTimestamp > eachInterval.endTimestamp
							&& eventObject.startTimestamp < eachInterval.endTimestamp){
						newAvailableIntervals.push(oController.createNewAvailableIntervalWithTimestamps(eachInterval.startTimestamp, eventObject.startTimestamp));
						matchedIndex = indexInterval;
						eventObjectToBePlotted.startTimestamp = eventObject.startTimestamp;
						eventObjectToBePlotted.endTimestamp = eachInterval.endTimestamp;
						eventObjectToBePlotted.downtimeType = eventObject.eventType + oController.counter;
						oController.counter++;

						// Modify actual event object for next comparison in case of overlap with other intervals
						eventObject.startTimestamp = eachInterval.endTimestamp;
						eventObject.duration = (eventObject.endTimestamp - eventObject.startTimestamp)/(60*1000);
						return false;
					}

					// If eventObject overlaps with both start and end time stamp of intervals
					if(eventObject.startTimestamp < eachInterval.startTimestamp && eventObject.endTimestamp > eachInterval.endTimestamp){
						matchedIndex = indexInterval;
						eventObjectToBePlotted.startTimestamp = eachInterval.startTimestamp;
						eventObjectToBePlotted.endTimestamp = eachInterval.endTimestamp;
						return false;
					}
				});	

				if(matchedIndex != undefined){
					// Remove the old available interval from array and add modified object
					availableIntervals.splice(matchedIndex,1);

					// adjust duration of new available intervals
					$.each(newAvailableIntervals, function(eachIntervalIndex, eachInterval){
						eachInterval.duration = (eachInterval.endTimestamp - eachInterval.startTimestamp)/(60*1000);
					});

					// adjust event object duration if intervals are changed/adjusted
					eventObjectToBePlotted.duration = (eventObjectToBePlotted.endTimestamp - eventObjectToBePlotted.startTimestamp)/(60*1000);

					newAvailableIntervals = this.updateAvailableIntervals(availableIntervals,newAvailableIntervals);
					availableIntervals = newAvailableIntervals;
					modifiedObjectAfterAdjustment.newAvailableIntervals = newAvailableIntervals;
					modifiedObjectAfterAdjustment.eventObject = eventObjectToBePlotted;
				}
				return modifiedObjectAfterAdjustment;
			},
			
			createNewAvailableIntervalWithTimestamps: function(startTimestamp, endTimestamp){
				intervalObject={};
				intervalObject.startTimestamp = startTimestamp;
				intervalObject.endTimestamp = endTimestamp;
				intervalObject.duration = (intervalObject.endTimestamp - intervalObject.startTimestamp)/(1000*60);
				intervalObject.eventType = this.appComponent.oBundle.getText("OEE_LABEL_AVAILABLE");;
				intervalObject.downtimeType = intervalObject.eventType+this.counter;
				intervalObject.color = sap.oee.ui.oeeConstants.stripColor.AVAILABLE;
				this.counter++;
				
				return intervalObject;
			},
			
			updateAvailableIntervals : function(previousInterval, modifiedInterval){
				var index;
				for(index = 0; index < modifiedInterval.length; index++){
					previousInterval.push(modifiedInterval[index]);
				}
				
				return previousInterval;
			},
			
			removeDurationBasedDowntime: function(downtimeEntries){
				var index;
				if(downtimeEntries && downtimeEntries.length > 0){
					for(index=0;index<downtimeEntries.length;index++){
						if(downtimeEntries[index].ioProductionRunDowntime.entryType !== sap.oee.ui.oeeConstants.downtimeEntry.START_END_MANUAL &&
						downtimeEntries[index].ioProductionRunDowntime.entryType !== sap.oee.ui.oeeConstants.downtimeEntry.START_END_AUTO){
							downtimeEntries.splice(index,1);
							index--;
						}
					}
				}
			},
			
			getDowntimesFromLineDown: function(downtimeEntries){
				var lineDowns={},downtimeType,index;
				if(downtimeEntries && downtimeEntries.length > 0){
					for(index=0;index<downtimeEntries.length;index++){
						downtimeType = downtimeEntries[index].ioProductionRunDowntime.eventType;
						if(!lineDowns.hasOwnProperty(downtimeType)){
							lineDowns[downtimeType] = [];
						}
						this.createLineDownsData(downtimeEntries[index],lineDowns);
					}
				}
				return lineDowns;
			},
			
			createLineDownsData: function(data,lineDowns){
				var obj={};
				obj.changeTimestamp = data.ioProductionRunDowntime.changeTimestamp;
				obj.changedBy = data.ioProductionRunDowntime.changedBy;
				obj.client = data.ioProductionRunDowntime.client;
				obj.comments = data.ioProductionRunDowntime.comments;
				obj.crewSize = data.ioProductionRunDowntime.crewSize;
				obj.descriptionOfReasonCode = data.ioProductionRunDowntime.descriptionOfReasonCode;
				obj.eventType = data.ioProductionRunDowntime.eventType;
				obj.frequency = data.ioProductionRunDowntime.frequency;
				obj.material = data.ioProductionRunDowntime.material;
				obj.multiplier = data.ioProductionRunDowntime.multiplier;
				obj.nodeDescription = data.ioProductionRunDowntime.nodeDescription;
				obj.nodeID = data.ioProductionRunDowntime.nodeID;
				obj.plant = data.ioProductionRunDowntime.plant;
				obj.standardDuration = data.ioProductionRunDowntime.standardDuration;
				obj.toMaterial = data.ioProductionRunDowntime.toMaterial;
				obj.orderReferences = data.orderReferences.results;
				obj.isBottleneckMachineDown = data.isBottleneckMachineDown;
				obj.isLineDown = data.isLineDown;
				lineDowns[data.ioProductionRunDowntime.eventType].push(obj);
			},
			
			getShiftBreaks: function(performanceDetailJSON){
				var nodeDetails = this.interfaces.getPHNodeDetails(this.appData.client,this.appData.plant,this.appData.node.nodeID);
				var shiftBreaks,aggregatedJSONData;
				if(shiftBreaks == undefined){
					return;
				}
				if(nodeDetails.useShiftBreaks===sap.oee.ui.oeeConstants.isStandard){
					aggregatedJSONData = this.interfaces.getShiftBreaks(this.appData.client,this.appData.plant,nodeDetails.capacityID,nodeDetails.workcenterID,
							performanceDetailJSON.startTimestamp,performanceDetailJSON.endTimestamp);
					shiftBreaks = aggregatedJSONData.breakSchedules.results;
				}
				return shiftBreaks;
			},
			
			sortDowntimeBasedOnLines: function(dwn1,dwn2){
				if(dwn1.isLineDown){
					return -1;
				}else{
					return 1;
				}
			},
			
			checkLineBehaviour : function(data){
				var index,downtimes,indexWithMaxCount = 0,lengthOfObject, orderReferenceObjectIndex;
				var lineBehaviorCustomization = this.interfaces.getAllCustomizationValuesForNode(this.appData.client,this.appData.plant,this.appData.node.nodeID,sap.oee.ui.oeeConstants.customizationNames.lineBehavior);
				var lineBehavior = lineBehaviorCustomization.customizationValues.results[0].value;
				data.sort(this.sortDowntimeBasedOnLines.bind(this));
				if(lineBehavior === sap.oee.ui.oeeConstants.parallelLineBehaviourConstant){
					// check for the bottleNeck machine , if found save the information in downtime variable and remove the same from the array
					/*
					Check for object with maximum count as in case of parallel bottleneck, all objects will have same data in case of intervals
					affecting workcenters.
					 */
					if(data && data.length > 0){
						for(index=0;index<data.length;index++){
							if(data[index].isBottleneckMachineDown){
								/*
								Loop over order index as well because if downtime is attached to particular order, only that downtime needs
								to be shown on availability strip
								 */

								// To find object with order reference. This is required only in first iteration of each element in "data" array
								for(var orderIndex = 0; orderIndex < data[index].orderReferences.length; orderIndex++){
									if(data[index].orderReferences[orderIndex].downIntervalsAffectingWorkcenter.results.length > 0){
										orderReferenceObjectIndex = orderIndex;
										break;
									}
								}

								if(index == 0){
									lengthOfObject = data[index].orderReferences[orderReferenceObjectIndex].downIntervalsAffectingWorkcenter.results.length;
									indexWithMaxCount = index;
									continue;
								}

								if(data[index].orderReferences[orderReferenceObjectIndex].downIntervalsAffectingWorkcenter.results.length > lengthOfObject){
									indexWithMaxCount = index; 
								}
							}
						}
						downtimes = data[indexWithMaxCount];
						data.splice(indexWithMaxCount,1);
					}

					// since all bottleNeck machines will contain same overlapping data remove other machines as well
					if(data && data.length > 0){
						for(index=0;index<data.length;index++){
							if(data[index].isBottleneckMachineDown){
								downtimes.nodeDescription = downtimes.nodeDescription+" , "+data[index].nodeDescription;
								data.splice(index,1);
								index--;
							}
						}
					}
					if(downtimes){
						data.push(downtimes);
					}
				}
				return data;
			},
			
			
			preparePerformanceData : function(lineDowns,performanceDetailJSON){
				var intervals = [],intervalObject={},downtimeData=[],data,intervalsAndDowntime,returnedLists;
				this.counter =0;
				intervalObject.startTimestamp = performanceDetailJSON.startTimestamp;
				intervalObject.endTimestamp =  performanceDetailJSON.endTimestamp;
				intervalObject.duration = (intervalObject.endTimestamp - intervalObject.startTimestamp)/(1000*60);
				intervalObject.eventType = this.appComponent.oBundle.getText("OEE_LABEL_AVAILABLE");
				intervalObject.downtimeType = intervalObject.eventType;
				intervalObject.color = sap.oee.ui.oeeConstants.stripColor.AVAILABLE;
				intervals.push(intervalObject);
				if(lineDowns && Object.keys(lineDowns).length > 0){
					if(lineDowns.hasOwnProperty(sap.oee.ui.oeeConstants.dtTypes.SHIFTBREAKS)){
						data = lineDowns[sap.oee.ui.oeeConstants.dtTypes.SHIFTBREAKS];
						if(data.length > 0){
							data.sort(this.sortDowntimeBasedOnLines.bind(this));
							intervalsAndDowntime = this.prepareShiftBreaks(intervals,data);
							downtimeData = downtimeData.concat(intervalsAndDowntime.downtimeData);
						}
					}
					if(lineDowns.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.flowTime)){
						data = lineDowns[sap.oee.ui.oeeConstants.timeElementTypes.flowTime];
						if(data.length > 0){
							data.sort(this.sortDowntimeBasedOnLines.bind(this));
							returnedLists = this.getScheduledAndUnscheduledDowntimes(data,intervals,true);
							downtimeData = downtimeData.concat(returnedLists.downtimeData);
						}
					}
					if(lineDowns.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.changeOver)){
						data = lineDowns[sap.oee.ui.oeeConstants.timeElementTypes.changeOver];
						if(data.length > 0){
							data = this.checkLineBehaviour(data);
							returnedLists = this.getScheduledAndUnscheduledDowntimes(data,intervals,true);
							downtimeData = downtimeData.concat(returnedLists.downtimeData);
						}
					}
					if(lineDowns.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown)){
						data = lineDowns[sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown];
						if(data.length > 0){
							data = this.checkLineBehaviour(data);
							returnedLists = this.getScheduledAndUnscheduledDowntimes(data,intervals,true);
							downtimeData = downtimeData.concat(returnedLists.downtimeData);
						}
					}
					if(lineDowns.hasOwnProperty(sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown)){
						data = lineDowns[sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown];
						if(data.length > 0){
							data = this.checkLineBehaviour(data);
							returnedLists = this.getScheduledAndUnscheduledDowntimes(data,intervals,false);
							downtimeData = downtimeData.concat(returnedLists.downtimeData);
						}
					}
				}
				downtimeData = downtimeData.concat(intervals);
				return downtimeData;
			},
			
			getScheduledAndUnscheduledDowntimes: function(data,intervals,isScheduled){
				var index,downtimeLists=[],downtimeData=[],returnedDowntimes;
				if(data && data.length > 0){
					for(index=0;index<data.length;index++){
						returnedDowntimes = this.createDowntimeData(data[index],intervals,isScheduled);
						downtimeLists = downtimeLists.concat(returnedDowntimes);
					}
				}
				downtimeData = downtimeData.concat(downtimeLists);
				
				return {downtimeData:downtimeData};
			},
			
			// prepare data for shift breaks 
			prepareShiftBreaks: function(intervals,data){
				var index,downtimeData=[];
				if(data && intervals && data.length > 0 && intervals.length > 0){
					for(index=0;index<data.length;index++){
						downtimeObject={};
						downtimeObject.startTimestamp = parseFloat(data[index].breakStartTimestamp);
						downtimeObject.endTimestamp = parseFloat(data[index].breakEndTimestamp);
						downtimeObject.duration = data[index].breakLengthInSeconds/60;
						downtimeObject.eventType = this.appComponent.oBundle.getText("OEE_LABEL_SHIFT_BRKS");
						downtimeObject.downtimeType = downtimeObject.eventType+index;
						downtimeObject.color = sap.oee.ui.oeeConstants.stripColor.SFT_BRKS;
						downtimeData.push(downtimeObject);
					}
				}
				return {downtimeData:downtimeData};
			},
			
			// prepare data for scheduled, flowtime, changeover and unscheduled downtime
			createDowntimeData: function(data,intervals,isScheduled){
				var index,downtimeAffectingLines = [],downtimeData=[], downtimeObject={};
				var orderReference = data.orderReferences;
				var color = (isScheduled)?sap.oee.ui.oeeConstants.stripColor.SCHD:sap.oee.ui.oeeConstants.stripColor.UNSCHD;
				if(orderReference && intervals && orderReference.length > 0 && intervals.length>0){
					for(index=0;index<orderReference.length;index++){
						downtimeObject = orderReference[index].downIntervalsAffectingWorkcenter.results;
						$.each(downtimeObject, function(objectIndex, object){
							downtimeAffectingLines.push(object);
						});
					}
				}
				/*if(orderReference && orderReference.length > 0){
					for(index=0;index<orderReference.length;index++){
						if(orderReference[index].orderNumber ===this.appData.selected.order.orderNo &&
						orderReference[index].operationNumber === this.appData.selected.operationNo){
							downtimeObject = orderReference[index].downIntervalsAffectingWorkcenter.results;
							$.each(downtimeObject, function(objectIndex, object){
								downtimeAffectingLines.push(object);
							});
						}
					}
				}*/
			
				if(downtimeAffectingLines &&  intervals && downtimeAffectingLines.length > 0 && intervals.length > 0){
					for(index=0;index<downtimeAffectingLines.length;index++){
								var downtimeObject ={};
								downtimeObject.startTimestamp = parseFloat(downtimeAffectingLines[index].startTimestamp);
								downtimeObject.endTimestamp = parseFloat(downtimeAffectingLines[index].endTimestamp);
								downtimeObject.duration = parseFloat(downtimeAffectingLines[index].durationInMs)/(1000*60);
								downtimeObject.eventType = data.eventType;
								downtimeObject.downtimeType = downtimeObject.eventType+this.counter;
								downtimeObject.color = color;
								downtimeObject.changeTimestamp = data.changeTimestamp;
								downtimeObject.changedBy = data.changedBy;
								downtimeObject.comments = data.comments;
								downtimeObject.crewSize = data.crewSize;
								downtimeObject.frequency = data.frequency;
								downtimeObject.fromMaterial = data.material;
								downtimeObject.toMaterial = data.toMaterial;
								downtimeObject.multiplier = data.multiplier;
								downtimeObject.standardDuration = data.standardDuration;
								downtimeObject.nodeDescription = data.nodeDescription;
								downtimeData.push(downtimeObject);
								this.counter++;
					}
				}
				return downtimeData;
			},
			
			updateResults: function(){
				var available= arguments[0];
				var scheduled= arguments[1];
				var unscheduled= arguments[2];
				var shiftBrks = arguments[3];
				var element = arguments[4];
				var index = arguments[5];
				if(element.color === sap.oee.ui.oeeConstants.stripColor.AVAILABLE){
					available.push(element.downtimeType);
				}else if(element.color === sap.oee.ui.oeeConstants.stripColor.UNSCHD){
					unscheduled.push(element.downtimeType);
				}else if(element.color === sap.oee.ui.oeeConstants.stripColor.SCHD){
					scheduled.push(element.downtimeType);
				}else if(element.color === sap.oee.ui.oeeConstants.stripColor.SFT_BRKS){
					shiftBrks.push(element.downtimeType);
				}
			},
			
		   createPerformanceChart: function(data,available,scheduled,unscheduled,shiftBrks,performanceDetailJSON,downtimeDetailModel,downtimeDetailsDialog,offset){
			   var that = this, plantTimezoneOffsetForStartTimestamp = this.appData.plantTimezoneOffset, plantTimezoneOffsetForEndTimestamp = this.appData.plantTimezoneOffset;
			   var offsetInMinutesForStartTimestamp, offsetInMinutesForEndTimestamp;
			   var startTimestampInPTZ, endTimestampInPTZ;
			   /*
				 * Browser will always shows the time in browser time zone if time stamp fields are passed to chart
				 * Adjust time stamp in such a way that it is equal to plant time zone when rendered on UI
				 * 
				 */
			   
			    this.adjustTimestampsToBeShownInPlantTimezone(data);
			    
				this.downtimeDataModel = new sap.ui.model.json.JSONModel();
				this.downtimeDataModel.setData({data:data});
				var oVizFrame = new sap.viz.ui5.controls.VizFrame({width:"100%",height:"10rem"});
				oVizFrame.setUiConfig({"applicationSet": "fiori"});
				
				// Adjustment to performance strip start and end scales as per plant time zone
				
				/*
				 * Adjusting plantTimezoneOffset based on DST if applicable
				 */
				if(this.appData){
					offsetInMinutesForStartTimestamp = sap.oee.ui.Utils.getPlantTimezoneOffsetBasedOnTimezoneKeyForTimestamp(performanceDetailJSON.startTimestamp, this.appData.plantTimezoneKey);
					if(offsetInMinutesForStartTimestamp !== undefined){
						plantTimezoneOffsetForStartTimestamp = parseFloat(offsetInMinutesForStartTimestamp);
					}
				}
				
				if(this.appData){
					offsetInMinutesForEndTimestamp = sap.oee.ui.Utils.getPlantTimezoneOffsetBasedOnTimezoneKeyForTimestamp(performanceDetailJSON.endTimestamp, this.appData.plantTimezoneKey);
					if(offsetInMinutesForEndTimestamp !== undefined){
						plantTimezoneOffsetForEndTimestamp = parseFloat(offsetInMinutesForEndTimestamp);
					}
				}
				
				startTimestampInPTZ = parseFloat(performanceDetailJSON.startTimestamp) + plantTimezoneOffsetForStartTimestamp
				endTimestampInPTZ = parseFloat(performanceDetailJSON.endTimestamp) + plantTimezoneOffsetForEndTimestamp;
					
				performanceDetailJSON.endTimestamp = endTimestampInPTZ + (new Date(endTimestampInPTZ).getTimezoneOffset()*60*1000);
				performanceDetailJSON.startTimestamp = startTimestampInPTZ + (new Date(startTimestampInPTZ).getTimezoneOffset()*60*1000);
				
				var maxScale = (performanceDetailJSON.endTimestamp - performanceDetailJSON.startTimestamp)/(60*1000);
				var scales =[{
					'feed' : 'valueAxis',
					'max': maxScale,
					'min': 0
				}];
				oVizFrame.setVizScales(scales);
				var dataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions : [ 
									{
									  axis : 1,
									  name : ' ',
									  value : ""
									},
						            {
									  axis : 2,
									  name : 'Data',
						              value : "{downtimeType}"
						            }
					              ],
					              measures : [ 
					                {
				                  	  name : 'duration',
				                   	  value : '{duration}'
				                    }
				                 ],
					             data : {
									path : "/data"
									}
				});
				oVizFrame.setDataset(dataset);
				oVizFrame.setVizType('stacked_bar');
				oVizFrame.setModel(this.downtimeDataModel);
				var feedValueAxis=new sap.viz.ui5.controls.common.feeds.FeedItem({
			        'uid': "valueAxis",
			        'type': "Measure",
			        'values': ["duration"]
			    }),
			    feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			        'uid': "categoryAxis",
			        'type': "Dimension",
			        'values': [" "]
			    }),
			    feedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': ["Data"]
				});
				oVizFrame.addFeed(feedValueAxis);
			    oVizFrame.addFeed(feedCategoryAxis);
			    oVizFrame.addFeed(feedColor);
				    oVizFrame.setVizProperties({
				    	valueAxis:{
				    		title:{
				    			visible:false
				    		},
				    		label:{
				    			visible:true
				    		},
				    		layout:{
				    			maxHeight:1,
				    			maxWidth:1
				    		}
				    	},
				    	categoryAxis:{
				    		title:{
				    			visible:false,
				    		},
				    		label:{
				    			visible:false
				    		}
				        },
				         plotArea:{
				    		 dataLabel:{
				    			 visible:false
				    		 },
				    		 dataPointStyle:{
				    			 'rules':[
				    			          {
				    			        	  "dataContext":{"Data":{"in":available}},
				    			        	  "properties":{
				    			        		  "color":"#009933"
				    			        	  },
											  "displayName":this.appComponent.oBundle.getText("OEE_LABEL_AVAILABLE")
				    			          },
				    			          {
				    			        	  "dataContext":{"Data":{"in":unscheduled}},
				    			        	  "properties":{
				    			        		  "color":"#CC0000"
				    			        	  },
											   "displayName":this.appComponent.oBundle.getText("OEE_LABEL_UNSCHEDULED")
				    			          },
										   {
				    			        	  "dataContext":{"Data":{"in":scheduled}},
				    			        	  "properties":{
				    			        		  "color":"#FF9900"
				    			        	  },
											  "displayName":this.appComponent.oBundle.getText("OEE_LABEL_SCHEDULED")
				    			          },
										   {
				    			        	  "dataContext":{"Data":{"in":shiftBrks}},
				    			        	  "properties":{
				    			        		  "color":"#3333ff",
												  "pattern":"diagonalLightStripe"
				    			        	  },
											  "displayName":this.appComponent.oBundle.getText("OEE_LABEL_SHIFT_BRKS")
				    			          }
				    			       
				    			        ]
				    		 }
				    	 },
				    	 legend: {
				                visible:true
				            },
				         title:{
				        	 visible:false
				         },
				    	 interaction:{
				    		 selectability: {
				    			 mode:"EXCLUSIVE"
				    		 },
				    		 hover:{
				    			 stroke:{
				    				 visible:false
				    			 }
				    		 }
				    	 },
				    	 tooltip:{
				    		 visible:false
				    	 }
				    	 
				     });
				oVizFrame.attachSelectData(function(oEvent){sap.oee.ui.Utils.selectDowntime(oEvent,downtimeDetailModel,downtimeDetailsDialog);});
				oVizFrame.attachRenderComplete(function(oEvent){sap.oee.ui.Utils.fXAxisFormatterNew(oEvent,performanceDetailJSON,offset);});
				return oVizFrame;
			},
			
			adjustTimestampsToBeShownInPlantTimezone: function(dataInput){
				var index, plantTimezoneOffsetForStartTimestamp = this.appData.plantTimezoneOffset, plantTimezoneOffsetForEndTimestamp = this.appData.plantTimezoneOffset;
				var offsetInMinutesForStartTimestamp, offsetInMinutesForEndTimestamp;
				var startTimestampInPTZ, endTimestampInPTZ;
				
				for(index = 0; index < dataInput.length; index++){
					
					/*
					 * Adjusting plantTimezoneOffset based on DST if applicable
					 */
					if(this.appData){
						offsetInMinutesForStartTimestamp = sap.oee.ui.Utils.getPlantTimezoneOffsetBasedOnTimezoneKeyForTimestamp(dataInput[index].startTimestamp, this.appData.plantTimezoneKey);
						if(offsetInMinutesForStartTimestamp !== undefined){
							plantTimezoneOffsetForStartTimestamp = parseFloat(offsetInMinutesForStartTimestamp);
						}
					}
					
					if(this.appData){
						offsetInMinutesForEndTimestamp = sap.oee.ui.Utils.getPlantTimezoneOffsetBasedOnTimezoneKeyForTimestamp(dataInput[index].endTimestamp, this.appData.plantTimezoneKey);
						if(offsetInMinutesForEndTimestamp !== undefined){
							plantTimezoneOffsetForEndTimestamp = parseFloat(offsetInMinutesForEndTimestamp);
						}
					}
					
					startTimestampInPTZ = dataInput[index].startTimestamp + plantTimezoneOffsetForStartTimestamp
					endTimestampInPTZ = dataInput[index].endTimestamp + plantTimezoneOffsetForEndTimestamp;
						
					dataInput[index].startTimestamp = startTimestampInPTZ + (new Date(startTimestampInPTZ).getTimezoneOffset()*60*1000);
					dataInput[index].endTimestamp = endTimestampInPTZ + (new Date(endTimestampInPTZ).getTimezoneOffset()*60*1000);
				}
			},
			
			selectDowntime : function(oEvent,downtimeDetailModel,downtimeDetailsDialog){
				var selectedData,source,downtimeDetails,index,selectedDowntime;
				source = oEvent.getSource();
				selectedData = oEvent.getParameter('data')[0].data.Data;
				downtimeDetails = this.downtimeDataModel.getData().data;
				if(downtimeDetails && downtimeDetails.length > 0){
					for(index=0;index<downtimeDetails.length;index++){
						if(downtimeDetails[index].downtimeType === selectedData){
							selectedDowntime = downtimeDetails[index];
							break;
						}
					}
				}
				this.openDowntimeDetails(selectedDowntime,source,downtimeDetailModel,downtimeDetailsDialog);
			},
			
			openDowntimeDetails : function(selectedDowntime,source,downtimeDetailModel,downtimeDetailsDialog){
				var details = [];
				if(selectedDowntime.nodeDescription){
					details.push({label :this.appComponent.oBundle.getText("OEE_LABEL_WORKUNIT"), value : selectedDowntime.nodeDescription});
				}
				if(selectedDowntime.eventType){
					details.push({label :this.appComponent.oBundle.getText("DOWNTIME_TYPE"), value : selectedDowntime.eventType});
				}
				if(selectedDowntime.startTimestamp && selectedDowntime.startTimestamp!== ""){
					details.push({label :this.appComponent.oBundle.getText("OEE_LABEL_START_TIME"), value : sap.oee.ui.Utils.oeeDateTimeFormatter.format(new Date(parseFloat(selectedDowntime.startTimestamp)))});
				}
				
				if(selectedDowntime.endTimestamp && selectedDowntime.endTimestamp!== ""){
						details.push({label :this.appComponent.oBundle.getText("OEE_LABEL_END_TIME"), value :sap.oee.ui.Utils.oeeDateTimeFormatter.format(new Date(parseFloat(selectedDowntime.endTimestamp)))});
					
				}
				
				if(selectedDowntime.eventType){
					if(selectedDowntime.eventType === sap.oee.ui.oeeConstants.timeElementTypes.unscheduledDown){
						if(selectedDowntime.crewSize && parseFloat(selectedDowntime.crewSize) !== 0 ){
							details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_CREWSIZE"), value : selectedDowntime.crewSize});
						}
					}
					if(selectedDowntime.eventType === sap.oee.ui.oeeConstants.timeElementTypes.scheduledDown){
						if(selectedDowntime.standardDuration && selectedDowntime.standardDuration !== "0"){
							details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_STANDARD_DURATION"), value : selectedDowntime.standardDuration/60});
						}
					}
					if(selectedDowntime.eventType === sap.oee.ui.oeeConstants.timeElementTypes.changeOver){
						if(selectedDowntime.fromMaterial && selectedDowntime.fromMaterial !== ""){
							details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_FROM_MATERIAL"), value:selectedDowntime.fromMaterial});
						}
						if(selectedDowntime.toMaterial && selectedDowntime.toMaterial !== ""){
							details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_TO_MATERIAL"), value : selectedDowntime.toMaterial});
						}
					}
				}
				
			/*	if(selectedDowntime.isLineDown || selectedDowntime.isActAsBottleneckMachineDown){
					details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_IMPACTS_LINE"), value : this.appComponent.oBundle.getText("OEE_LABEL_YES")});
				}else{
					details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_IMPACTS_LINE"), value : this.appComponent.oBundle.getText("OEE_LABEL_NO")});
				}*/
				if(selectedDowntime.comments && selectedDowntime.comments !== ""){
					details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_COMMENTS"), value:selectedDowntime.comments});
				}
				if(this.appData && this.appData.node && this.appData.node.lineBehavior){
					if(this.appData.node.lineBehavior === sap.oee.ui.oeeConstants.multiplierLineBehaviourConstant){
						if(selectedDowntime.multiplier){
							details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_MULTIPLIER"), value : selectedDowntime.multiplier});
						}
					}
				}
				if(selectedDowntime.changedBy && selectedDowntime.changedBy !== "" ){
					details.push({label : this.appComponent.oBundle.getText("REPORTED_LAST_CHANGED_BY_LABEL"), value : selectedDowntime.changedBy});
				}
				if(selectedDowntime.changeTimestamp && selectedDowntime.changeTimestamp !== ""){
					details.push({label : this.appComponent.oBundle.getText("OEE_LABEL_DATE_TIME_LAST_REPORTED"), value : sap.oee.ui.Formatter.formatTimeStampWithoutLabel(selectedDowntime.changeTimestamp,this.appData.plantTimezoneOffset, this.appData.plantTimezoneKey)});
				}
				downtimeDetailModel.setData({details:details});
				jQuery.sap.delayedCall(0, this, function () {
					downtimeDetailsDialog.openBy(source);
              });
			},
			
			fXAxisFormatterNew: function(oEvent,performanceDetailJSON,offset){
			    var sAxisSelector = ".v-m-xAxis .viz-axis-label text";
				var oDomContext = oEvent.getSource().getDomRef();
				if(oDomContext == null || oDomContext == undefined || oDomContext == ""){
					return;
				}
				var firstAxisLabel = jQuery(sAxisSelector,oDomContext)[0];
				jQuery(firstAxisLabel).attr('text-anchor','start');
				var iNoOfAxisLabels = jQuery(sAxisSelector,oDomContext).length;
				var lastAxisLabel = jQuery(sAxisSelector,oDomContext)[iNoOfAxisLabels-1];
				jQuery(lastAxisLabel).attr('text-anchor','end');
				if(iNoOfAxisLabels > 0){
					var s = parseFloat(performanceDetailJSON.startTimestamp);
					var s1 = parseFloat(performanceDetailJSON.endTimestamp);
					var differenceInTime = (s1 - s);
					var incrementalValue = differenceInTime / (iNoOfAxisLabels - 1);
					var timeAxisArray = [];
					for( i= 0; i< iNoOfAxisLabels; i++){
					    var incrementalTime = new Date(s + (incrementalValue * i));
					    var hour = incrementalTime.getHours();
					    var min = incrementalTime.getMinutes();
					    var h = (hour <= 9)?("0"+hour):hour;
					    var m = (min <= 9)?("0"+min):min;
					    var eachTimeAxisLabel = h + ":" + m;
					    timeAxisArray.push(eachTimeAxisLabel);
					}
					jQuery(sAxisSelector, oEvent.getSource().getDomRef()).each(function(i, e) {
						if(i%2 == 0 || i== (iNoOfAxisLabels - 1)){
							this.style.fontWeight = "normal";
							this.style.fontSize = "10px";
							this.textContent = timeAxisArray[i];
						}else{
							this.textContent = "";
						}
					});
				}
			},
			
			workUnitSelectedIsCapacityMachine: function(data){
				if(this.appData.node.lineBehavior == sap.oee.ui.oeeConstants.multiLineMultiCapacity || 
				   this.appData.node.lineBehavior == sap.oee.ui.oeeConstants.multiCapacitySingleLineBehaviour || 
				   this.appData.node.lineBehavior == sap.oee.ui.oeeConstants.multiCapacitySingleLineWithMultiplier){
					var workUnitTemp;
					for(var index = 0; index < data.nodeDataList.length; index ++){
						workUnitTemp = data.nodeDataList[index];
						if(workUnitTemp.capacityID != undefined){
							if(workUnitTemp.isCapacity === true){
								return true;
							}
						}
					}
				}	
				return false;
			},
			
			createTimestampFromDateTime: function(startDateInput, startTimeInput){
				var timeString, dateObj, year, month, day, combined = "";
				if(startDateInput && startTimeInput && startDateInput != "" && startTimeInput != ""){
					 year = startDateInput.getFullYear();
					 month = startDateInput.getMonth();
					 day = startDateInput.getDate();
					 if(sap.ui.getCore().byId("downtimeDialog--endTime")){
						 if(sap.ui.getCore().byId("downtimeDialog--endTime").getDisplayFormat()=="medium"){
							  combined = new Date(year,month,day,startTimeInput.getHours(),startTimeInput.getMinutes(),startTimeInput.getSeconds());
						 }else{
							 combined = new Date(year,month,day,startTimeInput.getHours(),startTimeInput.getMinutes(),00);
						 }
						
					 }else{
						 combined = new Date(year,month,day,startTimeInput.getHours(),startTimeInput.getMinutes(),00);
					 }
					 
				}
				    return combined;
			} 
			
			
}; //End of Utils Object, Add new Methods just before this closure.
}();