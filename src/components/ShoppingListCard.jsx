import React from 'react';
import './ShoppingListCard.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentTotalPrice } from '../redux/shoppingList/totalPriceActions';
import { setCurrentTotalNumber } from '../redux/shoppingList/totalNumberActions';
import { setCurrentUser } from '../redux/user/userAction';

class ShoppingListCard extends React.Component {
    state = { tempProductNumber: this.props.product.productNumber };
    constructor(props) {
        super(props);
        this.onAddProductNumber = this.onAddProductNumber.bind(this);
        this.onMinusProductNumber = this.onMinusProductNumber.bind(this);
        this.onDeleteProductNumber = this.onDeleteProductNumber.bind(this);

    }
    onAddProductNumber() {
        this.state.tempProductNumber = this.state.tempProductNumber + 1;
        this.props.setCurrentTotalNumber(this.props.currentTotalNumber + 1);
        this.setState({ tempProductNumber: this.state.tempProductNumber });
        const editListNumber = async () => {
            const queryString = "http://localhost:5000/api/users/" + this.props.currentUser.id;

            await axios.patch(queryString,
                {
                    "productId": this.props.product.productId,
                    "productNumber": this.state.tempProductNumber,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "SameSite": "None"
                    }
                }).then((response) => {
                    console.log(response);
                    this.props.setCurrentTotalPrice(Math.round((this.props.currentTotalPrice + this.props.product.productPrice) * 100) / 100);
                })
                .catch((err) => console.log(err))
        };
        editListNumber();

    }
    onMinusProductNumber() {
        if (this.state.tempProductNumber > 1) {
            this.state.tempProductNumber = this.state.tempProductNumber - 1;
            this.props.setCurrentTotalNumber(this.props.currentTotalNumber - 1);
            this.setState({ tempProductNumber: this.state.tempProductNumber });
            const editListNumber = async () => {
                const queryString = "http://localhost:5000/api/users/" + this.props.currentUser.id;

                await axios.patch(queryString,
                    {
                        "productId": this.props.product.productId,
                        "productNumber": this.state.tempProductNumber,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Credentials": true,
                            "SameSite": "None"
                        }
                    }).then((response) => {
                        console.log(response);
                        this.props.setCurrentTotalPrice(Math.round((this.props.currentTotalPrice - this.props.product.productPrice) * 100) / 100);
                    })
                    .catch((err) => console.log(err))
            };
            editListNumber();
        }

    }
    onDeleteProductNumber() {
        this.props.setCurrentTotalPrice(Math.round((this.props.currentTotalPrice - this.props.product.productPrice * this.state.tempProductNumber) * 100) / 100);
        this.props.setCurrentTotalNumber(this.props.currentTotalNumber - this.state.tempProductNumber);
        this.state.tempProductNumber = 0;
        this.setState({ tempProductNumber: 0 });
        const editListNumber = async () => {
            const queryString = "http://localhost:5000/api/users/" + this.props.currentUser.id;

            await axios.patch(queryString,
                {
                    "productId": this.props.product.productId,
                    "productNumber": 0,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "SameSite": "None"
                    }
                }).then((response) => {
                    console.log(response);

                })
                .catch((err) => console.log(err))
        };
        editListNumber();


    }
    render() {
        return (
            <div>
                {this.state.tempProductNumber > 0 ? (
                    <div className="shoppingListCardContainer">
                        <div className="listProductPicture">
                            <img
                                src={this.props.product.productImage}
                                alt=""
                            />
                        </div>
                        <div className="listProductInfo">
                            <div className="productTitle">
                                {this.props.product.productName}
                            </div>
                            <div className="productPrice" style={{ color: 'rgb(5, 139, 5)' }}>
                                {this.props.product.productPrice}
                            </div>
                        </div>
                        <div className="listProductNumber">
                            <i style={{ cursor: 'pointer' }} className="minus circle large icon" onClick={this.onMinusProductNumber} />
                            <div style={{ fontSize: '17px' }}>{this.state.tempProductNumber}</div>
                            <i style={{ cursor: 'pointer' }} className="plus circle large icon" onClick={this.onAddProductNumber} />
                            <i className="trash alternate large icon" style={{ cursor: 'pointer', marginLeft: '30px' }} onClick={this.onDeleteProductNumber} />

                        </div>


                    </div>)
                    : (<span></span >)

                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        currentTotalPrice: state.totalPrice.currentTotalPrice,
        currentTotalNumber: state.totalNumber.currentTotalNumber
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => dispatch(setCurrentUser(user)),
        setCurrentTotalPrice: price => dispatch(setCurrentTotalPrice(price)),
        setCurrentTotalNumber: price => dispatch(setCurrentTotalNumber(price))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListCard);