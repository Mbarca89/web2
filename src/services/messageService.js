import { Op } from "sequelize"

import Conversation from "../models/Conversation.js"
import Message from "../models/Message.js"
import Post from "../models/Post.js"
import User from "../models/User.js"

export async function createOrGetConversation({
  postId,
  buyerId,
}) {
  const post = await Post.findByPk(postId)

  if (!post) {
    throw new Error("Publicación no encontrada")
  }

  const sellerId = post.user_id

  if (Number(sellerId) === Number(buyerId)) {
    throw new Error("No podés interesarte en tu propia publicación")
  }

  const [conversation, created] = await Conversation.findOrCreate({
    where: {
      post_id: postId,
      buyer_id: buyerId,
      seller_id: sellerId,
    },
    defaults: {
      post_id: postId,
      buyer_id: buyerId,
      seller_id: sellerId,
    },
  })

  return {
    conversation,
    created,
    sellerId,
  }
}

export async function getUserConversations(userId) {
  return Conversation.findAll({
    where: {
      [Op.or]: [
        { buyer_id: userId },
        { seller_id: userId },
      ],
    },

    include: [
      {
        model: User,
        as: "Buyer",
        attributes: ["id", "username"],
      },
      {
        model: User,
        as: "Seller",
        attributes: ["id", "username"],
      },
      {
        model: Post,
        as: "Post",
        attributes: ["id", "title"],
      },
      {
        model: Message,
        as: "Messages",
        separate: true,
        limit: 1,
        order: [["createdAt", "DESC"]],
      },
    ],

    order: [["createdAt", "DESC"]],
  })
}

export async function getConversation(conversationId, userId) {
  const conversation = await Conversation.findOne({
    where: {
      id: conversationId,

      [Op.or]: [
        { buyer_id: userId },
        { seller_id: userId },
      ],
    },

    include: [
      {
        model: User,
        as: "Buyer",
        attributes: ["id", "username"],
      },
      {
        model: User,
        as: "Seller",
        attributes: ["id", "username"],
      },
      {
        model: Post,
        as: "Post",
        attributes: ["id", "title"],
      },
    ],
  })

  if (!conversation) {
    throw new Error("Conversación no encontrada")
  }

  return conversation
}

export async function getMessages(conversationId, userId) {
  await getConversation(conversationId, userId)

  return Message.findAll({
    where: {
      conversation_id: conversationId,
    },

    include: [
      {
        model: User,
        as: "Sender",
        attributes: ["id", "username"],
      },
    ],

    order: [["createdAt", "ASC"]],
  })
}

export async function sendMessage({
  conversationId,
  senderId,
  content,
}) {
  if (!content?.trim()) {
    throw new Error("El mensaje no puede estar vacío")
  }

  await getConversation(conversationId, senderId)

  return Message.create({
    conversation_id: conversationId,
    sender_id: senderId,
    content: content.trim(),
  })
}