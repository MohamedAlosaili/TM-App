const axios = require("axios");

const API_KEY = process.env;

const handler = async (event) => {
  const { mainRequest, extra } = JSON.parse(event.body);

  try {
    const { data } = await axios.get(
      `${mainRequest}?api_key=${API_KEY}&language=en-US${extra}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    const error = err;

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};

module.exports = { handler };
