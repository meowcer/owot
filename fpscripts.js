var coordiv = document.createElement("div");
coordiv.style.backgroundColor = "#bbd1ff";
coordiv.style.position = "absolute";
coordiv.style.width = "180px";
coordiv.style.height = "90px";
coordiv.style.top = "27px";
coordiv.style.right = "120px";
coordiv.style.paddingTop = "4px";
coordiv.style.paddingLeft = "4px";
var coordtext = document.createElement("span");
coordiv.appendChild(coordtext);
document.body.appendChild(coordiv);
function coordupdate() {
    var pos = currentPosition;
    var str = "";
    str += "TileX: " + pos[0] + ", CharX: " + pos[2] + "\n";
    str += "TileY: " + pos[1] + ", CharY: " + pos[3] + "\n";
    str += "\n";
    str += "Char: [" + (pos[0] * 16 + pos[2]) + ", " + (pos[1] * 8 + pos[3]) + "]";
    coordtext.innerText = str;
}
document.onmousemove = coordupdate;
function getTile(x, y) {
    return tiles[y + "," + x].content;
}
function loadTile(x, y) {
    w.socket.send(JSON.stringify({
        kind: "fetch",
        fetchRectangles: [{minX: x, maxX: x, minY: y, maxY: y}]
    }));
}
function placeCoordLink(tileX, tileY, charX, charY, coordTileX, coordTileY) {
    w.socket.send(JSON.stringify({
        kind: "link",
        data: {
            tileY: tileY,
            tileX: tileX,
            charY: charY,
            charX: charX,
            link_tileX: coordTileX,
            link_tileY: coordTileY
        },
        type: "coord"
    }))
}
(I=textInput).oninput=function(V){0<(V=I.value)&10>V&&(I.value="?\u2588\u2593\u2592\u2591\u2580\u2584\u258c\u2590\u25a0"[V])}
var elms = document.getElementsByTagName("span");
for(var i = 0; i < elms.length; i++)
    if(elms[i].ariaLabel == "Spoiler") elms[i].click();
var sel = new RegionSelection();
sel.jumbo = true; // optional
sel.charColor = "#ff0000"; // optional
sel.color = "rgba(123, 123, 123, 0.1)"; // optional
sel.init();
sel.onselection(function(coordA, coordB, regWidth, regHeight) {
    console.log({ coordA, coordB, regWidth, regHeight });
});
sel.startSelection();
var sel = new RegionSelection();
sel.charColor = "#ff0000";
sel.color = "rgba(123, 123, 123, 0.1)";
sel.init();
sel.onselection(function(coordA, coordB, regWidth, regHeight) {
    renderCursor(coordA);
    lastX[0] = coordA[0];
    lastX[1] = coordA[2];
    w.input.value = (" ".repeat(regWidth) + "\n").repeat(regHeight);
});
sel.startSelection();
w.on("writebefore", function(e) {
    e.char = "\0";
    e.color = 0x00FFFF;
});
function convertRGBToInt(r, g, b) {
    return r << 16 | g << 8 | b;
}
function convertIntToRGB(x) {
    return [x >> 16 & 255, x >> 8 & 255, x & 255];
}
// CAUTION:
// Only works for certain tile ranges:
// X: (-134217728) to (134217727)
// Y: (-268435456) to (268435455)
// Example: bitwiseMixedCoordToCharCoord(-20, -20, 15, 7);
// This is just a proof of concept.
function bitwiseMixedCoordToCharCoord(tileX, tileY, charX, charY) {
    return [tileX << 4 | charX, tileY << 3 | charY];
}

function bitwiseCharCoordToMixedCoord(x, y) {
    return [x >> 4, y >> 3, x & 15, y & 7];
}

function convertRGBToInt(r, g, b) {
    return r << 16 | g << 8 | b;
}

