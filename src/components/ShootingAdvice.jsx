import React, { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import ArrowLocationDialog from "../components/ArrowLocationDialog";
import {getArcher, model} from "../lib/api";

export default function ShootingAdvice({ open, onClose }) {

    const [archer, setArcher] = React.useState({});
    const [equipShootingAdvice, setEquipShootingAdvice] = React.useState([]);
    const [formShootingAdvice, setFormShootingAdvice] = React.useState([]);

      const [openArrowLocationDialog, setOpenArrowLocationDialog] =
        React.useState(false);
    
  

      useEffect(() => {
        getArcher(localStorage.getItem("userId")).then((res) => {
          setArcher(res);
        });
      }, []);

        const getShootingAdvice = async (arrowLocations) => {
          try {
            const response = await model.post("/", {
              archer_level: archer.level,
              archer_eye: archer.eye,
              arrow_locations: arrowLocations,
            });
            setEquipShootingAdvice(response.data[0]);
            setFormShootingAdvice(response.data[1]);
            return response.data;
          } catch (error) {
            console.error(error);
          }
        };
      
      
    
 return(<Stack direction="column" spacing={2} mb={2}>
    <Button
      variant="contained"
      color="info"
      startIcon={<Icon icon="mdi:location" />}
      onClick={() => {
        setOpenArrowLocationDialog(true);
      }}
    >
      Record arrow location
    </Button>
    <Typography variant="h6" component="span" sx={{lineHeight: 1.25}}>
        <strong>Equipment Advice:</strong>
        <ul>
          {equipShootingAdvice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <strong>Shooting Form Advice:</strong>
        <ul>
          {formShootingAdvice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
    </Typography>
    <ArrowLocationDialog
    open={openArrowLocationDialog}
    onClose={() => setOpenArrowLocationDialog(false)}
    onConfirm={getShootingAdvice}
    />
    
  </Stack>);
}