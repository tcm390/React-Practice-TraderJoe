import React from 'react';
import { PlayArrow, InfoOutlined, Explore, More } from '@material-ui/icons';
import './Featured.scss';
import HomePageImg from '../img/HomepageImg.png';

const Featured = () => {
    return (
        <div className="featured">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Trader_Joes_in_Amherst%2C_NY_-_2018.jpg/1920px-Trader_Joes_in_Amherst%2C_NY_-_2018.jpg"
                alt=""
            />
            <div className="info">
                <div style={{ textAlign: 'center' }} className="infoText">
                    <h1>Track what's  new.</h1 >
                    <h1>Save those you want to buy.</h1 >
                    <h1>Tell people what's good.</h1 >

                </div>
                <div
                    style={{ marginTop: '10px', textAlign: 'center' }}
                    className="bounceArrow bounce-1"
                    onClick={() => window.scrollTo({
                        top: 300,
                        behavior: 'smooth'
                    })}
                >
                    <i className="angle double down big icon" />
                </div>
            </div>
        </div>
    );
}
export default Featured;