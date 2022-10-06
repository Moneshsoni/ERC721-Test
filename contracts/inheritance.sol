pragma solidity 0.8.9;

contract A {
    function foo() public pure virtual returns (string memory) {
        return "This is A contract";
    }
}

contract B is A {
    function foo() public pure virtual override returns (string memory) {
        return "This is B contract";
    }
}
