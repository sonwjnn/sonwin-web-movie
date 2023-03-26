import { Paper, Button, Stack, Box } from '@mui/material'
import React from 'react'
import Logo from './Logo.jsx'
import Container from './Container.jsx'
import menuConfigs from '../../configs/menu.configs.js'

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: 'unset', padding: '2rem' }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ height: 'max-content' }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button>{item.display}</Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  )
}

export default Footer
