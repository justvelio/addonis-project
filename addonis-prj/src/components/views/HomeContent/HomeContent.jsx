import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import { getAllExtensions } from "../../firebase/services/extension.service";
import ProductInfo from "../../ProductInfo/ProductInfo";
import TopFields from "../../TopFields/TopFields";

export default function HomeContent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getAllExtensions());
  }, []);

  return (
    <div className="bg-slate-900 h-6000">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center pt-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl sm:text-center pb-8">
          Become the person you've ever <span className="italic">wanted</span> to
          be.
        </h1>
        <ProductInfo />
        </div>
        <div className="flex flex-col items-center justify-center text-center pt-15">
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-6xl pb-12">
            Check out some of our addons
          </h2>
          <TopFields />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}
