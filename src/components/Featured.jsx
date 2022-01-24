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
                    <div>Learn about exciting new items at your local Trader Joe's</div ><br />
                    <div>Bookmark your favorite items.</div ><br />
                    <div>Check-out and leave reviews for any item!</div ><br />

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