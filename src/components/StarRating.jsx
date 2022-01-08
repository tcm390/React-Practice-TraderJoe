import React from 'react';

class StarRating extends React.Component {
    state = { currentStar: this.props.star };
    componentDidMount() {
        // console.log(this.props.callbackStar);
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state.currentStar);
    }
    render() {

        return (
            <div style={{ margin: "20px" }}>

                <span style={{ cursor: "pointer" }} className="icon1" onMouseEnter={() => (this.setState({ currentStar: 1 }))}>
                    {this.state.currentStar >= 1 ? (<i className="star yellow big icon" />) : (<i className="star grey big icon" />)}

                </span>
                <span style={{ cursor: "pointer" }} className="icon2" onMouseEnter={() => (this.setState({ currentStar: 2 }))}>
                    {this.state.currentStar >= 2 ? (<i className="star yellow big icon" />) : (<i className="star grey big icon" />)}
                </span>
                <span style={{ cursor: "pointer" }} className="icon3" onMouseEnter={() => (this.setState({ currentStar: 3 }))}>
                    {this.state.currentStar >= 3 ? (<i className="star yellow big icon" />) : (<i className="star grey big icon" />)}
                </span>
                <span style={{ cursor: "pointer" }} className="icon4" onMouseEnter={() => (this.setState({ currentStar: 4 }))}>
                    {this.state.currentStar >= 4 ? (<i className="star yellow big icon" />) : (<i className="star grey big icon" />)}
                </span>
                <span style={{ cursor: "pointer" }} className="icon5" onMouseEnter={() => (this.setState({ currentStar: 5 }))}>
                    {this.state.currentStar >= 5 ? (<i style={{ marginRight: '20px' }} className="star yellow big icon" />) : (<i style={{ marginRight: '20px' }} className="star grey big icon" />)}

                    {this.state.currentStar === 1 ? ('Eww Unbearable') : ('')}
                    {this.state.currentStar === 2 ? ('Bad') : ('')}
                    {this.state.currentStar === 3 ? ('Okay') : ('')}
                    {this.state.currentStar === 4 ? ('Recommend!') : ('')}
                    {this.state.currentStar === 5 ? ('Highly Recommend!') : ('')}

                </span>
            </div>
        )
    }
}
export default StarRating;