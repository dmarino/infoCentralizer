import React, {Component} from "react";
import PropTypes from "prop-types";

import { Switch, Route, Redirect} from 'react-router-dom'

import MenuPrincipal from "./MenuPrincipal.jsx";
import NotFound from "./NotFound.jsx";

class Principal extends Component{

	constructor(props){
		super(props);
		console.log(props);
	}

	onKeyPress(evt){
		if(evt.key ==="Enter"){
			this.props.buscar(evt.target.value, this.selected.value);
		}
	}

	render(){
		return (
			<div id="Principal">
			    <MenuPrincipal 
                    verPerfil = {()=>{this.props.verPerfil()}}
			    >
			    </MenuPrincipal>

		        <p>Hola! Soy el componente principal :3</p>
		        <span>Digite lo que quiere buscar</span>
		        <br/>
		        <input type="text" placeholder="Mi Cuenta" onKeyPress={this.onKeyPress.bind(this)}/>
		        <select name="type" id="type" ref = {(input)=> this.selected = input}>
		        	<option value="user">user</option>
		        	<option value="page">page</option>
		        	<option value="group">group</option>
		        	<option value="event">event</option>
		        	<option value="place">place</option>
		        </select>
		        <Switch>
		        	<Route exact path={`${this.props.match.path}`} component={componente1}></Route>
		        	<Route exact path={`${this.props.match.path}/:id`} component={componente2}></Route>
		        	<Redirect to="/NotFound"/>
		        </Switch>
			</div>
		);
	}
}

const componente1 = ()=>{
	return (<p>Y yo el compomenten mas principal!</p>);
}

const componente2 = ({match})=>{
	console.log(match);
	numero = match.params.id;
	return(
		<p>Segundo componente, miramiramiramira, yo soy tu padre {match.params.id}</p>
	);
}

export default Principal