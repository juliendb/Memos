var articles = Alloy.createCollection('article');
var listItems = [];
var selectedItem = null;



$.newArticle.addEventListener('click', function() {
	openWindow("article", {
		index: $,
		title: "",
		content: ""
	});
});






$.list.addEventListener('itemclick', function(e) {
	var rowData = listItems[e.itemIndex];
	var rowID = rowData.properties.itemID;
	selectedItem = e;

	// si clic sur l'icone supprimer ouvre dialogue
	if (e.bindId === 'delete') {
		$.alertMemo.setTitle('Mémo "'+rowData.properties.title+'"');
		$.alertMemo.show();

	} else {

		// ouvre le mémo dans une nouvelle fenêtre
		var article = Alloy.createModel('article');
		article.fetch({id: rowID});

		openWindow("article", {
			index: $,
			id: rowID,
			title: article.get('title'),
			content: article.get('content')
		});
	}
});


// boite de dialogue pour supprimer le mémo ou non
$.alertMemo.addEventListener('click', function(e) {
	if (e.index === 0) {
		deleteArticle(selectedItem);
	} else {
		$.alertMemo.hide();
	}
});



function deleteArticle(e) {
	var rowData = listItems[e.itemIndex];
	var rowID = rowData.properties.itemID;


	// supprime dans la table
	articles = Alloy.createCollection('article');
	articles.deleteRecord({
		query: {
			sql: "WHERE id=?",
			params: rowID
		}
	});


	// supprime dans la ListView et l'array
	listItems.splice(e.itemIndex, 1);
	e.section.deleteItemsAt(e.itemIndex, 1);

	// rafraichit le texte
	$.headertitle.text = listItems.length+" Mémo(s)";
}




function init() {
	articles = Alloy.createCollection('article');
	listItems = [];

	// date en français
	var moment = require('alloy/moment');
	require('alloy/moment/lang/fr');


	// récupère tous les mémos par date du plus récent
	articles.fetch({
		query: 'SELECT * FROM article WHERE 1 ORDER BY date DESC'
	});

	$.headertitle.text = articles.length+" Mémo(s)";


	articles.each(function(model) {
		var date = moment(model.get('date')).format("dddd, Do MMMM YYYY, HH:mm");


		listItems.push({
			properties : {
				itemID: model.get('id'),
				title: model.get('title'),
				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
			},
			title: { text: model.get('title') },
			content: { text: model.get('content') },
			date: { text: date }
		});
	});

	$.list.sections[0].items = listItems;
}



init();



exports.init = init;
$.index.open();
