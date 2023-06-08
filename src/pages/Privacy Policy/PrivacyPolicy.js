import React, { useEffect } from "react";
import "../../styles/terms.css";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="container main-content terms-of-services">
      <h2 className="text-center">Privacy Policy</h2>
      <p>
        At our book store, we are committed to protecting your privacy. We use
        the information we collect about you to process orders and to provide a
        more personalized shopping experience.
      </p>
      <h5>Information We Collect</h5>
      <p>
        When you place an order, we need to know your name, email address,
        mailing address, credit card number, and expiration date. This
        information is used to process and fulfill your order and to notify you
        of your order status. You can browse our website anonymously without
        having to provide personal information. However, if you have an account
        and log in with your user name and password, we may be able to identify
        you. We have implemented appropriate technical and security measures to
        protect your personal information from unauthorized access, loss, or
        damage. These measures include secure servers and firewalls on our
        servers. In some cases, we may request proof of identity before
        disclosing personal information to you. You are responsible for
        protecting your password and computer from unauthorized access.
      </p>
      <h5>Sharing of Information</h5>
      <p>
        We will not share your personal information with any third parties
        except as necessary to process and ship your order. We may also release
        information when we believe it is necessary to comply with the law,
        enforce our site policies, or protect ours or others' rights, property,
        or safety.
      </p>
      <h5>Security</h5>
      <p>
        Our site uses secure socket layer (SSL) technology to encrypt your
        personal information as it is transmitted to us. We also have security
        measures in place to protect against the loss, misuse, and alteration of
        your information. We take the protection of your data and privacy
        seriously. We will only use your personal information in accordance with
        this Privacy Policy, and we will only collect necessary and relevant
        information for our interactions with you. Trust is a key component of
        data protection, and we value your trust in us.
      </p>
      <h5>Opt-Out</h5>
      <p>
        We may use your contact information to send you updates about our
        company, products, sales promotions, newsletters, and affiliates. If you
        do not want to receive this additional information, you can click the
        'unsubscribe' link in any email we send to you. Within 7 business days
        of receiving your request, we will stop sending you the requested
        information. If your request is unclear, we will contact you for
        clarification. You have the right to request access to the personal data
        we hold or process about you, and to correct any inaccuracies in your
        data at no cost. You also have the right to ask us to stop using your
        personal data for direct marketing purposes at any time
      </p>
      <h5>Changes to This Policy</h5>
      <p>
        We reserve the right to change our privacy policy at any time. Any
        changes to our policy will be posted on this page.
      </p>
      <br />
    </div>
  );
};

export default PrivacyPolicy;
