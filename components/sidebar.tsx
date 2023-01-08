import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

type MenuItem = {
  label: string;
  value: string;
};

const menuList: MenuItem[] = [
  {
    label: 'Home',
    value: 'home',
  },
  {
    label: 'Pokemon',
    value: 'pokemon',
  },
];

export default function Sidebar() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const handleMenuItemClick = (index: number, value: string) => {
    const href = value === 'home' ? '/' : `/${value}`;
    router.push(href);
    setSelectedTab(index);
  };

  React.useEffect(() => {
    const basePath = router.pathname?.split('/')?.[1];
    if (basePath) {
      const index = menuList.findIndex((el) => el.value === basePath);
      setSelectedTab(index);
    } else {
      setSelectedTab(0);
    }
  }, [router.pathname]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 250,
        bgcolor: 'background.paper',
        borderRight: '2px solid #f1f2f3',
      }}
    >
      <List component='nav' aria-label='secondary mailbox folder'>
        {menuList.map((menuItem, index) => (
          <ListItemButton
            selected={selectedTab === index}
            onClick={() => handleMenuItemClick(index, menuItem.value)}
            key={menuItem.value}
          >
            <ListItemText primary={menuItem.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