function convertIntToRGB(x) {
    return [x >> 16 & 255, x >> 8 & 255, x & 255];
}
function polar() {
    var x = -positionX / tileW / 4;
    var y = positionY / tileH / 4;
    var dist = Math.sqrt(x * x + y * y);
    var angle = Math.atan2(y, x) * 180 / Math.PI;
    if(angle < 0) angle = 360 + angle;
    return "(" + dist.toFixed(2) + "; " + angle.toFixed(2) + "°)";
}
w.on("linkClick", function(a) {
    console.log("URL:", a.url);
    if(a.url.includes("a")) {
        a.evt.preventDefault();
    }
});
function setBackground(url) {
}
setBackground("https://ourworldoftext.com/other/backgrounds/rgb1a.png/");
w.on("writeBefore", function(c) {
    if(!write_busy) return;
    var info = getCharInfo();
    if(c.char == " ") {
        c.char = info.char;
        c.color = info.color;
    }
});
w.on("writeBefore", function(c) {
    if(!write_busy) return;
    moveCursor("left");
    var info = getCharInfo();
    moveCursor("right");
    if(c.char == " ") {
        c.char = info.char;
        c.color = info.color;
    }
});
function wobble(speed) {
    if(!speed) speed = 2;
    var rotation = 0;
    elm.main_view.style.height = "100%";
    var rot = setInterval(function() {
        elm.main_view.style.transform = "perspective(900px) rotateY(" + Math.sin(rotation / 30) * 30 + "deg) rotateX(" + Math.cos(rotation / 30) * 30 + "deg)";
        rotation += speed;
    }, 10);
}
wobble(2);
checkTileFetchInterval = 1000 / 24;
clearInterval(fetchInterval);
fetchInterval = setInterval(function() {
    getAndFetchTiles();
}, checkTileFetchInterval);
fetchClientMargin = 1000;
decimal = e=>1/100;
// note: changing zoom anywhere will change it to the overriden value
char_input_check = setInterval(function() {
    if(write_busy) return;
    var value = elm.textInput.value;
    if(!value) return;
    if(value.indexOf("\x1b") > -1) {
        alert("Test success");
    }
    elm.textInput.value = "";
}, 1000 / 5);
function setCursor(x, y) {
    renderCursor([
        Math.floor(x / 16),
        Math.floor(y / 8),
        x - Math.floor(x / 16) * 16,
        y - Math.floor(y / 8) * 8
    ]);
}
function getCursor() {
    if(!cursorCoords) return null;
    return [
        cursorCoords[0] * 16 + cursorCoords[2],
        cursorCoords[1] * 8 + cursorCoords[3]
    ];
}
let mkbox = input => {
    let len = input.length;
    return `+${"-".repeat(len)}+\n|${input}|\n+${"-".repeat(len)}+`;
}

console.log(mkbox("test"))
mkbox = i => `+${"-".repeat(i.length)}+\n|${i}|\n+${"-".repeat(i.length)}+`;

