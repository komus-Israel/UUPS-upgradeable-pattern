pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


abstract contract ImplementationV1 is UUPSUpgradeable {

    address _owner;

    function initialize() public initializer {
        __UUPSUpgradeable_init();
        _owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == _owner, "Invalid owner");
        _;
    }

    function authorizeUpgrade() internal onlyOwner {}

    function getOwner() external view returns (address) {
        return _owner;
    }

}