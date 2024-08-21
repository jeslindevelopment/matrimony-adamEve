import { Outlet } from "react-router-dom";
// @mui
// components

export default function AuthLayout() {
  return (
    <>
      <div
        style={{
          background: "black",
          width: "calc(100vw - 1px)",
          flexGrow: "1",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
