import React, { useState } from "react";
import './ProductModal.scss';
import { connect } from 'react-redux';

import { setCurrentComment } from '../redux/comment/commentActions';

import Modal from "react-modal";
import StarRating from './StarRating';
import axios from 'axios';

Modal.setAppElement("#root");

class ProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.onSubmitRating = this.onSubmitRating.bind(this);
        this.onCommentFormChange = this.onCommentFormChange.bind(this);
        this.callbackStar = React.createRef();
    }

    state = { commentList: null, currentRatingComment: '' };


    componentDidUpdate(prevProps, prevState) {

        if (prevProps.currentComment != this.props.currentComment
            && this.props.currentComment === true) {

            const queryString = "http://localhost:3001/api/productComments/" + this.props.currentSelectedProduct.id;
            const getComment = async () => {
                const { data } = await axios.get(queryString,
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Credentials": true,
                            "SameSite": "None"
                        }
                    });

                this.setState({ commentList: data.comments[0].comments });
                this.callbackStar.current.setState({ currentStar: 5 });
                this.setState({ currentRatingComment: '' });
                if (this.props.currentUser) {
                    for (let i = 0; i < this.state.commentList.length; i++) {
                        if (this.state.commentList[i].userId === this.props.currentUser.id) {
                            this.setState({ currentRatingComment: this.state.commentList[i].comments });
                            this.callbackStar.current.setState({ currentStar: this.state.commentList[i].userRating });
                            // console.log(this.callbackStar.current.state.currentStar);
                            break;
                        }
                    }
                }
                // console.log(this.state.currentRatingComment);
            };
            getComment();

        }
    }

    onCommentFormChange(e) {
        this.setState({ currentRatingComment: e.target.value });
    }
    onSubmitRating() {
        const queryString = "http://localhost:3001/api/productComments/" + this.props.currentSelectedProduct.id;
        const currentCallbackStar = this.callbackStar.current.state.currentStar;
        var rightNow = new Date();
        var res = rightNow.toISOString().slice(0, 10).replace(/-/g, "/");


        const postComment = async () => {
            const { data } = await axios.patch(queryString,
                {
                    "date": res,
                    "userName": this.props.currentUser.displayName ? (
                        this.props.currentUser.displayName) : (this.props.currentUser.username),
                    "userRating": currentCallbackStar,
                    "userId": this.props.currentUser.id,
                    "userImage": this.props.currentUser.photos[0].value,
                    "comments": this.state.currentRatingComment,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "SameSite": "None"
                    }
                });

            this.setState({ commentList: data.productComment[0].comments });


        };
        postComment();


    }
    toggleModal() {

        this.props.setCurrentComment(false);
        document.body.style.overflow = 'unset';
        // console.log(this.props.currentComment);
        // console.log(this.props.currentSelectedProduct);

    }

    render() {

        return (

            <div className="ProductModal">
                {this.props.currentSelectedProduct && this.state.commentList ? (
                    <Modal
                        isOpen={this.props.currentComment}
                        onRequestClose={this.toggleModal}
                        contentLabel="My dialog"
                        className="mymodal"
                        overlayClassName="myoverlay"
                        closeTimeoutMS={500}
                    >
                        <i style={{ cursor: "pointer" }} className="close big icon" onClick={this.toggleModal} />
                        <div className="profile">
                            <div className="profilePicture">
                                <img

                                    src={this.props.currentSelectedProduct.ImageUrl}
                                    alt=""
                                />
                                <div className="rightSubDes">
                                    <i className="star yellow big icon" />
                                    <div className="left">
                                        {(Math.round((this.props.currentSelectedProduct.RatingScore / this.props.currentSelectedProduct.RatingUser * 1) * 10) / 10) * 2}
                                    </div>
                                    <div className="right">/10</div>

                                </div>
                            </div>

                            <div className="profileTitle">
                                <h1>{this.props.currentSelectedProduct.Title}</h1>
                                <hr></hr>
                            </div>
                            <div className="profilePrice">
                                <h4>${this.props.currentSelectedProduct.Price}</h4>
                                <hr></hr>
                            </div>
                            <div className="profileDescription">
                                {this.props.currentSelectedProduct.Description}
                            </div>

                        </div>

                        <div className="comment">



                            <form class="ui reply form" >

                                <StarRating ref={this.callbackStar} />
                                <div class="field">
                                    <textarea placeholder="Optional..." onChange={this.onCommentFormChange} value={this.state.currentRatingComment}></textarea>
                                </div>
                                {this.props.currentUser ? (
                                    <div style={{ backgroundColor: "rgb(255, 2, 99)" }} class="ui blue labeled submit icon button" onClick={this.onSubmitRating}>
                                        <i class="icon edit"></i> Add Reply
                                    </div>) : (
                                        <div class="ui yellow message">You must login before you can rate this!
                                        Visit our Login page, then try again. Thank you!</div>
                                    )}

                            </form>
                            <div style={{ marginTop: '40px' }}>
                                Comments({this.state.commentList.length})
                                <hr />
                            </div>
                            <div >
                                {this.state.commentList.map((comment) => {
                                    return (
                                        <div key={comment.id} class="ui  comments">
                                            <div class="comment">
                                                <a class="avatar">
                                                    <img src={comment.userImage} />
                                                </a>
                                                <div class="content">
                                                    <a class="author">{comment.userName}</a>
                                                    <div class="metadata">
                                                        <div class="date">{comment.date}</div>
                                                    </div>
                                                    <div className="commentsStar">
                                                        <i class="star yellow icon" />
                                                        {comment.userRating >= 2 ? (<i class="star yellow icon" />) : (<i class="star grey icon" />)}
                                                        {comment.userRating >= 3 ? (<i class="star yellow icon" />) : (<i class="star grey icon" />)}
                                                        {comment.userRating >= 4 ? (<i class="star yellow icon" />) : (<i class="star grey icon" />)}
                                                        {comment.userRating >= 5 ? (<i class="star yellow icon" />) : (<i class="star grey icon" />)}
                                                    </div>
                                                    <div style={{ fontWeight: 'initial' }} class="text">
                                                        {comment.comments}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>


                        </div>



                    </Modal>
                ) : (<span></span>)
                }

            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentComment: comment => dispatch(setCurrentComment(comment))
    }
}
const mapStateToProps = (state) => {
    return {
        currentComment: state.comment.currentComment,
        currentSelectedProduct: state.selectedProduct.currentSelectedProduct,
        currentUser: state.user.currentUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);