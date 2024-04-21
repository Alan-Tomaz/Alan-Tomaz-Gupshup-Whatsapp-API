import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import qs from "qs";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/sendText", (req, res) => {

    const { source, destination, templateKey, parameters, apiKey } = req.body.data;

    const paramsCopy = { ...parameters };

    axios.post("http://api.gupshup.io/sm/api/v1/template/msg/",
        qs.stringify({
            "source": source,
            "destination": destination,
            "template": {
                "id": templateKey,
                "params": paramsCopy
            }
        }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'apikey': apiKey
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ err: "Internal Server Error" });
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Port: ${port}`)
});