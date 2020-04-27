import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../util/history';

class Navigation extends Component {
	
	render() {
		return (
           <Navbar bg="dark" variant="dark">
				<Nav className="navbar navbar-expand-lg navbar-dark bg-success text-white font-weight-bold">
					{this.props.routes.map((route) => (
						<Link
							key={route.url}
							className="nav-link"
							to={`${this.props.path}${route.url}`}
						>
							{route.title}
						</Link>
					))}
				</Nav>
			</Navbar>
		);
	}
}

Navigation.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired,
	path: PropTypes.string.isRequired
};

export default Navigation;
