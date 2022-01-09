import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ShoppingListCard from '../components/ShoppingListCard';
import { setCurrentUser } from '../redux/user/userAction';

class ShoppingList extends React.Component {
    state = { shoppingList: [], currentUser: '' };
    tempUserId = ''
    componentDidMount() {
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
        };

    }

    render() {
        return (

            <div>
                {this.state.shoppingList.map((product) => {
                    return (
                        <ShoppingListCard key={product.productId} product={product} currentUser={this.state.currentUser} />

                    )
                })}
            </div>
        )


    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => dispatch(setCurrentUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);