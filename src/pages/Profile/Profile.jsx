import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  ProfileActions,
  ProfileAvatar,
  ProfileBackground,
  ProfileContainer,
  ProfileHeader,
  ProfileIconAdd,
  ProfileIconEdit,
  ProfilePosts,
  ProfileUser,
} from "./ProfileStyled";
import { Card } from "../../components/Card/Card";
import { getAllPostsByUser, likeNews } from "../../services/postsServices";
import { Link } from "react-router-dom";
import { userLogged } from "../../services/userServices";

export function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  async function findAllPostsByUser() {
    const postsResponse = await getAllPostsByUser();
    setPosts(postsResponse.data.postsByUser);
  }

  async function findUserById() {
    try {
      const userResponse = await userLogged();
      console.log(userResponse);
      setUser(userResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLike(postId) {
    await likeNews(postId);
    // Recarrega todos os posts do usuário após o like
    const response = await getAllPostsByUser();
    setPosts(response.data.postsByUser);
  }

  useEffect(() => {
    findAllPostsByUser();
    findUserById();
  }, []);

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileIconEdit>
          <Link to={`/manage-profile/edit/${user._id}`}>
            <i className="bi bi-pencil-square"></i>
          </Link>
        </ProfileIconEdit>
        <ProfileBackground src={user.background} alt="" />

        <ProfileUser>
          <ProfileAvatar src={user.avatar} alt="Foto do usuário" />
          <h2>{user.name}</h2>
          <h3>@{user.username}</h3>
        </ProfileUser>

        <ProfileActions>
          <Link to="/manage-news/add/news">
            <ProfileIconAdd>
              <i className="bi bi-plus-circle"></i>
            </ProfileIconAdd>
          </Link>
        </ProfileActions>
      </ProfileHeader>

      <ProfilePosts>
        {posts.length === 0 && <h3>Você ainda não criou nenhuma notícia...</h3>}

        {posts.map((item) => {
          return (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              text={item.text}
              banner={item.banner}
              likes={item.likes}
              comments={item.comments}
              actions={true}
              onLike={handleLike}
            />
          );
        })}
      </ProfilePosts>
    </ProfileContainer>
  );
}
