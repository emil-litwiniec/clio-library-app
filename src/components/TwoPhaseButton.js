import React, { useState } from 'react';
import { Button, ButtonGroup, Typography } from "@material-ui/core"

const TwoPhaseButton = ({
    handleSubmit,
    id,
    btnName,
    confirmMessage = "Are you sure?"
}) => {
    const [phase, setPhase] = useState(1);

    return (
        <>
            {phase == 1 && 
                <Button
                    onClick={() => setPhase(2)}
                    variant="outlined"

                 >{btnName}
                 </Button>}

            {phase == 2 && (


                <>
                <Typography>{confirmMessage}</Typography>

                <ButtonGroup>
                    <Button onClick={() => {
                        handleSubmit(id);
                        setPhase(1);
                        }}>
                        Yes
                    </Button>
                    <Button
                        onClick={() => setPhase(1)}
                    >
                        No
                    </Button>
                </ButtonGroup>
                </>
            )}
        </>
    );
};

export default TwoPhaseButton;