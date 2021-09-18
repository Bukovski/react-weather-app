import React from "react";


const Geo = (props) => {
	const { cityName, date } = props.data;
	
	return (<div className="geo">
		<div className="geo__location">
			{ cityName }
		</div>
		<div className="geo__date">{ date }</div>
	</div>);
}


export default Geo;
