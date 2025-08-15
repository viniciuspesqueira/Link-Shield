import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x4F43935eE34c71997f8beaed17b8F402B79B1752"

export async function connectContract() {
    if (!window.ethereum) throw new Error("Without Metamask installed");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error("Wallet don't allowed");

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {from: accounts[0]});
}

export async function addLink({url, linkId, feeInWei}) {
    const contract = await connectContract();
    return contract.methods.addLink(url, linkId, feeInWei).send();
}

export async function getLink(linkId) {
    const contract = await connectContract();
    return contract.methods.getLink(linkId).call();
}

export async function payLink(linkId, valueInWei) {
    const contract = await connectContract();
    return contract.methods.payLink(linkId).send(
        { value: valueInWei}
    );
}