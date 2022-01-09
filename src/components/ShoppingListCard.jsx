import React from 'react';
import './ShoppingListCard.scss';
import axios from 'axios';
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
                })
                .catch((err) => console.log(err))
        };
        editListNumber();

    }
    onMinusProductNumber() {
        if (this.state.tempProductNumber > 1) {
            this.state.tempProductNumber = this.state.tempProductNumber - 1;
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
                    })
                    .catch((err) => console.log(err))
            };
            editListNumber();
        }

    }
    onDeleteProductNumber() {

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
                            <div className="productPrice">
                                {this.props.product.productPrice}
                            </div>
                        </div>
                        <div className="listProductNumber">
                            <i className="minus circle icon" onClick={this.onMinusProductNumber} />
                            <div>{this.state.tempProductNumber}</div>
                            <i className="plus circle icon" onClick={this.onAddProductNumber} />
                            <i className="trash alternate large icon" style={{ cursor: 'pointer', marginLeft: '30px' }} onClick={this.onDeleteProductNumber} />

                        </div>

                    </div>)
                    : (<span></span >)

                }
            </div>
        )
    }
}
export default ShoppingListCard;