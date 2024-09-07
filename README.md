# Clowder

> Fun fact: "Clowder" is the collective noun for cats.

Clowder is a minimalistic platform allowing anyone to create [CATs (Contribution Accounting Tokens)](https://docs.stability.nexus/about-us/the-stable-order/cats).

CATs are fungible tokens (e.g. ERC20 tokens) that are used to track the value of contributions to a project by members of a decentralized organization. CATs have the following characteristics:

1. The initial supply of tokens is zero. 
2. The user who deploys the token contract is its initial owner.
3. The contract may have multiple owners and owners may grant ownership to others.
4. All owners have permission to mint tokens.
5. There is an optional maximum supply of tokens, above which minting is forbidden.
6. There is a threshold supply of tokens, below which minting is unrestrited.
7. There is a maximum supply expansion rate that is enforced when the supply exceeds the threshold.
8. Owners have permission to permanently reduce the maximum supply of tokens and the threshold supply of tokens.
9. Owners have permission to permanently reduce the maximum supply expansion rate.
10. Transfers of tokens may be restricted to accounts that already have tokens, in order to keep the tokens circulating only among members of a project.
11. Owners may permanently disable the transfer restriction.


The platform's frontend has the following pages:

* **Landing Page**: this page has a "Create CAT" button (which redirects to the *CAT Creation Page*), a text field for the user to input a CAT contract address and a "Use CAT" button (which redirects to the *CAT Page* for the CAT contract input in the text field).
* **CAT Page**: this page reads from the URL the address of the token contract and allows users to interact with the token contract. This page shows parameters and variables of the token contract such as: current supply, maximum supply, threshold suply, maximum expansion rate, transfer restriction. For owners who have connected their wallets, this page also shows fields and buttons to mint tokens and to do changes in the parameters of the token contract.
* **Create CAT Page**: this page shows a form where the user can input the constructor parameters for the desired CAT and a "Deploy CAT" button that calls the factory contract to deploy the CAT with the desired parameters.
* **My CATs Pages** this page lists all token contracts owned by the user who connected the wallet.

The platform's frontend is built with Next.js, TailwindCSS and ShadCN UI.

The platform has no backend. The list of token contracts owned by each address is stored in the factory contract.
