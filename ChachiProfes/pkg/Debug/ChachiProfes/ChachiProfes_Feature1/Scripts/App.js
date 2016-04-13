var currentContext;
var hostWebContext;
var web;
var list;

function getQueryStringParams(sParam) {

    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function getListConocimientos() {

    var lista = hostWebContext.get_web().get_lists().getByTitle("Conocimientos");
    // var lista = currentContext.get_web().get_lists().getByTitle("ConocimientosList");
    var query = new SP.CamlQuery();
    // query.set_viewXml("<Query> <OrderBy> <FieldRef Name='Habilidad'/> </OrderBy></Query>");
    list = lista.getItems(query);
    currentContext.load(list);
    currentContext.executeQueryAsync(Function.createDelegate(this, onSuccessCon), Function.createDelegate(this, onFail));
}

function getListProfesores() {

    var lista = hostWebContext.get_web().get_lists().getByTitle("Profesores");
    var query = new SP.CamlQuery();
    query.set_viewXml("<Query> <OrderBy> <FieldRef Name='Valoraciones'/> </OrderBy></Query>");
    list = lista.getItems(query);
    currentContext.load(list);
    currentContext.executeQueryAsync(Function.createDelegate(this, onSuccessProf), Function.createDelegate(this, onFail));
}

function onFail(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function onSuccessCon() {

    if (list.get_count() != 0) {

        var listEnum = list.getEnumerator();
        var tabla = $("#Hab");
        while (listEnum.moveNext()) {
            var html = "<tr>";
            var actual = listEnum.get_current();
            var habilidad = actual.get_item("Title");
            html += "<td><button type='button' onclick='buscar(\"" + habilidad + "\")' >" + habilidad + "</button></td>";
            tabla.append(html);
        }

    }
}

function onSuccessProf() {

    if (list.get_count() != 0) {

        var listEnum = list.getEnumerator();
        var tabla = $("#Prof");
        while (listEnum.moveNext()) {
            var html = "<tr><td><p>PROFESOR</td><td>VALORACIONES</p></td></tr>";
            var actual = listEnum.get_current();
            html += "<tr><td><p>" + actual.get_item("Profesor") + "</td><td>" + actual.get_item("Valoraciones") + "</p></td></tr>";
            tabla.append(html);
        }
    }
}

function init() {
    var hostUrl = decodeURIComponent(getQueryStringParams("SPHostUrl"));
    currentContext = new SP.ClientContext.get_current();
    hostWebContext = new SP.AppContextSite(currentContext, hostUrl);
    web = hostWebContext.get_web();
    var id = getQueryStringParams("SPListItemId");
    getListConocimientos();
    getListProfesores();

}


function buscar(habilidad) {
    var tabla = $("#tabdin");
    var html = "<tr>";
    html += "<td>" + habilidad + "</td></tr>";
    tabla.html(html);
}

$(document).ready(function () {
    ExecuteOrDelayUntilScriptLoaded(init, "sp.js");
    
});
