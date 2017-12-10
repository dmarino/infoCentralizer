import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Busquedas = new Mongo.Collection('busquedas');
 
if (Meteor.isServer) {
    Meteor.publish('busquedas', function busquedaPublication() {
        return Busquedas.find();
    });
}

Meteor.methods({
  'busquedas.insert'(text, type) {
    check(text, String);
    check(type, String);

    let anterior = Busquedas.findOne({
      "texto":text
    });

    if(anterior){
      number = anterior.numero + 1;
      Busquedas.update(anterior._id,{
        $set:{
          numero:number
        }
      });
    }
    else{
      datos={
        "texto":text,
        "numero":1
      };
      Busquedas.insert(datos);
    }
  }
});