import React from 'react';
import { connect } from 'react-redux';
import { setCurrentOrder } from '../redux/order/orderActions';

class SortedButton extends React.Component {
    onClickCategory = () => {
        this.props.setCurrentOrder(this.props.name);
        //console.log(this.props.setCurrentCategory + this.props.currentCategory);
    }


    render() {
        return (
            <button className={`customerButton ${this.props.currentOrder === this.props.name ? 'active' : ''}`} style={{ borderRadius: 20 }}
                onClick={this.onClickCategory} > {this.props.name}</button >
        )
    }

}
const mapStateToProps = (state) => {
    return {
        currentOrder: state.order.currentOrder
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCurrentOrder: order => dispatch(setCurrentOrder(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortedButton);