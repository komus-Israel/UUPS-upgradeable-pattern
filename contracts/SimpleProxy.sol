pragma solidity 0.8.17;

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

contract MyContractProxy is UUPSUpgradeable {

    constructor(address _logic, bytes memory _data) payable {
        // Deploy the logic contract
        UUPSUpgradeable.initialize(_logic);
        
        // Call the logic contract's initializer
        if (_data.length > 0) {
            (bool success, bytes memory returnData) = _logic.delegatecall(_data);
            require(success, string(returnData));
        }
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function upgradeTo(address newImplementation) external onlyOwner {
        _upgradeTo(newImplementation);
    }

    function upgradeToAndCall(address newImplementation, bytes calldata data) external payable onlyOwner {
        _upgradeTo(newImplementation);
        (bool success, bytes memory returnData) = newImplementation.delegatecall(data);
        require(success, string(returnData));
    }
}