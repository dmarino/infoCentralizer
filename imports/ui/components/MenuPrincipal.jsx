import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import AccountsUIWrapper from "./AccountsUIWrapper.jsx";
import {NotFound} from './NotFound.jsx';

class MenuPrincipal extends Component{

	constructor(props){
		super(props);
		this.state={
		    abierto:false,
		    config:false
		};
	}

	abrirSubMenu(){
	    if(this.state.abierto){
	        this.setState({abierto:false});
	    }
	    else{
	        this.setState({abierto:true});
	    }
	}

	abrirConfiguracion(){
	    if(this.state.config){
	        this.setState({config:false});
	    }
	    else{
	        this.setState({config:true});
	    }
	}	

	render(){
		return (
			<div className="menu">
	            <a href="/inicio"><img src="./images/logo.png" alt=""></img></a>
	            <span onClick={()=>this.abrirSubMenu()}>
	            	<i className="fa fa-user" aria-hidden="true"></i>
	            	{this.state.abierto?
	                    <i className="fa fa-caret-up" aria-hidden="true"></i>
	            	:
	                    <i className="fa fa-caret-down" aria-hidden="true"></i>	            	
	            	}
	            </span>
	            { this.state.abierto ?
	                <div className="subMenu">
	                    <div className="subMenuItem">
	                        <a onClick={()=>this.abrirConfiguracion()}>
	            	            Accounts
	            	            {this.state.config?
	                                <i className="fa fa-caret-up" aria-hidden="true"></i>
	            	            :
	                                <i className="fa fa-caret-down" aria-hidden="true"></i>	            	
	            	            }
	                        </a>	                        
	                        { this.state.config ?
	                            <AccountsUIWrapper/> 
	                        :
	                            null
	                        }                  
	                    </div>
	                    {Meteor.user()?
	                        <div className="subMenuItem">
	                    	    <a onClick={()=>this.props.verPerfil()}> Profile</a> 
	                        </div>
	                    :
	                        null    	                    
	                    }

	                </div>
	            :
	                null
	            }
			</div>
		);
	}
}

export default MenuPrincipal;