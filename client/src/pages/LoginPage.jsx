import React from "react";
import assets from "../assets/assets";
import { useState } from "react";

const LoginPage = () => {
    const [currState, setCurrState] = useState("Sign up");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (currState === "Sign up" && !isDataSubmitted) {
            setIsDataSubmitted(true);
            return;
        }
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
                        className="border-2 border-gray-500 p-2 rounded-md focus:outline-none"
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
                            className="border-2 border-gray-500 p-2 rounded-md focus:outline-none"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="border-2 border-gray-500 p-2 rounded-md focus:outline-none"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </>
                )}

                {currState === "Sign up" && isDataSubmitted && (
                    <textarea
                        className="border-2 border-gray-500 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Bio"
                        value={bio}
                        required
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                )}

                <button
                    type="submit"
                    className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
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
                                className="font-medium text-violet-500 cursor-pointer"
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
                                className="font-medium text-violet-500 cursor-pointer"
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
