var changeZoomStr = String(changeZoom);
var updateRendererZoomStr = String(updateRendererZoom);

if (!changeZoomStr.includes("// do not change")) {
	changeZoomStr = changeZoomStr.replace("if(userZoom < 0.2) userZoom = 0.2;", "").replace("if(userZoom > 10) userZoom = 10;", "");
	changeZoomStr = changeZoomStr.replace(/^.*?\{/, "").replace(/}.*?$/, "");
	window.changeZoom = Function("percentage", "isPartial", changeZoomStr);
}
if (!updateRendererZoomStr.includes("// do not change")) {
	updateRendererZoomStr = updateRendererZoomStr.replace("if(percentage < 3) percentage = 3;", "").replace("if(percentage > 1000) percentage = 1000;", "");
	updateRendererZoomStr = updateRendererZoomStr.replace(/^.*?\{/, "").replace(/}.*?$/, "");
	window.updateRendererZoom = Function("percentage", updateRendererZoomStr);
}
