import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import { SnackbarProvider } from "notistack";
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import AboutUs from "./AboutUs";
import DashBoard from "./DashBoard";
import DashboardHome from "./DashboardHome";
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from "./utils/network/getAlgoClientConfigs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardUpload from "./DashboardUpload ";

let providersArray: ProvidersArray;
if (import.meta.env.VITE_ALGOD_NETWORK === "") {
  const kmdConfig = getKmdConfigFromViteEnvironment();
  providersArray = [
    {
      id: PROVIDER_ID.KMD,
      clientOptions: {
        wallet: kmdConfig.wallet,
        password: kmdConfig.password,
        host: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ];
} else {
  providersArray = [
    { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    { id: PROVIDER_ID.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ];
}

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment();

  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  });

  return (
    <div className="">
      <SnackbarProvider maxSnack={3}>
        <WalletProvider value={walletProviders}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/dashboard" element={<DashBoard />}>
              <Route path="home" element={<DashboardHome />} />
              <Route path="upload" element={<DashboardUpload />} />
            </Route>
          </Routes>
        </WalletProvider>
      </SnackbarProvider>
    </div>
  );
}
