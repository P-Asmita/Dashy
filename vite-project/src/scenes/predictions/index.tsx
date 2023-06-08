import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { 
LineChart,
ResponsiveContainer, 
Tooltip,
CartesianGrid,
Line,
YAxis,
XAxis, 
Legend,
Label} from "recharts";
import regression,{DataPoint} from "regression";

const Predictions = () => {
    const {palette} =useTheme();
    const [isPredictions, setIsPredictions] =useState(false);
    const {data: kpiData}=useGetKpisQuery();

    const formattedData=useMemo(()=>{
        if(!kpiData) return [];
        const monthData=kpiData[0].monthlyData;
        const formatted: Array<DataPoint>= monthData.map(
            ({revenue},i:number)=>{
                return [i,revenue]
            }
        );
        const regressionLine=regression.linear(formatted);

        return monthData.map(({month,revenue},i:number)=>{
            return {
                name:month,
                "Actual Revenue":revenue,
                "Regression Line" :regressionLine.points[i][1],
                "Predicted Revenue":regressionLine.predict(i+12)[1]
            }
        })
    },[kpiData])

  return (
  <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
    <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
            <Typography variant="h3">
                Revenue and Predictions
            </Typography>
            <Typography variant="h6">
                charted and predicted revenue based on simple linear regression model
            </Typography>
        </Box>
        <Button onClick={()=> setIsPredictions(!isPredictions)}
        sx={{
            color:palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow:"0.1rem 0.1rem 0.1rem rgba(0,0,0,0,4)"
        }}
        >
            Show predicted revenue for the next year
        </Button>
    </FlexBetween>
    <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 " stroke={palette.grey[800]}/>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}>
                <Label value="Month" offset={-5} position="insideBottom"/>
              </XAxis>
            <YAxis
              domain={[12000,26000]}
              tickFormatter={(v)=>`$${v}`}
              axisLine={{strokeWidth:"0"}}
              style={{ fontSize: "10px" }}>
                <Label value="Revenue" angle={-90} offset={-5} position="insideLeft"/>
              </YAxis>
            <Tooltip />
            <Legend verticalAlign="top"/>
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{strokeWidth:5}}
            />
            <Line
              strokeDasharray="5 5"
              dataKey="Regression Line"
              stroke="#8884d8"
              dot={false}
            />
            {isPredictions &&(
                <Line
                type="monotone"
                dataKey="Predicted Revenue"
                stroke={palette.secondary[500]}
              />
            )}
          </LineChart>
        </ResponsiveContainer>  
  </DashboardBox>
  )
};

export default Predictions;