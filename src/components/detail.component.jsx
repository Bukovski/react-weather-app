import React from "react";

const Detail = (props) => {
	return (<div className="detail">
		<div className="detail__wrap">
          <span className="detail__icon">
            <i className="wi wi-cloudy"/>
          </span>
			<div className="detail__description">Scattered clouds</div>
		</div>
		
		<div className="detail__box">
			<div className="detail__indicator">
				<div className="detail__info">
					3.82
					<span className="detail__measure">m/s</span>
				</div>
				<div className="detail__name">wind speed</div>
			</div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					57
					<span className="detail__measure">%</span>
				</div>
				<div className="detail__name">humidity</div></div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					1050
					<span className="detail__measure">hpa</span>
				</div>
				<div className="detail__name">pressure</div>
			</div>
		</div>
	
	</div>);
}


export default Detail;