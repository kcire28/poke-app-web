export const Container =({ children }) => {
  return (
    <div
    
    className="mt-10 grid place-content-center gap-10 w-full max-w-screen-lg mx-auto px-4 md:grid-cols-4 sm:grid-cols-2 "
    >
      {children}
    </div>
  );
}
