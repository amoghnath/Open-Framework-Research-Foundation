import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Typography,
    Box,
    Paper,
    Divider,
    Grid,
    Avatar,
    Stack,
    Chip,
    Button,
    useTheme,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import EventIcon from '@mui/icons-material/Event'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import SendIcon from '@mui/icons-material/Send'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LoginIcon from '@mui/icons-material/Login'
import { useAuth } from '../context/AuthContext'

function ShareButton({ Icon, url, text, color }) {
    const theme = useTheme()
    const handleClick = () => window.open(url, '_blank')

    return (
        <Button
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color,
                color: 'white',
                padding: theme.spacing(1),
                marginRight: theme.spacing(1),
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: color,
                    color: 'white',
                },
            }}
            onClick={handleClick}
            startIcon={<Icon sx={{ fontSize: 24 }} />}
        >
            <Typography variant='body2'>{text}</Typography>
        </Button>
    )
}

function ChipDetail({ icon, label }) {
    const theme = useTheme()
    return <Chip icon={icon} label={label} variant='outlined' sx={{ mr: theme.spacing(1) }} />
}

function UserDetail({ title, Icon, detail, email = false }) {
    return (
        <Stack direction='column' alignItems='center' spacing={1}>
            <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Icon />
            </Avatar>
            <Typography variant='body2'>
                {email ? <a href={`mailto:${detail}`}>{detail}</a> : detail}
            </Typography>
        </Stack>
    )
}

function ProblemDetails() {
    const theme = useTheme()
    const [problem, setProblem] = useState(null)
    const { problemId } = useParams()
    const navigate = useNavigate()
    const { isAuthenticated, currentUser } = useAuth()

    useEffect(() => {
        async function fetchProblemDetails() {
            try {
                const response = await fetch(`/api/problem/${problemId}`)
                if (!response.ok) {
                    throw new Error('Error fetching problem details')
                }
                const data = await response.json()
                setProblem(data)
            } catch (error) {
                console.error('Error fetching problem details:', error)
            }
        }

        if (problemId) {
            fetchProblemDetails()
        }
    }, [problemId])

    const handleSolutionSubmission = () => navigate(`/submit-solution/${problemId}`)
    const handleRegistrationNavigation = () => navigate('/register/solver')
    const handleLoginNavigation = () => navigate('/login')

    if (!problem) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography>Loading...</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{ mx: theme.spacing(1) }}>
            <Paper elevation={0} sx={{ p: theme.spacing(2), mt: theme.spacing(2) }}>
                <Typography variant='h4' gutterBottom>
                    {problem.problemTitle}
                </Typography>
                <Box
                    sx={{
                        mt: theme.spacing(1),
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShareButton
                        Icon={FacebookIcon}
                        url='https://www.facebook.com/sharer/sharer.php?u='
                        text='Share on Facebook'
                        color='#1877F2'
                    />
                    <ShareButton
                        Icon={TwitterIcon}
                        url='https://twitter.com/intent/tweet?url='
                        text='Share on Twitter'
                        color='#1DA1F2'
                    />
                    <ShareButton
                        Icon={LinkedInIcon}
                        url='https://www.linkedin.com/sharing/share-offsite/?url='
                        text='Share on LinkedIn'
                        color='#0077B5'
                    />
                </Box>
                <Divider sx={{ my: theme.spacing(1) }} />
                <Box sx={{ mt: theme.spacing(3) }}>
                    {problem.Uploader && (
                        <Grid
                            container
                            alignItems='center'
                            justifyContent='space-around'
                            spacing={2}
                        >
                            <UserDetail
                                title='Representative Name'
                                Icon={PersonIcon}
                                detail={problem.Uploader.uploaderFullName}
                            />
                            <UserDetail
                                title='Representative Email'
                                Icon={EmailIcon}
                                detail={problem.Uploader.uploaderEmail}
                                email
                            />
                            <UserDetail
                                title='Business Name'
                                Icon={BusinessIcon}
                                detail={problem.Uploader.uploaderBusinessName}
                            />
                            <UserDetail
                                title='Business Email'
                                Icon={EmailIcon}
                                detail={problem.Uploader.uploaderBusinessEmail}
                                email
                            />
                            <UserDetail
                                title='Business Address'
                                Icon={LocationOnIcon}
                                detail={problem.Uploader.uploaderBusinessAddress}
                            />
                        </Grid>
                    )}
                </Box>
                <Divider sx={{ my: theme.spacing(2) }} />
                <Box
                    sx={{
                        mt: theme.spacing(2),
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: theme.spacing(1),
                    }}
                >
                    <Chip
                        icon={<MonetizationOnIcon />}
                        label={`Reward: ₹${new Intl.NumberFormat('en-IN').format(
                            problem.problemReward
                        )}`}
                        variant='outlined'
                    />
                    <Chip
                        icon={<EventIcon />}
                        label={`Deadline: ${new Date(problem.problemDeadlineDate).toLocaleDateString('en-US', {
                            weekday: 'long', // "Monday"
                            year: 'numeric', // "2023"
                            month: 'long', // "July"
                            day: 'numeric' // "20"
                        })}`}
                        variant='outlined'
                    />
                    <ChipDetail
                        icon={<AccessTimeIcon />}
                        label={`Created: ${new Date(problem.createdAt).toLocaleString()}`}
                    />
                    <ChipDetail
                        icon={<AccessTimeIcon />}
                        label={`Updated: ${new Date(problem.updatedAt).toLocaleString()}`}
                    />
                </Box>
                {isAuthenticated && currentUser?.role === 'solver' && (
                    <Button
                        variant='contained'
                        onClick={handleSolutionSubmission}
                        startIcon={<SendIcon />}
                        sx={{
                            mt: theme.spacing(2),
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                        }}
                    >
                        Submit Solution
                    </Button>
                )}
                {!isAuthenticated && (
                    <>
                        <Button
                            variant='contained'
                            onClick={handleRegistrationNavigation}
                            startIcon={<PersonAddIcon />}
                            sx={{
                                mt: theme.spacing(2),
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                },
                                mr: 1,
                            }}
                        >
                            Register To Upload Solution
                        </Button>
                        <Button
                            variant='contained'
                            onClick={handleLoginNavigation}
                            startIcon={<LoginIcon />}
                            sx={{
                                mt: theme.spacing(2),
                                backgroundColor: '#000',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                },
                            }}
                        >
                            Login To Upload Solution
                        </Button>
                    </>
                )}
                <Divider sx={{ my: theme.spacing(2) }} />
                <Typography
                    variant='body1'
                    dangerouslySetInnerHTML={{
                        __html: problem.problemDescription,
                    }}
                />
            </Paper>
        </Box>
    )
}

export default ProblemDetails
