var logEntry = {};

logEntry.build = (raw, callback) => {

	if(!("namespace" in raw)){
		callback("Cannot parse logEntry: Missing namespace", null); 
	}else if(!("val" in raw)){
		callback("Cannot parse logEntry: Missing value", null); 
	}else if(!("key" in raw)){
		callback( "Cannot parse logEntry: Missing key", null); 
	}else{

		//All is well
		callback(null, {
			namespace: raw.namespace,
			val: raw.val,
			key: raw.key
		}); 
	}
}


module.exports = logEntry;