import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
import { check } from "meteor/check";

if(Meteor.isServer){

	var Twit = require('twit');
	var Future = require("fibers/future");

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
		"InstagramRequestSearch"({query, idUser}){
			let url = "";
			if(idUser){
				url = "https://www.instagram.com/graphql/query/?query_id=" + process.env.instagramPermanentID + 
				"&variables={\"id\":\"" + idUser + "\",\"first\":20,\"after\":null}";
				return HTTP.get(url);
			}
			else{
				url = "https://www.instagram.com/web/search/topsearch/?context=blended&query=" + query + "&count=" + 25;
				return HTTP.get(url);
			}
		},
		"TwitterRequestSearch"({query, access_token, access_private_token}){
			var T;
			let future = new Future();
			if(access_token){
				T = new Twit({
					consumer_key:         process.env.twitterID,
					consumer_secret:      process.env.twitterSecret,
					access_token:         access_token,
					access_token_secret:  access_private_token,
					  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
					});
			}
			else{
				T = new Twit({
					consumer_key:         process.env.twitterID,
					consumer_secret:      process.env.twitterSecret,
					app_only_auth:        true,
					  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
					});
			}
			T.get('search/tweets', { q: query, count: 25, lang:"en" }, function(err, data, response) {
				future.return({
					err:err,
					data:data
				});
			});

			return future.wait();
		}
	});
}