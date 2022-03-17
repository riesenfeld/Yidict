'''

Run this every time words.json is updated

'''

import json
import re
import os

this_file = os.path.dirname(__file__)
filepath = os.path.join(this_file, '../netlify/data/words.json')
f = open(filepath, 'r+', encoding='UTF8')

words = json.load(f)

f.close()

# Maybe also strip '(grammar)', '(male)', '(female)', '(<preposition>)', '(Judaism)', etc?
def remove_punctuation_and_whitespace(str):
   str = str.strip()
   substitutions = ['plural:', ',',':',';','?','!','/','-','(',')','...', '.']
   for s in substitutions:
      str = str.replace(s, ' ')
   #  If there are any instances of multiple contiguous spaces, replace with a single space
   str = re.sub('\s{2,}', ' ', str)
   return str.strip()

def simplify_yiddish(str):

   # Remove diacritics in the range \u0591-\u05C7 (1425 to 1479)
   for d in range(0x0591, 0x05C8):
      str = str.replace(chr(d), '')

   digraphs = [
    # double vov
    ["\u05F0", "\u05D5\u05D5"],
    # vov yud
    ["\u05F1", "\u05D5\u05D9"],
    #double yud
    ["\u05F2", "\u05D9\u05D9"],
  ]

   lange_oyses = [
    # langer khof
    ["\u05DA", "\u05DB"],
    # shlos mem
    ["\u05DD", "\u05DE"],
    # langer nun
    ["\u05DF", "\u05E0"],
    # langer fey
    ["\u05E3", "\u05E4"],
    # langer tsadek
    ["\u05E5", "\u05E6"],
  ]

   for d in digraphs:
      str = str.replace(d[0], d[1])
   for lo in lange_oyses:
      str = str.replace(lo[0], lo[1])

   geresh = "\u05F3"
   gershayim = "\u05F4"
   # the s' abbreviation
   es = "\u05E1\u05F3"

   #replace "s'" with "es "
   str = str.replace(es, "\u05E2\u05E1 ")
   str = str.replace(geresh, "")
   str = str.replace(gershayim, "")

   return str.strip()

def simplify(str, lang):
   str = remove_punctuation_and_whitespace(str)
   if lang == 'yiddish':
      return simplify_yiddish(str)
   else:
      return str.lower()

def simplify_array(array, lang):
   result = []
   for el in array:
      result.append(simplify(el, lang))
   return result

def create_simplified_entry(index, entry):
   return {
      'id': index,
      'english': simplify_array(entry[0], "english"),
      'romanization': simplify_array(entry[1], "english"),
      'yiddish': simplify_array(entry[4], "yiddish")
   }

result = []
stringified_result = ['[\n']

for i in range(len(words)):
   result.append(create_simplified_entry(i, words[i]))

for i in range(len(result)):
   if i < len(words) - 1:
      stringified_result.append('\t' + str(json.dumps(result[i], ensure_ascii=False).encode('utf8').decode()) + ',\n')
   else:
      stringified_result.append('\t' + str(json.dumps(result[i], ensure_ascii=False).encode('utf8').decode()) + '\n')

stringified_result.append(']')

writepath = os.path.join(this_file, '../netlify/data/simplified.json')
w = open(writepath, 'w', encoding='UTF8')
w.writelines(stringified_result)
w.close()
