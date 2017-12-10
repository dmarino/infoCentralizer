import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
 
export const Busquedas = new Mongo.Collection('busquedas');
 
if (Meteor.isServer) {
    Meteor.publish('busquedas', function busquedaPublication() {
        return Busquedas.find();
    });
}

Meteor.methods({
  'busquedas.insert'(datos) {
    check(datos,{
      "nombre":String,
      "tipo":String,
      "cantidad":Number
    });

    Busquedas.insert({
      datos
    });
  },
  'busquedas.update'(busquedaId, cantidadB) {
    check(busquedaId, String);
    check(cantidadB, Number);
 
    Busquedas.update(busquedaId, { $set: { cantidad: cantidadB} });
  },
});