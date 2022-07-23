// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.12 <0.9.0;

contract Storage {

    string[][] public files;

    // adds new list to files of length fileParts, and returns its index
    function addNewFile(uint32 fileParts) public returns (uint256) {
        string[] memory newFile = new string[](fileParts);
        files.push(newFile);
        return files.length - 1;
    }

    function setFilePart(uint32 fileIndex, uint32 partIndex, string memory filePart) public {
        files[fileIndex][partIndex] = filePart;
    }

    function getFiles() public view returns (string memory) {
        string memory returnString = "";
        for (uint32 i = 0; i < files.length; i += 1) {
            for (uint32 j = 0; j < files[i].length; j += 1) {
                returnString = string.concat(returnString, files[i][j]);
            }
            returnString = string.concat(returnString, "\n");
        }
        return returnString;
    }
    

}