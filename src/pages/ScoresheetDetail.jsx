import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../components/Header";
import { MenuBar } from "../components/MenuBar";
import { Paper, Box } from "@mui/material";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import ScoreTable from "../components/ScoreTable";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import instance from "../lib/api";
import AlertSnackbar from "../components/AlertSnackbar";
import ConfirmDialog from "../components/ConfirmDialog";
import ShootingAdvice from "../components/ShootingAdvice";

const ScoresheetDetailPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  borderRadius: "10px",
}));

const ControlButtons = styled(Button)(() => ({
  color: "black",
  borderRadius: "50px",
  width: "50%",
  fontSize: "20px",
  padding: "4px",
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {/* {value === index && <Box sx={{ display: value === index ? "block" : "none", p: 1 }}>{children}</Box>} */}
      <Box sx={{ display: value === index ? "block" : "none", p: 1 }}>
        {children}
      </Box>
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function ScoresheetDetail() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [currentRound, setCurrentRound] = React.useState(2);
  const [scoresheet, setScoresheet] = React.useState(null);
  const [status, setStatus] = React.useState(0);
  const tableRefs = React.useRef([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

  const handleCurrentTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getScoresheetDetail = async (id) => {
    try {
      const response = await instance.get(`/scoresheets/${id}`);
      const data = response.data;
      setScoresheet(data);
      setStatus(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  let params = useParams();
  useEffect(() => {
    if (params.id) {
      getScoresheetDetail(params.id);
    }
  }, [params.id]);

  return (
    <>
      <Header page="Scoresheet" />
      <AlertSnackbar />
      <ScoresheetDetailPaper square={false} elevation={3}>
        <Accordion
          sx={{ backgroundColor: "lightgrey", marginBottom: "0px !important" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h5" component="span">
              <Icon icon="lets-icons:notebook" /> {scoresheet?.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 1 / 10 }}>
                  <Icon icon="icon-park-outline:archery" />
                </ListItemIcon>
                <ListItemText primary={"Rounds: " + scoresheet?.round} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 1 / 10 }}>
                  <Icon icon="icon-park-outline:archery" />
                </ListItemIcon>

                <ListItemText primary={"Sets per round: " + scoresheet?.set} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 1 / 10 }}>
                  <Icon icon="tabler:archery-arrow" />
                </ListItemIcon>

                <ListItemText
                  primary={"Arrows per set: " + scoresheet?.arrow_per_set}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 1 / 10 }}>
                  <Icon icon="material-symbols-light:distance-rounded" />
                </ListItemIcon>

                <ListItemText
                  primary={"Distance: " + scoresheet?.distance + "M"}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 1 / 10 }}>
                  <Icon icon="game-icons:archery-target" />
                </ListItemIcon>

                <ListItemText
                  primary={"Target face: " + scoresheet?.target_face}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 1 / 10 }}>
                  <Icon icon="clarity:date-line" />
                </ListItemIcon>

                <ListItemText
                  primary={"Create at: " + scoresheet?.created_at}
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          sx={{ backgroundColor: "lightgrey", marginTop: "4px !important" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="h5" component="span">
              <Icon icon="icon-park-outline:tips" /> Shooting Advice
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ShootingAdvice />
          </AccordionDetails>
        </Accordion>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={currentTab}
            onChange={handleCurrentTabChange}
            aria-label="round tabs"
          >
            {Array(scoresheet?.round || 0)
              .fill()
              .map((_, i) => (
                <Tab
                  key={i}
                  label={`Round ${i + 1}`}
                  disabled={i + 1 > currentRound}
                  sx={{ fontSize: 20 }}
                />
              ))}
          </Tabs>
        </Box>
        {Array(scoresheet?.round || 0)
          .fill()
          .map((_, i) => (
            <CustomTabPanel key={i} value={currentTab} index={i}>
              <ScoreTable
                ref={(ref) => (tableRefs.current[i] = ref)}
                scoresheetId={scoresheet?.id}
                round={i + 1}
                sets={scoresheet?.set}
                arrows={scoresheet?.arrow_per_set}
                distance={scoresheet?.distance}
                targetFace={scoresheet?.target_face}
                lastModified={scoresheet?.last_modified}
                status={status}
              />
            </CustomTabPanel>
          ))}

        <Stack direction="row" spacing={2}>
          <ControlButtons
            variant="contained"
            startIcon={<Icon icon="material-symbols:delete-outline" />}
            color="error"
            onClick={() => setOpenConfirmDialog(true)}
          >
            Delete
          </ControlButtons>

          <ControlButtons
            disabled={status === 1}
            variant="contained"
            startIcon={<Icon icon="material-symbols:save-outline" />}
            onClick={async () => {
              let status = 1;
              tableRefs.current.forEach((round) => {
                const arrowId = round.arrowId;
                const arrowLocations = round.arrowLocations;
                const scores = round.scores;
                arrowId.forEach(async (id, index) => {
                  const body = {
                    x_axis: arrowLocations[index][0],
                    y_axis: arrowLocations[index][1],
                    score: scores[index],
                  };
                  if (scores[index] === null) {
                    status = 0;
                  }
                  await instance.patch("arrows/" + id, body);
                });
              });
              await instance.patch("scoresheets/" + scoresheet.id, {
                status,
              });
              setStatus(status);
              localStorage.setItem(
                "alertMessage",
                "Scores updated successfully"
              );
              window.location.reload();
            }}
          >
            Save
          </ControlButtons>
        </Stack>
      </ScoresheetDetailPaper>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={async () => {
          await instance.delete("scoresheets/" + scoresheet.id);
          tableRefs.current.forEach((round) => {
            const arrowId = round.arrowId;
            const scoresetId = round.scoresetId;
            scoresetId.forEach(async (id) => {
              await instance.delete("scoreset/" + id);
            });
            arrowId.forEach(async (id) => {
              await instance.delete("arrows/" + id);
            });
          });

          localStorage.setItem(
            "alertMessage",
            "Scoresheet deleted successfully"
          );
          navigate("/scoresheet-list");
        }}
        title="Confirm delete this scoresheet?"
        content="Please note that all the recorded arrows will also be deleted"
      />
      <MenuBar />
    </>
  );
}

export default ScoresheetDetail;
