import React, {Component} from "react";
import PropTypes from "prop-types";
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Principal from "../components/Principal.jsx";
import Search from "../components/Search.jsx";
import AccountsUIWrapper from "../components/AccountsUIWrapper.jsx";
import NotFound from "../components/NotFound.jsx";

class App extends Component{
	constructor(props){
		super(props);
		this.state={
			usuario:null
		};
	}

	buscar(text){
		texto = "/search/" + text;
		this.props.history.push(texto);
	}

	render(){
		console.log(Meteor.user());
		return(
			<div className="App">
				<div>
					<AccountsUIWrapper/>
				</div>
				<Switch>
					<Redirect exact from="/" to="/inicio"></Redirect>
				    <Route path='/inicio' render={(routeProps)=>
				    	<Principal {...routeProps}
				    	buscar = {(text)=>{this.buscar(text)}}/>
				    }/>
				    <Route path="/search" component={Search}/>
				    <Route path="*" component={NotFound}></Route>
    			</Switch>
			</div>
		);
	}
}


export default App;