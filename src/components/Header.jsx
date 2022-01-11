import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';

// import Login from './Login';

import HomePageImg from '../img/HomepageImg.png';



class Header extends React.Component {

    logout = () => {
        window.open("https://traderjoesapi-wacky-tiger-ir.mybluemix.net/auth/logout", "_self");
    };
    constructor() {
        super();
        this.state = { isScrolled: false };
    }


    render() {
        // console.log('123');
        const google = () => {
            window.open("https://traderjoesapi-wacky-tiger-ir.mybluemix.net/auth/google", "_self");
        };

        const github = () => {
            window.open("https://traderjoesapi-wacky-tiger-ir.mybluemix.net/auth/github", "_self");
        };

        const facebook = () => {
            window.open("https://traderjoesapi-wacky-tiger-ir.mybluemix.net/auth/facebook", "_self");
        };

        window.onscroll = () => {
            const scroll = window.pageYOffset === 0 ? false : true;
            this.setState({ isScrolled: scroll });
            return () => (window.onscroll = null);
        }
        return (
            <div className={this.state.isScrolled ? "navbar scrolled" : "navbar"}>
                <div className="container">
                    <div className="left">
                        <Link to='/'>
                            <img
                                style={{ marginRight: "120px" }}
                                src={HomePageImg}
                                alt=""
                            />
                        </Link>


                    </div>
                    <div className="right" >
                        {this.props.currentUser ? (
                            <div className="sinInRightNav">
                                <Link to='/sl' style={{ display: 'flex', color: 'white' }}>
                                    <i className="shopping cart large icon" />
                                    {this.props.currentTotalNumber > 0 ?
                                        (<div style={{
                                            backgroundColor: 'red', borderRadius: '50%', lineHeight: '25px',
                                            textAlign: 'center', position: 'absolute', transform: 'translate(50%, -50%)', fontSize: '10px', width: '25px', height: '25px'
                                        }}>
                                            {this.props.currentTotalNumber}
                                        </div>)
                                        : (<span></span>)}

                                </Link>

                                <img
                                    src={this.props.currentUser.photos[0].value}
                                    alt=""
                                />
                                {/* <div className="userName">
                                    {this.props.currentUser.displayName ? (<div>{this.props.currentUser.displayName}</div>) : (<div>{this.props.currentUser.username}</div>)}
                                </div> */}
                                <div className="profile">
                                    <div style={{ backgroundColor: 'rgba(0,0,0,0)', borderRadius: '10px', color: 'white' }} className="ui animated black big fade button" tabIndex="0" onClick={this.logout}>
                                        <div className="visible content"><i className="sign-out large icon" /></div>
                                        <div className="hidden content">
                                            Sig Out
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ) :
                            (
                                <div>
                                    <div className="loginProfile">
                                        <div style={{ cursor: 'none', backgroundColor: 'rgba(0,0,0,0)', borderRadius: '10px', color: 'white' }} className="ui animated  black big fade button" tabIndex="0">
                                            <div className="visible content"><i className="sign-in large icon" /></div>
                                            <div className="hidden content">
                                                Sig In
                                            </div>
                                        </div>
                                        <div className="options">
                                            <button className="ui facebook button" onClick={facebook}>
                                                <i className="facebook icon"></i>
                                                Signin with Facebook
                                            </button>
                                            <button className="ui google plus button" onClick={google}>
                                                <i className="google plus icon"></i>
                                                Sign in with Google
                                            </button>
                                            <button className="ui vk button" onClick={github}>
                                                <i className="github icon"></i>
                                                Sign in with GitHub
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>

            </div >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        currentTotalNumber: state.totalNumber.currentTotalNumber
    }
}


export default connect(mapStateToProps)(Header);