'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors.server.controller'),
	_ = require('lodash'),
	Hashids = require('hashids'),
	hashid_salt = require('../../config/hashids').salt;

var hash_operator = new Hashids(hashid_salt);


/**
 * Refactoration with lodash in progress...
 */

/**
 * Hashids 
 */
exports.encodeHexIds = function(e) {
	// raw iteration on the keys
	// encodes MongoDB ObjectId and sub-ObjectIds as well
	return JSON.parse(JSON.stringify(e), function(key, value) {
				if(key == "_id")
					value = hash_operator.encodeHex(value.toString());
				return value;
			});
};

exports.decodeHexIds = function(e) {
	// raw iteration on the keys
	// decodes MongoDB ObjectId and sub-ObjectIds as well
	return JSON.parse(JSON.stringify(e), function(key, value) {
				if(key == "_id")
					value = hash_operator.decodeHex(value.toString());
				return value;
			});
};

exports.encodeHex = function(e) {
	return hash_operator.encodeHex(e.toString());
};

exports.decodeHex = function(e) {
	return hash_operator.decodeHex(e.toString());
};