import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
// import { Link } from 'react-router';
// import { Breadcrumbs } from '@mui/material';

const Navbar = () => {
  
  // const location = useLocation();
  // const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  // return (
  //   <Breadcrumbs aria-label="breadcrumb">
  //     {/* {pathSegments.map((segment, index) => (
  //       <Link key={index} color="inherit" href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
  //         {segment}
  //       </Link>
  //     ))} */}
  //   </Breadcrumbs>
  // );
}

export default Navbar;


// const Navbar = ({ breadcrumb }) => {
//     return (
//         <Breadcrumbs aria-label="breadcrumb">
//           {breadcrumb.map((item, index) => (
//             <Link key={index} color="inherit" href={item.path}>
//               {item.label}
//             </Link>
//           ))}
//         </Breadcrumbs>
//       );
// }

// export default Navbar;