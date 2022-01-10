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
  // state = { shoppingListLength: 0 };
  getList = async () => {
    const { data } = await axios.get('https://traderjoesapi-wacky-tiger-ir.mybluemix.net/api/users/' + this.props.currentUser.id,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
          "SameSite": "None"
        }
      });
    let tempTotalNumber = 0;
    data[0].shoppingList.map((product) => {
      tempTotalNumber += product.productNumber;
    })
    // console.log(tempTotalNumber);
    this.props.setCurrentTotalNumber(tempTotalNumber);

  };

  componentDidMount() {
    const getUser = async () => {
      console.log('hihihifirst');
      const { data } = await axios.get("https://traderjoesapi-wacky-tiger-ir.mybluemix.net/auth/login/success",
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
          }
        });
      console.log('hihihi' + data);
      this.props.setCurrentUser(data.user);
      // console.log(resObject.user.id, this.props.currentUser.id);
      this.getList()

    };
    // const getUser = () => {
    //   fetch("https://traderjoesapi-wacky-tiger-ir.mybluemix.net/auth/login/success", {
    //     method: "GET",
    //     withCredentials: true,
    //     credentials: 'include',
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Credentials": true,
    //     },
    //   })
    //     .then((response) => {

    //       if (response.status === 200) return response.json();
    //       throw new Error("authentication has been failed!");
    //     })
    //     .then((resObject) => {
    //       this.props.setCurrentUser(resObject.user);
    //       // console.log(resObject.user.id, this.props.currentUser.id);
    //       this.getList()
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
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