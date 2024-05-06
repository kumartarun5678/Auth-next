import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import Link from "next/link";
import DrawerComp from "./DrawerComp";
import { Context } from "../../context/authContext";
import { useSnackbar } from "notistack";

const Navbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    enqueueSnackbar("Successfully logged out", {
      variant: "success",
      autoHideDuration: 1700,
    });
  };

  return (
    <>
      <AppBar position="static" className="bg-[#cbc0c0]">
        <Toolbar className="flex justify-between">
          <Link href={"/"}>
            <Typography
              variant="h4"
              className="font-bold text-gray-800  italic cursor-pointer"
            >
              <span className="text-white">TARUN</span>auth
            </Typography>
          </Link>
          {isMatch ? (
            <DrawerComp />
          ) : (
            <>
              <div className="flex text-white">
                <Link href={"/secret"}>
                  <Typography className="font-semibold text-red-900 text-xl tracking-widest cursor-pointer">
                    Info
                  </Typography>
                </Link>

                {user !== null ? (
                  <>
                    <Typography
                      className="font-semibold cursor-pointer ml-6"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Typography>
                  </>
                ) : (
                  <>
                    <Link href={"/login"}>
                      <Typography className="font-semibold cursor-pointer ml-6">
                        Login
                      </Typography>
                    </Link>
                    <Link href={"/register"}>
                      <Typography className="font-semibold cursor-pointer ml-6">
                        Register
                      </Typography>
                    </Link>
                  </>
                )}
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
