import { Link } from "react-router-dom";
import { TextLimit } from "../TextLimit/TextLimit";
import { CardBody, CardContainer, CardFooter, CardHeader } from "./CardStyled";

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
  async function handleLike() {
    if (onLike) {
      await onLike(id);
    }
  }

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
              <i onClick={handleLike} className="bi bi-hand-thumbs-up"></i>
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
