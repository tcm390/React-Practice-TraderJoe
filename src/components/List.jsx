import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "./ListItem";
import "./list.scss";
import { youtubeList } from '../youtubeData'

export default function List() {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 1) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 4) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <br></br>
      <br></br>
      <div className="uicontainer">
        <div className="whatsnew">
          <div className="ui secondary pointing menu compact ">
            <div className="item active" >
              Trending Videos
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>

          <ListItem index={0} data={youtubeList[0]} />
          <ListItem index={1} data={youtubeList[1]} />
          <ListItem index={2} data={youtubeList[2]} />
          <ListItem index={3} data={youtubeList[3]} />
          <ListItem index={4} data={youtubeList[4]} />
          <ListItem index={5} data={youtubeList[5]} />
          <ListItem index={6} data={youtubeList[6]} />
          <ListItem index={7} data={youtubeList[7]} />
          <ListItem index={8} data={youtubeList[0]} />
          <ListItem index={9} data={youtubeList[1]} />
          <ListItem index={10} data={youtubeList[2]} />
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
