import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import {NotFound} from './NotFound.jsx';

//import "../styles/Profile.css";

class Profile extends Component{

	constructor(props){
		super(props);
		this.state={
			agregar:false
		}
	}

	onKeyPress(evt){
		if(evt.key ==="Enter"){
			this.props.actualizar(this.nick.value, evt.target.value, this.state.agregar);
		}
	}


	actualizarEstado(){
		this.setState({
			agregar:!this.state.agregar
		});
	}

	render(){
		let usuario = Meteor.user();
		console.log(usuario);
		return (
			<div id="Profile">
				<p>Hola! soy Profile... y tu eres {usuario.profile.name} </p>
				{usuario.profile.nick ? 
					<div>
						<p>Nick: {usuario.profile.nick}</p>
						<p>Contraseña: {usuario.profile.pass}</p>
					</div>
					:
					<div>
						{!this.state.agregar ? 
							<p> Puede escoger, si desea, un Nick y una contraseña, con el fin de
							poder unificar sus cuentas y mostrar resultados mas completos. </p>
							:
							<p>Por favor escriba su Nick y su contraseña para unificar cuentas.
								Recuerde que solo puede haber una cuenta asociada por red social</p>
						}
						<input type="text" placeholder="MyNick" ref = {(input)=> this.nick = input}/>
						<input type="password" placeholder="MyPassword" onKeyPress={this.onKeyPress.bind(this)}/>
						<input type="checkbox" onChange={this.actualizarEstado.bind(this)}/> Si ya tiene una cuenta asociada 
						y desea unir esa cuenta y esta.
					</div>
				}
			</div>
		);
	}
}


Profile.PropTypes={

};

export default Profile;