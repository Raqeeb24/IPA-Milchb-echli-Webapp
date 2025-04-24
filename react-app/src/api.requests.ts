import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:7160/WeatherForecast"
});

const ApiRequest = {
    getTestingData: async () => {
        await instance.get("")
            .then((response) => {
                console.log("Response:", response.data);
            });
    },
}

export default ApiRequest;