import React, { useContext } from "react";
import assets from "../assets/assets";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
    const [currState, setCurrState] = useState("Sign up");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const { login } = useContext(AuthContext);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (currState === "Sign up" && !isDataSubmitted) {
            setIsDataSubmitted(true);
            return;
        }

        login(currState === "Sign up" ? "signup" : "login", {
            fullName,
            email,
            password,
            bio,
        });
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
            {/* Left */}
            <img
                src={assets.logo_big}
                alt=""
                className="w-[min(30vw, 250px)]"
            />

            {/* Right */}

            <form
                onSubmit={onSubmitHandler}
                className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
            >
                <h2 className="font-medium text-2xl flex justify-between items-center">
                    {currState}
                    {isDataSubmitted && (
                        <img
                            onClick={() => setIsDataSubmitted(false)}
                            src={assets.arrow_icon}
                            alt=""
                            className="w-5 cursor-pointer"
                        />
                    )}
                </h2>

                {currState === "Sign up" && !isDataSubmitted && (
                    <input
                        type="text"
                        className="border-2 border-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-white placeholder-gray-400"
                        placeholder="Full Name"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        required
                    />
                )}

                {!isDataSubmitted && (
                    <>
                        <input
                            type="email"
                            className="border-2 border-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-white placeholder-gray-400"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="border-2 border-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-white placeholder-gray-400"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </>
                )}

                {currState === "Sign up" && isDataSubmitted && (
                    <textarea
                        className="border-2 border-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-white placeholder-gray-400"
                        placeholder="Bio"
                        value={bio}
                        required
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                )}

                <button
                    type="submit"
                    className="py-3 bg-gradient-to-r from-gray-800 to-black text-white rounded-md cursor-pointer hover:from-gray-700 hover:to-gray-800 transition-all"
                >
                    {currState === "Sign up" ? "Create Account" : "Login Now"}
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <input type="checkbox" />
                    <p>Agree to the terms of use and privacy policy</p>
                </div>

                <div className="flex flex-col gap-2">
                    {currState === "Sign up" ? (
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <span
                                className="font-medium text-gray-300 cursor-pointer hover:text-white"
                                onClick={() => {
                                    setCurrState("Login");
                                    setIsDataSubmitted(false);
                                }}
                            >
                                Login
                            </span>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-600">
                            Create an account?
                            <span
                                className="font-medium text-gray-300 cursor-pointer hover:text-white"
                                onClick={() => setCurrState("Sign up")}
                            >
                                Sign up
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
