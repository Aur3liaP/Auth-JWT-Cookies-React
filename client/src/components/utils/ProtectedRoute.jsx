/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}) {
    const [ isLog, setIsLog] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:3310/api/auth/protected",
                {
                    withCredentials: true
                }
            )

            if (response.status === 200) {
                setIsLog(true)
            } else {
                setIsLog(false)
            }
            } catch(err) {
                console.error("Error durong authentification",err)
                setIsLog(false)
            }
        }
        checkAuth()
    }, [])

    if (isLog === null) {
        return <div>Loading ...</div>
    }

    return isLog ? children : <Navigate to="/" replace/>



}