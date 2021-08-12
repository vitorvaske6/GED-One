<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
<html>
    <body>
        <h3>Contratos</h3>
        <table>
            <#list contratos as child>
                <tr>
                    <td><b>Documento</b></td>
                    <td>${child.contrato.properties["cm:title"]!""}</td>
                </tr>
                <tr>
                    <td><b>Nome Fantasia</b></td>
                    <td><p><#if child.contrato.properties["printerOneContratos:nomeFantasia"]?exists && child.contrato.properties["printerOneContratos:nomeFantasia"] !="">${child.contrato.properties["printerOneContratos:nomeFantasia"]}</#if></p>
                </tr>
                <tr>
                    <td><b>Equipamentos do Contrato</b></td>
                    <td><p><#if child.contrato.properties["printerOneContratos:equipamentosContrato"]?exists && child.contrato.properties["printerOneContratos:equipamentosContrato"] != "">${child.contrato.properties["printerOneContratos:equipamentosContrato"]}</#if></p>
                </tr>
                <tr>
                    <td><b>CNPJ</b></td>
                    <td><p><#if child.contrato.properties["printerOneContratos:cnpj"]?exists && child.contrato.properties["printerOneContratos:cnpj"] !="">${child.contrato.properties["printerOneContratos:cnpj"]}</#if></p>
                </tr>
                <tr>
                    <td><b>Valor Global Mensal</b></td>
                    <td><p><#if child.contrato.properties["printerOneContratos:valorAluguelMensal"]?exists && child.contrato.properties["printerOneContratos:valorAluguelMensal"] != 0>${child.contrato.properties["printerOneContratos:valorAluguelMensal"]}</#if></p>
                </tr>
                <tr>
                    <td><b>Valor Global Total</b></td>
                    <td><p><#if child.contrato.properties["printerOneContratos:valorAluguel"]?exists && child.contrato.properties["printerOneContratos:valorAluguel"] != 0>${child.contrato.properties["printerOneContratos:valorAluguel"]}</#if></p>
                </tr>
                <tr>
                    <td><b>Link</b></td>
                    <td><a href="${url.serviceContext}/api/node/workspace/SpacesStore/${child.contrato.id}/content?guest=true">${url.serviceContext}/api/node/workspace/SpacesStore/${child.contrato.id}/content</a></td>
                </tr>
                <tr>
                    <td><b>Tipo</b></td>
                    <td><p><#if child.contrato.mimetype?exists && child.contrato.mimetype != "">${child.contrato.mimetype}</#if></p>
                </tr>
                <tr>
                    <td><b>Tamanho</b></td>
                    <td>${child.contrato.size}</td>
                </tr>
                <tr>
                    <td><b>Id</b></td>
                    <td>${child.contrato.id}</td>
                </tr>
                <tr>
                    <td><b>Descrição</b></td>
                    <td><p><#if child.contrato.properties["cm:description"]?exists
                && child.contrato.properties["cm:description"] !=
                "">${child.contrato.properties["cm:description"]}</#if></p>
                    </td>
                </tr>
                <tr>
                    <td><b>Data de Publicação</b></td>
                    <td>${child.contrato.properties["cm:modified"]?string(datetimeformat)}</td>
                </tr>

                <tr>
                    <td colspan="2" bgcolor="999999">&nbsp;</td>
                </tr>

            </#list>
        </table>
    </body>
</html>