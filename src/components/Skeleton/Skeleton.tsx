import React from "react";
import "./Skeleton.scss";

interface SkeletonProps {
  type: "line" | "circle";
  style?: React.CSSProperties;
}

const Skeleton = ({ type, style }: SkeletonProps) => {
  return (
    <div className="skeleton">
      <div className="description">
        <div className={type} style={style}></div>
      </div>
    </div>
  );
};

export default Skeleton;
