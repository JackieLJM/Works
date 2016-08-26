function {
	var nodes=[],
    	node = document.getElementById("content").lastChild.cloneNode(true);
    for (var i = 0; i <= 19; i++) {
    	nodes[i]=node;
    }
    document.getElementById("content").appendChild(nodes);
    alert(node.length);
}
