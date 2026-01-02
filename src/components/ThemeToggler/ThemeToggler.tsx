import React, {useEffect, useState} from 'react';

import {ThemeTogglerCheckbox} from '../ThemeToggler/ThemeToggler.styles';

export const ThemeToggler = ({toggleTheme, theme}: {
    toggleTheme: () => void;
    theme: "light" | "dark";
}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(theme === "dark");
    }, [theme]);

    return (
        <ThemeTogglerCheckbox
            type="checkbox"
            checked={isChecked}
            onChange={toggleTheme}
        />
    );
};
