import React from 'react';
import './App.css';
import HomePage from './components/pages/homepage/homepage.component';
import CheckoutPage from './components/pages/checkout/checkout.component';

import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from '../src/components/pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import { connect } from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';

class App extends React.Component {
  componentDidMount() {


    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

         userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
     this.props.setCurrentUser(userAuth)
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
  return (
    <div>
      <Header/>
      <Switch>
        
     <Route exact path='/' component={HomePage} />
     <Route path='/shop' component={ShopPage} />
     <Route exact path='/checkout' component={CheckoutPage} />
     <Route exact path='/signin' render={() =>
       this.props.cureentUser ? (<Redirect to='/' />) : (<SignInAndSignUp/>)}/>
     </Switch>
    </div>
  );
}
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
    
 const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
 })

export default connect(
  mapStateToProps,
   mapDispatchToProps)(App);