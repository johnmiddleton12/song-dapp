// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.12 <0.9.0;


interface iPartA {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartB {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartC {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartD {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartE {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartF {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartG {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartH {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartI {
    function GetPart(uint32 songPart) external view returns (string memory);
}

interface iPartJ {
    function GetPart(uint32 songPart) external view returns (string memory);
}

contract Storage {

    address addressA;
    address addressB;
    address addressC;
    address addressD;
    address addressE;
    address addressF;
    address addressG;
    address addressH;
    address addressI;
    address addressJ;

    function setAddresses(address newAddressA, address newAddressB, 
        address newAddressC, address newAddressD, address newAddressE, 
        address newAddressF, address newAddressG, address newAddressH, 
        address newAddressI, address newAddressJ) public {
        addressA = newAddressA;
        addressB = newAddressB;
        addressC = newAddressC;
        addressD = newAddressD;
        addressE = newAddressE;
        addressF = newAddressF;
        addressG = newAddressG;
        addressH = newAddressH;
        addressI = newAddressI;
        addressJ = newAddressJ;
        PartA = iPartA(addressA);
        PartB = iPartB(addressB);
        PartC = iPartC(addressC);
        PartD = iPartD(addressD);
        PartE = iPartE(addressE);
        PartF = iPartF(addressF);
        PartG = iPartG(addressG);
        PartH = iPartH(addressH);
        PartI = iPartI(addressI);
        PartJ = iPartJ(addressJ);
     } 

    // address is address of deployed part A
    iPartA PartA =  iPartA(addressA);
    iPartB PartB =  iPartB(addressB);
    iPartC PartC =  iPartC(addressC);
    iPartD PartD =  iPartD(addressD);
    iPartE PartE =  iPartE(addressE);
    iPartF PartF =  iPartF(addressF);
    iPartG PartG =  iPartG(addressG);
    iPartH PartH =  iPartH(addressH);
    iPartI PartI =  iPartI(addressI);
    iPartJ PartJ =  iPartJ(addressJ);

    string public storageString = '';

    string public storageStringA = '';
    string public storageStringB = '';
    string public storageStringC = '';
    string public storageStringD = '';
    string public storageStringE = '';
    string public storageStringF = '';
    string public storageStringG = '';
    string public storageStringH = '';
    string public storageStringI = '';
    string public storageStringJ = '';

    uint32 public count = 0;
    function retrieveIncrementally() public returns (bool) {
        if (count < 10) {
        retrieveN(count);
        count = count + 1;
        return true;
        }
        return false;
    }

    function setStorageString(string calldata newString) public {
        storageString = newString;
    }

    function getStorageStringN(uint32 n) public view returns (string memory){
        if (n == 0) {
            return storageStringA;
        } else if (n == 1) {
            return storageStringB;
        } else if (n == 2) {
            return storageStringC;
        } else if (n == 3) {
            return storageStringD;
        } else if (n == 4) {
            return storageStringE;
        } else if (n == 5) {
            return storageStringF;
        } else if (n == 6) {
            return storageStringG;
        } else if (n == 7) {
            return storageStringH;
        } else if (n == 8) {
            return storageStringI;
        } else if (n == 9) {
            return storageStringJ;
        }
        return "Invalid number specified!";
    }
    function retrieveN(uint32 i) public {
            for (uint32 j=0; j<50; j += 1) {
                if (i == 0) {
                    storageStringA = string(abi.encodePacked(storageStringA, PartA.GetPart(j)));
                } else if (i == 1) {
                    storageStringB = string(abi.encodePacked(storageStringB, PartB.GetPart(j)));
                } else if (i == 2) {
                    storageStringC = string(abi.encodePacked(storageStringC, PartC.GetPart(j)));
                } else if (i == 3) {
                    storageStringD = string(abi.encodePacked(storageStringD, PartD.GetPart(j)));
                } else if (i == 4) {
                    storageStringE = string(abi.encodePacked(storageStringE, PartE.GetPart(j)));
                } else if (i == 5) {
                    storageStringF = string(abi.encodePacked(storageStringF, PartF.GetPart(j)));
                } else if (i == 6) {
                    storageStringG = string(abi.encodePacked(storageStringG, PartG.GetPart(j)));
                } else if (i == 7) {
                    storageStringH = string(abi.encodePacked(storageStringH, PartH.GetPart(j)));
                } else if (i == 8) {
                    storageStringI = string(abi.encodePacked(storageStringI, PartI.GetPart(j)));
                } else if (i == 9 && j < 37) {
                    storageStringJ = string(abi.encodePacked(storageStringJ, PartJ.GetPart(j)));
                }
            }
        
    }
}