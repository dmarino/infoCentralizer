import React, {Component} from "react";
import PropTypes from "prop-types";

import { Switch, Route, Redirect} from 'react-router-dom';

import MenuPrincipal from "./MenuPrincipal.jsx";
import Opcion from "./Opcion.jsx";
import NotFound from "./NotFound.jsx";

class Principal extends Component{

	constructor(props){
		super(props);
		this.state={
			lugar:false
		};
	}

	onKeyPress(evt){
		if(evt.key ==="Enter"){
			this.props.buscar(evt.target.value, this.selected.value);
		}
	}

	enableMore(){
		if(this.selected.value === "place"){
			this.setState({
				lugar:true
			});
		}
		else if(this.state.lugar){
			this.setState({
				lugar:false
			});
		}
	}

	render(){
		return (
			<div id="Principal">
			    <MenuPrincipal 
                    verPerfil = {()=>{this.props.verPerfil()}}
			    >
			    </MenuPrincipal>

			    <div className="grid" id="trending">
			        <span>prueba prueba prueba</span>
			    </div>

			    <div className="grid" id="opciones">
			        <div className="busqueda">
			            <input type="text" placeholder="busqueda" arial-label="busqueda" onKeyPress={this.onKeyPress.bind(this)}/>
		                <select name="type" id="type" ref = {(input)=> this.selected = input} 
		        	        onChange={()=>this.enableMore()}>
		        	        <option value="page">page</option>
		        	        <option value="place">place</option>
		        	        <option value="user" disabled={!Meteor.user()}>user</option>
		        	        <option value="group" disabled={!Meteor.user()}>group</option>
		        	        <option value="event" disabled={!Meteor.user()}>event</option>
		                </select>
		                {this.state.lugar ? 
		        	        <span>
			        	        <input type="text" placeholder = "latitud"/>
			        	        <input type="text" placeholder = "longitud"/>
			        	        <input type="text" placeholder = "Distancia radial"/>
		        	        </span>
		        	    :null
		                }
			        </div>
			        <div id="dashboard">
			            <Opcion></Opcion>
			            <Opcion></Opcion>
			            <Opcion></Opcion>
			            <Opcion></Opcion>			            			            			            
			        </div>

			    </div>
			</div>
		);
	}
}

export default Principal