console.log(mkbox("test"))
mkbox = input => (input = input.replace(/\r\n/g, "\n").replace(/\t/g, "    ").split("\n"),max=Math.max(...input.map(e=>e.length)),`+${"-".repeat(max)}+\n`+input.map(e=>`|${e}${" ".repeat(max-e.length)}|`).join("\n")+`\n+${"-".repeat(max)}+`);
console.log(mkbox("test\ntest\ntestttt\ntset"))
function d9() {
    var A = getTileCoordsFromMouseCoords(0 - fetchClientMargin, 0 - fetchClientMargin);
    var B = getTileCoordsFromMouseCoords(owotWidth - 1 + fetchClientMargin, owotHeight - 1 + fetchClientMargin);
    return {
        margin: fetchClientMargin,
        valA: A,
        valB: B,
        width: owotWidth,
        height: owotHeight,
        start: [clipIntMax(A[0]), clipIntMax(A[1])],
        end: [clipIntMax(B[0]), clipIntMax(B[1])],
        test: [clipIntMax(10), clipIntMax(-999999999999999999999999999999999), getTileCoordsFromMouseCoords(0, 0)]
    };
}
console.log(JSON.stringify(d9()));
["#660066", "#003366", "#ff9900", "#ff0066", "#003300", "#ff0000", "#3a3a3a", "#006666", "#3399ff", "#3333ff", "#000000"]
OWOT.on("chatMod", function(evt) {
    var user = evt.realUsername.toLowerCase();
    var whitelist = ["infraraven", "fp", "mr.guy", "gateway22"]; // all lowercase; include "" to whitelist anonymous users
    if(!whitelist.includes(user)) {
        evt.hide = true;
    }
});
OWOT.on("chatMod", function(evt) {
    if(evt.realUsername == "") {
        evt.hide = true;
    }
});
state.background = {
    path: "https://ourworldoftext.com/other/backgrounds/rgb1a.png/"
};
loadBackgroundData(function() {
    w.redraw()
}, function() {
    w.redraw()
});
function timeStyle(hour, minute) {
    // 24-hour time
    var ahour = hour + (minute / 60);
    var pos = Math.sin((ahour - 6) / (24 / (2 * Math.PI))) * 255;
    var r = 0;
    var g = 0;
    var b = 0;
    r = pos;
    g = pos;
    b = pos;
    styles.public = `rgb(${r}, ${g}, ${b})`;
    styles.member = `rgb(${Math.max(r - 10, 0)}, ${Math.max(g - 10, 0)}, ${Math.max(b - 10, 0)})`;
    styles.owner = `rgb(${Math.max(r - 20, 0)}, ${Math.max(g - 20, 0)}, ${Math.max(b - 20, 0)})`;
    if(pos < 100) {
        styles.text = "#FFFFFF";
    } else {
        styles.text = "#000000";
    }
    w.redraw();
}
function doTimeCycle() {
    var date = new Date();
    var hr = date.getHours();
    var mn = date.getMinutes();
    timeStyle(hr, mn);
}
var timeCycle = setInterval(doTimeCycle, 60000);
doTimeCycle();
function colorShow() {
    var RC = renderChar;
    var BC = new Array(128).fill("█");
    renderChar = function(textRender, x, y, str, content, colors, writability, props) {
        content = BC;
        RC(textRender, x, y, str, content, colors, writability, props);
    }
    w.redraw();
}
colorShow();
var end = new Date('2022').getTime() / 1000;
var now = Date.now() / 1000;
w.chat.send(`2021 is ${((now / end) * 100).toFixed(3)}% complete!`);
function brightMode() {
    if(window.deepFryer) return;
    var elm = document.createElement("div");
    elm.id = "deepFryer";
    elm.style.position = "absolute";
    elm.style.left = "0px";
    elm.style.top = "0px";
    elm.style.width = "100%";
    elm.style.height = "100%";
    elm.style.backdropFilter = "brightness(5)";
    elm.style.zIndex = "9999";
    elm.style.pointerEvents = "none";
    document.body.appendChild(elm);
}
brightMode();
Object.defineProperty(window, 'a', {
  get: function() {w.on("chatMod", (e) => {if(e.realUsername == state.userModel.username) {e.op = true}})}
});

a
client_commands.addop = function(args) {
    w.on("chatmod", (e) => {
        if(e.realUsername == args[0]) {
            e.op = true;
        }
    });
    clientChatResponse(`${args[0]} is now (OP)`)
}
var fib1 = 0;
var fib2 = 1;
setInterval(() => {
    w.doAnnounce(fib1.toString());
    var c = fib1;
    fib1 = fib2;
    fib2 = c + fib2;
}, 1000);
rgb_to_int(255, 0, 0); // 16711680
int_to_rgb(16711680); // [255, 0, 0]
int_to_hexcode(123456); // '#01e240'
resolveColorValue("#00ff00"); // 65280
function logChat(m) {
    console.log(m);
}
w.on("chat", logChat);
// ...
w.off("chat", logChat);
(function() {
var rotation = 0;
document.onkeydown = function() {
    rotation += 0.1;
    elm.main_view.style.transform = "perspective(900px) rotateY(" + rotation + "deg)";
}
})();
function cloneWindow() {
    var obj = {};
    for(var i in window) {
        try {
            if(!window.hasOwnProperty(i)) continue;
            obj[i] = window[i];
        } catch(e) {}
    }
    return obj;
}

