outputString = ''
letters = 'ABCDEFGHIJ'
for letter in letters:
    outputString += 'iPart{} public Part{} =  iPart{}(nextAddress);'.format(letter, letter, letter) + '\n'
print(outputString)