import ImageKit from "imagekit";

export default function handler(req, res) {
  try {
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      return res.status(500).json({
        error: "Missing ImageKit env vars",
        hasPublicKey: !!publicKey,
        hasPrivateKey: !!privateKey,
        hasUrlEndpoint: !!urlEndpoint
      });
    }

    const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });
    const authParams = imagekit.getAuthenticationParameters();
    return res.status(200).json(authParams);
  } catch (e) {
    return res.status(500).json({ error: "Internal Server Error", message: e.message });
  }
}
