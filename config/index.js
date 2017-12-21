var configValues = require("./config");
var models = require("express-cassandra");

module.exports = {
	getclientOptions: function(){
		return {
				contactPoints: [configValues.contactPoints],
				protocolOptions: {port: configValues.protocolOptions},
				keyspace: configValues.keyspace,
				queryOptions: {consistency: models.consistencies.one}
				// authProvider: new models.driver.auth.PlainTextAuthProvider(configValues.username, configValues.password)
		}
	},

	getOrmOptions: function(){
		return {
				defaultReplicationStrategy : {class: configValues.class,replication_factor: configValues.replicationFactor},
				migration: configValues.migration
		}
	},

	createReminderTable: 'CREATE TABLE reminders (userId text,timestamp timestamp,reminder text,primary key (userId, timestamp)) with clustering order by (timestamp desc)'

	
}