import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link, withRouter } from "react-router-dom";
import validator from "validator";

export class SurveyForm extends Component {
  onFormSubmit = values => {
    this.props.history.push("/surveys/new/review");
  };
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
          <Field
            component={SurveyField}
            type="text"
            name="title"
            label="Survey Title"
          />
          <Field
            component={SurveyField}
            type="text"
            name="subject"
            label="Subject Line"
          />
          <Field
            component={SurveyField}
            type="text"
            name="body"
            label="Email Body"
          />
          <Field
            component={SurveyField}
            type="text"
            name="emails"
            label="Recipient List"
          />
          <Link to="/surveys" className="red btn-flat left white-text">
            <i className="material-icons left">close</i>
            cancel
          </Link>
          <Link
            to="/surveys/new/review"
            type="submit"
            className={
              this.props.valid
                ? "teal btn-flat right white-text"
                : "teal btn-flat right white-text disabled"
            }
          >
            Next
            <i className="material-icons right">done</i>
          </Link>
        </form>
      </div>
    );
  }
}

const validate = values => {
  let errors = {};
  if (!values.body || (values.body && !values.body.trim())) {
    errors.body = "You must provide the body of the survey";
  }
  if (!values.subject || (values.subject && !values.subject.trim())) {
    errors.subject = "You must provide the subject of the survey";
  }
  if (!values.title || (values.title && !values.title.trim())) {
    errors.title = "You must provide the title of the survey";
  }
  if (!values.emails || (values.emails && !values.emails.trim())) {
    errors.emails = "You must provide the emails";
  }
  if (values.emails) {
    const isEmail = values.emails
      .split(",")
      .map(email => validator.isEmail(email.trim()));
    if (isEmail.includes(false)) {
      errors.emails = "Please enter valid emails seperated by commas";
    }
  }
  return errors;
};

export default withRouter(
  reduxForm({
    validate,
    form: "SurveyForm",
    destroyOnUnmount: false
  })(SurveyForm)
);
