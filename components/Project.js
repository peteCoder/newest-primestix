"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Project = ({ data }) => {
  console.log(data);

  return (
    <Link href={`/projects/${data?._id}`}>
      <div className="shadow-2xl">
        <div
          style={{
            backgroundImage: `url(${
              data?.gallery?.length > 0
                ? data?.gallery[0]?.imageUrl?.asset?.url
                : data?.bannerImage?.asset?.url
                ? data?.bannerImage?.asset?.url
                : ""
            })`,
            backgroundPosition: "50% center",
          }}
          className="h-[305px] bg-no-repeat bg-cover w-full"
        ></div>
        <div className="bg-white min-h-[225px] text-left py-[14px] px-[19px] relative">
          <h3 className="uppercase font-extrabold text-black text-[20px] h-[42px]">
            {data?.name}
          </h3>
          <h4 className="text-[#4a4a4a] text-[12px] h-[25px] mt-[10px] font-bold">
            {data?.location}
          </h4>

          <div>
            <b>N </b>
            {data?.price}
          </div>

          <p className="text-[#4a4a4a] text-[12px] font-bold h-[46px] mb-[1px] ">
            {data?.description}
          </p>
          <div className=" bg-[#cfba82] h-[1px] w-full mt-5" />
          <div className="h-[50px] flex items-center justify-between">
            <button className="uppercase text-[12px] text-[#cfba82] font-bold">
              Know More
            </button>

            <Image
              alt="arrow"
              src={"/arrow-search.png"}
              height={10}
              width={28}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Project;
