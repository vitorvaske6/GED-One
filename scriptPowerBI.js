var counter = 0;
var logmessage = 'LOG OF TASKS\n';
var errmessage = 'ERRORS\n' + space.name;

var pasta = companyhome.childByNamePath("Sites/printer-one-contratos/documentLibrary/Repositorio/Contratos Ativos");
//errmessage = errmessage + nodes.name;
var pastaTeste = companyhome.childByNamePath("Teste/Pasta");
var pastaLog = companyhome.childByNamePath("Logs");
var pastaPBI = companyhome.childByNamePath("Sites/printer-one-contratos/documentLibrary/Repositorio/PowerBI");

var numLinha = 1;

var nomeFantasia = [];
var cnpj = [];
var tipoDoc = document.properties["gedbi:BItDocumento"];
var tipoInd = document.properties["gedbi:BItIndice"];
var dataInicio = document.properties["gedbi:BIdataInicio"];
var dataFim = document.properties["gedbi:BIdataFim"];
var status = document.properties["gedbi:BIstatus"];
var valorMinimo = document.properties["gedbi:BIvalorMinimo"];
var valorMaximo = document.properties["gedbi:BIvalorMaximo"];

var qtd = [];
var desc = [];
var valorUni = [];
var total = [];
var tabelaEquipamentoColuna = [];
var tabelaEquipamentoLinhas = [];

var nome = [];
var email = [];
var tel = [];

var tabelaContatoColuna = [];
var tabelaContatoLinhas = [];

var saidaColunas = "";
var saidaLinhas = [];

var saidaMaiorEquipamento = 1;
var saidaMenorEquipamento = 1;
var saidaMaiorContato = 1;

saidaColunas = "NENHUM DOCUMENTO ENCONTRADO";

if (pasta.isContainer) {
	//update(pasta);

	update(pasta);


	logger.log(logmessage);
	logfile = pastaLog.createFile('LogPowerBI ' + pastaLog.children.length + '.txt');
	logfile.content = logmessage + 'UPDATED: ' + counter.toString() + '\n' + errmessage;
	logfile.properties.encoding = 'UTF-8';
	logfile.properties.mimetype = 'text/plain';
	logfile.properties.title = 'Log';
	logfile.properties.description = 'log ';
	logfile.save();

	

	document.content = saidaColunas + saidaLinhas;
	document.name = "GED BI " + pastaPBI.children.length + ".csv";
	document.properties.encoding = 'UTF-8';
	document.properties.mimetype = 'text/csv';
	document.save();

}

function update(nodes) {
	errmessage = errmessage + "\nPasta:" + nodes.name + "\n\n";

	//seta saidaMaiorEquipamento e saidaMaiorContato 
	for each(node in nodes.children) {
		counter = counter + 1;
		if(node.isDocument){
			try{
				filtraMaior(node);
			}
			catch(err) {
				errmessage += err;
			}
		}
		else {
			if (node.isContainer) {
				update(node);
			}
		}
	}

	for each(node in nodes.children) {
		counter = counter + 1;
		if(node.isDocument){
			try{
				verifica(node);
			}
				catch(err) {
				errmessage += err;
			}

		}
		else {
			if (node.isContainer) {
				update(node);
			}
		}
	}

}

