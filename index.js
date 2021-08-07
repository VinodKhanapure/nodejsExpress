var app = require("./app");

//  var postRoutes = require('./routes/posts')

//  var userRoutes = require('./routes/user')

var mongoose = require("mongoose");
// const Post = require("./model/post");

mongoose.connect(
  "mongodb+srv://VK:"+ process.env.MONGO_ATLAS_PW + "@cluster0.bifoa.mongodb.net/Angular_Node?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//  app.use("api/posts",postRoutes,)
//  app.use("api/user",userRoutes)

app.listen(port, () => {
  console.log(`Server listening on the  port::${port} `);
});
