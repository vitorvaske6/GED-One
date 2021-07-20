<#--
    Primary author
	Title  : Datatable property type for Alfresco Share
	Author : Matija Svoren, msvoren@gmail.com
	Version: 1.0
-->
<#--
    Updated by
	Title  : Datatable property type for Alfresco Share -- Updated for multiple tables
	Author : Vitor Vasconcelos, vitorvaske6@hotmail.com
	Version: 2.0
-->

<@link rel="stylesheet" type="text/css" href="/share/yui/datatable/assets/skins/sam/datatable.css"  />
<@script type="text/javascript" src="${url.context}/yui/datasource/datasource-min.js" ></@script>
<#--<@script type="text/javascript" src="http://yui.yahooapis.com/2.8.2r1/build/datatable/datatable-min.js" ></@script>-->
<@script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/datatable/datatable-min.js" ></@script>
<#--script type="text/javascript" src="${url.context}/yui/datatable/datatable-min.js"></script-->

<style>
    .delButton {
        font-size: 14px;
        font-weight: bold;
        color: red;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .addButton {
        font-size: 14px;
        font-weight: bold;
        color: blue;
        padding: 7px;
        cursor: pointer;
    }
</style>

<#if field.control.params.config?exists><#assign dtConfig = field.control.params.config><#else><#assign dtConfig = "false"></#if>
<#if field.control.params.debug?exists> <#assign debug = field.control.params.debug><#else>    <#assign debug = "false">   </#if>

<#--
    To use as another table, create a new file and change "equipamentos" to whatever you need. (changes might be needed in share-config-custom.xml)
-->
<#if field??>
    <label onclick="initDTPequipamentos" for="${fieldHtmlId}">Equipamentos do Contrato:<#if field.mandatory><span
                class="mandatory-indicator">${msg("form.required.fields.marker")}</span><span onclick="initDTPequipamentos()" id="${fieldHtmlId}_show" style="cursor: pointer;"> (Clique Aqui Visualizar os Equipamentos) </span></#if></label>
    <textarea id="${fieldHtmlId}" name="${field.name}" rows="5" cols="250"
              <#if field.control.params.styleClass?exists>class="${field.control.params.styleClass}"</#if>
            <#if debug == "false">style="visibility:hidden; height:0px;"<#else>type="text"</#if>
	 >${field.value}
	</textarea>
    <div id="dtContainer">
        <div class="yui-skin-sam" id="dtpEquipamentos-dt"></div>
    </div>
</#if>


<@inlineScript type="text/javascript" >//<![CDATA[

    var initDTPequipamentos = function(){
        DTPequipamentos.init("${fieldHtmlId}", "${dtConfig?html}", "${form.mode}", "${field.label?html}");
        document.getElementById('${fieldHtmlId}_show').style.display = 'none';
    }

    if (window.addEventListener) {
        window.addEventListener('load', function () {
            initDTPequipamentos();
        });
    } else if (window.attachEvent) {
        window.attachEvent('onload', function () {
            initDTPequipamentos();
        });
    } else {
        window.onload = function (e) {
            initDTPequipamentos();
        };
    }


    if (typeof (DTPequipamentos) == "undefined") {
    var DTPequipamentos = {};
    }

    DTPequipamentos = {
    jsonProp: null,
    columnDefinitions: [],
    readOnly: false,
    label: "Datatable property",

    init: function (fieldHtmlId, config, view, label) {
    this.dtConfig = config;
    this.label = label;
    if (view == "view") {
    this.readOnly = true;
    }
    this.jsonProp = YAHOO.util.Dom.get(fieldHtmlId);
    DTPequipamentos.drawDatatable(YAHOO.lang.trim(this.jsonProp.value));
    },

    /*
    generates datatable using JSON string from text field
    */
    drawDatatable: function (jsonString) {
    if (!jsonString || jsonString == "") jsonString = "{}";
    var jsonData = eval("(" + jsonString + ")"); //TODO, eval is AlfrescoShare's way, probably best to replace with JSON.parse

    DTPequipamentos.getTableDefinition();

    /* datatable columns are retreived based on table definition */
    var getMyKeys = function () {
    var columnsList = [];
    for (var c in DTPequipamentos.columnDefinitions) {
    if (DTPequipamentos.columnDefinitions[c].type == "date") {
    columnsList.push({key: DTPequipamentos.columnDefinitions[c].key, parser: "date"});
    } else {
    columnsList.push(DTPequipamentos.columnDefinitions[c].key);
    }
    }
    return columnsList;
    };

    var jsonSource = new YAHOO.util.DataSource(jsonData);
    jsonSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
    jsonSource.responseSchema = {fields: getMyKeys()};

    this.dtpEquipamentosDatatable = new YAHOO.widget.DataTable("dtpEquipamentos-dt", DTPequipamentos.columnDefinitions, jsonSource);

    DTPequipamentos.datatableEvents();
    },

    /*
    adds events to datatable, add row, remove row, highlight, open edit cell...
    */
    datatableEvents: function () {

    if (!DTPequipamentos.readOnly) {
    /* create "add" button */
    //get last th cell, and attach 'add' event
    var lastCellNo = DTPequipamentos.dtpEquipamentosDatatable.getTheadEl().rows[0].cells.length - 1;
    this.newRowButton = DTPequipamentos.dtpEquipamentosDatatable.getTheadEl().rows[0].cells[lastCellNo];
    var addButton = document.createElement('span');
    addButton.innerHTML = '+';
    addButton.title = 'Adicionar equipamento';
    addButton.className = "addButton";
    YAHOO.util.Event.addListener(addButton, 'click', function (e) {
    var rowData = {delete: "-"};
    var record = YAHOO.widget.DataTable._cloneObject(rowData);
    DTPequipamentos.dtpEquipamentosDatatable.addRow(record);
    });
    this.newRowButton.appendChild(addButton);
    /* add "-" to each delete column */
    var elementsByClassName = YAHOO.util.Dom.getElementsByClassName('delButton', 'td');
    for (e in elementsByClassName) {
    elementsByClassName[e].innerHTML = "<div class='yui-dt-liner'>-</div>";
    }
    }

    this.highlightEditableCell = function (oArgs) {
    var elCell = oArgs.target;
    if (YAHOO.util.Dom.hasClass(elCell, "yui-dt-editable")) {
    this.highlightCell(elCell);
    }
    };

    DTPequipamentos.dtpEquipamentosDatatable.subscribe("cellMouseoverEvent", this.highlightEditableCell);
    DTPequipamentos.dtpEquipamentosDatatable.subscribe("cellMouseoutEvent", DTPequipamentos.dtpEquipamentosDatatable.onEventUnhighlightCell);

    /* save, update json string after save event */
    DTPequipamentos.dtpEquipamentosDatatable.subscribe("editorSaveEvent", function (oArgs) {
    DTPequipamentos.dtToJson();
    });

    /* delete row event, or, by default, open cell to edit */
    DTPequipamentos.dtpEquipamentosDatatable.subscribe('cellClickEvent', function (oArgs) {
    var target = oArgs.target;
    var column = DTPequipamentos.dtpEquipamentosDatatable.getColumn(target);
    if (column.key == 'delete') DTPequipamentos.handleConfirm(target);
    else DTPequipamentos.dtpEquipamentosDatatable.onEventShowCellEditor(oArgs);
    });

    /* if in read mode, popup datatable on click */
    if (DTPequipamentos.readOnly) {
    DTPequipamentos.dtpEquipamentosDatatable.subscribe('cellClickEvent', function () {
    DTPequipamentos.popupDT();
    });
    DTPequipamentos.tooltip = new YAHOO.widget.Tooltip("dtpEquipamentos-tooltip", {
    context: "dtpEquipamentos-dt",
    text: "Click on datagrid to popup!"
    });
    }
    },

    /*
    confirm dialog when deleting row
    */
    handleConfirm: function (toDelete) {

    var handleYes = function () {
    this.hide();
    DTPequipamentos.dtpEquipamentosDatatable.deleteRow(toDelete);
    DTPequipamentos.dtToJson();
    return true;
    };
    var handleNo = function () {
    this.hide();
    return false;
    };

    var confirmDialog = new YAHOO.widget.SimpleDialog('DTPequipamentosconfirmDialog', {
    width: '300px',
    fixedcenter: true,
    visible: false,
    draggable: false,
    close: true,
    text: "Are you sure you want to delete this row?",
    constraintoviewport: true,
    buttons: [{text: 'Yes', handler: handleYes, isDefault: true}, {text: 'No', handler: handleNo}]
    });

    confirmDialog.setHeader('Delete row');
    confirmDialog.render(document.body);
    confirmDialog.show();

    },

    /*
    brings datatable in popup dialog
    */
    popupDT: function () {

    var handleClose = function () {
    YAHOO.util.Dom.get("dtContainer").appendChild(YAHOO.util.Dom.get("dtpEquipamentos-dt"));
    DTPequipamentos.dtpEquipamentosDatatable.subscribe('cellClickEvent', function () {
    DTPequipamentos.popupDT();
    });
    this.hide();
    return true;
    };

    var confirmDialog = new YAHOO.widget.SimpleDialog('dtDialog', {
    fixedcenter: true,
    visible: false,
    draggable: true,
    close: false,
    constraintoviewport: true,
    modal: true,
    buttons: [{text: 'Close', handler: handleClose, isDefault: true}]
    });

    DTPequipamentos.dtpEquipamentosDatatable.unsubscribe('cellClickEvent');
    confirmDialog.setHeader(DTPequipamentos.label);
    confirmDialog.setBody(YAHOO.util.Dom.get("dtpEquipamentos-dt"));
    confirmDialog.render(document.body);
    confirmDialog.show();

    },

    /*
    gets table definition from what was provided in XML configuration. Parses parameter string to get definition.
    Sets-up formattters and editors according to column definition.
    */
    getTableDefinition: function () {
    var getFormatter = function (t) {
    switch (t) {
    case "currency"    :
    return YAHOO.widget.DataTable.formatCurrency;
    break;
    case "number":
    return YAHOO.widget.DataTable.formatNumber;
    case "email":
    return YAHOO.widget.DataTable.formatEmail;
    break;
    case "date"    :
    return YAHOO.widget.DataTable.formatDate;
    break;
    default    :
    return YAHOO.widget.DataTable.formatText;
    break;
    }
    return t;
    };

    var getEditor = function (t, options) {
    if (DTPequipamentos.readOnly == true) return null;
    switch (t) {
    case "currency"    :
    return new YAHOO.widget.TextboxCellEditor();
    break;
    case "number"    :
    return new YAHOO.widget.TextboxCellEditor();
    break;
    case "date"    :
    return new YAHOO.widget.DateCellEditor();
    break;
    case "radio"    :
    return new YAHOO.widget.RadioCellEditor({radioOptions: options, disableBtns: true});
    break;
    case "checkbox"    :
    return new YAHOO.widget.CheckboxCellEditor({checkboxOptions: options});
    break;
    case "dropdown"    :
    return new YAHOO.widget.DropdownCellEditor({multiple: false, dropdownOptions: options});
    break;
    default    :
    return new YAHOO.widget.TextboxCellEditor();
    break;
    }
    }

    DTPequipamentos.dtConfig = DTPequipamentostrim(DTPequipamentos.dtConfig, ["&quot;"]); /* handles quotes if there's any */

    definition = DTPequipamentos.dtConfig.split(";")

    for (var e = 0; e < definition.length; e++) {
    var columns = definition[e].split(",");
    if (columns && columns.length == 3) definition[e] = [DTPequipamentostrim(columns[0]), DTPequipamentostrim(columns[1]), DTPequipamentostrim(columns[2]), null];
    else if (columns && columns.length > 3) {
    var l = [];
    for (i = 3; i < columns.length; i++) l.push(DTPequipamentostrim(columns[i], ["'", "[", "]"]));
    definition[e] = [DTPequipamentostrim(columns[0]), DTPequipamentostrim(columns[1]), DTPequipamentostrim(columns[2]), l];
    } else { // alert("Wrong datatable definition!" + (columns[0] ? " (at column)" + columns[0] : "" ));
    }
    }

    function DTPequipamentostrim(s, toRemove) {
    for (var t in toRemove)
    while (s.indexOf(toRemove[t]) != -1) {
    s = s.replace(toRemove[t], "");
    }
    return YAHOO.lang.trim(s);
    }


    for (var c in definition)
    if (definition[c][0] && definition[c][0] != "") this.columnDefinitions.push({
    "key": definition[c][0],
    "label": definition[c][1],
    "type": definition[c][2],
    formatter: getFormatter(definition[c][2]),
    sortable: true,
    resizable: true,
    editor: getEditor(definition[c][2], definition[c][3])
    });

    if (!this.readOnly) this.columnDefinitions.push({key: "delete", label: " ", className: "delButton"});
    },

    /*
    Gets datatable values in object, then converts object to JSON string
    */
    dtToJson: function () {
    var records = DTPequipamentos.dtpEquipamentosDatatable.getRecordSet().getRecords();
    var str = [];
    for (var i = 0; i < records.length; i++) {
    var o = {};
    var keys = DTPequipamentos.dtpEquipamentosDatatable.getColumnSet().keys;
    for (var j = 0; j < keys.length; j++) o[keys[j].getKey()] = records[i].getData(keys[j].getKey());
    str.push(o);
    }
    DTPequipamentos.jsonProp.value = YAHOO.lang.JSON.stringify(str);
    }
    };

    //]]></@inlineScript>