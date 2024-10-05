import React from "react";
import "./Panel.scss";
interface PanelProps {
  children: React.ReactElement;
  title?: React.ReactNode;
  backgroundColor?: string;
}
const Panel = ({ children, title }: PanelProps) => {
  return (
    <section className="anel-section-main-container">
      <div className="panel-container">
        <div className="container-title">{title}</div>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default Panel;
