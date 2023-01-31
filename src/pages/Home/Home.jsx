import { getAudio } from "../../service/itemService";
import { useState } from "react";

export default function Index() {
    const [songData, setSongData] = useState("");
    const onClick = (e) => {
        e.preventDefault();
        setSongData({ song_title: "Loading..." });
        const itemData = Object.fromEntries(new FormData(e.target));
        getAudio(itemData.videoID)
            .then((response) => {
                console.log(response);
                setSongData(response);
            })
            .catch((response) => setSongData({ song_title: response.message }));
    };

    return (
        <>
            <div className="top-container">
                <form id="form" onSubmit={onClick}>
                    <h1>
                        <i className="fa-brands fa-youtube" />Youtube to MP3 Converter
                    </h1>
                    <h4>Enter the video ID or the URL</h4>
                    <div>
                        <input
                            type="text"
                            name="videoID"
                            placeholder="Example: '-qVvXpzY4z4'"
                            defaultValue="-qVvXpzY4z4"
                        />
                        <button type="submit" id="convert-btn">
                            Convert
                        </button>
                    </div>
                </form>
            </div>
            {songData && (
                <div className="bottom-container">
                    <div className="success">
                        <p>{songData.song_title}</p>
                        <audio controls src={songData.song_link} />
                        <a href={songData.song_link}>
                            <button id="download-btn">DOWNLOAD</button>
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
