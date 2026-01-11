var modal = new Modal();
modal.createCheckboxField();
var modalCoords = modal.addCheckbox("Show coordinates");
modalCoords.elm.oninput = function(e) {
	elm.coords.style.display = e.target.checked ? "" : "none";
}
var modalGrid = modal.addCheckbox("Toggle grid");
modalGrid.elm.oninput = function(e) {
	gridEnabled = e.target.checked;
	w.redraw();
	setRedrawPatterned("square");
}
var modalSubgrid = modal.addCheckbox("Toggle subgrid");
modalSubgrid.elm.oninput = function(e) {
	subgridEnabled = e.target.checked;
	w.redraw();
	setRedrawPatterned("square");
}
var modalLinks = modal.addCheckbox("Toggle links");
modalLinks.elm.oninput = function(e) {
	linksEnabled = e.target.checked;
}
modalLinks.elm.click();
var modalColors = modal.addCheckbox("Toggle colors");
modalColors.elm.oninput = function(e) {
	if (e.target.checked) {
		w.enableColors();
	} else {
		w.disableColors();
	}
	setRedrawPatterned("square");
}
modalColors.elm.click();
menu.hideEntry(menuOptions.showCoords);
menu.hideEntry(menuOptions.grid);
menu.hideEntry(menuOptions.subgrid);
menu.hideEntry(menuOptions.linksEnabled);
menu.hideEntry(menuOptions.colorsEnabled);
var menuSettingsID = menu.addOption("Settings", () => modal.open());
menu.menuEl.children[0].insertBefore(menu.entriesById[menuSettingsID].element, menu.entriesById[menuOptions.changeColor].element);
