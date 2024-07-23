import React, { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IContactInfoProps {
  data: IContacts;
  onPressContact: () => void;
  isMarked: boolean;
}

export const ContactInfo: FC<IContactInfoProps> = ({
  data,
  onPressContact,
  isMarked,
}) => {
  const { name, firstName, lastName, number, digits } = data;
  const _name = name ? name : `${firstName} ${lastName ?? ""}`;
  const checkBg = isMarked ? "#ADD8E6" : "#FFF";
  return (
    <Pressable onPress={onPressContact} style={styles.container}>
      <View>
        <Text>{_name}</Text>
        <Text>{digits ?? number}</Text>
      </View>
      <View style={{ ...styles.check, backgroundColor: checkBg }} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  check: {
    width: 24,
    height: 24,
    borderWidth: 1,
  },
});
