<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
<html>
    <body>
        <h3>Contrato</h3>
        <table>
            <tr>
                <td><b>Documento</b></td>
                <td>${contrato.properties["cm:title"]!""}</td>
            </tr>
            <tr>
                <td><b>Nome Fantasia</b></td>
                <td><p><#if contrato.properties["printerOneContratos:nomeFantasia"]?exists && contrato.properties["printerOneContratos:nomeFantasia"] !="">${contrato.properties["printerOneContratos:nomeFantasia"]}</#if></p>
            </tr>
            <tr>
                <td><b>Equipamentos do Contrato</b></td>
                <td><p><#if contrato.properties["printerOneContratos:equipamentosContrato"]?exists && contrato.properties["printerOneContratos:equipamentosContrato"] != "">${contrato.properties["printerOneContratos:equipamentosContrato"]}</#if></p>
            </tr>
            <tr>
                <td><b>CNPJ</b></td>
                <td><p><#if contrato.properties["printerOneContratos:cnpj"]?exists && contrato.properties["printerOneContratos:cnpj"] !="">${contrato.properties["printerOneContratos:cnpj"]}</#if></p>
            </tr>
            <tr>
                <td><b>Valor Global Mensal</b></td>
                <td><p><#if contrato.properties["printerOneContratos:valorAluguelMensal"]?exists && contrato.properties["printerOneContratos:valorAluguelMensal"] != 0>${contrato.properties["printerOneContratos:valorAluguelMensal"]}</#if></p>
            </tr>
            <tr>
                <td><b>Valor Global Total</b></td>
                <td><p><#if contrato.properties["printerOneContratos:valorAluguel"]?exists && contrato.properties["printerOneContratos:valorAluguel"] != 0>${contrato.properties["printerOneContratos:valorAluguel"]}</#if></p>
            </tr>
            <tr>
                <td><b>Link</b></td>
                <td><a href="${url.serviceContext}/api/node/workspace/SpacesStore/${contrato.id}/content?guest=true">${url.serviceContext}/api/node/workspace/SpacesStore/${contrato.id}/content</a></td>
            </tr>
            <tr>
                <td><b>Tipo</b></td>
                <td><p><#if contrato.mimetype?exists && contrato.mimetype != "">${contrato.mimetype}</#if></p>
            </tr>
            <tr>
                <td><b>Tamanho</b></td>
                <td>${contrato.size}</td>
            </tr>
            <tr>
                <td><b>Id</b></td>
                <td>${contrato.id}</td>
            </tr>
            <tr>
                <td><b>Descrição</b></td>
                <td><p><#if contrato.properties["cm:description"]?exists
            && contrato.properties["cm:description"] !=
            "">${contrato.properties["cm:description"]}</#if></p>
                </td>
            </tr>
            <tr>
                <td><b>Data de Publicação</b></td>
                <td>${contrato.properties["cm:modified"]?string(datetimeformat)}</td>
            </tr>
            <tr>
                <td colspan="2" bgcolor="999999">&nbsp;</td>
            </tr>
        </table>
    </body>
</html>