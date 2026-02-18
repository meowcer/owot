var padding = 10;
var scrollMax = 2000;

function saveOptions() {
    padding = parseInt(settingsModal.formInputs[0].input.value) ?? 10;
    scrollMax = parseInt(settingsModal.formInputs[1].input.value) ?? 2000;
    w.emit("owot_ext_change", {
        id: "mousepanning",
        settings: {
            padding, scrollMax
        }
    });
}
function restoreOptions() {
    settingsModal.formInputs[0].input.value = padding;
    settingsModal.formInputs[1].input.value = scrollMax;
}
var settingsModal = new Modal();
settingsModal.createForm();
settingsModal.setFormTitle("OWoT mouse panning");
settingsModal.addEntry("Padding", "text", "number");
settingsModal.addEntry("Scroll max", "text", "number");

settingsModal.onSubmit(saveOptions);
settingsModal.onClose(function() {
    restoreOptions();
    w.emit("owot_ext_close");
});

w.on("owot_ext_get", function(e) {
    if (e.id != "mousepanning") return;
    padding = e.settings.padding;
    scrollMax = e.settings.scrollMax;
    restoreOptions();
});
w.on("owot_ext_open", function(e) {
    if (e != "mousepanning") return;
    settingsModal.open();
});
w.emit("owot_ext_request", "mousepanning");
restoreOptions();

var borderLeft = false;
var borderRight = false;
var borderUp = false;
var borderDown = false;
var lastFrame = Date.now();
document.addEventListener("mousemove", function(e) {
	if (!closest(e.target, elm.owot) && !closest(e.target, elm.announce_container)) {
        borderLeft = false;
        borderRight = false;
        borderUp = false;
        borderDown = false;
        return;
    }
	if (e.clientX <= padding) {
		if (!borderLeft) borderLeft = Date.now();
    } else {
		borderLeft = false;
	}
	if (e.clientX >= owotWidth - padding) {
		if (!borderRight) borderRight = Date.now();
    } else {
		borderRight = false;
	}
	if (e.clientY <= padding) {
		if (!borderUp) borderUp = Date.now();
    } else {
		borderUp = false;
	}
	if (e.clientY >= owotHeight - padding) {
		if (!borderDown) borderDown = Date.now();
	} else {
		borderDown = false;
	}
});
document.addEventListener("mouseout", function(e) {
	borderLeft = false;
	borderRight = false;
	borderUp = false;
	borderDown = false;
});
function moveBorderMouse() {
	requestAnimationFrame(moveBorderMouse);
	var moveX = 0;
	var moveY = 0;
	if (borderLeft) {
		var time = Date.now() - borderLeft;
		moveX += Math.min(scrollMax, Math.floor(3 ** (time / 200 + 1))) / 1000 * (Date.now() - lastFrame);
    }
	if (borderRight) {
		var time = Date.now() - borderRight;
		moveX -= Math.min(scrollMax, Math.floor(3 ** (time / 200 + 1))) / 1000 * (Date.now() - lastFrame);
    }
	if (borderUp) {
		var time = Date.now() - borderUp;
		moveY += Math.min(scrollMax, Math.floor(3 ** (time / 200 + 1))) / 1000 * (Date.now() - lastFrame);
    }
	if (borderDown) {
		var time = Date.now() - borderDown;
		moveY -= Math.min(scrollMax, Math.floor(3 ** (time / 200 + 1))) / 1000 * (Date.now() - lastFrame);
    }
	positionX += moveX * zoom;
	positionY += moveY * zoom;
	lastFrame = Date.now();
	w.redraw();
}
moveBorderMouse();
