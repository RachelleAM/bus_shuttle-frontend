import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "api/client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AuthenticationContext } from "routes/authentication-context";

const updateUser = async (data) => {
  console.log("update user");
  return await client.patch(`/users/${data.id}`, data).then((res) => res.data);
};
const updateAdmin = async (data) => {
  console.log("update admin");
  return await client.patch(`/admins/${data.id}`, data).then((res) => res.data);
};
const updateDriver = async (data) => {
  console.log("update driver");
  return await client
    .patch(`/drivers/${data.id}`, data)
    .then((res) => res.data);
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { userId, userType, setAuthentication } = useContext(
    AuthenticationContext
  );

  let mutationfn;
  if (userType === "student") {
    mutationfn = updateUser;
  } else if (userType === "admin") {
    mutationfn = updateAdmin;
  } else if (userType === "driver") {
    mutationfn = updateDriver;
  }

  return useMutation({
    mutationFn: mutationfn,
    onSuccess: async (data) => {
      queryClient.refetchQueries(["userDetails", userId]);
      setAuthentication((oldAuth) => ({
        ...oldAuth,
        fullName: data.fullName,
        // lastName: data.lastName,
      }));
      const storedAuthentication = JSON.parse(
        await AsyncStorage.getItem("authentication")
      );
      await AsyncStorage.setItem(
        "authentication",
        JSON.stringify({
          token: storedAuthentication.token,
          userId: userId,
          // firstName: data.firstName,
          fullName: data.fullName,
        })
      );
    },
    onError: async (error) => {
      console.log({ message: "error in update user mutation", error });
    },
    onMutate: (variables) => {
      console.log(`variables: ${variables}`);
    },
  });
};
