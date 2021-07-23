@RunWith(value = AlfrescoTestRunner.class)
public class PrinterOneContratosModelIT extends BaseIT {

    @Test
    public void testPrinterOneContratosAspect() {
        //final double AVG_RATING = 1.0;
        //final int RATING_COUNT = 1;
        //final int TOTAL = 1;

        final String tDocumento="Contrato";
        final String cnpj="05.554.777/0001-55";
        final String nomeEmpresarial="Printer One";
        final String nomeFantasia="Printer One";
        final String numeroContrato="88";
        final String dataInicio= "7/1/2021";
        final String dataFim="7/1/2022";
        final String tIndice= "IPCA";
        final Double indiceReajuste= 0;
        final Double valorAluguel= 45507.44;
        final Double valorAluguelMensal=4550.74;
        final Double valorMulta="Não possui";
        final String equipamentosContrato='[{"qtd":"2","desc":"Impressora","valorUni":"150","total":"300","delete":"-"}]';
        final String contatosCliente='[{"nome":"CLeber","email":"cleber@email.com","tel":"(11)99477-5557","delete":"-"}]';
        final String contratoReferencia="88"
        final boolean aprovado= true;
        final boolean statusAssinatura= true;
        final boolean vencido= false;

        NodeService nodeService = getServiceRegistry().getNodeService();

        Map<QName, Serializable> nodeProperties = new HashMap<>();
        this.nodeRef = createNode(getFilename(), ContentModel.TYPE_CONTENT, nodeProperties);

        QName aspectQName = createQName(printerOneContratosModel.NAMESPACE_PRINTERONE_CONTENT_MODEL, printerOneContratosModel.ASPECT_PRINTERONECONTRATOS);

        // set up some aspect-based properties
        Map<QName, Serializable> aspectProps = new HashMap<QName, Serializable>();

        //aspectProps.put(PROP_AVG_RATING_QNAME, AVG_RATING);
        //aspectProps.put(PROP_TOTAL_QNAME, TOTAL);
        //aspectProps.put(PROP_COUNT_QNAME, RATING_COUNT);

        aspectProps.put( PROP_tDocumento, tDocumento);
        aspectProps.put( PROP_cnpj, cnpj);
        aspectProps.put( PROP_nomeEmpresarial, nomeEmpresarial);
        aspectProps.put( PROP_nomeFantasia, nomeFantasia);
        aspectProps.put( PROP_numeroContrato, numeroContrato);
        aspectProps.put( PROP_dataInicio, dataInicio);
        aspectProps.put( PROP_dataFim, dataFim);
        aspectProps.put( PROP_tIndice, tIndice);
        aspectProps.put( PROP_indiceReajuste, indiceReajuste);
        aspectProps.put( PROP_valorAluguel, valorAluguel);
        aspectProps.put( PROP_valorAluguelMensal, valorAluguelMensal);
        aspectProps.put( PROP_valorMulta, valorMulta);
        aspectProps.put( PROP_equipamentosContrato, equipamentosContrato);
        aspectProps.put( PROP_contatosCliente, contatosCliente);
        aspectProps.put( PROP_contratoReferencia, contratoReferencia);
        aspectProps.put( PROP_aprovado, aprovado);
        aspectProps.put( PROP_statusAssinatura, statusAssinatura);
        aspectProps.put( PROP_vencido, vencido); 

        nodeService.addAspect(nodeRef, aspectQName, aspectProps);

        // assertEquals(AVG_RATING, nodeService.getProperty(this.nodeRef, PROP_AVG_RATING_QNAME));
        // assertEquals(TOTAL, nodeService.getProperty(this.nodeRef, PROP_TOTAL_QNAME));
        // assertEquals(RATING_COUNT, nodeService.getProperty(this.nodeRef, PROP_COUNT_QNAME));

        assertEquals(tDocumento, nodeService.getProperty(this.nodeRef, PROP_tDocumento));
        assertEquals(cnpj, nodeService.getProperty(this.nodeRef, PROP_cnpj));
        assertEquals(nomeEmpresarial, nodeService.getProperty(this.nodeRef, PROP_nomeEmpresarial));
        assertEquals(nomeFantasia, nodeService.getProperty(this.nodeRef, PROP_nomeFantasia));
        assertEquals(numeroContrato, nodeService.getProperty(this.nodeRef, PROP_numeroContrato));
        assertEquals(dataInicio, nodeService.getProperty(this.nodeRef, PROP_dataInicio));
        assertEquals(dataFim, nodeService.getProperty(this.nodeRef, PROP_dataFim));
        assertEquals(tIndice, nodeService.getProperty(this.nodeRef, PROP_tIndice));
        assertEquals(indiceReajuste, nodeService.getProperty(this.nodeRef, PROP_indiceReajuste));
        assertEquals(valorAluguel, nodeService.getProperty(this.nodeRef, PROP_valorAluguel));
        assertEquals(valorAluguelMensal, nodeService.getProperty(this.nodeRef, PROP_valorAluguelMensal));
        assertEquals(valorMulta, nodeService.getProperty(this.nodeRef, PROP_valorMulta));
        assertEquals(equipamentosContrato, nodeService.getProperty(this.nodeRef, PROP_equipamentosContrato));
        assertEquals(contatosCliente, nodeService.getProperty(this.nodeRef, PROP_contatosCliente));
        assertEquals(contratoReferencia, nodeService.getProperty(this.nodeRef, PROP_contratoReferencia));
        assertEquals(aprovado, nodeService.getProperty(this.nodeRef, PROP_aprovado));
        assertEquals(statusAssinatura, nodeService.getProperty(this.nodeRef, PROP_statusAssinatura));
        assertEquals(vencido, nodeService.getProperty(this.nodeRef,PROP_vencido)); 

        assertTrue("Missing aspect", getServiceRegistry().getNodeService().hasAspect(nodeRef, aspectQName));
    }
}