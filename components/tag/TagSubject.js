//in ra thẻ thông tin môn học

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import TagInfor from './TagInfor';
const TagSubject = props => {
  const {subjectInfor} = props;
  return (
    <TouchableOpacity
      style={[styles.tag, {flexDirection: 'row', alignItems: 'center'}]}>
      <Image
        style={{
          width: 60,
          height: 80,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#4d94ff',
          marginHorizontal: 10,
          marginVertical: 10,
        }}
        // source={{uri: subjectInfor.avatar}}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'column',
        }}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          {subjectInfor.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default TagSubject;
const styles = StyleSheet.create({
  tag: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 3,
    shadowColor: '#595959',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
});
