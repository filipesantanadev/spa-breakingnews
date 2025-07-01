import { Link } from "react-router-dom";
import { TextLimit } from "../TextLimit/TextLimit";
import { CardBody, CardContainer, CardFooter, CardHeader } from "./CardStyled";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Cookies from "js-cookie";

export function Card({
  top,
  title,
  text,
  likes,
  comments,
  banner,
  actions = false,
  id,
  onLike,
}) {
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);

  async function handleLike() {
    if (onLike) {
      await onLike(id);
      checkLiked();
    }
  }

  function checkLiked() {
    try {
      const userLiked = likes?.some((like) => like.userId === user._id);
      // Verifica se o usuário atual já curtiu a postagem
      setLiked(Boolean(userLiked));
    } catch (error) {
      console.error("Error checking if user liked the post:", error);
    }
  }

  useEffect(() => {
    checkLiked();
  }, [likes, user?.id]);

  return (
    <CardContainer>
      <CardBody>
        <div>
          <CardHeader top={top}>
            {actions && (
              <span>
                <Link to={`/manage-news/edit/${id}`}>
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <Link to={`/manage-news/delete/${id}`}>
                  <i className="bi bi-trash3"></i>
                </Link>
              </span>
            )}
            <h2>{title}</h2>
            <TextLimit text={text} limit={130} />
          </CardHeader>
          <CardFooter>
            <section>
              <i
                onClick={handleLike}
                className={
                  liked && Cookies.get("token")
                    ? "bi bi-hand-thumbs-up-fill"
                    : "bi bi-hand-thumbs-up"
                }
                style={{
                  color: liked && Cookies.get("token") ? "#007bff" : "inherit",
                }}
              ></i>
              <span>{likes?.length}</span>
            </section>
            <section>
              <i className="bi bi-chat"></i>
              <span>{comments?.length}</span>
            </section>
          </CardFooter>
        </div>

        <img src={banner} alt="Imagem" />
      </CardBody>
    </CardContainer>
  );
}
