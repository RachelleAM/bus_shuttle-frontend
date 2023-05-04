import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";
console.log("creating user");
const createUser = async (data) => {
  return await client
    .post("/authentication/register", data)
    .then((res) => res.data);
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  console.log(userId);
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data);
      queryClient.refetchQueries(["student", { ID: userId }]);
    },
    onError: (error) => {
      console.log("error", error);
    },
    onMutate: (variables) => {
      console.log(variables);
    },
  });
};
