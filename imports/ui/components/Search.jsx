import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import {NotFound} from './NotFound.jsx';

//import "../styles/Search.css";

class Search extends Component{

	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props);
		return (
			<div id="Search">
				<p>Hola! soy Search...</p>
				<Switch>
					<Route exact path="/search/:id" component={componente1}/>
					<Redirect to="/NotFound"/>
				</Switch>
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