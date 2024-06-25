import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";


const SingUp = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = (event) => {
        event.preventDefault();
        console.log("form submitting")
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const checked = form.terms.checked;
        console.log(email, password, checked)


        // reset error and success
        setRegisterError('')
        setSuccess('')


        if (password.length < 6) {
            setRegisterError("Password should be 6 characters or longer!")
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Your Password should have at least one Upper case!")
            return;
        }

        else if (!checked) {
            setRegisterError("Please select terms and conditions")
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess("Successfully registered")
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message)
                // or setRegisterError("Already has an account")

            })


    }


    return (
        <div className="">
            <div className="mx-auto md:w-1/2 ">
                <h2 className="text-3xl text-center mb-4">Please Register</h2>
                <form onSubmit={handleRegister}>
                    {/* <label htmlFor="email">Email</label> */}
                    <input className="mb-4 py-2 px-4 w-full border-2" type="email" placeholder="Email" name="email" id="email" required />

                    <br />
                    <div className="relative">
                        <input className="py-2 px-4 w-full  mb-4 border-2"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password" id=""
                            required />
                        <span className="absolute top-1/4 right-2" onClick={() => setShowPassword(!showPassword)} >

                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }

                        </span>
                    </div>

                    <br />

                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-1 text-sm" htmlFor="terms">Accept our <a href="">terms and conditions</a></label>

                    </div>
                    <br />
                    <input className="btn btn-primary w-full" type="submit" value="Register" />

                    <p>Already have an account? <Link to = '/login'>Sign In</Link></p>
                </form>
                {
                    registerError && <p className="text-xl text-red-800">{registerError}</p>
                }
                {
                    success && <p className="text-xl text-green-700">{success}</p>
                }
            </div>

        </div>
    );
};

export default SingUp;