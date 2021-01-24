import React, { useEffect, useCallback, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import ModalContainer, { Background } from './style';

interface ModalProps {
  showModal: boolean;
  previousPath: string;
  onClosing(): void;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  previousPath,
  onClosing,
  children,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrollIsHidden, setScrollIsHidden] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (showModal) {
      if (hasLoaded === false) {
        setHasLoaded(true);
      }

      setShowContent(true);
      setTimeout(() => {
        document.body.style.overflow = 'hidden'; // hide body scroll
        setScrollIsHidden(true);
      }, 350);
    } else {
      document.body.style.overflow = ''; // show body scroll
      if (hasLoaded) {
        onClosing();
      }
      setHasLoaded(false);
      setScrollIsHidden(false);
      setTimeout(() => {
        setShowContent(false);
      }, 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleCloseModal = useCallback(() => {
    if (scrollIsHidden) {
      if (previousPath === location.pathname) {
        history.goBack();
      } else {
        history.push(location.pathname);
      }
    }
  }, [history, location.pathname, previousPath, scrollIsHidden]);

  return (
    <ModalContainer className={showContent ? '' : ' remove'}>
      <div
        className={`${showModal ? '' : ' hide'}${showContent ? ' show' : ''}`}
      >
        {showContent && (
          <>
            <Background onClick={handleCloseModal} />
            <div className="modal">{children}</div>
            <button className="close" type="button" onClick={handleCloseModal}>
              <FiX size={35} />
            </button>
          </>
        )}
      </div>
    </ModalContainer>
  );
};

export default Modal;