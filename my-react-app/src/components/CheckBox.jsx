import React, { useState } from 'react';

const CheckBox = () => {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const checkBoxClasses = `w-5 h-5 rounded-full border-2 transition-colors duration-200 cursor-pointer ${isChecked ? 'border-transparent bg-app-green' : 'border-black bg-transparent'}`;

    return (
        <div className={checkBoxClasses} onClick={toggleCheck}></div>
    );
};

export default CheckBox;