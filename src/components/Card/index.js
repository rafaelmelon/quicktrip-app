import React from "react";

import { CustomCard } from "./styles";

const Card = ({ children, disabled, onClick, ...rest }) => {
  return (
    <CustomCard {...rest} disabled={disabled} onClick={onClick}>
      {children}
    </CustomCard>
  );
};

export default Card;
