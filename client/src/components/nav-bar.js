import React, { Component } from 'react';
import { ticker_mode } from './data/constants';
import '../css/nav-bar.css';

class NavBar extends Component {
	render() {
		let toggleElm = null;
		if (this.props.tickerMode === ticker_mode.detail) {
			toggleElm = (
				<button onClick={this.props.onToggleTickerMode}>
					<span className="icon-compress" />
					<i>Minimize</i>
				</button>
			);
		} else {
			toggleElm = (
				<button onClick={this.props.onToggleTickerMode}>
					<span className="icon-expand" />
					<i>Expand</i>
				</button>
			);
		}
		return (
			<header className="nav-bar">
				<h1 className="nav-title column" />
				<ul className="portfolio-actions column">
		
					<li>
						{toggleElm}
					</li>
					<li>
						<button onClick={this.props.onAddTicker}>
							<span className="icon-plus-circle" />
							<i>Add</i>
						</button>
					</li>
				</ul>
			</header>
		);
	}
}

export default NavBar;

// <Logo onClick={this.props.onReload}/>
