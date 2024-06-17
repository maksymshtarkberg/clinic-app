"use client";

import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import GlobalApi from "./_services/GlobalApi";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const { lng } = params;
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  /**
   * Used to get All Category List
   */
  const getCategoryList = async () => {
    try {
      const result = await GlobalApi.getCategory();
      setCategoryList(result.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div>
      <Hero lng={lng} />

      <CategoryList categoryList={categoryList} lng={lng} />
    </div>
  );
}
