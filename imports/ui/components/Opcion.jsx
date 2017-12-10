import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import {NotFound} from './NotFound.jsx';

class Opcion extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
		    <div className="opcion">
		        <iframe>
		        </iframe>
		    </div>
		);
	}
}

export default Opcion;