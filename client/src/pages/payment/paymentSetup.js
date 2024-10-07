import React, { useEffect, useState } from "react";
import axios from "axios";

const PayUCheckout = () => {
  const [formData, setFormData] = useState({
    firstname: "Ashish",
    email: "test@gmail.com",
    phone: "9988776655",
    productinfo: "iPhone",
    amount: "10",
  });
  const [hash, setHash] = useState("");
  const txnid = "t6svtqtjRdl4ws"; // Generate a unique transaction ID

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    axios.post(
      "http://localhost:8000/generate-hash",
      {
        txnid:'t6svtqtjRdl4ws',
        amount: formData.amount,
        productinfo: formData.productinfo,
        firstname: formData.firstname,
        email: formData.email,
      }
    ).then((response)=>setHash(response?.data?.hash));
    // 
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const hashResponse = await axios.post(
        "http://localhost:8000/generate-hash",
        {
          txnid,
          amount: formData.amount,
          productinfo: formData.productinfo,
          firstname: formData.firstname,
          email: formData.email,
        }
      );

      setHash(hashResponse.data.hash); // Store the generated hash

      const paymentData = {
        ...formData,
        key: "pZrgMw",
        txnid: txnid,
        hash: hashResponse.data.hash,
        surl: "http://localhost:3000/success", // Success URL
        furl: "http://localhost:3000/failure", // Failure URL
        service_provider: "payu_paisa",
      };

      // Redirect to PayU payment page
      const response = await axios.post(
        "https://test.payu.in/_payment",
        paymentData
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment request failed:", error);
    }
  };
console.log("hash",hash)
  return (
    <form action="https://test.payu.in/_payment" method="post">
      <input type="hidden" name="key" value="pZrgMw" />
      <input type="hidden" name="txnid" value="t6svtqtjRdl4ws" />
      <input type="hidden" name="productinfo" value="iPhone" />
      <input type="hidden" name="amount" value="10" />
      <input type="hidden" name="email" value="test@gmail.com" />
      <input type="hidden" name="firstname" value="Ashish" />
      <input type="hidden" name="lastname" value="Kumar" />
      <input
        type="hidden"
        name="surl"
        value="https://apiplayground-response.herokuapp.com/"
      />
      <input
        type="hidden"
        name="furl"
        value="https://apiplayground-response.herokuapp.com/"
      />
      <input type="hidden" name="phone" value="9988776655" />
      <input type="hidden" name="hash" value={hash} />
      <input type="submit" value="submit" />{" "}
    </form>
  );
};

export default PayUCheckout;
