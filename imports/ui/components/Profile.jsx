import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import {NotFound} from './NotFound.jsx';
import HistorialUsuario from './HistorialUsuario.jsx';
import MenuPrincipal from "./MenuPrincipal.jsx";


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
		return (
			<div id="Principal">
			    <MenuPrincipal 
                    verPerfil = {()=>{this.props.verPerfil()}}
			    >
			    </MenuPrincipal>	

			    <div className="grid" id="profile">
			        <div className="profileItem">
		                <i className="fa fa-user" aria-hidden="true"></i>			        
			        </div>
			        <div className="profileItem">
		                <label>Nickname:</label>
		                {usuario.profile.nick ?
                            <span> {usuario.profile.nick} </span>
		                :
						    <input type="text" placeholder="MyNick" ref = {(input)=> this.nick = input}/>		                
		                }			        
			        </div>
			        <div className="profileItem">
		                { usuario.profile.nick?
                            null
		                :
		                    <div>
		                        <label>Password:</label>
						        <input type="password" placeholder="MyPassword" onKeyPress={this.onKeyPress.bind(this)}/>       
						    </div>       
		                }			        
			        </div>	
			        <div className="profileItem">
		                { usuario.profile.nick?
                            null
		                :
		                    <div>
		                        <input type="checkbox" onChange={this.actualizarEstado.bind(this)}/> 
		                        <span>If you already have an account and you wanna join them</span>  	 
		                    </div>               
		                }			        
			        </div>			        		        			        
			    </div>

			    <div className="grid" id="historial">
			        { usuario.profile.nick?
			        	<div>
			        	    <h2>History</h2>
					        <HistorialUsuario usuario={usuario.profile.nick} />
					    </div>					        
			        :	
						<div>
							<p> You can choose a nickname and a password to join accounts and show more complete results.</p>
							<p>Remember that you can only have a join account per social network</p>
						</div>	
			        }
			    </div>
			</div>
		);
	}
}

export default Profile;