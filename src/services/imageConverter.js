import sharp from "sharp";

export async function convertImage(file, watermarkText = null) {

  let image = sharp(file.buffer)
    .resize({
      width: 1000,
      withoutEnlargement: true,
    })

  const { data, info } = await image
    .toBuffer({ resolveWithObject: true })

  image = sharp(data)

  if (watermarkText?.trim()) {
    const metadata = await image.metadata()

    const width = metadata.width || 1000
    const height = metadata.height || 1000

    const fontSize = Math.max(
      24,
      Math.round(width * 0.06)
    )

    const safeText = escapeXml(watermarkText.trim())

    const svg = `
      <svg
        width="${width}"
        height="${height}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .watermark {
            fill: white;
            fill-opacity: 0.45;
            font-size: ${fontSize}px;
            font-family: sans-serif;
            font-weight: bold;
          }
        </style>

        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dominant-baseline="middle"
          class="watermark"
          transform="rotate(-25 ${width / 2} ${height / 2})"
        >
          ${safeText}
        </text>
      </svg>
    `

    image = image.composite([
      {
        input: Buffer.from(svg),
        top: 0,
        left: 0,
      },
    ])
  }

  const buffer = await image
    .webp({
      quality: 60,
    })
    .toBuffer()

  return `data:image/webp;base64,${buffer.toString("base64")}`
}

function escapeXml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}