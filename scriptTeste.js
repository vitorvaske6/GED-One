var saida = "Documento; " + "tDocumento; " + "cnpj; " + "inscricaoEstadual; " + "numeroContrato; " + "numeroExistente; " + "dataInicio; " + "dataFim; " + "tIndice; " + "indiceReajuste; " + "valorAluguel; " + "valorAluguelMensal; " + "valorMulta; " + "vigenciaContrato; " + "equipamentosContrato; " + "pgA3Color; " + "pgA3Mono; " + "pgA4Color; " + "pgA4Mono; " + "frA3Color; " + "frA3Mono; " + "frA4Color; " + "frA4Mono; " + "valorFranquia; " + "contatosCliente; " + "frExA3Mono; " + "frExA3Color; " + "frExA4Color; " + "frExA4Mono; " + "logradouro; " + "numero; " + "bairro; " + "complemento; " + "cep; " + "municipio; " + "estado; " + "observacao; " + "contratoReferencia; " + "aprovado; " + "statusAssinatura; " + "vencido; "+ "\n";

var titulo = "teste";
var tDocumento = "teste";
var cnpj = "cnpj1";
var inscricaoEstadual = "teste";
var nomeEmpresarial = "teste";
var nomeFantasia = "nome1";
var numeroContrato = "teste";
var numeroExistente = "teste";
var dataInicio = "teste";
var dataFim = "teste";
var tIndice = "teste";
var indiceReajuste = "teste";
var valorAluguel = "teste";
var valorAluguelMensal = "teste";
var valorMulta = "teste";
var vigenciaContrato = "teste";
var equipamentosContrato = '[{"qtd":"2","desc":"Impressora","valorUni":"23","total":"46","delete":"-"}, {"qtd":"1","desc":"Impressora2","valorUni":"23","total":"23","delete":"-"}]';
var pgA3Color = "teste";
var pgA3Mono = "teste";
var pgA4Color = "teste";
var pgA4Mono = "teste";
var frA3Color = "teste";
var frA3Mono = "teste";
var frA4Color = "teste";
var frA4Mono = "teste";
var valorFranquia = "teste";
var contatosCliente = "teste";
var frExA3Mono = "teste";
var frExA3Color = "teste";
var frExA4Color = "teste";
var frExA4Mono = "teste";
var logradouro = "teste";
var numero = "teste";
var bairro = "teste";
var complemento = "teste";
var cep = "teste";
var municipio = "teste";
var estado = "teste";
var observacao = "teste";
var contratoReferencia = "teste";
var aprovado = "teste";
var statusAssinatura = "teste";
var vencido = "teste";


var tituloEntrada;
var tDocumentoEntrada;
var cnpjEntrada = '{ "cnpj": "cnpj1", "cnpj": "cnpj2" } ';
var inscricaoEstadualEntrada;
var nomeFantasiaEntrada = '{ "nomeFantasia": "nome1","delete":"-"},{ "nomeFantasia": "nome2","delete":"-"}';
var dataInicioEntrada;
var dataFimEntrada;
var tIndiceEntrada;
var numeroContratoEntrada;
var numeroExistenteEntrada;
var valorAluguelEntrada;
var aprovadoEntrada;
var statusAssinaturaEntrada;
var vencidoEntrada;



// var nomeFantasiaSplit = nomeFantasiaEntrada.split(',');

// for (var i = 0; i <= nomeFantasiaSplit.length - 1; i++) {
//     var nomeParse = JSON.parse(nomeFantasiaSplit[i]);
//     var nomeConvertido = [];
//     nomeConvertido = nomeConvertido + nomeParse.nomeFantasia;

//     verifica(nomeConvertido);
// }

// console.log("\n teste delete :"+ nomeFantasiaEntrada.match(new RegExp("delete", "g").length));

// var valor = (nomeFantasiaEntrada.match(new RegExp("delete", "g")) || []).length;
// console.log("\nquantidade de deletes: " +valor); 



//console.log(saida);




// function verifica(filtro) {

//     console.log("To na function");

//     if (filtro == nomeFantasia) {
//         console.log("To no filtro");


//         saida = saida + "\n" + titulo 
//         + "; " + tDocumento + "; " + cnpj + "; " + inscricaoEstadual + "; " + nomeEmpresarial + "; " + nomeFantasia + "; " + numeroContrato + "; " + numeroExistente + "; " + dataInicio + "; " + dataFim + "; " + tIndice + "; " + indiceReajuste + "; " + valorAluguel + "; " + valorAluguelMensal + "; " + valorMulta + "; " + vigenciaContrato + "; " + equipamentosContrato + "; " + pgA3Color + "; " + pgA3Mono + "; " + pgA4Color + "; " + pgA4Mono + "; " + frA3Color + "; " + frA3Mono + "; " + frA4Color + "; " + frA4Mono + "; " + valorFranquia + "; " + contatosCliente + "; " + frExA3Mono + "; " + frExA3Color + "; " + frExA4Color + "; " + frExA4Mono + "; " + logradouro + "; " + numero + "; " + bairro + "; " + complemento + "; " + cep + "; " + municipio + "; " + estado + "; " + observacao + "; " + contratoReferencia + "; " + aprovado + "; " + statusAssinatura + "; " + vencido + "; ";
//     }

//     console.log("filtro: " + filtro + " nomefantasia: " +nomeFantasia);


// }

formatarTabela(equipamentosContrato);


function formatarTabela(tabelaJson){

    var apagaColchete = tabelaJson.replace('[', '');
    apagaColchete = apagaColchete.replace(']', '');

    var valor = (tabelaJson.match(new RegExp("delete", "g")) || []).length;
    //errmessage= errmessage + " Quantidade de deletes: " + valor;
    var apagaDelete = apagaColchete;

    for (var i = 0; i<=valor - 1; i++){
        // errmessage= errmessage + "\n apaguei: " + i + " deletes";
        apagaDelete = apagaDelete.replace(',"delete":"-"','');
    }
    tabelaJson = apagaDelete;

    //console.log(tabelaJson);
    
    var tabelaJsonSplit = tabelaJson.split('},');
    //console.log(tabelaJsonSplit[0]+'}');

    for (var i = 0; i<=valor - 1; i++){  
        if(!tabelaJsonSplit[i].endsWith("}")){
            tabelaJsonSplit[i] = tabelaJsonSplit[i] + '}';
        }
    }

    //console.log(tabelaJsonSplit);
    tabelaEquipamento(tabelaJsonSplit, valor);

}

function tabelaEquipamento(equipamentoJson, valor){
    var qtd = [];
    var desc = [];
    var valorU = [];
    var valorT = [];
    var tabelaEquipamentoColuna = []; 
    var tabelaEquipamentoLinhas = [];

    //console.log(equipamentoJson)

    for (var i = 0; i <= valor-1; i++) {
        //console.log(equipamentoJson[i])
        var equipamentoParse = JSON.parse(equipamentoJson[i]);

        qtd[i] = equipamentoParse.qtd;
        desc[i] = equipamentoParse.desc;
        valorU[i] = equipamentoParse.valorUni;
        valorT[i] = equipamentoParse.total;

        tabelaEquipamentoColuna[i] = "EQP "+(i+1)+" - Quantidade;" + "EQP "+(i+1)+" - Descricao;" + "EQP "+(i+1)+" - Valor Unitario;" + "EQP "+(i+1)+" - Valor Total;";
        tabelaEquipamentoLinhas[i] = qtd[i] +"; " +  desc[i] +"; " +   valorU[i] +"; " +  valorT[i];
    }

    console.log(tabelaEquipamentoColuna + "\n" +tabelaEquipamentoLinhas);
}