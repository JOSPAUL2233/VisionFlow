function GreenButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 transform hover:scale-105 flex items-center"
    >
      {children}
    </button>
  );
}

export default GreenButton;
