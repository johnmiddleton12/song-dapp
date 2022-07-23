outputString = ''

letters = 'ABCDEFGHIJ'

for letter in letters:
    outputString += '''
interface iPart''' + letter + ''' {
    function GetPart(uint32 songPart) external view returns (string memory);
}'''
    # outputString.replace('XXX', letter)
    outputString += '\n'

print(outputString)

with open('comeOn.txt', 'w') as f:
    f.write(outputString)
