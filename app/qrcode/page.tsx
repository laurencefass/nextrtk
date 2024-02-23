'use client'

import React, { useState, useEffect } from 'react';
var QRCode = require('qrcode')

// Define a type for the component props
type QRCodeGeneratorProps = {
  url: string;
};

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  const [qrSrc, setQrSrc] = useState<string>('');

  useEffect(() => {
    try {
      if (!url)
        return;

      // Generate QR code and set the resulting image source
      QRCode.toDataURL(url, { margin: 1, width: 400 })
        .then((dataUrl: string) => {
          setQrSrc(dataUrl);
        })
        .catch((error: any) => {
          console.error('Error generating QR code', error);
          setQrSrc('');
        });
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  return (
    <div>
      {qrSrc ? (
        <img src={qrSrc} alt="Generated QR Code" />
      ) : (
        <p>Generating QR code...</p>
      )}
    </div>
  );
};

const QRCodePage = () => {
  // const pathname = usePathname();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    // Check if window is defined (i.e., if running in the browser)
    if (typeof window !== 'undefined') {
      const url = window.location.href; // Gets the full URL
      console.log(url);
      setUrl(url);
    }
  }, []);

  return (
    <div className="content">
      <h1>QR Code Generator</h1>
      <h4>Scan this QR code with your mobile to link back to this page</h4>
      <p>QR codes can be generated for any URL and redirect to any route on your site. They can also be generated for individual users, and to access behind paywalls etc</p>
      {url && <QRCodeGenerator url={url} />}
    </div>
  );
};

export default QRCodePage;