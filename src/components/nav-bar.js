import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { stock_mode } from './data/constants';

import '../css/nav-bar.css';

class NavBar extends Component {
	render() {
		let toggleElm = null;
		if (this.props.stockMode === stock_mode.detail) {
			toggleElm = (
				<button onClick={this.props.onToggleStockMode}>
					<span className="icon-compress" />
					<i>Minimize Portfolio</i>
				</button>
			);
		} else {
			toggleElm = (
				<button onClick={this.props.onToggleStockMode}>
					<span className="icon-expand" />
					<i>Expand Portfolio</i>
				</button>
			);
		}
		return (
			<header className="nav-bar">
				<h1 className="nav-title column" />
				<ul className="portfolio-actions column">
					<li>
						<button onClick={this.props.onReload}>
							<span className="icon-refresh" />
							<i>Refresh</i>
						</button>
					</li>
					<li>
						{toggleElm}
					</li>
					<li>
						<button onClick={this.props.onAddStock}>
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
