
// contant-script.js

let backPort = browser.runtime.connect({name:"port-from-cs"});

function findDownloadName(picNumber) {
	
	let links = document.getElementsByTagName('a');
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

backPort.onMessage.addListener(function(m) {
	
	let plink = findDownloadName(m.picNumber);
	backPort.postMessage({linkName: plink});
	
});