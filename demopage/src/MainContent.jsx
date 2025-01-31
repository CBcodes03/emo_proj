import Box from '@mui/material/Box';

const MainContent = ({ data }) => {
  return (
    <Box sx={{ bgcolor: '#283047', height: '50vh', padding: '20px', color: 'white' }}>
      {/* Display fetched data */}
      <p>{data}</p>
    </Box>
  );
};

export default MainContent;
