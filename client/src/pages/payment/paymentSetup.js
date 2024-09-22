import React, { useState } from 'react';
import axios from 'axios';

const PayUCheckout = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    email: '',
    phone: '',
    productinfo: '',
    amount: '',
  });
  const [hash, setHash] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const txnid = 'TXN123456'; // Generate a unique transaction ID

    try {
      const hashResponse = await axios.post('http://localhost:8000/generate-hash', {
        txnid,
        amount: formData.amount,
        productinfo: formData.productinfo,
        firstname: formData.firstname,
        email: formData.email,
      });

      setHash(hashResponse.data.hash); // Store the generated hash

      const paymentData = {
        ...formData,
        key: 'pZrgMw',
        txnid: txnid,
        hash: hashResponse.data.hash,
        surl: 'http://localhost:3000/success', // Success URL
        furl: 'http://localhost:3000/failure', // Failure URL
        service_provider: 'payu_paisa',
      };

      // Redirect to PayU payment page
      const response = await axios.post('https://test.payu.in/merchant/postservice?form=2', paymentData);
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Payment request failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
      <input type="text" name="productinfo" placeholder="Product Info" value={formData.productinfo} onChange={handleChange} required />
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
      <button type="submit">Pay with PayU</button>
    </form>
  );
};

export default PayUCheckout;
