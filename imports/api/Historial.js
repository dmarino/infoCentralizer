import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Historial = new Mongo.Collection('historial');
 
if (Meteor.isServer) {
    Meteor.publish('Historial', function historialPublication() {
        return Historial.find();
    });
}

Meteor.methods({
  'historial.insert'(name, content, type ) {
    check(name, String);
    check(content, String);
    check(type, String);

    let tmp = Historial.findOne({
      "user":name
    });

    if(tmp){
      data = {
        "content":content,
        "type":type,
        "date":new Date()
      };
      Historial.update(tmp._id,{
        $push:{
          "search":data
        }
      });
    }
    else{
      datos={
        "user":name,
        "search":[
          {
            "content":content,
            "type":type,
            "date":new Date()
          }
        ]
      };
      Historial.insert(datos);
    }
  }
});