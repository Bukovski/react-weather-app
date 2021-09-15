const API_KEY = process.env.REACT_APP_IPINFO_API_KEY || "";

const fetchDataLocation = async () => {
	let locationInfo = "0,0";
	
	try {
		const getGeolocation = await fetch(`https://ipinfo.io/91.214.82.65?token=${ API_KEY }`);
		const jsonData = await getGeolocation.json();
		
		locationInfo =  jsonData.loc;
		
	} catch (err) {
		throw new Error(err);
	}
	const splitLocationData = locationInfo.split(",");
	
	
	return {
		location: {
			latitude: splitLocationData[ 0 ],
			longitude: splitLocationData[ 1 ],
		}
	}
	
};


export default fetchDataLocation;
