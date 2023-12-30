import "./style.css";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Qrcode from "../../components/QrCode";
import { generateQrCodeAPI, getQrCodesAPI } from "../../apis/common";
import toast from "react-hot-toast";
import TableStatus from "../../components/TableStatus";

function Qrcodes() {

  const [data, setData] = useState([]);
  const [profileHex, setProfileHex] = useState("");
  const [showTableStatus, setShowTableStatus] = useState(null);
  const [showTrash, setShowTrash] = useState(false);

  const fetchQrCodes = async () => {
    const loader = toast.loading("Fetching Data...", { duration: 20000 });
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
    const loader = toast.loading("Adding...", { duration: 20000 });
    await generateQrCodeAPI().then(res => {
      if (res.data.status === "success") {
        setData(prev => [{ ...res.data.data }, ...prev]);
        setProfileHex(res.data.profileHex);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => toast.error(err.message));
    toast.dismiss(loader);
  }

  return (
    <>
      {!!showTableStatus && <TableStatus table={showTableStatus} setShowTableStatus={setShowTableStatus} />}
      <Card className="settings-card shadow-lg p-4 ms-4 border-none border-15">
        <div className="d-flex">
          <h3 className="h3">{showTrash ? "Trash" : "Tables and QR Codes"}</h3>
          {!showTrash &&
            <button className="btn btn-primary ms-4" onClick={genQR}>Add New</button>
          }
          <button className="btn btn-secondary ms-2" onClick={() => setShowTrash(!showTrash)}>{showTrash ? "Go Back" : "Trash"}</button>
        </div>
        <hr />

        {showTrash ?
          <div className="w-100 d-flex subaccount">
            {data.filter(qr => qr.is_diabled).map(qr =>
              <Qrcode key={qr.id} data={qr} setData={setData} profileHex={profileHex} />
            )}
            {data.filter(qr => qr.is_diabled).length === 0 && <p>Empty</p>}
          </div>
          :
          <div className="w-100 d-flex subaccount">
            {data.filter(qr => !qr.is_diabled).map(qr =>
              <Qrcode key={qr.id} data={qr} setData={setData} profileHex={profileHex} setShowTableStatus={setShowTableStatus} />
            )}
          </div>
        }

      </Card>
    </>
  );
}

export default Qrcodes;