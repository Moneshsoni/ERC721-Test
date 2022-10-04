pragma solidity 0.8.9;
contract FunctionModifier{
    address public owner;
    uint public x =100;
    bool public locked;
    constructor(){
        owner = msg.sender;
    }

    //Modifier to check that the caller is the owner of
    modifier onlyOwner(){
        require(msg.sender ==owner,"Not a owner");
        _;
    }

    modifier validAddress(address _addr){
        require(_addr != address(0),"Not valid address");
        _;
    }

    function changeOwner(address _newOwner)public onlyOwner validAddress(_newOwner){
        owner = _newOwner;
    }


    //noReentrancy modifier
    modifier noReentrancy(){
        require(!locked,"No reentrancy");
        locked = true;
        _;
        locked = false;
    }

    function decrement(uint i)public noReentrancy{
        x-=1;
        if(i>1){
            decrement(i-1);
        }

    }
}