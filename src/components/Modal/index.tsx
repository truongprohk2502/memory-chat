import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Portal = ({ children, isOpen }) => {
  const [container, setContainer] = useState<HTMLDivElement>(null);

  useEffect(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    setContainer(container);
    return () => {
      document.body.removeChild(container);
      container.remove();
    };
  }, []);

  useEffect(() => {
    if (container) {
      if (isOpen) {
        container.style.visibility = 'visible';
      } else {
        setTimeout(() => {
          container.style.visibility = 'hidden';
        }, 300);
      }
    }
  }, [isOpen, container]);

  return container && createPortal(children, container);
};

interface IProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'auto';
  className?: string;
  title?: string;
  isOpen: boolean;
  notPadding?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  disabledConfirmButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const Modal = ({
  children,
  size = 'auto',
  className = '',
  title = '',
  isOpen,
  notPadding,
  hideHeader,
  hideFooter,
  disabledConfirmButton = false,
  confirmText,
  cancelText,
  onClose,
  onCancel = () => {},
  onConfirm = () => {},
}: IProps) => {
  return (
    <Portal isOpen={isOpen}>
      <div
        className={clsx(
          'fixed inset-0 opacity-0 transition-all duration-300 bg-gray-500 z-50',
          {
            'opacity-50': isOpen,
          },
        )}
      ></div>
      <div
        className={clsx(
          { 'w-192': size === 'lg' },
          { 'w-160': size === 'md' },
          { 'w-120': size === 'sm' },
          { 'w-96': size === 'xs' },
          { 'opacity-0 top-1/3': !isOpen },
          { 'opacity-100 top-1/2': isOpen },
          `min-h-96 dark:bg-gray-900 dark:text-white bg-white rounded-lg 0 z-50 fixed left-1/2 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${className}`,
        )}
      >
        <div
          className={`${
            hideHeader ? 'hidden' : 'flex'
          } justify-center px-4 py-2 relative border-b border-gray-300 dark:border-gray-600`}
        >
          <div className="font-bold text-lg px-10">{title}</div>
          <button
            onClick={onClose}
            className="text-lg w-10 h-10 absolute top-0 right-0"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className={`flex flex-col ${!notPadding && 'px-5 py-2'}`}>
          {children}
        </div>
        {!hideFooter && (
          <div className="flex justify-end border-t border-gray-300 dark:border-gray-600 px-4 py-2">
            <button
              onClick={onCancel}
              className="outline-none bg-white hover:bg-gray-200 px-5 py-1 rounded-md transition-all duration-150 font-bold text-blue-500"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={disabledConfirmButton}
              className="bg-blue-500 px-5 py-1 rounded-md transition-all duration-150 font-bold text-white hover:bg-blue-400 ml-3 disabled:bg-blue-300 disabled:cursor-default"
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </Portal>
  );
};
