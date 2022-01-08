import React from 'react';
import './CustomerWinnerCard.scss';
const CustomerWinnerCard = ({ children, winner }) => {
    return (
        <div className="winnerCardContainer" onClick={() => window.open('https://www.traderjoes.com/home/discover/stories/12th-annual-customer-choice-awards')} >

            <div className="name">
                {winner.name}
            </div>
            <img
                src={winner.imageUrl}
                alt=""
            />
            <div className="des">
                {winner.description}
            </div>
            {/* <div className="runnerup">
                {winner.ruunerUp}
            </div> */}

        </div >
        // <div
        //     style={{
        //         width: '120px',
        //         height: 'auto',
        //         margin: "5px",
        //         border: 'none',
        //         overflow: 'hidden'


        //     }}
        //     class="ui  card">
        //     {/* <div class="ui slide masked reveal image small"> */}
        //     <img
        //         style={{

        //             padding: '10px 10px',
        //             height: '100px'
        //         }}
        //         src={winner.imageUrl} class="visible content" />
        //     {/* <img src={winner.imageUrl} class="hidden content" /> */}
        //     {/* </div> */}
        //     <div class="content">
        //         <span style={{ fontSize: "10px" }} class="date">{winner.description}</span>
        //         {/* <div class="meta">
        //             <span style={{ fontSize: "10px" }} class="date">{winner.description}</span>
        //         </div> */}
        //     </div>
        // </div>

    );
}
export default CustomerWinnerCard;