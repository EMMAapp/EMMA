import React from "react";
import localization from "../utils/localization";
import BinaryBoxes from "./BinaryBoxes";

export default ({selected, setSelected}) =>
    <BinaryBoxes
        option1={localization('yes')}
        option2={localization('no')}
        selected={selected ? 1 : 2}
        setSelected={index => setSelected(index === 1)}
    />
