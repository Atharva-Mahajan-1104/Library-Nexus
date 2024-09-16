import React from 'react';

import './App.css';
import { NavBar } from './Layout/HeaderandFooter/NavBar';
import { Footer } from './Layout/HeaderandFooter/Footer';
import { HomePage } from './Layout/HomePage/HomePage';
import { SearchBooksPage } from './Layout/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './Layout/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './Layout/BookCheckoutPage/ReviewListPage';
import { ShelfPage } from './Layout/ShelfPage/ShelfPage';
import { MessagesPage } from './Layout/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './Layout/ManageLibraryPage/ManageLibraryPage';

const oktaAuth = new OktaAuth(oktaConfig);
function App() {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };



  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <NavBar />

        <div className='flex-grow-1'>
          <Switch>

            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>
            <Route path='/home' >
              <HomePage />
            </Route>
            <Route path='/search'>
              <SearchBooksPage />
            </Route>
            <Route path='/reviewlist/:bookId'>
              <ReviewListPage />
            </Route>
            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>
            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path='/login/callback' component={LoginCallback} />
            
            <SecureRoute path='/shelf'>
              <ShelfPage />

            </SecureRoute  >
            <SecureRoute path='/messages'>
            <MessagesPage/>

            </SecureRoute>
            <SecureRoute path='/admin'><ManageLibraryPage/></SecureRoute>

          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  )
}

export default App;
