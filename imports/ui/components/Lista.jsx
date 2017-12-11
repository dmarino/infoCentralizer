import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import {NotFound} from './NotFound.jsx';

class Lista extends Component{

	constructor(props){
		super(props);
	}

	renderResultados(){
	    console.log(this.props.valor);
	    if(this.props.valor.resultados){
	        return this.props.valor.resultados.map((p,i)=>{
	            if(p){
	            return <p key={i}> 
	                {p.source=="fb"?
	                    <i className="fa fa-facebook-official" aria-hidden="true"></i>
	                :
	                    null
	                }
	                {p.source=="twt"?
	                    <i className="fa fa-twitter" aria-hidden="true"></i>
	                :
	                    null
	                }
	                {p.source=="inst"?
	                    <i className="fa fa-instagram" aria-hidden="true"></i>
	                :
                        null
	                }	   	                	                
	                <a href={p.url} target="_blank"> {p.name}</a>
                </p>;
	            }
		    });	
	    }
	}

	render(){
		return (
		    <div className="lista">
		        <h2>{this.props.valor.nombre}</h2>
		        <div className="listaL">
		            {this.renderResultados()}
		        </div>
		    </div>
		);
	}
}

export default Lista;