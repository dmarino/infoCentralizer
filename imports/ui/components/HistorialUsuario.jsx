import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

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
		tmp = Historial.find({}).fetch();//this.props.usuario;
		console.log(tmp);
		if(tmp){
			console.log(tmp);
		}
		return (
			<div id="HistorialUsuario">
				Holi! :D
			</div>
		);
	}
}

HistorialUsuario.PropTypes={

};

export default HistorialUsuario;