import { Contact } from "./Contact"
import "./styles.css";

// export const dynamic = "force-dynamic";

export default async function Page() {
    return <>
        <div className="contact-header">
            <div className="image">
                <img src="/syntapse-logo-2.png" alt="logo" />
            </div>
            <div className="text">
                <h1>Contact Syntapse Ltd</h1>
                <h3>Call 07512 738 100 or email enquiries@syntapse.co.uk</h3>
                <p className="info">This contact form submits data to a secure content management system
                    fully configured for email handling and forwarding. You will receive a copy at the email
                    address provided. All data handling is compliant with GDPR regulations and will not be
                    knowingly or deliberately  shared or disclosed with any third party. Please submit GDPR
                    requests to admin@syntapse.co.uk</p>
            </div>
        </div>
        <Contact />
    </>
}