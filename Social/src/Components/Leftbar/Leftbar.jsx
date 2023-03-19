import React from "react";
import "./leftbar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkIcon from '@mui/icons-material/Work';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CLose from "../Online/CLose";
import { user } from "../data";
function Leftbar() {
    return (
        <div className="leftbar">
            <div className="leftbarWrapper">
                <ul className="sidebarlist">
                    <li className="sidebarlistitem">
                        <RssFeedIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Feed</span>
                    </li>
                    <li className="sidebarlistitem">
                        <ChatIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Chats</span>
                    </li>
                    <li className="sidebarlistitem">
                        <PlayCircleIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Videos</span>
                    </li>
                    <li className="sidebarlistitem">
                        <GroupsIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Groups</span>
                    </li>
                    <li className="sidebarlistitem">
                        <SchoolIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Courses</span>
                    </li>
                    <li className="sidebarlistitem">
                        <EmojiEventsIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Events</span>
                    </li>
                    <li className="sidebarlistitem">
                        <WorkIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Jobs</span>
                    </li>
                    <li className="sidebarlistitem">
                        <BookmarkIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Bookmarks</span>
                    </li>
                    <li className="sidebarlistitem">
                        <QuestionMarkIcon className="leftbaricon"/>
                        <span className="sidebarlistitemname">Questions</span>
                    </li>
                </ul>
                <button className="sidebarbutton">Show more</button>
                <hr className="Sidebarhr"/>
                <ul className="sidebarfreindlist">
                   
                   {
                    user.map(e=>(
                        <CLose key={e.id} user={e}/>
                    ))
                   }
                </ul>
            </div>
        </div>
    );
}

export default Leftbar;