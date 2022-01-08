import React from 'react';
import { customerWinnerData } from '../CustomerWinnerData';
import CustomerWinnerCard from './CustomerWinnerCard';
import './CustomerWinner.scss'
const CustomerWinner = () => {
    return (
        <div className="winnerList">
            <br></br>
            {/* <h1 className="listTitle">
                Annual Customer Choice Awards Winners
            </h1> */}
            <div style={{ overflow: 'auto' }} className="customerWinnerList">
                {customerWinnerData.map(winner =>
                    (
                        <CustomerWinnerCard winner={winner}>123</CustomerWinnerCard>
                    )
                )}
            </div>

        </div>

    );
}
export default CustomerWinner;