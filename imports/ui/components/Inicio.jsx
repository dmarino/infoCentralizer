import React, {Component} from "react";
import PropTypes from "prop-types";
import d3 from 'd3'
import { Switch, Route, Redirect} from 'react-router-dom'

import NotFound from "./NotFound.jsx";

class Inicio extends Component{

	constructor(props){
		super(props);
		console.log(props);
	}

    componentDidMount(){
        this.forceUpdate(); 
        var force;
	}

	componentWillUpdate(newProps){
		this.redraw();
		console.log("redrawing");
	}
    
    redraw(){

var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; }),
    root = nodes[0],color = d3.scale.category10();

root.radius = 0;
root.fixed = true;

    this.force = d3.layout.force()
    .gravity(0.05)
    .charge(function(d, i) { return i ? 0 : -2000; })
    .nodes(nodes)
    .size([500, 500]);

this.force.start();


var context = this.canvas.getContext("2d");

this.force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i,
      d,
      n = nodes.length;

  for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));

  context.clearRect(0, 0, 500, 500);
  context.fillStyle = "steelblue";
  context.beginPath();
  for (i = 1; i < n; ++i) {
    d = nodes[i];
    context.moveTo(d.x, d.y);
    context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
  }
  context.fill();
});

function collide(node) {
  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}
    }

mouseMove(){
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  this.force.resume();
};    


	render(){
		return (
			<div id="Inicio">
			    <h1>Info-Centralizer</h1>
			    <p>this is an application that allows you to bla bla</p>
			    <canvas 
                    width="500" 
                    height="500"
				    ref={(c)=>this.canvas=c}
				    onMouseMove={this.mouseMove}
			    >
			    </canvas>
			</div>
		);
	}
}

export default Inicio