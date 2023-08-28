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
    <div>
      <Hero />
      <div className="relative isolate px-6 pt-14 lg:px-8">
          <ProductInfo />
          <ProductInfo2 />
        <div className="flex flex-col items-center justify-center text-center pt-15">
          <Flex align="center" justify="center" height="100vh">
          </Flex>
        </div>
      </div>
    </div>
  );
}
