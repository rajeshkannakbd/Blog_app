import React, { useEffect, useRef, useState } from "react";

const TestAd = () => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "adsbygoogle-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1452228647540157";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    const timeout = setTimeout(() => {
      try {
        if (window.adsbygoogle && adRef.current) {
          window.adsbygoogle.push({});
          setAdLoaded(true);
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full flex justify-center my-6 px-2">
      {!adLoaded && (
        <div className="w-full h-40 sm:h-56 md:h-72 lg:h-80 flex items-center justify-center border border-dashed border-gray-400 bg-gray-100 text-gray-500 text-sm sm:text-base rounded-lg">
          [ Ad Placeholder – Waiting for AdSense ]
        </div>
      )}

      <ins
        ref={adRef}
        className="adsbygoogle w-full h-40 sm:h-56 md:h-72 lg:h-80"
        style={{ display: adLoaded ? "block" : "none" }}
        data-ad-client="ca-pub-1452228647540157"
        data-ad-slot="1460341116"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default TestAd;
