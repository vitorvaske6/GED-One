<#assign datetimeformat="dd/MM/yyyy">
{"contratos" : [
    <#if contrato.properties["printerOneContratos:nomeFantasia"]?exists && contrato.properties["printerOneContratos:nomeFantasia"] != "">
    {
        "Status do Contrato" : "<#if contrato.properties["printerOneContratos:aprovado"] == true && contrato.properties["printerOneContratos:statusAssinatura"] == true && contrato.properties["printerOneContratos:vencido"] == false>Ativo<#else>Inativo</#if>",
        "Documento" : "${contrato.properties.name}",
        "Tipo de Contrato" : "<#if contrato.properties["printerOneContratos:tDocumento"]?exists && contrato.properties["printerOneContratos:tDocumento"] !="">${contrato.properties["printerOneContratos:tDocumento"]}</#if>",
        "CNPJ" : "<#if contrato.properties["printerOneContratos:cnpj"]?exists && contrato.properties["printerOneContratos:cnpj"] !="">${contrato.properties["printerOneContratos:cnpj"]}</#if>",
        "Inscrição Estadual" : "<#if contrato.properties["printerOneContratos:inscricaoEstadual"]?exists && contrato.properties["printerOneContratos:inscricaoEstadual"] !="">${contrato.properties["printerOneContratos:inscricaoEstadual"]}</#if>",
        "Nome Empresarial" : "<#if contrato.properties["printerOneContratos:nomeEmpresarial"]?exists && contrato.properties["printerOneContratos:nomeEmpresarial"] !="">${contrato.properties["printerOneContratos:nomeEmpresarial"]}</#if>",
        "Nome Fantasia" : "<#if contrato.properties["printerOneContratos:nomeFantasia"]?exists && contrato.properties["printerOneContratos:nomeFantasia"] != "">${contrato.properties["printerOneContratos:nomeFantasia"]}</#if> ",
        "Numero do Contrato" : "<#if contrato.properties["printerOneContratos:numeroContrato"]?exists && contrato.properties["printerOneContratos:numeroContrato"] !="">${contrato.properties["printerOneContratos:numeroContrato"]}</#if>",
        "Data de Inicio" : "${contrato.properties["printerOneContratos:dataInicio"]?string(datetimeformat)}",
        "Data de Fim" : "${contrato.properties["printerOneContratos:dataFim"]?string(datetimeformat)}",
        "Tipo de Indice" : "<#if contrato.properties["printerOneContratos:tIndice"]?exists && contrato.properties["printerOneContratos:tIndice"] !="">${contrato.properties["printerOneContratos:tIndice"]}</#if>",
        "Indice de Reajuste" : "<#if contrato.properties["printerOneContratos:indiceReajuste"]?exists && contrato.properties["printerOneContratos:indiceReajuste"] != 0>${contrato.properties["printerOneContratos:indiceReajuste"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Valor do Aluguel Mensal" : "<#if contrato.properties["printerOneContratos:valorAluguelMensal"]?exists && contrato.properties["printerOneContratos:valorAluguelMensal"] != 0>${contrato.properties["printerOneContratos:valorAluguelMensal"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Valor do Aluguel Total" : "<#if contrato.properties["printerOneContratos:valorAluguel"]?exists && contrato.properties["printerOneContratos:valorAluguel"] != 0>${contrato.properties["printerOneContratos:valorAluguel"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Valor da Multa" : "<#if contrato.properties["printerOneContratos:valorMulta"]?exists && contrato.properties["printerOneContratos:valorMulta"] !="">${contrato.properties["printerOneContratos:valorMulta"]}</#if>",
        "Vigencia do Contrato" : "<#if contrato.properties["printerOneContratos:vigenciaContrato"]?exists && contrato.properties["printerOneContratos:vigenciaContrato"] !="">${contrato.properties["printerOneContratos:vigenciaContrato"]}</#if>",
        <#if contrato.properties["printerOneContratos:equipamentosContrato"]?exists && contrato.properties["printerOneContratos:equipamentosContratoWS"] != "">${contrato.properties["printerOneContratos:equipamentosContratoWS"]}</#if>
        "Valor por Pagina A3 Colorida" : "<#if contrato.properties["printerOneContratos:pgA3Color"]?exists && contrato.properties["printerOneContratos:pgA3Color"] != 0>${contrato.properties["printerOneContratos:pgA3Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Valor por Pagina A3 Monocromatica" : "<#if contrato.properties["printerOneContratos:pgA3Mono"]?exists && contrato.properties["printerOneContratos:pgA3Mono"] != 0>${contrato.properties["printerOneContratos:pgA3Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Valor por Pagina A4 Colorida" : "<#if contrato.properties["printerOneContratos:pgA4Color"]?exists && contrato.properties["printerOneContratos:pgA4Color"] != 0>${contrato.properties["printerOneContratos:pgA4Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Valor por Pagina A4 Monocromatica" : "<#if contrato.properties["printerOneContratos:pgA4Mono"]?exists && contrato.properties["printerOneContratos:pgA4Mono"] != 0>${contrato.properties["printerOneContratos:pgA4Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Franquia A3 Colorida" : "<#if contrato.properties["printerOneContratos:frA3Color"]?exists && contrato.properties["printerOneContratos:frA3Color"] != 0>${contrato.properties["printerOneContratos:frA3Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Franquia A3 Monocromatica" : "<#if contrato.properties["printerOneContratos:frA3Mono"]?exists && contrato.properties["printerOneContratos:frA3Mono"] != 0>${contrato.properties["printerOneContratos:frA3Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Franquia A4 Colorida" : "<#if contrato.properties["printerOneContratos:frA4Color"]?exists && contrato.properties["printerOneContratos:frA4Color"] != 0>${contrato.properties["printerOneContratos:frA4Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Franquia A4 Monocromatica" : "<#if contrato.properties["printerOneContratos:frA4Mono"]?exists && contrato.properties["printerOneContratos:frA4Mono"] != 0>${contrato.properties["printerOneContratos:frA4Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Total Franquia" : "<#if contrato.properties["printerOneContratos:valorFranquia"]?exists && contrato.properties["printerOneContratos:valorFranquia"] != 0>${contrato.properties["printerOneContratos:valorFranquia"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Excedente A3 Colorida" : "<#if contrato.properties["printerOneContratos:frExA3Mono"]?exists && contrato.properties["printerOneContratos:frExA3Mono"] != 0>${contrato.properties["printerOneContratos:frExA3Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Excedente A3 Monocromatica" : "<#if contrato.properties["printerOneContratos:frExA3Color"]?exists && contrato.properties["printerOneContratos:frExA3Color"] != 0>${contrato.properties["printerOneContratos:frExA3Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Excedente A4 Colorida" : "<#if contrato.properties["printerOneContratos:frExA4Color"]?exists && contrato.properties["printerOneContratos:frExA4Color"] != 0>${contrato.properties["printerOneContratos:frExA4Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        "Excedente A4 Monocromatica" : "<#if contrato.properties["printerOneContratos:frExA4Mono"]?exists && contrato.properties["printerOneContratos:frExA4Mono"] != 0>${contrato.properties["printerOneContratos:frExA4Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
        <#if contrato.properties["printerOneContratos:contatosCliente"]?exists && contrato.properties["printerOneContratos:contatosClienteWS"] != "">${contrato.properties["printerOneContratos:contatosClienteWS"]}</#if>
        "Link do Contrato" : "http://gedone.printerone.com.br:8080/share/page/document-details?nodeRef=workspace://SpacesStore/${contrato.id}",
        "Logradouro" : "<#if contrato.properties["printerOneContratos:logradouro"]?exists && contrato.properties["printerOneContratos:logradouro"] !="">${contrato.properties["printerOneContratos:logradouro"]}</#if>",
        "Numero" : "<#if contrato.properties["printerOneContratos:numero"]?exists && contrato.properties["printerOneContratos:numero"] !="">${contrato.properties["printerOneContratos:numero"]}</#if>",
        "Bairro" : "<#if contrato.properties["printerOneContratos:bairro"]?exists && contrato.properties["printerOneContratos:bairro"] !="">${contrato.properties["printerOneContratos:bairro"]}</#if>",
        "Complemento" : "<#if contrato.properties["printerOneContratos:complemento"]?exists && contrato.properties["printerOneContratos:complemento"] !="">${contrato.properties["printerOneContratos:complemento"]}</#if>",
        "CEP" : "<#if contrato.properties["printerOneContratos:cep"]?exists && contrato.properties["printerOneContratos:cep"] !="">${contrato.properties["printerOneContratos:cep"]}</#if>",
        "Municipio" : "<#if contrato.properties["printerOneContratos:municipio"]?exists && contrato.properties["printerOneContratos:municipio"] !="">${contrato.properties["printerOneContratos:municipio"]}</#if>",
        "Estado" : "<#if contrato.properties["printerOneContratos:estado"]?exists && contrato.properties["printerOneContratos:estado"] !="">${contrato.properties["printerOneContratos:estado"]}</#if>",
        "Observacao" : "<#if contrato.properties["printerOneContratos:observacao"]?exists && contrato.properties["printerOneContratos:observacao"] != "">${contrato.properties["printerOneContratos:observacao"]}</#if>",
        "Contrato Aprovado" : "<#if contrato.properties["printerOneContratos:aprovado"] == true >Sim<#else>Nao</#if>",
        "Contrato Assinado" : "<#if contrato.properties["printerOneContratos:statusAssinatura"] == true >Sim<#else>Nao</#if>",
        "Contrato Vencido" : "<#if contrato.properties["printerOneContratos:vencido"] == true>Sim<#else>Nao</#if>"
    }
    </#if>
    ]
}

