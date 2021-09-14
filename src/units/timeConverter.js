import moment from "moment";


// Get date from Unix timestamp
const dateFromTimestamp = (timestamp) => {
	const date = new Date(timestamp * 1000);
	return moment(date).format("ddd, MMMM DD");
};

// Get time from Unix timestamp
const timeFromTimestamp = (timestamp) => {
	const date = new Date(timestamp * 1000);
	return moment(date).format("HH:MM");
};


export {
	dateFromTimestamp,
	timeFromTimestamp
}