import React, { useState } from 'react'

const Dropdown = ({ trigger, menu }) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleMouseLeave = () => {
        setTimeout (() => {setOpen(false)}, 1000)
    };

    return (
        <div className="dropdown">
            {React.cloneElement(trigger, {
                onClick: handleOpen,                
            })}
            {open ? (
                <ul className="menu" onMouseLeave={handleMouseLeave}>
                    {menu.map((menuItem, index) => (
                        <li key={index} className="menu-item">
                            {React.cloneElement(menuItem, {
                                onClick: () => {
                                    menuItem.props.onClick();
                                    setOpen(false);
                                },
                            })}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

export default Dropdown