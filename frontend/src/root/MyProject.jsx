import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBtn from "../components/NavigationBtn";
import { apiCall } from "../components/HelpFunctions";
import { Pagebackground } from "../components/StyledElement";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { getJobType, getOpportunityType, getPaymentType } from "../components/EnumMap";
import { Box } from "@mui/material";

function MyProject() {
  const navigate = useNavigate();
  const [applyInfo, setApplyInfo] = useState([]);
  const [personInfo, setPersonInfo] = useState({});
  const { id } = useParams();

  async function renderApply() {
    const res = apiCall(`/profile`, "GET");
    res.then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setPersonInfo(data);
        if (data.role === 1) {
          // eslint-disable-next-line no-unused-expressions
          Promise.all([apiCall("/applyStudentProject", "Get"), apiCall("/applyStudentGroupProject", "Get")]).then(d => {
            console.log(d);
            setApplyInfo([
              ...d[0],
              ...d[1]
            ])
          })
        } else {
          const res = apiCall(`/applyProject`, "Get");
          res.then((data2) => {
            if (data2.error) {
              alert(data2.error);
            } else {
              setApplyInfo(data2);
            }
          });
        }
      }
    });
  }

  useEffect(() => {
    renderApply();
  }, []);
  console.log(applyInfo);

  return (
    <>
      <NavigationBtn></NavigationBtn>
      <Pagebackground>My Project</Pagebackground>
      {applyInfo.map((data) => (
        <Box sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
          {data.apply_status === 4 ? (
            <>
              <Card sx={{ maxWidth: 600, minWidth: 400, border: '2px solid lightgray' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom component="div">
                    {data.project.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Location: <span style={{ color: "#555" }}>{data.project.location}</span>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Project type: <span style={{ color: "#555" }}>{getJobType(data.project.job_classification)}</span>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {getOpportunityType(data.project.opportunity_type)} | {getPaymentType(data.project.payment_type)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      navigate(`/project-delivery/${data.project.id}`);
                    }}>
                    Enter
                  </Button>
                </CardActions>
              </Card>
            </>
          ) : null}
        </Box>
      ))}
    </>
  );
}

export default MyProject;
