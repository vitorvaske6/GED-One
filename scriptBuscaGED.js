var counter = 0;
var logmessage = 'LOG OF TASKS\n';
var errmessage = 'ERRORS\n' + space.name;

var pasta = companyhome.childByNamePath("Sites/printer-one-contratos/documentLibrary/Repositorio/Contratos Ativos");
//errmessage = errmessage + nodes.name;

var pastaLog = companyhome.childByNamePath("Logs");

if (pasta.isContainer) {
	update(pasta);

	logger.log(logmessage);
	logfile = pastaLog.createFile('Log ' + pastaLog.children.length +'.txt');
	logfile.content=logmessage + 'UPDATED: '+counter.toString() +'\n' + errmessage;
	logfile.properties.encoding = 'UTF-8';
	logfile.properties.mimetype = 'text/plain';
	logfile.properties.title = 'Log';
	logfile.properties.description = 'log ';
	logfile.save();

}

function update(nodes) {

	for each(node in nodes.children) {
		counter = counter + 1;
		if(node.isDocument){
			errmessage = errmessage + "\nsou um documento" ;
			try{
				verifica(node);
			}
			catch(err) {
				errmessage += err;
			}

		}
		else{
			if(node.isContainer){
				update(node);
			}
		}
	}
}

function verifica(documento) {
	errmessage = errmessage + "\nto verificando o documento: \n" + documento;

	const dataHoje = new Date();
	const dataFinal = documento.properties["printerOneContratos:dataFim"];
	const dataInicial = documento.properties["printerOneContratos:dataInicio"];
	const diferenca = Math.abs(dataHoje.getTime() - dataFinal.getTime()); // Subtrai uma data pela outra
	const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).

	const diaDataHoje = dataHoje.getUTCDate();
	const mesDataHoje = dataHoje.getUTCMonth();
	const diaDataInicial = dataInicial.getUTCDate();
	const mesDataInicial = dataInicial.getUTCMonth();
	
	const anoDataHoje = dataHoje.getUTCFullYear();
	const anoDataFinal = dataFinal.getUTCFullYear();


	var assunto = new String("modificações no documento");
	var texto = new String("Faltam " + dias + " dias para o documento " + documento.name + " vencer.");

	if (dataFinal.getTime() < dataHoje.getTime()) {
		errmessage = errmessage + "\nto vencido\n";
		assunto = "O documento " + documento.name + " venceu!";
		texto = "O documento " + documento.name + " venceu.";
		sendMail(assunto, texto, documento);

	}
	else {
		errmessage = errmessage + "\nNão to vencido\n";

		assunto = "O documento " + documento.name + " está prestes a vencer !";

		if (dias == 90 || dias == 60 || dias == 30 || dias == 15 || dias == 10 || dias == 1) {
			if (dias == 1) {
				assunto = "O documento " + documento.name + " vence amanhã.";
				texto = "O documento " + documento.name + " vence amanhã.";
				sendMail(assunto, texto, documento);
			} else {
				errmessage = errmessage + "\nto no else dias == 1\n";
				sendMail(assunto, texto, documento);
			}
		}

		if (anoDataFinal == anoDataHoje){
			errmessage = errmessage + "\nnão preciso de reajuste\n";
		}else{
			errmessage = errmessage + "\ndiaDataHoje " + diaDataHoje + "\ndiaDataInicial " + mesDataInicial+ "\nmesDataHoje " + mesDataHoje + "\nmesDataInicial " + mesDataInicial;
			if (diaDataHoje == diaDataInicial && mesDataInicial == (mesDataHoje - 1)) {
				errmessage = errmessage + "\nVim para reajuste\n";
				assunto = "Índice de Reajuste para o documento: " + documento.name + ".";
				texto = "O documento " + documento.name + " deve ter seu índice reajustado.";
				sendMail(assunto, texto, documento);
			}
		}   
	}
}

function sendMail(assunto, texto, documento) {

	var site = siteService.getSite('printer-one-contratos');
	var members = site.listMembers(null, null, 0, false); // parametros são nameFilter, roleFilter, size e collapseGroup - SiteManager para os gerentes

	for (userName in members) {

		var person = people.getPerson(userName);
		var email = person.properties["cm:email"];

		var mail = actions.create("mail");
		mail.parameters.to = email;
		mail.parameters.subject = assunto;
		mail.parameters.text = "Olá " + person.properties.firstName + ",\n\n" + texto + "\n\nAtenciosamente,\nSoluções Printer One.";
		mail.execute(documento);

	}

}



