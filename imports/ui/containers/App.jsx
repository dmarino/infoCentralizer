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

	buscar(text, type){
		texto = "/search/" + text;
		this.props.history.push(texto);
		let access_token = Meteor.user()?Meteor.user().services.facebook.accessToken:null;
		Meteor.call("FacebookRequestSearch",{query:text, type:type, access_token:access_token},(err, response)=>{
			if(err) throw err;
			console.log(response);
		});

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
				    	buscar = {(text, type)=>{this.buscar(text, type)}}/>
				    }/>
				    <Route path="/search" component={Search}/>
				    <Route path="*" component={NotFound}></Route>
    			</Switch>
			</div>
		);
	}
}


export default App;