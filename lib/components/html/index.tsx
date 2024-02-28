import React from 'react';

// Type definition for props, extending React anchor element props
interface SecureLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> { }

export const SecureLink: React.FC<SecureLinkProps> = ({ children, ...props }) => {
    return (
        <a {...props} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
};

export default SecureLink;
