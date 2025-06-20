import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Grid } from '@mui/material';

const Home = () => {
    return (
        <div>
            <div className='Banner' style={{ marginTop: "50px", textAlign: "center" }}>
                <h1 style={{
                    fontSize: "clamp(2rem, 6vw, 4rem)",
                    fontWeight: "bolder",
                    color: "white",
                    marginBottom: "10px"
                }}>
                    Silver Spoon Catering
                </h1>
            </div>

            <div className="sml-desc">
                <div className="slogan-animate slogan-container">

                    <hr style={{ width: "60px", borderTop: "2px solid white", marginRight: "10px" }} />
                    <h3 style={{
                        color: "#efe5d7",
                        fontWeight: "bold",
                        margin: "0",
                        fontSize: "20px",
                        textAlign: "center"
                    }}>
                        Serving Elegance, Crafting Memories
                    </h3>
                    <hr style={{ width: "60px", borderTop: "2px solid white", marginLeft: "10px" }} />
                </div>
            </div>

            <div className='Banner'>
                <h3 style={{ textAlign: "center", color: "white" }}>
                    "Where every event begins with elegance and ends with satisfaction."
                </h3>
            </div>

            <div className='desc'>
                <p>
                    At Silver Spoon Catering, we specialize in transforming meals into memorable experiences. Whether you're planning a luxurious wedding, a corporate gathering, or a private celebration, our team is dedicated to delivering impeccable service and gourmet cuisine tailored to your vision.
                    With a passion for detail, fresh ingredients, and flawless presentation, we go beyond just catering — we curate culinary moments that delight every guest. From customized menus to seamless event coordination, Silver Spoon Catering ensures your occasion is not only successful, but unforgettable.
                    Let us serve you excellence — one silver spoon at a time.
                </p>
            </div>

            <div style={{ width: "100%", height: "100px" }}></div>

            <div className='service'>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "70px"
                }}>
                    <hr style={{ width: "60px", borderTop: "2px solid White", marginRight: "10px" }} />
                    <h3 style={{
                        color: "white",
                        fontWeight: "bold",
                        margin: "0",
                        fontSize: "50px",
                        textAlign: "center"
                    }}>
                        Our Services
                    </h3>
                    <hr style={{ width: "60px", borderTop: "2px solid White", marginLeft: "10px" }} />
                </div>

                <Grid container spacing={4} justifyContent="center" px={{ xs: 2, md: 5 }}>
                    {[
                        {
                            title: "WEDDING",
                            desc: "Celebrate your big day with elegance — our exquisite catering brings flavor, style, and care to every moment.",
                            img: "https://img.freepik.com/free-photo/elegant-wedding-table-setting-with-floral-centerpiece-candles_23-2151978920.jpg"
                        },
                        {
                            title: "BIRTHDAYS",
                            desc: "Make your special day unforgettable with our delicious food and personalized catering for all ages and party styles.",
                            img: "https://img.freepik.com/free-photo/boxing-day-celebration-with-balloons_23-2151013721.jpg"
                        },
                        {
                            title: "CONVOCATION",
                            desc: "Honor academic achievement with tasteful catering that adds pride and flavor to your celebration.",
                            img: "https://img.freepik.com/free-photo/graduation-celebration-success-achievement-learning-combined-generated-by-ai_188544-24685.jpg"
                        },
                        {
                            title: "ANNIVERSARIES",
                            desc: "Celebrate years of togetherness with elegant catering that adds warmth, flavor, and charm to your special day.",
                            img: "https://img.freepik.com/free-photo/navratri-decoration-with-candles_23-2151193769.jpg"
                        },
                        {
                            title: "REUNIONS",
                            desc: "Bring back memories and reconnect over delicious food tailored to make every moment unforgettable.",
                            img: "https://img.freepik.com/free-photo/cinematic-happy-people-celebrating-american-independence-day-holiday_23-2151479257.jpg"
                        },
                        {
                            title: "FESTIVALS",
                            desc: "Add joy and tradition to your celebrations with festive flavors that bring everyone together.",
                            img: "https://img.freepik.com/free-photo/glowing-lanterns-festive-night-scene_23-2151983965.jpg"
                        },
                    ].map((item, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345, backgroundColor: "Background", color: "White" }}>
                                <CardActionArea>
                                    <CardMedia component="img" height="200" image={item.img} alt={item.title} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#C0C0C0" }}>
                                            {item.desc}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}

export default Home;
