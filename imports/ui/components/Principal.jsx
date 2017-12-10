import React, {Component} from "react";
import PropTypes from "prop-types";
import { createContainer } from 'meteor/react-meteor-data';

import { Switch, Route, Redirect} from 'react-router-dom';

import MenuPrincipal from "./MenuPrincipal.jsx";
import Opcion from "./Opcion.jsx";
import NotFound from "./NotFound.jsx";

class Principal extends Component{

	constructor(props){
		super(props);
	    this.state={
	        alias:""
	    };
	}

	onKeyPress(evt){
		if(evt.key ==="Enter"){
			this.props.buscar(evt.target.value, this.selected.value, this.latitud, this.longitud, this.radius);
		}
	}

	handleChange=(event)=>{
		this.setState({alias: event.target.value});
	}


	buscar(){
	    this.props.buscar(this.state.alias, this.selected.value, this.latitud, this.longitud, this.radius);
	}

	renderTrendings(){
        return this.props.busquedas.map((p,i)=>{
            if(i<10){return <span key={i}>{p.nombre}</span>;}
            else{return null}
	    });	
	}
	
	render(){
		return (
			<div id="Principal">
			    <MenuPrincipal 
                    verPerfil = {()=>{this.props.verPerfil()}}
			    >
			    </MenuPrincipal>

			    <div className="grid" id="trending">
			        <h2>TRENDING</h2>
			        {this.renderTrendings()}
			    </div>

			    <div className="grid" id="opciones">
			        <div className="busqueda">
			            <div className="busquedaItem">
			                <input type="text" placeholder="Insert Your Text Here" arial-label="Search" onKeyPress={this.onKeyPress.bind(this)} onChange={this.handleChange}/>
			                <a id="buscar" onClick={this.buscar.bind(this)}> Search </a>			                            
			            </div>
			            <div className="busquedaItem">
			                <div className="busquedaSubItem">
			                    <span>Facebook:</span>
			                    <select name="type" id="type" ref = {(input)=> this.selected = input}>
		        	                <option value="page">Page</option>
		        	                <option value="place">Place</option>
		        	                <option value="user" disabled={this.props.disableFacebook}>User</option>
		        	                <option value="group" disabled={this.props.disableFacebook}>Group</option>
		        	                <option value="event" disabled={this.props.disableFacebook}>Event</option>
		                        </select>
			                </div>
			                <div className="busquedaSubItem">
			                    <span>Instagram:</span>
			                    <select name="user" id="user" ref = {(input)=> this.selectInsta = input}>
		                	        <option value="usuarios">Users</option>
		                	        <option value="publicaciones" disabled={this.props.disableInstagram}>My Pictures</option>
		                        </select> 
			                </div>	
			                <div className="busquedaSubItem">
			                    <span>Twitter:</span>
			                    <select name="twitter" id="user" ref = {(input)=> this.selectTwitter = input}>
		                	        <option value="usuarios">Tweets</option>
		                        </select>
			                </div>			                 
			            </div>				            		            
			        </div>
			        <div id="dashboard">		            			            			            
			        </div>

			    </div>
			</div>
		);
	}
}

export default createContainer(()=>{
	Meteor.subscribe("usuarios");
	return{
	};
},Principal);