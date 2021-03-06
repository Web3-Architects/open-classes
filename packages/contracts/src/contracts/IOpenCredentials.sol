// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

interface IOpenCredentials {
    function issueCredentials(address to, string memory credentialSubject, string memory credentialName) external;
}