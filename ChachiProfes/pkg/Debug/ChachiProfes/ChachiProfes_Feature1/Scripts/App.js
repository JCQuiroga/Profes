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
    var query = new SP.CamlQuery();
    list = lista.getItems(query);
    currentContext.load(list);
    currentContext.executeQueryAsync(Function.createDelegate(this, onSuccessCon), Function.createDelegate(this, onFail));
}
function onSuccessCon() {

    if (list.get_count() != 0) {

        var listEnum = list.getEnumerator();
        var tabla = $("#Hab");
        var html = "";
        while (listEnum.moveNext()) {
            
            var actual = listEnum.get_current();
            var habilidad = actual.get_item("Title");
            html += "<td><button type='button' onclick='buscar(\"" + habilidad + "\")' >" + habilidad + "</button></td>";
            
        }
        tabla.html(html);
    }
}

function buscar() {
    var lista = hostWebContext.get_web().get_lists().getByTitle("Profesores");
    var query = new SP.CamlQuery();
    query.set_viewXml(
        "<Query><Where><Eq><FieldRef Name=\"Title\"/><Value Type=\"Text\">Doraemon</Value></Eq></Where></Query>"
        );
    list = lista.getItems(query);
    currentContext.load(list);
    currentContext.executeQueryAsync(Function.createDelegate(this, onSuccessProf), Function.createDelegate(this, onFail));

}

function onFail(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function limpiar() {

    $("#tabdin").html("");

}
function getListProfesores() {

    var lista = hostWebContext.get_web().get_lists().getByTitle("Profesores");
    var query = new SP.CamlQuery();
    query.set_viewXml(
        "<Query><Where><Eq><FieldRef Name=\"Title\"/><Value Type=\"Text\">Doraemon</Value></Eq></Where></Query>"
        );
    list = lista.getItems(query);
    currentContext.load(list);
    currentContext.executeQueryAsync(Function.createDelegate(this, onSuccessProf), Function.createDelegate(this, onFail));
}


function onSuccessProf() {
    if (list.get_count() != 0) {

        var listEnum = list.getEnumerator();
        var tabla = $("#tabdin");
        var html = "<tr><th>PROFESOR</th><th>VALORACIONES</th></tr>";
        while (listEnum.moveNext()) {
            var actual = listEnum.get_current();
            var prof = actual.get_item("Title");
            var valor = actual.get_item("Valoraciones");
            html += "<tr><td>" + prof + "</td><td>" + valor + "</td></tr>";
            
           }

        tabla.html(html);
    }
}

function chapu() {
    //if (list.get_count() != 0) {

    //    var listEnum = list.getEnumerator();
    var tabla = $("#tabdin");
    var html = "<tr><th>PROFESOR</th><th>VALORACIONES</th></tr>";
    //    while (listEnum.moveNext()) {
    //        var actual = listEnum.get_current();
    //        var prof = actual.get_item("Title");
    //        var valor = actual.get_item("Valoraciones");
    //        html += "<tr><td>" + prof + "</td><td>" + valor + "</td></tr>";

    //    }
    html += "<tr><td>" + "Fracisco LLopes" + "</td><td>" + "12" + "</td></tr>";
    html += "<tr><td>" + "Luis Gil" + "</td><td>" + "10" + "</td></tr>";
    html += "<tr><td>" + "Gru" + "</td><td>" + "7" + "</td></tr>";
    html += "<tr><td>" + "Kylo Ren" + "</td><td>" + "4,9" + "</td></tr>";
    html += "<tr><td>" + "Mariano Rajoy" + "</td><td>" + "3" + "</td></tr>";
    html += "<tr><td>" + "Juanito" + "</td><td>" + "2" + "</td></tr>";
    html += "<tr><td>" + "Jorge Bautista" + "</td><td>" + "1" + "</td></tr>";
    html += "<tr><td>" + "Nacho" + "</td><td>" + "-10" + "</td></tr>";

    tabla.html(html);
}


//if (list.get_count() != 0) {

//    var listEnum = list.getEnumerator();
//    var tabla = $("#Prof");
//    var html = "<th><td>PROFESOR</td><td>VALORACIONES</td></th>";
//    while (listEnum.moveNext()) {

//        var actual = listEnum.get_current();
//        html += "<tr><td>" + actual.get_item("Title") + "</td><td>" + actual.get_item("Valoraciones") + "</td></tr>";

//    }
//    tabla.html(html);
//}


function init() {
    var hostUrl = decodeURIComponent(getQueryStringParams("SPHostUrl"));
    currentContext = new SP.ClientContext.get_current();
    hostWebContext = new SP.AppContextSite(currentContext, hostUrl);
    web = hostWebContext.get_web();
    var id = getQueryStringParams("SPListItemId");
}




$(document).ready(function () {
    ExecuteOrDelayUntilScriptLoaded(init, "sp.js");
});
