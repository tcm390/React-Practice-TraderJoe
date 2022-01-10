import React from 'react';
import CustomerWinner from './CustomerWinner';
import WhatsNew from './WhatsNew';
class NewsBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: 1
        };
    }
    onClickNews = () => {
        this.setState({ news: 1 });
    }
    onClickWinner = () => {
        this.setState({ news: 0 });
    }
    render() {
        return (

            <div style={{ marginTop: "10px" }} className="uisegment">
                <div className="uicontainer">
                    <div className="whatsnew">
                        <div className="ui secondary pointing menu compact">
                            <a className={`item ${this.state.news === 1 ? 'active' : ''}`} onClick={this.onClickNews}>
                                What's new
                        </a>
                            <a className={`item ${this.state.news === 0 ? 'active' : ''}`} onClick={this.onClickWinner}>
                                Customer Choice Awards Winners
                        </a>

                        </div>
                        <br></br>
                        {
                            this.state.news === 0 ? (<CustomerWinner />) : (<WhatsNew />)
                        }


                    </div>
                </div>
            </div>

        );
    }

}
export default NewsBar;