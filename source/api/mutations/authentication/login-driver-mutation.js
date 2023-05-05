import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const LoginDriver = async (data) => {
  return await client
    .post("/authentication/driverLogin", data)
    .then((res) => res.data);
};

export const useLoginDrivernMutation = () => {
  const queryClient = useQueryClient();
  const { userId } = useContext(AuthenticationContext);
  return useMutation({
    mutationFn: LoginDriver,
    onSuccess: (data) => {
      console.log(data);
      queryClient.refetchQueries(["driver", { ID: userId }]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
