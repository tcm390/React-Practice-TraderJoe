import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { setCurrentMainCategory } from '../redux/category/mainCategoryActions';
import { setCurrentCategory } from '../redux/category/categoryActions';
import { setCurrentTerm } from '../redux/searchTerm/termActions';
import { setCurrentSearchButton } from '../redux/searchButton/searchButtonActions';
import { categoryDatas } from '../CategoryData';
import './CategoryMenu.scss';
import CategoryButton from './CategoryButton';
import SortedButton from './SortedButton';
import ProductCard from './ProductCard';


class CategoryMenu extends React.Component {



    render() {

        return (
            <div>
                <div className="uisegment">
                    <div className="ui container">
                        <div className="ui tabular white menu compact" >
                            <a className={`item ${'All' === this.props.currentMainCategory ? 'active' : ''}`} onClick={() => { this.props.setCurrentMainCategory('All'); }}>
                                All
                            </a>
                            {categoryDatas.map(data =>
                                (<a key={data.category1} className={`item ${data.category1 === this.props.currentMainCategory ? 'active' : ''}`} onClick={() => {
                                    this.props.setCurrentCategory('All');
                                    this.props.setCurrentMainCategory(data.category1);
                                }}>
                                    {data.category1}
                                </a>)
                            )}
                            <div className="right menu">
                                <div className="item">
                                    <div className="ui transparent icon input">
                                        <input type="text" placeholder="Search items..." onChange={(e) => this.props.setCurrentTerm(e.target.value)} />
                                        <Link className="link" to="/s">
                                            <i className="search link icon" onClick={(e) => { this.props.setCurrentSearchButton(!this.props.currentSearchButton) }}></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ul className="selectedOption">
                            <li className="selectedWrapper">
                                <div>
                                    <label className="optionLabel">Category</label>
                                </div>
                                <div className="buttonWrapper">
                                    <CategoryButton name="All" />
                                    {categoryDatas.map(datas => {
                                        if (datas.category1 === this.props.currentMainCategory)
                                            return datas.category2.map(data => (<CategoryButton key={data.name} name={data.name} />))
                                    })}
                                </div>
                            </li>
                            <li className="selectedWrapper">
                                <div>
                                    <label className="optionLabel">Sort by</label>
                                </div>
                                <div className="buttonWrapper">
                                    <SortedButton name="Customer Review" />
                                    <SortedButton name="Price: Low to High" />
                                    <SortedButton name="Price: High to Low" />
                                    <SortedButton name="Alphabetical: A to Z" />
                                    <SortedButton name="Alphabetical: Z to A" />
                                </div>

                            </li>
                        </ul>

                    </div>

                </div>


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
        currentSearchButton: state.searchButton.currentSearchButton
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);