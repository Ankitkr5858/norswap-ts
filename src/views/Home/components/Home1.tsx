// @ts-nocheck
// @ts-nocheck
import { Flex, Heading, Overlay, Text } from "@nswap/uikit";
import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWalletButton";
import { useTranslation } from "contexts/Localization";
import { divide } from "lodash";
import Image from "next/image";
import { React, useEffect, useRef, useState } from "react";
import bunnyImage from "../../../../public/images/home/home-1.png";
import CryptoConvertor from "./CryptoConvertor";
import successIcon from "./../../../../public/images/successful.png";
import ReactDOM from "react-dom";
const Home1 = () => {
  const { t } = useTranslation();
  const { account } = useWeb3React();
  // const [stackingModal, setStackingModal] = useState(true);

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={[account ? "280px" : "50px", null, 0]}
        id="homepage-hero"
        padding={["10%", "14%"]}
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
          <CryptoConvertor />
          <Stacking />
          <Text
            className="hero-title-two"
            color="#ffffff"
            fontSize="18px"
            mb="24px"
          >
            {t(
              "The first Equity Crowdfunding platform built using NORDEK chain technology"
            )}
          </Text>
          <Flex>{!account && <ConnectWalletButton mr="8px" />}</Flex>
        </Flex>
      </Flex>
    </>
  );
};

export function Stacking() {
  const [stackingModal, setStackingModal] = useState("");
  let portalContainer = document.querySelector("#portal-container-div-modal");
  if (!portalContainer) {
    portalContainer = document.createElement("div");
    portalContainer.className = "StackingModalPortal";
    portalContainer.id = "portal-container-div-modal";
    document.body.insertBefore(portalContainer, document.body.firstChild);
  }
  function showModal(param) {
    document.body.style.overflow = param ? "hidden" : "auto";
    setStackingModal(param);
  }
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setStackingModal("");
  };

  return (
    <>
      <Flex className="stacking">
        <div onClick={() => showModal("Rewards")}>Rewards</div>
        <div onClick={() => showModal("History")}>History</div>
        <div onClick={() => showModal("Unstake")}>Unstake</div>
      </Flex>
      {stackingModal &&
        ReactDOM.createPortal(
          <StackingModal
            closeModal={closeModal}
            stackingModal={stackingModal}
          />,
          portalContainer
        )}
    </>
  );
}
export function StackingModal({ closeModal, stackingModal }) {
  const [componentIndex, setComponentIndex] = useState(1);
  const [activeTab, setActiveTab] = useState("Stake");

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
                  0.264
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
                      0.264
                      <Text ml={10} color="#ffffff" fontSize="18px">
                        NRK
                      </Text>
                    </Text>
                    <Text color="#949494" fontSize="16px" mb="5px">
                      Claimed reward
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
                      0.00000264
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
                onClick={() => setComponentIndex(componentIndex + 1)}
              >
                {stackingModal === "Rewards"
                  ? componentIndex === 1
                    ? "Claim"
                    : "Confirm"
                  : componentIndex === 1
                  ? "Unstake"
                  : "Confirm"}
              </button>
            )}
            {(componentIndex === 1 || componentIndex === 3) && (
              <Text
                style={{ textDecoration: "underline", cursor: "pointer" }}
                mt={22}
                color="#AF83FF"
              >
                {stackingModal === "Rewards" ? "Claim" : "Unstake"} history
              </Text>
            )}
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
                <div className="tabs_chip">
                  {["Stake", "Unstake", "Claim"].map((i) => (
                    <span
                      key={i}
                      className={`${activeTab === i && "active_tab"}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {i}
                    </span>
                  ))}
                </div>
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
            >
              <div className="section_content">
                <span>ID</span>
                <ul>
                  <li>23678</li>
                  <li>23678</li>
                </ul>
              </div>

              <div className="section_content">
                <span>User Address</span>
                <ul>
                  <li>23678</li>
                  <li>23678</li>
                </ul>
              </div>
              <div className="section_content">
                <span>Txn Hash</span>
                <ul>
                  <li>23678</li>
                  <li>23678</li>
                </ul>
              </div>
              <div className="section_content">
                <span>Amount</span>
                <ul>
                  <li>23678</li>
                  <li>23678</li>
                </ul>
              </div>
              <div className="section_content">
                <span>{activeTab === "Stake" ? "Start" : activeTab} Time</span>
                <ul>
                  <li>23678</li>
                  <li>23678</li>
                </ul>
              </div>
              {activeTab === "Stake" && (
                <div className="section_content">
                  <span>End Time</span>
                  <ul>
                    <li>23678</li>
                    <li>23678</li>
                  </ul>
                </div>
              )}
              <div className="section_content">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Home1;
