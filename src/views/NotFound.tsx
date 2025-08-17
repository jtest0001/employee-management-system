const NotFound = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 space-y-4">
      <h1 className="text-primary text-center text-9xl font-bold">404</h1>
      <h2 className="text-center text-2xl font-semibold">Page Not Found</h2>
      <p className="max-w-md text-center text-sm text-neutral-500">
        The page you’re trying to access may have been removed, renamed, or you
        may not have the right permissions.
      </p>
    </div>
  );
};

export default NotFound;
