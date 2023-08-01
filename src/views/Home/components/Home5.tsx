import { Flex, Text, Heading, Link, Button } from "@nswap/uikit";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "contexts/Localization";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SliderData = [
  {
    imgSrc: "/images/home/invest_in_norswap.png",
    heading: "INVEST IN NORSWAP",
    description:
      "Unlock attractive benefits with NORDEK Swap, right at your fingertips",
    buttonText: "Join us Now",
    buttonLink: "/swap",
  },
  {
    imgSrc: "/images/home/passive_income.png",
    heading: "HIGH PASSIVE INCOME",
    description:
      "Unlock attractive benefits with NORDEK Swap, right at your fingerprints",
    buttonText: "Join us Now",
    buttonLink: "/link-2",
  },
  // Add more slides as needed
];

const Home5 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const primaryButton = {
    to: "/swap",
    text: "Join us Now",
    external: false,
  };
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const autoSlideIntervalRef = useRef(null);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? SliderData.length - 1 : prevSlide - 1
    );
    setIsAutoSliding(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === SliderData.length - 1 ? 0 : prevSlide + 1
    );
    setIsAutoSliding(false);
  };

  const handleBarClick = (index) => {
    setCurrentSlide(index);
    setIsAutoSliding(false);
  };
  const autoNextSlide = () => {
    if (isAutoSliding) {
      setCurrentSlide((prevSlide) =>
        prevSlide === SliderData.length - 1 ? 0 : prevSlide + 1
      );
    }
  };

  useEffect(() => {
    autoSlideIntervalRef.current = setInterval(autoNextSlide, 3000);
    return () => clearInterval(autoSlideIntervalRef.current);
  }, [isAutoSliding]);

  const buttonStyle = {
    margin: "10px",
    background: "none",
    height: "5px",
    width: "70px",
    backgroundColor: "#fff",
  };

  const activeButtonStyle = {
    backgroundColor: "#626262",
    margin: "10px",
    background: "none",
    height: "5px",
  };
  return (
    <>
      <Flex
        position="relative"
        flexDirection={["column", null, null, null]}
        alignItems={[null, null, null, "center"]}
        justifyContent="center"
        mt={[account ? "280px" : "50px", null, 0]}
        mb="50px"
        className=""
        id="homepage-home5"
      >
        {SliderData.map((slide, index) => (
          <Flex
            key={index}
            width="100%"
            flex="1"
            flexDirection={["column", null, null, "row"]}
            alignItems={["center", null]}
            style={{ display: index === currentSlide ? "flex" : "none" }}
          >
            <Flex
              mb={["20px", null, null, null]}
              mx={["auto", null, null, "0"]}
              // width={["80%", null, null, "34%"]}
              alignItems={["center", null, null, "flex-start"]}
            >
              <Image
                src={slide.imgSrc}
                width="369"
                height="369"
                priority
                alt={t("Invest In Norswap")}
              />
            </Flex>
            <Flex
              width={["90%", null, null, "66%"]}
              paddingLeft={[null, null, null, "24px"]}
              flexDirection="column"
              alignItems={[null, "center", null, "flex-start"]}
            >
              <Heading color="#FFFFFF" scale="xxl">
                {t(slide.heading)}
              </Heading>
              <Text color="#FFFFFF" fontSize="18px" mb="24px" mt="20px">
                {t(slide.description)}
              </Text>
              <Flex mt="15px">
                <Button>
                  <Link external href={slide.buttonLink}>
                    <Text color="#FFFFFF" bold fontSize="16px">
                      {slide.buttonText}
                    </Text>
                  </Link>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Flex alignItems={[null, null, null, "center"]} justifyContent="center">
        <Button
          onClick={() => {
            handlePrevSlide();
            setIsAutoSliding(true); // Resume auto-sliding after user clicks prev button
          }}
          style={currentSlide === 0 ? activeButtonStyle : buttonStyle}
        ></Button>
        <Button
          onClick={() => {
            handleNextSlide();
            setIsAutoSliding(true); // Resume auto-sliding after user clicks next button
          }}
          style={
            currentSlide === SliderData.length - 1
              ? activeButtonStyle
              : buttonStyle
          }
        ></Button>
      </Flex>
    </>
  );
};

export default Home5;
