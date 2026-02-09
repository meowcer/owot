menu.hideEntry(menuOptions.coordLink);
menu.hideEntry(menuOptions.urlLink);
var modalEntries = {};

function makeLinkModal() {
	var modal = new Modal();
	modal.setMinimumSize(250, 120);
	modal.setMaximumSize(360, 300);

	modal.addTab("coord", "Coords");
    modal.createForm();
    modal.setFormTitle("Enter the coordinates to create a link to. You can then click on a letter to create the link.\n");
    modalEntries.coordX = modal.addEntry("X", "text", "number").input;
    modalEntries.coordY = modal.addEntry("Y", "text", "number").input;

    modal.onSubmit(function() {
		var tabId = modal.getCurrentTabId();
		if (tabId == "coord") {
            w.doCoordLink(parseFloat(modalEntries.coordY.value), parseFloat(modalEntries.coordX.value));
        } else {
            w.doUrlLink(modalEntries.urlInput.value);
        }
    });

	w.ui.linkModal = modal;
}
function buildURLModal(modal) {
	modal.addTab("url", "URL");
    modal.focusTab("url");
    modal.createForm();
    modal.setFormTitle("\n");
    modalEntries.urlInput = modal.addEntry("URL", "text").input;
    modalEntries.urlInput.style.width = "175px";
    modal.unalignForm();
    if (modal.tabIndex.coord) modal.focusTab("coord");
}
function resetLinkModalVisibility() {
	var pCoord = Permissions.can_coordlink(state.userModel, state.worldModel);
	var pURL = Permissions.can_urllink(state.userModel, state.worldModel);
	if(pURL) {
		if(!w.ui.linkModal.getTabData("url")) {
			buildURLModal(w.ui.linkModal);
		}
		w.ui.linkModal.showTab("url");
	} else {
		w.ui.linkModal.hideTab("url");
		w.ui.linkModal.focusTab("coord");
	}
	if(pCoord) {
		w.ui.linkModal.showTab("coord");
	} else if (pURL) {
		w.ui.linkModal.hideTab("coord");
		w.ui.linkModal.focusTab("url");
	}
	if(!pURL && !pCoord) {
		w.ui.linkModal.close();
	}
}
makeLinkModal();
resetLinkModalVisibility();

menuOptions.link = menu.addOption("Create links to", function() {
	w.ui.linkModal.open();
});
menu.menuEl.children[0].insertBefore(menu.entriesById[menu.lastEntryId - 1].element, menu.entriesById[menuOptions.coordLink].element);

function updateMenuEntryVisiblity() {
	var permColorText = Permissions.can_color_text(state.userModel, state.worldModel);
	var permColorCell = Permissions.can_color_cell(state.userModel, state.worldModel);
	var permGoToCoord = Permissions.can_go_to_coord(state.userModel, state.worldModel);
	var permCoordLink = Permissions.can_coordlink(state.userModel, state.worldModel);
	var permUrlLink = Permissions.can_urllink(state.userModel, state.worldModel);
	var permOwnerArea = Permissions.can_admin(state.userModel, state.worldModel);
	var permMemberArea = Permissions.can_protect_tiles(state.userModel, state.worldModel);
	var permEraseArea = Permissions.can_erase(state.userModel, state.worldModel);
	w.menu.setEntryVisibility(menuOptions.changeColor, permColorText || permColorCell);
	w.menu.setEntryVisibility(menuOptions.goToCoords, permGoToCoord);
	w.menu.setEntryVisibility(menuOptions.link, permCoordLink || permUrlLink);
	w.menu.setEntryVisibility(menuOptions.ownerArea, permOwnerArea);
	w.menu.setEntryVisibility(menuOptions.memberArea, permMemberArea);
	w.menu.setEntryVisibility(menuOptions.publicArea, permMemberArea);
	w.menu.setEntryVisibility(menuOptions.resetArea, permMemberArea);
	w.menu.setEntryVisibility(menuOptions.eraseArea, permEraseArea);

	resetLinkModalVisibility();
}
updateMenuEntryVisiblity();
