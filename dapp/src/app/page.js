"use client";

import { useState } from "react";
import hash from "object-hash";
import { addLink } from "@/app/services/Web3Service";

export default function Home() {

  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [fee, setFee] = useState("0");

  function onUrlChange(event) {
    setUrl(event.target.value);
  }

  function onFeeChange(event) {
    setFee(event.target.value);
  }

  function btnCreateClick() {
    const linkId = hash(url).slice(0, 5);
    setMessage("Sending your link to blockchain...");
    addLink({ url, linkId, feeInWei: fee})
      .then(() => {
        setUrl("");
        setFee("0");
        setMessage(`Your link was created with success: http://localhost:3000/${linkId}`)
      })
      .catch(err => setMessage(err.message));
  }

  return (
      <div className="container px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-6">
              <img src="/home.jpg" className="d-block mx-lg-auto img-fluid" width="700" height="500"></img>
            </div>
            <div className="col-6">
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Link Shield</h1>
              <p className="lead">Protect your links and earn with them</p>
              <hr />
              <p>Past your URL below, define your fee per click and connect your wallet to protect your link with blockchain tecnology</p>
              <div className="form-floating mb-3">
                <input type="text" id="url" className="form-control" value={url || ""} onChange={onUrlChange} />
                <label htmlFor="url">Link</label>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-floating">
                    <input type="number" id="fee" className="form-control" value={fee || "0"} onChange={onFeeChange}/>
                    <label htmlFor="fee">Fee per click(wei)</label>
                  </div>                  
                </div>
                <div className="col-6">
                  <button type="button" className="btn btn-primary w-100 h-100" onClick={btnCreateClick}>
                    <img src="/metamask.svg" width={32} className="me-2"></img>
                    Connect and Create Link
                  </button>                 
                </div>                
              </div>
              
              {
                message
                  ? <div className="alert alert-success g-3 col-12 mt-3" role="alert">{message}</div>
                  : <></>
              }
              
            </div>
          </div>
      </div>    
  );
}
