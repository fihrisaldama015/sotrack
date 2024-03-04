"use client"

import { Box, Button, Container, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ADMA_LOGO, AdmaLogo } from "./utils/assets";

export default function Home() {
  const router = useRouter()

  const mobile = useMediaQuery('(max-width:425px)')

  return (
    <main>
      <Container maxWidth={false} >
        <Box display="flex"
          flexDirection={'column'}
          justifyContent="center"
          alignItems="center"
          minHeight="100vh">
          <Box sx={{
            position: 'relative',
            width: '100%',
            height:'15vh'
          }}>
            <Image fill  src={ADMA_LOGO} alt="adma" objectFit='contain' />
          </Box>
          <Box height={10} />
          <Typography variant="h2" letterSpacing={3} className="text-center">Started Code Next JS - 2024</Typography>
          <Box height={10} />
          <Typography variant="h5">Dibuat oleh : Tim MSIB ADS</Typography>
          <Box height={20} />
          <Button className="text-white" variant="contained" size="large" onClick={() => router.push('/book-list')}>Live Demo</Button>
        </Box>
      </Container>
    </main>
  )
}
