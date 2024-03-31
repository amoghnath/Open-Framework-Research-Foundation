import React, { createContext, useState, useContext } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const SnackbarContext = createContext()

export const useSnackbar = () => useContext(SnackbarContext)

export const SnackbarProvider = ({ children }) => {
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const openSnackbar = (message) => {
        setSnackbarMessage(message)
        setSnackbarOpen(true)
    }

    const closeSnackbar = () => {
        setSnackbarOpen(false)
    }

    return (
        <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
            {children}
            <Snackbar open={snackbarOpen} autoHideDuration={8000} onClose={closeSnackbar}>
                <MuiAlert
                    onClose={closeSnackbar}
                    variant='filled'
                    severity='info'
                    sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        fontSize: '1.1rem',
                        padding: '16px',
                    }}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}
