import React, { useRef, useState } from "react";
import { Box, Button, Card, Heading, Text } from "@radix-ui/themes";

const API_BASE = (import.meta.env.VITE_BASE_URL || "http://localhost:1234").replace(/\/+$/,'');

export const UrlShort = () => {
  const url = useRef();
  const [shortURL, setShortURL] = useState("");
  const [err, setErr] = useState("");

  const takeUrl = async () => {
    const URL = url.current.value?.trim();
    const token = localStorage.getItem("token") || "";
    const email = localStorage.getItem("email") || "ashu@yahoo.com"; // fallback for now
    setErr("");

    if (!URL) {
      setErr("Please enter a URL");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/short-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
          "X-User-Email": email
        },
        body: JSON.stringify({ bigurl: URL, email }) // body fallback too
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Failed (${res.status})`);

      if (data?.shorturl) {
        setShortURL(data.shorturl);
        console.log("Small URL is", data.shorturl);
      } else {
        setErr("Server did not return a short URL");
      }
    } catch (e) {
      console.log("Some problem in short url", e);
      setErr(e.message || "Failed to create short URL");
    }
  };

  return (
    <Box className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
        <Box className="text-center mb-8">
          <Heading size="7" className="font-bold text-gray-900 mb-5">
            Url Shortener
          </Heading>
          <Text as="label" size="3" weight="medium" className="text-gray-700 mb-2 block">
            Big Url
          </Text>
          <input
            ref={url}
            type="text"
            placeholder="Enter Url Here"
            className="w-full mb-3 px-4 py-3 bg-gray-50/80 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <Button
            onClick={takeUrl}
            type="button"
            size="3"
            className="flex-1 p-3 mr-5 font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 rounded-xl"
          >
            Short Url
          </Button>

          {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

          {shortURL && (
            <p className="mt-4">
              <a className="text-blue-600 hover:underline" href={shortURL} target="_blank" rel="noreferrer">
                {shortURL}
              </a>
            </p>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default UrlShort;
