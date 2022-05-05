import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import style from './style.module.scss';

const DURATION_OF_ANIMATION = 200;

interface ModalProps {
    isOpen: boolean,
    onClose: (isOpen: boolean) => void,
    children?: React.ReactNode,
    layoutId?: string | number,
    animateEnterance?: boolean,
}

const animateEnteranceProps: MotionProps = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.5 },
    transition: { duration: DURATION_OF_ANIMATION / 1000 },
};

const Modal: React.FC<ModalProps> = React.memo(({
    isOpen, onClose, children, layoutId, animateEnterance = false,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const onCloseModal = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(false);
        onClose(false);
    };

    if (typeof window === 'object') {
        return createPortal(
            <AnimatePresence exitBeforeEnter>
                {
                    isModalOpen && (
                        <motion.div className={style['wrapper-modal']}>
                            <div
                                className={style.overlay}
                                onClick={onCloseModal}
                                aria-hidden
                            />
                            <motion.div
                                {...(animateEnterance && animateEnteranceProps)}
                                className={style.modal}
                                layoutId={layoutId?.toString()}
                            >
                                <div
                                    className={style['close-icon']}
                                    onClick={onCloseModal}
                                    aria-hidden
                                >
                                    <IoCloseOutline />
                                </div>
                                {children}
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>,
            document.getElementById('modal') as HTMLDivElement,
        );
    }
    return null;
});

export default Modal;