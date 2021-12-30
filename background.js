
// Main script

let portFromCS;

let useRelativePath = false;
let relativePath = "";

function connected(p) {
	
	portFromCS = p;
	
	portFromCS.onMessage.addListener(function(m) {
		
		let downloadedFileName = m.linkName;
		const downloadedFileSrc = "https://static.zerochan.net/" + downloadedFileName;

		if (useRelativePath === true) {
			downloadedFileName = relativePath + downloadedFileName;
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
				
		browser.storage.sync.get(["useRelativePath", "relativePath"]).then((item) => {
			
			if (item.useRelativePath === undefined || item.useRelativePath === false) {
				useRelativePath = false;
			} else {
				useRelativePath = true;
			}
			
			if (item.relativePath !== undefined) {
				relativePath = item.relativePath;
			}
				
			const imageUrl = info.srcUrl;
			const imagePatternNumber = /\/([0-9]*).[a-z]*$/;
			
			let regImageNumber = new RegExp(imagePatternNumber);
			let matchImageNumber = regImageNumber.exec(imageUrl);
			
			portFromCS.postMessage({picNumber: matchImageNumber[1]});			
			
		});
		
    }
	
});