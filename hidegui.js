keyConfig.hideGUI = "F1";
var hiddenGUI = false;
var originalNavSpeed = menu._SPEED;
var originalCoordsEnabled = elm.coords.style.display === "";
document.addEventListener("keydown", function toggleGUI(e) {
    if (checkKeyPress(e, keyConfig.hideGUI)) {
        hiddenGUI = !hiddenGUI;
        if (hiddenGUI) {
            originalNavSpeed = menu._SPEED;
            menu._SPEED = 0;
            menu.hideNow();
            elm.menu_elm.style.display = "none";
            elm.nav_elm.style.display = "none";
            originalCoordsEnabled = elm.coords.style.display === "";
            elm.coords.style.display = "none";
            if (chatOpen) elm.chat_window.style.display = "none";
            elm.chat_open.style.display = "none";
            elm.announce_container.style.display = "none";
        } else {
            var canChat = Permissions.can_chat(state.userModel, state.worldModel);
            menu._SPEED = originalNavSpeed;
            if (originalCoordsEnabled) elm.coords.style.display = "";
            elm.menu_elm.style.display = "";
            if (menu.visible) elm.nav_elm.style.display = "";
            if (chatOpen) elm.chat_window.style.display = "";
            if (!chatOpen && canChat) elm.chat_open.style.display = "";
            elm.announce_container.style.display = "";
        }
    }
});
