import { Flex, Text, Heading, Link, Button } from "@nswap/uikit";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "contexts/Localization";
import Image from "next/image";
import { useState } from "react";

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
    imgSrc: "/images/home/invest_in_norswap.png",
    heading: "SLIDE 2 HEADING",
    description: "Description of Slide 2",
    buttonText: "Button Text 2",
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
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? SliderData.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === SliderData.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleBarClick = (index) => {
    setCurrentSlide(index);
  };
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
        flexDirection={["column-reverse", null, null, "row"]}
        alignItems={["flex-end", null, null, "center"]}
        justifyContent="center"
        mt={[account ? "280px" : "50px", null, 0]}
        mb="50px"
        id="homepage-home5"
      >
        {SliderData.map((slide, index) => (
          <Flex
            key={index}
            width="100%"
            flex="1"
            flexDirection="row"
            style={{ display: index === currentSlide ? "flex" : "none" }}
          >
            <Flex width="34%">
              <Image
                src={slide.imgSrc}
                width="369"
                height="369"
                priority
                alt={t("Invest In Norswap")}
              />
            </Flex>
            <Flex width="66%" paddingLeft={["25px"]} flexDirection="column">
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
          onClick={handlePrevSlide}
          style={currentSlide === 0 ? activeButtonStyle : buttonStyle}
        ></Button>
        <Button
          onClick={handleNextSlide}
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
