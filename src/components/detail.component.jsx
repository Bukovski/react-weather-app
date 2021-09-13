import React from "react";

const Detail = (props) => {
	const { weatherDescription, weatherIcon, windSpeed, humidity, pressure } = props.data;
	
	return (<div className="detail">
		<div className="detail__wrap">
          <span className="detail__icon">
            <i className={ weatherIcon }/>
          </span>
			<div className="detail__description">{ weatherDescription }</div>
		</div>
		
		<div className="detail__box">
			<div className="detail__indicator">
				<div className="detail__info">
					{ windSpeed }
					<span className="detail__measure">m/s</span>
				</div>
				<div className="detail__name">wind speed</div>
			</div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					{ humidity }
					<span className="detail__measure">%</span>
				</div>
				<div className="detail__name">humidity</div></div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					{ pressure }
					<span className="detail__measure">hpa</span>
				</div>
				<div className="detail__name">pressure</div>
			</div>
		</div>
	
	</div>);
}


export default Detail;