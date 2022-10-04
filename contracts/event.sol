pragma solidity 0.8.9;
contract Event{
    event Log(address indexed sender,string message);
    event AnotheLog();
    function test() public{
        emit Log(msg.sender, "Hello, World!");
        emit Log(msg.sender, "Hello EVM!!");
    }
    function test1()public{
        emit AnotheLog();
    }
}