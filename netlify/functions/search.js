const words = require("../data/words.json")

const getIndexOfSearchType = function (searchType) {
  if (searchType == "yiddish") {
    return 4
  } else if (searchType == "romanization") {
    return 1
  } else return 0
}

const normalizeYiddish = function (str) {
  let digraphs = [
    // double vov
    ["\u05F0", "\u05D5\u05D5"],
    // vov yud
    ["\u05F1", "\u05D5\u05D9"],
    //double yud
    ["\u05F2", "\u05D9\u05D9"],
  ]

  let sofitLetters = [
    // khof sofit
    ["\u05DA", "\u05DB"],
    // mem sofit
    ["\u05DD", "\u05DE"],
    // nun sofit
    ["\u05DF", "\u05E0"],
    // fey sofit
    ["\u05E3", "\u05E4"],
    // tzadi sofit
    ["\u05E5", "\u05E6"],
  ]

  let diacriticsRange = /[\u0590-\u05c7]/gu

  for (let i = 0; i < digraphs.length; i++) {
    str = str.replaceAll(digraphs[i][0], digraphs[i][1])
  }
  for (let i = 0; i < sofitLetters.length; i++) {
    str = str.replaceAll(sofitLetters[i][0], sofitLetters[i][1])
  }
  str = str.replaceAll(diacriticsRange, "")

  return str
}

const normalizePunctuationAndWhitespace = function (str) {
  //remove leading and trailing whitespace from search term
  str = str.trim()

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
  }

  //remove any instances of multiple adjacent spaces
  str = str.replace(/\s\s+/g, " ")
  //trim again
  return str.trim()
}

const includesExactly = function (str, substr) {
  str = " " + str + " "

  if (str.startsWith(substr + " ")) {
    return true
  } else if (str.endsWith(" " + substr)) {
    return true
  } else if (str.includes(" " + substr + " ")) {
    return true
  } else return false
}

const normalize = function (str, lang = "english") {
  str = normalizePunctuationAndWhitespace(str)
  if (lang == "yiddish") {
    return normalizeYiddish(str)
  } else return str.toLowerCase()
}

const getMatches = function (searchTerm, searchType, exact = "false") {
  let index = getIndexOfSearchType(searchType)
  let matches = words.filter((word) =>
    normalize(word[index], searchType).includes(normalize(searchTerm, searchType))
  )
  if (exact == "true") {
    return matches.filter((match) =>
      includesExactly(normalize(match[index], searchType), normalize(searchTerm, searchType))
    )
  } else return matches
}

/** The Levenshtein distance algorithm,
 *  modified for the case where a string in results contains the search term in its entirety.
 *  Ex. searchTerm = "morning" and searchResult =  "good morning"
 *    This case will have a distance of 0.5 -- not quite an exact match, but pretty close.
 * */
const getLevenshteinDistance = function (searchTerm, searchResult) {
  if (searchResult == searchTerm) {
    return 0.0
  }
  // normalize and check for perfect inclusion, and if so return 0.5
  // paddedSearchResult = " "
  // else if(searchResult)
}

/* Sort results according to their Levenshtein distance from the search term */
const levenshteinSort = function (searchTerm, results) {
  let distances = []
  let sortedResults = []

  for (let i = 0; i < results.length; i++) {
    distances.push({
      distance: getLevenshteinDistance(searchTerm, results[i]),
      index: i,
    })
  }
  distances = distances.sort(function (el1, el2) {
    if (el1.distance > el2.distance) {
      /* Sort el2 before el1 */
      return 1
    } else if (el1.distance < el2.distance) {
      /* Sort el1 before el2 */
      return -1
    } else return 0
    /* Keep original order of el1 and el2 */
  })

  for (let i = 0; i < distances.length; i++) {
    sortedResults.push(results[distances[i].index])
  }
  return sortedResults
}

exports.handler = async function (event) {
  const eventBody = JSON.parse(event.body)

  console.log(eventBody)

  let matches = getMatches(eventBody.searchTerm, eventBody.searchType, eventBody.exact)

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
