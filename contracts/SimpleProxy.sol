pragma solidity 0.8.17;

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MyContractProxy is UUPSUpgradeable {

    address _owner;

    constructor(address _logic, bytes memory _data) payable {
        // Deploy the logic contract
       _upgradeTo(_logic);
        
        _owner = msg.sender;
        
        // Call the logic contract's initializer
        // if (_data.length > 0) {
        //     (bool success, bytes memory returnData) = _logic.delegatecall(_data);
        //     require(success, string(returnData));
        // }

        _upgradeToAndCall(_logic, _data, false);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the contract owner can call this function");
        _;
    }


    function _authorizeUpgrade(address) internal override onlyOwner {}

    function upgradeTo(address newImplementation) external override onlyOwner {
        _upgradeTo(newImplementation);
    }

    function upgradeToAndCall(address newImplementation, bytes calldata data) external override payable onlyOwner {
        _upgradeTo(newImplementation);
        (bool success, bytes memory returnData) = newImplementation.delegatecall(data);
        require(success, string(returnData));
    }


    function getImplementation() external view returns (address Implementation) {
        return _getImplementation();
    }


    fallback() external payable {
        address _impl = _getImplementation();
        require(_impl != address(0), "Implementation address not set");

        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 {
                revert(ptr, size)
            }
            default {
                return(ptr, size)
            }
        }
    }
}