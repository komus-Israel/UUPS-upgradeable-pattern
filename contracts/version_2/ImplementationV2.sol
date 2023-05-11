pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ImplementationV2 is UUPSUpgradeable {

    
    address _owner;
    uint256 _value;

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

    function setValue(uint256 value) external {
        _value = value;
    }

    function getValue() external view returns (uint256) {
        return _value;
    }

    function transferOwnership(address newOwner) public  {
        require(newOwner != address(0), "Invalid new owner");
        _owner = newOwner;
    }

}