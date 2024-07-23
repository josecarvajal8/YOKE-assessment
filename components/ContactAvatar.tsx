import React, { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IContactAvatarProps {
  data: Pick<IContacts, "firstName" | "lastName" | "name">;
  onRemove: () => void;
}

export const ContactAvatar: FC<IContactAvatarProps> = ({ data, onRemove }) => {
  const { firstName, lastName, name } = data;
  const _name = name ? name : `${firstName} ${lastName ?? ""}`;
  const [first, last] = _name.split("");
  return (
    <Pressable style={styles.container} onPress={onRemove}>
      <View style={styles.containerInitials}>
        <Text>{`${first[0]}${last && last[0]}`.toUpperCase()}</Text>
      </View>
      <Text>{_name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerInitials: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ADD8E6",
  },
});
