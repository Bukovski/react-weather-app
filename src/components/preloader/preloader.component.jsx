import React, { useEffect, useState } from "react";
import "./preloader.style.css";


const Preloader = (props) => {
	const { isLoaded } = props;
	
	const [ visible, setVisible ] = useState(true);
	
	// remove element after animation is complete
	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(!visible);
		}, 1000);
		
		return () => {
			clearTimeout(timer)
		}
	}, [ isLoaded ]);
	

	return (
		visible
			? <div className={ "preloader " + (isLoaded ? "preloader-hidden" : "") }>
				<svg width="200" height="200" viewBox="0 0 100 100">
					<polyline className="line-cornered stroke-still" points="0,0 100,0 100,100" stroke-width="10" fill="none" />
					<polyline className="line-cornered stroke-still" points="0,0 0,100 100,100" stroke-width="10" fill="none" />
					<polyline className="line-cornered stroke-animation" points="0,0 100,0 100,100" stroke-width="10" fill="none" />
					<polyline className="line-cornered stroke-animation" points="0,0 0,100 100,100" stroke-width="10" fill="none" />
				</svg>
			</div>
			: null
	)
}


export default Preloader;
