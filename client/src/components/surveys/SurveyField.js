import React from "react";

const SurveyField = ({ input, label, meta }) => {
  return (
    <div>
      <label>
        <h5>
          <strong>{label}</strong>
        </h5>
      </label>
      <input type="text" {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        <strong>{meta.touched && meta.error}</strong>
      </div>
    </div>
  );
};

export default SurveyField;
