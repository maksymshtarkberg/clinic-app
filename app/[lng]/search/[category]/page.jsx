"use client";
import BusinessList from "@/app/[lng]/_components/BusinessList";
import GlobalApi from "@/app/[lng]/_services/GlobalApi";
import React, { useEffect, useState } from "react";

function BusinessByCategory({ params }) {
  const { lng } = params;
  const [businessList, setBusinessList] = useState([]);
  let decodedCategory = decodeURIComponent(params.category);

  useEffect(() => {
    console.log(params);
    params && getBusinessList();
  }, [params]);

  const getBusinessList = () => {
    GlobalApi.getBusinessByCategory(decodedCategory).then((resp) => {
      setBusinessList(resp?.businessLists);
    });
  };

  return (
    <div>
      <BusinessList
        title={decodedCategory}
        businessList={businessList}
        lng={lng}
      />
    </div>
  );
}

export default BusinessByCategory;
