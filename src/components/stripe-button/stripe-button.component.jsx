import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KJIIfI5byBeZLvbLRN9ZFCvqMJp2XvZT7qxKhtSeLdvbP2LiMReqAV8m20ssgATUFzNioqkFBESQGxuFBDqo0SH00NO13ied5';

  const onToken = token => {
    console.log(token);
    alert('Payement Successful')
  }

  return (
    <StripeCheckout
      label='Pay now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;