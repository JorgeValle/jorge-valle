'use strict';

/**
 * Returns the right Mongo connection string, depending on environment
 */
module.exports.returnDbConnectionString = function() {
  
  if (process.env.NODE_ENV === 'production') {
    return process.env.MONGOLAB_URI;
  } else {
    return 'mongodb://127.0.0.1/JorgeValle';
  }
};