import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Grid } from '@mui/material';
import WhatsAppContact from './WhatsAppContact';

const Home = () => {
    return (
        <div>
            <WhatsAppContact />
            <div className='Banner' style={{ marginTop: "50px", textAlign: "center" }}>
                <h1 style={{ fontSize: "60px", fontWeight: "bolder", color: "white", marginBottom: "10px" }}>
                    Silver Spoon Catering
                </h1>
            </div>

            <div className="sml-desc">
                <div className="slogan-animate" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <hr style={{ width: "60px", borderTop: "2px solid #ffd54f", marginRight: "10px" }} />
                    <h3 style={{
                        color: "#ffd54f",
                        fontWeight: "bold",
                        margin: "0",
                        fontSize: "20px"
                    }}>
                        Serving Elegance, Crafting Memories
                    </h3>
                    <hr style={{ width: "60px", borderTop: "2px solid #ffd54f", marginLeft: "10px" }} />
                </div>
            </div>

            <div className='Banner'>
                <h3>"Where every event begins with elegance and ends with satisfaction."</h3>
            </div>

            <div className='desc' style={{ 
                paddingBottom: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px",
                textAlign: "center",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: "1.6",
                color: "white"
            }}>
                <p>At Silver Spoon Catering, we specialize in transforming meals into memorable experiences. Whether you're planning a luxurious wedding, a corporate gathering, or a private celebration, our team is dedicated to delivering impeccable service and gourmet cuisine tailored to your vision.
                    With a passion for detail, fresh ingredients, and flawless presentation, we go beyond just catering — we curate culinary moments that delight every guest. From customized menus to seamless event coordination, Silver Spoon Catering ensures your occasion is not only successful, but unforgettable.
                    Let us serve you excellence — one silver spoon at a time.</p>
            </div>

            <div style={{ width: "100%", height: "100px" }}></div>

            <div className='service'>
                {/* <h1>Our Services</h1><br /> */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "70px"
                }}>
                    <hr style={{ width: "60px", borderTop: "2px solid #ffd54f", marginRight: "10px" }} />
                    <h3 style={{
                        color: "white",
                        fontWeight: "bold",
                        margin: "0",
                        fontSize: "50px"
                    }}>
                        Our Services
                    </h3>
                    <hr style={{ width: "60px", borderTop: "2px solid #ffd54f", marginLeft: "10px" }} />

                </div>
                <Grid sx={{ marginLeft: "50px" }} container spacing={4}>
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Card sx={{ maxWidth: 345, backgroundColor: "Background", color: "White"}}>
                            <CardActionArea>
                                <CardMedia component="img" height="200" image="/wedding.jpg" alt="Wedding pic" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">WEDDING</Typography>
                                    <Typography variant="body2" sx={{ color: "#C0C0C0" }}>Celebrate your big day with elegance — our exquisite catering brings flavor, style, and care to every moment.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
                        <Card sx={{ maxWidth: 345, backgroundColor: "Background", color: "White"}}>
                            <CardActionArea>
                                <CardMedia component="img" height="200" image="birthday.jpg" alt="Birthday pic" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">BIRTHDAYS</Typography>
                                    <Typography variant="body2" sx={{ color: "#C0C0C0" }}>Make your special day unforgettable with our delicious food and personalized catering for all ages and party styles.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
                        <Card sx={{ maxWidth: 345, backgroundColor: "Background", color: "White"}}>
                            <CardActionArea>
                                <CardMedia component="img" height="200" image="/convocation.avif" alt="Convocation pic" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">CONVOCATION</Typography>
                                    <Typography variant="body2" sx={{ color: "#C0C0C0" }}>Honor academic achievement with tasteful catering that adds pride and flavor to your celebration.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
                        <Card sx={{ maxWidth: 345, backgroundColor: "Background", color: "White"}}>
                            <CardActionArea>
                                <CardMedia component="img" height="200" image="/anniversary.avif" alt="Anniversary pic" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">ANNIVERSARIES</Typography>
                                    <Typography variant="body2" sx={{ color: "#C0C0C0" }}>Celebrate years of togetherness with elegant catering that adds warmth, flavor, and charm to your special day.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
                        <Card sx={{ maxWidth: 345, backgroundColor: "Background", color: "White"}}>
                            <CardActionArea>
                                <CardMedia component="img" height="200" image="/reunion.avif" alt="Reunion pic" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">REUNIONS</Typography>
                                    <Typography variant="body2" sx={{ color: "#C0C0C0" }}>Bring back memories and reconnect over delicious food tailored to make every moment unforgettable.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>
                        <Card sx={{ maxWidth: 345, backgroundColor: "Background", color: "White"}}>
                            <CardActionArea>
                                <CardMedia component="img" height="200" image="/festival.avif" alt="Festival pic" />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">FESTIVALS</Typography>
                                    <Typography variant="body2" sx={{ color: "#C0C0C0" }}>Add joy and tradition to your celebrations with festive flavors that bring everyone together.</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home
