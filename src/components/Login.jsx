import React, { useState } from "react";
import Modal from "react-modal";

import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import TraderJoeBG from "../img/TraderJoeBG.jpg";

import './Login.scss';

Modal.setAppElement("#root");
const Login = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    };

    const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
    };

    return (
        <div className="Modal">
            <div onClick={toggleModal}>{children}</div>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}
            >
                <div className="left">
                    <h1 className="loginTitle">LOGIN </h1>
                    <div className="loginButton google" onClick={google}>
                        <img src={Google} alt="" className="icon" />
                        Sign in with Google
                    </div>
                    <div className="loginButton facebook" onClick={facebook}>
                        <img src={Facebook} alt="" className="icon" />
                        Sign in with Facebook
                    </div>
                    <div className="loginButton github" onClick={github}>
                        <img src={Github} alt="" className="icon" />
                        Sign in with Github
                    </div>
                </div>

                <div className="right">
                    <img src={TraderJoeBG} alt=""></img>
                </div>

            </Modal>
        </div>
    );
};

export default Login;