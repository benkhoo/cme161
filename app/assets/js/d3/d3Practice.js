var DataSet = function() {
    this.data = {
        "name": "Items",
        "children": [{
              "id": "0001",
              "name": "Cake Donut",
              "children": [{
                "name": "Batter",
                "children": [{"id": "11001","name": "Regular"  }, 
                						 {"id": "11002","name": "Chocolate"}, 
                             {"id": "11003","name": "Blueberry"}, 
                             {"id": "11004","name": "Devil's Food"}]
              }, {
                "name": "Topping",
                "children": [{"id": "15001","name": "None"}, 
                						 {"id": "15002","name": "Glazed"}, 
                             {"id": "15005","name": "Sugar"}, 
                             {"id": "15007","name": "Powdered Sugar"},
                             {"id": "15006","name": "Chocolate with Sprinkles"},
                             {"id": "15003","name": "Chocolate"}, 
                             {"id": "15004","name": "Maple"}]
              }]
            }, {
              "id": "0002",
              "name": "Raised Donut",
              "children": [{
              	"name": "Batter",
                "children": [{"id": "21001","name": "Regular"}, 
                						 {"id": "21002","name": "Chocolate"}, 
                             {"id": "21003","name": "Blueberry"}, 
                             {"id": "21004","name": "Devil's Food"}]
              }, {
                "name": "Topping",
                "children": [	{"id": "25001","name": "None"}, 
                							{"id": "25002","name": "Glazed"}, 
                              {"id": "25005","name": "Sugar"}, 
                              {"id": "25007","name": "Powdered Sugar"}, 
                              {"id": "25006","name": "Chocolate with Sprinkles"}, 
                              {"id": "25003","name": "Chocolate"}, 
                              {"id": "25004","name": "Maple"}
                              ]
                	}
               						]
						},{
              "id": "0003",
              "name": "Old Fashioned Donut",
              "children": [{
              	"name": "Batter",
                "children": [{"id": "31001","name": "Regular"}, 
                						 {"id": "31002","name": "Chocolate"}]
              }, {
                "name": "Topping",
                "children": [	{"id": "35001","name": "None"}, 
                							{"id": "35002","name": "Glazed"},  
                              {"id": "35003","name": "Chocolate"}, 
                              {"id": "35004","name": "Maple"}
                              ]
                	}
               						]
						},{
              "id": "0004",
              "name": "Bar",
              "type": "bar",
              "ppu": 0.75,
              "children": [{
              	"name": "Batter",
                "children": [{"id": "41001","name": "Regular"}]
              }, {
                "name": "Fillings",
                "children": [	{"id": "47001","name": "None","addcost" : 0}, 
                							{"id": "47002","name": "Custard","addcost" : 0.25},  
                              {"id": "47003","name": "Whipped Cream","addcost" : 0.25}
                              ]
                	}
               						]
						},{
              "id": "0005",
              "name": "Twist",
              "type": "twist",
              "ppu": 0.65,
              "children": [{
              	"name": "Batter",
                "children": [{"id": "51001","name": "Regular"}]
              }, {
                "name": "Topping",
                "children": [	{"id": "55002","name": "Glazed"}, 
                              {"id": "55005","name": "Sugar"}]
                	}
               						]
						},{
              "id": "0006",
              "name": "Filled",
              "type": "filled",
              "ppu": 0.75,
              "children": [{
              	"name": "Batter",
                "children": [{"id": "61001","name": "Regular"}]
              }, {
                "name": "Topping",
                "children": [	{"id": "65002","name": "Glazed"},
                              {"id": "65007","name": "Powdered Sugar"},
                              {"id": "65003","name": "Chocolate"}, 
                              {"id": "65004","name": "Maple"}
                              ]
                	},{
                "name": "Fillings",
                "children": [	{"id": "67002","name": "Custard","addcost" : 0},  
                              {"id": "67003","name": "Whipped Cream","addcost" : 0},
                              {"id": "67004","name": "Strawberry Jelly","addcost" : 0},  
                              {"id": "67005","name": "Raspberry Jelly","addcost" : 0}
                              ]
                	}
               						]
						}
				]}
}
                        
///--------------------------------------------
var flare_min = (new DataSet()).data;

var height = 600, width = 600;

var svg = d3
  .select("#hierarchy")
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", "translate(50,0)");

var tree = d3
  .layout
  .tree()
  .size([height, width - 150]);

var diagonal = d3
	.svg
  .diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var color_map = d3.scale.linear()
    .domain([0, 3])
    .range(["blue", "green"]);
    

function findInPath(source, text) {
  if (source.name.search(text) >= 0) {
    return true;
  } else if (source.children || source._children) {
    var c = source.children ? source.children : source._children;
    for (var i = 0; i < c.length; i++) {
      if (findInPath(c[i], text)) {
        return true;
      }
    }
  }
  return false;
}

var linkFilter = function(d, search_term) {
  return findInPath(d.target, search_term);
}    

var highlight_path = function(search_term) {
	var nodes = tree.nodes(flare_min);
  var links = tree.links(nodes);
  
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

	link.filter(function(d) {return linkFilter(d,search_term);})
    		.style("stroke", "red")
        .style("stroke-opacity", 0.7);
        
}

var reset_path = function() {
	var nodes = tree.nodes(flare_min);
  var links = tree.links(nodes);
  
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; })
    .style("stroke", function(d){return color_map(d.source.depth) ;})    
  	.style("stroke-width", "1.5px")
    .style("stroke-opacity", 0.2);
}

//----------------------------------

flare_min.x0 = height / 2;
flare_min.y0 = 0;

var i = 0;
var duration = 750;

update(flare_min);


function update(source) {

  var nodes = tree.nodes(flare_min);
  var links = tree.links(nodes);
  
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
    .style("stroke", function(d){return color_map(d.depth);})
  	.style("stroke-width", "1.5px");

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6)
    .style("font", "10px sans-serif")
  	.style("stroke", "black")
  	.style("stroke-width", ".01px");

  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 5)
	  .style("fill", function(d) { return d._children ? color_map(d.depth) : "#fff"; })
    .style("opacity", function(d) { return d._children ? 0.7 : 1; })
  	.style("stroke", function(d){return color_map(d.depth) ;})
  	.style("stroke-width", "1.5px");

  nodeUpdate.select("text")
	  .style("fill-opacity", 1)
    .style("font", "10px sans-serif")
  	.style("stroke", "black")
  	.style("stroke-width", ".01px");

  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  })
    .style("fill", "none")
    .style("stroke", function(d){return color_map(d.source.depth) ;})    
  	.style("stroke-width", "1.5px")
    .style("stroke-opacity", 0.2);

  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
  
  
}

function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}

document.getElementById('btn_blueberry').addEventListener("click", function(d){return highlight_path("Blueberry");});
document.getElementById('btn_glazed').addEventListener("click", function(d){return highlight_path("Glazed");});
document.getElementById('btn_maple').addEventListener("click", function(d){return highlight_path("Maple");});
document.getElementById('btn_chocolate').addEventListener("click", function(d){return highlight_path("Chocolate");});

document.getElementById('btn_search').addEventListener("click", function(d){return highlight_path(
																																										document.getElementById('searchTxt').value	
                                                                           	);});

document.getElementById('btn_clear').addEventListener("click", reset_path);
reset_path()


