// import { Link } from "react-router-dom";
import React from 'react';
import './ProductCard.scss';
import ProductModal from './ProductModal';
import { connect } from 'react-redux';


import { setCurrentSelectedProduct } from '../redux/choosingProduct/selectedProductActions';
import { setCurrentComment } from '../redux/comment/commentActions';

class ProductCard extends React.Component {

    commentProduct = () => {
        // console.log(this.props.currentComment);
        document.body.style.overflow = 'hidden';
        this.props.setCurrentComment(true);
        this.props.setCurrentSelectedProduct(this.props.product);

    }
    addToList = () => {
        console.log('shop')

    }
    render() {
        return (
            <div style={{ width: '23%' }}>
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
                                <div className="left">{this.props.product.RatingScore / this.props.product.RatingUser}</div>
                                <div className="right">/10</div>

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

            // <div className="card"  >

            //     <img src={this.props.product.ImageUrl} alt="" className="img" onClick={this.commentProduct} />
            //     <vr
            //         style={{
            //             color: 'black',
            //             backgroundColor: 'black',
            //             height: 1
            //         }}
            //     />
            //     <div className="title">{this.props.product.Title}</div>
            //     <div className="des">

            //         <div className="subDes">
            //             <div className="leftSubDes">
            //                 <div className="left">6.6</div>
            //                 <div className="right">/10</div>

            //             </div>
            //             <div className="rightSubDes">$ {this.props.product.Price}</div>
            //         </div>
            //     </div>


            //     <div className="addToCartList" onClick={this.addToList}>
            //         <i style={{ margin: '10px', color: '#ffffff' }} className="star small icon">
            //         </i>
            //         <div className="addToCartListText">Add To Shopping List</div>
            //     </div>


            // </div >





        )
    }


}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentComment: comment => dispatch(setCurrentComment(comment)),
        setCurrentSelectedProduct: product => dispatch(setCurrentSelectedProduct(product))
    }
}
const mapStateToProps = (state) => {
    return {
        currentComment: state.comment.currentComment,
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);