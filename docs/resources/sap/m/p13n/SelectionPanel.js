/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BasePanel","sap/m/Label","sap/m/ColumnListItem","sap/m/HBox","sap/m/VBox","sap/ui/core/Icon","sap/m/Text","sap/m/Column","sap/m/Table","sap/m/library","sap/m/ToolbarSpacer","sap/m/Button","sap/m/OverflowToolbar","sap/ui/model/Filter"],function(t,e,o,i,s,n,r,a,l,h,p,u,d,c){"use strict";var _=h.ListKeyboardMode;var g=h.FlexJustifyContent;var m=h.ListType;var y=t.extend("sap.m.p13n.SelectionPanel",{metadata:{library:"sap.m",properties:{showHeader:{type:"boolean",defaultValue:false},enableCount:{type:"boolean",defaultValue:false},fieldColumn:{type:"string",defaultValue:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("p13n.DEFAULT_DESCRIPTION")},activeColumn:{type:"string",defaultValue:""},itemFactory:{type:"function"}}},renderer:{apiVersion:2}});y.prototype.applySettings=function(){t.prototype.applySettings.apply(this,arguments);this._setTemplate(this._getListTemplate());this.addStyleClass("sapMSelectionPanel");this._aInitializedFields=[];this._bShowFactory=false;this.addStyleClass("SelectionPanelHover");this._displayColumns();this.setEnableReorder(true)};y.prototype.setItemFactory=function(t){this.setProperty("itemFactory",t);this._oListControl.setGrowing(!!t);return this};y.prototype._getListTemplate=function(){return new o({selected:"{"+this.P13N_MODEL+">"+this.PRESENCE_ATTRIBUTE+"}",type:m.Active,cells:[new s({items:[new e({wrapping:true,required:"{"+this.P13N_MODEL+">required}",tooltip:"{"+this.P13N_MODEL+">tooltip}",text:"{"+this.P13N_MODEL+">label}"})]}),new i({justifyContent:g.Center,items:[new n({src:"sap-icon://circle-task-2",size:"0.5rem",color:sap.ui.core.IconColor.Neutral,visible:{path:this.P13N_MODEL+">active",formatter:function(t){if(t){return true}else{return false}}}})]})]})};y.prototype.setShowHeader=function(t){if(t){var e=this._getResourceText("p13n.SHOW_SELECTED");var o=this._getResourceText("p13n.SHOW_ALL");this._oListControl.setHeaderToolbar(new d({content:[this._getSearchField(),new p,new u({press:function(t){this._bShowSelected=t.getSource().getText()==e;this._filterList(this._bShowSelected,this._sSearch);t.getSource().setText(this._bShowSelected?o:e)}.bind(this),text:e})]}))}this.setProperty("showHeader",t);return this};y.prototype.getSelectedFields=function(){var t=[];this._loopItems(this._oListControl,function(e,o){if(e.getSelected()){t.push(o)}});return t};y.prototype._filterList=function(t,e){var o=[],i=[];if(t){i=new c(this.PRESENCE_ATTRIBUTE,"EQ",true)}if(e){o=new c("label","Contains",e)}this._oListControl.getBinding("items").filter(new c([].concat(i,o),true))};y.prototype._onSearchFieldLiveChange=function(t){this._sSearch=t.getSource().getValue();this._filterList(this._bShowSelected,this._sSearch)};y.prototype._handleActivated=function(t){this._removeMoveButtons();if(this._oHoveredItem&&this._oHoveredItem.getBindingContextPath()){var e=!!this._getP13nModel().getProperty(this._oHoveredItem.getBindingContextPath()).active;var o=this._oHoveredItem.getCells()[1].getItems()[0];o.setVisible(e)}var i=t.getCells()[1].getItems()[0];i.setVisible(false);this._oHoveredItem=t;this._updateEnableOfMoveButtons(t,false);this._addMoveButtons(t)};y.prototype._removeMoveButtons=function(){var t=this._getMoveButtonContainer();if(t){t.removeItem(this._getMoveTopButton());t.removeItem(this._getMoveUpButton());t.removeItem(this._getMoveDownButton());t.removeItem(this._getMoveBottomButton())}};y.prototype._getMoveButtonContainer=function(){if(this._oMoveBottomButton&&this._oMoveBottomButton.getParent()&&this._oMoveBottomButton.getParent().isA("sap.m.FlexBox")){return this._oMoveBottomButton.getParent()}};y.prototype.showFactory=function(t){this._bShowFactory=t;this._displayColumns();if(t){this.removeStyleClass("SelectionPanelHover");this._oListControl.setKeyboardMode(_.Edit);this._addFactoryControl()}else{this.addStyleClass("SelectionPanelHover");this._oListControl.setKeyboardMode(_.Navigation);this._removeFactoryControl()}};y.prototype._loopItems=function(t,e){t.getItems().forEach(function(t){var o=t.getBindingContextPath();var i=this._getP13nModel().getProperty(o).name;e.call(this,t,i)}.bind(this))};y.prototype.setP13nData=function(){t.prototype.setP13nData.apply(this,arguments);this._updateCount()};y.prototype._updateCount=function(){this._getP13nModel().setProperty("/selectedItems",this._oListControl.getSelectedContexts(true).length)};y.prototype._selectTableItem=function(e,o){t.prototype._selectTableItem.apply(this,arguments);this._updateCount()};y.prototype._removeFactoryControl=function(){this._oListControl.getItems().forEach(function(t){var e=t.getCells()[0];if(e.getItems().length>1){e.removeItem(e.getItems()[1])}});this.removeStyleClass("sapUiMDCAFLabelMarkingList");return this._aInitializedFields};y.prototype._moveSelectedItem=function(){this._oSelectedItem=this._getMoveButtonContainer().getParent();t.prototype._moveSelectedItem.apply(this,arguments)};y.prototype._getShowFactory=function(){return this._bShowFactory};y.prototype._displayColumns=function(){var t=[this.getFieldColumn()];if(!this._bShowFactory){t.push(new a({width:"30%",hAlign:"Center",vAlign:"Middle",header:new r({text:this.getActiveColumn()})}))}this._setPanelColumns(t)};y.prototype._setPanelColumns=function(e){this._sText=e[0];var o=this.getEnableCount();if(o){var i=new a({header:new r({text:{parts:[{path:this.P13N_MODEL+">/selectedItems"},{path:this.P13N_MODEL+">/items"}],formatter:function(t,e){return this._sText+" "+this._getResourceText("p13n.HEADER_COUNT",[t,e instanceof Array?e.length:0])}.bind(this)}})});e[0]=i}t.prototype._setPanelColumns.apply(this,arguments)};y.prototype._addFactoryControl=function(t){this._oListControl.getItems().forEach(function(t){var e=t.getBindingContext(this.P13N_MODEL);var o=this.getItemFactory().call(this,e);var i=t.getCells()[0];i.addItem(o)}.bind(this));this.addStyleClass("sapUiMDCAFLabelMarkingList")};y.prototype._createInnerListControl=function(){return new l(this.getId()+"-innerSelectionPanelTable",Object.assign({growing:false,growingThreshold:25,growingScrollToLoad:true,updateStarted:function(){this._removeMoveButtons();this._removeFactoryControl()}.bind(this),updateFinished:function(){if(this._getShowFactory()){this._addFactoryControl()}}.bind(this)},this._getListControlConfig()))};y.prototype.filterContent=function(t){if(this._oListControl.getBinding("items")){this._oListControl.getBinding("items").filter(t,true)}};y.prototype._addMoveButtons=function(t){var e=t;if(!e){return}var o=this._getP13nModel().getProperty(e.getBindingContextPath())[this.PRESENCE_ATTRIBUTE];if(o){e.getCells()[1].addItem(this._getMoveTopButton());e.getCells()[1].addItem(this._getMoveUpButton());e.getCells()[1].addItem(this._getMoveDownButton());e.getCells()[1].addItem(this._getMoveBottomButton())}};y.prototype.exit=function(){t.prototype.exit.apply(this,arguments);this._aInitializedFields=null;this._oHoveredItem=null;this._bShowFactory=null;this._sSearch=null;this._bShowSelected=null};return y});