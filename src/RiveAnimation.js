import React, { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useLoading } from "./LoadingContext";

const RiveAnimation = () => {
  const { loading } = useLoading();
  const { rive, RiveComponent } = useRive({
    src: `${process.env.PUBLIC_URL}/functionchar-nomouth_2.riv`,
    stateMachines: "Main 2",
    autoplay: true,
  });

  const STATE_MACHINE_NAME = "Main 2";
  const THINKING = "ThinkingCondition";
  const NOSE_CLICK = "questionSend";

  const THINKING_input = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    THINKING
  );
  const NOSE_CLICK_input = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    NOSE_CLICK
  );

  useEffect(() => {
    if (THINKING_input && NOSE_CLICK_input) {
      if (loading) {
        THINKING_input.value = true;
        NOSE_CLICK_input.value = true;
      } else {
        setTimeout(() => {
          THINKING_input.value = false;
          NOSE_CLICK_input.value = false;
        }, 2000);
      }
      console.log("THINKING_input value:", THINKING_input.value);
      console.log("NOSE_CLICK_input value:", NOSE_CLICK_input.value);
    }
  }, [loading]);

  return (
    <div>
      <div
        style={{
          width: "1000px",
          height: "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "1000px",
            height: "1000px",
          }}
        >
          <RiveComponent />
        </div>
      </div>
    </div>
  );
};

export default RiveAnimation;
