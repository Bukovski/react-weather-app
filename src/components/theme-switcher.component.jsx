import React, { Fragment } from "react";


const ThemeSwitcher = (props) => {
	const themeColorList = [
		{
			theme: "default",
			bg: "rgba(255, 255, 255, 1)",
			text: "rgba(73, 87, 88, 1)",
			primary: "rgba(31, 166, 157, 1)",
			secondary: "rgba(29, 211, 176, 1)"
		},
		{
			theme: "warm",
			bg: "rgba(245, 238, 215, 1)",
			text: "rgba(115, 106, 81, 1)",
			primary: "rgba(191, 59, 59, 1)",
			secondary: "rgba(255, 159, 41, 1)"
		},
		{
			theme: "fresh",
			bg: "rgba(241, 241, 241, 1)",
			text: "rgba(13, 82, 84, 1)",
			primary: "rgba(14, 190, 167, 1)",
			secondary: "rgba(41, 164, 160, 1)"
		},
		{
			theme: "tonic",
			bg: "rgba(253, 255, 252, 1)",
			text: "rgba(1, 22, 39, 1)",
			primary: "rgba(187, 13, 36, 1)",
			secondary: "rgba(4, 80, 142, 1)"
		},
		{
			theme: "rainy",
			bg: "rgba(228, 253, 225, 1)",
			text: "rgba(87, 87, 97, 1)",
			primary: "rgba(138, 203, 136, 1)",
			secondary: "rgba(100, 131, 129, 1)"
		}
	];
	
	return(
		<div className="theme-switcher">
			<span className="theme-switcher__main"/>
			<ul className="theme-switcher__dropdown">
				{ themeColorList.map(theme => {
					return <li className="theme-switcher__item">
						<span
							className="theme-switcher__toggle"
							style={{
								boxShadow: `0 0 5px ${ theme.secondary }`,
								border: `2px solid ${ theme.primary }`,
								background: theme.bg
							}}
						/>
					</li>
				}) }
			</ul>
		</div>
	)
}


export default ThemeSwitcher;