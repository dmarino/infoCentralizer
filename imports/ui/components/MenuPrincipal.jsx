import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import {NotFound} from './NotFound.jsx';

class MenuPrincipal extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="menu">
	            <img src="./images/logo.png" alt=""></img>
	            <AccountsUIWrapper/>
				<button onClick={()=>this.props.verPerfil()}> Perfil </button>
			</div>
		);
	}
}

export default MenuPrincipal;