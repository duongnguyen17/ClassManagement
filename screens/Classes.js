import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import TagInfor from '../components/TagInfor';
import TagClass from '../components/TagClass';
const Classes = () => {
  const [classes, setClasses] = useState([
    {
      name: '12A4',
      year: '2014-2017',
      teacher: 'Nguyễn Văn Duy',
    },
    {
      name: '12A2',
      year: '2014-2017',
      teacher: 'Nguyễn Văn Vũ',
    },
  ]);
  return (
    <SafeAreaView>
      <ScrollView>
        {classes.map((value, index) => (
          <TouchableOpacity key={index}>
            <View><TagClass/></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Classes;
