var args = $.args;


function initEvents() {
	$.editTitle.setValue(args.title);
	$.editContent.setValue(args.content);

	$.headerback.addEventListener('click', cancelArticle);
	$.saveArticle.addEventListener('click', saveArticle);
	$.alertMemo.addEventListener('click', showAlert);
}


function removeEvent() {
	$.headerback.removeEventListener('click', cancelArticle);
	$.saveArticle.removeEventListener('click', saveArticle);
	$.alertMemo.removeEventListener('click', showAlert);
}

initEvents();




function showAlert() {
	$.alertMemo.hide();
}


function cancelArticle() {
	$.article.close();
	removeEvent();
}


function saveArticle() {
	var moment = require('alloy/moment');

	var article = Alloy.createModel('article');
	var title = $.editTitle.getValue();
	var content = $.editContent.getValue();



	// si id est présent
	if (args.id !== undefined) {
		article.fetch({id: args.id});
	}


	// si les champs sont vides
	if (title === '' || content === '') {
		$.alertMemo.show();
	
	} else {

		// sauvegarde le mémo et ferme la fenêtre
		article.save({
			title: title,
			content: content,
			date: moment().format("YYYY-MM-DD HH:mm:ss")
		});


		// close and refresh home
		$.article.close({animated: true});
		args.index.init();
		removeEvent();
	}
}