function filtraMaior(documento) {

	var valorEquip = (documento.properties["printerOneContratos:equipamentosContrato"].match(new RegExp("delete", "g")) || []).length;
	var valorCont = (documento.properties["printerOneContratos:contatosCliente"].match(new RegExp("delete", "g")) || []).length;

	if ((document.properties["gedbi:BInomeFantasia"].match(new RegExp('"', "g")) || []).length > 0) {

		var nomeFantasiaArray = [];
		nomeFantasiaArray = formatarTabela(document.properties["gedbi:BInomeFantasia"]);
		var valorNome = (document.properties["gedbi:BInomeFantasia"].match(new RegExp("delete", "g")) || []).length;
		tabelaNomeFantasia(nomeFantasiaArray, valorNome);
		
		for (var i = 0; i <= valorNome - 1; i++) {
			if (nomeFantasia[i] == documento.properties["printerOneContratos:nomeFantasia"]) {
				if(filtroComum(documento)){
					if (valorEquip > saidaMaiorEquipamento) {
						saidaMaiorEquipamento = valorEquip;
					}
					if (valorCont > saidaMaiorContato) {
						saidaMaiorContato = valorCont;
					}
				}
			}
		}
	}
	else{
		if(filtroComum(documento)){
			if (valorEquip > saidaMaiorEquipamento) {
				saidaMaiorEquipamento = valorEquip;
			}
			if (valorCont > saidaMaiorContato) {
				saidaMaiorContato = valorCont;
			}
		}
	}

	if ((document.properties["gedbi:BIcnpj"].match(new RegExp('"', "g")) || []).length > 0) {
		var cnpjArray = [];
		cnpjArray = formatarTabela(document.properties["gedbi:BIcnpj"]);
		var valorCnpj = (document.properties["gedbi:BIcnpj"].match(new RegExp("delete", "g")) || []).length;
		tabelaCnpj(cnpjArray, valorCnpj);

		for (var i = 0; i <= valorCnpj - 1; i++) {
			if (cnpj[i] == documento.properties["printerOneContratos:cnpj"]) {
				if(filtroComum(documento)){
					if (valorEquip > saidaMaiorEquipamento) {
						saidaMaiorEquipamento = valorEquip;
					}
					if (valorCont > saidaMaiorContato) {
						saidaMaiorContato = valorCont;
					}
				}
			}
		}
	}
	else{
		if(filtroComum(documento)){
			if (valorEquip > saidaMaiorEquipamento) {
				saidaMaiorEquipamento = valorEquip;
			}
			if (valorCont > saidaMaiorContato) {
				saidaMaiorContato = valorCont;
			}
		}
	}
}

function verifica(documento) {

	errmessage += documento;

	var equipamentoArray = [];
	equipamentoArray = formatarTabela(documento.properties["printerOneContratos:equipamentosContrato"]);
	var valorEquip = (documento.properties["printerOneContratos:equipamentosContrato"].match(new RegExp("delete", "g")) || []).length;
	tabelaEquipamento(equipamentoArray, valorEquip);

	var contatoArray = [];
	contatoArray = formatarTabela(documento.properties["printerOneContratos:contatosCliente"]);
	var valorCont = (documento.properties["printerOneContratos:contatosCliente"].match(new RegExp("delete", "g")) || []).length;
	tabelaContato(contatoArray, valorCont);

	if (filtroTabela(documento)) {
		numLinha += 1;
	}

}

function formatarTabela(tabelaJson) {

	var apagaColchete = tabelaJson.replace('[', '');
	apagaColchete = apagaColchete.replace(']', '');

	var valor = (tabelaJson.match(new RegExp("delete", "g")) || []).length;
	var apagaDelete = apagaColchete;

	for (var i = 0; i <= valor - 1; i++) {
		apagaDelete = apagaDelete.replace(',"delete":"-"}', '}--');
	}

	tabelaJson = apagaDelete;
	var tabelaJsonSplit = tabelaJson.split('--,');

	tabelaJsonSplit[valor - 1] = tabelaJsonSplit[valor - 1].replace('--', '');
	return tabelaJsonSplit;

}
function filtroComum(documento) {
	if (tipoDoc == "Ambos" && tipoInd == "Ambos" && dataInicio == null && dataFim == null && status == "Ambos") {
		return true;
	} else {
		if (verificaTipoDoc(documento)) {
			if (verificaTipoIndice(documento)) {
				if (verificaData(documento)) {
					if (verificaAluguel(documento)) {
						return true;
					} else {
						return false
					}
				} else {
					return false
				}
			} else {
				return false
			}
		} else {
			return false
		}
	}
}
function verificaAluguel(documento) {
	errmessage += "\n valorMaximo: " + valorMaximo + " < "+ documento.properties["printerOneContratos:valorAluguel"] +"\n valorMinimo: " + valorMinimo + " > "+ documento.properties["printerOneContratos:valorAluguel"] ;
	if (valorMinimo == null && valorMaximo == null || valorMinimo >= documento.properties["printerOneContratos:valorAluguel"] && valorMaximo <= documento.properties["printerOneContratos:valorAluguel"] ) {
		return true;
	}
	else return false;
}

