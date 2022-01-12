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
        const getUser = async () => {
            console.log();
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/auth/login/success",
                // const { data } = await axios.get("http://localhost:5000/auth/login/success",
                {
                    withCredentials: true
                });
            this.props.setCurrentUser(data.user);
            this.tempUserId = data.user.id;
            this.setState({ currentUser: data.user })
            getList(this.tempUserId);

        };

        getUser();
        const getList = async (userId) => {
            const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/users/' + userId,
                // const { data } = await axios.get('http://localhost:5000/api/users/' + userId,
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

            <div style={{ marginTop: '10%', textAlign: 'center' }}>
                <h1 >Shopping List</h1>
                <hr style={{ width: '50%' }}></hr>
                {
                    this.state.shoppingList.map((product) => {
                        // this.state.sumPrice += product.productPrice * product.productNumber;
                        // console.log(this.state.sumPrice);
                        return (
                            <div>

                                <ShoppingListCard key={product.productId} product={product} currentUser={this.state.currentUser} />

                            </div>

                        )
                    })
                }
                <hr style={{ width: '50%' }}></hr>
                <h2 style={{ marginBottom: '100px', marginLeft: '25%' }}>Subtotal: ${this.props.currentTotalPrice}</h2>
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