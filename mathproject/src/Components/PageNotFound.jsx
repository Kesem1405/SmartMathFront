import "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import einstein from "../images/einstein.png";


const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/app/students");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#e8f4f8",
                backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.8) 0%, rgba(200,235,255,0.6) 90%)",
                color: "#2d3748",
                textAlign: "center",
                padding: 4,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative math elements */}
            <Typography variant="h2" sx={{
                position: "absolute",
                top: "10%",
                left: "5%",
                opacity: 0.1,
                fontSize: "4rem",
                transform: "rotate(-30deg)",
                color: "#3f51b5"
            }}>π</Typography>

            <Typography variant="h2" sx={{
                position: "absolute",
                bottom: "15%",
                right: "10%",
                opacity: 0.1,
                fontSize: "4rem",
                transform: "rotate(20deg)",
                color: "#ff5722"
            }}>∞</Typography>

            <Typography variant="h2" sx={{
                position: "absolute",
                top: "30%",
                right: "15%",
                opacity: 0.1,
                fontSize: "4rem",
                transform: "rotate(15deg)",
                color: "#4caf50"
            }}>∫</Typography>

            <Container maxWidth="sm">
                <Box
                    component="img"
                    src={einstein}
                    alt="Einstein character"
                    sx={{
                        width: 150,
                        height: 150,
                        mb: 4,
                        mx: 'auto',
                        filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))'
                    }}
                />

                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: "4rem", sm: "5rem" },
                        fontWeight: 700,
                        color: "#3f51b5",
                        mb: 2,
                        fontFamily: "'Comic Neue', cursive",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: "1.2rem", sm: "1.5rem" },
                        color: "#5a6b82",
                        mb: 4,
                        fontFamily: "'Comic Neue', cursive",
                        lineHeight: 1.6
                    }}
                >
                   ... אוי לא! נראה שאיבדת את הדרך לפתרון.
                    <br />
                    הדף שאתה מחפש לא קיים<br />
                    אבל אל תדאג ! - אעזור לך לחזור לפתור בעיות
                </Typography>

                <Box sx={{
                    backgroundColor: "white",
                    borderRadius: 4,
                    p: 3,
                    mb: 4,
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    border: "2px dashed #3f51b5"
                }}>
                    <Typography variant="body1" sx={{
                        fontFamily: "'Comic Neue', cursive",
                        color: "#3f51b5",
                        fontWeight: 'bold'
                    }}>
                        האם ידעת?<br />
                        {["2+2=4", "5×5=25", "10-3=7", "8÷2=4"][Math.floor(Math.random() * 4)]}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: "#ff9800",
                        color: "#ffffff",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "50px",
                        px: 5,
                        py: 1.5,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        fontSize: "1.2rem",
                        fontFamily: "'Comic Neue', cursive",
                        "&:hover": {
                            backgroundColor: "#f57c00",
                            transform: "scale(1.05)",
                        },
                        transition: "all 0.3s ease"
                    }}
                    onClick={handleGoHome}
                >
                    ! חזרה למתמטיקה כיפית
                </Button>
            </Container>
        </Box>
    );
};

export default PageNotFound;