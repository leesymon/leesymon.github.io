import React, { useEffect, useRef, useState } from "react";

const TextBox = ({ text, color, fontSize, position, rotation, onClick }) => {
  const textRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      setSize({ width: width + 20, height: height + 20 });
    }
  }, [text, fontSize]);

  const boxStyle = {
    position: "absolute",
    top: position.y - size.height / 2,
    left: position.x - size.width / 2,
    width: size.width,
    height: size.height,
    backgroundColor: color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "80px", // 왼쪽 패딩
    paddingRight: "80px", // 오른쪽 패딩
    transform: `rotate(${rotation}rad)`,
    transformOrigin: "center",
    cursor: "pointer",
    zIndex: 10,
    borderTopRightRadius: "80px", // 오른쪽 위 모서리만 둥글게
    borderTopLeftRadius: "80px", // 왼쪽 위 모서리만 둥글게
    borderBottomRightRadius: "0px", // 오른쪽 아래 모서리만 둥글게
    borderBottomLeftRadius: "80px", // 왼쪽 아래 모서리만 둥글게
  };

  const textStyle = {
    color: "white",
    fontSize: `${fontSize}px`,
    fontWeight: "bold",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  return (
    <div style={boxStyle} className="box" onClick={onClick}>
      <div ref={textRef} style={textStyle}>
        {text}
      </div>
    </div>
  );
};

export default TextBox;
