import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const LoginUser = async (data) => {
  return await client
    .post("/authentication/login", data)
    .then((res) => res.data);
};
console.log(`context ${AuthenticationContext}`);
export const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  console.log(`userid: ${userId}`);
  // console.log(`fullName: ${fullName}`);
  // console.log(`userType: ${userType}`);
  return useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      console.log(data);
      queryClient.refetchQueries(["student", { ID: userId }]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
