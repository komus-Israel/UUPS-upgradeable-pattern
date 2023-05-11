pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


contract ImplementationV1 is UUPSUpgradeable {

    address _owner;

    function initialize() public initializer {
        __UUPSUpgradeable_init();
        _owner = msg.sender;
    }

    function onlyOwner() internal {
        
        require(msg.sender == _owner, "Invalid owner");
        
    }

    function _authorizeUpgrade(address newImplementation) internal override{
        (newImplementation);
        onlyOwner();
    }

    function getOwner() external view returns (address) {
        return _owner;
    }

}