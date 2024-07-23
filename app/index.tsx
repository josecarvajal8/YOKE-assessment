import { ContactAvatar } from "@/components/ContactAvatar";
import { ContactInfo } from "@/components/ContactInfo";
import { useEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from "react-native";

export default function HomeScreen() {
  const [contacts, setContacts] = useState<IContacts[]>([]);
  const [supporters, setSupporters] = useState<number[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const getUsers = async () => {
    try {
      const response = await fetch("https://api.mocki.io/v2/qupn02bi");
      const data: { contacts: Array<IContacts> } = await response.json();
      setContacts(data.contacts);
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const onSelectContact = (id: number) => {
    if (supporters.includes(id)) {
      onRemoveFromSupporters(id);
    } else {
      setSupporters((prev) => [...prev, id]);
    }
  };
  const supportersSelected = useMemo(
    () => contacts.filter((contact) => supporters.includes(contact.id)),
    [contacts, supporters]
  );
  const onRemoveFromSupporters = (id: number) => {
    setSupporters((prev) => prev.filter((el) => el !== id));
  };
  const filteredContacts = useMemo(() => {
    if (filterValue) {
      return contacts.filter((contact) => {
        const { name, lastName, firstName } = contact;
        const _name = name ? name : `${firstName} ${lastName ?? ""}`;
        return _name.toLowerCase().includes(filterValue.toLowerCase());
      });
    }
    return contacts;
  }, [contacts, filterValue]);
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text>{"Select 6+ supporters"}</Text>
        <TextInput
          onChangeText={(value) => setFilterValue(value)}
          placeholder="Search Supporters"
          style={styles.filterSearch}
        />
        {supporters.length ? (
          <FlatList
            horizontal
            data={supportersSelected}
            ListHeaderComponent={() => (
              <View style={styles.supportersCounter}>
                <Text>{supporters.length}</Text>
              </View>
            )}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => {
              const { firstName, lastName, name, id } = item;
              const onRemove = () => onRemoveFromSupporters(id);
              return (
                <ContactAvatar
                  data={{ firstName, lastName, name }}
                  onRemove={onRemove}
                />
              );
            }}
          />
        ) : null}
        <FlatList
          alwaysBounceVertical={false}
          data={filteredContacts}
          renderItem={({ item }) => {
            const onPress = () => onSelectContact(item.id);
            const isSelected = supporters.includes(item.id);
            return (
              <ContactInfo
                data={item}
                onPressContact={onPress}
                isMarked={isSelected}
              />
            );
          }}
          keyExtractor={(item) => `${item.id}-${item.digits ?? item.number}`}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    padding: 16,
    gap: 16,
  },
  filterSearch: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  supportersCounter: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ADD8E6",
  },
});
