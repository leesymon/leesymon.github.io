import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";



const useMatter = (sceneRef, fontSize, keywords) => {
  const boxesRef = useRef([]);
  const colorsRef = useRef([
    "#58CF04",
    "#7553F8",
    "#F85A5A",
    "#FF8138",
    "#F565B3",
  ]);
  const [boxes, setBoxes] = useState([]);

  const engine = useRef(Matter.Engine.create()).current;
  const runner = useRef(Matter.Runner.create()).current;

  useEffect(() => {
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

    engine.gravity.y = 0.8;

    const walls = [
      Matter.Bodies.rectangle(1080 / 2, 1354, 1080, 100, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(980, 1354 / 2, 20, 1354, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(-50, 1354 / 2, 20, 1354, {
        isStatic: true,
      }),
    ];

    Matter.World.add(engine.world, walls);
    Matter.Engine.run(engine);

    const updateBoxes = () => {
      const updatedBoxes = boxesRef.current.map(
        ({ box, information, color }) => ({
          information,
          color,
          position: box.position,
          rotation: box.angle,
          width: box.bounds.max.x - box.bounds.min.x,
          height: box.bounds.max.y - box.bounds.min.y,
        })
      );
      setBoxes(updatedBoxes);
    };

    // Matter.Runner 사용하여 엔진과 렌더링 관리
    Matter.Runner.run(runner, engine);

    Matter.Events.on(runner, "afterTick", updateBoxes);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Render.stop(render);
      Matter.Events.off(runner, "afterTick", updateBoxes);
    };
  }, [sceneRef, engine, runner]);

  useEffect(() => {
    if (keywords.length > 0) {
      const information = keywords[keywords.length - 1];
      const color = colorsRef.current.shift();
      // 2초 후에 createBox 실행
      setTimeout(() => {
        createBox(information, color, engine.world);
        colorsRef.current.push(color);
      }, 2000);
    }
  }, [keywords]);

  const createBox = (information, color, world) => {
    const textBox = document.createElement("div");
    textBox.style.position = "absolute";
    textBox.style.visibility = "hidden";
    textBox.style.fontSize = `${fontSize}px`;
    textBox.style.fontWeight = "bold";
    textBox.style.whiteSpace = "nowrap";
    textBox.innerText = information;
    document.body.appendChild(textBox);
    const { offsetWidth, offsetHeight } = textBox;
    document.body.removeChild(textBox);

    const textBoxWidth = offsetWidth + 160; // 패딩 포함
    const textBoxHeight = offsetHeight + 20; // 패딩 포함

    const minX = 50 + textBoxWidth / 2 + 10;
    const maxX = 1030 - textBoxWidth / 2 - 10;
    const randomX = Math.random() * (maxX - minX) + minX;

    const box = Matter.Bodies.rectangle(
      randomX,
      -50,
      textBoxWidth,
      textBoxHeight,
      {
        restitution: 0.8, // Adjust the restitution value as needed
        friction: 0.5, // Adjust the friction value as needed
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

  return boxes;
};

export default useMatter;
