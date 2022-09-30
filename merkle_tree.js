const { ethers } = require("ethers");
const { MerkleTree } = require("merkletreejs");
const { keccak256 } = ethers.utils;

// 2. Whitelisted addresses
const whitelisted = [
  "0xFE76c1d370E726AC049b55137a468fe88FDa1b98",
  "0x4A36aF2C6B92F7bffA4a739457A8bDa7138f2144",
  "0x07C622BC6E19636807296E44D598F6e4a166f857",
];

// 3. Creating a buffer since we bytes array
const padBuffer = (addr) => {
  return Buffer.from(addr.substr(2).padStart(32 * 2, 0), "hex");
};

// 4. Creating buffer from leaves (lowest points in tree)
const leaves = whitelisted.map((address) => padBuffer(address));
const tree = new MerkleTree(leaves, keccak256, { sort: true });

// 5. Creating a merkleRoot that we'll inject into smart contract
const merkleRoot = tree.getHexRoot();

console.log("MerkleRoot",merkleRoot);

// 0x15e1a54af0c562685bc619b9b770a503b272a845a0a8451f6c4265802a44eca4

// 6. Calculating merkleProof to check if an address is whitelisted
const merkleProof = tree.getHexProof(padBuffer(whitelisted[0]));

