import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Box,
    Button,
    Alert,
    Snackbar,
    CardMedia,
    Fade,
    useTheme,
    Container,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FadeInButton from '../components/FadeInButton';
import newsPlaceholder from '/news_placeholder.jpg';

const CardWrapper = styled(motion.div)(({ theme }) => ({
    flex: '1 0 calc(33.33% - 16px)',
    margin: theme.spacing(2),
    maxWidth: '400px',
    height: '360px',
    '& > div': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.shape.borderRadius,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        }
    },
    [theme.breakpoints.down('lg')]: {
        flexBasis: 'calc(33.33% - 16px)',
    },
    [theme.breakpoints.down('md')]: {
        flexBasis: 'calc(50% - 16px)',
    },
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
    },
}));

const NewsPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [rateLimitInfo, setRateLimitInfo] = useState(null);
    const [showRateLimitAlert, setShowRateLimitAlert] = useState(false);
    const [rateLimitMessage, setRateLimitMessage] = useState('');
    const { ref, inView } = useInView({
        threshold: 0,
    });

    const fetchArticles = async (pageNum) => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/news/cybersecurity?page=${pageNum}&pageSize=9`, {
                headers
            });
            const data = await response.json();

            if (response.status === 429) {
                setRateLimitMessage(data.message);
                setShowRateLimitAlert(true);
                setHasMore(false);
                return;
            }

            if (data.rateLimit) {
                setRateLimitInfo(data.rateLimit);

                if (!data.rateLimit.isAuthenticated && data.articles.length >= 18) {
                    toast.info('Login to see more articles!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setHasMore(false);
                    return;
                }

                if (data.rateLimit.remainingRequests <= 10) {
                    setRateLimitMessage(`Warning: Only ${data.rateLimit.remainingRequests} requests remaining this hour.`);
                    setShowRateLimitAlert(true);
                }
            }

            if (data.articles && data.articles.length > 0) {
                if (!data.rateLimit?.isAuthenticated) {
                    const newArticles = [...articles, ...data.articles].slice(0, 18);
                    setArticles(newArticles);
                    if (newArticles.length >= 18) {
                        setHasMore(false);
                    }
                } else {
                    setArticles(prev => [...prev, ...data.articles]);
                    setHasMore(data.articles.length === 9);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(page);
    }, [page]);

    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage(prev => prev + 1);
        }
    }, [inView, hasMore, loading]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    textAlign: 'center',
                    color: theme.palette.text.primary,
                }}
            >
                Cybersecurity News
            </Typography>

            {rateLimitInfo && (
                <Alert
                    severity="info"
                    sx={{
                        mb: 2,
                        borderRadius: 1,
                        boxShadow: 1,
                    }}
                >
                    Remaining requests: {rateLimitInfo.remainingRequests}
                </Alert>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {articles.map((article, index) => (
                    <CardWrapper key={index}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                image={article.urlToImage || newsPlaceholder}
                                alt={article.title}
                                sx={{ 
                                    height: 140, 
                                    width: '100%', 
                                    objectFit: 'cover',
                                    backgroundColor: theme.palette.grey[200]
                                }}
                            />
                            <CardContent sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 2,
                            }}>
                                <Box>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                        sx={{
                                            fontWeight: 'bold',
                                            lineHeight: 1.2,
                                            fontSize: '1rem',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {article.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: '0.75rem', mb: 1 }}
                                    >
                                        {formatDate(article.publishedAt)}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontSize: '0.8rem',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            mb: 1,
                                        }}
                                    >
                                        {article.description}
                                    </Typography>
                                </Box>
                                {article.url && (
                                    <FadeInButton>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                        >
                                            Read More
                                        </a>
                                    </FadeInButton>
                                )}
                            </CardContent>
                        </Card>
                    </CardWrapper>
                ))}
            </Box>

            {!rateLimitInfo?.isAuthenticated && articles.length >= 18 && !localStorage.getItem('token') && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <FadeInButton>
                        <button
                            onClick={() => {
                                toast.info('Please login to see more articles');
                                navigate('/login');
                            }}
                            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            Login to See More Articles
                        </button>
                    </FadeInButton>
                </Box>
            )}

            <Box
                ref={ref}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 3,
                    mt: 2
                }}
            >
                {loading && (
                    <Fade in={loading}>
                        <CircularProgress
                            size={30}
                            thickness={3}
                            sx={{ color: theme.palette.primary.main }}
                        />
                    </Fade>
                )}
            </Box>

            <Snackbar
                open={showRateLimitAlert}
                autoHideDuration={6000}
                onClose={() => setShowRateLimitAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowRateLimitAlert(false)}
                    severity="warning"
                    sx={{ width: '100%', borderRadius: 1 }}
                >
                    {rateLimitMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NewsPage;