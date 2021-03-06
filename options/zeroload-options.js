
// zeroloader-options.js

window.onload = function() {
	
	browser.storage.sync.get("useRelativePath").then(setRelPathOnLoad, onError);
	browser.storage.sync.get("relativePath").then(setZeroloadPathOnLoad, onError);
	browser.storage.sync.get("createSubfolders").then(setCreateSubfoldersOnLoad, onError);
	
}

zeroloaderPathSave.onclick = function() {
	
	let path = document.getElementById("zeroloaderPath").value;
	
	browser.storage.sync.set({
		relativePath: path
	});
	
}

createSubfolders.onchange = function() {

	if (document.getElementById("createSubfolders").checked === true) {
		
		browser.storage.sync.set({
			createSubfolders: true
		});
		
	} else {
		
		browser.storage.sync.set({
			createSubfolders: false
		});
		
	}

}

useRelPath.onchange = function() {
	
	if (document.getElementById("useRelPath").checked === true) {
		
		browser.storage.sync.set({
			useRelativePath: true
		});
		
	    document.getElementById("zeroloaderPath").disabled = false;
	    document.getElementById("zeroloaderPathSave").disabled = false;
		
	} else {
		
		browser.storage.sync.set({
			useRelativePath: false
		});
		
	    document.getElementById("zeroloaderPath").disabled = true;
	    document.getElementById("zeroloaderPathSave").disabled = true;
		
	}
	
}

function onError(error) {
	
  alert(`Error: ${error}`);
  
}

function setRelPathOnLoad(item) {
	
	if (item.useRelativePath === undefined || item.useRelativePath === false) {
	  
		document.getElementById("useRelPath").checked = false;
		document.getElementById("zeroloaderPath").disabled = true;
		document.getElementById("zeroloaderPathSave").disabled = true;
	  
	} else {
	  
		document.getElementById("useRelPath").checked = true;
		document.getElementById("zeroloaderPath").disabled = false;
		document.getElementById("zeroloaderPathSave").disabled = false;
	  
	}
  
}

function setZeroloadPathOnLoad(item) {
	
	if (item.relativePath !== undefined) {
	  
	  document.getElementById("zeroloaderPath").value = item.relativePath;
	  
	} 
	
}

function setCreateSubfoldersOnLoad(item) {

	if (item.createSubfolders !== undefined) {

		document.getElementById("createSubfolders").checked = item.createSubfolders;

	}

}