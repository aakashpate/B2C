import sharp from 'sharp';

const imagePath = 'C:/Users/Anup Patel/.gemini/antigravity/brain/8884df18-3dd8-4fff-8174-ea9321f2a3d4/media__1781691044257.jpg';

async function splitImage() {
  console.log('Reading image metadata...');
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  console.log(`Image size: ${metadata.width}x${metadata.height}`);
  
  const cols = 4;
  const rows = 2;
  const tileWidth = Math.floor(metadata.width / cols);
  const tileHeight = Math.floor(metadata.height / rows);
  
  console.log(`Extracting tiles of size ${tileWidth}x${tileHeight}...`);
  
  let count = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      await sharp(imagePath)
        .extract({
          left: c * tileWidth,
          top: r * tileHeight,
          width: tileWidth,
          height: tileHeight
        })
        .toFile(`public/assets/zentro-${count}.jpg`);
      console.log(`Saved zentro-${count}.jpg`);
      count++;
    }
  }
  console.log('Finished splitting image.');
}

splitImage().catch(console.error);
