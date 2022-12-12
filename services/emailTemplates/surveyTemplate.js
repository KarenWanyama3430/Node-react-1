module.exports = survey => {
  return `<body>
  <div style="text-align: center;">
    <h3>I'd like your input</h3>
    <p>Please answer the following question:</p>
    <p>${survey.body}</p>
    <div>
      <a href=${process.env.REDIRECT_DOMAIN}/api/surveys/${survey._id}/yes target="_blank">Yes</a>
    </div>
    <div>
      <a href=${process.env.REDIRECT_DOMAIN}/api/surveys/${survey._id}/no target="_blank">No</a>
    </div>
  </div>
</body>
`;
};
