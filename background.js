
// Main script

browser.contextMenus.create({
    id: "load-image",
	targetUrlPatterns: ["*://*.zerochan.net/*"],
    title: "Download this Image",
    contexts: ["image"],
});

// Download a full version of the image or git, based on Url

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "load-image") {
		
		const imageUrl = info.srcUrl;
		const tabUrl = tab.url;
		
		const imagePatternNumber = /[\/|full.]([0-9]*)(.[a-z]*)$/;
		const tabPatternName = /\/([0-9a-zA-z]*)$/;
		
		let regImageNumber = new RegExp(imagePatternNumber);
		let matchImageNumber = regImageNumber.exec(imageUrl);
		
		let regTabName = new RegExp(tabPatternName);
		let matchImageName = regTabName.exec(tabUrl);
		
		let ext = null;
		
		const downloadedFileSrc = "https://static.zerochan.net/" + matchImageName[1] + ".full." + matchImageNumber[1] + matchImageNumber[2];
		const downloadedFileName = matchImageName[1] + ".full." + matchImageNumber[1] + matchImageNumber[2];
		
		browser.downloads.download({
		  url : downloadedFileSrc,
		  filename : downloadedFileName,
		  conflictAction : 'uniquify'
		});
		
    }
});