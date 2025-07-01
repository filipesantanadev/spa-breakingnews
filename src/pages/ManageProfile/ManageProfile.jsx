import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { ManageProfileContainer } from "./ManageProfileStyled";
import { Input } from "../../components/Input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "../../schemas/editUserSchema";
import { Button } from "../../components/Button/Button";
import { editUser, userLogged } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";

export function ManageProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(user);

  const {
    register: registerEditUser,
    handleSubmit: handleSubmitEditUser,
    formState: { errors: errorsEditUser },
    setValue,
  } = useForm({ resolver: zodResolver(editUserSchema) });

  async function editHandleSubmit(data) {
    try {
      await editUser(data, user._id);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }

  async function findUserById() {
    try {
      const { data } = await userLogged();
      setValue("name", data.name);
      setValue("username", data.username);
      setValue("email", data.email);
      //setValue("password", data.password);
      setValue("avatar", data.avatar);
      setValue("background", data.background);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findUserById();
  }, []);

  return (
    <ManageProfileContainer>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmitEditUser(editHandleSubmit)}>
        <Input
          type="text"
          placeholder="Nome"
          name="name"
          register={registerEditUser}
        />
        {errorsEditUser.name && (
          <ErrorSpan>{errorsEditUser.name.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Nome do usuário"
          name="username"
          register={registerEditUser}
        />
        {errorsEditUser.username && (
          <ErrorSpan>{errorsEditUser.username.message}</ErrorSpan>
        )}
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          register={registerEditUser}
        />
        {errorsEditUser.email && (
          <ErrorSpan>{errorsEditUser.email.message}</ErrorSpan>
        )}
        {/* <Input
          type="password"
          placeholder="Senha"
          name="password"
          register={registerEditUser}
        />
        {errorsEditUser.password && (
          <ErrorSpan>{errorsEditUser.password.message}</ErrorSpan>
        )}
        <Input
          type="password"
          placeholder="Confirmar senha"
          name="confirmPassword"
          register={registerEditUser}
        />
        {errorsEditUser.confirmPassword && (
          <ErrorSpan>{errorsEditUser.confirmPassword.message}</ErrorSpan>
        )} */}
        <Input
          type="text"
          placeholder="Avatar"
          name="avatar"
          register={registerEditUser}
        />
        {errorsEditUser.avatar && (
          <ErrorSpan>{errorsEditUser.avatar.message}</ErrorSpan>
        )}
        <Input
          type="text"
          placeholder="Background"
          name="background"
          register={registerEditUser}
        />
        {errorsEditUser.background && (
          <ErrorSpan>{errorsEditUser.background.message}</ErrorSpan>
        )}
        <Button type="submit" text="Atualizar" />
      </form>
    </ManageProfileContainer>
  );
}
