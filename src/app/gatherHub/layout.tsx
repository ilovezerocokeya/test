// app/gatherHub/layout.tsx
import React, { ReactNode } from 'react';

interface GatherHubLayoutProps {
  children: ReactNode; 
}

const GatherHubLayout: React.FC<GatherHubLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default GatherHubLayout;