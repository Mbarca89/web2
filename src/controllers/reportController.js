import { createReport } from "../services/reportService.js"

export async function createReportController(req, res) {
  try {
    await createReport({
      postId: req.params.postId,
      reporterId: req.user.id,
      reason: req.body.reason,
      description: req.body.description,
    })

    return res.json({
      success: true,
      message: "Denuncia registrada correctamente",
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}