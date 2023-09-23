import {PropsWithChildren, useEffect, useRef} from 'react';
import Button from './Button';
import {useKeyPress} from '../hooks/useKeyPress';
import {useOnClickOutside} from '../hooks/useClickOutside';

export type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
    isOpen: boolean;
    header?: JSX.Element | string;
    showCancel?: boolean;
    cancelText?: string;
    showConfirm?: boolean;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
    size?: ModalSize;
}

const Modal = (props: PropsWithChildren<ModalProps>): JSX.Element => {
    const {
        isOpen,
        header,
        showCancel,
        cancelText = 'Cancel',
        showConfirm,
        confirmText = 'Confirm',
        onCancel,
        onConfirm,
        children,
        size,
    } = props;

    const isEscPressed = useKeyPress('Escape');
    useEffect(() => {
        if (isEscPressed) onCancel();
    }, [isEscPressed, onCancel]);

    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, onCancel);

    return (
        <div className={`c-modal c-modal--${size} ${isOpen && 'is-open'}`}>
            <div className="c-modal__overlay" tabIndex={-1}>
                <div className="c-modal__body" ref={dropdownRef}>
                    <div className="c-modal__header">
                        <h2 className="c-modal__header_title">{header}</h2>
                    </div>

                    <div className="c-modal__content">{children}</div>

                    <div className="c-modal__footer">
                        {(showCancel || showConfirm) && (
                            <div className="c-group c-modal__footer_buttons">
                                {showCancel && <Button onClick={onCancel}>{cancelText}</Button>}

                                {showConfirm && (
                                    <Button type="submit" onClick={onConfirm}>
                                        {confirmText}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
