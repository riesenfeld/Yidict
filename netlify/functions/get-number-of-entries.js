const words = require("../data/words.json")

exports.handler = async function () {
  let response = {
    entries: words.length,
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  }
}
