import React from 'react';
import styled from '@emotion/styled';
import { Grid2 } from '@mui/material';


function ScoreKeyboard ({visibility}){

    const Keyboard = styled(Grid2)(() => ({
        backgroundColor: "#D8D8D8",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        display: "grid",
        visibility: visibility ? "visible" : "hidden",
        zIndex: 10,
        height: "30%",
    }));
    

    return (
        <Keyboard className="score-keyboard">
        </Keyboard>
    )
}

export default ScoreKeyboard;