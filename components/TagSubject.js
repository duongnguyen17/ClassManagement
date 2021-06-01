//in ra thẻ thông tin môn học

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import TagInfor from '../components/TagInfor';
const TagSubject = props => {
  const {user} = props;
  return (
    <TouchableOpacity
      style={[
        styles.tag,
        {flexDirection: 'row', marginVertical: 5, alignItems: 'center'},
      ]}>
      <Image
        style={{
          width: 60,
          height: 80,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#4d94ff',
          marginHorizontal: 10,
          marginVertical: 20,
        }}
        source={{uri: user.avatar}}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: 'column',
        }}>
        <TagInfor title={'Họ tên'} content={user.name} />
        {user.class == '' || user.class == null ? null : (
          <TagInfor title={'Lớp'} content={user.class} />
        )}
        {user.phoneNumber == '' || user.phoneNumber == null ? null : (
          <TagInfor title={'SĐT'} content={user.phoneNumber} />
        )}
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
    marginVertical: 2,
  },
});
