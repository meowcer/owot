var defaultSfx = "https://files.catbox.moe/qvjtqb.mp3";
var settings = localStorage.getItem("hlping");
if (settings === null) {
    settings = {
        sfx: defaultSfx,
        names: []
    };
    localStorage.setItem("hlping", JSON.stringify(settings));
} else {
    settings = JSON.parse(settings);
}
var pingSfx = new Audio(settings.sfx);

w.broadcastReceive(true);
function tryPing(string) {
    for (let name of [...settings.names, YourWorld.Nickname || state.userModel.username || w.clientId, state.userModel.username || w.clientId]) {
        if (!string.includes("@" + name)) continue;
        pingSfx.currentTime = 0;
        pingSfx.play();
        break;
    }
}
w.on("chat", function (e) {
    tryPing(e.message);
});
w.on("cmd", function (e) {
    tryPing(e.data);
});

function addName(name) {
    settings.names.push(name);
    localStorage.setItem("hlping", JSON.stringify(settings));
}
function removeName(name) {
    settings.names.splice(settings.names.indexOf(name), 1);
    localStorage.setItem("hlping", JSON.stringify(settings));
}

w.chat.registerCommand("pingsfx", function (e) {
    if (!e[0]) {
        settings.sfx = defaultSfx;
        clientChatResponse("Ping SFX reset");
    } else {
        settings.sfx = e[0];
        clientChatResponse(`Ping SFX set to URL ${e[0]}`);
    }
    pingSfx = new Audio(settings.sfx);
    localStorage.setItem("hlping", JSON.stringify(settings));
}, ["url"], "Change the sound of the ping", "https://files.catbox.moe/qvjtqb.mp3");

w.chat.registerCommand("pingaddnick", function (e) {
	if (settings.names.includes(e[0])) return clientChatResponse("You already have this name added");
	addName(e[0]);
	clientChatResponse(`Added ${e[0]} to name list`);
}, ["name"], "Add a nickname to use in the ping userscript.", "Helloim0_0");

w.chat.registerCommand("pingremovenick", function (e) {
	if (!settings.names.includes(e[0])) return clientChatResponse("You don't have this name added");
    removeName(e[0]);
	clientChatResponse(`Removed ${e[0]} from name list`);
}, ["name"], "Remove a nickname from the ping userscript.", "Helloim0_0");

w.chat.registerCommand("pingnicks", function (e) {
	if (!settings.names.length) return clientChatResponse("You only have your username and nickname added");
	return clientChatResponse(`Besides your username and nickname, you have the other nicknames: ${settings.names.join(", ")}`)
}, ["name"], "See all your nicks in the ping userscript.", "");
