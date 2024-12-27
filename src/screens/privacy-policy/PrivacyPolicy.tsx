import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <div className="policy-content">
        <section className="policy-section">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: 12/27/2024</p>
          
          <h2>Introduction</h2>
          <p>Welcome to OutAI ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our research automation platform.</p>
          
          <h2>Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>Email address used for account registration</li>
            <li>Images uploaded to our platform</li>
            <li>Usage data and analytics related to our services</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Authenticating user access</li>
            <li>Communicating with users about their accounts</li>
            <li>Improving our services</li>
            <li>Responding to user inquiries and support requests</li>
          </ul>

          <h2>Data Storage and Security</h2>
          <ul>
            <li>All user data, including images, is stored securely on Amazon Web Services (AWS)</li>
            <li>We implement appropriate technical and organizational measures to protect your data</li>
            <li>Images remain stored until explicitly deleted by the user</li>
            <li>We do not share your images or personal information with any third parties</li>
          </ul>
        </section>

        <section className="policy-section">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last Updated: 12/27/2024</p>

          <h2>Acceptance of Terms</h2>
          <p>By accessing or using OutAI's services, you agree to be bound by these Terms of Service.</p>

          <h2>Description of Service</h2>
          <p>OutAI provides research automation tools for researchers. The service is currently provided free of charge.</p>

          <h2>User Accounts</h2>
          <ul>
            <li>You must provide a valid email address to create an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must notify us of any unauthorized use of your account</li>
          </ul>

          <h2>Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us at: pbaek5699@gmail.com</p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy; 