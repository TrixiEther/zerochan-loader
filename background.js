
// Main script

function findDownloadName(picNumber) {
	
	const links= document.getElementsByTagName("div");
	const pReg = new RegExp('/([a-zA-Z.]*.full.' + picNumber + '.[a-z]*)$');
	
	for (let plink of links) {
		
		let href = plink.getAttribute('href');
		let matchLink = pReg.exec(href);
		
		if (matchLink !== null && matchLink[1] !== undefined) {
			return matchLink[1];
		}
		
	}

	return undefined;
	
}

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
			
			let useRelativePath = false;
			let relativePath = "";
			
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
			
			let downloadedFileName = findDownloadName(matchImageNumber[1]);
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
	
});