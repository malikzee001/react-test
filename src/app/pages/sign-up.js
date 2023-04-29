import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { url } from "../../../environment/environment";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  console.log("something", url);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(name, email, password);
    const body = {
      name,
      email,
      password,
    };
    if (name && email && password)
      fetch(`${url}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        console.log(res, body);
        if (res.ok) {
          localStorage.setItem("token", res.token);
          router.push("/home-page");
        }
      });
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };
  useEffect(() => {
    router.prefetch("/home-page");
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
          <form onSubmit={handleSubmit} className="formFields">
            <div className="formField">
              <label className="formFieldLabel" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="formFieldInput"
                placeholder="Enter your full name"
                name="name"
                value={name}
                onChange={handleNameChange}
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
              <button type="submit" className="formFieldButton">
                Sign Up
              </button>{" "}
              <NavLink to="/" className="formFieldLink">
                I'm already member
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
