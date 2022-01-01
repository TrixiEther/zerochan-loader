
// Main script

let portFromCS;

let useRelativePath = false;
let relativePath = "";
let createSubfolders = false;

function connected(p) {
	
	portFromCS = p;
	
	portFromCS.onMessage.addListener(function(m) {

		let subfolder = "";

		if (createSubfolders === true) {

			const imageNamePattern = /^([0-9a-zA-Z.]*).full/;
			let regImageName = new RegExp(imageNamePattern);

			let matchImageName = regImageName.exec(m.linkName);
			subfolder = matchImageName[1] + "/";

		}
		
		let downloadedFileName = m.linkName;
		const downloadedFileSrc = "https://static.zerochan.net/" + downloadedFileName;

		if (useRelativePath === true) {
			downloadedFileName = relativePath + subfolder.replace(/\./g, " ") + downloadedFileName;
		}
		
		browser.downloads.download({
		  url : downloadedFileSrc,
		  filename : downloadedFileName,
		  conflictAction : 'uniquify'
		});

	});
}

browser.runtime.onConnect.addListener(connected);

browser.contextMenus.create({
    id: "load-image",
	targetUrlPatterns: ["*://*.zerochan.net/*"],
    title: "Download this Image",
    contexts: ["image"],
});

// Download a full version of the image or git, based on Url

browser.contextMenus.onClicked.addListener((info, tab) => {
	
    if (info.menuItemId === "load-image") {
				
		browser.storage.sync.get(["useRelativePath", "relativePath", "createSubfolders"]).then((item) => {
			
			if (item.useRelativePath === undefined || item.useRelativePath === false) {
				useRelativePath = false;
			} else {
				useRelativePath = true;
			}
			
			if (item.relativePath !== undefined) {
				relativePath = item.relativePath;
			}

			if (item.createSubfolders !== undefined) {
				createSubfolders = item.createSubfolders;
			}
				
			const imageUrl = info.srcUrl;
			const imagePatternNumber = /\/([0-9]*).[a-z]*$/;
			
			let regImageNumber = new RegExp(imagePatternNumber);
			let matchImageNumber = regImageNumber.exec(imageUrl);
			
			portFromCS.postMessage({picNumber: matchImageNumber[1]});			
			
		});
		
    }
	
});