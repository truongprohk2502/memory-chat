interface IProps {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

export const Button = ({
  text,
  disabled = false,
  className = '',
  onClick,
}: IProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 transition duration-150 border border-gray-400 bg-gray-300 disabled:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md hover:bg-gray-400 dark:disabled:bg-gray-500 dark:disabled:text-gray-400 disabled:hover:bg-gray-100 disabled:cursor-default ${className}`}
    >
      {text}
    </button>
  );
};
