const words = require("../data/words.json")

exports.handler = async function () {
  console.log("YES")
  return {
    statusCode: 200,
    body: JSON.stringify(words.map((word) => word[0])),
  }
}
