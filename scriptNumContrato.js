var counter = 0;
var logmessage = 'LOG OF TASKS\n';
var errmessage = 'ERRORS\n' + space.name;

var pasta = companyhome.childByNamePath("Sites/printer-one-contratos/documentLibrary/Repositorio/Contratos Ativos");
//errmessage = errmessage + nodes.name;

var pastaLog = companyhome.childByNamePath("Logs");

var cont = 0;

errmessage = errmessage + "\n To antes do if container";

if (pasta.isContainer) {
	errmessage = errmessage + "\n To no if container";

	update(pasta);

//	logger.log(logmessage);
//	logfile = pastaLog.createFile('LogScriptNum ' + pastaLog.children.length + '.txt');
//	logfile.content = logmessage + 'UPDATED: ' + counter.toString() + '\n' + errmessage;
//	logfile.properties.encoding = 'UTF-8';
//	logfile.properties.mimetype = 'text/plain';
//	logfile.properties.title = 'Log';
//	logfile.properties.description = 'log ';
//	logfile.save();

}

function update(nodes) {
	errmessage = errmessage + "\n To no function update";

	if (nodes.children.length == 0){
		errmessage = errmessage + "\nsou um documento e a pasta está vazia";

		document.properties["printerOneContratos:numeroExistente"] = false;
		var nomeDocEmptyFolder = document.properties["printerOneContratos:numeroContrato"] + " - " + document.properties["printerOneContratos:nomeFantasia"]+".pdf";
		document.properties["cm:name"] = nomeDocEmptyFolder;

		const dataFinal2 = document.properties["printerOneContratos:dataFim"];
		const dataInicial2 = document.properties["printerOneContratos:dataInicio"];
		var meses2 = (dataFinal2.getUTCMonth() - dataInicial2.getUTCMonth()) + ((dataFinal2.getUTCFullYear() - dataInicial2.getUTCFullYear())*12) + " meses";
		document.properties["printerOneContratos:vigenciaContrato"] = meses2;
		document.save();
	}
	else{

		for each(node in nodes.children) {
			counter = counter + 1;
			errmessage = errmessage + "\n To no for each";
			if(node.isDocument){
				errmessage = errmessage + "\nsou um documento";
				verifica(node);
				if(cont == 1){
					document.properties["printerOneContratos:numeroExistente"] = true;
					document.save();
				}
				else{
					if(cont == 0){
						document.properties["printerOneContratos:numeroExistente"] = false;
						var nomeDoc = document.properties["printerOneContratos:numeroContrato"] + " - " + document.properties["printerOneContratos:nomeFantasia"]+".pdf";
						document.properties["cm:name"] = nomeDoc;
						document.save();
					}
				}
			}
			else{
				errmessage = errmessage + "\nNão sou um documento";
				if(node.isContainer){
					update(node);
				}
			}
		}

		errmessage = errmessage + "\n passei do for each node.children:" + nodes.children.length ;
	}
}

function verifica(documento) {
	const dataFinal = document.properties["printerOneContratos:dataFim"];
	const dataInicial = document.properties["printerOneContratos:dataInicio"];
	var meses = (dataFinal.getUTCMonth() - dataInicial.getUTCMonth()) + ((dataFinal.getUTCFullYear() - dataInicial.getUTCFullYear())*12) + " meses";
	document.properties["printerOneContratos:vigenciaContrato"] = meses;
	document.save();

	errmessage = errmessage + "\n Verificação antes de mudar " + document.properties["printerOneContratos:numeroExistente"];

	if (documento.properties["printerOneContratos:numeroContrato"] == document.properties["printerOneContratos:numeroContrato"]) {
		errmessage = errmessage + "\nnumero de contrato JÁ EXISTE " + document.properties["printerOneContratos:numeroExistente"];
		cont = 1;
	}
	else{
		errmessage = errmessage + "\nnumero de contrato ok " + document.properties["printerOneContratos:numeroExistente"];

	}

}