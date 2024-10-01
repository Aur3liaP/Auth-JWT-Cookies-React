/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {useState} from "react"
import axios from "axios"

export default function Register({ setRegister, register }) {
	const [credentials, setCredentials] = useState({
		username: "",
		password: ""
	})

	const handleRegister = async (e) => {
		e.preventDefault()

		try {
			await axios.post("http://localhost:3310/api/auth/register", credentials)
			setCredentials({ username: "" , password: ""})
			setRegister(!register)
			console.info("Succesfully registered")
		} catch ( err) {
			alert(`Registration failed ${err.response.data.message}`)
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
			<h1>Register</h1>
			<form action="submit" onSubmit={handleRegister}>
				<input type="text" placeholder="Username" onChange={handleChange} value={credentials.username} name="username"/>
				<input type="password" placeholder="Password" onChange={handleChange} value={credentials.password} name="password"/>
				<button type="submit">Register</button>
			</form>
			<p>
				Don't have an account?
				<button
					id="register"
					onClick={() => setRegister(!register)}
					type="button"
				>
					Login
				</button>
			</p>
		</>
	);
}
