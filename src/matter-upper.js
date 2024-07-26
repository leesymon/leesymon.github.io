import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const TextBox = ({ text, color, fontSize, position, rotation }) => {
  const textRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (textRef.current) {
      const { width, height } = textRef.current.getBoundingClientRect();
      setSize({ width: width + 40, height: height + 40 }); // padding을 고려하여 크기 설정 (20px padding)
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
    borderTopLeftRadius: "100px",
    borderTopRightRadius: "100px",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "100px",
    padding: "10px 20px",
    transform: `rotate(${rotation}rad)`,
  };

  const textStyle = {
    color: "white",
    fontSize: `${fontSize}px`,
    fontWeight: "bold",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  return (
    <div style={boxStyle}>
      <div ref={textRef} style={textStyle}>
        {text}
      </div>
    </div>
  );
};

const MatterProject = () => {
  const sceneRef = useRef(null);
  const boxesRef = useRef([]);
  const colorsRef = useRef(["#58CF04", "#7553F8", "#F85A5A", "#FF8138"]);
  const informationRef = useRef([
    "AI에 대한 두려움",
    "사라지는 직업",
    "생성형 AI",
    "AI의 미래",
  ]);
  const [boxes, setBoxes] = useState([]);
  const fontSize = 80;

  useEffect(() => {
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 1080,
        height: 1354,
        wireframes: false,
        background: "#f4f4f8",
      },
    });

    const walls = [
      Matter.Bodies.rectangle(1080 / 2, 1354, 1080, 20, { isStatic: true }),
      Matter.Bodies.rectangle(1080, 1354 / 2, 20, 1354, { isStatic: true }),
      Matter.Bodies.rectangle(0, 1354 / 2, 20, 1354, { isStatic: true }),
    ];

    Matter.World.add(engine.world, walls);

    const handleClick = () => {
      if (informationRef.current.length > 0) {
        const information = informationRef.current.shift();
        const color = colorsRef.current.shift();
        createBox(information, color, engine.world);
        colorsRef.current.push(color);
      }
    };

    document.addEventListener("click", handleClick);

    Matter.Engine.run(engine);

    const updateBoxes = () => {
      const updatedBoxes = boxesRef.current.map(
        ({ box, information, color }) => ({
          information,
          color,
          position: box.position,
          rotation: box.angle,
        })
      );
      setBoxes(updatedBoxes);
    };

    Matter.Events.on(engine, "afterUpdate", updateBoxes);

    return () => {
      Matter.Engine.clear(engine);
      document.removeEventListener("click", handleClick);
      Matter.Events.off(engine, "afterUpdate", updateBoxes);
    };
  }, []);

  const createBox = (information, color, world) => {
    // 텍스트 박스의 크기를 먼저 계산
    const textBox = document.createElement("div");
    textBox.style.position = "absolute";
    textBox.style.visibility = "hidden";
    textBox.style.fontSize = `${fontSize}px`;
    textBox.style.fontWeight = "bold";
    textBox.style.whiteSpace = "nowrap";
    textBox.innerText = information;
    document.body.appendChild(textBox);
    const { width, height } = textBox.getBoundingClientRect();
    document.body.removeChild(textBox);

    const textBoxWidth = width + 40; // padding을 고려한 크기
    const textBoxHeight = height + 40; // padding을 고려한 크기

    const randomX = Math.random() * 900 + 90;

    const box = Matter.Bodies.rectangle(
      randomX,
      -50,
      textBoxWidth,
      textBoxHeight,
      {
        restitution: 0.5,
        render: {
          fillStyle: color,
          strokeStyle: "red",
          lineWidth: 2,
        },
      }
    );

    Matter.World.add(world, box);

    boxesRef.current.push({ box, information, color });
  };

  return (
    <div
      ref={sceneRef}
      style={{ width: "1080px", height: "1354px", position: "relative" }}
    >
      {boxes.map(({ information, color, position, rotation }, index) => (
        <TextBox
          key={index}
          text={information}
          color={color}
          fontSize={fontSize}
          position={position}
          rotation={rotation}
        />
      ))}
    </div>
  );
};

export default MatterProject;
