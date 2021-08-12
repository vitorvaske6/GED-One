var counter = 0;
var logmessage = 'LOG OF TASKS\n';
var errmessage = '\nERRORS\n';

var pasta = companyhome.childByNamePath("Sites/printer-one-contratos/documentLibrary/Repositorio/Contratos Ativos");
var pastaLog = companyhome.childByNamePath("Logs");
//var pasta = companyhome.childByNamePath("Teste/Pasta");


var saidaMaiorEquipamento = 0;
var saidaMaiorContato = 0;

try{
    update(pasta);
}
catch(e){
    errmessage += "\n Erro catch: " + e;
}

logger.log(logmessage);
logfile = pastaLog.createFile('LogPowerBI ' + pastaLog.children.length + '.txt');
logfile.content = logmessage + 'UPDATED: ' + counter.toString() + '\n' + errmessage;
logfile.properties.encoding = 'UTF-8';
logfile.properties.mimetype = 'text/plain';
logfile.properties.title = 'Log';
logfile.properties.description = 'log ';
logfile.save();

function update(nodes) {
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
				verificar(node);
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
    errmessage += "\nfiltramaior documento: " + documento.name;

	var valorEquip = (documento.properties["printerOneContratos:equipamentosContrato"].match(new RegExp("delete", "g")) || []).length;
	var valorCont = (documento.properties["printerOneContratos:contatosCliente"].match(new RegExp("delete", "g")) || []).length;


    if (valorEquip > saidaMaiorEquipamento) {
        saidaMaiorEquipamento = valorEquip;
    }
    if (valorCont > saidaMaiorContato) {
        saidaMaiorContato = valorCont;
    }

}

function verificar(documento){
	var equipamentosContrato = documento.properties["printerOneContratos:equipamentosContrato"];
    var valorEquip = (documento.properties["printerOneContratos:equipamentosContrato"].match(new RegExp("delete", "g")) || []).length;
	var equipamentoJsonSplit = formatarTabela(equipamentosContrato, valorEquip);
	
    documento.properties["printerOneContratos:equipamentosContratoWS"] = tabelaEquipamento(equipamentoJsonSplit, valorEquip);

    var contatosCliente = documento.properties["printerOneContratos:contatosCliente"];
    var valorCont = (documento.properties["printerOneContratos:contatosCliente"].match(new RegExp("delete", "g")) || []).length;
	var contatoJsonSplit = formatarTabela(contatosCliente, valorCont);
	
    documento.properties["printerOneContratos:contatosClienteWS"] = tabelaContato(contatoJsonSplit, valorCont);

    documento.save();

}

function formatarTabela(tabelaJson, valor){
	var apagaColchete = tabelaJson.replace('[', '');
	apagaColchete = apagaColchete.replace(']', '');

	var apagaDelete = apagaColchete;

	for (var i = 0; i <= valor; i++) {
        if(apagaDelete.replace(',"delete":"-"}', '}--') != undefined){
            apagaDelete = apagaDelete.replace(',"delete":"-"}', '}--');
        }
	}
	tabelaJson = apagaDelete;
	var tabelaJsonSplit = tabelaJson.split('--,');
	tabelaJsonSplit[valor - 1] = tabelaJsonSplit[valor - 1].replace('--', '');

    return tabelaJsonSplit;
}

