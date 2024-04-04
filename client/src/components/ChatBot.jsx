import { Box, Button, Input } from '@mui/material';
import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close'; // Import Close icon from MUI icons
import ForumIcon from '@mui/icons-material/Forum'

const ChatBotNew = ({ onClose }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const clear = () => {
        setError("");
        setChatHistory([]);
    };

    const getResponse = async () => {
        if (!value) {
            setError("Error. Please ask a question!");
            return;
        }
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    history: chatHistory,
                    message: value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch('/api/gemini', options);
            const data = await response.text();
            console.log(data);
            setChatHistory(oldChatHistory => [...oldChatHistory, {
                role: "You",
                parts: value,
            },
            {
                role: "7078",
                parts: data,
            }]);
            setValue("");
        } catch (error) {
            console.error(error);
            setError("Something went wrong! Please try again later.");
        }
    };

    return (
        <div style={{ position: 'fixed', right: 10, bottom: 10, zIndex: 1000, maxWidth: '27vw', width: 'auto' }}>
            <Box
                className="chatbot"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    borderRadius: '25px',
                    minWidth: '200px',
                    maxHeight: '800px',
                    backgroundColor: '#000', // Changed to black background
                    color: '#fff', // Text color changed to white
                    overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontWeight: 400, fontSize: '20px', marginLeft: '5px', padding: '10px', fontFamily: 'sans-serif' }}>
                        <b> Hi, how can I help you? </b>
                    </p>
                    <Button onClick={onClose}>
                        <CloseIcon sx={{ color: '#fff' }} /> {/* Changed to Close icon with white color */}
                    </Button>
                </div>

                <Box
                    className="input-container"
                    sx={{
                        width: '100%',
                        padding: '5px',
                        boxSizing: 'border-box',
                        borderRadius: '10px',
                        display: 'flex',
                        marginBottom: '10px',
                        gap: '1rem'
                    }}
                >
                    <Input
                        sx={{
                            border: 'none',
                            padding: '3px 4px',
                            fontSize: 'large',
                            fontWeight: 400,
                            outline: 'none',
                            width: '85%',
                            borderRadius: '10px',
                            backgroundColor: '#fff', // Keeping input field white for contrast
                            color: '#000', // Text color black for readability
                        }}
                        value={value}
                        placeholder="Type here.."
                        onChange={(e) => setValue(e.target.value)}
                    />

                    {!error &&
                        <Button
                            onClick={getResponse}
                            variant='contained'
                            sx={{
                                minWidth: '15%',
                                backgroundColor: '#1f8462',
                                color: 'white',
                                borderRadius: '10px',
                                marginLeft: '5px',
                                cursor: 'pointer',
                                ":hover": { backgroundColor: '#117C58' },
                                ":active": { backgroundColor: '#117C58' }
                            }}
                        >
                            <SendIcon />
                        </Button>}

                    {error &&
                        <Button
                            onClick={clear}
                            variant='contained'
                            sx={{
                                minWidth: '15%',
                                backgroundColor: '#1f8462',
                                color: 'white',
                                borderRadius: '10px',
                                marginLeft: '5px',
                                cursor: 'pointer',
                                ":hover": { backgroundColor: '#117C58' },
                                ":active": { backgroundColor: '#117C58' }
                            }}
                        >
                            Clear
                        </Button>}
                </Box>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Box
                    className="search-result"
                    sx={{
                        overflowY: 'auto',
                        maxHeight: '300px',
                        '&::-webkit-scrollbar': { width: '5px' },
                        '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '50px' },
                        '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' }
                    }}
                >
                    {chatHistory.map((chatItem, index) => (
                        <div key={index}>
                            <p
                                className="answer"
                                style={{
                                    border: 'none',
                                    marginTop: '5px',
                                    padding: 5,
                                    fontSize: 'medium',
                                    width: '100%',
                                    borderRadius: '10px',
                                    backgroundColor: 'white',
                                    color: 'black', // Ensure text is black for readability
                                    fontFamily: 'Sans Serif'
                                }}
                            >
                                {chatItem.role} : {chatItem.parts}
                            </p>
                        </div>
                    ))}
                </Box>
            </Box>
        </div>
    );
};

export default ChatBotNew;
