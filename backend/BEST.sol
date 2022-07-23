// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.12 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Storage is Ownable {

    mapping(string => string[]) public files;
    string[] public fileNames;

    function addNewFile(string memory fileName, uint32 fileParts) public returns (bool) {

        for (uint32 i = 0; i < fileNames.length; i += 1) {
            if (keccak256(abi.encodePacked((fileNames[i]))) == keccak256(abi.encodePacked((fileName)))) {
                return false;
            }
        }
        
        string[] memory newFile = new string[](fileParts);
        files[fileName] = newFile;
        fileNames.push(fileName);
        return true;
    }

    function removeFile(string memory fileName) public onlyOwner {
        for (uint32 i = 0; i < fileNames.length; i += 1) {
            if (keccak256(abi.encodePacked((fileNames[i]))) == keccak256(abi.encodePacked((fileName)))) {
                delete fileNames[i];
                delete files[fileName];
            }
        }
    } 

    function getFileLength(string memory fileName) public view returns (uint256) {
        return files[fileName].length;
    }

    function setFilePart(string memory fileName, uint32 partIndex, string memory filePart) public {
        files[fileName][partIndex] = filePart;
    }

    function getFilePart(string memory fileName, uint32 partIndex) public view returns (string memory) {
        return files[fileName][partIndex];
    }

    function getFiles() public view returns (string memory) {
        string memory returnString = '';
        for (uint32 i = 0; i < fileNames.length; i += 1) {
            returnString = string.concat(returnString, fileNames[i]);
            returnString = string.concat(returnString, " & ");
        }
        return returnString;
    }
    

}