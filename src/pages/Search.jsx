import React from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { connect } from 'react-redux';


class Search extends React.Component {

    state = { productList: [], currentIndex: 20 };
    componentDidMount() {
        const getSearch = async () => {
            const { data } = await axios.get('https://traderjoesapi-wacky-tiger-ir.mybluemix.net/api/products/search/' + this.props.currentTerm,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": true,
                        "SameSite": "None"
                    }
                });

            this.setState({ productList: data.products });
        };
        getSearch();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentSearchButton != this.props.currentSearchButton) {
            const getSearch = async () => {
                const { data } = await axios.get('https://traderjoesapi-wacky-tiger-ir.mybluemix.net/api/products/search/' + this.props.currentTerm,
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Credentials": true,
                            "SameSite": "None"
                        }
                    });

                this.setState({ productList: data.products });
            };
            getSearch();
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <h1 style={{ textAlign: 'center' }}>{this.state.productList.length} results for "{this.props.currentTerm}"</h1>
                <br></br>
                <div className="productContainer">

                    {

                        this.state.productList
                            .filter((item, index) => {
                                return (index < this.state.currentIndex)
                            })
                            .map(product =>
                                (<ProductCard key={product.id} product={product} />)
                            )
                    }
                </div >
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
        currentTerm: state.term.currentTerm,
        currentSearchButton: state.searchButton.currentSearchButton
    }
}
export default connect(mapStateToProps)(Search);
