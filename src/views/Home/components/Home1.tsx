// @ts-nocheck
// @ts-nocheck
import { Flex, Heading, Overlay, Text } from "@nswap/uikit";
import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWalletButton";
import { useTranslation } from "contexts/Localization";
import Image from "next/image";
import { React, useEffect, useRef, useState } from "react";
import bunnyImage from "../../../../public/images/home/home-1.png";
import CryptoConvertor from "./CryptoConvertor";
import successIcon from "./../../../../public/images/successful.png";
import ReactDOM from "react-dom";
import Web3 from "web3";
import { access } from "fs";

const ABI = [
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_apy",
        type: "uint16",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "migration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalReward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timeOfClaim",
        type: "uint256",
      },
    ],
    name: "RewardClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_apy",
        type: "uint16",
      },
    ],
    name: "setUserAnnualPercentageYield",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unstakeAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unstakeTime",
        type: "uint256",
      },
    ],
    name: "Unstaked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_pause",
        type: "bool",
      },
    ],
    name: "updateStakingPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "annualPercentageYield",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "calculateReward",
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
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "calculateTotalReward",
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
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserStakeCount",
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
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserStakeList",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "stakingComplete",
            type: "bool",
          },
        ],
        internalType: "struct FlexibleStaking.Stake[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserTotalStakedAmount",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userStakes",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "stakingComplete",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const Home1 = () => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const [stakeInputData, setStakeInputData] = useState(0)
  const [totalStake,setTotalStake] = useState(0)
  // const [stackingModal, setStackingModal] = useState(true);
  // const web3 = new Web3(window.ethereum);

  const stakeInput = (input)=> {
    console.log("stakeInputstakeInputstakeInput",input)
    setStakeInputData(parseInt(input))
  }

  useEffect(()=>{

    const asyncFunc = async()=>{
    const web3 = new Web3(window.ethereum);

    if (typeof window.ethereum !== "undefined" && account) {
      await window.ethereum.enable();
      const contractAbi = ABI;
      const contractAddress = "0x2fE3a13D59a63F787897972f598348a1E666610A";
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const balance = await checkEtherBalance(account);
      console.log("balance", balance);
      if (account) {
        const totalStaked = await contract.methods
          .getUserTotalStakedAmount(account)
          .call();
        const convertedTotalStaked = Web3.utils.fromWei(totalStaked, "ether");
        setTotalStake(convertedTotalStaked)
      }
    }
  }

  asyncFunc()
  },[account,window])

  
  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={[account ? "280px" : "50px", null, 0]}
        id="homepage-hero"
        padding={["10%", [account ? "5%" : "10%"]]}
        background="linear-gradient(0deg,rgba(0,0,0,.59) 0%,rgba(0,0,0,.59) 100%)"
      >
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Heading
            className="hero-title-one font-Notable"
            scale="xxl"
            color="#ffffff"
            mb="40px"
          >
            {t("Staking is live")}
          </Heading>
          <CryptoConvertor callbackInput={(input)=>stakeInput(input)} stakedAmount={totalStake} />
          {/* <Stacking /> */}
          {/* <Text
            className="hero-title-two"
            color="#ffffff"
            fontSize="18px"
            mb="24px"
          >
            {t(
              "The first Equity Crowdfunding platform built using NORDEK chain technology"
            )}
          </Text> */}
          {
            /* <Flex>{!account && <ConnectWalletButton mr="8px" />}</Flex> */
            <Flex mt="20px">
              <StakeButton stakeInputData={stakeInputData} />
            </Flex>
          }
        </Flex>
      </Flex>
    </>
  );
};

async function checkEtherBalance(address) {
  try {
    const web3 = new Web3(window.ethereum);
    const balanceWei = await web3.eth.getBalance(address);
    const balanceEth = Web3.utils.fromWei(balanceWei, "ether");
    return balanceEth;
  } catch (error) {
    console.error("Error checking Ether balance:", error);
  }
}

