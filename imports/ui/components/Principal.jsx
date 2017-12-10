import React, {Component} from "react";
import PropTypes from "prop-types";

import { Switch, Route, Redirect} from 'react-router-dom';


import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
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
	            <div>
					<AccountsUIWrapper/>
					<button onClick={()=>this.props.verPerfil()}> Perfil </button>
				</div>		
		        <p>Hola! Soy el componente principal :3</p>
		        <span>Digite lo que quiere buscar</span>
		        <br/>
		        <input type="text" placeholder="Mi Cuenta" onKeyPress={this.onKeyPress.bind(this)}/>
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