function verificaStatus(documento) {
	if (status == "Ambos") {
		return true;
	} else {
		if (status == "Ativos" && documento.properties["printerOneContratos:vencido"] == false && documento.properties["printerOneContratos:statusAssinatura"] == true && documento.properties["printerOneContratos:aprovado"] == true) {
			return true;
		} else {
			if (status == "Inativos" && (documento.properties["printerOneContratos:vencido"] == true || documento.properties["printerOneContratos:aprovado"] == false)) {
				return true;
			} else return false;
		}
	}

}

function verificaData(documento) {
	if (dataInicio == null && dataFim == null || dataInicio <= documento.properties["printerOneContratos:dataInicio"] && dataFim >= documento.properties["printerOneContratos:dataFim"]) {
		return true;
	}
	else return false;
}

function verificaTipoIndice(documento) {
	if (tipoInd == documento.properties["printerOneContratos:tIndice"] || tipoInd == "Ambos") {
		return true;
	}
	else return false;
}

function verificaTipoDoc(documento) {
	if (tipoDoc == documento.properties["printerOneContratos:tDocumento"] || tipoDoc == "Ambos") {
		return true;
	}
	else return false;
}

function filtroTabela(documento) {
	if ((document.properties["gedbi:BInomeFantasia"].match(new RegExp('"', "g")) || []).length > 0 && (document.properties["gedbi:BIcnpj"].match(new RegExp('"', "g")) || []).length > 0) {
		var nomeFantasiaArray = [];
		nomeFantasiaArray = formatarTabela(document.properties["gedbi:BInomeFantasia"]);
		var valorNome = (document.properties["gedbi:BInomeFantasia"].match(new RegExp("delete", "g")) || []).length;
		tabelaNomeFantasia(nomeFantasiaArray, valorNome);

		var cnpjArray = [];
		cnpjArray = formatarTabela(document.properties["gedbi:BIcnpj"]);
		var valorCnpj = (document.properties["gedbi:BIcnpj"].match(new RegExp("delete", "g")) || []).length;
		tabelaCnpj(cnpjArray, valorCnpj);

		for (var i = 0; i <= valorNome - 1; i++) {
			if (nomeFantasia[i] == documento.properties["printerOneContratos:nomeFantasia"]) {
				if (filtroComum(documento)) {
					if (verificaStatus(documento)){
						formataSaidaColuna();
						formataSaidaLinha(documento);
					}
				}
			}
			else {
				if (cnpj[i] == documento.properties["printerOneContratos:cnpj"]) {
					if (filtroComum(documento)) {
						if (verificaStatus(documento)){
							formataSaidaColuna();
							formataSaidaLinha(documento);
						}
					}
				}
			}
		}
		for (var i = 0; i <= valorCnpj - 1; i++) {
			if (nomeFantasia[i] == documento.properties["printerOneContratos:nomeFantasia"]) {
				if (filtroComum(documento)) {
					if (verificaStatus(documento)){
						formataSaidaColuna();
						formataSaidaLinha(documento);
					}
				}
			}
			else {
				if (cnpj[i] == documento.properties["printerOneContratos:cnpj"]) {
					if (filtroComum(documento)) {
						if (verificaStatus(documento)){
							formataSaidaColuna();
							formataSaidaLinha(documento);
						}
					}
				}
			}
		}
	}
	else {
		if ((document.properties["gedbi:BInomeFantasia"].match(new RegExp('"', "g")) || []).length > 0) {
			var nomeFantasiaArray = [];
			nomeFantasiaArray = formatarTabela(document.properties["gedbi:BInomeFantasia"]);
			var valorNome = (document.properties["gedbi:BInomeFantasia"].match(new RegExp("delete", "g")) || []).length;
			tabelaNomeFantasia(nomeFantasiaArray, valorNome);

			for (var i = 0; i <= valorNome - 1; i++) {
				if (nomeFantasia[i] == documento.properties["printerOneContratos:nomeFantasia"]) {
					if (filtroComum(documento)) {
						if (verificaStatus(documento)){
							formataSaidaColuna();
							formataSaidaLinha(documento);
						}
					}
				}
			}
		}
		else {
			if ((document.properties["gedbi:BIcnpj"].match(new RegExp('"', "g")) || []).length > 0) {
				var cnpjArray = [];
				cnpjArray = formatarTabela(document.properties["gedbi:BIcnpj"]);
				var valorCnpj = (document.properties["gedbi:BIcnpj"].match(new RegExp("delete", "g")) || []).length;
				tabelaCnpj(cnpjArray, valorCnpj);

				for (var i = 0; i <= valorCnpj - 1; i++) {
					if (cnpj[i] == documento.properties["printerOneContratos:cnpj"]) {
						if (filtroComum(documento)) {
							if (verificaStatus(documento)){
								formataSaidaColuna();
								formataSaidaLinha(documento);
							}
						}
					}
				}
			}
			else {
				if (filtroComum(documento)) {
					if (verificaStatus(documento)){
						formataSaidaColuna();
						formataSaidaLinha(documento);
					}
				}
			}
		}
	}

	return true;

}

