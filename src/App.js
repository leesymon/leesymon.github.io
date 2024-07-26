// import React, { useState, useEffect } from "react";
// import Upper from "./Upper";
// import Lower from "./Lower";
// import { ChatProvider } from "./ChatContext";
// import { LoadingProvider } from "./LoadingContext";
// import styled from "styled-components";
// import Modal from "react-modal";
// import ModalComponent from "./ModalComponent"; // 모달 컴포넌트 import

// const App = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const Container = styled.div`
//     width: 100%;
//     height: 100%;
//     position: relative;
//   `;

//   useEffect(() => {
//     Modal.setAppElement("#root");
//   }, []);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <ChatProvider>
//       <LoadingProvider>
//         <Container onClick={openModal}>
//           <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal} />
//           <div className="frame2">
//             <Upper />
//             <Lower />
//           </div>
//         </Container>
//       </LoadingProvider>
//     </ChatProvider>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import Upper from "./Upper";
import Lower from "./Lower";
import { ChatProvider } from "./ChatContext";
import { LoadingProvider } from "./LoadingContext";
import styled from "styled-components";
import Modal from "react-modal";
import ModalComponent from "./ModalComponent"; // 모달 컴포넌트 import

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
  `;

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ChatProvider>
      <LoadingProvider>
        <Container>
          <div className="frame2">
            <Upper />
            <Lower />
          </div>
        </Container>
      </LoadingProvider>
    </ChatProvider>
  );
};

export default App;
