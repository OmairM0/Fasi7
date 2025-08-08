import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
const TextArea = ({ label, ...props }: IProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={props.id} className="text-sm">
          {label}
        </label>
      )}
      <textarea
        className="p-2 border border-gray-200 rounded-md h-60 resize-none focus:outline-none w-full"
        {...props}
      ></textarea>
    </div>
  );
};

export default TextArea;