function tabelaNomeFantasia(nomeFantasiaJson, valor) {

	for (var i = 0; i <= valor - 1; i++) {
		var nomeFantasiaParse = JSON.parse(nomeFantasiaJson[i]);
		nomeFantasia[i] = nomeFantasiaParse.nomeFantasia;
	}

}

function tabelaCnpj(cnpjJson, valor) {

	for (var i = 0; i <= valor - 1; i++) {
		var cnpjParse = JSON.parse(cnpjJson[i]);
		cnpj[i] = cnpjParse.cnpj;
	}
}

function tabelaEquipamento(equipamentoJson, valor) {

	for (var i = 0; i <= valor - 1; i++) {
		var equipamentoParse = JSON.parse(equipamentoJson[i]);

		qtd[i] = equipamentoParse.qtd;
		desc[i] = equipamentoParse.desc;
		valorUni[i] = equipamentoParse.valorUni;
		total[i] = equipamentoParse.total;

		tabelaEquipamentoColuna[i] = "Equipamento " + (i + 1) + " - Quantidade;" + "Equipamento " + (i + 1) + " - Descricao;" + "Equipamento " + (i + 1) + " - Valor Unitario;" + "Equipamento " + (i + 1) + " - Valor Total;";
		tabelaEquipamentoLinhas[i] = qtd[i] + "; " + desc[i] + "; " + valorUni[i] + "; " + total[i] + "; ";

	}

}

function tabelaContato(contatoJson, valor) {

	for (var i = 0; i <= valor - 1; i++) {
		var contatoParse = JSON.parse(contatoJson[i]);

		nome[i] = contatoParse.nome;
		email[i] = contatoParse.email;
		tel[i] = contatoParse.tel;

		tabelaContatoColuna[i] = "Contato " + (i + 1) + " - Nome; " + "Contato " + (i + 1) + " - E-mail; " + "Contato " + (i + 1) + " - Telefone; ";
		tabelaContatoLinhas[i] = nome[i] + "; " + email[i] + "; " + tel[i] + "; ";
	}

}