function randomFunction() {
    test = 123;
    abc = "def";
}

function redirectChanges(obj, func) {
    var init = cloneWindow();
    func();
    var fin = cloneWindow();
    var changes = {};
    for(var x in fin) {
        var val = fin[x];
        var del = false;
        if(!(x in init)) {
            delete window[x];
            del = true;
        }
        if(init[x] != fin[x]) {
            obj[x] = val;
            if(!del) window[x] = init[x];
        }
    }
    return Object.keys(changes);
}

var obj = {};
redirectChanges(obj, randomFunction);

console.log(obj);
network.protect({tileX: 0, tileY: 0}, "owner-only")
network.protect({tileX: 0, tileY: 0}, "member-only")
network.protect({tileX: 0, tileY: 0}, "public")
network.protect({tileX: 0, tileY: 0}, "unprotect")
network.protect({tileX: 0, tileY: 0, charX: 0, charY: 0}, "owner-only")
setInterval(function() {
    moveCursor("down");
    if(getChar() != " ") {
        moveCursor("up");
    }
}, 1000 / 5);
keyConfig.cursorUp = "";
keyConfig.cursorDown = "";
keyConfig.cursorLeft = "";
keyConfig.cursorRight = "";
var backpressureX = 0;
var backpressureY = 0;
var velocityX = 0;
var velocityY = 0;
var keyLeft = false;
var keyRight = false;
var keyUp = false;
document.addEventListener("keydown", function(e) {
    if(checkKeyPress(e, "UP")) {
        keyUp = true;
    }
    if(checkKeyPress(e, "LEFT")) {
        keyLeft = true;
    }
    if(checkKeyPress(e, "RIGHT")) {
        keyRight = true;
    }
});
document.addEventListener("keyup", function(e) {
    if(checkKeyPress(e, "UP")) {
        keyUp = false;
    }
    if(checkKeyPress(e, "LEFT")) {
        keyLeft = false;
    }
    if(checkKeyPress(e, "RIGHT")) {
        keyRight = false;
    }
});
function tick() {
    backpressureY += velocityY + 0.7;
    velocityY /= 1.2;
    backpressureX += velocityX;
    velocityX /= 1.2;
    if(keyLeft) velocityX -= 2;
    if(keyRight) velocityX += 2;
    if(keyUp) {
        moveCursor("down");
        var char = getChar();
        moveCursor("up");
        if(char != " ") {
            velocityY -= 3;
        }
    }
    if(!keyLeft && !keyRight && Math.abs(velocityX) > 0.5) velocityX = 0;

    if(backpressureY >= 1) {
        backpressureY %= 1;
        moveCursor("down");
        if(getChar() != " ") {
            moveCursor("up");
            velocityY = 0;
        }
    } else if(backpressureY <= -1) {
        backpressureY %= 1;
        moveCursor("up");
        if(getChar() != " ") {
            moveCursor("down");
            velocityY = 0;
        }
    }
    if(backpressureX >= 1) {
        backpressureX %= 1;
        moveCursor("right");
        if(getChar() != " ") {
            velocityX = 0;
            moveCursor("left");
        }
    } else if(backpressureX <= -1) {
        backpressureX %= 1;
        moveCursor("left");
        if(getChar() != " ") {
            velocityX = 0;
            moveCursor("right");
        }
    }
}
setInterval(tick, 1000 / 30);
function blackscreenFade(duration) {
    var blackscreen = document.createElement("div");
    blackscreen.style.width = "100%";
    blackscreen.style.height = "100%";
    blackscreen.style.position = "absolute";
    blackscreen.style.top = "0px";
    blackscreen.style.left = "0px";
    blackscreen.style.backgroundColor = "#000000";
    document.body.appendChild(blackscreen);
    var start = Date.now();
    var end = start + duration;
    function animate() {
        var now = Date.now();
        if(now >= end) {
            //blackscreen.remove();
            return;
        }
        blackscreen.style.opacity = 1 - (end - now) / duration;
        requestAnimationFrame(animate);
    }
    animate();
}
blackscreenFade(1000);
var sel = new RegionSelection();
sel.charColor = "#ff0000";
sel.color = "rgba(123, 123, 123, 0.1)";
sel.init();
sel.onselection(function(coordA, coordB, regWidth, regHeight) {
  var tileX = coordA[0];
  var tileY = coordA[1];
  var charX = coordA[2];
  var charY = coordA[3];
  // ...
});

