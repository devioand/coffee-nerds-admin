import React from "react";
import AlertDestructive from "@/components/alerts/AlertDestructive";

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
      </div>
      <div>
        <AlertDestructive
          title="Products module is not operational yet."
          className="w-max"
        />
      </div>
    </div>
  );
};

export default Page;
