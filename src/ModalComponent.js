// import React, { useEffect } from "react";
// import Modal from "react-modal";
// import { motion, AnimatePresence } from "framer-motion";

// const modalOverlayStyle = {
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   zIndex: 2000,
// };

// const modalContentStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   background: "transparent",
//   border: "none",
//   padding: "0",
//   width: "842px",
//   height: "auto", // 콘텐츠에 따라 높이 자동 조정
//   // maxHeight: "90vh", // 최대 높이 설정
//   // overflowY: "auto", // 콘텐츠가 많을 경우 스크롤 가능
//   zIndex: 2000,
// };

// const realModalStyle = {
//   width: "100%",
//   background: "white",
//   borderRadius: 30,
//   flexDirection: "column",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   display: "flex",
//   padding: 0,
// };

// const modalUpperStyle = {
//   width: "100%",
//   paddingTop: 40,
//   paddingBottom: 40,
//   background: "#489BF7",
//   borderTopLeftRadius: 30,
//   borderTopRightRadius: 30,
//   flexDirection: "column",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   gap: 30,
//   display: "flex",
// };

// const keywordModalStyle = {
//   // width: 263,
//   height: 62,
//   padding: "0px 40px",
//   background: "white",
//   borderRadius: 80,
//   justifyContent: "center",
//   alignItems: "center",
//   gap: 8,
//   display: "flex",
//   whiteSpace: "nowrap", // 줄바꿈 없이 한 줄로 유지
// };

// const aiTitleStyle = {
//   color: "#489BF7",
//   fontSize: 36,
//   fontFamily: "Inter",
//   fontWeight: 700,
//   wordWrap: "break-word",
// };

// const mainTitleStyle = {
//   width: 693,
//   color: "white",
//   fontSize: 64,
//   fontFamily: "Inter",
//   fontWeight: 700,
//   wordWrap: "break-word",
//   textAlign: "center",
// };

// const modalLowerStyle = {
//   width: "100%",
//   paddingTop: 60,
//   paddingBottom: 60,
//   background: "white",
//   borderBottomLeftRadius: 30,
//   borderBottomRightRadius: 30,
//   justifyContent: "center",
//   alignItems: "center",
//   display: "flex",
// };

// const aiDescriptionStyle = {
//   width: 720,
//   color: "#757575",
//   fontSize: 36,
//   fontFamily: "Inter",
//   fontWeight: 400,
//   lineHeight: "54.33px",
//   wordWrap: "break-word",
//   textAlign: "center",
// };

// const ModalComponent = ({ isOpen, onRequestClose, content }) => {
//   useEffect(() => {
//     Modal.setAppElement("#root");
//   }, []);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <Modal
//           isOpen={isOpen}
//           onRequestClose={onRequestClose}
//           style={{
//             overlay: modalOverlayStyle,
//             content: modalContentStyle,
//           }}
//           closeTimeoutMS={500}
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//             style={realModalStyle}
//           >
//             <div className="Modalupper" style={modalUpperStyle}>
//               <div className="KeywordModal" style={keywordModalStyle}>
//                 <div className="Ai" style={aiTitleStyle}>
//                   {content.keyword}
//                 </div>
//               </div>
//               <div style={mainTitleStyle}>{content.question}</div>
//             </div>
//             <div className="Modallower" style={modalLowerStyle}>
//               <div className="Ai" style={aiDescriptionStyle}>
//                 {content.answer}
//               </div>
//             </div>
//           </motion.div>
//         </Modal>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ModalComponent;

import React, { useEffect } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

const modalOverlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
  overflow: "visible", // 오버플로우를 visible로 설정
};

const modalContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "transparent",
  border: "none",
  padding: "0",
  width: "842px",
  height: "auto", // 콘텐츠에 따라 높이 자동 조정
  zIndex: 2000,
  overflow: "visible", // 오버플로우를 visible로 설정
};

const realModalStyle = {
  width: "100%",
  background: "white",
  borderRadius: 30,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  display: "flex",
  padding: 0,
};

const modalUpperStyle = {
  width: "100%",
  paddingTop: 40,
  paddingBottom: 40,
  background: "#489BF7",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 30,
  display: "flex",
};

const keywordModalStyle = {
  height: 62,
  padding: "0px 40px",
  background: "white",
  borderRadius: 80,
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  display: "flex",
  whiteSpace: "nowrap",
};

const aiTitleStyle = {
  color: "#489BF7",
  fontSize: 36,
  fontFamily: "Inter",
  fontWeight: 700,
  wordWrap: "break-word",
};

const mainTitleStyle = {
  width: 693,
  color: "white",
  fontSize: 64,
  fontFamily: "Inter",
  fontWeight: 700,
  wordWrap: "break-word",
  textAlign: "center",
};

const modalLowerStyle = {
  width: "100%",
  paddingTop: 60,
  paddingBottom: 60,
  background: "white",
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
};

const aiDescriptionStyle = {
  width: 720,
  color: "#757575",
  fontSize: 36,
  fontFamily: "Inter",
  fontWeight: 400,
  lineHeight: "54.33px",
  wordWrap: "break-word",
  textAlign: "center",
};

const ModalComponent = ({ isOpen, onRequestClose, content }) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={{
            overlay: modalOverlayStyle,
            content: modalContentStyle,
          }}
          closeTimeoutMS={500}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={realModalStyle}
          >
            <div className="Modalupper" style={modalUpperStyle}>
              <div className="KeywordModal" style={keywordModalStyle}>
                <div className="Ai" style={aiTitleStyle}>
                  {content.keyword}
                </div>
              </div>
              <div style={mainTitleStyle}>{content.question}</div>
            </div>
            <div className="Modallower" style={modalLowerStyle}>
              <div className="Ai" style={aiDescriptionStyle}>
                {content.answer}
              </div>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ModalComponent;
