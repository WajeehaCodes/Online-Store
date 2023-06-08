import { useEffect } from "react";

export default function About() {
	useEffect(() => {
		document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
	}, []);
	
	return (
		// <!-- Start Why Choose Us Section -->
		<div className="why-choose-section scssClass">
			<div className="container">
				<div className="row justify-content-between align-items-center">
					<div className="col-lg-6">
						<h2 className="section-title">Why Choose Us</h2>
						<p>Readers Club provides huge collection of books in diverse catalogue. We attempt to extend the customer satisfaction by catering easy user-friendly website and quicker delivery systems. Upside to all of this, we are disposed to provide exciting offers and pleasant discounts on our books. We believe in the power of reading and are committed to help you out to find you, your favorite book from different categories.</p>
						<div className="row my-5">
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="assets/img/truck.svg" alt="truck logo" className="imf-fluid" />
									</div>
									<h3>Fast &amp; Free Shipping</h3>
									<p>Our shipping process is streamlined and efficient, ensuring that your order is processed and shipped out quickly. You'll receive a confirmation email with tracking information once your order has been shipped, so you can keep an eye on its progress and know when to expect it.</p>
								</div>
							</div>
							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="assets/img/bag.svg" alt="bag logo" className="imf-fluid" />
									</div>
									<h3>Easy to Shop</h3>
									<p>We offers an easy shopping experience with a user-friendly website, wide selection of books, detailed descriptions, and a simple checkout process. We also provide fast shipping options and excellent customer service to ensure your satisfaction. We believe in the power of reading and are dedicated to helping you find your next favorite book. Thank you for choosing us as your book shopping destination.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="assets/img/support.svg" alt="support logo" className="imf-fluid" />
									</div>
									<h3>24/7 Support</h3>
									<p>We offer continuous contact support to assist you whenever you need it. Our customer service team is available around the clock via phone, email, or live chat to answer any questions you may have. Whether you need help placing an order, tracking a shipment, or resolving an issue with your purchase, we're here to help.</p>
								</div>
							</div>

							<div className="col-6 col-md-6">
								<div className="feature">
									<div className="icon">
										<img src="assets/img/return.svg" alt="return logo" className="imf-fluid" />
									</div>
									<h3>Hassle Free Returns</h3>
									<p>If you're not satisfied with your purchase for any reason, you can return it to us for a full refund or exchange. Simply contact our customer service team to initiate the return process. We'll provide you with instructions on how to return your item and issue a refund or exchange as soon as we receive the returned item.
										We believe in making the return process as easy and convenient as possible for our customers.</p>
								</div>
							</div>

						</div>
					</div>

					<div className="col-lg-5">
						<div className="img-wrap">
							<img src="assets/img/islami.png" alt="deco logo" className="img-fluid" />
						</div>
					</div>

				</div>
			</div>
		</div>
		// {/* <!-- End Why Choose Us Section --> */}
	);
}