import axios from "axios";
import { useState } from "react";
import svgIcon from "../public/icons/cut.svg";
import { TbFidgetSpinner } from "react-icons/tb";
import Head from "next/head";
export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const cutUrl = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("https://api.urlo.in/api/short-url", {
        originalUrl: url,
        userName: "sidrozzg@gmail.com",
      });
      setShortUrl(res.data.data.shortUrl);
      setLoading(false);
      console.log(res);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
    <Head>
    <title>CUT-IT URL Shorener</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="flex h-screen w-full ">
      <div className="flex flex-col items-center justify-center bg-white w-1/2">
        <div className="w-3/4">
          <h1 className="text-7xl text-sky-800 font-primary">CUT IT</h1>
          <p className="p-2 font-primary">
            CUT IT is free shorten url service provided by{" "}
            <a
              href="https://urlo.in"
              target={"_blank"}
              className="italic text-sky-800 underline cursor-pointer"
            >
              urlo.in
            </a>{" "}
            and this website is just a simple minify design by Majed
            Alhasin 🫡
          </p>
          {shortUrl ? (
            <h1>{shortUrl}</h1>
          ) : (
            <div>
              <input
                onChange={(e: any) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="p-3 rounded-md w-full focus:outline-none appearance-none focus:border-sky-800 transition focus:ring-0"
                type="text"
              />
              <button
                onClick={cutUrl}
                className="bg-sky-700 hover:bg-sky-800 transition text-white px-3 py-1.5 mt-4 rounded-md"
              >
                {loading ? (
                  <TbFidgetSpinner
                    className="text-white animate-spin"
                    size={20}
                  />
                ) : (
                  "Shorten URL"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col  gap-5 items-center justify-center bg-sky-500 w-1/2">
        <img src={svgIcon.src} height={200} width={200} alt="" />
        <a href="https://www.linkedin.com/in/alhasenmajed/" target={"_blank"} className="italic opacity-10">By Majed Alhasin</a>
      </div>
    </div>
    </>
  );
}
