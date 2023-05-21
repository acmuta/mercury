console.log("foreground.js");

// util to load functions on DOM ready
const onReady = (fn) => {
	if (document.readyState !== "loading") {
		fn();
		return;
	}
	document.addEventListener("DOMContentLoaded", fn);
};

// ----------------------------------------
let numCourses = -1;
let numEntries = -1
let numEntriesCounter = 0;
let divNum = -1;

const courses = new Set();

// Step 1 in achieving world domination: find how many course elements there are
getNumberCourseElements = () => {
	try {
		const elems = document.getElementsByClassName(`ps_box-group psc_collapsible psc_margin-none psc_padding-none psc_margin-topnone`);
		numCourses = elems.length;
	} catch (error) {
		console.log(error);
	}
};

// We need to count the number of courses (lectures) AND labs
getNumberCourseEntries = () => {
	try {
		const elems = document.getElementsByClassName(`ps_grid-row psc_rowact`);
		numEntries = elems.length;
	} catch (error) {
		console.log(error);
	}
};

// Step 2: find the div number of the first course element (sometimes divs renumber, but is normally 0)
getDivNum = () => {
	try {
		for (let i = 0; i <= 10; i++) {
			const elem = document.getElementById(`win${i}divSSR_SBJCT_LVL1_row$0`);
			if (elem !== null) {
				divNum = i;
				return;
			}
		}
	} catch (error) {
		console.log(error);
	}
};

getCourseElements = () => {
	console.log("getCourseElements!");
	try {
		for (let i = 0; i < numCourses; i++) {
			// let elem = document.getElementById(`win0divSSR_SBJCT_LVL1_row\$${i}`);
			// if (elem === null) {
			// 	break;
			// }
			// console.log(elem);
			// console.log(elem.querySelectorAll(`ps-link`)); // instead just grab each element by id
			const title = document.getElementById(`DERIVED_SSR_FL_SSR_SCRTAB_DTLS$${i}`).innerHTML.replace(/\s+/g, ' ').trim();
			const titleSplit = title.split(" ");
			const enrolledStatus = document.getElementById(`STDNT_ENRL_SSV1$${i}_row_0`).getElementsByClassName("ps_box-value")[0].innerHTML

			const courseCode = `${titleSplit[0]} ${titleSplit[1]}`;
			const courseName = `${title.substring(courseCode.length + 1)}`;
			const courseStatus = enrolledStatus.toLowerCase().includes("wait") ? "Waitlist" : "Enrolled";


			const numCurrentEntries = document.getElementById(`win0divSTDNT_ENRL_SSVWgridc-right$${i}`).getElementsByClassName("ps_grid-body")[0].childElementCount;
			for (let j = 0; j < numCurrentEntries; j++) {
				const courseInfo = document.getElementById(`win0divSSR_DER2_CAL_FL_$${numEntriesCounter}`);
				const courseInfoSplit = courseInfo.getElementsByClassName("ps-link")[0].innerHTML.replace(/\s+/g, ' ').trim().split(" ");
				const courseDates = document.getElementById(`DERIVED_SSR_FL_SSR_DAYS1$${numEntriesCounter}`).innerHTML.replace(/\s+/g, ' ').trim().split(" ");
				courseDates.shift();
				const courseTimes = document.getElementById(`DERIVED_SSR_FL_SSR_DAYSTIMES1$${numEntriesCounter}`).innerHTML.replace(/\s+/g, ' ').trim().split(" ");
				courseTimes.shift();
				const courseRm = document.getElementById(`DERIVED_SSR_FL_SSR_DRV_ROOM1$${numEntriesCounter}`).innerHTML;
				
				const courseType = courseInfoSplit[courseInfoSplit.length - 1];
				const courseDays = courseDates.join(" ");
				const courseTime = `${courseTimes[0]} ${courseTimes[2]}`;
				const courseRoom = courseRm.toLowerCase().includes("announce") ? "TBA" : courseRm;


				const obj = {"courseCode": courseCode, "courseName": courseName, "courseType": courseType, "courseDays": courseDays, "courseTime": courseTime, "courseRoom": courseRoom, "courseStatus": courseStatus};
				courses.add(obj);
				numEntriesCounter++;
			}
		}
	} catch (error) {
		console.log(error);
	}
};

// ----------------------------------------

	const createPopup = () => {
		document.getElementsByTagName("body")[0].insertAdjacentHTML("afterend", 
			`<div id="mercury-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 1rem; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; z-index: 99999999;"> 
				<div style="">
					<div style="width: 90vw; height: 90vh; display: flex; flex-direction: column">
						<div style="display: flex; justify-content: space-between; padding: 1rem">
							<h1>MyMav Mercury</h1>
							<button id="closeMercuryPopup">Close</button>
						</div>
                        <hr>
					</div> 
					<div style="overflow: scroll;">
						
					</div>
				</div>
			</div>`
		);

		const mercuryButton = document.getElementById("closeMercuryPopup");
		mercuryButton.addEventListener("click", function (e) {
			document.getElementById("mercury-popup").remove();
		});
	}


// ----------------------------------------

init = () => {
	onReady(getNumberCourseElements);
	onReady(getNumberCourseEntries)
	onReady(getDivNum);
};

// Only load when popup button is pressed (listens to a message from the popup)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	console.log("Message received:", message.text);
	if (message.text === "collectCourseElements") {
		init();
		onReady(getCourseElements);
		onReady(createPopup);
		console.log(courses);
	}
});