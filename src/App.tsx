import React, { useState } from "react";
import { Header, Input, Icon, Card } from "semantic-ui-react";
import Styles from "./styles/style.module.scss";
import GetUserDetails from "./Utils/GetUserDetails";
import { ToastContainer, toast } from "react-toastify";

function App() {
    const [Searching, setSearching] = useState(false);
    const [Username, setUsername] = useState("");
    const [User, setUser] = useState({
        avatar_url: "",
        login: "",
        name: "",
        bio: "",
        followers: null,
        following: null,
        location: "",
        type: "",
        created_at: "",
        public_repos: 0,
        public_gists: 0,
        id: 0,
    });

    const handleClick = async (e: any) => {
        if (Searching) return;
        setSearching(true);
        if (!Username || Username.trim() === "") return setSearching(false);
        let NeedToAddStyle = false;
        let userData = await GetUserDetails(Username);
        if (User.login === "") NeedToAddStyle = true;

        //@ts-ignore ;
        if (userData.error) {
            //@ts-ignore ahh shit here we go again lol
            toast(userData.stack, {
                type: "error",
            });
            return setSearching(false);
            //@ts-ignore
        } else if (userData.message) {
            //@ts-ignore
            toast("Github API Rate Limit.", {
                // cuz yes :(
                type: "error",
            });
            return setSearching(false);
        }

        //@ts-ignore ;-;
        setUser(userData);
        if (NeedToAddStyle)
            document.querySelector("." + Styles.Content)?.setAttribute("style", "display: flex;");
        setSearching(false);
    };

    const handleKeyPress = async (e: any) => {
        e.preventDefault();
        handleClick(e);
    };

    const Extra = (
        <div>
            <a target="blank" href={"https://github.com/" + Username}>
                {" "}
                <Icon name="info circle" />
                {User.followers ? "ID: " + User.id : "ID: Unknown"}
            </a>
            <br />
            <br />
            <a target="blank" href={"https://github.com/" + Username}>
                {" "}
                <Icon name="user circle outline" />
                {User.followers ? "Followers: " + User.followers : "Followers: None"}
            </a>
            <br />
            <br />
            <a target="blank" href={"https://github.com/" + Username}>
                {" "}
                <Icon name="user circle outline" />
                {User.following ? "Following: " + User.following : "Following: None"}
            </a>
            <br />
            <br />
            <a target="blank" href={"https://github.com/" + Username}>
                {" "}
                <Icon name="location arrow" />
                {User.location ? `Location: ` + User.location : "Location: None"}
            </a>
            <br />
            <br />
            <a target="blank" href={"https://github.com/" + Username}>
                {" "}
                <Icon name="question circle outline" />
                {User.type ? `Type: ` + User.type : "Type: Unknown"}
            </a>
            <br />
            <br />
            <a target="blank" href={"https://github.com/" + Username}>
                {" "}
                <Icon name="calendar times outline" />
                {User.created_at
                    ? `Created At: ` +
                      new Date(User.created_at).toLocaleDateString() +
                      " " +
                      new Date(User.created_at).toLocaleTimeString()
                    : "Created At: Unknown Date"}
            </a>
            <br />
            <br />
            <a target="blank" href={"https://github.com/" + Username + "?tab=repositories"}>
                {" "}
                <Icon name="github" />
                {User.public_repos === 0
                    ? "Public Repos: No Repos"
                    : "Public Repos: " + User.public_repos + " Repos"}
            </a>
            <br />
            <br />
            <a target="blank" href={"https://gist.github.com/" + Username}>
                {" "}
                <Icon name="github" />
                {User.public_gists === 0
                    ? "Public Gists: No Gists"
                    : "Public Gists: " + User.public_gists + " Gists"}
            </a>
        </div>
    );
    return (
        <div>
            <ToastContainer />
            <div className={Styles.MainHeader}>
                <Header center aligned={true} inverted size="large">
                    GitHub Stats
                    <Header.Subheader center aligned={true} inverted>
                        Get anyone's GitHub stats easier in just an single click!
                    </Header.Subheader>
                </Header>
            </div>

            <div className={Styles.Search}>
                <form onSubmit={handleKeyPress}>
                    <Input
                        disabled={Searching ? true : false}
                        loading={Searching ? true : false}
                        icon={true}
                        placeholder="GreenTreeTeam"
                    >
                        <input
                            onChange={(e) =>
                                setUsername(e.target.value.trim().split(/ +/g).join("-"))
                            }
                        />
                        <Icon
                            loading={Searching ? true : false}
                            disabled={Searching ? true : false}
                            name="search"
                            inverted
                            circular={true}
                            link={true}
                            onClick={handleClick}
                        />
                    </Input>
                </form>
            </div>

            <div className={Styles.Content}>
                <Card
                    image={User.avatar_url}
                    header={User.name}
                    meta={User.login}
                    description={User.bio ? User.bio : "No Bio"}
                    extra={Extra}
                    raised={true}
                />
            </div>
        </div>
    );
}

export default App;
