import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Tables</h1>
        <p>All orders that customers have created using Nerd Connect feature</p>
      </div>

      {children}
    </div>
  );
};

export default layout;
