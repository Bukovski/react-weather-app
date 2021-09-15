const API_KEY = process.env.REACT_APP_IPINFO_API_KEY || "";

const fetchDataLocation = async () => {
	const getGeolocation = await fetch(`https://ipinfo.io/91.214.82.65?token=${ API_KEY }`);
	const locationInfo = await getGeolocation.json();
	
	const splitLocationData = locationInfo.loc.split(",");
	
	return {
		location: {
			latitude: splitLocationData[ 0 ],
			longitude: splitLocationData[ 1 ],
		}
	}
};


export default fetchDataLocation;
