const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Book Store. All rights reserved.
        </p>
        <div className="space-x-4">
          <a href="/privacy-policy" className="text-gray-300 hover:text-white">
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-gray-300 hover:text-white"
          >
            Terms of Service
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
