import React from 'react';
import newpicture1 from '../img/whatsnew1.png';
import newpicture12 from '../img/whatsnew1-2.png';
import newpicture2 from '../img/whatsnew2.png';
import newpicture22 from '../img/whatsnew2-2.png';
import './WhatsNew.scss';
const WhatsNew = () => {
    return (
        <div className="whatsneww" >

            <div
                style={{ height: "170px", margin: "20px" }}
                className="ui card"

            >
                <div className="ui slide masked reveal image" onClick={() => window.open('https://www.traderjoes.com/home/products/pdp/italian-lagorai-semi-soft-cheese-054875')}>
                    <img style={{ height: "170px" }} src={newpicture1} className="visible content" />
                    <img style={{ height: "170px" }} src={newpicture12} className="hidden content" />
                </div>
            </div>
            <div
                style={{ height: "170px", margin: "20px" }}
                className="ui card"
            >
                <div className="ui slide masked reveal image" onClick={() => window.open('https://www.traderjoes.com/home/products/pdp/gluten-free-granola-loaded-fruit-and-nut-096330')}>
                    <img style={{ height: "170px" }} src={newpicture2} className="visible content" />
                    <img style={{ height: "170px" }} src={newpicture22} className="hidden content" />
                </div>
            </div>
        </div>

    );
}
export default WhatsNew;