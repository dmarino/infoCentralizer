import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';


class Comparacion extends Component{

	constructor(props){
		super(props);
		this.state={
			busqueda:false
		}
	}

	cambiarParams(){
		tmpOne = this.props.match.params.param1.split(",");
		sourceOne = tmpOne[1];
		tmpTwo = this.props.match.params.param2.split(",");
		sourceTwo = tmpTwo[1];
		url1 = "";
		url2 = "";

		if(sourceOne === "fb"){
			url1 = "https://www.facebook.com/" + tmpOne[0];
		}
		else if(sourceOne === "twt"){
			url1 = tmpOne[2];
		}
		else{
			url1 = "https://www.instagram.com/" + tmpOne[3];
		}
		if(sourceTwo === "fb"){
			url2 = "https://www.facebook.com/" + tmpTwo[0];
		}
		else if(sourceTwo === "twt"){
			url2 = tmpTwo[2];
		}
		else{
			url2 = "https://www.instagram.com/" + tmpTwo[3];
		}

		console.log(url1);
		console.log(url2);
		return(
			<div>
				<iframe src={url1} frameBorder="0"></iframe>
				<iframe src={url2} frameBorder="0"></iframe>
			</div>
			);
	}

	render(){
		return (
			<div id="Comparacion">
				{this.cambiarParams()}
			</div>
		);
	}
}

Comparacion.PropTypes={

};

export default Comparacion;