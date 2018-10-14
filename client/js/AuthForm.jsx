/* eslint-disable react/no-this-in-sfc */
import React from "react";

const AuthForm = props => {
  const {
    password,
    username,
    usernameError,
    passwordError,
    signInError,
    handleChange,
    onSubmitAuth,
    label
  } = props;
  return (
    <main className="signup-page">
      <form
        className="signup-form id-font"
        onSubmit={e => {
          e.preventDefault();
          onSubmitAuth(label);
        }}
      >
        <span className="signup-form__error">{signInError}</span>
        <h2 className="subtitle signup-form__title">{label}</h2>
        <label className="signup-form__label " htmlFor="username">
          Username
          <input
            type="text"
            placeholder="username"
            name="username"
            className="signup-form__input"
            value={username}
            onChange={handleChange}
          />
          <span className="signup-form__error">{usernameError}</span>
        </label>
        <label className="signup-form__label" htmlFor="password">
          password
          <input
            className="signup-form__input"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <span className="signup-form__error">{passwordError}</span>
        </label>

        <button className="signup-form__submit id-font" type="submit">
          {label}
        </button>
        {label === "Sign in" && (
          <div>
            <h2 className="subtitle">no account ?</h2>
            <a className="main-font" href="/signup">
              Sign up
            </a>
          </div>
        )}
      </form>
    </main>
  );
};

export default AuthForm;
