import React, { useEffect, useRef, useState } from "react";

const TestAd = () => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Load AdSense script if not already loaded
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
          setAdLoaded(true); // Assume ad was pushed
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 500); // Wait for DOM to settle

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", margin: "20px 0" }}>
      {!adLoaded && (
        <div
          style={{
            height: "280px",
            backgroundColor: "#f0f0f0",
            color: "#888",
            border: "1px dashed #ccc",
            lineHeight: "280px",
            fontSize: "16px",
            margin:"20px"
          }}
        >
          [ Ad Placeholder – Waiting for AdSense ]
        </div>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: adLoaded ? "block" : "none", height: "280px" }}
        data-ad-client="ca-pub-1452228647540157"
        data-ad-slot="1460341116"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default TestAd;
