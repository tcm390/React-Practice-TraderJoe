import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCurrentUser } from './redux/user/userAction';
import { setCurrentTotalNumber } from './redux/shoppingList/totalNumberActions';


import Header from './components/Header';
import ProductReviewPage from './pages/ProductReviewPage';
import Search from './pages/Search';
import Featured from './components/Featured';
import ProductModal from './components/ProductModal';
import ShoppingList from './pages/ShoppingList';
// import Login from './components/Login';



import './App.scss';




class App extends React.Component {




  componentDidMount() {
    const getUser = async () => {

      const { data } = await axios.get(process.env.REACT_APP_BACKEND_URL + "/auth/login/success",
        // const { data } = await axios.get("http://localhost:5000/auth/login/success",
        {
          withCredentials: true
        });
      this.props.setCurrentUser(data.user);
      //this.getList()

    };

    getUser();


  }

  render() {
    return (

      <BrowserRouter>
        <div className="home">

          <Header />
          {/* <Featured /> */}
          <ProductModal />
          <Switch>
            <Route path="/" exact component={ProductReviewPage} />
            <Route path="/s" exact component={Search} />
            <Route path="/sl" exact component={ShoppingList} />
            {/* <Route path="/uI" exact component={UploadImage} /> */}

            {/* <Route path="/login" exact component={this.props.currentUser ? HomePage : Login} />
          <Route path="/post/:id" exact component={this.props.currentUser ? Post : Login} /> */}

          </Switch>
        </div>

      </BrowserRouter >

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
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setCurrentTotalNumber: totalNumber => dispatch(setCurrentTotalNumber(totalNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);