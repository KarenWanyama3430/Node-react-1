import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export class Landing extends Component {
  render() {
    if (this.props.loggedIn) return <Redirect to="/surveys" />;
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Emaily!</h1>
        <p>collect info from your users</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps)(Landing);
