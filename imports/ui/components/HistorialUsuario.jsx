import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

import {Historial} from "../../api/Historial.js";

//import "../styles/HistorialUsuario.css";

class HistorialUsuario extends Component{

	constructor(props){
		super(props);
		this.state={
			busqueda:false
		}
	}

	render(){
		tmp = Historial.findOne({
			"user":this.props.usuario
		}, { sort: { "search.date": -1 } });
		if(tmp){
			search = tmp.search;
			console.log(search);
			return (
				<div id="HistorialUsuario">
					{search.map((e,k)=>{
						return <p key={k}><Link to={`/dashboard/${e.content}/${e.type}`}> {e.content}/{e.type} </Link></p>
					})}
				</div>
			);
		}
		return(
			<div>
				
			</div>
		);
	}
}

HistorialUsuario.PropTypes={

};

export default HistorialUsuario;