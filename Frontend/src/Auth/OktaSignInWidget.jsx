import { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from '../lib/oktaConfig';

// OktaSignInWidget renders the Okta hosted sign-in experience
const OktaSignInWidget = ({ onSuccess, onError }) => {

    // Reference to the DOM element where Okta widget will be mounted
    const widgetRef = useRef();

    useEffect(() => {

        // Ensure the DOM reference exists before initializing the widget
        if (!widgetRef.current) {
            return false;
        }

        // Create a new instance of the Okta Sign-In widget
        const widget = new OktaSignIn(oktaConfig);

        // Render the widget and handle token retrieval
        widget.showSignInToGetTokens({
            el: widgetRef.current,
        })
        .then(onSuccess)   // Handle successful authentication
        .catch(onError);   // Handle authentication errors

        // Cleanup: remove the widget when the component unmounts
        return () => widget.remove();

    }, [onSuccess, onError]);

    return (
        <div className='container mt-5 mb-5'>
            {/* Container where the Okta Sign-In widget is rendered */}
            <div ref={widgetRef}></div>
        </div>
    );
};

export default OktaSignInWidget;
