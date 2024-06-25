import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {

    const [errorSignIn, setErrorSignIn] = useState('')
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);





    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        //reset error and success
        setErrorSignIn('');
        setSuccess('');


        // add validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess("Successfully login")
            })
            .catch(error => {
                console.log(error)
                // setErrorSignIn(error.message)
                setErrorSignIn("Incorrect Password")

            })
    }


    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please provide an email', emailRef.current.value)
            return;
        }

        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('Please write a valid email')
            return;
        }

        //sand validation email

        sendPasswordResetEmail(auth, email)
        .then( () => {
            alert('Please check your email')
        })
        .catch(error => {
            console.log(error)
        })


    }



    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                name="email"
                                ref={emailRef}
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                         <div>
                         <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered relative"
                                required />
                                <span className="absolute top-1/2 right-10" onClick={() => setShowPassword(!showPassword)}>
                                    
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                    
                                    </span>
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                         </div>

                        </div>
                        <input className="btn btn-primary" type="submit" value="Login" />
                        <p>New here? <Link to='/register'>Register</Link></p>
                    </form>
                    {
                        errorSignIn && <p className="text-red-700 text-xl">{errorSignIn}</p>
                    }
                    {
                        success && <p className="text-green-700 text-xl">{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;