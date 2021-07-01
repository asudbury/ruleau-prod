import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

interface RuleauProgressButtonProps {
  datatestid: string;
  arialabel: string;
  content: string;
  loading: boolean;
  onClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function RuleauProgressButton({
  datatestid,
  arialabel,
  content,
  loading,
  onClick,
}: RuleauProgressButtonProps): JSX.Element {
  const classes = useStyles();

  const handleButtonClick = () => {
    onClick();
  };
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          data-testid={datatestid}
          aria-label={arialabel}
          variant="outlined"
          color="primary"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {content}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}
