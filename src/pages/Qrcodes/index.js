import "./style.css";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Qrcode from "../../components/QrCode";
import { generateQrCodeAPI, getQrCodesAPI } from "../../apis/common";
import toast from "react-hot-toast";

function Qrcodes() {

  const [data, setData] = useState([]);
  const [profileHex, setProfileHex] = useState("");

  const fetchQrCodes = async () => {
    const loader = toast.loading("Fetching Data...", {duration: 20000});
    await getQrCodesAPI().then(res => {
      if (res.data.status === "success") {
        setData(res.data.data);
        setProfileHex(res.data.profileHex);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    toast.dismiss(loader);
  }

  useEffect(() => {
    fetchQrCodes();
  }, []);

  const genQR = async () => {
    const loader = toast.loading("Adding...", {duration: 20000});
    await generateQrCodeAPI().then(res => {
      if (res.data.status === "success") {
        setData(prev=>[{...res.data.data}, ...prev]);
        setProfileHex(res.data.profileHex);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    toast.dismiss(loader);
  }

  return (
    <>
      <Card className="settings-card shadow-lg p-4 ms-4 border-none border-15">
        <div className="d-flex">
          <h3 className="h3">QR Codes</h3>
          <button className="btn btn-primary ms-4" onClick={genQR}>Add New</button>
        </div>
        <hr />

        <div className="w-100 d-flex subaccount">
          {data.map(qr =>
            <Qrcode key={qr.id} data={qr} setData={setData} profileHex={profileHex} />
          )}
        </div>
      </Card>
    </>
  );
}

export default Qrcodes;