import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import {
  getAllPosts,
  getTopPost,
  likeNews,
} from "../../services/postsServices.js";
import { HomeBody, HomeHeader } from "./HomeStyled.jsx";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext.jsx";
import { userLogged } from "../../services/userServices.js";

export default function Home() {
  const { setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [topPost, setTopPost] = useState({});

  async function findPost() {
    const postsResponse = await getAllPosts();
    setPosts(postsResponse.data.results);

    const topPostResponse = await getTopPost();
    setTopPost(topPostResponse.data.post);
  }

  async function handleLike(postId) {
    if (!Cookies.get("token")) {
      alert("Você precisa estar logado para curtir uma notícia.");
      return;
    }
    const userResponse = await userLogged();
    setUser(userResponse.data);
    await likeNews(postId);
    // Recarrega todos os posts (incluindo o topPost) do usuário após o like
    findPost();
  }

  useEffect(() => {
    findPost();
  }, []);

  return (
    <>
      <HomeHeader>
        <Card
          top={true}
          key={topPost.id}
          id={topPost.id}
          title={topPost.title}
          text={topPost.text}
          banner={topPost.banner}
          likes={topPost.likes}
          comments={topPost.comments}
          onLike={handleLike}
        />
      </HomeHeader>
      <HomeBody>
        {posts.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            text={item.text}
            banner={item.banner}
            likes={item.likes}
            comments={item.comments}
            onLike={handleLike}
          />
        ))}
      </HomeBody>
    </>
  );
}
