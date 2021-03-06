<#assign datetimeformat="dd/MM/yyyy">

{"contratos" : [
    <#list contratos as child>
        <#if child.contrato.properties["printerOneContratos:equipamentosContratoWS"]?exists && child.contrato.properties["printerOneContratos:equipamentosContratoWS"] != "">
            <#if child.contrato.properties["printerOneContratos:valorAluguelMensal"]?exists && child.contrato.properties["printerOneContratos:valorAluguelMensal"] != 0>
                <#assign valorAluguelMensal = child.contrato.properties["printerOneContratos:valorAluguelMensal"]>
                <#assign valorAluguelMensalRep = valorAluguelMensal?replace('.',',')>
            </#if>
            <#if child.contrato.properties["printerOneContratos:valorAluguel"]?exists && child.contrato.properties["printerOneContratos:valorAluguel"] != 0>
                <#assign valorAluguel = child.contrato.properties["printerOneContratos:valorAluguel"]>
                <#assign valorAluguelRep0 = valorAluguel?replace(',','')>
                <#assign valorAluguelRep = valorAluguelRep0?replace('.',',')>
            </#if>
            <#if child.contrato.properties["printerOneContratos:valorAluguelMensal"]?exists && child.contrato.properties["printerOneContratos:valorAluguelMensal"] != 0>
                <#assign valorAluguelMensal = child.contrato.properties["printerOneContratos:valorAluguelMensal"]>
                <#assign valorAluguelMensalRep0 = valorAluguelMensal?replace(',','')>
                <#assign valorAluguelMensalRep = valorAluguelMensalRep0?replace('.',',')>
            </#if>
        </#if>
        <#if child.contrato.properties["printerOneContratos:equipamentosContratoWS"]?exists && child.contrato.properties["printerOneContratos:equipamentosContratoWS"] != "">
        {
            <#--  "Documento" : "${child.contrato.properties["cm:title"]!''}",  -->
            "Status do Contrato" : "<#if child.contrato.properties["printerOneContratos:aprovado"] == true && child.contrato.properties["printerOneContratos:statusAssinatura"] == true && child.contrato.properties["printerOneContratos:vencido"] == false>Ativo<#else>Inativo</#if>",
            "Documento" : "${child.contrato.properties.name}",
            "Tipo de Contrato" : "<#if child.contrato.properties["printerOneContratos:tDocumento"]?exists && child.contrato.properties["printerOneContratos:tDocumento"] !="">${child.contrato.properties["printerOneContratos:tDocumento"]}</#if>",
            "CNPJ" : "<#if child.contrato.properties["printerOneContratos:cnpj"]?exists && child.contrato.properties["printerOneContratos:cnpj"] !="">${child.contrato.properties["printerOneContratos:cnpj"]}</#if>",
            "Inscri????o Estadual" : "<#if child.contrato.properties["printerOneContratos:inscricaoEstadual"]?exists && child.contrato.properties["printerOneContratos:inscricaoEstadual"] !="">${child.contrato.properties["printerOneContratos:inscricaoEstadual"]}</#if>",
            "Nome Empresarial" : "<#if child.contrato.properties["printerOneContratos:nomeEmpresarial"]?exists && child.contrato.properties["printerOneContratos:nomeEmpresarial"] !="">${child.contrato.properties["printerOneContratos:nomeEmpresarial"]}</#if>",
            "Nome Fantasia" : "<#if child.contrato.properties["printerOneContratos:nomeFantasia"]?exists && child.contrato.properties["printerOneContratos:nomeFantasia"] != "">${child.contrato.properties["printerOneContratos:nomeFantasia"]}</#if> ",
            "Numero do Contrato" : "<#if child.contrato.properties["printerOneContratos:numeroContrato"]?exists && child.contrato.properties["printerOneContratos:numeroContrato"] !="">${child.contrato.properties["printerOneContratos:numeroContrato"]}</#if>",
            "Data de Inicio" : "${child.contrato.properties["printerOneContratos:dataInicio"]?string(datetimeformat)}",
            "Data de Fim" : "${child.contrato.properties["printerOneContratos:dataFim"]?string(datetimeformat)}",
            "Tipo de Indice" : "<#if child.contrato.properties["printerOneContratos:tIndice"]?exists && child.contrato.properties["printerOneContratos:tIndice"] !="">${child.contrato.properties["printerOneContratos:tIndice"]}</#if>",
            "Indice de Reajuste" : "<#if child.contrato.properties["printerOneContratos:indiceReajuste"]?exists && child.contrato.properties["printerOneContratos:indiceReajuste"] != 0>${child.contrato.properties["printerOneContratos:indiceReajuste"]?replace(',','')?replace('.',',')}%<#else>0</#if>",
            "Valor do Aluguel Mensal" : "<#if child.contrato.properties["printerOneContratos:valorAluguelMensal"]?exists && child.contrato.properties["printerOneContratos:valorAluguelMensal"] != 0>${valorAluguelMensalRep}<#else>0</#if>",
            "Valor do Aluguel Total" : "<#if child.contrato.properties["printerOneContratos:valorAluguel"]?exists && child.contrato.properties["printerOneContratos:valorAluguel"] != 0>${valorAluguelRep}<#else>0</#if>",
            "Valor da Multa" : "<#if child.contrato.properties["printerOneContratos:valorMulta"]?exists && child.contrato.properties["printerOneContratos:valorMulta"] !="">${child.contrato.properties["printerOneContratos:valorMulta"]}</#if>",
            "Vigencia do Contrato" : "<#if child.contrato.properties["printerOneContratos:vigenciaContrato"]?exists && child.contrato.properties["printerOneContratos:vigenciaContrato"] !="">${child.contrato.properties["printerOneContratos:vigenciaContrato"]}</#if>",
            "Valor por Pagina A3 Colorida" : "<#if child.contrato.properties["printerOneContratos:pgA3Color"]?exists && child.contrato.properties["printerOneContratos:pgA3Color"] != 0>${child.contrato.properties["printerOneContratos:pgA3Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Valor por Pagina A3 Monocromatica" : "<#if child.contrato.properties["printerOneContratos:pgA3Mono"]?exists && child.contrato.properties["printerOneContratos:pgA3Mono"] != 0>${child.contrato.properties["printerOneContratos:pgA3Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Valor por Pagina A4 Colorida" : "<#if child.contrato.properties["printerOneContratos:pgA4Color"]?exists && child.contrato.properties["printerOneContratos:pgA4Color"] != 0>${child.contrato.properties["printerOneContratos:pgA4Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Valor por Pagina A4 Monocromatica" : "<#if child.contrato.properties["printerOneContratos:pgA4Mono"]?exists && child.contrato.properties["printerOneContratos:pgA4Mono"] != 0>${child.contrato.properties["printerOneContratos:pgA4Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Franquia A3 Colorida" : "<#if child.contrato.properties["printerOneContratos:frA3Color"]?exists && child.contrato.properties["printerOneContratos:frA3Color"] != 0>${child.contrato.properties["printerOneContratos:frA3Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Franquia A3 Monocromatica" : "<#if child.contrato.properties["printerOneContratos:frA3Mono"]?exists && child.contrato.properties["printerOneContratos:frA3Mono"] != 0>${child.contrato.properties["printerOneContratos:frA3Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Franquia A4 Colorida" : "<#if child.contrato.properties["printerOneContratos:frA4Color"]?exists && child.contrato.properties["printerOneContratos:frA4Color"] != 0>${child.contrato.properties["printerOneContratos:frA4Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Franquia A4 Monocromatica" : "<#if child.contrato.properties["printerOneContratos:frA4Mono"]?exists && child.contrato.properties["printerOneContratos:frA4Mono"] != 0>${child.contrato.properties["printerOneContratos:frA4Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Total Franquia" : "<#if child.contrato.properties["printerOneContratos:valorFranquia"]?exists && child.contrato.properties["printerOneContratos:valorFranquia"] != 0>${child.contrato.properties["printerOneContratos:valorFranquia"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Excedente A3 Colorida" : "<#if child.contrato.properties["printerOneContratos:frExA3Mono"]?exists && child.contrato.properties["printerOneContratos:frExA3Mono"] != 0>${child.contrato.properties["printerOneContratos:frExA3Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Excedente A3 Monocromatica" : "<#if child.contrato.properties["printerOneContratos:frExA3Color"]?exists && child.contrato.properties["printerOneContratos:frExA3Color"] != 0>${child.contrato.properties["printerOneContratos:frExA3Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Excedente A4 Colorida" : "<#if child.contrato.properties["printerOneContratos:frExA4Color"]?exists && child.contrato.properties["printerOneContratos:frExA4Color"] != 0>${child.contrato.properties["printerOneContratos:frExA4Color"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Excedente A4 Monocromatica" : "<#if child.contrato.properties["printerOneContratos:frExA4Mono"]?exists && child.contrato.properties["printerOneContratos:frExA4Mono"] != 0>${child.contrato.properties["printerOneContratos:frExA4Mono"]?replace(',','')?replace('.',',')}<#else>0</#if>",
            "Link do Contrato" : "http://gedone.printerone.com.br:8080/share/page/document-details?nodeRef=workspace://SpacesStore/${child.contrato.id}",
            "Logradouro" : "<#if child.contrato.properties["printerOneContratos:logradouro"]?exists && child.contrato.properties["printerOneContratos:logradouro"] !="">${child.contrato.properties["printerOneContratos:logradouro"]}</#if>",
            "Numero" : "<#if child.contrato.properties["printerOneContratos:numero"]?exists && child.contrato.properties["printerOneContratos:numero"] !="">${child.contrato.properties["printerOneContratos:numero"]}</#if>",
            "Bairro" : "<#if child.contrato.properties["printerOneContratos:bairro"]?exists && child.contrato.properties["printerOneContratos:bairro"] !="">${child.contrato.properties["printerOneContratos:bairro"]}</#if>",
            "Complemento" : "<#if child.contrato.properties["printerOneContratos:complemento"]?exists && child.contrato.properties["printerOneContratos:complemento"] !="">${child.contrato.properties["printerOneContratos:complemento"]}</#if>",
            "CEP" : "<#if child.contrato.properties["printerOneContratos:cep"]?exists && child.contrato.properties["printerOneContratos:cep"] !="">${child.contrato.properties["printerOneContratos:cep"]}</#if>",
            "Municipio" : "<#if child.contrato.properties["printerOneContratos:municipio"]?exists && child.contrato.properties["printerOneContratos:municipio"] !="">${child.contrato.properties["printerOneContratos:municipio"]}</#if>",
            "Estado" : "<#if child.contrato.properties["printerOneContratos:estado"]?exists && child.contrato.properties["printerOneContratos:estado"] !="">${child.contrato.properties["printerOneContratos:estado"]}</#if>",
            "Observacao" : "<#if child.contrato.properties["printerOneContratos:observacao"]?exists && child.contrato.properties["printerOneContratos:observacao"] != "">${child.contrato.properties["printerOneContratos:observacao"]}</#if>",
            "Contrato Aprovado" : "<#if child.contrato.properties["printerOneContratos:aprovado"] == true >Sim<#else>Nao</#if>",
            "Contrato Assinado" : "<#if child.contrato.properties["printerOneContratos:statusAssinatura"] == true >Sim<#else>Nao</#if>",
            "Contrato Vencido" : "<#if child.contrato.properties["printerOneContratos:vencido"] == true>Sim<#else>Nao</#if>",
            <#if child.contrato.properties["printerOneContratos:equipamentosContratoWS"]?exists && child.contrato.properties["printerOneContratos:equipamentosContratoWS"] != "">${child.contrato.properties["printerOneContratos:equipamentosContratoWS"]}</#if>
            <#if child.contrato.properties["printerOneContratos:contatosClienteWS"]?exists && child.contrato.properties["printerOneContratos:contatosClienteWS"] != "">${child.contrato.properties["printerOneContratos:contatosClienteWS"]}</#if>
            <#--  "type" : "<#if child.contrato.mimetype?exists && child.contrato.mimetype != "">${child.contrato.mimetype}</#if>",
            "size" : "${child.contrato.size}",
            "id" : "${child.contrato.id}",
            "description" : "<#if child.contrato.properties["cm:description"]?exists && child.contrato.properties["cm:description"] != "">${child.contrato.properties["cm:description"]}</#if>",
            "pubDate" : "${child.contrato.properties["cm:modified"]?string(datetimeformat)}"  -->
        }
        <#if !(child.contrato == contratos?last.contrato)>,</#if>
        </#if>
    </#list>
    ]
}