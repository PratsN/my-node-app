import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { Box, Stack } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Styles/UserListing.css";
import axiosInstance from "../utils/axiosInstance";
import EditData from "./EditData";
import { useNavigate } from "react-router-dom";

const UserListing = () => {
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  let navigate = useNavigate();
  const fetchData = async () => {
    try {
      let response = await axios.get("http://localhost:3001/table");
      //console.log(response.data)
      setData(response.data);
      console.log("DATA:: ", data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  const filteredUsers = data.filter(
    (user) =>
      user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    axiosInstance
      .delete(`/table/${id}`)
      .then((response) => {
        if (response.status === 200) {
          enqueueSnackbar("User Deleted succesfully", { variant: "success" });
          window.location.reload();
          //   console.log("RESPONSE ====> ", response.data);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "warning" });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Box className="dashboard-section">
        <span>
          {" "}
          <input
            className="search-bar"
            type="text"
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search user by Name , City or Occupation..."
          />
        </span>

        <span>
          <Button
            sx={{
              backgroundColor: "dodgerblue",
              color: "white",
              width: "10rem",

              ":hover": {
                bgcolor: "#2b4353",
                color: "white",
              },
            }}
            onClick={() => navigate("/adduser")}
          >
            Add User
          </Button>
        </span>
      </Box>
      <section className="content-section">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2b4353" }}>
                <TableCell sx={{ color: "white" }}>NAME</TableCell>
                <TableCell sx={{ color: "white" }}>CITY</TableCell>
                <TableCell sx={{ color: "white" }}>OCCUPATION</TableCell>
                <TableCell align="center" sx={{ color: "white" }}>
                  ACTION
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.occupation}</TableCell>

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Stack>
                        <EditData id={row._id} />
                      </Stack>
                      <Stack>
                        {" "}
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(row._id)}
                        >
                          <DeleteIcon sx={{ color: "crimson" }} />
                        </IconButton>{" "}
                      </Stack>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
};

export default UserListing;
