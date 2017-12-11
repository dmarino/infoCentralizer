import React, {Component} from "react";
import PropTypes from "prop-types";
import { createContainer } from 'meteor/react-meteor-data';

import { Switch, Route, Redirect} from 'react-router-dom';

import MenuPrincipal from "./MenuPrincipal.jsx";
import Profile from "../components/Profile.jsx";

import NotFound from "./NotFound.jsx";
import Lista from "./Lista.jsx";
import {Busquedas} from "../../api/Busquedas.js";

class Principal extends Component{

	constructor(props){
		super(props);
	    this.state={
	        alias:"",
	        busqueda:false,
	        comparar:false,
	        number:0,
			primerValor:null,
			segundoValor:null
	    };
	}

	onKeyPress(evt){
		if(evt.key ==="Enter"){
			if(evt.target.value === "")
			{
				alert("Must search something, just nothing can't be a good search");
			}
			else
				this.props.buscar(evt.target.value, this.selected.value);
		}
	}

	handleChange=(event)=>{
		this.setState({alias: event.target.value});
	}


	buscar(){
	    this.props.buscar(this.state.alias, this.selected.value);
	}

	renderTrendings(){
        return this.props.busquedas.map((p,i)=>{
            if(i<10){return <span key={i}>{p.texto}</span>;}
            else{return null}
	    });	
	}

	comparison(value){
		tmp = this.state.number;
		tmp = tmp + 1;
		if(tmp == 2){
			this.setState({
				number:0,
				comparar:true,
				segundoValor:value
			});
		}
		else
			this.setState({
				number:tmp,
				comparar:false,
				primerValor:value
			});

	}

	cleanComparison(){
		this.setState({
			number:0,
			comparar:false,
			primerValor:null,
			segundoValor:null
		})
	}

	searchToCompare(){
		if(this.state.primerValor && this.state.segundoValor){
			
			this.props.comparar(this.state.primerValor, this.state.segundoValor);
			
		}
	}

	renderResultados(){
		if(this.props.resultadosFace.data && this.props.resultadosInsta.data && this.props.resultadosTwitter.data){

		    dataTransform = [];
			
			dataFB = this.props.resultadosFace.data.data.map((e)=>{
			    temp = "https://www.facebook.com/" + e.id;
				return {
					"id":e.id,
					"name":e.name,
					"source":"fb",
					"url": temp
				}
			});

			dataTransform.push({nombre:"Facebook", resultados:dataFB});

			dataTwt = this.props.resultadosTwitter.data.statuses.map((e)=>{
				if(e.entities.urls.length > 0){
					return {
						"id":e.id,
						"name":e.text,
						"source":"twt",
						"text":e.text,
						"url":e.entities.urls[0].expanded_url
					}
				}
			});

			dataTransform.push({nombre:"Twitter", resultados:dataTwt});	
					
			dataInsta = this.props.resultadosInsta.data.users.map((e)=>{
			    temp = "https://www.instagram.com/" + e.user.username;
				return {
					"id":e.user.pk,
					"name":e.user.username,
					"source":"inst",
					"follower_count":e.user.follower_count,
					"url": temp
				}
			});

			dataTransform.push({nombre:"Instagram", resultados:dataInsta});				

			return dataTransform.map((p,i)=>{
	            return <Lista key={i} valor={p}/>;
		    });	

		}
	}


	shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	render(){	
		if(!this.props.busqueda && !this.state.busqueda && this.props.match.params.id){
			this.setState({
				busqueda:true
			});
			this.props.buscar(this.props.match.params.id, this.props.match.params.type);
		}
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
			            {this.renderResultados()}            			            			            
			        </div>
			    </div>
			    <Switch>
				    <Route exact path="/dashboard" component={componenteDummy1}/>
				    <Route exact path="/dashboard/:id/:type" component={componenteDummy1}/>
				    <Redirect to="/NotFound"/>
				</Switch>
			</div>
		);
	}
}

export default createContainer(()=>{
	Meteor.subscribe("usuarios");
	return{
	};
},Principal);


var componenteDummy1=()=><div></div>;