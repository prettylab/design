"use client";

import {
  CircularProgress,
  CircularProgressProps,
  SxProps,
} from "@mui/material";
import { useState } from "react";
import Flex, { FlexProps } from "../Flex/Flex";
import { ImgProps } from "../Img";
import NoImage, { NoImageProps } from "../NoImage/NoImage";
import Img from "../Img/Img";

export interface LazyLoadImageProps {
  src: string;
  alt: string;
  sx?: SxProps;

  width?: string;
  height?: string;

  forceLoading?: boolean;
  showAnimation?: boolean;

  slotProps?: LazyLoadImageSlotProps;
}

export interface LazyLoadImageSlotProps {
  container?: FlexProps;
  loaderContainer?: FlexProps;
  loader?: CircularProgressProps;
  noImageContainer?: FlexProps;
  noImage?: NoImageProps;
  img?: ImgProps;
}

export default function LazyLoadImage({
  src,
  alt,
  width = "200px",
  height = "160px",
  forceLoading = false,
  showAnimation = true,
  slotProps,
}: LazyLoadImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const endLoading = (loading: boolean, error: boolean) => {
    if (!forceLoading) {
      setLoading(loading);
      setError(error);
      return;
    }
  };

  return (
    <Flex
      center
      {...slotProps?.container}
      sx={{
        position: "relative",
        width: width,
        height: height,
        overflow: "hidden",
        borderRadius: "9px",
        ...(slotProps?.container?.sx || {}),
      }}
    >
      {loading && (
        <Flex
          center
          alignCenter
          {...slotProps?.loaderContainer}
          sx={{
            zIndex: 1,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            ...(slotProps?.loaderContainer?.sx || {}),
          }}
        >
          <CircularProgress {...slotProps?.loader} />
        </Flex>
      )}
      {error && (
        <Flex
          center
          alignCenter
          {...slotProps?.noImageContainer}
          sx={{
            zIndex: 1,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            ...(slotProps?.noImageContainer?.sx || {}),
          }}
        >
          <NoImage {...slotProps?.noImage} />
        </Flex>
      )}
      {src && (
        <Img
          src={src}
          alt={alt}
          onLoad={() => {
            endLoading(false, false);
          }}
          onError={() => {
            endLoading(false, true);
          }}
          {...slotProps?.img}
          sx={{
            opacity: loading || error ? 0 : 1,
            transition: showAnimation ? "0.2s !important" : "none !important",
            height: "100%",
            width: "100%",
            m: 2,
            ...slotProps?.img?.sx,
          }}
        />
      )}
    </Flex>
  );
}
