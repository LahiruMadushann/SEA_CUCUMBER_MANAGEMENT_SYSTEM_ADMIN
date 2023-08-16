import React from "react";
import axios from "axios";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import WaterDamageOutlinedIcon from '@mui/icons-material/WaterDamageOutlined';
import KayakingOutlinedIcon from '@mui/icons-material/KayakingOutlined';
import SlowMotionVideoOutlinedIcon from '@mui/icons-material/SlowMotionVideoOutlined';
import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import { useEffect, useState } from "react";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "state/api";
// import {useParams} from "react-router";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
//---------------
{
  text: "Aquaculture Farms Section",
  icon: null,
},
{
  text: "Management Aquaculture Users",
  icon: <ManageAccountsOutlinedIcon />,
},
{
  text: "Aquaculture Farms",
  icon: <WaterDamageOutlinedIcon />,
},
{
  text: "Aquaculture Farmers",
  icon: <KayakingOutlinedIcon />,
},



//---------------
//---------------
{
  text: "Fisheries Section",
  icon: null,
},
{
  text: "Fisheries Management Users",
  icon: <ManageAccountsOutlinedIcon />,
},
{
  text: "Fishermens",
  icon: <KayakingOutlinedIcon />,
},
{
  text: "Fish Processors",
  icon: <SlowMotionVideoOutlinedIcon />,
},



//---------------

//---------------
{
  text: "Section",
  icon: null,
},
{
  text: "Exporters",
  icon: <ConnectingAirportsOutlinedIcon />,
},

//---------------
//---------------
{
  text: "Aquaculture Farms Section Data",
  icon: null,
},
{
  text: "Aquaculture Management",
  icon: <ManageAccountsOutlinedIcon />,
},
{
  text: "Farms Data",
  icon: <WaterDamageOutlinedIcon />,
},
{
  text: "Farmers Data",
  icon: <KayakingOutlinedIcon />,
},



//---------------
//---------------
{
  text: "Fisheries Data",
  icon: null,
},
{
  text: "Fisheries Management ",
  icon: <ManageAccountsOutlinedIcon />,
},
{
  text: "Fishermens Data",
  icon: <KayakingOutlinedIcon />,
},
{
  text: "FishProcessors Data",
  icon: <ReceiptLongOutlined />,
},



//---------------
  // {
  //   text: "Client Facing",
  //   icon: null,
  // },
  // {
  //   text: "Products",
  //   icon: <ShoppingCartOutlined />,
  // },
  // // {
  // //   text: "Customers",
  // //   icon: <Groups2Outlined />,
  // // },
  // // {
  // //   text: "Transactions",
  // //   icon: <ReceiptLongOutlined />,
  // // },
  // {
  //   text: "Geography",
  //   icon: <PublicOutlined />,
  // },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
//---------------
{
  text: "Other Actions",
  icon: null,
},
{
  text: "Register Management Users",
  icon: <ShoppingCartOutlined />,
},
{
  text: "Enter Knowledge Center Data",
  icon: <Groups2Outlined />,
},
{
  text: "Farmers",
  icon: <ReceiptLongOutlined />,
},



//---------------

  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const {id} = useParams();
  const userId = useSelector((state) => state.global.userId);
  console.log("id eka pho",id)
  const [detail,setDetail] = useState(null);
  useEffect(()=>{
      if (!id) {
          return;
      }
      axios.get(`http://localhost:5001/user/${userId}`).then(response => {
        setDetail(response.data);
      });
  }, [userId]);


  // const {userId} = useParams();
  console.log("hheeyve",detail);
  

  // const { data, error, isLoading } = useGetUserQuery(userId);
  // const { data: user } = useGetUserQuery(userName, {
  //   skip: !userName,
  //   refetchOnMountOrArgChange: true,
  // });

  // const { data: userNew } = useGetUserQuery(userId, {
  //   skip: !userId,
  //   refetchOnMountOrArgChange: true,
  // });

  // async function handleLoginSubmit(e) {
  //   e.preventDefault();

  //   if (user && user.password === password) {
  //     alert("Login successful");
  //     console.log(user)
  //     setUser(user); // Set user context here if needed
  //     navigate("/dashboard"); // Redirect to dashboard
  //   } else {
  //     alert("Login failed");
  //     setUserName('');
  //     setPassword('');
  //   }
  // }




  console.log("User Id", userId);
 
  // console.log("Error fetching data", error);
  // console.log("Loading", isLoading);
  
  const { pathname } = useLocation();
  const [userData, setUserData] = useState(null);
  // setUserData(data);
  // console.log("hyyy",userData.name)
  const filteredNavItems = navItems.filter(item => {
    if (user.role === 'superadmin') {
      // show all items for admin users
      return true;
    } else if (user.role === 'manager') {
      // show only specific items for manager users
      return ['Dashboard', 'Products', 'Geography', 'Sales'].includes(item.text);
    } else if (user.role === 'farmer') {
      // show only specific items for farmer users
      return ['Dashboard', 'Aquaculture Farms Section', 'Aquaculture Farms', 'Aquaculture Farmers'].includes(item.text);
    } else {
      // show only specific items for other users
      return ['Dashboard', 'Products'].includes(item.text);
    }
  });


  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    let newPathname = pathname.replace(/ /g, '');
    console.log("pathname",newPathname)
    setActive(newPathname.substring(1));
  }, [pathname]);

  // useEffect(() => {
  //   setActive(pathname.substring(1));
  // }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    SEACUCUMBER
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {
              
              filteredNavItems.map(({ text, icon }) => {
                // let newText = text.replace(/ /g, '');
                // console.log(newText)
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                const lcTextNew = lcText.replace(/ /g, '');
                console.log(lcTextNew)

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcTextNew}`);
                        setActive(lcTextNew);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute"  bottom="-98rem" paddingBottom="25px">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
