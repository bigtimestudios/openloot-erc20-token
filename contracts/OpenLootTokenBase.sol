// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IMintableBurnable} from "@layerzerolabs/oft-evm/contracts/interfaces/IMintableBurnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract OpenLootTokenBase is IMintableBurnable, ERC20, Ownable {
    /// @notice Address able to mint and burn tokens.
    address private BRIDGE;

    /// @notice Emitted whenever tokens are minted for an account.
    event Mint(address indexed account, uint256 amount);

    /// @notice Emitted whenever tokens are burned from an account.
    event Burn(address indexed account, uint256 amount);

    modifier onlyBridge() {
        require(
            msg.sender == BRIDGE,
            "OpenLootTokenBase: caller is not an approved bridge"
        );
        _;
    }

    /// @param _name ERC20 name.
    /// @param _symbol ERC20 symbol.
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) Ownable(msg.sender) {}

    /// @notice Mints tokens. Callable only by approved bridges.
    function mint(
        address _to,
        uint256 _amount
    ) external onlyBridge returns (bool) {
        _mint(_to, _amount);
        emit Mint(_to, _amount);
        return true;
    }

    /// @notice Burns tokens. Callable only by approved bridges.
    function burn(
        address _from,
        uint256 _amount
    ) external onlyBridge returns (bool) {
        _burn(_from, _amount);
        emit Burn(_from, _amount);
        return true;
    }

    /// @notice Gets the address able to mint and burn tokens.
    function bridge() external view returns (address) {
        return BRIDGE;
    }

    /// @notice Sets the address able to mint and burn tokens.
    function setBridge(address _bridge) external onlyOwner {
        BRIDGE = _bridge;
    }
}
