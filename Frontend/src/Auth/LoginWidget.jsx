import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import OktaSignInWidget from './OktaSignInWidget';

// LoginWidget handles authentication using Okta
const LoginWidget = ({ config }) => {

    // Access Okta authentication instance and current auth state
    const { oktaAuth, authState } = useOktaAuth();

    // Called when authentication is successful
    const onSuccess = (tokens) => {
        // Redirect user after successful login
        oktaAuth.handleLoginRedirect(tokens);
    };

    // Called when an error occurs during sign-in
    const onError = (err) => {
        console.log('Sign in error: ', err);
    };

    // Show a loading spinner while auth state is being resolved
    if (!authState) {
        return (
            <SpinnerLoading/>
        );
    }

    // If user is authenticated, redirect to home page
    // Otherwise, display the Okta sign-in widget
    return authState.isAuthenticated
        ? <Redirect to={{ pathname: '/' }} />
        : <OktaSignInWidget
            config={config}
            onSuccess={onSuccess}
            onError={onError}
          />;
};

export default LoginWidget;
