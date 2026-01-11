var coordModal = w.ui.coordGotoModal;
coordModal.addTab("2input", "X, Y");
coordModal.addTab("1input", "String");
coordModal.focusTab("1input");
coordModal.createForm();
coordModal.setFormTitle("Go to coordinates:");
var coordInput = coordModal.addEntry("String").input;
coordModal.submitFn = function() {
	if (coordModal.currentTabCtx.id == "2input") {
        var coordX = coordModal.formInputs[0].input.value;
        var coordY = coordModal.formInputs[1].input.value;
		w.doGoToCoord(parseFloat(coordY), parseFloat(coordX));
	} else {
		var coords = coordInput.value;
		coords = coords.split(/, */g).map(parseFloat).slice(0, 2);
		w.doGoToCoord(coords[1], coords[0]);
	}
}
coordModal.focusTab("2input");
