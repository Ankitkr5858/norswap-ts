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
            className="hero-title-one"
            scale="xl"
            color="#ffffff"
            mb="40px"
          >
            {t("NORDEK Swap synergizes with MSMEs")}
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
  const portalContainer = document.createElement("div");
  portalContainer.className = "StackingModalPortal";
  document.body.insertBefore(portalContainer, document.body.firstChild);
  function showModal(param) {
    document.body.style.overflow = param ? "hidden" : "auto";
    setStackingModal(param);
  }
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setStackingModal("");
  };
  useEffect(() => {
    const portalElement = portalContainer;
    return () => {
      document.body.removeChild(portalElement);
    };
  }, []);
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
      {stackingModal === "History" && <div className="History_Modal">history modal is here</div>}
    </>
  );
}
export default Home1;
