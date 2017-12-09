import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'; 

Meteor.methods({

	"users.insertar"(nick, pass){

		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		check(nick,String);
		check(pass,String);

		Meteor.users.update(Meteor.userId(), {
			$set:{"profile.nick":nick,
				  "profile.pass":pass}
		});
	},

	"users.updateAccount"(nick, pass){
		check(nick,String);
		check(pass,String);
		
		let actual = Meteor.users.findOne({
			"profile.nick":nick,
			"profile.pass":pass
		});
		if(actual){
			let services = Meteor.user().services;
			if(actual.services.facebook)
				services.facebook = (actual.services.facebook);
			if(actual.services.instragram)
				services.instagram = (actual.services.instragram);
			if(actual.services.twitter)
				services.twitter = (actual.services.twitter);
			Meteor.users.remove(actual._id);
			Meteor.users.update(Meteor.userId(),{
				$set:{"services":services}
			})
		}
		else
			throw new Meteor.Error("Usuario inexistente");

	},

	"dibujos.updateLikes"(id, likes){
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
		check(id,String);
		check(likes,Number);

		Dibujos.update(id, {
            $set: { likes:likes}
        });
	}
});
