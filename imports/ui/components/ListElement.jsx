import React, {Component} from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';

class ListElement extends Component{

	constructor(props){
		super(props);
	}


	selection(){
		this.props.click(this.props.value);
	}

	render(){
		return (
			<input type="checkbox" value={this.props.value}
			 onClick={()=>{this.selection()}} disabled={this.props.disabled}/>
		);
	}
}

ListElement.PropTypes={

};

export default ListElement;