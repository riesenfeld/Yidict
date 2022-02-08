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

  //Make the yiddish word the second element of each match array,
  //  so that we don't have to reorder our grid on the front end.
  // 0 1 2 3 4 => 0 4 1 2 3
  let reorder = function (match) {
    return [match[0], match[4], match[1], match[2], match[3]]
  }
  matches = matches.map(reorder)

  return {
    statusCode: 200,
    body: JSON.stringify(matches),
  }
}
