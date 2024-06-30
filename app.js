import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const API_KEY = '8WVSWgLUue2RaFkrESeGQ8lcE11zESmLHYIckq5h';

const getPlanets = async () => {
    const options = {
        method: 'POST',
        url: 'https://json.freeastrologyapi.com/planets',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        data: {
            "year": 2022,
            "month": 8,
            "date": 11,
            "hours": 6,
            "minutes": 0,
            "seconds": 0,
            "latitude": 17.38333,
            "longitude": 78.4666,
            "timezone": 5.5,
            "settings": {
                "observation_point": "topocentric",
                "ayanamsha": "lahiri"
            }
        }
    };

    try {
        const response = await axios(options);
        return response.data.output[1]; // Getting the detailed planets data
    } catch (error) {
        console.error('Error fetching planets data:', error.message);
        return null;
    }
};

// Routes
app.get('/', async (req, res) => {
    const planets = await getPlanets();
    const error = planets ? null : 'Failed to fetch horoscope data.';
    res.render('index', { planets: planets, error: error });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
