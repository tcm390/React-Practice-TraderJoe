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
                <div>
                    Trader Joe's is everyone's all-time favorite  organic groceries store. They have the most fresh produce and limited products in every seasons.<br />

                    In this website, you can find what's the newest product in this season, haul videos and rating from true customer's reviews.

                    We also invite you to share your review with us.<br />

                    What's more, you can add anything you want to try in your cart to create your own shopping list! Once it gets done....let's go to Trader Joe's!

                </div>
                <div
                    style={{ marginTop: '10px' }}
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