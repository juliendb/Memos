migration.up = function(migrator) {
	migrator.createTable({
		"columns":
		{
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"title": "TEXT",
			"content": "TEXT",
			"date": "DATETIME"
		}
	});
};

migration.down = function(migrator) {
	migrator.dropTable();
};
