const collectCourseButton = document.getElementById("collectCourseButton");

// check if we are on the correct page
// if we are, enable button
async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

// call getCurrentTab when the extension popup is opened
getCurrentTab().then((tab) => {
	console.log(tab.url);
	const url = tab.url;
	if (url.includes("mymav.utshare.utsystem.edu") && url.includes("TEMPLATE_ID%3aPTPPNAVCOL") && url.includes("UTA_MANAGE_CLASSES")) {
		collectCourseButton.disabled = false;

		document.getElementsByTagName("body")[0].insertAdjacentHTML("beforebegin", 
		`<button id="gotoCourses">Open MyMav</button>`
		);

		const gotoCourses = document.getElementById("gotoCourses");
		const mymavCoursesURL = "https://mymav.utshare.utsystem.edu/psc/ARCSPRD/EMPLOYEE/SA/c/NUI_FRAMEWORK.PT_AGSTARTPAGE_NUI.GBL?CONTEXTIDPARAMS=TEMPLATE_ID%3aPTPPNAVCOL&scname=UTA_MANAGE_CLASSES&PanelCollapsible=Y&PTPPB_GROUPLET_ID=UTA_MANAGE_CLASSES&CRefName=ADMN_NAVCOLL_6";
		gotoCourses.addEventListener("click", function (e) {
			chrome.tabs.create({ url: mymavCoursesURL });
		});

	} else {
		collectCourseButton.disabled = true;
	}
});

const collectCourseElements = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		const message = { text: "collectCourseElements" };
		chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
			if (chrome.runtime.lastError) {
				// wrong page
			}
		});
	});
};
collectCourseButton.addEventListener("click", collectCourseElements);
