const path = require("path");
const os = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
  // master process
  const n_cpus = os.cpus().length;
  console.log(`forking ${n_cpus} cpus`);
  for (let i = 0; i < n_cpus; i++) {
    cluster.fork();
  }
} else {
  // child process

  const express = require("express");
  const mongoose = require("mongoose");
  const cookieSession = require("cookie-session");
  const passport = require("passport");
  const bodyParser = require("body-parser");

  require("./services/passport");
  const authRouter = require("./routes/authRoutes");
  const billingRouter = require("./routes/billingRoutes");
  const surveyRouter = require("./routes/surveyRoutes");

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(bodyParser.json());
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(authRouter);
  app.use(billingRouter);
  app.use(surveyRouter);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
  }

  const mongooseConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      console.log("connected to the database");
    } catch (error) {
      console.log(error);
    }
  };
  mongooseConnect();
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
}
