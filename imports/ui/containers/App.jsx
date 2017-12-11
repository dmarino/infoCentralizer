import React, {Component} from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Inicio from "../components/Inicio.jsx";
import Principal from "../components/Principal.jsx";
import Profile from "../components/Profile.jsx";
import Search from "../components/Search.jsx";
import NotFound from "../components/NotFound.jsx";


import {Busquedas} from "../../api/Busquedas.js";
import {Historial} from "../../api/Historial.js";

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			usuario:null,
			busqueda:false,
	        resultadosFace:[],
	        resultadosInsta:[],
	        resultadosTwitter:[]			
		};
	}

	componentDidMount(){
		if(Meteor.user() !== this.state.usuario){
			this.setState({
				usuario:Meteor.user()
			});
		}
	}

	buscar(text, type){
		texto = "/dashboard/" + text + "/" + type;
		if(this.props.location.pathname !== texto){
			this.props.history.push(texto);
			this.setState({
				busqueda:true
			});
			this.busqueda(text, type);	
		}
	}

	busqueda(text, type){
		let access_token_facebook = null;
		let access_token_instagram = null;
		let access_token_twitter = null;
		let private_token_twitter = null;
		tmpFacebook = {};
		tmpTwitter = {};
		tmpInstagram = {};
		if(Meteor.user() && Meteor.user().services){
			if(Meteor.user().profile.nick){
				Meteor.call("historial.insert", Meteor.user().profile.nick, text, type);
			}
			if(Meteor.user().services.facebook)
				access_token_facebook =  Meteor.user().services.facebook.accessToken;
			if(Meteor.user().services.instagram)
				access_token_instagram = Meteor.user().services.instagram.id;
			if(Meteor.user().services.twitter){
				access_token_twitter = Meteor.user().services.twitter.accessToken;
				private_token_twitter = Meteor.user().services.twitter.accessTokenSecret;
			}
		}
		Meteor.call("busquedas.insert", text, type);
		Meteor.call("FacebookRequestSearch",{	
			query:text, 
			type:type, 
			access_token:access_token_facebook
		},(err, response)=>{
			if(err) throw err;
			tmpFacebook = response;
			Meteor.call("InstagramRequestSearch", {
				query:text,
				idUser:access_token_instagram
			}, (err, response)=>{
				if(err) throw err;
				if(access_token_instagram && text){
					//manejo de la respuesta para buscar	
				}
				tmpInstagram = response;
				Meteor.call("TwitterRequestSearch",{	
					query:text, 
					access_token:access_token_twitter, 
					access_private_token:private_token_twitter
				},(err, response)=>{
					if(err) throw err;
					tmpTwitter = response;
					this.setState({
						resultadosFace:tmpFacebook,
						resultadosInsta:tmpInstagram,
						resultadosTwitter:tmpTwitter
					});
				});
			});
		});
	}
	actualizar(nick, pass, agregar){
		if(agregar){
			console.log("se debe meter en el user de " + nick);
			Meteor.call("users.updateAccount", nick, pass, (resp, err)=>{
				if(err===-1){
					alert("No existe un usuario con ese login");
				}else{
					this.props.history.push("/dashboard");
				}
			});
		}
		else{
			console.log("nuevo user " + nick);
			Meteor.call("users.insertar", nick, pass, (resp, err)=>{
				if(err===-1){
					alert("Ya existe un usuario con ese login");
				}
				else{
					this.props.history.push("/dashboard");
				}
			});
		}
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
				    	busquedas={this.props.busquedas}/>
				    }/>					
				    <Route path='/dashboard' render={(routeProps)=>
				    	<Principal {...routeProps}
				    	buscar = {(text, type)=>{this.buscar(text, type)}}
				    	disableFacebook ={ Meteor.user() && Meteor.user().services ? 
				    		Meteor.user().services.facebook ? false : true
				    		: true }
				    	disableInstagram = { Meteor.user() && Meteor.user().services ? 
				    		Meteor.user().services.instagram ? false : true
				    	 : true }
				    	verPerfil = {()=>{this.verPerfil()}}
				    	busquedas={this.props.busquedas}
				    	busqueda={this.state.busqueda}
				    	resultadosFace={this.state.resultadosFace}
				    	resultadosInsta={this.state.resultadosInsta}
				    	resultadosTwitter={this.state.resultadosTwitter}/>
				    }/>
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
	Meteor.subscribe("usuarios");
	Meteor.subscribe("busquedas");
	Meteor.subscribe("historial");
	return{
		usuario:Meteor.user(),
		busquedas: Busquedas.find({}, { sort: { numero: -1 } }).fetch(),
	};
},App);