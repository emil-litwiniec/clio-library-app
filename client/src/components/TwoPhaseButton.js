import React, { useState } from 'react';


import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";

const TwoPhaseButton = ({
    handleSubmit,
    id,
    btnName,
    confirmMessage = "Are you sure?",
    className
}) => {
    const [phase, setPhase] = useState(1);

    return (
        <>
            {phase == 1 && 
                <Button
                    onClick={() => setPhase(2)}
                    variant="outlined"
                    className={className ? className : undefined}

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