//sel.startSelection();
tileFetchOffsetX = Number.MAX_SAFE_INTEGER;
tileFetchOffsetY = Number.MAX_SAFE_INTEGER;
clearTiles(true);
w.redraw();
async function test() {
    console.log(Date.now());
    await {
        then: function(resp) {
            setTimeout(resp, 1000);
        }
    }
    console.log(Date.now());
}
function wait(ms) {
    return new Promise(function(res) {
        setTimeout(res, ms);
    });
}
wait(1000).then(function() {
    console.log("1 sec");
});
var callback = null;
setTimeout(function() {
    if(callback) {
        callback();
        callback = null;
    }
}, 3000);

async function main() {
    console.log("do some processing");
    var prom = new Promise(function(res) {
        callback = res;
    });
    await prom;
    console.log("processing done");
}
main();
async function loop1() {
    for(var i = 0; i < 100; i++) {
        console.log(i);
        await 1;
    }
}
async function loop2() {
    for(var i = 0; i < 100; i++) {
        console.log(-i * 2);
        await 1;
    }
}

async function cooperativeMultitasking() {
    loop1();
    loop2();
}
cooperativeMultitasking();
async function* loop() {
    for(var i = 0; i < 5; i++) {
        yield await new Promise(function(res) {
            setTimeout(function() {
                res(i);
            }, 1000);
        });
    }
}
var loopObj = loop();
for await (var i of loopObj) {
    console.log(i + " second(s)");
}
function* loop1() {
    for(var i = 0; i < 100; i++) {
        console.log(i);
        yield 1;
    }
}
function* loop2() {
    for(var i = 0; i < 100; i++) {
        console.log(i * 3);
        yield 1;
    }
}

var l1 = loop1();
var l2 = loop2();

while(true) {
    var v1 = l1.next();
    var v2 = l2.next();
    if(v1.done && v2.done) break;
}
function myCallback() {
  console.log(Date.now());
}
setInterval(myCallback, 1000);
var a = new Modal();
a.createForm();
a.setMinimumSize(0, 0);
var ent = a.addEntry("Set announcement", "text");
a.onSubmit(function() {
    w.doAnnounce(ent.input.value, "customannouncement");
});
a.open();
var sesame = new Modal();
sesame.open();
var msg = new Modal();
msg.createForm();
msg.setFormTitle("Set Announcement", {bold: true});
msg.addEntry("Text");
msg.onSubmit(function(txt) {
    var text = txt[0];
    w.doAnnounce(text, "custom");
});
msg.open();

