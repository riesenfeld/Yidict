const words = require("../data/words.json")

exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify(words),
  }
}
