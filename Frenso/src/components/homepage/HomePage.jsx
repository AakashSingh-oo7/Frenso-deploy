import { Grid } from '@mui/material';
import Navigation from '../navigation/Navigation';
import HomeSection from '../homesection/HomeSection';
import Authentication from '../authentication/Authentication';
import RightPart from '../rightpart/RightPart';
import { Route, Routes } from 'react-router-dom';
import Profile from '../profile/Profile';
import PostDetails from '../postdetails/PostDetails';
import Explore from './Explore';

const HomePage = () => {
  return (
    <Grid container spacing={2} className="px-5 lg:px-10 lg:justify-between">
      
      {/* Left Navigation */}
      <Grid item xs={0} lg={2.5} className="hidden lg:block relative">
        <Navigation />
      </Grid>

      {/* Main Home Section */}
      <Grid item xs={12} lg={6} className="relative">
        <Routes>
          <Route path="/" element={<Authentication />} />
           <Route path="/home" element={<HomeSection onPostUpdated={() => dispatch(getAllPost())} />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Grid>

      {/* Right Sidebar */}
      <Grid item xs={0} lg={3} className="hidden lg:block relative">
        <RightPart />
      </Grid>
      
    </Grid>
  );
};

export default HomePage;
