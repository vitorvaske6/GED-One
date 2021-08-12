if (args.id == null || args.id.length == 0) {
    status.code = 400;
    status.message = "Node ID não existe ou não foi passado";
    status.redirect = true;
} else {
    var curNode = search.findNode("workspace://SpacesStore/" + args.id);
    if (curNode == null) {
        status.code = 404;
        status.message = "Nenhum node encontrado com id:" + args.id;
        status.redirect = true;
    } else {
        model.contrato = curNode;
    }
}