import React, { useState } from 'react';
import { Header, Input, Icon, Card } from "semantic-ui-react"
import Styles from './styles/style.module.scss';
import GetUserDetails from "./Utils/GetUserDetails";
import { ToastContainer, toast } from "react-toastify"

function App() {
  const [Searching, setSearching] = useState(false);
  const [Username, setUsername] = useState("")
  const [User, setUser] = useState({ avatar_url: "", login: "", name: "", bio: "", followers: 0 })

  const handleClick = async (e: any) => {
    if (Searching) return
    setSearching(true)
    if (!Username || Username.trim() === "") return setSearching(false)
    let NeedToAddStyle = false;
    //@ts-ignore ;-;
    let deepesh = await GetUserDetails(Username)
    if (User.login === "") NeedToAddStyle = true

    //@ts-ignore ;
    if (deepesh.error) {
      //@ts-ignore ahh shit here we go again lol
      toast(deepesh.stack, {
        type: "error"
      })
      return setSearching(false)
    }

    //@ts-ignore ;-;
    setUser(deepesh);
    if (NeedToAddStyle) document.querySelector("." + Styles.Content)?.setAttribute("style", "display: flex;")
    setSearching(false)
  }

  const Extra = <div>
    <Icon name='user' />{User.followers} Followers
  </div>
/*
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        handleClick(";-;");
      }
    })
  }, [])
*/
  return (
    <div>
      <ToastContainer />
      <div className={Styles.MainHeader}>
        <Header center aligned inverted size="large">GitHub Stats
          <Header.Subheader center={true} aligned={true} inverted={true}>Get anyone's GitHub stats easier in just an single click!</Header.Subheader>
        </Header>
      </div>

      <div className={Styles.Search}>
        <Input disabled={Searching ? true : false} loading={Searching ? true : false} icon placeholder='GreenTreeTeam'>
          <input onChange={(e) => setUsername(e.target.value)} />
          <Icon loading={Searching ? true : false} disabled={Searching ? true : false} name='search' inverted={true} circular={true} link={true} onClick={handleClick} />
        </Input>
      </div>

      <div className={Styles.Content}>
        <Card
          image={User.avatar_url}
          header={User.name}
          meta={User.login}
          description={User.bio}
          extra={Extra}
        />
      </div>
    </div>
  );
}

export default App;
