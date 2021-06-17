import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TagSubject from '../components/tag/TagSubject';
const Subjects = () => {
  const [subjects, setSubjects] = useState([
    {
      name: 'Sinh học 12 - Nâng Cao',
      avatar: 'sh12_nc.jpg',
    },
    {
      name: 'Hình Học 10 - Nâng cao',
      avatar: 'hh10_nc.jpg',
    },
    {
      name: 'Đại Số 11',
      avatar: 'ds11.jpg',
    },
  ]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, marginTop: 10}}>
        {subjects.map((value, index) => (
          <TagSubject key={index} subjectInfor={value} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Subjects;
