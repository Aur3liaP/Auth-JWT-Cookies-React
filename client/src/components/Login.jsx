/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"


export default function Login({ setRegister, register }) {
	const navigate = useNavigate()

	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	})

	const handleLogin = async (e) => {
		e.preventDefault()

		try {
			await axios.post("http://localhost:3310/api/auth/login", credentials, {
				withCredentials: true, //Envoi les cookies pour pouvoir les enregistrer
			})
			setCredentials({ username: "" , password: ""})
			navigate("/page1")
			console.info("Succesfully logged")
		} catch ( err) {
			alert(`Login failed ${err.response.data.message}`)
		}
	}

	const handleChange = (e) => {
		const { name , value } = e.target
		

		setCredentials((prevData) => ({
			...prevData,
			[name]: value,
		}))


	}

	return (
		<>
			<h1>Login</h1>
			<form action="submit" onSubmit={handleLogin}>
				<input type="text" placeholder="Username" onChange={handleChange} value={credentials.username} name="username"/>
				<input type="password" placeholder="Password" onChange={handleChange} value={credentials.password} name="password"/>
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account?
				<button
					id="register"
					onClick={() => setRegister(!register)}
					type="button"
				>
					Register
				</button>
			</p>
		</>
	);
}
