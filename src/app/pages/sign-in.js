import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./home-page";
import { url } from "../../../environment/environment";
import { NavLink } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    fetch(`${url}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("token", res.token);
      }
    });
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/");
  }, [router]);

  return (
    <div className="page">
      <Link href="/"></Link>
      <div className="pageAside" />
      <div className="pageForm">
        <div className="pageSwitcher">
          <NavLink
            to="/"
            activeclassname="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign In
          </NavLink>
          <NavLink
            exact
            to="/sign-up"
            activeclassname="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign Up
          </NavLink>
        </div>

        <div className="formTitle">
          <NavLink
            to="/"
            activeclassname="formTitleLink-active"
            className="formTitleLink"
          >
            Sign In
          </NavLink>{" "}
          or{" "}
          <NavLink
            exact
            to="/sign-up"
            activeclassname="formTitleLink-active"
            className="formTitleLink"
          >
            Sign Up
          </NavLink>
        </div>
        <div className="formCenter">
          <form className="formFields" onSubmit={handleSubmit}>
            <div className="formField">
              <label className="formFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="formFieldInput"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="formField">
              <label className="formFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="formFieldInput"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="formField">
              <button className="formFieldButton">
                <NavLink to="/home-page">
                  Sign In
                </NavLink>
              </button>{" "}
              <NavLink to="/sign-up" className="formFieldLink">
                Create an account
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
