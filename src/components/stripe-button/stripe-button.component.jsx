import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
const priceForStripe = price * 100;
const publishableKey = 'pk_test_51HVNEmB8i62wBaHHTIMiKJZASzFpkLtLHBMLU8AjcycVZfUTmtGN3M43NkmbWItae76tCz8aXsXW1YGlEwQBvKQ800adFvWED0';

const onToken = token => {
    console.log(token);
    alert('Payment Successful');
}

return (
    <StripeCheckout 
    label='Pay Now'
    name='CRWN Clothing Ltd'
    billingAddress
    shippingAddress
    image="https://sendeyo.com/up/d/f3eb2117da"
    description={`Your price value is ${price}`}
    amount={priceForStripe}
    panelLabel='Pay Now'
    token={onToken}
    stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;