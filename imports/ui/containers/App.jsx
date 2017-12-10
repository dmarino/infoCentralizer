import React, {Component} from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Inicio from "../components/Inicio.jsx";
import Principal from "../components/Principal.jsx";
import Profile from "../components/Profile.jsx";
import Search from "../components/Search.jsx";
import NotFound from "../components/NotFound.jsx";

import { Busquedas } from '../../api/Busquedas.js';

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			usuario:null
		};
	}

	componentDidMount(){
		if(this.props.usuario !== this.state.usuario){
			this.setState({
				usuario:this.props.usuario
			})
		}
	}

	buscar(text, type){
		texto = "/search/" + text;
		if(this.props.location.pathname !== texto){
			this.props.history.push(texto);
			let access_token = Meteor.user() ? Meteor.user().services.facebook.accessToken:null;
			Meteor.call("FacebookRequestSearch",{query:text, type:type, access_token:access_token},(err, response)=>{
				if(err) throw err;
				console.log(response);
			});
			Meteor.call("TwitterRequestSearch", {query:text}, (err, response)=>{
				if(err) throw err;
				console.log(response);
			});
		}

		Meteor.call("busquedas.insert",{nombre:text,tipo:type,cantidad:1});

	}
	actualizar(nick, pass, agregar){
		if(agregar){
			console.log("se debe meter en el user de " + nick);
			Meteor.call("users.updateAccount", nick, pass, (resp, err)=>{
				if(err) 
					alert("No existe un usuario con ese login");
			});
		}
		else{
			console.log("nuevo user " + nick);
			Meteor.call("users.insertar", nick, pass, (resp, err)=>{
				if(err)
					alert("Ya existe un usuario con ese login");
			});
		}
		this.props.history.push("/inicio");
	}
	verPerfil(){
		if(this.props.location.pathname!== "/profile")
			this.props.history.push("/profile");
	}

	render(){
		return(
			<div className="App">
				<Switch>
					<Redirect exact from="/" to="/inicio"></Redirect>
				    <Route path="/inicio" render={(routeProps)=>
				    	<Inicio {...routeProps}
				    	busquedas = {this.props.busquedas}/>	
				    }/>					
				    <Route path='/dashboard' render={(routeProps)=>
				    	<Principal {...routeProps}
				    	buscar = {(text, type)=>{this.buscar(text, type)}}
				    	verPerfil = {()=>{this.verPerfil()}}
				    	busquedas = {this.props.busquedas}/>
				    }/>
				    <Route path="/search" component={Search}/>
				    {Meteor.user()?

				    	<Route path='/profile' render={(routeProps)=>
				    	<Profile {...routeProps}
				    	actualizar = {(nick, pass, agregar)=>{this.actualizar(nick, pass, agregar)}}/>
				   	 	}/>
					:null}
				    <Route path="*" component={NotFound}></Route>
    			</Switch>
			</div>
		);
	}
}


export default createContainer(()=>{

	return{
		usuario:Meteor.user(),
        busquedas: Busquedas.find({}, { sort: { cantidad: -1 } }).fetch(),		
	};
},App);