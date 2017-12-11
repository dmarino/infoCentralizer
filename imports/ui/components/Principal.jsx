import React, {Component} from "react";
import PropTypes from "prop-types";
import { createContainer } from 'meteor/react-meteor-data';

import { Switch, Route, Redirect} from 'react-router-dom';

import MenuPrincipal from "./MenuPrincipal.jsx";
import Opcion from "./Opcion.jsx";
import Profile from "../components/Profile.jsx";
import Search from "../components/Search.jsx";

import NotFound from "./NotFound.jsx";
import ListElement from "./ListElement.jsx";
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
			tmp = this.state.primerValor.split(",");
			sourceOne = tmp[1];
			idOne = tmp[0];
			tmp = this.state.segundoValor.split(",");
			sourceTwo = tmp[1];
			idTwo = tmp[0];
			console.log(sourceOne);
			console.log(sourceTwo);
			console.log(idOne);
			console.log(idTwo);
		}
	}

	renderResultados(){
		if(this.props.resultadosFace.data && this.props.resultadosInsta.data && this.props.resultadosTwitter.data){
			dataFb = this.props.resultadosFace.data.data;
			dataTwt = this.props.resultadosTwitter.data.statuses;
			dataInsta = this.props.resultadosInsta.data.users;
			dataTransform = [];
			console.log(this.props.resultadosTwitter);
			dataFb.map((e)=>{
				tmp = {
					"id":e.id,
					"name":e.name,
					"source":"fb"
				}
				dataTransform.push(tmp);
			});
			dataTwt.map((e)=>{
				if(e.entities.urls.length > 0){
					tmp = {
						"id":e.id,
						"name":e.user.name,
						"source":"twt",
						"text":e.text,
						"url":e.entities.urls[0].expanded_url
					}
					dataTransform.push(tmp);
				}
			});
			dataInsta.map((e)=>{
				tmp = {
					"id":e.user.pk,
					"name":e.user.username,
					"source":"inst",
					"follower_count":e.user.follower_count
				}
				dataTransform.push(tmp);
			});

			//dataTransform = this.shuffle(dataTransform);
			console.log(dataTransform);

			return dataTransform.map((p,i)=>{
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
	                {p.name} 
	                <span> <ListElement value={`${p.id},${p.source}`} disabled={this.state.comparar} click={(value)=>{this.comparison(value)}}/></span>
	            </p>;
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
			            <div id="botones">
			            	<a className="boton" onClick={()=>{this.cleanComparison()}}>Limpiar seleccion</a>
			        	    <a className="boton" onClick={()=>{this.searchToCompare()}}>comparar</a>	
			            </div>	
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