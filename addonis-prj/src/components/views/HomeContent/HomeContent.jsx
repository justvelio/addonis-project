import React, { useEffect, useState } from "react";
// import Header from "../../Header/Header";
// import { getAllExtensions } from "../../firebase/services/extension.service";
import ProductInfo from "../../ProductInfo/ProductInfo";
import TopFields from "../../TopFields/TopFields";
import { Flex, Center } from "@chakra-ui/react";
import Hero from "../../Hero/Hero";
import ProductInfo2 from "../../ProductInfo2/ProductInfo2";

export default function HomeContent() {
  const [data, setData] = useState([]);
  // const [test, setTest] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const data = await fetch("https://randomuser.me/api/", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const res = await data.json();
  //     setTest(res);
  //   })();
  //   setData(getAllExtensions());
  // }, []);
  // console.log(test);

  return (
    <div className="bg-white">
      <Hero />
      {/* <Header /> */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
          <ProductInfo />
          <ProductInfo2 />
        <div className="flex flex-col items-center justify-center text-center pt-15">
          <h2 className="text-4xl font-bold tracking-tight text-slate-400 sm:text-6xl pb-12">
            Check out some of our addons
          </h2>
          <TopFields />
          <Flex align="center" justify="center" height="100vh">
            <Center>
              <div style={{ maxWidth: "100%" }}></div>
            </Center>
          </Flex>
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}
