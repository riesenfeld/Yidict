'''

This script was run after many hours of manually (regex-assisted) tweaking words.json

'''

import json

f = open('./words.json', 'r+', encoding='UTF8')

words = json.load(f)

f.close()

result = []
stringified_result = ['[\n']

for i in range(len(words)):
   new_word = [[],[],[],[],[]]
   # new_word = []
   for j in range(len(words[i])):
      new_word[j] = (words[i][j].split('; '))
   result.append(new_word)
   if i < len(words) - 1:
      stringified_result.append('\t' + str(json.dumps(new_word, ensure_ascii=False).encode('utf8').decode()) + ',\n')
   else:
      stringified_result.append('\t' + str(json.dumps(new_word, ensure_ascii=False).encode('utf8').decode()) + '\n')


stringified_result.append(']')

w = open('./words.json', 'w', encoding='UTF8')
w.writelines(stringified_result)
w.close()
