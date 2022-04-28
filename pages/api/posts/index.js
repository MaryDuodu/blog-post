import dbConnect from "../../../libs/dbConnect";
import Post from "../../../models/post.model";

export default async function handler(req, res) {
  await dbConnect();
  // const posts = await Post.find({});
  // if(!posts) return res.status(404).json({msg: "Posts not found"});
  // res.status(200).json(posts);

  if (req.method === "GET") {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const post = await Post.create(req.body);
    res.status(201).json(post);
    // console.log(req.body);
    // res.status(201).json({msg: "POST"});
  } else {
    res
      .status(405)
      .json({ error: "METHOD not allowed. only GET and POST is allowed" });
  }
}
