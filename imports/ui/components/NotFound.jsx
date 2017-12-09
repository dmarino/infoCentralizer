import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

//import "../styles/NotFound.css";

class NotFound extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
			    <h1>¡Woops, camino equivocado!</h1>
			    <p>Parece que has desviado tu busqueda.</p>
			</div>
		);
	}
}

NotFound.PropTypes={

};

export default NotFound;