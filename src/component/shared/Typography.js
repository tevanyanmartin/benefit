import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography as MaterialTypography } from "@material-ui/core";
const useStyles = makeStyles({
  typography: {
    color: "#4c003f",
  },
});

const Typography = (props) => {
  const {
    children,
    color = "textSecondary",
    variant = "body2",
    className = "",
    component = "p",
    ...rest
  } = props;

  const typographyClasses = useStyles();
  return (
    <MaterialTypography
      variant={variant}
      className={`${typographyClasses.typography}, ${className}`}
      color={color}
      component={component}
      {...rest}
    >
      {children}
    </MaterialTypography>
  );
};
export default Typography;
