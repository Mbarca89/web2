import {
  createOrGetConversation,
  getUserConversations,
  getConversation,
  getMessages,
  sendMessage,
} from "../services/messageService.js"

import { createNotification } from "../services/notificationService.js"


export async function interestInPost(req, res) {
  try {
    const { conversation, created, sellerId } =
      await createOrGetConversation({
        postId: req.params.postId,
        buyerId: req.user.id,
      })

    if (created) {
      await createNotification({
        userId: sellerId,
        actorId: req.user.id,
        type: "INTEREST",
        message: "está interesado en tu publicación",
        link: `/messages/${conversation.id}`,
      })
    }

    return res.json({
      success: true,
      conversationId: conversation.id,
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}


export async function showConversations(req, res) {
  try {
    const conversations = await getUserConversations(req.user.id)

    return res.render("messages", {
      title: "Mensajes",
      conversations,
    })
  } catch (error) {
    console.error(error)

    return res.redirect("/me")
  }
}


export async function showConversation(req, res) {
  try {
    const conversation = await getConversation(
      req.params.id,
      req.user.id
    )

    return res.render("chat", {
      title: "Conversación",
      conversation,
    })
  } catch (error) {
    console.error(error)

    return res.redirect("/messages")
  }
}


export async function listMessages(req, res) {
  try {
    const messages = await getMessages(
      req.params.id,
      req.user.id
    )

    return res.json({
      success: true,

      messages: messages.map(message => ({
        id: message.id,
        content: message.content,
        senderId: message.Sender.id,
        username: message.Sender.username,
        createdAt: message.createdAt,
      })),
    })
  } catch (error) {
    console.error(error)

    return res.status(403).json({
      success: false,
      message: error.message,
    })
  }
}


export async function sendMessageAction(req, res) {
  try {
    const message = await sendMessage({
      conversationId: req.params.id,
      senderId: req.user.id,
      content: req.body.content,
    })

    return res.json({
      success: true,
      message: {
        id: message.id,
        content: message.content,
        senderId: req.user.id,
        createdAt: message.createdAt,
      },
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}