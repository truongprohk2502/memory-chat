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
      className={`px-2 py-1 transition duration-150 border border-gray-400 bg-gray-300 rounded-md hover:bg-gray-400 ${className}`}
    >
      {text}
    </button>
  );
};
