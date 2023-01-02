import React from "react";

type ButtonProps = {
  classNames?: string;
  text: string;
  icon?: JSX.Element;
  onClick: (arg: string) => {};
  param?: string;
};
const Button = ({ classNames, icon, text, onClick, param }: ButtonProps) => {
  const style =
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center outline-none";
  const styles = classNames ? `${style} ${classNames}` : style;
  const handleClick = () => {
    if (onClick && param) {
      onClick(param);
    }
  };
  return (
    <button type="button" className={styles} onClick={handleClick}>
      <span className="mr-2">{text}</span>
      {icon ? icon : null}
    </button>
  );
};

export default Button;
