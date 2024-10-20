import ClientComponent from "@/components/Chat";
import { AnimatePresence } from "framer-motion";
import { fetchAccessToken } from "hume";
import Image from "next/image";
import soundthingy from "../../components/sound.png";

export default async function Page() {
  const accessToken = await fetchAccessToken({
    apiKey: String(process.env.HUME_API_KEY),
    secretKey: String(process.env.HUME_SECRET_KEY),
  });

  if (!accessToken) {
    throw new Error();
  }

  return (
  <div>
    <ClientComponent accessToken={accessToken} />
  </div>)
  ;
}