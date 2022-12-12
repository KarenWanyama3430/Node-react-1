const { URL } = require("url");
const os = require("os");

const route = require("express").Router();
const Path = require("path-parser");
const _ = require("lodash");

const Mailer = require("../services/Mailer");
const Survey = require("../models/Survey");
const auth = require("../middlewares/authCheck");
const credits = require("../middlewares/creditsCheck");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

route.post("/api/surveys", auth, credits, async (req, res) => {
  try {
    const { title, subject, body, emails } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: emails.split(",").map(email => ({ email: email.trim() })),
      _user: req.user._id,
      dateSent: Date.now()
    });
    clearHash(req.user._id);
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
    req.user.credits -= 1;
    const user = await req.user.save();
    await survey.save();
    res.send(user);
  } catch (error) {
    res.status(422).send(error);
  }
});

route.get("/api/surveys", auth, async (req, res) => {
  try {
    const surveys = await Survey.find({ _user: req.user._id })
      .select({
        recipients: false
      })
      .sort({ dateSent: -1 });
    res.send({ surveys, cpus: os.cpus().length });
  } catch (error) {
    res.status(401).send(error);
  }
});

route.get("/api/surveys/thanks", (req, res) =>
  res.send("thanks for the feedback")
);
route.get("/api/surveys/:surveyId/:choice", (req, res) =>
  res.send("thanks for the feedback")
);

route.post("/api/surveys/webhooks", (req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice");
  const events = req.body.map(event => {
    const match = p.test(new URL(event.url).pathname);
    if (match) return { email: event.email, ...match };
  });
  const newEvents = events.filter(event => event !== undefined);
  const uniqueEvents = _.uniqBy(newEvents, "email", "surveyId");
  uniqueEvents.forEach(async ({ surveyId, choice, email }) => {
    await Survey.findOneAndUpdate(
      {
        _id: surveyId,
        recipients: { $elemMatch: { email, responded: false } }
      },
      {
        $inc: { [choice]: 1 },
        $set: { "recipients.$.responded": true },
        lastResponded: new Date()
      }
    );
  });
});

module.exports = route;
