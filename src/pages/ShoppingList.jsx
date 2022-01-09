import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShoppingListCard from '../components/ShoppingListCard';
import { setCurrentUser } from '../redux/user/userAction';
import { setCurrentTotalPrice } from '../redux/shoppingList/totalPriceActions';

class ShoppingList extends React.Component {
    state = { shoppingList: [], currentUser: '', sumPrice: 0 };
    tempUserId = ''
    componentDidMount() {
        this.props.setCurrentTotalPrice(0);
        const getUser = () => {
            fetch("http://localhost:5000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {

                    if (response.status === 200) return response.json();
                    throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                    this.props.setCurrentUser(resObject.user);
                    this.tempUserId = resObject.user.id;
                    this.setState({ currentUser: resObject.user })
                    getList(this.tempUserId);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
        const getList = async (userId) => {
            const queryString = 'http://localhost:5000/api/users/' + userId;
            const { data } = await axios.get('http://localhost:5000/api/users/' + userId,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "SameSite": "None"
                    }
                });
            this.setState({ shoppingList: data[0].shoppingList })
            this.state.shoppingList.map((product) => {
                // this.state.sumPrice += product.productPrice * product.productNumber;
                // console.log(this.state.sumPrice);
                this.props.setCurrentTotalPrice(Math.round((this.props.currentTotalPrice + product.productPrice * product.productNumber) * 100) / 100);
            })

        };

    }

    render() {
        return (

            <div>
                {
                    this.state.shoppingList.map((product) => {
                        // this.state.sumPrice += product.productPrice * product.productNumber;
                        // console.log(this.state.sumPrice);
                        return (
                            <ShoppingListCard key={product.productId} product={product} currentUser={this.state.currentUser} />

                        )
                    })
                }
                {this.props.currentTotalPrice}
            </div>
        )


    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        currentTotalPrice: state.totalPrice.currentTotalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => dispatch(setCurrentUser(user)),
        setCurrentTotalPrice: price => dispatch(setCurrentTotalPrice(price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);