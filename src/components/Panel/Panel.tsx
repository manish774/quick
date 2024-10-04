import React from "react";
import "./Panel.scss";
interface PanelProps {
  children: React.ReactElement;
  style?: React.CSSProperties;
}
const Panel = ({ children, style }: PanelProps) => {
  return (
    <section className="panel-section-main" style={style}>
      {children}
    </section>
  );
};

export default Panel;
