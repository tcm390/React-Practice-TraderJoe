import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";



export default function ListItem({ index, data }) {
  const [isHovered, setIsHovered] = useState(false);
  const trailer = data.videoUrl;
  return (

    <div className="youtubeListCard">
      <img
        src={data.imageUrl}
        alt=""
      />
      <iframe

        src={trailer}>
      </iframe>

    </div>

  );
}
