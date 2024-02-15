'use client'
 
import { useRouter } from 'next/navigation'
import "@styles/globals.css";
import { useState } from 'react';

type ModalState = 'closed' | 'opening' | 'closing';

export function Modal({ children, navigate = true }: { children: React.ReactNode, navigate?: boolean }) {
    const [modalState, setModalState] = useState<ModalState>('opening'); 
    const router = useRouter();
    
    // const openModal = () => setModalState('opening');
    const closeModal = () => setModalState('closing');
  
    // Optional: Remove modal from DOM after closing animation
    const onAnimationEnd = () => {
      if (modalState === 'closing') {
        setModalState('closed');
        if (navigate)
            router.back()
      }
    };
  
    return (
      <div>
        {/* <button onClick={openModal}>Open Modal</button> */}
        {modalState !== 'closed' && (
          <div
            className={`modal-backdrop ${modalState}`}
            onClick={closeModal}
            onAnimationEnd={onAnimationEnd}
          >
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button onClick={closeModal}>Close Modal</button>
                <div>{children}</div>
            </div>
          </div>
        )}
      </div>
    );
  };
