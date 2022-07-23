/**
 *Submitted for verification at Etherscan.io on 2022-03-21
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.12 <0.9.0;

contract PartA {

    function GetPart(uint32 songPart) public pure returns (string memory) {
        if (songPart == 0 ) return "World!";
      
        return "";
    }
}