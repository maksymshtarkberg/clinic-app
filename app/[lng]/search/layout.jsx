import React from "react";
import CategorySideBar from "./_components/CategorySideBar";

function layout({ children, params }) {
  const { lng } = params;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
        <div className="hidden md:block">
          {/* Side Category Nav bar  */}
          <CategorySideBar lng={lng} />
        </div>
        <div className="md:col-span-3 ">{children}</div>
      </div>
    </div>
  );
}

export default layout;
