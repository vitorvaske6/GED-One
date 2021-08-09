package com.printerone.cmis.examples;


/**
 * This class creates an printerOneContratos:printerOneContratos object in the folder identified by the root folder parameter.
 * This is a port of the PrinterOneDataCreator class which uses the Alfresco Web Services API. This example
 * shows how to create instances of custom content types via CMIS including how to set custom properties
 * defined in a custom aspect.
 * 
 * @author Vitor Vaske
 */

public class PrinterOneCMISDataCreator extends CMISExampleBase {
    private static final String USAGE = "java PrinterOneDataCreator <username> <password> <root folder> <hysitech|document> <content name>";

	public static void main(String[] args) throws Exception {
    	if (args.length != 5) doUsage(PrinterOneCMISDataCreator.USAGE);
    	PrinterOneCMISDataCreator contrato = new PrinterOneCMISDataCreator();
    	contrato.setUser(args[0]);
    	contrato.setPassword(args[1]);
    	contrato.setFolderName(args[2]);
    	contrato.setContentType(args[3]);
    	contrato.setContentName(args[4]);
    	contrato.create();
		System.exit(0);
    }
	
	public void create() {
		createTestDoc(getContentName(), getContentType());
		return;
	}

}