import './App.css';

import { useEffect, useState } from 'react';

import { ethers } from "ethers";

import Spinner from './components/Spinner.js';

const NEW_POLYGON_ADDRESS = "0x510d209813696954021b3e5597D0Db731679a725";
const NEW_POLYGON_ABI = [
    "function setFilePart(string, uint32, string) public",
    "function getFilePart(string memory fileName, uint32 partIndex) public view returns (string memory)",
    "function addNewFile(string memory fileName, uint32 fileParts) public returns (bool)",
    "function getFileLength(string memory fileName) public view returns (uint256)"
]

function App() {

    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);

    const [loading, setLoading] = useState(false);

    const [base64String, setBase64String] = useState('');

    const [currentOutput, setCurrentOutput] = useState('');

    async function connectToWallet() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAddress(accounts[0]);
        const balance = await provider.getBalance(accounts[0]);
        setBalance(ethers.utils.formatEther(balance));
    };

    async function getFile() {

        let fileName = prompt("Enter file name");
        // let numberOfParts = prompt("Enter number of parts");

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setLoading(true);
        const contract = new ethers.Contract(NEW_POLYGON_ADDRESS, NEW_POLYGON_ABI, signer);
        try { 
            let tx;
            let finalString = "";
            
            let numberOfParts = await contract.getFileLength(fileName);

            for (let i = 0; i < numberOfParts; i++) {
                tx = await contract.getFilePart(fileName, i);
                finalString += tx.toString();
                console.log(tx);
            }
            // set the base64string to all the elements of the array
            setBase64String(finalString);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setBase64String(reader.result.toString());
            console.log('File loaded');
            return reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            return error;
        };
    }

    function encodeFile() {
        var file = document.querySelector('#files').files[0];
        getBase64(file); 
    }

    async function calculateGasCost() {
        // split up base64String into chunks of 10 kilobytes
        let chunks = [];
        let chunk = '';
        let i = 0;
        while (i < base64String.length) {
            chunk = base64String.substring(i, i + 10 * 1024);
            chunks.push(chunk);
            i += 10 * 1024;
        }
        console.log('File Parts: ' + chunks.length);
        // calculate the gas cost for each chunk
        setLoading(true);
        let gasTotal = 0;
        for (let i = 0; i < chunks.length; i++) {
            // check file is a super long empty string 
            gasTotal += await emulateTransaction("checkFile", i, chunks[i]);
        }
        gasTotal = ethers.utils.formatEther(gasTotal.toString());
        setLoading(false);
        setCurrentOutput('Total Gas Cost to upload this file would be: ' + gasTotal);
        console.log("Total Gas Cost: " + gasTotal);
    }

    async function uploadFile() {
        // split up base64String into chunks of 10 kilobytes
        let fileName = prompt("Enter file name");
        let chunks = [];
        let chunk = '';
        let i = 0;
        while (i < base64String.length) {
            chunk = base64String.substring(i, i + 10 * 1024);
            chunks.push(chunk);
            i += 10 * 1024;
        }
        console.log('File Parts: ' + chunks.length);
        await createFile(fileName, chunks.length);

        setLoading(true);
        let tx;
        for (let i = 0; i < chunks.length; i++) {
            tx = await performTransaction(fileName, i, chunks[i]);
            console.log(tx);
        }
        setLoading(false);
        console.log('File ' + fileName + ' uploaded');
    }

    async function createFile(fileName, numberOfParts) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(NEW_POLYGON_ADDRESS, NEW_POLYGON_ABI, signer);
        try { 
            let tx = await contract.addNewFile(fileName, numberOfParts);
            console.log(tx);
        } catch (error) {
            console.log(error);
        }
    }

    async function performTransaction(fileName, partIndex, part) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(NEW_POLYGON_ADDRESS, NEW_POLYGON_ABI, signer);
        try { 
            let tx;
            tx = await contract.setFilePart(fileName, partIndex, part);
            console.log(tx);
        } catch (error) {
            console.log(error);
        }
    }

    async function emulateTransaction(fileName, partIndex, part) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(NEW_POLYGON_ADDRESS, NEW_POLYGON_ABI, signer);
        let gasLimit = await contract.estimateGas.setFilePart(fileName, partIndex, part);
        let gasPrice = await provider.getGasPrice();
        return gasLimit * gasPrice;
    }

    useEffect(() => {
        connectToWallet();
    }, []);

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }} className="App">

            <div>

        <header className="App-header">
        <p>
        Your address: {address}
        </p>
        <p>
        Your balance: {balance} Ξ
        </p>
        <br />
        <input type="file" id="files" multiple/>
        <button className="button-4" onClick={encodeFile}>Encode File</button>
        <br />
        <button className="button-4" onClick={calculateGasCost}>Calculate Gas Cost</button>
        <button className="button-4" onClick={uploadFile}>Upload File</button>
        <p style={{fontSize: '15px'}}>
            Steps: <br />
            1. Upload file <br />
            2. Encode file <br />
            3. Calculate gas cost <br />
            4. Upload file to chain, giving it a name (WAIT FOR FIRST TX TO FINISH)<br />
            5. Go through transactions one at a time <br />
        </p>
        <br />

        <button className="button-4" onClick={getFile}>Load Song From Contract</button>
        <br />
        <h3>{currentOutput}</h3>

        {loading ? <Spinner /> : <p></p>}

        {base64String ?         
        <audio controls="controls" autobuffer="autobuffer" autoPlay="autoplay">
            <source src={base64String} />
        </audio>
        : <p></p>}


        </header>
        </div>
        <div style={{height: '100%'}}>
        <h3>Base64 of File</h3>
        <p style={{fontSize: '10px', wordBreak: 'break-all'}}>{base64String.substring(0, 2000)}</p>
        <p style={{fontSize: '20px', wordBreak: 'break-all'}}>...</p>
        <p style={{fontSize: '10px', wordBreak: 'break-all'}}>{base64String.substring(base64String.length - 2000, base64String.length)}</p>
        </div>
        </div>
    );
}

export default App;
