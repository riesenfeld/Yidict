const words = require("../data/words.json")

const getIndexOfSearchType = function (searchType) {
  if (searchType == "yiddish") {
    return 4
  } else if (searchType == "romanization") {
    return 1
  } else return 0
}

const getMatches = function (searchTerm, searchType) {
  let index = getIndexOfSearchType(searchType)
  return words.filter((word) => word[index].includes(searchTerm))
}

exports.handler = async function (event) {
  const eventBody = JSON.parse(event.body)

  let matches = getMatches(eventBody.searchTerm, eventBody.searchType)

  return {
    statusCode: 200,
    body: JSON.stringify(matches),
  }
}
