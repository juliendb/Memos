exports.definition = {
	config: {
		columns: {
			"id": "integer",
			"title": "text",
			"content": "text",
			"date": "datetime"
		},
		adapter: {
			type: "sql",
			collection_name: "article",
			"idAttribute": "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/

			deleteRecord: function(opts) {
				var collection = this;
				var dbName = collection.config.adapter.db_name;
				var table = collection.config.adapter.collection_name;
				var columns = collection.config.columns;
				var names = [], q = [];
				for (var k in opts.query.columns) {
					names.push(opts.query.columns[k]);
					q.push("?");
				}
				var sql = "DELETE FROM " + table + " " + opts.query.sql;

				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql, opts.query.params);
				db.close();
				collection.trigger('sync');
			}
		});

		return Collection;
	}
};