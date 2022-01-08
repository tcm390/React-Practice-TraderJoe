import React from 'react';
import { connect } from 'react-redux';
import { setCurrentCategory } from '../redux/category/categoryActions';
import './CategoryButton.scss';


class CategoryButton extends React.Component {
    onClickCategory = () => {
        this.props.setCurrentCategory(this.props.name);
        //console.log(this.props.setCurrentCategory + this.props.currentCategory);
    }


    render() {
        return (
            <button className={`customerButton ${this.props.currentCategory === this.props.name ? 'active' : ''}`} style={{ borderRadius: 20 }}
                onClick={this.onClickCategory} > <span>{this.props.name}</span></button >
        )
    }

}
const mapStateToProps = (state) => {
    return {
        currentCategory: state.category.currentCategory
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentCategory: category => dispatch(setCurrentCategory(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton);