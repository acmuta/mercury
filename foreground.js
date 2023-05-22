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
let numEntries = -1;
let numEntriesCounter = 0;
let divNum = -1;

const courses = new Set();

// Step 1 in achieving world domination: find how many course elements there are
getNumberCourseElements = () => {
	try {
		const elems = document.getElementsByClassName(
			`ps_box-group psc_collapsible psc_margin-none psc_padding-none psc_margin-topnone`
		);
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
			const title = document
				.getElementById(`DERIVED_SSR_FL_SSR_SCRTAB_DTLS$${i}`)
				.innerHTML.replace(/\s+/g, " ")
				.trim();
			const titleSplit = title.split(" ");
			const enrolledStatus = document
				.getElementById(`STDNT_ENRL_SSV1$${i}_row_0`)
				.getElementsByClassName("ps_box-value")[0].innerHTML;

			const courseCode = `${titleSplit[0]} ${titleSplit[1]}`;
			const courseName = `${title.substring(courseCode.length + 1)}`;
			const courseStatus = enrolledStatus.toLowerCase().includes("wait")
				? "Waitlist"
				: "Enrolled";

			const numCurrentEntries = document
				.getElementById(`win0divSTDNT_ENRL_SSVWgridc-right$${i}`)
				.getElementsByClassName("ps_grid-body")[0].childElementCount;
			for (let j = 0; j < numCurrentEntries; j++) {
				const courseInfo = document.getElementById(
					`win0divSSR_DER2_CAL_FL_$${numEntriesCounter}`
				);
				const courseInfoSplit = courseInfo
					.getElementsByClassName("ps-link")[0]
					.innerHTML.replace(/\s+/g, " ")
					.trim()
					.split(" ");
				const courseDates = document
					.getElementById(`DERIVED_SSR_FL_SSR_DAYS1$${numEntriesCounter}`)
					.innerHTML.replace(/\s+/g, " ")
					.trim()
					.split(" ");
				courseDates.shift();
				const courseTimes = document
					.getElementById(`DERIVED_SSR_FL_SSR_DAYSTIMES1$${numEntriesCounter}`)
					.innerHTML.replace(/\s+/g, " ")
					.trim()
					.split(" ");
				courseTimes.shift();
				const courseRm = document.getElementById(
					`DERIVED_SSR_FL_SSR_DRV_ROOM1$${numEntriesCounter}`
				).innerHTML;

				const courseType = courseInfoSplit[courseInfoSplit.length - 1];
				const courseDays = courseDates.join(" ");
				const courseTime = `${courseTimes[0]} ${courseTimes[2]}`;
				const courseRoom = courseRm.toLowerCase().includes("announce") ? "TBA" : courseRm;

				const obj = {
					courseCode: courseCode,
					courseName: courseName,
					courseType: courseType,
					courseDays: courseDays,
					courseTime: courseTime,
					courseRoom: courseRoom,
					courseStatus: courseStatus,
				};
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
	document.getElementsByTagName("body")[0].insertAdjacentHTML(
		"afterend",
		`<div
			id="mercury-popup"
			style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgb(242, 242, 247); border-radius: 1rem; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; z-index: 99999999; color: rgb(44, 44, 46);">
			<div style="font-family: Verdana, sans-serif;">
				<div style="width: 90vw; height: 90vh; display: flex; flex-direction: column">
					<div style="display: flex; justify-content: space-between; padding: 1.5rem; background-color: rgb(229, 229, 234); border-radius: 1rem 1rem 0 0;">
						<div style="display: flex; flex-direction: row; align-items: center; gap: 1.5rem;">
							<img
								style="width: 4rem; height: 4rem; border-radius: 1rem; border: gray 1px solid; padding: .5rem; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"
								src="https://github.com/acmuta/mercury/blob/ryan-schedule-view/logo/logo512.png?raw=true"
							></img>
							<div style="display: flex; flex-direction: column; gap: .75rem;">
								<p style="font-weight: 700; font-size: 1.5rem; margin: 0">MyMav Mercury</p>
								<p style="margin: 0">Schedule View</p>
							</div>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							width="35px"
							height="36px"
							viewBox="0 0 35 36"
							version="1.1"
							id="closeMercuryPopup"
							style="padding: .1rem; cursor: pointer"
						>
							<g id="surface1">
								<path
									style="fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(40%,43.921569%,52.156863%);stroke-opacity:1;stroke-miterlimit:4;"
									d="M 18 6.499566 L 6 18.500434 M 6 6.499566 L 18 18.500434 "
									transform="matrix(1.458333,0,0,1.44,0,0)"
								/>
							</g>
						</svg>
					</div>
				<div style="overflow: scroll;">
					<div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
						<!-- <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
							<p style="font-weight: 700; font-size: 1.5rem; margin: 0;">Monday</p>
							<div style="display: flex; flex-direction: row; gap: 1rem;">
								<p style="margin: 0;">Total Hours: </p>
								<p style="margin: 0;">0</p>
							</div>
						</div> -->
						<table style="width: 100%; border-collapse: collapse;">
							<thead>
								<th style="border: 1px solid black; padding: .25rem;">&nbsp;</th>
								<th style="border: 1px solid black; padding: .25rem;">Monday</th>
								<th style="border: 1px solid black; padding: .25rem;">Tuesday</th>
								<th style="border: 1px solid black; padding: .25rem;">Wednesday</th>
								<th style="border: 1px solid black; padding: .25rem;">Thursday</th>
								<th style="border: 1px solid black; padding: .25rem;">Friday</th>
							</thead>
							<tbody style="text-align: center">
								<tr style="font-size: .25rem">
									<td class="time h6 m0" style="border: 1px solid black; font-weight: 700; font-size: .8rem" rowspan="6">6:00 AM</td>
									<td class="time h6 m0 monday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m0 tuesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m0 wednesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m0 thursday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m0 friday" style="border: 1px solid black;">&nbsp;</td>
								</tr>
								<tr style="font-size: .25rem">
									<td class="time h6 m10 monday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m10 tuesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m10 wednesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m10 thursday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m10 friday" style="border: 1px solid black;">&nbsp;</td>
								</tr>
								<tr style="font-size: .25rem">
									<td class="time h6 m20 monday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m20 tuesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m20 wednesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m20 thursday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m20 friday" style="border: 1px solid black;">&nbsp;</td>
								</tr>
								<tr style="font-size: .25rem">
									<td class="time h6 m30 monday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m30 tuesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m30 wednesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m30 thursday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m30 friday" style="border: 1px solid black;">&nbsp;</td>
								</tr>
								<tr style="font-size: .25rem">
									<td class="time h6 m40 monday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m40 tuesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m40 wednesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m40 thursday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m40 friday" style="border: 1px solid black;">&nbsp;</td>
								</tr>
								<tr style="font-size: .25rem">
									<td class="time h6 m50 monday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m50 tuesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m50 wednesday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m50 thursday" style="border: 1px solid black;">&nbsp;</td>
									<td class="time h6 m50 friday" style="border: 1px solid black;">&nbsp;</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- <table style="table-layout: fixed; width: 100%;">
						<thead style="display: flex; justify-content: space-between; gap: 2rem">
							<th>&nbsp;</th>
							<th>Monday</th>
							<th>Tuesday</th>
							<th>Wednesday</th>
							<th>Thursday</th>
							<th>Friday</th>
							<th>Saturday</th>
							<th>Sunday</th>
						</thead>
						<tbody></tbody>
					</table> -->
				</div>
			</div>
		</div>`
	);

	const mercuryButton = document.getElementById("closeMercuryPopup");
	mercuryButton.addEventListener("click", function (e) {
		document.getElementById("mercury-popup").remove();
	});
};

// ----------------------------------------

init = () => {
	onReady(getNumberCourseElements);
	onReady(getNumberCourseEntries);
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
