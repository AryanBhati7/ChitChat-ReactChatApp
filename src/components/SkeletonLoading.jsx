import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonLoading() {
  return (
    <div className="h-[90vh] w-[90vw] text-white bg-[#172065c1] backdrop-blur-xl backdrop-saturate-200 border-2 rounded-sm  border-[#ffffffcf] flex">
      <div className="flex-1 flex flex-col  gap-8 p-4 border-r-[1px] border-r-gray-400">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
      <div className="chat border-r-[1px] border-r-gray-400 flex-col flex flex-2">
        <div className="top p-2 flex justify-between border-b-[1px] border-b-gray-400">
          <div className="user flex items-center gap-4">
            <Skeleton height={50} width={50} />
            <div className="user-text">
              <Skeleton width={200} height={20} />
              <Skeleton width={300} height={15} />
            </div>
          </div>
          <div className="icons flex items-center gap-3">
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
          </div>
        </div>
        <div className="center p-3 flex-1 flex flex-col gap-4 overflow-y-scroll scrollbar-custom">
          <div className="received flex gap-3 max-w-[70%] ">
            <Skeleton height={50} width={50} />
            <div className="texts flex-1 flex flex-col gap-1">
              <Skeleton width={200} height={60} />
              <Skeleton width={100} height={15} />
            </div>
          </div>
          <div className="sent flex self-end gap-3 max-w-[70%]">
            <div className="texts flex-1 flex flex-col gap-1">
              <Skeleton width={200} height={60} />
              <Skeleton width={100} height={15} />
            </div>
          </div>
        </div>
        <div className="bottom flex items-center justify-between gap-3 p-2 border-t-[1px] border-t-gray-400">
          <div className="icons flex items-center gap-3">
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
          </div>
          <Skeleton width={200} height={30} />
          <div className="emoji relative">
            <Skeleton height={30} width={30} />
          </div>
          <Skeleton width={50} height={30} />
        </div>
      </div>
      <div className="details flex-1 overflow-y-scroll scrollbar-custom">
        <div className="user flex flex-col p-3 gap-2 justify-center items-center border-b-[1px] border-b-gray-400 pb-2">
          <Skeleton height={100} width={100} />
          <Skeleton width={200} height={20} />
          <Skeleton width={300} height={15} />
        </div>
        <div className="info p-3">
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
        </div>
        <div className="buttons flex flex-col gap-5 p-3">
          <Skeleton width="100%" height={40} />
          <Skeleton width="100%" height={40} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoading;
