import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { handleToken } from "../redux/actions";
import { connect } from "react-redux";

export class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 dollars for 5 emails"
        amount={500}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_PUBLIC}
      >
        <button className="btn">Add Credit</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, { handleToken })(Payments);
