import { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { QRCode } from "react-qr-code";

function QRGenerator({ equipmentId, equipmentType }) {
  const [url, setUrl] = useState("");
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (equipmentId && equipmentType) {
      setUrl(`bpitindia.invenso.com/${equipmentType}/${equipmentId}`);
      // setUrl(`/${equipmentType}/${equipmentId}`);
    }
  }, [equipmentId, equipmentType]);

  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${equipmentId}.png`; 
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <div className="qrcode__container ml-36 mt-12">
      <div className="qrcode__container--parent" ref={qrCodeRef}>
        {url && (
          <div className="qrcode__download">
            <div className="qrcode__image flex justify-center">
              <QRCode value={url} size={150} />
            </div>
            <button className="border-2 border-black rounded-lg p-2 cursor-pointer mt-4" onClick={downloadQRCode}>Download QR Code</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRGenerator;
