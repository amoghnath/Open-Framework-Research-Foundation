import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Typography,
    Box,
    Paper,
    Divider,
    Grid,
    Avatar,
    Stack,
    Chip,
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

function ProblemDetails() {
    const [problem, setProblem] = useState(null)
    const { problemId } = useParams()

    useEffect(() => {
        const fetchProblemDetails = async () => {
            try {
                const response = await fetch(`/api/problem/${problemId}`)
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

    const { Uploader: uploader } = problem

    const shareOnFacebook = () => {
        const url =
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(window.location.href)
        window.open(url, '_blank')
    }

    const shareOnTwitter = () => {
        const url =
            'https://twitter.com/intent/tweet?url=' +
            encodeURIComponent(window.location.href)
        window.open(url, '_blank')
    }

    const shareOnLinkedIn = () => {
        const url =
            'https://www.linkedin.com/sharing/share-offsite/?url=' +
            encodeURIComponent(window.location.href)
        window.open(url, '_blank')
    }

    return (
        <Box sx={{ mx: 2 }}>
            <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                <Typography variant='h4' gutterBottom>
                    {problem.problemTitle}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <FacebookIcon
                        sx={{
                            fontSize: 32,
                            color: '#1877F2',
                            mr: 1,
                            cursor: 'pointer',
                        }}
                        onClick={shareOnFacebook}
                    />
                    <Typography
                        variant='body2'
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={shareOnFacebook}
                    >
                        Share on Facebook
                    </Typography>
                    <TwitterIcon
                        sx={{
                            fontSize: 32,
                            color: '#1DA1F2',
                            mr: 1,
                            cursor: 'pointer',
                        }}
                        onClick={shareOnTwitter}
                    />
                    <Typography
                        variant='body2'
                        sx={{ mr: 1, cursor: 'pointer' }}
                        onClick={shareOnTwitter}
                    >
                        Share on Twitter
                    </Typography>
                    <LinkedInIcon
                        sx={{
                            fontSize: 32,
                            color: '#0077B5',
                            cursor: 'pointer',
                        }}
                        onClick={shareOnLinkedIn}
                    />
                    <Typography
                        variant='body2'
                        sx={{ cursor: 'pointer' }}
                        onClick={shareOnLinkedIn}
                    >
                        Share on LinkedIn
                    </Typography>
                </Box>
                <br />
                <Chip
                    icon={<MonetizationOnIcon />}
                    label={`₹${new Intl.NumberFormat('en-IN').format(problem.problemReward)}`}
                    variant='outlined'
                    sx={{ mr: 1 }} // Add right margin
                />
                <Chip
                    icon={<EventIcon />}
                    label={new Date(
                        problem.problemDeadlineDate
                    ).toLocaleDateString()}
                    variant='outlined'
                    sx={{ mr: 1 }} // Add right margin
                />
                <Chip
                    icon={<AccessTimeIcon />}
                    label={`Created: ${new Date(problem.createdAt).toLocaleString()}`}
                    variant='outlined'
                    sx={{ mr: 1 }} // Add right margin
                />
                <Chip
                    icon={<AccessTimeIcon />}
                    label={`Updated: ${new Date(problem.updatedAt).toLocaleString()}`}
                    variant='outlined'
                    sx={{ mr: 1 }} // Add right margin
                />
                <Divider sx={{ my: 1 }} />
                <Typography
                    variant='body1'
                    sx={{ mb: 2 }}
                    dangerouslySetInnerHTML={{
                        __html: problem.problemDescription,
                    }}
                />
            </Paper>

            {uploader && (
                <Paper elevation={3} sx={{ p: 2, mt: 2, mb: 2 }}>
                    <Grid
                        container
                        alignItems='center'
                        justifyContent='space-around'
                        spacing={2}
                    >
                        <Grid item>
                            <Stack
                                direction='column'
                                alignItems='center'
                                spacing={1}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Representative Name
                                </Typography>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <PersonIcon />
                                </Avatar>
                                <Typography variant='body2'>
                                    {uploader.uploaderFullName}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack
                                direction='column'
                                alignItems='center'
                                spacing={1}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Representative Email
                                </Typography>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <EmailIcon />
                                </Avatar>
                                <Typography variant='body2'>
                                    <a
                                        href={`mailto:${uploader.uploaderEmail}`}
                                    >
                                        {uploader.uploaderEmail}
                                    </a>
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack
                                direction='column'
                                alignItems='center'
                                spacing={1}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Business Name
                                </Typography>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <BusinessIcon />
                                </Avatar>
                                <Typography variant='body2'>
                                    {uploader.uploaderBusinessName}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack
                                direction='column'
                                alignItems='center'
                                spacing={1}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Business Email
                                </Typography>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <EmailIcon />
                                </Avatar>
                                <Typography variant='body2'>
                                    <a
                                        href={`mailto:${uploader.uploaderBusinessEmail}`}
                                    >
                                        {uploader.uploaderBusinessEmail}
                                    </a>
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <Stack
                                direction='column'
                                alignItems='center'
                                spacing={1}
                            >
                                <Typography
                                    variant='body2'
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Business Address
                                </Typography>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <LocationOnIcon />
                                </Avatar>
                                <Typography variant='body2'>
                                    {uploader.uploaderBusinessAddress}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Box>
    )
}

export default ProblemDetails