export function Stacking() {
  const { account } = useWeb3React();
  const [stackingModal, setStackingModal] = useState("");
  const [stakingAPY, setStakingAPY] = useState(0);
  const [totalStakeAmount, setTotalStakeAmount] = useState(0);
  const [totalStakedRewards, setTotalStakedRewards] = useState(0);
  const [stakedHistory, setStakedHistory] = useState([])

  useEffect(() => {
    const asyncCallWeb3 = async () => {
      const web3 = new Web3(window.ethereum);

      if (typeof window.ethereum !== "undefined" && account) {
        await window.ethereum.enable();
        const contractAbi = ABI;
        const contractAddress = "0x2fE3a13D59a63F787897972f598348a1E666610A";
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const balance = await checkEtherBalance(account);
        console.log("balance", balance);
        if (account) {
          const totalStaked = await contract.methods
            .getUserTotalStakedAmount(account)
            .call();
          const totalRewards = await contract.methods
            .calculateTotalReward(account)
            .call();
          const convertedTotalStaked = Web3.utils.fromWei(totalStaked, "ether");
          const convertedTotalRewards = Web3.utils.fromWei(
            totalRewards,
            "ether"
          );
          const apy = await contract.methods.annualPercentageYield().call();
          const stakedHistory = await contract.methods
            .getUserStakeList(account)
            .call();

          const formattedStakedHistory = stakedHistory.map((item) => ({
            amount: Web3.utils.fromWei(item[0], "ether"),
            timestamp: new Date(parseInt(item[1]) * 1000).toLocaleString(),
            isCompleted: item[2],
          }));
          console.log("totalStaked", convertedTotalStaked);
          console.log("totalRewards", convertedTotalRewards);
          console.log("stakedHistory", formattedStakedHistory);
          setStakedHistory(formattedStakedHistory)
          setTotalStakeAmount(convertedTotalStaked);
          setTotalStakedRewards(convertedTotalRewards);
          setStakingAPY(apy);
        }
      }
    };
    asyncCallWeb3();
  }, [Web3, window,account]);

  let portalContainer = document.querySelector("#portal-container-div-modal");
  if (!portalContainer) {
    portalContainer = document.createElement("div");
    portalContainer.className = "StackingModalPortal";
    portalContainer.id = "portal-container-div-modal";
    document.body.insertBefore(portalContainer, document.body.firstChild);
  }
  async function showModal(param) {
    document.body.style.overflow = param ? "hidden" : "auto";
    setStackingModal(param);
  }
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setStackingModal("");
  };

  return (
    <>
      {account && (
        <Flex className="stacking">
          <div onClick={() => showModal("Rewards")}>Rewards</div>
          <div onClick={() => showModal("History")}>History</div>
          <div onClick={() => showModal("Unstake")}>Unstake</div>
          {/* <div onClick={() => handleWriteToContract()}>Stake</div> */}
        </Flex>
      )}

      {stackingModal &&
        ReactDOM.createPortal(
          <StackingModal
            closeModal={closeModal}
            stackingModal={stackingModal}
            totalStakeAmount={totalStakeAmount}
            totalRewardAmount={totalStakedRewards}
            stakedHistory={stakedHistory || []}
          />,
          portalContainer
        )}
    </>
  );
}
export function StackingModal({ closeModal, stackingModal, totalStakeAmount, totalRewardAmount,stakedHistory }) {
  const [componentIndex, setComponentIndex] = useState(1);
  const [activeTab, setActiveTab] = useState("Stake");
  const { account } = useWeb3React();
  const closeModalv2 = async () => {
    console.log("close modelv2")
    if (stackingModal == "Unstake" || "Rewards") {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const contractAbi = ABI;
          const contractAddress = "0x2fE3a13D59a63F787897972f598348a1E666610A";
          const contract = new web3.eth.Contract(contractAbi, contractAddress);
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          const totalStaked = await contract.methods
            .getUserTotalStakedAmount(account)
            .call();
          if (totalStaked > 0) {
            const tx = await contract.methods.unstakeAll().send({
              from: account,
            });
            console.log("Transaction hash:", tx.transactionHash);
            if (tx.transactionHash) {
              closeModal;
            }
            closeModal;
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("MetaMask is not installed");
      }
    } else {
      closeModal;
    }
  };

  console.log("stakedHistory",stakedHistory)

  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      {(stackingModal === "Rewards" || stackingModal === "Unstake") && (
        <div className="StackingModal">
          <div className="modal_header">
            <span>{stackingModal === "Rewards" ? "Rewards" : "Unstake"}</span>
            <span className="cross_icon" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
          <div className="modal_content">
            {componentIndex === 1 && (
              <div>
                <Text
                  color="#949494"
                  fontSize="16px"
                  mb={stackingModal === "Rewards" ? '"5px"' : "8px"}
                >
                  {stackingModal === "Rewards"
                    ? "Unclaimed reward"
                    : "Staked Amount"}
                </Text>
                <Text
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                  }}
                  color="#ffffff"
                  fontSize="28px"
                  mb="24px"
                >
                  {stackingModal == "Rewards" ? `${parseFloat(totalRewardAmount)}` : `${parseFloat(totalStakeAmount)+parseFloat(totalRewardAmount)}`}
                  <Text ml={10} color="#ffffff" fontSize="18px">
                    NRK
                  </Text>
                </Text>
                {stackingModal === "Rewards" && (
                  <div>
                    <Text color="#949494" fontSize="16px" mb="5px">
                      Amount Staked
                    </Text>
                    <Text
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center",
                      }}
                      color="#ffffff"
                      fontSize="28px"
                      mb="24px"
                    >
                      {`${parseFloat(totalStakeAmount)}`}

                      <Text ml={10} color="#ffffff" fontSize="18px">
                        NRK
                      </Text>
                    </Text>
                    <Text color="#949494" fontSize="16px" mb="5px">
                      Claim reward
                    </Text>
                    <Text
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "center",
                      }}
                      color="#ffffff"
                      fontSize="28px"
                      mb="24px"
                    >
                      {`${parseFloat(totalRewardAmount)}`}

                      <Text ml={10} color="#ffffff" fontSize="18px">
                        NRK
                      </Text>
                    </Text>
                  </div>
                )}
              </div>
            )}
            {componentIndex === 2 && (
              <div>
                <Text color="#fff" fontSize="16px" mb={2}>
                  {stackingModal === "Rewards"
                    ? "Add amount to claim"
                    : "Add amount to unstake"}
                </Text>
                <div className="input_stake_amount">
                  <input placeholder="0.00" type="number" />
                  <span>Max</span>
                </div>
                {stackingModal === "Unstake" && (
                  <Text color="#949494" fontSize="12px" mt={"8px"} mb={"20px"}>
                    Minimum staking amount : 100NRK
                  </Text>
                )}
                <Text
                  color="#949494"
                  fontSize="16px"
                  mt={stackingModal === "Rewards" ? "20px" : "8px"}
                >
                  Amount unclaimed
                </Text>
                <Text
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                  }}
                  color="#ffffff"
                  fontSize="20px"
                  mb="27px"
                >
                  0.00000264
                  <Text ml={10} color="#ffffff" fontSize="12px">
                    NRK
                  </Text>
                </Text>
              </div>
            )}
            {componentIndex === 3 && (
              <div>
                <Image
                  style={{
                    margin: "10px auto",
                  }}
                  src={successIcon}
                />
                <Text
                  color="#fff"
                  fontSize="24px"
                  mt={stackingModal === "Rewards" ? "20px" : "8px"}
                >
                  {stackingModal === "Rewards"
                    ? "Reward claimed"
                    : "Unstaking Successful"}
                </Text>
                <Text
                  color="#949494"
                  fontSize="16px"
                  mt={stackingModal === "Rewards" ? "20px" : "8px"}
                >
                  Amount unclaimed
                </Text>

                <Text
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                  }}
                  color="#ffffff"
                  fontSize="20px"
                  mb="12px"
                >
                  0.00000264
                  <Text ml={10} color="#ffffff" fontSize="12px">
                    NRK
                  </Text>
                </Text>
                <Text
                  color="#949494"
                  fontSize="16px"
                  mt={stackingModal === "Rewards" ? "20px" : "8px"}
                >
                  Remaining{" "}
                  {stackingModal === "Rewards" ? "unclaimed" : "staked"}
                </Text>
                <Text
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                  }}
                  color="#ffffff"
                  fontSize="20px"
                  mb="27px"
                >
                  0.00000264
                  <Text ml={10} color="#ffffff" fontSize="12px">
                    NRK
                  </Text>
                </Text>
              </div>
            )}

            {(componentIndex === 1 || componentIndex === 2) && (
              <button
                style={{
                  width: componentIndex === 1 ? "100%" : "90%",
                }}
                onClick={async() =>{
                  await closeModalv2();
                  setComponentIndex(1)
                }}
                // (componentIndex + 1)
              >
                {/* {stackingModal === "Rewards"
                  ? componentIndex === 1
                    ? "Claim"
                    : "Confirm"
                  : componentIndex === 1
                  ? "Unstake"
                  : "Confirm"} */}
                {stackingModal === "Rewards" ? "UnStake" : "Confirm"}
              </button>
            )}
            {/* {(componentIndex === 1 || componentIndex === 3) && (
              <Text
                style={{ textDecoration: "underline", cursor: "pointer" }}
                mt={22}
                color="#AF83FF"
              >
                {stackingModal === "Rewards" ? "Claim" : "Unstake"} history
              </Text>
            )} */}
          </div>
        </div>
      )}
      {stackingModal === "History" && (
        <div className="History_Modal">
          <div>
            <div className="modal_header">
              <div>
                <Text color="#F4EEFF" fontSize="24px">
                  Transaction history
                </Text>
                {/* <div className="tabs_chip">
                  {["Stake", "Unstake"].map((i) => (
                    <span
                      key={i}
                      className={`${activeTab === i && "active_tab"}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {i}
                    </span>
                  ))}
                </div> */}
              </div>
              <svg
                className="cross_icon"
                onClick={closeModal}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="white"
                />
              </svg>
            </div>
            <div
              className={`modal_content ${
                (activeTab === "Unstake" || activeTab === "Claim") &&
                "grid_modal_changed"
              }`}
              style={{display:"flex",flex:1,flexDirection:"column"}}
            >
                                  <div style={{display:"flex",flex:1,flexDirection:"row",justifyContent:"space-between", width:"50vw"}}>
                      <div className="section_content">
                        <span>ID</span>
                      </div>

                      <div className="section_content">
                        <span>User Address</span>
                      </div>

                      <div className="section_content">
                        <span>Amount</span>
                      </div>

                      <div className="section_content">
                        <span>Time</span>
                      </div>
                      
                      <div className="section_content">
                        <span>Status</span>
                      </div>
                    </div>
              {stakedHistory.length ?
              stakedHistory.map((res,key)=>{
                console.log("res",res)
                return(

                    <div style={{display:"flex",flex:1,flexDirection:"row",justifyContent:"space-between", width:"50vw"}}>
                    <div className="section_content">
                    <ul>
                    <li>{key+1}</li>
                    </ul>
                    </div>
                    <div className="section_content">
                    <ul>
                    <li>{`${account.substr(0,4)}...${account.substr(account.length-4,account.length)}`}</li>
                    </ul>
                    </div>
                    <div className="section_content">
                    <ul>
                    <li>{`${res.amount} NRK`}</li>
                    </ul>
                    </div>
                    <div className="section_content">
                    <ul>
                    <li>{res.timestamp}</li>
                    </ul>
                    </div>
                    <div className="section_content">
                    <ul>
                    <li>{res.isCompleted ? "UnStaked": "Staked"}</li>
                    </ul>
                    </div>
                    </div>
                    )})
              :<div></div>}
              {/* {activeTab === "Stake" && (
                <div className="section_content">
                  <span>End Time</span>
                  <ul>
                    <li>23678</li>
                    <li>23678</li>
                  </ul>
                </div>
              )} */}
              {/* <div className="section_content">
                <span>TXN receipt</span>
                <ul>
                  <li className="arrow_icon">
                    Nordek Scan
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M10 5H8.2C7.08 5 6.52 5 6.092 5.218C5.71565 5.40969 5.40969 5.71565 5.218 6.092C5 6.52 5 7.08 5 8.2V15.8C5 16.92 5 17.48 5.218 17.908C5.40974 18.2843 5.71569 18.5903 6.092 18.782C6.519 19 7.079 19 8.197 19H15.803C16.921 19 17.48 19 17.907 18.782C18.284 18.59 18.59 18.284 18.782 17.908C19 17.48 19 16.921 19 15.803V14M20 9V4M20 4H15M20 4L13 11"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </li>
                  <li className="arrow_icon">
                    Nordek Scan
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M10 5H8.2C7.08 5 6.52 5 6.092 5.218C5.71565 5.40969 5.40969 5.71565 5.218 6.092C5 6.52 5 7.08 5 8.2V15.8C5 16.92 5 17.48 5.218 17.908C5.40974 18.2843 5.71569 18.5903 6.092 18.782C6.519 19 7.079 19 8.197 19H15.803C16.921 19 17.48 19 17.907 18.782C18.284 18.59 18.59 18.284 18.782 17.908C19 17.48 19 16.921 19 15.803V14M20 9V4M20 4H15M20 4L13 11"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export function StakeButton({stakeInputData}) {
  const { account } = useWeb3React();
  const [tokenBalance, setTokenBalance] = useState(0)
  const handleWriteToContract = async () => {
    if (typeof window.ethereum !== "undefined" && account) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const contractAbi = ABI;
        const contractAddress = "0x2fE3a13D59a63F787897972f598348a1E666610A";
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const balance = await checkEtherBalance(account);

        // Pass stake amount here
        const passStakeAmount = stakeInputData.toString();
        if (parseInt(balance) > parseInt(passStakeAmount)) {
          const amountToStake = web3.utils.toWei(passStakeAmount, "ether");

          const pauseStatus = await contract.methods.pause().call();
          if (pauseStatus) {
            console.error("Staking is paused");
            return;
          }

          const tx = await contract.methods.stake().send({
            from: account,
            value: amountToStake,
          });
        }

        console.log("Transaction hash:", tx.transactionHash);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  }

  useEffect(()=>{

    const callAsync = async()=> {
      if (typeof window.ethereum !== "undefined"  && account) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];
          const balance = await checkEtherBalance(account);
          setTokenBalance(balance);
          } catch (error) {
            console.error("Error:", error);
          }
        } else {
          console.error("MetaMask is not installed");
        }
    }

    callAsync();

  },[window,account])

  console.log("requess",tokenBalance,stakeInputData)

  return (
    <>
      {account ? (
        <Flex className="stacking">
          {/* <div onClick={() => handleWriteToContract()}>Stake</div> */}
          <button
            className="buttonCustom"
            onClick={() => {parseInt(tokenBalance) > parseInt(stakeInputData) ? handleWriteToContract(): ""}}
          >
            {parseInt(tokenBalance) < parseInt(stakeInputData) ? "Not Enough Balance" : "Stake" }
          </button>
        </Flex>
      ):
      <Flex className="stacking">
      {/* <div onClick={() => handleWriteToContract()}>Stake</div> */}
      <button
        className="buttonCustom"
        onClick={() => connectWallet()}
      >
        Connect Wallet
      </button>
    </Flex>}
    </>
  );
}
export default Home1;
