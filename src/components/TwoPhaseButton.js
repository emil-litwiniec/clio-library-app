import React, { useState } from 'react';


const TwoPhaseButton = ({
    handleSubmit,
    id,
    btnName,
    confirmMessage = "Are you sure?"
}) => {
    const [phase, setPhase] = useState(1);

    return (
        <>
            {phase == 1 && <button onClick={() => setPhase(2)}>{btnName}</button>}

            {phase == 2 && (
                <div>
                    <p>{confirmMessage}</p>
                    <button onClick={() => {
                        handleSubmit(id);
                        setPhase(1);
                        }}>Yes</button>
                    <button onClick={() => setPhase(1)}>No</button>
                </div>
            )}
        </>
    );
};

export default TwoPhaseButton;