import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
import { check } from "meteor/check";

if(Meteor.isServer){

	var Twit = require('twit');

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
		},
		"InstagramRequestSearch"({access_token}){
			let url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=" + access_token;
			return HTTP.get(url);
		},
		"TwitterRequestSearch"({query, access_token, access_private_token}){
			var T;
			if(access_token){
					T = new Twit({
					  consumer_key:         process.env.TwitterID,
					  consumer_secret:      process.env.TwitterSecret,
					  access_token:         access_token,
					  access_token_secret:  access_private_token,
					  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
					});
			}
			else{
					T = new Twit({
					  consumer_key:         process.env.TwitterID,
					  consumer_secret:      process.env.TwitterSecret,
					  app_only_auth:        true,
					  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
					});
			}
			T.get('search/tweets', { q: 'banana since:2011-07-11', count: 2 }, function(err, data, response) {
			  return data;
			});
		}
	});
}