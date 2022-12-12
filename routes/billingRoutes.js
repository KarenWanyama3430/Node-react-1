const route = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE);
const auth = require("../middlewares/authCheck");

route.post("/api/stripe", auth, async (req, res) => {
  try {
    await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 dollars for 5 credits",
      source: req.body.id
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
