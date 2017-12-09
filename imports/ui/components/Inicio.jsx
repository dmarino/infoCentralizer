import React, {Component} from "react";
import PropTypes from "prop-types";
import d3 from 'd3'
import { Switch, Route, Redirect} from 'react-router-dom'

import NotFound from "./NotFound.jsx";

class Inicio extends Component{

	constructor(props){
		super(props);
        this.state={
            root:{},
            force:{}
        };
	}

    componentDidMount(){
        this.draw();		
	}

	componentWillUpdate(){
        this.force.resume();	
	}
    
    draw(){

        var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; });
        var r = nodes[0];

        r.radius = 0;
        r.fixed = true;

        this.setState({root:r});

        this.force = d3.layout.force()
          .gravity(0.05)
          .charge(function(d, i) { return i ? 0 : -2000; })
          .nodes(nodes)
          .size([700, 400]);

        this.force.start();

        var context = this.canvas.getContext("2d");

        this.force.on("tick", function(e) {
            var q = d3.geom.quadtree(nodes), i, d, n = nodes.length;
            for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));

            context.clearRect(0, 0, 700, 400);
            context.beginPath();

            context.fillStyle = "#ff0000";    

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

    mouseMove = (e) => {
        var temporal = this.state.root;
        temporal.px =  e.pageX;
        temporal.py = e.pageY;
        this.setState({
            root:temporal
        });
    };    

	render(){
		return (
			<div id="Inicio" onMouseMove={this.mouseMove}>
			    <canvas id="graficaInicio"
                    width="700" 
                    height="400"
				    ref={(c)=>this.canvas=c}
			    >	    
			    </canvas>	
			    <div id="InfoInicio">
			        <h1>INFO-CENTRALIZER</h1>
			        <p>This is an application that allows you to compare the results of the same search on different social networks. </p>
			        <p>To begin click next</p>	
			        <a href="/dashboard">Next</a>
			    </div>					    	    
			</div>
		);
	}
}

export default Inicio