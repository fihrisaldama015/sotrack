"use client";
import React, { useEffect, useState } from "react";
import Card from "./TimelineCardComponent";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import { getTimelineByPlatform } from "@/app/api/repository/TimelineRepository";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { changeTimelineData } from "@/app/redux/slices/TimelineDataSlice";

const TimelineContainer = ({
  filterData,
  hashtagSelected,
  mentionSelected,
  keywordSelected,
  pageSelected,
}) => {
  const { selectedPlatform } = useSelector(
    (state) => state.timelineDataReducer
  );
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");

  const { data: timeline, errorTimeline } = useSWR(
    `timeline?platform=${selectedPlatform}&pageId=${pageSelected}&mention=${mentionSelected}&hashtag=${hashtagSelected}&order=${"newest"}&keyword=${keywordSelected}`,
    () =>
      getTimelineByPlatform(
        accessToken,
        selectedPlatform,
        pageSelected,
        mentionSelected,
        hashtagSelected,
        "newest",
        keywordSelected
      ),
    {
      refreshInterval: 0, // Disable automatic refreshing
      revalidateOnFocus: false, // Disable revalidation on window focus
      staleTime: 60000, // Set a longer stale time (in milliseconds)
    }
  );
  if (errorTimeline) return <div>Error loading timeline data...</div>;
  if (!timeline)
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <LoadingSpinner />
        Loading
      </div>
    );
  if (timeline.length > 0) {
    dispatch(
      changeTimelineData({
        timelineData: timeline,
      })
    );
  }
  return (
    <div>
      {timeline.map((post, id) => (
        <Card
          key={id}
          date={post.timestamp}
          fullName={
            selectedPlatform === "facebook"
              ? "Facebook User"
              : selectedPlatform === "instagram"
              ? "Instagram User"
              : post.source
          }
          username={"@username"}
          message={post.caption}
          post_url={post.permalink}
          avatar={
            selectedPlatform === "facebook" || selectedPlatform == "instagram"
              ? "/assets/images/polda_logo.png"
              : `/assets/icon/${post.source}.png`
          }
          comment={post.comments_count ?? 0}
          like={post.like_count ?? 0}
        />
      ))}
    </div>
  );
};

export default TimelineContainer;
