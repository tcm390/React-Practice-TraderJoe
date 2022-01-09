import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/userAction';

import Header from './components/Header';
import ProductReviewPage from './pages/ProductReviewPage';
import Search from './pages/Search';
import Featured from './components/Featured';
import ProductModal from './components/ProductModal';
// import Login from './components/Login';

import './App.scss';




class App extends React.Component {


  componentDidMount() {

    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {

          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          this.props.setCurrentUser(resObject.user);

        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }
  render() {
    return (

      <BrowserRouter>
        <div className="home">
          <Header />
          <Featured />
          <ProductModal />
          <Switch>
            <Route path="/" exact component={ProductReviewPage} />
            <Route path="/s" exact component={Search} />

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
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);