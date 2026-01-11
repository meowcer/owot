var regex = /<span style="font-size:80%"><i>([^<]+)<\/i><\/span>/g;
function claim() {
	fetch(`${location.origin}/accounts/profile/`, {
 		method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
			csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,
            form: "claim",
            worldname: state.worldModel.name
        }),
        credentials: "include"
	}).then(x => x.text()).then(x => {
        if (!regex.test(x)) return;
        var str = x.match(regex)[0].replace(regex, "$1");
        if (str == "World already has an owner" && state.userModel.is_owner) str = "You already own this world";
        w.doAnnounce(str, "claim");
    });
}
function unclaim() {
	fetch(`https://ourworldoftext.com/accounts/configure/${state.worldModel.name}`, {
 		method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
			csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,
            form: "action",
            unclaim: ""
        }),
        credentials: "include"
	}).then(x => {
        if (x.status == 403) return w.doAnnounce("You don't own this world", "claim");
        w.doAnnounce("Successfully unclaimed the world", "claim");
    });
}
menu.addOption("Claim", claim);
menu.addOption("Unclaim", unclaim);
