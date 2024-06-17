"use client";
import GlobalApi from "../../_services/GlobalApi";
import {
  useSession,
  useUser,
  isSessionTokenExpired,
  getSessionToken,
} from "@descope/nextjs-sdk/client";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import SuggestedBusinessList from "../_components/SuggestedBusinessList";
import BusinessDescription from "../_components/BusinessDescription";
import { useRouter } from "next/navigation";

function BusinessDetail({ params }) {
  const { businessId, lng } = params;
  const token = getSessionToken();
  const isTokenExpired = token ? isSessionTokenExpired(token) : true;
  const router = useRouter();

  const [business, setBusiness] = useState([]);

  useEffect(() => {
    businessId && getBusiness();
  }, [businessId]);

  useEffect(() => {
    checkUserAuth();
    console.log(isTokenExpired);
    console.log(lng);
  }, []);

  const getBusiness = async () => {
    try {
      const resp = await GlobalApi.getBusinessById(businessId);
      setBusiness(resp.businessList);
    } catch (error) {
      console.error("Failed to fetch business data:", error);
    }
  };

  const checkUserAuth = () => {
    if (isTokenExpired) {
      router.push(`/${lng}/login`);
    }
  };

  return (
    !isTokenExpired &&
    business && (
      <div
        className="py-8 md:py-20
    px-10 md:px-36"
      >
        <BusinessInfo business={business} />

        <div className="grid grid-cols-3 mt-16">
          <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>
          <div className="">
            <SuggestedBusinessList business={business} lng={lng} />
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDetail;