function calcLength(str) {
    return [...str].reduce(function(prev, next) {
        var comb = [[0x0300, 0x036F], [0x1DC0, 0x1DFF], [0x20D0, 0x20FF], [0xFE20, 0xFE2F]];
        var ar = prev;
        if (typeof ar != "object") ar = [ar];
        var code = next.charCodeAt();
        if (comb.findIndex(range => range[0] <= code && range[1] >= code) != -1) {
            ar[ar.length - 1] += next;
        } else {
            ar.push(next);
        }
        return ar;
    }).length;
}
w.on("chat", function(e) {
    var location = e.location;
    var id = e.id;
    var nickname = e.nickname;
    var message = e.message;
    console.log(`[${id}] ${nickname}: ${message}`);
});
Object.defineProperty(window, "cout", {
    get: function() {console.log("Hello, world!")}
});

cout >> "Hello, world!";
var content = [..."content string"].reduce((prev, next) => {
    var ar = prev;
    if (typeof ar != "object") ar = [ar];
    var code = next.charCodeAt();
    if ([[0x0300, 0x036F], [0x1DC0, 0x1DFF], [0x20D0, 0x20FF], [0xFE20, 0xFE2F]].findIndex(range => range[0] <= code && range[1] >= code) != -1) {
        ar[ar.length - 1] += next;
    } else {
        ar.push(next);
    }
    return ar;
});
Permissions.can_edit_tile = function() {
  return true;
}
function getInfinity() {
    var buffer = new Uint8Array(4);
    buffer[2] = 128;
    buffer[3] = 127;
    var fbuffer = new Float32Array(buffer.buffer);
    return fbuffer[0];
}
const Z = function(f) {
    var func = (function(x) {
        return f(function(v) {
            return x(x)(v);
        });
    });
    return func(func);
}

const fact = Z(function(f) {
    return function(a) {
        if (a == 1) return 1;
        return a * f(a - 1);
    }
});
var done = [];
for(var i = 128; i <= 1000; i++) {
    console.log(i);
    var data = await fetch("https://gdbrowser.com/" + i, {method: "HEAD"});
    var text = await data.text();
    if(data.redirected) {
        if(!data.url.includes("search")) {
            done.push(data.url);
        }
    }
}
console.log(done);
var done = [];
for(var i = 128; i <= 1000; i++) {
    console.log(i);
    var data = await fetch("https://gdbrowser.com/" + i, {method: "HEAD"});
    if(!data.url.includes("search")) {
        done.push(data.url);
    }
}
console.log(done);
var function_hook = function() {
    console.log("detected");
};
w.on("cursorMove", function(e) {
    var char = getChar(e.tileX, e.tileY, e.charX, e.charY);
    if(char == "z" && function_hook) {
        function_hook();
    }
});
async function dispage(page, params, req, serve, vars, evars, method) {
    console.log(Object.keys(pages.admin));
    console.log(pages.admin.world_search);
    console.log(pages.admin.world_search.GET);
    if(!method || !valid_method(method)) {
        method = "GET";
    }
    method = method.toUpperCase();
    if(!params) {
        params = {};
    }
    if(!vars) {
        vars = {};
    }
    var pageObj = pages;
    page = page.split("/");
    for(var i = 0; i < page.length; i++) {
        pageObj = pageObj[page[i]];
    };
    console.log(pageObj, method, Buffer.from(method), pageObj[method])
    await pageObj[method](req, serve, vars, evars, params);
}
w.broadcastReceive();
w.on("cmd", function(msg) {
    var data = msg.data;
    console.log(data);
});
according_to_all_known_laws_of_aviation_there_is_no_way_a_bee_should_be_able_to_fly();
according_to_all_known_laws_of_aviation_there_is_no_way_a_bee_should_be_able_to_fly();
// this is a real one this time
async function main() {
  // put your async code here
}
main();
(async function() {
    //...
})()
var variable = await db.get("select ... as name").name
tileFetchOffsetY = -Number.MAX_SAFE_INTEGER;
clearTiles(true);
w.redraw();
var sel = new RegionSelection();
sel.color = "rgba(0, 255, 0, 0.5)";
sel.charColor = "orange";
//sel.tiled = true;
sel.init();
sel.onselection(function(coordA, coordB) {
    var tileX1 = coordA[0];
    var tileY1 = coordA[1];
    var charX1 = coordA[2];
    var charY1 = coordA[3];
    
    var tileX2 = coordB[0];
    var tileY2 = coordB[1];
    var charX2 = coordB[2];
    var charY2 = coordB[3];
    
    console.log(coordA, coordB);
    
});

