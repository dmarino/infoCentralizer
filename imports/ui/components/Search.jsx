import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import {NotFound} from './NotFound.jsx';
import MenuPrincipal from "./MenuPrincipal.jsx";

class Search extends Component{

	constructor(props){
		super(props);
		this.state={
			busqueda:false
		}
	}

	render(){
		console.log(this.props);	
		if(!this.props.busqueda && !this.state.busqueda){
			this.setState({
				busqueda:true
			});
			this.props.buscar(this.props.match.params.id, this.props.match.params.type);
		}
		return (
			<div id="principal">
				<MenuPrincipal 
                    verPerfil = {()=>{this.props.verPerfil()}}
	            >
	            </MenuPrincipal>
	            <div id="search">
				    <p>Hola! soy Search...</p>
				    <Switch>
					    <Route exact path="/search/:id/:type" component={componente1}/>
					    <Redirect to="/NotFound"/>
				    </Switch>	            
	            </div>	
			</div>
		);
	}
}

const componente1 = ({match})=>{
	console.log(match);
	return(<p>Holi! soy busqueda...</p>);
}

Search.PropTypes={

};

export default Search;