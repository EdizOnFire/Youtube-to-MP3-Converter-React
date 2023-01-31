import { API_HOST, API_KEY } from "../env";

export const getAudio = async (videoId) => {
    if (videoId.includes("https://www.youtube.com/watch?v=")) {
        videoId = videoId.replace(/[https://www.youtube.com/watch?v=]+/, "");
    }

    const fetchAPI = await fetch(
        `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
        {
            method: "GET",
            headers: {
                "x-rapidapi-key": API_KEY,
                "x-rapidapi-host": API_HOST,
            },
        }
    );

    const fetchResponse = await fetchAPI.json();
    if (fetchResponse.status === "ok") {
        return {
            status: fetchResponse.status,
            song_title: fetchResponse.title,
            song_link: fetchResponse.link,
        };
    } else {
        return { message: fetchResponse.message };
    }
};
