import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { setCurrentMainCategory } from '../redux/category/mainCategoryActions';
import { setCurrentCategory } from '../redux/category/categoryActions';
import { setCurrentTerm } from '../redux/searchTerm/termActions';
import { setCurrentSearchButton } from '../redux/searchButton/searchButtonActions';
import CategoryMenu from '../components/CategoryMenu';
import './ProductReviewPage.scss';
import ProductCard from '../components/ProductCard';
import List from '../components/List';
import CustomerWinner from '../components/CustomerWinner';
import NewsBar from '../components/NewsBar';


class ProductReviewPage extends React.Component {

    state = { productList: [], currentIndex: 20 };
    componentDidMount() {
        this.props.setCurrentCategory('All');
        this.props.setCurrentMainCategory('All');
        const getProduct = async () => {
            const { data } = await axios.get('http://localhost:5000/api/products/',
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "SameSite": "None"
                    }
                });
            this.sortProductList(data);
            this.setState({ currentIndex: 20 });
        };
        getProduct();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentMainCategory != this.props.currentMainCategory
            || prevProps.currentCategory != this.props.currentCategory
            || prevProps.currentOrder != this.props.currentOrder
        ) {
            //console.log('update');
            let queryString = 'http://localhost:5000/api/products/';
            if (this.props.currentMainCategory !== 'All') {
                queryString += 'category/' + this.props.currentMainCategory;
                if (this.props.currentCategory !== 'All')
                    queryString += '/' + this.props.currentCategory;
                //console.log(queryString);
            }
            const getProduct = async () => {
                const { data } = await axios.get(queryString,
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Credentials": true,
                            "SameSite": "None"
                        }
                    });

                this.sortProductList(data);
                this.setState({ currentIndex: 20 });
            };
            getProduct();

        }

    }
    sortProductList(data) {
        if (this.props.currentOrder === "Customer Review")
            this.setState({ productList: this.sortListByRating(data.products) });
        if (this.props.currentOrder === "Price: Low to High")
            this.setState({ productList: this.sortListByPriceL(data.products) });
        if (this.props.currentOrder === "Price: High to Low")
            this.setState({ productList: this.sortListByPriceH(data.products) });
        if (this.props.currentOrder === "Alphabetical: A to Z")
            this.setState({ productList: this.sortListByAlphA(data.products) });
        if (this.props.currentOrder === "Alphabetical: Z to A")
            this.setState({ productList: this.sortListByAlphZ(data.products) });
    }
    sortListByRating(unorderedList) {
        const temp = unorderedList;
        return temp.sort((a, b) => (a.RatingScore / (a.RatingUser + 0.000001) < b.RatingScore / (b.RatingUser + 0.000001)) ? 1 : -1)

    }
    sortListByAlphA(unorderedList) {
        const temp = unorderedList;
        return temp.sort((a, b) => (a.Title > b.Title) ? 1 : -1)

    }
    sortListByAlphZ(unorderedList) {
        const temp = unorderedList;
        return temp.sort((a, b) => (a.Title < b.Title) ? 1 : -1)

    }
    sortListByPriceH(unorderedList) {
        const temp = unorderedList;
        return temp.sort((a, b) => (a.Price < b.Price) ? 1 : -1)

    }
    sortListByPriceL(unorderedList) {
        const temp = unorderedList;
        return temp.sort((a, b) => (a.Price > b.Price) ? 1 : -1)

    }

    render() {

        return (
            <div>
                <NewsBar />
                {/* <CustomerWinner /> */}
                <List />
                <CategoryMenu />
                <div className="productContainer">

                    {

                        this.state.productList
                            .filter((item, index) => {
                                return (index < this.state.currentIndex)
                            })
                            .map(product => {

                                return product.Price > 0 ? (<ProductCard key={product.id} product={product} />) : (null)
                            }

                            )
                    }

                </div >
                {/* <div>
                    {this.state.productList.map((item) => {
                        return ('{"productId":' + '"' + item.id + '","comments":[{"date":"12/12","userName":"null","userRating":5,"userId":"null","userImage":"https://","comments":"good"}]},');
                    })}
                </div> */}
                {
                    this.state.currentIndex < this.state.productList.length ? (
                        <button
                            style={{ display: 'block', backgroundColor: 'black', borderRadius: '30px', color: 'white', marginTop: '10px', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto', padding: '10px 10px', cursor: 'pointer' }}
                            onClick={() => (
                                this.setState({ currentIndex: this.state.currentIndex + 20 })
                            )}>Load More</button>) : (<span></span>)
                }

            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentMainCategory: state.mainCategory.currentMainCategory,
        currentCategory: state.category.currentCategory,
        currentOrder: state.order.currentOrder,
        currentTerm: state.term.currentTerm,
        currentSearchButton: state.searchButton.currentSearchButton,
        currentComment: state.comment.currentComment
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentMainCategory: mainCategory => dispatch(setCurrentMainCategory(mainCategory)),
        setCurrentCategory: category => dispatch(setCurrentCategory(category)),
        setCurrentTerm: term => dispatch(setCurrentTerm(term)),
        setCurrentSearchButton: searchButton => dispatch(setCurrentSearchButton(searchButton))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewPage);