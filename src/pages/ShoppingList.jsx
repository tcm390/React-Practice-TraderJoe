import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ShoppingList extends React.Component {
    state = { shoppingList: [] };
    componentDidMount() {
        const getList = async () => {
            const { data } = await axios.get('http://localhost:5000/api/users/' + this.props.currentUser.id,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "SameSite": "None"
                    }
                });
            // console.log(data[0].shoppingList);
            this.setState({ shoppingList: data[0].shoppingList })
        };
        getList();
    }
    render() {
        return (

            <div>
                {this.state.shoppingList.map((product) => {
                    return (
                        <div>
                            <img
                                src={product.productImage}
                                alt=""
                                style={{ height: '100px', width: 'auto' }}
                            />
                            <div>{product.productName}</div>
                        </div>
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

export default connect(mapStateToProps)(ShoppingList);