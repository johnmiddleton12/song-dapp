# ideas
# - separate the file into many parts,
# - then, each part can be a smart contract, which is programatically deployed
# - for reading, the main contract collects the data together
# - and makes an html composite of the song, which can be opened in a browser
# - return this, which user copies into their browser
# data:text/html,<h1>Hello World</h1><script>alert('JavaScript works too!');</script>

# make a react app? accessing window.ethereum might be necessary for that

# make a program that takes in a file, no matter how large e.g., movie, song
# and turns it into bite size contracts and a master contract that reads from it

# or starts with data:audio/wav;base64,

n = 300

# make a mapping of letters 0 - 10 to letters 
letters = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J'
}

with open('song.txt', 'r') as f:
    line = f.read()
    # print(len(a))

    listOfNLengthStrings = [line[i:i+n] for i in range(0, len(line), n)]
    print(len(listOfNLengthStrings))

    fi = open('outline.txt', 'r')
    outline = fi.read()

    for part in range(0, 10):
        outputString = ''
        count = 0
        for i in range(part * 50, (part + 1) * 50):
            if i < len(listOfNLengthStrings):
                outputString += 'if (songPart == ' + str(count) + ') return "' + listOfNLengthStrings[i] + '";' + '\n'
            with open('sol/output{}.sol'.format(letters[part]), 'w') as f:
                f.write(outline.replace("BRUHBRUH", letters[part]).replace("%%%%REPLACE%%%%", outputString).replace("%%REPLACE%%", letters[part]))
            count += 1

    print(count)