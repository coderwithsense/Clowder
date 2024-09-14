// SPDX-License-Identifier: AEL
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ContributionAccountingToken.sol"; // Make sure this import points to your CAT contract file

contract CATFactory is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // Mapping from owner address to token addresses
    mapping(address => address[]) private _administerableTokens;

    // Event emitted when a new CAT is created
    event CATCreated(address indexed owner, address catAddress, uint256 tokenId);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Creates a new CAT contract and assigns it to the caller.
     * @param maxSupply The maximum supply for the new CAT.
     * @param thresholdSupply The threshold supply for the new CAT.
     * @param maxExpansionRate The maximum expansion rate for the new CAT.
     * @return The address of the newly created CAT contract.
     */
    function createCAT(
        uint256 maxSupply,
        uint256 thresholdSupply,
        uint256 maxExpansionRate
    ) public returns (address) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        ContributionAccountingToken newCAT = new ContributionAccountingToken(
            msg.sender,
            maxSupply,
            thresholdSupply,
            maxExpansionRate
        );

        address catAddress = address(newCAT);
        _administerableTokens[msg.sender].push(catAddress);

        emit CATCreated(msg.sender, catAddress, newTokenId);

        return catAddress;
    }

    /**
     * @dev Returns an array of CAT addresses owned by the given address.
     * @param owner The address to query the tokens of.
     * @return An array of CAT contract addresses.
     */
    function getOwnedCATs(address owner) public view returns (address[] memory) {
        return _administerableTokens[owner];
    }

    /**
     * @dev Returns the total number of CATs created.
     * @return The total number of CATs.
     */
    function totalCATs() public view returns (uint256) {
        return _tokenIds.current();
    }
}