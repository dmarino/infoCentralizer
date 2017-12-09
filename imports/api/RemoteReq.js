import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
import { check } from "meteor/check";

if(Meteor.isServer){
	Meteor.methods({
		"FacebookRequestSearch"({query, type, access_token}){
			check(query, String);
			check(type, String);

			let accessToken = "";
			if(access_token){
				accessToken = access_token;
			}
			else{
				accessToken = process.env.FBID + "|" + process.env.FBSecret;
			}
			let url = "https://graph.facebook.com/search?q=" + query + "&type=" + type + "&access_token=" + accessToken;
			return HTTP.get(url);
		}
	});
}