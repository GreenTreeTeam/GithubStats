export default async function GetUserDetails(username: string) {
    let reqURl = `https://api.github.com/users/${encodeURIComponent(username)}`;
    let userReq = await fetch(reqURl);

    if (userReq.status === 404)
        return {
            error: true,
            stack: "User Not Found",
        };

    let userJSON: GithubUser = await userReq.json();
    return userJSON;
}

interface GithubUser {
    login: string;
    id: string;
    node_id: string;
    avatar_url: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    name: string;
    company: string | null;
    blog: string;
    location: string;
    email: string | null;
    hireable: boolean;
    bio: string;
    twitter_username: string | null;
    public_repos: string;
    public_gists: string;
    followers: string;
    following: string;
    created_at: string;
    updated_at: string;
}
