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
    <AppBar position="static" style={{ background: "#cbc0c0", display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Toolbar className="flex">
        <Link href={"/"}>
          <div>
            <Typography
              variant="h4"
              className="font-bold text-gray-800 italic"
            >
              <span className="text-white">Tarun</span>Auth
            </Typography>
          </div>
        </Link>
        {isMatch ? (
          <DrawerComp />
        ) : (
          <div className="flex text-white ml-auto">
            <Link href={"/secret"}>
              <Typography className="font-semibold text-red-900 text-xl tracking-widest mr-6">
                Secret!
              </Typography>
            </Link>

            {user !== null ? (
              <Typography
                variant="h6"
                className="font-semibold cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </Typography>
            ) : (
              <>
                <Link href={"/login"}>
                  <Typography
                    variant="h6"
                    className="font-semibold cursor-pointer mr-6"
                  >
                    Login
                  </Typography>
                </Link>
                <Link href={"/register"}>
                  <Typography
                    variant="h6"
                    className="font-semibold cursor-pointer"
                  >
                    Register
                  </Typography>
                </Link>
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
