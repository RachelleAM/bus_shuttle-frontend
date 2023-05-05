import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const LoginAdmin = async (data) => {
  return await client
    .post("/authentication/adminLogin", data)
    .then((res) => res.data);
};

export const useLoginAdminMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: LoginAdmin,
    onSuccess: (data) => {
      console.log(data);
      queryClient.refetchQueries(["admin", { ID: userId }]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
