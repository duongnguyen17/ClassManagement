import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

const Subjects = () => {
  const [subjects, setSubjects] = useState([
    'Sinh học 12',
    'Toán 10',
    'Vật Lý 11',
  ]);
  return (
    <SafeAreaView>
      <ScrollView>
        {subjects.map((value, index) => (
          <View key={index}>
            <Text>{value}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Subjects;
