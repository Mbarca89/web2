import User from "./User.js"
import Post from "./Post.js"
import PostImage from "./PostImage.js"
import Tag from "./Tag.js"
import PostTag from "./PostTag.js"
import PostLike from "./PostLike.js"
import PostRating from "./PostRating.js"
import PostComment from "./PostComment.js"

User.hasMany(Post, {
  foreignKey: "user_id",
})

Post.belongsTo(User, {
  foreignKey: "user_id",
})

Post.hasMany(PostImage, {
  foreignKey: "post_id",
})

PostImage.belongsTo(Post, {
  foreignKey: "post_id",
})

Post.belongsToMany(Tag, {
  through: PostTag,
  foreignKey: "post_id",
  otherKey: "tag_id",
})

Tag.belongsToMany(Post, {
  through: PostTag,
  foreignKey: "tag_id",
  otherKey: "post_id",
})

Post.hasMany(PostLike, {
  foreignKey: "post_id"
})

PostLike.belongsTo(Post, {
  foreignKey: "post_id"
})

User.hasMany(PostLike, {
  foreignKey: "user_id"
})

PostLike.belongsTo(User, {
  foreignKey: "user_id"
})

Post.hasMany(PostRating, {
  foreignKey: "post_id"
})

PostRating.belongsTo(Post, {
  foreignKey: "post_id"
})

User.hasMany(PostRating, {
  foreignKey: "user_id"
})

PostRating.belongsTo(User, {
  foreignKey: "user_id"
})

Post.hasMany(PostComment, { 
  foreignKey: "post_id" 
})

PostComment.belongsTo(Post, { 
  foreignKey: "post_id" 
})

User.hasMany(PostComment, { 
  foreignKey: "user_id" 
})

PostComment.belongsTo(User, { 
  foreignKey: "user_id" })

