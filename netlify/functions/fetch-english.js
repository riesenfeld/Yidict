const words = require("../data/words.json")

const getWordsAtIndex = function (index) {
  return words.map((word) => word[index])
}

exports.handler = async function (event) {
  const eventBody = JSON.parse(event.body)
  let result
  if (eventBody.language == "english") {
    result = getWordsAtIndex(0)
  } else if (eventBody.language == "yiddish") {
    result = getWordsAtIndex(4)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}
