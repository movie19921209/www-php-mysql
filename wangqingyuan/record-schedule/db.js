/**
 */
var path = require("path")	
var Datastore = require('nedb');
var fs =  require("fs")		;
var collectionsMap = {}

/**

  * 数据库定义

 */

var mgmt = {	
	config : function(root) {
		this.root = root;
	},
	getCollection : function(collection, callback){
		if(!collectionsMap[collection]) 
			collectionsMap[collection] =  new Datastore({ filename: path.join(mgmt.root, collection + ".db"),autoload : true});	
		callback(null, collectionsMap[collection]);
	},
	update : function(name, query, doc, callback){
		mgmt.getCollection(name, function(err, collection){
			if(err) {
				callback(err) 
				return;
			}
			collection.update(query, doc, function(err, numInserted){
				callback(err);
			})
		})		
	},
	insert : function(name, doc, callback){
		mgmt.getCollection(name, function(err, collection){
			if(err) {
				callback(err) 
				return;
			}
			collection.insert(doc, function(err, newDoc){
				callback(err, newDoc);
			})
		})		
	},
	remove : function(name, query, callback){		
		mgmt.getCollection(name, function(err, collection){
			if(err) {
				callback(err) 
				return;
			}
			collection.remove(query, function(err, docs){
				callback(err, docs);
			})
		})		
	},
	find : function(name, query, callback){		
		mgmt.getCollection(name, function(err, collection){
			if(err) {
				callback(err) 
				return;
			}
			collection.find(query, function(err, docs){
				callback(err, docs);
			})
		})		
	}
}

module.exports = mgmt;