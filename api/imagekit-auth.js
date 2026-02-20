const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default function handler(req, res) {
  // CORS handling
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
