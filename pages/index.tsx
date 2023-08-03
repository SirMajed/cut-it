import axios from "axios";
import { useState } from "react";
import svgIcon from "../public/icons/cut.svg";
import { TbFidgetSpinner } from "react-icons/tb";
import { MdContentCopy, MdCheck } from "react-icons/md";
import Head from "next/head";
import Image from "next/image";
import copy from "copy-to-clipboard";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const cutUrl = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "https://api.short.io/links",
        {
          originalURL: url,
          domain: "go.majed.work",
        },
        {
          headers: {
            authorization: process.env.NEXT_PUBLIC_API,
          },
          responseType: "json",
        }
      );
      setShortUrl(res.data.shortURL);
      setLoading(false);
      console.log(res);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  const copyUrl = () => {
    setCopied(true);
    copy(shortUrl);
    setTimeout(() => {
      setCopied(false);
    }, 2300);
  };

  const shortenAnotherUrl = () => {
    setShortUrl("");
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
            <p className="px-1 py-2 font-primary">
              CUT IT is free shorten url service provided by
              <a
                href="https://urlo.in"
                target={"noopener noreferrer"}
                className="italic text-sky-800 underline cursor-pointer"
              >
                urlo.in
              </a>{" "}
              and this website is just a simple minify design by Majed Alhasin 🫡
            </p>
            {shortUrl ? (
              <div>
                <div className="p-2 bg-sky-100 rounded-md shadow-sm flex justify-between items-center">
                  <h1 className="mx-2">
                    {copied ? (
                      <span className="text-sky-600 flex items-center gap-1">
                        Link copied to clipboard{" "}
                        <MdCheck className="text-sky-800" size={20} />{" "}
                      </span>
                    ) : (
                      shortUrl
                    )}
                  </h1>
                  <MdContentCopy
                    onClick={copyUrl}
                    size={20}
                    className="cursor-pointer text-sky-800"
                  />
                </div>
                <button
                  onClick={shortenAnotherUrl}
                  className="bg-sky-700 hover:bg-sky-800 transition text-white px-3 py-1.5 mt-4 rounded-md"
                >
                  Shorten another URL
                </button>
              </div>
            ) : (
              <div>
                <form onSubmit={cutUrl}>
                  <input
                    disabled={loading}
                    onChange={(e: any) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="p-3 rounded-md w-full focus:outline-none appearance-none focus:border-sky-800 transition focus:ring-0"
                    type="text"
                  />
                  <button
                    type="submit"
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
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col  gap-5 items-center justify-center bg-sky-500 w-1/2">
          <Image src={svgIcon.src} height={200} width={200} alt="" />
          <a
            href="https://www.linkedin.com/in/alhasenmajed/"
            target={"noopener noreferrer"}
            className="italic opacity-10"
          >
            By Majed Alhasin
          </a>
        </div>
      </div>
    </>
  );
}
