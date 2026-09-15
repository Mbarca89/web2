import User from "./User.js"
import Post from "./Post.js"
import PostImage from "./PostImage.js"
import Tag from "./Tag.js"
import PostTag from "./PostTag.js"
import PostLike from "./PostLike.js"
import PostRating from "./PostRating.js"
import PostComment from "./PostComment.js"
import Follower from "./Follower.js"
import PostReport from "./PostReport.js"
import Notification from "./Notification.js"
import Collection from "./Collection.js"
import Conversation from "./Conversation.js"
import Message from "./Message.js"

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
  foreignKey: "user_id"
})

User.hasMany(Follower, {
  foreignKey: "follower_id",
  as: "FollowingRelations",
})

User.hasMany(Follower, {
  foreignKey: "following_id",
  as: "FollowerRelations",
})

Follower.belongsTo(User, {
  foreignKey: "follower_id",
  as: "FollowerUser",
})

Follower.belongsTo(User, {
  foreignKey: "following_id",
  as: "FollowingUser",
})

Post.hasMany(PostReport, {
  foreignKey: "post_id"
})

PostReport.belongsTo(Post, {
  foreignKey: "post_id"
})

User.hasMany(PostReport, {
  foreignKey: "reporter_id"
})

PostReport.belongsTo(User, {
  foreignKey: "reporter_id", as: "Reporter"
})

User.hasMany(Notification, {
  foreignKey: "user_id",
})

Notification.belongsTo(User, {
  foreignKey: "user_id",
})

Notification.belongsTo(User, {
  foreignKey: "actor_id",
  as: "Actor",
})

User.hasMany(Collection, {
  foreignKey: "user_id",
  as: "Collections",
})

Collection.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
})

Collection.belongsToMany(Post, {
  through: "collection_posts",
  foreignKey: "collection_id",
  otherKey: "post_id",
  timestamps: false,
  as: "Posts",
})

Post.belongsToMany(Collection, {
  through: "collection_posts",
  foreignKey: "post_id",
  otherKey: "collection_id",
  timestamps: false,
  as: "Collections",
})

Post.hasMany(Conversation, {
  foreignKey: "post_id",
  as: "Conversations",
})

Conversation.belongsTo(Post, {
  foreignKey: "post_id",
  as: "Post",
})

User.hasMany(Conversation, {
  foreignKey: "buyer_id",
  as: "BoughtConversations",
})

Conversation.belongsTo(User, {
  foreignKey: "buyer_id",
  as: "Buyer",
})

User.hasMany(Conversation, {
  foreignKey: "seller_id",
  as: "SoldConversations",
})

Conversation.belongsTo(User, {
  foreignKey: "seller_id",
  as: "Seller",
})

Conversation.hasMany(Message, {
  foreignKey: "conversation_id",
  as: "Messages",
})

Message.belongsTo(Conversation, {
  foreignKey: "conversation_id",
  as: "Conversation",
})

User.hasMany(Message, {
  foreignKey: "sender_id",
  as: "Messages",
})

Message.belongsTo(User, {
  foreignKey: "sender_id",
  as: "Sender",
})