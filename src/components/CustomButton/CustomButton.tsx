
const CustomButton = ({text}: {text: string}) => {
  return (
    <button className="mr-3 inline-flex cursor-pointer items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300">{text}</button>
  );
};

export default CustomButton;
