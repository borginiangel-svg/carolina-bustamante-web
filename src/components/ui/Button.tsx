export function ButtonPrimary({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="h-[52px] px-6 rounded-xl bg-[#0D2B59] text-white font-semibold
                 hover:bg-[#C79A3B] transition-colors duration-200"
    >
      {children}
    </button>
  );
}

export function ButtonSecondary({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="h-[52px] px-6 rounded-xl bg-white text-[#0D2B59] border border-[#0D2B59]
                 hover:bg-[#0D2B59] hover:text-white transition-colors duration-200 font-semibold"
    >
      {children}
    </button>
  );
}