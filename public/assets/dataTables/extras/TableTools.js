/*
 * File:        TableTools.js
 * Version:     2.1.3
 * Description: Tools and buttons for DataTables
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Language:    Javascript
 * License:	    GPL v2 or BSD 3 point style
 * Project:	    DataTables
 * 
 * Copyright 2009-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 */
/* Global scope for TableTools */
var TableTools;(function(a,b,c){TableTools=function(b,c){return!this instanceof TableTools&&alert("Warning: TableTools must be initialised with the keyword 'new'"),this.s={that:this,dt:b.fnSettings(),print:{saveStart:-1,saveLength:-1,saveScroll:-1,funcEnd:function(){}},buttonCounter:0,select:{type:"",selected:[],preRowSelect:null,postSelected:null,postDeselected:null,all:!1,selectedClass:""},custom:{},swfPath:"",buttonSet:[],master:!1,tags:{}},this.dom={container:null,table:null,print:{hidden:[],message:null},collection:{collection:null,background:null}},this.classes=a.extend(!0,{},TableTools.classes),this.s.dt.bJUI&&a.extend(!0,this.classes,TableTools.classes_themeroller),this.fnSettings=function(){return this.s},typeof c=="undefined"&&(c={}),this._fnConstruct(c),this},TableTools.prototype={fnGetSelected:function(){var a=[],b=this.s.dt.aoData,c,d;for(c=0,d=b.length;c<d;c++)b[c]._DTTT_selected&&a.push(b[c].nTr);return a},fnGetSelectedData:function(){var a=[],b=this.s.dt.aoData,c,d;for(c=0,d=b.length;c<d;c++)b[c]._DTTT_selected&&a.push(this.s.dt.oInstance.fnGetData(c));return a},fnIsSelected:function(a){var b=this.s.dt.oInstance.fnGetPosition(a);return this.s.dt.aoData[b]._DTTT_selected===!0?!0:!1},fnSelectAll:function(a){var b=this._fnGetMasterSettings();this._fnRowSelect(a===!0?b.dt.aiDisplay:b.dt.aoData)},fnSelectNone:function(a){var b=this._fnGetMasterSettings();this._fnRowDeselect(a===!0?b.dt.aiDisplay:b.dt.aoData)},fnSelect:function(a){this.s.select.type=="single"?(this.fnSelectNone(),this._fnRowSelect(a)):this.s.select.type=="multi"&&this._fnRowSelect(a)},fnDeselect:function(a){this._fnRowDeselect(a)},fnGetTitle:function(a){var b="";if(typeof a.sTitle!="undefined"&&a.sTitle!=="")b=a.sTitle;else{var d=c.getElementsByTagName("title");d.length>0&&(b=d[0].innerHTML)}return"¡".toString().length<4?b.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""):b.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g,"")},fnCalcColRatios:function(a){var b=this.s.dt.aoColumns,c=this._fnColumnTargets(a.mColumns),d=[],e=0,f=0,g,h;for(g=0,h=c.length;g<h;g++)c[g]&&(e=b[g].nTh.offsetWidth,f+=e,d.push(e));for(g=0,h=d.length;g<h;g++)d[g]=d[g]/f;return d.join("\t")},fnGetTableData:function(a){if(this.s.dt)return this._fnGetDataTablesData(a)},fnSetText:function(a,b){this._fnFlashSetText(a,b)},fnResizeButtons:function(){for(var a in ZeroClipboard_TableTools.clients)if(a){var b=ZeroClipboard_TableTools.clients[a];typeof b.domElement!="undefined"&&b.domElement.parentNode&&b.positionElement()}},fnResizeRequired:function(){for(var a in ZeroClipboard_TableTools.clients)if(a){var b=ZeroClipboard_TableTools.clients[a];if(typeof b.domElement!="undefined"&&b.domElement.parentNode==this.dom.container&&b.sized===!1)return!0}return!1},fnPrint:function(a,b){b===undefined&&(b={}),a===undefined||a?this._fnPrintStart(b):this._fnPrintEnd()},fnInfo:function(b,d){var e=c.createElement("div");e.className=this.classes.print.info,e.innerHTML=b,c.body.appendChild(e),setTimeout(function(){a(e).fadeOut("normal",function(){c.body.removeChild(e)})},d)},_fnConstruct:function(a){var b=this;this._fnCustomiseSettings(a),this.dom.container=c.createElement(this.s.tags.container),this.dom.container.className=this.classes.container,this.s.select.type!="none"&&this._fnRowSelectConfig(),this._fnButtonDefinations(this.s.buttonSet,this.dom.container),this.s.dt.aoDestroyCallback.push({sName:"TableTools",fn:function(){b.dom.container.innerHTML=""}})},_fnCustomiseSettings:function(b){typeof this.s.dt._TableToolsInit=="undefined"&&(this.s.master=!0,this.s.dt._TableToolsInit=!0),this.dom.table=this.s.dt.nTable,this.s.custom=a.extend({},TableTools.DEFAULTS,b),this.s.swfPath=this.s.custom.sSwfPath,typeof ZeroClipboard_TableTools!="undefined"&&(ZeroClipboard_TableTools.moviePath=this.s.swfPath),this.s.select.type=this.s.custom.sRowSelect,this.s.select.preRowSelect=this.s.custom.fnPreRowSelect,this.s.select.postSelected=this.s.custom.fnRowSelected,this.s.select.postDeselected=this.s.custom.fnRowDeselected,this.s.custom.sSelectedClass&&(this.classes.select.row=this.s.custom.sSelectedClass),this.s.tags=this.s.custom.oTags,this.s.buttonSet=this.s.custom.aButtons},_fnButtonDefinations:function(b,c){var d;for(var e=0,f=b.length;e<f;e++){if(typeof b[e]=="string"){if(typeof TableTools.BUTTONS[b[e]]=="undefined"){alert("TableTools: Warning - unknown button type: "+b[e]);continue}d=a.extend({},TableTools.BUTTONS[b[e]],!0)}else{if(typeof TableTools.BUTTONS[b[e].sExtends]=="undefined"){alert("TableTools: Warning - unknown button type: "+b[e].sExtends);continue}var g=a.extend({},TableTools.BUTTONS[b[e].sExtends],!0);d=a.extend(g,b[e],!0)}c.appendChild(this._fnCreateButton(d,a(c).hasClass(this.classes.collection.container)))}},_fnCreateButton:function(a,b){var c=this._fnButtonBase(a,b);return a.sAction.match(/flash/)?this._fnFlashConfig(c,a):a.sAction=="text"?this._fnTextConfig(c,a):a.sAction=="div"?this._fnTextConfig(c,a):a.sAction=="collection"&&(this._fnTextConfig(c,a),this._fnCollectionConfig(c,a)),c},_fnButtonBase:function(a,b){var d,e,f;b?(d=a.sTag!=="default"?a.sTag:this.s.tags.collection.button,e=a.sLinerTag!=="default"?a.sLiner:this.s.tags.collection.liner,f=this.classes.collection.buttons.normal):(d=a.sTag!=="default"?a.sTag:this.s.tags.button,e=a.sLinerTag!=="default"?a.sLiner:this.s.tags.liner,f=this.classes.buttons.normal);var g=c.createElement(d),h=c.createElement(e),i=this._fnGetMasterSettings();return g.className=f+" "+a.sButtonClass,g.setAttribute("id","ToolTables_"+this.s.dt.sInstance+"_"+i.buttonCounter),g.appendChild(h),h.innerHTML=a.sButtonText,i.buttonCounter++,g},_fnGetMasterSettings:function(){if(this.s.master)return this.s;var a=TableTools._aInstances;for(var b=0,c=a.length;b<c;b++)if(this.dom.table==a[b].s.dt.nTable)return a[b].s},_fnCollectionConfig:function(a,b){var d=c.createElement(this.s.tags.collection.container);d.style.display="none",d.className=this.classes.collection.container,b._collection=d,c.body.appendChild(d),this._fnButtonDefinations(b.aButtons,d)},_fnCollectionShow:function(d,e){var f=this,g=a(d).offset(),h=e._collection,i=g.left,j=g.top+a(d).outerHeight(),k=a(b).height(),l=a(c).height(),m=a(b).width(),n=a(c).width();h.style.position="absolute",h.style.left=i+"px",h.style.top=j+"px",h.style.display="block",a(h).css("opacity",0);var o=c.createElement("div");o.style.position="absolute",o.style.left="0px",o.style.top="0px",o.style.height=(k>l?k:l)+"px",o.style.width=(m>n?m:n)+"px",o.className=this.classes.collection.background,a(o).css("opacity",0),c.body.appendChild(o),c.body.appendChild(h);var p=a(h).outerWidth(),q=a(h).outerHeight();i+p>n&&(h.style.left=n-p+"px"),j+q>l&&(h.style.top=j-q-a(d).outerHeight()+"px"),this.dom.collection.collection=h,this.dom.collection.background=o,setTimeout(function(){a(h).animate({opacity:1},500),a(o).animate({opacity:.25},500)},10),this.fnResizeButtons(),a(o).click(function(){f._fnCollectionHide.call(f,null,null)})},_fnCollectionHide:function(b,c){if(c!==null&&c.sExtends=="collection")return;this.dom.collection.collection!==null&&(a(this.dom.collection.collection).animate({opacity:0},500,function(a){this.style.display="none"}),a(this.dom.collection.background).animate({opacity:0},500,function(a){this.parentNode.removeChild(this)}),this.dom.collection.collection=null,this.dom.collection.background=null)},_fnRowSelectConfig:function(){if(this.s.master){var b=this,c,d,e=this.s.dt,f=this.s.dt.aoOpenRows;a(e.nTable).addClass(this.classes.select.table),a("tr",e.nTBody).live("click",function(a){if(this.parentNode!=e.nTBody)return;if(e.oInstance.fnGetData(this)===null)return;if(b.s.select.preRowSelect!==null&&!b.s.select.preRowSelect.call(b,a))return;b.fnIsSelected(this)?b._fnRowDeselect(this):b.s.select.type=="single"?(b.fnSelectNone(),b._fnRowSelect(this)):b.s.select.type=="multi"&&b._fnRowSelect(this)}),e.oApi._fnCallbackReg(e,"aoRowCreatedCallback",function(c,d,f){e.aoData[f]._DTTT_selected&&a(c).addClass(b.classes.select.row)},"TableTools-SelectAll")}},_fnRowSelect:function(b){var c=this._fnSelectData(b),d=c.length===0?null:c[0].nTr;for(var e=0,f=c.length;e<f;e++)c[e]._DTTT_selected=!0,c[e].nTr&&a(c[e].nTr).addClass(this.classes.select.row);this.s.select.postSelected!==null&&this.s.select.postSelected.call(this,d),TableTools._fnEventDispatch(this,"select",d)},_fnRowDeselect:function(b){var c=this._fnSelectData(b),d=c.length===0?null:c[0].nTr;for(var e=0,f=c.length;e<f;e++)c[e].nTr&&c[e]._DTTT_selected&&a(c[e].nTr).removeClass(this.classes.select.row),c[e]._DTTT_selected=!1;this.s.select.postDeselected!==null&&this.s.select.postDeselected.call(this,d),TableTools._fnEventDispatch(this,"select",d)},_fnSelectData:function(a){var b=[],c,d,e;if(a.nodeName)c=this.s.dt.oInstance.fnGetPosition(a),b.push(this.s.dt.aoData[c]);else{if(typeof a.length!="undefined"){for(d=0,e=a.length;d<e;d++)a[d].nodeName?(c=this.s.dt.oInstance.fnGetPosition(a[d]),b.push(this.s.dt.aoData[c])):typeof a[d]=="number"?b.push(this.s.dt.aoData[a[d]]):b.push(a[d]);return b}b.push(a)}return b},_fnTextConfig:function(b,c){var d=this;c.fnInit!==null&&c.fnInit.call(this,b,c),c.sToolTip!==""&&(b.title=c.sToolTip),a(b).hover(function(){c.fnMouseover!==null&&c.fnMouseover.call(this,b,c,null)},function(){c.fnMouseout!==null&&c.fnMouseout.call(this,b,c,null)}),c.fnSelect!==null&&TableTools._fnEventListen(this,"select",function(a){c.fnSelect.call(d,b,c,a)}),a(b).click(function(a){c.fnClick!==null&&c.fnClick.call(d,b,c,null),c.fnComplete!==null&&c.fnComplete.call(d,b,c,null,null),d._fnCollectionHide(b,c)})},_fnFlashConfig:function(a,b){var c=this,d=new ZeroClipboard_TableTools.Client;b.fnInit!==null&&b.fnInit.call(this,a,b),d.setHandCursor(!0),b.sAction=="flash_save"?(d.setAction("save"),d.setCharSet(b.sCharSet=="utf16le"?"UTF16LE":"UTF8"),d.setBomInc(b.bBomInc),d.setFileName(b.sFileName.replace("*",this.fnGetTitle(b)))):b.sAction=="flash_pdf"?(d.setAction("pdf"),d.setFileName(b.sFileName.replace("*",this.fnGetTitle(b)))):d.setAction("copy"),d.addEventListener("mouseOver",function(e){b.fnMouseover!==null&&b.fnMouseover.call(c,a,b,d)}),d.addEventListener("mouseOut",function(e){b.fnMouseout!==null&&b.fnMouseout.call(c,a,b,d)}),d.addEventListener("mouseDown",function(e){b.fnClick!==null&&b.fnClick.call(c,a,b,d)}),d.addEventListener("complete",function(e,f){b.fnComplete!==null&&b.fnComplete.call(c,a,b,d,f),c._fnCollectionHide(a,b)}),this._fnFlashGlue(d,a,b.sToolTip)},_fnFlashGlue:function(a,b,d){var e=this,f=b.getAttribute("id");c.getElementById(f)?a.glue(b,d):setTimeout(function(){e._fnFlashGlue(a,b,d)},100)},_fnFlashSetText:function(a,b){var c=this._fnChunkData(b,8192);a.clearText();for(var d=0,e=c.length;d<e;d++)a.appendText(c[d])},_fnColumnTargets:function(a){var b=[],c=this.s.dt;if(typeof a=="object"){for(i=0,iLen=c.aoColumns.length;i<iLen;i++)b.push(!1);for(i=0,iLen=a.length;i<iLen;i++)b[a[i]]=!0}else if(a=="visible")for(i=0,iLen=c.aoColumns.length;i<iLen;i++)b.push(c.aoColumns[i].bVisible?!0:!1);else if(a=="hidden")for(i=0,iLen=c.aoColumns.length;i<iLen;i++)b.push(c.aoColumns[i].bVisible?!1:!0);else if(a=="sortable")for(i=0,iLen=c.aoColumns.length;i<iLen;i++)b.push(c.aoColumns[i].bSortable?!0:!1);else for(i=0,iLen=c.aoColumns.length;i<iLen;i++)b.push(!0);return b},_fnNewline:function(a){return a.sNewLine=="auto"?navigator.userAgent.match(/Windows/)?"\r\n":"\n":a.sNewLine},_fnGetDataTablesData:function(b){var c,d,e,f,g,h=[],i="",j,k=this.s.dt,l,m,n=new RegExp(b.sFieldBoundary,"g"),o=this._fnColumnTargets(b.mColumns),p=typeof b.bSelectedOnly!="undefined"?b.bSelectedOnly:!1;if(b.bHeader){g=[];for(c=0,d=k.aoColumns.length;c<d;c++)o[c]&&(i=k.aoColumns[c].sTitle.replace(/\n/g," ").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,""),i=this._fnHtmlDecode(i),g.push(this._fnBoundData(i,b.sFieldBoundary,n)));h.push(g.join(b.sFieldSeperator))}var q=k.aiDisplay,r=this.fnGetSelected();if(this.s.select.type!=="none"&&p&&r.length!==0){q=[];for(c=0,d=r.length;c<d;c++)q.push(k.oInstance.fnGetPosition(r[c]))}for(e=0,f=q.length;e<f;e++){l=k.aoData[q[e]].nTr,g=[];for(c=0,d=k.aoColumns.length;c<d;c++)if(o[c]){var s=k.oApi._fnGetCellData(k,q[e],c,"display");b.fnCellRender?i=b.fnCellRender(s,c,l,q[e])+"":typeof s=="string"?(i=s.replace(/\n/g," "),i=i.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi,"$1$2$3"),i=i.replace(/<.*?>/g,"")):i=s+"",i=i.replace(/^\s+/,"").replace(/\s+$/,""),i=this._fnHtmlDecode(i),g.push(this._fnBoundData(i,b.sFieldBoundary,n))}h.push(g.join(b.sFieldSeperator)),b.bOpenRows&&(j=a.grep(k.aoOpenRows,function(a){return a.nParent===l}),j.length===1&&(i=this._fnBoundData(a("td",j[0].nTr).html(),b.sFieldBoundary,n),h.push(i)))}if(b.bFooter&&k.nTFoot!==null){g=[];for(c=0,d=k.aoColumns.length;c<d;c++)o[c]&&k.aoColumns[c].nTf!==null&&(i=k.aoColumns[c].nTf.innerHTML.replace(/\n/g," ").replace(/<.*?>/g,""),i=this._fnHtmlDecode(i),g.push(this._fnBoundData(i,b.sFieldBoundary,n)));h.push(g.join(b.sFieldSeperator))}return _sLastData=h.join(this._fnNewline(b)),_sLastData},_fnBoundData:function(a,b,c){return b===""?a:b+a.replace(c,b+b)+b},_fnChunkData:function(a,b){var c=[],d=a.length;for(var e=0;e<d;e+=b)e+b<d?c.push(a.substring(e,e+b)):c.push(a.substring(e,d));return c},_fnHtmlDecode:function(a){if(a.indexOf("&")==-1)return a;var b=this._fnChunkData(a,2048),d=c.createElement("div"),e,f,g,h="",i;for(e=0,f=b.length;e<f;e++)g=b[e].lastIndexOf("&"),g!=-1&&b[e].length>=8&&g>b[e].length-8&&(i=b[e].substr(g),b[e]=b[e].substr(0,g)),d.innerHTML=b[e],h+=d.childNodes[0].nodeValue;return h},_fnPrintStart:function(d){var e=this,f=this.s.dt;this._fnPrintHideNodes(f.nTable),this.s.print.saveStart=f._iDisplayStart,this.s.print.saveLength=f._iDisplayLength,d.bShowAll&&(f._iDisplayStart=0,f._iDisplayLength=-1,f.oApi._fnCalculateEnd(f),f.oApi._fnDraw(f)),(f.oScroll.sX!==""||f.oScroll.sY!=="")&&this._fnPrintScrollStart(f);var g=f.aanFeatures;for(var h in g)if(h!="i"&&h!="t"&&h.length==1)for(var i=0,j=g[h].length;i<j;i++)this.dom.print.hidden.push({node:g[h][i],display:"block"}),g[h][i].style.display="none";a(c.body).addClass(this.classes.print.body),d.sInfo!==""&&this.fnInfo(d.sInfo,3e3),d.sMessage&&(this.dom.print.message=c.createElement("div"),this.dom.print.message.className=this.classes.print.message,this.dom.print.message.innerHTML=d.sMessage,c.body.insertBefore(this.dom.print.message,c.body.childNodes[0])),this.s.print.saveScroll=a(b).scrollTop(),b.scrollTo(0,0),a(c).bind("keydown.DTTT",function(a){a.keyCode==27&&(a.preventDefault(),e._fnPrintEnd.call(e,a))})},_fnPrintEnd:function(d){var e=this,f=this.s.dt,g=this.s.print,h=this.dom.print;this._fnPrintShowNodes(),(f.oScroll.sX!==""||f.oScroll.sY!=="")&&this._fnPrintScrollEnd(),b.scrollTo(0,g.saveScroll),h.message!==null&&(c.body.removeChild(h.message),h.message=null),a(c.body).removeClass("DTTT_Print"),f._iDisplayStart=g.saveStart,f._iDisplayLength=g.saveLength,f.oApi._fnCalculateEnd(f),f.oApi._fnDraw(f),a(c).unbind("keydown.DTTT")},_fnPrintScrollStart:function(){var b=this.s.dt,c=b.nScrollHead.getElementsByTagName("div")[0],d=c.getElementsByTagName("table")[0],e=b.nTable.parentNode,f=b.nTable.getElementsByTagName("thead");f.length>0&&b.nTable.removeChild(f[0]);if(b.nTFoot!==null){var g=b.nTable.getElementsByTagName("tfoot");g.length>0&&b.nTable.removeChild(g[0])}f=b.nTHead.cloneNode(!0),b.nTable.insertBefore(f,b.nTable.childNodes[0]),b.nTFoot!==null&&(g=b.nTFoot.cloneNode(!0),b.nTable.insertBefore(g,b.nTable.childNodes[1])),b.oScroll.sX!==""&&(b.nTable.style.width=a(b.nTable).outerWidth()+"px",e.style.width=a(b.nTable).outerWidth()+"px",e.style.overflow="visible"),b.oScroll.sY!==""&&(e.style.height=a(b.nTable).outerHeight()+"px",e.style.overflow="visible")},_fnPrintScrollEnd:function(){var a=this.s.dt,b=a.nTable.parentNode;a.oScroll.sX!==""&&(b.style.width=a.oApi._fnStringToCss(a.oScroll.sX),b.style.overflow="auto"),a.oScroll.sY!==""&&(b.style.height=a.oApi._fnStringToCss(a.oScroll.sY),b.style.overflow="auto")},_fnPrintShowNodes:function(){var a=this.dom.print.hidden;for(var b=0,c=a.length;b<c;b++)a[b].node.style.display=a[b].display;a.splice(0,a.length)},_fnPrintHideNodes:function(b){var c=this.dom.print.hidden,d=b.parentNode,e=d.childNodes;for(var f=0,g=e.length;f<g;f++)if(e[f]!=b&&e[f].nodeType==1){var h=a(e[f]).css("display");h!="none"&&(c.push({node:e[f],display:h}),e[f].style.display="none")}d.nodeName!="BODY"&&this._fnPrintHideNodes(d)}},TableTools._aInstances=[],TableTools._aListeners=[],TableTools.fnGetMasters=function(){var a=[];for(var b=0,c=TableTools._aInstances.length;b<c;b++)TableTools._aInstances[b].s.master&&a.push(TableTools._aInstances[b]);return a},TableTools.fnGetInstance=function(a){typeof a!="object"&&(a=c.getElementById(a));for(var b=0,d=TableTools._aInstances.length;b<d;b++)if(TableTools._aInstances[b].s.master&&TableTools._aInstances[b].dom.table==a)return TableTools._aInstances[b];return null},TableTools._fnEventListen=function(a,b,c){TableTools._aListeners.push({that:a,type:b,fn:c})},TableTools._fnEventDispatch=function(a,b,c){var d=TableTools._aListeners;for(var e=0,f=d.length;e<f;e++)a.dom.table==d[e].that.dom.table&&d[e].type==b&&d[e].fn(c)},TableTools.buttonBase={sAction:"text",sTag:"default",sLinerTag:"default",sButtonClass:"DTTT_button_text",sButtonText:"Button text",sTitle:"",sToolTip:"",sCharSet:"utf8",bBomInc:!1,sFileName:"*.csv",sFieldBoundary:"",sFieldSeperator:"\t",sNewLine:"auto",mColumns:"all",bHeader:!0,bFooter:!0,bOpenRows:!1,bSelectedOnly:!1,fnMouseover:null,fnMouseout:null,fnClick:null,fnSelect:null,fnComplete:null,fnInit:null,fnCellRender:null},TableTools.BUTTONS={csv:a.extend({},TableTools.buttonBase,{sAction:"flash_save",sButtonClass:"DTTT_button_csv",sButtonText:"CSV",sFieldBoundary:'"',sFieldSeperator:",",fnClick:function(a,b,c){this.fnSetText(c,this.fnGetTableData(b))}}),xls:a.extend({},TableTools.buttonBase,{sAction:"flash_save",sCharSet:"utf16le",bBomInc:!0,sButtonClass:"DTTT_button_xls",sButtonText:"Excel",fnClick:function(a,b,c){this.fnSetText(c,this.fnGetTableData(b))}}),copy:a.extend({},TableTools.buttonBase,{sAction:"flash_copy",sButtonClass:"DTTT_button_copy",sButtonText:"Copy",fnClick:function(a,b,c){this.fnSetText(c,this.fnGetTableData(b))},fnComplete:function(a,b,c,d){var e=d.split("\n").length,f=this.s.dt.nTFoot===null?e-1:e-2,g=f==1?"":"s";this.fnInfo("<h6>Table copied</h6><p>Copied "+f+" row"+g+" to the clipboard.</p>",1500)}}),pdf:a.extend({},TableTools.buttonBase,{sAction:"flash_pdf",sNewLine:"\n",sFileName:"*.pdf",sButtonClass:"DTTT_button_pdf",sButtonText:"PDF",sPdfOrientation:"portrait",sPdfSize:"A4",sPdfMessage:"",fnClick:function(a,b,c){this.fnSetText(c,"title:"+this.fnGetTitle(b)+"\n"+"message:"+b.sPdfMessage+"\n"+"colWidth:"+this.fnCalcColRatios(b)+"\n"+"orientation:"+b.sPdfOrientation+"\n"+"size:"+b.sPdfSize+"\n"+"--/TableToolsOpts--\n"+this.fnGetTableData(b))}}),print:a.extend({},TableTools.buttonBase,{sInfo:"<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.",sMessage:null,bShowAll:!0,sToolTip:"View print view",sButtonClass:"DTTT_button_print",sButtonText:"Print",fnClick:function(a,b){this.fnPrint(!0,b)}}),text:a.extend({},TableTools.buttonBase),select:a.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(b,c){this.fnGetSelected().length!==0?a(b).removeClass(this.classes.buttons.disabled):a(b).addClass(this.classes.buttons.disabled)},fnInit:function(b,c){a(b).addClass(this.classes.buttons.disabled)}}),select_single:a.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(b,c){var d=this.fnGetSelected().length;d==1?a(b).removeClass(this.classes.buttons.disabled):a(b).addClass(this.classes.buttons.disabled)},fnInit:function(b,c){a(b).addClass(this.classes.buttons.disabled)}}),select_all:a.extend({},TableTools.buttonBase,{sButtonText:"Select all",fnClick:function(a,b){this.fnSelectAll()},fnSelect:function(b,c){this.fnGetSelected().length==this.s.dt.fnRecordsDisplay()?a(b).addClass(this.classes.buttons.disabled):a(b).removeClass(this.classes.buttons.disabled)}}),select_none:a.extend({},TableTools.buttonBase,{sButtonText:"Deselect all",fnClick:function(a,b){this.fnSelectNone()},fnSelect:function(b,c){this.fnGetSelected().length!==0?a(b).removeClass(this.classes.buttons.disabled):a(b).addClass(this.classes.buttons.disabled)},fnInit:function(b,c){a(b).addClass(this.classes.buttons.disabled)}}),ajax:a.extend({},TableTools.buttonBase,{sAjaxUrl:"/xhr.php",sButtonText:"Ajax button",fnClick:function(b,c){var d=this.fnGetTableData(c);a.ajax({url:c.sAjaxUrl,data:[{name:"tableData",value:d}],success:c.fnAjaxComplete,dataType:"json",type:"POST",cache:!1,error:function(){alert("Error detected when sending table data to server")}})},fnAjaxComplete:function(a){alert("Ajax complete")}}),div:a.extend({},TableTools.buttonBase,{sAction:"div",sTag:"div",sButtonClass:"DTTT_nonbutton",sButtonText:"Text button"}),collection:a.extend({},TableTools.buttonBase,{sAction:"collection",sButtonClass:"DTTT_button_collection",sButtonText:"Collection",fnClick:function(a,b){this._fnCollectionShow(a,b)}})},TableTools.classes={container:"DTTT_container",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"},collection:{container:"DTTT_collection",background:"DTTT_collection_background",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"}},select:{table:"DTTT_selectable",row:"DTTT_selected"},print:{body:"DTTT_Print",info:"DTTT_print_info",message:"DTTT_PrintMessage"}},TableTools.classes_themeroller={container:"DTTT_container ui-buttonset ui-buttonset-multi",buttons:{normal:"DTTT_button ui-button ui-state-default"},collection:{container:"DTTT_collection ui-buttonset ui-buttonset-multi"}},TableTools.DEFAULTS={sSwfPath:"/assets/dataTables/extras/swf/copy_csv_xls_pdf.swf",sRowSelect:"none",sSelectedClass:null,fnPreRowSelect:null,fnRowSelected:null,fnRowDeselected:null,aButtons:["copy","csv","xls","pdf","print"],oTags:{container:"div",button:"a",liner:"span",collection:{container:"div",button:"a",liner:"span"}}},TableTools.prototype.CLASS="TableTools",TableTools.VERSION="2.1.3",TableTools.prototype.VERSION=TableTools.VERSION,typeof a.fn.dataTable=="function"&&typeof a.fn.dataTableExt.fnVersionCheck=="function"&&a.fn.dataTableExt.fnVersionCheck("1.9.0")?a.fn.dataTableExt.aoFeatures.push({fnInit:function(a){var b=typeof a.oInit.oTableTools!="undefined"?a.oInit.oTableTools:{},c=new TableTools(a.oInstance,b);return TableTools._aInstances.push(c),c.dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download"),a.fn.DataTable.TableTools=TableTools})(jQuery,window,document);