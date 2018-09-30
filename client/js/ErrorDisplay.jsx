import React from "react";

const ErrorDisplay = ({ error }) => (
  <div className="errorContainer">
    {error.message && (
      <main className="index">
        <h2>Failure has struck!</h2>
        <p>{error.message}</p>
      </main>
    )}
  </div>
);

export default ErrorDisplay;
