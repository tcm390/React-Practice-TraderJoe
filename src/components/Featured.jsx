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
                    Trader Joe's is an American chain of grocery stores headquartered in Monrovia, California. The chain has over 530 stores nationwide.
                    The first Trader Joe's store was opened in 1967 by founder Joe Coulombe in Pasadena, California. It was owned by German entrepreneur Theo Albrecht from 1979 until his death in 2010, when ownership passed to his heirs. The company has offices in Monrovia and Boston, Massachusetts.
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