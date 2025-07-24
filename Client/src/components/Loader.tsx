import { CircularProgress, Stack, Typography } from "@mui/material"

function Loader({msg}: {msg: string}) {
  return (
    <Stack p={4} justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={90} thickness={6}/>
        <Typography variant="h6">{msg}</Typography>
      </Stack>
  )
}

export default Loader 