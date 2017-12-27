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

	getCassandraSettings: function(){
		return { contactPoints: [configValues.contactPoints], keyspace: configValues.keyspace}
	},

	getOrmOptions: function(){
		return {
				defaultReplicationStrategy : {class: configValues.class,replication_factor: configValues.replicationFactor},
				migration: configValues.migration
		}
	},

	createReminderTable: function(){
		return configValues.createRemindersTable;
	},

	addReminder: function(){
		return configValues.addReminder;
	},

	getNodeData: function(){
		return configValues.nodeData;
	}
	
}