import React from "react";
import Logo from "../../../component/logo";

export default function Login() {
  return (
    <div className="col-md-12 col-lg-10 d-flex justify-content-center">
      <div className="wrap login-wrap p-4 p-md-5">
        <div className="d-flex">
          <div className="w-100">
            <h3 className="mb-4 text-center">Sign In</h3>
          </div>
        </div>
        <form action="#" className="signin-form">
          <div className="form-group mb-3">
            <label className="label" for="name">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="label" for="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="form-control btn btn-primary rounded submit px-3"
            >
              Sign In
            </button>
          </div>
          <div className="form-group d-flex justify-content-end">
            <div className="">
              <a href="#">Forgot Password</a>
            </div>
          </div>
        </form>
        <p className="text-center">
          Not a member?{" "}
          <a data-toggle="tab" href="#signup">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