function formataSaidaColuna() {
	saidaColunas = "Documento; " +
		"Tipo do Documento; " +
		"CNPJ; " +
		"Inscrição Estadual; " +
		"Nome Empresarial;" +
		"Nome Fantasia;" +
		"Número do Contrato; " +
		"Data Início; " +
		"data Fim; " +
		"Tipo de Indice; " +
		"Índice de Reajuste; " +
		"Valor Global de Aluguel / Serviços; " +
		"Valor Mensal de Aluguel / Serviços; " +
		"Valor da Multa; " +
		"Vigência do Contrato; " +
		tabelaEquipamentoColuna +
		"Valor por Página A3 Color; " +
		"Valor por Página A3 Mono; " +
		"Valor por Página A4 Color; " +
		"Valor por Página A4 Mono; " +
		"Franquia A3 Color; " +
		"Franquia A3 Mono; " +
		"Franquia A4 Color; " +
		"Franquia A4 Mono; " +
		"Valor Total da Franquia; " +
		"Valor do Excedente A3 Mono; " +
		"Valor do Excedente A3 Color; " +
		"Valor do Excedente A4 Color; " +
		"Valor do Excedente A4 Mono; " +
		tabelaContatoColuna +
		"Logradouro; " +
		"Número; " +
		"Bairro; " +
		"Complemento; " +
		"CEP; " +
		"Município; " +
		"Estado; " +
		"Observacao; " +
		"Contrato de Referência; " +
		"Contrato Aprovado; " +
		"Contrato Assinado; " +
		"Contrato Vencido; ";
}

