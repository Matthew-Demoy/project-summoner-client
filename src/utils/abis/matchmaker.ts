export const matchMakerABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "rarityAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "rarityAttrAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "codexBaseRandomAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
    ],
    name: "createGameEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[8]",
        name: "initiatives",
        type: "uint256[8]",
      },
    ],
    name: "rollInitiativeEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    name: "startGameEvent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "teamOne",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "teamTwo",
        type: "uint256[]",
      },
      {
        internalType: "uint8",
        name: "mapId",
        type: "uint8",
      },
    ],
    name: "_createGame",
    outputs: [
      {
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "_random",
    outputs: [
      {
        internalType: "contract codex_base_random",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "teamOne",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "teamTwo",
        type: "uint256[]",
      },
      {
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
    ],
    name: "_startGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "cooldowns",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "teamOne",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "teamTwo",
        type: "uint256[]",
      },
      {
        internalType: "uint8",
        name: "mapId",
        type: "uint8",
      },
    ],
    name: "createGame",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "summonerId",
        type: "uint256",
      },
    ],
    name: "getCooldown",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
    ],
    name: "getMatch",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "teamOne",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "teamTwo",
            type: "uint256[]",
          },
          {
            internalType: "uint8",
            name: "mapId",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "matchStart",
            type: "uint256",
          },
        ],
        internalType: "struct MatchMaker.Match",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "matches",
    outputs: [
      {
        internalType: "uint8",
        name: "mapId",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "matchStart",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rm",
    outputs: [
      {
        internalType: "contract rarity",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rmAttributes",
    outputs: [
      {
        internalType: "contract rarityAttributes",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "teamOne",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "teamTwo",
        type: "uint256[]",
      },
      {
        internalType: "bytes32",
        name: "gameId",
        type: "bytes32",
      },
    ],
    name: "startGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "summonerPositions",
    outputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "summonerId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct League.position[]",
        name: "preMoves",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "action",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "x",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        internalType: "struct League.position[]",
        name: "postMoves",
        type: "tuple[]",
      },
    ],
    name: "takeAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
