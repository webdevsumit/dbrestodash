import "./style.css";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

function Qrcodes() {
  return (
    <>
      <Card className="settings-card shadow-lg p-4 ms-4 border-none border-15">
        <div className="d-flex">
          <h3 className="h3 text-decoration-underline">QR Codes</h3>
          <button className="btn btn-primary ms-4">Add New</button>
        </div>

        <div className="w-100 d-flex subaccount">
          <div className="qrcodes">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"value"}
              viewBox={`0 0 256 256`}
            />
            <h5 className="table_no_text">QR For Table 1</h5>
          </div>

          <div className="qrcodes">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"value"}
              viewBox={`0 0 256 256`}
            />
            <h5 className="table_no_text">QR For Table 2</h5>
          </div>

          <div className="qrcodes">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"value"}
              viewBox={`0 0 256 256`}
            />
            <h5 className="table_no_text">QR For Table 3</h5>
            <a>
              {" "}
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </a>
          </div>

          <div className="qrcodes">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"value"}
              viewBox={`0 0 256 256`}
            />
            <h5 className="table_no_text">QR For Table 4</h5>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Qrcodes;
