import sharp from "sharp";

export async function convertImage(file) {
  const buffer = await sharp(file.buffer)
    .resize({
      width: 1200,
      withoutEnlargement: true,
    })
    .webp({
      quality: 75,
    })
    .toBuffer()

  return `data:image/webp;base64,${buffer.toString("base64")}`
}