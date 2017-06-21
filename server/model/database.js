var mongoose = require('mongoose');		//Instanziazione variabili express, mongoose e body-parser
var express= require('express');
var app= express();
var router= express.Router();
var Schema = mongoose.Schema;
var bodyParser     =         require("body-parser");

mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Connessione o creazione in caso di primo accesso al database "my_database"
var mongoDB = 'mongodb://localhost/my_database';
mongoose.connect(mongoDB);

//Connessione di default
var db = mongoose.connection;

//Messaggio in caso di errore di connessione
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Creazione schema utente
var user= new Schema({
	username: { 
		type: String,
		required: true
	},
	pass: { 
		type: String,
		required: true
	},
	email: { 
		type: String,
		required: true
	}
});

//Creazione schema progetti
var proget= new Schema({
	nome_progetto: {
		$type: String,
		required: true
	},
	username: {
		$type: String,
		required: true
	},
	progetto:{
		cells:[{
				type :String,
				name:[String],
				attributes:[String],
				methods:[],
				position:{
					x: Number,
					y: Number
					},
				size:{
					width: Number,
					height: Number
					},
				angle: Number,
				id: String,
				z: Number,
				attrs:{
					".uml-class-name-rect":{
						height: Number,
						transform: String},
					".uml-class-attrs-rect":{
						height: Number,
						transform:String},
					".uml-class-methods-rect":{
						height: Number,
						transform: String},
					".uml-class-name-text":{
						text:String},
					".uml-class-attrs-text":{
						text: String},
					".uml-class-methods-text":{
						text: String}
					}}]
	}
}, {typeKey: '$type'});


//Creazione schema per chiave criptografica
var keyschema= new Schema(
	{
		key_code: String,
		iv_code: String
	}, 
	{
			toObject:{
				transform: function(doc, ret){
					delete ret._id;
				}
		}	
	},
	{
		toJSON:{
			transform: function(doc, ret){
				delete ret._id;
			}
		}
	}

);


	//Moduli per l'esportazione degli schemi
var Utente= mongoose.model('Utente', user);
var Progetto= mongoose.model('Progetto', proget);
var chiave= mongoose.model ('chiave', keyschema);

module.exports = mongoose.model('utente', user);
module.exports = mongoose.model('progetto', proget);
module.exports = mongoose.model('key', keyschema);