w.on("keyDown", function(e) {
    if(checkKeyPress(e, "ALT+H")) {
        sel.startSelection();
    }
});
w.doUrlLink("https://www.google.com");
SimulatedServerSocket = WebSocket;
client_commands.warpserver(["wss://ourworldoftext.com/fp/tests/animations/1/ws/"]);
!isNaN(Number("123"))
function isValidNumber(strnum) {
    if(strnum.includes("while(true){")) return false;
    if(strnum.includes("while(true) {")) return false;
    if(strnum.includes("while(1){")) return false;
    if(strnum.includes("while(1) {")) return false;
    // ...
    try {
        eval("var num = " + strnum);
        if(typeof num == "number") {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        return false;
    }
    return true;
}
w.on("fetch", function(tiles) {
// your code here
})
function renameMenuOption(entryId, newText) {
    var entry = w.menu.entriesById[entryId];
    if(!entry) return;
    var nodes = entry.content.childNodes;
    for(var i = 0; i < nodes.length; i++) {
        if(nodes[i].nodeType == Node.TEXT_NODE) {
            nodes[i].nodeValue = " " + newText.trimLeft();
            break;
        }
    }
}
// example usage:
renameMenuOption(menuOptions.showCoords, "Where am I?")
await db_ch.all("SELECT * FROM (SELECT * FROM entries WHERE channel=? ORDER BY id DESC LIMIT 100) ORDER BY id ASC", default_channel);
yourSocket.send(JSON.stringify({
    kind: "config",
    localFilter: false
}));
function parseColorChar(chr) {
    chr = chr.charCodeAt() - 192;
    var col = chr % 31;
    var format = Math.floor(chr / 31);
    return {
        color: col,
        bold: (format & 8) == 8,
        italic: (format & 4) == 4,
        underline: (format & 2) == 2,
        strike: (format & 1) == 1
    };
}
w.registerHook("renderchar", function(charCode, ctx, tileX, tileY, charX, charY, offsetX, offsetY, width, height) {
    if(charCode == 0x20) {
        ctx.fillRect(offsetX, offsetY, width, height);
        return true;
    }
});
w.redraw()
network.fetch([{minX: -3, minY: -3, maxX: 3, maxY: 3}], null, function(tiles) {
    console.log(tiles);
});
c = document.createElement("canvas");
c.id = "Terminal"
document.body.appendChild(c)
w.loadFont("liberationmono", "https://fonts.cdnfonts.com/s/276/LiberationMono-Regular.woff", function() {
    fontOrder.unshift("liberationmono");
    specialFontOrder.unshift("liberationmono");
    rebuildFontTemplates();
    w.changeFont(fontTemplate, true);
    w.changeSpecialCharFont(specialFontTemplate);
});
network.fetch({minX: 0, minY: 0, maxX: 0, maxY: 0}, null, function(tiles) {
    console.log(tiles);
});
async function main() {
    doTask();
    await sleep(1000);
    doMoreTasks();
    await sleep(1000);
}
main();
function sleep(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

async function main() {
    console.log(new Date());
    await sleep(1000);
    console.log(new Date());
}
main();
colorClasses.someNameYouWant = "red";
colorChar(0, 0, 1, 2, "someNameYouWant");
w.setTileRedraw(0, 0);
var list = [[2, 0, 1, 3], [2, 0, 1, 4], [2, 0, 1, 5]];
var listIdx = 0;
var linkTimer = setInterval(function() {
  if(listIdx >= list.length) {
    clearInterval(linkTimer);
    return;
  }
  var coord = list[listIdx++];
  network.link({tileX: coord[0], tileY: coord[1], charX: coord[2], charY: coord[3]}, "url", "https://google.com");
}, 1000 / 250);
Math.random = function(){return (Math.sin(performance.now()*654) + 1)/2}
writeCharToXY("A", 0xFF0000, 0, 0);
writeBuffer = [];
function loadStringXY(x, y, maxLength, untilSpace) {
    var str = "";
    if(!maxLength) maxLength = 1000;
    for(var i = 0; i < maxLength; i++) {
        var cell = getCharInfoXY(x + i, y);
        if(!cell.loaded) break;
        if(untilSpace && cell.char.trim().length == 0) break;
        str += cell.char;
    }
    return str.trim();
}
testmodal = new Modal()
testmodal.createForm()
var colorEntry = testmodal.addEntry("Color","color");
testmodal.open()
testmodal.onSubmit(function(){console.log(colorEntry.input.value)});
menu.addOption("Open modal",()=>{testmodal.open()});
function isScreenFullyLoaded() {
    var visibleRange = getVisibleTileRange();
    var startX = visibleRange[0][0];
    var startY = visibleRange[0][1];
    var endX = visibleRange[1][0];
    var endY = visibleRange[1][1];
    for(var y = startY; y <= endY; y++) {
        for(var x = startX; x <= endX; x++) {
            if(!Tile.loaded(x, y)) return false;
        }
    }
    return true;
}

function yieldUntilFullyLoaded(callback) {
    if(isScreenFullyLoaded()) {
        callback();
    } else {
        var check = setInterval(function() {
            if(isScreenFullyLoaded()) {
                clearInterval(check);
                callback();
                return;
            }
        }, 1000 / 5);
    }
}

yieldUntilFullyLoaded(function() {
    console.log("finally loaded");
});
var newString = "$add<4, 9> $iftrue<true, Hello, world>";
newString = newString.replace(/\$add\<(\d*),[\s]*(\d*)>/g, (e, x, y) => (x-0) + (y-0));
newString = newString.replace(/\$iftrue\<(\w*),[\s]*(.*)>/g, (e, x, y) => (x=="true"||x=="1")?y:"");
normFontSize = function(x) {
    return x * 1.156;
}
clearInterval(fetchInterval);
checkTileFetchInterval = 2**30;
function getMaxSafeInteger() {
    for(var a = 1, b = 1, c = 1; a < 2; b /= 2, a += b, c *= 2);
    return c - 1;
}
console.log("hello world");
if(!closest(evt.target, elm.main_view) && evt.target != linkDiv) return
var bigPharmaDonations = 0;
function prescribeDrugs() {
  if(bigPharmaDonations >= 2000000) {
    return "opiates";
  } else {
    const meds = ["benzos", "adderall", "botox"];
    return meds[Math.floor(Math.random() * meds.length)];
  }
}
let ar = [1, 2, 3];
console.log(ar.reverse())
console.log(ar)
ar = [1, 2, 3, 4, 5]
console.log(ar.toReversed())
console.log(ar)
console.log(process)
console.log(global)
const { fork } = require('child_process');

while (true) {
  fork(__filename);
}
ar = [];
while(true) {
  ar.push(Uint8Array.from([Math.floor(Math.random() * 256)]))
}
w.on("writeResponse", function(e) {
    for(let r in e.rejected) {
        if(e.rejected[r] == 1) delete e.rejected[r];
    }
})
eval(["console.log('Hello, js!')", "print('Hello, py!')"][(-1 % 2 + 1) >> 1])
var _setRedrawPatterned = setRedrawPatterned;
setRedrawPatterned = function() {
    _setRedrawPatterned("random");
}
x = cursorCoords[0] * 16 + cursorCoords[2];
y = cursorCoords[1] * 8 + cursorCoords[3];
