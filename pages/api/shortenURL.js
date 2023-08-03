import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      "https://api.short.io/links",
      {
        originalURL: req.body.originalUrl,
        domain: "go.majed.work",
      },
      {
        headers: {
          authorization: process.env.SHORT_API,
        },
        responseType: "json",
      }
    );
    res.status(200).json(response.data.shortURL);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
}