function tabelaEquipamento(equipamentoJson, valor){

    var qtd = [];
    var desc = [];
    var valorU = [];
    var valorT = [];
    var tabelaEquipamentoLinhas = "";
    var ultimaLinha = 0;

    if(saidaMaiorEquipamento > valor){

        for (var i = 0; i <= valor - 1; i++) {
            var equipamentoParse = JSON.parse(equipamentoJson[i]);

            

            qtd[i] = equipamentoParse.qtd;
            desc[i] = equipamentoParse.desc;
            valorU[i] = equipamentoParse.valorUni;
            valorT[i] = equipamentoParse.total;

            if(valorU[i] == undefined){
                valorU[i] = "0,00";
            }

            if(valorT[i] == undefined){
                valorT[i] = "0,00";
            }

            tabelaEquipamentoLinhas = tabelaEquipamentoLinhas + '"Quantidade - Equipamento '+(i+1)+'"'+ ":" +'"'+qtd[i]+'",' + '"Descricao - Equipamento '+(i+1)+'"'+ ":" +'"'+desc[i]+'",'+ '"Valor Unitario - Equipamento '+(i+1)+'"'+ ":" +'"'+valorU[i].replace('.', ',')+'",'+ '"Valor Total - Equipamento '+(i+1)+'"'+ ":" +'"'+valorT[i].replace('.', ',')+'",';
            ultimaLinha = i+1;
        }

        for (var i = 0; i <=(saidaMaiorEquipamento - valor) - 1; i++) {
        
            tabelaEquipamentoLinhas = tabelaEquipamentoLinhas + '"Quantidade - Equipamento '+(ultimaLinha+1)+'"'+ ":" +'"'+"0"+'",' + '"Descricao - Equipamento '+(ultimaLinha+1)+'"'+ ":" +'"'+"N/A"+'",'+ '"Valor Unitario - Equipamento '+(ultimaLinha+1)+'"'+ ":" +'"'+"0.00"+'",'+ '"Valor Total - Equipamento '+(ultimaLinha+1)+'"'+ ":" +'"'+"0.00"+'",';
            ultimaLinha += 1;
        }
    }
    else{
        for (var i = 0; i <= valor - 1; i++) {
            var equipamentoParse = JSON.parse(equipamentoJson[i]);

            qtd[i] = equipamentoParse.qtd;
            desc[i] = equipamentoParse.desc;
            valorU[i] = equipamentoParse.valorUni;
            valorT[i] = equipamentoParse.total;

            if(valorU[i] == undefined){
                valorU[i] = "0,00";
            }
            
            if(valorT[i] == undefined){
                valorT[i] = "0,00";
            }

            tabelaEquipamentoLinhas = tabelaEquipamentoLinhas + '"Quantidade - Equipamento '+(i+1)+'"'+ ":" +'"'+qtd[i]+'",' + '"Descricao - Equipamento '+(i+1)+'"'+ ":" +'"'+desc[i]+'",'+ '"Valor Unitario - Equipamento '+(i+1)+'"'+ ":" +'"'+valorU[i].replace('.', ',')+'",'+ '"Valor Total - Equipamento '+(i+1)+'"'+ ":" +'"'+valorT[i].replace('.', ',')+'",';
            ultimaLinha += 1;
        }
    }
	return tabelaEquipamentoLinhas;

}

function tabelaContato(contatoJson, valor){

    var nome = [];
    var email = [];
    var tel = [];
    var tabelaContatoLinhas = "";
    var ultimaLinha = 0;

    if(saidaMaiorContato > valor){

        for (var i = 0; i <= valor - 1; i++) {
            var contatoParse = JSON.parse(contatoJson[i]);
           // errmessage += "\n Contato json: "+ contatoJson[i];
            nome[i] = contatoParse.nome;
            email[i] = contatoParse.email;
            tel[i] = contatoParse.tel;

            if(nome[i] == undefined){
                valorU[i] = "N/A";
            }
            
            if(email[i] == undefined){
                valorT[i] = "N/A";
            }

            if(tel[i] == undefined){
                valorT[i] = "N/A";
            }

            tabelaContatoLinhas = tabelaContatoLinhas + '"Nome - Contato '+(i+1)+'"'+ ":" +'"'+nome[i]+'",' + '"Email - Contato '+(i+1)+'"'+ ":" +'"'+email[i]+'",'+ '"Telefone - Contato '+(i+1)+'"'+ ":" +'"'+tel[i]+'",';
            ultimaLinha = i+1;
        }

        for (var i = 0; i <=(saidaMaiorContato - valor) - 1; i++) {
            tabelaContatoLinhas = tabelaContatoLinhas + '"Nome - Contato '+(ultimaLinha+1)+'"'+ ":" +'"'+"N/A"+'",' + '"Email - Contato '+(ultimaLinha+1)+'"'+ ":" +'"'+"N/A"+'",'+ '"Telefone - Contato '+(ultimaLinha+1)+'"'+ ":" +'"'+"N/A"+'",';
            ultimaLinha += 1;
        }
    }
    else{
        for (var i = 0; i <= valor - 1; i++) {
            var contatoParse = JSON.parse(contatoJson[i]);

            nome[i] = contatoParse.nome;
            email[i] = contatoParse.email;
            tel[i] = contatoParse.tel;

            if(nome[i] == undefined){
                valorU[i] = "N/A";
            }
            
            if(email[i] == undefined){
                valorT[i] = "N/A";
            }

            if(tel[i] == undefined){
                valorT[i] = "N/A";
            }

            tabelaContatoLinhas = tabelaContatoLinhas + '"Nome - Contato '+(i+1)+'"'+ ":" +'"'+nome[i]+'",' + '"Email - Contato '+(i+1)+'"'+ ":" +'"'+email[i]+'",'+ '"Telefone - Contato '+(i+1)+'"'+ ":" +'"'+tel[i]+'",';
            ultimaLinha += 1;
        }
    }
	return tabelaContatoLinhas;

}