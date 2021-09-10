import React from "react";

const Temperature = (props) => {
	return (<div className="temperature">
		<div className="temperature__deg">25</div>
		<div className="temperature__wrap">
			<div className="temperature__mesure">&deg;C</div>
			
			<div className="temperature__box">
				<div className="temperature__max">
					<span className="temperature__mark">{ '\u2191' }</span>
					<p className="temperature__text">38</p>
					<span className="temperature__unit">&deg;C</span>
				</div>
				<div className="temperature__min">
					<span className="temperature__mark">{ '\u2193' }</span>
					<p className="temperature__text">25</p>
					<span className="temperature__unit">&deg;C</span>
				</div>
			</div>
		
		</div>
	</div>);
}


export default Temperature;