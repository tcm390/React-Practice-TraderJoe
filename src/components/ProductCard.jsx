// import { Link } from "react-router-dom";
import React from 'react';
import './ProductCard.scss';
import ProductModal from './ProductModal';
import { connect } from 'react-redux';
import axios from 'axios';


import { setCurrentSelectedProduct } from '../redux/choosingProduct/selectedProductActions';
import { setCurrentComment } from '../redux/comment/commentActions';
import { setCurrentTotalNumber } from '../redux/shoppingList/totalNumberActions';
class ProductCard extends React.Component {
    addToCartLoading = 0;
    commentProduct = () => {
        // console.log(this.props.currentComment);
        document.body.style.overflow = 'hidden';
        this.props.setCurrentComment(true);
        this.props.setCurrentSelectedProduct(this.props.product);

    }
    addToList = () => {
        // console.log(this.addToCartLoading);
        if (this.addToCartLoading === 1) {
            console.log('Already added');
        }
        if (this.props.currentUser && this.addToCartLoading === 0) {
            this.addToCartLoading = 1;
            // console.log(this.addToCartLoading);
            // console.log('shop', this.props.product.Title);
            const queryString = "http://localhost:5000/api/users/" + this.props.currentUser.id;

            const addList = async () => {

                await axios.post(queryString,
                    {
                        "userId": this.props.currentUser.id,
                        "productId": this.props.product.id,
                        "productName": this.props.product.Title,
                        "productImage": this.props.product.ImageUrl,
                        "productNumber": 1,
                        "productPrice": this.props.product.Price,
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Credentials": true,
                            "SameSite": "None"
                        }
                    }).then((response) => {

                        if (response.data === 'Product exist')
                            console.log(response.data);
                        else {
                            this.props.setCurrentTotalNumber(this.props.currentTotalNumber + 1);
                        }
                        this.addToCartLoading = 1;
                        // do something with the response
                    })
                    .catch((err) => console.log(err))


            };
            addList();

        }

    }
    render() {
        return (
            <div className="cardContainer" >
                <div style={{ overflow: 'hidden' }} class="ui card">
                    <div class="image" onClick={this.commentProduct}>
                        <img
                            style={{
                                height: '150px',
                                position: 'relative',
                                width: '100%',
                                objectFit: 'contain',
                                margin: '10px 0px'
                            }}
                            src={this.props.product.ImageUrl} alt=""
                        />
                    </div>
                    <div class="content" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} onClick={this.commentProduct}>
                        <div style={{ flex: '4' }} class="header">{this.props.product.Title}</div>
                        <div style={{ flex: '1' }} className="subDes">
                            <div className="leftSubDes">
                                <div className="left">
                                    {(Math.round((this.props.product.RatingScore / this.props.product.RatingUser * 1) * 10) / 10) * 2}

                                </div>
                                <div className="right">
                                    <div className="rightLeft">
                                        /10
                                    </div>
                                    <div className="rightRight">

                                        ({this.props.product.RatingUser} {this.props.product.RatingUser <= 1 ? ('rating') : ('ratings')})
                                    </div>
                                </div>

                            </div>
                            <div className="rightSubDes">$ {this.props.product.Price}</div>
                        </div>
                    </div>
                    <div class="ui two bottom attached buttons">
                        {this.props.currentUser ? (
                            <div class="ui icon button" onClick={this.addToList} >
                                <i class="add icon" onClick={this.addToList}></i>
                                Add
                            </div>
                        ) : (
                                <div class="ui icon button" data-tooltip="Please login to add">
                                    <i class="add icon" ></i>
                                    Add
                                </div>
                            )
                        }

                        <div style={{ backgroundColor: 'rgb(255, 2, 99)' }} class="ui primary button" onClick={this.commentProduct}>
                            <i class="thumbs up icon" onClick={this.commentProduct}></i>
                                Rate
                        </div>
                    </div>

                </div>

            </div>
        )
    }


}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentComment: comment => dispatch(setCurrentComment(comment)),
        setCurrentSelectedProduct: product => dispatch(setCurrentSelectedProduct(product)),
        setCurrentTotalNumber: totalNumber => dispatch(setCurrentTotalNumber(totalNumber))
    }
}
const mapStateToProps = (state) => {
    return {
        currentComment: state.comment.currentComment,
        currentUser: state.user.currentUser,
        currentTotalNumber: state.totalNumber.currentTotalNumber
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);