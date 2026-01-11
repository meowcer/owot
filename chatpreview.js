var textDiv = document.createElement("div");
textDiv.style.opacity = "50%";
textDiv.style.position = "absolute";
textDiv.style.marginLeft = "6px";
textDiv.style.marginTop = "4px";
textDiv.style.pointerEvents = "none";
elm.chatbar.parentElement.insertBefore(textDiv, elm.chatsend);

var nameElm = document.createElement("a");
nameElm.style.textDecoration = "underline";
textDiv.appendChild(nameElm);

var messageElm = document.createElement("span");
messageElm.innerText = " message";
textDiv.appendChild(messageElm);

function updateChatPreview() {
	requestAnimationFrame(updateChatPreview);
	if (elm.chatbar.value.length > 0) return textDiv.style.display = "none";
	textDiv.style.display = "";
	nameElm.innerText = `[${w.clientId}]:`;
	if (YourWorld.Nickname.length) {
		if (state.userModel.authenticated) {
			nameElm.innerText = `${YourWorld.Nickname || state.userModel.username}:`;
		} else {
			nameElm.innerText = `[*${w.clientId}] ${YourWorld.Nickname}:`;
		}
	}
	nameElm.style.color = "#000";
	nameElm.style.fontWeight = "";
	if (state.userModel.authenticated && defaultChatColor !== null) {
		nameElm.style.color = int_to_hexcode(defaultChatColor);
		if (YourWorld.Nickname === state.userModel.username) {
			nameElm.style.fontWeight = "bold";
		}
    }
}
updateChatPreview();
