// const words = require("../data/words.json")
const words = require("../data/test.json")

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
    // langer khof
    ["\u05DA", "\u05DB"],
    // shlos mem
    ["\u05DD", "\u05DE"],
    // langer nun
    ["\u05DF", "\u05E0"],
    // langer fey
    ["\u05E3", "\u05E4"],
    // langer tsadek
    ["\u05E5", "\u05E6"],
  ]

  let diacriticsRange = /[\u0590-\u05c7]/gu
  let geresh = "\u05F3"
  let gershayim = "\u05F4"
  let es = "\u05E1\u05F3" // the s' abbreviation

  for (let i = 0; i < digraphs.length; i++) {
    str = str.replaceAll(digraphs[i][0], digraphs[i][1])
  }
  for (let i = 0; i < sofitLetters.length; i++) {
    str = str.replaceAll(sofitLetters[i][0], sofitLetters[i][1])
  }
  str = str.replaceAll(diacriticsRange, "")
  str = str.replaceAll(es, "\u05E2\u05E1 ") //replace "s'" with "es "
  str = str.replaceAll(geresh, "")
  str = str.replaceAll(gershayim, "")

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

const includesExactly = function (array, str) {
  // str = " " + str + " "
  if (array.includes(str)) {
    return true
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].startsWith(str + " ")) {
      return true
    } else if (array[i].endsWith(" " + str)) {
      return true
    } else if (array[i].includes(" " + str + " ")) {
      return true
    }
  }
  return false
}

const normalize = function (str, lang = "english") {
  str = normalizePunctuationAndWhitespace(str)
  if (lang == "yiddish") {
    return normalizeYiddish(str)
  } else return str.toLowerCase()
}

const normalizeArray = function (arr, lang = "english") {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = normalize(arr[i], lang)
  }
  return arr
}

const doesMatch = function (array, searchTerm) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].includes(searchTerm)) {
      return true
    }
  }
  return false
}

const getMatches = function (searchTerm, searchType, exact = "false") {
  let index = getIndexOfSearchType(searchType)
  // let matches = words.filter((word) =>
  //   normalize(word[index], searchType).includes(normalize(searchTerm, searchType))
  // )

  let matches = words.filter((entry) =>
    doesMatch(normalizeArray(entry[index], searchType), normalize(searchTerm, searchType))
  )

  if (exact == "true") {
    return matches.filter((match) =>
      includesExactly(normalizeArray(match[index], searchType), normalize(searchTerm, searchType))
    )
  } else return matches
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

  for (let i = 0; i < matches.length; i++) {
    //Join the arrays inside each match
    matches[i] = matches[i].map((category) => category.join(", "))
    //If romanization or pronunciation contains (plural: ...), prepend that with a semicolon
    matches[i][1] = matches[i][1].replaceAll(", (plural:", "; (plural:")
    matches[i][2] = matches[i][2].replaceAll(", (plural:", "; (plural:")
  }

  return {
    statusCode: 200,
    body: JSON.stringify(matches),
  }
}
