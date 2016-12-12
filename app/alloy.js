

// Open Window
function openWindow(controller, data) {
	var nextWindow = Alloy.createController(controller, data).getView();

	if (OS_IOS) {
		$.navigationIos.openWindow(nextWindow);
	} else {
		nextWindow.open({animated: true});
	}
}