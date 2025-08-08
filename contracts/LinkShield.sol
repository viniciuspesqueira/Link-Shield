// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract LinkShield {
    // LINK INFORMATIONS
    // url
    // owner
    // fee
    // id
    struct Link {
        string url;
        address owner;
        uint256 fee; // address type represent the wallet address that equivalent a user account in blockchain
        uint256 timestamp;
    }

    uint256 public comission = 1;

    mapping(string => Link) private links; // mapping is useful when want search by id
    mapping(string => mapping (address => bool)) public  hasAccess;
    
    //abc => luiz => true
    //def => luiz => false

    function addLink(string calldata url, string calldata linkId, uint256 fee) public {
        Link memory link = links[linkId];
        require(link.owner == address(0) || link.owner == msg.sender, "This linkId alread has an owner");
        require(fee == 0 || fee >= comission, "Fee too low"); // Defined fee device to be free or greater than comission

        link.url = url;
        link.fee = fee;
        link.owner = msg.sender;
        link.timestamp = block.timestamp;

        links[linkId] = link;

        hasAccess[linkId][msg.sender] = true;
    }

    function getLink(string calldata linkId) public view returns (Link memory) {
        Link memory link = links[linkId];
        if(link.fee == 0) return link;
        if(hasAccess[linkId][msg.sender] == false)
            link.url = ""; // if the user is not owner or paid link, he will not see the url  
        
        return link;
    }

    function payLink(string calldata linkId) public payable // payable are functions that receive cryptocurrencys 
    {
        Link memory link = links[linkId];
        require(link.owner != address(0), "Link not found");
        require((hasAccess[linkId][msg.sender] == false), "You alredy has access");
        require(msg.value >= link.fee, "Insuficient payment");

        hasAccess[linkId][msg.sender] = true;
        payable(link.owner).transfer(msg.value - comission);
    }

    function editComission(string calldata linkId, uint256 newFee) public {
        Link storage link = links[linkId];
        require(link.owner != address(0), "Link not found");
        require(link.owner == msg.sender, "You don't permission for this action");
        
        link.fee = newFee;
    }

    function deleteLink (string calldata linkId) public {
        Link memory link = links[linkId];
        require(link.owner != address(0), "Link not found");
        require(link.owner == msg.sender, "You don't permission for this action");
        
        delete links[linkId];
    }

}