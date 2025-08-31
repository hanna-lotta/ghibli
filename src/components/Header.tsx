import { Link, NavLink } from "react-router";

const Header: React.FC = () => {
	return (
		<header className="header">
			<h1>Ghibli Filmer</h1>
			<nav>
				<NavLink to="/">Hem</NavLink>
				<NavLink to="/favoritefilms">Favoriter</NavLink>

			</nav>
		</header>
	);
};

export default Header;
