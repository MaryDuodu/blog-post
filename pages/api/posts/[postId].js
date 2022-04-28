import dbConnect from "../../../libs/dbConnect";
import Post from "../../../models/post.model";

export default async function handlers(req, res) {
  await dbConnect();
  const { method, body, query } = req;

  if (method === "GET") {
    const post = await Post.findById(query.postId);
    if (!post) {
      res.status(404).json({ error: "Post Not Found" });
    }
    res.status(200).json({ post });
  } else if (method === "PATCH") {
    let post = await Post.findById(query.postId);
    if (!post) {
      res.status(404).json({ error: "Post Not Found" });
    }

    post = await Post.findByIdAndUpdate(query.postId, body, { new: true });
    res.status(200).json({ post });
  } else if (method === "DELETE") {
    let post = await Post.findById(query.postId);
    if (!post) {
      res.status(404).json({ error: "Post Not Found" });
    }

    await Post.findByIdAndDelete(query.postId);
    res.status(200).json({ msg: "Post deleted successfully" });
  }
}
