var contratos = search.luceneSearch('PATH:\"/app:company_home/st:sites/cm:printer-one-contratos/cm:documentLibrary/cm:Repositorio//*\" AND +ASPECT:\"{http://www.printerOneContratos.com/model/content/1.0}printerOneContratos\"');

if (contratos == null || contratos.length == 0) {
    status.code = 404;
    status.message = "Nenhum contrato encontrado";
    status.redirect = true;
}
else{
	var contratoInfo = new Array();

	for (i = 0; i < contratos.length; i++) {
		var contrato = new contratoEntry(contratos[i]);
		contratoInfo[i] = contrato;
	}

	model.contratos = contratoInfo;
}

function contratoEntry(contrato) {
	this.contrato = contrato;
}