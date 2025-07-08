// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IOptimismMintableERC20} from "@eth-optimism/contracts-bedrock/src/universal/IOptimismMintableERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract OpenLootTokenBase is IOptimismMintableERC20, ERC20, Ownable {
    /// @notice Address of the corresponding version of this token on the remote chain.
    address public immutable REMOTE_TOKEN;

    /// @notice Mapping of approved bridge addresses.
    mapping(address => bool) public isBridge;

    /// @notice Decimals of the token
    uint8 private immutable DECIMALS;

    /// @notice Emitted whenever tokens are minted for an account.
    event Mint(address indexed account, uint256 amount);

    /// @notice Emitted whenever tokens are burned from an account.
    event Burn(address indexed account, uint256 amount);

    /// @notice Emitted when a bridge is added or removed
    event BridgeSet(address bridge, bool approved);

    modifier onlyBridge() {
        require(
            isBridge[msg.sender],
            "OpenLootTokenBase: caller is not an approved bridge"
        );
        _;
    }

    /// @param _initialBridge Initial bridge to approve.
    /// @param _remoteToken Address of the corresponding L1 token.
    /// @param _name ERC20 name.
    /// @param _symbol ERC20 symbol.
    /// @param _decimals ERC20 decimals.
    constructor(
        address _initialBridge,
        address _remoteToken,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) ERC20(_name, _symbol) Ownable(msg.sender) {
        REMOTE_TOKEN = _remoteToken;
        DECIMALS = _decimals;
        isBridge[_initialBridge] = true;
        emit BridgeSet(_initialBridge, true);
    }

    /// @dev Returns the number of decimals.
    function decimals() public view override returns (uint8) {
        return DECIMALS;
    }

    /// @notice Mints tokens. Callable only by approved bridges.
    function mint(address _to, uint256 _amount) external onlyBridge {
        _mint(_to, _amount);
        emit Mint(_to, _amount);
    }

    /// @notice Burns tokens. Callable only by approved bridges.
    function burn(address _from, uint256 _amount) external onlyBridge {
        _burn(_from, _amount);
        emit Burn(_from, _amount);
    }

    /// @notice Allows the contract owner to approve or revoke bridge access.
    function setBridge(address _bridge, bool _approved) external onlyOwner {
        isBridge[_bridge] = _approved;
        emit BridgeSet(_bridge, _approved);
    }

    /// @notice ERC165 interface check.
    function supportsInterface(
        bytes4 _interfaceId
    ) external pure returns (bool) {
        return
            _interfaceId == type(IERC165).interfaceId ||
            _interfaceId == type(IOptimismMintableERC20).interfaceId;
    }

    /// @custom:legacy getter for remote token
    function l1Token() public view returns (address) {
        return REMOTE_TOKEN;
    }

    /// @custom:legacy bridge getter always reverts to avoid confusion
    function l2Bridge() public pure returns (address) {
        revert("Use isBridge(address) instead");
    }

    function remoteToken() public view returns (address) {
        return REMOTE_TOKEN;
    }

    function bridge() public pure returns (address) {
        revert("Use isBridge(address) instead");
    }
}
