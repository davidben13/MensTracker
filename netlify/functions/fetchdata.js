const fetch = require("node-fetch");

exports.handler = async () => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const apiUrl = "https://api.github.com/repos/davidben13/MensTracker/contents/data.json";

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const file = await response.json();
    const content = JSON.parse(Buffer.from(file.content, "base64").toString("utf-8"));

    return {
      statusCode: 200,
      body: JSON.stringify(content),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
