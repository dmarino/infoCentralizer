import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'; 


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('usuarios', function usuariosPublication() {
    return Meteor.users.find(this.userId);
  });
}



Meteor.methods({

	"users.insertar"(nick, pass){

		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		check(nick,String);
		check(pass,String);

		let trouble = Meteor.users.findOne({
			"profile.nick":nick
		});

		if(trouble)
			return -1;

		Meteor.users.update(Meteor.userId(), {
			$set:{"profile.nick":nick,
				  "profile.pass":pass}
		});
		return 1;
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
				$set:{"services":services,
					  "profile":actual.profile}
			});
			return 1;
		}
		else
			return -1;

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
