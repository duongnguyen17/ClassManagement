//in ra thẻ thông tin người
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import TagInfor from '../components/TagInfor';
const TagUser = props => {
  const {userInfor, isEdit, onLongPress} = props;

  return (
    <TouchableOpacity
      style={[styles.tag, {flexDirection: 'row', alignItems: 'center'}]}
      disabled={isEdit}
      onLongPress={() => {
        onLongPress(userInfor);
      }}>
      {isEdit ? (
        <TouchableOpacity
          style={{
            width: 60,
            height: 80,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#4d94ff',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Image
            style={{
              width: 60,
              height: 80,
              borderRadius: 5,
            }}
            source={{uri: userInfor.avatar}}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: 60,
            height: 80,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#4d94ff',
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Image
            style={{
              width: 60,
              height: 80,
              borderRadius: 5,
            }}
            source={{uri: userInfor.avatar}}
          />
        </View>
      )}

      <View
        style={{
          flex: 1,
          marginHorizontal: 25,
          marginVertical: 10,
          flexDirection: 'column',
        }}>
        <TagInfor title={'Họ tên'} content={userInfor.name} isEdit={isEdit} />
        {userInfor.class == '' || userInfor.class == null ? null : (
          <TagInfor title={'Lớp'} content={userInfor.class} isEdit={isEdit} />
        )}

        <TagInfor
          title={'SĐT'}
          content={userInfor.phoneNumber}
          isEdit={isEdit}
        />
      </View>
    </TouchableOpacity>
  );
};
export default TagUser;
const styles = StyleSheet.create({
  tag: {
    width: '100%',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 2,
    shadowColor: '#595959',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
});
