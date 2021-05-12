import { makeStyles } from "@material-ui/core/styles";
export const useStylesForBag = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "space-between"
  },
  image: {
    width: 128,
    height: 128
  },
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },

  pos: {
    marginBottom: 12
  },
  bagComponent: {
    width: "95%",
    margin: "auto",
    marginBottom: "50px",
    paddingTop: "30px"
  },
  bagHeader: {
    textAlign: "center",
    borderBottom: "1px solid white",
    color: "white"
  },
  leftContent: {
    width: "57%",
    borderRight: "1px solid white",
    height: "600px",
    overflow: "auto"
  },
  bagItems: { width: "80%" },
  card: {
    width: "42%",
    margin: "0 auto"
  },
  emptyBag: {
    position: "relative",
    height: "600px"
  },
  emptyBagTitle: {
    color: "#ffffffab",
    position: "absolute",
    top: "50%",
    left: "20%",
    fontSize: "67px"
  }
}));
export const useStylesForBagItem = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "2px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  imgDiv: {
    width: 200,
    heigth: 100,
    display: "inline-block"
  },
  img: {
    width: "100%"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));