function formataSaidaLinha(documento) {

	var dataF = new Date(documento.properties["printerOneContratos:dataFim"]);
	var dataI = new Date(documento.properties["printerOneContratos:dataInicio"]);

	var dataFstr = dataF.getUTCDay() + "/" + dataF.getUTCMonth() + "/" + dataF.getUTCFullYear() + "; ";
	var dataIstr = dataI.getUTCDay() + "/" + dataI.getUTCMonth() + "/" + dataI.getUTCFullYear() + "; ";


	saidaLinhas[numLinha] = "\n" + documento.name + "; " +
		documento.properties["printerOneContratos:tDocumento"] + "; " +
		documento.properties["printerOneContratos:cnpj"] + "; " +
		documento.properties["printerOneContratos:inscricaoEstadual"] + "; " +
		documento.properties["printerOneContratos:nomeEmpresarial"] + "; " +
		documento.properties["printerOneContratos:nomeFantasia"] + "; " +
		documento.properties["printerOneContratos:numeroContrato"] + "; " +
		dataIstr +
		dataFstr +
		documento.properties["printerOneContratos:tIndice"] + "; " ;

		if (documento.properties["printerOneContratos:indiceReajuste"] != null  && documento.properties["printerOneContratos:indiceReajuste"] != 0){
			saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:indiceReajuste"].toString().replace('.', ',') + "; " ;
		}
		else{
			saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
		}
		if (documento.properties["printerOneContratos:valorAluguel"] != null && documento.properties["printerOneContratos:valorAluguel"] != 0.00){
			saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:valorAluguel"].toString().replace('.', ',') + "; " ;
		}
		else{
			saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
		}
		if (documento.properties["printerOneContratos:valorAluguelMensal"] != null  && documento.properties["printerOneContratos:valorAluguelMensal"] != 0.00){
			saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:valorAluguelMensal"].toString().replace('.', ',') + "; " ;
		}
		else{
			saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
		}

		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:valorMulta"]+ "; " +
		documento.properties["printerOneContratos:vigenciaContrato"] + "; ";


	for (var i = 0; i <= tabelaEquipamentoLinhas.length - 1; i++) {
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + tabelaEquipamentoLinhas[i];
	}
	if (tabelaEquipamentoLinhas.length < saidaMaiorEquipamento) {
		for (var i = 0; i <= (saidaMaiorEquipamento - tabelaEquipamentoLinhas.length) - 1; i++) {
			if (!(saidaMaiorEquipamento - tabelaEquipamentoLinhas.length == 0)) {
				saidaLinhas[numLinha] += "; " + "; " + "; " + "; ";
			}
		}
	}

	if (documento.properties["printerOneContratos:pgA3Color"] != null  && documento.properties["printerOneContratos:pgA3Color"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:pgA3Color"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:pgA3Mono"] != null  && documento.properties["printerOneContratos:pgA3Mono"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:pgA3Mono"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:pgA4Color"] != null  && documento.properties["printerOneContratos:pgA4Color"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:pgA4Color"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:pgA4Mono"] != null  && documento.properties["printerOneContratos:pgA4Mono"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:pgA4Mono"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frA3Color"] != null  && documento.properties["printerOneContratos:frA3Color"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frA3Color"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frA3Mono"] != null  && documento.properties["printerOneContratos:frA3Mono"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frA3Mono"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frA4Color"] != null  && documento.properties["printerOneContratos:frA4Color"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frA4Color"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frA4Mono"] != null  && documento.properties["printerOneContratos:frA4Mono"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frA4Mono"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:valorFranquia"] != null  && documento.properties["printerOneContratos:valorFranquia"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:valorFranquia"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frExA3Mono"] != null  && documento.properties["printerOneContratos:frExA3Mono"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frExA3Mono"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frExA3Mono"] != null  && documento.properties["printerOneContratos:frExA3Mono"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frExA3Mono"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frExA4Color"] != null  && documento.properties["printerOneContratos:frExA4Color"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frExA4Color"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}
	if (documento.properties["printerOneContratos:frExA4Mono"] != null  && documento.properties["printerOneContratos:frExA4Mono"] != 0.00){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + documento.properties["printerOneContratos:frExA4Mono"].toString().replace('.', ',') + "; ";
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + "0,00; ";
	}

	for (var i = 0; i <= tabelaContatoLinhas.length - 1; i++) {
		saidaLinhas[numLinha] = saidaLinhas[numLinha] + tabelaContatoLinhas[i];
	}
	if (tabelaContatoLinhas.length < saidaMaiorContato) {
		for (var i = 0; i <= (saidaMaiorContato - tabelaContatoLinhas.length) - 1; i++) {
			if (!(saidaMaiorContato - tabelaContatoLinhas.length == 0)) {
				saidaLinhas[numLinha] += "; " + "; " + "; ";
			}
		}
	}

	saidaLinhas[numLinha] = saidaLinhas[numLinha] +
		documento.properties["printerOneContratos:logradouro"] + "; " +
		documento.properties["printerOneContratos:numero"] + "; " +
		documento.properties["printerOneContratos:bairro"] + "; " +
		documento.properties["printerOneContratos:complemento"] + "; " +
		documento.properties["printerOneContratos:cep"] + "; " +
		documento.properties["printerOneContratos:municipio"] + "; " +
		documento.properties["printerOneContratos:estado"] + "; ";
	
	if (documento.properties["printerOneContratos:observacao"] != null){
		saidaLinhas[numLinha] = saidaLinhas[numLinha] +
		documento.properties["printerOneContratos:observacao"].replace(/\n/g,' ') + "; " ;
	}
	else{
		saidaLinhas[numLinha] = saidaLinhas[numLinha] +
		documento.properties["printerOneContratos:observacao"]+ "; ";
	}


	saidaLinhas[numLinha] = saidaLinhas[numLinha] +
		documento.properties["printerOneContratos:contratoReferencia"] + "; " +
		documento.properties["printerOneContratos:aprovado"] + "; " +
		documento.properties["printerOneContratos:statusAssinatura"] + "; " +
		documento.properties["printerOneContratos:vencido"] + "; ";
}