import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { Box,Typography,useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React,{useMemo} from 'react'
import { PieChart,Pie,Cell } from 'recharts';


const Row3 = () => {
  const {palette}=useTheme();
  const pieColors=["#fff",palette.primary[500]];

  const {data:kpiData}=useGetKpisQuery();
  const {data: productData}=useGetProductsQuery();
  const {data:transactionData}=useGetTransactionsQuery();


  const pieChartData=useMemo(()=>{
    if(kpiData){
      const totalExpenses=kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key,value])=>{
          return[
            {
              name:key,
              value:value,
            },
            {
              name:`${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        });
    }
  },[kpiData]);

  const productColumns=[
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell:(params:GridCellParams)=>`$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell:(params:GridCellParams)=>`$${params.value}`,
    },
  ];
  const transactionColumns=[
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell:(params:GridCellParams)=>`$${params.value}`,
    },
    // {
    //   field: "productIds",
    //   headerName: "Count",
    //   flex: 0.1,
    //   renderCell:(params:GridCellParams)=>(params.value as Array<string>).length,
    // },
  ]
  return (
    <>
    <DashboardBox gridArea="g">
      <BoxHeader 
       title="List of products"
       sidetext={`${productData?.length} products`}  
      />
      <Box
      mt="0.5rem"
      p="0 0.5rem"
      height="75%"
      sx={{
        "& .MuiDataGrid-root":
          {
            color:palette.grey[300],
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility:"hidden",
          },
      }}>
      <DataGrid
        columnHeaderHeight={25}
        rowHeight={35}
        hideFooter={true}
        rows={productData || []}
        columns={productColumns}
      />
      </Box>
    </DashboardBox>    
    <DashboardBox gridArea="h">
    <BoxHeader 
       title="Recent Orders"
       sidetext={`${transactionData?.length} latest transactions`}  
      />
      <Box
      mt="1rem"
      p="0 0.5rem"
      height="80%"
      sx={{
        "& .MuiDataGrid-root":
          {
            color:palette.grey[300],
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${palette.grey[800]} !important`
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: `1px solid ${palette.grey[800]} !important`
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility:"hidden",
          },
      }}>
      <DataGrid
        columnHeaderHeight={25}
        rowHeight={35}
        hideFooter={true}
        rows={transactionData || []}
        columns={transactionColumns}
      />
      </Box>  
    </DashboardBox>    
    <DashboardBox gridArea="i">
    <BoxHeader title="Expense breakdown by category" sidetext="+4%"/>
    <FlexBetween mt="0.25rem" mb="1rem" gap="0.5rem" p="0 0.5rem" textAlign="center">
      {pieChartData?.map((data,i)=>(
      <Box key={`${data[0].name}=${i}`}>
        
        <Typography variant="h5">{data[0].name}</Typography>
      <PieChart
            width={120}
            height={80}
          >
            <Pie
              stroke="none"
              data={data}
              innerRadius={18}
              outerRadius={35}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
      </Box>
      ))}
    </FlexBetween>
    </DashboardBox>    
    <DashboardBox gridArea="j">
    <BoxHeader title="Overall summary and explanation data" sidetext="+15%"/>
    <Box
      height="15px"
      margin="1.25rem 1rem 1rem 1rem"
      bgcolor={palette.primary[500]}
      borderRadius="1rem">
      <Box
      height="15px"
      bgcolor="#ffffff"
      borderRadius="1rem"
      width="40%">
      </Box>
    </Box>
    <Typography margin="0 1rem" variant="h6">
    {/* The presented dashboard is generated utilizing sample data. The frontend is developed with Vite, 
    incorporating Redux Toolkit for efficient state management. Material UI serves as the chosen component library, 
    while Recharts is utilized for chart creation. On the backend, Node.js is employed as the runtime environment, 
    supported by the Express.js framework for efficient backend development. MongoDB is chosen as the database solution. 
    As for predictions, the "regression" library is utilized, enabling the generation of simple linear regression models. */}
    Following frameworks are used for creation of this dashboard-
    Vite, Redux, Material UI, Node JS, Express.js, MongoDb
    </Typography>
    </DashboardBox>
    </>
  )
}
export default Row3