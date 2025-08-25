import React from "react";
import { Text } from "./Text";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        <Text variant="p">© {currentYear} Job application tracker. All rights reserved.</Text>
      </div>
    </footer>
  );
};

export default Footer;