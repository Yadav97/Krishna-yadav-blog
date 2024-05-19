const mongoose = require("mongoose");
const blogposts = require("./models/blogpost")


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/krishna-yadav-blog');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

blogposts.create({
    title:"this is first post",
    body:"hey guys this is first post i am writing to chekc my blog",
    id:20
})

