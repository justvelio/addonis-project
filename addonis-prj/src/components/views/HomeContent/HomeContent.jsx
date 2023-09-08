import { useEffect, useState } from "react";
// import Header from "../../Header/Header";
// import { getAllExtensions } from "../../firebase/services/extension.service";
import { ref, get, onValue } from "firebase/database";
import { db } from "../../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../config/firebase-config";
import PluginList from "../../PluginList/PluginList";
import ProductInfo from "../../ProductInfo/ProductInfo";
import TopFields from "../../TopFields/TopFields";
import { Box } from "@chakra-ui/react";
import Hero from "../../Hero/Hero";
import ProductInfo2 from "../../ProductInfo2/ProductInfo2";
import PluginDetailView from "../../PluginDetailView/PluginDetailView";
import PluginTabs from "../../PluginTabs/PluginTabs";


export default function HomeContent() {
  // const [data, setData] = useState([]);
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

  const [plugins, setPlugins] = useState([]);
  const [selectedPlugin, setSelectedPlugin] = useState(null);

  const [isDetailViewOpen, setDetailViewOpen] = useState(false);

  const handlePluginClick = (plugin) => {
    setSelectedPlugin(plugin);
    setDetailViewOpen(true);
  };

  useEffect(() => {
    const pluginRef = ref(db, 'plugins');
    const handleData = snap => {
      if (snap.val()) setPlugins(Object.values(snap.val()));
    }

    const unsubscribe = onValue(pluginRef, handleData, error => alert(error));
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {selectedPlugin ? (
        <PluginDetailView
          plugin={selectedPlugin}
          onClose={() => setSelectedPlugin(null)}
        />
      ) : (
        <>
          <Hero />
          <Box mt={6}>
            <PluginTabs plugins={plugins} />
          </Box>
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <ProductInfo />
            <ProductInfo2 />
          </div>
        </>
      )}
    </div>
  );
}
