import React, { useEffect } from "react";
import "../../styles/terms.css";

export default function Terms() {
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="container main-content terms-of-services feature">
      <h2 className="text-center section-title">Terms of Service</h2>
      <p>
        Welcome to our book store! By accessing or using our website, you agree
        to be bound by the following terms and conditions (“Terms of Use”).
        Please read them carefully. If you do not agree to all of the Terms of
        Use, do not use our website.
      </p>
      <h5>Use of our Website</h5>
      <p>
        You may use our website only for lawful purposes and in accordance with
        these Terms of Use. You may not use our website:
      </p>
      <p>
        We reserve the right to terminate or restrict your use of our website,
        without notice, for any or no reason, and without liability to you.
      </p>
      <h5>Intellectual Property</h5>
      <p>
        The content on our website, including but not limited to text, graphics,
        images, and software, is the property of our company and is protected by
        copyright and other intellectual property laws. You may not use any
        content on our website for commercial purposes without obtaining a
        license to do so from us or our licensors.
      </p>
      <h5>Disclaimer of Warranties</h5>
      <p>
        Our website is provided on an “as is” and “as available” basis. We make
        no representations or warranties of any kind, express or implied, as to
        the operation of our website or the information, content, materials, or
        products included on our website. We do not warrant that our website
        will be uninterrupted or error-free, and we will not be liable for any
        interruptions or errors.
      </p>
      <h5>Limitation of Liability</h5>
      <p>
        We will not be liable for any damages of any kind arising from the use
        of our website, including but not limited to direct, indirect,
        incidental, punitive, and consequential damages.
      </p>
      <h5>Governing Law</h5>
      <p>
        These Terms of Use and your use of our website are governed by and
        construed in accordance with the laws of the State of Pakistan.
      </p>
      <br />
    </div>
  );
}
