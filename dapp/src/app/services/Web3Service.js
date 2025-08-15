import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x8dE1e52B29D5015556Cb29D000075562eEB18a1A"

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