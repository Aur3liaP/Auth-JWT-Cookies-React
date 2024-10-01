import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import axios from "axios";

export default function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		axios.post("http://localhost:3310/api/auth/logout", {},
			{
				withCredentials: true // obligé d'être en 3ème position
			}
		)
		navigate("/");
	};

	return (
		<nav>
			<p>
				<Link to={"/"}>LoginChicks</Link>
			</p>
			<ul>
				<li>
					<Link to={"/page1"}>Page 1</Link>
				</li>
				<li>
					<Link to={"/page2"}>Page 2</Link>
				</li>
				{location.pathname !== "/" && (
					<li>
						<button onClick={handleLogout} type="button">
							Logout
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}
