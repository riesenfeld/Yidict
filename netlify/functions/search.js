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
  return words.filter((word) => word[index].toLowerCase().includes(searchTerm.toLowerCase()))
}

const includesExactly = function (str, substr) {
  //remove leading and trailing whitespace from search term
  substr = substr.trim()

  let substitutions = [
    /[,]/g,
    /[:]/g,
    /[;]/g,
    /[?]/g,
    /[!]/g,
    /[/]/g,
    /[-]/g,
    /\s\(or\)\s/g,
    /[(]/g,
    /[)]/g,
    /\.\.\./g,
  ]

  for (let i = 0; i < substitutions.length; i++) {
    str = str.replace(substitutions[i], " ")
    substr = substr.replace(substitutions[i], " ")
  }

  //remove any instances of multiple adjacent spaces
  str = str.replace(/\s\s+/g, " ")
  substr = substr.replace(/\s\s+/g, " ")

  //pad the string with exactly one space on either side
  str = str.trim()
  str = " " + str + " "

  if (str.startsWith(substr + " ")) {
    return true
  } else if (str.endsWith(" " + substr)) {
    return true
  } else if (str.includes(" " + substr + " ")) {
    return true
  } else return false
  /**
   *  hebrew diacritics, etc:
   *  פֿ PEY: \u05E4, rafe \u05BF
   *
   *  */
}

const getExactMatches = function (searchTerm, searchType) {
  let index = getIndexOfSearchType(searchType)
  let matches = getMatches(searchTerm, searchType)
  return matches.filter((match) =>
    includesExactly(match[index].toLowerCase(), searchTerm.toLowerCase())
  )
}

exports.handler = async function (event) {
  const eventBody = JSON.parse(event.body)

  console.log(eventBody)

  let matches

  if (eventBody.exact == "true") {
    matches = getExactMatches(eventBody.searchTerm, eventBody.searchType)
  } else {
    matches = getMatches(eventBody.searchTerm, eventBody.searchType)
  }

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
